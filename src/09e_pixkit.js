// ---------- v1.1.7 (Jonay: «quitar código repetido en el baloncesto pixelado, el Guanche y todo lo demás»): the pieces the
// two pixel-art drawers had copied from each other (PIXBASKET, 09eb, for the basket players; PIXGUAN, 09ma, for Guanche
// Guarriors and the football players): the colour tones, the shapes of the body parts, the step that turns the parts
// into shaded pixels, and the small details of the face and the jersey number. Each drawer keeps its own body.
const PIXKIT = (() => {
  let MK = null,
    MG = null;
  /** a reusable canvas to draw each part's mask */
  function maskCtx(w, h) {
    if (!MK) {
      MK = document.createElement('canvas');
      MG = MK.getContext('2d', { willReadFrequently: true });
    }
    if (MK.width !== w || MK.height !== h) {
      MK.width = w;
      MK.height = h;
    }
    return MG;
  }
  const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const mix = (a, b, t) => [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t));
  /** base, shadow, deep shadow and light of a colour (warm: skin; bronze: the statue of the Guanche) */
  function tones(base, warm, bronze) {
    const c = hex(base),
      dk = hex(bronze ? '#1a2418' : warm ? '#3e160e' : '#20123a'),
      hl = hex(bronze ? '#bfe0b0' : warm ? '#ffe9cc' : '#fff4e2');
    return { b: c, s: mix(c, dk, 0.36), d: mix(c, dk, 0.6), h: mix(c, hl, bronze ? 0.34 : 0.3) };
  }
  /** the tones of every material of a figure: mats = {name: [colour, warm]}; the far-side ones («…F») a bit darker */
  function toneTable(mats, bronze) {
    const T = {};
    for (const m in mats) {
      T[m] = tones(mats[m][0], mats[m][1], bronze);
      if (m.endsWith('F')) for (const k in T[m]) T[m][k] = mix(T[m][k], [24, 12, 30], 0.2);
    }
    return T;
  }
  const lerp2 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const perp = (a, b) => {
    const dx = b[0] - a[0],
      dy = b[1] - a[1],
      l = Math.hypot(dx, dy) || 1;
    return [-dy / l, dx / l];
  };
  /** the shapes the parts are made of, in body units: X / Y turn a point into pixels, u is the pixels per unit */
  function shapes(X, Y, u) {
    // a limb that tapers from w0 to w1 (round ends)
    const cap = (a, b, w0, w1) => (g) => {
      const n = perp(a, b),
        A = [X(a), Y(a)],
        B = [X(b), Y(b)],
        r0 = Math.max(0.6, (w0 * u) / 2),
        r1 = Math.max(0.6, (w1 * u) / 2);
      g.beginPath();
      g.arc(A[0], A[1], r0, 0, 7);
      g.fill();
      g.beginPath();
      g.arc(B[0], B[1], r1, 0, 7);
      g.fill();
      g.beginPath();
      g.moveTo(A[0] + n[0] * r0, A[1] - n[1] * r0);
      g.lineTo(B[0] + n[0] * r1, B[1] - n[1] * r1);
      g.lineTo(B[0] - n[0] * r1, B[1] + n[1] * r1);
      g.lineTo(A[0] - n[0] * r0, A[1] + n[1] * r0);
      g.fill();
    };
    const ell =
      (c, rx, ry, rot = 0) =>
      (g) => {
        g.beginPath();
        g.ellipse(X(c), Y(c), Math.max(0.6, rx * u), Math.max(0.6, ry * u), rot, 0, 7);
        g.fill();
      };
    const line = (a, b, w) => (g) => {
      g.lineCap = 'round';
      g.lineWidth = Math.max(1, w * u);
      g.beginPath();
      g.moveTo(X(a), Y(a));
      g.lineTo(X(b), Y(b));
      g.stroke();
    };
    const poly = (pts) => (g) => {
      g.beginPath();
      pts.forEach((p, i) => (i ? g.lineTo(X(p), Y(p)) : g.moveTo(X(p), Y(p))));
      g.closePath();
      g.fill();
    };
    const multi =
      (...fs) =>
      (g) =>
        fs.forEach((f) => f && f(g));
    return { cap, ell, line, poly, multi };
  }
  const SIDES = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
  /** the parts [material, shape] (back to front) turned into pixels on `out`: each part into its own mask, stacked by
   *  depth into an id buffer, then shaded per pixel (light from the top left, shadow on the bottom-right edge of each
   *  part, occlusion where a part in front touches it) and outlined. opt: sw (shadow width), deep (a darker first ring),
   *  grp (materials that count as one: no edge between them), fill(m, s2) / edge(m) (special colours, or null).
   *  Returns what the details need: at, put, dot, idx…, and done() to put the pixels on the canvas. */
  function paint(out, parts, T, opt) {
    const { W, Hh, id, matOf, grp, o } = paintPart1(out, parts, opt);
    const { img, at, put, idx } = paintPart2(o, W, Hh, id, matOf, T, opt, grp);
    const dot = (x, y, c, only) => {
      x = Math.round(x);
      y = Math.round(y);
      if (x < 0 || y < 0 || x >= W || y >= Hh) return;
      const q = id[y * W + x];
      if (only && !only.has(q)) return;
      put(y * W + x, c);
    };
    return { W, Hh, id, matOf, at, put, dot, idx, done: () => o.putImageData(img, 0, 0) };
  }
  /** (v1.1.7, code quality) part of paint: details at pixel level, only where their part is still visible */
  function paintPart2(o, W, Hh, id, matOf, T, opt, grp) {
    const img = o.getImageData(0, 0, W, Hh),
      px = img.data;
    const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= Hh ? -1 : id[y * W + x]);
    const put = (i, c) => {
      px[i * 4] = c[0];
      px[i * 4 + 1] = c[1];
      px[i * 4 + 2] = c[2];
      px[i * 4 + 3] = 255;
    };
    const shadeAt = (x, y, p) => {
      const m = matOf[p],
        tn = T[m];
      const back = (q) => q < 0 || (q < p && grp(matOf[q]) !== grp(m));
      let s2 = 0;
      for (let k = 1; k <= opt.sw; k++)
        if (back(at(x + k, y)) || back(at(x, y + k)) || back(at(x + k, y + k))) s2 = Math.max(s2, opt.deep && k === 1 ? 2 : 1);
      let occ = false;
      for (const [dx, dy] of SIDES) {
        const q = at(x + dx, y + dy);
        if (q > p && grp(matOf[q]) !== grp(m)) occ = true;
      }
      const hl = !s2 && (back(at(x - 1, y)) || back(at(x, y - 1)));
      const special = opt.fill && opt.fill(m, s2);
      return special || (s2 === 2 ? tn.d : s2 || occ ? tn.s : hl ? tn.h : tn.b);
    };
    const edgeOf = (x, y) => {
      for (const [dx, dy] of SIDES) {
        const t = at(x + dx, y + dy);
        if (t >= 0) return t;
      }
      return -1;
    };
    for (let y = 0; y < Hh; y++)
      for (let x = 0; x < W; x++) {
        const p = id[y * W + x];
        if (p >= 0) put(y * W + x, shadeAt(x, y, p));
      }
    for (let y = 0; y < Hh; y++)
      for (let x = 0; x < W; x++) {
        const i = y * W + x;
        if (id[i] >= 0) continue;
        const q = edgeOf(x, y);
        if (q >= 0) put(i, (opt.edge && opt.edge(matOf[q])) || mix(T[matOf[q]].d, [16, 8, 20], 0.35));
      }
    // details at pixel level, only where their part is still visible
    const idx = (m) => {
      const s = new Set();
      matOf.forEach((mm, k) => {
        if (mm === m) s.add(k);
      });
      return s;
    };
    return { img, at, put, idx };
  }
  /** (v1.1.7, code quality) part of paint */
  function paintPart1(out, parts, opt) {
    const W = out.width,
      Hh = out.height,
      N = W * Hh,
      id = new Int16Array(N).fill(-1);
    const g = maskCtx(W, Hh);
    parts.forEach(([, f], depth) => {
      g.clearRect(0, 0, W, Hh);
      g.fillStyle = g.strokeStyle = '#fff';
      f(g);
      const d = g.getImageData(0, 0, W, Hh).data;
      for (let i = 0; i < N; i++) if (d[i * 4 + 3] > 120) id[i] = depth;
    });
    const matOf = parts.map((p) => p[0]),
      grp = opt.grp;
    const o = out.getContext('2d', { willReadFrequently: true });
    return { W, Hh, id, matOf, grp, o };
  }
  /** a little texture of strands on the hair (mats: the hair materials; stripes: the long hair's waves) */
  function hairStrands(S, T, mats, stripes) {
    for (let y = 0; y < S.Hh; y++)
      for (let x = 0; x < S.W; x++) {
        const q = S.id[y * S.W + x];
        if (q < 0 || !mats.has(S.matOf[q])) continue;
        const hs = ((x * 73856093) ^ (y * 19349663)) >>> 0;
        if (stripes && (x + (y >> 1)) % 3 === 0) S.put(y * S.W + x, T.hair.d);
        else if (hs % 9 === 0) S.put(y * S.W + x, T.hair.d);
        else if (hs % 23 === 0) S.put(y * S.W + x, T.hair.h);
      }
  }
  /** the face in profile looking ahead, pixel by pixel on the head (only on visible skin): the eye with its lid, the
   *  brow (a bit of a frown), the cheekbone and the nose. f = {hx, hy, R, lkr, HEAD, ink, pupil, wht, brow}.
   *  Returns where the eye and the mouth go. */
  function profileFace(S, T, f) {
    const { dot } = S,
      { hx, hy, R, lkr, HEAD, ink, pupil, wht, brow } = f,
      big = R >= 8.5;
    const ex = Math.round(hx + R * 0.44),
      ey = Math.round(hy - R * 0.02 + lkr);
    dot(ex - 1, ey, T.skin.s, HEAD);
    dot(ex, ey, wht, HEAD);
    dot(ex + 1, ey, pupil, HEAD);
    if (big) {
      dot(ex + 1, ey + 1, pupil, HEAD);
      dot(ex, ey + 1, wht, HEAD);
    }
    for (let k = -1; k <= 1; k++) dot(ex + k, ey - 1, ink, HEAD);
    dot(ex, ey + (big ? 2 : 1), T.skin.s, HEAD);
    dot(ex + 1, ey + (big ? 2 : 1), T.skin.s, HEAD);
    for (let k = -1; k <= 1; k++) dot(ex + k, ey - 3, brow, HEAD);
    dot(ex + 2, ey - 2, brow, HEAD);
    if (big) for (let k = -1; k <= 1; k++) dot(ex + k, ey - 4, brow, HEAD);
    dot(ex, ey - 2, T.skin.h, HEAD);
    dot(ex - 1, ey + (big ? 3 : 2), T.skin.h, HEAD);
    dot(ex, ey + (big ? 3 : 2), T.skin.h, HEAD);
    dot(ex - 2, ey + (big ? 4 : 3), T.skin.s, HEAD);
    dot(ex - 1, ey + (big ? 5 : 4), T.skin.s, HEAD);
    const nx = Math.round(hx + R * 0.86),
      ny = Math.round(hy + R * 0.28 + lkr);
    dot(nx - 1, ny, T.skin.d, HEAD);
    dot(nx, ny + 1, T.skin.s, HEAD);
    dot(nx + 1, ny - 2, T.skin.h, HEAD);
    return { ex, ey, big, my: Math.round(hy + R * 0.56 + lkr), mx: Math.round(hx + R * 0.58) };
  }
  /** the line between the lips, the lower lip and a corner (pf: what profileFace returned) */
  function profileMouth(S, T, pf, lip, HEAD) {
    for (let k = 0; k < (pf.big ? 3 : 2); k++) S.dot(pf.mx + k, pf.my, lip, HEAD);
    S.dot(pf.mx - 1, pf.my, T.skin.s, HEAD);
    for (let k = 0; k < 2; k++) S.dot(pf.mx + k, pf.my + 1, T.skin.h, HEAD);
  }
  /** the ear in profile: the hole and the rim */
  function profileEar(S, T, hx, hy, R, lkr) {
    const EAR = S.idx('ear'),
      ax = Math.round(hx - R * 0.12),
      ay = Math.round(hy - R * 0.08 + lkr);
    S.dot(ax, ay, T.skin.d, EAR);
    S.dot(ax, ay + 1, T.skin.d, EAR);
    S.dot(ax - 1, ay - 1, T.skin.h, EAR);
  }
  const DIGITS = {
    0: '111101101101111',
    1: '010110010010111',
    2: '111001111100111',
    3: '111001111001111',
    4: '101101111001001',
    5: '111100111001111',
    6: '111100111101111',
    7: '111001010010010',
    8: '111101111101111',
    9: '111101111001111'
  };
  /** the number on the shirt (only where the shirt shows: an arm in front covers it), centred on xMid with its top at
   *  yTop, sc pixels per dot, a dark shadow (if shadow) and the light digits */
  function shirtNumber(S, num, xMid, yTop, sc, dark, light, SET, shadow) {
    const cw = 4 * sc,
      cx0 = Math.round(xMid - (num.length * cw) / 2 + 1),
      cy0 = Math.round(yTop);
    const on = new Set();
    [...num].forEach((ch, k) => {
      const pat = DIGITS[ch];
      for (let b = 0; b < 15; b++)
        if (pat[b] === '1')
          for (let a = 0; a < sc; a++) for (let c = 0; c < sc; c++) on.add(cx0 + k * cw + (b % 3) * sc + a + ',' + (cy0 + ((b / 3) | 0) * sc + c));
    });
    if (shadow)
      for (const key of on) {
        const [x, y] = key.split(',').map(Number);
        for (const [dx, dy] of [
          [1, 0],
          [0, 1],
          [1, 1]
        ])
          if (!on.has(x + dx + ',' + (y + dy))) S.dot(x + dx, y + dy, dark, SET);
      }
    for (const key of on) {
      const [x, y] = key.split(',').map(Number);
      S.dot(x, y, light, SET);
    }
  }
  return { maskCtx, hex, mix, tones, toneTable, lerp2, perp, shapes, paint, hairStrands, profileFace, profileMouth, profileEar, shirtNumber };
})();
