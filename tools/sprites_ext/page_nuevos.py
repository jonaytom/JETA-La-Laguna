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
BTN = ['Parado', 'Andar', 'Correr', 'Golpe', 'Especial', 'Patada', 'Patada en carrera', 'Herida', 'Morir']
def counts(im, fw, fh):
    out = []
    for r in range(im.height // fh):
        k = 0
        for c in range(im.width // fw):
            if im.crop((c*fw, r*fh, c*fw+fw, r*fh+fh)).getbbox(): k = c + 1
        out.append(k)
    return out
HERO = [0, 1, 2, 5, 3, 7, 8, 6, 6]
S = [  # key, image, fw, fh, scale, rows per button, group, title, where, text
 ('magote', Image.open(G + '/out2/magote.png'), 80, 64, 3, HERO, 'h', 'El Magote', 'héroe', 'Patada en carrera con las piernas de La Mirladora, 15° más levantada (la cabeza más alta).'),
 ('mencey', Image.open(G + '/out2/mencey.png'), 80, 64, 3, HERO, 'h', 'El Mencey', 'héroe', 'Igual: patada en carrera más levantada.'),
 ('mirla', Image.open(G + '/out2/mirla_nat.png'), 112, 80, 3, HERO, 'h', 'La Mirladora', 'heroína · en el juego desde la 0.97', 'Sin bikini, pelo de castaño a rubio, falda que se levanta en la caída.'),
 ('lobo', Image.open(O3 + 'lobo.png'), 77, 53, 3, [0, 1, 1, 2, 4, 2, 1, 0, 3], 'e', 'Lobo (los perros)', 'sustituye a los perros (T) y al tibicena', 'Sacado de los tres GIF (negro, marrón y blanco): el fondo es idéntico en los tres, así que el lobo es justo lo que cambia entre ellos, sin restos de fondo. Parado, corriendo, mordiendo, muriendo y aullando (Especial).'),
 ('rata', rat, 32, 32, 6, [0, 1, 1, 2, 2, 2, 1, 3, 4], 'e', 'Rata', 'enemigo pequeño · pack RAt', 'Parado, corre, muerde, herida y muerte. Para las cuevas (las ratas de los barrancos).'),
 ('gorgona1', Image.open(O3 + 'gorgona1.png'), 128, 128, 2, [0, 1, 2, 3, 6, 4, 5, 7, 8], 'g', 'Gorgona verde', 'fase nueva · craftpix (licencia libre)', 'Sin la parte de arriba: el top pasado a su piel, con un pezón en el centro de cada pecho (rosa con su borde). Abajo sigue el taparrabos.'),
 ('gorgona2', Image.open(O3 + 'gorgona2.png'), 128, 128, 2, [0, 1, 2, 3, 6, 4, 5, 7, 8], 'g', 'Gorgona morada', 'fase nueva', 'Igual, piel lila.'),
 ('gorgona3', Image.open(O3 + 'gorgona3.png'), 128, 128, 2, [0, 1, 2, 3, 6, 4, 5, 7, 8], 'g', 'Gorgona morena', 'fase nueva · jefa de la fase', 'Igual, piel oscura (los pezones van más oscuros que la piel). La propongo como jefa: la de pelo claro es la reina.'),
 ('gollux', gol, 160, 128, 2, [0, 1, 1, 2, 3, 3, 1, 5, 5], 'b', 'Gollux', 'jefe de otra fase', 'Bicho de piedra: anda, dos ataques y se cura (Especial = ataque grande, Patada = curarse). No trae muerte: se haría con la herida y un fundido.'),
 ('guayota', demon, 160, 160, 2, [0, 1, 1, 2, 3, 2, 1, 4, 5], 'b', 'Guayota (Demon Overlord)', 'jefe final', 'El demonio del pack, que mira a la derecha: parado, anda, golpe con la espada, conjuro (Especial), herida y muerte. Más grande que todos; el actual con el hacha pasaría a ser un jefe intermedio.'),
]
# Patada en carrera of the heroes is row 8; for Especial the heroes show the jump (row 3)
sheets, meta = {}, {}
for k, im, fw, fh, sc, rows, *_ in S:
    b = io.BytesIO(); im.save(b, 'PNG'); sheets[k] = 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()
    meta[k] = {'fw': fw, 'fh': fh, 'scale': sc, 'n': counts(im, fw, fh), 'rows': rows}
MY = A + 'Free Mythic Monsters/Free Mythic Monsters/Transparent/1x Size/%03d_1.png'
myth = []
for i in range(1, 17):
    b = io.BytesIO(); Image.open(MY % i).save(b, 'PNG'); myth.append('data:image/png;base64,' + base64.b64encode(b.getvalue()).decode())
head = open(G + '/guanches_gandalf.html').read().split('<main>')[0].replace('<title>Guanches con GandalfHardcore</title>', '<title>Guanche Guarriors: personajes nuevos</title>')
def card(k):
    e = [s for s in S if s[0] == k][0]; _, im, fw, fh, sc, rows, g, t, w, txt = e
    return f'<article class="card"><header><h3>{t}</h3><p class="where">{w}</p></header><div class="stage"><figure><canvas width="{fw*sc}" height="{fh*sc}" id="cv-{k}"></canvas><figcaption>Propuesta</figcaption></figure></div><p>{txt}</p></article>'
def grp(title, sub, keys): return f'<section class="grp"><h2>{title}</h2><p class="sub">{sub}</p><div class="grid">{"".join(card(k) for k in keys)}</div></section>'
body = f'''<main><h1>Guanche Guarriors: personajes nuevos</h1>
<p class="lead">Los héroes como van ahora y los enemigos y jefes de los packs nuevos de <code>assets_externos</code>, para más fases. Los botones cambian la animación de todos (cada uno usa la suya más parecida).</p>
<p class="lic"><b>Licencias:</b> Demon Overlord: gratis para juegos (también comerciales), se puede modificar, no redistribuir el pack suelto; está hecho con IA y retocado a mano. Gorgonas: craftpix (licencia libre de craftpix.net). Gollux, RAt y Free Mythic Monsters: miro sus condiciones antes de meterlos. El lobo sale de un GIF de vista previa: hay que confirmar de qué pack es y su licencia.</p>
<div class="anims" role="group" aria-label="Animación"></div>
{grp('Héroes', 'Como están en el juego; la patada en carrera, 15° más levantada.', ['magote', 'mencey', 'mirla'])}
{grp('Enemigos', 'El lobo para los perros y una rata para las cuevas.', ['lobo', 'rata'])}
{grp('Las gorgonas (fase nueva)', 'Tres gorgonas del mismo pack: dos para la tropa y una de jefa.', ['gorgona1', 'gorgona2', 'gorgona3'])}
{grp('Jefes', 'Gollux para otra fase y el Demon Overlord como Guayota, el último.', ['gollux', 'guayota'])}
<section class="grp"><h2>Free Mythic Monsters</h2><p class="sub">96 bichos de frente (16 aquí), cada uno en tres colores. Son retratos quietos de un solo dibujo, no tienen andar ni golpes: sirven como jefes que flotan o aparecen (con un vaivén y destellos), no como tropa que pelea a pie.</p><div class="myth">{"".join(f'<img src="{m}" alt="monstruo {i+1}">' for i, m in enumerate(myth))}</div></section>
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
    c.imageSmoothingEnabled = false; c.clearRect(0, 0, cv.width, cv.height); c.drawImage(im, f * M.fw, r * M.fh, M.fw, M.fh, 0, 0, M.fw * M.scale, M.fh * M.scale); }}
  t++; requestAnimationFrame(draw); }}
requestAnimationFrame(draw);
</script>'''
open(G + '/nuevos.html', 'w').write(head + body); print('ok')
