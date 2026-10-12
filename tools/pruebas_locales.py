# Pruebas en el PC de Jonay (v0.64.1): lo lanza scripts/PRUEBAS.bat. Así las pruebas corren en su equipo y no gastan uso.
#   1) build.py  2) servidor local en dist/ (puerto 8765)  3) cada prueba de scripts/PRUEBAS_LISTA.txt con tests/run_test.py
#   4) informe en reportes/pruebas/ULTIMO.md (y una copia con fecha) que Claude lee antes de publicar.
# Uso: python tools/pruebas_locales.py [listas…]   version (= scripts/PRUEBAS_LISTA.txt, por defecto), base, pelea,
#      misiones, coches, mapa, otros (scripts/pruebas/<nombre>.txt), todas (prueba_*.py + audit_*.py) o una ruta .txt
import os, sys, time, glob, shutil, subprocess, threading, functools, http.server, socketserver, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TESTS = os.path.join(ROOT, 'tests'); OUT = os.path.join(ROOT, 'reportes', 'pruebas')
LIMITE = 15 * 60  # segundos por prueba
ENV = dict(os.environ, PYTHONIOENCODING='utf-8', PYTHONUTF8='1')  # Windows: read the UTF-8 test scripts as UTF-8


def servidor():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass  # no «GET /test.html» lines in the window
    h = functools.partial(Quiet, directory=os.path.join(ROOT, 'dist'))
    socketserver.TCPServer.allow_reuse_address = True
    try: s = socketserver.ThreadingTCPServer(('127.0.0.1', 8765), h)
    except OSError: print('   (el puerto 8765 ya tiene un servidor: uso ese)'); return None
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s


def lista(args):
    """args: list names of scripts/pruebas/<name>.txt, «version» (= scripts/PRUEBAS_LISTA.txt), «todas» or a .txt path."""
    out = []
    for arg in args or ['version']:
        a = arg.lstrip('-').lower()
        if a == 'todas':
            out += [os.path.basename(p) for p in sorted(glob.glob(os.path.join(TESTS, 'prueba_*.py')) + sorted(glob.glob(os.path.join(TESTS, 'audit_*.py'))))]; continue
        p = os.path.join(ROOT, 'scripts', 'PRUEBAS_LISTA.txt') if a == 'version' else arg if arg.endswith('.txt') else os.path.join(ROOT, 'scripts', 'pruebas', a + '.txt')
        if not os.path.exists(p): print('No existe la lista', p); sys.exit(1)
        out += [l.strip() for l in open(p, encoding='utf-8') if l.strip() and not l.strip().startswith('#')]
    seen, res = set(), []
    for l in out:  # the same test only once
        if l not in seen: seen.add(l); res.append(l)
    return res


def veredicto(code, txt):
    malo = ['FALLA', 'PAGEERROR', 'Traceback', 'not ready', 'TIEMPO']
    if code is None: return 'TIEMPO'
    if code != 0 or any(m in txt for m in malo): return 'FALLA'
    return 'OK'


def main():
    nombres = sys.argv[1:] or ['version']
    pruebas = lista(nombres)
    ver = open(os.path.join(ROOT, 'VERSION')).read().strip()
    os.makedirs(OUT, exist_ok=True); os.makedirs(os.path.join(TESTS, 'shots'), exist_ok=True)
    print('== build'); b = subprocess.run([sys.executable, 'build.py'], cwd=ROOT, env=ENV, capture_output=True, text=True, encoding='utf-8', errors='replace')
    print(b.stdout[-300:], b.stderr[-600:])
    if b.returncode != 0:
        open(os.path.join(OUT, 'ULTIMO.md'), 'w', encoding='utf-8').write(f'# Pruebas {ver}: FALLA EL BUILD\n\n```\n{b.stdout[-2000:]}\n{b.stderr[-3000:]}\n```\n'); sys.exit(1)
    srv = servidor()
    filas, detalle = [], []
    t_all = time.time()
    for i, linea in enumerate(pruebas, 1):
        partes = linea.split(); script = partes[0]
        print(f'== [{i}/{len(pruebas)}] {linea}', flush=True); t0 = time.time()
        try:
            r = subprocess.run([sys.executable, 'run_test.py', script] + partes[1:], cwd=TESTS, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=LIMITE, env=ENV)
            code, txt = r.returncode, r.stdout + '\n' + r.stderr
        except subprocess.TimeoutExpired as e:
            code, txt = None, (e.stdout or '') if isinstance(e.stdout, str) else ''
        v = veredicto(code, txt); seg = int(time.time() - t0)
        nuevas = [os.path.basename(f) for f in glob.glob(os.path.join(TESTS, 'shots', '*')) if os.path.getmtime(f) >= t0 - 1]
        # only the useful lines: results, errors and the tail
        utiles = [l for l in txt.splitlines() if not l.startswith('log:') and not l.startswith('warning:') and l.strip()]
        print(f'   {v} ({seg} s)', flush=True)
        filas.append(f'| {i} | `{linea}` | **{v}** | {seg} s |')
        detalle.append(f'### {i}. {linea} — {v}\n\n```\n' + '\n'.join(utiles[-60:]) + '\n```\n')
        if nuevas: detalle.append('Fotos/archivos nuevos en `tests/shots/`: ' + ', '.join(sorted(nuevas)) + '\n')
    if srv: srv.shutdown()
    ok = sum(1 for f in filas if '**OK**' in f)
    fecha = datetime.datetime.now().strftime('%Y-%m-%d %H:%M')
    md = (f'# Pruebas {ver} — {fecha} — {ok}/{len(filas)} OK\n\nListas: {", ".join(nombres)}. En el PC de Jonay (`scripts\\PRUEBAS*.bat`), {int(time.time() - t_all)} s en total.\n\n'
          '| # | Prueba | Resultado | Tiempo |\n|---|---|---|---|\n' + '\n'.join(filas) + '\n\n## Detalle\n\n' + '\n'.join(detalle))
    open(os.path.join(OUT, 'ULTIMO.md'), 'w', encoding='utf-8').write(md)
    shutil.copy(os.path.join(OUT, 'ULTIMO.md'), os.path.join(OUT, f'pruebas_{ver}_{datetime.datetime.now():%Y%m%d_%H%M}.md'))
    print(f'\n== {ok}/{len(filas)} OK · informe en reportes\\pruebas\\ULTIMO.md')


if __name__ == '__main__':
    main()
