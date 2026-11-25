// ============ v1.0.4: buildings of the Catastro that the OSM lacks, and walls, garden walls and fences ============
// Jonay, 3-nov: «hay muchos huecos que no existen en la realidad» (Callejón Montaraz: «puede que haya huecos dentro pero
// eso no se ve, hay un muro») and «además de los edificios hay que repasar muros y vallas/cercas que rodean jardines y
// zonas como la universidad». DATA.CB and DATA.BW come from tools/catastro_add.py (build.py puts them in the data).

// the parts of buildings of the Catastro that no building of the map covers: into DATA.B like any other building
// v1.4.50 (Jonay: «eso de casas hechas a mano sustituidas por Catastro, malo… que no pase más, que hay muchas más hechas a
// mano»): the places made by hand keep theirs. They find «their» building of the map by its position or kind (LANDMARK_AT
// and the old-town houses of 05q_inicio, the stands of the Francisco Peraza and the Juan Ríos Tejera hall, 05v_peraza)
// or carve their plot in it (C. Tacoronte 67, the hand-placed houses: reservedPlots, 05p_casas): the Catastro's
// buildings must not come in there, nor take away the map's block they dress
function handMade() {
  const pip = (x, z, c) => {
    let o = false;
    for (let i = 0, j = c.length - 2; i < c.length; j = i, i += 2)
      if (c[i + 1] > z !== c[j + 1] > z && x < ((c[j] - c[i]) * (z - c[i + 1])) / (c[j + 1] - c[i + 1]) + c[i]) o = !o;
    return o;
  };
  const circles = LANDMARK_AT.map((L) => [L.x, L.z, L.r + 2]),
    polys = [];
  for (const P of INICIO.blocks || []) polys.push(P.flat ? P.flat() : P);
  for (const a of DATA.A) if (a[1] >= 0 && /Estadio Municipal Francisco Peraza|Juan R[ií]os Tejera/.test(STR[a[1]])) polys.push(a[2]);
  const plots = typeof reservedPlots === 'function' ? reservedPlots() : [];
  return {
    pip,
    // (x, z) the centre of a building, c its outline
    hit(x, z, c) {
      if (circles.some(([px, pz, r]) => Math.hypot(px - x, pz - z) < r)) return true;
      if (polys.some((P) => pip(x, z, P))) return true;
      return plots.some(([px, pz, inP]) => Math.hypot(px - x, pz - z) < 60 && (inP(x, z) || (c && pip(px, pz, c))));
    },
    dressed(x, z) {
      return circles.some(([px, pz, r]) => Math.hypot(px - x, pz - z) < r);
    }
  };
}
function addCatastro() {
  const CB = DATA.CB || [];
  const HM0 = handMade(),
    kept = [];
  let n = 0,
    skip = 0;
  // v1.4.48 (Jonay, with a real view of the Calle Barcelona: a whole block of separate buildings): the OSM footprints that
  // cover a whole block where the Catastro has each building (tools/osm_gruesos.py, DATA.OG: their centres) go; the
  // Catastro's buildings come in their place (in DATA.CB)
  if (DATA.OG && DATA.OG.length) {
    const og = DATA.OG;
    let q = 0;
    for (let i = DATA.B.length - 1; i >= 0; i--) {
      const c = DATA.B[i][6];
      if (!c || c.length < 6) continue;
      let cx = 0,
        cz = 0;
      for (let k = 0; k < c.length; k += 2) ((cx += c[k]), (cz += c[k + 1]));
      cx /= c.length / 2;
      cz /= c.length / 2;
      if (og.some(([x, z]) => Math.abs(x - cx) < 1.5 && Math.abs(z - cz) < 1.5)) {
        if (HM0.dressed(cx, cz)) {
          kept.push(c); // (v1.4.50: dressed by hand: it stays, and no Catastro building inside it)
          continue;
        }
        DATA.B.splice(i, 1);
        q++;
      }
    }
    console.log('catastro: bloques gruesos del OSM cambiados', q);
  }
  for (const [fl, c] of CB) {
    let cx = 0,
      cz = 0;
    const k = c.length / 2;
    for (let i = 0; i < c.length; i += 2) {
      cx += c[i];
      cz += c[i + 1];
    }
    cx /= k;
    cz /= k;
    if (HM0.hit(cx, cz, c) || kept.some((P) => HM0.pip(cx, cz, P))) {
      skip++;
      continue;
    }
    const R = mulberry((Math.round(cx * 7.3) * 92821 + Math.round(cz * 13.1)) | 0),
      r = R();
    const lv = Math.max(1, Math.min(14, fl)),
      hist = isHistoric(cx, cz);
    const style = lv >= 4 ? 2 : hist ? 0 : 1,
      roofT = style === 0 ? (r < 0.7 ? 1 : 0) : style === 1 && r < 0.25 ? 1 : 0;
    DATA.B.push([Math.round((lv * (style === 0 ? 3.6 : 3.1) + 0.6) * 10), style, lv, roofT, -1, Math.floor(R() * 1e6), c]);
    n++;
  }
  console.log('catastro: edificios añadidos', n, 'no añadidos por estar en un sitio hecho a mano', skip);
  window.__catHecho = skip; // (tests)
  return n;
}

// garden walls along the street side of the blocks that the game fills with houses along the edge (05q_inicio.js): where
// there is no house, a whitewashed wall closes the courtyards, as in the street (Callejón Montaraz)
function inicioTapias() {
  const out = [];
  if (!INICIO.blocks) return out;
  const cand = (x, z) => {
    const l = [];
    for (const pc of INICIO.parcels) if (Math.abs(pc.cx - x) < 30 && Math.abs(pc.cz - z) < 30) l.push(pc.poly);
    return l;
  };
  for (const P0 of INICIO.blocks) {
    const P = insetPoly(P0, 0.5),
      m = P.length;
    let run = [];
    const flush = () => {
      if (run.length >= 3) {
        let L = 0;
        for (let i = 1; i < run.length; i++) L += Math.hypot(run[i][0] - run[i - 1][0], run[i][1] - run[i - 1][1]);
        if (L >= 2) out.push(['tapia', 0, '', run.flat()]);
      }
      run = [];
    };
    for (let i = 0; i < m; i++) {
      const a = P[i],
        b = P[(i + 1) % m],
        L = Math.hypot(b[0] - a[0], b[1] - a[1]),
        n = Math.max(1, Math.round(L));
      for (let t = 0; t < n; t++) {
        const x = a[0] + ((b[0] - a[0]) * t) / n,
          z = a[1] + ((b[1] - a[1]) * t) / n;
        const inB = cand(x, z).some((p) => pip(x, z, p.flat ? p.flat() : p)) || wallBuildingAt(x, z);
        if (inB) flush();
        else run.push([x, z]);
      }
    }
    flush();
  }
  return out;
}

// v1.4.50 (Jonay, con una vista de la C. San Antonio y otra de la C. Hermanos Marrero: «son terrenos que tienen muros…
// en las manzanas que queden con trozos así se completan con muros, salvo si hay un pasaje, muros de unos 2,50 de alto…
// eso para las zonas del casco; para zonas de afueras de campo no»): in the old town, a stretch of a street's front with
// no building, between buildings of the same block (a plot), is closed with a 2.5 m wall along the facade line; not where
// another street or a path goes in (a passage), not on a square, park, car park or garden, not over 60 m
function cascoSolares() {
  const out = [],
    open = new Set(['park', 'garden', 'grass', 'pitch', 'playground', 'parking', 'square', 'sports', 'cemetery']),
    opens = DATA.A.filter((a) => open.has(DATA.AT[a[0]]) && a[2].length >= 6);
  const inOpen = (x, z) => opens.some((a) => pip(x, z, a[2]));
  const nearOther = (x, z, ri0) => {
    for (const r of [0.8, 2.5])
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2,
          rn = ROADSEG.nearest(x + Math.cos(a) * r, z + Math.sin(a) * r, (q) => q[0] <= 15 && q !== DATA.R[ri0]);
        if (rn && rn.d < DATA.R[rn.ri][2] / 2 + 0.3) return true;
      }
    return false;
  };
  DATA.R.forEach((rd, ri) => {
    if (rd[0] < 3 || rd[0] > 13 || rd[3] & 6) return;
    const c = rd[4];
    if (!c.some((_, i) => i % 2 === 0 && isHistoric(c[i], c[i + 1]))) return;
    const d = rd[2] / 2 + SIDEWALK_W + 0.35;
    for (const sd of [1, -1]) {
      let run = [];
      const flush = () => {
        if (run.length >= 3) {
          let L = 0;
          for (let i = 1; i < run.length; i++) L += Math.hypot(run[i][0] - run[i - 1][0], run[i][1] - run[i - 1][1]);
          // (between buildings: the run touches a building at both ends)
          const a = run[0],
            b = run[run.length - 1];
          if (L >= 3 && L <= 60 && a.b && b.b) out.push(['tapia', 2.5, '', run.flatMap((p) => [p[0], p[1]])]);
        }
        run = [];
      };
      for (let i = 0; i + 3 < c.length; i += 2) {
        const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]);
        if (L < 0.5) continue;
        const ux = (c[i + 2] - c[i]) / L,
          uz = (c[i + 3] - c[i + 1]) / L,
          nx = -uz * sd,
          nz = ux * sd;
        for (let t = 0; t < L; t += 1.5) {
          const x = c[i] + ux * t + nx * d,
            z = c[i + 1] + uz * t + nz * d;
          if (!isHistoric(x, z)) {
            flush();
            continue;
          }
          const bld = inAnyBuilding(x, z) || inAnyBuilding(x + nx * 1.2, z + nz * 1.2);
          if (bld) {
            if (run.length) {
              run.push([x, z]);
              run[run.length - 1].b = true;
              flush();
            }
            const p = [x, z];
            p.b = true;
            run = [p];
            continue;
          }
          if (onCarriagewayEarly(x, z, 0.2) || inOpen(x + nx * 2, z + nz * 2) || nearOther(x + nx * 1.5, z + nz * 1.5, ri)) {
            run = [];
            continue;
          }
          if (run.length && run[0].b) run.push([x, z]);
        }
        // (a run goes on round to the next piece of the way only through its shared point)
      }
      run = [];
    }
  });
  window.__solares = out.length; // (tests)
  return out;
}

// v1.0.5 (Jonay: «los muros no deberían dejar pasar entre muro y edificio»): a wall that stops next to a building (it was cut
// there, or the garden wall runs up to a house) goes on into it, past the 0.75 m the facade is drawn inside its plan
// iron railing: a bar on the left of each tile, a rail at the top and one near the bottom (alphaTest cuts the rest)
function railTex() {
  const cv = document.createElement('canvas');
  cv.width = 16;
  cv.height = 64;
  const x = cv.getContext('2d');
  x.fillStyle = '#fff';
  x.fillRect(0, 0, 3, 64);
  x.fillRect(0, 0, 16, 4);
  x.fillRect(0, 55, 16, 3);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = THREE.RepeatWrapping;
  t.magFilter = THREE.LinearFilter;
  t.anisotropy = 4;
  return t;
}
let WALL_BI = null;
function wallBuildingAt(x, z) {
  // DATA.B in 25 m cells (built once): inAnyBuilding goes through every building
  if (!WALL_BI) {
    WALL_BI = new Map();
    for (const b of DATA.B) {
      const c = b[6];
      if (!c || c.length < 6) continue;
      let x0 = 1e9,
        z0 = 1e9,
        x1 = -1e9,
        z1 = -1e9;
      for (let i = 0; i < c.length; i += 2) {
        x0 = Math.min(x0, c[i]);
        x1 = Math.max(x1, c[i]);
        z0 = Math.min(z0, c[i + 1]);
        z1 = Math.max(z1, c[i + 1]);
      }
      for (let i = Math.floor(x0 / 25); i <= Math.floor(x1 / 25); i++)
        for (let j = Math.floor(z0 / 25); j <= Math.floor(z1 / 25); j++) {
          const k = i * 100000 + j;
          let l = WALL_BI.get(k);
          if (!l) WALL_BI.set(k, (l = []));
          l.push(c);
        }
    }
  }
  const l = WALL_BI.get(Math.floor(x / 25) * 100000 + Math.floor(z / 25));
  if (!l) return false;
  for (const c of l) if (pip(x, z, c)) return true;
  return false;
}
function wallIntoBuildings(c) {
  const o = c.slice(),
    n = o.length;
  const grow = (ix, jx) => {
    // end point ix, the point before it jx
    const x = o[ix],
      z = o[ix + 1],
      dx = x - o[jx],
      dz = z - o[jx + 1],
      L = Math.hypot(dx, dz);
    if (L < 0.05) return;
    for (let t = 0.25; t <= 2.5; t += 0.25)
      if (wallBuildingAt(x + (dx / L) * t, z + (dz / L) * t)) {
        o[ix] = x + (dx / L) * (t + 1);
        o[ix + 1] = z + (dz / L) * (t + 1);
        return;
      }
  };
  grow(0, 2);
  grow(n - 2, n - 4);
  return o;
}
const WALLS = { n: 0, km: 0, meshes: [] };
function buildWalls() {
  let { list, nt, KIND, MAT, COLS, CELLS } = buildWallsPart1();
  const { bucket, quad } = buildWallsPart2(CELLS);
  let km = 0,
    n = 0;
  const { pieces } = buildWallsPart3(list);
  for (const [kind, h, mat0, c0] of pieces) {
    const K = KIND[kind];
    if (!K || c0.length < 4) continue;
    const c = c0.slice();
    const H = h > 0.4 && h < 6 ? h : K[0],
      T = K[1],
      mat = K[2];
    const R = mulberry((Math.round(c[0] * 3) * 7919 + Math.round(c[1] * 3)) | 0);
    const pal = COLS[mat],
      col = pal ? pal[Math.floor(R() * pal.length)] : [1, 1, 1];
    const shade = (k) => col.map((v) => v * k);
    let run = 0;
    // v1.0.6 (Jonay: «tampoco debería haber huecos entre muros, deberían ser continuos»): mitred corners (each vertex offset
    // along the bisector, so the faces of two pieces meet) and the two ends pushed out half a thickness (where two walls of
    // the map meet they overlap instead of leaving a wedge)
    const nv = c.length / 2,
      off = [];
    for (let v = 0; v < nv; v++) {
      const nrm = (a, b) => {
        const dx = c[2 * b] - c[2 * a],
          dz = c[2 * b + 1] - c[2 * a + 1],
          L = Math.hypot(dx, dz) || 1;
        return [-dz / L, dx / L];
      };
      const n1 = v > 0 ? nrm(v - 1, v) : null,
        n2 = v < nv - 1 ? nrm(v, v + 1) : null;
      if (!n1 || !n2) {
        const q = n1 || n2;
        off.push([(q[0] * T) / 2, (q[1] * T) / 2]);
        continue;
      }
      let mx = n1[0] + n2[0],
        mz = n1[1] + n2[1];
      const ml = Math.hypot(mx, mz);
      if (ml < 0.2) {
        off.push([(n1[0] * T) / 2, (n1[1] * T) / 2]);
        continue;
      } // almost turning back: plain
      mx /= ml;
      mz /= ml;
      const cs = Math.max(0.35, mx * n1[0] + mz * n1[1]);
      off.push([(mx * T) / 2 / cs, (mz * T) / 2 / cs]);
    }
    if (T > 0.06 && nv >= 2)
      for (const [e, f] of [
        [0, 1],
        [nv - 1, nv - 2]
      ]) {
        const dx = c[2 * e] - c[2 * f],
          dz = c[2 * e + 1] - c[2 * f + 1],
          L = Math.hypot(dx, dz) || 1;
        c[2 * e] += ((dx / L) * T) / 2;
        c[2 * e + 1] += ((dz / L) * T) / 2;
      }
    for (let i = 0; i + 3 < c.length; i += 2) {
      const ax = c[i],
        az = c[i + 1],
        bx = c[i + 2],
        bz = c[i + 3],
        L = Math.hypot(bx - ax, bz - az);
      if (L < 0.05) continue;
      const oa = off[i / 2],
        ob = off[i / 2 + 1],
        k = Math.max(1, Math.ceil(L / 5));
      km += L; // pieces of up to 5 m following the ground
      const ground = Array.from({ length: k + 1 }, (_, j) => heightAt(lerp(ax, bx, j / k), lerp(az, bz, j / k)));
      const gmin = Math.min(...ground),
        gmax = Math.max(...ground);
      if (roadBarrierHit(ax, az, bx, bz, gmin - 0.85, gmax + H - 0.2, -0.5)) continue;
      const b = bucket(mat, ax, az);
      for (let j = 0; j < k; j++) {
        const t0_ = j / k,
          t1_ = (j + 1) / k;
        const x0 = ax + (bx - ax) * t0_,
          z0 = az + (bz - az) * t0_,
          x1 = ax + (bx - ax) * t1_,
          z1 = az + (bz - az) * t1_;
        const ox0 = oa[0] + (ob[0] - oa[0]) * t0_,
          oz0 = oa[1] + (ob[1] - oa[1]) * t0_,
          ox1 = oa[0] + (ob[0] - oa[0]) * t1_,
          oz1 = oa[1] + (ob[1] - oa[1]) * t1_;
        const g0 = ground[j],
          g1 = ground[j + 1];
        const y0 = g0 - 0.4,
          y1 = g1 - 0.4,
          t0 = g0 + H,
          t1 = g1 + H;
        if (mat === 'valla') {
          quad(b, [x0, g0 - 0.03, z0], [x1, g1 - 0.03, z1], [x1, t1, z1], [x0, t0, z0], col, [
            (run + (L * j) / k) / 0.13,
            (run + (L * (j + 1)) / k) / 0.13
          ]);
          continue;
        } // bars every 13 cm
        quad(b, [x0 + ox0, y0, z0 + oz0], [x1 + ox1, y1, z1 + oz1], [x1 + ox1, t1, z1 + oz1], [x0 + ox0, t0, z0 + oz0], shade(0.94)); // one side
        if (T > 0.06) {
          quad(b, [x1 - ox1, y1, z1 - oz1], [x0 - ox0, y0, z0 - oz0], [x0 - ox0, t0, z0 - oz0], [x1 - ox1, t1, z1 - oz1], shade(0.9)); // the other side
          quad(
            b,
            [x0 + ox0, t0, z0 + oz0],
            [x1 + ox1, t1, z1 + oz1],
            [x1 - ox1, t1, z1 - oz1],
            [x0 - ox0, t0, z0 - oz0],
            shade(mat === 'cal' ? 0.8 : 1)
          ); // the top
        }
      }
      if (T > 0.06)
        for (const [ex, ez, s, o, end] of [
          [ax, az, -1, oa, i === 0],
          [bx, bz, 1, ob, i + 4 >= c.length]
        ]) {
          if (!end) continue;
          const g = heightAt(ex, ez); // only the two ends of the wall get a face
          quad(
            b,
            [ex - o[0] * s, g - 0.4, ez - o[1] * s],
            [ex + o[0] * s, g - 0.4, ez + o[1] * s],
            [ex + o[0] * s, g + H, ez + o[1] * s],
            [ex - o[0] * s, g + H, ez - o[1] * s],
            shade(0.86)
          );
        }
      COL.addSeg(ax, az, bx, bz, gmin - 0.5, gmax + H, kind);
      run += L;
    }
    n++;
  }
  buildWallsPart4(CELLS, MAT);
  WALLS.n = n;
  WALLS.km = Math.round(km / 100) / 10;
  console.log('muros y vallas', n, 'tapias del inicio', nt, WALLS.km, 'km', CELLS.size, 'mallas');
  return n;
}
/** (v1.1.7, code quality) part of buildWalls */
function buildWallsPart4(CELLS, MAT) {
  for (const b of CELLS.values()) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(b.c, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2));
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, MAT[b.mat]);
    m.castShadow = b.mat !== 'valla';
    m.receiveShadow = true;
    m.userData.muros = true;
    scene.add(m);
    WALLS.meshes.push(m);
  }
}
/** (v1.1.7, code quality) part of buildWalls: v1.0.8 (Jonay: «aquí se choca el coche», Vía de Ronda X 378, Y −270): a wall of the map under a carriageway as the game */
function buildWallsPart3(list) {
  // v1.0.8 (Jonay: «aquí se choca el coche», Vía de Ronda X 378, Y −270): a wall of the map under a carriageway as the game
  // draws it (wider than in the OSM, or raised over the ground) is cut there; it collided unseen under the road
  const pieces = [];
  const simp = (r) => {
    const o = [r[0], r[1]];
    for (let k = 2; k + 3 < r.length + 2 && k < r.length - 2; k += 2) {
      const ax = o[o.length - 2],
        az = o[o.length - 1],
        bx = r[k],
        bz = r[k + 1],
        ex = r[k + 2],
        ez = r[k + 3];
      const L = Math.hypot(ex - ax, ez - az) || 1;
      if (Math.abs((bx - ax) * (ez - az) - (bz - az) * (ex - ax)) / L > 0.12) o.push(bx, bz);
    }
    o.push(r[r.length - 2], r[r.length - 1]);
    return o;
  }; // back to the corners
  for (const w of list) {
    const [kind, h, mat0, raw] = w;
    if (raw.length < 4) continue;
    const c0 = wallIntoBuildings(raw);
    let run = [];
    const flush = () => {
      if (run.length >= 4) pieces.push([kind, h, mat0, simp(run)]);
      run = [];
    };
    for (let i = 0; i + 3 < c0.length; i += 2) {
      const ax = c0[i],
        az = c0[i + 1],
        bx = c0[i + 2],
        bz = c0[i + 3],
        L = Math.hypot(bx - ax, bz - az),
        n = Math.max(1, Math.ceil(L / 0.4));
      for (let t = i ? 1 : 0; t <= n; t++) {
        const x = ax + ((bx - ax) * t) / n,
          z = az + ((bz - az) * t) / n;
        const ground = heightAt(x, z);
        const clearance = kind === 'hedge' ? 0.65 : 0.4;
        if (roadAtBarrier(x, z, ground - 1, ground + (h > 0.4 && h < 6 ? h : 2.6), clearance)) flush();
        else run.push(x, z);
      }
    }
    flush();
  }
  return { pieces };
}
/** (v1.1.7, code quality) part of buildWalls */
function buildWallsPart2(CELLS) {
  const CS = 300;
  const bucket = (mat, x, z) => {
    const k = mat + ':' + Math.floor(x / CS) + ',' + Math.floor(z / CS);
    let b = CELLS.get(k);
    if (!b) {
      b = { mat, p: [], c: [], uv: [] };
      CELLS.set(k, b);
    }
    return b;
  };
  const quad = (b, a1, a2, b2, b1, col, uv) => {
    b.p.push(...a1, ...a2, ...b2, ...a1, ...b2, ...b1);
    for (let i = 0; i < 6; i++) b.c.push(...col);
    const [u0, u1] = uv || [0, 0];
    b.uv.push(u0, 0, u1, 0, u1, 1, u0, 0, u1, 1, u0, 1);
  };
  return { bucket, quad };
}
/** (v1.1.7, code quality) part of buildWalls: height (m above the ground), thickness, material */
function buildWallsPart1() {
  const list = (DATA.BW || []).slice();
  let nt = 0;
  try {
    const t = inicioTapias();
    nt = t.length;
    for (const w of t) list.push(w);
  } catch (e) {
    console.error('tapias', e);
  }
  try {
    for (const w of cascoSolares()) list.push(w); // v1.4.50
  } catch (e) {
    console.error('solares', e);
  }
  // height (m above the ground), thickness, material
  const KIND = {
    wall: [2.2, 0.3, 'cal'],
    tapia: [2.6, 0.3, 'cal'],
    city_wall: [3.2, 0.6, 'piedra'],
    retaining_wall: [1.1, 0.45, 'piedra'],
    fence: [1.8, 0.05, 'valla'],
    wire_fence: [1.6, 0.04, 'valla'],
    wood_fence: [1.3, 0.07, 'madera'],
    hedge: [1.4, 0.9, 'seto']
  };
  const MAT = {
    cal: plasterWorld(new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.95 }), 1, 0.95, 'cal', 2.4), // v1.4.1: whitewash (Poly Haven plaster)
    piedra: (() => {
      const m = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 1 });
      stoneWorld(m, false); // v1.4.0: stone walls with the photo of basalt (02_textures.js)
      return m;
    })(),
    valla: new THREE.MeshStandardMaterial({
      color: 0x343a36,
      roughness: 0.55,
      metalness: 0.5,
      map: railTex(),
      alphaTest: 0.5,
      side: THREE.DoubleSide
    }), // v1.0.6: iron bars and rails, not a see-through grey panel (Jonay: «¿esto qué es?»)
    madera: new THREE.MeshStandardMaterial({ color: 0x86663f, roughness: 0.9 }),
    seto: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 1 })
  };
  const COLS = {
    cal: [
      [0.93, 0.91, 0.86],
      [0.95, 0.94, 0.9],
      [0.89, 0.85, 0.77],
      [0.92, 0.88, 0.8]
    ],
    piedra: [
      [0.42, 0.4, 0.38],
      [0.5, 0.47, 0.43],
      [0.36, 0.35, 0.34]
    ],
    seto: [
      [0.22, 0.38, 0.18],
      [0.26, 0.42, 0.2]
    ]
  };
  const CELLS = new Map();
  return { list, nt, KIND, MAT, COLS, CELLS };
}
