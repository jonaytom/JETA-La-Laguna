# Lint del juego (v0.77, auditoría P2.5 «módulos + lint»), sin Node: lo llama build.py y no para la compilación.
# El juego es un único módulo hecho juntando src/*.js, así que las dos cosas que más fallos dan son:
#  1) un nombre que se usa y no está declarado en ningún sitio (errata: «rifleUsabel», o una función que se borró);
#  2) un nombre declarado dos veces en el nivel superior de dos archivos (el navegador da SyntaxError y no carga nada).
# Uso: python tools/lint_js.py  → imprime «LINT: N avisos» y la lista (archivo:línea nombre). Sale 1 si hay duplicados.
import os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS_GLOBALS = set('''undefined NaN Infinity globalThis window document navigator location console performance localStorage sessionStorage
 Math JSON Date Object Array String Number Boolean Symbol BigInt Map Set WeakMap WeakSet Promise Proxy Reflect Error TypeError RangeError
 SyntaxError Intl RegExp Function ArrayBuffer DataView Float32Array Float64Array Int8Array Int16Array Int32Array Uint8Array Uint8ClampedArray
 Uint16Array Uint32Array parseInt parseFloat isNaN isFinite encodeURIComponent decodeURIComponent atob btoa setTimeout clearTimeout
 setInterval clearInterval requestAnimationFrame cancelAnimationFrame fetch Image Blob URL File FileReader HTMLCanvasElement OffscreenCanvas
 AudioContext webkitAudioContext SpeechSynthesisUtterance speechSynthesis matchMedia getComputedStyle innerWidth innerHeight devicePixelRatio
 alert confirm prompt structuredClone queueMicrotask TextDecoder TextEncoder Event CustomEvent KeyboardEvent MouseEvent PointerEvent
 ResizeObserver MutationObserver IntersectionObserver Worker crypto screen history caches indexedDB this arguments new typeof instanceof
 void delete in of let const var function class return if else for while do switch case default break continue try catch finally throw
 async await yield import export from as true false null super extends get set static debugger with THREE DATA'''.split())
KW = set('if else for while do switch case default break continue try catch finally throw return new typeof instanceof void delete in of let const var function class async await yield import export true false null this super extends static debugger with get set'.split())

def strip(src):
    """Blank out comments, strings and regex literals (template literals keep the code inside ${…})."""
    out = []; i = 0; n = len(src); prev = ''  # last significant char
    stack = []  # template nesting: brace depth at each ${
    depth = 0
    while i < n:
        c = src[i]
        if c == '/' and i + 1 < n and src[i + 1] == '/':
            j = src.find('\n', i); j = n if j < 0 else j; out.append(' ' * (j - i)); i = j; continue
        if c == '/' and i + 1 < n and src[i + 1] == '*':
            j = src.find('*/', i + 2); j = n if j < 0 else j + 2; out.append(re.sub(r'[^\n]', ' ', src[i:j])); i = j; continue
        if c in '"\'':
            j = i + 1
            while j < n and src[j] != c:
                if src[j] == '\\': j += 1
                if src[j] == '\n': break
                j += 1
            out.append(c + ' ' * (j - i - 1) + c); i = j + 1; prev = 'a'; continue
        if c == '`' or (c == '}' and stack and stack[-1] == depth - 1):
            if c == '}': stack.pop(); depth -= 1
            j = i + 1; buf = []
            while j < n and src[j] != '`':
                if src[j] == '\\': j += 2; buf.append('  '); continue
                if src[j] == '$' and j + 1 < n and src[j + 1] == '{': break
                buf.append('\n' if src[j] == '\n' else ' '); j += 1
            if j < n and src[j] == '$': out.append(' ' + ''.join(buf) + '${'); stack.append(depth); depth += 1; i = j + 2; continue
            out.append(' ' + ''.join(buf) + ' '); i = j + 1; prev = 'a'; continue
        if c == '/' and (prev in '(,=:[!&|?{};+-*%<>~^' or prev == '' or re.search(r'(return|typeof|case|in|of)\s*$', ''.join(out[-12:]))):
            j = i + 1; cls = False
            while j < n and (src[j] != '/' or cls):
                if src[j] == '\\': j += 1
                elif src[j] == '[': cls = True
                elif src[j] == ']': cls = False
                elif src[j] == '\n': break
                j += 1
            j += 1
            while j < n and src[j].isalpha(): j += 1
            out.append(' ' * (j - i)); i = j; prev = 'a'; continue
        if c == '{': depth += 1
        elif c == '}': depth -= 1
        out.append(c)
        if not c.isspace(): prev = c if not (c.isalnum() or c in '_$') else 'a'
        i += 1
    return ''.join(out)

def main():
    files = sorted(glob.glob(os.path.join(ROOT, 'src', '*.js')))
    code = {f: strip(open(f, encoding='utf-8').read()) for f in files}
    declared = set(); top = {}
    decl_re = re.compile(r'\b(?:function\*?|class|const|let|var)\s+([A-Za-z_$][\w$]*)')
    for f, s in code.items():
        for m in decl_re.finditer(s): declared.add(m.group(1))
        # destructuring and multiple declarators: const { a, b: c } = …, let a = 1, b = 2
        for m in re.finditer(r'\b(?:const|let|var)\s+([^;=]*?)=', s):
            for nm in re.findall(r'(?:^|[,{\[\s:])([A-Za-z_$][\w$]*)\s*(?=[,}\]=]|$)', m.group(1)): declared.add(nm)
        for m in re.finditer(r'\b(?:const|let|var)\s+', s):  # every declarator: let a, b = 1, { c, d: e } = o, [f, g] = h;
            j = m.end(); d0 = 0; part = ''; parts = []
            while j < len(s):
                ch = s[j]
                if ch in '([{': d0 += 1
                elif ch in ')]}':
                    if d0 == 0: break
                    d0 -= 1
                if d0 == 0 and ch in ';\n' and not part.strip().endswith(('=', ',', '&&', '||', '?', ':', '(')): parts.append(part); break
                if d0 == 0 and ch == ',': parts.append(part); part = ''
                else: part += ch
                j += 1
            else: parts.append(part)
            for pt in parts:
                lhs = pt.split('=', 1)[0] if not pt.lstrip().startswith(('{', '[')) else pt[:pt.find('=', max(pt.find('}'), pt.find(']')))] if '=' in pt else pt
                for nm in re.findall(r'([A-Za-z_$][\w$]*)', lhs): declared.add(nm)
        # parameters: function f(a, b = 1, {c, d}) / (a, b) => / a =>
        for m in re.finditer(r'(?:function\*?\s*[\w$]*\s*|\b[\w$]+\s*)\(([^()]*(?:\([^()]*\)[^()]*)*)\)\s*(?:=>|\{)', s):
            for nm in re.findall(r'(?:^|[,({\[\s])\.{0,3}([A-Za-z_$][\w$]*)\s*(?=[,)}\]=:]|$)', m.group(1)): declared.add(nm)
        for m in re.finditer(r'\(([^()]*)\)\s*=>', s):
            for nm in re.findall(r'([A-Za-z_$][\w$]*)', m.group(1)): declared.add(nm)
        for m in re.finditer(r'([A-Za-z_$][\w$]*)\s*=>', s): declared.add(m.group(1))
        for m in re.finditer(r'\bcatch\s*\(\s*([A-Za-z_$][\w$]*)', s): declared.add(m.group(1))
        for m in re.finditer(r'\bfor\s*\(\s*(?:const|let|var)\s*\[?\{?([^;]*?)\b(?:of|in)\b', s):
            for nm in re.findall(r'([A-Za-z_$][\w$]*)', m.group(1)): declared.add(nm)
        # top level only (brace depth 0): duplicates across files break the whole game
        d = 0; i = 0
        for line_no, line in enumerate(s.split('\n'), 1):
            if d == 0:
                m = re.match(r'\s*(?:function\*?|class|const|let|var)\s+([A-Za-z_$][\w$]*)', line)
                if m: top.setdefault(m.group(1), []).append((os.path.basename(f), line_no))
            d += line.count('{') - line.count('}')
    dup = {k: v for k, v in top.items() if len(v) > 1}
    avisos = []
    for f, s in code.items():
        for line_no, line in enumerate(s.split('\n'), 1):
            for m in re.finditer(r'(?<![\w$.])([A-Za-z_$][\w$]*)(?![\w$])', line):
                nm = m.group(1); after = line[m.end():].lstrip()
                if nm in declared or nm in JS_GLOBALS or nm in KW: continue
                if after.startswith(':') and not after.startswith('::') and re.search(r'[{,]\s*$', line[:m.start()]): continue  # object key
                if re.search(r'\?\s*$', line[:m.start()]) is None and after.startswith(':') and re.search(r'[{,(]\s*$', line[:m.start()]): continue
                if line[:m.start()].rstrip().endswith('?.'): continue
                if re.search(r'\b(break|continue)\s+$', line[:m.start()]): continue  # a label
                if after.startswith(':') and not line[:m.start()].strip(): continue  # key at the start of a line
                if re.match(r'\([^()]*\)\s*\{', after) and re.search(r'(^|[{,;]|\bget|\bset|\bstatic|\basync)\s*$', line[:m.start()]): continue  # method definition
                avisos.append((os.path.basename(f), line_no, nm))
    seen = set(); uniq = []
    for a in avisos:
        if (a[0], a[2]) in seen: continue
        seen.add((a[0], a[2])); uniq.append(a)
    print(f'LINT: {len(uniq)} nombres sin declarar, {len(dup)} declarados dos veces')
    for f, l, nm in uniq[:80]: print(f'  sin declarar  {f}:{l}  {nm}')
    for k, v in dup.items(): print('  DOS VECES    ', k, ' / '.join(f'{a}:{b}' for a, b in v))
    return 1 if dup else 0

if __name__ == '__main__': sys.exit(main())
