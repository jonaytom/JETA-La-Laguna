// ============ sports: football pitches, futsal & basketball courts, stadium stands, indoor halls ============
function courtCanvas(kind, len, wid) {
  const W = 512, H = Math.max(64, Math.round(512 * wid / len)); const c = mkCanvas(W, H), x = c.getContext('2d'); const k = W / len; // px per metre
  const line = (col, w = 2) => { x.strokeStyle = col; x.lineWidth = Math.max(1.5, w); };
  const R = (u, v, w, h) => x.strokeRect(u * k, v * k, w * k, h * k);
  const circ = (u, v, r, a0 = 0, a1 = 7) => { x.beginPath(); x.arc(u * k, v * k, r * k, a0, a1); x.stroke(); };
  const m = 1.5; // margin
  const PL = len - 2 * m, PW = wid - 2 * m;
  if (kind === 'f11' || kind === 'f7') {
    for (let i = 0; i < 12; i++) { x.fillStyle = i % 2 ? '#3f8a3a' : '#4a9a42'; x.fillRect(i * W / 12, 0, W / 12 + 1, H); }
    noiseOverlay(x, W, H, 10);
    line('#f4f4ee', 0.12 * k); R(m, m, PL, PW); x.beginPath(); x.moveTo(len / 2 * k, m * k); x.lineTo(len / 2 * k, (wid - m) * k); x.stroke();
    const cc = kind === 'f11' ? 9.15 : 6; circ(len / 2, wid / 2, cc);
    const pa = kind === 'f11' ? [16.5, 40.3] : [12, 26], ga = kind === 'f11' ? [5.5, 18.3] : [5, 12];
    for (const s of [0, 1]) { const u0 = s ? len - m - pa[0] : m; R(u0, wid / 2 - pa[1] / 2, pa[0], pa[1]); const g0 = s ? len - m - ga[0] : m; R(g0, wid / 2 - ga[1] / 2, ga[0], ga[1]); x.fillStyle = '#f4f4ee'; x.fillRect((s ? len - m - (kind === 'f11' ? 11 : 9) : m + (kind === 'f11' ? 11 : 9)) * k - 2, wid / 2 * k - 2, 4, 4); }
  } else if (kind === 'fs' || kind === 'multi') {
    x.fillStyle = '#2f6fa8'; x.fillRect(0, 0, W, H); x.fillStyle = '#3b8a55'; x.fillRect(m * k, m * k, PL * k, PW * k); noiseOverlay(x, W, H, 8);
    line('#f4f4ee', 0.08 * k); R(m, m, PL, PW); x.beginPath(); x.moveTo(len / 2 * k, m * k); x.lineTo(len / 2 * k, (wid - m) * k); x.stroke(); circ(len / 2, wid / 2, 3);
    for (const s of [0, 1]) { const u = s ? len - m : m; x.beginPath(); x.arc(u * k, (wid / 2 - 1.5) * k, 6 * k, s ? Math.PI : -Math.PI / 2, s ? Math.PI * 1.5 : 0); x.stroke(); x.beginPath(); x.arc(u * k, (wid / 2 + 1.5) * k, 6 * k, s ? Math.PI / 2 : 0, s ? Math.PI : Math.PI / 2); x.stroke(); x.beginPath(); x.moveTo((s ? u - 6 : u + 6) * k, (wid / 2 - 1.5) * k); x.lineTo((s ? u - 6 : u + 6) * k, (wid / 2 + 1.5) * k); x.stroke(); }
    if (kind === 'multi') { line('#f5c518', 0.06 * k); for (const s of [0, 1]) { const u = s ? len - m : m; R(s ? u - 5.8 : u, wid / 2 - 2.45, 5.8, 4.9); circ(s ? u - 1.6 : u + 1.6, wid / 2, 6.75, s ? Math.PI / 2 : -Math.PI / 2, s ? Math.PI * 1.5 : Math.PI / 2); } }
  } else { // basketball
    x.fillStyle = '#b5552f'; x.fillRect(0, 0, W, H); x.fillStyle = '#2f5f9a'; noiseOverlay(x, W, H, 8);
    line('#f4f4ee', 0.06 * k); R(m, m, PL, PW); x.beginPath(); x.moveTo(len / 2 * k, m * k); x.lineTo(len / 2 * k, (wid - m) * k); x.stroke(); circ(len / 2, wid / 2, 1.8);
    for (const s of [0, 1]) { const u = s ? len - m : m; x.fillStyle = '#2f5f9a'; x.fillRect((s ? u - 5.8 : u) * k, (wid / 2 - 2.45) * k, 5.8 * k, 4.9 * k); R(s ? u - 5.8 : u, wid / 2 - 2.45, 5.8, 4.9); circ(s ? u - 1.6 : u + 1.6, wid / 2, Math.min(6.75, PW / 2 - 0.3), s ? Math.PI / 2 : -Math.PI / 2, s ? Math.PI * 1.5 : Math.PI / 2); }
  }
  return canvasTex(c, { repeat: false });
}
function noiseOverlay(x, W, H, a) { for (let i = 0; i < W * H / 60; i++) { x.fillStyle = `rgba(${Math.random() < 0.5 ? '0,0,0' : '255,255,255'},${a / 255})`; x.fillRect(Math.random() * W, Math.random() * H, 2, 2); } }
let chainTex = null;
function chainLink() { if (chainTex) return chainTex; const c = mkCanvas(64, 64), x = c.getContext('2d'); x.clearRect(0, 0, 64, 64); x.strokeStyle = 'rgba(190,200,205,0.9)'; x.lineWidth = 1.4; for (let i = -64; i < 128; i += 12) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 64, 64); x.stroke(); x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); } chainTex = canvasTex(c); return chainTex; }
const SPORTS = { pitches: [], halls: [] };
function buildSports() {
  const white = M(0xf4f4f2, 0.4, 0.2), dark = M(0x2a2d30, 0.5, 0.6), orange = M(0xe8641c, 0.4, 0.6);
  const fenceMat = new THREE.MeshStandardMaterial({ map: chainLink(), transparent: true, alphaTest: 0.3, side: THREE.DoubleSide, roughness: 0.6, metalness: 0.5 });
  const sportsAreas = DATA.A.filter((a) => DATA.AT[a[0]] === 'sports');
  for (const a of DATA.A) {
    if (DATA.AT[a[0]] !== 'pitch') continue; const c2 = a[2]; const pts = []; for (let i = 0; i < c2.length; i += 2) pts.push([c2[i], c2[i + 1]]);
    if (pts.length < 3) continue; let cx = 0, cz = 0; for (const p of pts) { cx += p[0]; cz += p[1]; } cx /= pts.length; cz /= pts.length;
    if (cx < WORLD.x0 || cx > WORLD.x1 || cz < WORLD.z0 || cz > WORLD.z1) continue;
    const F = axisFrame(pts, cx, cz); const len = F.u1 - F.u0, wid = F.v1 - F.v0; const area = len * wid; if (len < 12 || wid < 8) continue;
    const kind = area > 4800 ? 'f11' : area > 1600 ? 'f7' : area > 560 ? (Math.random() < 0.55 ? 'multi' : 'fs') : 'bb';
    const tex = courtCanvas(kind, len, wid);
    const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: kind.startsWith('f') && kind !== 'fs' ? 0.95 : 0.6, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -6 });
    // raster the rectangle so it follows the ground
    const N = Math.max(2, Math.ceil(len / 6)), Mv = Math.max(2, Math.ceil(wid / 6)); const pos = [], uv = [];
    const V = (i, j) => { const u = F.u0 + len * i / N, v = F.v0 + wid * j / Mv; const [px, pz] = F.W(u, v); return [px, heightAt(px, pz) + 0.16, pz]; };
    for (let i = 0; i < N; i++) for (let j = 0; j < Mv; j++) { const a0 = V(i, j), a1 = V(i + 1, j), a2 = V(i + 1, j + 1), a3 = V(i, j + 1); pos.push(...a0, ...a2, ...a1, ...a0, ...a3, ...a2); const U = (ii, jj) => [ii / N, 1 - jj / Mv]; uv.push(...U(i, j), ...U(i + 1, j + 1), ...U(i + 1, j), ...U(i, j), ...U(i, j + 1), ...U(i + 1, j + 1)); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.computeVertexNormals();
    const mesh = new THREE.Mesh(g, mat); mesh.receiveShadow = true; mesh.renderOrder = 1; scene.add(mesh);
    const at = (u, v, y = 0) => { const [px, pz] = F.W(u, v); return [px, heightAt(px, pz) + 0.16 + y, pz]; };
    const add = (geo, m, u, v, y, rot = 0) => { const o = new THREE.Mesh(geo, m); const p = at(u, v, y); o.position.set(p[0], p[1], p[2]); o.rotation.y = F.ang + rot; o.castShadow = true; scene.add(o); return o; };
    // goals
    if (kind !== 'bb') {
      const gw = kind === 'f11' ? 7.32 : kind === 'f7' ? 6 : 3, gh = kind === 'f11' ? 2.44 : 2;
      for (const s of [0, 1]) { const u = s ? F.u1 - 1.5 : F.u0 + 1.5; const back = s ? 1 : -1;
        for (const dv of [-gw / 2, gw / 2]) { add(new THREE.BoxGeometry(0.12, gh, 0.12), white, u, dv + (F.v0 + F.v1) / 2, gh / 2); const pp = at(u, dv + (F.v0 + F.v1) / 2); COL.addCirc(pp[0], pp[2], 0.12); }
        add(new THREE.BoxGeometry(0.12, 0.12, gw + 0.12), white, u, (F.v0 + F.v1) / 2, gh, Math.PI / 2 * 0).rotation.y = F.ang + Math.PI / 2;
        const net = add(new THREE.PlaneGeometry(gw, gh), fenceMat, u + back * 1.1, (F.v0 + F.v1) / 2, gh / 2); net.rotation.y = F.ang; }
    }
    // basketball hoops
    if (kind === 'bb' || kind === 'multi') {
      for (const s of [0, 1]) { const u = s ? F.u1 - 0.3 : F.u0 + 0.3; const back = s ? 1 : -1; const vm = (F.v0 + F.v1) / 2;
        add(new THREE.CylinderGeometry(0.09, 0.09, 3.6, 8), dark, u + back * 0.6, vm, 1.8); const pp = at(u + back * 0.6, vm); COL.addCirc(pp[0], pp[2], 0.12);
        const bd = add(new THREE.BoxGeometry(1.8, 1.05, 0.05), white, u, vm, 3.4);
        const ring = add(new THREE.TorusGeometry(0.23, 0.02, 6, 16), orange, u - back * 0.35, vm, 3.05); ring.rotation.set(Math.PI / 2, 0, 0); }
    }
    // chain-link fence around small courts (with a gap to walk in)
    if (area < 1700) {
      const e = 1.2; const cor = [[F.u0 - e, F.v0 - e], [F.u1 + e, F.v0 - e], [F.u1 + e, F.v1 + e], [F.u0 - e, F.v1 + e]];
      for (let i = 0; i < 4; i++) { const [ua, va] = cor[i], [ub, vb] = cor[(i + 1) % 4]; const segs0 = i === 0 ? [[0, 0.42], [0.58, 1]] : [[0, 1]];
        // no fence on a carriageway (agent: court fence across C. Castellón / Valencia): split the side into runs off the road
        const Ls = Math.hypot(ub - ua, vb - va) || 1, st = Math.min(0.5, 1 / Ls), segs = [];
        for (const [a0, a1] of segs0) { let r0 = null; for (let t = a0; t <= a1 + 1e-6; t += st) { const tt = Math.min(t, a1), q = F.W(ua + (ub - ua) * tt, va + (vb - va) * tt), ok = !onCarriageway(q[0], q[1], 0.3); if (ok && r0 === null) r0 = tt; if ((!ok || tt >= a1) && r0 !== null) { if (tt - r0 > 0) segs.push([r0, ok ? tt : Math.max(r0, tt - st)]); r0 = null; } } }
        for (const [t0, t1] of segs) { const pa = F.W(ua + (ub - ua) * t0, va + (vb - va) * t0), pb = F.W(ua + (ub - ua) * t1, va + (vb - va) * t1); const L = Math.hypot(pb[0] - pa[0], pb[1] - pa[1]); if (L < 0.5) continue;
          const fg = new THREE.PlaneGeometry(L, 3.5); { const uvA = fg.attributes.uv; for (let q = 0; q < uvA.count; q++) uvA.setXY(q, uvA.getX(q) * L / 1.5, uvA.getY(q) * 3.5 / 1.5); } const f = new THREE.Mesh(fg, fenceMat); const mx = (pa[0] + pb[0]) / 2, mz = (pa[1] + pb[1]) / 2; f.position.set(mx, heightAt(mx, mz) + 1.9, mz); f.rotation.y = Math.atan2(pb[0] - pa[0], pb[1] - pa[1]) + Math.PI / 2; scene.add(f); COL.addSeg(pa[0], pa[1], pb[0], pb[1]); } }
    }
    // floodlights on football pitches
    if (kind === 'f11' || kind === 'f7') {
      for (const [u, v] of [[F.u0 - 3, F.v0 - 3], [F.u1 + 3, F.v0 - 3], [F.u1 + 3, F.v1 + 3], [F.u0 - 3, F.v1 + 3]]) { const [px, pz] = F.W(u, v); if (onCarriageway(px, pz, 0.5) || COL.nearSeg(px, pz, 1)) continue; const h = kind === 'f11' ? 20 : 14; const p = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.3, h, 8), M(0x6a6f73, 0.5, 0.6)); p.position.set(px, heightAt(px, pz) + h / 2, pz); p.castShadow = true; scene.add(p); const hd = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 0.4), lampHeadMat); hd.position.set(px, heightAt(px, pz) + h, pz); hd.lookAt(cx, heightAt(cx, cz), cz); scene.add(hd); COL.addCirc(px, pz, 0.3); }
    }
    // grandstands when the pitch sits in a named stadium / sports complex
    const inStadium = sportsAreas.find((s2) => s2[1] >= 0 && /Estadio|Campo|Complejo/.test(STR[s2[1]]) && pip(cx, cz, s2[2]));
    if (inStadium && kind === 'f11') {
      const standM = M(0xb8b4ac, 0.9), seatM = M(0x1f6fb5, 0.6);
      for (const side of [-1, 1]) { const v = side < 0 ? F.v0 - 4 : F.v1 + 4; for (let st = 0; st < 6; st++) { const s = add(new THREE.BoxGeometry(0.8 + (5 - st) * 0.8, 0.5 + st * 0.5, len * 0.8), st % 2 ? standM : seatM, (F.u0 + F.u1) / 2, v + side * st * 0.8, (0.5 + st * 0.5) / 2); s.rotation.y = F.ang + Math.PI / 2 * 0; s.rotation.y = F.ang; }
        const [sx, sz] = F.W((F.u0 + F.u1) / 2, v + side * 2.4); for (let t = -0.4; t <= 0.4; t += 0.1) { const [px, pz] = F.W((F.u0 + F.u1) / 2 + t * len, v + side * 2.4); COL.addCirc(px, pz, 2.4); } }
      LABELS.push([STR[inStadium[1]], cx, cz, 1]);
    }
    SPORTS.pitches.push({ cx, cz, kind });
  }
}
// indoor halls: buildings named Pabellón / Polideportivo or sitting inside a sports complex
function buildSportsHalls() {
  const sportsAreas = DATA.A.filter((a) => DATA.AT[a[0]] === 'sports');
  const cands = BUILD.filter((b) => { const A = Math.abs(polyArea(b.pts)); if (A < 700) return false; if (b.name && /Piscina/i.test(b.name)) return false; if (b.name && /Pabell|Polideport|Gimnasio|Cancha/i.test(b.name)) return true; return sportsAreas.some((s) => s[1] >= 0 && /Pabell|Polideport|Deportiv/i.test(STR[s[1]]) && pip(b.cx, b.cz, s[2])); });
  const seen = []; let n = 0;
  for (const b of cands) {
    if (n >= 5 || seen.some((s) => Math.hypot(s[0] - b.cx, s[1] - b.cz) < 60)) continue; seen.push([b.cx, b.cz]);
    const nm = b.name || (sportsAreas.find((s) => s[1] >= 0 && pip(b.cx, b.cz, s[2])) ? STR[sportsAreas.find((s) => s[1] >= 0 && pip(b.cx, b.cz, s[2]))[1]] : 'Pabellón');
    // doors on the two best street-facing walls
    const ptsB = b.pts, m = ptsB.length; const cs = [];
    for (let i = 0; i < m; i++) { const p = ptsB[i], q = ptsB[(i + 1) % m]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 6) continue; const nx = (q[1] - p[1]) / L, nz = -(q[0] - p[0]) / L; const mx = (p[0] + q[0]) / 2, mz = (p[1] + q[1]) / 2; if (COL.nearSeg(mx + nx * 2.5, mz + nz * 2.5, 1.2)) continue; const rd = ROADSEG.nearest(mx + nx * 5, mz + nz * 5); cs.push({ x: mx + nx * 0.4, z: mz + nz * 0.4, nx, nz, sc: L - (rd ? rd.d : 50) }); }
    cs.sort((a, c) => c.sc - a.sc); const doors = []; for (const c of cs) { if (doors.length >= 2) break; if (doors.some((d) => Math.hypot(d.x - c.x, d.z - c.z) < 12)) continue; doors.push(c); }
    if (!doors.length) continue;
    buildHallInterior(doors, nm, b); n++;
  }
  return n;
}
function buildHallInterior(doors, name, b) {
  const fr = interiorFrame(b.pts, b.cx, b.cz, b.top - b.bmax + 0.4, 16); const L = fr.L, W = fr.W, Hh = Math.max(7, fr.H);
  const r = roomShell(L, W, Hh, null, 0xdfe3e6); const g = r.g; const md = mapDoor(fr, doors[0]);
  const cl = Math.min(40, L - 6), cw = Math.min(22, W - 8); const bleach = W - cw > 9;
  const court = courtCanvas('multi', cl, cw); const cm = new THREE.MeshStandardMaterial({ map: court, roughness: 0.35, emissive: 0xffffff, emissiveMap: court, emissiveIntensity: 0.12 });
  const cz = bleach ? -2 : 0;
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(cl, cw), cm); fl.rotation.x = -Math.PI / 2; fl.position.set(0, 0.15, cz); g.add(fl);
  const wood = new THREE.Mesh(new THREE.PlaneGeometry(L, W), new THREE.MeshStandardMaterial({ color: 0xc89a5e, roughness: 0.4, emissive: 0xc89a5e, emissiveIntensity: 0.1 })); wood.rotation.x = -Math.PI / 2; wood.position.y = 0.14; g.add(wood);
  const white = M(0xf4f4f2, 0.4, 0.2), orange = M(0xe8641c, 0.4, 0.6), dark = M(0x2a2d30, 0.5, 0.6);
  for (const sd of [-1, 1]) { const ex = sd * (cl / 2 - 0.8); const bd = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.05, 1.8), white); bd.position.set(ex, 3.4, cz); g.add(bd); const ring = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.02, 6, 16), orange); ring.rotation.x = Math.PI / 2; ring.position.set(ex - sd * 0.35, 3.05, cz); g.add(ring); const arm = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.12), dark); arm.position.set(ex + sd * 0.6, 3.8, cz); g.add(arm);
    for (const dv of [-1.5, 1.5]) { const pp = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2, 0.1), white); pp.position.set(ex + sd * 0.2, 1.1, cz + dv); g.add(pp); } const bar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 3.1), white); bar.position.set(ex + sd * 0.2, 2.1, cz); g.add(bar); }
  if (bleach) { const seat = M(0x1f6fb5, 0.6), step = M(0x9aa0a4, 0.8); const z0b = cz + cw / 2 + 1.2; const nSt = Math.max(2, Math.min(6, Math.floor((W / 2 - z0b) / 0.9)));
    for (let st = 0; st < nSt; st++) { const bk = new THREE.Mesh(new THREE.BoxGeometry(cl - 2, 0.45, 0.9), st % 2 ? step : seat); bk.position.set(0, 0.35 + st * 0.45, z0b + st * 0.9); g.add(bk); }
    COL.addSeg(r.x0 - cl / 2 + 1, r.z0 + z0b - 0.5, r.x0 + cl / 2 - 1, r.z0 + z0b - 0.5); for (let i = 0; i < 10; i++) npcAt(r, rnd(-cl / 2 + 2, cl / 2 - 2), z0b - 0.1, Math.PI); }
  for (let i = 0; i < Math.floor(L / 8); i++) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.15, W - 4), new THREE.MeshBasicMaterial({ color: 0xffffff })); l.position.set(-L / 2 + 4 + i * 8, Hh - 0.3, 0); g.add(l); }
  const sb = textPlane('LOCAL 3 - 2 VISITANTE', 6, 1.2, '#111', '#ffcc00', 'bold 30px monospace'); sb.position.set(0, Math.min(7.5, Hh - 2.5), -W / 2 + 0.1); g.add(sb);
  const nm = textPlane(name.toUpperCase(), 10, 1.2, '#1f6fb5', '#ffffff', 'bold 36px Oswald, Arial'); nm.position.set(0, Math.min(9, Hh - 1), -W / 2 + 0.1); g.add(nm);
  for (let i = 0; i < 8; i++) npcAt(r, rnd(-cl / 2 + 3, cl / 2 - 3), cz + rnd(-cw / 2 + 2, cw / 2 - 2), Math.random() * 6, { shirt: i % 2 ? 0xd62828 : 0xf2f2f2, pants: 0x111111, longPants: false });
  const ex = exitDoor(r, md.x, md.z, md.rot);
  addInterior({ id: 'hall' + INTERIORS.length, name, door: doors, spawn: { x: r.x0 + md.ix, z: r.z0 + md.iz, h: md.h }, exit: ex, ceil: r.y0 + Hh - 0.4, floor: r.y0 + 0.13 });
}

