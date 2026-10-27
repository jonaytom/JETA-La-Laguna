# The page «Guanche Guarriors: personajes nuevos» (Jonay, 27-oct): heroes as they are now + the new enemies and bosses
import base64, io, json, sys
from PIL import Image
G = sys.argv[1]; A = '/mnt/user-data/uploads/GTA La Laguna/assets_externos/'; O3 = G + '/out3/'
def strip_rows(files, w, h):
    ims = [Image.open(f).convert('RGBA') for f in files]; n = max(im.width // w for im in ims)
    s = Image.new('RGBA', (w * n, h * len(ims)))
    for r, im in enumerate(ims): s.alpha_composite(im.crop((0, 0, min(im.width, w * n), h)), (0, r * h))
    return s
D = A + 'Demon Overlord 2D Pixel Art v1.0.0/Godot/demon_overlord_%s.png'
demon = strip_rows([D % k for k in ['idle', 'walk', 'attack', 'cast', 'hurt', 'death']], 160, 160)
# Gollux: the idle strip has 128 px cells, the rest 384 px cells with the drawing in the middle (Jonay: «hace
# parpadeo»: they were cut in 128 px and two of every three came out empty); all to 160 px around the body
def gollux():
    rows = []
    for k in ['idle', 'move', 'attack_A', 'attack_B', 'healing', 'hit']:
        im = Image.open(A + 'Gollux/gollux_%s.png' % k).convert('RGBA'); fr = []
        if k == 'idle':   # 128 px cells: body at x 35..100 → in the 160 px frame at the same place as the others
            for c in range(im.width // 128): f = Image.new('RGBA', (160, 128)); f.alpha_composite(im.crop((c*128, 0, c*128 + 128, 128)), (-2, 0)); fr.append(f)
        else:             # 384 px cells: keep x 136..296
            for c in range(im.width // 384): fr.append(im.crop((c*384 + 136, 0, c*384 + 296, 128)))
        rows.append(fr)
    s = Image.new('RGBA', (160 * max(len(r) for r in rows), 128 * len(rows)))
    for r, fr in enumerate(rows):
        for c, f in enumerate(fr): s.alpha_composite(f, (c * 160, r * 128))
    return s
gol = gollux()
rat = strip_rows([A + 'RAt/OutlinedRat/rat-%s-outline.png' % k for k in ['idle', 'run', 'attack', 'hurt', 'death']], 32, 32)
BTN = ['Parado', 'Andar', 'Correr', 'Golpe', 'Salto', 'Caída del salto', 'Patada', 'Patada en carrera', 'Herida', 'Morir']
def counts(im, fw, fh):
    out = []
    for r in range(im.height // fh):
        k = 0
        for c in range(im.width // fw):
            if im.crop((c*fw, r*fh, c*fw+fw, r*fh+fh)).getbbox(): k = c + 1
        out.append(k)
    return out
HERO = [0, 1, 2, 5, 3, 4, 7, 8, 6, 6]
S = [  # key, image, fw, fh, scale, rows per button, group, title, where, text
 ('secuaz', Image.open(G + '/out2/g_secuaz.png'), 80, 64, 3, HERO, 'r', 'Secuaz (el de ahora)', 'para comparar', 'El secuaz demonio que sale ahora en el juego.'),
 ('h_espada', Image.open(G + '/out2/h_espada.png'), 80, 64, 3, HERO, 's', 'Secuaz roja', 'piel roja · casco de guardia · espada de hierro · escudo de bronce', 'Falda corta roja, pelo moreno recogido.'),
 ('h_hacha', Image.open(G + '/out2/h_hacha.png'), 80, 64, 3, HERO, 's', 'Secuaz vikinga', 'piel verde · casco con cuernos · hacha de hierro', 'Falda larga de cuero (el vestido largo cortado por la cintura), pelo pelirrojo.'),
 ('h_demonia', Image.open(G + '/out2/h_demonia.png'), 80, 64, 3, HERO, 's', 'Secuaz demonia', 'piel azulada como el secuaz · garrote · escudo de cuero', 'Falda corta verde, pelo canoso, gorro de bronce.'),
 ('h_oro', Image.open(G + '/out2/h_oro.png'), 80, 64, 3, HERO, 's', 'Secuaz de la espada de oro', 'piel amarilla · espada dorada', 'Falda larga roja, pelo negro, sombrero de bronce.'),
 ('h_lenadora', Image.open(G + '/out2/h_leñadora.png'), 80, 64, 3, HERO, 's', 'Secuaz leñadora', 'piel morada · hacha de madera · escudo de hierro', 'Falda corta de cuero, pelo castaño, gorro de cuero.'),
]
# Patada en carrera of the heroes is row 8; for Especial the heroes show the jump (row 3)
sheets, meta = {}, {}
for k, im, fw, fh, sc, rows, *_ in S:
    b = io.BytesIO(); im.save(b, 'PNG'); sheets[k] = 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()
    meta[k] = {'fw': fw, 'fh': fh, 'scale': sc, 'n': counts(im, fw, fh), 'rows': rows}
myth = []
if False:
  MY = A + 'Free Mythic Monsters/Free Mythic Monsters/Transparent/1x Size/%03d_1.png'
  for i in range(1, 17):
    b = io.BytesIO(); Image.open(MY % i).save(b, 'PNG'); myth.append('data:image/png;base64,' + base64.b64encode(b.getvalue()).decode())
head = open(G + '/guanches_gandalf.html').read().split('<main>')[0].replace('<title>Guanches con GandalfHardcore</title>', '<title>Secuaces hembra</title>')
def card(k):
    e = [s for s in S if s[0] == k][0]; _, im, fw, fh, sc, rows, g, t, w, txt = e
    return f'<article class="card"><header><h3>{t}</h3><p class="where">{w}</p></header><div class="stage"><figure><canvas width="{fw*sc}" height="{fh*sc}" id="cv-{k}"></canvas><figcaption>Propuesta</figcaption></figure></div><p>{txt}</p></article>'
def grp(title, sub, keys): return f'<section class="grp"><h2>{title}</h2><p class="sub">{sub}</p><div class="grid">{"".join(card(k) for k in keys)}</div></section>'
body = f'''<main><h1>Guanche Guarriors: secuaces hembra</h1>
<p class="lead">Versiones femeninas de los secuaces, al estilo de La Mirladora: sin la parte de arriba (piel y pezón), el taparrabos de cuero oscuro debajo de faldas distintas y cascos, armas y escudos de los packs. Los botones cambian la animación de todos.</p>
<div class="anims" role="group" aria-label="Animación"></div>
{grp('Secuaces hembra (propuesta)', 'Cinco combinaciones con pieles de colores (roja, verde, azul, amarilla y morada); se pueden mezclar piezas de unas con otras. Versión 3: la patada en carrera es la caída del salto tal cual, girada al dibujarla (como en tu ejemplo: no pierde píxeles y el arma sigue en la mano); pezón más marcado, sin braga (piel lisa) y botón de la caída del salto.', ['h_espada', 'h_hacha', 'h_demonia', 'h_oro', 'h_lenadora'])}
{grp('Para comparar', 'El secuaz de ahora.', ['secuaz'])}
</main>
<style>.myth {{ display:flex; flex-wrap:wrap; gap:10px }} .myth img {{ width:128px; height:128px; image-rendering:pixelated; background:radial-gradient(#3a2a1c,#1b140e 70%); border:1px solid var(--line) }}</style>
<script>
const SHEETS = {json.dumps(sheets)};
const META = {json.dumps(meta)};
const ROWS = {json.dumps(BTN, ensure_ascii=False)};
let row = 0, t = 0; const imgs = {{}};
const bar = document.querySelector(".anims");
ROWS.forEach((n, r) => {{ const b = document.createElement("button"); b.id = "an-" + r; b.textContent = n; b.setAttribute("aria-pressed", r === row); b.onclick = () => {{ row = r; t = 0; bar.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b)); }}; bar.appendChild(b); }});
for (const k in SHEETS) {{ const im = new Image(); im.src = SHEETS[k]; imgs[k] = im; }}
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function draw() {{
  for (const k in imgs) {{ const cv = document.getElementById("cv-" + k); if (!cv) continue; const c = cv.getContext("2d"), im = imgs[k], M = META[k]; if (!im.complete) continue;
    let r = M.rows[row]; if (!M.n[r]) r = 0; const n = M.n[r] || 1, f = reduce ? 0 : Math.floor(t / 7) % n;
    c.imageSmoothingEnabled = false; c.clearRect(0, 0, cv.width, cv.height); c.save(); if (r === 8) {{ const X = cv.width / 2, Y = cv.height * 0.55; c.translate(X, Y); c.rotate(40 * Math.PI / 180); c.translate(-X, -Y); }} c.drawImage(im, f * M.fw, r * M.fh, M.fw, M.fh, 0, 0, M.fw * M.scale, M.fh * M.scale); c.restore(); }}   // (the running kick turned here, like in the game)
  t++; requestAnimationFrame(draw); }}
requestAnimationFrame(draw);
</script>'''
open(G + '/hembras.html', 'w').write(head + body); print('ok')
