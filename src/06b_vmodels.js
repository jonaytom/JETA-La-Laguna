// ============ parque móvil canario: modelos parodia basados en los más vendidos en Canarias (2010-2025) ============
// Base 3D: Kenney Car Kit (CC0, www.kenney.nl), reescalado a las medidas reales de cada modelo y recoloreado.
// [id, nombre parodia, categoría, base Kenney, física, largo, ancho, alto, peso de aparición]
const VMODELS_RAW = [
  // utilitarios / urbanos
  ['polo', 'Volksgofio Pollo', 'Utilitario', 'sedan', 'compact', 4.05, 1.75, 1.46, 12],
  ['ibiza', 'Asiento Ibicenca', 'Utilitario', 'sedan', 'compact', 4.06, 1.78, 1.44, 10],
  ['yaris', 'Tollota Llaris', 'Utilitario', 'sedan', 'compact', 3.95, 1.70, 1.50, 10],
  ['picanto', 'Quia Picante', 'Urbano', 'sedan', 'compact', 3.60, 1.60, 1.49, 7],
  ['rio', 'Quia Barranco', 'Utilitario', 'sedan', 'compact', 4.07, 1.73, 1.45, 5],
  ['i20', 'Jiundái i-Veinte', 'Utilitario', 'sedan', 'compact', 4.04, 1.78, 1.45, 5],
  ['i10', 'Jiundái i-Diez', 'Urbano', 'sedan', 'compact', 3.67, 1.68, 1.48, 4],
  ['sandero', 'Dacio Sendero', 'Utilitario', 'sedan', 'compact', 4.09, 1.85, 1.50, 6],
  ['clio', 'Renol Tío', 'Utilitario', 'sedan', 'compact', 4.05, 1.80, 1.44, 5],
  ['p208', 'Pijó 802', 'Utilitario', 'sedan', 'compact', 4.06, 1.75, 1.43, 4],
  ['corsa', 'Opal Corsario', 'Utilitario', 'sedan', 'compact', 4.06, 1.77, 1.43, 4],
  ['c3', 'Citrón Ce-Tres', 'Utilitario', 'sedan', 'compact', 3.99, 1.75, 1.47, 3],
  ['f500', 'Fiá Quinientitos', 'Urbano', 'sedan', 'compact', 3.57, 1.63, 1.49, 4],
  // compactos / berlinas
  ['leon', 'Asiento Leona', 'Compacto', 'hatchback-sports', 'sedan', 4.28, 1.80, 1.46, 5],
  ['corolla', 'Tollota Corola', 'Berlina', 'hatchback-sports', 'sedan', 4.37, 1.79, 1.44, 5],
  ['golf', 'Volksgofio Golfo', 'Compacto', 'hatchback-sports', 'sedan', 4.28, 1.79, 1.46, 4],
  // crossovers / SUV
  ['troc', 'Volksgofio Te-Roque', 'Crossover', 'suv-luxury', 'suv', 4.23, 1.82, 1.57, 8],
  ['tcross', 'Volksgofio Te-Cruz', 'Crossover', 'suv-luxury', 'suv', 4.11, 1.78, 1.58, 5],
  ['tiguan', 'Volksgofio Tiguanche', 'SUV', 'suv-luxury', 'suv', 4.49, 1.84, 1.67, 5],
  ['tucson', 'Jiundái Tucsón', 'SUV', 'suv-luxury', 'suv', 4.50, 1.87, 1.65, 8],
  ['kona', 'Jiundái Kuna', 'Crossover', 'suv-luxury', 'suv', 4.20, 1.80, 1.55, 4],
  ['sportage', 'Quia Deportaje', 'SUV', 'suv-luxury', 'suv', 4.51, 1.86, 1.65, 8],
  ['stonic', 'Quia Estónica', 'Crossover', 'suv-luxury', 'suv', 4.14, 1.76, 1.52, 4],
  ['xceed', 'Quia Exceso', 'Crossover', 'suv-luxury', 'suv', 4.40, 1.83, 1.49, 3],
  ['arona', 'Asiento Adeje', 'Crossover', 'suv-luxury', 'suv', 4.14, 1.78, 1.54, 5],
  ['ateca', 'Asiento Atajo', 'SUV', 'suv-luxury', 'suv', 4.38, 1.84, 1.61, 3],
  ['chr', 'Tollota Ce-Jota-Erre', 'Crossover', 'suv-luxury', 'suv', 4.36, 1.80, 1.56, 5],
  ['yariscross', 'Tollota Llaris Cruz', 'Crossover', 'suv-luxury', 'suv', 4.18, 1.77, 1.59, 5],
  ['qashqai', 'Nisanto Cascai', 'Crossover', 'suv-luxury', 'suv', 4.39, 1.81, 1.59, 5],
  ['juke', 'Nisanto Yuke', 'Crossover', 'suv-luxury', 'suv', 4.21, 1.80, 1.59, 3],
  ['captur', 'Renol Captura', 'Crossover', 'suv-luxury', 'suv', 4.23, 1.80, 1.58, 3],
  ['p2008', 'Pijó 8002', 'Crossover', 'suv-luxury', 'suv', 4.30, 1.77, 1.55, 3],
  ['zs', 'EmeYé ZZ', 'SUV', 'suv-luxury', 'suv', 4.32, 1.81, 1.62, 4],
  // todoterrenos
  ['duster', 'Dacio Polvero', 'Todoterreno', 'suv', 'suv', 4.34, 1.80, 1.69, 5],
  ['landcruiser', 'Tollota Land Crucero', 'Todoterreno', 'suv', 'suv', 4.70, 1.88, 1.85, 3],
  ['jimny', 'Susuki Yimi', 'Todoterreno', 'suv', 'suv', 3.48, 1.65, 1.72, 2],
  // furgonetas
  ['kangoo', 'Renol Canguro', 'Furgoneta', 'van', 'van', 4.28, 1.83, 1.84, 4],
  ['berlingo', 'Citrón Berlinga', 'Furgoneta', 'van', 'van', 4.40, 1.85, 1.84, 4],
  ['partner', 'Pijó Compadre', 'Furgoneta', 'van', 'van', 4.40, 1.85, 1.84, 3],
  ['caddy', 'Volksgofio Cadi', 'Furgoneta', 'van', 'van', 4.50, 1.86, 1.82, 3],
  ['doblo', 'Fiá Doblón', 'Furgoneta', 'van', 'van', 4.39, 1.83, 1.85, 2],
  ['transit', 'Fordo Tránsito', 'Furgoneta', 'van', 'van', 4.97, 1.99, 1.98, 3],
  ['vito', 'Merceditas Vitó', 'Furgoneta', 'van', 'van', 5.14, 1.93, 1.91, 3],
  // pick-ups
  ['hilux', 'Tollota Jailux', 'Pick-up', 'truck', 'suv', 5.33, 1.86, 1.82, 4],
  ['navara', 'Nisanto Navajo', 'Pick-up', 'truck', 'suv', 5.26, 1.85, 1.80, 2],
  // camiones
  ['daily', 'Ivequito Diario', 'Camión', 'delivery', 'truck', 6.5, 2.0, 2.8, 2],
  ['canter', 'Mitsubichi Cantero', 'Camión', 'delivery', 'truck', 6.0, 1.9, 2.6, 2],
  ['sprinter', 'Merceditas Esprínter', 'Furgón', 'delivery', 'truck', 5.93, 2.02, 2.7, 2],
  ['grua', 'Grúas Ande Pepe', 'Grúa', 'delivery-flat', 'truck', 6.5, 2.1, 2.4, 1],
  ['basura', 'Recogida Municipal', 'Camión de basura', 'garbage-truck', 'truck', 7.5, 2.5, 3.2, 1],
  ['ambulancia', 'Ambulancia', 'Emergencias', 'ambulance', 'truck', 5.9, 2.1, 2.6, 0.6],
  ['bomberos', 'Bomberos', 'Emergencias', 'firetruck', 'truck', 8.0, 2.5, 3.2, 0.3],
  ['tractor', 'Tractor Garañón', 'Agrícola', 'tractor', 'truck', 3.8, 1.9, 2.6, 0],
  // servicio público y especiales (no salen en el sorteo general)
  ['taxi', 'Taxi Lagunero', 'Taxi', 'taxi', 'taxi', 4.55, 1.76, 1.49, 0],
  ['policia', 'Policía Local', 'Patrulla', 'police', 'police', 4.6, 1.85, 1.5, 0],
  ['guancheGT', 'Guanche GT', 'Deportivo', 'sedan-sports', 'sport', 4.3, 1.9, 1.25, 0],
  // motos y ciclomotores (Canarias: el scooter manda)
  ['pcx', 'Jonda PeCeEquis 125', 'Scooter', 'scooter', 'moto', 1.93, 0.74, 1.1, 8],
  ['forza', 'Jonda Forzuda 125', 'Maxiscooter', 'maxi', 'moto', 2.14, 0.76, 1.35, 4],
  ['nmax', 'Llamaja EneMax', 'Scooter', 'scooter', 'moto', 1.94, 0.74, 1.12, 4],
  ['symphony', 'Sín Sinfonía', 'Scooter', 'scooter', 'moto', 1.88, 0.68, 1.1, 3],
  ['agility', 'Kinco Agilidad 50', 'Ciclomotor', 'scooter', 'moto', 1.8, 0.68, 1.08, 3],
  ['vespa', 'Avispa Primavera', 'Scooter', 'vespa', 'moto', 1.85, 0.7, 1.12, 2],
  ['xadv', 'Jonda Equis-ADV', 'Maxiscooter', 'maxi', 'moto', 2.2, 0.84, 1.4, 2],
  ['z900', 'Kawasaqui Zeta 900', 'Naked', 'naked', 'moto', 2.07, 0.83, 1.08, 2],
  ['mt07', 'Llamaja EmeTe-Siete', 'Naked', 'naked', 'moto', 2.08, 0.78, 1.1, 2],
];
const VMODELS = {}; VMODELS_RAW.forEach(([id, name, cat, base, phys, L, W, H, w]) => (VMODELS[id] = { id, name, cat, base, phys, L, W, H, w }));
const VTYPES2 = { truck: { name: 'Camión', L: 6.5, W: 2.1, H: 2.8, maxV: 30, acc: 5, grip: 6, mass: 3, prof: 'van' }, moto: { name: 'Moto', L: 2.0, W: 0.8, H: 1.1, maxV: 36, acc: 12, grip: 9, mass: 0.5, prof: 'sedan' } };
Object.assign(VTYPES, VTYPES2);
// popular colours in Canarias: white and greys dominate (rent-a-car fleets too)
const CARCOL_W = [[0xf2f2f2, 30], [0x9aa0a6, 13], [0x5b6770, 10], [0x1b1b1b, 10], [0xc9ccd0, 8], [0x1f4e8c, 6], [0xb3261e, 6], [0x2a6f97, 3], [0x7a1f2b, 3], [0xd8c7a3, 3], [0x2d5a3d, 2], [0xc97b2a, 2], [0x6e8fb3, 2], [0xe8dcc0, 2]];
function pickW(list) { let t = 0; for (const e of list) t += e[1]; let r = Math.random() * t; for (const e of list) { r -= e[1]; if (r <= 0) return e[0]; } return list[0][0]; }
const pickColor = () => pickW(CARCOL_W);
function pickModel(filter) { const L = Object.values(VMODELS).filter((m) => m.w > 0 && (!filter || filter(m))); return pickW(L.map((m) => [m, m.w])); }
// which physics type a legacy type string maps to when picking a model
function modelForType(type) {
  if (type === 'taxi') return VMODELS.taxi; if (type === 'police') return VMODELS.policia; if (type === 'sport') return VMODELS.guancheGT; if (type === 'bus') return null;
  if (type === 'moto') return pickModel((m) => m.phys === 'moto');
  if (type === 'truck') return pickModel((m) => m.phys === 'truck' && m.id !== 'bomberos' && m.id !== 'ambulancia');
  return pickModel((m) => m.phys === type);
}
function trafficModel(edgeType) {
  const r = Math.random();
  if (r < 0.15) return pickModel((m) => m.phys === 'moto');
  if (r < 0.2) return VMODELS.taxi;
  if (r < 0.235 && ['primary', 'secondary', 'tertiary', 'trunk', 'motorway', 'motorway_link'].includes(edgeType)) return pickModel((m) => m.phys === 'truck');
  return pickModel((m) => m.phys !== 'moto' && m.phys !== 'truck');
}

// ---------- Kenney geometry decoding (positions ×2000 int16, normals int8, colours RGB565)
const KGEO = (() => {
  const d = DATA.KV; if (!d) return null;
  const b64 = (s) => { const bin = atob(s); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; };
  const out = {};
  for (const name in d) {
    const M0 = d[name]; const parts = M0.parts.map((p) => { const P = new Int16Array(b64(p.p)), N = new Int8Array(b64(p.n)), C = new Uint16Array(b64(p.c)), I = new Uint16Array(b64(p.i)); return { name: p.name, t: p.t, P, N, C, I }; });
    out[name] = { bb: M0.bb, rank: M0.rank, parts };
  }
  return out;
})();
const rgb565 = (k) => [((k >> 11) & 31) / 31, ((k >> 5) & 63) / 63, (k & 31) / 31];
const lum = (c) => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11;
function hsv(c) { const mx = Math.max(...c), mn = Math.min(...c), d = mx - mn; let h = 0; if (d > 1e-4) { if (mx === c[0]) h = ((c[1] - c[2]) / d) % 6; else if (mx === c[1]) h = (c[2] - c[0]) / d + 2; else h = (c[0] - c[1]) / d + 4; } return [h * 60, mx ? d / mx : 0, mx]; }
// per base: decide the paint family (main saturated colour)
const PAINTREF = {};
function paintRef(base) {
  if (PAINTREF[base] !== undefined) return PAINTREF[base];
  const K = KGEO[base]; let ref = null;
  if (base === 'police') ref = { grey: true, l: [0.35, 0.62] }; // dark-grey panels -> white
  else if (base === 'tractor' || base === 'delivery-flat' || base === 'ambulance' || base === 'firetruck' || base === 'garbage-truck') ref = null;
  else for (const [k] of K.rank) { const c = rgb565(k), h = hsv(c); if (h[1] > 0.35 && h[2] > 0.3) { ref = { h: h[0], l: lum(c) }; break; } }
  return (PAINTREF[base] = ref);
}
const toLin = (c) => c.map((v) => Math.pow(v, 2.2));
function classify(base, k) { const [cls, c] = classify0(base, k); return [cls, cls === 'paint' ? c.map((v) => Math.min(1.6, Math.pow(v, 2.2))) : toLin(c)]; }
function classify0(base, k) {
  const c = rgb565(k), h = hsv(c), ref = base === 'wheel' ? null : paintRef(base);
  // glass: light, cool, low saturation (Kenney windows are pale blue)
  if ((c[2] > 0.9 && c[1] > 0.85 && c[0] > 0.75 && c[0] < 0.88) || (lum(c) > 0.78 && c[2] - c[0] > 0.035 && h[1] < 0.16)) return ['glass', c];
  if (ref && !ref.grey && h[1] > 0.25 && Math.min(Math.abs(h[0] - ref.h), 360 - Math.abs(h[0] - ref.h)) < 22) return ['paint', [lum(c) / ref.l, lum(c) / ref.l, lum(c) / ref.l]];
  if (ref && ref.grey && h[1] < 0.22 && lum(c) > ref.l[0] && lum(c) < ref.l[1]) return ['paint', [lum(c) / 0.45, lum(c) / 0.45, lum(c) / 0.45]];
  // de-cartoon the purple-ish greys and keep the rest
  if (h[1] < 0.3) { const g = lum(c) * (lum(c) < 0.5 ? 0.78 : 1); return ['rest', [g, g, g * 1.02]]; }
  return ['rest', c];
}
// geometry for a model: { paint, glass, rest, wheel: {geo, x, y, z, front, left}[] , dims }
// ---- pieces shared by every vehicle (audit P0.a): built once, never disposed (userData.shared). Car.remove() only
// frees what is the car's own (paint material and any unshared geometry) when the car does not go back to the pool.
const SHARED_GEO = new Map();
function shGeo(key, make) { let g = SHARED_GEO.get(key); if (!g) { g = make(); g.userData.shared = true; SHARED_GEO.set(key, g); } return g; }
const shBox = (w, h, d) => shGeo('box' + w + ',' + h + ',' + d, () => new THREE.BoxGeometry(w, h, d));
const SH_MAT = new Map(); function shMat(key, make) { let m = SH_MAT.get(key); if (!m) { m = make(); m.userData.shared = true; SH_MAT.set(key, m); } return m; }
// lettering / signs: one canvas texture per text, the meshes share geometry and material
const SH_TXT = new Map(); function sharedText(txt, w, h, bg, fg, font) { const k = [txt, w, h, bg, fg, font].join('|'); let t = SH_TXT.get(k); if (!t) { t = textPlane(txt, w, h, bg, fg, font); t.geometry.userData.shared = true; t.material.userData.shared = true; SH_TXT.set(k, t); } return t.clone(); }
const VGEO = {};
function modelGeometry(model) {
  if (VGEO[model.id]) return VGEO[model.id];
  const K = KGEO[model.base]; const bb = K.bb; const kW = bb[1][0] - bb[0][0], kH = bb[1][1] - bb[0][1], kL = bb[1][2] - bb[0][2];
  const sx = model.W / kW, sy = model.H / kH, sz = model.L / kL; const zc = (bb[1][2] + bb[0][2]) / 2;
  const groups = { paint: [], glass: [], rest: [] }; const wheels = [];
  const wheelScale = Math.min(1.25, Math.max(0.9, sy * 0.92)), wheelX = sx * 0.72;
  for (const p of K.parts) {
    const isWheel = p.name.startsWith('wheel');
    if (isWheel) {
      if (p.name === 'wheel-back') continue; // spare wheel on the boxy SUV is kept on the body below
      // one geometry per wheel, centred on its own node (rotation axis = x)
      const n = p.P.length / 3; const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { pos[i * 3] = p.P[i * 3] / 2000 * wheelX; pos[i * 3 + 1] = p.P[i * 3 + 1] / 2000 * wheelScale; pos[i * 3 + 2] = p.P[i * 3 + 2] / 2000 * wheelScale; nor[i * 3] = p.N[i * 3] / 127; nor[i * 3 + 1] = p.N[i * 3 + 1] / 127; nor[i * 3 + 2] = p.N[i * 3 + 2] / 127; const cc = classify('wheel', p.C[i])[1]; col.set(cc, i * 3); }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.setIndex(new THREE.BufferAttribute(new Uint16Array(p.I), 1));
      wheels.push({ geo: g, x: p.t[0] * sx, y: p.t[1] * wheelScale, z: (p.t[2] - zc) * sz, front: p.t[2] > zc ? 1 : 0, left: p.t[0] > 0 });
      continue;
    }
    // body parts: split triangles by material group, bake transform + scale
    const n = p.P.length / 3; const cls = new Array(n); const cols = new Array(n);
    for (let i = 0; i < n; i++) { const [k, c] = classify(model.base, p.C[i]); cls[i] = k; cols[i] = c; }
    for (let t = 0; t < p.I.length; t += 3) { const a = p.I[t]; const grp = groups[cls[a]]; for (let j = 0; j < 3; j++) { const v = p.I[t + j]; grp.push([(p.P[v * 3] / 2000 + p.t[0]) * sx, (p.P[v * 3 + 1] / 2000 + p.t[1]) * sy, (p.P[v * 3 + 2] / 2000 + p.t[2] - zc) * sz, p.N[v * 3] / 127 / sx, p.N[v * 3 + 1] / 127 / sy, p.N[v * 3 + 2] / 127 / sz, cols[v]]); } }
  }
  const mk = (arr) => { if (!arr.length) return null; const pos = new Float32Array(arr.length * 3), nor = new Float32Array(arr.length * 3), col = new Float32Array(arr.length * 3); arr.forEach((v, i) => { pos.set([v[0], v[1], v[2]], i * 3); const l = Math.hypot(v[3], v[4], v[5]) || 1; nor.set([v[3] / l, v[4] / l, v[5] / l], i * 3); col.set(v[6], i * 3); }); const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3)); return g; };
  // rear face / roof heights for lights and roof props
  let zmin = 1e9, ymax = 0; for (const grp of Object.values(groups)) for (const v of grp) { zmin = Math.min(zmin, v[2]); ymax = Math.max(ymax, v[1]); }
  const out = { paint: mk(groups.paint), glass: mk(groups.glass), rest: mk(groups.rest), wheels, zmin, ymax };
  for (const g of [out.paint, out.glass, out.rest, ...wheels.map((w) => w.geo)]) if (g) g.userData.shared = true;
  return (VGEO[model.id] = out);
}
const restMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.15 });
const kGlassMat = new THREE.MeshStandardMaterial({ color: 0x1e2830, roughness: 0.12, metalness: 0.35 });
const wheelMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, metalness: 0.1 });
function makeKenneyMesh(model, color) {
  const G = modelGeometry(model); const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
  if (model.id === 'taxi' || model.id === 'policia' || model.id === 'ambulancia') color = 0xf6f6f4;
  const paint = new THREE.MeshStandardMaterial({ vertexColors: true, color, roughness: 0.3, metalness: 0.5 });
  if (G.paint) body.add(new THREE.Mesh(G.paint, paint)); if (G.glass) body.add(new THREE.Mesh(G.glass, kGlassMat)); if (G.rest) body.add(new THREE.Mesh(G.rest, restMat));
  const wheels = [];
  for (const w of G.wheels) { const piv = new THREE.Group(); piv.position.set(w.x, w.y, w.z); g.add(piv); const m = new THREE.Mesh(w.geo, wheelMat); m.castShadow = true; piv.add(m); wheels.push({ piv, w: m, front: w.front }); }
  // lights (brake lights must light up), plate
  const hl = [], tl = []; const W = model.W, L = model.L;
  // body shape probes (so lights, stripes and lettering sit ON the bodywork instead of floating)
  if (!G.probe) { const P = []; for (const gg of [G.paint, G.rest]) if (gg) { const a = gg.attributes.position.array; for (let i = 0; i < a.length; i += 3) P.push(a[i], a[i + 1], a[i + 2]); } G.probe = new Float32Array(P); }
  G.hwc = G.hwc || new Map(); const halfW = (y, z, dy = 0.12, dz = 0.3) => { const key = y.toFixed(3) + z.toFixed(3) + dy + dz; if (G.hwc.has(key)) return G.hwc.get(key); const P = G.probe; let m = 0; for (let i = 0; i < P.length; i += 3) if (Math.abs(P[i + 1] - y) < dy && Math.abs(P[i + 2] - z) < dz) m = Math.max(m, Math.abs(P[i])); G.hwc.set(key, m); return m; };
  // rear: the lights go on the rear face, at the upper part of it, near its outer edge
  let ry0 = 1e9, ry1 = -1e9; { const P = G.probe; for (let i = 0; i < P.length; i += 3) if (P[i + 2] < G.zmin + 0.12) { ry0 = Math.min(ry0, P[i + 1]); ry1 = Math.max(ry1, P[i + 1]); } }
  const tly = ry1 > ry0 ? Math.min(ry0 + (ry1 - ry0) * 0.72, ry1 - 0.08) : Math.min(1.05, model.H * 0.55);
  let rz = G.zmin; { const P = G.probe; let zz = 1e9; for (let i = 0; i < P.length; i += 3) if (Math.abs(P[i + 1] - tly) < 0.06) zz = Math.min(zz, P[i + 2]); if (zz < 1e8) rz = zz; }
  const rhw = halfW(tly, rz, 0.08, 0.12) || W / 2;
  for (const x of [-1, 1]) { const t = new THREE.Mesh(shBox(0.26, 0.1, 0.04), tailMat); t.position.set(x * Math.max(0.2, rhw - 0.2), tly, rz + 0.012); body.add(t); tl.push(t); }
  if (PLATES.length < 10) { const pl = textPlane(Math.floor(1000 + Math.random() * 8999) + ' ' + pick(['KHT', 'LBC', 'MFZ', 'JRW', 'GPD', 'NCX']), 0.52, 0.12, '#f4f4f4', '#111', 'bold 40px Arial'); pl.geometry.userData.shared = true; pl.material.userData.shared = true; PLATES.push(pl); }
  const plate = pick(PLATES).clone(); const ply = Math.min(0.7, model.H * 0.36); let pz = G.zmin; { const P = G.probe; let zz = 1e9; for (let i = 0; i < P.length; i += 3) if (Math.abs(P[i + 1] - ply) < 0.08 && Math.abs(P[i]) < 0.4) zz = Math.min(zz, P[i + 2]); if (zz < 1e8) pz = zz; } plate.position.set(0, ply, pz - 0.012); plate.rotation.y = Math.PI; body.add(plate);
  let bar = null;
  if (model.id === 'policia') {
    // livery stripes as ribbons that follow the side of the body
    const ribbon = (y0, y1, mat) => { const zs = []; for (let z = -L * 0.39; z <= L * 0.39 + 1e-3; z += L * 0.78 / 16) zs.push(z);
      for (const side of [-1, 1]) { const gg = shGeo('stripe:' + model.id + ':' + y0.toFixed(3) + ':' + side, () => { const pos = [], idx = []; zs.forEach((z, i) => { const hw = halfW((y0 + y1) / 2, z, 0.14, L * 0.78 / 32 + 0.05) + 0.012; pos.push(side * hw, y0, z, side * hw, y1, z); if (i) { const a = (i - 1) * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); } });
        const q = new THREE.BufferGeometry(); q.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); q.setIndex(idx); q.computeVertexNormals(); return q; }); const m = new THREE.Mesh(gg, mat); body.add(m); } };
    const sy = model.H * 0.45; ribbon(sy - 0.08, sy + 0.08, shMat('polBlueStripe', () => new THREE.MeshStandardMaterial({ color: 0x1c3fa8, roughness: 0.4, side: THREE.DoubleSide }))); ribbon(sy + 0.09, sy + 0.14, shMat('polYellowStripe', () => new THREE.MeshStandardMaterial({ color: 0xf2c200, roughness: 0.4, side: THREE.DoubleSide })));
    bar = new THREE.Group(); const b1 = new THREE.Mesh(shBox(0.45, 0.12, 0.25), policeBlue); b1.position.x = -0.28; const b2 = new THREE.Mesh(shBox(0.45, 0.12, 0.25), policeRed); b2.position.x = 0.28; bar.add(b1, b2); bar.position.set(0, G.ymax + 0.06, -0.1); body.add(bar);
    for (const side of [-1, 1]) { const t = sharedText('POLICÍA LOCAL', 1.8, 0.28, 'rgba(0,0,0,0)', '#1c3fa8', 'bold 34px Arial'); t.position.set(side * (halfW(model.H * 0.6, -0.2, 0.1, 0.9) + 0.02), model.H * 0.6, -0.2); t.rotation.y = side * Math.PI / 2; body.add(t); }
  }
  if (model.id === 'taxi') { { const y = model.H * 0.48; for (const side of [-1, 1]) { const gg = shGeo('taxiStripe:' + model.id + ':' + side, () => { const pos = [], idx = []; for (let i = 0; i <= 14; i++) { const z = -L * 0.35 + L * 0.7 * i / 14; const hw = halfW(y, z, 0.12, 0.2) + 0.012; pos.push(side * hw, y - 0.035, z, side * hw, y + 0.035, z); if (i) { const a = (i - 1) * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); } } const q = new THREE.BufferGeometry(); q.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); q.setIndex(idx); q.computeVertexNormals(); return q; }); body.add(new THREE.Mesh(gg, shMat('taxiStripe', () => new THREE.MeshStandardMaterial({ color: 0x1a8a3a, roughness: 0.4, side: THREE.DoubleSide })))); } } const lamp = new THREE.Mesh(shBox(0.16, 0.09, 0.1), shMat('taxiLamp', () => new THREE.MeshStandardMaterial({ color: 0x1fd15a, emissive: 0x1fd15a, emissiveIntensity: 1.2 }))); lamp.position.set(-0.35, G.ymax + 0.02, 0.6); body.add(lamp); }
  if (model.id === 'basura' || model.id === 'grua' || model.id === 'daily' || model.id === 'sprinter' || model.id === 'canter') {
    // company / service lettering on the box sides
    const txt = model.id === 'basura' ? 'AYTO. LA LAGUNA' : model.id === 'grua' ? 'GRÚAS ANDE PEPE' : pick(['PAPAS EL MAGO', 'GOFIO LA MOLINETA', 'TRANSPORTES CHACHO', 'REFRESCOS CLIPPER-ITO', 'MUEBLES EL CAMBULLÓN']);
    for (const side of [-1, 1]) { const t = sharedText(txt, Math.min(3.2, L * 0.5), 0.36, 'rgba(0,0,0,0)', '#1d2a33', 'bold 30px Arial'); t.position.set(side * (W / 2 + 0.02), model.H * 0.62, -L * 0.12); t.rotation.y = side * Math.PI / 2; body.add(t); }
  }
  body.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = false; } });
  return { g, body, wheels, hl, tl, bar, paint };
}

// ---------- motos y scooters (modelados a mano)
const motoMats = { dark: M(0x1b1d20, 0.6, 0.3), chrome: M(0xc8ccd0, 0.25, 0.9), seat: M(0x151515, 0.85), tire: tireMat, light: headMat };
function makeMotoMesh(model, color) {
  const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
  const paint = new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.5 });
  const L = model.L, kind = model.base; const wr = kind === 'naked' ? 0.31 : kind === 'maxi' ? 0.27 : kind === 'vespa' ? 0.2 : 0.24;
  const wheels = [];
  for (const [z, front] of [[L / 2 - wr - 0.05, 1], [-L / 2 + wr + 0.08, 0]]) {
    const piv = new THREE.Group(); piv.position.set(0, wr, z); g.add(piv);
    const tg = shGeo('motoTyre' + wr, () => { const q = new THREE.TorusGeometry(wr - 0.045, 0.05, 8, 18); q.rotateY(Math.PI / 2); return q; }); const w = new THREE.Mesh(tg, tireMat);
    const hub = new THREE.Mesh(shGeo('motoHub' + wr, () => new THREE.CylinderGeometry(wr * 0.6, wr * 0.6, 0.06, 12)), motoMats.chrome); hub.rotation.z = Math.PI / 2; w.add(hub); w.castShadow = true; piv.add(w); wheels.push({ piv, w, front });
  }
  const box = (w, h, d, mat, x, y, z, rx = 0) => { const m = new THREE.Mesh(shBox(w, h, d), mat); m.position.set(x, y, z); m.rotation.x = rx; body.add(m); return m; };
  // rounded volume: capsule stretched along z
  const pod = (w, h, d, mat, x, y, z, rx = 0) => { const m = new THREE.Mesh(shGeo('capsule', () => new THREE.CapsuleGeometry(0.5, 1, 4, 10)), mat); m.rotation.x = Math.PI / 2 + rx; m.scale.set(w, d / 2, h); m.position.set(x, y, z); body.add(m); return m; };
  const fz = L / 2 - wr - 0.05, rz = -L / 2 + wr + 0.08;
  if (kind === 'naked') {
    pod(0.34, 0.26, 0.5, paint, 0, 0.92, 0.15, -0.12);              // tank
    box(0.28, 0.3, 0.46, motoMats.dark, 0, 0.56, 0.08);            // engine
    box(0.3, 0.12, 0.3, motoMats.chrome, 0, 0.42, 0.12);            // crankcase
    pod(0.24, 0.08, 0.5, motoMats.seat, 0, 0.88, -0.36, 0.08);      // seat
    pod(0.16, 0.1, 0.42, paint, 0, 0.93, -0.72, 0.3);               // tail
    box(0.05, 0.05, 0.75, motoMats.dark, 0.1, 0.4, -0.42, 0.18); box(0.05, 0.05, 0.75, motoMats.dark, -0.1, 0.4, -0.42, 0.18); // swingarm
    pod(0.09, 0.09, 0.45, motoMats.chrome, 0.16, 0.36, -0.2, -0.1);  // exhaust
    box(0.04, 0.72, 0.04, motoMats.chrome, 0.09, 0.64, fz - 0.06, 0.4); box(0.04, 0.72, 0.04, motoMats.chrome, -0.09, 0.64, fz - 0.06, 0.4); // fork
    box(0.72, 0.035, 0.035, motoMats.dark, 0, 1.03, fz - 0.3);     // handlebar
    pod(0.2, 0.16, 0.14, motoMats.light, 0, 0.93, fz - 0.12);       // headlight
    pod(0.18, 0.05, 0.4, paint, 0, wr + 0.06, fz, 0);                // front mudguard
  } else {
    const vespa = kind === 'vespa', maxi = kind === 'maxi'; const h0 = vespa ? 0.33 : 0.38;
    pod(0.34, 0.36, L * 0.5, paint, 0, h0 + 0.22, -L * 0.14, 0.05);   // rear cowl over the engine
    box(0.28, 0.05, L * 0.34, motoMats.dark, 0, h0 - 0.04, L * 0.08); // floorboard
    pod(0.3, 0.1, 0.62, motoMats.seat, 0, h0 + 0.43, -L * 0.13, 0.04); // seat
    pod(0.34, maxi ? 0.62 : 0.52, 0.18, paint, 0, h0 + 0.3, fz - 0.3, -0.18); // leg shield
    pod(0.2, 0.12, 0.42, paint, 0, wr + 0.08, fz - 0.02, 0);          // front mudguard
    if (maxi) { box(0.4, 0.34, 0.03, kGlassMat, 0, h0 + 0.88, fz - 0.43, -0.55); pod(0.38, 0.24, 0.5, paint, 0, h0 + 0.6, fz - 0.2, -0.25); }
    box(0.6, 0.035, 0.035, motoMats.dark, 0, h0 + 0.68, fz - 0.4);   // handlebar
    pod(0.16, 0.1, 0.08, motoMats.light, 0, h0 + 0.62, fz - 0.33);   // headlight on the bar
    box(0.045, 0.5, 0.045, motoMats.chrome, 0, h0 + 0.12, fz - 0.06, 0.35); // fork
    if (vespa) { pod(0.46, 0.3, 0.46, paint, 0, h0 + 0.16, -L * 0.26); }
    box(0.24, 0.04, 0.26, motoMats.dark, 0, h0 + 0.5, rz + 0.06);     // rack
  }
  const tl = []; const t = new THREE.Mesh(shBox(0.16, 0.06, 0.04), tailMat); t.position.set(0, kind === 'naked' ? 0.85 : 0.82, -L / 2 + 0.03); body.add(t); tl.push(t);
  body.traverse((m) => { if (m.isMesh) m.castShadow = true; });
  return { g, body, wheels, hl: [], tl, bar: null, paint, moto: true };
}
// rider for motos (AI) or the player sitting on it
function seatHuman(H, model) { if (H.skinned) { H.pose = 'ride'; H.moto = model.base; H.root.position.set(0, (model.base === 'naked' ? 0.92 : 0.86) - 0.62, model.base === 'naked' ? 0.12 : -0.08); H.root.rotation.set(0, 0, 0); return; } const seatY = model.base === 'naked' ? 0.92 : 0.9; H.legL.p.rotation.x = H.legR.p.rotation.x = -1.35; H.legL.j.rotation.x = H.legR.j.rotation.x = 1.25; H.legL.p.rotation.z = 0.12; H.legR.p.rotation.z = -0.12; H.armL.p.rotation.x = H.armR.p.rotation.x = -1.05; H.torso.rotation.x = model.base === 'naked' ? 0.35 : 0.08; H.body.rotation.x = 0; H.body.position.y = 0; H.root.position.set(0, seatY - 0.95 * H.body.scale.y, model.base === 'naked' ? -0.28 : -0.3); H.root.rotation.set(0, 0, 0); H.pose = 'ride'; }
function unseatHuman(H) { if (H.skinned) { H.pose = 'walk'; H.moto = null; return; } H.legL.p.rotation.z = 0; H.legR.p.rotation.z = 0; H.torso.rotation.x = 0; H.pose = 'walk'; }
