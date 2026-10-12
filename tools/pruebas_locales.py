# Pruebas en el PC de Jonay (v0.64.1): lo lanza scripts/PRUEBAS.bat. Así las pruebas corren en su equipo y no gastan uso.
#   1) build.py  2) servidor local en dist/ (puerto 8765)  3) cada prueba de scripts/PRUEBAS_LISTA.txt con tests/run_test.py
#   4) informe en reportes/pruebas/ULTIMO.md (y una copia con fecha) que Claude lee antes de publicar.
# Uso: python tools/pruebas_locales.py [listas…]   cambios (según lo cambiado desde la última subida a git, ver
#      scripts/pruebas/categorias.json; por defecto junto con «version»), version (= scripts/PRUEBAS_LISTA.txt), base,
#      pelea, misiones, coches, mapa, otros, minijuegos (scripts/pruebas/<nombre>.txt), todas, o una ruta .txt
# v0.66.1: todas las pruebas comparten UNA carga del juego (tests/run_varios.py); la que falle se repite aparte, con
#      una carga nueva, para descartar que la haya estropeado la anterior.
import os, sys, json, time, glob, shutil, subprocess, threading, functools, http.server, socketserver, datetime

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


CAMBIOS = {}
def cambios():
    """tests for the files changed since the last upload to git (git status), by scripts/pruebas/categorias.json"""
    import json, re
    cfg = json.load(open(os.path.join(ROOT, 'scripts', 'pruebas', 'categorias.json'), encoding='utf-8'))
    try: st = subprocess.run(['git', 'status', '--porcelain', '-uall'], cwd=ROOT, capture_output=True, text=True, encoding='utf-8', errors='replace').stdout
    except Exception as e: print('sin git:', e); st = ''
    files = sorted({l[3:].strip().strip('"').replace('\\', '/').split(' -> ')[-1] for l in st.splitlines() if l.strip()})
    out = list(cfg['siempre']); CAMBIOS['archivos'] = files; CAMBIOS['reglas'] = []
    for f in files:
        for rx, tests in cfg['reglas']:
            m = re.search(rx, f)
            if not m: continue
            CAMBIOS['reglas'].append(f)
            for t in tests:
                t = t.replace('$1', m.group(1) if m.groups() else '')
                if os.path.exists(os.path.join(TESTS, t.split()[0])): out.append(t)
    return out


def lista(args):
    """args: list names of scripts/pruebas/<name>.txt, «version» (= scripts/PRUEBAS_LISTA.txt), «cambios», «todas» or a .txt path."""
    out = []
    for arg in args or ['cambios', 'version']:
        a = arg.lstrip('-').lower()
        if a == 'cambios': out += cambios(); continue
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
    nombres = sys.argv[1:] or ['cambios', 'version']
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
    if CAMBIOS.get('archivos') is not None: print('== cambiado desde la última subida:', len(CAMBIOS['archivos']), 'archivos')
    lp = os.path.join(TESTS, '_lista_actual.txt'); open(lp, 'w', encoding='utf-8').write('\n'.join(pruebas) + '\n')
    print(f'== {len(pruebas)} pruebas con una sola carga del juego', flush=True); t0 = time.time()
    # v0.66: streamed, so the window (and the worker) say which test is running right now
    txt_l = []; n = len(pruebas); k = 0
    try: DESC = json.load(open(os.path.join(ROOT, 'scripts', 'pruebas', 'descripciones.json'), encoding='utf-8'))
    except Exception: DESC = {}
    try:
        pr = subprocess.Popen([sys.executable, 'run_varios.py', lp], cwd=TESTS, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding='utf-8', errors='replace', env=ENV)
        lim = time.time() + LIMITE * max(1, n)
        for l in pr.stdout:
            txt_l.append(l.rstrip('\n'))
            if l.startswith('=== INICIO '): k += 1; nm = l[11:].strip(); d = DESC.get(nm.split()[0], ''); print(f'>> [{k}/{n}] {nm}' + (f' - {d}' if d else '') + f'  (llevamos {int(time.time() - t0)} s)', flush=True)
            elif l.startswith('=== FIN '): print(f'  terminada en {l.rstrip().rsplit(" ", 1)[-1]} s', flush=True)
            if time.time() > lim: pr.kill(); txt_l.append('TIEMPO'); break
        pr.wait(timeout=30)
    except Exception as e: txt_l.append(f'error lanzando run_varios: {e}')
    txt = '\n'.join(txt_l)
    trozos = {}; cur = None; buf = []; segs = {}
    for l in txt.splitlines():
        if l.startswith('=== INICIO '): cur = l[11:].strip(); buf = []; continue
        if l.startswith('=== FIN ') and cur: rest = l[8:].strip(); segs[cur] = int(rest.rsplit(' ', 1)[-1]) if rest.rsplit(' ', 1)[-1].isdigit() else 0; trozos[cur] = '\n'.join(buf); cur = None; continue
        if cur is not None: buf.append(l)
    for i, linea in enumerate(pruebas, 1):
        out = trozos.get(linea); seg = segs.get(linea, 0); nota = ''
        v = veredicto(0, out) if out is not None else 'FALLA'
        if out is None: out = 'no llegó a ejecutarse en la carga compartida\n' + txt[-1500:]
        if v != 'OK':  # again on its own, with a fresh load
            partes = linea.split(); t1 = time.time(); print(f'>> {linea}: {v} en la carga compartida, la repito aparte', flush=True)
            try:
                r = subprocess.run([sys.executable, 'run_test.py', partes[0]] + partes[1:], cwd=TESTS, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=LIMITE, env=ENV)
                code, out2 = r.returncode, r.stdout + '\n' + r.stderr
            except subprocess.TimeoutExpired as e: code, out2 = None, ''
            motivo = [l for l in out.splitlines() if any(w in l for w in ('FALLA', 'Traceback', 'Error', 'PAGEERROR', 'TIEMPO', 'not ready'))][:6]
            v = veredicto(code, out2); seg = int(time.time() - t1); out = 'En la carga compartida falló por:\n' + '\n'.join(motivo) + '\n--- repetida aparte:\n' + out2; nota = ' (repetida aparte)'
        utiles = [l for l in out.splitlines() if not l.startswith('log:') and not l.startswith('warning:') and l.strip()]
        print(f'   {v}{nota} {linea} ({seg} s)', flush=True)
        filas.append(f'| {i} | `{linea}` | **{v}**{nota} | {seg} s |')
        detalle.append(f'### {i}. {linea} — {v}{nota}\n\n```\n' + '\n'.join(utiles[-60:]) + '\n```\n')
    nuevas = [os.path.basename(f) for f in glob.glob(os.path.join(TESTS, 'shots', '*')) if os.path.getmtime(f) >= t0 - 1]
    if nuevas: detalle.append('Fotos/archivos nuevos en `tests/shots/`: ' + ', '.join(sorted(nuevas)) + '\n')
    if CAMBIOS.get('archivos') is not None: detalle.insert(0, '**Archivos cambiados desde la última subida a git** (eligen las pruebas): ' + (', '.join(f'`{f}`' for f in CAMBIOS['archivos'][:60]) or 'ninguno') + '\n')
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
