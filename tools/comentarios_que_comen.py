# Busca en src/*.js comentarios «//» que se han tragado código detrás (pasó 3 veces en v0.66: una edición en una sola
# línea pone «// nota» delante de más instrucciones y el juego deja de hacer algo sin dar error).
# Uso: python tools/comentarios_que_comen.py  (sale con 1 y lista las líneas sospechosas). Lo llama build.py.
import re, glob, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COM = re.compile(r'(?<![:"\'\\])//(.*)$')
CODIGO = re.compile(r'[\w\]]\([^()]*\);\s*\w|\b[a-zA-Z_]\w*(\.\w+)+\s*=\s*[\w(\[{-][^=]|\b[a-zA-Z_]\w*\s*=\s*\w+\(.*\);')
def revisar():
    malas = []
    for f in sorted(glob.glob(os.path.join(ROOT, 'src', '*.js'))):
        for i, l in enumerate(open(f, encoding='utf-8'), 1):
            m = COM.search(l)
            if m and 'http' not in l and CODIGO.search(m.group(1)): malas.append(f'{os.path.basename(f)}:{i}: //{m.group(1)[:120]}')
    return malas
if __name__ == '__main__':
    m = revisar(); print('\n'.join(m) or 'sin comentarios sospechosos'); sys.exit(1 if m else 0)
