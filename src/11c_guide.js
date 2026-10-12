// ============ brújula a los pies hacia los objetivos (v0.60, rehecha a petición de Jonay) ============
// A thin ring on the ground round the player (round the car when driving) with a small pointer on its edge for every
// active destination, always pointing straight at it like a compass (not along the streets): yellow = mission / next
// story stop, blue = side mission, red = whoever you are chasing, pink = your own destination on the map. Subtle: thin,
// semi-transparent, under the character. Hidden indoors, in menus and fights; a pointer hides when its goal is close.
const GUIDE = (() => {
  let g = null, ring = null; const tips = [], mats = {};
  const mat = (css) => mats[css] || (mats[css] = new THREE.MeshBasicMaterial({ color: new THREE.Color(css), transparent: true, opacity: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
  let tipGeo = null;
  function make() {
    const rg = new THREE.RingGeometry(0.78, 0.81, 48); rg.rotateX(-Math.PI / 2); rg.userData.shared = true;
    const sh = new THREE.Shape(); sh.moveTo(0, 0.24); sh.lineTo(0.12, 0); sh.lineTo(0.04, 0.03); sh.lineTo(0, -0.01); sh.lineTo(-0.04, 0.03); sh.lineTo(-0.12, 0); sh.closePath();
    tipGeo = new THREE.ShapeGeometry(sh); tipGeo.rotateX(-Math.PI / 2); tipGeo.translate(0, 0, -0.84); tipGeo.userData.shared = true; // pointer on the ring's edge, towards local -z
    g = new THREE.Group(); const rm = mat('#ffffff').clone(); rm.opacity = 0.32; ring = new THREE.Mesh(rg, rm); ring.renderOrder = 2; g.add(ring); g.visible = false; scene.add(g);
  }
  function tip(i) { while (tips.length <= i) { const m = new THREE.Mesh(tipGeo, mat('#f5b72e')); m.renderOrder = 2; g.add(m); tips.push(m); } return tips[i]; }
  function goals() {
    const L = []; const add = (x, z, css) => { if (!L.some((q) => Math.abs(q[0] - x) + Math.abs(q[1] - z) < 4)) L.push([x, z, css]); };
    for (const b of MISSIONS.blips()) add(b[0], b[1], b[2] || '#f5b72e'); // mission goal, story / side beacons, chased people and cars
    if (GPS.target && !GPS.story) add(GPS.target[0], GPS.target[1], '#e040fb'); else if (GPS.target) add(GPS.target[0], GPS.target[1], '#f5b72e');
    return L;
  }
  return {
    update() {
      if (!g) make();
      const ok = GAME.state === 'play' && !PLAYER.interior && !PLAYER.dead && !(BIGMAP && BIGMAP.open);
      const L = ok ? goals().filter((q) => Math.hypot(q[0] - PLAYER.x, q[1] - PLAYER.z) > 6) : [];
      g.visible = L.length > 0; tips.forEach((t) => { t.visible = false; }); if (!g.visible) return;
      const car = PLAYER.car; const y = car ? heightAt(car.x, car.z) + 0.06 : (PLAYER.y != null ? PLAYER.y : heightAt(PLAYER.x, PLAYER.z)) + 0.04;
      g.position.set(PLAYER.x, y, PLAYER.z); g.scale.setScalar(car ? 3.0 : 1);
      L.slice(0, 6).forEach((q, i) => { const t = tip(i); t.visible = true; t.material = mat(q[2]); t.rotation.y = Math.atan2(q[0] - PLAYER.x, q[1] - PLAYER.z) + Math.PI; });
    },
  };
})();
