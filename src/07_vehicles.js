// ============ road graph, vehicles, traffic, police, tram ============
const GRAPH = (() => {
  const n = DATA.G.n; const nodes = []; for (let i = 0; i < n.length; i += 2) nodes.push({ x: n[i], z: n[i + 1], out: [] });
  const edges = DATA.G.e.map((e, i) => {
    const pts = [nodes[e[0]].x, nodes[e[0]].z, ...e[6], nodes[e[1]].x, nodes[e[1]].z];
    const cum = [0]; for (let k = 2; k < pts.length; k += 2) cum.push(cum[cum.length - 1] + Math.hypot(pts[k] - pts[k - 2], pts[k + 1] - pts[k - 1]));
    const type = RTN[e[2]]; const w = e[4];
    const speed = { motorway: 25, motorway_link: 16, trunk: 20, primary: 14, primary_link: 11, secondary: 13, secondary_link: 10, tertiary: 11.5, tertiary_link: 9, unclassified: 9, residential: 8.5 }[type] || 8;
    return { i, a: e[0], b: e[1], type, oneway: !!e[3], w, name: e[5], pts, cum, len: cum[cum.length - 1], speed };
  });
  edges.forEach((e) => { if (e.len < 0.5) return; nodes[e.a].out.push({ e: e.i, dir: 1 }); if (!e.oneway) nodes[e.b].out.push({ e: e.i, dir: -1 }); });
  // node spatial grid
  const NG = new Map(), CS = 60;
  nodes.forEach((nd, i) => { const k = Math.floor(nd.x / CS) * 1000 + Math.floor(nd.z / CS); let l = NG.get(k); if (!l) NG.set(k, l = []); l.push(i); });
  function nearestNode(x, z, needOut = true) {
    let best = -1, bd = 1e12;
    for (let r = 1; r <= 4 && best < 0; r++) { const a0 = Math.floor(x / CS), b0 = Math.floor(z / CS);
      for (let a = a0 - r; a <= a0 + r; a++) for (let b = b0 - r; b <= b0 + r; b++) { const l = NG.get(a * 1000 + b); if (!l) continue; for (const i of l) { if (needOut && !nodes[i].out.length) continue; const d = (nodes[i].x - x) ** 2 + (nodes[i].z - z) ** 2; if (d < bd) { bd = d; best = i; } } } }
    return best;
  }
  function sample(e, dir, s, off, out) {
    // position at distance s along edge in travel dir with lateral offset (right side)
    const E = edges[e]; let d = dir > 0 ? s : E.len - s; d = clamp(d, 0, E.len);
    const c = E.cum; let k = 1; while (k < c.length - 1 && c[k] < d) k++;
    const t = (d - c[k - 1]) / ((c[k] - c[k - 1]) || 1); const p = E.pts;
    const x1 = p[(k - 1) * 2], z1 = p[(k - 1) * 2 + 1], x2 = p[k * 2], z2 = p[k * 2 + 1];
    let dx = (x2 - x1) * dir, dz = (z2 - z1) * dir; const L = Math.hypot(dx, dz) || 1; dx /= L; dz /= L;
    out.x = x1 + (x2 - x1) * t - dz * off; out.z = z1 + (z2 - z1) * t + dx * off; out.dx = dx; out.dz = dz; return out;
  }
  // A* over nodes (edge-aware), returns list of points [x,z,...]
  function route(from, to) {
    if (from < 0 || to < 0) return null;
    const g = new Map([[from, 0]]), came = new Map(); const open = [[0, from]]; const H = (i) => Math.hypot(nodes[i].x - nodes[to].x, nodes[i].z - nodes[to].z);
    let it = 0;
    while (open.length && it++ < 6000) {
      let bi = 0; for (let i = 1; i < open.length; i++) if (open[i][0] < open[bi][0]) bi = i; const [, cur] = open.splice(bi, 1)[0];
      if (cur === to) break;
      for (const o of nodes[cur].out) { const E = edges[o.e]; const nx = o.dir > 0 ? E.b : E.a; const ng = g.get(cur) + E.len * (E.type.startsWith('motorway') ? 0.7 : 1); if (ng < (g.has(nx) ? g.get(nx) : 1e12)) { g.set(nx, ng); came.set(nx, [cur, o]); open.push([ng + H(nx), nx]); } }
    }
    if (!came.has(to) && from !== to) return null;
    const segs = []; let c = to; while (c !== from) { const [p, o] = came.get(c); segs.push(o); c = p; }
    segs.reverse(); const pts = [nodes[from].x, nodes[from].z];
    for (const o of segs) { const E = edges[o.e]; const p = E.pts; const n2 = p.length / 2; for (let k = 1; k < n2; k++) { const idx = o.dir > 0 ? k : n2 - 1 - k; pts.push(p[idx * 2], p[idx * 2 + 1]); } }
    return pts;
  }
  // edge grid (every edge in the cells its points touch) and the edge nearest to a point, with the projection on it
  const EG = new Map(); edges.forEach((E) => { if (E.len < 0.5) return; const seen = new Set(); for (let k = 0; k < E.pts.length; k += 2) { const key = Math.floor(E.pts[k] / CS) * 1000 + Math.floor(E.pts[k + 1] / CS); if (seen.has(key)) continue; seen.add(key); let l = EG.get(key); if (!l) EG.set(key, l = []); l.push(E.i); } });
  function nearestEdge(x, z, maxD = 30) {
    let best = null, bd = maxD; const a0 = Math.floor(x / CS), b0 = Math.floor(z / CS);
    for (let a = a0 - 1; a <= a0 + 1; a++) for (let b = b0 - 1; b <= b0 + 1; b++) { const l = EG.get(a * 1000 + b); if (!l) continue;
      for (const ei of l) { const E = edges[ei], p = E.pts; for (let k = 2; k < p.length; k += 2) { const ax = p[k - 2], az = p[k - 1], dx = p[k] - ax, dz = p[k + 1] - az, L2 = dx * dx + dz * dz || 1; const t = clamp(((x - ax) * dx + (z - az) * dz) / L2, 0, 1); const qx = ax + dx * t, qz = az + dz * t, d = Math.hypot(x - qx, z - qz);
        if (d < bd) { bd = d; best = { e: ei, k: k / 2, x: qx, z: qz, d, s: E.cum[k / 2 - 1] + (E.cum[k / 2] - E.cum[k / 2 - 1]) * t, dx, dz }; } } } }
    return best;
  }
  // driving route from where the car is, in the way it is heading: it starts on the car's own street (its next
  // junction ahead, or behind only if that way is one-way against you), never on a parallel street or a bridge
  // above, and ends on the target's street
  function routeFrom(x, z, h, tx, tz) {
    const ne = nearestEdge(x, z, 25); let pre = null, from = -1;
    if (ne) { const E = edges[ne.e]; const fwd = Math.sin(h) * ne.dx + Math.cos(h) * ne.dz >= 0; let dir = fwd ? 1 : -1; if (dir < 0 && E.oneway) dir = 1;
      from = dir > 0 ? E.b : E.a; pre = [x, z, ne.x, ne.z]; const p = E.pts, n2 = p.length / 2;
      if (dir > 0) for (let k = ne.k; k < n2; k++) pre.push(p[k * 2], p[k * 2 + 1]); else for (let k = ne.k - 1; k >= 0; k--) pre.push(p[k * 2], p[k * 2 + 1]); }
    else from = nearestNode(x, z);
    const te = nearestEdge(tx, tz, 40); let to = nearestNode(tx, tz), post = [tx, tz];
    if (te) { const E = edges[te.e]; const cands = [E.a, E.b]; let bestL = 1e12, best = null;
      for (const c of cands) { const r = route(from, c); if (!r) continue; let L = 0; for (let i = 2; i < r.length; i += 2) L += Math.hypot(r[i] - r[i - 2], r[i + 1] - r[i - 1]); L += c === E.a ? te.s : E.len - te.s; if (L < bestL) { bestL = L; best = [c, r]; } }
      if (best) { to = best[0]; const p = E.pts, n2 = p.length / 2; const tail = []; if (to === E.a) for (let k = 1; k < te.k; k++) tail.push(p[k * 2], p[k * 2 + 1]); else for (let k = n2 - 2; k >= te.k; k--) tail.push(p[k * 2], p[k * 2 + 1]);
        return [...(pre || [x, z]), ...best[1], ...tail, te.x, te.z, tx, tz]; } }
    const r = route(from, to); return r ? [...(pre || [x, z]), ...r, ...post] : null;
  }
  return { nodes, edges, nearestNode, nearestEdge, sample, route, routeFrom };
})();

// ---------- Car
// top speeds (km/h): any car does 100+, the quickest ones about 200
const CAR_ACCEL = 0.85; // global acceleration factor (15% softer than v0.37)
const TOP_BY_CAT = { Urbano: 155, Utilitario: 175, Compacto: 200, Berlina: 190, Crossover: 180, SUV: 190, Todoterreno: 170, 'Pick-up': 165, Furgoneta: 160, 'Furgón': 145, 'Camión': 120, 'Grúa': 120, 'Camión de basura': 100, Emergencias: 145, 'Agrícola': 40, Taxi: 185, Patrulla: 200, Deportivo: 200, Scooter: 100, Maxiscooter: 150, Naked: 200, Ciclomotor: 60 };
const TOP_BY_TYPE = { compact: 165, sedan: 190, suv: 180, van: 155, taxi: 185, police: 200, sport: 200, bus: 100, truck: 120, moto: 150 };
function topSpeedKmh(model, type) { return (model && TOP_BY_CAT[model.cat]) || TOP_BY_TYPE[model ? model.phys : type] || 160; }
const CARS = []; const CARPOOL = {};
// audit P0.a: a car that does not go back to the pool (wrecked, or the pool for its model is full) frees what is its own:
// the paint material and any geometry not marked userData.shared; the moto rider goes back to the people pool.
function disposeCarMesh(m, rider) {
  if (rider) { if (rider.helm) { rider.helm.parent && rider.helm.parent.remove(rider.helm); rider.helm = null; } unseatHuman(rider); releaseHuman('ped', rider); }
  if (!m) return; m.g.traverse((o) => { if (o.isMesh && o.geometry && !o.geometry.userData.shared) o.geometry.dispose(); });
  if (m.paint && !m.paint.userData.shared) m.paint.dispose(); if (m.g.parent) m.g.parent.remove(m.g);
} const tmpS = { x: 0, z: 0, dx: 0, dz: 0 };
class Car {
  static seq = 0;
  constructor(type, color, x, z, h, model) {
    if (model === undefined && KGEO) model = modelForType(type);
    if (model) { type = model.phys; }
    this.type = type; this.model = model || null; this.color = color ?? pickColor();
    this.T = model ? { ...VTYPES[model.phys], L: model.L, W: model.W, H: model.H, name: model.name } : { ...VTYPES[type] }; this.T.maxV = topSpeedKmh(model, type) / 3.6 * rnd(0.96, 1.04); this.T.acc *= CAR_ACCEL; // same top speed (drag scales with acc), slower pick-up
    // pool (audit P0.2): traffic cars that leave are kept and reused instead of building a new model every time
    const pk = model ? model.id + (model.phys === 'moto' ? ':m' : '') : null; const pooled = pk && CARPOOL[pk] && CARPOOL[pk].length ? CARPOOL[pk].pop() : null; this.poolKey = pk;
    const m = pooled ? pooled.m : !model ? makeCarMesh(type, this.color) : model.phys === 'moto' ? makeMotoMesh(model, this.color) : makeKenneyMesh(model, this.color);
    if (pooled) { if (m.paint && !['taxi', 'policia', 'ambulancia'].includes(model.id)) m.paint.color.set(this.color); m.g.visible = true; this.rider = pooled.rider || null; if (this.rider) this.rider.root.visible = false; }
    if (m.moto && !pooled) { this.rider = takeHuman('ped', () => makeHuman({ cap: null, random: true })); seatHuman(this.rider, model); const helm = new THREE.Mesh(shGeo('helmet', () => new THREE.SphereGeometry(0.15, 12, 10)), M(pick([0x111111, 0xf2f2f2, 0xb3261e, 0x1f4e8c]), 0.3, 0.3)); helm.position.y = 0.06; this.rider.head.add(helm); this.rider.helm = helm; m.g.add(this.rider.root); this.rider.root.visible = false; } Object.assign(this, { mesh: m.g, body: m.body, wheels: m.wheels, hl: m.hl, tl: m.tl, bar: m.bar, paint: m.paint }); this._m = m;
    scene.add(this.mesh);
    this.x = x; this.z = z; this.y = heightAt(x, z); this.h = h; this.vx = 0; this.vz = 0; this.yawRate = 0; this.steer = 0;
    this.ctl = { thr: 0, brk: 0, steer: 0, hb: 0 }; this.mode = 'physics'; this.driver = null; this.health = 100; this.wheelRot = 0; this.pitch = 0; this.roll = 0; this.fwdV = 0;
    this.dead = false; this.stuck = 0; this.siren = false; this.smokeT = 0;
    CARS.push(this); this.sync();
  }
  get speed() { return Math.hypot(this.vx, this.vz); }
  circles() { const fx = Math.sin(this.h), fz = Math.cos(this.h); const r = this.T.W / 2; const o = this.T.L / 2 - r; const n = this.type === 'bus' ? 4 : 3; const res = this._circ || (this._circ = Array.from({ length: n }, () => [0, 0, 0])); /* reused buffer (audit P1.3) */ for (let i = 0; i < n; i++) { const k = -o + (2 * o) * i / (n - 1); const q = res[i]; q[0] = this.x + fx * k; q[1] = this.z + fz * k; q[2] = r; } return res; }
  physics(dt) {
    const T = this.T, c = this.ctl; const fx = Math.sin(this.h), fz = Math.cos(this.h), rx = -fz, rz = fx;
    let vf = this.vx * fx + this.vz * fz, vr = this.vx * rx + this.vz * rz;
    const broken = this.health <= 0;
    const thr = broken ? 0 : c.thr, brk = c.brk;
    const vk = T.maxV * 0.22; // grip-limited launch, then power-limited (a ~ P / v)
    if (thr > 0) { if (vf < -0.5) vf += 18 * thr * dt; else vf += Math.min(T.acc, T.acc * vk / Math.max(vf, 0.1)) * thr * (1 - clamp(vf / T.maxV, 0, 1) ** 2) * dt; }
    if (brk > 0) { if (vf > 0.5) vf -= 20 * brk * dt; else if (!broken && this.driver) vf -= T.acc * 0.6 * brk * dt * (vf > -9 ? 1 : 0); } /* braking at a standstill means reverse, but only with someone at the wheel */
    if (thr === 0 && brk === 0) vf -= Math.sign(vf) * Math.min(Math.abs(vf), 2.2 * dt);
    // aerodynamic drag tuned so the flat-road terminal speed is ~97% of the model's top speed; downhill can go a bit over
    vf -= vf * Math.abs(vf) * (0.05 * T.acc * 0.22 / (T.maxV * T.maxV)) * dt;
    if (vf > T.maxV * 1.22) vf = T.maxV * 1.22;
    // slope
    const HG = this.Gf || heightAt; const hf = HG(this.x + fx * 1.5, this.z + fz * 1.5), hb = HG(this.x - fx * 1.5, this.z - fz * 1.5);
    vf -= 9.8 * ((hf - hb) / 3) * dt * 0.8;
    if (!this.driver && brk > 0 && Math.abs(vf) < 1) { vf = 0; vr *= 0.5; } // a parked car with the brake on stays put, even on a slope
    // handbrake: the rear wheels lock. They brake (rear only, ~0.5 g), lose their side grip (the tail slides out) and the
    // car turns tighter; the car keeps part of its momentum in the old direction (drift). Grip comes back gradually.
    const hbT = c.hb ? 1 : 0; this.hbA = (this.hbA || 0) + (hbT - (this.hbA || 0)) * clamp(dt * (hbT ? 12 : 2.5), 0, 1); const hbA = this.hbA;
    if (c.hb) { if (Math.abs(vf) < 1.5) vf -= Math.sign(vf) * Math.min(Math.abs(vf), 9 * dt); else vf -= Math.sign(vf) * Math.min(Math.abs(vf), 5 * dt); }
    const grip = lerp(T.grip * (broken ? 0.6 : 1), 1.5, hbA);
    vr *= Math.exp(-grip * dt);
    const maxSteer = 0.56 / (1 + Math.abs(vf) / 13);
    this.steer = lerp(this.steer, c.steer * maxSteer, clamp(dt * 5.5, 0, 1)); // a bit smoother than before (8 / 0.6)
    const wb = T.L * 0.6;
    this.yawRate = vf * Math.tan(this.steer) / wb * (1 + 0.7 * hbA);
    if (hbA > 0.05 && Math.abs(vf) > 3) this.yawRate += Math.sign(vf) * c.steer * hbA * Math.min(0.75, Math.abs(vf) / 16); // the unloaded tail swings out
    this.h += this.yawRate * dt;
    const nfx = Math.sin(this.h), nfz = Math.cos(this.h), nrx = -nfz, nrz = nfx;
    const ovx = this.vx, ovz = this.vz;
    this.vx = nfx * vf + nrx * vr; this.vz = nfz * vf + nrz * vr;
    if (hbA > 0.01) { const k = 0.45 * hbA; this.vx = lerp(this.vx, ovx, k); this.vz = lerp(this.vz, ovz, k); vf = this.vx * nfx + this.vz * nfz; vr = this.vx * nrx + this.vz * nrz; } /* momentum keeps the old direction: sideways slip */ this.fwdV = vf; this.slip = Math.abs(vr);
    this.x += this.vx * dt; this.z += this.vz * dt;
    this.collideStatic(dt);
    // tunnels / cuttings: the walls keep you in the tube
    if ((this.onDeck || this.wasDeck > 0) && !this.low) { // bridges: the railing keeps every corner of the car on the deck
      const fx2 = Math.sin(this.h), fz2 = Math.cos(this.h), o = this.T.L / 2 - 0.4, r = this.T.W / 2;
      for (const k of [o, -o]) { const cx = this.x + fx2 * k, cz = this.z + fz2 * k; const sd = deckSide(cx, cz, this.y - 0.17); if (!sd || sd.y - heightAt(cx, cz) < 1.0) continue;
        const lim = Math.max(0.3, sd.hw - r); if (sd.d > lim && sd.d > 0.01) { const nx = (cx - sd.px) / sd.d, nz = (cz - sd.pz) / sd.d, pen = sd.d - lim; this.x -= nx * pen; this.z -= nz * pen; const vn = this.vx * nx + this.vz * nz; if (vn > 0) { this.vx -= vn * nx * 1.3; this.vz -= vn * nz * 1.3; if (vn > 4) this.onImpact(vn); } } } }
    this.wasDeck = this.onDeck ? 0.3 : (this.wasDeck || 0) - dt;
    if (this.low) { // underground: never pop up through the ceiling, and bump into columns / parked cars of car parks
      if (!lowAt(this.x, this.z, this.y) && heightAt(this.x, this.z) - this.y > 1.0) { this.x -= this.vx * dt * 1.2; this.z -= this.vz * dt * 1.2; this.vx *= -0.3; this.vz *= -0.3; }
      if (typeof ugcPush === 'function') { const fx3 = Math.sin(this.h), fz3 = Math.cos(this.h), o3 = this.T.L / 2 - this.T.W / 2; for (const k of [o3, 0, -o3]) { const cx = this.x + fx3 * k, cz = this.z + fz3 * k; const q = ugcPush(cx, cz, this.T.W / 2, this.y); if (q[0] !== cx || q[1] !== cz) { const nx = q[0] - cx, nz = q[1] - cz, nl = Math.hypot(nx, nz) || 1; this.x += nx; this.z += nz; const vn = (this.vx * nx + this.vz * nz) / nl; if (vn < 0) { this.vx -= vn * nx / nl * 1.4; this.vz -= vn * nz / nl * 1.4; if (-vn > 4) this.onImpact(-vn); } } } } }
    if (this.low) { const lw = lowAt(this.x, this.z, this.y); if (lw && lw.cap) { // car park hall: end walls (the car's half length stays inside)
        const half = Math.abs(Math.sin(this.h) * lw.cap.ux + Math.cos(this.h) * lw.cap.uz) * (this.T.L / 2 - this.T.W / 2) + this.T.W / 2, s0 = half - 0.35, s1 = lw.cap.len - half + 0.35; let pen = 0;
        if (lw.cap.s < s0) pen = lw.cap.s - s0; else if (lw.cap.s > s1) pen = lw.cap.s - s1;
        if (pen) { this.x -= lw.cap.ux * pen; this.z -= lw.cap.uz * pen; const vn = (this.vx * lw.cap.ux + this.vz * lw.cap.uz) * Math.sign(pen); if (vn > 0) { this.vx -= lw.cap.ux * Math.sign(pen) * vn * 1.3; this.vz -= lw.cap.uz * Math.sign(pen) * vn * 1.3; if (vn > 4) this.onImpact(vn); } } }
      if (lw && heightAt(this.x, this.z) - lw.y > 1.3) { const lim = Math.max(0.3, lw.hw - this.T.W / 2); if (lw.d > lim && lw.d > 0.01) { const nx = (this.x - lw.px) / lw.d, nz = (this.z - lw.pz) / lw.d, pen = lw.d - lim; this.x -= nx * pen; this.z -= nz * pen; const vn = this.vx * nx + this.vz * nz; if (vn > 0) { this.vx -= vn * nx * 1.3; this.vz -= vn * nz * 1.3; if (vn > 4) this.onImpact(vn); } } } }
  }
  collideStatic(dt) {
    const cs = this.circles(); let hit = false, impact = 0; const under = this.low && underground(this.x, this.z, this.y);
    COL.qy = this.y; if (!under) for (let iter = 0; iter < 2; iter++) for (const [cx, cz, r] of cs) {
      const res = COL.resolve(cx, cz, r * 0.95);
      if (res.hit) {
        const px = res.x - cx, pz = res.z - cz; this.x += px; this.z += pz; for (const c2 of cs) { c2[0] += px; c2[1] += pz; }
        const vn = this.vx * res.nx + this.vz * res.nz;
        if (vn < 0) { this.vx -= 1.35 * vn * res.nx; this.vz -= 1.35 * vn * res.nz; impact = Math.max(impact, -vn); this.vx *= 0.85; this.vz *= 0.85; }
        hit = true;
      }
    }
    if (!this.low && TCUTS.length) { const r = Math.max(this.T.W, this.T.L * 0.5) / 2; const tp = trenchPush(this.x, this.z, r); if (tp) { this.x += tp[0]; this.z += tp[1]; const vn = this.vx * tp[2] + this.vz * tp[3]; if (vn < 0) { this.vx -= 1.3 * vn * tp[2]; this.vz -= 1.3 * vn * tp[3]; impact = Math.max(impact, -vn); } hit = true; } }
    // world bounds
    if (this.x < WORLD.x0) { this.x = WORLD.x0; this.vx = Math.abs(this.vx) * 0.3; } if (this.x > WORLD.x1) { this.x = WORLD.x1; this.vx = -Math.abs(this.vx) * 0.3; }
    if (this.z < WORLD.z0) { this.z = WORLD.z0; this.vz = Math.abs(this.vz) * 0.3; } if (this.z > WORLD.z1) { this.z = WORLD.z1; this.vz = -Math.abs(this.vz) * 0.3; }
    if (impact > 3) this.onImpact(impact);
    COL.qy = null; return hit;
  }
  onImpact(v) { this.lastImpact = v; this.lastImpactT = performance.now(); this.health -= v * 0.9 * (this.type === 'police' ? 0.4 : 1); if (this.driver === 'player') { AUDIO.crash(v); CAM.shake = Math.min(1, v / 15); playerCrashDamage(v); } }
  sync(dt = 0.016) {
    const py = this.y; const low = lowAt(this.x, this.z, py); this.low = low;
    const G = low ? (x, z) => { const l = lowAt(x, z, py); return l ? l.y - 0.12 : low.y - 0.12; } : (x, z) => { const g = heightAt(x, z), d = deckAt(x, z, py - 1.3, true, 2.2) - 0.12; if (d > g) { onDk = true; return d; } return g; }; this.Gf = G; let onDk = false;
    const fx = Math.sin(this.h), fz = Math.cos(this.h), L = this.T.L * 0.4, W = this.T.W * 0.45;
    const hf = G(this.x + fx * L, this.z + fz * L), hb = G(this.x - fx * L, this.z - fz * L), hr = G(this.x - fz * W, this.z + fx * W), hl = G(this.x + fz * W, this.z - fx * W);
    this.y = (hf + hb) / 2 + 0.17; this.onDeck = onDk;
    const tp = -Math.atan2(hf - hb, 2 * L), tr = Math.atan2(hl - hr, 2 * W); // rotateZ(+) lowers the right side (-X local)
    this.pitch = lerp(this.pitch, tp, 0.2); this.roll = lerp(this.roll, tr, 0.2);
    this.mesh.position.set(this.x, this.y, this.z);
    if (this.type === 'moto') { this.lean = lerp(this.lean || 0, clamp(-this.yawRate * Math.max(0, this.fwdV) * 0.06, -0.6, 0.6), 0.15); this.roll = this.lean; if (this.rider) { this.rider.root.visible = this.driver === 'ai' || this.driver === 'police'; if (this.rider.root.visible) animHuman(this.rider, dt, 0); } if (this.driver === 'player' && typeof playerHuman !== 'undefined' && playerHuman.root.parent === this.mesh) animHuman(playerHuman, dt, 0); } // seated riders were never animated: they stood stiff on the moto
    this.mesh.rotation.set(0, 0, 0); this.mesh.rotateY(this.h); this.mesh.rotateX(this.pitch); this.mesh.rotateZ(this.roll);
    // body lean
    const lat = clamp(-this.yawRate * this.fwdV * 0.012, -0.08, 0.08); this.body.rotation.z = lerp(this.body.rotation.z, lat, 0.15);
    const acc = (this.fwdV - (this.prevV ?? this.fwdV)) / Math.max(dt, 1e-3); this.prevV = this.fwdV; this.body.rotation.x = lerp(this.body.rotation.x, clamp(-acc * 0.004, -0.05, 0.05), 0.1);
    this.wheelRot += this.fwdV * dt / 0.33; if (!(this.ctl && this.ctl.hb)) this.rearRot = this.wheelRot; // locked rear wheels stop turning
    for (const w of this.wheels) { w.w.rotation.x = w.front ? this.wheelRot : (this.rearRot ?? this.wheelRot); if (w.front) w.piv.rotation.y = this.steer; }
    const braking = this.ctl.brk > 0 && this.fwdV > 0.5; for (const t of this.tl) t.material = braking ? tailBrakeMat : tailMat;
    if (this.bar) { const on = this.siren && Math.floor(performance.now() / 180) % 2; this.bar.children[0].material.emissiveIntensity = on ? 4 : 0; this.bar.children[1].material.emissiveIntensity = this.siren && !on ? 4 : 0; }
  }
  remove() { scene.remove(this.mesh); const i = CARS.indexOf(this); if (i >= 0) CARS.splice(i, 1); this.dead = true;
    if (this.poolKey && this._m && this.health > 0) { const l = CARPOOL[this.poolKey] || (CARPOOL[this.poolKey] = []); if (l.length < 6) { l.push({ m: this._m, rider: this.rider }); return; } }
    disposeCarMesh(this._m, this.rider); this._m = null; this.rider = null; }
}

// ---------- traffic (kinematic along graph)
function laneOff(E) { return E.oneway ? (E.w >= 10 ? 1.8 : 0) : clamp(E.w / 4, 1.3, E.w >= 13 ? 2.4 : 1.7); }
function spawnTraffic(car, e, dir, s) { car.mode = 'traffic'; car.driver = 'ai'; car.tr = { e, dir, s, v: GRAPH.edges[e].speed * 0.8, off: laneOff(GRAPH.edges[e]) }; GRAPH.sample(e, dir, s, car.tr.off, tmpS); car.x = tmpS.x; car.z = tmpS.z; car.h = Math.atan2(tmpS.dx, tmpS.dz); const g = heightAt(car.x, car.z); car.y = g; for (const dd of [7, 5, 3, 1.5]) { const l = lowAt(car.x, car.z, g - dd); if (l) { car.y = l.y + 0.05; break; } }
  // spawned on a bridge? put it on the deck, not on the ground underneath
  const E = GRAPH.edges[e], dk = deckAt(car.x, car.z, g + 60, true); if (dk > g + 0.6) { const rn = ROADSEG.nearest(car.x, car.z, (r) => (r[3] & 2) && r[1] === E.name); if (rn && rn.d < DATA.R[rn.ri][2] / 2 + 1.5) { const L = Math.hypot(rn.dx, rn.dz) || 1; if (Math.abs((rn.dx * tmpS.dx + rn.dz * tmpS.dz) / L) > 0.85) car.y = dk + 0.05; } } }
function nextEdge(car) {
  const tr = car.tr, E = GRAPH.edges[tr.e]; const node = tr.dir > 0 ? E.b : E.a; const nd = GRAPH.nodes[node];
  let opts = nd.out.filter((o) => !(o.e === tr.e && o.dir === -tr.dir) && !GRAPH.edges[o.e].type.startsWith('motorway') === !E.type.startsWith('motorway') || GRAPH.edges[o.e].type.includes('link'));
  opts = opts.filter((o) => !(o.e === tr.e && o.dir === -tr.dir));
  if (!opts.length) opts = nd.out;
  if (!opts.length) return false;
  // prefer straight
  const ch = car.h; let best = null, bw = -1;
  for (const o of opts) { GRAPH.sample(o.e, o.dir, 2, 0, tmpS); const a = Math.abs(angDiff(ch, Math.atan2(tmpS.dx, tmpS.dz))); const w = Math.random() * (a < 0.5 ? 2.2 : a < 1.9 ? 1 : 0.15); if (w > bw) { bw = w; best = o; } }
  tr.s -= E.len; tr.e = best.e; tr.dir = best.dir; tr.off = laneOff(GRAPH.edges[best.e]);
  return true;
}
function updateTraffic(car, dt) {
  const tr = car.tr; let E = GRAPH.edges[tr.e];
  // look ahead for obstacles
  const fx = Math.sin(car.h), fz = Math.cos(car.h); let block = 99;
  const test = (ox, oz, rad) => { const dx = ox - car.x, dz = oz - car.z; const along = dx * fx + dz * fz; if (along < 0 || along > 22) return false; const lat = Math.abs(dx * fz - dz * fx); if (lat < rad + 1.1) { block = Math.min(block, along); return true; } return false; };
  if (!car.uid) car.uid = ++Car.seq;
  for (const o of CARS) if (o !== car && !o.dead && sameLevel(o.y, car.y)) { const dx = o.x - car.x, dz = o.z - car.z; if (dx * dx + dz * dz >= 600) continue;
    // crossing traffic: the car with priority (older one, or one stuck for long) goes first so two cars never wait for each other forever
    if (o.mode === 'traffic' && o.tr) { const cross = Math.abs(angDiff(car.h, o.h)) > 0.6; if (cross && ((car.uid < (o.uid || 1e9) && (o.tr.v < 1 || tr.stuck > 2)) || tr.stuck > 6)) continue;
      if (Math.abs(angDiff(car.h, o.h)) > 2.6 && Math.abs(dx * fz - dz * fx) > 1.2) continue; } // oncoming in its own lane
    test(o.x, o.z, o.T.W / 2); }
  if (!PLAYER.car && sameLevel(PLAYER.y, car.y)) test(PLAYER.x, PLAYER.z, 0.4);
  if (!underground(car.x, car.z, car.y)) for (const p of PEDS) if (!p.down) { const dx = p.x - car.x, dz = p.z - car.z; if (dx * dx + dz * dz < 500) test(p.x, p.z, 0.3); }
  const ahead = block - car.T.L / 2 - 2.5;
  let target = E.speed * (car.type === 'bus' ? 0.75 : 1) * (car.personality || 1);
  if (ahead < 12) target = Math.min(target, Math.max(0, ahead) * 0.8);
  // slow in curves: look at heading change ahead
  GRAPH.sample(tr.e, tr.dir, Math.min(tr.s + 12, E.len), 0, tmpS); const turn = Math.abs(angDiff(car.h, Math.atan2(tmpS.dx, tmpS.dz)));
  if (turn > 0.5) target = Math.min(target, 6);
  // STOP / ceda el paso: brake to the line, wait a moment (stop) or just slow down (ceda)
  const sg = TSIGN.stops.get(tr.e + ':' + tr.dir); if (sg && tr.stopE !== tr.e) { const rem = sg.s - tr.s; if (rem > -1 && rem < 25) { const vmax = sg.kind === 'stop' ? Math.max(0, rem - 0.5) * 0.7 : Math.max(3.5, rem * 0.6); target = Math.min(target, vmax); if (rem < 1.2 && tr.v < 0.6) { tr.wait = (tr.wait || 0) + dt; if (tr.wait > (sg.kind === 'stop' ? 1.3 : 0.2)) { tr.stopE = tr.e; tr.wait = 0; } } else if (sg.kind === 'ceda' && rem < 1.2) tr.stopE = tr.e; } }
  tr.v = lerp(tr.v, target, clamp(dt * (target < tr.v ? 3 : 0.8), 0, 1));
  if (ahead < 1) tr.v = 0;
  tr.stuck = tr.v < 0.4 && ahead < 4 ? (tr.stuck || 0) + dt : 0;
  car.honk = ahead < 3 && !PLAYER.car ? 0 : car.honk;
  tr.s += tr.v * dt;
  let guard = 0; while (tr.s > E.len && guard++ < 5) { if (!nextEdge(car)) { tr.s = E.len; break; } E = GRAPH.edges[tr.e]; }
  GRAPH.sample(tr.e, tr.dir, tr.s, tr.off, tmpS);
  const th = Math.atan2(tmpS.dx, tmpS.dz);
  car.x = lerp(car.x, tmpS.x, clamp(dt * 6, 0, 1)); car.z = lerp(car.z, tmpS.z, clamp(dt * 6, 0, 1));
  const dh = angDiff(car.h, th); car.h += dh * clamp(dt * 5, 0, 1); car.yawRate = dh * 3;
  car.fwdV = tr.v; car.vx = Math.sin(car.h) * tr.v; car.vz = Math.cos(car.h) * tr.v; car.steer = clamp(dh * 2, -0.5, 0.5);
  car.ctl.brk = target < tr.v - 0.5 ? 1 : 0;
}
function trafficSpawnPoint(minD, maxD, avoidView = true) {
  for (let t = 0; t < 30; t++) {
    const a = Math.random() * Math.PI * 2, d = rnd(minD, maxD); const x = PLAYER.x + Math.sin(a) * d, z = PLAYER.z + Math.cos(a) * d;
    const ni = GRAPH.nearestNode(x, z); if (ni < 0) continue; const nd = GRAPH.nodes[ni]; if (!nd.out.length) continue;
    const dd = Math.hypot(nd.x - PLAYER.x, nd.z - PLAYER.z); if (dd < minD * 0.8) continue;
    if (avoidView) { const vx = nd.x - camera.position.x, vz = nd.z - camera.position.z; const cd = new THREE.Vector3(); camera.getWorldDirection(cd); if ((vx * cd.x + vz * cd.z) / (Math.hypot(vx, vz) || 1) > 0.5 && dd < 160) continue; }
    const o = pick(nd.out); const E = GRAPH.edges[o.e]; if (E.len < 6) continue;
    const s = E.len > 30 ? E.len * rnd(0.3, 0.6) : Math.min(E.len * 0.5, 4);
    // don't spawn on top of other cars, nor where traffic is already dense
    GRAPH.sample(o.e, o.dir, s, laneOff(E), tmpS); let near = 0, clash = false; for (const c of CARS) { const d = Math.hypot(c.x - tmpS.x, c.z - tmpS.z); if (d < 14) clash = true; if (d < 45) near++; } if (clash || near >= 3) continue;
    return [o.e, o.dir, s];
  }
  return null;
}
function trafficType() { const r = Math.random(); return r < 0.3 ? 'compact' : r < 0.58 ? 'sedan' : r < 0.72 ? 'suv' : r < 0.82 ? 'van' : r < 0.9 ? 'taxi' : r < 0.95 ? 'bus' : 'sport'; }
function manageTraffic() {
  if (PLAYER.interior) return;
  const live = CARS.filter((c) => c.mode === 'traffic');
  for (const c of CARS.slice()) { const d = Math.hypot(c.x - PLAYER.x, c.z - PLAYER.z); const stuck = c.mode === 'traffic' && c.tr && c.tr.stuck > 12 && d > 45; if (c.driver !== 'player' && c !== PLAYER.lastCar && c.driver !== 'police' && (d > Q.far * 0.36 + 120 || stuck) && !c.mission && !c.persist) c.remove(); }
  if (live.length < Q.traffic) for (let k = 0; k < 2; k++) {
    const sp = trafficSpawnPoint(70, Q.far * 0.33 + 60); if (!sp) break;
    const E = GRAPH.edges[sp[0]]; const busOK = ['primary', 'secondary', 'tertiary'].includes(E.type) && Math.random() < 0.05;
    const car = busOK ? new Car('bus', null, 0, 0, 0) : new Car(null, null, 0, 0, 0, trafficModel(E.type)); car.personality = rnd(0.85, 1.15); spawnTraffic(car, sp[0], sp[1], sp[2]);
  }
}

// ---------- parked cars (instanced low-detail, converted to real cars on interaction)
const PARKED = { slots: [], grid: new Map(), meshes: {} };
function buildParked() {
  const types = ['compact', 'sedan', 'suv', 'van'];
  DATA.R.forEach((rd) => {
    const t = RTN[rd[0]]; if (!['residential', 'tertiary', 'unclassified', 'living_street'].includes(t) || ROADCLASS(rd) === 'paving') return;
    const c = rd[4], w = rd[2], ow = !!(rd[3] & 1);
    // leave a real gap for traffic: lane edge vs. parked-car inner edge (car ~1.9 m wide, 0.95 m from the kerb line)
    const lane = ow ? (w >= 10 ? 1.8 : 0) : clamp(w / 4, 1.3, w >= 13 ? 2.4 : 1.7), inner = w / 2 - 1.9, gap = inner - (lane + 1.0);
    let sides = [];
    if (ow) { if (w >= 9) sides = [-1, 1]; else if (w >= 6.6) sides = [w * 7 % 2 < 1 ? -1 : 1]; }
    else if (gap >= 0.35) sides = w >= 12 ? [-1, 1] : [((c[0] * 13 + c[1] * 7) | 0) % 2 ? -1 : 1];
    if (!sides.length) return;
    for (let i = 0; i < c.length - 2; i += 2) {
      const x1 = c[i], z1 = c[i + 1], x2 = c[i + 2], z2 = c[i + 3], L = Math.hypot(x2 - x1, z2 - z1); if (L < 16) continue;
      const dx = (x2 - x1) / L, dz = (z2 - z1) / L;
      for (let s = 9; s < L - 9; s += 6.2) for (const side of sides) {
        if (Math.random() > (isHistoric(x1, z1) ? 0.18 : 0.33)) continue;
        const off = w / 2 - 0.95; const x = x1 + dx * s - dz * off * side, z = z1 + dz * s + dx * off * side;
        if (COL.nearSeg(x, z, 1.3)) continue;
        const h = Math.atan2(dx, dz) + (side < 0 ? Math.PI : 0);
        const mdl = KGEO ? pickModel((m) => m.phys !== 'truck' && m.phys !== 'moto') : null; PARKED.slots.push({ x, z, h, type: mdl ? mdl.id : pick(types), color: pickColor(), alive: true });
      }
    }
  });
  // parked cars: merged per 200 m chunk (one draw call each, culled by distance); paint colour baked per car
  if (KGEO) for (const s of PARKED.slots) if (!VMODELS[s.type]) { const m = modelForType(s.type); s.type = m ? m.id : 'polo'; }
  PARKED.slots.forEach((s, i) => { const k = Math.floor(s.x / 30) * 1000 + Math.floor(s.z / 30); let l = PARKED.grid.get(k); if (!l) PARKED.grid.set(k, l = []); l.push(i); });
  const glassC = new THREE.Color(0x26313a); const cc = new THREE.Color();
  // simplified per-model template: body (paint flagged) + 4 low-poly wheels
  const TPL = {};
  const lowWheel = (() => { const g = new THREE.CylinderGeometry(1, 1, 1, 10); g.rotateZ(Math.PI / 2); return g.toNonIndexed(); })();
  const template = (model) => {
    if (TPL[model.id]) return TPL[model.id]; const G = modelGeometry(model); const P = [], N = [], C = [], F = [];
    const push = (g, flag, col) => { const p = g.attributes.position.array, n = g.attributes.normal.array, c = g.attributes.color ? g.attributes.color.array : null; for (let i = 0; i < p.length / 3; i++) { P.push(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]); N.push(n[i * 3], n[i * 3 + 1], n[i * 3 + 2]); if (col) C.push(col.r, col.g, col.b); else C.push(c[i * 3], c[i * 3 + 1], c[i * 3 + 2]); F.push(flag); } };
    if (G.paint) push(G.paint, 1); if (G.rest) push(G.rest, 0); if (G.glass) push(G.glass, 0, glassC);
    const wr = (G.wheels[0] && G.wheels[0].y) || 0.33; const tire = new THREE.Color(0x1a1a1a);
    for (const w of G.wheels) { const g = lowWheel.clone(); g.scale(0.2, wr, wr); g.translate(w.x + (w.left ? 0.12 : -0.12), w.y, w.z); push(g, 0, tire); }
    return (TPL[model.id] = { P: new Float32Array(P), N: new Float32Array(N), C: new Float32Array(C), F: new Uint8Array(F) });
  };
  const chunks = new Map();
  PARKED.slots.forEach((s) => { const key = Math.floor(s.x / 200) + ',' + Math.floor(s.z / 200); let c = chunks.get(key); if (!c) chunks.set(key, c = []); c.push(s); });
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4, metalness: 0.35 });
  PARKED.chunks = [];
  // a chunk's geometry is built from its slots (skipping cars that have been taken); every buffer is released from RAM
  // once on the GPU (audit P0.1) and the chunk is simply rebuilt when one of its cars drives off
  function geoOf(list) {
    let n = 0; for (const s of list) if (s.alive !== false) n += template(VMODELS[s.type]).F.length;
    const pos = new Float32Array(n * 3), nor = new Int8Array(n * 3), col = new Uint8Array(n * 3); let o = 0;
    const k8 = (v) => Math.round(Math.min(1, Math.max(0, v)) * 255);
    for (const s of list) { if (s.alive === false) continue;
      const T = template(VMODELS[s.type]); cc.set(s.color); const ch = Math.cos(s.h), sh = Math.sin(s.h), y0 = heightAt(s.x, s.z) + 0.17;
      for (let i = 0; i < T.F.length; i++) { const x = T.P[i * 3], y = T.P[i * 3 + 1], z = T.P[i * 3 + 2]; pos[o * 3] = s.x + x * ch + z * sh; pos[o * 3 + 1] = y0 + y; pos[o * 3 + 2] = s.z - x * sh + z * ch;
        const nx = T.N[i * 3], nz = T.N[i * 3 + 2]; nor[o * 3] = Math.round((nx * ch + nz * sh) * 127); nor[o * 3 + 1] = Math.round(T.N[i * 3 + 1] * 127); nor[o * 3 + 2] = Math.round((-nx * sh + nz * ch) * 127);
        if (T.F[i]) { col[o * 3] = k8(T.C[i * 3] * cc.r); col[o * 3 + 1] = k8(T.C[i * 3 + 1] * cc.g); col[o * 3 + 2] = k8(T.C[i * 3 + 2] * cc.b); } else { col[o * 3] = k8(T.C[i * 3]); col[o * 3 + 1] = k8(T.C[i * 3 + 1]); col[o * 3 + 2] = k8(T.C[i * 3 + 2]); }
        o++; } }
    const free = function () { this.array = null; }; const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.computeBoundingSphere(); geo.attributes.position.onUpload(free);
    geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3, true).onUpload(free)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3, true).onUpload(free)); return geo;
  }
  PARKED.geoOf = geoOf;
  for (const [key, list] of chunks) {
    let cx = 0, cz = 0; for (const s of list) { cx += s.x; cz += s.z; }
    const m = new THREE.Mesh(geoOf(list), mat); m.castShadow = true; m.receiveShadow = true; scene.add(m); const ent = { mesh: m, x: cx / list.length, z: cz / list.length, list }; PARKED.chunks.push(ent); for (const s of list) s.chunk = ent;
  }
}
function updateParkedLOD() { if (!PARKED.chunks) return; const far = Q.far * 0.55 + 120; for (const c of PARKED.chunks) c.mesh.visible = Math.hypot(c.x - camera.position.x, c.z - camera.position.z) < far; }
function parkedNear(x, z, r) { const res = []; const a0 = Math.floor((x - r) / 30), a1 = Math.floor((x + r) / 30), b0 = Math.floor((z - r) / 30), b1 = Math.floor((z + r) / 30); for (let a = a0; a <= a1; a++) for (let b = b0; b <= b1; b++) { const l = PARKED.grid.get(a * 1000 + b); if (l) for (const i of l) { const s = PARKED.slots[i]; if (s.alive && Math.hypot(s.x - x, s.z - z) < r) res.push(s); } } return res; }
const HIDE = new THREE.Matrix4().makeScale(0, 0, 0);
function activateParked(s) { s.alive = false; if (s.chunk) { const m = s.chunk.mesh; m.geometry.dispose(); m.geometry = PARKED.geoOf(s.chunk.list); } const c = new Car(null, s.color, s.x, s.z, s.h, VMODELS[s.type]); c.mode = 'physics'; c.driver = null; c.fromParked = true; return c; }

// ---------- dynamic collisions between cars (and parked cars)
const CC_ACT = { f: -1, l: [] };
function carCollisions() {
  if (CC_ACT.f !== frame) { CC_ACT.f = frame; CC_ACT.l.length = 0; for (const c of CARS) { const dx = c.x - PLAYER.x, dz = c.z - PLAYER.z; if (!c.dead && dx * dx + dz * dz < 40000) CC_ACT.l.push(c); } } /* once per frame, not per substep (audit P1.3) */
  const active = CC_ACT.l;
  for (let i = 0; i < active.length; i++) {
    const A = active[i]; if (A.dead) continue; const ca = A.circles();
    // parked
    if (A.mode === 'physics' && !underground(A.x, A.z, A.y)) for (const s of parkedNear(A.x, A.z, 8)) { for (const [x, z, r] of ca) { const d = Math.hypot(s.x - x, s.z - z); if (d < r + 1.2) { if (A.speed > 4) { const c = activateParked(s); c.vx = A.vx * 0.6; c.vz = A.vz * 0.6; A.vx *= 0.55; A.vz *= 0.55; if (A.driver === 'player') { AUDIO.crash(A.speed); CAM.shake = 0.4; } } else { const nx = (x - s.x) / (d || 1), nz = (z - s.z) / (d || 1); const pen = r + 1.2 - d; A.x += nx * pen; A.z += nz * pen; const vn = A.vx * nx + A.vz * nz; if (vn < 0) { A.vx -= vn * nx * 1.3; A.vz -= vn * nz * 1.3; } } break; } } }
    for (let j = i + 1; j < active.length; j++) {
      const B = active[j]; if (Math.abs(A.x - B.x) > 14 || Math.abs(A.z - B.z) > 14) continue;
      if (A.mode === 'traffic' && B.mode === 'traffic') continue; if (!sameLevel(A.y, B.y)) continue;
      if (B.dead) continue; const cb = B.circles(); let done = false;
      for (const [ax, az, ar] of ca) { if (done) break; for (const [bx, bz, br] of cb) {
        const dx = bx - ax, dz = bz - az, d = Math.hypot(dx, dz); if (d >= ar + br || d < 1e-4) continue;
        const nx = dx / d, nz = dz / d, pen = ar + br - d;
        const rv = (B.vx - A.vx) * nx + (B.vz - A.vz) * nz;
        const ma = A.mode === 'traffic' ? 3 : A.T.mass, mb = B.mode === 'traffic' ? 3 : B.T.mass;
        const wa = mb / (ma + mb), wb = ma / (ma + mb);
        A.x -= nx * pen * wa; A.z -= nz * pen * wa; B.x += nx * pen * wb; B.z += nz * pen * wb;
        if (rv < 0) {
          const j2 = -1.3 * rv; A.vx -= nx * j2 * wa; A.vz -= nz * j2 * wa; B.vx += nx * j2 * wb; B.vz += nz * j2 * wb;
          const imp = -rv;
          for (const C of [A, B]) if (C.mode === 'traffic' && imp > 2.5) { C.mode = 'physics'; C.ctl = { thr: 0, brk: 1, steer: 0, hb: 0 }; C.crashed = true; C.honkT = 2; }
          if (imp > 3) { A.onImpact(imp * 0.6); B.onImpact(imp * 0.6); }
          if ((A.driver === 'player' && B.type === 'police') || (B.driver === 'player' && A.type === 'police')) { if (imp > 4) WANTED.crime(1, 'Embestir a la policía'); }
          else if ((A.driver === 'player' || B.driver === 'player') && imp > 6 && Math.random() < 0.3) WANTED.crime(0.5);
        }
        done = true; break;
      } }
    }
  }
}

// ---------- police AI
function updatePoliceAI(car, dt) {
  if (car.bailed) { car.siren = true; car.ctl = { thr: 0, brk: 1, steer: 0, hb: 0 }; return; }
  const tx = PLAYER.car ? PLAYER.car.x : PLAYER.x, tz = PLAYER.car ? PLAYER.car.z : PLAYER.z;
  const dist = Math.hypot(tx - car.x, tz - car.z);
  car.siren = true; car.ai = car.ai || { t: 0, path: null, wp: 0, rev: 0 };
  const ai = car.ai; ai.t -= dt;
  if (ai.t <= 0) { ai.t = 1.5 + Math.random(); if (dist > 35) { const p = GRAPH.route(GRAPH.nearestNode(car.x, car.z), GRAPH.nearestNode(tx, tz)); ai.path = p; ai.wp = 0; } else ai.path = null; }
  let gx = tx, gz = tz;
  if (ai.path && dist > 35) {
    const p = ai.path;
    while (ai.wp < p.length / 2 - 1 && Math.hypot(p[ai.wp * 2] - car.x, p[ai.wp * 2 + 1] - car.z) < 9) ai.wp++;
    gx = p[ai.wp * 2]; gz = p[ai.wp * 2 + 1];
  } else if (PLAYER.car) { gx += PLAYER.car.vx * 0.6; gz += PLAYER.car.vz * 0.6; }
  const want = Math.atan2(gx - car.x, gz - car.z); const d = angDiff(car.h, want);
  const c = car.ctl;
  if (ai.rev > 0) { ai.rev -= dt; c.thr = 0; c.brk = 1; c.steer = -Math.sign(d); c.hb = 0; return; }
  c.steer = clamp(d * 2.2, -1, 1); c.hb = Math.abs(d) > 1.3 && car.fwdV > 12 ? 1 : 0;
  const slow = !PLAYER.car && dist < 9;
  c.thr = slow ? 0 : (Math.abs(d) > 1.6 ? 0.45 : 1); c.brk = slow ? 1 : 0;
  if (!PLAYER.car && dist < 30) c.thr = Math.min(c.thr, 0.55);
  if (c.thr > 0 && car.speed < 1.2) { ai.stuck = (ai.stuck || 0) + dt; if (ai.stuck > 1.4) { ai.rev = 1.3; ai.stuck = 0; } } else ai.stuck = 0;
}

// ---------- tram
const TRAM = { parts: null, s: 0, dir: 1, wait: 0, cum: [], stops: [] };
function buildTram() {
  const T = DATA.T; if (T.length < 6) return; TRAM.parts = makeTram();
  TRAM.cum = [0]; for (let i = 2; i < T.length; i += 2) TRAM.cum.push(TRAM.cum[TRAM.cum.length - 1] + Math.hypot(T[i] - T[i - 2], T[i + 1] - T[i - 1]));
  TRAM.len = TRAM.cum[TRAM.cum.length - 1];
  // stops: tram_stop POIs projected
  for (const p of DATA.P) if (p[1] === 'tram_stop') { let best = 0, bd = 1e9; for (let i = 0; i < T.length; i += 2) { const d = Math.hypot(T[i] - p[2], T[i + 1] - p[3]); if (d < bd) { bd = d; best = TRAM.cum[i / 2]; } } if (bd < 30 && !TRAM.stops.some((s) => Math.abs(s - best) < 40)) TRAM.stops.push(best); }
  TRAM.stops.push(25); TRAM.s = 400; TRAM.circ = [];
}
function tramAt(s, out) { const T = DATA.T, c = TRAM.cum; s = clamp(s, 0, TRAM.len); let k = 1; while (k < c.length - 1 && c[k] < s) k++; const t = (s - c[k - 1]) / ((c[k] - c[k - 1]) || 1); out.x = lerp(T[(k - 1) * 2], T[k * 2], t); out.z = lerp(T[(k - 1) * 2 + 1], T[k * 2 + 1], t); return out; }
function updateTram(dt) {
  if (!TRAM.parts) return;
  if (TRAM.wait > 0) TRAM.wait -= dt;
  else {
    const prev = TRAM.s; TRAM.s += TRAM.dir * 10 * dt;
    for (const st of TRAM.stops) if ((prev - st) * (TRAM.s - st) <= 0) { TRAM.wait = 12; AUDIO.bell && AUDIO.bell(Math.hypot(TRAM.parts[0].position.x - PLAYER.x, TRAM.parts[0].position.z - PLAYER.z)); }
    if (TRAM.s > TRAM.len - 20) { TRAM.s = TRAM.len - 20; TRAM.dir = -1; TRAM.wait = 20; } if (TRAM.s < 18) { TRAM.s = 18; TRAM.dir = 1; TRAM.wait = 20; }
  }
  let s = TRAM.s; TRAM.circ.length = 0; const a = {}, b = {};
  for (let i = 0; i < 3; i++) {
    const p = TRAM.parts[i]; const L = p.userData.len; tramAt(s + L / 2 * TRAM.dir, a); tramAt(s - L / 2 * TRAM.dir, b);
    const cx = (a.x + b.x) / 2, cz = (a.z + b.z) / 2; p.position.set(cx, heightAt(cx, cz) + 0.15, cz); p.rotation.y = Math.atan2(a.x - b.x, a.z - b.z);
    for (let k = -1; k <= 1; k++) TRAM.circ.push([cx + (a.x - b.x) / L * k * L * 0.33, cz + (a.z - b.z) / L * k * L * 0.33, 1.35]);
    s -= (L + 0.6) * TRAM.dir;
  }
}
