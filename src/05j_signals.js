// ============ señales de tráfico: STOP, ceda el paso, dirección prohibida, rotondas + marcas viales ============
const TSIGN = { list: [], stops: new Map() };
function signCanvas(kind, back) {
  const c = mkCanvas(128, 128),
    x = c.getContext('2d');
  x.clearRect(0, 0, 128, 128);
  const g = back ? '#8a8d90' : null;
  if (kind === 'stop') {
    x.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = Math.PI / 8 + (i * Math.PI) / 4;
      x.lineTo(64 + Math.cos(a) * 62, 64 + Math.sin(a) * 62);
    }
    x.closePath();
    x.fillStyle = g || '#fff';
    x.fill();
    if (!back) {
      x.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = Math.PI / 8 + (i * Math.PI) / 4;
        x.lineTo(64 + Math.cos(a) * 56, 64 + Math.sin(a) * 56);
      }
      x.closePath();
      x.fillStyle = '#c8102e';
      x.fill();
      x.fillStyle = '#fff';
      x.font = '700 38px Oswald, Impact, Arial';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      x.fillText('STOP', 64, 66);
    }
  } else if (kind === 'ceda') {
    const tri = (r, col) => {
      x.beginPath();
      x.moveTo(64 - r * 0.866 * 1.15, 64 - r * 0.62);
      x.lineTo(64 + r * 0.866 * 1.15, 64 - r * 0.62);
      x.lineTo(64, 64 + r * 0.95);
      x.closePath();
      x.fillStyle = col;
      x.fill();
    };
    tri(62, g || '#c8102e');
    if (!back) tri(40, '#fff');
  } else if (kind === 'prohib') {
    x.beginPath();
    x.arc(64, 64, 62, 0, 7);
    x.fillStyle = g || '#fff';
    x.fill();
    if (!back) {
      x.beginPath();
      x.arc(64, 64, 57, 0, 7);
      x.fillStyle = '#c8102e';
      x.fill();
      x.fillStyle = '#fff';
      x.fillRect(22, 54, 84, 20);
    }
  } else if (kind === 'rotonda') {
    x.beginPath();
    x.arc(64, 64, 62, 0, 7);
    x.fillStyle = g || '#fff';
    x.fill();
    if (!back) {
      x.beginPath();
      x.arc(64, 64, 57, 0, 7);
      x.fillStyle = '#1f5fbf';
      x.fill();
      x.strokeStyle = '#fff';
      x.lineWidth = 9;
      x.fillStyle = '#fff';
      for (let k = 0; k < 3; k++) {
        const a0 = k * 2.094 + 0.35,
          a1 = a0 + 1.35;
        x.beginPath();
        x.arc(64, 64, 30, a0, a1);
        x.stroke();
        const ex = 64 + Math.cos(a1) * 30,
          ez = 64 + Math.sin(a1) * 30,
          tx = -Math.sin(a1),
          tz = Math.cos(a1);
        x.beginPath();
        x.moveTo(ex + tx * 12, ez + tz * 12);
        x.lineTo(ex - tz * 10 - tx * 2, ez + tx * 10 - tz * 2);
        x.lineTo(ex + tz * 10 - tx * 2, ez - tx * 10 - tz * 2);
        x.closePath();
        x.fill();
      }
    }
  } else if (kind === 'unico') {
    x.fillStyle = g || '#fff';
    x.fillRect(4, 24, 120, 80);
    if (!back) {
      x.fillStyle = '#1f5fbf';
      x.fillRect(8, 28, 112, 72);
      x.fillStyle = '#fff';
      x.fillRect(20, 57, 64, 14);
      x.beginPath();
      x.moveTo(108, 64);
      x.lineTo(80, 42);
      x.lineTo(80, 86);
      x.closePath();
      x.fill();
    }
  }
  return c;
}
const MK_CELLS = 6; // v1.3.6: + 4 right-turn arrow, 5 straight-and-right arrow
function marksAtlas() {
  const c = mkCanvas(128 * MK_CELLS, 128),
    x = c.getContext('2d');
  x.clearRect(0, 0, 128 * MK_CELLS, 128);
  x.fillStyle = 'rgba(245,245,238,0.92)';
  // 0: arrow (points to +v = top of the texture after flip → draw pointing up)
  x.fillRect(52, 50, 24, 74);
  x.beginPath();
  x.moveTo(64, 4);
  x.lineTo(28, 56);
  x.lineTo(100, 56);
  x.closePath();
  x.fill();
  // 1: STOP lettering (read by the approaching driver)
  x.save();
  x.translate(192, 64);
  x.font = '700 64px Oswald, Impact, Arial';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.scale(0.62, 1.9);
  x.fillText('STOP', 0, 2);
  x.restore();
  // 2: ceda teeth (triangle pointing at the driver)
  x.beginPath();
  x.moveTo(262, 8);
  x.lineTo(378, 8);
  x.lineTo(320, 120);
  x.closePath();
  x.fill();
  // 3: solid line
  x.fillRect(388, 0, 120, 128);
  // 4: arrow turning right (shaft from the driver, then a bend to the right and its head)
  x.fillRect(512 + 38, 62, 20, 66);
  x.fillRect(512 + 38, 50, 52, 20);
  x.beginPath();
  x.moveTo(512 + 122, 60);
  x.lineTo(512 + 88, 28);
  x.lineTo(512 + 88, 92);
  x.closePath();
  x.fill();
  // 5: straight and right (the straight arrow with a branch to the right)
  x.fillRect(640 + 30, 40, 18, 88);
  x.beginPath();
  x.moveTo(640 + 39, 2);
  x.lineTo(640 + 14, 42);
  x.lineTo(640 + 64, 42);
  x.closePath();
  x.fill();
  x.fillRect(640 + 46, 74, 46, 16);
  x.beginPath();
  x.moveTo(640 + 124, 82);
  x.lineTo(640 + 90, 58);
  x.lineTo(640 + 90, 106);
  x.closePath();
  x.fill();
  const t = canvasTex(c, { repeat: false });
  return t;
}
function buildTrafficSigns() {
  const { imp, inc, nearRB, out, onBigger, place } = buildTrafficSignsPart1();
  const { MK, paint } = buildTrafficSignsPart2(out);
  buildTrafficSignsPart3(inc, nearRB, imp, out, onBigger, place, paint);
  const { kinds, o } = buildTrafficSignsPart4(inc, place, paint);
  buildTrafficSignsPart5(kinds, o);
  buildTrafficSignsPart6(MK);
  console.log('traffic signs', TSIGN.list.length, 'marks', MK.length);
}
/** (v1.1.7, code quality) part of buildTrafficSigns: --- painted markings (one merged mesh) */
function buildTrafficSignsPart6(MK) {
  // --- painted markings (one merged mesh)
  if (typeof CORR_MARKS !== 'undefined') MK.push(...CORR_MARKS); // v1.2.0: the marks of the corridor zones (04c_corredores.js), with their own height
  if (MK.length) {
    const pos = [],
      uv = [];
    for (const [cell, x, z, dx, dz, len, wid0, y0] of MK) {
      const rx = -dz,
        rz = dx,
        wid = Math.abs(wid0); // v1.3.6: a negative width draws the mark mirrored (the left-hand lane arrows)
      let u0 = cell / MK_CELLS + 0.002,
        u1 = (cell + 1) / MK_CELLS - 0.002;
      if (wid0 < 0) [u0, u1] = [u1, u0];
      const hl = len / 2,
        hw = wid / 2;
      const P = (a, b) => {
        const px = x + dx * a + rx * b,
          pz = z + dz * a + rz * b;
        return [px, y0 !== undefined ? y0 : heightAt(px, pz) + 0.2, pz];
      };
      const lb = P(-hl, -hw),
        rb2 = P(-hl, hw),
        rf = P(hl, hw),
        lf = P(hl, -hw);
      if (cell === 2) {
        // row of teeth across the lane
        const n = Math.max(1, Math.round(wid / 0.9));
        for (let k = 0; k < n; k++) {
          const b0 = -hw + (wid * k) / n,
            b1 = -hw + (wid * (k + 1)) / n;
          const q = [P(-hl, b0), P(-hl, b1), P(hl, b1), P(hl, b0)];
          pos.push(...q[0], ...q[1], ...q[2], ...q[0], ...q[2], ...q[3]);
          uv.push(u1, 0, u0, 0, u0, 1, u1, 0, u0, 1, u1, 1);
        }
        continue;
      }
      pos.push(...lb, ...rb2, ...rf, ...lb, ...rf, ...lf);
      uv.push(u0, 0, u1, 0, u1, 1, u0, 0, u1, 1, u0, 1);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    const m = new THREE.Mesh(
      g,
      new THREE.MeshStandardMaterial({
        map: marksAtlas(),
        transparent: true,
        alphaTest: 0.3,
        depthWrite: false,
        roughness: 0.7,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -8
      })
    );
    m.renderOrder = 3;
    m.receiveShadow = true;
    scene.add(m);
  }
}
/** (v1.1.7, code quality) part of buildTrafficSigns */
function buildTrafficSignsPart5(kinds, o) {
  for (const k of kinds) {
    const L = TSIGN.list.filter((s) => s[0] === k);
    if (!L.length) continue;
    const size = k === 'unico' ? 1.0 : 0.9;
    const geo = new THREE.PlaneGeometry(size, size);
    const fm = new THREE.MeshStandardMaterial({
      map: canvasTex(signCanvas(k, false), { repeat: false }),
      alphaTest: 0.5,
      roughness: 0.4,
      emissive: 0xffffff,
      emissiveIntensity: 0.06
    });
    fm.emissiveMap = fm.map;
    SIGN.mats.push(fm);
    const bm = new THREE.MeshStandardMaterial({
      map: canvasTex(signCanvas(k, true), { repeat: false }),
      alphaTest: 0.5,
      roughness: 0.6,
      metalness: 0.4
    });
    const F = new THREE.InstancedMesh(geo, fm, L.length),
      B = new THREE.InstancedMesh(geo, bm, L.length);
    L.forEach((sg, i) => {
      const y = heightAt(sg[1], sg[2]) + (k === 'rotonda' || k === 'unico' ? 2.25 : 2.3);
      const fx = Math.sin(sg[3]),
        fz = Math.cos(sg[3]);
      o.position.set(sg[1] + fx * 0.05, y, sg[2] + fz * 0.05);
      o.rotation.set(0, sg[3], 0);
      o.updateMatrix();
      F.setMatrixAt(i, o.matrix);
      o.position.set(sg[1] - fx * 0.01, y, sg[2] - fz * 0.01);
      o.rotation.set(0, sg[3] + Math.PI, 0);
      o.updateMatrix();
      B.setMatrixAt(i, o.matrix);
    });
    F.castShadow = true;
    scene.add(F, B);
  }
}
/** (v1.1.7, code quality) part of buildTrafficSigns: one-way streets: "dirección prohibida" at the exit end (facing wrong-way drivers), "sentido único" at the entry, arrows painted along */
function buildTrafficSignsPart4(inc, place, paint) {
  // one-way streets: "dirección prohibida" at the exit end (facing wrong-way drivers), "sentido único" at the entry, arrows painted along
  for (const E of GRAPH.edges) {
    if (!E.oneway || E.len < 20 || E.type.startsWith('motorway')) continue;
    const nb = inc.get(E.b);
    if (nb && nb.length >= 3 && !nb.every((o) => o.oneway)) place('prohib', E, -1, 2.5, 1);
    const na = inc.get(E.a);
    if (na && na.length >= 3 && E.len > 45 && Math.random() < 0.45) place('unico', E, 1, 4, -1);
    for (let s = 12; s < E.len - 10; s += 38) paint(0, E, 1, s, laneOff(E, 1), 4.5, 1.3);
  }
  // two-way streets: lane arrows before busy junctions
  for (const E of GRAPH.edges) {
    if (E.oneway || E.len < 45) continue;
    for (const [dir, n] of [
      [1, E.b],
      [-1, E.a]
    ]) {
      const l = inc.get(n);
      if (l && l.length >= 3) paint(0, E, dir, E.len - 16, laneOff(E, dir), 4.5, 1.3);
    }
  }
  // --- meshes: poles + plates (front and back) as instanced meshes per sign type
  const kinds = ['stop', 'ceda', 'prohib', 'rotonda', 'unico'];
  const o = new THREE.Object3D();
  const pole = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.035, 0.035, 2.6, 6),
    new THREE.MeshStandardMaterial({ color: 0x9aa0a4, metalness: 0.7, roughness: 0.4 }),
    Math.max(1, TSIGN.list.length)
  );
  TSIGN.list.forEach((sg, i) => {
    o.position.set(sg[1], heightAt(sg[1], sg[2]) + 1.3, sg[2]);
    o.rotation.set(0, 0, 0);
    o.scale.set(1, 1, 1);
    o.updateMatrix();
    pole.setMatrixAt(i, o.matrix);
  });
  pole.count = TSIGN.list.length;
  pole.castShadow = true;
  scene.add(pole);
  return { kinds, o };
}
/** (v1.1.7, code quality) part of buildTrafficSigns: v0.99.6 (Jonay: «los STOP no pueden estar en la carretera principal, deben estar en la incorporación», «más STOP en */
function buildTrafficSignsPart3(inc, nearRB, imp, out, onBigger, place, paint) {
  for (const [node, l] of inc) {
    if (l.length < 3) continue;
    const nd = GRAPH.nodes[node];
    const rb = nearRB(nd.x, nd.z);
    const maxImp = Math.max(...l.map((E) => imp(E.type)));
    const maxW = Math.max(...l.map((E) => E.w));
    for (const E of l) {
      const dir = E.b === node ? 1 : -1;
      if (dir < 0 && E.oneway) continue;
      if (E.len < 14) continue;
      const other = l.filter((o) => o !== E);
      const oW = Math.max(...other.map((o) => o.w));
      const back = oW / 2 + 1.6;
      const s = E.len - back;
      if (rb) {
        const far = dir > 0 ? [E.pts[0], E.pts[1]] : [E.pts[E.pts.length - 2], E.pts[E.pts.length - 1]];
        if (Math.hypot(far[0] - rb[0], far[1] - rb[1]) < rb[2] + 3) continue; // ring itself
        if (place('ceda', E, dir, s)) place('rotonda', E, dir, s - 5);
        {
          const H = laneHalf(E, dir); // v1.3.5: between the parking bands
          paint(2, E, dir, s + 0.2, H.off, 0.9, E.oneway ? H.wid * 0.8 : H.wid - 0.3);
        }
        continue;
      }
      const mine = imp(E.type);
      if (mine >= maxImp) continue;
      // v0.99.6 (Jonay: «los STOP no pueden estar en la carretera principal, deben estar en la incorporación», «más STOP en
      // medio de la autopista»): no STOP nor «ceda» on the slip roads and roads that merge into a motorway or a trunk road
      // (they join by an acceleration lane), and the line and the sign always where the side road is on its own: further
      // back while the spot is still on the bigger road's carriageway
      if (maxImp >= 5 && (mine >= 4 || /link|motorway|trunk/.test(E.type))) continue;
      let s2 = s;
      for (let k = 0; k < 14 && s2 > 4; k++) {
        GRAPH.sample(E.i, dir, clamp(s2, 0.5, E.len - 0.5), 0, out);
        if (!onBigger(out.x, out.z, mine)) break;
        s2 -= 3;
      }
      GRAPH.sample(E.i, dir, clamp(s2, 0.5, E.len - 0.5), 0, out);
      if (onBigger(out.x, out.z, mine)) continue;
      const kind = maxImp >= 4 || (maxImp >= 3 && mine <= 1 && Math.random() < 0.5) ? 'stop' : 'ceda';
      if (!place(kind, E, dir, s2)) continue;
      TSIGN.stops.set(E.i + ':' + dir, { s: s2, kind });
      const H = laneHalf(E, dir), // v1.3.5: between the parking bands
        off = H.off,
        lw = E.oneway ? H.wid * 0.85 : H.wid - 0.3;
      if (kind === 'stop') {
        paint(3, E, dir, s2 + 0.9, off, 0.45, lw);
        paint(1, E, dir, s2 - 2.2, off, 3.4, Math.min(2.6, lw));
      } else paint(2, E, dir, s2 + 0.5, off, 0.9, lw);
    }
  }
}
/** (v1.1.7, code quality) part of buildTrafficSigns: paint helper (skips cobbles, bridges and cuttings) */
function buildTrafficSignsPart2(out) {
  // paint helper (skips cobbles, bridges and cuttings)
  const MK = [];
  const paintOK = (x, z) => {
    const rn = ROADSEG.nearest(x, z, (r) => r[0] <= 12);
    if (!rn) return false;
    const rd = DATA.R[rn.ri];
    return ROADCLASS(rd) !== 'paving' && !(rd[3] & 6) && !DEP.has(rn.ri) && !isHistoric(x, z);
  };
  const paint = (cell, E, dir, s, off, len, wid) => {
    GRAPH.sample(E.i, dir, clamp(s, 0, E.len), off, out);
    if (!paintOK(out.x, out.z)) return;
    MK.push([cell, out.x, out.z, out.dx, out.dz, len, wid]);
  };
  return { MK, paint };
}
/** (v1.1.7, code quality) part of buildTrafficSigns */
function buildTrafficSignsPart1() {
  const imp = (t) =>
    ({ motorway: 6, trunk: 5, motorway_link: 4, primary: 4, primary_link: 3, secondary: 3, secondary_link: 2, tertiary: 2, tertiary_link: 1.5 })[t] ||
    1;
  const inc = new Map();
  GRAPH.edges.forEach((E) => {
    if (E.len < 0.5) return;
    for (const n of [E.a, E.b]) {
      let l = inc.get(n);
      if (!l) inc.set(n, (l = []));
      if (!l.includes(E)) l.push(E);
    }
  });
  const RB = DATA.RB || [];
  const nearRB = (x, z) => RB.find((r) => Math.hypot(x - r[0], z - r[1]) < r[2] + 4);
  const out = { x: 0, z: 0, dx: 0, dz: 0 };
  const onBigger = (x, z, imp0) => {
    const rn = ROADSEG.nearest(x, z, (r) => r[0] <= 12 && !(r[3] & 4) && imp(RTN[r[0]]) > imp0);
    return !!rn && rn.d < DATA.R[rn.ri][2] / 2 + 0.8;
  }; // v0.99.6
  const okSpot = (x, z) =>
    !COL.nearSeg(x, z, 0.45) &&
    !onCarriageway(x, z, 0.15) &&
    !lowAt(x, z, heightAt(x, z)) &&
    !(deckAt(x, z, heightAt(x, z) + 30) > heightAt(x, z) + 1);
  const place = (kind, E, dir, s, side = 1) => {
    for (const extra of [1.1, 0.5, 1.8]) {
      GRAPH.sample(E.i, dir, clamp(s, 0.5, E.len - 0.5), (E.w / 2 + extra) * side, out);
      if (okSpot(out.x, out.z)) {
        TSIGN.list.push([kind, out.x, out.z, Math.atan2(-out.dx, -out.dz)]);
        return true;
      }
    }
    return false;
  };
  return { imp, inc, nearRB, out, onBigger, place };
}
