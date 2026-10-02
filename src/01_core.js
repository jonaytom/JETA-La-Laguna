// ============ GTA La Laguna — core ============
import * as THREE from 'three';

const DATA = JSON.parse(document.getElementById('mapdata').textContent);
const STR = DATA.S;
// widen drivable streets a bit so cars fit through the old town
// widen drivable streets (real-life feel: OSM default widths read too narrow at game scale)
const WIDEN = (t, w, one) => { const f = t <= 2 ? 1.12 : t <= 8 ? 1.3 : t <= 10 ? 1.22 : 1.15; const mn = t === 12 ? 5 : t === 11 ? 5.5 : one ? 6 : t <= 8 ? 9 : 8; return Math.round(Math.max(w * f, mn) * 10) / 10; };
const CORE0 = [[-680, -420], [-420, -640], [-120, -700], [320, -720], [360, 120], [260, 320], [-160, 300], [-420, 120], [-700, -120]];
const inCore0 = (x, z) => { let ins = false; for (let i = 0, j = CORE0.length - 1; i < CORE0.length; j = i++) { const [xi, zi] = CORE0[i], [xj, zj] = CORE0[j]; if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) ins = !ins; } return ins; };
const WIDEN2 = (t, w, one, x, z) => inCore0(x, z) && t >= 9 ? Math.round(Math.max(w * 1.15, t === 12 ? 5 : 7.2) * 10) / 10 : WIDEN(t, w, one);
for (const rd of DATA.R) { if (rd[0] <= 12) { const c = rd[4], m = (c.length >> 2) << 1; rd[2] = WIDEN2(rd[0], rd[2], rd[3] & 1, c[m], c[m + 1]); } }
for (const e of DATA.G.e) { const a = e[0] * 2; e[4] = WIDEN2(e[2], e[4], e[3], DATA.G.n[a], DATA.G.n[a + 1]); }
const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
const angDiff = (a, b) => { let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
// ---- separate carriageways that overlap: the two directions of a dual road, and an autovía running beside a general road.
// Every shared vertex moves the same way in the road list AND in the traffic graph, so junctions stay joined.
const SEPAR = []; // [ax, az, bx, bz, kind] midline runs for medians (kind: 2 = concrete barrier, 1 = kerb island)
(function separateCarriageways() {
  const R = DATA.R; const segs = []; const G = new Map(), CS = 30;
  R.forEach((rd, ri) => { if (rd[0] > 10) return; const c = rd[4]; for (let i = 0; i < c.length - 2; i += 2) { const k = segs.length; segs.push([ri, c[i], c[i + 1], c[i + 2], c[i + 3]]);
    const x0 = Math.floor(Math.min(c[i], c[i + 2]) / CS), x1 = Math.floor(Math.max(c[i], c[i + 2]) / CS), z0 = Math.floor(Math.min(c[i + 1], c[i + 3]) / CS), z1 = Math.floor(Math.max(c[i + 1], c[i + 3]) / CS);
    for (let a = x0; a <= x1; a++) for (let b = z0; b <= z1; b++) { const key = a * 100000 + b; let l = G.get(key); if (!l) G.set(key, l = []); l.push(k); } } });
  const nodeSet = R.map((rd) => { const st = new Set(); const c = rd[4]; for (let i = 0; i < c.length; i += 2) st.add(c[i] + ',' + c[i + 1]); return st; });
  const big = (t) => t <= 2; const MED = (ta, tb) => big(ta) && big(tb) ? 2.4 : big(ta) || big(tb) ? 2.6 : 1.4; // (a sunk road beside one at street level gets the same gap: its retaining wall goes there)
  const shifts = new Map(); let nPairs = 0;
  R.forEach((rd, ri) => { if (rd[0] > 10) return; const c = rd[4], n = c.length / 2; if (n < 2) return; const sh = new Array(n).fill(null);
    for (let v = 0; v < n; v++) { const x = c[v * 2], z = c[v * 2 + 1]; const p = Math.max(0, v - 1), q = Math.min(n - 1, v + 1); let dx = c[q * 2] - c[p * 2], dz = c[q * 2 + 1] - c[p * 2 + 1]; const dl = Math.hypot(dx, dz) || 1; dx /= dl; dz /= dl;
      let best = null; const l = G.get(Math.floor(x / CS) * 100000 + Math.floor(z / CS)) || [];
      for (const k of l) { const g = segs[k]; const rj = g[0]; if (rj === ri) continue; const r2 = R[rj]; if ((r2[3] & 2) !== (rd[3] & 2)) continue; // a bridge and a road below are not side by side
        const ex = g[3] - g[1], ez = g[4] - g[2], L2 = ex * ex + ez * ez || 1, L = Math.sqrt(L2); const t = clamp(((x - g[1]) * ex + (z - g[2]) * ez) / L2, 0, 1); if (t <= 0 || t >= 1) continue;
        const px = g[1] + ex * t, pz = g[2] + ez * t, d = Math.hypot(x - px, z - pz); if (d < 1.2) continue; const dot = (dx * ex + dz * ez) / L; if (Math.abs(dot) < 0.94) continue;
        const need = (rd[2] + r2[2]) / 2 + MED(rd[0], r2[0]) - d; if (need <= 0.05) continue;
        // merges/splits: the two ways share a node close by → fade the shift out towards it
        let dj = 1e9; for (let i = 0; i < c.length; i += 2) if (nodeSet[rj].has(c[i] + ',' + c[i + 1])) dj = Math.min(dj, Math.hypot(c[i] - x, c[i + 1] - z));
        const f = clamp((dj - 18) / 45, 0, 1); if (f <= 0) continue;
        const m = Math.min(3.2, need / 2) * f; if (!best || m > best.m) best = { m, ux: (x - px) / d, uz: (z - pz) / d, kind: big(rd[0]) || big(r2[0]) ? 2 : 1 }; }
      if (best) sh[v] = best; }
    // smooth along the road (no kinks where the neighbour starts/ends)
    const mag = sh.map((b) => (b ? b.m : 0)); const sm = mag.slice(); for (let pass = 0; pass < 2; pass++) for (let v = 0; v < n; v++) { if (!sh[v]) continue; const a = mag[Math.max(0, v - 1)], b = mag[Math.min(n - 1, v + 1)]; sm[v] = Math.max(sm[v], (a + mag[v] * 2 + b) / 4); }
    for (let v = 0; v < n; v++) { if (!sh[v]) continue; nPairs++; const key = c[v * 2] + ',' + c[v * 2 + 1]; const o = shifts.get(key); const mx = sh[v].ux * sm[v], mz = sh[v].uz * sm[v];
      if (!o) shifts.set(key, [mx, mz, 1]); else { o[0] += mx; o[1] += mz; o[2]++; } } });
  // apply the same displacement to every copy of each vertex
  // never let the shift make two ways cross where they didn't before: undo it around any new crossing
  const P2 = (k) => { const o = shifts.get(k); const [x, z] = k.split(',').map(Number); return o ? [x + o[0] / o[2], z + o[1] / o[2]] : [x, z]; };
  const inter = (a, b, c2, d) => { const d1x = b[0] - a[0], d1z = b[1] - a[1], d2x = d[0] - c2[0], d2z = d[1] - c2[1]; const den = d1x * d2z - d1z * d2x; if (Math.abs(den) < 1e-9) return false; const t = ((c2[0] - a[0]) * d2z - (c2[1] - a[1]) * d2x) / den, u = ((c2[0] - a[0]) * d1z - (c2[1] - a[1]) * d1x) / den; return t > 0.001 && t < 0.999 && u > 0.001 && u < 0.999; };
  for (let it = 0; it < 3; it++) { let undone = 0;
    for (const g of segs) { const ka = g[1] + ',' + g[2], kb = g[3] + ',' + g[4]; if (!shifts.has(ka) && !shifts.has(kb)) continue; const A0 = [g[1], g[2]], B0 = [g[3], g[4]], A1 = P2(ka), B1 = P2(kb);
      const x0 = Math.floor(Math.min(A1[0], B1[0], g[1], g[3]) / CS), x1 = Math.floor(Math.max(A1[0], B1[0], g[1], g[3]) / CS), z0 = Math.floor(Math.min(A1[1], B1[1], g[2], g[4]) / CS), z1 = Math.floor(Math.max(A1[1], B1[1], g[2], g[4]) / CS);
      for (let a = x0; a <= x1; a++) for (let b = z0; b <= z1; b++) for (const k of G.get(a * 100000 + b) || []) { const h = segs[k]; if (h[0] === g[0]) continue; const kc = h[1] + ',' + h[2], kd = h[3] + ',' + h[4]; if (kc === ka || kc === kb || kd === ka || kd === kb) continue;
        if (inter(A1, B1, P2(kc), P2(kd)) && !inter(A0, B0, [h[1], h[2]], [h[3], h[4]])) { for (const kk of [ka, kb, kc, kd]) if (shifts.delete(kk)) undone++;
          for (const rr of [g[0], h[0]]) { const c = R[rr][4]; for (let i = 0; i < c.length; i += 2) if (Math.hypot(c[i] - g[1], c[i + 1] - g[2]) < 45) shifts.delete(c[i] + ',' + c[i + 1]); } } } }
    if (!undone) break; console.log('separation undone near new crossings', undone); }
  const mv = (x, z) => { const o = shifts.get(x + ',' + z); return o ? [x + o[0] / o[2], z + o[1] / o[2]] : null; };
  const done = new Set();
  for (const rd of R) { const c = rd[4]; for (let i = 0; i < c.length; i += 2) { const m = mv(c[i], c[i + 1]); if (m) { c[i] = m[0]; c[i + 1] = m[1]; } } }
  const N = DATA.G.n; for (let i = 0; i < N.length; i += 2) { const m = mv(N[i], N[i + 1]); if (m) { N[i] = m[0]; N[i + 1] = m[1]; } }
  for (const e of DATA.G.e) { const p = e[6]; for (let i = 0; i < p.length; i += 2) { const m = mv(p[i], p[i + 1]); if (m) { p[i] = m[0]; p[i + 1] = m[1]; } } }
  console.log('carriageways separated: vertices', shifts.size, 'samples', nPairs);
})();
function mulberry(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
let rand = mulberry(1234);
const rnd = (a = 0, b = 1) => a + (b - a) * Math.random();
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---------- heightmap
const HM = (() => {
  const H = DATA.H; const bin = atob(H.d); const buf = new ArrayBuffer(bin.length); const u8 = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return { ...H, a: new Int16Array(buf) };
})();
function heightAt(x, z) {
  let gx = (x - HM.x0) / HM.dx, gz = (z - HM.z0) / HM.dx;
  gx = clamp(gx, 0, HM.nx - 1.001); gz = clamp(gz, 0, HM.nz - 1.001);
  const ix = gx | 0, iz = gz | 0, fx = gx - ix, fz = gz - iz, a = HM.a, n = HM.nx;
  const h00 = a[iz * n + ix], h10 = a[iz * n + ix + 1], h01 = a[(iz + 1) * n + ix], h11 = a[(iz + 1) * n + ix + 1];
  // same triangulation as the terrain mesh (diagonal from (1,0) to (0,1)) so things sit exactly on the rendered ground
  return (fx + fz <= 1 ? h00 + (h10 - h00) * fx + (h01 - h00) * fz : h11 + (h01 - h11) * (1 - fx) + (h10 - h11) * (1 - fz)) / 10;
}
const WORLD = { x0: -1900, x1: 2400, z0: -1250, z1: 3980 };

// ---------- quality
const QUALITY = {
  baja: { pr: 0.75, shadow: 0, far: 520, peds: 12, traffic: 10, trees: 0.5 },
  media: { pr: 1, shadow: 1024, far: 800, peds: 20, traffic: 17, trees: 0.8 },
  movil: { pr: 1, shadow: 0, far: 600, peds: 14, traffic: 11, trees: 0.6 },
  alta: { pr: 1.5, shadow: 2048, far: 1150, peds: 30, traffic: 24, trees: 1 },
};
const IS_TOUCH = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
const QKEY = IS_TOUCH ? 'gtall_qm' : 'gtall_q';
let Q = IS_TOUCH ? QUALITY.movil : QUALITY.alta; let qName = IS_TOUCH ? 'movil' : 'alta';
try { const s = localStorage.getItem(QKEY); if (s && QUALITY[s]) { Q = QUALITY[s]; qName = s; } } catch (e) { }
{ const m = /[?&]q=(\w+)/.exec(location.search); if (m && QUALITY[m[1]]) { Q = QUALITY[m[1]]; qName = m[1]; } }

// ---------- renderer
const renderer = new THREE.WebGLRenderer({ antialias: !IS_TOUCH, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, Q.pr));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = Q.shadow > 0;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.autoClear = false;
$('game').appendChild(renderer.domElement);
const MAXANI = renderer.capabilities.getMaxAnisotropy();

const scene = new THREE.Scene();
const bgScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.25, 3200);
const bgCamera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 50, 90000);
scene.fog = new THREE.Fog(0xc9d6e0, 120, Q.far);
bgScene.fog = new THREE.Fog(0xc9d6e0, 2500, 60000);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = bgCamera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); bgCamera.updateProjectionMatrix();
  if (typeof HUD !== 'undefined') HUD.resize();
});

// ---------- lights
const hemi = new THREE.HemisphereLight(0xcfe3ff, 0x5b5140, 0.9);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff1dd, 2.6);
sun.castShadow = Q.shadow > 0;
if (Q.shadow) { sun.shadow.mapSize.set(Q.shadow, Q.shadow); }
const SH = 95;
Object.assign(sun.shadow.camera, { left: -SH, right: SH, top: SH, bottom: -SH, near: 10, far: 700 });
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.6;
scene.add(sun); scene.add(sun.target);
const bgSun = new THREE.DirectionalLight(0xffffff, 2.0); bgScene.add(bgSun);
const bgHemi = new THREE.HemisphereLight(0xcfe3ff, 0x6a6050, 1.0); bgScene.add(bgHemi);

// ---------- progress helper
const loadSteps = [];
function setLoad(txt, p) { const el = $('loadtxt'); if (el) el.textContent = txt; const b = $('loadbar'); if (b) b.style.width = Math.round(p * 100) + '%'; }
const nextFrame = () => new Promise((r) => setTimeout(r, 0));

// Shared uniforms (time of day etc.)
const U = { uNight: { value: 0 }, uTime: { value: 0 } };
