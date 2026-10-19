// ============ Avenida de La Trinidad (v0.68, Jonay's captures in docs/referencias/av_trinidad/) ============
// The avenue is a split carriageway with the tram down the middle. In the game the carriageways were 9 m (two lanes
// each) and the buildings stood on the pavement; now each one is 6.6 m (one lane + parking, as the real one), the
// buildings are trimmed back to the pavement line, and the empty lots along it get terraced blocks like their
// neighbours. Two Indigo car parks: «Trinidad Casco Histórico» (blue ramp in the middle of the split carriageway at
// the top of the avenue, Av. Trinidad 3) and «Trinidad Centro» (blue ramp beside the pavement, with the yellow box
// grid, at Av. Trinidad 59 next to the Dialprix, just above Calle Pedro Zerolo). At Pedro Zerolo: yellow box grid
// where the tram crosses and zebra crossings. Arcades (soportales) at the Dialprix block and at n.º 76.
const TRI = { ok: false };
const TRI_NAME = 'Avenida de La Trinidad', TRI_SIDEWALK = 2.6;
// the two carriageways as polylines from the top of the avenue (old town) down to Padre Anchieta
function trinidadGeo() {
  if (TRI.ok || TRI.fail) return TRI.ok ? TRI : null;
  const rs = []; DATA.R.forEach((r, ri) => { if (r[1] >= 0 && STR[r[1]] === TRI_NAME && r[0] <= 12) rs.push(ri); });
  if (rs.length < 2) { TRI.fail = true; return null; }
  const P = (ri, i) => [DATA.R[ri][4][i], DATA.R[ri][4][i + 1]], first = (ri) => P(ri, 0), last = (ri) => P(ri, DATA.R[ri][4].length - 2);
  const near = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.6;
  const plaza = typeof PLAZA !== 'undefined' ? [PLAZA.x, PLAZA.z] : [0, 0];
  const chain = (fwd) => { // fwd: follow the way direction (starts at the top); else backwards (ends at the top)
    let cur = rs.slice().sort((a, b) => { const pa = fwd ? first(a) : last(a), pb = fwd ? first(b) : last(b); return Math.hypot(pa[0] - plaza[0], pa[1] - plaza[1]) - Math.hypot(pb[0] - plaza[0], pb[1] - plaza[1]); })[0];
    const used = new Set([cur]); const pts = []; const add = (ri) => { const c = DATA.R[ri][4]; const q = []; for (let i = 0; i < c.length; i += 2) q.push([c[i], c[i + 1]]); if (!fwd) q.reverse(); for (const p of q) if (!pts.length || !near(pts[pts.length - 1], p)) pts.push(p); };
    add(cur); for (;;) { const end = pts[pts.length - 1]; const nx = rs.find((ri) => !used.has(ri) && near(fwd ? first(ri) : last(ri), end)); if (nx === undefined) break; used.add(nx); add(nx); }
    return { pts, w: DATA.R[cur][2], used };
  };
  const A = chain(true), B = chain(false); if (A.pts.length < 2 || B.pts.length < 2) { TRI.fail = true; return null; }
  const mk = (c) => { const s = [0]; for (let i = 1; i < c.pts.length; i++) s.push(s[i - 1] + Math.hypot(c.pts[i][0] - c.pts[i - 1][0], c.pts[i][1] - c.pts[i - 1][1])); c.s = s; c.len = s[s.length - 1];
    c.at = (q) => { q = clamp(q, 0, c.len); let i = 1; while (i < s.length - 1 && s[i] < q) i++; const a = c.pts[i - 1], b = c.pts[i], L = s[i] - s[i - 1] || 1, t = (q - s[i - 1]) / L; return { x: a[0] + (b[0] - a[0]) * t, z: a[1] + (b[1] - a[1]) * t, ux: (b[0] - a[0]) / L, uz: (b[1] - a[1]) / L }; };
    c.proj = (x, z) => { let best = { d: 1e9 }; for (let i = 0; i < c.pts.length - 1; i++) { const a = c.pts[i], b = c.pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L2 = dx * dx + dz * dz || 1; const t = clamp(((x - a[0]) * dx + (z - a[1]) * dz) / L2, 0, 1); const px = a[0] + dx * t, pz = a[1] + dz * t, d = Math.hypot(x - px, z - pz); if (d < best.d) best = { d, s: c.s[i] + t * Math.sqrt(L2), px, pz }; } return best; };
    return c; };
  mk(A); mk(B);
  // the outer side of each carriageway (the pavement, away from the other one): +1 = to the left of the travel line
  for (const [c, o] of [[A, B], [B, A]]) { const p = c.at(c.len * 0.4); const l = [p.x - p.uz * 8, p.z + p.ux * 8]; c.out = o.proj(l[0], l[1]).d > o.proj(p.x + p.uz * 8, p.z - p.ux * 8).d ? 1 : -1; }
  // the west chain is the one going down (A, from the top), the east one comes up (B, taken from the top as well)
  Object.assign(TRI, { ok: true, A, B, mid: (q) => { const p = A.at(q), r = B.proj(p.x, p.z); return { x: (p.x + r.px) / 2, z: (p.z + r.pz) / 2, ux: p.ux, uz: p.uz }; } });
  // Calle Pedro Zerolo: where it meets the two carriageways
  const pz = []; DATA.R.forEach((r, ri) => { if (r[1] >= 0 && STR[r[1]] === 'Calle Pedro Zerolo') pz.push(ri); });
  let jA = null, jB = null; for (const ri of pz) { const c = DATA.R[ri][4]; for (let i = 0; i < c.length; i += 2) { const a = A.proj(c[i], c[i + 1]), b = B.proj(c[i], c[i + 1]); if (a.d < 1 && (!jA || a.d < jA.d)) jA = { ...a, ri }; if (b.d < 1 && (!jB || b.d < jB.d)) jB = { ...b, ri }; } }
  if (jB && !jA) jA = A.proj(jB.px, jB.pz); // Pedro Zerolo only reaches the carriageway that comes up: the other one, straight across
  TRI.pz = jA && jB ? { a: jA, b: jB } : null;
  // the «Trinidad Centro» ramp (Av. Trinidad 59): on the carriageway that comes up (B), beside its pavement, starting ~14 m
  // above the Pedro Zerolo junction and going down towards the top of the avenue; the pavement goes round it
  if (TRI.pz) { const s0 = TRI.pz.b.s - 16, s1 = s0 - 46; TRI.rampB = { s0, s1, v: B.out * (B.w / 2 + 2.0) }; }
  // the «Casco Histórico» ramp: in the middle, from 20 m down the avenue to the hall (60 m long, centred 102 m down)
  { const m = TRI.mid(102), t = TRI.mid(20); TRI.hallA = { x: m.x, z: m.z, ux: m.ux, uz: m.uz, L: 60 }; TRI.rampA = { x0: t.x, z0: t.z, x1: m.x - m.ux * 26.5, z1: m.z - m.uz * 26.5 }; }
  return TRI;
}
// in 01_core-time terms this runs before the roads are indexed: one lane + parking per carriageway, like the real one
function trinidadWidths() { for (const r of DATA.R) if (r[1] >= 0 && STR[r[1]] === 'Avenida de La Trinidad' && r[0] <= 12 && r[2] > 6.6) r[2] = 6.6; } // called from 01_core (the consts of this file don't exist yet then)
// clearance from the carriageway centre line: half the road + pavement (+ the ramp beside the pavement at n.º 59)
function trinidadClear(c, s) { let k = c.w / 2 + TRI_SIDEWALK; const r = TRI.rampB; if (r && c === TRI.B && s < r.s0 + 18 && s > r.s1 - 4) k += 4.0; return k; }
// buildings: every corner that stands on the carriageway or the pavement of the avenue goes back to the pavement line
function streetTrim(pts) {
  const T = trinidadGeo(); if (!T) return pts; let moved = false; const out = pts.map((p) => p.slice());
  for (const q of out) for (const c of [T.A, T.B]) { const r = c.proj(q[0], q[1]); const k = trinidadClear(c, r.s); if (r.d < k && r.d > 0.4) { const f = k / r.d; q[0] = r.px + (q[0] - r.px) * f; q[1] = r.pz + (q[1] - r.pz) * f; moved = true; } }
  if (!moved) return pts; const a0 = polyArea(pts), a1 = polyArea(out);
  return Math.sign(a0) === Math.sign(a1) && Math.abs(a1) > Math.abs(a0) * 0.35 && Math.abs(a1) > 25 ? out : pts;
}
// empty lots along the avenue (Jonay: «zonas que tienen casas y ahora están despejadas»): terraced blocks like the neighbours
function trinidadFill() {
  const T = trinidadGeo(); if (!T) return 0;
  const boxes = DATA.B.map((b) => { const c = b[6]; let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9; for (let i = 0; i < c.length; i += 2) { x0 = Math.min(x0, c[i]); x1 = Math.max(x1, c[i]); z0 = Math.min(z0, c[i + 1]); z1 = Math.max(z1, c[i + 1]); } return [x0, x1, z0, z1]; });
  const near = []; DATA.B.forEach((b, i) => { const bb = boxes[i]; const cx = (bb[0] + bb[1]) / 2, cz = (bb[2] + bb[3]) / 2; if (Math.min(T.A.proj(cx, cz).d, T.B.proj(cx, cz).d) < 70) near.push(i); });
  const inB = (x, z) => { for (const i of near) { const bb = boxes[i]; if (x < bb[0] || x > bb[1] || z < bb[2] || z > bb[3]) continue; if (pip(x, z, DATA.B[i][6])) return true; } return false; };
  const BLOCK = new Set(['park', 'garden', 'pitch', 'playground', 'parking', 'square', 'sports', 'cemetery', 'water', 'forest'].map((t) => DATA.AT.indexOf(t)));
  const areas = DATA.A.filter((a) => BLOCK.has(a[0]) && a[2].length > 5 && Math.min(T.A.proj(a[2][0], a[2][1]).d, T.B.proj(a[2][0], a[2][1]).d) < 160);
  const inArea = (x, z) => areas.some((a) => pip(x, z, a[2]));
  const tramNear = (x, z, m) => { const t = DATA.T; for (let i = 0; i < t.length - 2; i += 2) { const dx = t[i + 2] - t[i], dz = t[i + 3] - t[i + 1], L2 = dx * dx + dz * dz || 1; const u = clamp(((x - t[i]) * dx + (z - t[i + 1]) * dz) / L2, 0, 1); if (Math.hypot(x - t[i] - dx * u, z - t[i + 1] - dz * u) < m) return true; } return false; };
  const hit = (rd) => !!rd && rd.d < DATA.R[rd.ri][2] / 2 + 1.6; const onRoad = (x, z) => hit(ROADSEG.nearest(x, z, (r) => r[0] <= 12)) || hit(ROADSEG.nearest(x, z));
  const free = (x, z) => !inB(x, z) && !onRoad(x, z) && !inArea(x, z) && !tramNear(x, z, 5) && Math.min(T.A.proj(x, z).d, T.B.proj(x, z).d) > 5.5;
  let added = 0; let seed = 7; const rr = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (const c of [T.A, T.B]) {
    const runs = []; let run = null;
    for (let s = 6; s < c.len - 25; s += 2) { const p = c.at(s), nx = -p.uz * c.out, nz = p.ux * c.out, f0 = trinidadClear(c, s) + 0.2;
      let dep = 0; for (let d = 1; d <= 17; d += 2) { if (!free(p.x + nx * (f0 + d), p.z + nz * (f0 + d))) break; dep = d + 1; }
      if (dep >= 8) { if (run && s - run.s1 <= 2) { run.s1 = s; run.dep = Math.min(run.dep, dep); } else { run = { s0: s, s1: s, dep }; runs.push(run); } } else run = null; }
    for (const r of runs) { const L = r.s1 - r.s0 - 2; if (L < 12) continue; const n = Math.max(1, Math.round(L / 13)); const lot = L / n;
      for (let k = 0; k < n; k++) { const sa = r.s0 + 1 + k * lot + 0.15, sb = sa + lot - 0.3; const dep = Math.min(r.dep, 10 + Math.floor(rr() * 5));
        const pa = c.at(sa), pb = c.at(sb); const fa = trinidadClear(c, sa) + 0.2, fb = trinidadClear(c, sb) + 0.2; const na = [-pa.uz * c.out, pa.ux * c.out], nb = [-pb.uz * c.out, pb.ux * c.out];
        const poly = [[pa.x + na[0] * fa, pa.z + na[1] * fa], [pb.x + nb[0] * fb, pb.z + nb[1] * fb], [pb.x + nb[0] * (fb + dep), pb.z + nb[1] * (fb + dep)], [pa.x + na[0] * (fa + dep), pa.z + na[1] * (fa + dep)]];
        if (!poly.every((q) => free(q[0], q[1]))) continue;
        // like the nearest real building of the avenue: style, floors (± 1) and roof
        let nb0 = null, bd = 1e9; for (const i of near) { const bb = boxes[i]; const d = Math.hypot((bb[0] + bb[1]) / 2 - poly[0][0], (bb[2] + bb[3]) / 2 - poly[0][1]); if (d < bd && DATA.B[i][1] !== 4) { bd = d; nb0 = DATA.B[i]; } }
        const lv = clamp((nb0 ? nb0[2] : 5) + Math.round(rr() * 2 - 1), 3, 8); const style = nb0 ? nb0[1] : 2;
        DATA.B.push([lv * 32 + 1, style, lv, nb0 ? nb0[3] : 0, -1, Math.floor(rr() * 1000), poly.flat()]); boxes.push([Math.min(...poly.map((q) => q[0])), Math.max(...poly.map((q) => q[0])), Math.min(...poly.map((q) => q[1])), Math.max(...poly.map((q) => q[1]))]); near.push(DATA.B.length - 1); added++; } }
  }
  console.log('trinidad: casas nuevas', added); TRI.added = added; return added;
}
// the median islands stay off the «Casco Histórico» ramp (buildMedians runs before the car parks)
function triRampZone(x, z) { const T = trinidadGeo(); if (!T || !T.rampA) return false; const r = T.rampA, dx = r.x1 - r.x0, dz = r.z1 - r.z0, L2 = dx * dx + dz * dz || 1; const t = clamp(((x - r.x0) * dx + (z - r.z0) * dz) / L2, -0.08, 1.05); return Math.hypot(x - r.x0 - dx * t, z - r.z0 - dz * t) < 4.2; }
// ---------- paint on the asphalt: a canvas texture on a grid that follows the ground
function triDecal(cx, cz, ux, uz, len, wid, draw, y0 = 0.19) {
  const px = 40, cw = Math.max(16, Math.round(wid * px)), ch = Math.max(16, Math.round(len * px)); const c = mkCanvas(cw, ch), x = c.getContext('2d'); draw(x, cw, ch, px);
  const nu = Math.max(1, Math.ceil(len / 2)), nv = Math.max(1, Math.ceil(wid / 2)); const g = new THREE.PlaneGeometry(wid, len, nv, nu); const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const v = p.getX(i), u = -p.getY(i); const X = cx + ux * u - uz * v, Z = cz + uz * u + ux * v; p.setXYZ(i, X, heightAt(X, Z) + y0, Z); }
  g.computeVertexNormals(); const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: canvasTex(c, { repeat: false }), transparent: true, depthWrite: false, roughness: 0.8, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -8 }));
  m.material.side = THREE.DoubleSide; m.renderOrder = 2; scene.add(m); return m;
}
const yellowBox = (x, w, h, k) => { x.strokeStyle = '#f2c230'; x.lineWidth = 0.14 * k; x.strokeRect(0.1 * k, 0.1 * k, w - 0.2 * k, h - 0.2 * k); x.beginPath(); for (let d = -h; d < w + h; d += 1.6 * k) { x.moveTo(d, 0); x.lineTo(d + h, h); x.moveTo(d + h, 0); x.lineTo(d, h); } x.save(); x.rect(0, 0, w, h); x.clip(); x.stroke(); x.restore(); };
const zebra = (x, w, h, k) => { x.fillStyle = '#f4f4ee'; for (let v = 0.3 * k; v < w - 0.3 * k; v += 1.0 * k) x.fillRect(v, 0.2 * k, 0.5 * k, h - 0.4 * k); };
// ---------- the two Indigo car parks (built with the 05m_parking.js machinery)
function trinidadParking() {
  const T = trinidadGeo(); if (!T) return;
  const blue = [0.12, 0.38, 0.75];
  const depthAt = (F, L) => { let gmin = 1e9; for (let u = -L / 2; u <= L / 2; u += 6) for (let v = -15; v <= 15; v += 5) { const [x, z] = F.W(u, v); gmin = Math.min(gmin, heightAt(x, z)); } return gmin - 5.4; };
  const frame = (x, z, ux, uz) => { const F = { cx: x, cz: z, ux, uz }; F.W = (u, v) => [F.cx + F.ux * u - F.uz * v, F.cz + F.uz * u + F.ux * v]; return F; };
  const stairs = (F, L, yF, rampV, rampEnd) => { // pedestrian stairwells on real pavement, one each side if possible
    const swOk = (u0, v0, du, dv) => { for (let t = -1; t <= 8.5; t += 0.75) for (const q of [-1.4, 0, 1.4]) { const [x, z] = F.W(u0 + du * t - dv * q, v0 + dv * t + du * q); if (inAnyBuilding(x, z) || onCarriagewayEarly(x, z) || COL.nearSeg(x, z, 0.3)) return false; } return true; };
    const found = []; for (const side of [1, -1]) { let best = null;
      for (let av = 9; av <= 34 && !best; av += 0.7) for (let uu = -34; uu <= 34 && !best; uu += 2) for (const [du, dv] of [[1, 0], [-1, 0], [0, -side]]) {
        const ue = du ? uu + du * 11.5 : uu; if (Math.abs(ue) > L / 2 - 2.5) continue; if (dv && av < 24) continue; if (Math.abs(rampEnd - ue) < 6 && Math.sign(rampV) === side) continue;
        if (swOk(uu, side * av, du, dv)) { best = { u: uu, v: side * av, du, dv, ue }; break; } }
      if (best) found.push(best); }
    return found; };
  // v0.76 (Jonay): ONE car park under the whole avenue, from below the top ramp («Casco Histórico») down to the
  // «Trinidad Centro» ramp near Pedro Zerolo (~420 m): a chain of straight halls along the median that slope with the
  // avenue, open to each other, 7 m under the lowest ground around (the old two halls were 5.4 m down: things showed
  // through the ceiling). Stairs to both pavements every other hall.
  const DEPTH = 7.0, r = T.rampB, B = T.B; const t0 = r ? B.at(r.s0) : null, t1 = r ? B.at(r.s1) : null; const nB = t1 ? [-t1.uz, t1.ux] : null;
  const botB = r ? [t1.x + nB[0] * r.v, t1.z + nB[1] * r.v] : null, topB = r ? [t0.x + nB[0] * r.v, t0.z + nB[1] * r.v] : null;
  const sA = 72, sE = r ? T.A.proj(B.at(r.s1 + 3.5).x, B.at(r.s1 + 3.5).z).s : 132; const nSeg = Math.max(1, Math.round((sE - sA) / 60));
  const node = (s) => T.mid(s); const N = []; for (let k = 0; k <= nSeg; k++) { const s = sA + (sE - sA) * k / nSeg; const m = node(s); N.push({ s, x: m.x, z: m.z }); }
  const gmin = (x, z, ux, uz) => { let g = 1e9; for (let a = -24; a <= 24; a += 6) for (let v = -15.5; v <= 15.5; v += 5.15) g = Math.min(g, heightAt(x + ux * a - uz * v, z + uz * a + ux * v)); return g; };
  for (let k = 0; k < N.length; k++) { const a = N[Math.max(0, k - 1)], b = N[Math.min(N.length - 1, k + 1)], L = Math.hypot(b.x - a.x, b.z - a.z) || 1; N[k].y = gmin(N[k].x, N[k].z, (b.x - a.x) / L, (b.z - a.z) / L) - DEPTH; }
  for (let pass = 0; pass < 2; pass++) for (let k = 1; k < N.length; k++) { const d = Math.hypot(N[k].x - N[k - 1].x, N[k].z - N[k - 1].z), lim = d * 0.06; N[k].y = clamp(N[k].y, N[k - 1].y - lim, N[k - 1].y + lim); N[k - 1].y = Math.min(N[k - 1].y, N[k].y + lim); } // never steeper than 6 %, and only ever deeper
  const segs = []; for (let k = 0; k < nSeg; k++) { const a = N[k], b = N[k + 1]; const L0 = Math.hypot(b.x - a.x, b.z - a.z), ux = (b.x - a.x) / L0, uz = (b.z - a.z) / L0; const e0 = k > 0 ? 1 : 0, e1 = k < nSeg - 1 ? 1 : 0; // internal joints overlap 1 m each side (no slit at the bends)
    const L = L0 + e0 + e1, F = frame((a.x + b.x) / 2 + ux * (e1 - e0) / 2, (a.z + b.z) / 2 + uz * (e1 - e0) / 2, ux, uz); segs.push({ F, L, y0: a.y - (b.y - a.y) * e0 / L0, y1: b.y + (b.y - a.y) * e1 / L0, k }); }
  const toV = (F, x, z) => -(x - F.cx) * F.uz + (z - F.cz) * F.ux, toU = (F, x, z) => (x - F.cx) * F.ux + (z - F.cz) * F.uz;
  const name = 'Trinidad', last = segs.length - 1;
  for (const sg of segs) { const { F, L } = sg; const first = sg.k === 0, end = sg.k === last;
    const vR = end && botB ? toV(F, botB[0], botB[1]) : 0;
    const found = sg.k % 2 === 0 || end ? stairs(F, L, sg.y0, end ? vR : 99, end ? L / 2 - 3.5 : first ? -L / 2 + 3.5 : 999) : [];
    const gaps = []; if (first) gaps.push(['u-', 0, 4.2 + 1.6]); else gaps.push(['u-', 0, 31]); if (end) { if (botB) gaps.push(['u+', vR, 3.8 + 1.6]); } else gaps.push(['u+', 0, 31]);
    for (const f of found) { const vb = f.v + f.dv * 11.5; if (Math.abs(vb) > 14) gaps.push([f.v > 0 ? 'v+' : 'v-', f.ue, 2.6]); }
    const holes = found.map((f) => { const p = F.W(f.u, f.v); return stairHole(F, 0, p[0], p[1], F.ux * f.du - F.uz * f.dv, F.uz * f.du + F.ux * f.dv); });
    const hr = buildHall(F, 0, L, sg.y0, name, gaps, holes, { y1: sg.y1, deck: false, density: 0.16 });
    for (const f of found) { const p = F.W(f.u, f.v); const vb = f.v + f.dv * 11.5; const corr = Math.abs(vb) > 14 ? F.W(f.ue, Math.sign(f.v) * 14.5) : null; const dx = F.ux * f.du - F.uz * f.dv, dz = F.uz * f.du + F.ux * f.dv; buildStairwell(p[0], p[1], dx, dz, hr.yAt(corr ? f.ue : f.u + f.du * 10), corr); }
    if (first) { const bot = F.W(-L / 2 + 3.5, 0); buildRamp(T.rampA.x0, T.rampA.z0, bot[0], bot[1], hr.yAt(-L / 2 + 3.5), 'TRINIDAD CASCO HISTÓRICO', { w: 4.2, wc: blue }); }
    if (end && botB) buildRamp(topB[0], topB[1], botB[0], botB[1], hr.yAt(toU(F, botB[0], botB[1])), 'TRINIDAD CENTRO', { w: 3.8, wc: blue });
    CARPARKS.push({ name: 'Parking ' + name, x: F.cx, z: F.cz, F, uc: 0, L, yF: Math.min(sg.y0, sg.y1) }); }
  // one deck along the whole chain (walls only at its two ends)
  TUNNEL_DECKS.push({ type: 'path', pts: N.map((p) => [p.x, p.z, p.y + 0.12]), w: 31, hw: 15.35, road: true, tunnel: true, capped: true, ceil: 3.2, hall: true });
  if (r) { const nx = nB[0], nz = nB[1];
    // the yellow box grid in front of the ramp mouth
    const g0 = B.at(r.s0 + 4), gv = B.out * (B.w / 2 - 1.6); triDecal(g0.x + nx * gv, g0.z + nz * gv, -g0.ux, -g0.uz, 8, 3.2, (x, w, h, k) => yellowBox(x, w, h, k)); }
  // Pedro Zerolo: yellow box grid where the tram crosses between the carriageways, zebra crossings on both carriageways
  if (T.pz) { const a = T.pz.a, b = T.pz.b; const cx = (a.px + b.px) / 2, cz = (a.pz + b.pz) / 2; const dx = b.px - a.px, dz = b.pz - a.pz, L = Math.hypot(dx, dz) || 1;
    const along = T.A.at(a.s); triDecal(cx, cz, along.ux, along.uz, 12, Math.max(4, L - T.A.w - 0.6), (x, w, h, k) => yellowBox(x, w, h, k));
    for (const [c, j] of [[T.A, a], [T.B, b]]) for (const ds of [-6, 6]) { const p = c.at(j.s + ds); triDecal(p.x, p.z, p.ux, p.uz, 3.2, c.w - 0.4, (x, w, h, k) => zebra(x, w, h, k)); }
    const pzr = DATA.R[b.ri][4]; const st = Math.hypot(pzr[0] - b.px, pzr[1] - b.pz) < 2 ? 0 : pzr.length - 2; const nxt = st === 0 ? 2 : pzr.length - 4; const ux = pzr[nxt] - pzr[st], uz = pzr[nxt + 1] - pzr[st + 1], Lp = Math.hypot(ux, uz) || 1;
    const q = [b.px + ux / Lp * (T.B.w / 2 + 3.5), b.pz + uz / Lp * (T.B.w / 2 + 3.5)]; triDecal(q[0], q[1], ux / Lp, uz / Lp, 3.2, DATA.R[b.ri][2] - 0.4, (x, w, h, k) => zebra(x, w, h, k)); }
}
// ---------- soportales: pillars along the facade facing the avenue (Dialprix block and n.º 76)
function trinidadArcades() {
  const T = trinidadGeo(); if (!T || !T.pz) return 0; let n = 0;
  const spots = [{ c: T.B, s: T.pz.b.s - 28, col: 0x5f7a3a }, { c: T.A, s: T.A.len - 90, col: 0xb8a3a8 }];
  for (const sp of spots) { const c = sp.c, p = c.at(sp.s), nx = -p.uz * c.out, nz = p.ux * c.out; const k = trinidadClear(c, sp.s);
    // the building just behind the pavement there, and its edge facing the avenue
    let best = null; for (const b of BUILD) { if (!b.pts || Math.hypot(b.cx - p.x, b.cz - p.z) > 45) continue; for (let i = 0; i < b.pts.length; i++) { const a = b.pts[i], e = b.pts[(i + 1) % b.pts.length]; const mx = (a[0] + e[0]) / 2, mz = (a[1] + e[1]) / 2; const r = c.proj(mx, mz); const L = Math.hypot(e[0] - a[0], e[1] - a[1]);
      if (L < 8 || r.d > k + 2.5 || Math.abs(r.s - sp.s) > 30) continue; const par = Math.abs(((e[0] - a[0]) * p.ux + (e[1] - a[1]) * p.uz) / L); if (par < 0.9) continue; if (!best || r.d < best.d) best = { a, e, L, d: r.d }; } }
    if (!best) continue; const mat = M(sp.col, 0.75); const ex = (best.e[0] - best.a[0]) / best.L, ez = (best.e[1] - best.a[1]) / best.L;
    for (let t = 1.5; t < best.L - 1; t += 3.8) { const x = best.a[0] + ex * t + nx * 0.35, z = best.a[1] + ez * t + nz * 0.35; if (onCarriagewayEarly(x, z, 0.3)) continue; const y = heightAt(x, z);
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.6, 0.5), mat); col.position.set(x, y + 1.8, z); col.rotation.y = Math.atan2(ex, ez); col.castShadow = true; scene.add(col); COL.addCirc(x, z, 0.3); n++; }
    const mx = (best.a[0] + best.e[0]) / 2 + nx * 0.35, mz = (best.a[1] + best.e[1]) / 2 + nz * 0.35; const beam = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.5, best.L - 1), mat); beam.position.set(mx, heightAt(mx, mz) + 3.75, mz); beam.rotation.y = Math.atan2(ex, ez); scene.add(beam); }
  return n;
}
