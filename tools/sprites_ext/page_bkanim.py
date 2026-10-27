# The page «Basket: animaciones nuevas» (proposal): each animation of bk_anim.py played on a bit of court
import sys, json, base64, io
from PIL import Image
G = sys.argv[1]
im = Image.open(G + '/out2/bk_anim.png'); b = io.BytesIO(); im.save(b, 'PNG', optimize=True)
SRC = 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode(); META = json.load(open(G + '/out2/bk_anim.json'))
TXT = {'tiro': 'Sube ya con los brazos en alto (piernas del salto + brazos de la caída) y suelta con los dos brazos arriba, como en el rebote.',
       'robo': 'Zancada de correr con el brazo del golpe estirado: le quita el balón al que bota.',
       'rebote': 'Salto con los brazos arriba desde el despegue; coge el balón arriba y cae.',
       'tapon': 'Salta con un brazo levantado y da el manotazo al balón en lo alto.',
       'm360': 'Sube con el balón arriba y gira entero en el aire (el giro de antes), luego machaca con un brazo.',
       'molino': 'El brazo que da a la cámara da una vuelta entera de 360° con el balón mientras sube, y machaca.',
       'espaldas': 'Sube de espaldas al aro con el balón arriba y lo mete por detrás de la cabeza.',
       'piernas': 'Abre las piernas, una delante y otra detrás, mientras pasa el balón por debajo; lo sube y machaca.'}
cards = ''.join(f'<article class="card"><h3>{m["name"]}</h3><canvas width="360" height="240" id="cv-{k}"></canvas><p>{TXT[k]}</p></article>' for k, m in META.items())
html = '''<title>Basket: animaciones</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Work+Sans:wght@400;600&display=swap">
<style>
:root { --bg:#17120e; --panel:#231a13; --line:#4a3524; --fg:#efe4d2; --dim:#b5a48c; --gold:#e8b44a; color-scheme:dark }
body { background:var(--bg); color:var(--fg); font:15px/1.55 "Work Sans", system-ui, sans-serif; padding:24px 16px 48px; margin:0 }
main { max-width:1100px; margin:0 auto; display:flex; flex-direction:column; gap:18px }
h1 { font:18px/1.4 "Press Start 2P", monospace; color:var(--gold); margin:0 } .lead { color:var(--dim); max-width:75ch; margin:0 }
.ctl { display:flex; gap:8px; flex-wrap:wrap } .ctl button { font:10px "Press Start 2P", monospace; background:var(--panel); color:var(--fg); border:2px solid var(--line); padding:9px 10px; cursor:pointer }
.ctl button[aria-pressed="true"] { border-color:var(--gold); color:var(--gold) }
.grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 330px), 1fr)); gap:16px }
.card { background:var(--panel); border:2px solid var(--line); padding:14px; display:flex; flex-direction:column; gap:8px; min-width:0 }
.card h3 { font:12px/1.5 "Press Start 2P", monospace; margin:0 } .card p { margin:0; color:var(--dim); font-size:14px }
canvas { width:100%; height:auto; image-rendering:pixelated; border:1px solid var(--line); background:#24170f }
</style>
<main><h1>Basket: animaciones nuevas (propuesta)</h1>
<p class="lead">Hechas con lo que tiene el pack: el cuerpo de arriba de un fotograma sobre las piernas de otro (unidos por la cintura), más el salto, el giro y el balón. Tiro, robo, rebote, tapón y los cuatro mates de los combos. Versión 2: tiro con los dos brazos, sin manos sueltas junto al pantalón, molino con el brazo girando 360°, entrepiernas con las piernas abiertas y el balón el doble de grande (en proporción al juego).</p>
<div class="ctl" role="group" aria-label="Velocidad"><button id="b-n" aria-pressed="true">Normal</button><button id="b-l" aria-pressed="false">Lento</button><button id="b-p" aria-pressed="false">Pausa</button></div>
<div class="grid">''' + cards + '''</div></main>
<script>
const META = ''' + json.dumps(META, ensure_ascii=False) + ''';
const IM = new Image(); IM.src = "''' + SRC + '''";
let t = 0, speed = 1, paused = false; const B = (id) => document.getElementById(id);
const setS = (id, s, p) => { speed = s; paused = p; ['b-n','b-l','b-p'].forEach((x) => B(x).setAttribute('aria-pressed', x === id)); };
B('b-n').onclick = () => setS('b-n', 1, false); B('b-l').onclick = () => setS('b-l', 0.35, false); B('b-p').onclick = () => setS('b-p', speed, !paused);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const S = 2, FLOOR = 215, PX = 230, HOOP = [80, 62];   // scale, floor line, the player's x, the hoop (on his left: he faces left)
function ball(c, x, y) { c.fillStyle = '#131218'; c.beginPath(); c.arc(x, y, 7.4, 0, 7); c.fill(); c.fillStyle = '#e2711e'; c.beginPath(); c.arc(x, y, 6.4, 0, 7); c.fill(); c.fillStyle = '#5a280a'; c.fillRect(x - 6, y, 12, 1); c.fillRect(x, y - 6, 1, 12); }
function draw() {
  if (!paused && !reduce) t += speed;
  for (const k in META) { const cv = B('cv-' + k); const c = cv.getContext('2d'), m = META[k], n = m.frames.length; c.imageSmoothingEnabled = false;
    c.fillStyle = '#24170f'; c.fillRect(0, 0, cv.width, cv.height); c.fillStyle = '#7a3a1e'; c.fillRect(0, FLOOR, cv.width, cv.height - FLOOR); c.fillStyle = '#d8c8b0'; c.fillRect(0, FLOOR, cv.width, 2);
    const hoop = k !== 'robo' && k !== 'rebote';
    if (hoop) { c.fillStyle = '#ddd'; c.fillRect(HOOP[0] - 40, HOOP[1] - 40, 6, 54); c.fillStyle = '#e8501e'; c.fillRect(HOOP[0] - 34, HOOP[1], 44, 4); c.strokeStyle = '#eee'; c.lineWidth = 1; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(HOOP[0] - 32 + i * 10, HOOP[1] + 4); c.lineTo(HOOP[0] - 28 + i * 6, HOOP[1] + 26); c.stroke(); } }
    const step = Math.floor(t / 7), fi = step % (n + 4), f = m.frames[Math.min(fi, n - 1)], u = Math.min(fi, n - 1);
    const dunk = !!m.slam, x = PX - (dunk ? Math.min(u, m.slam) * 14 : k === 'robo' ? Math.min(u, 3) * 10 : 0), y = FLOOR - f.h * S;
    let kx = 1; if (m.spin && u >= m.spin[0] && u <= m.spin[1]) kx = Math.cos((u - m.spin[0]) / (m.spin[1] - m.spin[0]) * Math.PI * 2); if (Math.abs(kx) < 0.25) kx = 0.25 * Math.sign(kx || 1);
    if (m.back && u >= m.back[0] && u <= m.back[1]) kx = -1;
    c.save(); c.translate(x, y); c.scale(kx, 1); c.drawImage(IM, f.i * 80, 0, 80, 64, -40 * S, -63 * S, 80 * S, 64 * S); if (f.arm) { const A = f.arm, X = (A.p[0] - 40) * S, Y = (A.p[1] - 63) * S; c.translate(X, Y); c.rotate(A.a * Math.PI / 180); c.translate(-X, -Y); c.drawImage(IM, A.i * 80, 0, 80, 64, -40 * S, -63 * S, 80 * S, 64 * S); } c.restore();   // (the windmill's arm turned here)
    if (k === 'robo' && u < 2) ball(c, 120, FLOOR - 10 - Math.abs(Math.sin(t / 6)) * 30);   // the rival's dribble, then it's his
    if (f.ball) ball(c, x + (f.ball[0] - 40) * S * kx, y + (f.ball[1] - 63) * S);
    else if (m.shot && u >= m.shot) { const q = Math.min(1, (fi - m.shot) / 4); ball(c, x - 20 + (HOOP[0] - 12 - x + 20) * q, y - 150 + (HOOP[1] - y + 150) * q - Math.sin(q * Math.PI) * 60); }
    else if (m.block && u >= m.block) { const q = Math.min(1, (fi - m.block) / 4); ball(c, x - 40 - q * 120, FLOOR - 180 + q * 160); }
    else if (k === 'tapon' && u < m.block) { const q = u / m.block; ball(c, 20 + q * 140, FLOOR - 60 - q * 120); }
    else if (dunk && u > m.slam && u < m.slam + 3) ball(c, HOOP[0] - 12, HOOP[1] + 12 + (u - m.slam) * 30); }
  requestAnimationFrame(draw); }
IM.onload = () => requestAnimationFrame(draw);
</script>'''
open(G + '/bkanim.html', 'w').write(html); print('ok')
