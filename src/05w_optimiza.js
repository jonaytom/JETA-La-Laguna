// v0.77 rendimiento (auditorías viejas, punto 17): menos llamadas de dibujo y menos triángulos.
//  · mergeStatics(): las ~8.800 mallas sueltas del mundo (bancos, bolardos, piezas de edificios singulares…) se juntan en
//    una malla por material y celda de 125 m (antes: una llamada de dibujo por pieza).
//  · splitInstanced(): los árboles, farolas, postes y señales eran UNA malla instanciada para toda la ciudad (se pintaba
//    entera aunque no se viera); ahora una por celda, así el recorte por cámara y por distancia funciona.
//  · updateCityLOD(): lo que queda detrás de la niebla no se pinta; los detalles pequeños (molduras, balcones, rótulos,
//    bancos…) solo cerca; las copas de los árboles lejanos usan una versión de pocos triángulos.
// Qué NO se junta: lo que esté oculto al cargar, lo que cuelga de un grupo con nombre (edificios singulares que el
// código busca por nombre), lo transparente, lo que lleve userData (lo usa la lógica) y lo marcado con userData.noMerge.
const LOD = { items: [], cx: 1e9, cz: 1e9, far: -1, cell: 125, stats: null, keep: !!window.__JETA_TEST, orig: [], off: false }; // keep: our test runners (not the auditor) can put the loose pieces back to compare photos
function lodAdd(m, detail, lo) {
  const g = m.geometry; if (!m.isInstancedMesh) { if (!g.boundingSphere) g.computeBoundingSphere(); } else m.computeBoundingSphere();
  const s = m.isInstancedMesh ? m.boundingSphere : g.boundingSphere; m.updateMatrixWorld(true);
  const c = s.center.clone().applyMatrix4(m.matrixWorld);
  LOD.items.push({ m, x: c.x, z: c.z, r: s.radius, d: detail ? 1 : 0, hi: lo ? m.geometry : null, lo: lo || null });
}
// distances follow the fog: what is past the fog's end is the fog's colour anyway
function lodDist() { const ff = scene.fog ? scene.fog.far : Q.far; return { far: ff + 40, det: Math.min(ff, 230 + ff * 0.25), lo: 170 }; }
function updateCityLOD(force) {
  if (LOD.off) return; const p = camera.position, D = lodDist();
  if (!force && Math.abs(p.x - LOD.cx) < 12 && Math.abs(p.z - LOD.cz) < 12 && D.far === LOD.far) return;
  LOD.cx = p.x; LOD.cz = p.z; LOD.far = D.far;
  for (const it of LOD.items) {
    const d = Math.hypot(it.x - p.x, it.z - p.z) - it.r;
    it.m.visible = d < (it.d ? D.det : D.far);
    if (it.lo) { const g = d > D.lo ? it.lo : it.hi; if (it.m.geometry !== g) it.m.geometry = g; }
  }
}
// tests only: put the original loose pieces back (on=true) or fuse again, to compare photos of the same spot
function unfuse(on) { if (!LOD.keep) return false; LOD.off = on; for (const [par, o] of LOD.orig) { if (on) par.add(o); else par.remove(o); } for (const it of LOD.items) { it.m.visible = on ? !it.m.userData.fused : true; if (it.hi) it.m.geometry = it.hi; } if (!on) updateCityLOD(true); return LOD.orig.length; }
function lodShowAll() { for (const it of LOD.items) { it.m.visible = true; if (it.hi) it.m.geometry = it.hi; } LOD.cx = 1e9; } // fotos de herramientas

const _MAPS = ['map', 'emissiveMap', 'normalMap', 'roughnessMap', 'metalnessMap', 'alphaMap', 'aoMap', 'bumpMap', 'lightMap', 'displacementMap'];
function mergeStatics() {
  const t0 = performance.now(); scene.updateMatrixWorld(true);
  const skip = new Set(); if (typeof DOORMARKS !== 'undefined') for (const k of DOORMARKS) skip.add(k.m);
  const groups = new Map(); let found = 0; const why = {}; const no = (k) => { why[k] = (why[k] || 0) + 1; };
  const baseBR = THREE.Mesh.prototype.onBeforeRender;
  const visit = (o, named) => {
    if (skip.has(o) || !o.visible || (o.userData && o.userData.noMerge)) return;
    const nm = named || (o !== scene && !!o.name);
    for (const c of [...o.children]) visit(c, nm);
    if (o === scene || !o.isMesh || o.isInstancedMesh || o.isSkinnedMesh) return; if (nm) return no('grupo con nombre'); if (o.children.length) return no('con hijos');
    const mat = o.material, g = o.geometry;
    if (Array.isArray(mat) || !mat || !g || !g.attributes.position || (g.morphAttributes && g.morphAttributes.position)) return no('varios materiales'); /* geometry groups (BoxGeometry has 6) only matter with several materials */
    if (mat.transparent) return no('transparente'); if (!o.frustumCulled || o.layers.mask !== 1) return no('siempre visible'); if (o.onBeforeRender !== baseBR) return no('onBeforeRender'); if (Object.keys(o.userData).length) return no('userData');
    const uv = !!g.attributes.uv && _MAPS.some((k) => mat[k]), col = !!mat.vertexColors && !!g.attributes.color;
    if (!g.boundingSphere) g.computeBoundingSphere();
    const c = g.boundingSphere.center.clone().applyMatrix4(o.matrixWorld), sc = o.matrixWorld.getMaxScaleOnAxis(), r = g.boundingSphere.radius * sc;
    const detail = r < 2.5;
    const key = [mat.uuid, uv ? 1 : 0, col ? 1 : 0, o.castShadow ? 1 : 0, o.receiveShadow ? 1 : 0, o.renderOrder, detail ? 1 : 0, Math.floor(c.x / LOD.cell), Math.floor(c.z / LOD.cell)].join('|');
    let G = groups.get(key); if (!G) groups.set(key, G = { mat, uv, col, cs: o.castShadow, rs: o.receiveShadow, ro: o.renderOrder, detail, list: [] });
    G.list.push(o); found++;
  };
  visit(scene, false);
  const nm = new THREE.Matrix3(), v = new THREE.Vector3(); let made = 0, merged = 0;
  for (const G of groups.values()) {
    if (G.list.length < 2 && !G.detail) continue; // a lone big piece: nothing to gain
    let nv = 0, ni = 0;
    for (const o of G.list) { const g = o.geometry; nv += g.attributes.position.count; ni += g.index ? g.index.count : g.attributes.position.count; }
    const P = new Float32Array(nv * 3), N = new Float32Array(nv * 3), UV = G.uv ? new Float32Array(nv * 2) : null, C = G.col ? new Float32Array(nv * 3) : null;
    const I = nv > 65535 ? new Uint32Array(ni) : new Uint16Array(ni); let vo = 0, io = 0;
    for (const o of G.list) {
      const g = o.geometry, pa = g.attributes.position, M = o.matrixWorld; let na = g.attributes.normal;
      if (!na) { g.computeVertexNormals(); na = g.attributes.normal; }
      nm.getNormalMatrix(M); const flip = M.determinant() < 0;
      for (let i = 0; i < pa.count; i++) {
        v.fromBufferAttribute(pa, i).applyMatrix4(M); P[(vo + i) * 3] = v.x; P[(vo + i) * 3 + 1] = v.y; P[(vo + i) * 3 + 2] = v.z;
        v.fromBufferAttribute(na, i).applyMatrix3(nm).normalize(); N[(vo + i) * 3] = v.x; N[(vo + i) * 3 + 1] = v.y; N[(vo + i) * 3 + 2] = v.z;
      }
      if (UV) { const ua = g.attributes.uv; for (let i = 0; i < pa.count; i++) { UV[(vo + i) * 2] = ua.getX(i); UV[(vo + i) * 2 + 1] = ua.getY(i); } }
      if (C) { const ca = g.attributes.color; for (let i = 0; i < pa.count; i++) { C[(vo + i) * 3] = ca.getX(i); C[(vo + i) * 3 + 1] = ca.getY(i); C[(vo + i) * 3 + 2] = ca.getZ(i); } }
      const cnt = g.index ? g.index.count : pa.count;
      for (let t = 0; t < cnt; t += 3) {
        const a = g.index ? g.index.getX(t) : t, b = g.index ? g.index.getX(t + 1) : t + 1, c = g.index ? g.index.getX(t + 2) : t + 2;
        I[io++] = vo + a; if (flip) { I[io++] = vo + c; I[io++] = vo + b; } else { I[io++] = vo + b; I[io++] = vo + c; }
      }
      vo += pa.count;
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(P, 3)); geo.setAttribute('normal', new THREE.BufferAttribute(N, 3));
    if (UV) geo.setAttribute('uv', new THREE.BufferAttribute(UV, 2)); if (C) geo.setAttribute('color', new THREE.BufferAttribute(C, 3));
    geo.setIndex(new THREE.BufferAttribute(I, 1)); geo.computeBoundingSphere(); geo.computeBoundingBox();
    if (!LOD.keep) { const free = function () { this.array = null; }; for (const k in geo.attributes) geo.attributes[k].onUpload(free); } // RAM back once on the GPU (as the city chunks, audit P1.7; the index stays: the auditor reads it)
    const m = new THREE.Mesh(geo, G.mat); m.castShadow = G.cs; m.receiveShadow = G.rs; m.renderOrder = G.ro; m.name = 'fusion'; m.matrixAutoUpdate = false;
    for (const o of G.list) { if (o.parent) { if (LOD.keep) LOD.orig.push([o.parent, o]); o.parent.remove(o); } } m.userData.fused = true;
    scene.add(m); lodAdd(m, G.detail); made++; merged += G.list.length;
  }
  LOD.stats = { sueltas: found, juntadas: merged, mallas: made, ms: Math.round(performance.now() - t0), no: why, ultimoId: new THREE.Object3D().id };
  return LOD.stats;
}
// one InstancedMesh per 250 m cell (big ones only): the camera can then skip what it doesn't see
function splitInstanced() {
  const list = scene.children.filter((o) => o.isInstancedMesh && o.visible && o.frustumCulled && o.count >= 48 && !o.userData.noMerge); const mtx = new THREE.Matrix4(), cc = new THREE.Color(); let made = 0;
  for (const im of list) {
    const cells = new Map(), a = im.instanceMatrix.array;
    for (let i = 0; i < im.count; i++) { const k = Math.floor(a[i * 16 + 12] / 250) + ',' + Math.floor(a[i * 16 + 14] / 250); /* 250 m: 125 m made ~10.800 meshes (each object costs memory) */ let l = cells.get(k); if (!l) cells.set(k, l = []); l.push(i); }
    const small = !im.userData.big; // trees, lamps, poles, signs: detail unless marked
    for (const l of cells.values()) {
      const m = new THREE.InstancedMesh(im.geometry, im.material, l.length);
      l.forEach((src, j) => { im.getMatrixAt(src, mtx); m.setMatrixAt(j, mtx); if (im.instanceColor) { im.getColorAt(src, cc); m.setColorAt(j, cc); } });
      m.castShadow = im.castShadow; m.receiveShadow = im.receiveShadow; m.renderOrder = im.renderOrder; m.name = 'inst'; m.matrixAutoUpdate = false; m.updateMatrix();
      scene.add(m); lodAdd(m, small && !im.userData.tree, im.userData.lo); made++;
    }
    scene.remove(im); im.dispose();
  }
  return { instanciadas: list.length, celdas: made };
}
function optimizeCity() { const a = mergeStatics(), b = splitInstanced(); updateCityLOD(true); const r = Object.assign({}, a, b); console.log('optimiza', JSON.stringify(r)); return r; }
