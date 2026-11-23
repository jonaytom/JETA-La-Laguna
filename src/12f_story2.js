// ============ HISTORIA 2: los defensores de La Laguna (v0.56) ============
// After El Blanco's shooting range: the pistol is a plastic-ball airsoft replica; a robbery at a pharmacy (a 2D fight with
// the first thief, a car chase and a ball shot for the second), the mayor «Don Yovoy Gofiérrez» names the gang the city's
// defenders (a special unit of the Policía Local) in the Ayuntamiento, and then jobs with the gang and for the mayor.
// Every mission here uses the toolkit MISSIONS.kit and is appended to the story with MISSIONS.addStory().
const S2 = { npcs: [], cars: [], extras: [], marks: [], mid: 0, chase: [] };
const K2 = () => MISSIONS.kit;
const b2 = (s) => `<b>${s}</b>`;
// ---------- helpers
function s2Human(o, x, z, face) {
  const H = makeHuman(o);
  const [a, b] = safeSpot(x, z, 0.6);
  H.root.position.set(a, heightAt(a, b) + 0.17, b);
  H.root.rotation.y = face ? Math.atan2(face[0] - a, face[1] - b) : Math.random() * 6;
  scene.add(H.root);
  const n = { H, x: a, z: b };
  S2.npcs.push(n);
  return n;
}
function s2Car(model, color, x, z, h) {
  const m = VMODELS[model];
  const c = new Car(m ? null : model, color, x, z, h || 0, m || undefined);
  c.mission = true;
  c.persist = true;
  c.driver = null;
  c.mode = 'physics';
  c.ctl.brk = 1;
  c.vx = c.vz = 0;
  c.fwdV = 0;
  S2.cars.push(c);
  return c;
}
function s2Clear() {
  for (const n of S2.npcs) if (n.H.root.parent) n.H.root.parent.remove(n.H.root);
  S2.npcs.length = 0;
  for (const c of S2.cars)
    if (!c.dead && c !== PLAYER.car && !c.keep) c.remove();
    else if (c.mode === 'race') {
      c.mode = 'physics';
      c.driver = null;
      c.ctl.brk = 1;
    }
  S2.cars.length = 0;
  for (const o of S2.extras) {
    if (o.parent) o.parent.remove(o);
    o.traverse((m) => {
      if (m.geometry && !m.geometry.userData.shared) m.geometry.dispose();
    });
  }
  S2.extras.length = 0;
  S2.marks.length = 0;
  S2.chase.length = 0; /* props made for one mission (the stolen benches, the arrows) */
  WEAPON.targets = [];
  WEAPON.onHit = null;
  WEAPON.onShot = null;
  WEAPON.lawful = false;
  if (typeof clearFires === 'function') clearFires();
  if (typeof RIFLE !== 'undefined') {
    RIFLE.targets = [];
    RIFLE.onDouse = null;
    RIFLE.onFireOut = null;
  } // v0.76
}
const s2Pass = (title, money) => {
  s2Clear();
  K2().pass(title, money);
};
const s2Fail = (why) => {
  s2Clear();
  K2().fail(why);
};
function s2Spot(x, z) {
  const rd = ROADSEG.nearest(x, z, (r) => r[0] <= 12 && !(r[3] & 6));
  return rd ? [rd.x, rd.z, Math.atan2(rd.dx, rd.dz)] : [x, z, 0];
} /* [x, z, heading along the street] */
// every point of a route at least m metres inside the play area (near the edge the border warning pulls you back)
function s2FarFromEdge(r, m = 90) {
  for (let i = 0; i < r.length; i += 4) if (worldEdgeDist(r[i], r[i + 1]) < m) return false;
  return true;
}
// v1.4.22 (Jonay, 2-nov: «la de los bancos de Gofiérrez te manda desde Las Gavias hasta la Alhóndiga, media
// ciudad»): of the places a mission can send you to (industrial buildings...), the one on the way to the start of the
// line's next mission, within minD–maxD of where you are; a random one when there is no next mission
function s2TowardNext(list, minD, maxD) {
  const ok = list.filter((b) => {
    const d = Math.hypot(b.cx - PLAYER.x, b.cz - PLAYER.z);
    return d > minD && d < maxD && worldEdgeDist(b.cx, b.cz) > 120;
  });
  if (!ok.length) return null;
  const T = K2().nextStart && K2().nextStart();
  if (!T) return ok[Math.floor(Math.random() * ok.length)];
  ok.sort((a, b) => Math.hypot(a.cx - T[0], a.cz - T[1]) - Math.hypot(b.cx - T[0], b.cz - T[1]));
  return ok[Math.floor(Math.random() * Math.min(3, ok.length))];
}
function s2Route(x, z, minL, maxL, away) {
  // v1.4.16 (Jonay: «que vaya en un sentido que nos acerque a la siguiente»): towards the start of the line's next
  // mission, unless that means running at the player (away = the direction they flee in)
  const T = K2().nextStart();
  if (T && (away == null || Math.abs(angDiff(away, Math.atan2(T[0] - x, T[1] - z))) < 1.6)) {
    const r = routeToward(x, z, T[0], T[1], minL, maxL, (q) => s2FarFromEdge(q));
    if (r) return r;
  }
  const from = GRAPH.nearestNode(x, z);
  let best = null;
  for (let k = 0; k < 50; k++) {
    const a = away != null ? away + rnd(-0.9, 0.9) : Math.random() * 6.283,
      d = rnd(minL * 0.6, maxL * 0.8);
    const to = GRAPH.nearestNode(x + Math.sin(a) * d, z + Math.cos(a) * d);
    const r = GRAPH.route(from, to);
    if (!r || r.length < 4 || !s2FarFromEdge(r)) continue;
    let L = 0;
    for (let i = 2; i < r.length; i += 2) L += Math.hypot(r[i] - r[i - 2], r[i + 1] - r[i - 1]);
    if (L >= minL && L <= maxL) return r;
    if (!best || Math.abs(L - minL) < best[0]) best = [Math.abs(L - minL), r];
  }
  return best ? best[1] : [x, z, x + minL, z];
}
// something that moves along a polyline (a fleeing car, a bus, a runner): s = distance done, v = speed
function s2Path(pts) {
  const cum = [0];
  for (let i = 2; i < pts.length; i += 2) cum.push(cum[cum.length - 1] + Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]));
  const tot = cum[cum.length - 1];
  const at = (s) => {
    s = clamp(s, 0, tot);
    let k = 1;
    while (k < cum.length - 1 && cum[k] < s) k++;
    const t = (s - cum[k - 1]) / (cum[k] - cum[k - 1] || 1);
    return [
      lerp(pts[(k - 1) * 2], pts[k * 2], t),
      lerp(pts[(k - 1) * 2 + 1], pts[k * 2 + 1], t),
      Math.atan2(pts[k * 2] - pts[(k - 1) * 2], pts[k * 2 + 1] - pts[(k - 1) * 2 + 1])
    ];
  };
  return { pts, cum, tot, at, s: 0, v: 0 };
}
// v1.4.22 (Jonay, 17-nov: «corren bien en recta pero frenan muy rápido y trazan las curvas girando 90 grados; el giro
// debe ser normal como cualquier coche, incluso usando freno de mano, porque es una persecución»): the route is turned
// into a drivable line once (every corner rounded with a real turning radius, as wide as the street lets it be) with
// a speed plan along it: as fast as the grip allows in each bend, braking for it in time with a car's brakes (no more
// stopping dead), and speeding up again with a car's pick-up. In a chase the tail slides out in the tight bends (a
// handbrake turn): the nose points into the bend, the wheels counter-steer.
const DRIVE_PROF = {
  chase: { R: 13, lat: 8.5, brake: 8.5, acc: 5.2, drift: 1 },
  car: { R: 12, lat: 6.5, brake: 6.5, acc: 3.8, drift: 0.35 },
  bus: { R: 15, lat: 2.8, brake: 3.2, acc: 1.6, drift: 0 }
};
function drivePlan(pts, pf) {
  // 1) clean polyline (no repeated points)
  const P = [pts[0], pts[1]];
  for (let i = 2; i < pts.length; i += 2) if (Math.hypot(pts[i] - P[P.length - 2], pts[i + 1] - P[P.length - 1]) > 0.5) P.push(pts[i], pts[i + 1]);
  // Collinear map samples are not junctions. Keeping them as corners used to cap
  // the radius at 45% of a tiny segment even when the approach was a long straight.
  const clean = [];
  for (let j = 0; j < P.length; j += 2) {
    const x = P[j],
      z = P[j + 1],
      n = clean.length;
    if (n >= 4) {
      const ax = clean[n - 2] - clean[n - 4],
        az = clean[n - 1] - clean[n - 3];
      const bx = x - clean[n - 2],
        bz = z - clean[n - 1];
      const cross = Math.abs(ax * bz - az * bx);
      if (ax * bx + az * bz > 0 && cross < 0.008 * Math.hypot(ax, az) * Math.hypot(bx, bz) && cross < 0.08 * Math.hypot(ax + bx, az + bz))
        clean.length -= 2;
    }
    clean.push(x, z);
  }
  const n = clean.length / 2;
  // 2) every corner replaced by an arc: radius pf.R, or less when the legs are short (the tangent length can take at
  // most 45 % of each leg, so two corners never overlap)
  const out = [clean[0], clean[1]];
  for (let i = 1; i < n - 1; i++) {
    const x = clean[i * 2],
      z = clean[i * 2 + 1];
    const ax = x - clean[i * 2 - 2],
      az = z - clean[i * 2 - 1],
      bx = clean[i * 2 + 2] - x,
      bz = clean[i * 2 + 3] - z;
    const la = Math.hypot(ax, az),
      lb = Math.hypot(bx, bz);
    const th = Math.abs(angDiff(Math.atan2(ax, az), Math.atan2(bx, bz)));
    if (th < 0.04) {
      out.push(x, z);
      continue;
    }
    const tth = Math.tan(Math.min(th, 2.6) / 2);
    const t = Math.min(pf.R * tth, la * 0.45, lb * 0.45);
    const p0x = x - (ax / la) * t,
      p0z = z - (az / la) * t,
      p1x = x + (bx / lb) * t,
      p1z = z + (bz / lb) * t;
    // a rational quadratic traces the circular arc tangent to both streets
    const k = Math.max(3, Math.ceil(th * 7));
    for (let j = 0; j <= k; j++) {
      const u = j / k,
        w0 = (1 - u) * (1 - u),
        w1 = 2 * u * (1 - u) * Math.cos(th / 2),
        w2 = u * u;
      const sum = w0 + w1 + w2;
      out.push((w0 * p0x + w1 * x + w2 * p1x) / sum, (w0 * p0z + w1 * z + w2 * p1z) / sum);
    }
  }
  out.push(clean[n * 2 - 2], clean[n * 2 - 1]);
  // 3) resampled every metre: position, heading and signed curvature
  const src = s2Path(out),
    N = Math.max(2, Math.ceil(src.tot) + 1);
  const tot = src.tot,
    ds = tot / (N - 1) || 1;
  const X = new Float32Array(N),
    Z = new Float32Array(N),
    H = new Float32Array(N),
    K = new Float32Array(N),
    V = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const q = src.at(i * ds);
    X[i] = q[0];
    Z[i] = q[1];
  }
  // where several corners come close together (roundabouts, short links) the arcs alone stay tight: a few passes of a
  // moving average (±3 m) open them up, moving the line at most a metre or two inside the street
  {
    const tx = new Float32Array(N),
      tz = new Float32Array(N),
      w = Math.max(1, Math.round(3 / ds));
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 0; i < N; i++) {
        if (i < w || i >= N - w) {
          tx[i] = X[i];
          tz[i] = Z[i];
          continue;
        }
        let sx = 0,
          sz = 0;
        for (let j = -w; j <= w; j++) {
          sx += X[i + j];
          sz += Z[i + j];
        }
        tx[i] = sx / (2 * w + 1);
        tz[i] = sz / (2 * w + 1);
      }
      X.set(tx);
      Z.set(tz);
    }
  }
  const idx = (s) => clamp(s / ds, 0, N - 1);
  const at = (s) => {
    const f = idx(s),
      i = Math.min(N - 2, Math.floor(f)),
      t = f - i;
    return [lerp(X[i], X[i + 1], t), lerp(Z[i], Z[i + 1], t), H[i] + angDiff(H[i], H[i + 1]) * t];
  };
  const plan = { pts: out, tot, at, X, Z, H, K, V, ds, N, idx, pf };
  measureDriveLine(plan);
  const cum = [];
  for (let i = 0; i < N; i++) cum.push(i * ds);
  plan.cum = cum;
  return plan;
}
// the plan of a route, made the first time it is driven (s2Path objects keep their s, v and tot meaning: they now run
// along the drivable line)
function measureDriveLine({ N, X, Z, H, K, V, ds, pf }) {
  for (let i = 0; i < N; i++) {
    const a = Math.max(0, i - 1),
      b = Math.min(N - 1, i + 1);
    H[i] = Math.atan2(X[b] - X[a], Z[b] - Z[a]);
  }
  for (let i = 0; i < N; i++) {
    const a = Math.max(0, i - 2),
      b = Math.min(N - 1, i + 2);
    K[i] = b > a ? angDiff(H[a], H[b]) / ((b - a) * ds) : 0;
  }
  // 4) speed plan: the grip limit in each bend, then backwards so the car brakes for it in time
  for (let i = 0; i < N; i++) V[i] = Math.sqrt(pf.lat / Math.max(Math.abs(K[i]), 1e-4));
  for (let i = N - 2; i >= 0; i--) V[i] = Math.min(V[i], Math.sqrt(V[i + 1] * V[i + 1] + 2 * pf.brake * ds));
}
function s2Plan(P, pf) {
  if (P.D && P.D.pf === pf) return P.D;
  const D = drivePlan(P.pts, pf);
  D.pf = pf;
  if (P.s > 0) {
    // where along the new line the car already is
    const q = P.at(P.s);
    let bi = 0,
      bd = 1e9;
    for (let i = 0; i < D.N; i += 2) {
      const d = (D.X[i] - q[0]) ** 2 + (D.Z[i] - q[1]) ** 2;
      if (d < bd) {
        bd = d;
        bi = i;
      }
    }
    P.s = bi * D.ds;
  }
  Object.assign(P, { pts: D.pts, cum: D.cum, tot: D.tot, at: D.at, D });
  return D;
}
// one step of a car on its plan: speed (pick-up and brakes of a car), pose on the line (off: metres to the right of
// it), heading with the slide of the tail, steering of the front wheels
function driveOnPlan(c, D, st, dt, vt, off) {
  const pf = D.pf;
  const previousV = st.v;
  const f = D.idx(st.s),
    i = Math.min(D.N - 1, Math.round(f));
  vt = Math.min(vt, D.V[i]);
  if (vt > st.v) st.v = Math.min(vt, st.v + pf.acc * dt * (1 - 0.45 * clamp(st.v / 40, 0, 1)));
  else st.v = Math.max(vt, st.v - pf.brake * 1.15 * dt);
  st.s = Math.min(D.tot, st.s + st.v * dt);
  const q = D.at(st.s),
    k = D.K[Math.min(D.N - 1, Math.round(D.idx(st.s)))];
  // the slide: grows with how hard the bend is taken (lateral acceleration over ~5 m/s²), and settles with a lag
  const lat = st.v * st.v * Math.abs(k);
  const want = pf.drift * Math.sign(k) * clamp((lat - 4.5) / 9, 0, 1) * 0.42;
  st.dr = lerp(st.dr || 0, want, clamp(dt * (Math.abs(want) > Math.abs(st.dr || 0) ? 4 : 2.2), 0, 1));
  const x = q[0] + Math.cos(q[2]) * off;
  const z = q[1] - Math.sin(q[2]) * off;
  // Anticipate the bend, then turn the body with a finite yaw speed and yaw acceleration.
  // The rendered chassis, its roll and the front wheels now follow the same manoeuvre.
  const ahead = D.at(st.s + Math.min(4, 1 + st.v * 0.15));
  const target = q[2] + 0.5 * angDiff(q[2], ahead[2]) + st.dr;
  const maxRate = Math.min(1.35, st.v * 0.27);
  const rate = clamp(angDiff(c.h, target) * 5 + st.v * k, -maxRate, maxRate);
  c.yawRate += clamp(rate - c.yawRate, -3.2 * dt, 3.2 * dt);
  const heading = c.h + c.yawRate * dt;
  if (c.ctl) c.ctl.brk = st.v < previousV ? 1 : 0; // v1.4.42: plans are also driven on bare points (prueba_0851)
  c.x = x;
  c.z = z;
  c.h = heading;
  c.fwdV = st.v;
  c.vx = Math.sin(q[2]) * st.v;
  c.vz = Math.cos(q[2]) * st.v;
  // front wheels: the bend (wheelbase ≈ 2.7 m), minus the counter-steer while sliding
  const steer = clamp(Math.atan(2.7 * k) - st.dr * 1.4, -0.6, 0.6);
  c.steer += clamp(steer - c.steer, -1.8 * dt, 1.8 * dt);
  if (c.ctl) c.ctl.hb = Math.abs(st.dr) > 0.14 ? 1 : 0;
  return q;
}
// car driven along the path (kinematic): grip-limited bends, real braking, keeps a gap to the player
function s2DriveCar(c, P, dt, top, gapRule, chase = false) {
  // v0.85.1 (Jonay: chases too easy): a car running away from you goes a bit faster
  if (chase) top *= 1.1;
  const pf = c.type === 'bus' ? DRIVE_PROF.bus : chase ? DRIVE_PROF.chase : DRIVE_PROF.car;
  const D = s2Plan(P, pf);
  let vt = top;
  if (gapRule) vt *= gapRule(Math.hypot(PLAYER.x - c.x, PLAYER.z - c.z));
  driveOnPlan(c, D, P, dt, vt, 1.6);
  return P.s >= P.tot - 1;
}
function s2Runner(n, P, dt, speed, off = 0) {
  // a person running away along the path (off: metres to the side of the road axis)
  const d = Math.hypot(PLAYER.x - n.x, PLAYER.z - n.z);
  const v = d > 40 ? speed * 0.55 : speed * (0.85 + 0.15 * Math.sin(performance.now() / 900));
  P.s = Math.min(P.tot, P.s + v * dt);
  const q = P.at(P.s);
  const o2 = off * clamp(P.s / 12, 0, 1);
  const [x, z] = [q[0] + Math.cos(q[2]) * o2, q[1] - Math.sin(q[2]) * o2];
  if (n.blip) {
    n.bt = (n.bt || 0) - dt;
    if (n.bt <= 0) {
      n.bt = 0.6;
      K2().track(n.x, n.z, 3);
    }
  }
  const r = COL.resolve(x, z, 0.35);
  let mx = r.x - n.x,
    mz = r.z - n.z;
  const ml = Math.hypot(mx, mz),
    lim = v * dt * 1.8 + 0.03;
  if (ml > lim) {
    mx *= lim / ml;
    mz *= lim / ml;
  }
  /* never a sudden jump */ n.x += mx;
  n.z += mz;
  n.H.root.position.set(n.x, heightAt(n.x, n.z) + 0.17, n.z);
  n.H.root.rotation.y = q[2];
  animHuman(n.H, dt, v);
  return P.s >= P.tot - 1;
}
// escape route on foot that starts exactly where the person is (a route from the nearest graph node alone could start
// tens of metres away and he'd vanish on the first frame)
function s2RunPath(n, minL, maxL, turn = 0) {
  const away = Math.atan2(n.x - PLAYER.x, n.z - PLAYER.z) + turn; /* always away from the player */
  const r = s2Route(n.x, n.z, minL, maxL, away),
    ex = r[r.length - 2],
    ez = r[r.length - 1];
  const w = WALKG.route(n.x, n.z, ex, ez); /* on foot they keep to pavements, squares and paths (a road route cut through walls) */
  if (w && w.length >= 4 && s2FarFromEdge(w, 60)) {
    const P = s2Path([n.x, n.z, ...w]);
    if (P.tot > minL * 0.5) return P;
  } /* too short (the end fell on the same walk node): road route */
  return s2Path([n.x, n.z, ...r]);
}
// a bouncing arrow over whoever must be chased (person or car) for the first seconds, so the player sees who it is
let S2_ARROW = null;
function s2Mark(o, secs = 8) {
  if (!S2_ARROW) {
    const g = new THREE.ConeGeometry(0.45, 0.9, 4);
    g.rotateX(Math.PI);
    g.userData.shared = true;
    const ring = new THREE.TorusGeometry(0.35, 0.07, 6, 16);
    ring.rotateX(Math.PI / 2);
    ring.translate(0, 0.75, 0);
    ring.userData.shared = true;
    S2_ARROW = { g, ring, m: new THREE.MeshBasicMaterial({ color: 0xff3b30, depthTest: false, transparent: true, opacity: 0.95 }) };
  }
  const a = new THREE.Group();
  a.add(new THREE.Mesh(S2_ARROW.g, S2_ARROW.m), new THREE.Mesh(S2_ARROW.ring, S2_ARROW.m));
  a.renderOrder = 20;
  a.children.forEach((c) => {
    c.renderOrder = 20;
  });
  scene.add(a);
  S2.extras.push(a);
  S2.marks.push({ o, a, t: secs, id: ++S2.mid });
  s2Chase(o);
}
// whoever is being chased is a red dot on the minimap and the big map for as long as the chase lasts
function s2Chase(o) {
  if (!S2.chase.includes(o)) S2.chase.push(o);
}
function s2Blips() {
  const b = [];
  for (const o of S2.chase) {
    if (o.down || o.dead || (o.H && !o.H.root.visible)) continue;
    b.push([o.x, o.z, MAP_MARK.chase]);
  }
  return b;
}
function s2Fight(m, name, look, opts, onWin, onLose) {
  if (PLAYER.car) exitCar();
  const b = opts.npc;
  FIGHT2D.start({
    a: { name: 'EL CHOPA', look: lookCopy(playerHuman.look), nose: true },
    b: { name, look: look || {}, deal: opts.deal ?? 0.8, recv: opts.recv ?? 1.0, ai: { lv: opts.lv ?? 0.5, t: 0, blockT: 0 } },
    ax: PLAYER.x,
    az: PLAYER.z,
    bx: b ? b.x : PLAYER.x + 2,
    bz: b ? b.z : PLAYER.z,
    hide: [playerHuman.root, b && b.H.root, WEAPON.mesh].filter(Boolean),
    single: true,
    onEnd: (r) => {
      if (!K2().isActive(m)) return;
      if (r.won) onWin();
      else onLose();
    }
  });
}
function s2Armed(n) {
  if (!WEAPON.has) giveWeapon(6, false);
  WEAPON.ammo = Math.max(WEAPON.ammo, 6);
  WEAPON.out = true;
  if (WEAPON.mesh) WEAPON.mesh.visible = true;
  updateWeaponHUD();
  WEAPON.lawful = true;
}
function s2Target(n, onHit) {
  const t = { x: n.x, y: 0, z: n.z, r: 0.5, hit: false, npc: n };
  WEAPON.targets = [t];
  WEAPON.onHit = (h) => {
    if (h === t) onHit();
  };
  WEAPON.onShot = () => {
    if (WEAPON.ammo <= 0)
      setTimeout(() => {
        if (WEAPON.lawful) {
          WEAPON.ammo = 6;
          updateWeaponHUD();
          HUD.toast('El Blanco te lanza otro cargador de bolas', '#f5b72e', 2);
        }
      }, 1200);
  };
  return t;
}
function s2TrackTarget(t) {
  if (!t || t.hit) return;
  t.x = t.npc.x;
  t.z = t.npc.z;
  t.y = heightAt(t.x, t.z) + 1.1;
}
// v0.74 (Jonay: the figure froze on the shot that stops it): it falls (the 'down' animation keeps playing in
// story2Tick), a thud, and it moans now and then while you are near
const S2_QUEJIDOS = [
  '¡Ay, ay, ay... mi madre!',
  '¡Uuuf... que me has dao, chacho!',
  '¡Ayyy... vale, vale, me rindo!',
  '¡Ños, qué daño... para ya!',
  '¡Ay mi pierna... socorro!'
];
function s2Down(n) {
  if (n.H.skinned) n.H.oneShot = 0;
  n.down = true;
  n.downT = 0;
  n.moan = 0.4;
  AUDIO.thud && AUDIO.thud(2);
}
function s2DownTick(dt) {
  for (const n of S2.npcs) {
    if (!n.down || !n.H || !n.H.root.visible) continue;
    n.downT += dt;
    animHuman(n.H, dt, 0, 'down');
    n.moan -= dt;
    if (n.moan <= 0 && n.downT < 14) {
      n.moan = 3.5 + Math.random() * 3;
      if (Math.hypot(PLAYER.x - n.x, PLAYER.z - n.z) < 25) SUB.show('<b>' + (n.name || 'Herido') + ':</b> ' + pick(S2_QUEJIDOS), 2.2);
    }
  }
}
const s2Near = (x, z, r) => Math.hypot(PLAYER.x - x, PLAYER.z - z) < r;
// at the current beacon (K.goto moves the goal to a safe spot, so check against that and not the raw point)
const s2AtGoal = (r) => {
  const g = K2().data.goal;
  return !!g && s2Near(g[0], g[1], r);
};
const THIEF_LOOKS = [
  {
    skin: 0xc68a63,
    shirt: 0x222222,
    pants: 0x30363d,
    hair: 0x111111,
    hairStyle: 'Hair_Buzzed',
    beanie: 0x1a1a1a,
    longPants: true,
    sleeve: true,
    hd: true,
    random: true
  },
  {
    skin: 0xe0b08c,
    shirt: 0x8a1c1c,
    pants: 0x223a5e,
    hair: 0x5a3a20,
    hairStyle: 'Hair_SimpleParted',
    longPants: true,
    sleeve: false,
    hd: true,
    glasses: 'sun',
    random: true
  },
  {
    skin: 0xb27650,
    shirt: 0x3d5a3a,
    pants: 0x2a2a2a,
    hair: 0x221a12,
    hairStyle: 'Hair_Long',
    beard: true,
    longPants: true,
    sleeve: true,
    hd: true,
    jacket: 0x4a4a4a,
    random: true
  }
];
// ---------- the mayor, Don Yovoy Gofiérrez: black suit and a big moustache, under the arches of the Ayuntamiento
function story2Init() {
  if (!AYTO.ok) return;
  const H = makeHuman({
    skin: 0xd9a07e,
    shirt: 0x131313,
    pants: 0x101010,
    jacket: 0x151515,
    shoes: 0x080808,
    hair: 0x2b2018,
    hairStyle: 'Hair_SimpleParted',
    scale: 1.02,
    female: false,
    beard: false,
    build: { normal: 0.6, fat: 0.75 },
    longPants: true,
    sleeve: true,
    hd: true,
    sole: 0x111111
  });
  const mo = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.011, 0.016), M(0x2b2018, 0.9));
  mo.position.set(0, 0.056, 0.118);
  H.head.add(mo); // moustache
  for (const sx of [-1, 1]) {
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.022, 0.014), M(0x2b2018, 0.9));
    tip.position.set(sx * 0.033, 0.047, 0.112);
    H.head.add(tip);
  }
  let [x, z] = AYTO.door;
  let col = true; // v0.99.6 (auditor: «poste en la Calle Juan de Vera»): he stands in the porch, not in the street
  // v1.2.5 (the auditor still saw him in the middle of C. Juan de Vera): not only the nearest street; the door is
  // between two, and the nearest one alone said «off the road» while he stood in the other (onCarriagewayEarly looks
  // at the three nearest)
  const onCarriageway = onCarriagewayEarly;
  if (onCarriageway(x, z, 0.3)) {
    col = false;
    for (const sg of [-1, 1]) {
      let qx = x,
        qz = z;
      for (let k = 0; k < 16 && onCarriageway(qx, qz, 0.3); k++) {
        qx += sg * AYTO.nx * 0.3;
        qz += sg * AYTO.nz * 0.3;
      }
      if (!onCarriageway(qx, qz, 0.3)) {
        x = qx;
        z = qz;
        col = true;
        break;
      }
    }
  } // (else: no collider, cars pass him)
  H.root.position.set(x, heightAt(x, z) + 0.72, z);
  H.root.rotation.y = Math.atan2(AYTO.nx, AYTO.nz);
  scene.add(H.root);
  NPC.alcalde = { x, z, H, home: [x, z], name: 'Don Yovoy Gofiérrez' };
  if (col) COL.addCirc(x, z, 0.4);
}
// nothing of these missions may survive them (a failure, an abort, loading a game saved halfway…)
function story2Tick(dt) {
  if (
    !MISSIONS.active &&
    (S2.npcs.length || S2.cars.length || S2.extras.length || WEAPON.lawful || WEAPON.onHit || FIRES.some((f) => !f.free) || RIFLE.targets.length)
  ) {
    s2Clear();
    return;
  }
  try {
    s2DownTick(dt);
  } catch (e) {}
  for (let i = S2.marks.length - 1; i >= 0; i--) {
    const k = S2.marks[i],
      o = k.o;
    k.t -= dt;
    const hid = o.H ? !o.H.root.visible || o.down : o.dead;
    if (k.t <= 0 || hid) {
      if (k.a.parent) k.a.parent.remove(k.a);
      S2.marks.splice(i, 1);
      continue;
    }
    const top = o.H ? 2.5 : (o.T ? o.T.H : 1.6) + 1.2;
    k.a.position.set(
      o.x,
      heightAt(o.x, o.z) + (o.y && !o.H ? o.y - heightAt(o.x, o.z) : 0) + top + 0.35 * Math.abs(Math.sin(performance.now() / 220)),
      o.z
    );
    k.a.rotation.y += dt * 3;
    k.a.scale.setScalar(o.H ? 1 : 1.5);
  }
}
const ALC = 'Don Yovoy Gofiérrez';
const startAtAlcalde = () => (AYTO.ok ? AYTO.front : [100, 40]);
const startAt =
  (k, dx = 1.3) =>
  () => [NPC[k].x + dx, NPC[k].z + dx];

// ---------- 1. Atraco en la farmacia
const M_FARMACIA = {
  title: 'Atraco en la farmacia',
  who: 'Rayco «El Blanco»',
  hint() {
    return 'Ve a ver a ' + b2('El Blanco') + ': tiene algo que contarte de la pistola';
  },
  startPos: startAt('blanco'),
  start() {
    const K = K2();
    this.st = { step: 0 };
    const ph = poiNear('pharmacy', PLAYER.x, PLAYER.z);
    this.st.ph = ph ? [ph[2], ph[3], ph[0] >= 0 ? STR[ph[0]] : 'la farmacia'] : [PLAYER.x + 200, PLAYER.z, 'la farmacia'];
    K.talk(
      [
        ['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'],
        [K.CH, 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.'],
        ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»'],
        [
          'Radio de la Local (en el escáner de El Blanco)',
          `Atraco en curso en ${this.st.ph[2]}. Dos individuos. Todas las patrullas ocupadas en las fiestas.`
        ],
        [K.CH, 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!']
      ],
      () => {
        if (!K.isActive(this)) return;
        s2Armed();
        this.st.step = 1;
        const [x, z] = s2Spot(this.st.ph[0], this.st.ph[1]);
        K.goto(x, z, 4, 0xe53935);
        K.setObjective('Ve a ' + b2(this.st.ph[2]) + ' antes de que se escapen los ladrones');
        K.setTimer(150);
      }
    );
  },
  update(dt) {
    const K = K2(),
      S = this.st;
    if (!S) return;
    if (S.step === 1 && K.data.goal && s2Near(K.data.goal[0], K.data.goal[1], 6)) {
      if (PLAYER.car && PLAYER.car.speed > 3) return;
      K.setTimer(0);
      K.clearBeacon();
      S.step = 2;
      const [x, z] = K.data.goal || [PLAYER.x, PLAYER.z];
      S.t1 = s2Human(THIEF_LOOKS[0], x + 2, z + 1.5, [PLAYER.x, PLAYER.z]);
      S.t2 = s2Human(THIEF_LOOKS[1], x - 3, z - 2);
      K.talk(
        [
          ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!'],
          [K.CH, "Suelta la caja de las tiritas y ven p'acá."]
        ],
        () => {
          if (!K.isActive(this)) return;
          s2Fight(
            this,
            'LADRÓN',
            S.t1.H.look,
            { npc: S.t1, lv: 0.45 },
            () => this.afterFight(),
            () => s2Fail('El ladrón te ha tumbado y se han escapado')
          );
        }
      );
    }
    // the second thief runs to a black car parked beside a «Corona» (the one the player can take) and steals it
    if (S.step === 3) {
      const end = s2Runner(S.t2, S.Pw, dt, 6.2, 0);
      if (end || Math.hypot(S.t2.x - S.car.x, S.t2.z - S.car.z) < 2.2) this.steal();
    }
    if (S.step === 4) {
      const done = s2DriveCar(S.car, S.P, dt, 19, (d) => (d > 160 ? 0.55 : d > 90 ? 0.8 : d < 25 ? 1.12 : 1), true);
      const d = Math.hypot(PLAYER.x - S.car.x, PLAYER.z - S.car.z);
      S.trk = (S.trk || 0) - dt;
      if (S.trk <= 0) {
        S.trk = 0.8;
        K.track(S.car.x, S.car.z);
      }
      if (d > 420) {
        s2Fail('Has perdido el coche negro');
        return;
      }
      if (done) {
        S.step = 5;
        S.car.mode = 'physics';
        S.car.driver = null;
        S.car.ctl.brk = 1;
        const [a, bb] = S.exit;
        S.t2.down = false;
        S.t2.x = a;
        S.t2.z = bb;
        S.t2.H.root.visible = true;
        S.t2.H.root.position.set(a, heightAt(a, bb) + 0.17, bb);
        S.P2 = s2Path(S.walk);
        S.hits = 0;
        S.trk = 0;
        S.tg = s2Target(S.t2, () => this.hit());
        s2Mark(S.t2, 8);
        K.setObjective(
          '¡Se baja y cruza Las Quinteras a pie! Dale ' +
            b2('dos tiros') +
            ' con la pistola de bolas (' +
            (document.body.classList.contains('touchmode') ? 'APUNTAR y DISPARAR' : 'clic derecho y clic izquierdo') +
            ') antes de que se te escape'
        );
        HUD.toast('¡Se ha bajado del coche!', '#f5b72e', 2.5);
      }
    }
    if (S.step === 5) {
      const end = s2Runner(S.t2, S.P2, dt, 5.4, 0);
      s2TrackTarget(S.tg);
      S.trk -= dt;
      if (S.trk <= 0) {
        S.trk = 0.8;
        K.track(S.t2.x, S.t2.z, 3);
      }
      if (end) s2Fail('El ladrón se te ha escapado en Las Quinteras');
    }
    if (S.step === 6 && s2Near(S.t2.x, S.t2.z, 2.2) && !PLAYER.car) this.caught();
  },
  afterFight() {
    const K = K2(),
      S = this.st;
    s2Down(S.t1);
    K.talk([['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...']], () => {
      if (!K.isActive(this)) return;
      // two parked cars a few metres away: the black getaway car and, just behind it, a «Tagoror Corona» for the player
      const rd = ROADSEG.nearest(S.t2.x + 8, S.t2.z, (r) => r[0] <= 12 && !(r[3] & 6));
      const L = rd ? Math.hypot(rd.dx, rd.dz) || 1 : 1,
        ux = rd ? rd.dx / L : 1,
        uz = rd ? rd.dz / L : 0,
        w = rd ? DATA.R[rd.ri][2] : 7;
      // a free stretch of kerb (no parked cars, walls or posts) for both cars, as close as possible
      const x0 = rd ? rd.x : S.t2.x + 8,
        z0 = rd ? rd.z : S.t2.z;
      let bx = x0 - uz * (w / 2 - 1.3),
        bz = z0 + ux * (w / 2 - 1.3);
      const clear = (x, z) =>
        !parkedNear(x, z, 3.6).length &&
        !COL.nearSeg(x, z, 1.1) &&
        !inAnyBuilding(x, z) &&
        !CARS.some((c) => !c.dead && Math.hypot(c.x - x, c.z - z) < 4);
      search: for (const u of [0, 4, -4, 8, -8, 12, -12, 16, -16, 20, -20, 26, -26, 32, -32])
        for (const sd of [1, -1]) {
          const x = x0 + ux * u - sd * uz * (w / 2 - 1.3),
            z = z0 + uz * u + sd * ux * (w / 2 - 1.3);
          if (clear(x, z) && clear(x - ux * 6, z - uz * 6)) {
            bx = x;
            bz = z;
            break search;
          }
        }
      const h = Math.atan2(ux, uz);
      S.car = s2Car('clio', 0x111111, bx, bz, h);
      S.car.driver = null;
      S.car.mode = 'physics';
      S.car.ctl.brk = 1;
      S.mine = s2Car('corolla', 0x8a99a8, bx - ux * 6, bz - uz * 6, h);
      S.mine.driver = null;
      S.mine.mode = 'physics';
      S.mine.ctl.brk = 1;
      S.Pw = s2Path([S.t2.x, S.t2.z, bx + uz * 1.4, bz - ux * 1.4]);
      S.step = 3;
      K.clearBeacon();
      s2Mark(S.t2, 6);
      K.setObjective('¡El otro ladrón corre hacia un ' + b2('coche negro') + '! Coge el ' + b2('Corona') + ' de al lado y síguelo');
    });
  },
  steal() {
    const K = K2(),
      S = this.st;
    if (S.step !== 3) return;
    S.t2.H.root.visible = false;
    AUDIO.horn && AUDIO.horn();
    const escape = farmEscapePlan(S.car);
    if (!escape) {
      S.t2.H.root.visible = true;
      s2Fail('No hay una salida hacia Las Quinteras');
      return;
    }
    Object.assign(S, escape);
    S.P.s = 0;
    S.car.mode = 'race';
    S.car.driver = 'race';
    S.step = 4;
    S.trk = 0;
    s2Mark(S.car, 10);
    HUD.big('¡PERSECUCIÓN!', '#f5b72e', 2);
    K.setObjective('¡Ha robado el ' + b2('coche negro') + '! Síguelo (círculo amarillo en el mapa)');
  },
  hit() {
    const K = K2(),
      S = this.st;
    if (S.step !== 5) return;
    S.hits++;
    AUDIO.clink && AUDIO.clink();
    if (S.hits < 2) {
      S.tg.hit = false;
      HUD.toast('¡Uno! Otro más', '#f5b72e', 1.5);
      return;
    }
    S.step = 6;
    WEAPON.targets = [];
    S.t2.H.pose = 'sit';
    S.t2.down = true;
    animHuman(S.t2.H, 0.016, 0);
    K.track(S.t2.x, S.t2.z, 2.5);
    K.talk([['Ladrón', '¡Buaaaa! ¡Que escuece, que escuece! ¡Me rindo, pero no me tires más bolitas! ¡Buaaa!']]);
    K.setObjective('Está llorando en el suelo: ' + b2('agárralo'));
  },
  caught() {
    const K = K2(),
      S = this.st;
    if (S.step !== 6) return;
    S.step = 7;
    K.talk(
      [
        ['Ladrón', '¡Snif! ¡Vale, la caja está en el coche! ¡Snif!'],
        ['Policía Local (llegando por fin)', '¿Esto lo habéis hecho vosotros? Con una de bolas... Bueno, la caja está entera. Nos lo llevamos.'],
        [
          'Policía Local',
          'El alcalde, Don Yovoy Gofiérrez, ya se ha enterado. Os quiere ver en el Ayuntamiento, en la Plaza del Adelantado. Hoy no es delito: hoy sois héroes.'
        ]
      ],
      () => s2Pass('Atraco frustrado · recompensa de la farmacia', 1500)
    );
  }
};
// The open car park and its service aisles, on the Ayuntamiento side of the city.
function farmEscapePlan(car) {
  const choices = [
    {
      entry: [213, 132],
      stop: [238.5, 119],
      aisle: [220, 134, 233.5, 134, 237, 130.5],
      foot: [235.5, 118.8, 224.5, 118, 222.5, 103, 220.5, 87.5, 219, 72.5, 217.5, 63, 221, 57.5]
    },
    {
      entry: [216, 141],
      stop: [251, 135.5],
      aisle: [222, 138, 224, 137.5, 246.5, 137],
      foot: [247, 134.8, 242, 134, 237, 130.5, 238.5, 119, 224.5, 118, 222.5, 103, 220.5, 87.5, 219, 72.5]
    }
  ];
  for (const place of choices) {
    const route = GRAPH.routeFrom(car.x, car.z, car.h, ...place.entry);
    if (!route || route.length < 4) continue;
    const P = s2Path([...route, ...place.aisle, ...place.stop]);
    if (P.tot < 30 || !s2FarFromEdge(P.pts)) continue;
    return { P, exit: place.foot.slice(0, 2), walk: place.foot };
  }
  return null;
}

// ---------- 2. Defensores de La Laguna (ceremonia en el Ayuntamiento)
const M_CEREMONIA = {
  title: 'Defensores de La Laguna',
  who: ALC,
  hint() {
    return 'Ve al ' + b2('Ayuntamiento') + ' (Plaza del Adelantado): ' + ALC + ' os espera con toda la banda';
  },
  startPos: startAtAlcalde,
  start() {
    const K = K2();
    const A = AYTO;
    const [fx, fz] = A.front;
    const ring = [
      ['boca', -3],
      ['blanco', -1.5],
      ['coco', 1.5],
      ['sastron', 3]
    ];
    for (const [k, o] of ring) if (NPC[k]) K.moveNPC(NPC[k], fx + A.ux * o, fz + A.uz * o, A.door);
    $('fade').style.opacity = 1;
    setTimeout(() => {
      $('fade').style.opacity = 0;
    }, 700);
    MUSIC.jingle();
    K.chat(
      'Defensores de La Laguna',
      [
        [
          ALC,
          'Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.'
        ],
        [
          ALC,
          `Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «${K.GANG.name || 'la banda'}» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.`
        ],
        ['Boca Papa', 'Señor alcalde, ¿eso trae dietas? Porque yo como mucho.'],
        [
          ALC,
          'Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.'
        ],
        ['Rayco «El Blanco»', '«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>'],
        [K.CH, 'Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.'],
        [ALC, 'Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.']
      ],
      () => {
        K.GANG.defenders = true;
        for (const [k] of ring) if (NPC[k]) K.moveNPC(NPC[k], NPC[k].home[0], NPC[k].home[1]);
        HUD.big('DEFENSORES DE LA LAGUNA', '#f5b72e', 5);
        s2Pass('Sois Defensores de La Laguna', 1000);
      }
    );
  },
  update() {}
};

// ---------- 3. El carterista del Cristo (con Coco)
const M_CARTERISTA = {
  title: 'El carterista del Cristo',
  who: 'Coco',
  hint() {
    return 'Coco tiene un aviso: búscalo junto a ' + b2(NPC.coco.place || 'su sitio');
  },
  startPos: startAt('coco'),
  start() {
    const K = K2();
    this.st = { step: 0 };
    const b = findBuilding('Cristo');
    const p = b ? s2Spot(b.cx, b.cz) : [PLAYER.x + 300, PLAYER.z];
    this.st.p = p;
    K.talk(
      [
        [
          'Coco',
          'Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.'
        ],
        ['Coco', 'Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.']
      ],
      () => {
        if (!K.isActive(this)) return;
        this.st.step = 1;
        K.goto(p[0], p[1], 5, 0xe53935);
        K.setObjective('Ve a la ' + b2('Plaza del Cristo'));
      }
    );
  },
  update(dt) {
    const K = K2(),
      S = this.st;
    if (!S) return;
    if (S.step === 1 && s2AtGoal(12)) {
      S.step = 2;
      K.clearBeacon();
      S.n = s2Human(THIEF_LOOKS[2], S.p[0] + 6, S.p[1] + 4);
      S.P = s2RunPath(S.n, 220, 380);
      S.n.blip = true;
      s2Mark(S.n, 8);
      HUD.toast('¡Ese es! ¡El de la chaqueta gris!', '#f5b72e', 2.5);
      K.setObjective(
        'Atrapa al ' + b2('carterista') + ' a pie (corre con ' + (document.body.classList.contains('touchmode') ? 'CORRER' : 'Shift') + ')'
      );
    }
    if (S.step === 2) {
      if (PLAYER.car) {
        K.setObjective('¡A pie! Entre la gente no se puede ir en coche');
      }
      const end = s2Runner(S.n, S.P, dt, 5.9);
      if (S.P.s > 8 && s2Near(S.n.x, S.n.z, 1.8)) {
        S.step = 3;
        K.talk([['Carterista', '¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!']], () =>
          s2Fight(
            this,
            'CARTERISTA',
            S.n.H.look,
            { npc: S.n, lv: 0.4 },
            () => {
              s2Down(S.n);
              s2Pass('Carterista atrapado', 600);
            },
            () => s2Fail('El carterista te ha ganado y se ha escapado')
          )
        );
      } else if (end && !s2Near(S.n.x, S.n.z, 50)) s2Fail('El carterista se ha escapado');
    }
  }
};

// ---------- 4. Baches en la Vía de Ronda (encargo del alcalde)
const M_BACHES = {
  title: 'Baches en la Vía de Ronda',
  who: ALC,
  hint() {
    return ALC + ' tiene un encargo en el ' + b2('Ayuntamiento');
  },
  startPos: startAtAlcalde,
  start() {
    const K = K2();
    this.st = { step: 0 };
    K.talk(
      [
        [
          ALC,
          'Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.'
        ],
        [ALC, 'Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.']
      ],
      () => {
        if (!K.isActive(this)) return;
        const [x, z, h] = s2Spot(PLAYER.x + 12, PLAYER.z + 8);
        this.st.truck = s2Car('daily', 0xf2c200, x, z, h);
        this.st.truck.keep = true;
        const vr = centroidOfNamedWays('Vía de Ronda de La Laguna') || [400, 1300];
        const P = s2Route(vr[0], vr[1], 1300, 2200);
        const c = s2Path(P);
        this.st.P = c;
        this.st.cps = [0.15, 0.35, 0.55, 0.75, 0.97].map((f) => c.at(c.tot * f));
        this.st.cp = 0;
        this.st.step = 1;
        K.goto(x, z, 3, 0xf5b72e);
        K.setObjective('Súbete al ' + b2('camión del asfalto'));
      }
    );
  },
  update(dt) {
    const K = K2(),
      S = this.st;
    if (!S || !S.step) return;
    if (S.step === 1 && PLAYER.car === S.truck) {
      S.step = 2;
      K.setTimer(240);
      this.cp();
    }
    if (S.step === 2) {
      if (S.truck.dead || S.truck.health <= 15) {
        s2Fail('¡Has destrozado el camión del asfalto!');
        return;
      }
      if (PLAYER.car !== S.truck) {
        K.setObjective('Vuelve al ' + b2('camión') + ': sin él no hay asfalto');
        return;
      }
      if (s2AtGoal(8)) {
        AUDIO.cash();
        HUD.toast('¡Bache tapado!', '#7fe08a', 1.2);
        S.cp++;
        if (S.cp >= S.cps.length) {
          K.setTimer(0);
          s2Pass('Vía de Ronda sin baches', 900);
          return;
        }
        this.cp();
      }
    }
  },
  cp() {
    const K = K2(),
      S = this.st,
      c = S.cps[S.cp];
    K.goto(c[0], c[1], 7, 0x46c3ff);
    K.ahead(S.cps, S.cp, S.P && S.P.pts);
    K.setObjective(`Tapa los baches: punto ${S.cp + 1}/${S.cps.length}`);
  }
};

// ---------- 5. El rally de La Esperanza (carrera contra un pijo)
const M_RALLY = {
  title: 'El rally de La Esperanza',
  who: 'el Canarión',
  hint() {
    return 'El ' + b2('Canarión') + ' ha visto algo raro en la Avenida de La Trinidad';
  },
  startPos: startAt('canarion', -1.6) /* the other side of him: the blue circle of the rematches is at +1.4 */,
  start() {
    const K = K2();
    this.st = { step: 0 };
    K.talk(
      [
        [
          'El Canarión',
          '¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.'
        ],
        ['El Canarión', 'Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.']
      ],
      () => {
        if (!K.isActive(this)) return;
        const vr = centroidOfNamedWays('Vía de Ronda de La Laguna') || [400, 1300];
        const P = s2Route(vr[0], vr[1], 1600, 2600);
        this.st.P = s2Path(P);
        const c = this.st.P;
        this.st.cps = [];
        for (let s = 300; s < c.tot - 50; s += 300) this.st.cps.push(c.at(s));
        this.st.cps.push(c.at(c.tot));
        this.st.start = c.at(0);
        this.st.step = 1;
        K.setObjective('Súbete a un coche y ve a la ' + b2('salida'));
        K.goto(this.st.start[0], this.st.start[1], 6, 0x46c3ff);
      }
    );
  },
  update(dt) {
    const K = K2(),
      S = this.st;
    if (!S || !S.step) return;
    if (S.step === 1 && PLAYER.car && s2AtGoal(8) && PLAYER.car.speed < 2) {
      S.step = 2;
      K.clearBeacon();
      const a = S.P.at(0);
      S.rv = s2Car('guancheGT', 0xffffff, a[0] + Math.cos(a[2]) * 1.6, a[1] - Math.sin(a[2]) * 1.6, a[2]);
      /* where s2DriveCar will put it: no jump at the start */ s2Mark(S.rv, 8);
      S.rv.mode = 'race';
      S.rv.driver = 'race';
      ['3', '2', '1'].forEach((t, i) =>
        setTimeout(() => {
          if (K.isActive(this)) {
            HUD.big(t, '#fff', 0.8);
            AUDIO.cash();
          }
        }, i * 1000)
      );
      setTimeout(() => {
        if (!K.isActive(this)) return;
        HUD.big('¡YA!', '#7fe08a', 1.2);
        S.step = 3;
        S.cp = 0;
        this.cp();
      }, 3000);
    }
    if (S.step === 3) {
      const done = s2DriveCar(S.rv, S.P, dt, 27, (d) => (d > 150 ? 0.82 : 1.0));
      if (done) {
        s2Fail('El pijo ha llegado primero. «¡Papá me compra otro!»');
        return;
      }
      if (!PLAYER.car) {
        K.setObjective('¡Vuelve a un coche!');
        return;
      }
      if (s2AtGoal(9)) {
        AUDIO.cash();
        S.cp++;
        if (S.cp >= S.cps.length) {
          K2().talk([['Pijo de La Esperanza', 'Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.']]);
          s2Pass('Rally ilegal cancelado', 1200);
          return;
        }
        this.cp();
      }
    }
  },
  cp() {
    const K = K2(),
      S = this.st,
      c = S.cps[S.cp];
    const last = S.cp === S.cps.length - 1;
    K.goto(c[0], c[1], 7, last ? 0xf5b72e : 0x46c3ff);
    K.ahead(S.cps, S.cp, S.P.pts);
    K.setObjective((last ? b2('¡META!') : `Control ${S.cp + 1}/${S.cps.length - 1}`) + ' · Gánale al pijo');
  }
};

// ---------- 6. Los bancos de la Plaza del Adelantado (encargo del alcalde)
const M_BANCOS = {
  title: 'Los bancos del Adelantado',
  who: ALC,
  hint() {
    return ALC + ' tiene otro encargo en el ' + b2('Ayuntamiento');
  },
  startPos: startAtAlcalde,
  start() {
    const K = K2();
    this.st = { step: 0 };
    K.talk(
      [
        [
          ALC,
          '¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.'
        ],
        [ALC, 'Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.']
      ],
      () => {
        if (!K.isActive(this)) return;
        const b = s2TowardNext(
          BUILD.filter((q) => q.style === 3),
          350,
          1000
        ) || { cx: PLAYER.x + 600, cz: PLAYER.z + 300 };
        this.st.p = s2Spot(b.cx, b.cz);
        this.st.step = 1;
        K.goto(this.st.p[0], this.st.p[1], 6, 0xe53935);
        K.setObjective('Ve a la ' + b2('nave del polígono') + ' donde esconden los bancos');
      }
    );
  },
  update(dt) {
    const K = K2(),
      S = this.st;
    if (!S || !S.step) return;
    if (S.step === 1 && s2AtGoal(9)) {
      if (PLAYER.car && PLAYER.car.speed > 3) return;
      S.step = 2;
      K.clearBeacon();
      const [x, z] = S.p;
      S.a = s2Human(THIEF_LOOKS[2], x + 2, z + 2, [PLAYER.x, PLAYER.z]);
      S.b = s2Human(THIEF_LOOKS[0], x - 4, z + 3);
      // v1.4.47 (Jonay: «los bancos robados ya podían ser bancos en la misión… salen como tablas flotando»): the three
      // park benches of the square, one on the ground and two more stacked upside down on it (parkBenchGeos, 05n_plazas.js)
      const bench = new THREE.Group();
      const [slG, siG] = parkBenchGeos(),
        wood = M(0x8a5a32, 0.75),
        iron = M(0x22262a, 0.45, 0.6);
      for (let i = 0; i < 3; i++) {
        const b = new THREE.Group();
        b.add(new THREE.Mesh(slG, wood), new THREE.Mesh(siG, iron));
        if (i === 0) b.position.set(0, 0, 0);
        else {
          b.rotation.set(Math.PI, i === 1 ? 0.12 : -0.2, 0); // upside down, seat on seat
          b.position.set(i === 1 ? 0.05 : -0.1, 0.94 + (i - 1) * 0.5, i === 1 ? 0.04 : 0.1);
        }
        b.traverse((m) => m.isMesh && (m.castShadow = true));
        bench.add(b);
      }
      bench.position.set(x - 1, heightAt(x - 1, z), z - 2);
      scene.add(bench);
      S2.extras.push(bench);
      K.talk([['Chatarrero', '¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!']], () =>
        s2Fight(
          this,
          'CHATARRERO',
          S.a.H.look,
          { npc: S.a, lv: 0.5 },
          () => {
            s2Down(S.a);
            S.step = 3;
            s2Armed();
            S.P = s2RunPath(S.b, 150, 260);
            S.b.blip = true;
            s2Mark(S.b, 8);
            S.tg = s2Target(S.b, () => this.caught());
            K.setObjective('¡Pepe se escapa! Dale con la ' + b2('pistola de bolas'));
          },
          () => s2Fail('El chatarrero te ha ganado')
        )
      );
    }
    if (S.step === 3 && !S.b.down) {
      const end = s2Runner(S.b, S.P, dt, 5.4);
      s2TrackTarget(S.tg);
      if (S.P.s > 8 && s2Near(S.b.x, S.b.z, 1.8) && !PLAYER.car) this.caught();
      else if (end && !s2Near(S.b.x, S.b.z, 60)) s2Fail('Pepe se ha escapado');
    }
  },
  caught() {
    const S = this.st;
    if (S.step !== 3) return;
    S.step = 4;
    s2Down(S.b);
    K2().talk([['Pepe', '¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!']], () => s2Pass('Bancos recuperados', 900));
  }
};

// ---------- 7. Grafiteros en el tranvía (con Sastrón)
const M_TRANVIA = {
  title: 'Grafiteros en el tranvía',
  who: 'Sastrón',
  hint() {
    return b2('Sastrón') + ' está indignado junto a ' + b2(NPC.sastron.place || 'su sitio');
  },
  startPos: startAt('sastron'),
  start() {
    const K = K2();
    this.st = { step: 0 };
    const T = DATA.T;
    let best = null;
    for (const p of DATA.P) if (p[1] === 'tram_stop' && p[0] >= 0 && /Padre Anchieta/.test(STR[p[0]])) best = [p[2], p[3]];
    if (!best) best = [T[Math.floor(T.length / 4) * 2], T[Math.floor(T.length / 4) * 2 + 1]];
    this.st.p = s2Spot(best[0], best[1]);
    K.talk(
      [
        [
          'Sastrón',
          '¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.'
        ],
        ['Sastrón', 'Corre antes de que acaben. Y llévate la de bolas: son rápidos.']
      ],
      () => {
        if (!K.isActive(this)) return;
        s2Armed();
        this.st.step = 1;
        K.goto(this.st.p[0], this.st.p[1], 6, 0xe53935);
        K.setObjective('Llega a la parada de ' + b2('Padre Anchieta') + ' antes de que se vayan');
        K.setTimer(120);
      }
    );
  },
  update(dt) {
    const K = K2(),
      S = this.st;
    if (!S || !S.step) return;
    if (S.step === 1 && s2AtGoal(12)) {
      K.setTimer(0);
      K.clearBeacon();
      S.step = 2;
      S.g = [s2Human(THIEF_LOOKS[1], S.p[0] + 4, S.p[1] + 3), s2Human(THIEF_LOOKS[0], S.p[0] - 4, S.p[1] - 2)];
      S.Ps = S.g.map((n, i) => s2RunPath(n, 150, 260, i ? 0.7 : -0.7));
      S.left = 2;
      S.g.forEach((n) => s2Mark(n, 8));
      WEAPON.targets = S.g.map((n) => ({ x: n.x, y: 0, z: n.z, r: 0.5, hit: false, npc: n }));
      WEAPON.onHit = (t) => {
        if (t.npc && !t.npc.down) {
          s2Down(t.npc);
          S.left--;
          HUD.toast(S.left ? '¡Uno menos!' : '¡Los dos!', '#7fe08a', 1.5);
          if (!S.left) K2().talk([['Grafitero', '¡Au! ¡Vale, lo limpiamos, lo limpiamos!']], () => s2Pass('Tranvía sin pintadas', 800));
        }
      };
      WEAPON.onShot = () => {
        if (WEAPON.ammo <= 0)
          setTimeout(() => {
            if (WEAPON.lawful) {
              WEAPON.ammo = 6;
              updateWeaponHUD();
            }
          }, 1200);
      };
      HUD.toast('¡Se separan! ¡A por ellos!', '#f5b72e', 2);
      K.setObjective('Dale a los ' + b2('dos grafiteros') + ' con la pistola de bolas');
    }
    if (S.step === 2) {
      S.g.forEach((n, i) => {
        if (n.down) return;
        const end = s2Runner(n, S.Ps[i], dt, 5.2);
        const t = WEAPON.targets.find((q) => q.npc === n);
        if (t) {
          t.x = n.x;
          t.z = n.z;
          t.y = heightAt(n.x, n.z) + 1.1;
        }
        if (S.Ps[i].s > 8 && s2Near(n.x, n.z, 1.8) && !PLAYER.car && WEAPON.onHit) WEAPON.onHit(t);
        else if (end && !s2Near(n.x, n.z, 70)) {
          s2Fail('Un grafitero se ha escapado');
        }
      });
    }
  }
};

// ---------- 8. La guagua de la broma (con Boca Papa)
const M_GUAGUA = {
  title: 'La guagua de la broma',
  who: 'Boca Papa',
  hint() {
    return b2('Boca Papa') + ' te llama desde la torre de La Concepción';
  },
  startPos: () => NPC.boca.start || [NPC.boca.x + 1.4, NPC.boca.z + 1.4],
  start() {
    const K = K2();
    this.st = { step: 0 };
    K.talk(
      [
        [
          'Boca Papa',
          '¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.'
        ],
        [
          'Boca Papa',
          'No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.'
        ]
      ],
      () => {
        if (!K.isActive(this)) return;
        const b = centroidOfNamedWays('Autopista del Norte') || [600, 1500];
        const P = s2Route(b[0], b[1], 1800, 3000);
        this.st.P = s2Path(P);
        const a = this.st.P.at(0);
        this.st.bus = s2Car('bus', null, a[0], a[1], a[2]);
        this.st.bus.mode = 'race';
        this.st.bus.driver = 'race';
        this.st.near = 0;
        this.st.step = 1;
        s2Mark(this.st.bus, 12);
        K.setObjective('Alcanza la ' + b2('guagua') + ' y quédate pegado a ella (en coche)');
      }
    );
  },
  update(dt) {
    const K = K2(),
      S = this.st;
    if (!S || !S.step) return;
    S.trk = (S.trk || 0) - dt;
    if (S.trk <= 0) {
      S.trk = 0.8;
      K.track(S.bus.x, S.bus.z, 8);
    }
    const d = Math.hypot(PLAYER.x - S.bus.x, PLAYER.z - S.bus.z);
    const done = s2DriveCar(S.bus, S.P, dt, 19, (dd) => (dd > 200 ? 0.6 : dd < 20 ? 0.85 : 1));
    if (S.bus.health < 40) {
      s2Fail('¡Has destrozado la guagua!');
      return;
    }
    if (done) {
      s2Fail('El bromista ha llegado a su destino y ha subido el vídeo');
      return;
    }
    if (PLAYER.car && d < 16) {
      S.near += dt;
      if (Math.floor(S.near * 2) !== Math.floor((S.near - dt) * 2)) AUDIO.horn && AUDIO.horn(PLAYER.car);
    }
    const left = Math.max(0, 10 - S.near);
    K.setObjective(
      PLAYER.car
        ? d < 16
          ? `¡Pítale! Aguanta pegado: ${left.toFixed(0)} s`
          : 'Acércate a la ' + b2('guagua') + ` (${Math.round(d)} m)`
        : 'Súbete a un coche'
    );
    if (S.near >= 10) {
      S.bus.mode = 'physics';
      S.bus.driver = null;
      S.bus.ctl.brk = 1;
      K.talk([['Bromista', 'Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!']], () =>
        s2Pass('Guagua recuperada sin un rasguño', 900)
      );
      S.step = 0;
    }
  }
};

// ---------- 9. Escolta a la guagua del Romero (encargo del alcalde)
const M_ROMERO = {
  title: 'Escolta a la guagua del Romero',
  who: ALC,
  hint() {
    return ALC + ' necesita una escolta: ve al ' + b2('Ayuntamiento');
  },
  startPos: startAtAlcalde,
  start() {
    const K = K2();
    this.st = { step: 0 };
    K.talk(
      [
        [
          ALC,
          'Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.'
        ],
        [ALC, 'Síguela de cerca, sin alejarte, hasta el final del recorrido.']
      ],
      () => {
        if (!K.isActive(this)) return;
        const sb = centroidOfNamedWays('Camino San Benito') || centroidOfNamedWays('Calle San Benito') || [PLAYER.x + 300, PLAYER.z];
        const P = s2Route(PLAYER.x, PLAYER.z, 1400, 2200, Math.atan2(sb[0] - PLAYER.x, sb[1] - PLAYER.z));
        this.st.P = s2Path(P);
        const a = this.st.P.at(0);
        this.st.bus = s2Car('bus', null, a[0], a[1], a[2]);
        this.st.bus.mode = 'race';
        this.st.bus.driver = 'race';
        this.st.far = 0;
        this.st.step = 1;
        this.st.wait = 1;
        s2Mark(this.st.bus, 10);
        K.goto(a[0], a[1], 8, 0x46c3ff);
        K.setObjective('Súbete a un coche y ponte junto a la ' + b2('guagua del Romero'));
      }
    );
  },
  update(dt) {
    const K = K2(),
      S = this.st;
    if (!S || !S.step) return;
    const d = Math.hypot(PLAYER.x - S.bus.x, PLAYER.z - S.bus.z);
    if (S.step === 1) {
      if (PLAYER.car && d < 25) {
        S.step = 2;
        K.clearBeacon();
        HUD.toast('¡Arranca la guagua!', '#f5b72e', 2);
      }
      return;
    }
    const done = s2DriveCar(S.bus, S.P, dt, 13, (dd) => (dd > 60 ? 0.3 : 1));
    if (done) {
      K.talk([['Suegra del alcalde (por la ventanilla)', '¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!']], () =>
        s2Pass('La Romería llega a tiempo', 1000)
      );
      S.step = 0;
      return;
    }
    if (d > 70 || !PLAYER.car) {
      S.far += dt;
      K.setObjective(`¡Vuelve con la guagua! ${Math.max(0, 8 - S.far).toFixed(0)} s`);
      if (S.far > 8) s2Fail('Has dejado sola a la guagua del Romero');
    } else {
      S.far = Math.max(0, S.far - dt);
      K.setObjective('Escolta a la ' + b2('guagua del Romero') + ` (${Math.round(d)} m)`);
    }
  }
};

// ---------- 10. El gofio robado (con Boca Papa)
const M_GOFIO = {
  title: 'El gofio robado',
  who: 'Boca Papa',
  hint() {
    return b2('Boca Papa') + ' está desesperado en la torre de La Concepción';
  },
  startPos: () => NPC.boca.start || [NPC.boca.x + 1.4, NPC.boca.z + 1.4],
  start() {
    const K = K2();
    this.st = { step: 0 };
    K.talk(
      [
        [
          'Boca Papa',
          '¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.'
        ],
        ['Boca Papa', 'Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.']
      ],
      () => {
        if (!K.isActive(this)) return;
        const pts = [];
        for (const key of ['Catedral', 'Teatro Leal', 'Santo Domingo', 'Palacio Nava']) {
          const b = findBuilding(key);
          if (b) pts.push(s2Spot(b.cx, b.cz));
        }
        while (pts.length < 2) pts.push([PLAYER.x + 100 * pts.length, PLAYER.z + 80]);
        this.st.clues = pts.slice(0, 2);
        this.st.ci = 0;
        this.st.step = 1;
        this.clue();
      }
    );
  },
  clue() {
    const K = K2(),
      S = this.st,
      c = S.clues[S.ci];
    S.vec = s2Human(
      {
        skin: 0xe0b08c,
        shirt: [0x6d8fb3, 0xb36d8f][S.ci],
        pants: 0x444444,
        hair: 0xbbbbbb,
        hairStyle: 'Hair_SimpleParted',
        longPants: true,
        hd: true
      },
      c[0] + 1.5,
      c[1] + 1.5
    );
    K.goto(c[0], c[1], 3, 0x46c3ff);
    K.setObjective(`Pregunta a los vecinos (${S.ci + 1}/2)`);
  },
  update(dt) {
    const K = K2(),
      S = this.st;
    if (!S || !S.step) return;
    if (S.step === 1) {
      const c = S.clues[S.ci];
      if (s2AtGoal(4) && !PLAYER.car) {
        S.step = 9;
        const lines =
          S.ci === 0
            ? [
                [
                  'Vecina del casco',
                  'Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.'
                ]
              ]
            : [
                [
                  'Vecino con boina',
                  'Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!'
                ]
              ];
        K.talk(lines, () => {
          if (!K.isActive(this)) return;
          S.ci++;
          if (S.ci < S.clues.length) {
            S.step = 1;
            this.clue();
            return;
          }
          const b = s2TowardNext(
            BUILD.filter((q) => q.style === 3),
            350,
            1000
          ) || { cx: PLAYER.x + 600, cz: PLAYER.z };
          S.w = s2Spot(b.cx, b.cz);
          S.step = 2;
          K.goto(S.w[0], S.w[1], 6, 0xe53935);
          K.setObjective('Ve a la ' + b2('nave del polígono'));
        });
      }
    }
    if (S.step === 2 && s2AtGoal(9)) {
      if (PLAYER.car && PLAYER.car.speed > 3) return;
      S.step = 3;
      K.clearBeacon();
      S.boss = s2Human(THIEF_LOOKS[2], S.w[0] + 2, S.w[1] + 2, [PLAYER.x, PLAYER.z]);
      K.talk([['El Molinero Falso', '¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?']], () =>
        s2Fight(
          this,
          'MOLINERO FALSO',
          S.boss.H.look,
          { npc: S.boss, lv: 0.6 },
          () => {
            s2Down(S.boss);
            const [x, z, h] = s2Spot(S.w[0] + 6, S.w[1] + 4);
            S.van = s2Car('transit', 0xf4f4f4, x, z, h);
            S.van.keep = true;
            S.home = NPC.boca.start || [NPC.boca.x, NPC.boca.z];
            S.step = 4;
            K.goto(x, z, 3, 0xf5b72e);
            K.setObjective('Súbete a la ' + b2('furgoneta del gofio'));
          },
          () => s2Fail('Te han enharinado')
        )
      );
    }
    if (S.step === 4 && PLAYER.car === S.van) {
      S.step = 5;
      K.goto(S.home[0], S.home[1], 6, 0xf5b72e);
      K.setTimer(200);
      K.setObjective('Lleva el gofio a ' + b2('Boca Papa') + ' sin destrozar la furgoneta');
    }
    if (S.step === 5) {
      if (S.van.health < 35) {
        s2Fail('El gofio se ha desparramado por la carretera');
        return;
      }
      if (s2AtGoal(8)) {
        K.setTimer(0);
        K.talk([['Boca Papa', '¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.']], () =>
          s2Pass('Gofio recuperado', 1100)
        );
        S.step = 0;
      }
    }
  }
};

// ---------- 11. Carrera solidaria del casco (encargo del alcalde)
const M_CARRERA = {
  title: 'Carrera solidaria del casco',
  who: ALC,
  hint() {
    return ALC + ' quiere que la banda dé ejemplo: ve al ' + b2('Ayuntamiento');
  },
  startPos: startAtAlcalde,
  start() {
    const K = K2();
    this.st = { step: 0 };
    K.talk(
      [
        [
          ALC,
          'La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.'
        ],
        [ALC, 'Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.']
      ],
      () => {
        if (!K.isActive(this)) return;
        // a short loop round the casco (v0.60: it was ~6 min and impossible): up to 4 landmarks within 320 m of the
        // Ayuntamiento, visited nearest-first, back to the Ayuntamiento; time from the length at a jogging pace
        const home = AYTO.ok ? AYTO.front : [PLAYER.x, PLAYER.z];
        const cand = [];
        for (const k of [
          'Catedral',
          'Teatro Leal',
          'Santo Domingo',
          'Palacio Nava',
          'Casa Lercaro',
          'Iglesia de la Concepción',
          'Casa Salazar',
          'Casas Capitulares'
        ]) {
          const b = findBuilding(k);
          if (b && Math.hypot(b.cx - home[0], b.cz - home[1]) < 320) {
            const sp = s2Spot(b.cx, b.cz);
            if (Math.hypot(sp[0] - home[0], sp[1] - home[1]) > 60) cand.push(sp);
          }
        }
        const pts = [];
        let cur = home;
        while (pts.length < 4 && cand.length) {
          cand.sort((p, q) => Math.hypot(p[0] - cur[0], p[1] - cur[1]) - Math.hypot(q[0] - cur[0], q[1] - cur[1]));
          cur = cand.shift();
          if (!pts.some((q) => Math.hypot(q[0] - cur[0], q[1] - cur[1]) < 50)) pts.push(cur);
        }
        if (pts.length < 2) for (let i = 0; i < 3; i++) pts.push([home[0] + Math.cos(i * 2.1) * 150, home[1] + Math.sin(i * 2.1) * 150]);
        pts.push(home);
        let L = 0,
          prev = home;
        for (const p of pts) {
          L += Math.hypot(p[0] - prev[0], p[1] - prev[1]) * 1.35;
          prev = p;
        }
        this.st.cps = pts;
        this.st.cp = 0;
        this.st.step = 1;
        this.st.len = L;
        K.setTimer(Math.round(40 + L / 3.2));
        this.cp();
      }
    );
  },
  cp() {
    const K = K2(),
      S = this.st,
      c = S.cps[S.cp];
    const last = S.cp === S.cps.length - 1;
    K.goto(c[0], c[1], 4, last ? 0xf5b72e : 0x46c3ff);
    K.ahead(S.cps, S.cp);
    K.setObjective((last ? b2('¡Meta en el Ayuntamiento!') : `Control ${S.cp + 1}/${S.cps.length - 1}`) + ' · ¡a pie!');
  },
  update() {
    const K = K2(),
      S = this.st;
    if (!S || S.step !== 1) return;
    if (PLAYER.car) {
      s2Fail('¡En coche no vale! Descalificado');
      return;
    }
    const c = S.cps[S.cp];
    if (s2AtGoal(4.5)) {
      AUDIO.cash();
      S.cp++;
      if (S.cp >= S.cps.length) {
        K.setTimer(0);
        s2Pass('Carrera solidaria: 2.000 € para los vecinos', 700);
        return;
      }
      this.cp();
    }
  }
};

// ---------- 12. Noche en el aeropuerto (final de la tanda: el coche patrulla de la banda)
const M_AEROPUERTO = {
  title: 'Noche en el aeropuerto',
  who: 'Rayco «El Blanco»',
  hint() {
    return b2('El Blanco') + ' ha oído algo en su escáner: ve a casa de sus padres';
  },
  startPos: startAt('blanco'),
  start() {
    const K = K2();
    this.st = { step: 0 };
    K.talk(
      [
        ['Rayco «El Blanco»', '«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»'],
        [
          'Boca Papa (por el móvil)',
          'Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!'
        ]
      ],
      () => {
        if (!K.isActive(this)) return;
        GAME.tod = 22.5;
        try {
          updateSun();
          updateEnvironment(true);
        } catch (e) {}
        s2Armed();
        const aw = DATA.AW && DATA.AW.find((a) => a[0] === 'runway');
        const p = aw ? [aw[3][0], aw[3][1]] : [-3100, -200];
        const q = s2Spot(p[0] + 60, p[1] + 60);
        this.st.P = s2Path(s2Route(q[0], q[1], 900, 1500));
        this.st.p = this.st.P.at(0);
        this.st.step = 1;
        K.goto(this.st.p[0], this.st.p[1], 8, 0xe53935);
        K.setObjective('Ve al ' + b2('aeropuerto de Los Rodeos'));
      }
    );
  },
  update(dt) {
    const K = K2(),
      S = this.st;
    if (!S || !S.step) return;
    if (S.step === 1 && s2AtGoal(20)) {
      S.step = 2;
      K.clearBeacon();
      S.P.s = 25;
      const a = S.P.at(25),
        x = a[0],
        z = a[1];
      S.van = s2Car('vito', 0x2b2b2b, x, z, a[2]);
      S.van.mode = 'race';
      S.van.driver = 'race';
      s2Mark(S.van, 10);
      S.thief = s2Human(THIEF_LOOKS[0], x, z);
      S.thief.H.root.visible = false;
      HUD.big('¡PERSECUCIÓN!', '#f5b72e', 2);
      K.setObjective('¡La ' + b2('furgoneta del queso') + ' arranca! Síguela');
    }
    if (S.step === 2) {
      const done = s2DriveCar(S.van, S.P, dt, 22, (d) => (d > 110 ? 0.6 : d < 25 ? 1.1 : 1), true);
      if (Math.hypot(PLAYER.x - S.van.x, PLAYER.z - S.van.z) > 280) {
        s2Fail('La furgoneta del queso se ha escapado');
        return;
      }
      if (done || S.van.health < 45) {
        S.step = 3;
        S.van.mode = 'physics';
        S.van.driver = null;
        S.van.ctl.brk = 1;
        const [a, b] = safeSpot(S.van.x + 3, S.van.z + 3, 0.6);
        Object.assign(S.thief, { x: a, z: b });
        S.thief.H.root.visible = true;
        S.P2 = s2RunPath(S.thief, 150, 260);
        S.thief.blip = true;
        s2Mark(S.thief, 8);
        S.tg = s2Target(S.thief, () => this.caught());
        K.setObjective('¡Huye a pie! Dale con la ' + b2('pistola de bolas'));
      }
    }
    if (S.step === 3 && !S.thief.down) {
      const end = s2Runner(S.thief, S.P2, dt, 5.8);
      s2TrackTarget(S.tg);
      if (S.P2.s > 8 && s2Near(S.thief.x, S.thief.z, 1.8) && !PLAYER.car) this.caught();
      else if (end && !s2Near(S.thief.x, S.thief.z, 60)) s2Fail('El contrabandista se ha perdido en la noche');
    }
  },
  caught() {
    const K = K2(),
      S = this.st;
    if (S.step !== 3) return;
    S.step = 4;
    s2Down(S.thief);
    K.talk(
      [
        ['Contrabandista', '¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!'],
        [
          ALC + ' (por el móvil)',
          'Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!'
        ]
      ],
      () => {
        K.GANG.patrol = true;
        if (AYTO.ok) {
          const [x, z] = s2Spot(AYTO.front[0] + AYTO.nx * 6, AYTO.front[1] + AYTO.nz * 6);
          const c = new Car(null, 0xf5f7fa, x, z, Math.atan2(AYTO.ux, AYTO.uz), VMODELS.policia || undefined);
          c.persist = true;
          c.gangPatrol = true;
        }
        s2Pass('Tenéis coche patrulla propio', 2000);
      }
    );
  }
};

// v0.70 (Jonay: missions by zones): after the starting barrio (El Blanco, La Concepción, Coco, Sastrón) come the casco
// and the Ayuntamiento, then La Trinidad / Vía de Ronda / the north, and the airport as the finale. Saves from before
// this order are converted by title (MISSIONS.setState, STORY_V2).
MISSIONS.addStory([
  M_FARMACIA,
  M_CEREMONIA,
  M_BANCOS,
  M_GOFIO,
  M_CARTERISTA,
  M_CARRERA,
  M_RALLY,
  M_BACHES,
  M_ROMERO,
  M_GUAGUA,
  M_TRANVIA,
  M_AEROPUERTO
]);
