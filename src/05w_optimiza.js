// v0.77 rendimiento (auditorías viejas, punto 17): menos llamadas de dibujo y menos triángulos.
//  · mergeStatics(): las ~8.800 mallas sueltas del mundo (bancos, bolardos, piezas de edificios singulares…) se juntan en
//    una malla por material y celda de 125 m (antes: una llamada de dibujo por pieza).
//  · splitInstanced(): los árboles, farolas, postes y señales eran UNA malla instanciada para toda la ciudad (se pintaba
//    entera aunque no se viera); ahora una por celda, así el recorte por cámara y por distancia funciona.
//  · updateCityLOD(): lo que queda detrás de la niebla no se pinta; los detalles pequeños (molduras, balcones, rótulos,
//    bancos…) solo cerca; las copas de los árboles lejanos usan una versión de pocos triángulos.
// Qué NO se junta: lo que esté oculto al cargar, los grupos con nombre salvo los monumentos estáticos marcados,
// las piezas transparentes de esos monumentos, lo que lleve userData (lo usa la lógica) y lo marcado con userData.noMerge.
const LOD = { items: [], buckets: new Map(), det: -1, cx: 1e9, cz: 1e9, far: -1, cell: 125, stats: null, keep: !!window.__JETA_TEST, orig: [], landmarks: [], off: false }; // keep: our test runners (not the auditor) can put the loose pieces back to compare photos
function lodAdd(m, detail, lo) {
  const g = m.geometry;
  if (!m.isInstancedMesh) {
    if (!g.boundingSphere) g.computeBoundingSphere();
  } else m.computeBoundingSphere();
  const s = m.isInstancedMesh ? m.boundingSphere : g.boundingSphere;
  m.updateMatrixWorld(true);
  const c = s.center.clone().applyMatrix4(m.matrixWorld);
  const r = s.radius;
  const item = { m, x: c.x, z: c.z, r, d: detail ? 1 : 0, hi: lo ? m.geometry : null, lo: lo || null };
  LOD.items.push(item);
  // Reuse the static coverage for all cameras, keeping large objects in their full bounds.
  const key = Math.floor(c.x / 250) + ',' + Math.floor(c.z / 250) + ',' + item.d;
  let bucket = LOD.buckets.get(key);
  if (!bucket) {
    bucket = { items: [], detail: item.d, lo: false, state: -1, x0: Infinity, x1: -Infinity, z0: Infinity, z1: -Infinity };
    LOD.buckets.set(key, bucket);
  }
  bucket.items.push(item);
  bucket.state = -1;
  bucket.lo ||= !!lo;
  bucket.x0 = Math.min(bucket.x0, c.x - r);
  bucket.x1 = Math.max(bucket.x1, c.x + r);
  bucket.z0 = Math.min(bucket.z0, c.z - r);
  bucket.z1 = Math.max(bucket.z1, c.z + r);
  LOD.cx = Infinity;
}
function updateCityLOD(force) {
  if (LOD.off) return;
  const { x, z } = camera.position;
  const fogFar = scene.fog?.far ?? viewFar();
  treeLOD(x, z, fogFar + 40, force); // v1.4.44: the batched trees
  const detailFar = fogFar === cityFogFar() ? viewFar() : fogFar;
  const far = fogFar + 40;
  // Let signs, street furniture and facade details register before driving up to them.
  const detail = Math.min(detailFar, (185 + detailFar * 0.21) * distK()); // v1.4.44: distK
  if (!force && Math.abs(x - LOD.cx) < 8 && Math.abs(z - LOD.cz) < 8 && far === LOD.far && detail === LOD.det) return;
  LOD.cx = x;
  LOD.cz = z;
  LOD.far = far;
  LOD.det = detail;
  const farSq = far * far, detailSq = detail * detail;
  for (const bucket of LOD.buckets.values()) {
    const limit = bucket.detail ? detail : far;
    const limitSq = bucket.detail ? detailSq : farSq;
    const nx = Math.max(bucket.x0 - x, x - bucket.x1, 0), nz = Math.max(bucket.z0 - z, z - bucket.z1, 0);
    const fx = Math.max(x - bucket.x0, bucket.x1 - x), fz = Math.max(z - bucket.z0, bucket.z1 - z);
    const outside = nx * nx + nz * nz >= limitSq;
    // If the farthest corner is in range, every part in the cell is too.
    const inside = !outside && !bucket.lo && fx * fx + fz * fz < limitSq;
    if (outside || inside) {
      const state = outside ? 0 : 1;
      if (force || bucket.state !== state) {
        for (const { m } of bucket.items) m.visible = state === 1;
      }
      bucket.state = state;
      continue;
    }
    bucket.state = -1;
    for (const it of bucket.items) {
      const dx = it.x - x, dz = it.z - z, d2 = dx * dx + dz * dz;
      const reach = limit + it.r;
      it.m.visible = d2 < reach * reach;
      if (it.lo) {
        const close = 210 * distK() + it.r;
        const g = d2 > close * close ? it.lo : it.hi;
        if (it.m.geometry !== g) it.m.geometry = g;
      }
    }
  }
}
// tests only: put the original loose pieces back (on=true) or fuse again, to compare photos of the same spot
function unfuse(on) {
  if (!LOD.keep) return false;
  LOD.off = on;
  for (const [par, o] of LOD.orig) {
    if (on) par.add(o);
    else par.remove(o);
  }
  for (const { parent, pieces, mesh } of LOD.landmarks) {
    if (on) {
      parent.remove(mesh);
      parent.add(...pieces);
    } else {
      parent.remove(...pieces);
      parent.add(mesh);
    }
  }
  for (const it of LOD.items) {
    it.m.visible = on ? !it.m.userData.fused : true;
    if (it.hi) it.m.geometry = it.hi;
  }
  if (!on) updateCityLOD(true);
  return LOD.orig.length;
}
function lodShowAll() {
  for (const it of LOD.items) {
    it.m.visible = true;
    if (it.hi) it.m.geometry = it.hi;
  }
  for (const bucket of LOD.buckets.values()) bucket.state = -1;
  LOD.cx = Infinity;
} // fotos de herramientas

// v1.0.0 (sonda de pintado con GPU en «alta»: lo que pesa son las ~2.000 llamadas de las piezas sueltas, sobre todo gente
// y coches, que se pintaban también a 600–1.000 m, donde miden 2–3 píxeles): people, cars and the rooms of the interiors
// are not drawn past a distance (only during the render: the game logic still sees them as they are). Map: root → metres.
const SHCULL = []; // v1.4.44: actor meshes whose shadow was switched off for this render (far)
function actorCull(on, cam) {
  if (!on) {
    for (const o of ACULL) o.visible = true;
    ACULL.length = 0;
    for (const m of SHCULL) m.castShadow = true;
    SHCULL.length = 0;
    return;
  }
  if (ACULL.length) actorCull(false);
  const p = (cam || camera).position,
    px = p.x,
    pz = p.z,
    py = p.y;
  // v1.4.44: a far or hidden actor keeps matrixWorldAutoUpdate = false from one frame to the next, so three.js does not walk
  // its ~65 bones every frame (~9.000 bones of ~140 people were recomposed each frame); the distance is taken from its own
  // position (its matrixWorld may be old), and when it comes near again its matrices are brought up to date here, before
  // it is drawn. Only with the game camera (not the photos' or the shadows')
  const main = !cam || cam === camera;
  for (const [o, A] of ACTORS) {
    if (!o.parent) continue;
    if (!o.visible) {
      if (main) o.matrixWorldAutoUpdate = false;
      continue;
    }
    let ox, oy, oz;
    if (o.parent === scene) {
      ox = o.position.x;
      oy = o.position.y;
      oz = o.position.z;
    } else {
      const e = o.matrixWorld.elements;
      ox = e[12];
      oy = e[13];
      oz = e[14];
    }
    const dx = ox - px,
      dz = oz - pz,
      dy = oy - py,
      d2 = dx * dx + dz * dz + dy * dy;
    const rk = A.r * visK(); // v1.4.44: how far people and cars are drawn (visK)
    if (d2 > rk * rk) {
      o.visible = false;
      ACULL.push(o);
      if (main && o.parent === scene) o.matrixWorldAutoUpdate = false;
      continue;
    }
    if (!o.matrixWorldAutoUpdate) {
      o.matrixWorldAutoUpdate = true;
      o.updateMatrixWorld(true);
    }
    // v1.4.44: people past 35 m with their light body (06a_humans.js, humanLoGeo)
    if (main && A.body && A.bodyHi) {
      const dk = distK(),
        lv = window.__nivelCuerpo ?? (d2 <= 35 * 35 * dk * dk ? 0 : d2 > 70 * 70 * dk * dk ? 2 : 1); // (tests: __nivelCuerpo forces 0, 1 or 2)
      const g = lv === 0 ? A.bodyHi : humanLoGeo(A.bodyHi, lv === 2);
      if (A.body.geometry !== g) A.body.geometry = g;
    }
    // v1.4.44 (sombras más baratas): people cast no shadow past 25 m and cars past 70 m (a few pixels of shadow there;
    // each person is ~12.600 skinned triangles in the shadow pass). Only for the game camera; put back after the render like the rest
    const sd = A.sd || A.dr; // shadow distance: people 25 m (sd), cars 70 m (their detail distance)
    if (main && sd && d2 > sd * sd && !window.__sombrasCompletas) {
      if (!A.sh) {
        A.sh = [];
        o.traverse((m) => {
          if (m.castShadow) A.sh.push(m);
        });
      }
      for (const m of A.sh)
        if (m.castShadow) {
          m.castShadow = false;
          SHCULL.push(m);
        }
    }
    // small parts (eyes, brows, watch… of people; lights and plate of cars) only from close by: each one is a draw call
    const drk = A.dr * distK(); // v1.4.44
    if (A.dr && d2 > drk * drk) {
      if (!A.det) {
        A.det = [];
        o.traverse((m) => {
          if (m === o || !m.isMesh) return;
          // v1.4.44: the skinned eyes and brows of the people too (only their body casts a shadow): they were drawn up to
          // 170 m, two draw calls per person, a pixel or less there
          if (m.isSkinnedMesh) {
            if (!m.castShadow) A.det.push(m);
            return;
          }
          const g = m.geometry;
          if (!g.boundingSphere) g.computeBoundingSphere();
          if (g.boundingSphere.radius * m.scale.x < A.thr) A.det.push(m);
        });
      }
      for (const m of A.det)
        if (m.visible) {
          m.visible = false;
          ACULL.push(m);
        }
    }
  }
}
const WHY_EX = {}; // v1.0.0 (tests): where the pieces left loose are, by reason
const _MAPS = ['map', 'emissiveMap', 'normalMap', 'roughnessMap', 'metalnessMap', 'alphaMap', 'aoMap', 'bumpMap', 'lightMap', 'displacementMap'];
// Merge ordinary opaque leaves only. Keep the parent, render order, materials and both shadow flags.
function landmarkBatchable(o, mat, g) {
  return (
    !o.children.length &&
    !mat.transparent &&
    mat.depthWrite &&
    mat.onBeforeCompile === THREE.Material.prototype.onBeforeCompile &&
    !o.customDepthMaterial &&
    !o.customDistanceMaterial &&
    o.onAfterRender === THREE.Mesh.prototype.onAfterRender &&
    o.onBeforeShadow === THREE.Mesh.prototype.onBeforeShadow &&
    o.onAfterShadow === THREE.Mesh.prototype.onAfterShadow &&
    g.drawRange.start === 0 &&
    g.drawRange.count === Infinity &&
    Object.keys(g.attributes).every((key) => ['position', 'normal', 'uv', 'color'].includes(key)) &&
    (!g.attributes.color || g.attributes.color.itemSize === 3)
  );
}
function mergeStatics() {
  const t0 = performance.now();
  scene.updateMatrixWorld(true);
  const skip = new Set();
  if (typeof DOORMARKS !== 'undefined') for (const k of DOORMARKS) skip.add(k.m);
  const groups = new Map();
  let found = 0;
  const { why, no, baseBR } = mergeStaticsPart1();
  const visit = (o, named, landmark) => {
    if (skip.has(o) || !o.visible || (o.userData && o.userData.noMerge)) return;
    const nm = named || (o !== scene && !!o.name);
    const scope = o.userData.batchLandmark || (o.name ? false : landmark);
    for (const c of [...o.children]) visit(c, nm, scope);
    if (o === scene || !o.isMesh || o.isInstancedMesh || o.isSkinnedMesh) return;
    const parent = landmark && !o.name ? o.parent : null;
    if (nm && !parent) return no('grupo con nombre');
    const mat = o.material,
      g = o.geometry;
    if (Array.isArray(mat) || !mat || !g || !g.attributes.position || (g.morphAttributes && g.morphAttributes.position))
      return no('varios materiales', o); /* geometry groups (BoxGeometry has 6) only matter with several materials */
    if (parent && !landmarkBatchable(o, mat, g)) return no('pieza singular', o);
    if (mat.transparent && !o.matrixWorld.elements.every(isFinite)) return no('transparente', o);
    /* v1.0.0 (sonda de lo que se pinta: 40–110 llamadas por fotograma eran láminas transparentes sueltas, sobre todo lejos): transparent pieces are joined too, by material and cell like the rest (they are flat decals and glass: the order inside one cell does not show) */ if (
      !o.frustumCulled ||
      o.layers.mask !== 1
    )
      return no('siempre visible', o);
    if (o.onBeforeRender !== baseBR) return no('onBeforeRender', o);
    if (Object.keys(o.userData).length) return no('userData', o);
    const uv = !!g.attributes.uv && (parent || _MAPS.some((k) => mat[k])),
      col = !!g.attributes.color && (parent || mat.vertexColors);
    if (!g.boundingSphere) g.computeBoundingSphere();
    const c = g.boundingSphere.center.clone().applyMatrix4(o.matrixWorld),
      sc = o.matrixWorld.getMaxScaleOnAxis(),
      r = g.boundingSphere.radius * sc;
    const detail = !parent && r < 2.5;
    const key = [
      parent ? parent.id : '',
      mat.uuid,
      uv ? 1 : 0,
      col ? 1 : 0,
      o.castShadow ? 1 : 0,
      o.receiveShadow ? 1 : 0,
      o.renderOrder,
      detail ? 1 : 0,
      Math.floor(c.x / LOD.cell),
      Math.floor(c.z / LOD.cell)
    ].join('|');
    if (window.__ORIGEN) origenNote(o, mat); // v1.1.8: sonda_origen.py
    let G = groups.get(key);
    if (!G) groups.set(key, (G = { mat, uv, col, cs: o.castShadow, rs: o.receiveShadow, ro: o.renderOrder, detail, parent, list: [] }));
    G.list.push(o);
    found++;
    if (o.children.length) no('con hijos (se juntan desde v1.0.0)', o);
  };
  visit(scene, false);
  const nm = new THREE.Matrix3(),
    v = new THREE.Vector3(),
    local = new THREE.Matrix4(),
    parentInverse = new THREE.Matrix4();
  let made = 0,
    merged = 0;
  for (const G of groups.values()) {
    if (G.list.length < 2 && !G.detail) continue; // a lone big piece: nothing to gain
    let nv = 0,
      ni = 0;
    for (const o of G.list) {
      const g = o.geometry;
      nv += g.attributes.position.count;
      ni += g.index ? g.index.count : g.attributes.position.count;
    }
    const P = new Float32Array(nv * 3),
      N = new Float32Array(nv * 3),
      UV = G.uv ? new Float32Array(nv * 2) : null,
      C = G.col ? new Float32Array(nv * 3) : null;
    const I = nv > 65535 ? new Uint32Array(ni) : new Uint16Array(ni);
    let vo = 0,
      io = 0;
    if (G.parent) parentInverse.copy(G.parent.matrixWorld).invert();
    for (const o of G.list) {
      const g = o.geometry,
        pa = g.attributes.position,
        M = G.parent ? local.multiplyMatrices(parentInverse, o.matrixWorld) : o.matrixWorld;
      let na = g.attributes.normal;
      if (!na) {
        g.computeVertexNormals();
        na = g.attributes.normal;
      }
      nm.getNormalMatrix(M);
      const flip = M.determinant() < 0;
      for (let i = 0; i < pa.count; i++) {
        v.fromBufferAttribute(pa, i).applyMatrix4(M);
        P[(vo + i) * 3] = v.x;
        P[(vo + i) * 3 + 1] = v.y;
        P[(vo + i) * 3 + 2] = v.z;
        v.fromBufferAttribute(na, i).applyMatrix3(nm).normalize();
        N[(vo + i) * 3] = v.x;
        N[(vo + i) * 3 + 1] = v.y;
        N[(vo + i) * 3 + 2] = v.z;
      }
      if (UV) {
        const ua = g.attributes.uv;
        for (let i = 0; i < pa.count; i++) {
          UV[(vo + i) * 2] = ua.getX(i);
          UV[(vo + i) * 2 + 1] = ua.getY(i);
        }
      }
      if (C) {
        const ca = g.attributes.color;
        for (let i = 0; i < pa.count; i++) {
          C[(vo + i) * 3] = ca.getX(i);
          C[(vo + i) * 3 + 1] = ca.getY(i);
          C[(vo + i) * 3 + 2] = ca.getZ(i);
        }
      }
      const cnt = g.index ? g.index.count : pa.count;
      for (let t = 0; t < cnt; t += 3) {
        const a = g.index ? g.index.getX(t) : t,
          b = g.index ? g.index.getX(t + 1) : t + 1,
          c = g.index ? g.index.getX(t + 2) : t + 2;
        I[io++] = vo + a;
        if (flip) {
          I[io++] = vo + c;
          I[io++] = vo + b;
        } else {
          I[io++] = vo + b;
          I[io++] = vo + c;
        }
      }
      vo += pa.count;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(P, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(N, 3));
    if (UV) geo.setAttribute('uv', new THREE.BufferAttribute(UV, 2));
    if (C) geo.setAttribute('color', new THREE.BufferAttribute(C, 3));
    geo.setIndex(new THREE.BufferAttribute(I, 1));
    geo.computeBoundingSphere();
    geo.computeBoundingBox();
    if (!LOD.keep) {
      const free = function () {
        this.array = null;
      };
      for (const k in geo.attributes) geo.attributes[k].onUpload(free);
    } // RAM back once on the GPU (as the city chunks, audit P1.7; the index stays: the auditor reads it)
    const m = new THREE.Mesh(geo, G.mat);
    m.castShadow = G.cs;
    m.receiveShadow = G.rs;
    m.renderOrder = G.ro;
    m.name = 'fusion';
    m.matrixAutoUpdate = false;
    if (G.parent) {
      G.parent.remove(...G.list);
      G.parent.add(m);
      if (LOD.keep) LOD.landmarks.push({ parent: G.parent, pieces: G.list, mesh: m });
      made++;
      merged += G.list.length;
      continue;
    }
    for (const o of G.list) {
      if (o.parent) {
        if (LOD.keep) LOD.orig.push([o.parent, o]);
        for (const ch of [...o.children]) o.parent.attach(ch);
        o.parent.remove(o);
      }
    }
    m.userData.fused = true;
    scene.add(m);
    lodAdd(m, G.detail);
    made++;
    merged += G.list.length;
  }
  LOD.stats = {
    sueltas: found,
    juntadas: merged,
    mallas: made,
    ms: Math.round(performance.now() - t0),
    no: why,
    ejemplos: WHY_EX,
    ultimoId: new THREE.Object3D().id
  };
  return LOD.stats;
}
/** (v1.1.7, code quality) part of mergeStatics */
/** v1.1.8 (sonda_origen.py): what a piece that is about to be joined was, and who added it (its own functions, or its parents') */
function origenNote(o, mat) {
  const L = window.__ORIGEN_OUT || (window.__ORIGEN_OUT = []);
  const b = new THREE.Box3().setFromObject(o);
  let p = o,
    who = '';
  while (p && !who) {
    who = p.__origen || '';
    p = p.parent;
  }
  L.push({
    c: [b.min.x, b.min.y, b.min.z, b.max.x, b.max.y, b.max.z].map((v) => Math.round(v * 10) / 10),
    col: mat.color ? mat.color.getHexString() : '',
    mat: mat.name || mat.type,
    geo: o.geometry.type,
    name: o.name || (o.parent && o.parent.name) || '',
    who
  });
}
function mergeStaticsPart1() {
  const why = {};
  const no = (k, o) => {
    why[k] = (why[k] || 0) + 1;
    if (o && window.__JETA_TEST) {
      const e = WHY_EX[k] || (WHY_EX[k] = []);
      if (e.length < 6) {
        const p = new THREE.Vector3();
        o.getWorldPosition(p);
        e.push([Math.round(p.x), Math.round(p.z), o.geometry && o.geometry.type]);
      }
    }
  };
  const baseBR = THREE.Mesh.prototype.onBeforeRender;
  return { why, no, baseBR };
}
// one InstancedMesh per 250 m cell (big ones only): the camera can then skip what it doesn't see
function splitInstanced() {
  let list = scene.children.filter((o) => o.isInstancedMesh && o.visible && o.frustumCulled && o.count >= 48 && !o.userData.noMerge);
  // v1.4.44: the trees go into BatchedMesh (batchTrees, below) instead of one InstancedMesh per type and 250 m cell
  if (!/[?&]sinbatch=1/.test(location.search)) {
    const trees = list.filter((o) => o.userData.tree);
    if (trees.length) {
      batchTrees(trees);
      list = list.filter((o) => !o.userData.tree);
    }
  }
  const mtx = new THREE.Matrix4(),
    cc = new THREE.Color();
  let made = 0;
  for (const im of list) {
    const cells = new Map(),
      a = im.instanceMatrix.array;
    for (let i = 0; i < im.count; i++) {
      const k = Math.floor(a[i * 16 + 12] / 250) + ',' + Math.floor(a[i * 16 + 14] / 250);
      /* 250 m: 125 m made ~10.800 meshes (each object costs memory) */ let l = cells.get(k);
      if (!l) cells.set(k, (l = []));
      l.push(i);
    }
    const small = !im.userData.big; // trees, lamps, poles, signs: detail unless marked
    for (const l of cells.values()) {
      const m = new THREE.InstancedMesh(im.geometry, im.material, l.length);
      l.forEach((src, j) => {
        im.getMatrixAt(src, mtx);
        m.setMatrixAt(j, mtx);
        if (im.instanceColor) {
          im.getColorAt(src, cc);
          m.setColorAt(j, cc);
        }
      });
      m.castShadow = im.castShadow;
      m.receiveShadow = im.receiveShadow;
      m.renderOrder = im.renderOrder;
      m.name = 'inst';
      m.matrixAutoUpdate = false;
      m.updateMatrix();
      // v1.4.44 (sombras más baratas): the shadow of a tree is cast by its low version (the far crown/trunk, few
      // triangles), in a copy only the shadow camera sees (layer SHADOW_LAYER); the tree you see keeps its detail. The
      // copy shares the instances and hangs from the tree's cell, so it hides with it
      if (im.castShadow && im.userData.lo) {
        const sh = new THREE.InstancedMesh(im.userData.lo, im.material, l.length);
        sh.instanceMatrix = m.instanceMatrix;
        sh.count = m.count;
        sh.castShadow = true;
        sh.receiveShadow = false;
        sh.layers.set(SHADOW_LAYER);
        sh.computeBoundingSphere(); // culled by the shadow camera with its own bounds (the cell's trees)
        sh.name = 'instSombra';
        sh.matrixAutoUpdate = false;
        m.add(sh);
        m.castShadow = false;
      }
      scene.add(m);
      lodAdd(m, small && !im.userData.tree, im.userData.lo);
      made++;
    }
    scene.remove(im);
    im.dispose();
  }
  return { instanciadas: list.length, celdas: made };
}
function optimizeCity() {
  const a = mergeStatics(),
    b = splitInstanced();
  updateCityLOD(true);
  const r = Object.assign({}, a, b, freezeStatics(), buildBundles());
  console.log('optimiza', JSON.stringify(r));
  return r;
}

// v1.4.44 (medido el 23-nov: «matrices de lo que no se mueve»): every frame three.js walked ~31.600 objects and recomposed
// the matrices of ~13.700 of them (~4 ms of the processor, with WebGL and WebGPU alike), although the city does not move.
// When the city is built (end of optimizeCity: no cars, people or tram yet), everything in the scene gets its matrix fixed
// (matrixAutoUpdate = false) and the subtrees with nothing moving inside are not walked any more (matrixWorldAutoUpdate =
// false). Left alone: the lights, the doors (DOORMARKS), what is marked userData.noMerge (it moves) and skinned bodies.
// Safety net (thawStep, each frame, a slice of the list): if something frozen is moved by code or gets a new child, it is
// thawed for good and noted in FREEZE.thawed (the tests list them: they should be marked noMerge at their source).
const FREEZE = { list: [], groups: [], i: 0, j: 0, thawed: [], n: 0, sub: 0 };
function freezeStatics() {
  const t0 = performance.now();
  scene.updateMatrixWorld(true);
  const doors = new Set(typeof DOORMARKS !== 'undefined' ? DOORMARKS.map((k) => k.m) : []);
  const lodSwap = new Set(LOD.items.filter((it) => it.lo).map((it) => it.m));
  const walk = (o) => {
    if (o.isLight || o === sun.target || o.isCamera || o.isBone || o.isSkinnedMesh || doors.has(o) || (o.userData && o.userData.noMerge)) return false;
    let all = true;
    for (const c of o.children) if (!walk(c)) all = false;
    o.updateMatrix();
    o.matrixAutoUpdate = false;
    // three.js r183+ (Object3D.static, WebGPURenderer only): a static object skips the per-frame state checks of its
    // render objects. Not for the meshes whose geometry the LOD swaps (trees: near/far crowns)
    if (!lodSwap.has(o)) o.static = true;
    FREEZE.list.push(o);
    if (all) {
      o.matrixWorldAutoUpdate = false;
      FREEZE.sub++;
    }
    if (o.children.length) FREEZE.groups.push([o, o.children.length]);
    return all;
  };
  for (const c of scene.children) walk(c);
  FREEZE.n = FREEZE.list.length;
  return { congelados: FREEZE.n, sin_recorrer: FREEZE.sub, congelar_ms: Math.round(performance.now() - t0) };
}
const _fzM = new THREE.Matrix4();
function thawObject(o, why) {
  if (o.userData._thawed) return;
  o.userData._thawed = true;
  o.matrixAutoUpdate = true;
  o.static = false;
  for (let p = o.parent; p && p !== scene; p = p.parent) if (p.isBundleGroup) p.needsUpdate = true; // its draws are recorded: again
  for (let p = o; p && p !== scene; p = p.parent) p.matrixWorldAutoUpdate = true;
  if (FREEZE.thawed.length < 200) {
    const w = o.getWorldPosition(new THREE.Vector3()),
      g = o.geometry;
    FREEZE.thawed.push(
      (o.name || o.type) +
        (o.parent && o.parent !== scene ? ' en ' + (o.parent.name || o.parent.type) : '') +
        (g ? ' ' + g.type + (g.attributes.position ? '/' + g.attributes.position.count + 'v' : '') : '') +
        ' X ' + Math.round(w.x) + ', Y ' + Math.round(w.z) + ' (' + why + ')'
    );
  }
}
/** a slice of the frozen objects per frame (the whole list in ~1 s at 60 FPS): moved ones are thawed */
function thawStep() {
  const L = FREEZE.list,
    n = L.length;
  if (!n) return;
  const k = Math.min(n, Math.ceil(n / 60));
  for (let c = 0; c < k; c++) {
    if (FREEZE.i >= n) FREEZE.i = 0;
    const o = L[FREEZE.i++];
    if (o.matrixAutoUpdate) continue;
    _fzM.compose(o.position, o.quaternion, o.scale);
    const a = _fzM.elements,
      b = o.matrix.elements;
    for (let e = 0; e < 16; e++)
      if (a[e] !== b[e]) {
        thawObject(o, 'se mueve');
        o.updateMatrix();
        o.updateMatrixWorld(true);
        break;
      }
  }
  const G = FREEZE.groups,
    m = G.length;
  for (let c = 0, kg = Math.min(m, Math.ceil(m / 60)); c < kg; c++) {
    if (FREEZE.j >= m) FREEZE.j = 0;
    const g = G[FREEZE.j++];
    if (g[0].children.length !== g[1]) {
      g[1] = g[0].children.length;
      for (let p = g[0]; p && p !== scene; p = p.parent) p.matrixWorldAutoUpdate = true;
      if (FREEZE.thawed.length < 200) FREEZE.thawed.push((g[0].name || g[0].type) + ' (hijos nuevos)');
    }
  }
}

// v1.4.44 (Jonay, 23-nov: «sí, móntalo»; probado desde la sonda: WebGPU de 48 / 69 / 39 FPS a 56 / 66 / 58 en casco /
// Menceyes / TF-5): with WebGPU (only: WebGL has no render bundles) the frozen, static city goes into one BundleGroup per
// 250 m cell. three.js records its draws once (a GPU render bundle per camera) and replays them: almost no processor
// per object. A bundle does not cull per object (it is recorded once), so its pieces are not culled and the whole cell
// is switched off instead when neither the camera nor the shadow area sees it (bundleStep, every render). When what is
// visible inside a cell changes (the city's LOD hides and shows pieces with the distance), that cell is recorded again.
// Left out: the trees (their crowns change with the distance), what is transparent, the road marks (they need their
// drawing order) and what moves. ?sinbundle=1 to measure
// without them.
const BUNDLES = { list: [], F: new THREE.Frustum(), FS: new THREE.Frustum(), M: new THREE.Matrix4(), regrab: 0 };
function buildBundles() {
  if (!USE_GPU || !THREE.GPU || !THREE.GPU.BundleGroup || /[?&]sinbundle=1/.test(location.search)) return {};
  const t0 = performance.now(),
    cells = new Map(),
    box = new THREE.Box3(),
    c = new THREE.Vector3();
  const lodSwap = new Set(LOD.items.filter((it) => it.lo).map((it) => it.m));
  let n = 0;
  for (const o of [...scene.children]) {
    // the trees' cells (their crown changes with the distance: the cell is recorded again then, see bundleStep) come in too
    const tree = lodSwap.has(o);
    if (o.matrixWorldAutoUpdate || !(o.static || tree) || o.isLight || !(o.isMesh || o.isGroup)) continue;
    let ok = true;
    o.traverse((q) => {
      const ms = q.material ? (Array.isArray(q.material) ? q.material : [q.material]) : [];
      // bundles are drawn before everything else: out stays what must be drawn after what lies under it (road marks:
      // renderOrder, polygonOffset, no depth write; tried twice: with polygonOffset in, the marks vanished under their road
      // in WebGPU), what is transparent or skinned
      const order = q.renderOrder !== 0 || ms.some((m) => m.polygonOffset);
      if ((lodSwap.has(q) && q !== o) || q.isSkinnedMesh || order || ms.some((m) => m.transparent || !m.depthWrite)) ok = false;
    });
    if (!ok) continue;
    box.setFromObject(o);
    if (box.isEmpty()) continue;
    box.getCenter(c);
    const k = Math.floor(c.x / 250) + ',' + Math.floor(c.z / 250);
    let b = cells.get(k);
    if (!b) {
      b = new THREE.GPU.BundleGroup();
      b.name = 'bundle ' + k;
      b.matrixAutoUpdate = false;
      b.matrixWorldAutoUpdate = false;
      b.userData.box = new THREE.Box3();
      b.userData.sig = -1;
      cells.set(k, b);
      scene.add(b);
      BUNDLES.list.push(b);
    }
    b.add(o);
    o.traverse((q) => (q.frustumCulled = false));
    b.userData.box.union(box);
    n++;
  }
  return { bundles: BUNDLES.list.length, en_bundles: n, bundles_ms: Math.round(performance.now() - t0) };
}
/** before each render of the city: cells seen by the camera or by the sun's shadow area on, the rest off; a cell whose
 *  visible pieces changed is recorded again */
function bundleStep(cam) {
  const L = BUNDLES.list;
  if (!L.length) return;
  const { F, FS, M } = BUNDLES,
    sc = sun.shadow.camera;
  F.setFromProjectionMatrix(M.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse));
  const sh = sun.castShadow && renderer.shadowMap.enabled;
  if (sh) FS.setFromProjectionMatrix(M.multiplyMatrices(sc.projectionMatrix, sc.matrixWorldInverse));
  for (const b of L) {
    const bx = b.userData.box;
    b.visible = F.intersectsBox(bx) || (sh && FS.intersectsBox(bx));
    if (!b.visible) continue;
    // which pieces are visible (and with which geometry): a cheap signature
    const ch = b.children;
    let sig = ch.length;
    for (let i = 0; i < ch.length; i++) if (ch[i].visible) sig = (sig * 31 + i + 1 + (ch[i].geometry ? ch[i].geometry.id * 7 : 0)) % 1000000007;
    if (sig !== b.userData.sig) {
      if (b.userData.sig !== -1) BUNDLES.regrab++;
      b.userData.sig = sig;
      b.needsUpdate = true;
    }
  }
}

// v1.4.44 (punto 4, auditoría: «se preparan 2 shaders por el camino (depth): cada uno da un tirón la primera vez»): the
// shadow (depth) shaders are prepared when a kind of shadow caster first enters the sun's shadow area while playing. At
// the end of the loading, one render with the shadow area covering the whole map and everything shown (every cell of the
// city and of the trees, their shadow copies, the warm-up people under the map, cars) prepares them all at once, behind
// the loading screen. Everything is put back right after.
function precompileShadows() {
  if (!sun.castShadow || !renderer.shadowMap.enabled) return;
  const t0 = performance.now(),
    sc = sun.shadow.camera,
    keep = { l: sc.left, r: sc.right, t: sc.top, b: sc.bottom, n: sc.near, f: sc.far, p: sun.position.clone(), tg: sun.target.position.clone() },
    hidden = [];
  scene.traverse((o) => {
    if (!o.visible && (o.isMesh || o.isGroup || o.isBundleGroup)) {
      o.visible = true;
      hidden.push(o);
    }
  });
  const big = 6000;
  Object.assign(sc, { left: -big, right: big, top: big, bottom: -big, near: 1, far: 12000 });
  sc.updateProjectionMatrix();
  sun.target.position.set(0, 0, 0);
  sun.position.copy(sun.target.position).addScaledVector(sun.position.clone().sub(keep.tg).normalize(), 5000);
  sun.target.updateMatrixWorld();
  sun.updateMatrixWorld();
  LOD.off = true;
  const was = renderer.shadowMap.autoUpdate;
  renderer.shadowMap.autoUpdate = true;
  renderer.shadowMap.needsUpdate = true;
  try {
    renderer.render(scene, camera);
  } catch (e) {
    console.error('precompileShadows', e);
  }
  renderer.shadowMap.autoUpdate = was;
  LOD.off = false;
  for (const o of hidden) o.visible = false;
  Object.assign(sc, { left: keep.l, right: keep.r, top: keep.t, bottom: keep.b, near: keep.n, far: keep.f });
  sc.updateProjectionMatrix();
  sun.position.copy(keep.p);
  sun.target.position.copy(keep.tg);
  sun.target.updateMatrixWorld();
  sun.updateMatrixWorld();
  updateCityLOD(true);
  console.log('sombras precompiladas', Math.round(performance.now() - t0), 'ms');
}

// v1.4.44 (punto 2, BatchedMesh; Jonay: «dale caña a todo»): the trees were one InstancedMesh per kind and per 250 m cell:
// ~211 draw calls in view. Now all the trees of a material (bark, leaves…) are ONE BatchedMesh: three.js culls tree by tree
// and draws them all with one multi-draw call. Each tree picks its geometry (near crown or the light far one, past 210 m)
// and whether it is drawn (the same distance as the city, by the fog), recomputed when the camera moves 8 m (treeLOD). The
// shadow is cast by another BatchedMesh with the light crowns that only the shadow camera sees. Out of the WebGPU bundles
// (noMerge: it culls per tree every render). ?sinbatch=1 to measure without it.
const TREEB = { sets: [], cx: 1e9, cz: 1e9, far: -1, n: 0 };
function batchTrees(ims) {
  const byMat = new Map();
  for (const im of ims) {
    if (!byMat.has(im.material)) byMat.set(im.material, []);
    byMat.get(im.material).push(im);
  }
  const mtx = new THREE.Matrix4(),
    col = new THREE.Color(),
    sph = new THREE.Sphere();
  for (const [mat, list] of byMat) {
    // geometries (near and far) with the same attributes, indexed: what BatchedMesh needs
    const gs = new Set();
    for (const im of list) {
      gs.add(im.geometry);
      if (im.userData.lo) gs.add(im.userData.lo);
    }
    let common = null;
    for (const g of gs) {
      const k = Object.keys(g.attributes);
      common = common ? common.filter((q) => k.includes(q)) : k;
    }
    if (!common.includes('normal')) common.push('normal');
    const prep = new Map();
    let V = 0,
      I = 0,
      N = 0;
    for (const g of gs) {
      const c = new THREE.BufferGeometry();
      if (!g.attributes.normal) g.computeVertexNormals();
      for (const k of common) c.setAttribute(k, g.attributes[k]);
      const ci = dedupIndex(c);
      ci.computeBoundingSphere();
      prep.set(g, ci);
      V += ci.attributes.position.count;
      I += ci.index.count;
    }
    for (const im of list) N += im.count;
    const shadow = list.some((im) => im.castShadow);
    const make = (geos) => {
      const bm = new THREE.BatchedMesh(N, V, I, mat);
      const ids = new Map();
      for (const g of geos) ids.set(g, bm.addGeometry(prep.get(g)));
      bm.frustumCulled = false; // the whole city: culled tree by tree (perObjectFrustumCulled)
      bm.sortObjects = false;
      bm.userData.noMerge = true;
      bm.matrixAutoUpdate = false;
      return { bm, ids };
    };
    const A = make([...gs]);
    A.bm.castShadow = false;
    A.bm.receiveShadow = list[0].receiveShadow;
    A.bm.name = 'arbolesBatch';
    const S = shadow ? make([...new Set(list.map((im) => im.userData.lo || im.geometry))]) : null;
    if (S) {
      S.bm.castShadow = true;
      S.bm.receiveShadow = false;
      S.bm.layers.set(SHADOW_LAYER);
      S.bm.name = 'arbolesBatchSombra';
    }
    const set = { A, S, id: [], sid: [], hi: [], lo: [], x: [], z: [], r: [], vis: [], far: [] };
    for (const im of list) {
      im.updateMatrixWorld(true);
      const hi = A.ids.get(im.geometry),
        lo = im.userData.lo ? A.ids.get(im.userData.lo) : hi;
      const r0 = prep.get(im.geometry).boundingSphere.radius;
      for (let i = 0; i < im.count; i++) {
        im.getMatrixAt(i, mtx);
        mtx.premultiply(im.matrixWorld);
        const id = A.bm.addInstance(hi);
        A.bm.setMatrixAt(id, mtx);
        if (im.instanceColor) {
          im.getColorAt(i, col);
          A.bm.setColorAt(id, col);
        }
        let sid = -1;
        if (S) {
          sid = S.bm.addInstance(S.ids.get(im.userData.lo || im.geometry));
          S.bm.setMatrixAt(sid, mtx);
          if (im.instanceColor) S.bm.setColorAt(sid, col);
        }
        sph.center.set(0, 0, 0);
        sph.radius = r0;
        sph.applyMatrix4(mtx);
        set.id.push(id);
        set.sid.push(sid);
        set.hi.push(hi);
        set.lo.push(lo);
        set.x.push(sph.center.x);
        set.z.push(sph.center.z);
        set.r.push(sph.radius);
        set.vis.push(true);
        set.far.push(false);
        TREEB.n++;
      }
      scene.remove(im);
      im.dispose();
    }
    scene.add(A.bm);
    if (S) scene.add(S.bm);
    TREEB.sets.push(set);
  }
  TREEB.cx = 1e9;
}
function treeLOD(x, z, far, force) {
  if (!TREEB.sets.length) return;
  if (!force && Math.abs(x - TREEB.cx) < 8 && Math.abs(z - TREEB.cz) < 8 && far === TREEB.far) return;
  TREEB.cx = x;
  TREEB.cz = z;
  TREEB.far = far;
  for (const t of TREEB.sets) {
    const { A, S } = t;
    for (let i = 0; i < t.id.length; i++) {
      const dx = t.x[i] - x,
        dz = t.z[i] - z,
        d2 = dx * dx + dz * dz,
        reach = far + t.r[i],
        vis = d2 < reach * reach;
      if (vis !== t.vis[i]) {
        t.vis[i] = vis;
        A.bm.setVisibleAt(t.id[i], vis);
        if (S) S.bm.setVisibleAt(t.sid[i], vis);
      }
      if (!vis) continue;
      const close = 210 * distK() + t.r[i],
        isFar = d2 > close * close;
      if (isFar !== t.far[i]) {
        t.far[i] = isFar;
        A.bm.setGeometryIdAt(t.id[i], isFar ? t.lo[i] : t.hi[i]);
      }
    }
  }
}

/** v1.4.44 (auditoría: «geometría en RAM 65,7 → 252,7 MB» al copiar los modelos en BatchedMesh): a geometry without index
 *  (every vertex repeated in each triangle) made indexed, joining the vertices whose attributes are all identical (bit by
 *  bit). Usually 3-6 times fewer vertices. Returns a new geometry (the attributes of g are not touched). */
function dedupIndex(g) {
  if (g.index) return g;
  const names = Object.keys(g.attributes),
    A = names.map((k) => g.attributes[k]),
    n = g.attributes.position.count;
  const views = A.map((a) => new Int32Array(a.array.buffer, a.array.byteOffset, a.array.length));
  const map = new Map(),
    remap = new Uint32Array(n);
  let m = 0;
  const first = [];
  for (let i = 0; i < n; i++) {
    let h = 2166136261;
    for (let q = 0; q < A.length; q++) {
      const sz = A[q].itemSize,
        v = views[q];
      for (let c = 0; c < sz; c++) h = Math.imul(h ^ v[i * sz + c], 16777619);
    }
    let list = map.get(h),
      found = -1;
    if (list)
      for (const j of list) {
        let eq = true;
        for (let q = 0; q < A.length && eq; q++) {
          const sz = A[q].itemSize,
            v = views[q];
          for (let c = 0; c < sz; c++)
            if (v[i * sz + c] !== v[first[j] * sz + c]) {
              eq = false;
              break;
            }
        }
        if (eq) {
          found = j;
          break;
        }
      }
    if (found < 0) {
      found = m++;
      first.push(i);
      if (list) list.push(found);
      else map.set(h, [found]);
    }
    remap[i] = found;
  }
  const out = new THREE.BufferGeometry();
  A.forEach((a, q) => {
    const sz = a.itemSize,
      src = a.array,
      dst = new src.constructor(m * sz);
    for (let j = 0; j < m; j++) for (let c = 0; c < sz; c++) dst[j * sz + c] = src[first[j] * sz + c];
    out.setAttribute(names[q], new THREE.BufferAttribute(dst, sz, a.normalized));
  });
  out.setIndex(m < 65536 ? new THREE.Uint16BufferAttribute(remap, 1) : new THREE.Uint32BufferAttribute(remap, 1));
  out.boundingSphere = g.boundingSphere ? g.boundingSphere.clone() : null;
  return out;
}
