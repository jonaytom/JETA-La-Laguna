// ============ edge of the world: warning 50 m before, teleport 100 m back onto a street before the edge ============
const BORDER = { warnD: 50, tpD: 12, back: 100, t: 0, warned: false };
function borderTarget(x, z) {
  // walk inwards following the gradient of the distance to the edge
  let px = x, pz = z, moved = 0; const e = 2;
  while (moved < BORDER.back + 40) { const gx = worldEdgeDist(px + e, pz) - worldEdgeDist(px - e, pz), gz = worldEdgeDist(px, pz + e) - worldEdgeDist(px, pz - e); const gl = Math.hypot(gx, gz) || 1; px += gx / gl * 5; pz += gz / gl * 5; moved += 5; if (moved >= BORDER.back && worldEdgeDist(px, pz) > BORDER.warnD + 20) break; }
  // nearest street (at grade, drivable) around that point, away from the edge, not inside a building
  const ok = (r) => r[0] <= 12 && !(r[3] & 6);
  for (let rad = 0; rad <= 160; rad += 10) for (let k = 0; k < (rad ? 16 : 1); k++) { const a = k / 16 * Math.PI * 2; const qx = px + Math.cos(a) * rad, qz = pz + Math.sin(a) * rad;
    const rd = ROADSEG.nearest(qx, qz, ok); if (!rd || rd.d > 40) continue; if (worldEdgeDist(rd.x, rd.z) < BORDER.warnD + 10) continue; if (inAnyBuilding(rd.x, rd.z)) continue;
    if (lowAt(rd.x, rd.z, heightAt(rd.x, rd.z))) continue; return { x: rd.x, z: rd.z, h: Math.atan2(rd.dx, rd.dz) }; }
  return { x: px, z: pz, h: 0 };
}
function updateBorder(dt) {
  if (GAME.state !== 'play' || PLAYER.interior || PLAYER.dead) return; const c = PLAYER.car; const x = c ? c.x : PLAYER.x, z = c ? c.z : PLAYER.z;
  const d = worldEdgeDist(x, z); BORDER.t -= dt;
  if (d < BORDER.warnD && BORDER.t <= 0) { HUD.toast('⚠ Saliendo del mundo — da la vuelta', '#ffb02e', 2.2); BORDER.t = 2; }
  if (d < BORDER.tpD) {
    const T = borderTarget(x, z);
    if (c) { const dir = Math.atan2(x - T.x, z - T.z) + Math.PI; let h = T.h; if (Math.abs(angDiff(h, dir)) > Math.PI / 2) h += Math.PI; // face away from the edge
      c.x = T.x; c.z = T.z; c.h = h; c.vx = c.vz = 0; c.fwdV = 0; c.yawRate = 0; c.y = heightAt(T.x, T.z) + 0.2; c.low = null; c.onDeck = false; c.sync(0.016); PLAYER.x = T.x; PLAYER.z = T.z; PLAYER.y = c.y; }
    else { const sp = safeSpot(T.x, T.z, 0.6); PLAYER.x = sp[0]; PLAYER.z = sp[1]; PLAYER.y = heightAt(sp[0], sp[1]) + 0.2; PLAYER.vy = 0; PLAYER.low = null; PLAYER.onDeck = false; }
    $('fade').style.opacity = 1; setTimeout(() => { $('fade').style.opacity = 0; }, 350); updateCamera(0.016); HUD.toast('Vuelves a la ciudad', '#3ddc97', 2); BORDER.t = 3;
  }
}
