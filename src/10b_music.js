// ============ RADIO: procedural 90s/2000s hip hop, made up on the spot (beats, bass, keys, G-funk whistles, scratches, ad-libs)
// Plays on the car radio (Q / tap the speedometer changes station) and a short chorus when a mission is done.
const MUSIC = (() => {
  const STATIONS = [
    { name: 'Gofio FM 90.1', tag: 'boom bap lagunero', bpm: 88, swing: 0.16, style: 'boombap' },
    { name: 'Radio Aguere 96.6', tag: 'G-funk guanche', bpm: 94, swing: 0.1, style: 'gfunk' },
    { name: 'Mojo Picón 102.3', tag: 'rap duro canario', bpm: 97, swing: 0.06, style: 'hard' },
    { name: 'Radio apagada', off: true },
  ];
  const ADLIBS = { boombap: ['Yeah!', 'Uh!', 'Check it!', 'Aguere!', 'Lagoon City!', 'One, two'], gfunk: ['Yeah, yeah', 'Uh huh', 'Smooth', 'West side island', 'Oh yeah', 'Take it slow'], hard: ['Hey! Hey!', 'Uh!', 'Turn it up!', 'Make some noise!', 'Mojo!', 'Let’s go!'] };
  // ---------- lyrics (original, made up for the game): rhyme groups, hooks per station
  const RHYMES = {
    ay: ['Rolling through the old town at the break of day', 'Palm trees swaying, yeah, we here to stay', 'Every block I walk, I keep finding my way', 'Mama used to tell me, boy, don’t go astray', 'Northern wind blowing all the clouds away', 'Got the whole crew with me, ain’t no other way', 'Second chance in life and I ain’t gonna play', 'Cobblestones talking about the things they say'],
    ight: ['Fog on the mountain, city lights at night', 'Streetlamps flicker with a yellow light', 'Came out the cell and now I’m living right', 'Chopa on the mic and the rhymes are tight', 'Tram rolling by, catch it if you might', 'Teide in the distance standing in the light', 'Little bit of trouble but we hold it tight', 'Every single bar is a fist in the fight'],
    own: ['Lagoon City, yeah, the realest in the town', 'Plaza full of laurels, never wear a frown', 'Cobblestone streets where the legends get down', 'From La Cuesta up to Taco, we hold it down', 'Old cathedral bells making that sound', 'Island royalty, no need for a crown', 'Spinning on the vinyl going round and round', 'Feet on the island, head above the ground'],
    eet: ['Gofio in my blood and a bassline in my feet', 'Rolling with my homies down Herradores street', 'Barraquito morning, yeah, that coffee hit sweet', 'Every single verse got a heavy heartbeat', 'Police rolling by but we never miss a beat', 'From the plaza to the market, now the circle is complete', 'Sun on the windshield and it’s burning up the seat', 'Never had a lot but we never took defeat'],
    ame: ['Big nose Chopa, everybody knows the name', 'Out of the shadows and I’m back in the game', 'Island in the ocean but the hustle is the same', 'Blanco on the corner with the steadiest aim', 'Rain on the windows but we never take the blame', 'Every day is different but the love remains the same', 'Nobody gave me nothing, man, I came for the fame', 'Boca Papa talking, man, he never feel the shame'],
    ow: ['Driving through the Trinidad nice and slow', 'Windows rolling down and let the music flow', 'Where the mountain meets the sea, that’s all I know', 'Little island but we putting on a show', 'Gofio radio, turn it up and let it go', 'From the north to the south they can feel the glow', 'Plant a little seed and you watch it grow', 'Night falls on the city with a purple glow'],
  };
  Object.assign(RHYMES, {
    eal: ['Gofio and a mojo, man, that’s a proper meal', 'Every word I’m saying, yeah, you know it’s real', 'Hands on the wheel and the bass you can feel', 'Never been a saint but I’m learning how to heal', 'Island on my back like a heavy steel', 'Grandma in the kitchen with the love and the zeal', 'Took a second chance like a brand new deal', 'Spinning like the wind on a windmill wheel'],
    ack: ['Rolling down the hill with the sun on my back', 'Old school beat on a cassette track', 'Never looking down, never looking back', 'Crew on the corner and we holding the pack', 'Tram on the rail and the tram on the track', 'Mountain in the fog wearing a hat of black', 'Every little rhyme got a heavy impact', 'Lost a lot of years, now I’m taking them back'],
    ace: ['Laurel trees shading the old town place', 'Cobblestone rhythm keeping up the pace', 'Every single neighbour got a smile on the face', 'Island in the sea, yeah, a beautiful space', 'Running from the past but it ain’t no race', 'Wind from the north giving cold embrace', 'Leave a little mark, never leave a trace', 'Grew up on the block, man, I know this place'],
    ore: ['Waves on the rocks of the northern shore', 'Knocking on the dream like a wooden door', 'Every single round I am back for more', 'Dancing at the fiesta on the plaza floor', 'Pockets full of nothing but my heart is sure', 'Telling you the stories of the days before', 'Bells of the cathedral ringing out at four', 'Lagoon City, baby, what you waiting for'],
  });
  const HOOKS = {
    boombap: [['From Aguere to the world, yeah, we keeping it real', 'La Laguna in the house, you know how we feel'], ['Gofio in the veins and the drum in the chest', 'Island to the bone, yeah, we better than the rest']],
    gfunk: [['Cruising down the avenue with the sun in my face', 'Take it slow, my friend, this is our place'], ['Windows rolling down on the boulevard', 'Laguna nights, baby, living large']],
    hard: [['Mojo on the tongue, yeah, we bringing the heat', 'Island to the bone, hear the drums in the street'], ['Loud, loud, let the whole block know', 'Rocks in the rhymes and we hitting them slow']],
  };
  // 20 songs (titles and fictional artists made up for the game), spread over the music stations; every song has its
  // own voice (one of the browser's English voices, plus its own pitch and pace) and always the same beat and verses
  const PLAYLIST = [
    // Gofio FM — boom bap
    { st: 0, t: 'Aguere Rise', a: 'MC Guanchito', g: ['ay', 'own', 'eet', 'ack'], h: ['From Aguere to the world, yeah, we keeping it real', 'La Laguna in the house, you know how we feel'], v: 0, p: 0.75, r: 1 },
    { st: 0, t: 'Cobblestone Diaries', a: 'Lil Barraquito', g: ['ace', 'eet', 'ight', 'ore'], h: ['Cobblestone diaries, every page a street', 'Old town stories with a boom bap beat'], v: 1, p: 0.95, r: 1.05 },
    { st: 0, t: 'Second Chance', a: 'El Chopa ft. Boca Papa', g: ['ame', 'ack', 'eal', 'ay'], h: ['Second chance, yeah, I’m never going back', 'Brand new page and I’m staying on track'], v: 2, p: 0.68, r: 0.95 },
    { st: 0, t: 'Gofio in the Veins', a: 'DJ Millo', g: ['eet', 'eal', 'own', 'ight'], h: ['Gofio in the veins and the drum in the chest', 'Island to the bone, yeah, we better than the rest'], v: 3, p: 0.85, r: 1.1 },
    { st: 0, t: 'Northern Wind', a: 'Tabaiba Crew', g: ['ow', 'ore', 'ay', 'ace'], h: ['Northern wind is blowing, can you hear it call', 'Standing on the hill, we will never fall'], v: 4, p: 1.0, r: 1 },
    { st: 0, t: 'Herradores Street', a: 'Los Sobrinos de Aguere', g: ['eet', 'ace', 'ack', 'own'], h: ['Down on Herradores where the legends meet', 'Every single corner got a story and a beat'], v: 5, p: 0.8, r: 1.05 },
    { st: 0, t: 'Plaza Nights', a: 'MC Laurel', g: ['ight', 'ore', 'ame', 'ow'], h: ['Plaza nights and the laurels in the breeze', 'City sleeping, we’re the kings of the streets'], v: 6, p: 0.9, r: 0.95 },
    // Radio Aguere — G-funk / funk / R&B
    { st: 1, t: 'Cruising Trinidad', a: 'Smooth Mencey', g: ['ow', 'ay', 'ight', 'ace'], h: ['Cruising down the avenue with the sun in my face', 'Take it slow, my friend, this is our place'], v: 7, p: 1.05, r: 0.9 },
    { st: 1, t: 'Laguna Nights', a: 'Guayota & The Funk', g: ['ight', 'own', 'eal', 'ore'], h: ['Windows rolling down on the boulevard', 'Laguna nights, baby, living large'], v: 0, p: 1.15, r: 0.92 },
    { st: 1, t: 'Purple Teide', a: 'Lady Tajinaste', g: ['ow', 'ace', 'ay', 'eal'], h: ['Purple Teide sleeping in the evening glow', 'Baby, hold my hand and we can take it slow'], v: 1, p: 1.25, r: 0.88 },
    { st: 1, t: 'Mojo Groove', a: 'Papa Arrugá', g: ['eet', 'ow', 'ack', 'ight'], h: ['Mojo groove, let it move, let it slide', 'Funky on the island, come along for the ride'], v: 2, p: 0.9, r: 0.95 },
    { st: 1, t: 'Fog on the Mountain', a: 'Soul de la Mercedes', g: ['ight', 'ore', 'ow', 'own'], h: ['Fog on the mountain and the lights down low', 'Sweet soul music on the radio'], v: 3, p: 1.1, r: 0.85 },
    { st: 1, t: 'Sunday at the Market', a: 'R&B Barranco', g: ['ay', 'eet', 'ace', 'eal'], h: ['Sunday at the market and the sun is out', 'That’s what this island is all about'], v: 4, p: 1.2, r: 0.9 },
    { st: 1, t: 'Slow Ride Tacoronte', a: 'The Cumbre Funk Band', g: ['ow', 'ack', 'ame', 'ore'], h: ['Slow ride, slow ride, all the way to the sea', 'Funky little island, it’s just you and me'], v: 5, p: 0.95, r: 0.88 },
    // Mojo Picón — hard rap
    { st: 2, t: 'Mojo Heat', a: 'Picón Gang', g: ['ame', 'eet', 'ight', 'ack'], h: ['Mojo on the tongue, yeah, we bringing the heat', 'Island to the bone, hear the drums in the street'], v: 6, p: 0.62, r: 1.1 },
    { st: 2, t: 'Loud on the Block', a: 'Malpaís', g: ['ack', 'ame', 'eal', 'ay'], h: ['Loud, loud, let the whole block know', 'Rocks in the rhymes and we hitting them slow'], v: 7, p: 0.7, r: 1.15 },
    { st: 2, t: 'Basalt', a: 'Kid Volcán', g: ['ore', 'ight', 'ack', 'own'], h: ['Hard like basalt, hot like the core', 'Every time I fall I come back for more'], v: 0, p: 0.6, r: 1.05 },
    { st: 2, t: 'No Turning Back', a: 'Los Lunes de Taco', g: ['ack', 'eet', 'ame', 'ace'], h: ['No turning back, no turning around', 'Feet on the island, head off the ground'], v: 1, p: 0.66, r: 1.12 },
    { st: 2, t: 'Siege of the Plaza', a: 'Menceyato', g: ['ame', 'ore', 'ight', 'eal'], h: ['Siege of the plaza, hear the war drum roll', 'Island warriors with the fire in the soul'], v: 2, p: 0.58, r: 1.08 },
    { st: 2, t: 'Mic Check Aguere', a: 'Gánigo Records All Stars', g: ['eet', 'ack', 'ay', 'own'], h: ['Mic check, mic check, Aguere in the place', 'Hard rhymes coming at you face to face'], v: 3, p: 0.72, r: 1.18 },
  ];
  const GROUPS = { boombap: ['ay', 'own', 'eet', 'ight'], gfunk: ['ow', 'ay', 'ight', 'own'], hard: ['ame', 'eet', 'ight', 'ay'] };
  const BARS = 40;
  function writeLyrics(style, R, song) {
    const used = new Set(); const groups = song ? song.g : GROUPS[style];
    // each verse takes couplets from the song's rhyme groups without repeating a line inside the song
    const verse = () => { const out = []; const gs = groups.slice().sort(() => R() - 0.5); for (let c = 0; c < 4; c++) { const g = RHYMES[gs[c % gs.length]].filter((l) => !used.has(l)).sort(() => R() - 0.5); const a = g[0] || RHYMES[gs[0]][0], b = g[1] || RHYMES[gs[0]][1]; used.add(a); used.add(b); out.push(a, b); } return out; };
    const hook = song ? song.h : HOOKS[style][Math.floor(R() * HOOKS[style].length)]; const L = new Array(BARS).fill(null);
    // bars: 0-1 intro, 2-9 verse 1, 10-13 hook, 14-21 verse 2, 22-25 hook, 26-33 verse 3, 34-37 hook, 38-39 outro
    const v = [verse(), verse(), verse()]; [2, 14, 26].forEach((b0, n) => { for (let i = 0; i < 8; i++) L[b0 + i] = v[n][i]; }); for (const b0 of [10, 22, 34]) for (let i = 0; i < 4; i++) L[b0 + i] = { hook: hook[i % 2] };
    return L; }
  let rapVoice = null, VOICES = [];
  function pickVoice() { try { const vs = window.speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang)); VOICES = vs; rapVoice = vs.find((v) => /david|mark|guy|daniel|fred|alex|george|ryan|male|man/i.test(v.name) && /en-US/i.test(v.lang)) || vs.find((v) => /david|mark|guy|daniel|fred|alex|george|ryan|male/i.test(v.name)) || vs.find((v) => /en-US/i.test(v.lang)) || vs[0] || null; } catch (e) { } }
  if (window.speechSynthesis) { pickVoice(); window.speechSynthesis.onvoiceschanged = pickVoice; }
  // speak one line so it fills about one bar (rate from a syllable estimate)
  function rap(line, barDur) { try { if (!window.speechSynthesis || FIGHT2D.running) return; const hook = typeof line === 'object'; const text = hook ? line.hook : line; const syl = (text.toLowerCase().replace(/e\b/g, '').match(/[aeiouy]+/g) || []).length;
      const so = song && song.def; const vo = so && VOICES.length ? VOICES[so.v % VOICES.length] : rapVoice;
      const u = new SpeechSynthesisUtterance(text); u.lang = vo ? vo.lang : 'en-US'; if (vo) u.voice = vo; u.rate = clamp(syl / (barDur * 4.6) * (so ? so.r : 1), 0.9, 1.6); u.pitch = so ? so.p + (hook ? 0.12 : 0) : hook ? 0.9 : 0.72; u.volume = 0.9 * (SETTINGS.music ?? 1);
      window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); } catch (e) { } }
  let ctx = null, bus = null, comp = null, lp = null, st = 0, on = false, timer = null, step = 0, nextT = 0, bar = 0, song = null, rng = Math.random, duck = 1, playing = false, wantOn = false, scratchBuf = null;
  const N = (m) => 440 * Math.pow(2, (m - 69) / 12);
  // ---------- song generator (a new tune every 32 bars)
  // each station plays its songs in turn (shuffled once); a song keeps its beat and verses every time (seed from its title)
  const QUEUE = {}, QI = {};
  function nextDef(stIdx) { if (!QUEUE[stIdx]) { QUEUE[stIdx] = PLAYLIST.filter((x) => x.st === stIdx).sort(() => Math.random() - 0.5); QI[stIdx] = 0; } const q = QUEUE[stIdx]; if (!q.length) return null; const d = q[QI[stIdx] % q.length]; QI[stIdx]++; return d; }
  function makeSong(style, def) {
    let seed = Math.floor(Math.random() * 1e9); if (def) { seed = 7; for (const ch of def.t) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0; } rng = mulberry(seed);
    const R = (a) => a[Math.floor(rng() * a.length)];
    const root = 45 + Math.floor(rng() * 7); // A2..D#3
    const minor = [0, 2, 3, 5, 7, 8, 10];
    const progs = style === 'gfunk' ? [[0, 5, 3, 4], [0, 3, 5, 4], [0, 6, 5, 4]] : style === 'hard' ? [[0, 0, 5, 6], [0, 1, 0, 6], [0, 5, 0, 1]] : [[0, 5, 2, 6], [0, 3, 6, 5], [0, 0, 3, 4], [0, 5, 3, 6]];
    const prog = R(progs);
    const K = (deg, oct = 0) => root + minor[((deg % 7) + 7) % 7] + 12 * (Math.floor(deg / 7) + oct);
    // drums (16 steps)
    const kicks = style === 'hard' ? [[1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0],[1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0]] : style === 'gfunk' ? [[1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0],[1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0]] : [[1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0],[1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,1],[1,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0]];
    const kick = R(kicks), snare = [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0, rng() < 0.4 ? 1 : 0];
    const hat = style === 'gfunk' ? [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1] : [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0];
    // bass: root on kicks + passing notes
    const bass = kick.map((k, i) => k ? 0 : (rng() < (style === 'gfunk' ? 0.28 : 0.12) ? R([2, 4, 6, -1]) : null));
    // keys/stabs rhythm
    const stab = style === 'hard' ? [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0] : style === 'gfunk' ? [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0] : R([[1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0]]);
    // lead motif (G-funk whistle / horn line): 8 notes in the scale over 2 bars
    const motif = []; let d = 4 + Math.floor(rng() * 3); for (let i = 0; i < 8; i++) { d += R([-2, -1, 0, 1, 2]); motif.push(rng() < 0.25 ? null : d); }
    const lyrics = writeLyrics(style, rng, def);
    return { lyrics, style, root, prog, K, kick, snare, hat, bass, stab, motif, chordType: style === 'gfunk' ? 'saw' : style === 'hard' ? 'brass' : 'keys', seed, def };
  }
  // ---------- instruments
  function env(g, t, a, peak, d) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); }
  function kick(t, v = 1) { const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12); const g = ctx.createGain(); env(g, t, 0.003, 0.95 * v, 0.33); const ws = ctx.createWaveShaper(); ws.curve = SAT; o.connect(ws); ws.connect(g); g.connect(bus); o.start(t); o.stop(t + 0.4);
    const c = ctx.createBufferSource(); c.buffer = AUDIO.noise; const cf = ctx.createBiquadFilter(); cf.type = 'highpass'; cf.frequency.value = 3000; const cg = ctx.createGain(); env(cg, t, 0.001, 0.12 * v, 0.012); c.connect(cf); cf.connect(cg); cg.connect(bus); c.start(t); c.stop(t + 0.03); }
  function snare(t, v = 1, hard) { const s = ctx.createBufferSource(); s.buffer = AUDIO.noise; const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = hard ? 2400 : 1800; f.Q.value = 0.8; const g = ctx.createGain(); env(g, t, 0.002, 0.55 * v, hard ? 0.16 : 0.2); s.connect(f); f.connect(g); g.connect(bus); s.start(t, Math.random()); s.stop(t + 0.3);
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.setValueAtTime(210, t); o.frequency.exponentialRampToValueAtTime(160, t + 0.08); const g2 = ctx.createGain(); env(g2, t, 0.002, 0.35 * v, 0.09); o.connect(g2); g2.connect(bus); o.start(t); o.stop(t + 0.12);
    // a bit of room
    const dl = ctx.createDelay(); dl.delayTime.value = 0.045; const dg = ctx.createGain(); dg.gain.value = 0.25; g.connect(dl); dl.connect(dg); dg.connect(bus); }
  function hat(t, v = 1, open) { const s = ctx.createBufferSource(); s.buffer = AUDIO.noise; const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7000; const g = ctx.createGain(); env(g, t, 0.001, 0.16 * v, open ? 0.22 : 0.035); s.connect(f); f.connect(g); g.connect(bus); s.start(t, Math.random()); s.stop(t + (open ? 0.3 : 0.06)); }
  function bassNote(t, m, len, style) { const o = ctx.createOscillator(); o.type = style === 'gfunk' ? 'sawtooth' : 'triangle'; o.frequency.setValueAtTime(N(m), t); const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.setValueAtTime(N(m - 12), t);
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(style === 'gfunk' ? 900 : 420, t); f.frequency.exponentialRampToValueAtTime(220, t + len); f.Q.value = style === 'gfunk' ? 6 : 1;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.32, t + 0.01); g.gain.setValueAtTime(0.28, t + len * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(f); o2.connect(f); f.connect(g); g.connect(bus); o.start(t); o2.start(t); o.stop(t + len + 0.02); o2.stop(t + len + 0.02); }
  function chord(t, notes, len, type) {
    const out = ctx.createGain(); out.gain.value = 1; const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = type === 'saw' ? 1400 : type === 'brass' ? 2200 : 1800; f.connect(out); out.connect(bus);
    for (const m of notes) for (const det of type === 'keys' ? [0] : [-7, 7]) { const o = ctx.createOscillator(); o.type = type === 'keys' ? 'sine' : 'sawtooth'; o.frequency.value = N(m); o.detune.value = det;
      const g = ctx.createGain(); const pk = type === 'keys' ? 0.07 : type === 'brass' ? 0.035 : 0.022; if (type === 'saw') { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(pk, t + 0.15); g.gain.setValueAtTime(pk, t + len - 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t + len); } else env(g, t, 0.006, pk, len);
      o.connect(g); g.connect(f); o.start(t); o.stop(t + len + 0.05);
      if (type === 'keys') { const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = N(m) * 2.01; const g2 = ctx.createGain(); env(g2, t, 0.004, 0.025, len * 0.5); o2.connect(g2); g2.connect(f); o2.start(t); o2.stop(t + len); } } }
  function whistle(t, m, len, style) { // G-funk portamento sine lead / horn for the hard station
    const o = ctx.createOscillator(); o.type = style === 'hard' ? 'square' : 'sine'; const f0 = N(m + 24); o.frequency.setValueAtTime(f0 * 0.97, t); o.frequency.exponentialRampToValueAtTime(f0, t + 0.06);
    const lfo = ctx.createOscillator(); lfo.frequency.value = 5.5; const lg = ctx.createGain(); lg.gain.value = f0 * 0.012; lfo.connect(lg); lg.connect(o.frequency);
    const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = style === 'hard' ? 1600 : 4000; const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(style === 'hard' ? 0.03 : 0.05, t + 0.04); g.gain.setValueAtTime(style === 'hard' ? 0.03 : 0.05, t + len * 0.8); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(fl); fl.connect(g); g.connect(bus); o.start(t); lfo.start(t); o.stop(t + len + 0.02); lfo.stop(t + len + 0.02); }
  function scratch(t, dur) { if (!scratchBuf) { const sr = ctx.sampleRate, b = ctx.createBuffer(1, sr * 0.6, sr), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) { const x = i / sr; d[i] = (Math.sin(2 * Math.PI * 220 * x + Math.sin(2 * Math.PI * 3 * x) * 6) * 0.6 + (Math.random() * 2 - 1) * 0.3) * Math.min(1, x * 20) * Math.max(0, 1 - x / 0.6); } scratchBuf = b; }
    const s = ctx.createBufferSource(); s.buffer = scratchBuf; const g = ctx.createGain(); g.gain.value = 0.12; const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 0.9;
    s.playbackRate.setValueAtTime(0.4, t); const n = 4; for (let i = 0; i < n; i++) { s.playbackRate.linearRampToValueAtTime(i % 2 ? 0.3 : 2.2, t + dur * (i + 1) / n); }
    s.connect(f); f.connect(g); g.connect(bus); s.start(t); s.stop(t + dur); }
  function crackle(t, len) { for (let i = 0; i < 6; i++) { const tt = t + Math.random() * len; const s = ctx.createBufferSource(); s.buffer = AUDIO.noise; const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 2500; const g = ctx.createGain(); env(g, tt, 0.0005, 0.02 + Math.random() * 0.03, 0.006); s.connect(f); f.connect(g); g.connect(bus); s.start(tt, Math.random()); s.stop(tt + 0.02); } }
  let SAT = null;
  function adlib(text) { try { if (!window.speechSynthesis || FIGHT2D.running) return; const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; if (rapVoice) u.voice = rapVoice; u.rate = 1.05; u.pitch = 0.6; u.volume = 0.55 * duck; window.speechSynthesis.speak(u); } catch (e) { } }
  // ---------- scheduler
  function schedStep(i, t) {
    const S = song; const spb = 60 / STATIONS[st].bpm, s16 = spb / 4; const sw = (i % 2) ? s16 * STATIONS[st].swing : 0; const tt = t + sw; const b = Math.floor(i / 16), k = i % 16; const deg = S.prog[b % 4];
    const fill = (bar % 8 === 7) && k >= 12; const sparse = bar % 16 < 2; // intro-ish bars: no snare
    if (S.kick[k] && !(fill && k > 13)) kick(tt, k === 0 ? 1 : 0.8);
    if ((S.snare[k] && !sparse) || (fill && (k === 13 || k === 15))) snare(tt, k === 4 || k === 12 ? 1 : 0.6, S.style === 'hard');
    if (S.hat[k] && !fill) hat(tt, k % 4 === 0 ? 0.9 : 0.55, S.style === 'gfunk' && k === 14);
    if (S.bass[k] !== null && S.bass[k] !== undefined && !sparse) bassNote(tt, S.K(deg + S.bass[k], -1) , s16 * (S.style === 'gfunk' ? 3.6 : 2.4), S.style);
    if (S.stab[k]) { const r = S.K(deg, 1); const third = S.K(deg + 2, 1), fifth = S.K(deg + 4, 1), sev = S.K(deg + 6, 1); chord(tt, S.chordType === 'saw' ? [r, third, fifth, sev] : [r, third, fifth, sev + (S.style === 'hard' ? -12 : 0)], S.chordType === 'saw' ? spb * 3.8 : S.chordType === 'brass' ? s16 * 2.5 : spb * 1.4, S.chordType); }
    if ((S.style === 'gfunk' || (S.style === 'hard' && bar % 8 >= 4)) && bar % 4 >= 2 && k % 4 === 0) { const n = S.motif[(bar % 2) * 4 + k / 4]; if (n !== null && n !== undefined) whistle(tt, S.K(n, -1), spb * 0.9, S.style); }
    if (S.style !== 'gfunk' && bar % 8 === 6 && (k === 8 || k === 12)) scratch(tt, s16 * 3);
    if (k === 0) { crackle(tt, spb * 4); const line = S.lyrics[bar % BARS]; const ms = Math.max(0, (tt - ctx.currentTime) * 1000);
      if (line && (SETTINGS.rap ?? true)) setTimeout(() => { if (playing) rap(line, spb * 4); }, ms + 40);
      else if (!line && bar % 8 === 1 && Math.random() < 0.6) setTimeout(() => adlib(pick(ADLIBS[S.style])), ms); }
  }
  function tick() {
    if (!ctx || !playing) return; const spb = 60 / STATIONS[st].bpm, s16 = spb / 4;
    while (nextT < ctx.currentTime + 0.15) { schedStep(step % 16 + 0, nextT); step++; nextT += s16; if (step % 16 === 0) { bar++; if (bar % BARS === 0) newSong(); } }
  }
  function ensure() {
    if (ctx) return true; AUDIO.init(); ctx = AUDIO.ctx; if (!ctx) return false;
    SAT = new Float32Array(256); for (let i = 0; i < 256; i++) { const x = i / 128 - 1; SAT[i] = Math.tanh(x * 2.2); }
    comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 18000; bus = ctx.createGain(); bus.gain.value = 0;
    bus.connect(lp); lp.connect(comp); comp.connect(AUDIO.master); return true;
  }
  function newSong() { const d = nextDef(st); song = makeSong(STATIONS[st].style, d); if (d && PLAYER.car) HUD.toast(`♪ ${d.t} — ${d.a}`, '#f5b72e', 3); }
  function start() { if (!ensure() || STATIONS[st].off) return; if (playing) return; playing = true; newSong(); step = 0; bar = 0; nextT = ctx.currentTime + 0.05; timer = setInterval(tick, 25); bus.gain.setTargetAtTime(0.55 * (SETTINGS.music ?? 1) * duck, ctx.currentTime, 0.3); }
  function stop() { playing = false; clearInterval(timer); timer = null; try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { } if (bus) bus.gain.setTargetAtTime(0, ctx.currentTime, 0.15); }
  function setStation(i, announce = true) { st = (i + STATIONS.length) % STATIONS.length; const S = STATIONS[st]; const was = playing; stop(); if (S.off) { HUD.toast('RADIO APAGADA', '#ccc', 1.6); return; }
    setTimeout(() => { if (wantOn) start(); }, was ? 250 : 0); if (announce) { HUD.toast(`RADIO: ${S.name} · ${S.tag}`, '#f5b72e', 2.5); setTimeout(() => adlib(`${S.name.replace('.', ' point ')}`), 400); } }
  return {
    STATIONS, get station() { return STATIONS[st]; },
    // radio on/off follows the player getting in/out of a car
    update() { const inCar = !!PLAYER.car && GAME.state === 'play'; if (inCar && !wantOn) { wantOn = true; const tip = this.changes < 2 ? `  (${document.body.classList.contains('touchmode') ? 'toca el velocímetro' : 'Q'}: cambiar de emisora)` : ''; /* the tip stops once the player has changed station twice (saved with the game) */ if (!STATIONS[st].off) { start(); HUD.toast(`RADIO: ${STATIONS[st].name} · ${STATIONS[st].tag}${tip}`, '#f5b72e', 3); } else if (tip) HUD.toast(`RADIO APAGADA${tip}`, '#ccc', 3); } else if (!inCar && wantOn) { wantOn = false; stop(); } if (inCar && pressed('KeyQ')) this.next(); },
    changes: 0, next() { this.changes++; setStation(st + 1); },
    // 5-second chorus when a mission is passed (radio ducks under it)
    jingle() { if (!ensure()) return; const resume = playing; stop(); const t0 = ctx.currentTime + 0.2;
      const jb = ctx.createGain(); jb.gain.value = 0.85 * (SETTINGS.music ?? 1); jb.connect(AUDIO.master); const prev = bus; bus = jb;
      const bpm = 96, spb = 60 / bpm, s16 = spb / 4; const root = 50; const K = (d) => root + [0, 2, 3, 5, 7, 8, 10][((d % 7) + 7) % 7] + 12 * Math.floor(d / 7); const prog = [0, 5, 6, 0];
      const kk = [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], sn = [0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,1];
      for (let b = 0; b < 2; b++) for (let k = 0; k < 16; k++) { const t = t0 + (b * 16 + k) * s16; if (kk[k]) kick(t); if (sn[k] && !(b === 0 && k > 12)) snare(t, 0.9); if (k % 2 === 0) hat(t, 0.6); if (k % 8 === 0) { const d = prog[b * 2 + k / 8]; chord(t, [K(d) + 12, K(d + 2) + 12, K(d + 4) + 12, K(d + 6) + 12], spb * 1.9, 'brass'); bassNote(t, K(d) - 12, spb * 1.8, 'boombap'); } }
      const hook = [4, 4, 6, 7, 6, 4, 2, 4]; hook.forEach((d, i) => whistle(t0 + i * spb, K(d) - 12, spb * 0.85, 'gfunk'));
      scratch(t0 + 7 * spb + s16 * 2, s16 * 2); const t1 = t0 + 8 * spb + 0.1; kick(t1); chord(t1, [K(0) + 12, K(2) + 12, K(4) + 12, K(7) + 12], 1.4, 'brass');
      setTimeout(() => adlib(pick(['Mission complete!', 'That’s how we do it!', 'Big nose Chopa, yeah!', 'Lagoon City, baby!'])), 300);
      setTimeout(() => { bus = prev; if (resume && wantOn) start(); }, (8 * spb + 1.8) * 1000); },
    setVol() { if (bus && playing) bus.gain.setTargetAtTime(0.55 * (SETTINGS.music ?? 1) * duck, ctx.currentTime, 0.1); },
  };
})();

document.getElementById('speed')?.addEventListener('pointerdown', (e) => { if (PLAYER.car) { e.preventDefault(); MUSIC.next(); } });
