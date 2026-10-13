# Trabajador local (v0.64.2): corre en el PC de Jonay (scripts\TRABAJADOR.bat) y hace en su equipo todo lo que antes se
# hacía en la nube: compilar, pruebas, regenerar el mapa, copiar los HTML y publicar en GitHub.
# Claude deja un encargo en  cola\<id>.txt  (con las herramientas de archivos del escritorio) y lo lee hecho en
# cola\hecho\<id>.md . Solo acepta las órdenes de la lista de abajo (nada de comandos libres): es un canal seguro.
#
# Órdenes (una por línea; '#' = comentario):
#   build                      python build.py (juego + documentación)
#   pruebas [listas…]          tools/pruebas_locales.py  (sin nada = cambios + version; base, pelea, misiones, coches, mapa, otros, todas)
#   prep                       python prep.py  (regenera data/data.json desde OSM)
#   merge_zona <zona>          python tools/merge_zona.py <zona>
#   copiar_html                dist\JETA La Laguna.html y la documentación a E:\Claude\GTA La Laguna\
#   publicar <versión>         escribe scripts\PUBLICAR.txt: la tarea programada lo sube a GitHub (siempre lo último)
#   esperar <segundos>         pausa (máx. 600)
#   auditar                    el auditor del Corrector, como auditar_jeta.bat (resultados en RevisordeCodigo\resultados_pc);
#                              al final de cada pasada, DESPUÉS de «pruebas» en el mismo encargo (nunca a la vez)
#   borrar_auditoria_vieja     borra repo\tools\auditoria (copia antigua del auditor)
#   subir_git                  sube ya a GitHub (scripts\publicar.ps1; necesita «publicar <versión>» antes)
#   descargar <clave>          baja una referencia de la lista cerrada DESCARGAS (p. ej. callejero) a docs/referencias/
#   revisor [--solo-zonas|--todo|--lote N]   tests/agente_revisor.py (agente que conduce y anda por el mapa; solo si Jonay lo pide)
# Si una orden falla (también «pruebas», que deja igualmente su informe), las siguientes no se hacen.
import os, sys, re, time, shutil, subprocess, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COLA = os.path.join(ROOT, 'cola'); HECHO = os.path.join(COLA, 'hecho')
JUEGO = os.path.dirname(ROOT)  # E:\Claude\GTA La Laguna
PY = sys.executable
ENV = dict(os.environ, PYTHONIOENCODING='utf-8', PYTHONUTF8='1', PIP_DISABLE_PIP_VERSION_CHECK='1')
DESCARGAS = {  # v0.72: only these (key -> url, destination inside the repo)
    'callejero': ('https://turismo.aytolalaguna.es/wp-content/uploads/2019/11/Callejero-La-Laguna-c.pdf', os.path.join('docs', 'referencias', 'callejero', 'Callejero-La-Laguna.pdf')),
}
ARG_OK = re.compile(r'^[A-Za-z0-9_.\-]+$')


def run(cmd, limite=7200, eco=False):
    """eco=True (pruebas): repeats on this window the progress lines (== …, >> prueba …) while it runs."""
    t0 = time.time(); lines = []
    try:
        pr = subprocess.Popen(cmd, cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding='utf-8', errors='replace', env=ENV)
        for l in pr.stdout:
            lines.append(l.rstrip('\n'))
            if eco and (l.startswith('==') or l.startswith('>>') or l.startswith('  terminada') or l.startswith('   ')): print('   ' + l.rstrip(), flush=True)
            if time.time() - t0 > limite: pr.kill(); lines.append('TIEMPO AGOTADO'); break
        code = pr.wait(timeout=60)
    except Exception as e:
        lines.append(f'error: {e}'); code = -1
    return code, '\n'.join(lines).strip(), int(time.time() - t0)


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
        code, out, s = run([PY, os.path.join('tools', 'pruebas_locales.py')] + (a or ['cambios', 'version']), eco=True)
        informe = os.path.join(ROOT, 'reportes', 'pruebas', 'ULTIMO.md')
        resumen = open(informe, encoding='utf-8').readline().strip() if os.path.exists(informe) else ''
        # v0.66: verdict by the final count (a test repeated apart prints FALLA and then OK)
        m = re.search(r'== (\d+)/(\d+) OK', out); return (0 if m and m.group(1) == m.group(2) else 2), resumen + '\n(informe completo: reportes/pruebas/ULTIMO.md)\n' + out[-1500:], s
    if o == 'auditar':  # the Corrector's auditor, exactly like its auditar_jeta.bat (PARA_EL_PROGRAMADOR, 2026-10-12): GPU, copy, resultados_pc
        rev = os.path.join(os.path.expanduser('~'), 'RevisordeCodigo'); her = os.path.join(rev, 'herramientas'); rpc = os.path.join(rev, 'resultados_pc')
        if not os.path.exists(os.path.join(her, 'auditar.py')): return 1, 'no encuentro ' + her, 0
        cmd = [PY, 'auditar.py', '--repo', ROOT, '--copiar', '--gpu', '--resultados', rpc] + ([] if os.path.exists(os.path.join(rpc, 'historial.json')) else ['--primera'])
        code, out, s = subprocess_run(cmd, her)
        dirs = sorted([d for d in os.listdir(rpc) if os.path.isdir(os.path.join(rpc, d))], key=lambda d: os.path.getmtime(os.path.join(rpc, d))) if os.path.isdir(rpc) else []
        ver = open(os.path.join(rpc, dirs[-1], 'VEREDICTO.md'), encoding='utf-8').read()[:3000] if dirs and os.path.exists(os.path.join(rpc, dirs[-1], 'VEREDICTO.md')) else ''
        txt = {0: 'APTO', 1: 'APTO CON AVISOS', 2: 'NO APTO', 3: 'FALTA EL HISTORIAL'}.get(code, 'código %s' % code)
        return (0 if code in (0, 1) else 2), f'{txt} · {dirs[-1] if dirs else ""}\n{ver}\n{out[-800:]}', s
    if o == 'subir_git':  # v0.66 (Jonay): run the GitHub upload now (the scheduled task only runs a couple of times a day)
        code, out, s = run(['powershell', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', os.path.join(ROOT, 'scripts', 'publicar.ps1')], 600)
        logf = os.path.join(ROOT, 'scripts', 'publicar.log'); tail = ''.join(open(logf, encoding='utf-8', errors='replace').readlines()[-6:]) if os.path.exists(logf) else ''
        return code, (out + '\n' + tail).strip(), s
    if o == 'borrar_auditoria_vieja':  # one-off (PARA_EL_PROGRAMADOR): the old copy of the auditor inside the repo
        p = os.path.join(ROOT, 'tools', 'auditoria')
        if os.path.isdir(p): shutil.rmtree(p); return 0, 'borrada ' + p, 0
        return 0, 'ya no existe ' + p, 0
    if o == 'revisor':  # v0.69 (Jonay): the gameplay agent; only these flags
        if any(x not in ('--solo-zonas', '--todo', '--lote') and not x.isdigit() for x in a): return 1, 'opción no permitida: ' + ' '.join(a), 0
        code, out, s = run([PY, os.path.join('tests', 'agente_revisor.py')] + a, 14400, eco=True)
        ult = os.path.join(ROOT, 'reportes', 'ULTIMO.md'); res = open(ult, encoding='utf-8').read()[:2500] if os.path.exists(ult) else ''
        return code, res + '\n(informe completo: reportes/ULTIMO.md)\n' + out[-1200:], s
    if o == 'descargar' and len(a) == 1 and a[0] in DESCARGAS:
        import urllib.request; t0 = time.time(); url, dst = DESCARGAS[a[0]]; dst = os.path.join(ROOT, dst); os.makedirs(os.path.dirname(dst), exist_ok=True)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=120) as r, open(dst, 'wb') as f: f.write(r.read())
        return 0, f'{dst} ({os.path.getsize(dst) // 1024} KB)', int(time.time() - t0)
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
        try: code, out, s = orden(l)
        except Exception as e: code, out, s = 1, f'ERROR: {e}', 0  # v0.72: an order that breaks still leaves its report
        v = 'OK' if code == 0 else 'FALLA'
        print(f'   {v} ({s} s)', flush=True)
        res.append(f'## {l} — {v} ({s} s)\n\n```\n{out[-3000:]}\n```\n')
        if code != 0:
            estado = 'FALLA'
            res.append('(se paran aquí las órdenes siguientes)\n'); break  # v0.66.1: also when «pruebas» fails (it published a broken 0.66.0)
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
