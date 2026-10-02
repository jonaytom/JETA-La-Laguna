// ============ procedural textures ============
function mkCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function canvasTex(c, { repeat = true, srgb = true, mip = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = MAXANI;
  if (!mip) { t.generateMipmaps = false; t.minFilter = THREE.LinearFilter; }
  return t;
}
function noiseFill(ctx, w, h, base, amp, seed = 1, size = 1) {
  const r = mulberry(seed); const img = ctx.getImageData(0, 0, w, h); const d = img.data;
  for (let y = 0; y < h; y += size) for (let x = 0; x < w; x += size) {
    const n = (r() - 0.5) * amp;
    for (let yy = 0; yy < size; yy++) for (let xx = 0; xx < size; xx++) {
      const i = ((y + yy) * w + (x + xx)) * 4; if (i >= d.length) continue;
      d[i] = clamp(base[0] + n, 0, 255); d[i + 1] = clamp(base[1] + n, 0, 255); d[i + 2] = clamp(base[2] + n, 0, 255); d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}
function speckle(ctx, w, h, n, colors, rmin, rmax, seed = 3) {
  const r = mulberry(seed);
  for (let i = 0; i < n; i++) { ctx.fillStyle = colors[Math.floor(r() * colors.length)]; const s = rmin + r() * (rmax - rmin); ctx.fillRect(r() * w, r() * h, s, s); }
}

const TEX = {};
(function buildTextures() {
  // ---------------- asphalt
  {
    const c = mkCanvas(256, 256), x = c.getContext('2d');
    noiseFill(x, 256, 256, [70, 71, 74], 26, 11);
    speckle(x, 256, 256, 900, ['#5c5d60', '#8a8a8a', '#3c3d40'], 1, 2.5, 5);
    // cracks / patches
    x.globalAlpha = 0.18; x.fillStyle = '#2a2a2c';
    for (let i = 0; i < 5; i++) x.fillRect(Math.random() * 256, Math.random() * 256, 30 + Math.random() * 60, 20 + Math.random() * 40);
    x.globalAlpha = 1;
    TEX.asphaltC = c;
    TEX.asphalt = canvasTex(c);
    // marked version (u across road, v along)
    const c2 = mkCanvas(256, 512), y = c2.getContext('2d');
    y.drawImage(c, 0, 0); y.drawImage(c, 0, 256);
    y.fillStyle = '#e8e6de';
    y.fillRect(6, 0, 5, 512); y.fillRect(245, 0, 5, 512);
    y.fillStyle = '#f0f0ea';
    for (let v = 0; v < 512; v += 128) y.fillRect(125, v + 10, 6, 64);
    TEX.asphaltLines = canvasTex(c2);
  }
  // ---------------- paving (La Laguna stone slabs)
  {
    const c = mkCanvas(256, 256), x = c.getContext('2d');
    noiseFill(x, 256, 256, [150, 146, 138], 18, 21);
    const r = mulberry(7);
    for (let row = 0; row < 8; row++) {
      const hh = 32; let col = -(row % 2) * 20;
      while (col < 256) {
        const ww = 36 + r() * 28; const g = 125 + r() * 45;
        x.fillStyle = `rgba(${g},${g - 4},${g - 12},0.55)`; x.fillRect(col + 1, row * hh + 1, ww - 2, hh - 2);
        x.strokeStyle = 'rgba(60,58,55,0.8)'; x.lineWidth = 1.5; x.strokeRect(col, row * hh, ww, hh);
        col += ww;
      }
    }
    speckle(x, 256, 256, 600, ['rgba(80,80,80,.4)', 'rgba(200,200,190,.35)'], 1, 2, 9);
    TEX.paving = canvasTex(c);
  }
  // ---------------- sidewalk tiles (panot-like)
  {
    const c = mkCanvas(128, 128), x = c.getContext('2d');
    noiseFill(x, 128, 128, [176, 172, 165], 14, 31);
    x.strokeStyle = 'rgba(90,88,84,.7)'; x.lineWidth = 1.5;
    for (let i = 0; i <= 128; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 128); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(128, i); x.stroke(); }
    TEX.sidewalk = canvasTex(c);
  }
  // ---------------- dirt
  {
    const c = mkCanvas(256, 256), x = c.getContext('2d');
    noiseFill(x, 256, 256, [128, 104, 78], 30, 41, 2);
    speckle(x, 256, 256, 700, ['#6b5540', '#a08770', '#8a7a60'], 1, 3, 13);
    TEX.dirt = canvasTex(c);
  }
  // ---------------- tram track (u across 7m, v along)
  {
    const c = mkCanvas(256, 256), x = c.getContext('2d');
    x.drawImage(TEX.paving.image, 0, 0);
    x.fillStyle = 'rgba(80,110,70,.85)'; x.fillRect(24, 0, 84, 256); x.fillRect(148, 0, 84, 256); // grass track bed
    speckle(x, 256, 256, 500, ['rgba(60,95,50,.8)', 'rgba(100,130,80,.8)'], 1, 3, 17);
    x.fillStyle = '#9a9ca0';
    [36, 94, 160, 218].forEach((u) => { x.fillRect(u - 3, 0, 6, 256); x.fillStyle = '#d8dadd'; x.fillRect(u - 1, 0, 2, 256); x.fillStyle = '#9a9ca0'; });
    TEX.tram = canvasTex(c);
  }
  // ---------------- roof tiles (teja árabe)
  {
    const c = mkCanvas(256, 256), x = c.getContext('2d');
    noiseFill(x, 256, 256, [150, 78, 52], 26, 51);
    for (let row = 0; row < 16; row++) for (let col = 0; col < 16; col++) {
      const g = x.createLinearGradient(col * 16, 0, col * 16 + 16, 0);
      const k = 0.75 + Math.random() * 0.35;
      g.addColorStop(0, `rgba(${90 * k},${40 * k},${28 * k},0.9)`); g.addColorStop(0.5, `rgba(${190 * k},${105 * k},${70 * k},0.8)`); g.addColorStop(1, `rgba(${90 * k},${40 * k},${28 * k},0.9)`);
      x.fillStyle = g; x.fillRect(col * 16, row * 16 + (col % 2) * 2, 16, 15);
    }
    speckle(x, 256, 256, 300, ['rgba(60,70,40,.35)', 'rgba(40,40,40,.3)'], 2, 5, 19); // moss
    TEX.roofTile = canvasTex(c);
  }
  // ---------------- flat roof (azotea)
  {
    const c = mkCanvas(256, 256), x = c.getContext('2d');
    noiseFill(x, 256, 256, [178, 170, 160], 22, 61, 2);
    x.strokeStyle = 'rgba(120,110,100,.5)';
    for (let i = 0; i <= 256; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 256); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(256, i); x.stroke(); }
    speckle(x, 256, 256, 120, ['rgba(60,60,60,.25)'], 4, 12, 23);
    TEX.roofFlat = canvasTex(c);
  }
  // ---------------- terrain detail
  {
    const c = mkCanvas(256, 256), x = c.getContext('2d');
    noiseFill(x, 256, 256, [158, 158, 158], 60, 71, 2);
    speckle(x, 256, 256, 1600, ['rgba(90,90,90,.5)', 'rgba(210,210,210,.4)'], 1, 3, 29);
    TEX.detail = canvasTex(c, { srgb: false });
  }
  // ---------------- facade atlas (6 styles x 2 rows)
  {
    const CW = 256, NS = 8; // 8 columns x 2 bands (band 1 = top half: styles 0-6, band 0 = bottom half: styles 8-15)
    const col = mkCanvas(CW * NS, CW * 4), msk = mkCanvas(CW * NS, CW * 4);
    const C = col.getContext('2d'), M = msk.getContext('2d');
    // base: white wall tinted fully
    C.fillStyle = '#f2efe8'; C.fillRect(0, 0, CW * NS, CW * 4);
    M.fillStyle = 'rgb(255,0,0)'; M.fillRect(0, 0, CW * NS, CW * 4);
    // plaster noise
    { const img = C.getImageData(0, 0, CW * NS, CW * 4), d = img.data, r = mulberry(5);
      for (let i = 0; i < d.length; i += 4) { const n = (r() - 0.5) * 16; d[i] += n; d[i + 1] += n; d[i + 2] += n; } C.putImageData(img, 0, 0); }
    // helpers: cell coords (s, row) -> canvas; row 0 ground = bottom half ; y measured from floor bottom (0..1)
    const R = (s, row, u0, v0, u1, v1, color, mask) => {
      const x0 = s * CW + u0 * CW, x1 = s * CW + u1 * CW;
      const yb = (row === 0 ? 2 : 1) * CW; // bottom pixel of cell
      const y0 = yb - v1 * CW, y1 = yb - v0 * CW;
      if (color) { C.fillStyle = color; C.fillRect(x0, y0, x1 - x0, y1 - y0); }
      if (mask) { M.fillStyle = mask; M.fillRect(x0, y0, x1 - x0, y1 - y0); }
    };
    const GL = 'rgb(0,255,0)', NO = 'rgb(0,0,0)';
    const glass = (s, row, u0, v0, u1, v1) => {
      const x0 = s * CW + u0 * CW, x1 = s * CW + u1 * CW, yb = (row === 0 ? 2 : 1) * CW, y0 = yb - v1 * CW, y1 = yb - v0 * CW;
      const g = C.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, '#5d6d7c'); g.addColorStop(0.5, '#27313b'); g.addColorStop(1, '#3f4b57');
      C.fillStyle = g; C.fillRect(x0, y0, x1 - x0, y1 - y0); M.fillStyle = GL; M.fillRect(x0, y0, x1 - x0, y1 - y0);
    };
    // ---- 0 colonial (bay 4.2m x 3.6m)
    for (const row of [0, 1]) {
      const s = 0;
      if (row === 1) {
        R(s, row, 0.33, 0.2, 0.67, 0.86, '#4a4a48', NO); // basalt stone surround
        R(s, row, 0.36, 0.22, 0.64, 0.83, '#5b3b22', NO); // wood frame
        glass(s, row, 0.39, 0.25, 0.61, 0.8);
        // guillotine sash bars
        C.fillStyle = '#5b3b22';
        const x0 = s * CW + 0.39 * CW, w = 0.22 * CW, yb = CW;
        C.fillRect(x0, yb - 0.525 * CW, w, 5); C.fillRect(x0 + w / 3 - 1.5, yb - 0.8 * CW, 3, 0.55 * CW); C.fillRect(x0 + 2 * w / 3 - 1.5, yb - 0.8 * CW, 3, 0.55 * CW);
        C.fillRect(x0, yb - 0.66 * CW, w, 3); C.fillRect(x0, yb - 0.39 * CW, w, 3);
        R(s, row, 0.31, 0.17, 0.69, 0.21, '#6a6a66', NO); // sill
        R(s, row, 0, 0.94, 1, 1, null, null);
      } else {
        R(s, row, 0, 0, 1, 0.16, '#55544f', NO); // zócalo
        R(s, row, 0.33, 0.25, 0.67, 0.88, '#474744', NO);
        R(s, row, 0.36, 0.27, 0.64, 0.85, '#4a2f1b', NO);
        glass(s, row, 0.39, 0.3, 0.61, 0.82);
        C.fillStyle = '#1d1d1d'; // reja
        for (let i = 0; i < 6; i++) C.fillRect(s * CW + (0.4 + i * 0.04) * CW, 2 * CW - 0.82 * CW, 3, 0.52 * CW);
      }
    }
    // ---- 1 modern house (bay 3.5 x 3.1)
    {
      const s = 1;
      R(s, 1, 0.25, 0.28, 0.75, 0.75, '#b7b9bb', NO); glass(s, 1, 0.27, 0.3, 0.73, 0.73);
      R(s, 1, 0.27, 0.58, 0.73, 0.73, '#d9d0bd', NO); // persiana medio bajada
      C.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 8; i++) C.fillRect(s * CW + 0.27 * CW, CW - 0.73 * CW + i * 5, 0.46 * CW, 1);
      C.fillStyle = '#b7b9bb'; C.fillRect(s * CW + 0.495 * CW, CW - 0.58 * CW, 3, 0.28 * CW);
      R(s, 1, 0.22, 0.25, 0.78, 0.28, '#cfcfcf', NO);
      // ground: shop front
      R(s, 0, 0, 0, 1, 0.07, '#6e6e6e', NO);
      R(s, 0, 0.08, 0.07, 0.92, 0.8, '#3a3d40', NO); glass(s, 0, 0.1, 0.07, 0.9, 0.78);
      C.fillStyle = '#3a3d40'; C.fillRect(s * CW + 0.5 * CW - 2, 2 * CW - 0.78 * CW, 4, 0.71 * CW);
      R(s, 0, 0.04, 0.82, 0.96, 0.95, '#2f3f55', NO); // sign band
      C.fillStyle = '#e9e2c9'; for (let i = 0; i < 6; i++) C.fillRect(s * CW + (0.15 + i * 0.12) * CW, 2 * CW - 0.915 * CW, 0.08 * CW, 0.06 * CW);
    }
    // ---- 2 apartment block (bay 3.2 x 3.0) with balcony
    {
      const s = 2;
      R(s, 1, 0.12, 0.05, 0.88, 0.1, '#bdbab2', NO); // balcony slab
      R(s, 1, 0.2, 0.1, 0.8, 0.82, '#a8aaac', NO); glass(s, 1, 0.22, 0.12, 0.78, 0.8);
      C.fillStyle = '#a8aaac'; C.fillRect(s * CW + 0.5 * CW - 2, CW - 0.8 * CW, 4, 0.68 * CW);
      C.fillStyle = 'rgba(40,40,40,.9)'; C.fillRect(s * CW + 0.12 * CW, CW - 0.4 * CW, 0.76 * CW, 3);
      for (let i = 0; i <= 18; i++) C.fillRect(s * CW + (0.12 + i * 0.0422) * CW, CW - 0.4 * CW, 2, 0.3 * CW);
      M.fillStyle = NO; M.fillRect(s * CW + 0.12 * CW, CW - 0.4 * CW, 0.76 * CW, 4);
      R(s, 0, 0, 0, 1, 0.07, '#6e6e6e', NO);
      R(s, 0, 0.06, 0.07, 0.94, 0.78, '#2d2f33', NO); glass(s, 0, 0.08, 0.07, 0.92, 0.76);
      R(s, 0, 0.02, 0.8, 0.98, 0.96, '#7a2b24', NO);
      C.fillStyle = '#f3e7cf'; for (let i = 0; i < 5; i++) C.fillRect(s * CW + (0.2 + i * 0.13) * CW, 2 * CW - 0.91 * CW, 0.09 * CW, 0.07 * CW);
    }
    // ---- 3 industrial (bay 6 x 4)
    {
      const s = 3;
      for (const row of [0, 1]) { C.fillStyle = 'rgba(0,0,0,.08)'; for (let i = 0; i < 32; i++) C.fillRect(s * CW + i * 8, row === 1 ? 0 : CW, 3, CW); }
      R(s, 1, 0.1, 0.62, 0.9, 0.78, '#8a8f93', NO); glass(s, 1, 0.12, 0.64, 0.88, 0.76);
      R(s, 0, 0.18, 0, 0.82, 0.78, '#8d9194', NO);
      C.fillStyle = 'rgba(0,0,0,.2)'; for (let i = 0; i < 28; i++) C.fillRect(s * CW + 0.18 * CW, 2 * CW - 0.78 * CW + i * 7, 0.64 * CW, 2);
    }
    // ---- 4 institutional (bay 3.6 x 3.4) ribbon windows
    {
      const s = 4;
      R(s, 1, 0, 0.3, 1, 0.78, '#7d8286', NO); glass(s, 1, 0, 0.32, 1, 0.76);
      C.fillStyle = '#7d8286'; C.fillRect(s * CW, CW - 0.76 * CW, 5, 0.44 * CW); C.fillRect(s * CW + 0.5 * CW, CW - 0.76 * CW, 4, 0.44 * CW);
      R(s, 0, 0, 0, 1, 0.08, '#77746e', NO);
      R(s, 0, 0.05, 0.1, 0.95, 0.8, '#6f7478', NO); glass(s, 0, 0.07, 0.12, 0.93, 0.78);
    }
    // ---- 5 stone / church wall (bay 3 x 3)
    {
      const s = 5; const r = mulberry(77);
      for (const row of [0, 1]) {
        for (let yy = 0; yy < 8; yy++) { let xx = -(yy % 2) * 18; while (xx < CW) { const w = 30 + r() * 26; const g = 170 + r() * 50;
          const X = s * CW + Math.max(0, xx), W = Math.min(w, CW - Math.max(0, xx)) - 2, Y = (row === 1 ? 0 : CW) + yy * 32;
          if (W > 0) { C.fillStyle = `rgb(${g},${g - 8},${g - 20})`; C.fillRect(X + 1, Y + 1, W, 30); M.fillStyle = 'rgb(90,0,0)'; M.fillRect(X + 1, Y + 1, W, 30); }
          xx += w; } }
      }
      C.fillStyle = 'rgba(60,55,50,.7)';
      R(s, 1, 0.42, 0.35, 0.58, 0.75, '#3c3a37', NO); glass(s, 1, 0.44, 0.37, 0.56, 0.72);
    }
    // ---- 6 whitewashed church wall with basalt plinth & narrow arched window
    {
      const s = 6;
      R(s, 0, 0, 0, 1, 0.22, '#5a5751', 'rgb(40,0,0)');
      C.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 6; i++) C.fillRect(s * CW + i * 44, 2 * CW - 0.22 * CW, 2, 0.22 * CW);
      // upper: narrow arched window with stone frame
      const wx = s * CW + 0.43 * CW, ww = 0.14 * CW, wy = CW - 0.78 * CW, wh = 0.36 * CW;
      C.fillStyle = '#4b4843'; C.fillRect(wx - 6, wy + ww / 2, ww + 12, wh - ww / 2 + 6); C.beginPath(); C.arc(wx + ww / 2, wy + ww / 2 + 1, ww / 2 + 6, Math.PI, 0); C.fill();
      M.fillStyle = NO; M.fillRect(wx - 6, wy - 6, ww + 12, wh + 12);
      const g = C.createLinearGradient(wx, wy, wx, wy + wh); g.addColorStop(0, '#6b7a86'); g.addColorStop(1, '#2a3038'); C.fillStyle = g; C.fillRect(wx, wy + ww / 2, ww, wh - ww / 2); C.beginPath(); C.arc(wx + ww / 2, wy + ww / 2 + 1, ww / 2, Math.PI, 0); C.fill();
      M.fillStyle = GL; M.fillRect(wx, wy + 2, ww, wh - 2);
    }
    // ================= extra variants (bottom band). Local cell coords: x 0..256 left->right, y 0..256 top->bottom of the floor
    const cellDo = (s, row, fn) => { const x0 = (s - 8) * CW, y0 = 4 * CW - (row + 1) * CW; C.save(); M.save(); C.translate(x0, y0); M.translate(x0, y0); C.beginPath(); C.rect(0, 0, CW, CW); C.clip(); M.beginPath(); M.rect(0, 0, CW, CW); M.clip(); fn(C, M); C.restore(); M.restore(); };
    const rc = (X, x, y, w, h, c) => { X.fillStyle = c; X.fillRect(x, y, w, h); };
    const gl = (X, Mk, x, y, w, h, tone = 0) => { const g = X.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, tone ? '#7f93a3' : '#5d6d7c'); g.addColorStop(0.5, '#27313b'); g.addColorStop(1, '#3f4b57'); X.fillStyle = g; X.fillRect(x, y, w, h); Mk.fillStyle = GL; Mk.fillRect(x, y, w, h); };
    const noTint = (Mk, x, y, w, h, v = 0) => { Mk.fillStyle = `rgb(${v},0,0)`; Mk.fillRect(x, y, w, h); };
    const shutter = (X, x, y, w, h, c) => { rc(X, x, y, w, h, c); X.fillStyle = 'rgba(0,0,0,.28)'; for (let i = 6; i < h; i += 7) X.fillRect(x + 3, y + i, w - 6, 2); X.fillStyle = 'rgba(255,255,255,.12)'; X.fillRect(x, y, 2, h); };
    // ---- 8: Canarian house B — green wooden shutters, wooden door with basalt frame
    cellDo(8, 1, (X, Mk) => { rc(X, 86, 50, 84, 150, '#4a4a46'); noTint(Mk, 80, 44, 96, 162); rc(X, 92, 56, 72, 138, '#f1efe8'); gl(X, Mk, 100, 64, 56, 122); rc(X, 126, 64, 4, 122, '#f1efe8'); rc(X, 100, 120, 56, 4, '#f1efe8');
      shutter(X, 58, 56, 30, 138, '#2f5d3a'); shutter(X, 168, 56, 30, 138, '#2f5d3a'); rc(X, 80, 196, 96, 8, '#5c5b56'); });
    cellDo(8, 0, (X, Mk) => { rc(X, 0, 222, 256, 34, '#57554f'); noTint(Mk, 0, 222, 256, 34, 40); rc(X, 74, 40, 108, 216, '#4a4944'); noTint(Mk, 70, 36, 116, 220);
      rc(X, 84, 52, 88, 204, '#5a3a20'); X.fillStyle = 'rgba(0,0,0,.35)'; X.fillRect(127, 52, 3, 204); for (const yy of [80, 140, 200]) { X.fillRect(92, yy, 30, 24); X.fillRect(134, yy, 30, 24); } X.fillStyle = '#c8a24a'; X.fillRect(120, 150, 5, 5); });
    // ---- 9: noble house — red tuff stone surrounds, balcony door with iron rail; ground arched doorway
    cellDo(9, 1, (X, Mk) => { rc(X, 78, 22, 100, 200, '#8a4a36'); noTint(Mk, 72, 16, 112, 212); rc(X, 90, 34, 76, 188, '#4f311c'); gl(X, Mk, 98, 42, 60, 172); rc(X, 126, 42, 4, 172, '#4f311c');
      rc(X, 62, 214, 132, 10, '#3d3d3d'); X.fillStyle = '#1d1d1d'; X.fillRect(64, 170, 128, 4); for (let i = 0; i < 17; i++) X.fillRect(66 + i * 7.5, 172, 2, 42); noTint(Mk, 62, 168, 132, 56, 0); rc(X, 66, 12, 124, 14, '#7a4130'); });
    cellDo(9, 0, (X, Mk) => { rc(X, 0, 226, 256, 30, '#7a4130'); noTint(Mk, 0, 226, 256, 30, 30); X.fillStyle = '#8a4a36'; X.beginPath(); X.moveTo(64, 256); X.lineTo(64, 100); X.arc(128, 100, 64, Math.PI, 0); X.lineTo(192, 256); X.fill(); noTint(Mk, 60, 30, 136, 226);
      X.fillStyle = '#2a2f35'; X.beginPath(); X.moveTo(80, 256); X.lineTo(80, 104); X.arc(128, 104, 48, Math.PI, 0); X.lineTo(176, 256); X.fill(); Mk.fillStyle = GL; Mk.fillRect(84, 70, 88, 186); X.fillStyle = 'rgba(160,200,230,.25)'; X.fillRect(84, 110, 40, 140); });
    // ---- 10: self-built house — bare concrete block, small aluminium window with bars, roll-down garage door
    { const blocks = (X, Mk, y0, y1) => { const r = mulberry(31 + y0); for (let y = y0; y < y1; y += 16) for (let x = ((y / 16) % 2) * -20; x < 256; x += 40) { const g = 150 + r() * 26; X.fillStyle = `rgb(${g},${g - 2},${g - 6})`; X.fillRect(x + 1, y + 1, 38, 14); } noTint(Mk, 0, y0, 256, y1 - y0, 0); };
      cellDo(10, 1, (X, Mk) => { blocks(X, Mk, 0, 256); rc(X, 70, 66, 116, 96, '#9ea2a6'); gl(X, Mk, 76, 72, 104, 84); rc(X, 126, 72, 4, 84, '#9ea2a6'); X.fillStyle = '#222'; for (let i = 0; i < 9; i++) X.fillRect(80 + i * 12, 68, 3, 92); rc(X, 66, 162, 124, 8, '#8a8a86'); });
      cellDo(10, 0, (X, Mk) => { blocks(X, Mk, 0, 256); rc(X, 28, 48, 200, 208, '#6f7275'); X.fillStyle = 'rgba(0,0,0,.25)'; for (let y = 52; y < 256; y += 9) X.fillRect(30, y, 196, 3); noTint(Mk, 28, 48, 200, 208, 0); rc(X, 24, 40, 208, 10, '#4c4e50'); }); }
    // ---- 11: 70s block — closed aluminium terraces + brown roller blinds; ground: metal shop shutter
    cellDo(11, 1, (X, Mk) => { rc(X, 0, 226, 256, 30, '#cfcac0'); noTint(Mk, 0, 226, 256, 30, 60); rc(X, 14, 40, 228, 186, '#b9bcbf'); noTint(Mk, 14, 40, 228, 186, 0);
      for (let i = 0; i < 4; i++) { gl(X, Mk, 20 + i * 56, 48, 50, 172, i % 2); } rc(X, 20, 48, 106, 70, '#7a5a3a'); X.fillStyle = 'rgba(0,0,0,.25)'; for (let y = 50; y < 118; y += 5) X.fillRect(20, y, 106, 1); Mk.fillStyle = NO; Mk.fillRect(20, 48, 106, 70);
      rc(X, 14, 140, 228, 5, '#9ea2a6'); });
    cellDo(11, 0, (X, Mk) => { rc(X, 0, 236, 256, 20, '#666'); rc(X, 10, 70, 236, 166, '#8c9195'); X.fillStyle = 'rgba(0,0,0,.22)'; for (let y = 74; y < 236; y += 8) X.fillRect(12, y, 232, 3); noTint(Mk, 10, 70, 236, 166, 0); rc(X, 4, 22, 248, 44, '#2a4d7a'); noTint(Mk, 4, 22, 248, 44, 0); X.fillStyle = '#f1e9d0'; for (let i = 0; i < 7; i++) X.fillRect(24 + i * 31, 36, 20, 16); });
    // ---- 12: brick 60s/70s block — red-brown brick panels, white framed windows, rendered floor band
    cellDo(12, 1, (X, Mk) => { const r = mulberry(12); for (let y = 0; y < 226; y += 10) for (let x = ((y / 10) % 2) * -12; x < 256; x += 24) { const g = r() * 22; X.fillStyle = `rgb(${150 + g},${76 + g * 0.5},${58 + g * 0.4})`; X.fillRect(x + 1, y + 1, 22, 8); } noTint(Mk, 0, 0, 256, 226, 0);
      rc(X, 0, 226, 256, 30, '#e8e3d8'); rc(X, 64, 46, 128, 150, '#f2f2ee'); noTint(Mk, 60, 42, 136, 158, 0); gl(X, Mk, 72, 54, 112, 134); rc(X, 126, 54, 4, 134, '#f2f2ee'); rc(X, 72, 54, 112, 40, '#d8d0bf'); X.fillStyle = 'rgba(0,0,0,.18)'; for (let y = 56; y < 94; y += 5) X.fillRect(72, y, 112, 1); Mk.fillStyle = NO; Mk.fillRect(72, 54, 112, 40); });
    cellDo(12, 0, (X, Mk) => { rc(X, 0, 236, 256, 20, '#5f5f5f'); rc(X, 16, 60, 224, 176, '#33373b'); gl(X, Mk, 22, 66, 212, 166); rc(X, 126, 66, 4, 166, '#33373b'); rc(X, 10, 18, 236, 36, '#8a2a24'); noTint(Mk, 10, 18, 236, 36, 0); X.fillStyle = '#f6edd8'; for (let i = 0; i < 6; i++) X.fillRect(30 + i * 34, 28, 22, 16); });
    // ---- 13: 2000s block — big window, glass railing, grey frames; ground: lobby / garage
    cellDo(13, 1, (X, Mk) => { rc(X, 20, 20, 216, 206, '#5c6066'); noTint(Mk, 20, 20, 216, 206, 0); gl(X, Mk, 26, 26, 204, 194, 1); rc(X, 126, 26, 4, 194, '#5c6066'); rc(X, 0, 226, 256, 14, '#d8d8d4'); noTint(Mk, 0, 226, 256, 14, 0);
      X.fillStyle = 'rgba(190,225,235,.45)'; X.fillRect(12, 150, 232, 76); Mk.fillStyle = 'rgb(0,120,0)'; Mk.fillRect(12, 150, 232, 76); rc(X, 12, 148, 232, 4, '#c9cdd0'); });
    cellDo(13, 0, (X, Mk) => { rc(X, 0, 0, 256, 256, '#bfc2c4'); noTint(Mk, 0, 0, 256, 256, 30); rc(X, 30, 40, 196, 216, '#3b3f44'); gl(X, Mk, 36, 46, 184, 210, 1); rc(X, 126, 46, 4, 210, '#3b3f44'); });
    // ---- 14: industrial B — blue corrugated cladding, roll-up loading door
    cellDo(14, 1, (X, Mk) => { for (let x = 0; x < 256; x += 8) { rc(X, x, 0, 4, 256, 'rgba(0,0,0,.1)'); rc(X, x + 4, 0, 2, 256, 'rgba(255,255,255,.08)'); } rc(X, 0, 200, 256, 8, 'rgba(0,0,0,.15)'); });
    cellDo(14, 0, (X, Mk) => { for (let x = 0; x < 256; x += 8) rc(X, x, 0, 4, 256, 'rgba(0,0,0,.1)'); rc(X, 40, 30, 176, 226, '#9aa0a4'); X.fillStyle = 'rgba(0,0,0,.22)'; for (let y = 34; y < 256; y += 8) X.fillRect(42, y, 172, 3); noTint(Mk, 40, 30, 176, 226, 0); rc(X, 36, 22, 184, 10, '#e2b400'); noTint(Mk, 36, 22, 184, 10, 0); });
    // ---- 15: university / public 80s-2000s — concrete grid with vertical sun fins
    cellDo(15, 1, (X, Mk) => { rc(X, 0, 0, 256, 256, '#cfccc4'); noTint(Mk, 0, 0, 256, 256, 70); gl(X, Mk, 0, 40, 256, 160, 1); for (const x of [0, 64, 128, 192]) { rc(X, x, 30, 20, 190, '#dcd9d1'); Mk.fillStyle = 'rgb(60,0,0)'; Mk.fillRect(x, 30, 20, 190); X.fillStyle = 'rgba(0,0,0,.18)'; X.fillRect(x + 20, 30, 5, 190); } rc(X, 0, 200, 256, 20, '#bdb9b0'); });
    cellDo(15, 0, (X, Mk) => { rc(X, 0, 0, 256, 256, '#bdb9b0'); noTint(Mk, 0, 0, 256, 256, 70); rc(X, 0, 30, 256, 226, '#2e3338'); gl(X, Mk, 6, 36, 244, 220, 1); for (const x of [0, 128]) rc(X, x, 30, 10, 226, '#bdb9b0'); });
    // ---- 16 -> stored at s=8 band? (no) : regionalist style lives in column 7 of the top band
    { const s = 7; // regionalist (Campus Central, Teatro, Mercado): cream, dark wooden balcony window, arched ground floor
      R(s, 1, 0.3, 0.12, 0.7, 0.86, '#9c8a6a', NO); R(s, 1, 0.34, 0.16, 0.66, 0.84, '#4a2e1a', NO); glass(s, 1, 0.37, 0.19, 0.63, 0.8);
      C.fillStyle = '#3a2414'; C.fillRect(s * CW + 0.26 * CW, CW - 0.4 * CW, 0.48 * CW, 0.24 * CW); C.fillStyle = '#6d4526'; for (let i = 0; i < 12; i++) C.fillRect(s * CW + (0.27 + i * 0.04) * CW, CW - 0.38 * CW, 5, 0.2 * CW);
      M.fillStyle = NO; M.fillRect(s * CW + 0.26 * CW, CW - 0.4 * CW, 0.48 * CW, 0.24 * CW);
      R(s, 1, 0, 0.94, 1, 1, '#d9cdb2', NO);
      C.fillStyle = '#b8aa8a'; C.beginPath(); C.moveTo(s * CW + 0.22 * CW, 2 * CW); C.lineTo(s * CW + 0.22 * CW, 2 * CW - 0.62 * CW); C.arc(s * CW + 0.5 * CW, 2 * CW - 0.62 * CW, 0.28 * CW, Math.PI, 0); C.lineTo(s * CW + 0.78 * CW, 2 * CW); C.fill(); M.fillStyle = NO; M.fillRect(s * CW + 0.2 * CW, 2 * CW - 0.92 * CW, 0.6 * CW, 0.92 * CW);
      C.fillStyle = '#2a2f35'; C.beginPath(); C.moveTo(s * CW + 0.28 * CW, 2 * CW); C.lineTo(s * CW + 0.28 * CW, 2 * CW - 0.6 * CW); C.arc(s * CW + 0.5 * CW, 2 * CW - 0.6 * CW, 0.22 * CW, Math.PI, 0); C.lineTo(s * CW + 0.72 * CW, 2 * CW); C.fill(); M.fillStyle = GL; M.fillRect(s * CW + 0.3 * CW, 2 * CW - 0.8 * CW, 0.4 * CW, 0.8 * CW);
      R(s, 0, 0, 0, 1, 0.12, '#8d8270', NO); }
    TEX.facade = canvasTex(col); TEX.facadeMask = canvasTex(msk, { srgb: false });
    TEX.facadeMask.generateMipmaps = true;
  }
})();

// wooden Canarian balcony front (u across, v up; 1 tile = 1.2m wide x 1m)
{
  const c = mkCanvas(128, 128), x = c.getContext('2d');
  x.fillStyle = '#3d2413'; x.fillRect(0, 0, 128, 128);
  x.fillStyle = '#5b3a20'; x.fillRect(0, 0, 128, 14); x.fillRect(0, 112, 128, 16);
  for (let i = 0; i < 8; i++) { const bx = 6 + i * 16; const g = x.createLinearGradient(bx, 0, bx + 9, 0); g.addColorStop(0, '#6d4526'); g.addColorStop(0.5, '#8a5a33'); g.addColorStop(1, '#5a381e'); x.fillStyle = g; x.fillRect(bx, 14, 9, 98); x.fillStyle = '#4a2c16'; x.fillRect(bx - 1, 40, 11, 4); x.fillRect(bx - 1, 84, 11, 4); }
  TEX.balcony = canvasTex(c);
  const w = mkCanvas(64, 64), y = w.getContext('2d'); noiseFill(y, 64, 64, [92, 58, 32], 22, 91, 1); for (let i = 0; i < 64; i += 8) { y.fillStyle = 'rgba(40,20,10,.5)'; y.fillRect(0, i, 64, 1); }
  TEX.wood = canvasTex(w);
}
// facade style dims: [bayWidth, floorHeight]
const FSTY = [[4.2, 3.6], [3.5, 3.1], [3.2, 3.0], [6.0, 4.0], [3.6, 3.4], [3.0, 3.0], [6.5, 5.5], [4.4, 4.2], [3.8, 3.5], [4.6, 3.9], [3.4, 2.9], [3.6, 3.0], [3.0, 3.0], [3.9, 3.1], [6.0, 4.2], [3.2, 3.7]];
// real plaster detail (Poly Haven, CC0): R/G/B = stucco liso, enlucido pintado, enlucido gastado; normals packed in two images
const PLASTER = { on: { value: 0 }, det: null, n1: null, n2: null };
(function loadPlaster() {
  const P = DATA.PLASTER; if (!P) return; let left = 3;
  const mk = (src) => { const t = new THREE.Texture(); const im = new Image(); im.onload = () => { t.image = im; t.needsUpdate = true; if (--left === 0) PLASTER.on.value = 1; }; im.src = src;
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.NoColorSpace; t.anisotropy = 4; return t; };
  PLASTER.det = mk(P[0]); PLASTER.n1 = mk(P[1]); PLASTER.n2 = mk(P[2]);
})();
