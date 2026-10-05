// ============ footsteps: pre-rendered procedural samples + sync with the animation ============
// Each step = heel strike + ball/toe slap (two impacts), built from damped resonant modes (shoe sole + ground)
// plus a filtered noise transient and a scuff. Several variants per surface and gait, rendered once into
// AudioBuffers (cheap to play, no repetition). Synced to the real foot contacts of the skinned animation.
const STEPS = (() => {
  let ctx = null, out = null, verbSend = null, verb = null, bank = null, verbKind = '', lastIdx = {};
  const R = (a, b) => a + Math.random() * (b - a);

  // --- tiny DSP helpers on Float32Array ---
  function addModes(d, sr, t0, amp, modes) {
    const i0 = Math.floor(t0 * sr);
    for (const [f, dec, a] of modes) {
      const ff = f * R(0.9, 1.1), k = Math.exp(-1 / (dec * R(0.85, 1.15) * sr)), w = 2 * Math.PI * ff / sr, ph = Math.random() * 6.28;
      let e = amp * a; const n = Math.min(d.length - i0, Math.floor(dec * 7 * sr));
      for (let i = 0; i < n; i++) { const att = i < 24 ? i / 24 : 1; d[i0 + i] += e * att * Math.sin(w * i + ph); e *= k; }
    }
  }
  // noise burst: one-pole high-pass then low-pass, exponential decay
  function addNoise(d, sr, t0, amp, dec, hp, lp, attack = 0.0015) {
    const i0 = Math.floor(t0 * sr), n = Math.min(d.length - i0, Math.floor(dec * 7 * sr)); const k = Math.exp(-1 / (dec * sr));
    const ah = Math.exp(-2 * Math.PI * hp / sr), al = 1 - Math.exp(-2 * Math.PI * lp / sr); let xp = 0, yh = 0, yl = 0, e = amp; const na = Math.max(1, attack * sr);
    for (let i = 0; i < n; i++) { const x = Math.random() * 2 - 1; yh = ah * (yh + x - xp); xp = x; yl += al * (yh - yl); d[i0 + i] += yl * e * Math.min(1, i / na); if (i > na) e *= k; }
  }
  // grit / crunch: many micro clicks spread over a window
  function addGrains(d, sr, t0, len, count, amp, hp, lp) {
    for (let g = 0; g < count; g++) { const u = Math.random(); const t = t0 + len * Math.pow(u, 1.6); const env = Math.pow(1 - u, 0.7); addNoise(d, sr, t, amp * env * R(0.3, 1), R(0.0006, 0.0025), hp * R(0.8, 1.2), lp * R(0.8, 1.2), 0.0002); }
  }
  function normalize(d, peak = 0.9) { let m = 0; for (let i = 0; i < d.length; i++) m = Math.max(m, Math.abs(d[i])); if (m > 0) { const k = peak / m; for (let i = 0; i < d.length; i++) d[i] *= k; }
    const f = Math.floor(0.004 * 48000); for (let i = 0; i < f && i < d.length; i++) d[d.length - 1 - i] *= i / f; }

  // one impact (heel or toe) on a given surface
  const SURF = {
    // asphalt / pavement: firm rubber sole, dull knock + short gritty click
    hard: { modes: [[105, 0.013, 0.55], [240, 0.009, 0.35], [520, 0.006, 0.25], [1350, 0.003, 0.18]], click: [0.55, 0.004, 1400, 7000], grit: [14, 0.35, 2500, 9000], scuff: [0.06, 0.05, 500, 3000] },
    // basalt cobbles / flagstones of the historic centre: harder, ringing stone knock
    stone: { modes: [[150, 0.012, 0.45], [430, 0.01, 0.35], [980, 0.007, 0.3], [2150, 0.004, 0.22], [3900, 0.0025, 0.14]], click: [0.8, 0.003, 1800, 9000], grit: [22, 0.45, 3000, 10000], scuff: [0.08, 0.045, 700, 4000] },
    // indoor tiles: bright clack
    tile: { modes: [[180, 0.011, 0.4], [620, 0.009, 0.35], [1600, 0.006, 0.3], [3300, 0.0035, 0.2]], click: [0.9, 0.0025, 2200, 11000], grit: [4, 0.2, 3000, 9000], scuff: [0.04, 0.05, 900, 5000] },
    // grass / earth: soft thud + crunchy rustle
    soft: { modes: [[70, 0.03, 0.5], [150, 0.02, 0.2]], click: [0.12, 0.006, 300, 1800], grit: [70, 0.5, 1800, 6500], scuff: [0.22, 0.09, 300, 2500], soft: true },
    // metal deck / grating (bridges, footbridges)
    metal: { modes: [[190, 0.05, 0.4], [470, 0.04, 0.35], [1130, 0.03, 0.3], [2470, 0.02, 0.25]], click: [0.6, 0.003, 1500, 8000], grit: [6, 0.25, 2500, 8000], scuff: [0.05, 0.05, 600, 3500] },
  };
  function impact(d, sr, t0, amp, S) {
    addModes(d, sr, t0, amp, S.modes);
    const [ca, cd, chp, clp] = S.click; addNoise(d, sr, t0, amp * ca, cd, chp, clp);
    const [gn, ga, ghp, glp] = S.grit; addGrains(d, sr, t0 + 0.001, S.soft ? 0.12 : 0.03, Math.round(gn * R(0.7, 1.3) * (amp > 0.8 ? 1 : 0.7)), amp * ga * 0.25, ghp, glp);
  }
  function renderStep(sr, S, gait) {
    // walk: heel, roll, toe 75-105 ms later; run: forefoot strike, both almost together and harder
    const run = gait === 'run', len = run ? 0.22 : 0.28; const d = new Float32Array(Math.floor(len * sr));
    const t0 = 0.002, gap = run ? R(0.012, 0.03) : R(0.075, 0.105);
    impact(d, sr, t0, run ? R(0.7, 0.85) : 1.0, S);
    impact(d, sr, t0 + gap, run ? 1.0 : R(0.3, 0.42), S);
    const [sa, sd, shp, slp] = S.scuff; addNoise(d, sr, t0 + gap * 0.4, sa * (run ? 1.2 : 0.8), sd * (run ? 0.7 : 0.9), shp, slp, 0.02);
    normalize(d); return d;
  }
  function makeIR(sec, decay, bright) {
    const sr = ctx.sampleRate, n = Math.floor(sec * sr), b = ctx.createBuffer(2, n, sr);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); let yl = 0; const al = 1 - Math.exp(-2 * Math.PI * bright / sr);
      for (let i = 0; i < n; i++) { const t = i / sr; yl += al * ((Math.random() * 2 - 1) - yl); d[i] = yl * Math.exp(-t * decay) * (i < sr * 0.008 ? 0 : 1); } }
    return b;
  }
  const IRS = {};
  function init(audioCtx, dest) {
    if (ctx || !audioCtx) return; ctx = audioCtx; const sr = ctx.sampleRate;
    out = ctx.createGain(); out.gain.value = 1; out.connect(dest);
    verb = ctx.createConvolver(); verbSend = ctx.createGain(); verbSend.gain.value = 0; verbSend.connect(verb); verb.connect(dest);
    IRS.tunnel = makeIR(1.6, 3.2, 3500); IRS.room = makeIR(0.45, 9, 5000); IRS.park = makeIR(1.1, 4.2, 3000);
    bank = {}; for (const s in SURF) { bank[s] = {}; for (const g of ['walk', 'run']) { bank[s][g] = []; for (let v = 0; v < 6; v++) { const d = renderStep(sr, SURF[s], g); const b = ctx.createBuffer(1, d.length, sr); b.getChannelData(0).set(d); bank[s][g].push(b); } } }
  }
  function setSpace(kind) { // '' (open air) | 'tunnel' | 'room' | 'park'
    if (!ctx || kind === verbKind) return; verbKind = kind;
    if (kind) { verb.buffer = IRS[kind]; verbSend.gain.setTargetAtTime(kind === 'tunnel' ? 0.5 : kind === 'park' ? 0.4 : 0.22, ctx.currentTime, 0.05); }
    else verbSend.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
  }
  let side = 1;
  function play(surface, gait, vol = 1, pan = null) {
    if (!ctx || !bank) return; const list = (bank[surface] || bank.hard)[gait] || bank.hard.walk;
    const key = surface + gait; let i = Math.floor(Math.random() * list.length); if (i === lastIdx[key]) i = (i + 1) % list.length; lastIdx[key] = i;
    const t = ctx.currentTime, s = ctx.createBufferSource(); s.buffer = list[i]; s.playbackRate.value = R(0.94, 1.06);
    const g = ctx.createGain(); g.gain.value = vol * (gait === 'run' ? 0.11 : 0.07) * R(0.85, 1.1);
    side = -side; let node = g;
    if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan ?? side * 0.12; g.connect(p); node = p; }
    s.connect(g); node.connect(out); node.connect(verbSend); s.start(t);
  }
  return { init, play, setSpace, get ready() { return !!bank; } };
})();

// --- foot-contact detector for skinned humans: fires when a foot comes down to the ground ---
// Tracks each ankle's height relative to the character root; adaptive min/max per foot so it works for
// walk, jog and sprint clips and any playback speed. Fires when the falling foot brakes sharply in the lower
// half of its range (heel strike / forefoot plant); re-arms once the foot is lifted again.
const _fv = new THREE.Vector3(), _rv = new THREE.Vector3();
function footContacts(H, dt, cb, active = true) {
  if (!H || !H.skinned) return false;
  if (!H.feet) { const bs = H.skeleton.bones; H.feet = ['l', 'r'].map((n) => ({ b: bs.find((x) => x.name === 'foot_' + n), lo: 1e9, hi: -1e9, armed: false, prev: null })); if (H.feet.some((f) => !f.b)) { H.feet = null; return false; } }
  if (!active) { for (const f of H.feet) { f.prev = null; f.armed = false; f.hi = -1e9; } return false; }
  H.root.updateMatrixWorld(true); _rv.setFromMatrixPosition(H.root.matrixWorld);
  let fired = false;
  for (const f of H.feet) {
    f.b.getWorldPosition(_fv); let h = _fv.y - _rv.y;
    // slowly forget old extremes (gait changes)
    f.lo = Math.min(h, f.lo + dt * 0.015); f.hi = Math.max(h, f.hi - dt * 0.6);
    const rng = f.hi - f.lo;
    if (rng > 0.035 && f.prev !== null && dt > 0) {
      // contact = the falling foot brakes sharply near the ground (heel strike / forefoot plant)
      const v = (h - f.prev) / dt;
      f.cool = Math.max(0, (f.cool || 0) - dt);
      if (f.armed) { f.vmin = Math.min(f.vmin, v); if (h < f.lo + rng * 0.5 && f.vmin < -0.25 && v > f.vmin * 0.3) { f.armed = false; f.cool = 0.22; fired = true; cb(f === H.feet[0] ? -1 : 1); } }
      else if (f.cool <= 0 && h > f.lo + Math.max(0.1, rng * 0.4)) { f.armed = true; f.vmin = 0; }
    }
    f.prev = h;
  }
  return fired;
}
