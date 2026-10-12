// ============ flecha guía hacia el objetivo (v0.60) ============
// With a mission goal or a destination marked on the map, a flat arrow on the ground at the player's feet (over the car
// when driving) points along the GPS route, so you don't have to keep looking at the map. Yellow for missions, pink
// for your own destination. Hidden indoors, in menus and fights, and when the goal is close.
const GUIDE = (() => {
  let mesh = null, matY = null, matP = null;
  function make() {
    const sh = new THREE.Shape(); sh.moveTo(0, 1.1); sh.lineTo(0.62, 0.25); sh.lineTo(0.22, 0.25); sh.lineTo(0.22, -0.7); sh.lineTo(-0.22, -0.7); sh.lineTo(-0.22, 0.25); sh.lineTo(-0.62, 0.25); sh.closePath();
    const g = new THREE.ShapeGeometry(sh); g.rotateX(-Math.PI / 2); g.userData.shared = true; // tip towards local -z after the rotation
    const mk = (c) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.85, depthTest: false, depthWrite: false });
    matY = mk(0xf5b72e); matP = mk(0xe040fb); mesh = new THREE.Mesh(g, matY); mesh.renderOrder = 15; mesh.visible = false; scene.add(mesh);
  }
  // a point some metres ahead along the GPS route (the route starts at the player), else the target itself
  function aim(tgt) {
    const P = GPS.path; if (!P || P.length < 4) return tgt; let acc = 0;
    for (let i = 2; i < P.length; i += 2) { const d = Math.hypot(P[i] - P[i - 2], P[i + 1] - P[i - 1]); acc += d; if (acc > (PLAYER.car ? 30 : 14)) return [P[i], P[i + 1]]; }
    return tgt;
  }
  return {
    update() {
      if (!mesh) make();
      const tgt = MISSIONS.target() || GPS.target; const car = PLAYER.car;
      const show = tgt && GAME.state === 'play' && !PLAYER.interior && !PLAYER.dead && !(BIGMAP && BIGMAP.open) && Math.hypot(tgt[0] - PLAYER.x, tgt[1] - PLAYER.z) > 8;
      mesh.visible = !!show; if (!show) return;
      const [ax, az] = aim(tgt); const h = Math.atan2(ax - PLAYER.x, az - PLAYER.z);
      const r = car ? 0 : 1.3, y = car ? (car.y || heightAt(car.x, car.z)) + (car.T ? car.T.H : 1.5) + 0.7 : (PLAYER.y != null ? PLAYER.y : heightAt(PLAYER.x, PLAYER.z)) + 0.08;
      const bob = car ? Math.sin(performance.now() / 260) * 0.15 : 0;
      mesh.position.set(PLAYER.x + Math.sin(h) * r, y + bob, PLAYER.z + Math.cos(h) * r); mesh.rotation.set(0, h + Math.PI, 0); mesh.scale.setScalar(car ? 1.15 : 1);
      mesh.material = MISSIONS.target() || GPS.story ? matY : matP; mesh.material.opacity = car ? 0.6 : 0.85;
    },
  };
})();
