// ---------- v0.90 (Jonay eligió el G1, docs/propuestas/sprites_guanches.html): los tres guerreros de Guanche Guarriors
// (el Mencey musculoso, el Pastor como Bencomo y la Mirladora en bikini de piel) con el dibujante de la propuesta. Las
// poses del juego (PO del 09m: articulaciones en un cuerpo de 28) se pasan a las del dibujante; cada dibujo se guarda
// (poses redondeadas) y, si el cuerpo va muy tumbado (caído, levantándose), se dibuja de pie y se gira el sprite.
const PIXGUAN = (() => {
  let MK = null, MG = null;
  function maskCtx(w, h) { if (!MK) { MK = document.createElement('canvas'); MG = MK.getContext('2d', { willReadFrequently: true }); }
    if (MK.width !== w || MK.height !== h) { MK.width = w; MK.height = h; } return MG; }
  const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const mix = (a, b, t) => [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t));
  function tones(base, warm, bronze) { const c = hex(base), dk = hex(bronze ? '#1a2418' : warm ? '#3e160e' : '#20123a'), hl = hex(bronze ? '#bfe0b0' : warm ? '#ffe9cc' : '#fff4e2');
    return { b: c, s: mix(c, dk, 0.36), d: mix(c, dk, 0.6), h: mix(c, hl, bronze ? 0.34 : 0.3) }; }
  const lerp2 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const perp = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [-dy / l, dx / l]; };
  function render(out, ox, oy, st, pose, who) {
    const H = st.H, W = out.width, Hh = out.height, u = H, BK = st.bodyK || 1, air = (pose.air || 0) * BK, FR = pose.front || 0;
    const X = (p) => ox + p[0] * u, Y = (p) => oy - (p[1] + air) * u;
    let J = pose; const L = (st.limb || 1) * (who.slim ? 0.86 : who.buff ? 1.28 : 1), r = st.head * (who.slim ? 0.94 : 1);
    if (BK < 1) { J = {}; for (const k in pose) { const v = pose[k]; J[k] = !Array.isArray(v) || k === 'hd' ? v : Array.isArray(v[0]) ? v.map((p) => [p[0] * 0.96, p[1] * BK]) : [v[0] * 0.96, v[1] * BK]; }
      J.hd = pose.flat ? [J.nk[0] + r * 0.9, J.nk[1]] : [J.nk[0] + (FR ? 0 : 0.02), J.nk[1] + r * 1.02]; }
    const BR = !!who.bronze; const O = who.outfit;
    const col = (k, d) => who[k] || d;
    const mats = { skin: [who.skin, 1], skinF: [who.skin, 1], ear: [who.skin, 1], top: [col('top', '#c8102e'), 0], trim: [col('trim', '#ffc400'), 0], bottom: [col('bottom', '#1d2a6b'), 0],
      sock: [col('sock', '#f2f2f2'), 0], sockF: [col('sock', '#f2f2f2'), 0], shoe: [col('shoe', '#111111'), 0], shoeF: [col('shoe', '#111111'), 0], sole: [col('sole', '#e8e4dc'), 0], soleF: [col('sole', '#e8e4dc'), 0],
      cloak: [col('cloak', '#7a4a26'), 1], cloakF: [col('cloak', '#7a4a26'), 1], cord: [col('cord', '#d8c8a0'), 0], hair: [who.hair, 0], hairL: [who.hair, 0], beard: [who.hair, 0],
      wood: [col('wood', '#8a5a2a'), 1], ball: ['#f2f2f2', 0], orb: ['#7fe0ff', 0] };
    if (BR) for (const k in mats) if (k !== 'ball' && k !== 'orb') mats[k] = [k.startsWith('hair') || k === 'beard' ? '#5a4632' : k.startsWith('cloak') ? '#6e5a3c' : k === 'wood' ? '#4a3a28' : '#8a6a44', 1];
    if (O === 'basket') mats.ball = ['#e0701c', 1];
    const T = {}; for (const m in mats) { T[m] = tones(mats[m][0], mats[m][1], BR); if (m.endsWith('F')) for (const k in T[m]) T[m][k] = mix(T[m][k], [24, 12, 30], 0.2); }
    const ua = 0.06 * L, fa = 0.05 * L, th = 0.09 * L, sh = 0.06 * L;
    const cap = (a, b, w0, w1) => (g) => { const n = perp(a, b), A = [X(a), Y(a)], B = [X(b), Y(b)], r0 = Math.max(0.6, (w0 * u) / 2), r1 = Math.max(0.6, (w1 * u) / 2);
      g.beginPath(); g.arc(A[0], A[1], r0, 0, 7); g.fill(); g.beginPath(); g.arc(B[0], B[1], r1, 0, 7); g.fill();
      g.beginPath(); g.moveTo(A[0] + n[0] * r0, A[1] - n[1] * r0); g.lineTo(B[0] + n[0] * r1, B[1] - n[1] * r1); g.lineTo(B[0] - n[0] * r1, B[1] + n[1] * r1); g.lineTo(A[0] - n[0] * r0, A[1] + n[1] * r0); g.fill(); };
    const ell = (c, rx, ry, rot = 0) => (g) => { g.beginPath(); g.ellipse(X(c), Y(c), Math.max(0.6, rx * u), Math.max(0.6, ry * u), rot, 0, 7); g.fill(); };
    const line = (a, b, w) => (g) => { g.lineCap = 'round'; g.lineWidth = Math.max(1, w * u); g.beginPath(); g.moveTo(X(a), Y(a)); g.lineTo(X(b), Y(b)); g.stroke(); };
    const poly = (pts) => (g) => { g.beginPath(); pts.forEach((p, i) => (i ? g.lineTo(X(p), Y(p)) : g.moveTo(X(p), Y(p)))); g.closePath(); g.fill(); };
    const multi = (...fs) => (g) => fs.forEach((f) => f && f(g));
    const parts = [];
    const cxm = (J.sN[0] + J.sF[0]) / 2, Wd = (p, k) => [cxm + (p[0] - cxm) * k, p[1]], SW = FR ? 1.15 : who.female ? 1.22 : who.buff ? 1.8 : 1.5, HW = FR ? 1.0 : who.female ? 1.32 : 1.1;
    const shN = Wd(J.sN, SW * 0.86), shF = Wd(J.sF, SW * 0.86);
    const sleeves = O === 'futbol';
    const arm = (s, e, w, far) => { const sk = far ? 'skinF' : 'skin'; const n = perp(s, e), mid = lerp2(s, e, 0.42);
      parts.push([sk, multi(cap(s, e, ua * 1.3, ua * 0.82), ell([mid[0] + n[0] * ua * 0.22, mid[1] + n[1] * ua * 0.22], ua * 0.42, ua * 0.32, -Math.atan2(e[1] - s[1], e[0] - s[0])), cap(e, w, fa * 1.12, fa * 0.7), ell(w, 0.034 * L, 0.03 * L))]);
      if (sleeves) parts.push(['top', cap(s, lerp2(s, e, 0.55), ua * 1.45, ua * 1.25)]);
      if ((O === 'guanche' || O === 'bikini') && !far) parts.push(['cord', cap(lerp2(s, e, 0.3), lerp2(s, e, 0.36), ua * 1.12, ua * 1.08)]); // the arm band of the statue
      if ((O === 'guanche' || O === 'bikini') && !far) parts.push(['cord', cap(lerp2(w, e, 0.1), lerp2(w, e, 0.18), fa * 0.9, fa * 0.92)]); };
    const leg = (h, k, a, t, far) => { const sk = far ? 'skinF' : 'skin', so = far ? 'sockF' : 'sock', sho = far ? 'shoeF' : 'shoe', sl = far ? 'soleF' : 'sole';
      const calf = lerp2(k, a, 0.38); parts.push([sk, multi(cap(h, k, th * 1.05, sh * 1.0), cap(k, calf, sh * 0.95, sh * 1.18), cap(calf, a, sh * 1.18, sh * 0.62))]);
      const heel = lerp2(a, t, -0.18);
      if (O === 'bikini') { const fb = far ? 'cloakF' : 'cloak'; parts.push([fb, multi(cap(heel, t, 0.056 * L, 0.044 * L), cap(lerp2(a, k, 0.0), heel, 0.06 * L, 0.06 * L), cap(a, lerp2(a, k, 0.45), sh * 1.2, sh * 1.35))]); if (!far) parts.push(['cord', cap(lerp2(a, k, 0.42), lerp2(a, k, 0.46), sh * 1.36, sh * 1.38)]); return; } // fur boots
      if (O === 'guanche' || O === 'mirladora') { parts.push([sk, multi(cap(heel, t, 0.05 * L, 0.04 * L), cap(lerp2(a, k, 0.05), heel, 0.045 * L, 0.045 * L))]); if (!far) parts.push(['cord', cap(lerp2(a, k, 0.1), lerp2(a, k, 0.14), sh * 0.7, sh * 0.72)]); return; }
      const sockTop = O === 'futbol' ? 0.86 : 0.28; parts.push([so, cap(lerp2(a, k, 0.02), lerp2(a, k, sockTop), sh * 0.8, sh * (O === 'futbol' ? 1.02 : 0.86))]);
      if (O === 'futbol' && !far) parts.push(['trim', cap(lerp2(a, k, 0.78), lerp2(a, k, 0.82), sh * 1.02, sh * 1.04)]);
      parts.push([sho, multi(cap(heel, t, 0.06 * L, 0.046 * L), cap(lerp2(a, k, 0.04), heel, 0.055 * L, 0.055 * L))]);
      const n = perp(heel, t); const dn = (p, k2) => [p[0] - n[0] * k2, p[1] - n[1] * k2]; parts.push([sl, line(dn(heel, 0.024 * L), dn(t, 0.02 * L), 0.014 * L)]); };
    // long hair behind the neck (guanches)
    const hd = J.hd, lk = pose.look || 0;
    if (who.hs === 'mane') parts.push(['hairL', poly([[hd[0] - r * 1.0, hd[1] + r * 0.45], [hd[0] + r * 0.2, hd[1] + r * 0.55], [hd[0] + r * 0.1, hd[1] - r * 1.4], [J.hF[0] - 0.01, J.hF[1] + 0.03], [J.hF[0] - 0.08, J.hF[1] - 0.02], [J.hF[0] - 0.16, J.hF[1] + 0.04], [hd[0] - r * 1.9, hd[1] - r * 2.4], [hd[0] - r * 1.5, hd[1] - r * 1.2]])]); // loose and wavy, to the waist
    if (who.hs === 'long') parts.push(['hairL', poly([[hd[0] - r * 0.95, hd[1] + r * 0.2], [hd[0] + r * 0.1, hd[1] + r * 0.4], [hd[0] + r * 0.05, hd[1] - r * 1.9], [hd[0] - r * 1.15, hd[1] - r * 2.1]])]);
    // the cloak (tamarco) hangs from the far shoulder, behind the body
    if (who.cloak && O === 'guanche') parts.push(['cloakF', poly([Wd(J.sF, SW), [J.nk[0] + 0.01, J.nk[1] - 0.02], [J.hF[0] - 0.02, J.hF[1] - 0.12], lerp2(J.hF, J.kF, 0.7), [lerp2(J.hF, J.kF, 0.7)[0] - 0.12, lerp2(J.hF, J.kF, 0.7)[1] + 0.05], [Wd(J.sF, SW)[0] - 0.08, J.sF[1] - 0.2]])]);
    arm(shF, J.eF, J.wF, true);
    leg(J.hF, J.kF, J.aF, J.tF, true);
    if (pose.ball && pose.ball[0] < J.hF[0]) parts.push(['ball', ell(pose.ball, 0.055, 0.055)]);
    // torso: a V; a jersey (basket: tank top; football: with a collar) or bare chest (guanches) or the tamarco dress
    const TP = [[J.nk[0] - 0.035, J.nk[1] - 0.005], [J.nk[0] + 0.035, J.nk[1] - 0.005], Wd([J.sN[0] + 0.01, J.sN[1] - 0.005], SW), Wd([J.sN[0] - 0.005, J.sN[1] - 0.1], SW * 0.92), Wd([J.hN[0] + 0.035, J.hN[1] + 0.02], HW), Wd([J.hF[0] - 0.035, J.hF[1] + 0.02], HW), Wd([J.sF[0] + 0.005, J.sF[1] - 0.1], SW * 0.92), Wd([J.sF[0] - 0.01, J.sF[1] - 0.005], SW)];
    parts.push(['skin', multi(cap(J.nk, [hd[0] - 0.01, hd[1] - 0.03], 0.058, 0.05), ell(shN, ua * 0.78, ua * 0.66), ell(shF, ua * 0.78, ua * 0.66))]);
    if (O === 'bikini') { // v3 (Jonay): a narrow waist and a flat belly, the hips below
      const wy = (J.sN[1] - 0.1 + J.hN[1]) / 2 + 0.02, wN = Wd([J.hN[0] + 0.02, wy], 0.92), wF = Wd([J.hF[0] - 0.02, wy], 0.92);
      parts.push(['skin', poly([TP[0], TP[1], TP[2], TP[3], wN, Wd([J.hN[0] + 0.045, J.hN[1] + 0.02], 1.25), Wd([J.hF[0] - 0.045, J.hF[1] + 0.02], 1.25), wF, TP[6], TP[7]])]); }
    else if (O === 'guanche') parts.push(['skin', poly(TP)]);
    else if (O === 'mirladora') parts.push(['cloak', poly([TP[0], TP[1], TP[2], TP[3], lerp2(J.hN, J.kN, 0.85), [lerp2(J.hF, J.kF, 0.85)[0] - 0.04, lerp2(J.hF, J.kF, 0.85)[1]], TP[6], TP[7]])]);
    else parts.push(['top', poly(sleeves ? TP.map((p, i) => (i === 3 || i === 6 ? [p[0], p[1] + 0.06] : p)) : TP)]);
    if (O === 'basket') parts.push(['trim', multi(line([J.nk[0] - 0.035, J.nk[1] - 0.005], [J.nk[0] + 0.004, J.nk[1] - 0.065], 0.014), line([J.nk[0] + 0.004, J.nk[1] - 0.065], [J.nk[0] + 0.035, J.nk[1] - 0.005], 0.014), line(TP[2], TP[3], 0.014), line(TP[7], TP[6], 0.012))]);
    if (O === 'futbol') parts.push(['trim', multi(line([J.nk[0] - 0.035, J.nk[1] - 0.005], [J.nk[0] + 0.035, J.nk[1] - 0.005], 0.02), line(TP[4], TP[5], 0.012))]);
    // bottom: baggy basket shorts, short football shorts, the guanche loincloth with its front flap
    if (O === 'basket') { const hemN = lerp2(J.hN, J.kN, 0.92), hemF = lerp2(J.hF, J.kF, 0.92), tw = th * 1.5; parts.push(['bottom', multi(cap(J.hF, hemF, tw, tw * 0.95), cap(J.hN, hemN, tw, tw * 0.95), line([J.hF[0] - 0.02, J.hF[1] + 0.03], [J.hN[0] + 0.02, J.hN[1] + 0.03], 0.07))]); }
    else if (O === 'futbol') { const hemN = lerp2(J.hN, J.kN, 0.5), hemF = lerp2(J.hF, J.kF, 0.5), tw = th * 1.35; parts.push(['bottom', multi(cap(J.hF, hemF, tw, tw * 0.95), cap(J.hN, hemN, tw, tw * 0.95), line([J.hF[0] - 0.02, J.hF[1] + 0.03], [J.hN[0] + 0.02, J.hN[1] + 0.03], 0.07))]); }
    else if (O === 'guanche') { const fl = lerp2(J.hN, J.kN, 0.5); parts.push(['bottom', multi(cap(J.hF, lerp2(J.hF, J.kF, 0.18), th * 1.25, th * 1.15), cap(J.hN, lerp2(J.hN, J.kN, 0.18), th * 1.25, th * 1.15), line([J.hF[0] - 0.03, J.hF[1] + 0.02], [J.hN[0] + 0.03, J.hN[1] + 0.02], 0.08), poly([[J.hN[0] + 0.04, J.hN[1] - 0.01], [J.hN[0] - 0.05, J.hN[1] - 0.01], [fl[0] - 0.02, fl[1]], [fl[0] + 0.05, fl[1] + 0.02]]))]);
      parts.push(['cord', line([J.hF[0] - 0.04, J.hF[1] + 0.05], [J.hN[0] + 0.04, J.hN[1] + 0.05], 0.012)]); }
    if (O === 'bikini') { const yT = J.nk[1] - 0.075, yB = J.nk[1] - 0.13, xa = Wd([J.sF[0], 0], SW * 0.82)[0], xb = Wd([J.sN[0], 0], SW * 0.95)[0];
      parts.push(['cloak', multi(poly([[xa, yT], [xb, yT], [xb - 0.01, yB], [xa + 0.01, yB]]), ell([xb - 0.04, (yT + yB) / 2 - 0.012], 0.062, 0.055), ell([xb - 0.1, (yT + yB) / 2 - 0.006], 0.05, 0.05), line([xa + 0.03, yT], [J.nk[0] - 0.02, J.nk[1] - 0.01], 0.012), line([xb - 0.03, yT], [J.nk[0] + 0.02, J.nk[1] - 0.01], 0.01))]); // the fur top
      const fl = lerp2(J.hN, J.kN, 0.28); parts.push(['cloak', multi(cap(J.hF, lerp2(J.hF, J.kF, 0.1), th * 1.2, th * 1.1), cap(J.hN, lerp2(J.hN, J.kN, 0.1), th * 1.2, th * 1.1), line([J.hF[0] - 0.03, J.hF[1] + 0.02], [J.hN[0] + 0.03, J.hN[1] + 0.02], 0.06), poly([[J.hN[0] + 0.03, J.hN[1]], [J.hN[0] - 0.04, J.hN[1]], [fl[0], fl[1]]]))]);
      parts.push(['cord', line([J.hF[0] - 0.04, J.hF[1] + 0.045], [J.hN[0] + 0.04, J.hN[1] + 0.045], 0.01)]); }
    leg(J.hN, J.kN, J.aN, J.tN, false);
    // the strap of the tamarco across the chest (the statue)
    if (who.cloak && O === 'guanche') parts.push(['cloak', multi(line(Wd(J.sF, SW * 0.9), [J.hN[0] + 0.03, J.hN[1] + 0.08], 0.03), ell(Wd(J.sF, SW * 0.95), 0.05, 0.035))]);
    // head: oval skull, jaw forward (or a front face), hair, ear, nose
    const front = FR === 1, backv = FR === -1;
    if (FR) parts.push(['skin', multi(ell(hd, r * 0.92, r * 1.02), ell([hd[0], hd[1] - r * 0.45], r * 0.66, r * 0.5))]);
    else parts.push(['skin', multi(ell(hd, r * 0.9, r * 1.04, -lk * 0.4), ell([hd[0] + r * 0.32, hd[1] - r * 0.5 + lk * r * 0.2], r * 0.55, r * 0.44, -lk * 0.4))]);
    parts.push(['hair', (g) => { const cx = X(hd), cy = Y(hd), R = r * u; g.save(); g.translate(cx, cy); g.rotate(FR ? 0 : lk * 0.6);
      g.beginPath(); if (backv) g.rect(-2 * R, -2 * R, 4 * R, 2.9 * R); else if (front) g.rect(-2 * R, -2 * R, 4 * R, 1.55 * R); else { g.moveTo(-2 * R, -2 * R); g.lineTo(2 * R, -2 * R); g.lineTo(2 * R, -0.46 * R); g.lineTo(0.12 * R, -0.46 * R); g.lineTo(-0.5 * R, 0.12 * R); g.lineTo(-2 * R, 0.12 * R); g.closePath(); } g.clip();
      if (who.hs === 'afro') { g.beginPath(); g.arc(0, -0.42 * R, 1.08 * R, 0, 7); g.fill(); }
      else if (who.hs === 'mane') { g.beginPath(); g.arc(-0.05 * R, -0.12 * R, 1.12 * R, 0, 7); g.fill(); g.beginPath(); g.arc(-0.55 * R, 0.1 * R, 0.75 * R, 0, 7); g.fill(); }
      else { g.beginPath(); g.arc(FR ? 0 : -0.03 * R, -0.1 * R, (who.hs === 'long' ? 1.08 : 1.03) * R, 0, 7); g.fill(); if (!FR) { g.beginPath(); g.arc(-0.45 * R, 0, 0.62 * R, 0, 7); g.fill(); } }
      if (front && who.hs === 'long') { g.restore(); g.save(); g.translate(cx, cy); g.fillRect(-1.0 * R, -0.5 * R, 0.25 * R, 1.6 * R); g.fillRect(0.75 * R, -0.5 * R, 0.25 * R, 1.6 * R); }
      g.restore(); }]);
    if (!FR) parts.push(['skin', ell([hd[0] + r * 0.9, hd[1] - r * 0.14 + lk * r * 0.3], r * 0.16, r * 0.2)]); // the nose sticks out of the profile
    if (who.beard === 'long') parts.push(['beard', FR ? ell([hd[0], hd[1] - r * 0.9], r * 0.5, r * 0.45) : ell([hd[0] + r * 0.36, hd[1] - r * 0.92 + lk * r * 0.2], r * 0.36, r * 0.42)]);
    if (!FR) parts.push(['ear', ell([hd[0] - r * 0.12, hd[1] - r * 0.08], r * 0.2, r * 0.27)]);
    if (who.hs === 'mane') parts.push(['hair', poly([[hd[0] - r * 0.1, hd[1] - r * 0.3], [hd[0] + r * 0.35, hd[1] - r * 0.6], [shN[0] + 0.01, shN[1] - 0.09], [shN[0] - 0.05, shN[1] - 0.11]])]); // a lock over the shoulder, hair loose
    // the near arm, over the body, and what it holds
    arm(shN, J.eN, J.wN, false);
    if (who.tool === 'banot' && pose.tool) parts.push(['wood', multi(line(pose.tool[0], pose.tool[1], 0.022), (g) => { const t = pose.tool[1], d = [t[0] - pose.tool[0][0], t[1] - pose.tool[0][1]], l = Math.hypot(d[0], d[1]); line(t, [t[0] - d[0] / l * 0.08, t[1] - d[1] / l * 0.08], 0.03)(g); })]);
    if (who.tool === 'garrote' && pose.tool) { const a = J.wN, d = [pose.tool[1][0] - pose.tool[0][0], pose.tool[1][1] - pose.tool[0][1]], l = Math.hypot(d[0], d[1]); const b = [a[0] + d[0] / l * 0.36, a[1] + d[1] / l * 0.36]; parts.push(['wood', multi(cap(lerp2(a, b, -0.15), b, 0.03, 0.075), ell(b, 0.045, 0.045))]); }
    if (who.tool === 'vara' && pose.tool) parts.push(['wood', line(pose.tool[0], pose.tool[1], 0.018)]);
    if (who.tool) parts.push(['skin', ell(J.wN, 0.036 * L, 0.032 * L)]); // the fist over the handle
    if (pose.orb && (who.outfit === 'mirladora' || who.outfit === 'bikini')) parts.push(['orb', ell(pose.orb, 0.06, 0.06)]);
    if (who.tool === 'baston' && pose.tool) parts.push(['wood', line(pose.tool[0], pose.tool[1], 0.016)], ['orb', ell(pose.tool[1], 0.045, 0.045)]); // v0.90: in the game she fights with the bastón
    if (pose.ball && pose.ball[0] >= J.hF[0]) parts.push(['ball', ell(pose.ball, 0.055, 0.055)]);
    // ---- masks → id buffer
    const N = W * Hh, id = new Int16Array(N).fill(-1); const g = maskCtx(W, Hh);
    parts.forEach(([m, f], depth) => { g.clearRect(0, 0, W, Hh); g.fillStyle = g.strokeStyle = '#fff'; f(g); const d = g.getImageData(0, 0, W, Hh).data; for (let i = 0; i < N; i++) if (d[i * 4 + 3] > 120) id[i] = depth; });
    const matOf = parts.map((p) => p[0]); const grp = (m) => m.replace(/F$/, '').replace(/^(ear)$/, 'skin').replace(/^hairL$/, 'hair');
    const o = out.getContext('2d', { willReadFrequently: true }); const img = o.getImageData(0, 0, W, Hh), px = img.data;
    const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= Hh ? -1 : id[y * W + x]);
    const put = (i, c) => { px[i * 4] = c[0]; px[i * 4 + 1] = c[1]; px[i * 4 + 2] = c[2]; px[i * 4 + 3] = 255; };
    for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { const i = y * W + x, p = id[i]; if (p < 0) continue; const m = matOf[p], tn = T[m];
      const back = (q) => q < 0 || (q < p && grp(matOf[q]) !== grp(m));
      let s2 = 0; for (let k = 1; k <= st.sw; k++) if (back(at(x + k, y)) || back(at(x, y + k)) || back(at(x + k, y + k))) s2 = Math.max(s2, k === 1 ? 2 : 1);
      let occ = false; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const q = at(x + dx, y + dy); if (q > p && grp(matOf[q]) !== grp(m)) occ = true; }
      const hl = !s2 && (back(at(x - 1, y)) || back(at(x, y - 1)));
      put(i, m === 'orb' ? (s2 ? [60, 180, 255] : [210, 250, 255]) : s2 === 2 ? tn.d : s2 || occ ? tn.s : hl ? tn.h : tn.b); }
    for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (id[i] >= 0) continue; let q = -1;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const t = at(x + dx, y + dy); if (t >= 0) { q = t; break; } }
      if (q >= 0) put(i, matOf[q] === 'orb' ? [120, 220, 255] : mix(T[matOf[q]].d, [16, 8, 20], 0.35)); }
    // ---- details
    const idx = (m) => { const s = new Set(); matOf.forEach((mm, k) => { if (mm === m) s.add(k); }); return s; };
    const dot = (x, y, c, only) => { x = Math.round(x); y = Math.round(y); if (x < 0 || y < 0 || x >= W || y >= Hh) return; const q = id[y * W + x]; if (only && !only.has(q)) return; put(y * W + x, c); };
    const HEADP = matOf.lastIndexOf('skin', matOf.indexOf('hair')), HEAD = new Set([HEADP]), R = Math.max(2, r * u), hx = X(hd), hy = Y(hd), big = R >= 8.5;
    const ink = [22, 12, 14], pupil = [46, 26, 18], wht = BR ? T.skin.h : [236, 230, 220], brow = mix(T.hair.b, [0, 0, 0], 0.3), lip = mix(T.skin.d, [120, 40, 40], BR ? 0 : 0.35);
    // hair texture (strands)
    for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { const q = id[y * W + x]; if (q < 0) continue; const m = matOf[q]; if (m !== 'hair' && m !== 'hairL' && m !== 'beard') continue; const hs = (x * 73856093 ^ y * 19349663) >>> 0; if ((x + (y >> 1)) % 3 === 0 && (who.hs === 'long' || who.hs === 'mane')) put(y * W + x, T.hair.d); else if (hs % 9 === 0) put(y * W + x, T.hair.d); else if (hs % 23 === 0) put(y * W + x, T.hair.h); }
    if (!FR) { // profile face
      const lkr = lk * R * 0.35, ex = Math.round(hx + R * 0.44), ey = Math.round(hy - R * 0.02 + lkr);
      dot(ex - 1, ey, T.skin.s, HEAD); dot(ex, ey, wht, HEAD); dot(ex + 1, ey, pupil, HEAD); if (big) { dot(ex + 1, ey + 1, pupil, HEAD); dot(ex, ey + 1, wht, HEAD); }
      for (let k = -1; k <= 1; k++) dot(ex + k, ey - 1, ink, HEAD); dot(ex, ey + (big ? 2 : 1), T.skin.s, HEAD); dot(ex + 1, ey + (big ? 2 : 1), T.skin.s, HEAD);
      for (let k = -1; k <= 1; k++) dot(ex + k, ey - 3, brow, HEAD); dot(ex + 2, ey - 2, brow, HEAD); if (big) for (let k = -1; k <= 1; k++) dot(ex + k, ey - 4, brow, HEAD); dot(ex, ey - 2, T.skin.h, HEAD);
      dot(ex - 1, ey + (big ? 3 : 2), T.skin.h, HEAD); dot(ex, ey + (big ? 3 : 2), T.skin.h, HEAD); dot(ex - 2, ey + (big ? 4 : 3), T.skin.s, HEAD); dot(ex - 1, ey + (big ? 5 : 4), T.skin.s, HEAD);
      const nx = Math.round(hx + R * 0.86), ny = Math.round(hy + R * 0.28 + lkr); dot(nx - 1, ny, T.skin.d, HEAD); dot(nx, ny + 1, T.skin.s, HEAD); dot(nx + 1, ny - 2, T.skin.h, HEAD);
      const my = Math.round(hy + R * 0.56 + lkr), mx = Math.round(hx + R * 0.58);
      // beard on the jaw (the bearded ones), stubble on the others; the long beard part hangs below
      for (let y = Math.round(hy - R * 0.4); y <= Math.round(hy + R * 1.1); y++) for (let x = Math.round(hx - R * 0.6); x <= Math.round(hx + R * 1.1); x++) { if (at(x, y) !== HEADP) continue; const ux = (x - hx) / R, uy = (y - hy - lkr) / R;
        if (who.beard && ((uy > 0.38 && ux > -0.28) || (uy > 0.1 && ux > -0.3 && ux < 0.12)) && !((y === my || y === my + 1) && ux > 0.42)) { const hs = (x * 73856093 ^ y * 19349663) >>> 0; const bc = mix(T.hair.b, T.skin.s, 0.25); put(y * W + x, hs % 6 === 0 ? mix(bc, T.skin.b, 0.35) : hs % 5 === 0 ? T.hair.d : bc); }
        else if (!who.beard && !who.female && uy > 0.66 && ux > -0.2 && ux < 0.55) put(y * W + x, mix(T.skin.b, T.hair.b, 0.14)); }
      for (let k = 0; k < (big ? 3 : 2); k++) dot(mx + k, my, lip, HEAD); dot(mx - 1, my, T.skin.s, HEAD); for (let k = 0; k < 2; k++) dot(mx + k, my + 1, T.skin.h, HEAD);
      if (who.female) { dot(ex + 1, ey - 1, ink, HEAD); dot(ex + 2, ey - 1, ink, HEAD); dot(mx, my, [170, 60, 70], HEAD); dot(mx + 1, my, [170, 60, 70], HEAD); } // lashes and lips
      const EAR = idx('ear'), ax = Math.round(hx - R * 0.12), ay = Math.round(hy - R * 0.08 + lkr); dot(ax, ay, T.skin.d, EAR); dot(ax, ay + 1, T.skin.d, EAR); dot(ax - 1, ay - 1, T.skin.h, EAR);
      if (who.headband) for (let x = Math.round(hx - R * 1.0); x <= Math.round(hx + R * 0.9); x++) { const y = Math.round(hy - R * 0.5 + (x - hx) * 0.05 + lkr); for (const yy of big ? [y, y + 1] : [y]) { const q = at(x, yy); if (q === HEADP || matOf[q] === 'hair') put(yy * W + x, (x % 4) ? T.cord.b : T.cord.d); } } }
    else if (front) { // front face: two eyes, brows, nose, mouth
      const ey = Math.round(hy + R * 0.02); for (const sx of [-1, 1]) { const ex = Math.round(hx + sx * R * 0.34); dot(ex, ey, wht, HEAD); dot(ex + (sx > 0 ? 0 : 1), ey, pupil, HEAD); dot(ex - 1, ey - 1, ink, HEAD); dot(ex, ey - 1, ink, HEAD); dot(ex - 1, ey - 3, brow, HEAD); dot(ex, ey - 3, brow, HEAD); dot(ex + 1, ey - 3, brow, HEAD); }
      dot(hx, ey + Math.round(R * 0.3), T.skin.d, HEAD); for (let k = -1; k <= 1; k++) dot(hx + k, Math.round(hy + R * 0.58), lip, HEAD); }
    // the necklace of the statue (beads of shell and bone)
    if (who.necklace) for (let k = 0; k <= 10; k++) { const t = k / 10, a = Math.PI * (0.15 + t * 0.7); const cx = X(J.nk) + (FR ? 0 : 1), cy = Y(J.nk) + R * 0.35; dot(cx + Math.cos(a) * R * 0.85, cy + Math.sin(a) * R * 0.75, k % 2 ? [236, 224, 200] : [140, 60, 40]); }
    // muscles on the bare chest: the pecs and the abs
    if (O === 'guanche') { const SK = idx('skin'); const cx = X([(J.nk[0] + (J.hN[0] + J.hF[0]) / 2) / 2 + (FR ? 0 : 0.02), 0]), y0 = Y([0, J.nk[1] - 0.1]), y1 = Y([0, J.hN[1] + 0.05]);
      for (let k = -3; k <= 3; k++) dot(cx + k, y0 + Math.abs(k) * 0.3, T.skin.s, SK); if (who.buff) { for (let k = -4; k <= 4; k++) { dot(cx + k, y0 + 1 + Math.abs(k) * 0.4, T.skin.d, SK); dot(cx + k, y0 - 2, T.skin.h, SK); } } for (let y = y0 + 3; y < y1 - 1; y += 3) { dot(cx, y, T.skin.s, SK); dot(cx - 2, y + 1, T.skin.s, SK); dot(cx + 2, y + 1, T.skin.s, SK); } }
    // the number (basket: chest; football: back, or chest small)
    if (who.num && (O === 'basket' || O === 'futbol')) { const DG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001111' };
      const TOPS = idx('top'), sc = H >= 120 && (O === 'basket' || backv) ? 2 : 1, cw = 4 * sc; const cx0 = Math.round(X([(J.nk[0] + (J.hN[0] + J.hF[0]) / 2) / 2 + (FR ? 0 : 0.01), 0]) - (who.num.length * cw) / 2 + 1), cy0 = Math.round(Y([0, J.nk[1] - (backv ? 0.1 : 0.13)]));
      const on = new Set(); [...who.num].forEach((ch, k) => { const pat = DG[ch]; for (let b = 0; b < 15; b++) if (pat[b] === '1') for (let a = 0; a < sc; a++) for (let c = 0; c < sc; c++) on.add((cx0 + k * cw + (b % 3) * sc + a) + ',' + (cy0 + ((b / 3) | 0) * sc + c)); });
      if (O === 'futbol' && !backv) { /* small number on the chest only on the front view */ }
      for (const key of on) { const [x, y] = key.split(',').map(Number); for (const [dx, dy] of [[1, 0], [0, 1], [1, 1]]) if (!on.has((x + dx) + ',' + (y + dy))) dot(x + dx, y + dy, T.top.d, TOPS); }
      for (const key of on) { const [x, y] = key.split(',').map(Number); dot(x, y, T.trim.h, TOPS); } }
    if (pose.ball && O === 'futbol') { const BALL = idx('ball'), bx = X(pose.ball), by = Y(pose.ball), br = 0.055 * u; for (const [dx, dy] of [[0, 0], [-0.4, -0.4], [0.45, 0.2], [-0.2, 0.5]]) { dot(bx + dx * br, by + dy * br, [30, 30, 36], BALL); dot(bx + dx * br + 1, by + dy * br, [30, 30, 36], BALL); } }
    o.putImageData(img, 0, 0);
    return { hx, hy, R };
  }
  // ---------- the cast, as approved (G1, 26-oct)
  const BENCOMO = { outfit: 'guanche', skin: '#9a6a44', hair: '#2a1c14', hs: 'long', beard: 'long', headband: true, necklace: true, cloak: '#7a4a26', bottom: '#a07850', cord: '#d8c8a0', tool: 'banot' };
  const WHO = { mencey: { ...BENCOMO, tool: 'garrote', skin: '#8a5a38', hair: '#1e1610', cloak: '#5a3a20', buff: true },
    pastor: { ...BENCOMO, slim: true, skin: '#a8724a', hair: '#3a2416', beard: 'long', tool: 'vara', cloak: '#8a6a44', bottom: '#9a7a52' },
    mirla: { outfit: 'bikini', female: true, slim: true, skin: '#c08a5e', hair: '#7a4222', hs: 'mane', headband: true, necklace: true, cloak: '#a0703c', cord: '#e8d8b0', tool: 'baston' } };
  const ST = { H: 100, head: 0.076, sw: 2 }, U = 28.6;          // art px per body unit; game units per body unit
  const TOOL = { garrote: [-2, 11], vara: [-7, 17], baston: [-4, 9.5] };
  // the game's pose (y down, feet at 0) → the drawer's joints (y up, body = 1)
  function joints(P, tool) { const J = (p) => [p[0] / U, -p[1] / U], sh = [P.h[0] + (P.n[0] - P.h[0]) * 0.88, P.h[1] + (P.n[1] - P.h[1]) * 0.88], S = J(sh);
    const ank = (f) => { const a = J(f); return [a[0], a[1] + 0.035]; }, toe = (a) => [a[0] + 0.085, a[1] - 0.025], aN = ank(P.ff), aF = ank(P.fb), H = J(P.h);
    const o = { hd: J(P.hd), nk: J(P.n), sN: [S[0] + 0.04, S[1]], eN: J(P.ef), wN: J(P.hf), sF: [S[0] - 0.05, S[1]], eF: J(P.eb), wF: J(P.hb),
      hN: [H[0] + 0.035, H[1]], kN: J(P.kf), aN, tN: toe(aN), hF: [H[0] - 0.035, H[1]], kF: J(P.kb), aF, tF: toe(aF) };
    if (tool && TOOL[tool]) { const w = o.wN, d = [Math.cos(P.wa), -Math.sin(P.wa)], [a, b] = TOOL[tool]; o.tool = [[w[0] + (d[0] * a) / U, w[1] + (d[1] * a) / U], [w[0] + (d[0] * b) / U, w[1] + (d[1] * b) / U]]; }
    return o; }
  const rot = (p, c, a) => { const x = p[0] - c[0], y = p[1] - c[1], cs = Math.cos(a), sn = Math.sin(a); return [c[0] + x * cs - y * sn, c[1] + x * sn + y * cs]; };
  const CACHE = new Map(); let made = 0;
  // one sprite for a hero in a pose: { c, ax, ay, ang } (ax, ay: the feet; ang: how much to turn it when drawn)
  function sprite(id, P) { const who = WHO[id]; if (!who) return null;
    const key = id + ':' + Object.keys(P).map((k) => (k === 'wa' ? Math.round(P.wa * 8) : Math.round(P[k][0] * 2) + ',' + Math.round(P[k][1] * 2))).join(';');
    let s = CACHE.get(key); if (s) return s;
    if (CACHE.size > 600) CACHE.clear();
    // how much the body leans (hip → neck); lying down or getting up: drawn upright and turned
    const ang = Math.atan2(P.n[0] - P.h[0], -(P.n[1] - P.h[1])); let Q = P;
    if (Math.abs(ang) > 0.7) { Q = {}; for (const k in P) Q[k] = k === 'wa' ? P.wa - ang : rot(P[k], P.h, -ang); const m = Math.max(Q.ff[1], Q.fb[1]); for (const k in Q) if (k !== 'wa') Q[k] = [Q[k][0], Q[k][1] - m]; } // the lowest foot back on the floor
    const W = Math.round(ST.H * 2.3), Hh = Math.round(ST.H * 1.95), ax = Math.round(ST.H * 1.15), ay = Math.round(ST.H * 1.62);
    const c = document.createElement('canvas'); c.width = W; c.height = Hh; render(c, ax, ay, ST, joints(Q, who.tool), who); made++;
    s = { c, ax, ay, ang: Q === P ? 0 : ang, hipP: P.h, hipQ: Q.h }; CACHE.set(key, s); return s; }
  // draw it where the game draws its puppet: feet at (x, y), «s» = the hero's size, in the game's units
  function draw(c, x, y, face, P, id, s) { const sp = sprite(id, P); if (!sp) return false; const k = (U * s) / ST.H;
    c.save(); c.translate(x, y); c.scale(face, 1); if (sp.ang) { c.translate(sp.hipP[0] * s, sp.hipP[1] * s); c.rotate(sp.ang); c.translate(-sp.hipQ[0] * s, -sp.hipQ[1] * s); }
    c.imageSmoothingEnabled = false; c.drawImage(sp.c, -sp.ax * k, -sp.ay * k, sp.c.width * k, sp.c.height * k); c.restore(); return true; }
  return { draw, sprite, joints, WHO, made: () => made };
})();
