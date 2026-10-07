const KEEP_POS = typeof location !== 'undefined' && /[?&]revisor=1\b/.test(location.search);
// ============ world building ============
const CHUNK = 250;
let OBST_RI = -1; const OBST = []; let DRESS_RI = -1;
class Acc {
  constructor() { this.p = []; this.n = []; this.uv = []; this.c = []; this.e = []; }
  tri(a, b, c, ua, ub, uc, col, ex, want) {
    // a,b,c = [x,y,z]; want = desired normal direction (optional) -> fix winding
    let ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (want && nx * want[0] + ny * want[1] + nz * want[2] < 0) { [b, c] = [c, b];[ub, uc] = [uc, ub]; nx = -nx; ny = -ny; nz = -nz; }
    const L = Math.hypot(nx, ny, nz) || 1; nx /= L; ny /= L; nz /= L;
    this.p.push(...a, ...b, ...c); this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
    this.uv.push(...ua, ...ub, ...uc);
    if (col) this.c.push(...col, ...col, ...col);
    if (ex !== undefined) this.e.push(...ex, ...ex, ...ex);
  }
  quad(a, b, c, d, ua, ub, uc, ud, col, ex, want) { if (OBST_RI >= 0) OBST.push([OBST_RI, (a[0] + b[0] + c[0] + d[0]) / 4, (a[2] + b[2] + c[2] + d[2]) / 4, Math.min(a[1], b[1], c[1], d[1]), Math.max(a[1], b[1], c[1], d[1]), a[0], a[2], c[0], c[2]]); this.tri(a, b, c, ua, ub, uc, col, ex, want); this.tri(a, c, d, ua, uc, ud, col, ex, want); }
  geo(exSize = 0, mat = null) {
    // memory (audit P0.1 / P1.7): normals as int8, colours as uint8 (only the attribute the material reads), and the CPU
    // copy of every attribute is dropped once it is on the GPU. The positions are kept only for the review agent
    // (URL ?revisor=1), which reads the city's triangles; nothing in the game does (~250 MB less)
    const g = new THREE.BufferGeometry(); const free = function () { this.array = null; };
    g.setAttribute('position', KEEP_POS ? new THREE.Float32BufferAttribute(this.p, 3) : new THREE.Float32BufferAttribute(this.p, 3).onUpload(free));
    const N = new Int8Array(this.n.length); for (let i = 0; i < N.length; i++) N[i] = Math.round(this.n[i] * 127);
    g.setAttribute('normal', new THREE.BufferAttribute(N, 3, true).onUpload(free));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2).onUpload(free));
    if (this.c.length) {
      let mx = 0; for (let i = 0; i < this.c.length; i++) if (this.c[i] > mx) mx = this.c[i];
      const col = () => { if (mx <= 1.001) { const C = new Uint8Array(this.c.length); for (let i = 0; i < C.length; i++) C[i] = Math.round(Math.max(0, this.c[i]) * 255); return new THREE.BufferAttribute(C, 3, true); } return new THREE.Float32BufferAttribute(this.c, 3); };
      const wantA = !mat || mat.userData.aCol, wantC = !mat || mat.vertexColors;
      if (wantA) g.setAttribute('aCol', col().onUpload(free)); if (wantC) g.setAttribute('color', col().onUpload(free));
    }
    if (exSize) g.setAttribute('aEx', new THREE.Float32BufferAttribute(this.e, exSize).onUpload(free));
    g.computeBoundingSphere(); g.computeBoundingBox();
    return g;
  }
}
const CHUNKS = new Map(); // key -> {matKey: Acc}
function acc(x, z, mk) {
  const k = Math.floor(x / CHUNK) + ',' + Math.floor(z / CHUNK);
  let c = CHUNKS.get(k); if (!c) { c = {}; CHUNKS.set(k, c); }
  return c[mk] || (c[mk] = new Acc());
}

// ---------- materials
const MAT = {};
(function makeMaterials() {
  // facade material with atlas logic
  const fm = new THREE.MeshStandardMaterial({ map: TEX.facade, roughness: 0.88, metalness: 0.0 }); fm.userData.aCol = true;
  fm.onBeforeCompile = (sh) => {
    sh.uniforms.maskMap = { value: TEX.facadeMask }; sh.uniforms.uNight = U.uNight; sh.uniforms.plOn = PLASTER.on; sh.uniforms.plDet = { value: PLASTER.det }; sh.uniforms.plN1 = { value: PLASTER.n1 }; sh.uniforms.plN2 = { value: PLASTER.n2 }; sh.uniforms.uSty = { value: FSTY.map((d) => new THREE.Vector2(d[0], d[1])) };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nattribute vec3 aCol; attribute vec2 aEx; varying vec3 vCol; varying vec2 vEx; varying vec2 vF;')
      .replace('#include <uv_vertex>', '#include <uv_vertex>\nvCol = aCol; vEx = aEx; vF = uv;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform sampler2D maskMap; uniform float uNight; uniform float plOn; uniform sampler2D plDet, plN1, plN2; uniform vec2 uSty[16]; varying vec3 vCol; varying vec2 vEx; varying vec2 vF;\nfloat hsh(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}')
      .replace('#include <map_fragment>', `
        float fl = floor(vF.y); vec2 cl = fract(vF);
        float row = fl < 0.5 ? 0.0 : 1.0;
        float aid = vEx.x; float acol = aid < 7.5 ? aid : aid - 8.0; float aband = aid < 7.5 ? 2.0 : 0.0;
        vec2 auv = vec2((acol + cl.x) / 8.0, (aband + row + cl.y) * 0.25);
        vec2 gx = dFdx(vF) * vec2(1.0/8.0, 0.25), gy = dFdy(vF) * vec2(1.0/8.0, 0.25);
        vec4 tc = textureGrad(map, auv, gx, gy);
        vec4 mk = textureGrad(maskMap, auv, gx, gy);
        diffuseColor.rgb *= mix(tc.rgb, tc.rgb * vCol, mk.r);
        // plaster: tiled in metres (bay/floor size of the style), one of 3 kinds per building
        vec2 puv = vF * uSty[int(clamp(aid, 0.0, 15.0))] / 3.2 + vec2(vEx.y * 0.37, vEx.y * 0.61);
        float pk = hsh(vec2(vEx.y * 7.3, 2.1)); vec3 pw = pk < 0.45 ? vec3(1.0, 0.0, 0.0) : (pk < 0.86 ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0));
        float pd = dot(texture(plDet, puv).rgb, pw);
        float pa = mk.r * plOn; diffuseColor.rgb *= mix(1.0, 1.0 + (pd - 0.5) * 1.3, pa);
        float lit = step(0.55, hsh(floor(vF) + vec2(vEx.y * 13.1, vEx.y)));`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        if (pa > 0.01) {
          vec4 pn1 = texture(plN1, puv), pn2 = texture(plN2, puv);
          vec2 nxy = vec2(dot(pw, vec3(pn1.r, pn1.b, pn2.g)), dot(pw, vec3(pn1.g, pn2.r, pn2.b))) * 2.0 - 1.0; nxy *= 0.9 * pa;
          vec3 q0 = dFdx(-vViewPosition), q1 = dFdy(-vViewPosition); vec2 st0 = dFdx(puv), st1 = dFdy(puv);
          vec3 q1p = cross(q1, normal), q0p = cross(normal, q0);
          vec3 Tn = q1p * st0.x + q0p * st1.x, Bn = q1p * st0.y + q0p * st1.y; float dt = max(dot(Tn, Tn), dot(Bn, Bn));
          if (dt > 0.0) { float sc = inversesqrt(dt); normal = normalize(Tn * (nxy.x * sc) + Bn * (nxy.y * sc) + normal * sqrt(max(0.0, 1.0 - dot(nxy, nxy)))); }
        }`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, 0.12, mk.g);')
      .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor = mix(metalnessFactor, 0.6, mk.g * 0.6);')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += mk.g * lit * uNight * vec3(1.0, 0.72, 0.42) * 1.4;');
  };
  MAT.facade = fm;
  MAT.roofTile = new THREE.MeshStandardMaterial({ map: TEX.roofTile, roughness: 0.8 });
  MAT.roofFlat = new THREE.MeshStandardMaterial({ map: TEX.roofFlat, roughness: 0.95, vertexColors: true });
  MAT.trim = new THREE.MeshStandardMaterial({ roughness: 0.8, vertexColors: true });
  MAT.stone = new THREE.MeshStandardMaterial({ map: null, roughness: 0.9, color: 0x9a948a });
  MAT.balcony = new THREE.MeshStandardMaterial({ map: TEX.balcony, roughness: 0.8 });
  MAT.wood = new THREE.MeshStandardMaterial({ map: TEX.wood, roughness: 0.85 });
  MAT.grass = new THREE.MeshStandardMaterial({ map: (() => { const c = mkCanvas(128, 128), x = c.getContext('2d'); noiseFill(x, 128, 128, [86, 128, 60], 34, 77, 2); return canvasTex(c); })(), roughness: 0.95 });
  MAT.tunnel = new THREE.MeshStandardMaterial({ color: 0xb9b4a8, roughness: 0.9, side: THREE.DoubleSide, emissive: 0x2a2620, emissiveIntensity: 0.6 });
  MAT.tunnelLight = new THREE.MeshBasicMaterial({ color: 0xffe2a8, side: THREE.DoubleSide });
  MAT.glassHouse = new THREE.MeshStandardMaterial({ color: 0xf1f4f1, roughness: 0.6, transparent: true, opacity: 0.9, side: THREE.DoubleSide }); // milky plastic: reads as a greenhouse, not as an invisible building
  const road = (map, off, extra = {}) => new THREE.MeshStandardMaterial({ map, roughness: 0.92, polygonOffset: true, polygonOffsetFactor: -off, polygonOffsetUnits: -off * 2, ...extra });
  MAT.asphalt = road(TEX.asphalt, 3);
  MAT.asphaltLines = road(TEX.asphaltLines, 4);
  MAT.paving = road(TEX.paving, 3);
  MAT.sidewalk = road(TEX.sidewalk, 1);
  MAT.footway = road(TEX.sidewalk, 2);
  MAT.dirt = road(TEX.dirt, 1);
  MAT.tram = road(TEX.tram, 5);
  MAT.disc = road(TEX.asphalt, 4.5);
  MAT.discPave = road(TEX.paving, 3.5);
})();

// ---------- terrain with splat map
const SPLAT = { x0: HM.x0, z0: HM.z0, w: (HM.nx - 1) * HM.dx, h: (HM.nz - 1) * HM.dx, W: 2048, H: Math.round(2048 * ((HM.nz - 1) / (HM.nx - 1))) };
function buildSplat() {
  const c = mkCanvas(SPLAT.W, SPLAT.H), x = c.getContext('2d');
  const sx = SPLAT.W / SPLAT.w, sz = SPLAT.H / SPLAT.h;
  const P = (px, pz) => [(px - SPLAT.x0) * sx, (pz - SPLAT.z0) * sz];
  // base: rural terrain with noise (greens/ochres of La Laguna)
  x.fillStyle = '#7c8452'; x.fillRect(0, 0, SPLAT.W, SPLAT.H);
  const r = mulberry(99);
  for (let i = 0; i < 2600; i++) { x.fillStyle = pick(['rgba(110,120,70,.35)', 'rgba(150,130,85,.3)', 'rgba(95,110,60,.35)', 'rgba(160,145,100,.25)']); const R = 6 + r() * 40; x.beginPath(); x.arc(r() * SPLAT.W, r() * SPLAT.H, R, 0, 7); x.fill(); }
  const poly = (coords, fill, stroke) => { x.beginPath(); for (let i = 0; i < coords.length; i += 2) { const p = P(coords[i], coords[i + 1]); i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]); } x.closePath(); if (fill) { x.fillStyle = fill; x.fill(); } if (stroke) { x.strokeStyle = stroke; x.stroke(); } };
  // urban halo around buildings
  x.lineJoin = 'round';
  for (const b of DATA.B) { x.lineWidth = 16 * sx; poly(b[6], '#9d978a', '#9d978a'); }
  const AT = DATA.AT;
  const areaCol = { park: '#5f8a3e', garden: '#6c9146', grass: '#6f9a45', farmland: '#8b8a4e', meadow: '#7f9650', pitch: '#4f8a3a', forest: '#3f6230', scrub: '#6f7a45', water: '#4a7fa0', cemetery: '#86866a', playground: '#b49a74', parking: '#6b6b6b', residential: '#a09a8c', industrial: '#8f8c86', square: '#b8b2a6', sports: '#9c7b5b', orchard: '#6c8844' };
  const order = ['residential', 'industrial', 'farmland', 'meadow', 'orchard', 'scrub', 'forest', 'grass', 'park', 'garden', 'cemetery', 'sports', 'pitch', 'playground', 'parking', 'square', 'water'];
  for (const k of order) for (const a of DATA.A) if (AT[a[0]] === k) {
    x.lineWidth = 1; poly(a[2], areaCol[k]);
    if (k === 'farmland') { // furrows
      x.save(); poly(a[2]); x.clip(); x.strokeStyle = 'rgba(90,70,45,.35)'; x.lineWidth = 1.2;
      for (let i = -SPLAT.H; i < SPLAT.W; i += 5) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + SPLAT.H * 0.6, SPLAT.H); x.stroke(); } x.restore();
    }
    if (k === 'pitch') { x.lineWidth = 1; poly(a[2], null, 'rgba(255,255,255,.7)'); }
  }
  // roads (for distance look)
  const RT = DATA.RT;
  for (const rd of DATA.R) {
    const t = RT[rd[0]]; const c2 = rd[4]; const w = rd[2];
    x.strokeStyle = (t === 'pedestrian' || ((rd[3] >> 3) & 3) === 1) ? '#8f8a80' : (t === 'track' || t === 'path') ? '#9a8566' : (t === 'footway' || t === 'steps') ? '#a8a298' : '#4a4a4c';
    x.lineWidth = Math.max(1, w * sx * (t === 'footway' ? 1 : 1.35)); x.lineCap = 'round';
    x.beginPath(); for (let i = 0; i < c2.length; i += 2) { const p = P(c2[i], c2[i + 1]); i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]); } x.stroke();
  }
  for (const b of DATA.B) { x.lineWidth = 1; poly(b[6], '#6d6960'); }
  // paving mask (R channel): historic core, squares, urban halos
  const m = mkCanvas(SPLAT.W, SPLAT.H), y = m.getContext('2d'); y.fillStyle = '#000'; y.fillRect(0, 0, SPLAT.W, SPLAT.H);
  const mpoly = (coords, fill) => { y.beginPath(); for (let i = 0; i < coords.length; i += 2) { const p = P(coords[i], coords[i + 1]); i ? y.lineTo(p[0], p[1]) : y.moveTo(p[0], p[1]); } y.closePath(); y.fillStyle = fill; y.fill(); };
  y.lineJoin = 'round';
  for (const b of DATA.B) { y.lineWidth = 12 * sx; y.strokeStyle = '#999'; mpoly(b[6], '#999'); y.stroke(); }
  for (const a of DATA.A) if (['residential', 'industrial'].includes(AT[a[0]])) mpoly(a[2], '#777');
  mpoly(HIST_CORE, '#fff');
  for (const a of DATA.A) if (['square', 'parking', 'playground'].includes(AT[a[0]])) mpoly(a[2], '#fff');
  for (const a of DATA.A) if (['park', 'garden', 'grass', 'pitch', 'forest', 'water', 'farmland', 'meadow', 'scrub', 'cemetery', 'orchard'].includes(AT[a[0]])) mpoly(a[2], '#000');
  SPLAT.mask = m;
  return c;
}
let SPLATCANVAS;
// tunnel cuttings: kept in a small float texture (mobile GPUs have few fragment uniforms)
// rows: 0 = segment (x1,z1,x2,z2), 1 = (width,0,0,0), 2 = group bbox, 3 = group range (start,end)
const NCUT = 512, NGRP = 160;
const TCUT_DATA = new Float32Array(NCUT * 4 * 4);
const TCUT_TEX = new THREE.DataTexture(TCUT_DATA, NCUT, 4, THREE.RGBAFormat, THREE.FloatType); TCUT_TEX.magFilter = TCUT_TEX.minFilter = THREE.NearestFilter; TCUT_TEX.needsUpdate = true;
const TCUT_U = { tex: { value: TCUT_TEX }, n: { value: 0 } };
// coarse 32 m occupancy grid so almost every terrain pixel skips the cut loop with a single fetch
const CG = { s: 32, x0: WORLD.x0 - 64, z0: WORLD.z0 - 64 }; CG.nx = Math.ceil((WORLD.x1 - WORLD.x0 + 128) / CG.s); CG.nz = Math.ceil((WORLD.z1 - WORLD.z0 + 128) / CG.s);
const CG_DATA = new Uint8Array(CG.nx * CG.nz);
const CG_TEX = new THREE.DataTexture(CG_DATA, CG.nx, CG.nz, THREE.RedFormat, THREE.UnsignedByteType); CG_TEX.magFilter = CG_TEX.minFilter = THREE.NearestFilter; CG_TEX.needsUpdate = true;
function finalizeCuts() { TCUTS_READY = true;
  const n = Math.min(NCUT, TCUTS.length); let g = -1, last = null; const D = TCUT_DATA, R = (row, i) => (row * NCUT + i) * 4;
  for (let i = 0; i < n; i++) { const c = TCUTS[i]; D.set([c[0], c[1], c[2], c[3]], R(0, i)); D[R(1, i)] = c[4];
    if (c[5] !== last) { if (g + 1 >= NGRP) break; g++; last = c[5]; D.set([1e9, 1e9, -1e9, -1e9], R(2, g)); D.set([i, i, 0, 0], R(3, g)); }
    const b = R(2, g), e = c[4] + 1; D[b] = Math.min(D[b], c[0] - e, c[2] - e); D[b + 1] = Math.min(D[b + 1], c[1] - e, c[3] - e); D[b + 2] = Math.max(D[b + 2], c[0] + e, c[2] + e); D[b + 3] = Math.max(D[b + 3], c[1] + e, c[3] + e); D[R(3, g) + 1] = i + 1; }
  TCUT_U.n.value = g + 1; TCUT_TEX.needsUpdate = true;
  for (let i = 0; i < n; i++) { const c = TCUTS[i], e = c[4] + 1;
    const i0 = Math.max(0, Math.floor((Math.min(c[0], c[2]) - e - CG.x0) / CG.s)), i1 = Math.min(CG.nx - 1, Math.floor((Math.max(c[0], c[2]) + e - CG.x0) / CG.s));
    const j0 = Math.max(0, Math.floor((Math.min(c[1], c[3]) - e - CG.z0) / CG.s)), j1 = Math.min(CG.nz - 1, Math.floor((Math.max(c[1], c[3]) + e - CG.z0) / CG.s));
    for (let j = j0; j <= j1; j++) for (let k = i0; k <= i1; k++) CG_DATA[j * CG.nx + k] = 255; }
  CG_TEX.needsUpdate = true;
}
function buildTerrain() {
  SPLATCANVAS = buildSplat();
  const tex = canvasTex(SPLATCANVAS, { repeat: false }); tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  const nx = HM.nx, nz = HM.nz; const pos = new Float32Array(nx * nz * 3), uv = new Float32Array(nx * nz * 2);
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const k = j * nx + i, x = HM.x0 + i * HM.dx, z = HM.z0 + j * HM.dx;
    pos[k * 3] = x; pos[k * 3 + 1] = HM.a[k] / 10; pos[k * 3 + 2] = z; uv[k * 2] = i / (nx - 1); uv[k * 2 + 1] = 1 - j / (nz - 1);
  }
  const idx = [];
  for (let j = 0; j < nz - 1; j++) for (let i = 0; i < nx - 1; i++) { const a = j * nx + i, b = a + 1, c = a + nx, d = c + 1; idx.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
  const m = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.97, side: THREE.DoubleSide }); // seen from below (from inside a cutting) it reads as earth, not as a hole
  const mtex = canvasTex(SPLAT.mask, { repeat: false, srgb: false }); mtex.wrapS = mtex.wrapT = THREE.ClampToEdgeWrapping;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uCutTex = TCUT_U.tex; sh.uniforms.uGrpN = TCUT_U.n; sh.uniforms.uCG = { value: CG_TEX };
    sh.uniforms.uDetail = { value: TEX.detail }; sh.uniforms.uMask = { value: mtex }; sh.uniforms.uPave = { value: TEX.paving };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vW;').replace('#include <uv_vertex>', '#include <uv_vertex>\nvW = position.xz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform sampler2D uDetail; uniform sampler2D uMask; uniform sampler2D uPave; varying vec2 vW;')
      .replace('void main() {', `uniform highp sampler2D uCutTex; uniform int uGrpN; uniform sampler2D uCG;
      void main() {
        ivec2 cgc = ivec2(floor((vW - vec2(${CG.x0.toFixed(1)}, ${CG.z0.toFixed(1)})) / ${CG.s.toFixed(1)}));
        bool cgIn = cgc.x >= 0 && cgc.y >= 0 && cgc.x < ${CG.nx} && cgc.y < ${CG.nz};
        if (cgIn && texelFetch(uCG, cgc, 0).r > 0.5) for (int g = 0; g < ${NGRP}; g++) { if (g >= uGrpN) break; vec4 B = texelFetch(uCutTex, ivec2(g, 2), 0); if (vW.x < B.x || vW.y < B.y || vW.x > B.z || vW.y > B.w) continue;
          vec4 rg = texelFetch(uCutTex, ivec2(g, 3), 0);
          for (int i = int(rg.x); i < int(rg.y); i++) { vec4 c = texelFetch(uCutTex, ivec2(i, 0), 0); float cw = texelFetch(uCutTex, ivec2(i, 1), 0).x; vec2 ab = c.zw - c.xy; float t = clamp(dot(vW - c.xy, ab) / max(dot(ab, ab), 1e-3), 0.0, 1.0); vec2 q = c.xy + ab * t - vW; if (dot(q, q) < cw * cw) discard; } }`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nif (!gl_FrontFacing) diffuseColor.rgb = vec3(0.16, 0.12, 0.09);')
      .replace('#include <map_fragment>', `#include <map_fragment>
        diffuseColor.rgb *= (texture2D(uDetail, vW / 7.0).r * 0.55 + texture2D(uDetail, vW / 53.0).g * 0.55 + 0.35) * 0.95;
        float pm = texture2D(uMask, vMapUv).r;
        vec3 pv = texture2D(uPave, vW / 4.0).rgb * vec3(1.0, 0.98, 0.95);
        diffuseColor.rgb = mix(diffuseColor.rgb, pv * mix(0.8, 1.0, pm), smoothstep(0.3, 0.8, pm));`);
  };
  const mesh = new THREE.Mesh(g, m); mesh.receiveShadow = true; scene.add(mesh);
  return mesh;
}

// ---------- roads
const RTN = DATA.RT;
const ROADCLASS = (rd) => {
  const t = RTN[rd[0]], paved = (rd[3] >> 3) & 3;
  if (paved === 2 || t === 'track' || t === 'path') return 'dirt';
  if (t === 'footway' || t === 'steps' || t === 'cycleway') return 'footway';
  if (t === 'pedestrian' || paved === 1) return 'paving';
  if (rd[0] <= 8 && rd[2] >= 7) return 'asphaltLines';
  return 'asphalt';
};
const YOFF = { sidewalk: 0.09, dirt: 0.08, footway: 0.1, asphalt: 0.13, paving: 0.13, asphaltLines: 0.15, disc: 0.155, discPave: 0.135, tram: 0.17 };
function ribbon(pts, w, mk, yoff, tileLen, uSpan = 1, hf = null, blend = false) { /* blend: a sunk road near grade follows the ground across its width (flat on a cross slope it floated ~1 m over the road beside it) */
  // pts: flat [x,z,...]; subdivide to max 5m
  const P = [];
  for (let i = 0; i < pts.length - 2; i += 2) {
    const x1 = pts[i], z1 = pts[i + 1], x2 = pts[i + 2], z2 = pts[i + 3];
    const L = Math.hypot(x2 - x1, z2 - z1), n = Math.max(1, Math.ceil(L / 5));
    for (let k = 0; k < n; k++) P.push([x1 + (x2 - x1) * k / n, z1 + (z2 - z1) * k / n]);
  }
  P.push([pts[pts.length - 2], pts[pts.length - 1]]);
  if (P.length < 2) return;
  let dist = 0; const hw = w / 2; const L = [], R = [], V = [];
  for (let i = 0; i < P.length; i++) {
    const p = P[i], a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
    let d1x = p[0] - a[0], d1z = p[1] - a[1], d2x = b[0] - p[0], d2z = b[1] - p[1];
    const l1 = Math.hypot(d1x, d1z) || 1, l2 = Math.hypot(d2x, d2z) || 1; d1x /= l1; d1z /= l1; d2x /= l2; d2z /= l2;
    if (i === 0) { d1x = d2x; d1z = d2z; } if (i === P.length - 1) { d2x = d1x; d2z = d1z; }
    let tx = d1x + d2x, tz = d1z + d2z; const tl = Math.hypot(tx, tz) || 1; tx /= tl; tz /= tl;
    const nx = -tz, nz = tx; const miter = 1 / Math.max(0.5, nx * -d2z + nz * d2x);
    if (i > 0) dist += Math.hypot(p[0] - P[i - 1][0], p[1] - P[i - 1][1]);
    const lx = p[0] + nx * hw * miter, lz = p[1] + nz * hw * miter, rx = p[0] - nx * hw * miter, rz = p[1] - nz * hw * miter;
    if (hf) { const hy = hf(dist, p[0], p[1]) + yoff; let kl = 0, kr = 0; if (blend) { const g = heightAt(p[0], p[1]), k = smooth(0, 1, 1 - (g - hy + yoff) / 1.2); kl = k * Math.min(0, heightAt(lx, lz) - g); kr = k * Math.min(0, heightAt(rx, rz) - g); } L.push([lx, hy + kl, lz]); R.push([rx, hy + kr, rz]); } else { const hl = heightAt(lx, lz), hr = heightAt(rx, rz); let lift = 0; /* the ribbon is a straight chord across the width: lift it where the 16 m terrain bulges inside (grass poking through the asphalt) */
      if (w > 3) for (const f of [0.25, 0.5, 0.75]) lift = Math.max(lift, heightAt(lx + (rx - lx) * f, lz + (rz - lz) * f) - (hl + (hr - hl) * f));
      L.push([lx, hl + yoff + lift, lz]); R.push([rx, hr + yoff + lift, rz]); } V.push(dist / tileLen);
  }
  const A = acc(P[0][0], P[0][1], mk);
  for (let i = 0; i < P.length - 1; i++) A.quad(L[i], R[i], R[i + 1], L[i + 1], [0, V[i]], [uSpan, V[i]], [uSpan, V[i + 1]], [0, V[i + 1]], null, undefined, [0, 1, 0]);
}
// strip between two lateral offsets of a centre line, each edge on the terrain
function ribbonBand(pts, o0, o1, mk, yoff, tileLen, own = -1) { /* own >= 0: skip the pieces that fall inside another carriageway (junction mouths, slip roads) */
  const P = []; for (let i = 0; i < pts.length - 2; i += 2) { const x1 = pts[i], z1 = pts[i + 1], x2 = pts[i + 2], z2 = pts[i + 3]; const L = Math.hypot(x2 - x1, z2 - z1), n = Math.max(1, Math.ceil(L / 5)); for (let k = 0; k < n; k++) P.push([x1 + (x2 - x1) * k / n, z1 + (z2 - z1) * k / n]); }
  P.push([pts[pts.length - 2], pts[pts.length - 1]]); if (P.length < 2) return;
  const A = acc(P[0][0], P[0][1], mk); let dist = 0; const E = [];
  for (let i = 0; i < P.length; i++) { const p = P[i], a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)]; let tx = b[0] - a[0], tz = b[1] - a[1]; const tl = Math.hypot(tx, tz) || 1; tx /= tl; tz /= tl; const nx = -tz, nz = tx;
    if (i > 0) dist += Math.hypot(p[0] - P[i - 1][0], p[1] - P[i - 1][1]); const q0 = [p[0] + nx * o0, p[1] + nz * o0], q1 = [p[0] + nx * o1, p[1] + nz * o1];
    E.push([[q0[0], heightAt(q0[0], q0[1]) + yoff, q0[1]], [q1[0], heightAt(q1[0], q1[1]) + yoff, q1[1]], dist / tileLen]); }
  const u = Math.abs(o1 - o0) / tileLen; for (let i = 0; i < E.length - 1; i++) { const a = E[i], b = E[i + 1];
    if (own >= 0) { const mx = (a[0][0] + a[1][0] + b[0][0] + b[1][0]) / 4, mz = (a[0][2] + a[1][2] + b[0][2] + b[1][2]) / 4, my = (a[0][1] + b[0][1]) / 2; if (inOtherRoad(mx, mz, my - 1.5, my + 1.5, own, 0.3, true) || inOtherRoad(a[0][0], a[0][2], my - 1.5, my + 1.5, own, 0.2, true) || inOtherRoad(b[0][0], b[0][2], my - 1.5, my + 1.5, own, 0.2, true)) continue; }
    if (o1 > o0) A.quad(a[1], a[0], b[0], b[1], [u, a[2]], [0, a[2]], [0, b[2]], [u, b[2]], null, undefined, [0, 1, 0]); else A.quad(a[0], a[1], b[1], b[0], [0, a[2]], [u, a[2]], [u, b[2]], [0, b[2]], null, undefined, [0, 1, 0]); }
}
function disc(x, z, r, mk, yoff) {
  const A = acc(x, z, mk); const n = 12; const c = [x, heightAt(x, z) + yoff, z];
  for (let i = 0; i < n; i++) {
    const a1 = i / n * Math.PI * 2, a2 = (i + 1) / n * Math.PI * 2;
    const p1x = x + Math.cos(a1) * r, p1z = z + Math.sin(a1) * r, p2x = x + Math.cos(a2) * r, p2z = z + Math.sin(a2) * r;
    A.tri(c, [p1x, heightAt(p1x, p1z) + yoff, p1z], [p2x, heightAt(p2x, p2z) + yoff, p2z], [x / 6, z / 6], [p1x / 6, p1z / 6], [p2x / 6, p2z / 6], null, undefined, [0, 1, 0]);
  }
}
const ROADSEG = (() => { // grid for nearest road queries (names, sidewalks)
  const CS = 30, m = new Map();
  return {
    add(ri, i, x1, z1, x2, z2) { const k0 = Math.floor(Math.min(x1, x2) / CS), k1 = Math.floor(Math.max(x1, x2) / CS), j0 = Math.floor(Math.min(z1, z2) / CS), j1 = Math.floor(Math.max(z1, z2) / CS); for (let a = k0; a <= k1; a++) for (let b = j0; b <= j1; b++) { const k = a * 1000 + b; let l = m.get(k); if (!l) m.set(k, l = []); l.push(ri, i); } },
    nearest(x, z, filter) {
      let best = null, bd = 1e9; const a0 = Math.floor(x / CS), b0 = Math.floor(z / CS);
      for (let a = a0 - 1; a <= a0 + 1; a++) for (let b = b0 - 1; b <= b0 + 1; b++) { const l = m.get(a * 1000 + b); if (!l) continue;
        for (let q = 0; q < l.length; q += 2) { const ri = l[q], i = l[q + 1], rd = DATA.R[ri]; if (filter && !filter(rd)) continue; const c = rd[4];
          const x1 = c[i], z1 = c[i + 1], x2 = c[i + 2], z2 = c[i + 3], dx = x2 - x1, dz = z2 - z1; let t = ((x - x1) * dx + (z - z1) * dz) / (dx * dx + dz * dz || 1); t = clamp(t, 0, 1);
          const d = Math.hypot(x - x1 - dx * t, z - z1 - dz * t); if (d < bd) { bd = d; best = { ri, i, t, d, x: x1 + dx * t, z: z1 + dz * t, dx, dz }; } } }
      return best;
    }
  };
})();
let ROADS_INDEXED = false; const nodeCount = new Map(); const K = (x, z) => x + ',' + z;
function indexRoads() {
  if (ROADS_INDEXED) return; ROADS_INDEXED = true;
  DATA.R.forEach((rd, ri) => { const c = rd[4]; for (let i = 0; i < c.length; i += 2) { const k = K(c[i], c[i + 1]); nodeCount.set(k, (nodeCount.get(k) || 0) + 1); } for (let i = 0; i < c.length - 2; i += 2) ROADSEG.add(ri, i, c[i], c[i + 1], c[i + 2], c[i + 3]); });
}
const ROADY = []; // per road: height function (s, x, z) -> y of its surface as built (for audits and AI)
function buildRoads() {
  indexRoads(); computeDepressions(); computeRaises();
  for (let ri = 0; ri < DATA.R.length; ri++) ROADY[ri] = roadYFn(ri);
  for (let ri = 0; ri < DATA.R.length; ri++) { const rd = DATA.R[ri]; DRESS_RI = ri; OBST_RI = (DEP.has(ri) || (rd[3] & 2) || RAISE.has(ri)) && window.__AUDIT ? ri : -1;
    const t = RTN[rd[0]], cls = ROADCLASS(rd), w = rd[2], c = rd[4];
    const tile = cls === 'asphaltLines' ? 12 : cls === 'paving' ? 5 : cls === 'footway' ? 2.4 : 8;
    if (DEP.has(ri)) { TUN_RI = ri; tunnelRoad(c, Math.max(w, 2.6), cls, tile, depressedHF(ri), PED_TUN.has(ri) ? { H: 2.9, cover: 3.1 } : {}); TUN_RI = -1; continue; } // tunnels, underpasses and their cuttings
    if (RAISE.has(ri) && !(rd[3] & 2)) { // approach embankment of a bridge that had to be lifted for clearance
      const sp = RAISE_SPAN.get(ri), Lr = polyLen(c), parts = [];
      const raised = subPoly(c, sp[0], sp[1]); const hf = (s, x, z) => heightAt(x, z) + raiseOf(ri, s + sp[0]);
      ribbon(raised, w, cls, YOFF[cls], tile, cls === 'asphaltLines' ? 1 : w / 8, hf); bridgeDressing(raised, w, hf, rd[0] <= 12);
      if (sp[0] > 0.5) parts.push(subPoly(c, 0, sp[0])); if (sp[1] < Lr - 0.5) parts.push(subPoly(c, sp[1], Lr));
      for (const pc of parts) ribbon(pc, w, cls, YOFF[cls], tile, cls === 'asphaltLines' ? 1 : w / 8);
      continue; }
    if ((rd[3] & 2) && !AT_GRADE.has(ri)) { // bridges / overpasses: raised deck with parapets and piers
      if (rd[0] >= 13 && polyMinDist(c, -347.5, 745.4) < 75) continue; // the Padre Anchieta ring and its ramps are modelled separately (OSM footbridge pieces of the ramp blocked it)
      const hf0 = bridgeProfile(c), hf = RAISE.has(ri) ? (s, x, z) => hf0(s, x, z) + raiseOf(ri, s) : hf0; ribbon(c, w, cls, YOFF[cls], tile, cls === 'asphaltLines' ? 1 : w / (cls === 'paving' ? 5 : cls === 'footway' ? 2.4 : 8), hf);
      bridgeDressing(c, w, hf, rd[0] <= 12); continue;
    }
    ribbon(c, w, cls, YOFF[cls], tile, cls === 'asphaltLines' ? 1 : w / (cls === 'paving' ? 5 : cls === 'footway' ? 2.4 : 8));
    if (['primary', 'secondary', 'tertiary', 'residential', 'unclassified', 'primary_link', 'secondary_link', 'tertiary_link', 'living_street'].includes(t) && cls !== 'paving')
      for (const sd of [1, -1]) ribbonBand(c, sd * (w / 2 - 0.3), sd * (w / 2 + 2.1), 'sidewalk', YOFF.sidewalk, 2.4, ri); // two kerb-side strips (a full-width slab under the road poked through it on curved slopes)
    // junction discs
    if (cls === 'asphalt' || cls === 'asphaltLines' || cls === 'paving') for (let i = 0; i < c.length; i += 2) {
      const n = nodeCount.get(K(c[i], c[i + 1])); const end = i === 0 || i === c.length - 2;
      if (n >= 2 || end) disc(c[i], c[i + 1], w / 2 * (n >= 3 ? 1.05 : 1.0), cls === 'paving' ? 'discPave' : 'disc', cls === 'paving' ? YOFF.discPave : YOFF.disc);
    }
  }
  OBST_RI = -1; DRESS_RI = -1;
  for (const r of DATA.RB || []) roundaboutIsland(r[0], r[1], r[2], WIDEN(3, r[3], 1));
  // tram track
  if (DATA.T.length > 3) ribbon(DATA.T, 7.2, 'tram', YOFF.tram, 6, 1);
}

function bridgeProfile(c) {
  const cum = [0]; for (let i = 2; i < c.length; i += 2) cum.push(cum[cum.length - 1] + Math.hypot(c[i] - c[i - 2], c[i + 1] - c[i - 1]));
  const L = cum[cum.length - 1] || 1; const g0 = heightAt(c[0], c[1]), g1 = heightAt(c[c.length - 2], c[c.length - 1]);
  const cl = 1.0, ramp = Math.max(4, Math.min(35, L / 2)); // small camber only: clearance over roads comes from computeRaises (same for twin decks)
  return (s, x, z) => { const t = clamp(s / L, 0, 1); const e = Math.min(s, L - s) / ramp; const b = cl * smooth(0, 1, e); return Math.max(lerp(g0, g1, t) + b, heightAt(x, z) + 0.15); };
}
function bridgeDressing(c, w, hf, road) {
  const T = acc(c[0], c[1], 'trim'); const col = [0.72, 0.71, 0.68]; const pts = []; let dist = 0; const hw = w / 2 + 0.1;
  for (let i = 0; i < c.length - 2; i += 2) { const x1 = c[i], z1 = c[i + 1], x2 = c[i + 2], z2 = c[i + 3], L = Math.hypot(x2 - x1, z2 - z1); const n = Math.max(1, Math.ceil(L / 5));
    for (let k = 0; k < n; k++) { const x = x1 + (x2 - x1) * k / n, z = z1 + (z2 - z1) * k / n; pts.push([x, z, hf(dist + L * k / n, x, z), (x2 - x1) / L, (z2 - z1) / L]); } dist += L; }
  pts.push([c[c.length - 2], c[c.length - 1], hf(dist, c[c.length - 2], c[c.length - 1]), pts.length ? pts[pts.length - 1][3] : 1, pts.length ? pts[pts.length - 1][4] : 0]);
  for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; for (const sg of [1, -1]) { const ax = a[0] - a[4] * hw * sg, az = a[1] + a[3] * hw * sg, bx = b[0] - b[4] * hw * sg, bz = b[1] + b[3] * hw * sg;
      // no parapet where it would stand in another carriageway at this level (twin decks, merging slip roads)
      if (DRESS_RI >= 0 && (inOtherRoad((ax + bx) / 2, (az + bz) / 2, Math.min(a[2], b[2]) - 4.2, Math.max(a[2], b[2]) + 1.0, DRESS_RI, 0.15, true) || inOtherRoad(ax, az, a[2] - 4.2, a[2] + 1.0, DRESS_RI, 0.15, true) || inOtherRoad(bx, bz, b[2] - 4.2, b[2] + 1.0, DRESS_RI, 0.15, true))) continue;
      // concrete kerb-parapet...
      T.quad([ax, a[2] - 0.6, az], [bx, b[2] - 0.6, bz], [bx, b[2] + 0.5, bz], [ax, a[2] + 0.5, az], [0, 0], [0, 0], [0, 0], [0, 0], col, undefined, [-a[4] * sg, 0, a[3] * sg]);
      T.quad([bx, b[2] - 0.6, bz], [ax, a[2] - 0.6, az], [ax, a[2] + 0.5, az], [bx, b[2] + 0.5, bz], [0, 0], [0, 0], [0, 0], [0, 0], col, undefined, [a[4] * sg, 0, -a[3] * sg]);
      { const ix = ax + a[4] * 0.3 * sg, iz = az - a[3] * 0.3 * sg, jx = bx + b[4] * 0.3 * sg, jz = bz - b[3] * 0.3 * sg; T.quad([ax, a[2] + 0.5, az], [bx, b[2] + 0.5, bz], [jx, b[2] + 0.5, jz], [ix, a[2] + 0.5, iz], [0, 0], [0, 0], [0, 0], [0, 0], col, undefined, [0, 1, 0]); }
      // ...topped with a galvanised steel railing (posts + two rails)
      const rc = [0.52, 0.55, 0.58], ox = a[4] * 0.15 * sg, oz = -a[3] * 0.15 * sg; // rail line sits on the middle of the kerb
      for (const [h0, h1] of [[1.08, 1.16], [0.78, 0.83]]) {
        const p1 = [ax + ox, a[2] + h0, az + oz], p2 = [bx + ox, b[2] + h0, bz + oz], p3 = [bx + ox, b[2] + h1, bz + oz], p4 = [ax + ox, a[2] + h1, az + oz];
        T.quad(p1, p2, p3, p4, [0, 0], [0, 0], [0, 0], [0, 0], rc, undefined, [-a[4] * sg, 0, a[3] * sg]); T.quad(p2, p1, p4, p3, [0, 0], [0, 0], [0, 0], [0, 0], rc, undefined, [a[4] * sg, 0, -a[3] * sg]);
        T.quad(p4, p3, [bx + ox + b[4] * 0.06 * sg, b[2] + h1, bz + oz - b[3] * 0.06 * sg], [ax + ox + a[4] * 0.06 * sg, a[2] + h1, az + oz - a[3] * 0.06 * sg], [0, 0], [0, 0], [0, 0], [0, 0], rc, undefined, [0, 1, 0]); }
      { const segL = Math.hypot(b[0] - a[0], b[1] - a[1]); const np = Math.max(1, Math.round(segL / 2.2));
        for (let k = 0; k < np; k++) { const t = k / np, px = ax + (bx - ax) * t + ox, pz = az + (bz - az) * t + oz, py = a[2] + (b[2] - a[2]) * t; const ux = a[3] * 0.035, uz = a[4] * 0.035, vx = a[4] * 0.035, vz = -a[3] * 0.035;
          T.quad([px - ux - vx, py + 0.5, pz - uz - vz], [px + ux - vx, py + 0.5, pz + uz - vz], [px + ux - vx, py + 1.16, pz + uz - vz], [px - ux - vx, py + 1.16, pz - uz - vz], [0, 0], [0, 0], [0, 0], [0, 0], rc, undefined, [-a[4], 0, a[3]]);
          T.quad([px + ux + vx, py + 0.5, pz + uz + vz], [px - ux + vx, py + 0.5, pz - uz + vz], [px - ux + vx, py + 1.16, pz - uz + vz], [px + ux + vx, py + 1.16, pz + uz + vz], [0, 0], [0, 0], [0, 0], [0, 0], rc, undefined, [a[4], 0, -a[3]]);
          T.quad([px - ux + vx, py + 0.5, pz - uz + vz], [px - ux - vx, py + 0.5, pz - uz - vz], [px - ux - vx, py + 1.16, pz - uz - vz], [px - ux + vx, py + 1.16, pz - uz + vz], [0, 0], [0, 0], [0, 0], [0, 0], rc, undefined, [-a[3], 0, -a[4]]);
          T.quad([px + ux - vx, py + 0.5, pz + uz - vz], [px + ux + vx, py + 0.5, pz + uz + vz], [px + ux + vx, py + 1.16, pz + uz + vz], [px + ux - vx, py + 1.16, pz + uz - vz], [0, 0], [0, 0], [0, 0], [0, 0], rc, undefined, [a[3], 0, a[4]]); } } }
    // underside
    const l1 = [a[0] - a[4] * hw, a[2] - 0.6, a[1] + a[3] * hw], r1 = [a[0] + a[4] * hw, a[2] - 0.6, a[1] - a[3] * hw], l2 = [b[0] - b[4] * hw, b[2] - 0.6, b[1] + b[3] * hw], r2 = [b[0] + b[4] * hw, b[2] - 0.6, b[1] - b[3] * hw];
    T.quad(l1, r1, r2, l2, [0, 0], [0, 0], [0, 0], [0, 0], [0.55, 0.54, 0.52], undefined, [0, -1, 0]);
    // piers where the deck is high
    if (i % 4 === 2) { const g = heightAt(a[0], a[1]); if (a[2] - g > 3 && !onCarriagewayEarly(a[0], a[1])) { const pw = Math.min(1.2, w * 0.2); const px = a[0], pz = a[1]; const y0 = g - 0.5, y1 = a[2] - 0.6;
        for (const [dx, dz] of [[1, 1], [1, -1], [-1, -1], [-1, 1]]) {} 
        const q = [[px - pw, pz - pw], [px + pw, pz - pw], [px + pw, pz + pw], [px - pw, pz + pw]];
        for (let k = 0; k < 4; k++) { const p = q[k], r = q[(k + 1) % 4]; T.quad([p[0], y0, p[1]], [r[0], y0, r[1]], [r[0], y1, r[1]], [p[0], y1, p[1]], [0, 0], [0, 0], [0, 0], [0, 0], [0.7, 0.69, 0.66], undefined, [(r[1] - p[1]), 0, -(r[0] - p[0])]); }
        COL.addCirc(px, pz, pw * 1.2, y0, y1); } } }
  BRIDGE_DECKS.push({ type: 'path', pts: pts.map((p) => [p[0], p[1], p[2] + 0.12]), w: w + 0.4, road, bridge: true });
}
const BRIDGE_DECKS = [];
function roundaboutIsland(cx, cz, R, w) {
  let Ri = R - w / 2 - 0.4; // shrink it until no other carriageway (a slip road passing tangent) runs over its edge
  const hit = (r) => { for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; if (onCarriagewayEarly(cx + Math.cos(a) * r, cz + Math.sin(a) * r, -0.6)) return true; } return false; };
  while (Ri >= 1.5 && hit(Ri)) Ri -= 0.5; if (Ri < 1.5) return;
  const G = acc(cx, cz, 'grass'), T = acc(cx, cz, 'trim'); const N = 28, y0 = heightAt(cx, cz) + 0.35; const kc = [0.85, 0.84, 0.8];
  for (let i = 0; i < N; i++) { const a0 = i / N * Math.PI * 2, a1 = (i + 1) / N * Math.PI * 2; const p0 = [cx + Math.cos(a0) * Ri, cz + Math.sin(a0) * Ri], p1 = [cx + Math.cos(a1) * Ri, cz + Math.sin(a1) * Ri];
    // the island follows the ground (it used to be a flat disc at the centre's height: on a slope it stood 1-1.5 m over
    // the carriageway on the low side — agent: "grass floating over the road")
    const RG = Math.max(1, Math.ceil(Ri / 6)), P = (a, r) => { const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r; return [x, heightAt(x, z) + 0.35, z]; };
    for (let k = 0; k < RG; k++) { const r0 = Ri * k / RG, r1 = Ri * (k + 1) / RG; const A = P(a0, r0), B = P(a0, r1), C = P(a1, r1), D2 = P(a1, r0);
      if (k === 0) G.tri([cx, heightAt(cx, cz) + 0.35, cz], B, C, [cx / 4, cz / 4], [B[0] / 4, B[2] / 4], [C[0] / 4, C[2] / 4], null, undefined, [0, 1, 0]);
      else G.quad(A, B, C, D2, [A[0] / 4, A[2] / 4], [B[0] / 4, B[2] / 4], [C[0] / 4, C[2] / 4], [D2[0] / 4, D2[2] / 4], null, undefined, [0, 1, 0]); }
    const g0 = heightAt(p0[0], p0[1]) + 0.05, g1 = heightAt(p1[0], p1[1]) + 0.05;
    T.quad([p0[0], g0, p0[1]], [p1[0], g1, p1[1]], [p1[0], g1 + 0.3, p1[1]], [p0[0], g0 + 0.3, p0[1]], [0, 0], [0, 0], [0, 0], [0, 0], kc, undefined, [Math.cos(a0), 0, Math.sin(a0)]); }
  COL.addCirc(cx, cz, Math.max(0.8, Ri - 0.2));
  if (Ri > 6) TREES.push([cx, cz, 1, 1.1, 1]); if (Ri > 14) { for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2 + 0.4; TREES.push([cx + Math.cos(a) * Ri * 0.55, cz + Math.sin(a) * Ri * 0.55, 1, 0.9, 1]); } }
}
const TUNNEL_DECKS = [], TCUTS = [];
// ---- underpasses / tunnels: depressed profiles that continue into the neighbouring ways (approach cuttings)
const DEP = new Map();
const polyLen = (c) => { let L = 0; for (let i = 2; i < c.length; i += 2) L += Math.hypot(c[i] - c[i - 2], c[i + 1] - c[i - 1]); return L; };
const PED_TUN = new Set();
function computeDepressions() {
  const pedEnds = new Map(); DATA.R.forEach((rd, ri) => { if (rd[0] <= 12) return; const c = rd[4]; for (const k of [K(c[0], c[1]), K(c[c.length - 2], c[c.length - 1])]) { let a = pedEnds.get(k); if (!a) pedEnds.set(k, a = []); a.push(ri); } });
  const ends = new Map(); const addE = (k, ri) => { let a = ends.get(k); if (!a) ends.set(k, a = []); a.push(ri); };
  DATA.R.forEach((rd, ri) => { if (rd[0] > 12) return; const c = rd[4]; addE(K(c[0], c[1]), ri); addE(K(c[c.length - 2], c[c.length - 1]), ri); });
  const push = (ri, f) => { let a = DEP.get(ri); if (!a) DEP.set(ri, a = []); a.push(f); };
  DATA.R.forEach((rd, ri) => {
    if (!(rd[3] & 4)) return; const c = rd[4]; const L = polyLen(c); const ped = rd[0] > 12; if (L < (ped ? 6 : 12)) return;
    if (ped && !crossingsOf(ri).some((X) => DATA.R[X.rj][0] <= 12 && !(DATA.R[X.rj][3] & 4))) return; // arcades / passages through buildings stay at street level
    if (ped) { const D = 3.6, rIn = clamp(L * 0.3, 4, 12), rOut = 22, R = rIn + rOut; push(ri, (s) => D * smooth(0, 1, (Math.min(s, L - s) + rOut) / R)); PED_TUN.add(ri);
      for (const atStart of [true, false]) { const n = c.length; const px = atStart ? c[0] : c[n - 2], pz = atStart ? c[1] : c[n - 1]; let ox = atStart ? c[0] - c[2] : c[n - 2] - c[n - 4], oz = atStart ? c[1] - c[3] : c[n - 1] - c[n - 3]; const ol = Math.hypot(ox, oz) || 1; ox /= ol; oz /= ol;
        let best = -1, bd = Math.cos(0.9), bStart = true; for (const cj of pedEnds.get(K(px, pz)) || []) { if (cj === ri) continue; const r2 = DATA.R[cj]; if (r2[3] & 6 || r2[0] <= 12) continue; const c2 = r2[4], m = c2.length; const st = c2[0] === px && c2[1] === pz; let dx = st ? c2[2] - c2[0] : c2[m - 4] - c2[m - 2], dz = st ? c2[3] - c2[1] : c2[m - 3] - c2[m - 1]; const dl = Math.hypot(dx, dz) || 1; const dot = (dx * ox + dz * oz) / dl; if (dot > bd) { bd = dot; best = cj; bStart = st; } }
        if (best >= 0) { const Lc = polyLen(DATA.R[best][4]); push(best, bStart ? (s) => D * smooth(0, 1, (rOut - s) / R) : (s) => D * smooth(0, 1, (rOut - (Lc - s)) / R)); PED_TUN.add(best); } }
      return; }
    const D = rd[0] <= 2 ? 7.8 : 7.2, rIn = clamp(L * 0.3, 8, 40), rOut0 = rd[0] <= 2 ? 75 : 55;
    // walk the continuation chain at each end; the ramp must be back at grade before the first junction on it (a side
    // street joining the ramp used to stay at grade against the trench wall — agent: "atasco / hundido" in trenches)
    const chains = [];
    for (const atStart of [true, false]) {
      let n = c.length; let px = atStart ? c[0] : c[n - 2], pz = atStart ? c[1] : c[n - 1];
      let ox = atStart ? c[0] - c[2] : c[n - 2] - c[n - 4], oz = atStart ? c[1] - c[3] : c[n - 1] - c[n - 3]; let ol = Math.hypot(ox, oz) || 1; ox /= ol; oz /= ol;
      let uOff = 0, prev = ri; const hops = []; let jd = Infinity;
      for (let hop = 0; hop < 4 && uOff < rOut0; hop++) {
        let best = -1, bd = Math.cos(0.75), bStart = true;
        for (const cj of ends.get(K(px, pz)) || []) { if (cj === prev || cj === ri) continue; const r2 = DATA.R[cj]; if (r2[3] & 6) continue; const c2 = r2[4], m = c2.length; const st = c2[0] === px && c2[1] === pz;
          let dx = st ? c2[2] - c2[0] : c2[m - 4] - c2[m - 2], dz = st ? c2[3] - c2[1] : c2[m - 3] - c2[m - 1]; const dl = Math.hypot(dx, dz) || 1; const dot = (dx * ox + dz * oz) / dl; if (dot > bd) { bd = dot; best = cj; bStart = st; } }
        if (best < 0) break; const c2 = DATA.R[best][4], m = c2.length, Lc = polyLen(c2);
        if (jd === Infinity) { let u = 0; for (let q = 1; q < m / 2; q++) { const i0 = bStart ? (q - 1) * 2 : m - q * 2, i1 = bStart ? q * 2 : m - (q + 1) * 2; u += Math.hypot(c2[i1] - c2[i0], c2[i1 + 1] - c2[i0 + 1]); if ((nodeCount.get(K(c2[i1], c2[i1 + 1])) || 0) >= 3) { jd = uOff + u; break; } } }
        hops.push({ ri: best, bStart, u0: uOff, Lc });
        uOff += Lc; prev = best; px = bStart ? c2[m - 2] : c2[0]; pz = bStart ? c2[m - 1] : c2[1];
        ox = bStart ? c2[m - 2] - c2[m - 4] : c2[0] - c2[2]; oz = bStart ? c2[m - 1] - c2[m - 3] : c2[1] - c2[3]; ol = Math.hypot(ox, oz) || 1; ox /= ol; oz /= ol;
      }
      chains.push({ hops, lim: clamp(jd - 4, 20, rOut0) });
    }
    const limS = chains[0].lim, limE = chains[1].lim;
    push(ri, (s) => D * Math.min(smooth(0, 1, (s + limS) / (rIn + limS)), smooth(0, 1, (L - s + limE) / (rIn + limE))));
    for (const ch of chains) { const lim = ch.lim, R = rIn + lim;
      for (const { ri: best, bStart, u0, Lc } of ch.hops) { if (u0 > lim) break; push(best, bStart ? (s) => D * smooth(0, 1, (lim - (u0 + s)) / R) : (s) => D * smooth(0, 1, (lim - (u0 + Lc - s)) / R)); } }
  });
  // trench mouths where another street at grade overlaps the carriageway (merges, side streets that run into the ramp,
  // a twin carriageway that stays up): the trench only starts sinking once it is clear of them (Vía de Ronda X 388
  // Z 1499: cars at the merge fell 1.7 m into the cutting). Ramps at ~15 % from the last overlapping point.
  // caps are by position and shared by every road of the same sunk chain (main road + approach hops), so the
  // depth stays continuous where they meet
  const depRows = new Set([...DEP.keys()].map((i) => DATA.R[i])); const comp = new Map(); const par = (i) => { while (comp.get(i) !== i) { comp.set(i, comp.get(comp.get(i))); i = comp.get(i); } return i; };
  const nodeOf = new Map(); for (const ri of DEP.keys()) { comp.set(ri, ri); const c = DATA.R[ri][4]; for (let i = 0; i < c.length; i += 2) { const k = K(c[i], c[i + 1]); const o = nodeOf.get(k); if (o !== undefined) comp.set(par(ri), par(o)); else nodeOf.set(k, ri); } }
  const OV = new Map(); // component -> [[x, z], ...]
  const joined = (rj, k) => { const c = DATA.R[rj][4]; for (let i = 0; i < c.length; i += 2) { const o = nodeOf.get(K(c[i], c[i + 1])); if (o !== undefined && par(o) === k) return true; } return false; }; // only streets that merge into the trench (its mouth), not ones that just run beside it
  for (const [ri, fs0] of DEP.entries()) { const rd = DATA.R[ri]; if (rd[0] > 12 || PED_TUN.has(ri)) continue; const c = rd[4]; let s = 0;
    for (let i = 0; i + 3 < c.length; i += 2) { const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]); if (L < 0.01) continue; const tx = (c[i + 2] - c[i]) / L, tz = (c[i + 3] - c[i + 1]) / L;
      for (let u = 0; u <= L; u += 2) { const ss = s + u; let d0 = 0; for (const f of fs0) d0 = Math.max(d0, f(ss)); if (d0 < 0.6 || d0 > 5.5) continue; const x = c[i] + tx * u, z = c[i + 1] + tz * u;
        const rn = ROADSEG.nearest(x, z, (r) => r !== rd && r[0] <= 12 && !(r[3] & 6) && !depRows.has(r)); if (!rn) continue; const w2 = DATA.R[rn.ri][2];
        const Ln = Math.hypot(rn.dx, rn.dz) || 1; if (rn.d < w2 / 2 + 0.5 && Math.abs((rn.dx * tx + rn.dz * tz) / Ln) > 0.5 && joined(rn.ri, par(ri))) { const k = par(ri); let a = OV.get(k); if (!a) OV.set(k, a = []); const c2 = DATA.R[rn.ri][4]; let sj = 0; for (let j = 0; j < rn.i; j += 2) sj += Math.hypot(c2[j + 2] - c2[j], c2[j + 3] - c2[j + 1]); sj += Math.hypot(c2[rn.i + 2] - c2[rn.i], c2[rn.i + 3] - c2[rn.i + 1]) * rn.t; a.push([x, z, rn.ri, sj, ri, ss]); } } s += L; } }
  const KEEPS = new Map(); // component -> [[x, z, depth], ...] where something passes over the sunk road
  for (const [ri, fs0] of DEP.entries()) { if (!OV.has(par(ri))) continue; for (const X of crossingsOf(ri)) { let d = 0; for (const f of fs0) d = Math.max(d, f(X.s)); const k = par(ri); let a = KEEPS.get(k); if (!a) KEEPS.set(k, a = []); a.push([X.x, X.z, d]); } }
  let ncap = 0;
  for (const [ri, fs0] of [...DEP.entries()]) { const rd = DATA.R[ri]; if (PED_TUN.has(ri)) continue; const pts = OV.get(par(ri)); if (!pts || pts.length < 4) continue; ncap++; /* a real merge overlaps for a while (>= 8 m); a corner just touching the mouth does not count */
    const c = rd[4], cum = [0]; for (let i = 2; i < c.length; i += 2) cum.push(cum[cum.length - 1] + Math.hypot(c[i] - c[i - 2], c[i + 1] - c[i - 1]));
    const at = (q) => { let j = 1; while (j < cum.length - 1 && cum[j] < q) j++; const t = clamp((q - cum[j - 1]) / ((cum[j] - cum[j - 1]) || 1), 0, 1); return [lerp(c[(j - 1) * 2], c[j * 2], t), lerp(c[(j - 1) * 2 + 1], c[j * 2 + 1], t)]; };
    const fs = fs0.slice(); const KEEP = KEEPS.get(par(ri)) || [];
    DEP.set(ri, [(q) => { let d = 0; for (const f of fs) d = Math.max(d, f(q)); if (d <= 0.5) return d; const [x, z] = at(q); let cap = Infinity; for (const p of pts) cap = Math.min(cap, 0.5 + Math.hypot(x - p[0], z - p[1]) * 0.15);
      for (const k of KEEP) cap = Math.max(cap, k[2] - Math.hypot(x - k[0], z - k[1]) * 0.15); return Math.min(d, cap); }]); } // ...but never shallower where it passes under a bridge or another road
  // where the trench still has to be deep there (it passes under something just after the mouth), the street that
  // merges into it goes down with it instead (a slip road into the underpass)
  const sink = new Map();
  for (const pts of OV.values()) { if (pts.length < 4) continue; for (const [x, z, rj, sj, ri, ss] of pts) { const dT = depthOf(ri, ss) / 1.12 + 0.5; if (dT < 1.1) continue; let a = sink.get(rj); if (!a) sink.set(rj, a = []); a.push([sj, dT]); } }
  for (const [rj, a0] of sink) { const a = a0.filter((q) => q[1] <= 4.0); if (a.length < 4 || a.length < a0.length / 2) { sink.delete(rj); continue; } /* only a clear merge into a moderately deep trench; deeper ones keep the street at grade (the cap above) */ const Lj = polyLen(DATA.R[rj][4]); push(rj, (q) => { let m = 0; for (const [s0, d] of a) { const R = Math.max(8, d / 0.12); const t = Math.abs(q - s0); if (t < R) m = Math.max(m, d * smooth(0, 1, (R - t) / R)); } return m; }); }
  console.log('trench mouths kept at grade under overlapping streets', ncap, 'streets sinking with a trench', JSON.stringify([...sink].map(([k, a]) => [k, a.length, Math.max(...a.map((q) => q[1])).toFixed(1)])));
}
// segment-intersection crossings of road ri with any other road (no shared node near the crossing = different levels)
let XSEG = null;
function crossingsOf(ri) {
  const R = DATA.R; const CS = 40;
  if (!XSEG) { XSEG = { segs: [], G: new Map() }; R.forEach((rd, rj) => { const c = rd[4]; let s = 0; for (let i = 0; i < c.length - 2; i += 2) { const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]); const k = XSEG.segs.length; XSEG.segs.push([rj, c[i], c[i + 1], c[i + 2], c[i + 3], s, L]); s += L;
      const x0 = Math.floor(Math.min(c[i], c[i + 2]) / CS), x1 = Math.floor(Math.max(c[i], c[i + 2]) / CS), z0 = Math.floor(Math.min(c[i + 1], c[i + 3]) / CS), z1 = Math.floor(Math.max(c[i + 1], c[i + 3]) / CS);
      for (let a = x0; a <= x1; a++) for (let b = z0; b <= z1; b++) { const key = a * 10000 + b; let l = XSEG.G.get(key); if (!l) XSEG.G.set(key, l = []); l.push(k); } } }); }
  const out = []; const c = R[ri][4]; let s = 0; const done = new Set();
  for (let i = 0; i < c.length - 2; i += 2) { const ax = c[i], az = c[i + 1], bx = c[i + 2], bz = c[i + 3], L = Math.hypot(bx - ax, bz - az); const d1x = bx - ax, d1z = bz - az;
    const x0 = Math.floor(Math.min(ax, bx) / CS), x1 = Math.floor(Math.max(ax, bx) / CS), z0 = Math.floor(Math.min(az, bz) / CS), z1 = Math.floor(Math.max(az, bz) / CS);
    for (let a = x0; a <= x1; a++) for (let b = z0; b <= z1; b++) for (const k of XSEG.G.get(a * 10000 + b) || []) { const B = XSEG.segs[k]; if (B[0] === ri) continue; const key = i + ':' + k; if (done.has(key)) continue; done.add(key);
      const d2x = B[3] - B[1], d2z = B[4] - B[2]; const den = d1x * d2z - d1z * d2x; if (Math.abs(den) < 1e-6) continue;
      const t = ((B[1] - ax) * d2z - (B[2] - az) * d2x) / den, u = ((B[1] - ax) * d1z - (B[2] - az) * d1x) / den; if (t <= 0.001 || t >= 0.999 || u <= 0.001 || u >= 0.999) continue;
      const x = ax + d1x * t, z = az + d1z * t; const cb = R[B[0]][4]; let j = false;
      for (let p = 0; p < c.length && !j; p += 2) if (Math.hypot(c[p] - x, c[p + 1] - z) < 6) for (let q = 0; q < cb.length; q += 2) if (c[p] === cb[q] && c[p + 1] === cb[q + 1]) { j = true; break; }
      if (j) continue; const cr = Math.abs(d1x * d2z - d1z * d2x) / ((L || 1) * (B[6] || 1));
      out.push({ rj: B[0], x, z, s: s + L * t, so: B[5] + B[6] * u, cr }); } s += L; }
  return out;
}
function xsegGrid() { if (!XSEG) crossingsOf(0); return XSEG; }
// is (x,z) inside the carriageway of another drivable road whose surface lies within [ylo, yhi]? (walls/parapets/slabs must not go there)
const RNODES = new Map(); const rnodes = (ri) => { let st = RNODES.get(ri); if (!st) { st = new Set(); const c = DATA.R[ri][4]; for (let i = 0; i < c.length; i += 2) st.add(K(c[i], c[i + 1])); RNODES.set(ri, st); } return st; };
const joined = (a, b) => { const A = rnodes(a); for (const k of rnodes(b)) if (A.has(k)) return true; return false; };
function inOtherRoad(x, z, ylo, yhi, own, margin = 0.15, strict = false) { /* strict: also roads joined to own (slip roads at the merge) */
  const X = xsegGrid(); const l = X.G.get(Math.floor(x / 40) * 10000 + Math.floor(z / 40)); if (!l) return false;
  for (const k of l) { const g = X.segs[k]; const rj = g[0]; if (rj === own) continue; const rd = DATA.R[rj]; if (rd[0] > 12) continue; if (own >= 0 && ((!strict && joined(own, rj)) || (DEP.has(own) && DEP.has(rj)))) continue; // its own continuation / twin tube (handled apart)
    const dx = g[3] - g[1], dz = g[4] - g[2], L2 = dx * dx + dz * dz || 1; const t = clamp(((x - g[1]) * dx + (z - g[2]) * dz) / L2, 0, 1); const d = Math.hypot(x - g[1] - dx * t, z - g[2] - dz * t);
    if (d > rd[2] / 2 - margin) continue; const ys = ROADY[rj] ? ROADY[rj](g[5] + g[6] * t, x, z) : heightAt(x, z); if (ys >= ylo && ys <= yhi) return true; }
  return false; }
// ---- overpasses that would leave less than ~5 m over the road below: lift the deck and build approach ramps on the neighbouring ways
const RAISE = new Map(), RAISE_SPAN = new Map(), AT_GRADE = new Set(); let DEPSET = new Set();
function subPoly(c, s0, s1) { const out = []; let s = 0;
  for (let i = 0; i < c.length - 2; i += 2) { const x1 = c[i], z1 = c[i + 1], x2 = c[i + 2], z2 = c[i + 3], L = Math.hypot(x2 - x1, z2 - z1); const a = s, b = s + L;
    if (b >= s0 && a <= s1) { const t0 = L ? clamp((s0 - a) / L, 0, 1) : 0, t1 = L ? clamp((s1 - a) / L, 0, 1) : 1; if (!out.length) out.push(x1 + (x2 - x1) * t0, z1 + (z2 - z1) * t0); out.push(x1 + (x2 - x1) * t1, z1 + (z2 - z1) * t1); }
    s = b; }
  return out.length >= 4 ? out : c.slice(0, 4); }
const raiseOf = (ri, s) => { const a = RAISE.get(ri); if (!a) return 0; let d = 0; for (const f of a) d = Math.max(d, f(s)); return d; };
const EXTRA_NEED = new Map(), BRIDGE_H = new Map();
function computeRaisesOnce() {
  DEPSET = new Set([...DEP.keys()].map((ri) => DATA.R[ri]));
  const ends = new Map(); const addE = (k, ri) => { let a = ends.get(k); if (!a) ends.set(k, a = []); a.push(ri); };
  DATA.R.forEach((rd, ri) => { const c = rd[4]; addE(K(c[0], c[1]), ri); addE(K(c[c.length - 2], c[c.length - 1]), ri); });
  const push = (ri, f) => { let a = RAISE.get(ri); if (!a) RAISE.set(ri, a = []); a.push(f); };
  let nb = 0; const NEEDS = [], TWIN_NEED = new Map();
  for (const pass of [1, 2]) {
  if (pass === 2) { // twin decks (one per carriageway) get the same lift
    for (const a of NEEDS) for (const b of NEEDS) { if (a === b || Math.hypot(a.x - b.x, a.z - b.z) > 30) continue; const la = Math.hypot(a.dx, a.dz) || 1, lb = Math.hypot(b.dx, b.dz) || 1; if (Math.abs((a.dx * b.dx + a.dz * b.dz) / (la * lb)) < 0.85) continue; TWIN_NEED.set(a.ri, Math.max(TWIN_NEED.get(a.ri) || 0, b.need)); }
  }
  DATA.R.forEach((rd, ri) => {
    if (!(rd[3] & 2) || DEP.has(ri)) return; const c = rd[4]; const L = polyLen(c); if (L < 8) return;
    if (polyMinDist(c, -347.5, 745.4) < 75 && rd[0] >= 13) return;
    const pf = bridgeProfile(c); let need = 0, overDep = false, overRoad = false; const ped = rd[0] > 12;
    for (const X of crossingsOf(ri)) { const r2 = DATA.R[X.rj]; if (X.s < 1 || X.s > L - 1) continue;
      if ((r2[3] & 2) && !DEP.has(X.rj)) continue; // another bridge: handled by its own lift
      if (r2[0] > 12 && !ped) continue; // footpaths under a road bridge pass at their own level
      const dpt = DEP.has(X.rj) ? depthOf(X.rj, X.so) : 0; if (DEP.has(X.rj)) overDep = true;
      const clr = r2[0] > 12 ? 3.2 : 5.4; // headroom: people 3.2 m, traffic 5.4 m
      if (DEP.has(X.rj) && dpt >= clr - 0.6) continue; // well sunk below: nothing to do
      overRoad = true; need = Math.max(need, clr - (pf(X.s, X.x, X.z) - (heightAt(X.x, X.z) - dpt))); }
    // a "bridge" whose only job is to span an underpass (e.g. a roundabout over a sunk avenue) is just a road at street level
    if (overDep && !overRoad) { AT_GRADE.add(ri); return; }
    if (pass === 1) { const m = Math.floor(c.length / 4) * 2; NEEDS.push({ ri, need, x: c[m], z: c[m + 1], dx: c[c.length - 2] - c[0], dz: c[c.length - 1] - c[1] }); return; }
    need = Math.max(need, TWIN_NEED.get(ri) || 0, EXTRA_NEED.get(ri) || 0);
    // walk the continuation chains first, so ramps also clear any road the approach passes over
    const chains = [];
    for (const atStart of [true, false]) {
      const n = c.length; let px = atStart ? c[0] : c[n - 2], pz = atStart ? c[1] : c[n - 1];
      let ox = atStart ? c[0] - c[2] : c[n - 2] - c[n - 4], oz = atStart ? c[1] - c[3] : c[n - 1] - c[n - 3]; let ol = Math.hypot(ox, oz) || 1; ox /= ol; oz /= ol;
      let uOff = 0, prev = ri; const hops = []; let lastX = -1;
      for (let hop = 0; hop < 6 && uOff < 170; hop++) {
        let best = -1, bd = Math.cos(0.6), bStart = true;
        for (const cj of ends.get(K(px, pz)) || []) { if (cj === prev || cj === ri) continue; const r2 = DATA.R[cj]; if (r2[3] & 6 || DEP.has(cj) || (!ped && r2[0] > 12) || (ped && r2[0] <= 12)) continue; const c2 = r2[4], m = c2.length; const st = c2[0] === px && c2[1] === pz;
          let dx = st ? c2[2] - c2[0] : c2[m - 4] - c2[m - 2], dz = st ? c2[3] - c2[1] : c2[m - 3] - c2[m - 1]; const dl = Math.hypot(dx, dz) || 1; const dot = (dx * ox + dz * oz) / dl + (r2[1] === rd[1] ? 0.15 : 0); if (dot > bd) { bd = dot; best = cj; bStart = st; } }
        if (best < 0 && uOff < 60) { // no straight continuation yet but the ramp is still high: follow the straightest road (even round a corner)
          let bd2 = 0.15; for (const cj of ends.get(K(px, pz)) || []) { if (cj === prev || cj === ri) continue; const r2 = DATA.R[cj]; if (r2[3] & 6 || DEP.has(cj) || (!ped && r2[0] > 12) || (ped && r2[0] <= 12)) continue; const c2 = r2[4], m = c2.length; const st = c2[0] === px && c2[1] === pz;
            let dx = st ? c2[2] - c2[0] : c2[m - 4] - c2[m - 2], dz = st ? c2[3] - c2[1] : c2[m - 3] - c2[m - 1]; const dl = Math.hypot(dx, dz) || 1; const dot = (dx * ox + dz * oz) / dl; if (dot > bd2) { bd2 = dot; best = cj; bStart = st; } } }
        if (best < 0) break; const c2 = DATA.R[best][4], m = c2.length, Lc = polyLen(c2);
        hops.push({ ri: best, bStart, u0: uOff, Lc });
        // crossings below this hop (ignore the junction mouths at its ends)
        const hk = new Set(); for (let i = 0; i < m; i += 2) hk.add(K(c2[i], c2[i + 1]));
        const joins = (rj) => { const cc = DATA.R[rj][4]; for (let i = 0; i < cc.length; i += 2) if (hk.has(K(cc[i], cc[i + 1]))) return true; return false; };
        for (const X of crossingsOf(best)) { const r3 = DATA.R[X.rj]; if (r3[0] > 12 || (r3[3] & 2) || X.s < 8 || X.s > Lc - 8 || joins(X.rj)) continue; if (DEP.has(X.rj) && depthOf(X.rj, X.so) > 4.6) continue; if (X.cr < 0.35) continue;
          lastX = Math.max(lastX, uOff + (bStart ? X.s : Lc - X.s)); }
        uOff += Lc; prev = best; px = bStart ? c2[m - 2] : c2[0]; pz = bStart ? c2[m - 1] : c2[1];
        ox = bStart ? c2[m - 2] - c2[m - 4] : c2[0] - c2[2]; oz = bStart ? c2[m - 1] - c2[m - 3] : c2[1] - c2[3]; ol = Math.hypot(ox, oz) || 1; ox /= ol; oz /= ol;
        if (lastX < 0 && uOff > 90) break;
      }
      chains.push({ hops, plateau: lastX >= 0 ? Math.min(lastX + 7, 120) : 0 });
    }
    let H = need; if (chains.some((ch) => ch.plateau > 0)) H = Math.max(H, 5.4);
    if (H < 0.25) return; nb++; BRIDGE_H.set(ri, H);
    push(ri, () => H);
    for (const ch of chains) {
      const avail = ch.hops.reduce((a, h) => a + h.Lc, 0); // approach length really available (the chain may stop at a junction)
      const P = Math.min(ch.plateau, Math.max(0, avail - 12)), Rr = Math.max(8, Math.min(ped ? clamp(H * 7, 10, 30) : clamp(H * 18, 30, 80), avail - P)), f = (u) => H * smooth(0, 1, (Rr + P - u) / Rr);
      for (const hp of ch.hops) { if (hp.u0 > P + Rr) break; const { u0, Lc, bStart } = hp;
        push(hp.ri, bStart ? (q) => f(u0 + q) : (q) => f(u0 + Lc - q));
        const span = Math.min(Lc, P + Rr - u0); let a = RAISE_SPAN.get(hp.ri) || [Lc, 0]; a = bStart ? [Math.min(a[0], 0), Math.max(a[1], span)] : [Math.min(a[0], Lc - span), Math.max(a[1], Lc)]; RAISE_SPAN.set(hp.ri, a); }
    }
  });
  }
  // roads running alongside a raised approach / low deck end and overlapping its carriageway (merges, diverges, slip
  // roads that share the embankment) follow it up where they overlap: the low embankment is solid, so the car used to
  // jump onto it and "fly" over its own road (agent: "vuela" / "salto" on links)
  const followOverlaps = (passes) => { for (let pass = 0; pass < passes; pass++) { const RB = []; for (const ri of RAISE.keys()) { const rd = DATA.R[ri]; if (rd[0] > 12 || DEP.has(ri)) continue; const c = rd[4]; const isBr = (rd[3] & 2) && !AT_GRADE.has(ri); const sp = RAISE_SPAN.get(ri); if (!isBr && !sp) continue;
      let b = [1e9, -1e9, 1e9, -1e9]; for (let i = 0; i < c.length; i += 2) b = [Math.min(b[0], c[i]), Math.max(b[1], c[i]), Math.min(b[2], c[i + 1]), Math.max(b[3], c[i + 1])]; RB.push({ ri, c, w: rd[2], isBr, sp, pf: isBr ? bridgeProfile(c) : null, b }); }
    const yOf = (o, ss, x, z) => o.isBr ? o.pf(ss, x, z) + raiseOf(o.ri, ss) : heightAt(x, z) + (ss >= o.sp[0] - 0.5 && ss <= o.sp[1] + 0.5 ? raiseOf(o.ri, ss) : 0);
    const ovl = new Map();
    DATA.R.forEach((rd, rj) => { if (rd[0] > 12 || DEP.has(rj)) return; const c = rd[4]; const spj = RAISE_SPAN.get(rj); const brJ = (rd[3] & 2) && !AT_GRADE.has(rj); const pfJ = brJ ? bridgeProfile(c) : null; let s = 0;
      for (let i = 0; i + 3 < c.length; i += 2) { const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]); if (L < 0.01) continue; const tx = (c[i + 2] - c[i]) / L, tz = (c[i + 3] - c[i + 1]) / L;
        for (let u = 0; u <= L; u += 2) { const x = c[i] + tx * u, z = c[i + 1] + tz * u, sj = s + u; let best = -1e9;
          for (const o of RB) { if (o.ri === rj || x < o.b[0] - o.w || x > o.b[1] + o.w || z < o.b[2] - o.w || z > o.b[3] + o.w) continue; const c2 = o.c; let acc = 0;
            for (let j = 0; j + 3 < c2.length; j += 2) { const dx = c2[j + 2] - c2[j], dz = c2[j + 3] - c2[j + 1], L2 = Math.hypot(dx, dz) || 1; const tr = ((x - c2[j]) * dx + (z - c2[j + 1]) * dz) / (L2 * L2);
              if (tr >= 0 && tr <= 1) { const d = Math.hypot(x - c2[j] - dx * tr, z - c2[j + 1] - dz * tr); if (d < o.w / 2 + 1.2 && (d < o.w / 2 - 0.5 || Math.abs((dx * tx + dz * tz) / L2) > 0.6)) { const ss = acc + L2 * tr; const px = c2[j] + dx * tr, pz = c2[j + 1] + dz * tr;
                const yT = yOf(o, ss, px, pz); if (yT - heightAt(px, pz) < 3.2 || (!o.isBr && d < o.w / 2 - 0.5 && Math.abs((dx * tx + dz * tz) / L2) > 0.6)) best = Math.max(best, yT); /* any embankment (not a deck) running along it: follow it too */ } } acc += L2; } }
          if (best < -1e8) continue; const have = brJ ? raiseOf(rj, sj) : (RAISE.has(rj) && spj && sj >= spj[0] - 0.5 && sj <= spj[1] + 0.5 ? raiseOf(rj, sj) : 0); const yJ = brJ ? pfJ(sj, x, z) + have : heightAt(x, z) + have; const need = best - yJ;
          if (need < 0.3 || (brJ && need > 2.5)) continue; let a = ovl.get(rj); if (!a) ovl.set(rj, a = []); a.push([sj, have + need]); } s += L; } });
    for (const [rj, a] of ovl) { const Lj = polyLen(DATA.R[rj][4]); let lo = Lj, hi = 0; const k = a.map(([s0, h]) => { const Rr = clamp(h * 14, 6, 60); lo = Math.min(lo, s0 - Rr); hi = Math.max(hi, s0 + Rr); return [s0, h, Rr]; });
      push(rj, (q) => { let m = 0; for (const [s0, h, Rr] of k) { const d = Math.abs(q - s0); if (d < Rr) m = Math.max(m, h * smooth(0, 1, (Rr - d) / Rr)); } return m; });
      let sp = RAISE_SPAN.get(rj) || [Lj, 0]; sp = [Math.min(sp[0], Math.max(0, lo)), Math.max(sp[1], Math.min(Lj, hi))]; RAISE_SPAN.set(rj, sp); }
    if (ovl.size) console.log('roads following an overlapping embankment', pass, ovl.size); if (!ovl.size) break; } };
  followOverlaps(2);
  // side roads that meet a raised approach / deck at one of its nodes (slip roads, junctions on the ramp) climb to meet it
  // instead of staying at grade under it (agent: "deck floating over the road", "parapet in the carriageway")
  const raisedNow = [...RAISE.keys()]; const node2 = new Map();
  DATA.R.forEach((rd, rj) => { if (rd[0] > 12) return; const c = rd[4]; let s = 0; for (let i = 0; i < c.length; i += 2) { if (i) s += Math.hypot(c[i] - c[i - 2], c[i + 1] - c[i - 1]); const k = K(c[i], c[i + 1]); let a = node2.get(k); if (!a) node2.set(k, a = []); a.push([rj, s]); } });
  const extra = [];
  for (const ri of raisedNow) { const rd = DATA.R[ri]; if (rd[0] > 12) continue; const c = rd[4]; const isBr = (rd[3] & 2) && !AT_GRADE.has(ri); const sp = RAISE_SPAN.get(ri); const pf = isBr ? bridgeProfile(c) : null; let s = 0;
    for (let i = 0; i < c.length; i += 2) { if (i) s += Math.hypot(c[i] - c[i - 2], c[i + 1] - c[i - 1]); const x = c[i], z = c[i + 1];
      const h = isBr ? pf(s, x, z) + raiseOf(ri, s) - heightAt(x, z) : (sp && s >= sp[0] - 0.5 && s <= sp[1] + 0.5 ? raiseOf(ri, s) : 0); if (h < 0.3) continue;
      for (const [rj, s0] of node2.get(K(x, z)) || []) { if (rj === ri || DEP.has(rj) || ((DATA.R[rj][3] & 2) && !AT_GRADE.has(rj))) continue; const have = RAISE.has(rj) ? raiseOf(rj, s0) : 0; if (have >= h - 0.2) continue; extra.push([rj, s0, h]); } } }
  for (const [rj, s0, h] of extra) { const Lj = polyLen(DATA.R[rj][4]); const avail = s0 < 1 || s0 > Lj - 1 ? Lj : Math.min(s0, Lj - s0); const Rr = clamp(Math.min(h * 18, 80), 6, Math.max(6, avail - 3));
    push(rj, (q) => h * smooth(0, 1, (Rr - Math.abs(q - s0)) / Rr));
    let a = RAISE_SPAN.get(rj) || [Lj, 0]; a = [Math.min(a[0], Math.max(0, s0 - Rr)), Math.max(a[1], Math.min(Lj, s0 + Rr))]; RAISE_SPAN.set(rj, a); }
  if (extra.length) followOverlaps(1);
  return nb;
}
// height of a road's surface as it will be built (same rules as buildRoads)
function polyMinDist(c, x, z) { let m = 1e9; for (let i = 0; i < c.length; i += 2) m = Math.min(m, Math.hypot(c[i] - x, c[i + 1] - z)); return m; }
function roadYFn(ri) { const rd = DATA.R[ri], c0 = rd[4];
  if (DEP.has(ri)) return depressedHF(ri);
  if (RAISE.has(ri) && !(rd[3] & 2)) { const sp = RAISE_SPAN.get(ri); return (s, x, z) => heightAt(x, z) + (s >= sp[0] && s <= sp[1] ? raiseOf(ri, s) : 0); }
  if ((rd[3] & 2) && !AT_GRADE.has(ri) && !(rd[0] >= 13 && polyMinDist(c0, -347.5, 745.4) < 75)) { const hf0 = bridgeProfile(c0); return RAISE.has(ri) ? (s, x, z) => hf0(s, x, z) + raiseOf(ri, s) : hf0; }
  return (s, x, z) => heightAt(x, z); }
// iterate: a bridge whose road below got lifted (it is the approach ramp of another bridge) must go higher still
function computeRaises() {
  let nb = 0;
  for (let it = 0; it < 5; it++) {
    RAISE.clear(); RAISE_SPAN.clear(); AT_GRADE.clear(); BRIDGE_H.clear(); nb = computeRaisesOnce(); let changed = 0;
    DATA.R.forEach((rd, ri) => { if (!(rd[3] & 2) || DEP.has(ri) || AT_GRADE.has(ri)) return; const yB = roadYFn(ri);
      for (const X of crossingsOf(ri)) { const r2 = DATA.R[X.rj]; if ((r2[3] & 2) || DEP.has(X.rj)) continue; if (!RAISE.has(X.rj)) continue; if (r2[0] > 12 && rd[0] <= 12) continue;
        const clr = r2[0] > 12 ? 3.2 : 5.4; const gap = yB(X.s, X.x, X.z) - roadYFn(X.rj)(X.so, X.x, X.z);
        if (gap < clr - 0.2) { const want = (BRIDGE_H.get(ri) || 0) + (clr - gap) + 0.2; if (want > (EXTRA_NEED.get(ri) || 0) + 0.1) { EXTRA_NEED.set(ri, Math.min(14, want)); changed++; } } } });
    if (!changed) break; console.log('raise pass', it, 'bumped', changed);
  }
  console.log('raised overpasses', nb);
}
const depthOf = (ri, s) => { const a = DEP.get(ri); if (!a) return 0; let d = 0; for (const f of a) d = Math.max(d, f(s)); return Math.max(0, d - 0.5) * 1.12; }; // the first 0.5 m of every ramp is flattened: shallow ends stay exactly at grade (no sinking under junctions)
function depressedHF(ri) {
  const rd = DATA.R[ri], c = rd[4], L = polyLen(c), tun = !!(rd[3] & 4); const g0 = heightAt(c[0], c[1]), g1 = heightAt(c[c.length - 2], c[c.length - 1]);
  return (s, x, z) => (tun ? Math.min(lerp(g0, g1, clamp(s / L, 0, 1)), heightAt(x, z)) : heightAt(x, z)) - depthOf(ri, s);
}
// twin tubes: when the other carriageway of a dual road runs right beside this one, don't build the wall between them
let TUN_RI = -1, DEP_SEGS = null, DEP_YF = null;
function twinWall(x, z, y0, y1) {
  if (TUN_RI < 0) return false;
  if (!DEP_SEGS) { DEP_SEGS = []; DEP_YF = new Map(); for (const ri of DEP.keys()) { const c = DATA.R[ri][4], w = DATA.R[ri][2]; let s0 = 0; for (let i = 0; i < c.length - 2; i += 2) { const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]); DEP_SEGS.push([c[i], c[i + 1], c[i + 2], c[i + 3], w / 2, ri, s0]); s0 += L; } } }
  // only between twin tubes/cuttings at about the same level: a sunk road beside at another depth (or still at grade)
  // needs the wall, otherwise you saw out through the side of the tunnel (Camino el Vallado)
  const yAt = (g, t, L) => { let f = DEP_YF.get(g[5]); if (!f) DEP_YF.set(g[5], f = roadYFn(g[5])); return f(g[6] + t * L, x, z); };
  let own = null, od = 1e9; for (const g of DEP_SEGS) { if (g[5] !== TUN_RI) continue; const dx = g[2] - g[0], dz = g[3] - g[1], L2 = dx * dx + dz * dz || 1; const t = clamp(((x - g[0]) * dx + (z - g[1]) * dz) / L2, 0, 1); const dd = Math.hypot(x - g[0] - dx * t, z - g[1] - dz * t); if (dd < od) { od = dd; own = [g, t, Math.sqrt(L2)]; } }
  const yOwn = own ? yAt(own[0], own[1], own[2]) : y0;
  for (const g of DEP_SEGS) { if (g[5] === TUN_RI) continue; if (Math.abs(x - g[0]) > 60 && Math.abs(x - g[2]) > 60) continue; const dx = g[2] - g[0], dz = g[3] - g[1], L2 = dx * dx + dz * dz || 1; const t = clamp(((x - g[0]) * dx + (z - g[1]) * dz) / L2, 0, 1); if (Math.hypot(x - g[0] - dx * t, z - g[1] - dz * t) < g[4] + 0.6) {
      if (Math.abs(yAt(g, t, Math.sqrt(L2)) - yOwn) < 1.6) return true; } }
  return false;
}
function tunnelRoad(c, w, cls, tile, hf, opt = {}) {
  ribbon(c, w, cls, YOFF[cls], tile, cls === 'asphaltLines' ? 1 : w / 8, hf, true);
  // covered stretch -> tube with walls, ceiling and lights; open stretch -> cutting with retaining walls
  const T = acc(c[0], c[1], 'tunnel'); const L2 = acc(c[0], c[1], 'tunnelLight'); const W = acc(c[0], c[1], 'trim'); const hw = w / 2 + (opt.H ? 0.6 : 1.0), H = opt.H || 6.0; // roomier tubes and mouths
  const pts = []; let dist = 0;
  for (let i = 0; i < c.length - 2; i += 2) { const x1 = c[i], z1 = c[i + 1], x2 = c[i + 2], z2 = c[i + 3], Ls = Math.hypot(x2 - x1, z2 - z1) || 1; const n = Math.max(1, Math.ceil(Ls / 4)); for (let k = 0; k < n; k++) { const x = x1 + (x2 - x1) * k / n, z = z1 + (z2 - z1) * k / n; pts.push([x, z, hf(dist + Ls * k / n, x, z), (x2 - x1) / Ls, (z2 - z1) / Ls]); } dist += Ls; }
  pts.push([c[c.length - 2], c[c.length - 1], hf(dist, c[c.length - 2], c[c.length - 1]), pts[pts.length - 1][3], pts[pts.length - 1][4]]);
  const dep = (p) => heightAt(p[0], p[1]) - p[2]; const covered = (p) => dep(p) > Math.max(opt.cover || 3.4, H + 0.35); /* the roof must stay under the ground (it used to stick out as a white slab across the road) */ const wc = [0.66, 0.64, 0.6];
  const Pt = (p, sg, y, e = hw) => [p[0] - p[4] * e * sg, p[2] + y, p[1] + p[3] * e * sg];
  for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1];
    if (covered(a) || covered(b)) {
      for (const sg of [1, -1]) if (!twinWall((Pt(a, sg, 0)[0] + Pt(b, sg, 0)[0]) / 2, (Pt(a, sg, 0)[2] + Pt(b, sg, 0)[2]) / 2, Math.min(a[2], b[2]), Math.max(a[2], b[2]) + H)) T.quad(Pt(a, sg, 0), Pt(b, sg, 0), Pt(b, sg, H), Pt(a, sg, H), [0, 0], [1, 0], [1, 1], [0, 1], null, undefined, [a[4] * sg, 0, -a[3] * sg]);
      const roofOk = !inOtherRoad((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2 + H - 4.4, (a[2] + b[2]) / 2 + H + 0.3, TUN_RI, -hw + 0.2) || !TUN_RI;
      if (roofOk) T.quad(Pt(a, 1, H), Pt(b, 1, H), Pt(b, -1, H), Pt(a, -1, H), [0, 0], [1, 0], [1, 1], [0, 1], null, undefined, [0, -1, 0]);
      // lid slab so the tube reads from outside where the ground dips
      for (const sg of [1, -1]) if (!twinWall((Pt(a, sg, 0)[0] + Pt(b, sg, 0)[0]) / 2, (Pt(a, sg, 0)[2] + Pt(b, sg, 0)[2]) / 2, Math.min(a[2], b[2]) + H, Math.max(a[2], b[2]) + H + 1.2) && !inOtherRoad((Pt(a, sg, 0, hw + 0.4)[0] + Pt(b, sg, 0, hw + 0.4)[0]) / 2, (Pt(a, sg, 0, hw + 0.4)[2] + Pt(b, sg, 0, hw + 0.4)[2]) / 2, Math.min(a[2], b[2]) + H - 1.5, Math.max(a[2], b[2]) + H + 2.0, TUN_RI, 0.2, true)) W.quad(Pt(a, sg, H), Pt(b, sg, H), Pt(b, sg, H + 1.2, hw + 0.8), Pt(a, sg, H + 1.2, hw + 0.8), [0, 0], [0, 0], [0, 0], [0, 0], wc, undefined, [-a[4] * sg, 0.3, a[3] * sg]);
      if (i % 3 === 0) L2.quad(Pt(a, 1, H - 0.05, 0.4), Pt(a, -1, H - 0.05, 0.4), Pt(b, -1, H - 0.05, 0.4), Pt(b, 1, H - 0.05, 0.4), [0, 0], [0, 0], [0, 0], [0, 0], null, undefined, [0, -1, 0]);
      if (covered(b) !== covered(a)) { const p = covered(a) ? a : b; const P = acc(p[0], p[1], 'trim'); const col = [0.58, 0.56, 0.53]; const top = Math.max(H + 1.6, dep(p) + 0.6);
        const fr = (s0, s1, y0, y1) => { for (const d of [-0.25, 0.25]) P.quad([p[0] - p[4] * hw * s0 + p[3] * d, p[2] + y0, p[1] + p[3] * hw * s0 + p[4] * d], [p[0] - p[4] * hw * s1 + p[3] * d, p[2] + y0, p[1] + p[3] * hw * s1 + p[4] * d], [p[0] - p[4] * hw * s1 + p[3] * d, p[2] + y1, p[1] + p[3] * hw * s1 + p[4] * d], [p[0] - p[4] * hw * s0 + p[3] * d, p[2] + y1, p[1] + p[3] * hw * s0 + p[4] * d], [0, 0], [0, 0], [0, 0], [0, 0], col, undefined, [p[3] * Math.sign(d), 0, p[4] * Math.sign(d)]); };
        // portal: header and side piers only as wide as the tube itself (+0.7 m); skipped where a twin carriageway runs alongside
        const ex = (hw + 0.7) / hw; const side = (sg) => !twinWall(p[0] - p[4] * hw * ex * sg, p[1] + p[3] * hw * ex * sg, p[2], p[2] + top) && !twinWall(p[0] - p[4] * (hw + 0.3) * sg, p[1] + p[3] * (hw + 0.3) * sg, p[2], p[2] + top);
        const sL = side(1), sR = side(-1); const htop = Math.min(top, dep(p) - 0.12); if (htop > H + 0.15) fr(sL ? ex : 1.0, sR ? -ex : -1.0, H, htop); /* never sticks out of the ground (roads may run over the portal) */ const pt = Math.min(H, dep(p) - 0.12); if (sL && pt > 0.5) fr(ex, 1.0, -0.3, pt); if (sR && pt > 0.5) fr(-1.0, -ex, -0.3, pt); }
    } else if (dep(a) > 0.3 || dep(b) > 0.3) {
      // open cutting: retaining walls up to the ground, with a small parapet, and a hole in the terrain above
      for (const sg of [1, -1]) { if (twinWall((Pt(a, sg, 0)[0] + Pt(b, sg, 0)[0]) / 2, (Pt(a, sg, 0)[2] + Pt(b, sg, 0)[2]) / 2, Math.min(a[2], b[2]) - 0.3, Math.max(heightAt(Pt(a, sg, 0)[0], Pt(a, sg, 0)[2]), heightAt(Pt(b, sg, 0)[0], Pt(b, sg, 0)[2])) + 0.9)) continue; const pa = Pt(a, sg, 0), pb = Pt(b, sg, 0), mx = (pa[0] + pb[0]) / 2, mz = (pa[2] + pb[2]) / 2, gm = heightAt(mx, mz);
        /* a street at ground level runs along the edge of the cutting: the wall stops just under the ground (no parapet standing in its carriageway) */
        const flush = inOtherRoad(mx, mz, gm - 0.8, gm + 0.8, TUN_RI, 0.2, true) || inOtherRoad(pa[0], pa[2], gm - 0.8, gm + 0.8, TUN_RI, 0.2, true) || inOtherRoad(pb[0], pb[2], gm - 0.8, gm + 0.8, TUN_RI, 0.2, true); const cap = flush ? -0.05 : 0.9;
        const ga = heightAt(pa[0], pa[2]) - a[2] + cap, gb = heightAt(pb[0], pb[2]) - b[2] + cap;
        W.quad(Pt(a, sg, -0.3), Pt(b, sg, -0.3), Pt(b, sg, Math.max(flush ? 0.3 : 0.9, gb)), Pt(a, sg, Math.max(flush ? 0.3 : 0.9, ga)), [0, 0], [0, 0], [0, 0], [0, 0], wc, undefined, [a[4] * sg, 0, -a[3] * sg]);
        W.quad(Pt(b, sg, -0.3, hw + 0.3), Pt(a, sg, -0.3, hw + 0.3), Pt(a, sg, Math.max(flush ? 0.3 : 0.9, ga), hw + 0.3), Pt(b, sg, Math.max(flush ? 0.3 : 0.9, gb), hw + 0.3), [0, 0], [0, 0], [0, 0], [0, 0], wc, undefined, [-a[4] * sg, 0, a[3] * sg]);
        W.quad(Pt(a, sg, Math.max(flush ? 0.3 : 0.9, ga)), Pt(b, sg, Math.max(flush ? 0.3 : 0.9, gb)), Pt(b, sg, Math.max(flush ? 0.3 : 0.9, gb), hw + 0.3), Pt(a, sg, Math.max(flush ? 0.3 : 0.9, ga), hw + 0.3), [0, 0], [0, 0], [0, 0], [0, 0], wc, undefined, [0, 1, 0]); }
      const lc = TCUTS[TCUTS.length - 1]; const gid = TUNNEL_DECKS.length;
      if (lc && lc[5] === gid && lc[2] === a[0] && lc[3] === a[1] && Math.abs((lc[2] - lc[0]) * a[4] - (lc[3] - lc[1]) * a[3]) < 0.02 * Math.hypot(lc[2] - lc[0], lc[3] - lc[1]) + 1e-6) { lc[2] = b[0]; lc[3] = b[1]; }
      else TCUTS.push([a[0], a[1], b[0], b[1], hw + 0.15, gid]);
    }
  }
  TUNNEL_DECKS.push({ type: 'path', pts: pts.map((p) => [p[0], p[1], p[2] + 0.12]), w: w + 1.0, road: true, tunnel: true, hw: w / 2 + 0.3, ceil: opt.H ? opt.H - 0.3 : undefined });
}
const underground = (x, z, y) => y < heightAt(x, z) - 1.6; // deep in a tunnel/cutting: surface obstacles don't apply
// open cutting edge for things on the surface: returns push-out vector or null
function trenchPush(x, z, rad) {
  if (ROADS_INDEXED && onSurfaceRoad(x, z)) return null; // on a street at grade (twin roads: one at grade beside the other's cutting): the street covers the ground, nothing to fall into
  for (const c of TCUTS) { const dx = c[2] - c[0], dz = c[3] - c[1], L2 = dx * dx + dz * dz || 1; const tr = ((x - c[0]) * dx + (z - c[1]) * dz) / L2; if (tr < -0.02 || tr > 1.02) continue; const t = clamp(tr, 0, 1); /* only sideways: end-on is the way in along the road (the car used to bounce off the mouth of its own trench) */ const px = c[0] + dx * t, pz = c[1] + dz * t; const d = Math.hypot(x - px, z - pz); const lim = c[4] + rad;
    if (d < lim && d > 0.05) { const g = heightAt(px, pz), l = lowAt(px, pz, g - 1.5); if (!l || g - l.y < 0.8) continue; const k = (lim - d) / d; return [(x - px) * k, (z - pz) * k, (x - px) / d, (z - pz) / d]; } }
  return null;
}
const sameLevel = (y1, y2) => Math.abs(y1 - y2) < 2.6;
// ground below the terrain surface (tunnels/cuttings) for something currently at height py
let TCUTS_READY = false; let DEP_ROWS = null;
function onSurfaceRoad(x, z) { if (!DEP_ROWS) DEP_ROWS = new Set([...DEP.keys()].map((i) => DATA.R[i])); const rd = ROADSEG.nearest(x, z, (r) => !DEP_ROWS.has(r) && !(r[3] & 6) && r[0] <= 12); return !!rd && !RAISE.has(rd.ri) && rd.d < DATA.R[rd.ri][2] / 2 + 0.3; }
function lowAt(x, z, py) {
  let best = null;
  for (const d of TUNNEL_DECKS) {
    if (!d.bb) { let a = 1e9, b = -1e9, c2 = 1e9, e = -1e9; for (const p of d.pts) { a = Math.min(a, p[0]); b = Math.max(b, p[0]); c2 = Math.min(c2, p[1]); e = Math.max(e, p[1]); } d.bb = [a - d.w, b + d.w, c2 - d.w, e + d.w]; }
    if (x < d.bb[0] || x > d.bb[1] || z < d.bb[2] || z > d.bb[3]) continue;
    const p = d.pts; let i0 = 0, i1 = p.length - 1;
    if (d.tunnel) { let nd = 1e9; for (let i = 0; i < p.length - 1; i++) { const a = p[i], b = p[i + 1]; const dx = b[0] - a[0], dz = b[1] - a[1], L2 = dx * dx + dz * dz || 1; const t = clamp(((x - a[0]) * dx + (z - a[1]) * dz) / L2, 0, 1); const dd = Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t); if (dd < nd - 0.01) { nd = dd; i0 = i; } } i1 = i0 + 1; } // road trenches: only the nearest segment (on curved steep ramps the ends of other segments gave other heights: car jumping)
    for (let i = i0; i < i1; i++) { const a = p[i], b = p[i + 1]; const dx = b[0] - a[0], dz = b[1] - a[1], L2 = dx * dx + dz * dz || 1; let t = ((x - a[0]) * dx + (z - a[1]) * dz) / L2; if (!d.capped && ((t < -0.05 && i === 0) || (t > 1.05 && i === p.length - 2))) continue; t = clamp(t, 0, 1); // interior joints: round, so the outside of bends is covered
      const px = a[0] + dx * t, pz = a[1] + dz * t, dd = Math.hypot(x - px, z - pz); if (dd > d.w / 2) continue; const y = lerp(a[2], b[2], t); const g = heightAt(x, z);
      if (y > g - 0.2 || py > y + 2.9 || py < y - 2.5) continue;
      if (g - y < 1.6 && !d.ceil && TCUTS_READY && !inCut(x, z, 0.3)) continue;
      if (g - y < 1.0 && !d.ceil && ROADS_INDEXED && onSurfaceRoad(x, z)) continue; // a street at ground level covers the shallow trench here: stand on it // shallow end with no hole in the terrain: walk/drive on the ground (no sinking)
      const k = Math.abs(py - y), kb = best ? Math.abs(py - best.y) : 1e9;
      if (!best || k < kb - 0.3 || (k < kb + 0.3 && dd < best.d)) best = { y, px, pz, d: dd, hw: d.hw, covered: g - y > 6.3 || !!d.ceil, ceil: d.ceil, cap: d.capped && d.hall ? { s: t * Math.sqrt(L2), len: Math.sqrt(L2), ux: dx / Math.sqrt(L2), uz: dz / Math.sqrt(L2) } : null }; }
  }
  return best;
}
function onCarriagewayEarly(x, z, m = 1) { const rd = ROADSEG.nearest(x, z, (r) => r[0] <= 12 && !(r[3] & 2)); return !!rd && rd.d < DATA.R[rd.ri][2] / 2 + m; }
// ---------- buildings
const PAL = {
  0: ['#e0b04e', '#a8513a', '#f3eee2', '#9fc4d6', '#a7c092', '#e7a47c', '#ecd276', '#d88d63', '#f1e7c8', '#b8cbd8', '#c56b4b', '#efe5d2'],
  1: ['#f2eee6', '#ece0c8', '#e6d8bd', '#dcdad2', '#f1e3c4', '#efd8c8', '#e4e8e6', '#f5f1e1', '#d9c8a8'],
  2: ['#e7dcc6', '#d8cdb8', '#c9b79c', '#e8e3d9', '#bfb2a0', '#d6b89a', '#ebe7de', '#b7a58f'],
  3: ['#c9cccd', '#e1e2de', '#b9c4cc', '#d3cfc6'],
  4: ['#f7f4ec', '#f1ede2'],
  6: ['#e8e6e0', '#d8d8d4', '#efe6d6', '#cfd6db'],
};
// extra palettes per facade variant: historic core ~60% white/pale, 40% earthy (no neon)
PAL[0] = ['#f3efe6', '#f4f1e8', '#efe9dc', '#f6f2ea', '#ece4d2', '#e9dfc6', '#e2b25a', '#c9774e', '#d9a07a', '#b8c9a4', '#a9c3cf', '#e7c98a', '#f0e6d0', '#c96f4f', '#f2ede2'];
PAL[1] = ['#f2eee6', '#ece0c8', '#e6d8bd', '#f1e3c4', '#efd8c8', '#f5f1e1', '#e2b25a', '#e8a283', '#c9774e', '#b9cfa5', '#a9c3cf', '#ecd276', '#c7b6cf', '#9fc6b5', '#f0c9a0', '#d98c6a'];
PAL[2] = ['#e9dcc3', '#e8c9a8', '#d9b38c', '#f0e2c6', '#cfd6db', '#e7d08f', '#d79a7c', '#bfcfb2', '#f1ebe0'];
PAL[10] = ['#9b9a96', '#a8a49c', '#e9e2d3', '#d7c9ad', '#b0aca4'];          // self-built: bare block or half painted
PAL[11] = ['#eee6d2', '#e7d8b8', '#f1e7c9', '#e9cdb1', '#e8b48f', '#e2c27a', '#d9c39d', '#efd9b9', '#c8d4c0', '#d6a58c']; // 70s blocks: cream, beige, salmon
PAL[12] = ['#e8e3d8', '#ece7dc'];
PAL[13] = ['#f1f1ee', '#d9d9d6', '#c9c6c0', '#e9e4da', '#b9a48a', '#c47e5c'];  // 2000s: white, grey, terracotta
PAL[14] = ['#3f6fa3', '#8d9399', '#d7d9db', '#2f5d8a', '#b8bcc0', '#e9e9e6'];   // cladding colours
PAL[15] = ['#e9e6de'];
PAL[7] = ['#efe3c4', '#f1e6cb', '#ead9b6'];                                  // regionalist cream
PAL[8] = PAL[0]; PAL[9] = ['#f4f1e8', '#f3efe6', '#efe9dc', '#e9dfc6'];
const PALV = { 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15 };
// which facade variant a building gets (style + neighbourhood + randomness)
function chooseAtlas(style, r, name, cx, cz, lv, area) {
  const x = r();
  if (style === 0) return x < 0.42 ? 0 : x < 0.8 ? 8 : 9;                              // historic core houses
  if (style === 1) { const self = cz > 300 || cx < -700; return self ? (x < 0.4 ? 10 : x < 0.85 ? 1 : 8) : (x < 0.25 ? 10 : x < 0.8 ? 1 : 8); } // houses (self-built on the outskirts)
  if (style === 2) { const newer = cz > 1700 || (cx > 900 && cz > 1000); if (newer) return x < 0.55 ? 13 : x < 0.8 ? 2 : 11; return x < 0.3 ? 2 : x < 0.68 ? 11 : x < 0.88 ? 12 : 13; } // apartment blocks
  if (style === 3) return x < 0.55 ? 3 : 14;
  if (style === 6) { if (name && /Colegio Mayor|Rector|Vicerrector|Vicerectorado|Teatro|Mercado/.test(name)) return 7; return x < 0.45 ? 4 : 15; }
  return ATLAS[style] ?? 1;
}
const hex3 = (h) => { const c = new THREE.Color(h); return [c.r, c.g, c.b]; };
const ATLAS = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 6, 6: 4 };
const CHURCHES = []; let INTER_B = null;
// La Concepción tower: the OSM outline has the tower as a square block jutting out of the north flank. It is cut out
// of the church outline here (the tower is modelled apart). CONC_TOWER_HINT = approximate centre given by Jonay.
const CONC_TOWER_HINT = [-530, -342]; let CONC_TOWER_FIX = null; // FIX: [x, z] forces the centre if OSM is off
const CONC_CARVE = { ok: false };
function carveConcTower(pts) {
  const n = pts.length; let best = null, bd = 1e9;
  for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n], c = pts[(i + 2) % n];
    const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]), l2 = Math.hypot(c[0] - b[0], c[1] - b[1]); if (l1 < 5 || l1 > 10 || l2 < 5 || l2 > 10) continue;
    if (Math.abs(((b[0] - a[0]) * (c[0] - b[0]) + (b[1] - a[1]) * (c[1] - b[1])) / (l1 * l2)) > 0.3) continue;
    const mx = (a[0] + c[0]) / 2, mz = (a[1] + c[1]) / 2, d = Math.hypot(mx - CONC_TOWER_HINT[0], mz - CONC_TOWER_HINT[1]); if (d < 9 && d < bd) { bd = d; best = { i, a, b, c, mx, mz, l1, l2 }; } }
  if (!best) { console.warn('Concepción: tower block not found in OSM outline'); return pts; }
  const { i, a, b, c } = best; const e = [a[0] + c[0] - b[0], a[1] + c[1] - b[1]]; const out = [];
  for (let k = 0; k < n; k++) { if (k === (i + 1) % n) { out.push(e); continue; } if (k === (i + 2) % n) continue; out.push(pts[k]); }
  const fx = CONC_TOWER_FIX ? CONC_TOWER_FIX[0] : best.mx, fz = CONC_TOWER_FIX ? CONC_TOWER_FIX[1] : best.mz;
  Object.assign(CONC_CARVE, { ok: true, x: fx, z: fz, ang: Math.atan2(b[0] - a[0], b[1] - a[1]), w: 7.3, corners: [a, b, c, e], pts: out });
  return out;
} const BIGSTORES = [];
const STORECOL = { Alcampo: '#e8eef2', Makro: '#f3e9c8', 'Leroy Merlin': '#dfe9d8', Decathlon: '#dde8f3', IKEA: '#2a5aa8', 'Toys R Us': '#f0e6f2', Lidl: '#f2f0e6', Mercadona: '#eef2ea', "McDonald's": '#e9dccb' };
const BUILD = []; // metadata for landmarks and minimap
function polyArea(pts) { let a = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; }
function hull(pts) { const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]); const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); const lo = [], up = []; for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); } for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); } up.pop(); lo.pop(); return lo.concat(up); }
function buildBuildings() {
  indexRoads(); let bi = 0;
  try { splitCoarseBlocks(); } catch (e) { console.error('inicio split', e); }
  for (const b of DATA.B) {
    bi++;
    const [h10, style, lv, roofT, nameIdx, seed, c] = b;
    let pts = []; for (let i = 0; i < c.length; i += 2) pts.push([c[i], c[i + 1]]);
    let n = pts.length; if (n < 3) continue;
    if (isTramStopBuilding(nameIdx, pts)) continue; // drawn as proper tram stops
    pts = insetPoly(pts, style === 4 ? 0.3 : 0.75);
    if (style === 4 && nameIdx >= 0 && /Concepción/.test(STR[nameIdx])) { pts = carveConcTower(pts); n = pts.length; }
    let bmin = 1e9, bmax = -1e9, cx = 0, cz = 0;
    for (const p of pts) { const h = heightAt(p[0], p[1]); bmin = Math.min(bmin, h); bmax = Math.max(bmax, h); cx += p[0]; cz += p[1]; }
    cx /= n; cz /= n;
    const name = nameIdx >= 0 ? STR[nameIdx] : (style === 2 || style === 3) && typeof brandInside === 'function' ? brandInside(pts) : null;
    const LM = (name ? landmarkFor(name) : null) || landmarkAt(cx, cz);
    const H = LM && LM.H ? LM.H : h10 / 10; const top = bmax + H; const bot = bmin - 0.6;
    if (name && /Intercambiador/.test(name) && Math.abs(polyArea(pts)) > 5000) { INTER_B = { pts, cx, cz, bmax, top, name }; for (let i = 0; i < n; i++) {} continue; }
    const r = mulberry(seed * 7 + 3);
    BUILD.push({ pts, cx, cz, top, bmax, style, name, H });
    // collisions
    for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; COL.addSeg(p[0], p[1], q[0], q[1]); }
    if (CONC_CARVE.pts === pts) { CHURCHES.push({ pts, cx, cz, top, bmin, bmax, H, name, area: Math.abs(polyArea(pts)), custom: true }); continue; } // La Concepción: modelled in 05o_concepcion.js
    if (style === 5) { // greenhouse
      const A = acc(cx, cz, 'glassHouse');
      // greenhouses follow the slope (a flat top over a 13 m slope made a huge glass box)
      const gy = pts.map((p) => heightAt(p[0], p[1])), Hh = H, ty = gy.map((g) => g + Hh);
      for (let i = 0; i < n; i++) { const j = (i + 1) % n, p = pts[i], q = pts[j]; A.quad([p[0], gy[i] - 0.6, p[1]], [q[0], gy[j] - 0.6, q[1]], [q[0], ty[j], q[1]], [p[0], ty[i], p[1]], [0, 0], [1, 0], [1, 1], [0, 1]); }
      const tris = THREE.ShapeUtils.triangulateShape(pts.map((p) => new THREE.Vector2(p[0], p[1])), []);
      for (const t of tris) A.tri([pts[t[0]][0], ty[t[0]], pts[t[0]][1]], [pts[t[1]][0], ty[t[1]], pts[t[1]][1]], [pts[t[2]][0], ty[t[2]], pts[t[2]][1]], [0, 0], [0, 0], [0, 0], null, undefined, [0, 1, 0]);
      // white steel frame: posts every ~4 m and a ridge band along the top edge
      const F = acc(cx, cz, 'trim'); const fc = [0.93, 0.94, 0.93];
      for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); const ux = (q[0] - p[0]) / (L || 1), uz = (q[1] - p[1]) / (L || 1), nx = -uz * 0.06, nz = ux * 0.06;
        for (let k = 0; k <= Math.floor(L / 4); k++) { const x = p[0] + ux * Math.min(L, k * 4), z = p[1] + uz * Math.min(L, k * 4); const g = heightAt(x, z) - 0.1, tp = g + 0.1 + Hh; F.quad([x - ux * 0.07 + nx, g, z - uz * 0.07 + nz], [x + ux * 0.07 + nx, g, z + uz * 0.07 + nz], [x + ux * 0.07 + nx, tp, z + uz * 0.07 + nz], [x - ux * 0.07 + nx, tp, z - uz * 0.07 + nz], [0, 0], [0, 0], [0, 0], [0, 0], fc, undefined, [nx * 16, 0, nz * 16]); }
        F.quad([p[0] + nx, ty[i] - 0.18, p[1] + nz], [q[0] + nx, ty[(i + 1) % n] - 0.18, q[1] + nz], [q[0] + nx, ty[(i + 1) % n] + 0.02, q[1] + nz], [p[0] + nx, ty[i] + 0.02, p[1] + nz], [0, 0], [0, 0], [0, 0], [0, 0], fc, undefined, [nx * 16, 0, nz * 16]); }
      continue;
    }
    const store = name && DATA.BRAND[name] ? DATA.BRAND[name] : null;
    let atlas = chooseAtlas(style, r, name, cx, cz, lv, Math.abs(polyArea(pts))); if (store) atlas = r() < 0.5 ? 3 : 14; if (LM && LM.atlas !== undefined) atlas = LM.atlas;
    const [bay, fh] = FSTY[atlas]; BUILD[BUILD.length - 1].atlas = atlas;
    const palK = atlas === 8 && style !== 0 ? 1 : (PALV[atlas] || style); let colHex = (PAL[palK] || PAL[1])[Math.floor(r() * (PAL[palK] || PAL[1]).length)];
    if (LM && LM.col) colHex = LM.col;
    if (store) colHex = STORECOL[name] || '#e9e7e0';
    const col = hex3(colHex); const shade = 0.92 + r() * 0.12; col[0] *= shade; col[1] *= shade; col[2] *= shade;
    const A = acc(cx, cz, 'facade');
    const area = polyArea(pts);
    if (store) BIGSTORES.push({ pts, cx, cz, top, bmax, name, parody: store, area: Math.abs(area) });
    // decide roof
    const hl = hull(pts); const hullA = Math.abs(polyArea(hl));
    let hip = (roofT === 1 || (LM && LM.hip)) && Math.abs(area) / hullA > 0.55 && n <= (LM && LM.hip ? 60 : 40);
    const parapet = !hip && style !== 3 && H > 3;
    // recessed top floor (ático) on taller apartment blocks
    let atico = null;
    if (style === 2 && lv >= 5 && n <= 14 && Math.abs(area) > 150 && !hip && r() < 0.5) { const ip = insetPoly(pts, 1.8); if (ip && ip.length === n && Math.abs(polyArea(ip)) > Math.abs(area) * 0.35) atico = ip; }
    const wallTop = atico ? top - fh : top;
    for (let i = 0; i < n; i++) {
      const p = pts[i], q = pts[(i + 1) % n];
      const len = Math.hypot(q[0] - p[0], q[1] - p[1]); if (len < 0.05) continue;
      const nb = len > 1.6 ? Math.max(1, Math.round(len / bay)) : 0.1;
      const out = [(q[1] - p[1]) / len, 0, -(q[0] - p[0]) / len];
      const v0 = (bot - bmin) / fh, v1 = (wallTop - bmin) / fh;
      // long street fronts of terraced houses / blocks: split into parcels with their own colour (and facade for houses)
      const parcel = !LM && !store && (style === 0 || style === 1 || style === 2) && len > (style === 2 ? 24 : 12);
      if (!parcel) { A.quad([p[0], bot, p[1]], [q[0], bot, q[1]], [q[0], wallTop, q[1]], [p[0], wallTop, p[1]], [0, v0], [nb, v0], [nb, v1], [0, v1], col, [atlas, bi % 97], out); continue; }
      const pr = mulberry(seed * 13 + i * 7 + 1); const segL = style === 2 ? 14 + pr() * 10 : 6 + pr() * 6; const k = Math.max(2, Math.round(len / segL));
      const grp = style === 0 ? [0, 8, 9, 0, 8] : style === 1 ? [1, 10, 1, 8, 1] : [atlas, atlas, 11, 2, atlas];
      for (let j = 0; j < k; j++) {
        const t0 = j / k, t1 = (j + 1) / k; const a = [p[0] + (q[0] - p[0]) * t0, p[1] + (q[1] - p[1]) * t0], b = [p[0] + (q[0] - p[0]) * t1, p[1] + (q[1] - p[1]) * t1];
        const at = j === 0 ? atlas : grp[Math.floor(pr() * grp.length)]; const [bay2, fh2] = FSTY[at]; const sl = len / k; const nb2 = Math.max(1, Math.round(sl / bay2));
        const pk = at === 8 && style !== 0 ? 1 : (PALV[at] || style); const pl = PAL[pk] || PAL[1]; const c2 = j === 0 ? col : hex3(pl[Math.floor(pr() * pl.length)]).map((v) => v * (0.93 + pr() * 0.1));
        const w0 = (bot - bmin) / fh2, w1 = (wallTop - bmin) / fh2;
        A.quad([a[0], bot, a[1]], [b[0], bot, b[1]], [b[0], wallTop, b[1]], [a[0], wallTop, a[1]], [0, w0], [nb2, w0], [nb2, w1], [0, w1], c2, [at, (bi + j * 31) % 97], out);
      }
    }
    if (LM) LMQ.push({ L: LM, pts, top, bmin, bmax, cx, cz, name });
    if (LM && LM.quoin) addQuoins(pts, bot, wallTop, 0.75, LM.quoin);
    if (LM && LM.noRoof) continue;
    const quoin = !(LM && LM.quoin) && (style === 4 || (style === 0 && (name || r() < 0.45) && H > 4) || (style === 6 && name && isHistoric(cx, cz)));
    if (quoin) addQuoins(pts, bot, wallTop, style === 4 ? 0.7 : 0.5);
    if (style === 0 && lv >= 2 && r() < 0.42) addBalcony(pts, bmin, fh, r);
    if (style === 4) { CHURCHES.push({ pts, cx, cz, top, bmin, bmax, H, name, area: Math.abs(area) }); continue; }
    // roofs
    if (atico) {
      // terrace over the main block (railing), then the recessed floor whose roof continues below
      const T0 = THREE.ShapeUtils.triangulateShape(pts.map((p) => new THREE.Vector2(p[0], p[1])), []); const R0 = acc(cx, cz, 'roofFlat'); const tc = [0.78, 0.74, 0.68];
      for (const t of T0) { const a = pts[t[0]], b2 = pts[t[1]], c2 = pts[t[2]]; R0.tri([a[0], wallTop, a[1]], [b2[0], wallTop, b2[1]], [c2[0], wallTop, c2[1]], [a[0] / 4, a[1] / 4], [b2[0] / 4, b2[1] / 4], [c2[0] / 4, c2[1] / 4], tc, undefined, [0, 1, 0]); }
      const Tr = acc(cx, cz, 'trim'); const rcol = [0.25, 0.26, 0.27];
      for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; const len = Math.hypot(q[0] - p[0], q[1] - p[1]); if (len < 0.05) continue; const out = [(q[1] - p[1]) / len, 0, -(q[0] - p[0]) / len];
        Tr.quad([p[0], wallTop, p[1]], [q[0], wallTop, q[1]], [q[0], wallTop + 1.0, q[1]], [p[0], wallTop + 1.0, p[1]], [0, 0], [0, 0], [0, 0], [0, 0], rcol, undefined, out);
        Tr.quad([q[0], wallTop, q[1]], [p[0], wallTop, p[1]], [p[0], wallTop + 1.0, p[1]], [q[0], wallTop + 1.0, q[1]], [0, 0], [0, 0], [0, 0], [0, 0], rcol, undefined, [-out[0], 0, -out[2]]); }
      for (let i = 0; i < n; i++) { const p = atico[i], q = atico[(i + 1) % n]; const len = Math.hypot(q[0] - p[0], q[1] - p[1]); if (len < 0.05) continue; const nb = len > 1.6 ? Math.max(1, Math.round(len / bay)) : 0.1; const out = [(q[1] - p[1]) / len, 0, -(q[0] - p[0]) / len];
        const v0 = (wallTop - bmin) / fh, v1 = (top - bmin) / fh; A.quad([p[0], wallTop, p[1]], [q[0], wallTop, q[1]], [q[0], top, q[1]], [p[0], top, p[1]], [0, v0], [nb, v0], [nb, v1], [0, v1], col, [atlas, bi % 97], out); }
      pts = atico;
    }
    const tris = THREE.ShapeUtils.triangulateShape(pts.map((p) => new THREE.Vector2(p[0], p[1])), []);
    if (hip) {
      hipRoof(pts, cx, cz, top, area, tris);
    } else {
      const R = acc(cx, cz, 'roofFlat');
      const ry = parapet ? top - 0.85 : top;
      const g = 0.7 + r() * 0.2; const rc = [g, g * 0.98, g * 0.95];
      for (const t of tris) { const a = pts[t[0]], b2 = pts[t[1]], c2 = pts[t[2]]; R.tri([a[0], ry, a[1]], [b2[0], ry, b2[1]], [c2[0], ry, c2[1]], [a[0] / 4, a[1] / 4], [b2[0] / 4, b2[1] / 4], [c2[0] / 4, c2[1] / 4], rc, undefined, [0, 1, 0]); }
      if (parapet) {
        const T = acc(cx, cz, 'trim'); const pc = [col[0] * 0.95, col[1] * 0.95, col[2] * 0.95]; const tc = style === 0 ? [0.45, 0.44, 0.42] : [0.93, 0.92, 0.9];
        for (let i = 0; i < n; i++) {
          const p = pts[i], q = pts[(i + 1) % n]; const len = Math.hypot(q[0] - p[0], q[1] - p[1]); if (len < 0.05) continue;
          const ix = -(q[1] - p[1]) / len * 0.22, iz = (q[0] - p[0]) / len * 0.22;
          T.quad([p[0] + ix, ry, p[1] + iz], [q[0] + ix, ry, q[1] + iz], [q[0] + ix, top, q[1] + iz], [p[0] + ix, top, p[1] + iz], [0, 0], [0, 0], [0, 0], [0, 0], pc, undefined, [ix, 0, iz]);
          T.quad([p[0], top, p[1]], [q[0], top, q[1]], [q[0] + ix, top, q[1] + iz], [p[0] + ix, top, p[1] + iz], [0, 0], [0, 0], [0, 0], [0, 0], tc, undefined, [0, 1, 0]);
          // cornice band
          const ox = -ix * 1.1, oz = -iz * 1.1;
          T.quad([p[0] + ox, top - 0.35, p[1] + oz], [q[0] + ox, top - 0.35, q[1] + oz], [q[0] + ox, top + 0.05, q[1] + oz], [p[0] + ox, top + 0.05, p[1] + oz], [0, 0], [0, 0], [0, 0], [0, 0], tc, undefined, [ox, 0, oz]);
          T.quad([p[0], top + 0.05, p[1]], [q[0], top + 0.05, q[1]], [q[0] + ox, top + 0.05, q[1] + oz], [p[0] + ox, top + 0.05, p[1] + oz], [0, 0], [0, 0], [0, 0], [0, 0], tc, undefined, [0, 1, 0]);
          T.quad([p[0], top - 0.35, p[1]], [q[0], top - 0.35, q[1]], [q[0] + ox, top - 0.35, q[1] + oz], [p[0] + ox, top - 0.35, p[1] + oz], [0, 0], [0, 0], [0, 0], [0, 0], tc, undefined, [0, -1, 0]);
        }
        // rooftop clutter: water tanks & antennas (Canarian azoteas)
        if ((style === 1 || style === 2) && Math.abs(area) > 50 && r() < 0.7) ROOFPROPS.push([cx + (r() - 0.5) * 3, ry, cz + (r() - 0.5) * 3, r()]);
      }
    }
  }
}
function hipRoof(pts, cx, cz, top, area, tris, maxDin = 3.4) {
  const n = pts.length;
      const R = acc(cx, cz, 'roofTile');
      const rin = Math.abs(area) * 2 / pts.reduce((s, p, i) => s + Math.hypot(pts[(i + 1) % n][0] - p[0], pts[(i + 1) % n][1] - p[1]), 0);
      const ov = 0.45;
      // outer ring expanded along bisectors
      const outer = pts.map((p, i) => {
        const a = pts[(i - 1 + n) % n], b2 = pts[(i + 1) % n];
        let e1x = p[0] - a[0], e1z = p[1] - a[1], e2x = b2[0] - p[0], e2z = b2[1] - p[1];
        const l1 = Math.hypot(e1x, e1z) || 1, l2 = Math.hypot(e2x, e2z) || 1; e1x /= l1; e1z /= l1; e2x /= l2; e2z /= l2;
        const n1x = e1z, n1z = -e1x, n2x = e2z, n2z = -e2x; let bx = n1x + n2x, bz = n1z + n2z; const bl = Math.hypot(bx, bz) || 1; bx /= bl; bz /= bl;
        const m = 1 / Math.max(0.5, bx * n1x + bz * n1z);
        return [p[0] + bx * ov * m, top - 0.12, p[1] + bz * ov * m];
      });
      const din = clamp(rin * 0.85, 0.8, maxDin);
      const inner = pts.map((p, i) => {
        const a = pts[(i - 1 + n) % n], b2 = pts[(i + 1) % n];
        let e1x = p[0] - a[0], e1z = p[1] - a[1], e2x = b2[0] - p[0], e2z = b2[1] - p[1];
        const l1 = Math.hypot(e1x, e1z) || 1, l2 = Math.hypot(e2x, e2z) || 1; e1x /= l1; e1z /= l1; e2x /= l2; e2z /= l2;
        const n1x = e1z, n1z = -e1x, n2x = e2z, n2z = -e2x; let bx = n1x + n2x, bz = n1z + n2z; const bl = Math.hypot(bx, bz) || 1; bx /= bl; bz /= bl;
        const m = Math.min(2.5, 1 / Math.max(0.4, bx * n1x + bz * n1z));
        return [p[0] - bx * din * m, top + din * 0.6, p[1] - bz * din * m];
      });
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n; const o1 = outer[i], o2 = outer[j], i1 = inner[i], i2 = inner[j];
        const ex = o2[0] - o1[0], ez = o2[2] - o1[2], el = Math.hypot(ex, ez) || 1; const ux = ex / el, uz = ez / el;
        const U = (P) => [((P[0] - o1[0]) * ux + (P[2] - o1[2]) * uz) / 1.6, (Math.abs((P[0] - o1[0]) * uz - (P[2] - o1[2]) * ux) + (P[1] - o1[1])) / 1.6];
        const want = [uz, 1, -ux];
        R.quad(o1, o2, i2, i1, U(o1), U(o2), U(i2), U(i1), null, undefined, want);
      }
      for (const t of tris) R.tri(inner[t[0]], inner[t[1]], inner[t[2]], [0, 0], [0.3, 0], [0, 0.3], null, undefined, [0, 1, 0]);
      // eave underside (so it isn't see-through from below)
      const T = acc(cx, cz, 'trim'); const ec = [0.55, 0.45, 0.38];
      for (let i = 0; i < n; i++) { const j = (i + 1) % n; T.quad([pts[i][0], top - 0.12, pts[i][1]], [pts[j][0], top - 0.12, pts[j][1]], outer[j], outer[i], [0, 0], [0, 0], [0, 0], [0, 0], ec, undefined, [0, -1, 0]); }
}
function insetPoly(pts, d0) {
  const n = pts.length; const A = Math.abs(polyArea(pts)); let per = 0; for (let i = 0; i < n; i++) per += Math.hypot(pts[(i + 1) % n][0] - pts[i][0], pts[(i + 1) % n][1] - pts[i][1]);
  const d = Math.min(d0, (2 * A / per) * 0.3); if (d < 0.1) return pts;
  const out = pts.map((p, i) => {
    const a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n];
    let e1x = p[0] - a[0], e1z = p[1] - a[1], e2x = b[0] - p[0], e2z = b[1] - p[1];
    const l1 = Math.hypot(e1x, e1z) || 1, l2 = Math.hypot(e2x, e2z) || 1; e1x /= l1; e1z /= l1; e2x /= l2; e2z /= l2;
    const n1x = e1z, n1z = -e1x, n2x = e2z, n2z = -e2x; let bx = n1x + n2x, bz = n1z + n2z; const bl = Math.hypot(bx, bz) || 1; bx /= bl; bz /= bl;
    const m = Math.min(2, 1 / Math.max(0.5, bx * n1x + bz * n1z));
    return [p[0] - bx * d * m, p[1] - bz * d * m];
  });
  return polyArea(out) > 0 ? out : pts;
}
const ROOFPROPS = [];
function addQuoins(pts, bot, top, w, col = null) {
  const n = pts.length; const A = acc(pts[0][0], pts[0][1], col ? 'trim' : 'stone');
  for (let i = 0; i < n; i++) {
    const p = pts[i], a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n];
    for (const [q, sgn] of [[a, -1], [b, 1]]) {
      const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < w * 2.5) continue;
      const ux = (q[0] - p[0]) / L, uz = (q[1] - p[1]) / L; const ox = sgn > 0 ? uz : -uz, oz = sgn > 0 ? -ux : ux; // outward normal of that edge
      const x1 = p[0] + ox * 0.04, z1 = p[1] + oz * 0.04, x2 = x1 + ux * w, z2 = z1 + uz * w;
      A.quad([x1, bot, z1], [x2, bot, z2], [x2, top, z2], [x1, top, z1], [0, 0], [w / 2, 0], [w / 2, (top - bot) / 2], [0, (top - bot) / 2], col, undefined, [ox, 0, oz]);
    }
  }
}
function addBalcony(pts, bmin, fh, r) {
  // longest edge that faces a road
  const n = pts.length; let best = -1, bl = 0;
  for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 5) continue; const mx = (p[0] + q[0]) / 2 + (q[1] - p[1]) / L * 3, mz = (p[1] + q[1]) / 2 - (q[0] - p[0]) / L * 3; const rd = ROADSEG.nearest(mx, mz); if (!rd || rd.d > DATA.R[rd.ri][2] / 2 + 3) continue; if (L > bl) { bl = L; best = i; } }
  if (best < 0) return;
  const p = pts[best], q = pts[(best + 1) % n]; const L = bl; const ux = (q[0] - p[0]) / L, uz = (q[1] - p[1]) / L, ox = uz, oz = -ux;
  const w = Math.min(L - 2, 3 + r() * 3.5), s0 = (L - w) / 2 + (r() - 0.5) * (L - w - 1) * 0.6;
  const y0 = bmin + fh + 0.05, dep = 0.85, hr = 1.05, roofY = y0 + 2.6;
  const P = (s, o, y) => [p[0] + ux * s + ox * o, y, p[1] + uz * s + oz * o];
  const A = acc(p[0], p[1], 'balcony'), W = acc(p[0], p[1], 'wood'), T = acc(p[0], p[1], 'roofTile');
  const a = s0, b = s0 + w;
  A.quad(P(a, dep, y0), P(b, dep, y0), P(b, dep, y0 + hr), P(a, dep, y0 + hr), [0, 0], [w / 1.2, 0], [w / 1.2, 1], [0, 1], null, undefined, [ox, 0, oz]);
  A.quad(P(a, 0, y0), P(a, dep, y0), P(a, dep, y0 + hr), P(a, 0, y0 + hr), [0, 0], [0.7, 0], [0.7, 1], [0, 1], null, undefined, [-ux, 0, -uz]);
  A.quad(P(b, dep, y0), P(b, 0, y0), P(b, 0, y0 + hr), P(b, dep, y0 + hr), [0, 0], [0.7, 0], [0.7, 1], [0, 1], null, undefined, [ux, 0, uz]);
  W.quad(P(a - 0.1, 0, y0), P(b + 0.1, 0, y0), P(b + 0.1, dep + 0.1, y0), P(a - 0.1, dep + 0.1, y0), [0, 0], [w, 0], [w, 1], [0, 1], null, undefined, [0, -1, 0]);
  W.quad(P(a - 0.1, 0, y0 + 0.001), P(b + 0.1, 0, y0 + 0.001), P(b + 0.1, dep + 0.1, y0 + 0.001), P(a - 0.1, dep + 0.1, y0 + 0.001), [0, 0], [w, 0], [w, 1], [0, 1], null, undefined, [0, 1, 0]);
  W.quad(P(a - 0.1, dep + 0.1, y0 - 0.18), P(b + 0.1, dep + 0.1, y0 - 0.18), P(b + 0.1, dep + 0.1, y0), P(a - 0.1, dep + 0.1, y0), [0, 0], [w, 0], [w, 0.2], [0, 0.2], null, undefined, [ox, 0, oz]);
  // posts & small tiled roof
  for (const s of [a, b]) { W.quad(P(s - 0.06, dep, y0 + hr), P(s + 0.06, dep, y0 + hr), P(s + 0.06, dep, roofY), P(s - 0.06, dep, roofY), [0, 0], [0.1, 0], [0.1, 1], [0, 1], null, undefined, [ox, 0, oz]); }
  T.quad(P(a - 0.25, 0, roofY + 0.35), P(b + 0.25, 0, roofY + 0.35), P(b + 0.25, dep + 0.35, roofY), P(a - 0.25, dep + 0.35, roofY), [0, 0], [w / 1.6, 0], [w / 1.6, 0.7], [0, 0.7], null, undefined, [0, 1, 0]);
  T.quad(P(a - 0.25, 0, roofY + 0.34), P(b + 0.25, 0, roofY + 0.34), P(b + 0.25, dep + 0.35, roofY - 0.01), P(a - 0.25, dep + 0.35, roofY - 0.01), [0, 0], [w / 1.6, 0], [w / 1.6, 0.7], [0, 0.7], null, undefined, [0, -1, 0]);
}
function buildRoofProps() {
  if (!ROOFPROPS.length) return;
  const g = new THREE.CylinderGeometry(0.6, 0.6, 1.3, 10); g.translate(0, 0.65, 0);
  const m = new THREE.MeshStandardMaterial({ color: 0x2b2d30, roughness: 0.6 });
  const im = new THREE.InstancedMesh(g, m, ROOFPROPS.length); const o = new THREE.Object3D();
  ROOFPROPS.forEach((p, i) => { o.position.set(p[0], p[1], p[2]); o.scale.setScalar(0.8 + p[3] * 0.6); o.updateMatrix(); im.setMatrixAt(i, o.matrix); im.setColorAt(i, new THREE.Color(p[3] < 0.5 ? 0x2b2d30 : 0xe8e4da)); });
  im.castShadow = true; scene.add(im);
}

function finalizeChunks() {
  let meshes = 0;
  for (const [k, c] of CHUNKS) for (const mk in c) {
    const a = c[mk]; if (!a.p.length) continue;
    const g = a.geo(mk === 'facade' ? 2 : 0, MAT[mk]); a.p = a.n = a.uv = a.c = a.e = null;
    const m = new THREE.Mesh(g, MAT[mk]);
    const isRoad = ['asphalt', 'asphaltLines', 'paving', 'sidewalk', 'footway', 'dirt', 'tram', 'disc', 'discPave', 'tunnelLight', 'grass'].includes(mk);
    m.receiveShadow = true; m.castShadow = !isRoad && mk !== 'glassHouse';
    if (isRoad) m.renderOrder = 1;
    m.matrixAutoUpdate = false; scene.add(m); meshes++;
  }
  CHUNKS.clear();
  return meshes;
}

// audit: roads that cross without a junction (different OSM layers) must be ≥ ~4.5 m apart vertically
function auditCrossings(minClear = 4.4) {
  const R = DATA.R, out = []; const segs = [];
  R.forEach((rd, ri) => { if (rd[0] > 12 && !(rd[3] & 6)) return; const c = rd[4]; let s = 0; for (let i = 0; i < c.length - 2; i += 2) { const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]); segs.push([ri, c[i], c[i + 1], c[i + 2], c[i + 3], s, L]); s += L; } });
  const G = new Map(), CS = 40; segs.forEach((g, k) => { const x0 = Math.floor(Math.min(g[1], g[3]) / CS), x1 = Math.floor(Math.max(g[1], g[3]) / CS), z0 = Math.floor(Math.min(g[2], g[4]) / CS), z1 = Math.floor(Math.max(g[2], g[4]) / CS); for (let a = x0; a <= x1; a++) for (let b = z0; b <= z1; b++) { const key = a * 10000 + b; let l = G.get(key); if (!l) G.set(key, l = []); l.push(k); } });
  const seen = new Set();
  for (const l of G.values()) for (let i = 0; i < l.length; i++) for (let j = i + 1; j < l.length; j++) { const A = segs[l[i]], B = segs[l[j]]; if (A[0] === B[0]) continue; const pk = Math.min(l[i], l[j]) + ',' + Math.max(l[i], l[j]); if (seen.has(pk)) continue; seen.add(pk);
    const d1x = A[3] - A[1], d1z = A[4] - A[2], d2x = B[3] - B[1], d2z = B[4] - B[2]; const den = d1x * d2z - d1z * d2x; if (Math.abs(den) < 1e-6) continue;
    const t = ((B[1] - A[1]) * d2z - (B[2] - A[2]) * d2x) / den, u = ((B[1] - A[1]) * d1z - (B[2] - A[2]) * d1x) / den; if (t <= 0.001 || t >= 0.999 || u <= 0.001 || u >= 0.999) continue;
    const x = A[1] + d1x * t, z = A[2] + d1z * t;
    // shared node nearby → it's a real junction
    const ca = R[A[0]][4], cb = R[B[0]][4]; let junction = false; for (let p = 0; p < ca.length && !junction; p += 2) if (Math.hypot(ca[p] - x, ca[p + 1] - z) < 6) for (let q = 0; q < cb.length; q += 2) if (ca[p] === cb[q] && ca[p + 1] === cb[q + 1]) { junction = true; break; }
    if (junction) continue; if (Math.hypot(x + 347.5, z - 745.4) < 90) continue; // Padre Anchieta ring: modelled apart
    if ((R[A[0]][3] & 4) && (R[B[0]][3] & 4)) continue;
    const ya = ROADY[A[0]] ? ROADY[A[0]](A[5] + A[6] * t, x, z) : heightAt(x, z), yb = ROADY[B[0]] ? ROADY[B[0]](B[5] + B[6] * u, x, z) : heightAt(x, z);
    const dy = Math.abs(ya - yb); const lowPed = (ya < yb ? R[A[0]][0] : R[B[0]][0]) > 12; if (dy < (lowPed ? 2.7 : minClear)) out.push({ x: Math.round(x), z: Math.round(z), dy: +dy.toFixed(2), a: A[0], b: B[0], ta: RTN[R[A[0]][0]], tb: RTN[R[B[0]][0]], fa: R[A[0]][3], fb: R[B[0]][3], na: R[A[0]][1] >= 0 ? STR[R[A[0]][1]] : '', nb: R[B[0]][1] >= 0 ? STR[R[B[0]][1]] : '' });
  }
  return out;
}

// audit 2: structure (walls, parapets, portals, slabs, piers) inside another road's carriageway at driving height
function auditObstacles() {
  const R = DATA.R; const out = []; const near = new Map();
  const nodesOf = (ri) => { let st = near.get(ri); if (!st) { st = new Set(); const c = R[ri][4]; for (let i = 0; i < c.length; i += 2) st.add(K(c[i], c[i + 1])); near.set(ri, st); } return st; };
  const shares = (a, b) => { const A = nodesOf(a); for (const k of nodesOf(b)) if (A.has(k)) return true; return false; };
  const seen = new Set();
  for (const o of OBST) { const [own, cx, cz, y0, y1, ax, az, bx, bz] = o;
    for (const [px, pz] of [[cx, cz], [ax * 0.8 + bx * 0.2, az * 0.8 + bz * 0.2], [bx * 0.8 + ax * 0.2, bz * 0.8 + az * 0.2]]) {
      const rn = ROADSEG.nearest(px, pz, (r) => r !== R[own] && r[0] <= 12); if (!rn) continue; const rd = R[rn.ri]; if (rn.d > rd[2] / 2 - 0.4) continue;
      if (shares(own, rn.ri)) continue;
      const c = rd[4]; let s2 = 0; for (let k = 0; k < rn.i && k + 3 < c.length; k += 2) s2 += Math.hypot(c[k + 2] - c[k], c[k + 3] - c[k + 1]); s2 += Math.hypot(rn.x - c[rn.i], rn.z - c[rn.i + 1]);
      const ys = ROADY[rn.ri] ? ROADY[rn.ri](s2, px, pz) : heightAt(px, pz);
      if (y1 - y0 < 0.35 && Math.abs(y0 - ys) < 0.45) continue; // coplanar road surfaces (merges, twin carriageways)
      if (y1 > ys + 0.25 && y0 < ys + 4.1) { const key = own + ':' + rn.ri + ':' + Math.round(px / 8) + ':' + Math.round(pz / 8); if (seen.has(key)) continue; seen.add(key);
        out.push({ x: Math.round(px), z: Math.round(pz), own, road: rn.ri, to: RTN[R[own][0]], tr: RTN[rd[0]], fo: R[own][3], fr: rd[3], no: R[own][1] >= 0 ? STR[R[own][1]] : '', nr: rd[1] >= 0 ? STR[rd[1]] : '', y0: +(y0 - ys).toFixed(1), y1: +(y1 - ys).toFixed(1) }); } } }
  return out;
}
// ---- medians: a concrete barrier between the two directions of an autovía (and between an autovía and a road running beside it);
// a raised kerb island between the carriageways of urban dual roads. Openings are left at junctions.
function buildMedians() {
  const R = DATA.R; const X = xsegGrid(); let nB = 0, nK = 0;
  const big = (t) => t <= 2;
  // nodes with 3+ ways (junctions) on a grid
  const JG = new Map(); for (const [k, n] of nodeCount) { if (n < 3) continue; const [x, z] = k.split(',').map(Number); const g = Math.floor(x / 30) * 100000 + Math.floor(z / 30); let l = JG.get(g); if (!l) JG.set(g, l = []); l.push(x, z); }
  const nearJ = (x, z, r) => { const a0 = Math.floor(x / 30), b0 = Math.floor(z / 30); for (let a = a0 - 1; a <= a0 + 1; a++) for (let b = b0 - 1; b <= b0 + 1; b++) { const l = JG.get(a * 100000 + b); if (!l) continue; for (let i = 0; i < l.length; i += 2) if (Math.hypot(l[i] - x, l[i + 1] - z) < r) return true; } return false; };
  const runs = new Map();
  R.forEach((rd, ri) => { if (rd[0] > 10 || (rd[3] & 6) || RAISE.has(ri)) return; const c = rd[4]; let s0 = 0;
    for (let i = 0; i < c.length - 2; i += 2) { const ax = c[i], az = c[i + 1], bx = c[i + 2], bz = c[i + 3], L = Math.hypot(bx - ax, bz - az); if (L < 0.5) { continue; } const ux = (bx - ax) / L, uz = (bz - az) / L;
      for (let t = 1.5; t < L; t += 3) { const x = ax + ux * t, z = az + uz * t; const l = X.G.get(Math.floor(x / 40) * 10000 + Math.floor(z / 40)); if (!l) continue;
        let best = null;
        for (const k of l) { const g = X.segs[k]; const rj = g[0]; if (rj <= ri) continue; const r2 = R[rj]; if (r2[0] > 10 || (r2[3] & 6) || RAISE.has(rj)) continue;
          const ex = g[3] - g[1], ez = g[4] - g[2], L2 = ex * ex + ez * ez || 1, Lg = Math.sqrt(L2); const tt = ((x - g[1]) * ex + (z - g[2]) * ez) / L2; if (tt < 0 || tt > 1) continue;
          if (Math.abs((ux * ex + uz * ez) / Lg) < 0.94) continue; const px = g[1] + ex * tt, pz = g[2] + ez * tt, d = Math.hypot(x - px, z - pz); const gap = d - (rd[2] + r2[2]) / 2;
          if (gap < -0.4 || gap > 6) continue; if (!best || d < best.d) best = { rj, d, gap, px, pz, s2: g[5] + g[6] * tt }; }
        if (!best) continue; if (nearJ(x, z, 16) || nearJ(best.px, best.pz, 16)) continue;
        const ya = ROADY[ri](s0 + t, x, z), yb = ROADY[best.rj](best.s2, best.px, best.pz); if (Math.abs(ya - yb) > 0.6) continue;
        const nx = (best.px - x) / best.d, nz = (best.pz - z) / best.d; const off = rd[2] / 2 + Math.max(0, best.gap) / 2; const mx = x + nx * off, mz = z + nz * off;
        // a side road crossing the median here = opening
        const cross = ROADSEG.nearest(mx, mz, (r) => r !== rd && r !== R[best.rj] && r[0] <= 12 && !(r[3] & 6)); if (cross && cross.d < R[cross.ri][2] / 2 + 0.5) continue;
        const key = ri + ':' + best.rj; let run = runs.get(key); if (!run) runs.set(key, run = []);
        run.push([mx, mz, (ya + yb) / 2, Math.max(0, best.gap), big(rd[0]) || big(R[best.rj][0]) ? 2 : 1, s0 + t]); }
      s0 += L; } });
  for (const run of runs.values()) {
    // split into continuous pieces (samples ≤ 4.5 m apart)
    let piece = [];
    const flush = () => { if (piece.length >= 3) { if (piece[0][4] === 2) { barrier(piece); nB++; } else { island(piece); nK++; } } piece = []; };
    for (const p of run) { if (piece.length && (Math.hypot(p[0] - piece[piece.length - 1][0], p[1] - piece[piece.length - 1][1]) > 4.5)) flush(); piece.push(p); } flush(); }
  console.log('medians: barriers', nB, 'islands', nK);
  function barrier(P) { // New Jersey profile
    const T = acc(P[0][0], P[0][1], 'trim'); const col = [0.78, 0.77, 0.74];
    for (let i = 0; i < P.length - 1; i++) { const a = P[i], b = P[i + 1]; const dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz) || 1, px = -dz / L, pz = dx / L;
      const prof = [[0.32, 0], [0.24, 0.08], [0.1, 0.33], [0.08, 0.82]];
      for (const sg of [1, -1]) for (let k = 0; k < prof.length - 1; k++) { const [w0, h0] = prof[k], [w1, h1] = prof[k + 1];
        T.quad([a[0] + px * w0 * sg, a[2] + h0, a[1] + pz * w0 * sg], [b[0] + px * w0 * sg, b[2] + h0, b[1] + pz * w0 * sg], [b[0] + px * w1 * sg, b[2] + h1, b[1] + pz * w1 * sg], [a[0] + px * w1 * sg, a[2] + h1, a[1] + pz * w1 * sg], [0, 0], [0, 0], [0, 0], [0, 0], col, undefined, [px * sg, 0.35, pz * sg]); }
      T.quad([a[0] + px * 0.08, a[2] + 0.82, a[1] + pz * 0.08], [b[0] + px * 0.08, b[2] + 0.82, b[1] + pz * 0.08], [b[0] - px * 0.08, b[2] + 0.82, b[1] - pz * 0.08], [a[0] - px * 0.08, a[2] + 0.82, a[1] - pz * 0.08], [0, 0], [0, 0], [0, 0], [0, 0], col, undefined, [0, 1, 0]);
      COL.addSeg(a[0], a[1], b[0], b[1], Math.min(a[2], b[2]) - 0.2, Math.max(a[2], b[2]) + 0.9); }
    // end caps sloping to the ground (no blunt ends in front of traffic)
  }
  function island(P) { // raised kerb + paving/grass, as wide as the gap (min 0.8 m)
    const T = acc(P[0][0], P[0][1], 'trim'); const kc = [0.8, 0.79, 0.75], top = [0.42, 0.52, 0.36];
    for (let i = 0; i < P.length - 1; i++) { const a = P[i], b = P[i + 1]; const dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz) || 1, px = -dz / L, pz = dx / L; const wa = Math.max(0.4, a[3] / 2 - 0.05), wb = Math.max(0.4, b[3] / 2 - 0.05), h = 0.16;
      T.quad([a[0] + px * wa, a[2] + h, a[1] + pz * wa], [b[0] + px * wb, b[2] + h, b[1] + pz * wb], [b[0] - px * wb, b[2] + h, b[1] - pz * wb], [a[0] - px * wa, a[2] + h, a[1] - pz * wa], [0, 0], [0, 0], [0, 0], [0, 0], a[3] > 1.8 ? top : kc, undefined, [0, 1, 0]);
      for (const sg of [1, -1]) T.quad([a[0] + px * wa * sg, a[2] - 0.05, a[1] + pz * wa * sg], [b[0] + px * wb * sg, b[2] - 0.05, b[1] + pz * wb * sg], [b[0] + px * wb * sg, b[2] + h, b[1] + pz * wb * sg], [a[0] + px * wa * sg, a[2] + h, a[1] + pz * wa * sg], [0, 0], [0, 0], [0, 0], [0, 0], kc, undefined, [px * sg, 0, pz * sg]);
      if (a[3] > 1.8 && i % 4 === 0 && Math.random() < 0.6) TREES.push([a[0], a[1], 1, 0.75, 1]);
      COL.addSeg(a[0], a[1], b[0], b[1], Math.min(a[2], b[2]) - 0.2, Math.max(a[2], b[2]) + 0.5); }
  }
}
