// ============ Hierba y matojos (v1.3.1) ============
// Jonay (10-nov): «algo de hierba en los descampados». Matas de hierba verde en parques, jardines y zonas de hierba;
// hierba seca y matojos en los descampados (el terreno abierto que no es edificio, calle, plaza, campo ni huerta), y
// de todo un poco en prados y matorral. Los modelos son de Blender (tools/blender/hierba_blender.py, en DATA.ARB.hierba).
// Solo se plantan alrededor de la cámara (celdas de 20 m hasta ~65 m), con una semilla fija por celda: cada sitio
// tiene siempre las mismas matas, y nunca hay más de unas miles a la vez.
const HIERBA = {
  on: false,
  cell: 40,
  radius: 110,
  cx: null,
  cz: null,
  cache: new Map(),
  meshes: null,
  kinds: ['hierba_verde', 'hierba_seca', 'matojo']
};

// the class of the ground at every 4 m: 0 open land (descampado), 1 green (park, garden, grass), 2 meadow/scrub,
// 3 nothing (buildings, streets, paths, squares, pitches, water, fields, the paved old town)
function hierbaRaster() {
  const W = 2048,
    H = Math.round((W * SPLAT.h) / SPLAT.w),
    sx = W / SPLAT.w,
    c = mkCanvas(W, H),
    x = c.getContext('2d');
  const P = (px, pz) => [(px - SPLAT.x0) * sx, (pz - SPLAT.z0) * sx];
  const poly = (coords, fill, stroke = 0) => {
    x.beginPath();
    for (let i = 0; i < coords.length; i += 2) {
      const p = P(coords[i], coords[i + 1]);
      i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]);
    }
    x.closePath();
    x.fillStyle = fill;
    x.fill();
    if (stroke) {
      x.lineWidth = stroke * sx;
      x.strokeStyle = fill;
      x.stroke();
    }
  };
  const C = ['rgb(0,0,0)', 'rgb(85,0,0)', 'rgb(170,0,0)', 'rgb(255,0,0)'],
    AT = DATA.AT;
  x.fillStyle = C[0];
  x.fillRect(0, 0, W, H);
  poly(HIST_CORE.flat(), C[3]); // (the paved old town; its parks and gardens go on top)
  for (const a of DATA.A) {
    const t = AT[a[0]];
    if (['park', 'garden', 'grass', 'playground'].includes(t)) poly(a[2], C[1]);
    else if (['meadow', 'scrub'].includes(t)) poly(a[2], C[2]);
    else if (['pitch', 'water', 'farmland', 'cemetery', 'square', 'parking', 'sports', 'forest', 'orchard'].includes(t)) poly(a[2], C[3]);
  }
  for (const b of DATA.B) poly(b[6], C[3], 3);
  x.lineCap = 'round';
  x.strokeStyle = C[3];
  for (const r of DATA.R) {
    const cc = r[4];
    if (cc.length < 4) continue;
    x.lineWidth = (r[0] <= 13 ? r[2] + 3 : 2.5) * sx;
    x.beginPath();
    for (let i = 0; i < cc.length; i += 2) {
      const p = P(cc[i], cc[i + 1]);
      i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]);
    }
    x.stroke();
  }
  const d = x.getImageData(0, 0, W, H).data,
    R = new Uint8Array(W * H);
  for (let i = 0; i < R.length; i++) {
    const v = d[i * 4];
    R[i] = v < 40 ? 0 : v < 125 ? 1 : v < 210 ? 2 : 3;
  }
  return { W, H, sx, R };
}
function hierbaClass(x, z) {
  const M = HIERBA.raster,
    i = Math.floor((x - SPLAT.x0) * M.sx),
    j = Math.floor((z - SPLAT.z0) * M.sx);
  return i < 0 || j < 0 || i >= M.W || j >= M.H ? 3 : M.R[j * M.W + i];
}
// the tufts of one cell: [kind, x, y, z, turn, size] (fixed seed per cell)
function hierbaCell(ci, cj) {
  const key = ci + ',' + cj;
  let L = HIERBA.cache.get(key);
  if (L) return L;
  L = [];
  const rnd = mulberry((ci * 73856093) ^ (cj * 19349663)),
    S = HIERBA.cell;
  // tries per cell (the class decides how many become tufts): green dense, open land in patches
  for (let k = 0; k < 380; k++) {
    const x = ci * S + rnd() * S,
      z = cj * S + rnd() * S,
      cl = hierbaClass(x, z);
    if (cl === 3 || !inPlayArea(x, z, 2)) continue;
    const patch = 0.5 + 0.5 * Math.sin(x * 0.11 + Math.sin(z * 0.07) * 2.3) * Math.cos(z * 0.09 - x * 0.03);
    let kind = -1;
    const u = rnd();
    if (cl === 1) kind = u < 0.7 ? 0 : -1;
    else if (cl === 2) kind = u < 0.35 ? 1 : u < 0.55 ? 0 : u < 0.62 ? 2 : -1;
    else kind = patch < 0.4 ? -1 : u < 0.5 ? 1 : u < 0.56 ? 2 : -1;
    if (kind < 0) continue;
    L.push([kind, x, heightAt(x, z), z, rnd() * 6.28, kind === 2 ? 0.8 + rnd() * 0.7 : 1.0 + rnd() * 0.8]);
  }
  HIERBA.cache.set(key, L);
  if (HIERBA.cache.size > 900) HIERBA.cache.delete(HIERBA.cache.keys().next().value);
  return L;
}
function buildHierba() {
  const H = DATA.ARB && DATA.ARB.hierba;
  if (!H) return;
  HIERBA.raster = hierbaRaster();
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, side: THREE.DoubleSide });
  const CAP = [12000, 9000, 1500];
  HIERBA.meshes = HIERBA.kinds.map((k, i) => {
    const g = arbGeo(H[k]),
      m = new THREE.InstancedMesh(g, mat, CAP[i]);
    m.count = 0;
    m.castShadow = false;
    m.receiveShadow = true;
    m.frustumCulled = false; // (the instances move around the camera; the bounding sphere would go stale)
    m.userData.noMerge = true; // (05w_optimiza.js must not split it into fixed cells)
    m.name = 'hierba';
    scene.add(m);
    return m;
  });
  HIERBA.on = true;
  updateHierba(true);
}
function updateHierba(force) {
  if (!HIERBA.on) return;
  const S = HIERBA.cell,
    p = camera.position,
    ci = Math.floor(p.x / S),
    cj = Math.floor(p.z / S);
  if (!force && ci === HIERBA.cx && cj === HIERBA.cz) return;
  HIERBA.cx = ci;
  HIERBA.cz = cj;
  const n = Math.ceil(HIERBA.radius / S),
    o = HIERBA.o || (HIERBA.o = new THREE.Object3D()),
    cnt = [0, 0, 0];
  for (let a = -n; a <= n; a++)
    for (let b = -n; b <= n; b++) {
      if ((a * a + b * b) * S * S > (HIERBA.radius + S) * (HIERBA.radius + S)) continue;
      for (const t of hierbaCell(ci + a, cj + b)) {
        const m = HIERBA.meshes[t[0]];
        if (cnt[t[0]] >= m.instanceMatrix.count) continue;
        o.position.set(t[1], t[2], t[3]);
        o.rotation.set(0, t[4], 0);
        o.scale.setScalar(t[5]);
        o.updateMatrix();
        m.setMatrixAt(cnt[t[0]]++, o.matrix);
      }
    }
  HIERBA.meshes.forEach((m, i) => {
    m.count = cnt[i];
    m.instanceMatrix.needsUpdate = true;
  });
}
