#!/usr/bin/env python3
"""Lanzador de la auditoría completa de un proyecto (por defecto JETA La Laguna).

Uso:  python auditar.py [config.json] [--repo RUTA] [--sin-perfil]
  --repo RUTA   audita una copia local (p. ej. el propio repositorio del juego) en vez de clonar de GitHub.
  1. Clona o actualiza el repositorio indicado en la configuración (o usa --repo).
  2. Construye el juego (comando 'build').
  3. Auditoría estática (auditor.py) + perfil dinámico (perfil.py) + memoria (memoria.py).
  4. Compara con la última auditoría guardada (historial.json) y escribe resultados/<fecha>_<commit>/.
  5. Da un VEREDICTO (APTO / APTO CON AVISOS / NO APTO) comparando con la versión anterior -> VEREDICTO.md.
     Código de salida: 0 apto, 1 apto con avisos, 2 no apto.
El informe final con recomendaciones lo redacta Claude leyendo estos resultados y el código cambiado.
"""
import json, os, subprocess, sys, datetime, shutil

AQUI = os.path.dirname(os.path.abspath(__file__))
cfg_path = next((a for a in sys.argv[1:] if a.endswith('.json')), os.path.join(AQUI, 'proyectos', 'jeta.json'))
cfg = json.load(open(cfg_path, encoding='utf-8'))
sh = lambda c, cwd=None: subprocess.run(c, cwd=cwd, shell=True, capture_output=True, text=True, timeout=1800)
if '--repo' in sys.argv:
    work = os.path.abspath(sys.argv[sys.argv.index('--repo') + 1])
else:
    work = os.path.join(AQUI, 'trabajo', cfg['nombre']); os.makedirs(os.path.dirname(work), exist_ok=True)
    if os.path.isdir(os.path.join(work, '.git')): sh('git pull -q', work)
    else: sh(f'git clone -q {cfg["repo"]} "{work}"')
commit = sh('git log -1 --format=%h', work).stdout.strip() or 'local'
if sh('git status --porcelain -- src', work).stdout.strip(): commit += '+cambios'

version = open(os.path.join(work, cfg.get('archivo_version', 'VERSION'))).read().strip() if os.path.exists(os.path.join(work, cfg.get('archivo_version', 'VERSION'))) else commit
out = os.path.join(AQUI, 'resultados', f'{datetime.date.today()}_{version}_{commit}'); os.makedirs(out, exist_ok=True)

hist_path = os.path.join(AQUI, 'resultados', 'historial.json')
hist = json.load(open(hist_path, encoding='utf-8')) if os.path.exists(hist_path) else []
prev = hist[-1] if hist else None
if prev: open(os.path.join(out, 'cambios_desde_ultima.diff'), 'w', encoding='utf-8').write(
    sh(f'git diff --stat {prev["commit"].split("+")[0]} -- {cfg.get("src", "src")}', work).stdout)

b = sh(cfg['build'], work); open(os.path.join(out, 'build.log'), 'w', encoding='utf-8').write(b.stdout + b.stderr)
py = sys.executable
sh(f'"{py}" "{AQUI}/auditor.py" "{work}" --json "{out}/estatica.json" --md "{out}/estatica.md"')
res = {'fecha': str(datetime.datetime.now())[:16], 'version': version, 'commit': commit, 'build_ok': b.returncode == 0}
est = json.load(open(f'{out}/estatica.json', encoding='utf-8'))
res['estatica'] = {k: v for k, v in est['global_'].items() if k != 'tamaños'}
res['avisos'] = {s: sum(1 for f in est['findings'] if f['sev'] == s) for s in ('crítica', 'alta', 'media')}
if '--sin-perfil' not in sys.argv and cfg.get('perfil'):
    for q in cfg['perfil'].get('calidades', ['media']):
        sh(f'"{py}" "{AQUI}/perfil.py" "{work}" {q} "{out}/perfil_{q}.json"')
        try:
            p = json.load(open(f'{out}/perfil_{q}.json', encoding='utf-8')); mm = p['memoria']
            res[f'perfil_{q}'] = {'arranque_ms': p['arranque_total_ms'], 'llamadas': p['inicio']['calls'], 'triangulos': p['inicio']['tris'],
                                  'heapMB': p['inicio']['heapMB'], 'programas': p['inicio']['programs'], 'logic_ms': p['logic_ms_por_paso'],
                                  'fuga_geometrias_vuelta': p['fugas']['geometrias_por_vuelta_(2a-3a)'],
                                  'fuga_texturas_vuelta': p['fugas']['texturas_por_vuelta_(2a-3a)'],
                                  'MB_geometria_RAM': mm['MB_geometria_en_RAM'], 'vertices': mm['vertices'], 'errores': p.get('errores_consola', [])}
        except Exception as e: res[f'perfil_{q}'] = {'error': str(e)}
if prev: res['anterior'] = {k: prev.get(k) for k in ('version', 'commit', 'avisos', 'perfil_media')}

# ---------- veredicto
def veredicto(res, prev):
    malo, aviso, bien = [], [], []
    if not res['build_ok']: malo.append('El build falla (ver build.log).')
    pm = res.get('perfil_media') or {}; pa = (prev or {}).get('perfil_media') or {}
    if 'error' in pm: malo.append('El juego no arrancó en la prueba: ' + pm['error'])
    if pm.get('errores'): malo.append(f"Errores de JavaScript en consola: {pm['errores'][:3]}")
    fg = sum(pm.get('fuga_geometrias_vuelta', [0])); ft = sum(pm.get('fuga_texturas_vuelta', [0]))
    if fg > 20 or ft > 20: aviso.append(f'Sigue habiendo fuga: +{fg} geometrías y +{ft} texturas en 2 vueltas (objetivo 0).')
    elif pm: bien.append('Sin fugas de geometrías/texturas al moverse por el mapa.')
    # comparación con la versión anterior: (clave, nombre, % que da aviso, % que suspende)
    for k, nom, av, ko in [('heapMB', 'memoria JS', 5, 15), ('MB_geometria_RAM', 'geometría en RAM', 5, 15),
                           ('vertices', 'vértices', 5, 20), ('llamadas', 'llamadas de dibujo', 15, 40),
                           ('programas', 'programas de shader', 10, 30), ('logic_ms', 'coste de lógica por paso', 15, 40)]:
        a, b = pa.get(k), pm.get(k)
        if not a or b is None: continue
        d = (b - a) / a * 100
        txt = f'{nom}: {a:,} → {b:,} ({d:+.0f} %)'
        if d >= ko: malo.append('Empeora mucho ' + txt)
        elif d >= av: aviso.append('Empeora ' + txt)
        elif d <= -av: bien.append('Mejora ' + txt)
    if pa:
        fa = sum(pa.get('fuga_geometrias_vuelta', [0]))
        if fg > fa * 1.2 + 10: malo.append(f'La fuga de geometrías empeora: {fa} → {fg}.')
    av_a, av_b = (prev or {}).get('avisos', {}), res['avisos']
    if av_a and av_b.get('crítica', 0) > av_a.get('crítica', 0): aviso.append(f"Más avisos críticos del análisis estático: {av_a.get('crítica')} → {av_b.get('crítica')} (ver estatica.md).")
    estado = 'NO APTO' if malo else 'APTO CON AVISOS' if aviso else 'APTO'
    L = [f"# Veredicto: {estado}", '', f"Versión {res['version']} ({res['commit']}) · {res['fecha']}" + (f" · comparada con {prev['version']}" if prev else ' · primera medición'), '']
    for t, xs in (('Bloquea la publicación', malo), ('Avisos', aviso), ('Mejoras', bien)):
        if xs: L += [f'## {t}', ''] + [f'- {x}' for x in xs] + ['']
    if pm and 'error' not in pm:
        L += ['## Métricas (calidad media)', '', '| Métrica | Anterior | Ahora |', '|---|---|---|']
        for k in ('heapMB', 'MB_geometria_RAM', 'vertices', 'triangulos', 'llamadas', 'programas', 'logic_ms', 'arranque_ms'):
            L.append(f"| {k} | {pa.get(k, '—')} | {pm.get(k, '—')} |")
    L += ['', 'NO APTO: arreglar antes de publicar. APTO CON AVISOS: se puede publicar; anotar los avisos en PENDIENTES.md.']
    return estado, '\n'.join(L)

estado, md = veredicto(res, prev); res['veredicto'] = estado
open(f'{out}/VEREDICTO.md', 'w', encoding='utf-8').write(md)
hist.append({k: v for k, v in res.items() if k != 'anterior'}); json.dump(hist, open(hist_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(res, open(f'{out}/resumen.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(md); print('\nResultados en', out)
sys.exit({'APTO': 0, 'APTO CON AVISOS': 1}.get(estado, 2))
