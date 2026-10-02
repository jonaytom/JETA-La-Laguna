// ============ shop signs (parody names, never real brands) ============
const SIGN = { mats: [], placed: [] };
const SIGNCOL = { S: ['#e8702a', '#ffffff'], R: ['#7a1f1f', '#f6e7c1'], C: ['#3b2616', '#f5d9a8'], B: ['#1d3557', '#ffd166'], F: ['#d62828', '#ffe45c'], K: ['#12436b', '#ffffff'], P: ['#1a8a3a', '#ffffff'], G: ['#f2c200', '#1a1a1a'], H: ['#2c2c54', '#f5b72e'], Y: ['#111111', '#7fe08a'], V: ['#f4f1ea', '#222222'], O: ['#0f766e', '#ffffff'], L: ['#5b3a29', '#f4e4c1'], D: ['#f7d8c8', '#7a3b1f'], T: ['#e84a8a', '#ffffff'], E: ['#6d2e6d', '#ffffff'], M: ['#3a4a3e', '#ffffff'], Z: ['#1f4e8c', '#ffffff'], J: ['#1a1a1a', '#e7c46a'] };
const GENERIC = {
  P: ['Farmacia'], K: ['Banco Gofio', 'Caja del Roque', 'Banco Perenquén'], C: ['Café El Barraquito', 'Cafetería La Guagua', 'Café Fuerte Calor', 'Café El Mago'],
  R: ['Casa Comidas El Mojo Picón', 'Restaurante Papas Arrugadas', 'Tasca El Gofio'], B: ['Bar El Tenderete', 'Bar Chacho', 'Bar La Parranda'], V: ['Moda Chacho', 'Boutique Tolete', 'Zapatería Cholas'],
  E: ['Peluquería Muchacho', 'Barbería El Mago'], O: ['Óptica Veo Veo'], M: ['Bazar Ande Pepe', 'Tienda El Cambullón', 'Todo a Un Duro'], S: ['Súper Ande Chano'], F: ['Bocatas El Tolete'], D: ['Dulcería Truchas'], T: ['Móviles Fuerte Cobertura'], L: ['Librería El Magua'], Z: ['Agencia Chiquito Viaje'], J: ['Joyería El Relumbrón'], H: ['Pensión El Guanche'], Y: ['Gimnasio Fuerte Tolete'], G: ['Gasolinera Ande Pepe'],
};
function buildSigns() {
  const CWd = 384, CHt = 64, COLS = 5, ROWS = 16, PER = COLS * ROWS;
  const list = DATA.SH.filter((s) => s[3] || s[2] === 'P').map((s) => ({ x: s[0], z: s[1], cat: s[2], name: s[3] || 'Farmacia' }));
  const atlases = [];
  const cellOf = (idx) => { const a = Math.floor(idx / PER), k = idx % PER; if (!atlases[a]) { const c = mkCanvas(CWd * COLS, CHt * ROWS); atlases[a] = c; } return [atlases[a], (k % COLS) * CWd, Math.floor(k / COLS) * CHt, a, k]; };
  let idx = 0; const quads = [];
  for (const sh of list) {
    // find a facade facing a street
    let best = null, bd = 18;
    for (const id of COL.segsNear(sh.x, sh.z, 18)) {
      const o = id * 4, x1 = COL.segs[o], z1 = COL.segs[o + 1], x2 = COL.segs[o + 2], z2 = COL.segs[o + 3];
      const dx = x2 - x1, dz = z2 - z1, L = Math.hypot(dx, dz); if (L < 2.4) continue;
      let t = ((sh.x - x1) * dx + (sh.z - z1) * dz) / (L * L); t = clamp(t, 0, 1);
      const px = x1 + dx * t, pz = z1 + dz * t; const d = Math.hypot(sh.x - px, sh.z - pz); if (d >= bd) continue;
      const nx = dz / L, nz = -dx / L; const rd = ROADSEG.nearest(px + nx * 3, pz + nz * 3); if (!rd || rd.d > DATA.R[rd.ri][2] / 2 + 5) continue;
      if (COL.nearSeg(px + nx * 1.2, pz + nz * 1.2, 0.8)) continue; // facade must be exterior
      bd = d; best = { x1, z1, dx, dz, L, t, nx, nz };
    }
    const w = clamp(1.2 + sh.name.length * 0.13, 2.2, 5.2), h = w / (CWd / CHt) * 1.25;
    let P, N, U;
    if (best) {
      const half = Math.min(w / 2, best.L / 2 - 0.2) / best.L; const t = clamp(best.t, half, 1 - half);
      let px = best.x1 + best.dx * t, pz = best.z1 + best.dz * t;
      if (SIGN.placed.some((p) => Math.hypot(p[0] - px, p[1] - pz) < w * 0.9)) { const t2 = clamp(t + (w + 0.4) / best.L, half, 1 - half); px = best.x1 + best.dx * t2; pz = best.z1 + best.dz * t2; if (SIGN.placed.some((p) => Math.hypot(p[0] - px, p[1] - pz) < w * 0.8)) continue; }
      P = [px + best.nx * 0.14, pz + best.nz * 0.14]; N = [best.nx, best.nz]; U = [best.dx / best.L, best.dz / best.L];
    } else continue;
    SIGN.placed.push([P[0], P[1]]);
    const ww = Math.min(w, best.L - 0.4);
    // draw sign
    const [cv, cx, cy, a] = cellOf(idx++); const x = cv.getContext('2d'); const [bg, fg] = SIGNCOL[sh.cat] || SIGNCOL.M;
    x.fillStyle = bg; x.fillRect(cx, cy, CWd, CHt); x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 4; x.strokeRect(cx + 2, cy + 2, CWd - 4, CHt - 4);
    let tx = cx + CWd / 2;
    if (sh.cat === 'P') { x.fillStyle = '#7fff7f'; x.fillRect(cx + 16, cy + 22, 36, 12); x.fillRect(cx + 28, cy + 10, 12, 36); tx += 20; }
    let fs = 40; x.font = `700 ${fs}px Oswald, 'Arial Narrow', Arial, sans-serif`; while (x.measureText(sh.name).width > CWd * (sh.cat === 'P' ? 0.72 : 0.88) && fs > 14) { fs -= 2; x.font = `700 ${fs}px Oswald, 'Arial Narrow', Arial, sans-serif`; }
    x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(sh.name, tx, cy + CHt / 2 + 2);
    const y = heightAt(P[0], P[1]) + 3.15; const u0 = cx / cv.width, u1 = (cx + CWd) / cv.width, v1 = 1 - cy / cv.height, v0 = 1 - (cy + CHt) / cv.height;
    quads.push({ a, P, N, U, w: ww, h, y, uv: [u0, v0, u1, v1], cat: sh.cat, name: sh.name });
    LABELS.push([sh.name, P[0], P[1], 3, bg]);
  }
  atlases.forEach((cv, i) => { const t = canvasTex(cv, { repeat: false }); const m = new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 0, roughness: 0.5 }); MAT['sign' + i] = m; SIGN.mats.push(m); });
  for (const q of quads) {
    const A = acc(q.P[0], q.P[1], 'sign' + q.a); const T = acc(q.P[0], q.P[1], 'trim');
    const hw = q.w / 2, [ux, uz] = q.U, [nx, nz] = q.N, y0 = q.y - q.h / 2, y1 = q.y + q.h / 2;
    const p = (s, o, yy) => [q.P[0] + ux * s + nx * o, yy, q.P[1] + uz * s + nz * o];
    A.quad(p(-hw, 0.02, y0), p(hw, 0.02, y0), p(hw, 0.02, y1), p(-hw, 0.02, y1), [q.uv[2], q.uv[1]], [q.uv[0], q.uv[1]], [q.uv[0], q.uv[3]], [q.uv[2], q.uv[3]], null, undefined, [nx, 0, nz]);
    const dk = [0.12, 0.12, 0.13]; const b = -0.12;
    T.quad(p(-hw, b, y1), p(hw, b, y1), p(hw, 0.02, y1), p(-hw, 0.02, y1), [0, 0], [0, 0], [0, 0], [0, 0], dk, undefined, [0, 1, 0]);
    T.quad(p(-hw, b, y0), p(hw, b, y0), p(hw, 0.02, y0), p(-hw, 0.02, y0), [0, 0], [0, 0], [0, 0], [0, 0], dk, undefined, [0, -1, 0]);
    T.quad(p(-hw, b, y0), p(-hw, 0.02, y0), p(-hw, 0.02, y1), p(-hw, b, y1), [0, 0], [0, 0], [0, 0], [0, 0], dk, undefined, [-ux, 0, -uz]);
    T.quad(p(hw, 0.02, y0), p(hw, b, y0), p(hw, b, y1), p(hw, 0.02, y1), [0, 0], [0, 0], [0, 0], [0, 0], dk, undefined, [ux, 0, uz]);
  }
  SIGN.list = list; SIGN.quads = quads;
  return quads.length;
}
