// ============ brújula a los pies hacia los objetivos (v0.60, rehecha a petición de Jonay) ============
// A small ring on the ground (v0.62: half the size, double stroke, coloured like the leading goal) round the player (round the car when driving) with a small pointer growing out of its edge for every
// active destination, always pointing straight at it like a compass (not along the streets): yellow = mission / next
// story stop, blue = side mission, red = whoever you are chasing, pink = your own destination on the map. Subtle: thin,
// semi-transparent, under the character. Hidden indoors, in menus and fights; a pointer hides when its goal is close.
const GUIDE = (() => {
  let g = null, ring = null, lastLead = null; const tips = [], mats = {};
  const mat = (css) => mats[css] || (mats[css] = new THREE.MeshBasicMaterial({ color: new THREE.Color(css), transparent: true, opacity: 0.6, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4, depthTest: !onTop }));
  const rmats = {}; const ringMat = (css) => rmats[css] || (rmats[css] = Object.assign(mat(css).clone(), { opacity: 0.5 }));
  let tipGeo = null, carArrow = null, bob = 0, rgCar = null, rgFoot = null, onTop = false; const UP = new THREE.Vector3(0, 1, 0), NRM = new THREE.Vector3(0, 1, 0), TGT = new THREE.Vector3(), QY = new THREE.Quaternion(), QT = new THREE.Quaternion(); let sy = 0, off = false;
  function makeGuide() {
    const rg = new THREE.RingGeometry(0.22, 0.28, 40); rg.rotateX(-Math.PI / 2); rg.userData.shared = true; rgCar = new THREE.RingGeometry(0.385, 0.40, 64); rgCar.rotateX(-Math.PI / 2); rgCar.userData.shared = true; rgFoot = rg; // thinner stroke when scaled up round a vehicle
    const sh = new THREE.Shape(); sh.moveTo(0, 0.24); sh.lineTo(0.12, 0); sh.lineTo(0.04, 0.03); sh.lineTo(0, -0.01); sh.lineTo(-0.04, 0.03); sh.lineTo(-0.12, 0); sh.closePath();
    tipGeo = new THREE.ShapeGeometry(sh); tipGeo.rotateX(-Math.PI / 2); tipGeo.translate(0, 0, -0.265); tipGeo.userData.shared = true; // pointer growing out of the ring's edge, towards local -z
    // v0.63: in a vehicle there is no ring: one chevron floats over the roof pointing at the leading goal (like the arrow
    // over the car in Crazy Taxi / the floating markers of racing games), drawn over everything, gently bobbing
    const ch = new THREE.Shape(); ch.moveTo(0, 0.5); ch.lineTo(0.42, -0.1); ch.lineTo(0.2, -0.1); ch.lineTo(0.2, -0.45); ch.lineTo(-0.2, -0.45); ch.lineTo(-0.2, -0.1); ch.lineTo(-0.42, -0.1); ch.closePath();
    const cg = new THREE.ExtrudeGeometry(ch, { depth: 0.14, bevelEnabled: false }); cg.translate(0, 0, -0.07); cg.rotateX(-Math.PI / 2); cg.userData.shared = true; // a solid arrow: reads from any angle
    carArrow = new THREE.Mesh(cg, new THREE.MeshStandardMaterial({ color: 0xf5b72e, emissive: 0xf5b72e, emissiveIntensity: 0.3, roughness: 0.5, transparent: true, opacity: 0.45, depthTest: false, depthWrite: false }));
    carArrow.renderOrder = 20; carArrow.visible = false; scene.add(carArrow);
    g = new THREE.Group(); ring = new THREE.Mesh(rg, ringMat('#f5b72e')); ring.renderOrder = 2; g.add(ring); g.visible = false; scene.add(g);
  }
  function tip(i) { while (tips.length <= i) { const m = new THREE.Mesh(tipGeo, mat('#f5b72e')); m.renderOrder = onTop ? 20 : 2; g.add(m); tips.push(m); } return tips[i]; }
  function goals() {
    const L = []; const add = (x, z, css) => { if (!L.some((q) => Math.abs(q[0] - x) + Math.abs(q[1] - z) < 4)) L.push([x, z, css]); };
    for (const b of MISSIONS.blips()) add(b[0], b[1], b[2] || '#f5b72e'); // mission goal, story / side beacons, chased people and cars
    if (GPS.target && !GPS.story) add(GPS.target[0], GPS.target[1], '#e040fb'); else if (GPS.target) add(GPS.target[0], GPS.target[1], '#f5b72e');
    return L;
  }
  return {
    get lead() { return lastLead; }, // tests: where the arrow over the car points
    update() {
      if (!g) makeGuide();
      if (pressed('KeyG')) { off = !off; HUD.toast(off ? 'Brújula oculta (G)' : 'Brújula visible (G)'); } // v0.62.1: toggle with G (E is «usar / entrar»)
      const ok = !off && GAME.state === 'play' && !PLAYER.interior && !PLAYER.dead && !(BIGMAP && BIGMAP.open);
      const L = ok ? goals().filter((q) => Math.hypot(q[0] - PLAYER.x, q[1] - PLAYER.z) > 6) : [];
      g.visible = L.length > 0; tips.forEach((t) => { t.visible = false; }); if (!g.visible) { carArrow.visible = false; return; }
      const car = PLAYER.car;
      carArrow.visible = false;
      if (car) { // vehicle: only the floating arrow, towards your own mark (pink) or else the main mission
        g.visible = false;
        // v0.75 (Jonay): in a chase the arrow points at the car / person you're after (red), not at the mission's
        // goal; your own map mark (pink) still comes first; in races the goal is the next control (yellow)
        const red = MISSIONS.isRace() ? null : L.filter((q) => q[2] === '#ff3b30').sort((p, q) => Math.hypot(p[0] - car.x, p[1] - car.z) - Math.hypot(q[0] - car.x, q[1] - car.z))[0];
        const lead = L.find((q) => q[2] === '#e040fb') || red || L.find((q) => q[2] === '#f5b72e') || L[0];
        lastLead = lead; bob += 0.05; const H = (car.T && car.T.H) || 1.5; carArrow.position.set(car.x, car.y + H + 0.75 + Math.sin(bob) * 0.06, car.z); carArrow.scale.setScalar(0.6); // v0.63.1: smaller, more see-through, almost flat (Jonay)
        // aim at the goal, then tip its face towards the camera so it never shows edge-on
        QY.setFromAxisAngle(UP, Math.atan2(lead[0] - car.x, lead[1] - car.z) + Math.PI);
        TGT.set(camera.position.x - car.x, 0, camera.position.z - car.z); const cl = TGT.length() || 1; TGT.multiplyScalar(0.3 / cl); TGT.y = 1; TGT.normalize(); QT.setFromUnitVectors(UP, TGT);
        carArrow.quaternion.multiplyQuaternions(QT, QY); carArrow.material.color.set(lead[2]); carArrow.material.emissive.set(lead[2]); carArrow.visible = true; return;
      }
      // v0.62.1: the height comes from the player's / car's own feet (PLAYER.y is the ground + 0.17: roads, squares and car
      // parks are drawn above heightAt, so a ring at heightAt was hidden under them). heightAt / deckAt only give the slope,
      // and slope and height are smoothed so it doesn't shake on descents.
      const refY = car ? car.y : PLAYER.y;
      const surf = (x, z) => Math.max(heightAt(x, z), deckAt(x, z, refY));
      const R = car ? (car.T ? car.T.W / 2 + 0.45 : 1.4) : 0.4, sc = car ? R / 0.4 : 1, e = car ? 1.6 : 0.6;
      const hx = surf(PLAYER.x + e, PLAYER.z) - surf(PLAYER.x - e, PLAYER.z), hz = surf(PLAYER.x, PLAYER.z + e) - surf(PLAYER.x, PLAYER.z - e);
      const flat = (car ? car.low : PLAYER.low) || PLAYER.interior;
      TGT.set(flat ? 0 : -hx / (2 * e), 1, flat ? 0 : -hz / (2 * e)).normalize(); NRM.lerp(TGT, 0.15).normalize(); g.quaternion.setFromUnitVectors(UP, NRM);
      const ty = refY + 0.04; sy = Math.abs(ty - sy) > 1 ? ty : sy + (ty - sy) * 0.35;
      g.position.set(PLAYER.x, sy, PLAYER.z); g.scale.setScalar(sc);
      // in a car or a lorry the ring goes round the whole vehicle and is drawn over it (it used to be hidden by the body)
      if (onTop !== !!car) { onTop = !!car; for (const m of [...Object.values(mats), ...Object.values(rmats)]) { m.depthTest = !onTop; m.needsUpdate = true; } g.traverse((o2) => { o2.renderOrder = onTop ? 20 : 2; }); ring.geometry = onTop ? rgCar : rgFoot; }
      // the ring takes the colour of the leading goal: your own map mark (pink) if you set one, else the main mission (yellow)
      const lead = L.find((q) => q[2] === '#e040fb') || (!MISSIONS.isRace() && L.find((q) => q[2] === '#ff3b30')) || L.find((q) => q[2] === '#f5b72e') || L[0]; ring.material = ringMat(lead[2]);
      L.slice(0, 6).forEach((q, i) => { const t = tip(i); t.visible = true; t.material = mat(q[2]); t.rotation.y = Math.atan2(q[0] - PLAYER.x, q[1] - PLAYER.z) + Math.PI; });
    },
  };
})();
