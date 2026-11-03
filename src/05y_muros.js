// ============ v1.0.4: buildings of the Catastro that the OSM lacks, and walls, garden walls and fences ============
// Jonay, 3-nov: «hay muchos huecos que no existen en la realidad» (Callejón Montaraz: «puede que haya huecos dentro pero
// eso no se ve, hay un muro») and «además de los edificios hay que repasar muros y vallas/cercas que rodean jardines y
// zonas como la universidad». DATA.CB and DATA.BW come from tools/catastro_add.py (build.py puts them in the data).

// the parts of buildings of the Catastro that no building of the map covers: into DATA.B like any other building
function addCatastro() {
  const CB = DATA.CB || []; let n = 0;
  for (const [fl, c] of CB) {
    let cx = 0, cz = 0; const k = c.length / 2; for (let i = 0; i < c.length; i += 2) { cx += c[i]; cz += c[i + 1]; } cx /= k; cz /= k;
    const R = mulberry((Math.round(cx * 7.3) * 92821 + Math.round(cz * 13.1)) | 0), r = R();
    const lv = Math.max(1, Math.min(14, fl)), hist = isHistoric(cx, cz);
    const style = lv >= 4 ? 2 : hist ? 0 : 1, roofT = style === 0 ? (r < 0.7 ? 1 : 0) : style === 1 && r < 0.25 ? 1 : 0;
    DATA.B.push([Math.round((lv * (style === 0 ? 3.6 : 3.1) + 0.6) * 10), style, lv, roofT, -1, Math.floor(R() * 1e6), c]); n++;
  }
  console.log('catastro: edificios añadidos', n);
  return n;
}

// garden walls along the street side of the blocks that the game fills with houses along the edge (05q_inicio.js): where
// there is no house, a whitewashed wall closes the courtyards, as in the street (Callejón Montaraz)
function inicioTapias() {
  const out = []; if (!INICIO.blocks) return out;
  const cand = (x, z) => { const l = []; for (const pc of INICIO.parcels) if (Math.abs(pc.cx - x) < 30 && Math.abs(pc.cz - z) < 30) l.push(pc.poly); return l; };
  for (const P0 of INICIO.blocks) {
    const P = insetPoly(P0, 0.5), m = P.length; let run = [];
    const flush = () => { if (run.length >= 3) { let L = 0; for (let i = 1; i < run.length; i++) L += Math.hypot(run[i][0] - run[i - 1][0], run[i][1] - run[i - 1][1]); if (L >= 2) out.push(['tapia', 0, '', run.flat()]); } run = []; };
    for (let i = 0; i < m; i++) {
      const a = P[i], b = P[(i + 1) % m], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L));
      for (let t = 0; t < n; t++) {
        const x = a[0] + (b[0] - a[0]) * t / n, z = a[1] + (b[1] - a[1]) * t / n;
        const inB = cand(x, z).some((p) => pip(x, z, p.flat ? p.flat() : p)) || inAnyBuilding(x, z);
        if (inB) flush(); else run.push([x, z]);
      }
    }
    flush();
  }
  return out;
}

const WALLS = { n: 0, km: 0, meshes: [] };
function buildWalls() {
  const list = (DATA.BW || []).slice(); let nt = 0;
  try { const t = inicioTapias(); nt = t.length; for (const w of t) list.push(w); } catch (e) { console.error('tapias', e); }
  // height (m above the ground), thickness, material
  const KIND = { wall: [2.2, 0.3, 'cal'], tapia: [2.6, 0.3, 'cal'], city_wall: [3.2, 0.6, 'piedra'], retaining_wall: [1.1, 0.45, 'piedra'],
    fence: [1.8, 0.05, 'valla'], wire_fence: [1.6, 0.04, 'valla'], wood_fence: [1.3, 0.07, 'madera'], hedge: [1.4, 0.9, 'seto'] };
  const MAT = {
    cal: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.95 }),
    piedra: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 1 }),
    valla: new THREE.MeshStandardMaterial({ color: 0x48524c, roughness: 0.6, metalness: 0.4, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide }),
    madera: new THREE.MeshStandardMaterial({ color: 0x86663f, roughness: 0.9 }),
    seto: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 1 }),
  };
  const COLS = { cal: [[0.93, 0.91, 0.86], [0.95, 0.94, 0.9], [0.89, 0.85, 0.77], [0.92, 0.88, 0.8]], piedra: [[0.42, 0.4, 0.38], [0.5, 0.47, 0.43], [0.36, 0.35, 0.34]], seto: [[0.22, 0.38, 0.18], [0.26, 0.42, 0.2]] };
  const CELLS = new Map(); const CS = 300;
  const bucket = (mat, x, z) => { const k = mat + ':' + Math.floor(x / CS) + ',' + Math.floor(z / CS); let b = CELLS.get(k); if (!b) { b = { mat, p: [], c: [] }; CELLS.set(k, b); } return b; };
  const quad = (b, a1, a2, b2, b1, col) => { b.p.push(...a1, ...a2, ...b2, ...a1, ...b2, ...b1); for (let i = 0; i < 6; i++) b.c.push(...col); };
  let km = 0, n = 0;
  for (const [kind, h, mat0, c] of list) {
    const K = KIND[kind]; if (!K || c.length < 4) continue;
    const H = h > 0.4 && h < 6 ? h : K[0], T = K[1], mat = K[2];
    const R = mulberry((Math.round(c[0] * 3) * 7919 + Math.round(c[1] * 3)) | 0); const pal = COLS[mat], col = pal ? pal[Math.floor(R() * pal.length)] : [1, 1, 1];
    const shade = (k) => col.map((v) => v * k);
    for (let i = 0; i + 3 < c.length; i += 2) {
      const ax = c[i], az = c[i + 1], bx = c[i + 2], bz = c[i + 3], L = Math.hypot(bx - ax, bz - az); if (L < 0.05) continue;
      const nx = -(bz - az) / L * T / 2, nz = (bx - ax) / L * T / 2, k = Math.max(1, Math.ceil(L / 5)); km += L; // pieces of up to 5 m following the ground
      let gmin = 1e9, gmax = -1e9; const b = bucket(mat, ax, az);
      for (let j = 0; j < k; j++) {
        const x0 = ax + (bx - ax) * j / k, z0 = az + (bz - az) * j / k, x1 = ax + (bx - ax) * (j + 1) / k, z1 = az + (bz - az) * (j + 1) / k;
        const g0 = heightAt(x0, z0), g1 = heightAt(x1, z1); gmin = Math.min(gmin, g0, g1); gmax = Math.max(gmax, g0, g1);
        const y0 = g0 - 0.4, y1 = g1 - 0.4, t0 = g0 + H, t1 = g1 + H;
        quad(b, [x0 + nx, y0, z0 + nz], [x1 + nx, y1, z1 + nz], [x1 + nx, t1, z1 + nz], [x0 + nx, t0, z0 + nz], shade(0.94)); // one side
        if (T > 0.06) {
          quad(b, [x1 - nx, y1, z1 - nz], [x0 - nx, y0, z0 - nz], [x0 - nx, t0, z0 - nz], [x1 - nx, t1, z1 - nz], shade(0.9)); // the other side
          quad(b, [x0 + nx, t0, z0 + nz], [x1 + nx, t1, z1 + nz], [x1 - nx, t1, z1 - nz], [x0 - nx, t0, z0 - nz], shade(mat === 'cal' ? 0.8 : 1)); // the top
        }
      }
      if (T > 0.06) for (const [ex, ez, s] of [[ax, az, -1], [bx, bz, 1]]) { const g = heightAt(ex, ez); const tx = (bx - ax) / L * 0.001 * s, tz = (bz - az) / L * 0.001 * s;
        quad(b, [ex - nx * s + tx, g - 0.4, ez - nz * s + tz], [ex + nx * s + tx, g - 0.4, ez + nz * s + tz], [ex + nx * s + tx, g + H, ez + nz * s + tz], [ex - nx * s + tx, g + H, ez - nz * s + tz], shade(0.86)); } // the ends
      COL.addSeg(ax, az, bx, bz, gmin - 0.5, gmax + H);
    }
    n++;
  }
  for (const b of CELLS.values()) {
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(b.c, 3)); g.computeVertexNormals();
    const m = new THREE.Mesh(g, MAT[b.mat]); m.castShadow = b.mat !== 'valla'; m.receiveShadow = true; m.userData.muros = true; scene.add(m); WALLS.meshes.push(m);
  }
  WALLS.n = n; WALLS.km = Math.round(km / 100) / 10;
  console.log('muros y vallas', n, 'tapias del inicio', nt, WALLS.km, 'km', CELLS.size, 'mallas');
  return n;
}
