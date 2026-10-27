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
S = [
 ('n_mirla', Image.open(G + '/out2/n_mirla.png'), 112, 80, 3, HERO, 'm', 'La Mirladora (nueva)', 'sobre la base nueva', 'Misma piel, pelo, falda que se levanta, bastón y orbe; pezón rosa.'),
 ('mirla', Image.open(G + '/out2/mirla_nat.png'), 112, 80, 3, HERO, 'm', 'La Mirladora (ahora)', 'para comparar', 'La del juego.'),
 ('n_bruja', Image.open(G + '/out2/n_bruja.png'), 112, 80, 3, HERO, 'w', 'La bruja (nueva)', 'sobre la base nueva', 'Misma piel verdosa, vestido, pelo y bastón con orbe verde.'),
 ('bruja', Image.open(G + '/out2/g_bruja.png'), 112, 80, 3, HERO, 'w', 'La bruja (ahora)', 'para comparar', 'La del juego.'),
 ('n_roja', Image.open(G + '/out2/n_roja.png'), 80, 64, 3, HERO, 's', 'Secuaz roja', 'piel roja · casco de guardia · espada · escudo de bronce', 'Sobre la base nueva, con su ropa, casco y arma.'),
 ('n_vikinga', Image.open(G + '/out2/n_vikinga.png'), 80, 64, 3, HERO, 's', 'Secuaz vikinga', 'piel verde · casco con cuernos · hacha', 'Sobre la base nueva, con su ropa, casco y arma.'),
 ('n_demonia', Image.open(G + '/out2/n_demonia.png'), 80, 64, 3, HERO, 's', 'Secuaz demonia', 'piel azulada · garrote · escudo de cuero', 'Sobre la base nueva, con su ropa, casco y arma.'),
 ('n_oro', Image.open(G + '/out2/n_oro.png'), 80, 64, 3, HERO, 's', 'Secuaz de la espada de oro', 'piel amarilla · espada dorada', 'Sobre la base nueva, con su ropa, casco y arma.'),
 ('n_lenadora', Image.open(G + '/out2/n_lenadora.png'), 80, 64, 3, HERO, 's', 'Secuaz leñadora', 'piel morada · hacha de madera · escudo de hierro', 'Sobre la base nueva, con su ropa, casco y arma.'),
 ('bk_rojo', Image.open(G + '/out2/bk_rojo.png'), 80, 64, 3, [0, 1, 2, 5, 3, 4, 0, 2, 6, 6], 'b', 'Equipo rojo', 'camiseta de asillas del pack (Basketball_Shirt)', 'Pantalón corto del mismo color, sin calzoncillos a la vista.'),
 ('bk_azul', Image.open(G + '/out2/bk_azul.png'), 80, 64, 3, [0, 1, 2, 5, 3, 4, 0, 2, 6, 6], 'b', 'Equipo azul', 'camiseta de asillas del pack (Basketball_Shirt)', 'Pantalón corto del mismo color, sin calzoncillos a la vista.'),
 ('bk_verde', Image.open(G + '/out2/bk_verde.png'), 80, 64, 3, [0, 1, 2, 5, 3, 4, 0, 2, 6, 6], 'b', 'Equipo verde', 'camiseta de asillas del pack (Basketball_Shirt)', 'Pantalón corto del mismo color, sin calzoncillos a la vista.'),
 ('bk_amarillo', Image.open(G + '/out2/bk_amarillo.png'), 80, 64, 3, [0, 1, 2, 5, 3, 4, 0, 2, 6, 6], 'b', 'Equipo amarillo', 'camiseta de asillas del pack (Basketball_Shirt)', 'Pantalón corto del mismo color, sin calzoncillos a la vista.'),
 ('bk_negro', Image.open(G + '/out2/bk_negro.png'), 80, 64, 3, [0, 1, 2, 5, 3, 4, 0, 2, 6, 6], 'b', 'Equipo negro', 'camiseta de asillas del pack (Basketball_Shirt)', 'Pantalón corto del mismo color, sin calzoncillos a la vista.'),
 ('bk_blanco', Image.open(G + '/out2/bk_blanco.png'), 80, 64, 3, [0, 1, 2, 5, 3, 4, 0, 2, 6, 6], 'b', 'Equipo blanco', 'camiseta de asillas del pack (Basketball_Shirt)', 'Pantalón corto del mismo color, sin calzoncillos a la vista.'),
 ('bk_morado', Image.open(G + '/out2/bk_morado.png'), 80, 64, 3, [0, 1, 2, 5, 3, 4, 0, 2, 6, 6], 'b', 'Equipo morado', 'camiseta de asillas del pack (Basketball_Shirt)', 'Pantalón corto del mismo color, sin calzoncillos a la vista.'),
 ('bk_naranja', Image.open(G + '/out2/bk_naranja.png'), 80, 64, 3, [0, 1, 2, 5, 3, 4, 0, 2, 6, 6], 'b', 'Equipo naranja', 'camiseta de asillas del pack (Basketball_Shirt)', 'Pantalón corto del mismo color, sin calzoncillos a la vista.'),
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
head = open(G + '/guanches_gandalf.html').read().split('<main>')[0].replace('<title>Guanches con GandalfHardcore</title>', '<title>Chicas y basket</title>')
def card(k):
    e = [s for s in S if s[0] == k][0]; _, im, fw, fh, sc, rows, g, t, w, txt = e
    return f'<article class="card"><header><h3>{t}</h3><p class="where">{w}</p></header><div class="stage"><figure><canvas width="{fw*sc}" height="{fh*sc}" id="cv-{k}"></canvas><figcaption>Propuesta</figcaption></figure></div><p>{txt}</p></article>'
def grp(title, sub, keys): return f'<section class="grp"><h2>{title}</h2><p class="sub">{sub}</p><div class="grid">{"".join(card(k) for k in keys)}</div></section>'
body = f'''<main><h1>Chicas sobre la base nueva y equipos de basket</h1>
<p class="lead">Propuesta, sin tocar el juego. Todas las chicas rehechas desde cero sobre tu <code>Female Skin3_new</code> con los colores de piel y pelo, ropa, objetos y armas que ya tenían; junto a La Mirladora y la bruja, cómo están ahora. Los de basket llevan la <code>Basketball_Shirt</code> del pack en ocho colores. La patada en carrera se gira al dibujarla, como en el juego.</p>
<div class="anims" role="group" aria-label="Animación"></div>
{grp('La Mirladora', 'Nueva sobre la base y la de ahora.', ['n_mirla', 'mirla'])}
{grp('La bruja', 'Nueva sobre la base y la de ahora.', ['n_bruja', 'bruja'])}
{grp('Secuaces hembra', 'Las cinco, sobre la base nueva.', ['n_roja', 'n_vikinga', 'n_demonia', 'n_oro', 'n_lenadora'])}
{grp('Basket', 'Camiseta de asillas del pack en ocho colores (los botones de patada muestran parado y correr).', ['bk_rojo', 'bk_azul', 'bk_verde', 'bk_amarillo', 'bk_negro', 'bk_blanco', 'bk_morado', 'bk_naranja'])}
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
open(G + '/chicas.html', 'w').write(head + body); print('ok')
