const MAP_MARK = {
  food: '#e53935',
  entrance: '#3ddc97',
  police: '#3d7bff',
  destination: '#e040fb',
  objective: '#f5b72e',
  checkpoints: '#ffd23f',
  chase: '#ff3b30',
  wanted: '#ff1744',
  bencomo: '#ffb347',
  gufo: '#b388ff'
};
// ============ GTA La Laguna — core ============
import * as THREE from 'three';
// v1.1.8 («¿qué código dibuja esto?», tests/herramientas/sonda_origen.py): with window.__ORIGEN set before the page loads,
// every piece added to the scene remembers the functions that added it (nothing changes in the game)
if (typeof window !== 'undefined' && window.__ORIGEN) {
  const add0 = THREE.Object3D.prototype.add;
  THREE.Object3D.prototype.add = function (...o) {
    const st = String(new Error().stack || '')
      .split('\n')
      .slice(2, 8)
      .map((l) => (l.match(/at (?:new )?([\w$.]+) /) || [])[1] || '?')
      .filter((n) => n !== '?')
      .join(' < ');
    for (const c of o) if (c && !c.__origen) c.__origen = st;
    return add0.apply(this, o);
  };
}

const DATA = window.__MAPDATA || JSON.parse(document.getElementById('mapdata').textContent); // v1.0.1: the folder version loads it from datos/mapa.js
const STR = DATA.S;
// ---------- play area: bounding box minus the zones that are not needed (Jonay's map, docs/referencias/mapa/zonas_a_quitar.png)
const WORLD = { x0: -4750, x1: 3450, z0: -1250, z1: 4430 }; // west part only as a band for the airport; east and south only the La Cuesta and Taco zones (see WORLD_EXCL)
const SUNK = []; // v1.4.51: the dug-out pitches (05i_sports.js, pitchTerrace): inside, heightAt gives the pitch's floor
const WORLD_EXCL = [
  // v0.59: the map grows only around the health centres of La Cuesta (X 3223 Z 1956) and Taco (X 1633 Z 4292), ≥100 m
  // around each and joined to the old edge (x 2400 / z 3980); data from scripts/descargar_zonas.bat + tools/merge_zona.py
  { x0: 2400, x1: 1e9, z0: -1e9, z1: 1600, name: 'este, al norte de La Cuesta' },
  { x0: 2400, x1: 1e9, z0: 2250, z1: 1e9, name: 'este, al sur de La Cuesta' },
  { x0: -1e9, x1: 1450, z0: 3980, z1: 1e9, name: 'sur, al oeste de Taco' },
  { x0: 1850, x1: 1e9, z0: 3980, z1: 1e9, name: 'sur, al este de Taco' },
  { x0: -1e9, x1: -1900, z0: -1e9, z1: -450, name: 'oeste norte (fuera del corredor del aeropuerto)' },
  { x0: -1e9, x1: -1900, z0: 1400, z1: 1e9, name: 'oeste sur (fuera del corredor del aeropuerto)' },
  // monte NE (Valle Tabares, Valle Vinagre, Los Valles): the strip east of San Roque / La Verdellada is back (v0.46)
  { x0: 781, x1: 1e9, z0: -1e9, z1: -220, name: 'monte NE norte' },
  { x0: 1300, x1: 1e9, z0: -1e9, z1: 250, name: 'monte NE centro' },
  { x0: 1805, x1: 1e9, z0: -1e9, z1: 896, name: 'monte NE sur' },
  // campo SO: Guajara / San Felipe / Geneto west to El Coromoto is back (v0.46); only far Los Baldíos and La Vega stay out
  { x0: -1e9, x1: -1200, z0: 1376, z1: 1e9, name: 'campo SO (Los Baldíos)' },
  { x0: -1e9, x1: 158, z0: 2810, z1: 1e9, name: 'campo SO (La Vega, sur de Geneto)' }
];
// distance from (x,z) to the edge of the play area (negative = outside)
function worldEdgeDist(x, z) {
  let d = Math.min(x - WORLD.x0, WORLD.x1 - x, z - WORLD.z0, WORLD.z1 - z);
  for (const R of WORLD_EXCL) {
    const ix = x > R.x0 && x < R.x1,
      iz = z > R.z0 && z < R.z1;
    if (ix && iz) d = Math.min(d, -Math.min(x - R.x0, R.x1 - x, z - R.z0, R.z1 - z));
    else {
      const dx = Math.max(R.x0 - x, 0, x - R.x1),
        dz = Math.max(R.z0 - z, 0, z - R.z1);
      d = Math.min(d, Math.hypot(dx, dz));
    }
  }
  return d;
}
const inPlayArea = (x, z, m = 0) => worldEdgeDist(x, z) >= m;
// v1.4.51: the OSM's lanes and parking (DATA.LN, tools/carriles.py) are keyed by the index of each way in the data; the
// ways dropped below shift every index after them, and since v1.1.1 most streets read another street's lanes (Jonay: «se
// pasa de 2 a un carril y luego a 2 otra vez»). Each way keeps its own here, and DATA.LN is rebuilt after the pruning
if (DATA.LN) DATA.R.forEach((r, ri) => (r.ln = DATA.LN[ri] || null));
function relinkLanes() {
  if (!DATA.LN) return;
  DATA.LN = {};
  DATA.R.forEach((r, ri) => {
    if (r.ln) DATA.LN[ri] = r.ln;
  });
}
// v1.4.51: lanes Jonay gave (each carriageway): over the OSM's
const ROAD_LANES = {
  'Avenida de las Palmeras': [1, -1, 1] // («es de un carril por sentido y justamente hay palmeras en medio en una plaza; tiene aparcamientos a la derecha de cada carril»)
};
// v1.4.51 (Jonay, Autovía Interconexión Norte-Sur: «solo tiene 2 carriles»; 14 of its 16 ways carry no lanes in the OSM):
// a way with no lanes takes them from the next way of the same street and the same kind (one-way or not), through the
// shared end points, as far as it goes
function propagateLanes() {
  if (!DATA.LN) return;
  for (const r of DATA.R) {
    const q = r[1] >= 0 && ROAD_LANES[DATA.S[r[1]]];
    if (q) r.ln = q.slice();
  }
  const K = (x, z) => Math.round(x * 2) + ',' + Math.round(z * 2),
    ends = new Map();
  DATA.R.forEach((r, ri) => {
    if (r[0] > 11 || r[1] < 0) return;
    const c = r[4];
    for (const k of [K(c[0], c[1]), K(c[c.length - 2], c[c.length - 1])]) {
      let l = ends.get(k);
      if (!l) ends.set(k, (l = []));
      l.push(ri);
    }
  });
  let n = 0,
    changed = true;
  for (let pass = 0; pass < 40 && changed; pass++) {
    changed = false;
    DATA.R.forEach((r, ri) => {
      if (r[0] > 11 || r[1] < 0 || (r.ln && r.ln[0] > 0)) return;
      const c = r[4];
      for (const k of [K(c[0], c[1]), K(c[c.length - 2], c[c.length - 1])])
        for (const rj of ends.get(k) || []) {
          const o = DATA.R[rj];
          if (rj === ri || o[1] !== r[1] || (o[3] & 1) !== (r[3] & 1) || o[0] !== r[0] || !o.ln || !(o.ln[0] > 0)) continue;
          r.ln = [o.ln[0], -1, -1];
          r.lnFrom = true;
          n++;
          changed = true;
          return;
        }
    });
  }
  relinkLanes();
  window.__carrilesHeredados = n; // (tests)
}
// drop everything outside the play area (not rendered, no traffic)
(function pruneWorld() {
  const M = 40;
  const cen = (c) => {
    let x = 0,
      z = 0;
    for (let i = 0; i < c.length; i += 2) {
      x += c[i];
      z += c[i + 1];
    }
    return [x / (c.length / 2), z / (c.length / 2)];
  };
  const n0 = [DATA.B.length, DATA.R.length, DATA.A.length, DATA.G.e.length];
  DATA.B = DATA.B.filter((b) => {
    const [x, z] = cen(b[6]);
    return inPlayArea(x, z, -5);
  });
  DATA.A = DATA.A.filter((a) => {
    const [x, z] = cen(a[2]);
    return inPlayArea(x, z, -20);
  });
  DATA.R = DATA.R.filter((r) => {
    const c = r[4];
    let i0 = 0,
      i1 = c.length - 2;
    // v1.4.50 (Jonay, Calle Joaquín Turina: «esto es una carretera… ¿por qué es un descampado?»): a way whose end is out of
    // the play area lost its points out there; one of only two points (a long straight way) lost the whole street. Now
    // the way is cut where it crosses the edge
    const edge = (ax, az, bx, bz) => {
      let lo = 0,
        hi = 1; // (a in, b out)
      for (let k = 0; k < 20; k++) {
        const m = (lo + hi) / 2;
        if (inPlayArea(ax + (bx - ax) * m, az + (bz - az) * m, 8))
          lo = m; // (8 m inside the edge: a car must be able to reach the end)
        else hi = m;
      }
      return [ax + (bx - ax) * lo, az + (bz - az) * lo];
    };
    while (i0 <= i1 && !inPlayArea(c[i0], c[i0 + 1], -M)) i0 += 2;
    if (i0 > i1) return false;
    while (i1 > i0 && !inPlayArea(c[i1], c[i1 + 1], -M)) i1 -= 2;
    const o = c.slice(i0, i1 + 2);
    if (i0 > 0) o.unshift(...edge(c[i0], c[i0 + 1], c[i0 - 2], c[i0 - 1]));
    if (i1 < c.length - 2) o.push(...edge(c[i1], c[i1 + 1], c[i1 + 2], c[i1 + 3]));
    if (o.length < 4 || Math.hypot(o[o.length - 2] - o[0], o[o.length - 1] - o[1]) < 2) return false;
    r[4] = o;
    return true;
  });
  // v1.1.9: the same street twice (two downloads of a zone joined by merge_zona keep both copies; at the TF-5 one copy sank
  // with the trench and the other stayed up over it): a road that runs for more than 80 % of its length within 1.2 m of
  // another one of the same type and level is left out (the longer copy stays)
  {
    const R = DATA.R,
      G = new Map(),
      segs = [],
      CS = 20;
    const lenOf = (c) => {
      let L = 0;
      for (let i = 2; i < c.length; i += 2) L += Math.hypot(c[i] - c[i - 2], c[i + 1] - c[i - 1]);
      return L;
    };
    R.forEach((r, ri) => {
      if (r[0] > 12) return;
      const c = r[4];
      for (let i = 0; i + 3 < c.length; i += 2) {
        const k = segs.push([ri, c[i], c[i + 1], c[i + 2], c[i + 3]]) - 1;
        for (let a = Math.floor(Math.min(c[i], c[i + 2]) / CS); a <= Math.floor(Math.max(c[i], c[i + 2]) / CS); a++)
          for (let b = Math.floor(Math.min(c[i + 1], c[i + 3]) / CS); b <= Math.floor(Math.max(c[i + 1], c[i + 3]) / CS); b++) {
            const kk = a * 100003 + b;
            let l = G.get(kk);
            if (!l) G.set(kk, (l = []));
            l.push(k);
          }
      }
    });
    const near = (x, z, ri, out) => {
      const l = G.get(Math.floor(x / CS) * 100003 + Math.floor(z / CS));
      if (!l) return;
      for (const k of l) {
        const [rj, ax, az, bx, bz] = segs[k];
        if (rj === ri || out.has(rj)) continue;
        const dx = bx - ax,
          dz = bz - az,
          L2 = dx * dx + dz * dz || 1,
          t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / L2));
        if (Math.hypot(x - ax - dx * t, z - az - dz * t) < 1.2) out.add(rj);
      }
    };
    const drop = new Set();
    R.forEach((r, ri) => {
      if (r[0] > 12) return;
      const c = r[4],
        cnt = new Map();
      let n = 0;
      for (let i = 0; i + 3 < c.length; i += 2) {
        const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]),
          m = Math.max(1, Math.floor(L / 3));
        for (let k = 0; k < m; k++) {
          const seen = new Set();
          near(c[i] + ((c[i + 2] - c[i]) * k) / m, c[i + 1] + ((c[i + 3] - c[i + 1]) * k) / m, ri, seen);
          for (const rj of seen) cnt.set(rj, (cnt.get(rj) || 0) + 1);
          n++;
        }
      }
      if (n < 5) return;
      for (const [rj, k] of cnt) {
        const o = R[rj];
        if (k / n <= 0.8 || o[0] !== r[0] || (o[3] & 6) !== (r[3] & 6) || drop.has(rj)) continue;
        const a = lenOf(c),
          b = lenOf(o[4]);
        if (b > a || (b === a && rj < ri)) {
          drop.add(ri);
          return;
        }
      }
    });
    if (drop.size) DATA.R = R.filter((r, ri) => !drop.has(ri));
    relinkLanes();
    propagateLanes();
    console.log('play area: repeated roads left out', drop.size);
  }
  const N = DATA.G.n;
  DATA.G.e = DATA.G.e.filter((e) => inPlayArea(N[e[0] * 2], N[e[0] * 2 + 1], -M) && inPlayArea(N[e[1] * 2], N[e[1] * 2 + 1], -M));
  {
    const T = [];
    for (let i = 0; i < DATA.N.length; i += 2) if (inPlayArea(DATA.N[i], DATA.N[i + 1])) T.push(DATA.N[i], DATA.N[i + 1]);
    DATA.N = T;
  }
  DATA.P = DATA.P.filter((p) => inPlayArea(p[2], p[3], -10));
  if (DATA.SH) DATA.SH = DATA.SH.filter((p) => inPlayArea(p[0], p[1], -10));
  console.log(
    'play area: buildings',
    n0[0],
    '→',
    DATA.B.length,
    'roads',
    n0[1],
    '→',
    DATA.R.length,
    'areas',
    n0[2],
    '→',
    DATA.A.length,
    'graph edges',
    n0[3],
    '→',
    DATA.G.e.length
  );
})();
// widen drivable streets a bit so cars fit through the old town
// widen drivable streets (real-life feel: OSM default widths read too narrow at game scale)
// v1.4.48 (Jonay: «aquí debe haber un problema de concepto inicial… las calles no las ensanches, lo importante es que
// tengan un mínimo de calzada transitable»): the old widening (12–30 % more, at least 8–9 m two-way) was the origin of
// the buildings in the streets. The map's widths are only defaults by type (6.5 m every residential, 8 tertiary,
// 9 secondary…): now the carriageway follows the norms Jonay gave (3.1-IC and urban design): conventional roads two-way
// 7 m (3.5 m lanes), slip roads and service roads 4 m, urban streets two-way 5.8 m and one-way 3.2 m. A width the map
// really gives (not its type's default) is kept, never under those minimums. Motorways and trunk roads as they are.
const WDEF = { 0: 12, 1: 7, 2: 0, 3: 10, 4: 7, 5: 9, 6: 7, 7: 8, 8: 6, 9: 6.5, 10: 6.5, 11: 5, 12: 4.5 };
const WIDEN = (t, w, one) => {
  if (t === 0 || t === 2) return w;
  const norm = t === 1 || t === 4 || t === 6 || t === 8 ? 4 : t <= 7 ? (one ? 4 : 7) : t === 12 ? 4 : one ? 3.2 : 5.8,
    real = Math.abs(w - (WDEF[t] || 0)) > 0.05; // (the map gave its own width)
  return Math.round((real ? Math.max(w, norm) : norm) * 10) / 10;
};
const CORE0 = [
  [-680, -420],
  [-420, -640],
  [-120, -700],
  [320, -720],
  [360, 120],
  [260, 320],
  [-160, 300],
  [-420, 120],
  [-700, -120]
];
const inCore0 = (x, z) => {
  let ins = false;
  for (let i = 0, j = CORE0.length - 1; i < CORE0.length; j = i++) {
    const [xi, zi] = CORE0[i],
      [xj, zj] = CORE0[j];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) ins = !ins;
  }
  return ins;
};
const WIDEN2 = (t, w, one, x, z) => WIDEN(t, w, one); // (v1.4.48: the old town too, at the map's width)
// the widths of before (1.4.47): tunnels and bridges keep them (their walls, decks and mouths are made from them: Jonay,
// «ten mucho cuidado al cambiar el ancho en túneles y puentes»), and a street never widens past them (narrowToGap)
const WIDEN_OLD = (t, w, one, x, z) => {
  if (inCore0(x, z) && t >= 9) return Math.round(Math.max(w * 1.15, t === 12 ? 5 : 7.2) * 10) / 10;
  const f = t <= 2 ? 1.12 : t <= 8 ? 1.3 : t <= 10 ? 1.22 : 1.15,
    mn = t === 12 ? 5 : t === 11 ? 5.5 : one ? 6 : t <= 8 ? 9 : 8;
  return Math.round(Math.max(w * f, mn) * 10) / 10;
};
const SIDEWALK_W = 1.0; // v1.4.48 (Jonay: «aquí las aceras apenas tienen un ancho de un metro»): the pavement beyond the kerb
// v0.72 (official street map, docs/referencias/callejero/): streets of the old town that OSM gives as pedestrian but
// that cars do use (smooth paving, not cobbles, on the town hall's map): drawn and driven as normal streets
const CALLEJERO_TRAFICO = /^Calle (Bencomo|Juan de Vera|Rodriguez Moure|Ascanio y Nieves)$/;
for (const rd of DATA.R) {
  if (rd[1] >= 0 && CALLEJERO_TRAFICO.test(DATA.S[rd[1]]) && (rd[0] === 13 || ((rd[3] >> 3) & 3) === 1)) {
    rd[0] = 10;
    rd[3] &= ~(3 << 3);
    rd[2] = Math.max(rd[2], 6);
  }
}
// v1.4.51 (Jonay, rotonda de Finca España: «¿pusiste aparcamiento alrededor de la rotonda?»): pieces of a roundabout's
// ring that the map does not tag as such (named «Rotonda», no junction tag): every point on the circle of a roundabout
// of the map's list (DATA.RB: centre and radius), within 3 m, is a ring piece
(function ringPieces() {
  const RB = (DATA.RB || []).filter((b) => b[2] >= 6 && b[2] <= 70);
  let n = 0;
  for (const r of DATA.R) {
    if (r[3] & 32 || r[0] > 12 || r[4].length < 4) continue;
    const c = r[4];
    for (const b of RB) {
      let ok = true;
      for (let i = 0; i < c.length && ok; i += 2) if (Math.abs(Math.hypot(c[i] - b[0], c[i + 1] - b[1]) - b[2]) > 3) ok = false;
      if (ok) {
        r[3] |= 32 | 1;
        n++;
        break;
      }
    }
  }
  window.__anillosMarcados = n; // (tests)
})();
DATA.R.forEach((rd, ri) => {
  if (rd[0] <= 12) {
    const c = rd[4],
      m = (c.length >> 2) << 1;
    rd.wMax = WIDEN_OLD(rd[0], rd[2], rd[3] & 1, c[m], c[m + 1]);
    rd[2] = rd[3] & 6 ? rd.wMax : WIDEN2(rd[0], rd[2], rd[3] & 1, c[m], c[m + 1]);
    // (v1.4.51, Jonay: «la rotonda es demasiado pequeña»; «no sé por qué es tan grande la rotonda y luego las carreteras que
    // llegan a ella se cortan»: a roundabout's ring took the one-way norm, 3.2 m: a thin ring and a big island over the
    // arms. A ring is 7–9 m)
    if (rd[3] & 32 && rd[0] <= 12) rd[2] = Math.min(9, Math.max(7, rd.wMax || 7));
    // (the lanes the map gives, at 3.5 m: a one-way half of a dual road is not a one-lane slip road)
    const ln = DATA.LN && DATA.LN[ri] ? DATA.LN[ri][0] : 0;
    if (!(rd[3] & 6) && ln > 1 && rd[0] <= 8) rd[2] = Math.max(rd[2], Math.min(rd.wMax, ln * 3.5));
    rd.wMin = rd[2]; // (v1.4.48: its minimum: frontLines lets the pavement go down to half only where the street is at it)
  }
});
// v1.4.49: streets Jonay measured (w: carriageway, two-way pieces; swMin: how much of the pavement can be left where the
// buildings leave no room, 0.5 = half, 0 = none)
const ROAD_REAL = {
  // («los carriles miden 3,25 m, en total la calzada 6,50 m; eso es una vía que ya no es urbana, hay zonas sin acera»;
  // «hay una parte donde ensancha… cuando llega a la rotonda del Padre Anchieta… llega hasta 10 m»: from the roundabout
  // to the Calle Las Mejoranas, ~220 m)
  'Carretera de San Miguel de Geneto': { w: 6.5, swMin: 0, tramos: [[-321.5, 1012, 10]] }
};
// (tramos: [x, z, w]: the street is cut at its point nearest (x, z), within 3 m; the piece from its start to there takes w)
DATA.R.forEach((rd, ri) => {
  const q = rd[1] >= 0 && ROAD_REAL[DATA.S[rd[1]]];
  if (!q || rd[3] & 7) return;
  rd[2] = rd.wMin = q.w;
  rd.swMin = q.swMin;
  for (const [x, z, w] of q.tramos || []) {
    const c = rd[4];
    let k = -1,
      bd = 3;
    for (let i = 2; i + 2 < c.length; i += 2) {
      const d = Math.hypot(c[i] - x, c[i + 1] - z);
      if (d < bd) ((bd = d), (k = i));
    }
    if (k < 0) continue;
    const head = rd.slice(0, 4);
    head[4] = c.slice(0, k + 2);
    head[2] = head.wMin = w;
    head.wMax = rd.wMax;
    head.swMin = q.swMin;
    rd[4] = c.slice(k);
    if (DATA.LN && DATA.LN[ri]) DATA.LN[DATA.R.length] = DATA.LN[ri];
    DATA.R.push(head);
  }
});
for (const e of DATA.G.e) {
  const a = e[0] * 2;
  e[4] = WIDEN2(e[2], e[4], e[3], DATA.G.n[a], DATA.G.n[a + 1]);
}
// v1.4.48 («las calles mandan», Jonay: «los trazados de la carretera en sitios como La Trinidad, que son muy rectos, no
// deberían tener esas arrugas»): the map's points along a nearly straight street wobble a little (a metre or less), and
// the street, its kerbs and its marks drew those wobbles. Each point inside a street (not shared with another street:
// junctions stay put) that is less than 1 m off the line between its neighbours, where both pieces are 6 m or longer
// and it turns less than 8°, goes onto that line; the traffic graph's points that were the same move with it
(function straightenWobbles() {
  // (v1.4.48: the Av. de La Trinidad has a point every 4 m rounded to half a metre: a ±0.2–0.5 m zigzag. Each street,
  // between the points it shares with other streets, is simplified (Douglas-Peucker, 0.5 m) and every point in between
  // goes onto the simplified line; the roundabout rings stay as they are)
  const TOL = 0.5,
    key = (x, z) => x + ',' + z,
    uses = new Map();
  for (const rd of DATA.R) {
    const c = rd[4];
    for (let i = 0; i < c.length; i += 2) uses.set(key(c[i], c[i + 1]), (uses.get(key(c[i], c[i + 1])) || 0) + 1);
  }
  const N = DATA.G.n;
  for (let i = 0; i < N.length; i += 2) uses.set(key(N[i], N[i + 1]), (uses.get(key(N[i], N[i + 1])) || 0) + 2);
  const moved = new Map();
  let n = 0;
  const dp = (c, a, b, keep) => {
    // marks in keep the points of c (indices a..b, in points) that the simplified line passes through
    const ax = c[2 * a],
      az = c[2 * a + 1],
      bx = c[2 * b],
      bz = c[2 * b + 1],
      L = Math.hypot(bx - ax, bz - az) || 1e-9;
    let w = -1,
      wd = TOL;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs((c[2 * i] - ax) * (bz - az) - (c[2 * i + 1] - az) * (bx - ax)) / L;
      if (d > wd) ((wd = d), (w = i));
    }
    if (w < 0) return;
    keep[w] = true;
    dp(c, a, w, keep);
    dp(c, w, b, keep);
  };
  for (const rd of DATA.R) {
    if (rd[0] > 12 || rd[3] & 32) continue;
    const c = rd[4],
      np = c.length / 2;
    if (np < 3) continue;
    const keep = new Array(np).fill(false);
    keep[0] = keep[np - 1] = true;
    for (let i = 1; i < np - 1; i++) if ((uses.get(key(c[2 * i], c[2 * i + 1])) || 0) > 1) keep[i] = true;
    let a = 0;
    for (let b = 1; b < np; b++) if (keep[b]) (dp(c, a, b, keep), (a = b));
    const o = c.slice();
    let k0 = 0;
    for (let i = 1; i < np; i++) {
      if (!keep[i]) continue;
      const ax = c[2 * k0],
        az = c[2 * k0 + 1],
        bx = c[2 * i],
        bz = c[2 * i + 1],
        L2 = (bx - ax) ** 2 + (bz - az) ** 2 || 1;
      for (let j = k0 + 1; j < i; j++) {
        const t = ((c[2 * j] - ax) * (bx - ax) + (c[2 * j + 1] - az) * (bz - az)) / L2,
          qx = Math.round((ax + (bx - ax) * t) * 100) / 100,
          qz = Math.round((az + (bz - az) * t) * 100) / 100;
        if (Math.hypot(qx - c[2 * j], qz - c[2 * j + 1]) < 0.02) continue;
        moved.set(key(c[2 * j], c[2 * j + 1]), [qx, qz]);
        o[2 * j] = qx;
        o[2 * j + 1] = qz;
        n++;
      }
      k0 = i;
    }
    rd[4] = o;
  }
  for (const e of DATA.G.e)
    if (e[6])
      for (let i = 0; i < e[6].length; i += 2) {
        const m = moved.get(key(e[6][i], e[6][i + 1]));
        if (m) ((e[6][i] = m[0]), (e[6][i + 1] = m[1]));
      }
  window.__enderezados = n;
})();
// v1.4.50 (Jonay, Av. Leonardo Torriani: «teniendo tanto espacio como dejas, 1 carril solo»; Av. de los Menceyes, La
// Trinidad): each carriageway of a dual avenue is a one-way way in the map, and the norm gave it 3.2 m (one lane), as a
// narrow one-way street of the old town. A one-way way with a twin (same name, the other way, side by side at 4–40 m for
// most of its length) is half an avenue: two lanes (2 × 3.2 m urban; 2 × 3.5 m from tertiary up)
const TWINS = new Set();
(function findTwins() {
  const byName = new Map();
  DATA.R.forEach((r, ri) => {
    if (!(r[3] & 1) || r[3] & 6 || r[0] < 3 || r[0] > 11 || r[1] < 0) return;
    let l = byName.get(r[1]);
    if (!l) byName.set(r[1], (l = []));
    l.push(ri);
  });
  const near = (x, z, c) => {
    let bd = 1e9,
      dx = 0,
      dz = 0;
    for (let i = 0; i + 3 < c.length; i += 2) {
      const ax = c[i],
        az = c[i + 1],
        ex = c[i + 2] - ax,
        ez = c[i + 3] - az,
        L2 = ex * ex + ez * ez || 1,
        t = Math.max(0, Math.min(1, ((x - ax) * ex + (z - az) * ez) / L2)),
        d = Math.hypot(x - ax - ex * t, z - az - ez * t);
      if (d < bd) ((bd = d), (dx = ex), (dz = ez));
    }
    return [bd, dx, dz];
  };
  for (const l of byName.values()) {
    if (l.length < 2) continue;
    for (const ri of l) {
      const c = DATA.R[ri][4];
      let n = 0,
        hit = 0;
      for (let i = 0; i + 3 < c.length; i += 2) {
        const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]);
        if (L < 0.5) continue;
        const ux = (c[i + 2] - c[i]) / L,
          uz = (c[i + 3] - c[i + 1]) / L;
        for (let s = (L / 2) % 8; s < L; s += 8) {
          const x = c[i] + ux * s,
            z = c[i + 1] + uz * s;
          n++;
          for (const rj of l) {
            if (rj === ri) continue;
            const [d, dx, dz] = near(x, z, DATA.R[rj][4]),
              dl = Math.hypot(dx, dz) || 1;
            if (d >= 4 && d <= 40 && (ux * dx + uz * dz) / dl < -0.85) {
              hit++;
              (DATA.R[ri].tw || (DATA.R[ri].tw = [])).push(d);
              break;
            }
          }
        }
      }
      if (n && hit / n >= 0.5) TWINS.add(ri);
    }
  }
  for (const ri of [...TWINS]) {
    if (DATA.R[ri].ln && DATA.R[ri].ln[0] === 1) {
      TWINS.delete(ri); // (the map says one lane: v1.4.51)
      continue;
    }
    const r = DATA.R[ri],
      ds = (r.tw || []).sort((a, b) => a - b),
      sep = ds.length ? ds[Math.floor(ds.length * 0.1)] : 0; // (the distance to the other carriageway, at its tightest)
    // (v1.4.50: the two halves must not overlap: Calle San Antonio, 6.4 m between axes, kept its painted median)
    const w2 = Math.min(r[0] <= 7 ? 7 : 6.4, sep - 0.6);
    delete r.tw;
    if (w2 < 5.6) {
      TWINS.delete(ri);
      continue;
    }
    if (r[2] < w2) r[2] = Math.min(Math.max(r.wMax || w2, w2), w2);
    r.wMin = Math.max(r.wMin || 0, r[2]);
  }
  window.__twins = TWINS.size; // (tests)
})();
narrowToGap(); // v1.0.0: residential and service streets meet the buildings halfway (04b_recorte.js)
// v1.4.50 (Jonay, Av. de los Menceyes: «se pasa de 2 a un carril y luego a 2 otra vez… eso está mal»): a street is a row of
// ways of the map and each one got its width apart (the norm, the lanes the map gives some of them, narrowToGap with
// the buildings of its own stretch); a way narrower than the ways on both sides of it of the same street, the same way,
// takes the narrower of theirs (the buildings move back: streetsRule)
(function laneContinuity() {
  const K = (x, z) => Math.round(x * 2) + ',' + Math.round(z * 2),
    ends = new Map();
  DATA.R.forEach((r, ri) => {
    if (r[0] < 2 || r[0] > 11 || r[3] & 6 || r[1] < 0) return;
    const c = r[4];
    for (const k of [K(c[0], c[1]), K(c[c.length - 2], c[c.length - 1])]) {
      let l = ends.get(k);
      if (!l) ends.set(k, (l = []));
      l.push(ri);
    }
  });
  let n = 0;
  for (let pass = 0; pass < 2; pass++)
    DATA.R.forEach((r, ri) => {
      if (r[0] < 2 || r[0] > 11 || r[3] & 6 || r[1] < 0 || r.swMin !== undefined) return;
      const c = r[4],
        nb = (k) =>
          (ends.get(k) || []).filter((rj) => rj !== ri && DATA.R[rj][1] === r[1] && (DATA.R[rj][3] & 1) === (r[3] & 1)).map((rj) => DATA.R[rj][2]);
      const a = nb(K(c[0], c[1])),
        b = nb(K(c[c.length - 2], c[c.length - 1]));
      if (!a.length || !b.length) return;
      const w = Math.min(Math.max(...a), Math.max(...b));
      if (w > r[2] + 0.5) {
        r[2] = w;
        n++;
      }
    });
  window.__continuidad = n; // (tests)
})();
corrFitTwins(); // v1.2.0: the two halves of a dual road at the width of their lanes (04c_corredores.js), in the zones done so far
trinidadWidths(); // v0.68: Av. de La Trinidad, one lane + parking per carriageway (05u_trinidad.js); after the widening
verdelladaWidths(); // v1.3.2: the Vía de Ronda, its service roads and the roundabout of La Verdellada at their real widths (04d_verdellada.js)
syncGraphWidths(); // v1.4.50: the traffic's lanes = the painted ones (04b_recorte.js)
// v0.91 (Jonay, with a Street View of the TF-5: «separando los sentidos»): OSM gives the motorway as two one-way ways
// that are often only 7–10 m apart, so the two carriageways (13 m each here) overlapped into one slab with the lines
// mixed and no room for the barrier. Where they run side by side the points are pushed apart until there are MED
// metres between their edges; the same points of every other road (slip roads) and of the traffic graph move with them.
const CW_LOCK = new Set(); // the points of the motorway already set apart: the general separation below leaves them where they are
(function separateCarriageways() {
  const MED = 1.4,
    CELL = 60,
    isCw = (r) => r[0] <= 2 && r[3] & 1 && !(r[3] & 4);
  const L = DATA.R.filter(isCw);
  if (L.length < 2) return;
  // the map has few points along the motorway (one every few hundred metres): add one every STEP metres to the
  // carriageways, and the very same ones to the traffic graph's polylines, so the push holds all along
  const STEP = 12,
    ins = new Map(),
    pk = (ax, az, bx, bz) => ax + ',' + az + '|' + bx + ',' + bz;
  for (const r of L) {
    const c = r[4],
      o = [];
    for (let i = 0; i < c.length - 2; i += 2) {
      const ax = c[i],
        az = c[i + 1],
        bx = c[i + 2],
        bz = c[i + 3],
        n = Math.floor(Math.hypot(bx - ax, bz - az) / STEP);
      o.push(ax, az);
      if (n < 2) continue;
      const mid = [];
      for (let k = 1; k < n; k++) mid.push(Math.round((ax + ((bx - ax) * k) / n) * 100) / 100, Math.round((az + ((bz - az) * k) / n) * 100) / 100);
      ins.set(pk(ax, az, bx, bz), mid);
      o.push(...mid);
    }
    o.push(c[c.length - 2], c[c.length - 1]);
    r[4] = o;
  }
  {
    const N = DATA.G.n;
    for (const e of DATA.G.e) {
      const P = [N[e[0] * 2], N[e[0] * 2 + 1], ...(e[6] || []), N[e[1] * 2], N[e[1] * 2 + 1]],
        out = [];
      for (let i = 0; i < P.length - 2; i += 2) {
        if (i) out.push(P[i], P[i + 1]);
        const f = ins.get(pk(P[i], P[i + 1], P[i + 2], P[i + 3])),
          b = ins.get(pk(P[i + 2], P[i + 3], P[i], P[i + 1]));
        if (f) out.push(...f);
        else if (b) for (let k = b.length - 2; k >= 0; k -= 2) out.push(b[k], b[k + 1]);
      }
      if (out.length !== (e[6] || []).length) e[6] = out;
    }
  }
  const G = new Map(),
    gk = (x, z) => Math.floor(x / CELL) * 100000 + Math.floor(z / CELL);
  L.forEach((r, li) => {
    const c = r[4];
    for (let i = 0; i < c.length - 2; i += 2) {
      const x0 = Math.min(c[i], c[i + 2]) - 20,
        x1 = Math.max(c[i], c[i + 2]) + 20,
        z0 = Math.min(c[i + 1], c[i + 3]) - 20,
        z1 = Math.max(c[i + 1], c[i + 3]) + 20;
      for (let a = Math.floor(x0 / CELL); a <= Math.floor(x1 / CELL); a++)
        for (let b = Math.floor(z0 / CELL); b <= Math.floor(z1 / CELL); b++) {
          const k = a * 100000 + b;
          let l = G.get(k);
          if (!l) G.set(k, (l = []));
          l.push(li, i);
        }
    }
  });
  const disp = new Map();
  let moved = 0;
  L.forEach((r, li) => {
    const c = r[4];
    for (let i = 0; i < c.length; i += 2) {
      const x = c[i],
        z = c[i + 1];
      const j0 = Math.max(0, i - 2),
        j1 = Math.min(c.length - 2, i + 2);
      let tx = c[j1] - c[j0],
        tz = c[j1 + 1] - c[j0 + 1];
      const tl = Math.hypot(tx, tz) || 1;
      tx /= tl;
      tz /= tl;
      let best = null;
      const l = G.get(gk(x, z)) || [];
      for (let q = 0; q < l.length; q += 2) {
        const lj = l[q],
          k = l[q + 1];
        if (lj === li) continue;
        const r2 = L[lj],
          c2 = r2[4];
        const ax = c2[k],
          az = c2[k + 1],
          ex = c2[k + 2] - ax,
          ez = c2[k + 3] - az,
          L2 = ex * ex + ez * ez;
        if (L2 < 1) continue;
        const Lg = Math.sqrt(L2);
        if ((ex * tx + ez * tz) / Lg > -0.9) continue; // the other direction, running alongside
        const t = Math.max(0, Math.min(1, ((x - ax) * ex + (z - az) * ez) / L2)),
          px = ax + ex * t,
          pz = az + ez * t,
          d = Math.hypot(x - px, z - pz),
          need = (r[2] + r2[2]) / 2 + MED;
        if (d > 1.5 && d < need && (!best || d < best.d)) best = { d, px, pz, need };
      }
      if (!best) continue;
      const push = (best.need - best.d) / 2,
        k = x + ',' + z,
        o = disp.get(k);
      if (!o || push > o[2]) disp.set(k, [((x - best.px) / best.d) * push, ((z - best.pz) / best.d) * push, push]);
    }
  });
  if (!disp.size) return;
  const mv = (arr, i) => {
    const o = disp.get(arr[i] + ',' + arr[i + 1]);
    if (!o) return;
    arr[i] = Math.round((arr[i] + o[0]) * 100) / 100;
    arr[i + 1] = Math.round((arr[i + 1] + o[1]) * 100) / 100;
    CW_LOCK.add(arr[i] + ',' + arr[i + 1]);
    moved++;
  };
  for (const rd of DATA.R) {
    const c = rd[4];
    for (let i = 0; i < c.length; i += 2) mv(c, i);
  }
  const N = DATA.G.n;
  for (let i = 0; i < N.length; i += 2) mv(N, i);
  for (const e of DATA.G.e) if (e[6]) for (let i = 0; i < e[6].length; i += 2) mv(e[6], i);
  console.log('carriageways apart: points', disp.size, 'moved', moved);
})();
const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
// v1.4.22 (Jonay, 12-oct: «el dinero va en euros, no dólares»): an amount of money as it is written in Spain: «1.250 €»
const eur = (n) => Math.round(n).toLocaleString('es-ES', { useGrouping: true }) + ' €';
const smooth = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
const angDiff = (a, b) => {
  let d = b - a;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
};
// ---- separate carriageways that overlap: the two directions of a dual road, and an autovía running beside a general road.
// Every shared vertex moves the same way in the road list AND in the traffic graph, so junctions stay joined.
const SEPAR = []; // [ax, az, bx, bz, kind] midline runs for medians (kind: 2 = concrete barrier, 1 = kerb island)
(function separateCarriageways() {
  const R = DATA.R;
  const segs = [];
  const G = new Map(),
    CS = 30;
  R.forEach((rd, ri) => {
    if (rd[0] > 10) return;
    const c = rd[4];
    for (let i = 0; i < c.length - 2; i += 2) {
      const k = segs.length;
      segs.push([ri, c[i], c[i + 1], c[i + 2], c[i + 3]]);
      const x0 = Math.floor(Math.min(c[i], c[i + 2]) / CS),
        x1 = Math.floor(Math.max(c[i], c[i + 2]) / CS),
        z0 = Math.floor(Math.min(c[i + 1], c[i + 3]) / CS),
        z1 = Math.floor(Math.max(c[i + 1], c[i + 3]) / CS);
      for (let a = x0; a <= x1; a++)
        for (let b = z0; b <= z1; b++) {
          const key = a * 100000 + b;
          let l = G.get(key);
          if (!l) G.set(key, (l = []));
          l.push(k);
        }
    }
  });
  const nodeSet = R.map((rd) => {
    const st = new Set();
    const c = rd[4];
    for (let i = 0; i < c.length; i += 2) st.add(c[i] + ',' + c[i + 1]);
    return st;
  });
  const big = (t) => t <= 2;
  const MED = (ta, tb) => (big(ta) && big(tb) ? 2.4 : big(ta) || big(tb) ? 2.6 : 1.4); // (a sunk road beside one at street level gets the same gap: its retaining wall goes there)
  const shifts = new Map();
  let nPairs = 0;
  R.forEach((rd, ri) => {
    if (rd[0] > 10) return;
    const c = rd[4],
      n = c.length / 2;
    if (n < 2) return;
    const sh = new Array(n).fill(null);
    for (let v = 0; v < n; v++) {
      const x = c[v * 2],
        z = c[v * 2 + 1];
      if (CW_LOCK.has(x + ',' + z)) continue;
      const p = Math.max(0, v - 1),
        q = Math.min(n - 1, v + 1);
      let dx = c[q * 2] - c[p * 2],
        dz = c[q * 2 + 1] - c[p * 2 + 1];
      const dl = Math.hypot(dx, dz) || 1;
      dx /= dl;
      dz /= dl;
      let best = null;
      const l = G.get(Math.floor(x / CS) * 100000 + Math.floor(z / CS)) || [];
      for (const k of l) {
        const g = segs[k];
        const rj = g[0];
        if (rj === ri) continue;
        const r2 = R[rj];
        if ((r2[3] & 2) !== (rd[3] & 2)) continue; // a bridge and a road below are not side by side
        const ex = g[3] - g[1],
          ez = g[4] - g[2],
          L2 = ex * ex + ez * ez || 1,
          L = Math.sqrt(L2);
        const t = clamp(((x - g[1]) * ex + (z - g[2]) * ez) / L2, 0, 1);
        if (t <= 0 || t >= 1) continue;
        const px = g[1] + ex * t,
          pz = g[2] + ez * t,
          d = Math.hypot(x - px, z - pz);
        if (d < 1.2) continue;
        const dot = (dx * ex + dz * ez) / L;
        if (Math.abs(dot) < 0.94) continue;
        const need = (rd[2] + r2[2]) / 2 + MED(rd[0], r2[0]) - d;
        if (need <= 0.05) continue;
        // merges/splits: the two ways share a node close by → fade the shift out towards it
        let dj = 1e9;
        for (let i = 0; i < c.length; i += 2) if (nodeSet[rj].has(c[i] + ',' + c[i + 1])) dj = Math.min(dj, Math.hypot(c[i] - x, c[i + 1] - z));
        const f = clamp((dj - 18) / 45, 0, 1);
        if (f <= 0) continue;
        const m = Math.min(3.2, need / 2) * f;
        if (!best || m > best.m) best = { m, ux: (x - px) / d, uz: (z - pz) / d, kind: big(rd[0]) || big(r2[0]) ? 2 : 1 };
      }
      if (best) sh[v] = best;
    }
    // smooth along the road (no kinks where the neighbour starts/ends)
    const mag = sh.map((b) => (b ? b.m : 0));
    const sm = mag.slice();
    for (let pass = 0; pass < 2; pass++)
      for (let v = 0; v < n; v++) {
        if (!sh[v]) continue;
        const a = mag[Math.max(0, v - 1)],
          b = mag[Math.min(n - 1, v + 1)];
        sm[v] = Math.max(sm[v], (a + mag[v] * 2 + b) / 4);
      }
    for (let v = 0; v < n; v++) {
      if (!sh[v]) continue;
      nPairs++;
      const key = c[v * 2] + ',' + c[v * 2 + 1];
      const o = shifts.get(key);
      const mx = sh[v].ux * sm[v],
        mz = sh[v].uz * sm[v];
      if (!o) shifts.set(key, [mx, mz, 1]);
      else {
        o[0] += mx;
        o[1] += mz;
        o[2]++;
      }
    }
  });
  // apply the same displacement to every copy of each vertex
  // never let the shift make two ways cross where they didn't before: undo it around any new crossing
  const P2 = (k) => {
    const o = shifts.get(k);
    const [x, z] = k.split(',').map(Number);
    return o ? [x + o[0] / o[2], z + o[1] / o[2]] : [x, z];
  };
  const inter = (a, b, c2, d) => {
    const d1x = b[0] - a[0],
      d1z = b[1] - a[1],
      d2x = d[0] - c2[0],
      d2z = d[1] - c2[1];
    const den = d1x * d2z - d1z * d2x;
    if (Math.abs(den) < 1e-9) return false;
    const t = ((c2[0] - a[0]) * d2z - (c2[1] - a[1]) * d2x) / den,
      u = ((c2[0] - a[0]) * d1z - (c2[1] - a[1]) * d1x) / den;
    return t > 0.001 && t < 0.999 && u > 0.001 && u < 0.999;
  };
  for (let it = 0; it < 3; it++) {
    let undone = 0;
    for (const g of segs) {
      const ka = g[1] + ',' + g[2],
        kb = g[3] + ',' + g[4];
      if (!shifts.has(ka) && !shifts.has(kb)) continue;
      const A0 = [g[1], g[2]],
        B0 = [g[3], g[4]],
        A1 = P2(ka),
        B1 = P2(kb);
      const x0 = Math.floor(Math.min(A1[0], B1[0], g[1], g[3]) / CS),
        x1 = Math.floor(Math.max(A1[0], B1[0], g[1], g[3]) / CS),
        z0 = Math.floor(Math.min(A1[1], B1[1], g[2], g[4]) / CS),
        z1 = Math.floor(Math.max(A1[1], B1[1], g[2], g[4]) / CS);
      for (let a = x0; a <= x1; a++)
        for (let b = z0; b <= z1; b++)
          for (const k of G.get(a * 100000 + b) || []) {
            const h = segs[k];
            if (h[0] === g[0]) continue;
            const kc = h[1] + ',' + h[2],
              kd = h[3] + ',' + h[4];
            if (kc === ka || kc === kb || kd === ka || kd === kb) continue;
            if (inter(A1, B1, P2(kc), P2(kd)) && !inter(A0, B0, [h[1], h[2]], [h[3], h[4]])) {
              for (const kk of [ka, kb, kc, kd]) if (shifts.delete(kk)) undone++;
              for (const rr of [g[0], h[0]]) {
                const c = R[rr][4];
                for (let i = 0; i < c.length; i += 2) if (Math.hypot(c[i] - g[1], c[i + 1] - g[2]) < 45) shifts.delete(c[i] + ',' + c[i + 1]);
              }
            }
          }
    }
    if (!undone) break;
    console.log('separation undone near new crossings', undone);
  }
  const mv = (x, z) => {
    const o = shifts.get(x + ',' + z);
    return o ? [x + o[0] / o[2], z + o[1] / o[2]] : null;
  };
  const done = new Set();
  for (const rd of R) {
    const c = rd[4];
    for (let i = 0; i < c.length; i += 2) {
      const m = mv(c[i], c[i + 1]);
      if (m) {
        c[i] = m[0];
        c[i + 1] = m[1];
      }
    }
  }
  const N = DATA.G.n;
  for (let i = 0; i < N.length; i += 2) {
    const m = mv(N[i], N[i + 1]);
    if (m) {
      N[i] = m[0];
      N[i + 1] = m[1];
    }
  }
  for (const e of DATA.G.e) {
    const p = e[6];
    for (let i = 0; i < p.length; i += 2) {
      const m = mv(p[i], p[i + 1]);
      if (m) {
        p[i] = m[0];
        p[i + 1] = m[1];
      }
    }
  }
  console.log('carriageways separated: vertices', shifts.size, 'samples', nPairs);
})();
corrMotorwayStraighten(); // v1.2.0: the TF-5 from Lora Tamayo to the HUC, straight and parallel (04c_corredores.js)
corrMergeBridgeTwins(); // v1.2.4: the bridges drawn as two halves, side by side (Puente de Guajara); here, with the roads at their final widths
corrSideLanes(); // v1.2.0: the slip lanes beside the TF-5 and the Carretera General beyond them (04c_corredores.js)
fincaEspana(); // v1.3.4: the three carriageways of the Av. de los Menceyes at Finca España side by side (04e_fincaespana.js)
ringsMissing(); // v1.3.5: roundabouts whose ring the list of the map missed (La Verdellada) (04f_cebreados.js)
function mulberry(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
let rand = mulberry(1234);
const rnd = (a = 0, b = 1) => a + (b - a) * Math.random();
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---------- heightmap
const HM = (() => {
  const H = DATA.H;
  const bin = atob(H.d);
  const buf = new ArrayBuffer(bin.length);
  const u8 = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return { ...H, a: new Int16Array(buf) };
})();
hmSmoothZones(); // v1.2.1: the stepped relief of the 16 m heightmap, softened where it showed (04c_corredores.js)
function heightAt(x, z) {
  if (SUNK.length)
    for (const S of SUNK) {
      const dx = x - S.cx,
        dz = z - S.cz;
      if (Math.abs(dx) > S.r || Math.abs(dz) > S.r) continue;
      const u = dx * S.ux + dz * S.uz,
        v = dx * S.vx + dz * S.vz;
      if (u > S.u0 && u < S.u1 && v > S.v0 && v < S.v1) return S.y;
    }
  return SUNK_RAW(x, z);
}
function SUNK_RAW(x, z) {
  let gx = (x - HM.x0) / HM.dx,
    gz = (z - HM.z0) / HM.dx;
  gx = clamp(gx, 0, HM.nx - 1.001);
  gz = clamp(gz, 0, HM.nz - 1.001);
  const ix = gx | 0,
    iz = gz | 0,
    fx = gx - ix,
    fz = gz - iz,
    a = HM.a,
    n = HM.nx;
  const h00 = a[iz * n + ix],
    h10 = a[iz * n + ix + 1],
    h01 = a[(iz + 1) * n + ix],
    h11 = a[(iz + 1) * n + ix + 1];
  // same triangulation as the terrain mesh (diagonal from (1,0) to (0,1)) so things sit exactly on the rendered ground
  return (fx + fz <= 1 ? h00 + (h10 - h00) * fx + (h01 - h00) * fz : h11 + (h01 - h11) * (1 - fx) + (h10 - h11) * (1 - fz)) / 10;
}

// A phase-based FPS ceiling for the independent 3D and 2D render loops (60 by default).
// v1.4.44 (Jonay, 23-nov: «para pruebas quita el cap a 60, eso es solo para el juego, y para móvil lo pondría a 30»):
// fpsCap() is the ceiling: none in our tests (window.__JETA_TEST: the measurements see the real speed), 30 for the city
// on phones and tablets (battery and heat), 60 on PC. ?fps=N in the address forces it (0 = none).
// v1.4.44 (Jonay: «el limitador de FPS lo podemos poner como una opción del juego, por defecto a 60… con una barra que
// puedas desplazar hasta 144»): the city follows SETTINGS.fps (Opciones, 30–144; 60 on PC and 30 on phones by default),
// read on every frame, so the bar applies at once. The 2D minigames keep 60.
function fpsCap(kind) {
  // kind: 'city' (the 3D world: the Opciones bar) or anything else (2D minigames: 60)
  const m = /[?&]fps=(\d+)/.exec(location.search);
  if (m) return +m[1];
  if (window.__JETA_TEST) return 0;
  if (kind !== 'city') return 60;
  if (typeof SETTINGS !== 'undefined' && SETTINGS.fps) return SETTINGS.fps;
  return IS_TOUCH ? 30 : 60;
}
function makeFrameGate(fps = fpsCap('2d')) {
  const get = typeof fps === 'function' ? fps : () => fps;
  let next = -Infinity;
  return (now) => {
    const f = get();
    if (!f) return true;
    const interval = 1000 / f;
    if (now + 0.35 < next) return false;
    // Skip missed slots on slow frames or after switching tabs. Never catch them up with extra renders.
    if (now - next >= interval) next = now;
    next += interval;
    return true;
  };
}

// ---------- quality
const QUALITY = {
  baja: { pr: 0.75, shadow: 0, far: 520, peds: 12, traffic: 10, trees: 0.5 },
  media: { pr: 1, shadow: 1024, far: 800, peds: 20, traffic: 17, trees: 0.8 },
  movil: { pr: 1, shadow: 0, far: 600, peds: 14, traffic: 11, trees: 0.6 },
  alta: { pr: 1.5, shadow: 2048, far: 1150, peds: 30, traffic: 24, trees: 1, dist: 2, view: 1500, vis: 1.5 } // v1.4.44/45: detail ×2 (distK), view 1500 m (viewFar), people 255 m and cars 540 m (visK): measured, WebGPU over 60 FPS
};
const IS_TOUCH = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
const QKEY = IS_TOUCH ? 'gtall_qm' : 'gtall_q';
let Q = IS_TOUCH ? QUALITY.movil : QUALITY.alta;
let qName = IS_TOUCH ? 'movil' : 'alta';
try {
  const s = localStorage.getItem(QKEY);
  if (s && QUALITY[s]) {
    Q = QUALITY[s];
    qName = s;
  }
} catch (e) {}
{
  const m = /[?&]q=(\w+)/.exec(location.search);
  if (m && QUALITY[m[1]]) {
    Q = QUALITY[m[1]];
    qName = m[1];
  }
}

// v1.4.44 (Jonay, 23-nov: «si vamos sobrados de FPS aumentaremos la distancia de dibujado hasta que quede en los 60…
// se nota en las llantas de los coches»): one knob for the detail distances (full parked cars and their rims, full tree
// crowns, city details, small parts of cars and people, full bodies): distK() multiplies them. Per quality (Q.dist, 1 by
// default); ?dist=X in the address forces it (to measure).
// v1.4.44 (Jonay: «sí, súbelas»): the city's view distance (fog, city LOD, parked cars) is Q.view, apart from Q.far,
// which also places the traffic (raising it would spread the same cars over more ground); ?far=N forces the view
// distance. visK() multiplies how far people (170 m) and moving cars (360 m) are drawn; ?vis=X forces it.
{
  const m = /[?&]far=(\d+)/.exec(location.search);
  if (m) Q.view = +m[1];
}
function viewFar() {
  return Q.view || Q.far;
}
const VIS_URL = (() => {
  const m = /[?&]vis=([\d.]+)/.exec(location.search);
  return m ? +m[1] : null;
})();
function visK() {
  return VIS_URL ?? (Q.vis || 1);
}
const DIST_URL = (() => {
  const m = /[?&]dist=([\d.]+)/.exec(location.search);
  return m ? +m[1] : null;
})();
function distK() {
  return DIST_URL ?? (Q.dist || 1);
}
// ---------- renderer
// v1.4.44 (Jonay, 23-nov: «sigamos con webgpu a ver si lo adaptamos y rinde mejor»): with ?gpu=webgpu the game runs on
// three.js's WebGPURenderer (THREE.GPU, from the joint bundle of tools/juntar_three_gpu.py); without it, WebGL as always.
// Under WebGPU the materials with onBeforeCompile are drawn without their extra (pending: port them to TSL)
// v1.4.44: also chosen in Opciones (Motor gráfico, saved as 'jeta_motor'; ?gpu=webgl / ?gpu=webgpu force one)
// v1.4.46 (Jonay, 23-nov: «por defecto debería ir con WebGPU, si no se puede WebGL»): WebGPU unless the player chose WebGL,
// and only if it really starts: the browser must give a graphics adapter AND three.js must end up on its WebGPU backend
// (when the device cannot be created it falls back to a slower WebGL2 backend of its own: then the usual WebGLRenderer
// is used instead). Automated browsers (our tests, the auditor: navigator.webdriver) keep WebGL by default, since their
// measurements (GPU timer queries, programs) exist only there; the WebGPU probes ask for it with ?gpu=webgpu.
const GPU_CHOICE = (() => {
  if (/[?&]gpu=webgl/.test(location.search)) return 'webgl';
  if (/[?&]gpu=webgpu/.test(location.search)) return 'webgpu';
  try {
    const s = localStorage.getItem('jeta_motor');
    if (s === 'webgl' || s === 'webgpu') return s;
    // v1.4.47 (Jonay: «¿por defecto está WebGPU? me salió WebGL»): the automatic fall-back after a WebGPU failure lasts
    // only this browser session (before: saved for good as if chosen in Opciones); next time WebGPU is tried again
    if (sessionStorage.getItem('jeta_motor_sesion') === 'webgl') return 'webgl';
  } catch (e) {}
  return navigator.webdriver ? 'webgl' : 'webgpu';
})();
let USE_GPU = GPU_CHOICE === 'webgpu' && !!(THREE.GPU && navigator.gpu);
// (powerPreference: Chrome and Edge on Windows ignore it for WebGPU and warn in the console; it is asked elsewhere, where it
// picks the strong card of laptops with two)
const GPU_PREF = /Windows/.test(navigator.userAgent) ? {} : { powerPreference: 'high-performance' };
// ?trazastsl=1: where each TSL warning comes from (three.js keeps a stack trace per node)
if (/[?&]trazastsl=1/.test(location.search) && THREE.GPU && THREE.GPU.Node) THREE.GPU.Node.captureStackTrace = true;
if (USE_GPU) {
  try {
    USE_GPU = !!(await navigator.gpu.requestAdapter(GPU_PREF));
  } catch (e) {
    USE_GPU = false;
  }
}
let renderer = null;
if (USE_GPU) {
  try {
    renderer = new THREE.GPU.WebGPURenderer({ antialias: !IS_TOUCH, ...GPU_PREF });
    await renderer.init();
    if (!(renderer.backend && renderer.backend.isWebGPUBackend)) throw new Error('sin WebGPU (respaldo WebGL2 de three.js)');
  } catch (e) {
    console.warn('WebGPU no arranca, se usa WebGL:', e && e.message);
    try {
      renderer && renderer.dispose();
    } catch (e2) {}
    renderer = null;
    USE_GPU = false;
  }
}
if (!renderer) renderer = new THREE.WebGLRenderer({ antialias: !IS_TOUCH, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, Q.pr));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = Q.shadow > 0;
renderer.shadowMap.type = THREE.PCFShadowMap; // v1.4.46: PCFSoftShadowMap no longer exists in three.js (r186+: it was already PCF, with a console warning)
renderer.autoClear = false;
$('game').appendChild(renderer.domElement);
const MAXANI = USE_GPU ? renderer.getMaxAnisotropy() : renderer.capabilities.getMaxAnisotropy();

const ACTORS = new Map();
const ACULL = []; // v1.0.0: people, cars and rooms drawn only up to a distance (actorCull, 05w_optimiza.js)
const scene = new THREE.Scene();
const bgScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.25, 3200);
const bgCamera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 50, 90000);
// Leave the distant land and skyline in bgScene. Finish the foreground haze a little earlier.
function cityFogFar() {
  return viewFar() - (Q === QUALITY.alta ? 75 : Q === QUALITY.media ? 45 : 0);
}
scene.fog = new THREE.Fog(0xc9d6e0, 120, cityFogFar());
bgScene.fog = new THREE.Fog(0xc9d6e0, 2500, 60000);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = bgCamera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  bgCamera.updateProjectionMatrix();
  if (typeof HUD !== 'undefined') HUD.resize();
});

// ---------- lights
const hemi = new THREE.HemisphereLight(0xcfe3ff, 0x5b5140, 0.9);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff1dd, 2.6);
sun.castShadow = Q.shadow > 0;
if (Q.shadow) {
  sun.shadow.mapSize.set(Q.shadow, Q.shadow);
}
const SH = 95;
Object.assign(sun.shadow.camera, { left: -SH, right: SH, top: SH, bottom: -SH, near: 10, far: 700 });
// v1.4.44: objects only the shadow camera sees (the low versions of the trees that cast their shadow: 05w_optimiza.js)
const SHADOW_LAYER = 1;
sun.shadow.camera.layers.enable(SHADOW_LAYER);
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.6;
sun.shadow.radius = 2; // v1.4.47: softer edges (r186+ PCF: 5 samples whatever the radius, so it costs nothing; 1 by default; tests/herramientas/foto_sombras_radio.py)
scene.add(sun);
scene.add(sun.target);
const bgSun = new THREE.DirectionalLight(0xffffff, 2.0);
bgScene.add(bgSun);
const bgHemi = new THREE.HemisphereLight(0xcfe3ff, 0x6a6050, 1.0);
bgScene.add(bgHemi);

// ---------- progress helper
const loadSteps = [];
function setLoad(txt, p) {
  const el = $('loadtxt');
  if (el) el.textContent = txt;
  const b = $('loadbar');
  if (b) b.style.width = Math.round(p * 100) + '%';
}
const nextFrame = () => new Promise((r) => setTimeout(r, 0));

// Shared uniforms (time of day etc.)
const U = { uNight: { value: 0 }, uTime: { value: 0 } };
