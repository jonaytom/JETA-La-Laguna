// ============ Plaza de la Milagrosa (Plaza de San Cristóbal) and its underground car park (v1.4.51) ============
// Jonay (24/25-nov, Google Earth y Street View, docs/referencias/milagrosa/): «la plaza de la Milagrosa tiene unos 18 m de
// ancho y redondea sus finales, esto incluye sus aceras y entradas y salidas del parking. La plaza en sí mide 12 m de
// ancho y está elevada unos 4 o 5 escalones, dependiendo de la zona (está en una zona con un poco de bajada), de manera
// que la plaza en sí está plana sobre el terreno, con su parking debajo; la entrada y salida del parking tiene 3,10 de
// ancho. La plaza mide 150 m de largo… en medio tiene a la Virgen, y también tiene bancos y arbolitos».
// Real: a long platform in the middle of the avenue (Pl. San Cristóbal, two one-way carriageways), rounded ends, an ochre
// wall with a dark green iron railing between stone pillars crowned with urns, steps down to the pavements, rows of small
// trees in planters, benches, three-armed lanterns, and the Virgin on a tall dark stone column. The car park «La
// Milagrosa» under it: in at one end, out at the other, by 3.1 m ramps in the 3 m bands beside the platform.
const MILAGROSA = { F: null };
function milagrosaPrep() {
  // (before the plazas and parks: the OSM square is not dressed as a ground-level square)
  const i = DATA.A.findIndex((a) => a[1] >= 0 && /^Plaza de San Crist[oó]bal$/.test(STR[a[1]]) && DATA.AT[a[0]] === 'square');
  if (i < 0) return;
  MILAGROSA.src = DATA.A[i][2].slice();
  DATA.A.splice(i, 1);
}
function buildMilagrosa() {
  const c = MILAGROSA.src;
  if (!c) return console.warn('Milagrosa: no square');
  const F = pcaFrame(c),
    uc = (F.u0 + F.u1) / 2,
    vc = (F.v0 + F.v1) / 2,
    Lp = Math.min(150, F.u1 - F.u0 - 4), // the platform
    hw = 6, // its half width (12 m)
    P = (u, v) => F.W(uc + u, vc + v);
  // its height: flat, 4 steps over the highest point under it (5 or more at the low end)
  let gmax = -1e9,
    gmin = 1e9;
  for (let u = -Lp / 2; u <= Lp / 2; u += 3)
    for (let v = -hw; v <= hw; v += 3) {
      const [x, z] = P(u, v),
        g = heightAt(x, z);
      gmax = Math.max(gmax, g);
      gmin = Math.min(gmin, g);
    }
  const top = gmax + 4 * 0.17;
  MILAGROSA.F = F;
  MILAGROSA.top = top;
  // ---- the car park under it
  const L = clamp(Lp - 64, 40, 90),
    yF = gmin - 5.4,
    vr = hw + 1.55; // the ramps: in the band beside the platform
  const F2 = { ...F, cx: P(0, 0)[0], cz: P(0, 0)[1] };
  F2.W = (u, v) => [F2.cx + F.ux * u - F.uz * v, F2.cz + F.uz * u + F.ux * v];
  try {
    buildHall(F2, 0, L, yF, 'Parking La Milagrosa', [
      ['u+', vr, 3.6],
      ['u-', -vr, 3.6]
    ]);
    for (const [s, v, lab] of [
      [1, vr, 'P LA MILAGROSA · ENTRADA'],
      [-1, -vr, 'SALIDA']
    ]) {
      const a = F2.W(s * (L / 2 + 28), v),
        b = F2.W(s * (L / 2 - 3), v);
      buildRamp(a[0], a[1], b[0], b[1], yF, lab, { w: 3.1 });
    }
    CARPARKS.push({ name: 'Parking La Milagrosa', x: F2.cx, z: F2.cz, F: F2, uc: 0, L, yF });
  } catch (e) {
    console.error('Milagrosa parking', e);
  }
  // ---- the platform: a stadium (rounded ends), ochre walls, paved top
  const r = hw,
    straight = Lp / 2 - r,
    shape = new THREE.Shape();
  shape.moveTo(-straight, -hw);
  shape.lineTo(straight, -hw);
  shape.absarc(straight, 0, r, -Math.PI / 2, Math.PI / 2, false);
  shape.lineTo(-straight, hw);
  shape.absarc(-straight, 0, r, Math.PI / 2, (3 * Math.PI) / 2, false);
  const base = gmin - 0.6,
    g = new THREE.ExtrudeGeometry(shape, { depth: top - base, bevelEnabled: false, curveSegments: 16 });
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const [x, z] = P(pos.getX(i), pos.getY(i));
    pos.setXYZ(i, x, base + pos.getZ(i), z);
  }
  g.computeVertexNormals();
  const paveM = new THREE.MeshStandardMaterial({ map: TEX.paving, color: 0xb9b7b2, roughness: 0.9, side: THREE.DoubleSide }),
    ochreM = new THREE.MeshStandardMaterial({ color: 0xd8a93a, roughness: 0.85, side: THREE.DoubleSide }),
    stoneM = new THREE.MeshStandardMaterial({ color: 0x6e5f55, roughness: 0.95 }),
    ironM = new THREE.MeshStandardMaterial({ color: 0x24362c, roughness: 0.5, metalness: 0.5 }),
    whiteM = new THREE.MeshStandardMaterial({ color: 0xf3f1ec, roughness: 0.6 });
  const root = new THREE.Group();
  root.name = 'milagrosa';
  const plat = new THREE.Mesh(g, [paveM, ochreM]);
  plat.receiveShadow = plat.castShadow = true;
  root.add(plat);
  // the perimeter, every ~1 m: [x, z, u, v, nx, nz]
  const per = [];
  const addP = (u, v, nu, nv) => {
    const [x, z] = P(u, v),
      [x2, z2] = P(u + nu, v + nv);
    per.push([x, z, u, v, x2 - x, z2 - z]);
  };
  for (let u = -straight; u < straight; u += 1) addP(u, -hw, 0, -1);
  for (let a = -Math.PI / 2; a < Math.PI / 2; a += 1 / r) addP(straight + Math.cos(a) * r, Math.sin(a) * r, Math.cos(a), Math.sin(a));
  for (let u = straight; u > -straight; u -= 1) addP(u, hw, 0, 1);
  for (let a = Math.PI / 2; a < (3 * Math.PI) / 2; a += 1 / r) addP(-straight + Math.cos(a) * r, Math.sin(a) * r, Math.cos(a), Math.sin(a));
  // the steps: at both ends, and at the middle of each side (towards the crossings)
  const stairs = [
    [Lp / 2, 0, 1, 0, 5],
    [-Lp / 2, 0, -1, 0, 5],
    [0, hw, 0, 1, 4],
    [0, -hw, 0, -1, 4]
  ];
  const inStair = (u, v) =>
    stairs.some(([su, sv, nu, nv, w]) =>
      nu ? Math.abs(v - sv) < w / 2 && Math.abs(u - su) < 2.5 : Math.abs(u - su) < w / 2 && Math.abs(v - sv) < 0.6
    );
  const stepH = 0.17,
    stepD = 0.32;
  for (const [su, sv, nu, nv, w] of stairs) {
    const [ox, oz] = P(su, sv),
      gH = heightAt(ox + nu * 1.5, oz + nv * 1.5),
      n = Math.max(1, Math.round((top - gH) / stepH));
    const ang = Math.atan2(F.ux * nu - F.uz * nv, F.uz * nu + F.ux * nv);
    for (let k = 0; k < n; k++) {
      const h = top - (k + 1) * stepH - (gH - 0.3);
      if (h <= 0.02) break;
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, stepD), stoneM);
      const [x, z] = P(su + nu * (stepD * (k + 0.5)), sv + nv * (stepD * (k + 0.5)));
      m.position.set(x, gH - 0.3 + h / 2, z);
      m.rotation.y = ang;
      m.receiveShadow = true;
      root.add(m);
    }
    // walking up and down them (a sloping deck)
    const [x0, z0] = P(su + nu * stepD * n, sv + nv * stepD * n);
    DECKS.push({
      type: 'path',
      pts: [
        [x0, z0, gH + 0.02],
        [ox, oz, top]
      ],
      w,
      bb: [Math.min(x0, ox) - w, Math.max(x0, ox) + w, Math.min(z0, oz) - w, Math.max(z0, oz) + w]
    });
  }
  // pillars with urns every ~4.5 m and the iron railing between them (not over the steps); collision all round
  const railG = [],
    pil = new THREE.BoxGeometry(0.45, 1.15, 0.45),
    urn = new THREE.SphereGeometry(0.2, 10, 8);
  let last = null,
    acc = 0;
  for (let i = 0; i < per.length; i++) {
    const p = per[i],
      q = per[(i + 1) % per.length],
      st = inStair(p[2], p[3]);
    if (!st && !inStair(q[2], q[3])) {
      COL.addSeg(p[0], p[1], q[0], q[1], top - 6, top + 1.1, 'plaza Milagrosa');
      // the railing: vertical bars every 12 cm and two rails
      const L1 = Math.hypot(q[0] - p[0], q[1] - p[1]);
      for (let t = 0; t < L1; t += 0.12) {
        const b = new THREE.BoxGeometry(0.025, 0.85, 0.025);
        b.translate(p[0] + ((q[0] - p[0]) * t) / L1, top + 0.45, p[1] + ((q[1] - p[1]) * t) / L1);
        railG.push(b);
      }
      for (const yy of [top + 0.08, top + 0.86]) {
        const b = new THREE.BoxGeometry(L1 + 0.02, 0.04, 0.05);
        b.rotateY(Math.atan2(-(q[1] - p[1]), q[0] - p[0]));
        b.translate((p[0] + q[0]) / 2, yy, (p[1] + q[1]) / 2);
        railG.push(b);
      }
    }
    acc += last ? Math.hypot(p[0] - last[0], p[1] - last[1]) : 0;
    last = p;
    if (acc >= 4.5 || st !== inStair(q[2], q[3])) {
      acc = 0;
      const m = new THREE.Mesh(pil, stoneM);
      m.position.set(p[0], top + 0.575, p[1]);
      m.castShadow = true;
      root.add(m);
      const o = new THREE.Mesh(urn, whiteM);
      o.position.set(p[0], top + 1.35, p[1]);
      root.add(o);
    }
  }
  if (railG.length) {
    const rm = new THREE.Mesh(mergeGeos(railG), ironM);
    root.add(rm);
  }
  // you walk on it (05f_anchieta.js)
  {
    const [ax, az] = P(-Lp / 2, 0),
      [bx, bz] = P(Lp / 2, 0);
    DECKS.push({
      type: 'path',
      pts: [
        [ax, az, top],
        [bx, bz, top]
      ],
      w: 2 * hw,
      bb: [Math.min(ax, bx) - 12, Math.max(ax, bx) + 12, Math.min(az, bz) - 12, Math.max(az, bz) + 12],
      plaza: true
    });
  }
  // ---- the Virgin on her column (the OSM point «Virgen de la Milagrosa»)
  const vp = (DATA.P || []).find((p) => p[0] >= 0 && /Virgen de la Milagrosa/.test(STR[p[0]]));
  const [vx, vz] = vp ? [vp[2], vp[3]] : P(0, 0);
  {
    const add = (geo, m, y) => {
      const o = new THREE.Mesh(geo, m);
      o.position.set(vx, top + y, vz);
      o.castShadow = true;
      root.add(o);
      return o;
    };
    add(new THREE.BoxGeometry(2.4, 0.5, 2.4), stoneM, 0.25);
    add(new THREE.BoxGeometry(1.3, 0.6, 1.3), stoneM, 0.8);
    add(new THREE.BoxGeometry(0.95, 6.2, 0.95), stoneM, 4.2);
    add(new THREE.BoxGeometry(1.25, 0.25, 1.25), stoneM, 7.4);
    add(new THREE.CylinderGeometry(0.22, 0.42, 1.5, 12), whiteM, 8.3); // the robe
    add(new THREE.SphereGeometry(0.17, 12, 10), whiteM, 9.2); // the head
    add(new THREE.CylinderGeometry(0.2, 0.18, 0.12, 10), whiteM, 9.4); // the crown
    // a round hedge round its foot
    const h = add(new THREE.CylinderGeometry(2.6, 2.7, 0.7, 20), new THREE.MeshStandardMaterial({ color: 0x3f7a2e, roughness: 0.95 }), 0.35);
    h.castShadow = false;
    COL.addCirc(vx, vz, 2.7);
  }
  // ---- (Jonay's photo along the axis, plaza_eje.webp): small trees in planters on both sides of the walk; benches against
  // the wall facing the middle; three-armed iron lanterns in pairs on the edges; an oval flower bed before the Virgin
  const trunkM = new THREE.MeshStandardMaterial({ color: 0x5b4632, roughness: 0.9 }),
    leafM = new THREE.MeshStandardMaterial({ color: 0x3e6b34, roughness: 0.9 }),
    woodM = new THREE.MeshStandardMaterial({ color: 0x7a4a2a, roughness: 0.8 }),
    lampM = new THREE.MeshStandardMaterial({ color: 0xfff1c8, emissive: 0x6a5a2a, roughness: 0.4 }),
    ang0 = Math.atan2(F.ux, F.uz);
  const nearV = (x, z, r) => Math.hypot(x - vx, z - vz) < r;
  for (let u = -straight + 4; u <= straight - 4; u += 9) {
    for (const v of [-3.2, 3.2]) {
      const [x, z] = P(u, v);
      if (nearV(x, z, 7)) continue;
      const pl = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.45, 1.3), stoneM);
      pl.position.set(x, top + 0.22, z);
      root.add(pl);
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 1.8, 6), trunkM);
      t.position.set(x, top + 1.3, z);
      root.add(t);
      const cr = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 1), leafM);
      cr.position.set(x, top + 2.6, z);
      cr.castShadow = true;
      root.add(cr);
      COL.addCirc(x, z, 0.75);
    }
    // a bench against each wall, halfway to the next tree, facing the middle
    for (const sd of [-1, 1]) {
      const [bx, bz] = P(u + 4.5, sd * (hw - 0.55));
      if (nearV(bx, bz, 7) || u + 4.5 > straight - 2) continue;
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.45), woodM);
      seat.position.set(bx, top + 0.45, bz);
      seat.rotation.y = ang0 + Math.PI / 2;
      root.add(seat);
      const [kx, kz] = P(u + 4.5, sd * (hw - 0.3));
      const back = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.45, 0.06), woodM);
      back.position.set(kx, top + 0.78, kz);
      back.rotation.y = ang0 + Math.PI / 2;
      root.add(back);
      COL.addCirc(bx, bz, 0.5);
    }
  }
  // the lanterns: in pairs, one by each wall, every 18 m
  for (let u = -straight + 9; u <= straight - 9; u += 18)
    for (const sd of [-1, 1]) {
      const [x, z] = P(u, sd * (hw - 1.1));
      if (nearV(x, z, 6)) continue;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.11, 4.0, 8), ironM);
      pole.position.set(x, top + 2.0, z);
      root.add(pole);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.5, 6), ironM);
      tip.position.set(x, top + 4.6, z);
      root.add(tip);
      for (let k = 0; k < 3; k++) {
        const a = (k / 3) * Math.PI * 2 + 0.5,
          lan = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.1, 0.4, 6), lampM);
        lan.position.set(x + Math.cos(a) * 0.5, top + 3.85, z + Math.sin(a) * 0.5);
        root.add(lan);
      }
      COL.addCirc(x, z, 0.2);
    }
  // the oval flower bed in front of the Virgin (towards the lower end), with its stone kerb
  {
    const [fx, fz] = [vx + F.ux * 5.5, vz + F.uz * 5.5];
    const bed = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.35, 24), new THREE.MeshStandardMaterial({ color: 0x8a4a6a, roughness: 0.9 }));
    bed.scale.set(2.2, 1, 1.3);
    bed.position.set(fx, top + 0.17, fz);
    bed.rotation.y = ang0 + Math.PI / 2;
    root.add(bed);
    const kerb = new THREE.Mesh(new THREE.CylinderGeometry(1.08, 1.08, 0.3, 24, 1, true), stoneM);
    kerb.scale.set(2.2, 1, 1.3);
    kerb.position.copy(bed.position);
    kerb.rotation.y = bed.rotation.y;
    root.add(kerb);
    COL.addCirc(fx, fz, 1.3);
  }
  scene.add(root);
  window.__milagrosa = { top: +top.toFixed(2), gmin: +gmin.toFixed(2), gmax: +gmax.toFixed(2), L: Lp, hall: L, yF: +yF.toFixed(2) }; // (tests)
}
