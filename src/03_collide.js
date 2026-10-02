// ============ static collision grid ============
const COL = (() => {
  const CS = 16, gx0 = -2500, gz0 = -2000, NX = Math.ceil(5000 / CS), NZ = Math.ceil(4000 / CS);
  const segCells = new Map(); const circCells = new Map();
  const segs = []; // flat x1,z1,x2,z2
  const circs = []; // x,z,r
  const key = (i, j) => i * 10000 + j;
  function addTo(map, i, j, id) { const k = key(i, j); let a = map.get(k); if (!a) { a = []; map.set(k, a); } a.push(id); }
  // optional vertical extent [y0, y1]: a query made at height Q.y (COL.qy) ignores obstacles it passes over or under
  const segY = [], circY = []; const Q = { y: null };
  function addSeg(x1, z1, x2, z2, y0 = -1e9, y1 = 1e9) {
    const id = segs.length / 4; segs.push(x1, z1, x2, z2); segY.push(y0, y1);
    const i0 = Math.floor((Math.min(x1, x2) - gx0 - 1) / CS), i1 = Math.floor((Math.max(x1, x2) - gx0 + 1) / CS);
    const j0 = Math.floor((Math.min(z1, z2) - gz0 - 1) / CS), j1 = Math.floor((Math.max(z1, z2) - gz0 + 1) / CS);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) addTo(segCells, i, j, id);
  }
  function addCirc(x, z, r, y0, y1) { if (y0 === undefined) { const g = heightAt(x, z); y0 = g - 1; y1 = g + 3.4; } // trunks, posts, kiosks: a deck passing above clears them
    const id = circs.length / 3; circs.push(x, z, r); circY.push(y0, y1);
    const i0 = Math.floor((x - r - gx0) / CS), i1 = Math.floor((x + r - gx0) / CS), j0 = Math.floor((z - r - gz0) / CS), j1 = Math.floor((z + r - gz0) / CS);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) addTo(circCells, i, j, id);
  }
  const seen = new Set();
  // resolve circle; returns {x,z,nx,nz,hit,depth}
  const res = { x: 0, z: 0, nx: 0, nz: 0, hit: false, depth: 0 };
  function resolve(x, z, r, withCircles = true) {
    res.hit = false; res.nx = 0; res.nz = 0; res.depth = 0;
    for (let iter = 0; iter < 3; iter++) {
      let moved = false;
      const i0 = Math.floor((x - r - gx0) / CS), i1 = Math.floor((x + r - gx0) / CS), j0 = Math.floor((z - r - gz0) / CS), j1 = Math.floor((z + r - gz0) / CS);
      seen.clear();
      for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
        const a = segCells.get(key(i, j)); if (!a) continue;
        for (const id of a) {
          if (seen.has(id)) continue; seen.add(id); if (Q.y !== null && (Q.y > segY[id * 2 + 1] + 0.3 || Q.y < segY[id * 2] - 2.2)) continue;
          const o = id * 4, x1 = segs[o], z1 = segs[o + 1], x2 = segs[o + 2], z2 = segs[o + 3];
          const dx = x2 - x1, dz = z2 - z1, L2 = dx * dx + dz * dz || 1;
          let t = ((x - x1) * dx + (z - z1) * dz) / L2; t = t < 0 ? 0 : t > 1 ? 1 : t;
          const px = x1 + dx * t, pz = z1 + dz * t; let ex = x - px, ez = z - pz; const d2 = ex * ex + ez * ez;
          if (d2 < r * r) {
            let d = Math.sqrt(d2);
            if (d < 1e-4) { ex = dz; ez = -dx; d = Math.hypot(ex, ez); }
            const nx = ex / d, nz = ez / d, pen = r - d;
            x += nx * pen; z += nz * pen; res.nx += nx * pen; res.nz += nz * pen; res.depth = Math.max(res.depth, pen); res.hit = true; moved = true;
          }
        }
        if (withCircles) {
          const c = circCells.get(key(i, j)); if (!c) continue;
          for (const id of c) { if (Q.y !== null && (Q.y > circY[id * 2 + 1] + 0.3 || Q.y < circY[id * 2] - 2.2)) continue;
            const o = id * 3, cx = circs[o], cz = circs[o + 1], cr = circs[o + 2] + r;
            const ex = x - cx, ez = z - cz, d2 = ex * ex + ez * ez;
            if (d2 < cr * cr && d2 > 1e-6) { const d = Math.sqrt(d2), pen = cr - d; x += ex / d * pen; z += ez / d * pen; res.nx += ex / d * pen; res.nz += ez / d * pen; res.depth = Math.max(res.depth, pen); res.hit = true; moved = true; }
          }
        }
      }
      if (!moved) break;
    }
    const L = Math.hypot(res.nx, res.nz); if (L > 0) { res.nx /= L; res.nz /= L; }
    res.x = x; res.z = z; return res;
  }
  // segment intersection test for camera / line of sight: returns t (0..1) of first hit or 1
  function raycast(x1, z1, x2, z2) {
    let best = 1; const minx = Math.min(x1, x2), maxx = Math.max(x1, x2), minz = Math.min(z1, z2), maxz = Math.max(z1, z2);
    seen.clear();
    for (let i = Math.floor((minx - gx0) / CS); i <= Math.floor((maxx - gx0) / CS); i++) for (let j = Math.floor((minz - gz0) / CS); j <= Math.floor((maxz - gz0) / CS); j++) {
      const a = segCells.get(key(i, j)); if (!a) continue;
      for (const id of a) {
        if (seen.has(id)) continue; seen.add(id);
        const o = id * 4, ax = segs[o], az = segs[o + 1], bx = segs[o + 2], bz = segs[o + 3];
        const rx = x2 - x1, rz = z2 - z1, sx = bx - ax, sz = bz - az; const den = rx * sz - rz * sx; if (Math.abs(den) < 1e-9) continue;
        const t = ((ax - x1) * sz - (az - z1) * sx) / den, u = ((ax - x1) * rz - (az - z1) * rx) / den;
        if (t >= 0 && t < best && u >= 0 && u <= 1) best = t;
      }
    }
    return best;
  }
  function nearSeg(x, z, r) { return resolve(x, z, r, false).hit; }
  function segsNear(x, z, r) { const out = new Set(); for (let i = Math.floor((x - r - gx0) / CS); i <= Math.floor((x + r - gx0) / CS); i++) for (let j = Math.floor((z - r - gz0) / CS); j <= Math.floor((z + r - gz0) / CS); j++) { const a = segCells.get(key(i, j)); if (a) for (const id of a) out.add(id); } return [...out]; }
  return { addSeg, addCirc, resolve, raycast, nearSeg, segs, segsNear, set qy(v) { Q.y = v; }, get qy() { return Q.y; } };
})();
