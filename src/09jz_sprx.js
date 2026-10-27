// ============ SPRX (v0.93): draws the sheets of SPRX_DATA (the new characters of Bencomo and Guanche Guarriors) ============
// Each sheet is a grid of frames (fw × fh), one animation per row; for the people of the GandalfHardcore packs the rows
// are 0 idle, 1 walk, 2 run, 3 jump (going up), 4 jump (coming down), 5 attack, 6 death (+ extra rows per sheet).
// (ax, ay) is the point of the frame that goes on the feet; dir is where the drawing looks (1 right, -1 left), and the
// mirrored copy is made once. If the image has not loaded yet draw() returns false and the game draws its old figure.
const SPRX = (() => {
  const D = SPRX_DATA, IM = {}, MIR = {};
  function img(k) { let im = IM[k]; if (!im) { im = IM[k] = new Image(); im.src = D[k].src; } return im.complete && im.naturalWidth ? im : null; }
  function mirrored(k, im) { let m = MIR[k]; if (m) return m; const d = D[k], cols = Math.max(...d.n);
    m = MIR[k] = document.createElement('canvas'); m.width = im.width; m.height = im.height; const c = m.getContext('2d');
    // each frame flipped in its own cell (the columns keep their order)
    for (let i = 0; i < cols; i++) { c.save(); c.translate((i + 1) * d.fw, 0); c.scale(-1, 1); c.drawImage(im, i * d.fw, 0, d.fw, im.height, 0, 0, d.fw, im.height); c.restore(); }
    return m; }
  /** frame f of row r of sheet k with its feet at (x, y) in the current transform; s = the size of one pixel of the
   *  sheet; face = 1 looking right, -1 left; clipY: draw only what is above this y (a rider on a mount) */
  function draw(c, k, r, f, x, y, face, s = 1, clipY = null) { const d = D[k]; if (!d) return false; const im = img(k); if (!im) return false;
    r = Math.min(r, d.n.length - 1); const n = d.n[r] || 1; f = ((Math.floor(f) % n) + n) % n;
    const flip = (face < 0 ? -1 : 1) !== d.dir, src = flip ? mirrored(k, im) : im, ax = flip ? d.fw - d.ax : d.ax;
    const dx = x - ax * s, dy = y - d.ay * s;
    if (clipY !== null) { c.save(); c.beginPath(); c.rect(dx - 2, dy - 2, d.fw * s + 4, clipY - dy + 2); c.clip(); }
    const sm = c.imageSmoothingEnabled; c.imageSmoothingEnabled = false;
    c.drawImage(src, f * d.fw, r * d.fh, d.fw, d.fh, dx, dy, d.fw * s, d.fh * s);
    c.imageSmoothingEnabled = sm; if (clipY !== null) c.restore(); return true; }
  /** the frame of row r of sheet k after t seconds at fps frames a second (looping, or stopping on the last one) */
  const fr = (k, r, t, fps = 10, loop = true) => { const d = D[k]; if (!d) return 0; const n = d.n[Math.min(r, d.n.length - 1)] || 1, i = Math.floor(t * fps); return loop ? i % n : Math.min(n - 1, i); };
  /** the time an actor has been in its current state (the games keep o.st; this keeps the clock) */
  function stT(o, now) { if (o._sxSt !== o.st) { o._sxSt = o.st; o._sxT = now; } return now - o._sxT; }
  return { draw, fr, stT, has: (k) => !!D[k], D, ready: (k) => !!(D[k] && img(k)) };
})();
