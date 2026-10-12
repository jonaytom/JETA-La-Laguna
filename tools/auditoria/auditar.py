#!/usr/bin/env python3
"""Lanzador de la auditoría completa de un proyecto (por defecto JETA La Laguna).

Uso:  python auditar.py [config.json] [--repo RUTA] [--resultados RUTA] [--sin-perfil]
  --resultados RUTA  carpeta del historial.json y de los resultados. Recomendado pasarla SIEMPRE. Si no se pasa:
                     ../resultados si este archivo está en una carpeta llamada 'herramientas', si no ./resultados.
                     Si ahí no hay historial.json, se para con un error (código 3) en vez de comparar con nada.
  --primera          permite medir sin historial (solo para un proyecto nuevo).
  --repo RUTA   audita una copia local (p. ej. el propio repositorio del juego) en vez de clonar de GitHub.
  --copiar      con --repo: copia el juego a una carpeta de trabajo antes de construirlo (no toca la carpeta original).
  --gpu         mide con la tarjeta gráfica real (PC de referencia). Usar con su propio --resultados (p. ej.
                resultados_pc): solo se compara con mediciones del mismo modo y la misma tarjeta.
  1. Clona o actualiza el repositorio indicado en la configuración (o usa --repo).
  2. Construye el juego (comando 'build').
  3. Perfil dinámico con memoria, origen de fugas y mapa (edificios en la calzada) (perfil.py) + auditoría estática.
  4. Compara con la última auditoría guardada (historial.json) y escribe resultados/<fecha>_<commit>/.
  5. Da un VEREDICTO (APTO / APTO CON AVISOS / NO APTO) comparando con la versión anterior -> VEREDICTO.md.
     Código de salida: 0 apto, 1 apto con avisos, 2 no apto, 3 falta el historial.
El informe final con recomendaciones lo redacta Claude leyendo estos resultados y el código cambiado.
"""
import json, os, subprocess, sys, datetime, shutil

AQUI = os.path.dirname(os.path.abspath(__file__))
cfg_path = next((a for a in sys.argv[1:] if a.endswith('.json')), os.path.join(AQUI, 'proyectos', 'jeta.json'))
cfg = json.load(open(cfg_path, encoding='utf-8'))
sh = lambda c, cwd=None: subprocess.run(c, cwd=cwd, shell=True, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=1800)
GPU = '--gpu' in sys.argv; MODO = 'gpu' if GPU else 'software'
if '--repo' in sys.argv:
    work = os.path.abspath(sys.argv[sys.argv.index('--repo') + 1])
    if '--copiar' in sys.argv:  # construir en una copia: la carpeta del juego no se toca aunque el programador esté trabajando
        copia = os.path.join(os.path.dirname(AQUI), 'trabajo', 'copia_juego')
        shutil.rmtree(copia, ignore_errors=True)
        shutil.copytree(work, copia, ignore=shutil.ignore_patterns('.git', 'docs', 'reportes', 'dist', 'tests', 'scripts', 'node_modules', '*.zip'))
        work = copia
else:
    work = os.path.join(AQUI, 'trabajo', cfg['nombre']); os.makedirs(os.path.dirname(work), exist_ok=True)
    if os.path.isdir(os.path.join(work, '.git')): sh('git pull -q', work)
    else: sh(f'git clone -q {cfg["repo"]} "{work}"')
commit = sh('git log -1 --format=%h', work).stdout.strip() or 'local'
if sh('git status --porcelain -- src', work).stdout.strip(): commit += '+cambios'

version = open(os.path.join(work, cfg.get('archivo_version', 'VERSION'))).read().strip() if os.path.exists(os.path.join(work, cfg.get('archivo_version', 'VERSION'))) else commit
# carpeta de resultados: --resultados RUTA; si no, la de al lado de herramientas/ (RevisordeCodigo/resultados), para que
# los resultados y el historial siempre caigan en el mismo sitio aunque se lance desde herramientas/
if '--resultados' in sys.argv: RES = os.path.abspath(sys.argv[sys.argv.index('--resultados') + 1])
elif os.path.basename(AQUI) == 'herramientas': RES = os.path.join(os.path.dirname(AQUI), 'resultados')
else: RES = os.path.join(AQUI, 'resultados')
out = os.path.join(RES, f'{datetime.date.today()}_{version}_{commit}'); os.makedirs(out, exist_ok=True)
print('Resultados e historial en:', RES)

hist_path = os.path.join(RES, 'historial.json')
if not os.path.exists(hist_path) and '--primera' not in sys.argv:
    # sin línea base la pasada no compara nada: mejor parar y decir dónde se buscó que dar un veredicto engañoso
    print(f'ERROR: no hay historial en {hist_path}.\n'
          f'Copia ahí RevisordeCodigo/resultados/historial.json o indica la carpeta con --resultados RUTA.\n'
          f'(Solo para la primera medición de un proyecto nuevo: --primera)')
    sys.exit(3)
hist = json.load(open(hist_path, encoding='utf-8')) if os.path.exists(hist_path) else []
prev = hist[-1] if hist else None
# para memoria/fugas se compara con la última medición COMPLETA (una pasada --sin-perfil no tiene esos datos)
prevp = next((h for h in reversed(hist) if h.get('perfil_media') and 'error' not in h['perfil_media']
              and h['perfil_media'].get('modo', 'software') == MODO), None)
if prev: open(os.path.join(out, 'cambios_desde_ultima.diff'), 'w', encoding='utf-8').write(
    sh(f'git diff --stat {prev["commit"].split("+")[0]} -- {cfg.get("src", "src")}', work).stdout)

bcmd = cfg['build']
if bcmd.startswith('python '): bcmd = f'"{sys.executable}" ' + bcmd[len('python '):]
print('Construyendo el juego…', flush=True)
b = sh(bcmd, work); open(os.path.join(out, 'build.log'), 'w', encoding='utf-8').write(b.stdout + b.stderr)
py = sys.executable
res = {'fecha': str(datetime.datetime.now())[:16], 'version': version, 'commit': commit, 'build_ok': b.returncode == 0}
MAPA_LISTA = []
if '--sin-perfil' not in sys.argv and cfg.get('perfil') and b.returncode == 0:
    for q in cfg['perfil'].get('calidades', ['media']):
        print('Midiendo el juego (perfil, memoria, mapa y fugas)…', flush=True)
        subprocess.run(f'"{py}" "{AQUI}/perfil.py" "{work}" {q} "{out}/perfil_{q}.json"' + (' --gpu' if GPU else ''), shell=True, timeout=3600)  # progreso a la vista
        try:
            p = json.load(open(f'{out}/perfil_{q}.json', encoding='utf-8')); mm = p['memoria']
            res[f'perfil_{q}'] = {'arranque_ms': p['arranque_total_ms'], 'llamadas': p['inicio']['calls'], 'triangulos': p['inicio']['tris'],
                                  'heapMB': p['inicio']['heapMB'], 'programas': p['inicio']['programs'], 'logic_ms': p['logic_ms_por_paso'],
                                  'fuga_geometrias_vuelta': p['fugas']['geometrias_por_vuelta_(2a-3a)'],
                                  'fuga_texturas_vuelta': p['fugas']['texturas_por_vuelta_(2a-3a)'],
                                  'fuga_origen': (p['fugas'].get('origen') or {}).get('por_origen', [])[:5],
                                  'fuga_trazada': (p['fugas'].get('origen') or {}).get('geometrias_fuera_de_escena_sin_liberar'),
                                  'MB_geometria_RAM': mm['MB_geometria_en_RAM'], 'vertices': mm['vertices'], 'errores': p.get('errores_consola', []),
                                  'modo': p.get('modo', 'software'), 'gpu': p.get('gpu'), 'pintar_ms_720p': p.get('pintar_ms_720p')}
            mp = p.get('mapa') or {}
            if 'lista' in mp:
                ch = [o for o in mp['lista'] if o['problema'] == 'choque']
                res['mapa'] = {k: mp[k] for k in ('choques', 'criticas', 'altas', 'medias', 'choques_en_principales', 'visuales')}
                res['mapa']['claves'] = sorted({o['clave'] for o in ch})
                MAPA_LISTA = mp['lista']
                # informe del mapa con las peores invasiones y sus capturas
                L = ['# Mapa: edificios que invaden la calzada', '', f"Versión {version}. Choques posibles (hay muro dentro del carril): **{mp['choques']}** "
                     f"(críticas {mp['criticas']}, altas {mp['altas']}, medias {mp['medias']}; en calles principales {mp['choques_en_principales']}). "
                     f"Solapes visuales sin muro (el coche atraviesa el edificio): {mp['visuales']}.", '',
                     'Crítica = el edificio corta el eje de la calle; alta = invade ≥ 1,5 m; media = 1–1,5 m. Coordenadas X/Z del juego '
                     '(teletransporte desde el mapa con T). Capturas en `capturas_mapa/` (poste rojo = punto de mayor invasión).', '',
                     '| # | Gravedad | X | Z | Invade (m) | Tramo (m) | Calle | Tipo | Edificio | Captura |', '|---|---|---|---|---|---|---|---|---|---|']
                for i, o in enumerate(mp['lista'][:60]):
                    L.append(f"| {i+1} | {o['sev']} | {o['x']} | {o['z']} | {o['invasion_m']} | {o['tramo_m']} | {o['calle']} | {o['tipo']} | {o['edificio']} | {o.get('captura', '')} |")
                open(f'{out}/mapa.md', 'w', encoding='utf-8').write('\n'.join(L))
                json.dump(mp, open(f'{out}/mapa.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
            elif mp: res['mapa'] = {'error': mp.get('error')}
        except Exception as e: res[f'perfil_{q}'] = {'error': str(e)}
# el análisis estático va después (segundos): en paralelo falsearía los tiempos del perfil con solo 2 núcleos
subprocess.run([py, os.path.join(AQUI, 'auditor.py'), work, '--json', f'{out}/estatica.json', '--md', f'{out}/estatica.md'],
               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
est = json.load(open(f'{out}/estatica.json', encoding='utf-8'))
res['estatica'] = {k: v for k, v in est['global_'].items() if k != 'tamaños'}
res['avisos'] = {s: sum(1 for f in est['findings'] if f['sev'] == s) for s in ('crítica', 'alta', 'media')}
res['firmas'] = sorted({f['firma'] for f in est['findings'] if f['sev'] in ('crítica', 'alta') and f.get('firma')})
FIND = {f.get('firma'): f for f in est['findings']}
if prev: res['anterior'] = {k: prev.get(k) for k in ('version', 'commit', 'avisos', 'perfil_media')}

# ---------- veredicto
def veredicto(res, prev):
    malo, aviso, bien = [], [], []
    if not res['build_ok']: malo.append('El build falla (ver build.log).')
    pm = res.get('perfil_media') or {}; pa = (prevp or {}).get('perfil_media') or {}
    if 'error' in pm: malo.append('El juego no arrancó en la prueba: ' + pm['error'])
    if pm.get('errores'): malo.append(f"Errores de JavaScript en consola: {pm['errores'][:3]}")
    fg = sum(pm.get('fuga_geometrias_vuelta', [0])); ft = sum(pm.get('fuga_texturas_vuelta', [0]))
    fz = pm.get('fuga_trazada')  # geometrías creadas en las vueltas 2ª-3ª que ni están en la escena ni se liberaron
    hay_fuga = (fz if fz is not None else fg) > 20 or ft > 20
    if hay_fuga: aviso.append(f'Sigue habiendo fuga: {fz if fz is not None else fg} geometrías sin liberar tras pasear (GPU: +{fg} geometrías, +{ft} texturas en 2 vueltas; objetivo 0).')
    elif pm: bien.append('Sin fugas de geometrías/texturas al moverse por el mapa.')
    # comparación con la versión anterior: (clave, nombre, % que da aviso, % que suspende)
    for k, nom, av, ko in [('heapMB', 'memoria JS', 5, 15), ('MB_geometria_RAM', 'geometría en RAM', 5, 15),
                           ('vertices', 'vértices', 5, 20), ('llamadas', 'llamadas de dibujo', 15, 40),
                           ('programas', 'programas de shader', 10, 30)]:  # logic_ms y arranque_ms solo informativos (tiempos ruidosos)
        a, b = pa.get(k), pm.get(k)
        if not a or b is None: continue
        d = (b - a) / a * 100
        txt = f'{nom}: {a:,} → {b:,} ({d:+.0f} %)'
        if d >= ko: malo.append('Empeora mucho ' + txt)
        elif d >= av: aviso.append('Empeora ' + txt)
        elif d <= -av: bien.append('Mejora ' + txt)
    if MODO == 'gpu' and pm.get('pintar_ms_720p') and pa.get('pintar_ms_720p'):
        a0, b0 = pa['pintar_ms_720p'], pm['pintar_ms_720p']; d = (b0 - a0) / a0 * 100
        if pa.get('gpu') != pm.get('gpu'): aviso.append(f"Otra tarjeta gráfica que la de la medición anterior ({pa.get('gpu')} → {pm.get('gpu')}): el tiempo de pintado no es comparable.")
        elif d >= 20: aviso.append(f'Pintar un fotograma (1280x720) tarda más: {a0} → {b0} ms ({d:+.0f} %).')
        elif d <= -20: bien.append(f'Pintar un fotograma (1280x720) tarda menos: {a0} → {b0} ms ({d:+.0f} %).')
    if pa and fz is not None and pa.get('fuga_trazada') is not None:
        fa = pa['fuga_trazada']
        if fz > fa * 1.2 + 20: malo.append(f'La fuga empeora: {fa} → {fz} geometrías sin liberar.')
        elif fz < fa * 0.8 - 20: bien.append(f'La fuga mejora: {fa} → {fz} geometrías sin liberar.')
    if pm.get('fuga_origen') and hay_fuga:
        aviso.append('Origen probable de la fuga (función que creó lo que no se liberó): ' + '; '.join(f'{o} ×{n}' for o, n in pm['fuga_origen'][:3]))
    if prev and prev.get('firmas') is not None:
        nuevas = [f for f in res['firmas'] if f not in set(prev['firmas'])]
        if nuevas:
            det = [FIND[f] for f in nuevas if f in FIND][:5]
            aviso.append(f'{len(nuevas)} avisos nuevos (crítica/alta) del análisis estático, p. ej.: ' + '; '.join(f"`{d['file']}:{d['line']}` {d['func']}() {d['id']}" for d in det))
        else: bien.append('Ningún aviso nuevo de severidad crítica/alta en el código que corre cada fotograma.')
    # ---- mapa: edificios en la calzada. Solo cuenta lo NUEVO respecto a la última medición con mapa.
    mp = res.get('mapa') or {}
    if 'claves' in mp:
        pmap = next((h.get('mapa') for h in reversed(hist) if (h.get('mapa') or {}).get('claves') is not None), None)
        if pmap is None:
            aviso.append(f"Mapa (primera medición): {mp['choques']} sitios donde un edificio invade la calzada con muro "
                         f"({mp['criticas']} cortan la calle, {mp['choques_en_principales']} en calles principales). Lista y capturas en mapa.md.")
        else:
            antes = set(pmap['claves']); nuevos = [o for o in MAPA_LISTA if o['problema'] == 'choque' and o['clave'] not in antes]
            arreglados = len(antes - set(mp['claves']))
            if nuevos:
                graves = [o for o in nuevos if o['sev'] == 'crítica' and o['principal']]
                txt = '; '.join(f"{o['calle']} (X {o['x']}, Z {o['z']}, {o['invasion_m']} m)" for o in nuevos[:5])
                (malo if graves else aviso).append(f"Mapa: {len(nuevos)} edificios nuevos invadiendo la calzada"
                    + (f", {len(graves)} cortan una calle principal" if graves else '') + f": {txt}. Ver mapa.md.")
            else: bien.append('Mapa: ningún edificio nuevo invadiendo la calzada.')
            if arreglados: bien.append(f'Mapa: {arreglados} invasiones de la versión anterior ya no aparecen.')
    elif mp.get('error'): aviso.append('No se pudo hacer la comprobación del mapa: ' + str(mp['error']))
    estado = 'NO APTO' if malo else 'APTO CON AVISOS' if aviso else 'APTO'
    L = [f"# Veredicto: {estado}", '', f"Versión {res['version']} ({res['commit']}) · {res['fecha']}" + (f" · comparada con {prev['version']}" if prev else ' · primera medición') + (f" (memoria y fugas: con {prevp['version']})" if prevp and prevp is not prev else ''), '']
    for t, xs in (('Bloquea la publicación', malo), ('Avisos', aviso), ('Mejoras', bien)):
        if xs: L += [f'## {t}', ''] + [f'- {x}' for x in xs] + ['']
    if pm and 'error' not in pm:
        L += ['## Métricas (calidad media)', '', f"Modo: {pm.get('modo', 'software')}" + (f" · tarjeta: {pm.get('gpu')}" if pm.get('gpu') else ''), '', '| Métrica | Anterior | Ahora |', '|---|---|---|']
        for k in ('heapMB', 'MB_geometria_RAM', 'vertices', 'triangulos', 'llamadas', 'programas', 'fuga_trazada', 'pintar_ms_720p', 'logic_ms', 'arranque_ms'):
            L.append(f"| {k} | {pa.get(k, '—')} | {pm.get(k, '—')} |")
    L += ['', 'NO APTO: arreglar antes de publicar. APTO CON AVISOS: se puede publicar; anotar los avisos en PENDIENTES.md.']
    return estado, '\n'.join(L)

estado, md = veredicto(res, prev); res['veredicto'] = estado
open(f'{out}/VEREDICTO.md', 'w', encoding='utf-8').write(md)
hist.append({k: v for k, v in res.items() if k != 'anterior'}); json.dump(hist, open(hist_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(res, open(f'{out}/resumen.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(md); print('\nResultados en', out)
sys.exit({'APTO': 0, 'APTO CON AVISOS': 1}.get(estado, 2))
