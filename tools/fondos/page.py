import pickle, base64, io, json
D = pickle.load(open('fondos.pkl', 'rb'))
TIT = {'taoro': ('El Poblado de Taoro', 'El Teide grande con el Pico Viejo, el mar de nubes en la ladera verde del valle, pinos y retamas'),
       'anaga': ('La Laurisilva de Anaga', 'Bosque cerrado: troncos retorcidos con musgo, ramas que cuelgan, helechos y luz entre las copas'),
       'barranco': ('El Barranco del Infierno', 'Paredes altas de roca ocre, matas verdes, la cascada fina por la grieta y el charco'),
       'gigantes': ('Los Acantilados de Los Gigantes', 'La pared rojiza con vetas, el mar azul y la espuma sobre la arena negra'),
       'malpais': ('El Malpaís de Güímar', 'Lava negra y marrón con tabaibas; detrás, la sierra con nubes y el mar'),
       'canadas': ('Las Cañadas del Teide', 'El Teide anaranjado al atardecer, los Roques y la llanura de pómez con retamas'),
       'echeyde': ('Dentro del Echeyde', 'Tubo de lava: techo rugoso, estalactitas y grietas de lava encendida'),
       'anaza': ('Bencomo · La costa de Añaza', 'Cielo nublado, mar gris con espuma, la punta de roca y la playa de callaos')}
data = {}
for k, v in D.items():
    L = []
    for l in v['layers']:
        b = io.BytesIO(); l['img'].save(b, 'PNG', optimize=True)
        L.append({'src': 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode(), 'speed': l['speed'], 'sky': bool(l.get('sky')), 'drift': l.get('drift', 0), 'tile': bool(l.get('tile')) or bool(l.get('drift'))})
    data[k] = {'layers': L, 'extras': v['extras']}
cards = ''.join(f'<article class="card"><h3>{TIT[k][0]}</h3><p class="where">{TIT[k][1]}</p><canvas width="320" height="112" id="bg-{k}"></canvas></article>' for k in TIT)
html = '''<title>Fondos de pixel art</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Work+Sans:wght@400;600&display=swap">
<style>
:root { --bg:#17120e; --panel:#231a13; --line:#4a3524; --fg:#efe4d2; --dim:#b5a48c; --gold:#e8b44a; color-scheme:dark }
body { background:var(--bg); color:var(--fg); font:15px/1.55 "Work Sans", system-ui, sans-serif; padding:24px max(16px, env(safe-area-inset-left, 0px)) 48px }
main { max-width:1100px; margin:0 auto; display:flex; flex-direction:column; gap:20px }
h1 { font:18px/1.4 "Press Start 2P", monospace; color:var(--gold); margin:0 }
.lead { color:var(--dim); max-width:72ch; margin:0 }
.ctl { display:flex; gap:8px; flex-wrap:wrap; position:sticky; top:0; background:var(--bg); padding:8px 0; z-index:3 }
.ctl button { font:10px "Press Start 2P", monospace; background:var(--panel); color:var(--fg); border:2px solid var(--line); padding:9px 10px; cursor:pointer }
.ctl button[aria-pressed="true"] { border-color:var(--gold); color:var(--gold) }
.grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 480px), 1fr)); gap:18px }
.card { background:var(--panel); border:2px solid var(--line); padding:14px; display:flex; flex-direction:column; gap:8px; min-width:0 }
.card h3 { font:12px/1.5 "Press Start 2P", monospace; margin:0 } .where { margin:0; color:var(--gold); font-size:13px }
canvas { width:100%; height:auto; image-rendering:pixelated; border:1px solid var(--line); background:#000 }
</style>
<main>
<h1>Fondos de pixel art (propuesta)</h1>
<p class="lead">Versión 4: ya no son tus fotos pasadas a píxeles. Cada fondo está <b>dibujado</b> a partir de lo que muestra la foto (lo describo debajo de cada título), con colores planos y el contorno oscuro de los personajes del juego. Las capas se mueven a distinta velocidad al avanzar. Tamaño del juego: 320 × 112 píxeles, ampliado ×3.</p>
<div class="ctl" role="group" aria-label="Opciones"><button id="b-dia" aria-pressed="true">De día</button><button id="b-noche" aria-pressed="false">De noche</button><button id="b-pausa" aria-pressed="false">Pausa</button></div>
<div class="grid">''' + cards + '''</div>
</main>
<script>
const DATA = ''' + json.dumps(data) + ''';
let night = false, paused = false, t = 0;
const B = (id) => document.getElementById(id);
B('b-dia').onclick = () => { night = false; B('b-dia').setAttribute('aria-pressed', true); B('b-noche').setAttribute('aria-pressed', false); };
B('b-noche').onclick = () => { night = true; B('b-noche').setAttribute('aria-pressed', true); B('b-dia').setAttribute('aria-pressed', false); };
B('b-pausa').onclick = () => { paused = !paused; B('b-pausa').setAttribute('aria-pressed', paused); };
const IM = {}; for (const k in DATA) IM[k] = DATA[k].layers.map((l) => { const im = new Image(); im.src = l.src; return im; });
const STARS = Array.from({ length: 60 }, (_, i) => [(i * 97) % 320, (i * 53) % 50, (i % 3) + 1]);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function draw() {
  if (!paused && !reduce) t += 1;
  for (const k in DATA) { const cv = B('bg-' + k); if (!cv) continue; const c = cv.getContext('2d'), W = cv.width, H = cv.height; c.imageSmoothingEnabled = false; c.clearRect(0, 0, W, H);
    const fr = (1 - Math.cos(t / 300)) / 2, CAM = 600;   // the camera goes along the stage and back
    DATA[k].layers.forEach((l, i) => { const im = IM[k][i]; if (!im.complete || !im.width) return;
      if (l.sky) { c.drawImage(im, 0, 0, W, H); if (night && k !== 'echeyde') { c.fillStyle = '#05081a'; c.globalAlpha = 0.75; c.fillRect(0, 0, W, H); c.globalAlpha = 1; for (const [x, y, s] of STARS) { c.fillStyle = (t / 20 + x) % 7 < 1 ? '#888' : '#fff'; c.fillRect(x % W, y, 1, 1); } } return; }
      if (l.tile) { const off = ((fr * CAM * (l.speed || 0) + t * (l.drift || 0) * 0.05) % im.width + im.width) % im.width; for (let x = -off; x < W; x += im.width) c.drawImage(im, Math.round(x), 0); }
      else c.drawImage(im, -Math.round(fr * Math.min(im.width - W, CAM * l.speed)), 0);
      if (i === 1 && DATA[k].extras.includes('cascada')) { const X = 198 - Math.round(fr * Math.min(480 - W, CAM * 0.08)); c.fillStyle = '#cfeaf4'; c.fillRect(X - 1, 22, 4, 66); c.fillStyle = '#ffffff'; for (let y = 0; y < 66; y += 4) c.fillRect(X + ((y + t) % 8 < 4 ? 0 : 1), 22 + ((y + t * 2) % 66), 2, 3); c.fillStyle = '#ffffff'; c.fillRect(X - 4, 87, 10, 2); }   // the waterfall falling   // (Jonay: the waterfall goes behind the rocks in front)
    });
    const ex = DATA[k].extras;
    if (ex.includes('niebla')) { for (let i = 0; i < 3; i++) { const x = ((t * (0.15 + i * 0.07) + i * 140) % (W + 200)) - 200; c.fillStyle = 'rgba(210,225,215,0.18)'; c.beginPath(); c.ellipse(x + 100, 50 + i * 16, 130, 12, 0, 0, 7); c.fill(); } }
    if (night) { c.globalCompositeOperation = 'multiply'; c.fillStyle = '#5a6a9a'; c.fillRect(0, 0, W, H); c.globalCompositeOperation = 'source-over'; }
  }
  requestAnimationFrame(draw); }
requestAnimationFrame(draw);
</script>'''
open('fondos.html', 'w').write(html); print(len(html) // 1024, 'KB')
