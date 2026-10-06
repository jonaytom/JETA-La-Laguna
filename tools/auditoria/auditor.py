#!/usr/bin/env python3
"""Auditor estático de rendimiento para juegos JS/Three.js (pensado para JETA La Laguna).

Uso:  python auditor.py <carpeta_repo> [--json salida.json] [--md salida.md]

Qué hace (solo biblioteca estándar, sin ejecutar el juego):
  1. Localiza las funciones de todos los src/*.js (function X, X(){ métodos, const X = () =>).
  2. Construye un grafo de llamadas aproximado (por nombre) y marca como "calientes" las funciones
     alcanzables desde el bucle (loop/logic/render) -> se ejecutan cada fotograma.
  3. Busca en las funciones calientes patrones caros: reservas de memoria por fotograma (new THREE.*,
     .clone(), arrays/objetos literales, map/filter/find), acceso al DOM, JSON, localStorage, etc.
  4. Métricas globales: materiales y geometrías creados, dispose, tamaños de datos y del HTML final.
Es heurístico: cada aviso hay que confirmarlo leyendo el código (el informe da archivo:línea).
"""
import json, os, re, sys, glob
from collections import defaultdict

ROOTS = ['loop', 'logic', 'render']
HOT_NAME = re.compile(r'^(update\w*|tick|step|physics|sync|animate\w*|loop|logic|render|adaptRes)$')

PATTERNS = [  # (id, regex, severidad, explicación)
    ('alloc-three', r'new THREE\.(Vector[234]|Color|Quaternion|Matrix[34]|Euler|Box3|Sphere|Ray|Raycaster)\b', 'alta',
     'Reserva un objeto matemático cada fotograma -> basura para el GC y tirones. Reutilizar un temporal a nivel de módulo.'),
    ('alloc-geo', r'new THREE\.\w*(Geometry|Material|Mesh|Texture)\b', 'crítica',
     'Crea geometría/material/textura en código que corre cada fotograma: memoria de GPU y compilación de shaders.'),
    ('clone', r'\.clone\(\)', 'media', 'clone() reserva memoria. Usar .copy() sobre un temporal.'),
    ('array-fn', r'\.(map|filter|reduce|flatMap|sort)\(', 'media',
     'Crea arrays nuevos por fotograma. En bucles calientes, usar for clásico sobre arrays preasignados.'),
    ('find', r'\.(find|findIndex|some|every|includes|indexOf)\(', 'baja',
     'Búsqueda lineal; si se repite cada fotograma sobre listas grandes, usar Map/Set o rejilla espacial.'),
    ('spread', r'\.\.\.\w', 'baja', 'Spread crea arrays/objetos nuevos.'),
    ('dom-query', r'(getElementById|querySelector(All)?|\$\()\s*\(?', 'media',
     'Consulta al DOM; cachear el elemento una vez al arrancar.'),
    ('dom-write', r'\.(innerHTML|textContent|innerText)\s*=|\.style\.\w+\s*=', 'media',
     'Escribir en el DOM provoca recálculo de estilo/layout. Escribir solo si el valor cambió.'),
    ('json', r'JSON\.(parse|stringify)', 'alta', 'JSON por fotograma es muy caro.'),
    ('storage', r'localStorage\.(get|set)Item', 'alta', 'localStorage es síncrono (bloquea el hilo).'),
    ('canvas-read', r'(toDataURL|getImageData)\(', 'alta', 'Lee píxeles de la GPU/canvas: bloquea.'),
    ('log', r'console\.(log|warn)\(', 'baja', 'console.log en caliente ralentiza con DevTools abiertas.'),
    ('closure', r'=>\s*[{(]?', 'baja', 'Función flecha creada por fotograma (cierre nuevo cada vez).'),
    ('hypot', r'Math\.hypot\(', 'baja',
     'Math.hypot es más lento que Math.sqrt(dx*dx+dz*dz); para comparar distancias usar el cuadrado.'),
    ('trycatch', r'\btry\s*\{', 'baja', 'try/catch en caliente puede impedir optimizaciones y oculta errores repetidos.'),
]
SEV_ORDER = {'crítica': 0, 'alta': 1, 'media': 2, 'baja': 3}

FUNC_DEF = [
    re.compile(r'\bfunction\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{'),
    re.compile(r'\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>\s*\{'),
    re.compile(r'(?:^|[,{\s])([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{', re.M),  # métodos de objeto/clase
]
KEYWORDS = {'if', 'for', 'while', 'switch', 'catch', 'function', 'return', 'else', 'do', 'with', 'new', 'typeof'}


def strip_strings(src):
    """Sustituye el contenido de strings/comentarios por espacios para no confundir llaves."""
    out, i, n = list(src), 0, len(src)
    while i < n:
        c = src[i]
        if c == '/' and i + 1 < n and src[i + 1] == '/':
            j = src.find('\n', i); j = n if j < 0 else j
            for k in range(i, j): out[k] = ' '
            i = j
        elif c == '/' and i + 1 < n and src[i + 1] == '*':
            j = src.find('*/', i + 2); j = n if j < 0 else j + 2
            for k in range(i, j):
                if out[k] != '\n': out[k] = ' '
            i = j
        elif c in '"\'`':
            j = i + 1
            while j < n and src[j] != c:
                if src[j] == '\\': j += 1
                j += 1
            for k in range(i + 1, min(j, n)):
                if out[k] != '\n': out[k] = ' '
            i = j + 1
        else:
            i += 1
    return ''.join(out)


def match_brace(s, i):
    d = 0
    for j in range(i, len(s)):
        if s[j] == '{': d += 1
        elif s[j] == '}':
            d -= 1
            if d == 0: return j
    return len(s) - 1


def collect(repo):
    files = sorted(glob.glob(os.path.join(repo, 'src', '*.js')))
    funcs = []  # dict(name,file,start,end,body,line)
    for f in files:
        raw = open(f, encoding='utf-8').read(); s = strip_strings(raw)
        seen = set()
        for rx in FUNC_DEF:
            for m in rx.finditer(s):
                name = m.group(1)
                if name in KEYWORDS: continue
                b = s.find('{', m.end() - 1)
                if b in seen: continue
                seen.add(b); e = match_brace(s, b)
                funcs.append(dict(name=name, file=os.path.basename(f), start=b, end=e,
                                  line=s.count('\n', 0, b) + 1, body=s[b:e + 1], raw=raw))
    return files, funcs


def hot_set(funcs):
    by_name = defaultdict(list)
    for fn in funcs: by_name[fn['name']].append(fn)
    names = set(by_name)
    calls = {}
    for fn in funcs:
        ids = set(re.findall(r'([A-Za-z_$][\w$]*)\s*\(', fn['body'])) & names
        ids |= set(re.findall(r'\.([A-Za-z_$][\w$]*)\s*\(', fn['body'])) & names
        calls[id(fn)] = ids
    hot, stack = set(), [n for n in ROOTS if n in names]
    while stack:
        n = stack.pop()
        if n in hot: continue
        hot.add(n)
        for fn in by_name[n]: stack.extend(calls[id(fn)] - hot)
    # nombres típicos de actualización aunque no los alcance el grafo (métodos de objetos: AUDIO.update...)
    hot |= {n for n in names if HOT_NAME.match(n)}
    return hot


def scan(repo):
    files, funcs = collect(repo)
    hot = hot_set(funcs)
    findings = []
    hot_funcs = [fn for fn in funcs if fn['name'] in hot]
    # evitar contar dos veces funciones anidadas: quedarse con el cuerpo más interno por posición
    for fn in hot_funcs:
        body = fn['body']; base = fn['start']; raw = fn['raw']
        if len(body) > 60000: continue  # constructores gigantes mal detectados
        for pid, rx, sev, why in PATTERNS:
            for m in re.finditer(rx, body):
                pos = base + m.start(); line = raw.count('\n', 0, pos) + 1
                snippet = raw.splitlines()[line - 1].strip()
                col = pos - (raw.rfind('\n', 0, pos) + 1)
                snippet = snippet[max(0, col - 60): col + 80] if len(snippet) > 160 else snippet
                findings.append(dict(id=pid, sev=sev, file=fn['file'], line=line, func=fn['name'], why=why, code=snippet))
    # dedup (misma línea+patrón)
    uniq = {}
    for f in findings: uniq.setdefault((f['file'], f['line'], f['id']), f)
    findings = sorted(uniq.values(), key=lambda f: (SEV_ORDER[f['sev']], f['file'], f['line']))

    # métricas globales
    allsrc = '\n'.join(open(f, encoding='utf-8').read() for f in files)
    g = {}
    g['archivos_js'] = len(files)
    g['bytes_js'] = len(allsrc.encode())
    g['lineas_js'] = allsrc.count('\n')
    g['lineas_mas_de_300_car'] = sum(1 for l in allsrc.splitlines() if len(l) > 300)
    for k in ['MeshStandardMaterial', 'MeshBasicMaterial', 'MeshLambertMaterial', 'ShaderMaterial', 'InstancedMesh',
              'BufferGeometry', 'CanvasTexture', 'PointLight', 'SpotLight']:
        g['new ' + k] = len(re.findall(r'new THREE\.' + k + r'\b', allsrc))
    g['dispose()'] = allsrc.count('.dispose(')
    g['mergeGeometries'] = len(re.findall(r'merge\w*Geometr', allsrc))
    g['funciones'] = len(funcs); g['funciones_calientes'] = len(hot_funcs)
    sizes = {}
    for pat in ['data/*.json', 'data/*.js', 'assets/**/*', 'dist/*.html', 'template.html']:
        for p in glob.glob(os.path.join(repo, pat), recursive=True):
            if os.path.isfile(p): sizes[os.path.relpath(p, repo)] = os.path.getsize(p)
    g['tamaños'] = dict(sorted(sizes.items(), key=lambda x: -x[1]))
    per_file = defaultdict(lambda: defaultdict(int))
    for f in findings: per_file[f['file']][f['sev']] += 1
    return dict(global_=g, findings=findings, hot=sorted(hot), per_file={k: dict(v) for k, v in per_file.items()})


def to_md(res, limit=400):
    g = res['global_']; L = ['# Auditoría estática automática', '']
    L.append('## Métricas globales'); L.append('')
    for k, v in g.items():
        if k != 'tamaños': L.append(f'- **{k}**: {v:,}' if isinstance(v, int) else f'- **{k}**: {v}')
    L.append(''); L.append('### Tamaños (bytes)'); L.append('')
    for k, v in list(g['tamaños'].items())[:20]: L.append(f'- `{k}`: {v/1e6:.2f} MB')
    L.append(''); L.append('## Avisos por archivo (solo funciones que corren cada fotograma)'); L.append('')
    L.append('| Archivo | crítica | alta | media | baja |'); L.append('|---|---|---|---|---|')
    for f, d in sorted(res['per_file'].items(), key=lambda x: -(x[1].get('crítica', 0) * 100 + x[1].get('alta', 0) * 10 + x[1].get('media', 0))):
        L.append(f"| {f} | {d.get('crítica',0)} | {d.get('alta',0)} | {d.get('media',0)} | {d.get('baja',0)} |")
    L.append(''); L.append('## Detalle'); L.append('')
    for f in res['findings'][:limit]:
        if f['sev'] == 'baja': continue
        L.append(f"- [{f['sev']}] `{f['file']}:{f['line']}` en `{f['func']}()` — {f['id']}: {f['why']}  \n  `{f['code'][:150]}`")
    return '\n'.join(L)


if __name__ == '__main__':
    if len(sys.argv) < 2: print(__doc__); sys.exit(1)
    res = scan(sys.argv[1])
    args = sys.argv[2:]
    if '--json' in args: json.dump(res, open(args[args.index('--json') + 1], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    md = to_md(res)
    if '--md' in args: open(args[args.index('--md') + 1], 'w', encoding='utf-8').write(md)
    else: print(md)
