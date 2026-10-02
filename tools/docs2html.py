"""Genera dist/Documentacion tecnica.html: README + docs/*.md en una sola página para leer sin conexión.
Uso: python tools/docs2html.py   (también lo llama build.py)."""
import os, re, glob, html
import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def build(out=None):
    out = out or os.path.join(ROOT, 'dist', 'Documentacion tecnica.html')
    files = [os.path.join(ROOT, 'README.md')] + sorted(glob.glob(os.path.join(ROOT, 'docs', '*.md'))) \
        + [os.path.join(ROOT, 'CHANGELOG.md')]
    ver = open(os.path.join(ROOT, 'VERSION'), encoding='utf-8').read().strip()
    nav, secs = [], []
    for i, f in enumerate(files):
        if not os.path.exists(f):
            continue
        txt = open(f, encoding='utf-8-sig').read()
        m = re.search(r'^#\s+(.+)$', txt, re.M)
        title = m.group(1).strip() if m else os.path.basename(f)
        sid = 's%d' % i
        body = markdown.markdown(txt, extensions=['tables', 'fenced_code', 'sane_lists'])
        # enlaces entre documentos -> anclas internas
        for j, g in enumerate(files):
            body = body.replace('href="%s"' % os.path.basename(g), 'href="#s%d"' % j)
            body = body.replace('href="docs/%s"' % os.path.basename(g), 'href="#s%d"' % j)
        nav.append('<a href="#%s">%s</a>' % (sid, re.sub(r'`([^`]+)`', r'\1', html.escape(title))))
        secs.append('<section id="%s"><div class="src">%s</div>%s</section>' % (
            sid, html.escape(os.path.relpath(f, ROOT).replace('\\', '/')), body))
    page = TEMPLATE.replace('{{VER}}', ver).replace('{{NAV}}', '\n'.join(nav)).replace('{{BODY}}', '\n'.join(secs))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(page)
    return out


TEMPLATE = r'''<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>JETA La Laguna — Documentación técnica</title>
<style>
:root{--bg:#fbf8f3;--panel:#f1ebe1;--ink:#2a2622;--mut:#76695c;--acc:#c0502a;--line:#e0d6c8;--code:#efe8dc}
@media (prefers-color-scheme:dark){:root{--bg:#1b1917;--panel:#23201d;--ink:#ece6dd;--mut:#a59a8c;--acc:#f08a5d;--line:#3a352f;--code:#2b2723}}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
nav{position:fixed;top:0;left:0;bottom:0;width:270px;overflow:auto;background:var(--panel);border-right:1px solid var(--line);padding:20px 14px}
nav h1{font-size:17px;margin:0 0 2px}nav .v{color:var(--mut);font-size:13px;margin-bottom:14px}
nav a{display:block;color:var(--ink);text-decoration:none;padding:6px 10px;border-radius:6px;font-size:14px}
nav a:hover,nav a.on{background:var(--bg);color:var(--acc)}
main{margin-left:270px;padding:24px 48px 80px;max-width:1000px}
section{border-bottom:1px solid var(--line);padding:16px 0 32px}
.src{font:12px ui-monospace,Consolas,monospace;color:var(--mut)}
h1,h2,h3{line-height:1.25}h1{font-size:28px}h2{font-size:21px;margin-top:28px}h3{font-size:17px}
a{color:var(--acc)}
code{font:13.5px ui-monospace,Consolas,monospace;background:var(--code);padding:1px 5px;border-radius:4px}
pre{background:var(--code);padding:12px 14px;border-radius:8px;overflow:auto}pre code{padding:0;background:none}
table{border-collapse:collapse;width:100%;font-size:14px;display:block;overflow-x:auto}
th,td{border:1px solid var(--line);padding:6px 9px;text-align:left;vertical-align:top}th{background:var(--panel)}
blockquote{margin:0;padding:6px 14px;border-left:4px solid var(--acc);background:var(--panel);border-radius:0 6px 6px 0}
#menu{display:none}
@media (max-width:820px){nav{transform:translateX(-100%);transition:.2s;z-index:5}nav.open{transform:none}
main{margin:0;padding:56px 16px 60px}#menu{display:block;position:fixed;top:10px;left:10px;z-index:6;
background:var(--acc);color:#fff;border:0;border-radius:8px;padding:8px 12px;font-size:15px}}
</style></head><body>
<button id="menu">☰ Índice</button>
<nav id="nav"><h1>JETA La Laguna</h1><div class="v">Documentación técnica · v{{VER}}</div>
{{NAV}}
</nav>
<main>{{BODY}}</main>
<script>
const nav=document.getElementById('nav');document.getElementById('menu').onclick=()=>nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
const links=[...nav.querySelectorAll('a')];
const io=new IntersectionObserver(es=>{const e=es.find(e=>e.isIntersecting);if(e)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')=='#'+e.target.id))},{rootMargin:'-10% 0px -80% 0px'});
document.querySelectorAll('section').forEach(s=>io.observe(s));
</script></body></html>'''

if __name__ == '__main__':
    print(build())
