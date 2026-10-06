// ============ HUD, minimap, big map ============
const SETTINGS = { sens: 1, invertY: false, weather: 0 };
try { const s = JSON.parse(localStorage.getItem('gtall_set') || '{}'); Object.assign(SETTINGS, s); } catch (e) { }
function saveSettings() { try { localStorage.setItem('gtall_set', JSON.stringify(SETTINGS)); } catch (e) { } }

const MAP = { scale: 0.45, x0: WORLD.x0 - 30, z0: WORLD.z0 - 30 }; // px per meter
let MAPC = null;
function buildMapCanvas() {
  const W = Math.ceil((WORLD.x1 - WORLD.x0 + 60) * MAP.scale), H = Math.ceil((WORLD.z1 - WORLD.z0 + 60) * MAP.scale);
  const c = mkCanvas(W, H), x = c.getContext('2d'); const s = MAP.scale;
  const P = (px, pz) => [(px - MAP.x0) * s, (pz - MAP.z0) * s];
  x.fillStyle = '#26362b'; x.fillRect(0, 0, W, H);
  const path = (co, close) => { x.beginPath(); for (let i = 0; i < co.length; i += 2) { const p = P(co[i], co[i + 1]); i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]); } if (close) x.closePath(); };
  const AT = DATA.AT; const col = { park: '#3f6b3a', garden: '#3c6536', grass: '#43703c', farmland: '#4d5a36', meadow: '#44613a', pitch: '#3f7a3b', forest: '#2c4a2a', scrub: '#3c4c33', water: '#2f5f86', cemetery: '#4a5446', playground: '#5b5a44', parking: '#3a3f42', residential: '#34403a', industrial: '#3b3e40', square: '#5c5b56', sports: '#4d4a3b', orchard: '#3f5b35' };
  for (const k of ['residential', 'industrial', 'farmland', 'meadow', 'orchard', 'scrub', 'forest', 'grass', 'park', 'garden', 'cemetery', 'sports', 'pitch', 'playground', 'parking', 'square', 'water']) for (const a of DATA.A) if (AT[a[0]] === k) { path(a[2], true); x.fillStyle = col[k]; x.fill(); }
  x.fillStyle = '#4a4e52'; for (const b of DATA.B) { path(b[6], true); x.fill(); }
  x.lineCap = 'round'; x.lineJoin = 'round';
  const order = [['footway', '#6d6a60', 0.7], ['steps', '#6d6a60', 0.7], ['path', '#6f6250', 0.6], ['track', '#6f6250', 1], ['cycleway', '#5e8a6a', 0.7], ['service', '#9ea2a6', 1], ['pedestrian', '#b5ae9c', 1], ['living_street', '#c9ccd0', 1], ['residential', '#d4d6d9', 1], ['unclassified', '#d4d6d9', 1], ['tertiary_link', '#e8e8e8', 1], ['tertiary', '#ececec', 1], ['secondary_link', '#c3d3e2', 1], ['secondary', '#c3d3e2', 1], ['primary_link', '#9fc0de', 1], ['primary', '#9fc0de', 1], ['trunk', '#6fa9dc', 1], ['motorway_link', '#4f93d6', 1], ['motorway', '#3f86d0', 1]] // cool blues: yellow and magenta are kept for mission / GPS routes;
  for (const [t, cc, k] of order) { x.strokeStyle = cc; for (const r of DATA.R) if (RTN[r[0]] === t) { x.lineWidth = Math.max(1, r[2] * s * k); path(r[4]); x.stroke(); } }
  if (DATA.T.length) { x.setLineDash([6, 4]); x.strokeStyle = '#e04848'; x.lineWidth = 2.2; path(DATA.T); x.stroke(); x.setLineDash([]); }
  MAPC = c;
}

const LABELS = [];
function buildLabels() {
  const want = [['Catedral', 'Catedral'], ['La Concepción', 'La Concepción'], ['Teatro Leal', 'Teatro Leal'], ['Santuario del Cristo', 'Santuario del Cristo'], ['Iglesia de Santo Domingo', 'Santo Domingo'], ['Casas Capitulares', 'Ayuntamiento'], ['Palacio Nava', 'Palacio de Nava'], ['Intercambiador', 'Intercambiador'], ['Mercado de La Laguna', 'Mercado'], ['Museo de Historia', 'Museo de Historia']];
  for (const [k, lbl] of want) { const b = BUILD.find((b) => b.name && b.name.includes(k)); if (b) LABELS.push([lbl, b.cx, b.cz, 1]); }
  for (const p of DATA.P) { const n = STR[p[0]]; if (['suburb', 'neighbourhood'].includes(p[1])) LABELS.push([n.toUpperCase(), p[2], p[3], 2]); }
  const extra = [['Plaza del Adelantado', PLAZA.x, PLAZA.z, 1]]; LABELS.push(...extra);
  for (const a of DATA.A) { const n = a[1] >= 0 ? STR[a[1]] : null; if (!n) continue; if (/Parque de La Vega|Estadio|Campus|Parque de la Constituci|Cementerio/.test(n)) { const c = a[2]; let sx = 0, sz = 0; for (let i = 0; i < c.length; i += 2) { sx += c[i]; sz += c[i + 1]; } LABELS.push([n.replace(' Pedro González', ''), sx / (c.length / 2), sz / (c.length / 2), 1]); } }
  const cc = DATA.P.find((p) => STR[p[0]] === 'Campus Central'); if (cc) LABELS.push(['Campus Central ULL', cc[2], cc[3], 1]);
}

// walking graph: every street, square, footway and stair (no motorways), both directions, pedestrian ways preferred
const WALKG = (() => {
  const key = new Map(), X = [], Z = [], adj = []; const K = (x, z) => Math.round(x * 4) + ',' + Math.round(z * 4);
  const node = (x, z) => { const k = K(x, z); let i = key.get(k); if (i === undefined) { i = X.length; key.set(k, i); X.push(x); Z.push(z); adj.push([]); } return i; };
  const COST = { 11: 0.85, 12: 0.95, 13: 0.75, 14: 0.8, 15: 0.9, 16: 0.9, 17: 1.1, 18: 0.9, 10: 1.0, 9: 1.0 };
  for (const rd of DATA.R) { const t = rd[0]; if (t <= 2 || t === 4 || t === 1) continue; const c = rd[4]; const f = COST[t] || 1.15; let prev = node(c[0], c[1]);
    for (let i = 2; i < c.length; i += 2) { const cur = node(c[i], c[i + 1]); if (cur !== prev) { const w = Math.hypot(X[cur] - X[prev], Z[cur] - Z[prev]) * f; adj[prev].push(cur, w); adj[cur].push(prev, w); } prev = cur; } }
  const CS = 40, grid = new Map(); for (let i = 0; i < X.length; i++) { if (!adj[i].length) continue; const g = Math.floor(X[i] / CS) * 100000 + Math.floor(Z[i] / CS); let l = grid.get(g); if (!l) grid.set(g, l = []); l.push(i); }
  function nearest(x, z) { let best = -1, bd = 1e18; const a0 = Math.floor(x / CS), b0 = Math.floor(z / CS);
    for (let r = 1; r <= 5 && best < 0; r++) for (let a = a0 - r; a <= a0 + r; a++) for (let b = b0 - r; b <= b0 + r; b++) { const l = grid.get(a * 100000 + b); if (!l) continue; for (const i of l) { const d = (X[i] - x) ** 2 + (Z[i] - z) ** 2; if (d < bd) { bd = d; best = i; } } }
    return best; }
  function route(x0, z0, x1, z1) {
    const s = nearest(x0, z0), t = nearest(x1, z1); if (s < 0 || t < 0) return null;
    const g = new Float64Array(X.length).fill(Infinity), came = new Int32Array(X.length).fill(-1); g[s] = 0;
    const hp = [[Math.hypot(X[s] - X[t], Z[s] - Z[t]) * 0.75, s]];
    const push = (e) => { hp.push(e); let i = hp.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (hp[p][0] <= hp[i][0]) break; [hp[p], hp[i]] = [hp[i], hp[p]]; i = p; } };
    const pop = () => { const top = hp[0], last = hp.pop(); if (hp.length) { hp[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < hp.length && hp[l][0] < hp[m][0]) m = l; if (r < hp.length && hp[r][0] < hp[m][0]) m = r; if (m === i) break; [hp[m], hp[i]] = [hp[i], hp[m]]; i = m; } } return top; };
    let it = 0; while (hp.length && it++ < 60000) { const [, u] = pop(); if (u === t) break; const A = adj[u]; for (let k = 0; k < A.length; k += 2) { const v = A[k], ng = g[u] + A[k + 1]; if (ng < g[v]) { g[v] = ng; came[v] = u; push([ng + Math.hypot(X[v] - X[t], Z[v] - Z[t]) * 0.75, v]); } } }
    if (s !== t && came[t] < 0) return null; const out = []; for (let c = t; c >= 0; c = c === s ? -1 : came[c]) out.push(Z[c], X[c]); out.reverse(); return out;
  }
  return { route, nearest };
})();
const GPS = { target: null, path: null, t: 0, story: false };
function setWaypoint(x, z, story) {
  if (x === null) { GPS.target = null; GPS.path = null; GPS.story = false; return; }
  GPS.target = [x, z]; GPS.story = !!story; GPS.t = 0; updateGPS(true);
}
function updateGPS(force) {
  const tgt = MISSIONS.target() || GPS.target; if (!tgt) { GPS.path = null; return; }
  GPS.t -= 1; if (!force && GPS.t > 0) return; GPS.t = 45;
  // on foot: shortest walk (squares, pedestrian streets, footways, stairs); driving: the road graph
  let p = null; if (!PLAYER.car) p = WALKG.route(PLAYER.x, PLAYER.z, tgt[0], tgt[1]);
  if (!p) { const a = GRAPH.nearestNode(PLAYER.x, PLAYER.z), b = GRAPH.nearestNode(tgt[0], tgt[1]); p = GRAPH.route(a, b); }
  GPS.path = p ? [PLAYER.x, PLAYER.z, ...p, tgt[0], tgt[1]] : null;
  if (GPS.target && Math.hypot(GPS.target[0] - PLAYER.x, GPS.target[1] - PLAYER.z) < 25) { if (!GPS.story) HUD.toast('Has llegado al destino', '#e040fb'); GPS.target = null; GPS.story = false; }
}

const HUD = (() => {
  const mm = $('minimap'), mx = mm.getContext('2d');
  let locPend = '', locPendN = 0, locLast = '', locT = 0, vehT = 0, toastT = 0, subT = 0, bigT = 0;
  const starsEl = $('stars'); starsEl.innerHTML = '<span>★</span>'.repeat(5);
  function blip(x, z, color, size, shape = 'dot', clampEdge = false) {
    // world -> minimap (already transformed context)
    mx.fillStyle = color; mx.strokeStyle = '#000'; mx.lineWidth = 2 / mmScale;
    mx.beginPath(); if (shape === 'sq') mx.rect(x - size, z - size, size * 2, size * 2); else mx.arc(x, z, size, 0, 7); mx.fill(); mx.stroke();
  }
  let mmScale = 1;
  function drawMinimap() {
    const W = mm.width, H = mm.height, R = W / 2;
    if (PLAYER.interior) { mx.clearRect(0, 0, W, H); mx.fillStyle = '#1c2520'; mx.beginPath(); mx.arc(R, R, R, 0, 7); mx.fill(); mx.fillStyle = '#f5b72e'; mx.font = 'bold 30px Oswald, sans-serif'; mx.textAlign = 'center'; mx.fillText('INTERIOR', R, R - 10); mx.fillStyle = '#fff'; mx.font = '600 22px Barlow, sans-serif'; mx.fillText(PLAYER.interior.name.slice(0, 26), R, R + 26); return; }
    const car = PLAYER.car; const zoom = car ? clamp(1.0 - car.speed * 0.012, 0.5, 1.0) : 1.15; mmScale = zoom * MAP.scale * (W / 230) * 0.9;
    mx.save(); mx.clearRect(0, 0, W, H); mx.beginPath(); mx.arc(R, R, R, 0, 7); mx.clip();
    mx.fillStyle = '#1c2520'; mx.fillRect(0, 0, W, H);
    mx.translate(R, R + R * 0.25); mx.rotate(CAM.yaw - Math.PI); mx.scale(mmScale / MAP.scale, mmScale / MAP.scale);
    // map image (in meters space after scaling)
    mx.save(); mx.translate(-PLAYER.x, -PLAYER.z); mx.scale(1 / MAP.scale, 1 / MAP.scale); mx.translate(MAP.x0 * MAP.scale, MAP.z0 * MAP.scale);
    mx.drawImage(MAPC, 0, 0); mx.restore();
    mx.translate(-PLAYER.x, -PLAYER.z); const s = 1 / mmScale * MAP.scale;
    // GPS route
    if (GPS.path) { mx.strokeStyle = MISSIONS.target() || GPS.story ? '#f5b72e' : '#e040fb'; mx.lineWidth = 7 * s * 1.6; mx.lineJoin = 'round'; mx.lineCap = 'round'; mx.beginPath(); const p = GPS.path; for (let i = 0; i < p.length; i += 2) i ? mx.lineTo(p[i], p[i + 1]) : mx.moveTo(p[i], p[i + 1]); mx.stroke(); }
    // tram
    if (TRAM.parts) { const t = TRAM.parts[0].position; blip(t.x, t.z, '#e04848', 5 * s * 1.6, 'sq'); }
    // police
    const fl = Math.floor(performance.now() / 250) % 2;
    for (const c of CARS) if (c.driver === 'police') blip(c.x, c.z, fl ? '#3d7bff' : '#ff3d3d', 6 * s * 1.6);
    // mission markers & waypoint (clamped to edge)
    const edge = (x, z, col, sz) => { const dx = x - PLAYER.x, dz = z - PLAYER.z; const d = Math.hypot(dx, dz); const maxd = (R * 0.92) / (mmScale / MAP.scale) ; let px = x, pz = z; if (d > maxd * 0.95) { px = PLAYER.x + dx / d * maxd * 0.95; pz = PLAYER.z + dz / d * maxd * 0.95; } blip(px, pz, col, sz); };
    for (const it of INTERIORS) for (const d of it.doors) { if (Math.abs(d.x - PLAYER.x) < 400 && Math.abs(d.z - PLAYER.z) < 400) blip(d.x, d.z, '#3ddc97', 6 * s * 1.6, 'sq'); }
    for (const f of FOOD.shops) { if (Math.abs(f.x - PLAYER.x) < 400 && Math.abs(f.z - PLAYER.z) < 400) blip(f.x, f.z, '#e53935', 6 * s * 1.6, 'sq'); }
    for (const m of MISSIONS.blips()) edge(m[0], m[1], m[2] || '#f5b72e', 9 * s * 1.6);
    if (GPS.target) edge(GPS.target[0], GPS.target[1], '#e040fb', 9 * s * 1.6);
    // player arrow
    mx.save(); mx.translate(PLAYER.x, PLAYER.z); mx.rotate(-(PLAYER.car ? PLAYER.car.h : PLAYER.h) + Math.PI); const a = 11 * s * 1.6;
    mx.fillStyle = '#fff'; mx.strokeStyle = '#000'; mx.lineWidth = 2.5 * s; mx.beginPath(); mx.moveTo(0, -a); mx.lineTo(a * 0.7, a * 0.7); mx.lineTo(0, a * 0.35); mx.lineTo(-a * 0.7, a * 0.7); mx.closePath(); mx.fill(); mx.stroke(); mx.restore();
    mx.restore();
    // north marker on the rim
    const ang = CAM.yaw - Math.PI; const nx = R + Math.sin(-ang) * (R - 16) * -1, nz = R - Math.cos(ang) * (R - 16);
    const vx = Math.sin(ang), vz = -Math.cos(ang); // north (0,-1) rotated
    mx.fillStyle = '#111'; mx.beginPath(); const Nx = R + (R - 18) * (-Math.sin(ang)) * -1, Nz = R + (R - 18) * -Math.cos(ang);
    const px = R + (R - 18) * Math.sin(ang), pz = R + (R - 18) * -Math.cos(ang) + R * 0.0;
    mx.arc(px, pz, 15, 0, 7); mx.fill(); mx.strokeStyle = '#fff'; mx.lineWidth = 2; mx.stroke(); mx.fillStyle = '#fff'; mx.font = 'bold 18px Oswald, sans-serif'; mx.textAlign = 'center'; mx.textBaseline = 'middle'; mx.fillText('N', px, pz + 1);
    // ring
    mx.strokeStyle = 'rgba(0,0,0,.6)'; mx.lineWidth = 6; mx.beginPath(); mx.arc(R, R, R - 3, 0, 7); mx.stroke();
  }
  function locationName() {
    const rd = ROADSEG.nearest(PLAYER.x, PLAYER.z, (r) => r[1] >= 0); let street = rd && rd.d < 30 ? STR[DATA.R[rd.ri][1]] : '';
    const cur = locLast && locLast.split('|')[0]; if (cur && street && street !== cur) { const rc = ROADSEG.nearest(PLAYER.x, PLAYER.z, (r) => r[1] >= 0 && STR[r[1]] === cur); if (rc && rc.d < rd.d + 5 && rc.d < 18) street = cur; }
    let area = isHistoric(PLAYER.x, PLAYER.z) ? 'Casco Histórico' : '';
    if (!area) { let bd = 1e9; for (const p of DATA.P) if (p[1] === 'suburb') { const d = Math.hypot(p[2] - PLAYER.x, p[3] - PLAYER.z); if (d < bd) { bd = d; area = STR[p[0]]; } } if (bd > 700) area = 'San Cristóbal de La Laguna'; }
    const cc = DATA.P.find((p) => STR[p[0]] === 'Campus Central'); if (cc && Math.hypot(cc[2] - PLAYER.x, cc[3] - PLAYER.z) < 350 && !isHistoric(PLAYER.x, PLAYER.z)) area = 'Campus Central · ULL';
    if (Math.hypot(PLAYER.x - 150, PLAYER.z + 950) < 260) area = 'Parque de La Vega';
    return [street, area];
  }
  let tick = 0;
  return {
    resize() { },
    update(dt) {
      { const ce = $('coords'); if (ce) { const t = 'X ' + Math.round(PLAYER.x) + '   Z ' + Math.round(PLAYER.z); if (ce.textContent !== t) ce.textContent = t; } }
      tick++;
      drawMinimap();
      // clock & money
      const h = GAME.tod, hh = Math.floor(h), mm2 = Math.floor((h - hh) * 60);
      $('clock').textContent = String(hh).padStart(2, '0') + ':' + String(mm2).padStart(2, '0');
      $('money').textContent = '$' + String(Math.floor(PLAYER.money)).padStart(8, '0');
      const st = Math.ceil(WANTED.level); [...starsEl.children].forEach((s, i) => s.classList.toggle('on', i < st)); starsEl.classList.toggle('flash', WANTED.flash > 2);
      $('hb').style.width = clamp(PLAYER.health, 0, 100) + '%';
      if (tick % 20 === 0) { let [s, a] = locationName(); if (!s && locLast) s = locLast.split('|')[0]; const key = s + '|' + a;
        // hysteresis: a new street must hold for ~1 s so junctions don't flicker; shown 10 s, and again every 10 s of silence on long streets
        if (key !== locLast) { if (key === locPend) locPendN++; else { locPend = key; locPendN = 1; } if (locPendN >= 3 || !locLast) { locLast = key; locPend = ''; $('locStreet').textContent = s; $('locArea').textContent = a; locT = 10; } } else locPend = ''; }
      if (locT < -10 && (PLAYER.speed > 1 || (PLAYER.car && PLAYER.car.speed > 1))) locT = 10;
      locT -= dt; $('loc').style.opacity = locT > 0 ? 1 : 0;
      vehT -= dt; $('veh').style.opacity = vehT > 0 ? 1 : 0;
      toastT -= dt; $('toast').style.opacity = toastT > 0 ? 1 : 0;
      subT -= dt; $('sub').style.opacity = subT > 0 ? 1 : 0;
      bigT -= dt; $('big').style.opacity = bigT > 0 ? 1 : 0;
      const sp = $('speed'); if (PLAYER.car) { sp.style.display = 'block'; $('kmh').textContent = Math.round(PLAYER.car.speed * 3.6); } else sp.style.display = 'none';
      // prompt
      let pr = '';
      if (!PLAYER.car) { const t = nearestEnterable(); if (t) pr = t instanceof Car && t.driver ? '<kbd>F</kbd> Robar vehículo' : '<kbd>F</kbd> Entrar en el vehículo'; }
      else if (PLAYER.car.speed < 2 && tick % 1 === 0 && PLAYER.car.health <= 0) pr = 'Motor averiado · <kbd>F</kbd> para salir';
      const dr = nearestDoor(); if (dr) pr = dr.exit ? '<kbd>E</kbd> Salir a la calle' : `<kbd>E</kbd> Entrar: ${dr.it.name}`;
      { const f = FOOD.near(); if (f && (!dr || (f.counter && dr.exit && Math.hypot(PLAYER.x - f.x, PLAYER.z - f.z) < Math.hypot(PLAYER.x - dr.it.exit.x, PLAYER.z - dr.it.exit.z)))) pr = `<kbd>E</kbd> ${f.counter ? 'Pedir en la barra' : 'Comprar comida'}: ${f.name}`; }
      const mp = MISSIONS.prompt(); if (mp) pr = mp;
      const pe = $('prompt'); if (pr) { pe.innerHTML = pr; pe.style.display = 'block'; } else pe.style.display = 'none';
    },
    vehicle(n, cat) { $('veh').innerHTML = `<small>${cat || ''}</small>${n}`; vehT = 5; },
    toast(t, color = '#fff', dur = 3) { const e = $('toast'); e.textContent = t; e.style.color = color; toastT = dur; },
    big(t, color = '#fff', dur = 3.5) { const e = $('bigtxt'); e.textContent = t; e.style.color = color; bigT = dur; },
    sub(html, dur) { $('sub').innerHTML = html; subT = dur; },
  };
})();
const SUB = { show(t, d = 3) { HUD.sub(t, d); } };
$('sub').addEventListener('pointerdown', (e) => { if ($('sub').classList.contains('talking')) { e.preventDefault(); e.stopPropagation(); talkSkip(); } });

// ---------- big map
const BIGMAP = (() => {
  const el = $('bigmap'), cv = $('bmc'), x = cv.getContext('2d'); let open = false, cx = 0, cz = 0, zoom = 0.5, drag = null, moved = false;
  function draw() {
    const W = cv.width = el.clientWidth * devicePixelRatio, H = cv.height = el.clientHeight * devicePixelRatio; const k = zoom * devicePixelRatio;
    x.fillStyle = '#11181a'; x.fillRect(0, 0, W, H);
    x.save(); x.translate(W / 2, H / 2); x.scale(k, k); x.translate(-cx, -cz);
    x.save(); x.translate(MAP.x0, MAP.z0); x.scale(1 / MAP.scale, 1 / MAP.scale); x.drawImage(MAPC, 0, 0); x.restore();
    if (GPS.path) { x.strokeStyle = MISSIONS.target() || GPS.story ? '#f5b72e' : '#e040fb'; x.lineWidth = 6 / k * devicePixelRatio; x.beginPath(); const p = GPS.path; for (let i = 0; i < p.length; i += 2) i ? x.lineTo(p[i], p[i + 1]) : x.moveTo(p[i], p[i + 1]); x.stroke(); }
    const dot = (px, pz, c, r) => { x.fillStyle = c; x.strokeStyle = '#000'; x.lineWidth = 2 / k * devicePixelRatio; x.beginPath(); x.arc(px, pz, r / k * devicePixelRatio, 0, 7); x.fill(); x.stroke(); };
    x.textAlign = 'center'; x.textBaseline = 'middle';
    for (const [n, lx, lz, t, col] of LABELS) { if (t === 2 && zoom > 1.5) continue; if (t === 4) { x.fillStyle = '#3ddc97'; x.strokeStyle = '#000'; x.lineWidth = 2 * devicePixelRatio / k; const sz = 5 * devicePixelRatio / k; x.fillRect(lx - sz, lz - sz, sz * 2, sz * 2); x.strokeRect(lx - sz, lz - sz, sz * 2, sz * 2); if (zoom > 0.9) { x.font = `600 ${11 * devicePixelRatio / k}px Barlow, sans-serif`; x.fillStyle = '#3ddc97'; x.fillText(n, lx, lz - 12 * devicePixelRatio / k); } continue; }
      if (t === 3) { if (zoom < 1.4) continue; x.font = `600 ${11 * devicePixelRatio / k}px Barlow, sans-serif`; x.fillStyle = col || '#fff'; x.beginPath(); x.arc(lx, lz, 3 * devicePixelRatio / k, 0, 7); x.fill(); x.fillStyle = '#e8e8e8'; x.fillText(n, lx, lz - 9 * devicePixelRatio / k); continue; } x.font = `${t === 2 ? 700 : 600} ${(t === 2 ? 15 : 13) * devicePixelRatio / k}px ${t === 2 ? 'Oswald' : 'Barlow'}, sans-serif`; x.lineWidth = 3 * devicePixelRatio / k; x.strokeStyle = 'rgba(0,0,0,.8)'; x.strokeText(n, lx, lz); x.fillStyle = t === 2 ? '#9fd7ff' : '#fff'; x.fillText(n, lx, lz); }
    for (const c of CARS) if (c.driver === 'police') dot(c.x, c.z, '#3d7bff', 5);
    for (const f of FOOD.shops) { x.fillStyle = '#e53935'; x.strokeStyle = '#fff'; x.lineWidth = 1.5 / k * devicePixelRatio; const sz = 5 * devicePixelRatio / k; x.fillRect(f.x - sz, f.z - sz, sz * 2, sz * 2); x.strokeRect(f.x - sz, f.z - sz, sz * 2, sz * 2); }
    for (const m of MISSIONS.blips()) dot(m[0], m[1], m[2] || '#f5b72e', 8);
    if (GPS.target) dot(GPS.target[0], GPS.target[1], '#e040fb', 8);
    x.save(); x.translate(PLAYER.x, PLAYER.z); x.rotate(-(PLAYER.car ? PLAYER.car.h : PLAYER.h) + Math.PI); const a = 12 / k * devicePixelRatio; x.fillStyle = '#fff'; x.strokeStyle = '#000'; x.lineWidth = 2 / k * devicePixelRatio; x.beginPath(); x.moveTo(0, -a); x.lineTo(a * 0.7, a * 0.7); x.lineTo(0, a * 0.35); x.lineTo(-a * 0.7, a * 0.7); x.closePath(); x.fill(); x.stroke(); x.restore();
    x.restore();
  }
  const toWorld = (ev) => { const r = cv.getBoundingClientRect(); return [cx + (ev.clientX - r.left - r.width / 2) / zoom, cz + (ev.clientY - r.top - r.height / 2) / zoom]; };
  const ptrs = new Map(); let pinch = null;
  const zoomAt = (f, sx, sy) => { const r = cv.getBoundingClientRect(); const wx = cx + (sx - r.left - r.width / 2) / zoom, wz = cz + (sy - r.top - r.height / 2) / zoom; zoom = clamp(zoom * f, 0.2, 4); cx = wx - (sx - r.left - r.width / 2) / zoom; cz = wz - (sy - r.top - r.height / 2) / zoom; draw(); };
  cv.addEventListener('pointerdown', (e) => { ptrs.set(e.pointerId, [e.clientX, e.clientY]); cv.setPointerCapture(e.pointerId); if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = Math.hypot(a[0] - b[0], a[1] - b[1]); drag = null; moved = true; return; } drag = [e.clientX, e.clientY, cx, cz]; moved = false; });
  cv.addEventListener('pointermove', (e) => { if (ptrs.has(e.pointerId)) ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (pinch && ptrs.size === 2) { const [a, b] = [...ptrs.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (d > 10) { zoomAt(d / pinch, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); pinch = d; } return; }
    { const [wx, wz] = toWorld(e); $('bmCoords').textContent = 'Cursor: X ' + Math.round(wx) + '   Z ' + Math.round(wz) + (GPS.target ? '   ·   Destino: X ' + Math.round(GPS.target[0]) + '   Z ' + Math.round(GPS.target[1]) : ''); }
    if (!drag) return; const dx = e.clientX - drag[0], dy = e.clientY - drag[1]; if (Math.abs(dx) + Math.abs(dy) > 4) moved = true; cx = drag[2] - dx / zoom; cz = drag[3] - dy / zoom; draw(); });
  const up = (e) => { ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch = null; };
  cv.addEventListener('pointercancel', (e) => { up(e); drag = null; });
  const tap = (id, f) => $(id).addEventListener('pointerdown', (e) => { e.stopPropagation(); e.preventDefault(); f(); });
  tap('bmClose', () => { if (open) BIGMAP.toggle(); });
  tap('bmTp', () => BIGMAP.teleport());
  tap('bmZi', () => { const r = cv.getBoundingClientRect(); zoomAt(1.35, r.left + r.width / 2, r.top + r.height / 2); });
  tap('bmZo', () => { const r = cv.getBoundingClientRect(); zoomAt(1 / 1.35, r.left + r.width / 2, r.top + r.height / 2); });
  cv.addEventListener('pointerup', (e) => { up(e); if (pinch) return; if (!moved && e.button === 0) { const [wx, wz] = toWorld(e); setWaypoint(wx, wz); AUDIO.cash(); draw(); $('bmCoords').textContent = 'Destino: X ' + Math.round(wx) + '   Z ' + Math.round(wz); } drag = null; });
  cv.addEventListener('contextmenu', (e) => { e.preventDefault(); setWaypoint(null); draw(); });
  cv.addEventListener('wheel', (e) => { const [wx, wz] = toWorld(e); zoom = clamp(zoom * (e.deltaY < 0 ? 1.2 : 1 / 1.2), 0.2, 4); const r = cv.getBoundingClientRect(); cx = wx - (e.clientX - r.left - r.width / 2) / zoom; cz = wz - (e.clientY - r.top - r.height / 2) / zoom; draw(); }, { passive: true });
  return {
    get open() { return open; },
    toggle() { open = !open; el.style.display = open ? 'block' : 'none'; if (open) { cx = PLAYER.x; cz = PLAYER.z; zoom = 0.45; document.exitPointerLock?.(); draw(); } else if (GAME.state === 'achaman') achLock(); else GAME.lock(); },
    redraw() { if (open) draw(); },
    teleport() {
      if (!GPS.target) { HUD.toast('Toca un punto del mapa para marcar el destino', '#f5b72e', 3); return; }
      if (GAME.state === 'achaman') { const [x, z] = GPS.target; ACH.x = x; ACH.z = z; ACH.y = Math.max(ACH.y, heightAt(x, z) + 60); if (ACH.mode === 'dron') achSetMode('dron'); setWaypoint(null); BIGMAP.toggle(); HUD.toast('Volando hasta allí', '#3ddc97', 2); return; }
      if (PLAYER.interior) { HUD.toast('Sal del edificio antes de teletransportarte', '#f5b72e', 3); return; }
      if (WANTED.level > 0) { HUD.toast('Con la policía detrás no hay teletransporte, guas', '#ff5252', 3); return; }
      let [x, z] = GPS.target; const c = PLAYER.car;
      if (c) { const free = (a, b) => !inAnyBuilding(a, b) && !COL.nearSeg(a, b, 1.6) && !lowAt(a, b, heightAt(a, b)) && !parkedNear(a, b, 3).length;
        let rn = ROADSEG.nearest(x, z, (r) => r[0] <= 12 && !(r[3] & 6)); if (rn && rn.d < 90 && free(rn.x, rn.z)) { x = rn.x; z = rn.z; c.h = Math.atan2(rn.dx, rn.dz); }
        else { let found = false; for (let r = 2; r <= 120 && !found; r += 2) for (let k = 0; k < 24 && !found; k++) { const a = k / 24 * Math.PI * 2, px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r; if (free(px, pz)) { x = px; z = pz; found = true; } }
          rn = ROADSEG.nearest(x, z, (r) => r[0] <= 12); if (rn && rn.d < 4) c.h = Math.atan2(rn.dx, rn.dz); }
        c.x = x; c.z = z; c.vx = c.vz = 0; c.fwdV = 0; c.yawRate = 0; c.y = heightAt(x, z) + 0.2; c.low = null; c.onDeck = false; c.sync(0.016); PLAYER.x = x; PLAYER.z = z; PLAYER.y = c.y; }
      else { const sp = safeSpot(x, z, 0.6); PLAYER.x = sp[0]; PLAYER.z = sp[1]; PLAYER.y = heightAt(sp[0], sp[1]) + 0.2; PLAYER.vy = 0; PLAYER.low = null; PLAYER.onDeck = false; }
      setWaypoint(null); if (open) BIGMAP.toggle(); updateCamera(0.016); AUDIO.cash(); HUD.toast('Teletransportado', '#3ddc97', 2);
    },
  };
})();

// ---------- touch controls
function setupTouch() {
  const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  if (!isTouch) return; document.body.classList.add('touchmode'); $('touch').style.display = 'block';
  const joy = $('joy'), k = $('joyk'); let jid = null, lookId = null, lx = 0, ly = 0;
  joy.addEventListener('pointerdown', (e) => { jid = e.pointerId; joy.setPointerCapture(jid); INPUT.touch.active = true; move(e); });
  const move = (e) => { if (e.pointerId !== jid) return; const r = joy.getBoundingClientRect(); let dx = (e.clientX - r.left - r.width / 2) / (r.width / 2), dy = (e.clientY - r.top - r.height / 2) / (r.height / 2); const l = Math.hypot(dx, dy); if (l > 1) { dx /= l; dy /= l; } INPUT.touch.x = dx; INPUT.touch.y = dy; k.style.transform = `translate(${dx * 45}px,${dy * 45}px)`; };
  joy.addEventListener('pointermove', move);
  const end = (e) => { if (e.pointerId !== jid) return; jid = null; INPUT.touch.active = false; INPUT.touch.x = INPUT.touch.y = 0; k.style.transform = ''; };
  joy.addEventListener('pointerup', end); joy.addEventListener('pointercancel', end);
  const t = $('touch');
  t.addEventListener('pointerdown', (e) => { if (e.target !== t) return; lookId = e.pointerId; lx = e.clientX; ly = e.clientY; });
  t.addEventListener('pointermove', (e) => { if (e.pointerId !== lookId) return; INPUT.touch.look[0] += (e.clientX - lx) * 2.2; INPUT.touch.look[1] += (e.clientY - ly) * 2.2; lx = e.clientX; ly = e.clientY; });
  t.addEventListener('pointerup', (e) => { if (e.pointerId === lookId) lookId = null; });
  const btn = (id, down, up) => { const b = $(id); b.addEventListener('pointerdown', (e) => { e.stopPropagation(); down(); }); if (up) { b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); } };
  btn('tbF', () => PRESSED.add(!PLAYER.car && (nearestDoor() || FOOD.near()) && !nearestEnterable() ? 'KeyE' : 'KeyF'));
  btn('tbJ', () => { INPUT.touch.jump = true; INPUT.touch.hb = true; }, () => { INPUT.touch.hb = false; });
  btn('tbS', () => (INPUT.touch.sprint = true), () => (INPUT.touch.sprint = false));
  btn('tbM', () => BIGMAP.toggle());
  btn('tbA', () => { WEAPON.touchAim = !WEAPON.touchAim; if (!WEAPON.touchAim) WEAPON.aiming = false; $('tbA').style.borderColor = WEAPON.touchAim ? '#3ddc97' : ''; });
  btn('tbD', () => { if (canUse()) WEAPON.want = true; });
}
