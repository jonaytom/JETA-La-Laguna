# Trabajador local (v0.64.2): corre en el PC de Jonay (scripts\TRABAJADOR.bat) y hace en su equipo todo lo que antes se
# hacía en la nube: compilar, pruebas, regenerar el mapa, copiar los HTML y publicar en GitHub.
# Claude deja un encargo en  cola\<id>.txt  (con las herramientas de archivos del escritorio) y lo lee hecho en
# cola\hecho\<id>.md . Solo acepta las órdenes de la lista de abajo (nada de comandos libres): es un canal seguro.
#
# Órdenes (una por línea; '#' = comentario):
#   build                      python build.py (juego + documentación)
#   pruebas [listas…]          tools/pruebas_locales.py  (version, base, pelea, misiones, coches, mapa, otros, todas)
#   prep                       python prep.py  (regenera data/data.json desde OSM)
#   merge_zona <zona>          python tools/merge_zona.py <zona>
#   copiar_html                dist\JETA La Laguna.html y la documentación a E:\Claude\GTA La Laguna\
#   publicar <versión>         escribe scripts\PUBLICAR.txt: la tarea programada lo sube a GitHub (siempre lo último)
#   esperar <segundos>         pausa (máx. 600)
#   auditar                    el auditor del Corrector (C:\Users\Jonay\RevisordeCodigo\herramientas): SOLO si Jonay lo pide
# Si una orden falla, las siguientes no se hacen (salvo «pruebas», que siempre deja su informe).
import os, sys, re, time, shutil, subprocess, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COLA = os.path.join(ROOT, 'cola'); HECHO = os.path.join(COLA, 'hecho')
JUEGO = os.path.dirname(ROOT)  # E:\Claude\GTA La Laguna
PY = sys.executable
ENV = dict(os.environ, PYTHONIOENCODING='utf-8', PYTHONUTF8='1', PIP_DISABLE_PIP_VERSION_CHECK='1')
ARG_OK = re.compile(r'^[A-Za-z0-9_.\-]+$')


def run(cmd, limite=7200):
    t0 = time.time()
    try:
        r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=limite, env=ENV)
        out = (r.stdout + '\n' + r.stderr).strip(); code = r.returncode
    except subprocess.TimeoutExpired:
        out, code = 'TIEMPO AGOTADO', -1
    return code, out, int(time.time() - t0)


def subprocess_run(cmd, cwd, limite=3600):
    t0 = time.time()
    try:
        r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=limite, env=ENV); return r.returncode, (r.stdout + '\n' + r.stderr).strip(), int(time.time() - t0)
    except subprocess.TimeoutExpired: return -1, 'TIEMPO AGOTADO', int(time.time() - t0)


def orden(linea):
    p = linea.split(); o, a = p[0].lower(), p[1:]
    if any(not ARG_OK.match(x) for x in a): return 1, 'argumento no permitido: ' + ' '.join(a), 0
    if o == 'build': return run([PY, 'build.py'])
    if o == 'pruebas':
        code, out, s = run([PY, os.path.join('tools', 'pruebas_locales.py')] + (a or ['version', 'base']))
        informe = os.path.join(ROOT, 'reportes', 'pruebas', 'ULTIMO.md')
        resumen = open(informe, encoding='utf-8').readline().strip() if os.path.exists(informe) else ''
        return (0 if 'FALLA' not in out and code == 0 else 2), resumen + '\n(informe completo: reportes/pruebas/ULTIMO.md)\n' + out[-1500:], s
    if o == 'auditar':  # only when Jonay asks: the Corrector's auditor, run where it lives (its ../resultados is the real history)
        her = os.path.join(os.path.expanduser('~'), 'RevisordeCodigo', 'herramientas')
        if not os.path.exists(os.path.join(her, 'auditar.py')): return 1, 'no encuentro ' + her, 0
        code, out, s = subprocess_run([PY, 'auditar.py', '--repo', ROOT], her)
        res = os.path.join(os.path.dirname(her), 'resultados'); dirs = sorted([d for d in os.listdir(res) if os.path.isdir(os.path.join(res, d))], key=lambda d: os.path.getmtime(os.path.join(res, d)))
        ver = open(os.path.join(res, dirs[-1], 'VEREDICTO.md'), encoding='utf-8').read()[:2500] if dirs and os.path.exists(os.path.join(res, dirs[-1], 'VEREDICTO.md')) else ''
        return (0 if 'NO APTO' not in ver else 2), (dirs[-1] if dirs else '') + '\n' + ver + '\n' + out[-800:], s
    if o == 'prep': return run([PY, 'prep.py'])
    if o == 'merge_zona' and len(a) == 1: return run([PY, os.path.join('tools', 'merge_zona.py'), a[0]])
    if o == 'copiar_html':
        t0 = time.time()
        shutil.copy(os.path.join(ROOT, 'dist', 'JETA La Laguna.html'), os.path.join(JUEGO, 'JETA La Laguna.html'))
        doc = os.path.join(ROOT, 'dist', 'Documentacion tecnica.html')
        if os.path.exists(doc): shutil.copy(doc, os.path.join(JUEGO, 'Documentación técnica.html'))
        return 0, 'copiados a ' + JUEGO, int(time.time() - t0)
    if o == 'publicar' and len(a) == 1:
        open(os.path.join(ROOT, 'scripts', 'PUBLICAR.txt'), 'w').write(a[0] + '\n'); return 0, 'PUBLICAR.txt = ' + a[0], 0
    if o == 'esperar' and len(a) == 1 and a[0].isdigit(): time.sleep(min(600, int(a[0]))); return 0, '', int(a[0])
    return 1, 'orden desconocida: ' + linea, 0


def hacer(path):
    nombre = os.path.splitext(os.path.basename(path))[0]
    lineas = [l.strip() for l in open(path, encoding='utf-8') if l.strip() and not l.strip().startswith('#')]
    os.makedirs(HECHO, exist_ok=True); os.replace(path, os.path.join(HECHO, nombre + '.txt'))
    res = [f'# Encargo {nombre} — {datetime.datetime.now():%Y-%m-%d %H:%M}\n']; estado = 'OK'
    for l in lineas:
        print(f'[{datetime.datetime.now():%H:%M:%S}] {l}', flush=True)
        code, out, s = orden(l)
        v = 'OK' if code == 0 else 'FALLA'
        print(f'   {v} ({s} s)', flush=True)
        res.append(f'## {l} — {v} ({s} s)\n\n```\n{out[-3000:]}\n```\n')
        if code != 0:
            estado = 'FALLA'
            if l.split()[0].lower() != 'pruebas': res.append('(se paran aquí las órdenes siguientes)\n'); break
    res[0] = res[0].rstrip('\n') + f' — **{estado}**\n'
    open(os.path.join(HECHO, nombre + '.md'), 'w', encoding='utf-8').write('\n'.join(res))
    print(f'== {nombre}: {estado}\n', flush=True)


def main():
    os.makedirs(COLA, exist_ok=True)
    print('Trabajador de JETA La Laguna esperando encargos en', COLA, '(deja esta ventana abierta; Ctrl+C para parar)\n', flush=True)
    while True:
        for f in sorted(os.listdir(COLA)):
            p = os.path.join(COLA, f)
            if f.endswith('.txt') and os.path.isfile(p):
                time.sleep(1)  # let the copy finish
                try: hacer(p)
                except Exception as e: print('ERROR', e, flush=True)
        time.sleep(3)


if __name__ == '__main__':
    main()
