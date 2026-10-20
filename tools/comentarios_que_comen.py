# Busca en src/*.js comentarios «//» que se han tragado código detrás (pasó 3 veces en v0.66: una edición en una sola
# línea pone «// nota» delante de más instrucciones y el juego deja de hacer algo sin dar error).
# Uso: python tools/comentarios_que_comen.py  (sale con 1 y lista las líneas sospechosas). Lo llama build.py.
import re, glob, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COM = re.compile(r'(?<![:"\'\\])//(.*)$')
CODIGO = re.compile(r'[\w\]]\([^()]*\);\s*\w|\b[a-zA-Z_]\w*(\.\w+)+\s*=\s*[\w(\[{-][^=]|\b[a-zA-Z_]\w*\s*=\s*\w+\(.*\);')
# v0.85.1 (pasó dos veces en la v0.82): un «//» a media línea, con código delante, cuyo texto acaba en «;» o «}» y lleva
# una llamada o una asignación: casi seguro que es código tragado (los comentarios en prosa no acaban así)
FIN = re.compile(r'(;|\})\s*$')
CODIGO2 = re.compile(r'[\w$\]\)]\s*(\(|=[^=>]|\.\w+\()|;\s*\S')
def revisar():
    malas = []
    for f in sorted(glob.glob(os.path.join(ROOT, 'src', '*.js'))):
        for i, l in enumerate(open(f, encoding='utf-8'), 1):
            m = COM.search(l)
            if not m or 'http' in l: continue
            t = m.group(1); antes = l[:m.start()].strip()
            if CODIGO.search(t) or (antes and FIN.search(t) and CODIGO2.search(t)): malas.append(f'{os.path.basename(f)}:{i}: //{t[:120]}')
    return malas
if __name__ == '__main__':
    m = revisar(); print('\n'.join(m) or 'sin comentarios sospechosos'); sys.exit(1 if m else 0)
