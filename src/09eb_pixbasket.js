// ---------- v0.90 (Jonay eligió el «A++ semicabezón 120», docs/propuestas/sprites_basket.html): los jugadores del basket
// con el dibujante de la propuesta (esqueleto + piezas + sombreado por píxel), alimentado con las poses de ángulos de la
// pelea (FIGHT2D.POSES, los EXTRA y los mates del 09f). Cada pose se pasa a articulaciones con la misma cinemática que
// drawFigure (09d) y el sprite guarda dónde cae el punto (36, 80) de la pelea, así que lo de alrededor (la mano del
// balón en los mates, la sombra, las flechas) sigue igual.
const PIXBASKET = (() => {
  const { hex, mix, lerp2, perp } = PIXKIT; /* v1.1.7: the shared pieces (09e_pixkit.js) */
  // ---------- one player on a low-resolution canvas ----------
  // each part is drawn into its own mask (thresholded: no blurred edges), stacked by depth into an id buffer, then shaded
  // per pixel: light from the top left, shadow on the bottom-right edge of each part, occlusion where a part in front
  // touches it; then the outline and the small details. Details on a part (the number on the jersey, the face) only paint
  // the pixels that part still shows, so an arm in front covers the number.
  function renderPlayer(out, ox, oy, st, pose, kit, pl) {
    const H = st.H,
      W = out.width,
      Hh = out.height,
      u = H,
      C = !!st.chibi,
      BK = C ? 0.58 : st.bodyK || 1,
      air = (pose.air || 0) * BK;
    let { X, Y, J, L, D } = renderPlayerPart1(pose, st, BK, ox, u, oy, air, C); // the dunk: the ball stays in the hand, above the big head
    const { T, ua, fa, th, sh, r } = renderPlayerPart2(pl, kit, L, st);
    const { cap, ell, line, multi, parts, arm } = renderPlayerPart3(X, Y, u, ua, D, fa, L);
    const { leg, Wd, SW, HW, shN, shF } = renderPlayerPart4(J, D, parts, multi, cap, sh, L, line);
    arm(shF, J.eF, J.wF, true);
    const { TP } = renderPlayerPart5(leg, J, pose, parts, ell, Wd, SW, HW);
    parts.push([
      'skin',
      multi(cap(J.nk, [J.hd[0] - 0.01, J.hd[1] - 0.03], 0.058, 0.05), ell(shN, ua * 0.78, ua * 0.66), ell(shF, ua * 0.78, ua * 0.66))
    ]); // neck and deltoids
    renderPlayerPart6(parts, multi, line, J, TP, D, X, Y);
    renderPlayerPart7(J, th, D, parts, multi, cap, line, leg);
    // head: oval skull, jaw forward, hair, ear
    const hd = J.hd,
      lk = pose.look || 0;
    if (C)
      parts.push(['skin', multi(ell(hd, r * 0.94, r * 0.98, -lk * 0.3), ell([hd[0] + r * 0.12, hd[1] - r * 0.42], r * 0.74, r * 0.52, -lk * 0.3))]);
    else
      parts.push([
        'skin',
        multi(ell(hd, r * 0.9, r * 1.04, -lk * 0.4), D && ell([hd[0] + r * 0.32, hd[1] - r * 0.5 + lk * r * 0.2], r * 0.55, r * 0.44, -lk * 0.4))
      ]);
    parts.push([
      'hair',
      (g) => {
        const cx = X(hd),
          cy = Y(hd),
          R = r * u;
        g.save();
        g.translate(cx, cy);
        g.rotate(lk * (C ? 0.25 : 0.6));
        if (C || st.face === 'real') {
          // the hair stays above the brows (the face must be seen) and covers the back of the head
          g.beginPath();
          if (C) {
            g.rect(-2 * R, -2 * R, 4 * R, 1.72 * R);
            g.rect(-2 * R, -0.3 * R, 1.5 * R, 0.62 * R);
          } else {
            /* a hairline that slopes down behind the ear */ g.moveTo(-2 * R, -2 * R);
            g.lineTo(2 * R, -2 * R);
            g.lineTo(2 * R, -0.46 * R);
            g.lineTo(0.12 * R, -0.46 * R);
            g.lineTo(-0.5 * R, 0.12 * R);
            g.lineTo(-2 * R, 0.12 * R);
            g.closePath();
          }
          g.clip();
          if (pl.hs === 'afro') {
            g.beginPath();
            g.arc(-0.05 * R, -0.42 * R, 1.08 * R, 0, 7);
            g.fill();
            g.beginPath();
            g.arc(-0.4 * R, 0, 0.75 * R, 0, 7);
            g.fill();
          } else if (pl.hs === 'spiky') {
            g.beginPath();
            g.moveTo(-1.0 * R, 0.3 * R);
            for (let i = 0; i <= 8; i++) {
              const a = Math.PI * (0.95 + i * 0.13);
              const k = i % 2 ? 1.0 : 1.38;
              g.lineTo(Math.cos(a) * R * k, Math.sin(a) * R * k - 0.1 * R);
            }
            g.lineTo(0.98 * R, -0.28 * R);
            g.lineTo(-0.5 * R, -0.28 * R);
            g.lineTo(-0.55 * R, 0.3 * R);
            g.closePath();
            g.fill();
          } else {
            const k = pl.hs === 'fade' ? 1.0 : 1.04;
            g.beginPath();
            g.arc(-0.03 * R, -0.1 * R, k * R, 0, 7);
            g.fill();
            g.beginPath();
            g.arc(-0.45 * R, 0.0, 0.62 * R, 0, 7);
            g.fill();
          }
          g.restore();
          return;
        }
        if (pl.hs === 'afro') {
          g.beginPath();
          g.arc(-0.12 * R, -0.3 * R, R * 1.15, Math.PI * 0.85, Math.PI * 2.15);
          g.fill();
        } else if (pl.hs === 'spiky') {
          g.beginPath();
          g.moveTo(-1.0 * R, 0.25 * R);
          for (let i = 0; i <= 6; i++) {
            const a = Math.PI * (1.05 + i * 0.16);
            g.lineTo(Math.cos(a) * R * (i % 2 ? 1.0 : 1.45), Math.sin(a) * R * (i % 2 ? 1.0 : 1.45) - 0.1 * R);
          }
          g.lineTo(0.75 * R, -0.3 * R);
          g.lineTo(0.2 * R, -0.5 * R);
          g.lineTo(-0.45 * R, 0.05 * R);
          g.closePath();
          g.fill();
        } else {
          const top = pl.hs === 'fade' ? 0.22 : 0.05;
          g.beginPath();
          g.arc(-0.06 * R, -0.1 * R, R * 1.0, Math.PI * (1.0 - top), Math.PI * 1.96);
          g.lineTo(-0.2 * R, 0.05 * R);
          g.closePath();
          g.fill();
        }
        g.restore();
      }
    ]);
    if (st.face === 'real')
      parts.push([
        'skin',
        pl.bigNose
          ? multi(
              ell([hd[0] + r * 1.0, hd[1] - r * 0.2 + lk * r * 0.3], r * 0.34, r * 0.2, 0.35),
              ell([hd[0] + r * 1.22, hd[1] - r * 0.32 + lk * r * 0.3], r * 0.14, r * 0.16)
            )
          : ell([hd[0] + r * 0.9, hd[1] - r * 0.14 + lk * r * 0.3], r * 0.16, r * 0.2)
      ]); // v0.90: El Chopa's nose, legendary as in the fight // the nose sticks out of the profile
    if (C && pl.beard)
      parts.push([
        'beard',
        (g) => {
          g.save();
          g.beginPath();
          g.rect(0, Y([0, hd[1] - r * 0.36]), W, Hh);
          g.rect(0, Y([0, hd[1] - r * 0.05]), X([hd[0] - r * 0.35, 0]), Hh);
          g.clip();
          ell(hd, r * 1.0, r * 1.04)(g);
          ell([hd[0] + r * 0.12, hd[1] - r * 0.5], r * 0.8, r * 0.62)(g);
          g.restore();
        }
      ]);
    if (C) parts.push(['ear', ell([hd[0] - r * 0.6, hd[1] - r * 0.06], r * 0.15, r * 0.22)]);
    else if (D) parts.push(['ear', ell([hd[0] - r * 0.12, hd[1] - r * 0.08], r * 0.2, r * 0.27)]);
    // near arm (over the body) and the ball
    arm(shN, J.eN, J.wN, false);
    if (pose.ball && pose.ball[0] >= 0) parts.push(['ball', ell(J.ball, 0.062, 0.062)]);
    // ---- masks → id buffer → shaded pixels (09e_pixkit.js)
    const S = PIXKIT.paint(out, parts, T, { sw: st.sw, deep: st.deep, grp: (m) => m.replace(/F$/, '').replace(/^(ear|wrist)$/, 'skin') });
    const { id, matOf, at, put, dot, idx } = S;
    const JER = idx('jersey'),
      SKIN = new Set([...idx('skin')]),
      HEADP = parts.length ? matOf.lastIndexOf('skin', matOf.indexOf('hair')) : -1;
    const isHead = new Set([HEADP]);
    const R = Math.max(2, r * u),
      hx = X(hd),
      hy = Y(hd),
      ex = hx + R * 0.42,
      ey = hy - R * 0.08 + lk * R * 0.45,
      dk = [20, 10, 14];
    if (C) face();
    else if (st.face === 'real') faceReal();
    else if (D) {
      dot(ex, ey, H >= 90 ? [245, 240, 232] : dk, isHead);
      if (H >= 90) {
        dot(ex + 1, ey, dk, isHead);
        dot(ex + 1, ey + 1, dk, isHead);
      } // eye
      const bw = H >= 90 ? 3 : 2;
      for (let k = 0; k < bw; k++) dot(ex - 1 + k, ey - (H >= 90 ? 2 : 1) - (k === 0 ? 0 : 0), pl.hair === '#c9902e' ? [120, 70, 20] : dk, isHead); // brow
      dot(hx + R * 0.86, hy + R * 0.12 + lk * R * 0.3, T.skin.d, isHead);
      if (H >= 90) dot(hx + R * 0.86, hy + R * 0.22 + lk * R * 0.3, T.skin.d, isHead); // nose
      for (let k = 0; k < (H >= 90 ? 3 : 2); k++) dot(hx + R * 0.5 + k, hy + R * 0.52 + lk * R * 0.3, T.skin.d, isHead);
    } // mouth
    else dot(ex, ey, dk, isHead);
    // the big-head face: drawn pixel by pixel (sharp eyes, brows, nose, a smile, cheeks), over the skin and the beard
    function face() {
      const lk = (pose.look || 0) * 0.35;
      const HEADS = new Set([HEADP, ...idx('beard')]);
      const f = R * 0.16 + lk * 0;
      const yE = Math.round(hy + R * 0.0 + lk * R * 0.25);
      const ew = Math.max(2, Math.round(R * 0.2)),
        eh = Math.max(2, Math.round(R * 0.24)),
        wht = [250, 248, 240],
        ink = [16, 8, 12];
      const brow = mix(hex(pl.hair), [0, 0, 0], 0.35);
      const rect = (x, y, w, h, c) => {
        for (let a = 0; a < w; a++) for (let b = 0; b < h; b++) dot(x + a, y + b, c, HEADS);
      };
      PIXKIT.hairStrands(S, T, new Set(['hair', 'beard']), false); // hair and beard: a little texture of strands
      for (const [cx, w] of [
        [hx + f + R * 0.3, ew],
        [hx + f - R * 0.3, ew - 1]
      ]) {
        const x0 = Math.round(cx - w / 2);
        rect(x0, yE, w, eh, wht);
        rect(x0 + w - Math.max(1, Math.ceil(w * 0.55)), yE + (eh > 2 ? 1 : 0), Math.max(1, Math.ceil(w * 0.55)), eh - (eh > 2 ? 1 : 0), ink); // white and the pupil, looking ahead
        rect(x0, yE - 1, w, 1, ink); // the eyelid
        const bh = R >= 24 ? 2 : 1,
          by = yE - 3 - bh;
        rect(x0 - 1, by, w + 1, bh, brow);
        dot(x0 + w, by - 1, brow, HEADS);
      } // the brow (a gap over the lid), a bit angry
      const nx = Math.round(hx + f + R * 0.12),
        ny = Math.round(hy + R * 0.3 + lk * R * 0.2);
      rect(nx, ny, 2, 1, T.skin.d);
      dot(nx + 2, ny - 1, T.skin.d, HEADS);
      dot(nx, ny - 1, T.skin.h, HEADS); // nose
      const my = Math.round(hy + R * 0.55 + lk * R * 0.2),
        mx0 = Math.round(hx + f - R * 0.18),
        mx1 = Math.round(hx + f + R * 0.42);
      if (pl.mouth === 'grin') {
        rect(mx0, my, mx1 - mx0 + 1, 1, ink);
        rect(mx0 + 1, my + 1, mx1 - mx0 - 1, Math.max(1, Math.round(R * 0.1)), wht);
        rect(mx0 + 2, my + 1 + Math.max(1, Math.round(R * 0.1)), mx1 - mx0 - 3, Math.max(1, Math.round(R * 0.08)), [200, 60, 70]);
        rect(mx0 + 1, my + 1 + Math.max(1, Math.round(R * 0.1)) + Math.max(1, Math.round(R * 0.08)), mx1 - mx0 - 1, 1, ink);
        dot(mx0 - 1, my - 1, ink, HEADS);
        dot(mx1 + 1, my - 1, ink, HEADS);
      } else {
        rect(mx0 + 1, my, mx1 - mx0 - 1, 1, ink);
        dot(mx0, my - 1, ink, HEADS);
        dot(mx1, my - 1, ink, HEADS);
        rect(mx0 + 2, my + 1, mx1 - mx0 - 3, 1, T.skin.s);
      }
      const blush = mix(T.skin.b, [255, 120, 130], 0.4);
      rect(Math.round(hx + f + R * 0.42), Math.round(hy + R * 0.32), 2, 1, blush);
      rect(Math.round(hx + f - R * 0.42), Math.round(hy + R * 0.32), 2, 1, blush);
      const EAR = idx('ear');
      for (const e of EAR) {
      }
      dot(hx - R * 0.6, hy - R * 0.06 + lk * R * 0.2, T.skin.d, EAR);
      dot(hx - R * 0.6, hy + R * 0.04 + lk * R * 0.2, T.skin.d, EAR);
    }
    // the realistic face, in profile looking ahead, drawn pixel by pixel on the head (it only paints visible skin)
    function faceReal() {
      const HEAD = new Set(
        matOf.map((m, k) => (m === 'skin' && k > matOf.indexOf('shorts') && k < matOf.indexOf('hair') + 3 ? k : -1)).filter((k) => k >= 0)
      );
      const lkr = lk * R * 0.35;
      const ink = [22, 12, 14],
        pupil = [46, 26, 18],
        wht = [236, 230, 220],
        brow = mix(hex(pl.hair), [0, 0, 0], 0.3),
        lip = mix(T.skin.d, [120, 40, 40], 0.35);
      // eye, brow, cheekbone and nose; the mouth; the ear (09e_pixkit.js)
      const pf = PIXKIT.profileFace(S, T, { hx, hy, R, lkr, HEAD, ink, pupil, wht, brow }),
        my = pf.my;
      PIXKIT.profileMouth(S, T, pf, lip, HEAD);
      PIXKIT.profileEar(S, T, hx, hy, R, lkr);
      // sideburn and beard (the bearded ones: jaw and chin; the others a shadow of stubble on the jaw)
      const HP = HEADP;
      for (let y = Math.round(hy - R * 0.4); y <= Math.round(hy + R * 1.1); y++)
        for (let x = Math.round(hx - R * 0.6); x <= Math.round(hx + R * 1.1); x++) {
          if (at(x, y) !== HP) continue;
          const ux = (x - hx) / R,
            uy = (y - hy - lkr) / R,
            mouthRow = y === my;
          if (pl.beard && ux > 0.08 && ux < 0.2 && uy > -0.25 && uy < 0.3)
            put(y * W + x, mix(hex(pl.hair), T.skin.s, 0.3)); // the sideburn, down to the beard
          else if (pl.beard && ((uy > 0.42 && ux > -0.28) || (uy > 0.12 && ux > -0.32 && ux < 0.05)) && !((mouthRow || y === my + 1) && ux > 0.42)) {
            const hs = ((x * 73856093) ^ (y * 19349663)) >>> 0;
            const bc = mix(hex(pl.hair), T.skin.s, 0.3);
            put(y * W + x, hs % 6 === 0 ? mix(bc, T.skin.b, 0.35) : hs % 5 === 0 ? T.hair.d : bc);
          } else if (!pl.beard && uy > 0.66 && ux > -0.2 && ux < 0.55) put(y * W + x, mix(T.skin.b, hex(pl.hair), 0.14));
        }
    }
    // the number, on the jersey only (the near arm covers it when it passes in front)
    if (H >= 60) {
      const sc = H >= 120 ? 2 : 1;
      PIXKIT.shirtNumber(S, pl.num, X([(J.nk[0] + (J.hN[0] + J.hF[0]) / 2) / 2 + 0.01, 0]), Y([0, J.nk[1] - 0.13]), sc, T.jersey.d, T.trim.h, JER, D);
    }
    renderPlayerPart8(pose, X, J, Y, u, idx, D, dot);
    S.done();
    return { hx, hy, R };
  }
  /** (v1.1.7, code quality) part of renderPlayer */
  function renderPlayerPart8(pose, X, J, Y, u, idx, D, dot) {
    if (pose.ball) {
      const bx = X(J.ball),
        by = Y(J.ball),
        br = 0.062 * u,
        BALL = idx('ball');
      for (let k = -br; k <= br; k++) {
        dot(bx + k, by, [80, 34, 8], BALL);
        dot(bx, by + k, [80, 34, 8], BALL);
      }
      if (D) {
        dot(bx - br * 0.45, by - br * 0.5, [255, 200, 150], BALL);
        dot(bx - br * 0.35, by - br * 0.6, [255, 200, 150], BALL);
      }
    }
  }
  /** (v1.1.7, code quality) part of renderPlayer: shorts: long and baggy, both thighs and the waistband; trims: the outer seam of the near leg and the hems */
  function renderPlayerPart7(J, th, D, parts, multi, cap, line, leg) {
    // shorts: long and baggy, both thighs and the waistband; trims: the outer seam of the near leg and the hems
    const hemN = lerp2(J.hN, J.kN, 0.92),
      hemF = lerp2(J.hF, J.kF, 0.92),
      tw = th * (D ? 1.5 : 1.3);
    parts.push([
      'shorts',
      multi(
        cap(J.hF, hemF, tw, tw * 0.95),
        cap(J.hN, hemN, tw, tw * 0.95),
        line([J.hF[0] - 0.02, J.hF[1] + 0.03], [J.hN[0] + 0.02, J.hN[1] + 0.03], 0.07)
      )
    ]);
    if (D) {
      const n = perp(J.hN, J.kN),
        o = tw * 0.45;
      const sd = (p) => [p[0] + n[0] * o, p[1] + n[1] * o];
      const nf = perp(J.hF, J.kF),
        of = tw * 0.45,
        hem = (c, nn, oo) => line([c[0] + nn[0] * oo, c[1] + nn[1] * oo], [c[0] - nn[0] * oo, c[1] - nn[1] * oo], 0.014);
      parts.push([
        'trimS',
        multi(
          line(sd(J.hN), sd(hemN), 0.016),
          hem(hemN, n, o),
          hem(hemF, nf, of),
          line([J.hF[0] - 0.02, J.hF[1] + 0.058], [J.hN[0] + 0.02, J.hN[1] + 0.058], 0.012)
        )
      ]);
    }
    // near leg
    leg(J.hN, J.kN, J.aN, J.tN, false);
  }
  /** (v1.1.7, code quality) part of renderPlayer */
  function renderPlayerPart6(parts, multi, line, J, TP, D, X, Y) {
    parts.push([
      'jersey',
      (g) => {
        g.beginPath();
        TP.forEach((p, i) => (i ? g.lineTo(X(p), Y(p)) : g.moveTo(X(p), Y(p))));
        g.closePath();
        g.fill();
      }
    ]);
    parts.push([
      'trim',
      multi(
        line([J.nk[0] - 0.035, J.nk[1] - 0.005], [J.nk[0] + 0.004, J.nk[1] - 0.065], 0.014),
        line([J.nk[0] + 0.004, J.nk[1] - 0.065], [J.nk[0] + 0.035, J.nk[1] - 0.005], 0.014),
        line(TP[2], TP[3], 0.014),
        line(TP[7], TP[6], 0.012),
        D && line(TP[3], TP[4], 0.012),
        D && line(lerp2(TP[4], TP[5], 0), lerp2(TP[4], TP[5], 1), 0.012)
      )
    ]);
  }
  /** (v1.1.7, code quality) part of renderPlayer: torso: a V (broad shoulders, narrow waist), sleeveless with deep armholes */
  function renderPlayerPart5(leg, J, pose, parts, ell, Wd, SW, HW) {
    leg(J.hF, J.kF, J.aF, J.tF, true);
    if (pose.ball && pose.ball[0] < 0) parts.push(['ball', ell(J.ball, 0.062, 0.062)]);
    // torso: a V (broad shoulders, narrow waist), sleeveless with deep armholes
    const torsoPts = () => {
      const n = J.nk,
        sN = J.sN,
        sF = J.sF,
        hN = J.hN,
        hF = J.hF;
      return [
        [n[0] - 0.035, n[1] - 0.005],
        [n[0] + 0.035, n[1] - 0.005],
        Wd([sN[0] + 0.01, sN[1] - 0.005], SW),
        Wd([sN[0] - 0.005, sN[1] - 0.1], SW * 0.92),
        Wd([hN[0] + 0.035, hN[1] + 0.02], HW),
        Wd([hF[0] - 0.035, hF[1] + 0.02], HW),
        Wd([sF[0] + 0.005, sF[1] - 0.1], SW * 0.92),
        Wd([sF[0] - 0.01, sF[1] - 0.005], SW)
      ];
    };
    const TP = torsoPts();
    return { TP };
  }
  /** (v1.1.7, code quality) part of renderPlayer: far side */
  function renderPlayerPart4(J, D, parts, multi, cap, sh, L, line) {
    const leg = (h, k, a, t, far) => {
      const sk = far ? 'skinF' : 'skin',
        so = far ? 'sockF' : 'sock',
        sho = far ? 'shoeF' : 'shoe',
        sl = far ? 'soleF' : 'sole',
        stp = far ? 'stripeF' : 'stripe';
      const calf = lerp2(k, a, 0.38);
      parts.push([sk, multi(cap(k, calf, sh * 0.95, sh * (D ? 1.18 : 1)), cap(calf, a, sh * (D ? 1.18 : 1), sh * (D ? 0.62 : 0.9)))]);
      parts.push([so, cap(lerp2(a, k, 0.02), lerp2(a, k, D ? 0.28 : 0.3), sh * 0.8, sh * 0.86)]);
      if (D && !far) parts.push(['band', cap(lerp2(a, k, 0.24), lerp2(a, k, 0.27), sh * 0.86, sh * 0.88)]);
      const heel = lerp2(a, t, -0.18);
      parts.push([sho, multi(cap(heel, t, 0.064 * L, 0.05 * L), cap(lerp2(a, k, 0.06), heel, 0.06 * L, 0.06 * L))]);
      if (D) {
        const n = perp(heel, t);
        const dn = (p, k2) => [p[0] - n[0] * k2, p[1] - n[1] * k2];
        parts.push([sl, line(dn(heel, 0.026 * L), dn(t, 0.022 * L), 0.016 * L)]);
        parts.push([stp, line(lerp2(heel, t, 0.25), lerp2(heel, t, 0.62), 0.014 * L)]);
      }
    };
    // far side
    const cxm = (J.sN[0] + J.sF[0]) / 2,
      Wd = (p, k) => [cxm + (p[0] - cxm) * k, p[1]],
      SW = D ? 1.5 : 1.3,
      HW = D ? 1.1 : 1.3;
    // v3 (Jonay: «los hombros están un poco mal»): the arms hang from the broad shoulders of the V, with the deltoid on them
    const shN = Wd(J.sN, SW * 0.86),
      shF = Wd(J.sF, SW * 0.86);
    return { leg, Wd, SW, HW, shN, shF };
  }
  /** (v1.1.7, code quality) part of renderPlayer: ---- arm and leg builders (the far ones get the «F» materials) */
  function renderPlayerPart3(X, Y, u, ua, D, fa, L) {
    const { cap, ell, line, multi } = PIXKIT.shapes(X, Y, u);
    const parts = [];
    // ---- arm and leg builders (the far ones get the «F» materials)
    const arm = (s, e, w, far) => {
      const sk = far ? 'skinF' : 'skin';
      const n = perp(s, e),
        mid = lerp2(s, e, 0.42);
      parts.push([
        sk,
        multi(
          cap(s, e, ua * (D ? 1.3 : 1), ua * (D ? 0.82 : 1)),
          D && ell([mid[0] + n[0] * ua * 0.22, mid[1] + n[1] * ua * 0.22], ua * 0.42, ua * 0.32, -Math.atan2(e[1] - s[1], e[0] - s[0])),
          cap(e, w, fa * (D ? 1.12 : 1), fa * (D ? 0.7 : 1)),
          D ? ell(w, 0.034 * L, 0.03 * L) : cap(w, w, 0.06 * L, 0.06 * L)
        )
      ]);
      if (D && !far) parts.push(['wrist', cap(lerp2(w, e, 0.12), lerp2(w, e, 0.3), fa * 0.95, fa * 0.98)]);
    };
    return { cap, ell, line, multi, parts, arm };
  }
  /** (v1.1.7, code quality) part of renderPlayer */
  function renderPlayerPart2(pl, kit, L, st) {
    const mats = {
      skin: [pl.skin, 1],
      skinF: [pl.skin, 1],
      ear: [pl.skin, 1],
      jersey: [kit.jersey, 0],
      trim: [kit.trim, 0],
      shorts: [kit.shorts, 0],
      trimS: [kit.trim, 0],
      sock: [kit.sock, 0],
      sockF: [kit.sock, 0],
      band: [kit.trim, 0],
      shoe: [kit.shoe, 0],
      shoeF: [kit.shoe, 0],
      sole: ['#eeeae2', 0],
      soleF: ['#eeeae2', 0],
      stripe: [kit.shoe2, 0],
      stripeF: [kit.shoe2, 0],
      wrist: ['#f2f2f2', 0],
      hair: [pl.hair, 0],
      beard: [pl.hair, 0],
      ball: ['#e0701c', 1]
    };
    const T = PIXKIT.toneTable(mats);
    const ua = 0.06 * L,
      fa = 0.05 * L,
      th = 0.09 * L,
      sh = 0.06 * L,
      r = st.head;
    return { T, ua, fa, th, sh, r };
  }
  /** (v1.1.7, code quality) part of renderPlayer: the big-head version (Day of the Tentacle style): the body squashed to ~58 % and the head sat on the neck */
  function renderPlayerPart1(pose, st, BK, ox, u, oy, air, C) {
    const X = (p) => ox + p[0] * u,
      Y = (p) => oy - (p[1] + air) * u;
    let J = pose;
    const L = st.limb,
      D = st.detail;
    // the big-head version (Day of the Tentacle style): the body squashed to ~58 % and the head sat on the neck
    if (BK < 1) {
      J = {};
      const kx = C ? 0.92 : 0.96;
      for (const k in pose) J[k] = Array.isArray(pose[k]) && k !== 'hd' ? [pose[k][0] * kx, pose[k][1] * BK] : pose[k];
      J.hd = [J.nk[0] + (C ? 0.012 : 0.02) + (pose.look || 0) * -0.01, J.nk[1] + st.head * (C ? 0.88 : 1.02)];
      if (C && pose.ball && pose.ball[1] > 0.8) J.ball = [J.wN[0] + 0.03, J.wN[1] + 0.075];
    }
    return { X, Y, J, L, D };
  }
  // ---------- the style chosen and the link with the fight's units
  const ST = { H: 121, head: 0.1, limb: 1.08, sw: 2, deep: true, detail: true, outline: 'sel', face: 'real', bodyK: 0.85 };
  const K = 0.455 / 30; // body units per fight unit (hip → ankle: 30 fight units = 0.455 of the body)
  const Q = ST.H * K; // art pixels per fight unit (≈ 1.84: two screen pixels on the court)
  const BX0 = -44,
    BX1 = 44,
    BY0 = -6,
    BY1 = 92; // the box drawn, in fight units round the hip (x) and from the top (y)
  // the fight pose (angles) → joints (body units, feet at 0, facing right): same bones as drawFigure
  function joints(F) {
    const rad = (a) => (a * Math.PI) / 180,
      hy = 50 + (F.dy || 0),
      lean = rad(F.tl || 0);
    const seg = (o, a, l) => [o[0] + Math.sin(rad(a)) * l, o[1] + Math.cos(rad(a)) * l];
    const U = (p) => [(p[0] - 36) * K, (80 - p[1]) * K];
    const neck = [36 + Math.sin(lean) * 22, hy - Math.cos(lean) * 22],
      sF = [neck[0] + 2, neck[1] + 3],
      sB = [neck[0] - 2, neck[1] + 3];
    const eF = seg(sF, F.sF, 11),
      wF = seg(eF, F.sF + F.eF, 10),
      eB = seg(sB, F.sB, 11),
      wB = seg(eB, F.sB + F.eB, 10);
    const hF = [38, hy],
      hB = [34, hy],
      kF = seg(hF, F.hF, 15),
      fF = seg(kF, F.hF + F.kF, 15),
      kB = seg(hB, F.hB, 15),
      fB = seg(kB, F.hB + F.kB, 15);
    const hd = seg(neck, 180 + (F.tl || 0) + (F.head || 0), 8);
    const ank = (f) => {
        const a = U(f);
        return [a[0], a[1] + 0.045];
      },
      toe = (a) => [a[0] + 0.085, a[1] - 0.03];
    const aN = ank(fF),
      aF = ank(fB);
    return {
      hd: U(hd),
      nk: U(neck),
      sN: U(sF),
      eN: U(eF),
      wN: U(wF),
      sF: U(sB),
      eF: U(eB),
      wF: U(wB),
      hN: U(hF),
      kN: U(kF),
      aN,
      tN: toe(aN),
      hF: U(hB),
      kF: U(kB),
      aF,
      tF: toe(aF),
      look: -(F.head || 0) / 40
    };
  }
  // the kit and the face from a look of the game (shirt, pants, shoes, sole, skin, hair, hairStyle, beard)
  const hx6 = (n, d) => '#' + ((n ?? d) >>> 0).toString(16).padStart(6, '0').slice(-6);
  const lum = (h) => {
    const c = hex(h);
    return (0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2]) / 255;
  };
  function kitOf(look) {
    const jersey = hx6(look.shirt, 0x777777),
      shorts = hx6(look.pants, 0x333344);
    const trim =
      look.trim !== undefined
        ? hx6(look.trim)
        : look.sole !== undefined && look.sole !== look.shirt
          ? hx6(look.sole)
          : lum(jersey) > 0.62
            ? shorts
            : '#f2efe6';
    return { jersey, shorts, trim, sock: '#f2f2f2', shoe: hx6(look.shoes, 0x222222), shoe2: trim };
  }
  function plOf(look, num) {
    const hs = /afro/i.test(look.hairStyle || '')
      ? 'afro'
      : /buzz|fade|bald/i.test(look.hairStyle || '') || look.hair === undefined
        ? 'fade'
        : 'short';
    return { skin: hx6(look.skin, 0xd9a47c), hair: hx6(look.hair, 0x222222), hs, beard: !!look.beard, num: String(num), bigNose: !!look.bigNose };
  }
  // one sprite: { c, ax, ay } (ax, ay = the art pixel of the fight's point 36, 80) and q (art pixels per fight unit)
  function sprite(look, F, num) {
    const W = Math.ceil((BX1 - BX0) * Q),
      Hh = Math.ceil((BY1 - BY0) * Q),
      ax = Math.round(-BX0 * Q),
      ay = Math.round((80 - BY0) * Q);
    const c = document.createElement('canvas');
    c.width = W;
    c.height = Hh;
    renderPlayer(c, ax, ay, ST, joints(F), kitOf(look), plOf(look, num));
    if (!F.lying) return { c, ax, ay, q: Q };
    // knocked down: the same figure turned a quarter (head behind), as the fight does, a bit lifted so the back is on the floor
    const r = document.createElement('canvas');
    r.width = Hh;
    r.height = W;
    const g = r.getContext('2d');
    g.imageSmoothingEnabled = false;
    g.translate(ay, W - ax);
    g.rotate(-Math.PI / 2);
    g.drawImage(c, -ax, -ay);
    return { c: r, ax: ay, ay: W - ax - Math.round(0.1 * ST.H), q: Q };
  }
  return { sprite, joints, Q, ST };
})();
