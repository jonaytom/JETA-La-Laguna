import json, math, base64, hashlib
import numpy as np
from scipy.interpolate import RectBivariateSpline

import os
d = json.load(open('data/laguna_osm3.json' if os.path.exists('data/laguna_osm3.json') else 'data/laguna_osm2.json'))
lat0, lon0 = 28.4875, -16.3150
kx = math.cos(math.radians(lat0)) * 111320
kz = 110574

# ---------------- heightmap
E = d['ELEV']; N = E['N']
g = np.array(E['E'], dtype=float).reshape(N, N)  # [lat_i][lon_j]
lats = np.linspace(E['la0'], E['la1'], N)
lons = np.linspace(E['lo0'], E['lo1'], N)
# local coords of grid: x from lon, z = -(lat-lat0)*kz  (z decreases as lat increases)
gx = (lons - lon0) * kx
gz = -(lats - lat0) * kz  # decreasing
# spline needs increasing coordinates -> flip lat axis
spl = RectBivariateSpline(gz[::-1], gx, g[::-1, :], kx=3, ky=3, s=0)
base = float(spl(0, 0)[0, 0])
DX = 16.0
X0, X1, Z0, Z1 = (-4808 if 'ELEV2' in d else -2600), 2800, -1800, 4400  # -4808 keeps the 16 m grid aligned with the old -2600
nx = int((X1 - X0) / DX) + 1
nz = int((Z1 - Z0) / DX) + 1
xs = X0 + np.arange(nx) * DX
zs = Z0 + np.arange(nz) * DX
H = spl(np.clip(zs, gz.min(), gz.max()), np.clip(xs, gx.min(), gx.max())) - base  # [nz, nx]
if 'ELEV2' in d:  # western extension (airport): 32 m Copernicus grid, blended into the old one between x = -2446 and -2300
    E2 = d['ELEV2']; g2 = np.array([v if v is not None else np.nan for v in E2['e']], dtype=float).reshape(E2['nz'], E2['nx'])
    if np.isnan(g2).any():  # fill gaps with neighbours
        m = np.isnan(g2); idx = np.where(~m); from scipy.interpolate import griddata
        g2[m] = griddata(np.array(idx).T, g2[~m], np.array(np.where(m)).T, method='nearest')
    x2 = E2['x0'] + np.arange(E2['nx']) * E2['d']; z2 = E2['z0'] + np.arange(E2['nz']) * E2['d']
    spl2 = RectBivariateSpline(z2, x2, g2, kx=1, ky=1, s=0)
    H2 = spl2(np.clip(zs, z2.min(), z2.max()), np.clip(xs, x2.min(), x2.max())) - base
    wx = np.clip((xs - (-2446)) / 146.0, 0, 1)[None, :]  # 0 → only new grid, 1 → old grid
    H = H * wx + H2 * (1 - wx)
Hq = np.round(H * 10).astype(np.int16)
hb64 = base64.b64encode(Hq.tobytes()).decode()
print('base elev', base, 'H range', H.min(), H.max(), nx, nz)

# ---------------- strings
S = []; Si = {}
def sidx(s):
    if not s: return -1
    if s not in Si:
        Si[s] = len(S); S.append(s)
    return Si[s]

def q(c):  # round coords to 0.5
    return [round(v * 2) / 2 for v in c]

# ---------------- historic core polygon
core = [(-680, -420), (-420, -640), (-120, -700), (320, -720), (360, 120), (260, 320), (-160, 300), (-420, 120), (-700, -120)]
def pip(x, z, poly):
    ins = False; n = len(poly); j = n - 1
    for i in range(n):
        xi, zi = poly[i]; xj, zj = poly[j]
        if ((zi > z) != (zj > z)) and (x < (xj - xi) * (z - zi) / (zj - zi + 1e-9) + xi):
            ins = not ins
        j = i
    return ins

def hsh(s):
    return int(hashlib.md5(s.encode()).hexdigest()[:8], 16) / 0xffffffff

def area(c):
    a = 0; n = len(c) // 2
    for i in range(n):
        x1, z1 = c[2 * i], c[2 * i + 1]; x2, z2 = c[(2 * i + 2) % (2 * n)], c[(2 * i + 3) % (2 * n)]
        a += x1 * z2 - x2 * z1
    return a / 2

STY = {'colonial': 0, 'modern': 1, 'block': 2, 'industrial': 3, 'church': 4, 'greenhouse': 5, 'inst': 6}
# assemble open ways (multipolygon members) into closed rings
closed = []; openw = []
for t, c in d['B']:
    if c[0] == c[-2] and c[1] == c[-1]: closed.append((t, c))
    else: openw.append([t, [(c[i], c[i + 1]) for i in range(0, len(c), 2)]])
def near(a, b): return abs(a[0] - b[0]) < 0.6 and abs(a[1] - b[1]) < 0.6
used = [False] * len(openw); rings = 0
for i in range(len(openw)):
    if used[i]: continue
    used[i] = True; t, ring = openw[i][0], list(openw[i][1])
    changed = True
    while not near(ring[0], ring[-1]) and changed:
        changed = False
        for j in range(len(openw)):
            if used[j]: continue
            seg = openw[j][1]
            if near(ring[-1], seg[0]): ring += seg[1:]
            elif near(ring[-1], seg[-1]): ring += seg[::-1][1:]
            elif near(ring[0], seg[-1]): ring = seg[:-1] + ring
            elif near(ring[0], seg[0]): ring = seg[::-1][:-1] + ring
            else: continue
            used[j] = True; changed = True; break
    if near(ring[0], ring[-1]) and len(ring) >= 4:
        closed.append((t, [v for p in ring for v in p])); rings += 1
print('assembled rings', rings)
B = []
for t, c in closed:
    c = q(c)
    if len(c) >= 4 and c[0] == c[-2] and c[1] == c[-1]:
        c = c[:-2]
    if len(c) < 6: continue
    A = area(c)
    if abs(A) < 6: continue
    if A < 0:  # make CCW in x/z (positive area)
        pts = [(c[i], c[i + 1]) for i in range(0, len(c), 2)][::-1]
        c = [v for p in pts for v in p]
    xs_ = c[0::2]; zs_ = c[1::2]
    cx, cz = sum(xs_) / len(xs_), sum(zs_) / len(zs_)
    bt = t.get('building', 'yes')
    r = hsh(str(c[:4]))
    hist = pip(cx, cz, core)
    lv = None
    try:
        lv = float(t.get('building:levels')) if t.get('building:levels') else None
    except: lv = None
    h = None
    try:
        h = float(str(t.get('height')).replace('m', '')) if t.get('height') else None
    except: h = None
    style = STY['modern']
    if bt in ('church', 'cathedral', 'chapel', 'convent'):
        style = STY['church']
        if h is None: h = 26 if bt == 'cathedral' else (7 if abs(A) < 120 else 13)
    elif bt == 'greenhouse':
        style = STY['greenhouse']; h = h or 3.5
    elif bt in ('industrial', 'warehouse', 'roof', 'garage', 'garages', 'construction'):
        style = STY['industrial']
        h = h or (3 if bt in ('garage', 'garages') else (4 if bt == 'roof' else 7 + r * 3))
    elif bt in ('university', 'school', 'college', 'hospital', 'public', 'civic', 'transportation', 'dormitory', 'fire_station', 'sports_centre', 'stadium', 'government', 'office'):
        style = STY['inst']
        if lv is None: lv = {'university': 4, 'school': 3, 'hospital': 6, 'dormitory': 5, 'stadium': 3, 'sports_centre': 3}.get(bt, 3)
    elif hist:
        style = STY['colonial']
        if lv is None: lv = 1 if r < 0.25 else 2 if r < 0.9 else 3
    elif bt in ('apartments',):
        style = STY['block']
        if lv is None: lv = 4 + int(r * 5)
    elif bt in ('residential',):
        style = STY['block'] if abs(A) > 250 else STY['modern']
        if lv is None: lv = 3 + int(r * 3)
    else:  # house / yes / detached / terrace
        style = STY['modern']
        if lv is None:
            if abs(A) > 900: lv = 3 + int(r * 3); style = STY['block']
            else: lv = 1 if r < 0.3 else 2 if r < 0.8 else 3
    if h is None:
        h = lv * (3.6 if style == STY['colonial'] else 3.1) + 0.6
    if lv is None: lv = max(1, round(h / 3.2))
    roof = 0  # 0 flat, 1 hipped tiles
    rs = t.get('roof:shape')
    if rs in ('hipped', 'gabled', 'pyramidal'): roof = 1
    elif style == STY['colonial'] and abs(A) < 600: roof = 1 if r < 0.8 else 0
    elif style == STY['church']: roof = 1
    elif style == STY['modern'] and abs(A) < 200 and r > 0.8: roof = 1
    name = t.get('name')
    B.append([round(h * 10), style, int(lv), roof, sidx(name or t.get('brand')), round(r * 1000), c])

# ---------------- roads
RT = ['motorway', 'motorway_link', 'trunk', 'primary', 'primary_link', 'secondary', 'secondary_link', 'tertiary', 'tertiary_link',
      'unclassified', 'residential', 'living_street', 'service', 'pedestrian', 'footway', 'steps', 'path', 'track', 'cycleway']
RW = {'motorway': 12, 'motorway_link': 7, 'trunk': 11, 'primary': 10, 'primary_link': 7, 'secondary': 9, 'secondary_link': 7, 'tertiary': 8,
      'tertiary_link': 6, 'unclassified': 6.5, 'residential': 6.5, 'living_street': 5, 'service': 4.5, 'pedestrian': 6, 'footway': 2.4,
      'steps': 2.4, 'path': 1.6, 'track': 3.5, 'cycleway': 2.2}
R = []
for t, c in d['R']:
    hw = t.get('highway')
    if hw not in RT: continue
    c = q(c)
    w = RW[hw]
    try:
        if t.get('width'): w = float(t['width'])
    except: pass
    if hw in ('residential', 'tertiary', 'secondary', 'primary', 'motorway', 'motorway_link', 'trunk') and t.get('lanes'):
        try: w = max(w, float(t['lanes']) * 3.3)
        except: pass
    ow = t.get('oneway')
    if ow == '-1':  # one-way against the drawing direction: reverse geometry
        pts_ = [(c[i], c[i + 1]) for i in range(0, len(c), 2)][::-1]; c = [v for p in pts_ for v in p]; ow = 'yes'
    implied = hw in ('motorway', 'motorway_link', 'trunk_link') or t.get('junction') in ('roundabout', 'circular')
    one = (ow in ('yes', '1', 'true')) or (implied and ow != 'no')
    rbt = t.get('junction') in ('roundabout', 'circular')
    if rbt: w = max(w, 9.0)
    flags = (1 if one else 0) | (2 if t.get('bridge') in ('yes', 'viaduct') else 0) | (4 if t.get('tunnel') in ('yes', 'building_passage') else 0) | (32 if rbt else 0)
    surf = t.get('surface', '')
    paved = 1 if (hw == 'pedestrian' or surf in ('paving_stones', 'sett', 'cobblestone')) and hw not in ('motorway',) else 0
    if hw == 'track' or surf in ('ground', 'dirt', 'gravel', 'unpaved'): paved = 2
    R.append([RT.index(hw), sidx(t.get('name')), round(w * 10) / 10, flags | (paved << 3), c])

# ---------------- enlarge small roundabouts (the OSM ring + a radial warp of everything around it)
import math as _m
par = {}
def fnd(a):
    while par.setdefault(a, a) != a: par[a] = par[par[a]]; a = par[a]
    return a
rb = [i for i, rr in enumerate(R) if rr[3] & 32]
for i in rb:
    c = R[i][4]; a = (c[0], c[1]); b = (c[-2], c[-1]); par[fnd(('r', i))] = fnd(a); par[fnd(b)] = fnd(a)
comp = {}
for i in rb: comp.setdefault(fnd(('r', i)), []).append(i)
WARPS = []; RBS = []
for k, ids in comp.items():
    pts = set()
    for i in ids:
        c = R[i][4]; pts.update((c[j], c[j + 1]) for j in range(0, len(c), 2))
    if len(pts) < 5: continue
    cx = sum(p[0] for p in pts) / len(pts); cz = sum(p[1] for p in pts) / len(pts)
    ds = [_m.hypot(p[0] - cx, p[1] - cz) for p in pts]; Rr = sum(ds) / len(ds)
    if max(ds) - min(ds) > Rr * 0.6 or Rr < 3: continue  # not a clean circle
    if Rr > 15: RBS.append([round(cx, 1), round(cz, 1), round(Rr, 1), round(max(R[i][2] for i in ids), 1)]); continue
    Rn = max(Rr, min(16.0, Rr * 1.9)); K = 2 * (Rn - Rr) + 12; RBS.append([round(cx, 1), round(cz, 1), round(Rn, 1), 10.0])
    WARPS.append([round(cx, 2), round(cz, 2), round(Rr, 2), round(Rn, 2), round(K, 2)])
    for i in ids: R[i][2] = max(R[i][2], 10.0)
print('enlarged roundabouts', len(WARPS))
def warp_pt(x, z):
    for cx, cz, Rr, Rn, K in WARPS:
        dx, dz = x - cx, z - cz; d = _m.hypot(dx, dz)
        if d >= Rr + K or d < 1e-6: continue
        nd = d * Rn / Rr if d <= Rr else Rn + (d - Rr) * (Rr + K - Rn) / K
        x, z = cx + dx / d * nd, cz + dz / d * nd
    return x, z
def warp_flat(c):
    o = []
    for j in range(0, len(c), 2):
        x, z = warp_pt(c[j], c[j + 1]); o += [round(x * 2) / 2, round(z * 2) / 2]
    return o
for rr in R: rr[4] = warp_flat(rr[4])
for b in B: b[6] = warp_flat(b[6])

# ---------------- dead-end ways that run into a building (loading bays, garages, entrances): stop them at the wall
def _pip(x, z, P):
    c = False; n = len(P) // 2
    for i in range(n):
        ax, az = P[2 * i], P[2 * i + 1]; bx, bz = P[2 * ((i - 1) % n)], P[2 * ((i - 1) % n) + 1]
        if (az > z) != (bz > z) and x < (bx - ax) * (z - az) / ((bz - az) or 1e-9) + ax: c = not c
    return c
_BG = {}
for bi, b in enumerate(B):
    c = b[6]; xs = c[0::2]; zs = c[1::2]
    for gx in range(int(min(xs) // 50), int(max(xs) // 50) + 1):
        for gz in range(int(min(zs) // 50), int(max(zs) // 50) + 1): _BG.setdefault((gx, gz), []).append(bi)
def _inb(x, z):
    for bi in _BG.get((int(x // 50), int(z // 50)), []):
        if _pip(x, z, B[bi][6]): return True
    return False
_deg = {}
for rr in R:
    c = rr[4]
    for j in (0, len(c) - 2): _deg[(c[j], c[j + 1])] = _deg.get((c[j], c[j + 1]), 0) + 1
    for j in range(2, len(c) - 2, 2): _deg[(c[j], c[j + 1])] = _deg.get((c[j], c[j + 1]), 0) + 2
ntrim = 0
for rr in R:
    for end in (0, 1):
        c = rr[4]
        if len(c) < 4: break
        if end: c = c[::-1]; c = [v for k in range(0, len(c), 2) for v in (c[k + 1], c[k])]
        if _deg.get((c[0], c[1]), 0) != 1 or not _inb(c[0], c[1]): continue
        # walk inwards in 0.5 m steps until outside the building, keep 1 m of clearance
        pts = [(c[k], c[k + 1]) for k in range(0, len(c), 2)]; cut = None; acc = 0.0
        for k in range(len(pts) - 1):
            (x1, z1), (x2, z2) = pts[k], pts[k + 1]; L = _m.hypot(x2 - x1, z2 - z1); st = max(1, int(L / 0.5))
            for qq in range(1, st + 1):
                t = qq / st; x, z = x1 + (x2 - x1) * t, z1 + (z2 - z1) * t
                if not _inb(x, z):
                    t2 = min(1.0, t + 1.0 / max(L, 1e-6)); cut = (k, x1 + (x2 - x1) * t2, z1 + (z2 - z1) * t2); break
            if cut: break
        if not cut: continue
        k, x, z = cut; rest = pts[k + 1:]
        if len(rest) < 1: continue
        newc = [round(x * 2) / 2, round(z * 2) / 2] + [v for p in rest for v in p]
        if len(newc) < 4 or _m.hypot(newc[0] - newc[2], newc[1] - newc[3]) < 0.1 and len(newc) < 6: continue
        if end: newc = [v for k2 in range(len(newc) - 2, -1, -2) for v in (newc[k2], newc[k2 + 1])]
        rr[4] = newc; ntrim += 1
print('ways cut at a building wall', ntrim)
# buildings that a drivable way runs straight through (canopies / roofs over service roads mapped as buildings,
# mostly at the airport): drop them, the road wins
_drop = set()
for rr in R:
    if rr[0] > 12: continue
    c = rr[4]
    for k in range(0, len(c) - 2, 2):
        x1, z1, x2, z2 = c[k], c[k + 1], c[k + 2], c[k + 3]; L = _m.hypot(x2 - x1, z2 - z1); st = max(1, int(L / 2))
        for qq in range(st + 1):
            x, z = x1 + (x2 - x1) * qq / st, z1 + (z2 - z1) * qq / st
            for bi in _BG.get((int(x // 50), int(z // 50)), []):
                if bi in _drop: continue
                b = B[bi]
                if b[2] <= 2 and _pip(x, z, b[6]):
                    xs = b[6][0::2]; zs = b[6][1::2]
                    if (max(xs) - min(xs)) * (max(zs) - min(zs)) < 3000: _drop.add(bi)
B = [b for bi, b in enumerate(B) if bi not in _drop]
print('buildings dropped (a road runs through them)', len(_drop))

# ---------------- tram polyline (chain)
tw = [q(c) for t, c in d['T']]
segs = [[(c[i], c[i + 1]) for i in range(0, len(c), 2)] for c in tw]
# start at La Trinidad terminus
start = min((p for s in segs for p in (s[0], s[-1])), key=lambda p: (p[0] + 117) ** 2 + (p[1] - 113) ** 2)
line = [start]; used = set()
cur = start
while True:
    best = None
    for i, s in enumerate(segs):
        if i in used: continue
        for rev in (False, True):
            ss = s[::-1] if rev else s
            dd = (ss[0][0] - cur[0]) ** 2 + (ss[0][1] - cur[1]) ** 2
            if dd < 16 and (best is None or dd < best[0]):
                # prefer continuing forward direction: avoid going back
                best = (dd, i, ss)
    if not best: break
    used.add(best[1])
    # ignore tiny crossover segments (<4 pts) if they reverse direction
    line.extend(best[2][1:]); cur = line[-1]
# clip to area
T = []
for p in line:
    if p[0] < -2000 or p[0] > 2500 or p[1] < -1300 or p[1] > 4100: break
    T.extend(p)
print('tram pts', len(T) // 2)

# ---------------- streets moved apart at the tram stops: the game's carriageways (wider than OSM) ran over the
# tracks and the platforms (agent: car stuck on the platform at Av. de los Menceyes and 8 more stops). Near each stop
# every way on each side of the line is pushed outwards with a smooth curve, just enough to leave the platform
# (the game uses 24 x 1.85 m platforms, 80 % of the real ones) plus a kerb gap, and never into a building.
def _tram_stop_shift():
    TRAM_HW, PLAT_W, PLAT_L = 3.6, 1.85, 24.0
    NEED = TRAM_HW + PLAT_W + 0.6          # nearest carriageway edge, metres from the tram axis
    CORE = PLAT_L / 2 + 2.4 + 2.0           # platform + ramps + margin, half length along the line
    FADE = 30.0                             # back to the original line over this distance
    _BG2 = {}
    for bi, b in enumerate(B):
        c = b[6]; xs = c[0::2]; zs = c[1::2]
        for gx in range(int(min(xs) // 50), int(max(xs) // 50) + 1):
            for gz in range(int(min(zs) // 50), int(max(zs) // 50) + 1): _BG2.setdefault((gx, gz), []).append(bi)
    def _inb2(x, z):
        for bi in _BG2.get((int(x // 50), int(z // 50)), []):
            if _pip(x, z, B[bi][6]): return True
        return False
    def _tram_near(x, z):
        best = None
        for i in range(0, len(T) - 2, 2):
            ax, az, bx, bz = T[i], T[i + 1], T[i + 2], T[i + 3]; dx, dz = bx - ax, bz - az; L2 = dx * dx + dz * dz or 1
            t = max(0, min(1, ((x - ax) * dx + (z - az) * dz) / L2)); px, pz = ax + dx * t, az + dz * t; dd = _m.hypot(x - px, z - pz)
            if best is None or dd < best[0]: L = _m.sqrt(L2); best = (dd, px, pz, dx / L, dz / L)
        return best
    _stops = {}
    for pp in d['P']:
        if pp[1] != 'tram_stop': continue
        x, z = warp_pt(pp[2][0], pp[2][1]); _stops.setdefault(pp[0], []).append((x, z))
    STOPS = []
    for nm, l in _stops.items():
        cx = sum(p[0] for p in l) / len(l); cz = sum(p[1] for p in l) / len(l); tn = _tram_near(cx, cz)
        if tn and tn[0] < 30: STOPS.append((nm, tn[1], tn[2], tn[3], tn[4]))
    def _sm(t): t = max(0.0, min(1.0, t)); return t * t * (3 - 2 * t)
    def _frame(st, x, z): _, px, pz, ux, uz = st; vx, vz = x - px, z - pz; return vx * ux + vz * uz, vx * -uz + vz * ux   # along, lateral (+ = left)
    def _densify(c, keep):
        out = [c[0], c[1]]
        for k in range(0, len(c) - 2, 2):
            x1, z1, x2, z2 = c[k], c[k + 1], c[k + 2], c[k + 3]; L = _m.hypot(x2 - x1, z2 - z1)
            if keep(x1, z1) or keep(x2, z2) or keep((x1 + x2) / 2, (z1 + z2) / 2):
                n = max(1, int(L / 4))
                for j in range(1, n): out += [round((x1 + (x2 - x1) * j / n) * 2) / 2, round((z1 + (z2 - z1) * j / n) * 2) / 2]
            out += [x2, z2]
        return out
    nmoved = 0; report = []
    for st in STOPS:
        inzone = lambda x, z, st=st: (lambda a, l: abs(a) < CORE + FADE and 0.5 < abs(l) < 30)(*_frame(st, x, z))
        for rr in R:
            if any(inzone(rr[4][k], rr[4][k + 1]) for k in range(0, len(rr[4]), 2)) or any(inzone((rr[4][k] + rr[4][k + 2]) / 2, (rr[4][k + 1] + rr[4][k + 3]) / 2) for k in range(0, len(rr[4]) - 2, 2)):
                rr[4] = _densify(rr[4], inzone)
        for side in (1, -1):
            # how far the nearest parallel carriageway on this side must move
            need = 0.0; drv = []
            for ri, rr in enumerate(R):
                if rr[0] > 12 or (rr[3] & 6): continue
                c = rr[4]
                for k in range(0, len(c), 2):
                    a, l = _frame(st, c[k], c[k + 1])
                    if abs(a) > CORE or l * side < 0.5 or l * side > 25: continue
                    j = k if k + 2 < len(c) else k - 2; dx, dz = c[j + 2] - c[j], c[j + 3] - c[j + 1]; dl = _m.hypot(dx, dz) or 1
                    if abs((dx * st[3] + dz * st[4]) / dl) < 0.7: continue      # cross streets keep their place
                    need = max(need, NEED - (abs(l) - rr[2] / 2)); drv.append((ri, k))
            if need <= 0.05: continue
            def shift(a, l, D):
                if l * side < 0.5: return 0.0
                return D * (1 - _sm((abs(a) - CORE) / FADE)) * (1 - _sm((abs(l) - 22) / 8))
            # never push a carriageway or its pavement into a building
            D = need
            while D > 0:
                ok = True
                for ri, k in drv:
                    rr = R[ri]; x, z = rr[4][k], rr[4][k + 1]; a, l = _frame(st, x, z); s_ = shift(a, l, D)
                    _nx, _nz = -st[4] * side, st[3] * side; e = rr[2] / 2 + 2.6
                    if _inb2(x + _nx * (s_ + e), z + _nz * (s_ + e)) and not _inb2(x + _nx * e, z + _nz * e): ok = False; break
                if ok: break
                D = round(D - 0.25, 2)
            if D <= 0: report.append((st[0], side, round(need, 1), 0)); continue
            moved = {}
            for rr in R:
                c = rr[4]
                for k in range(0, len(c), 2):
                    a, l = _frame(st, c[k], c[k + 1]); s_ = shift(a, l, D)
                    if s_ > 0.05: moved[(c[k], c[k + 1])] = (c[k] - st[4] * side * s_, c[k + 1] + st[3] * side * s_)
            for rr in R:
                c = rr[4]
                for k in range(0, len(c), 2):
                    m = moved.get((c[k], c[k + 1]))
                    if m: c[k], c[k + 1] = round(m[0] * 2) / 2, round(m[1] * 2) / 2
            nmoved += len(moved); report.append((st[0], side, round(need, 1), D))
    print('tram stops: streets moved apart', nmoved, 'points;', report)
    for _rr in R:   # rounding can leave two equal points in a row (zero-length segments -> NaN normals in the game)
        _c = _rr[4]; _o = [_c[0], _c[1]]
        for _k in range(2, len(_c), 2):
            if _c[_k] != _o[-2] or _c[_k + 1] != _o[-1]: _o += [_c[_k], _c[_k + 1]]
        _rr[4] = _o
    R[:] = [rr for rr in R if len(rr[4]) >= 4]
_tram_stop_shift()

# ---------------- road graph for AI traffic
AI = {'motorway', 'motorway_link', 'trunk', 'primary', 'primary_link', 'secondary', 'secondary_link', 'tertiary', 'tertiary_link', 'unclassified', 'residential'}
cnt = {}
ways = []
for rr in R:
    hw = RT[rr[0]]
    if hw not in AI: continue
    c = rr[4]; pts = [(c[i], c[i + 1]) for i in range(0, len(c), 2)]
    ways.append((rr, pts))
    for i, p in enumerate(pts):
        cnt[p] = cnt.get(p, 0) + (2 if i in (0, len(pts) - 1) else 1)
nodes = {}; NL = []
def nid(p):
    if p not in nodes:
        nodes[p] = len(NL) // 2; NL.extend(p)
    return nodes[p]
EDG = []
for rr, pts in ways:
    seg = [pts[0]]
    for p in pts[1:]:
        seg.append(p)
        if cnt[p] >= 2 or p == pts[-1]:
            if len(seg) >= 2:
                a, b = nid(seg[0]), nid(seg[-1])
                EDG.append([a, b, rr[0], rr[3] & 1, round(rr[2] * 10) / 10, rr[1], [v for s in seg[1:-1] for v in s]])
            seg = [p]
print('graph nodes', len(NL) // 2, 'edges', len(EDG))


# ---------------- areas
AT = ['park', 'garden', 'grass', 'farmland', 'meadow', 'pitch', 'forest', 'scrub', 'water', 'cemetery', 'playground', 'parking', 'residential', 'industrial', 'square', 'sports', 'orchard']
A = []
for t, c in d['A']:
    k = None
    lu = t.get('landuse'); le = t.get('leisure'); na = t.get('natural'); am = t.get('amenity')
    if le in ('park', 'dog_park', 'garden'): k = 'park' if le != 'garden' else 'garden'
    elif le == 'pitch': k = 'pitch'
    elif le in ('playground',): k = 'playground'
    elif le in ('stadium', 'sports_centre', 'track', 'swimming_pool'): k = 'sports'
    elif lu in ('grass', 'village_green', 'recreation_ground', 'greenfield'): k = 'grass'
    elif lu in ('farmland', 'vineyard'): k = 'farmland'
    elif lu == 'orchard': k = 'orchard'
    elif lu == 'meadow': k = 'meadow'
    elif lu == 'forest' or na == 'wood': k = 'forest'
    elif na in ('scrub', 'fell', 'heath'): k = 'scrub'
    elif na == 'water' or le == 'swimming_pool': k = 'water'
    elif lu == 'cemetery': k = 'cemetery'
    elif am == 'parking': k = 'parking'
    elif lu in ('residential', 'commercial', 'retail'): k = 'residential'
    elif lu in ('industrial', 'construction'): k = 'industrial'
    if k is None: continue
    c = q(c)
    if c[0] == c[-2] and c[1] == c[-1]: c = c[:-2]
    if len(c) < 6: continue
    A.append([AT.index(k), sidx(t.get('name')), c])

# squares from pedestrian areas? (pedestrian roads closed ways) -> add as square
for rr in R:
    if RT[rr[0]] == 'pedestrian':
        c = rr[4]
        if len(c) >= 8 and c[0] == c[-2] and c[1] == c[-1]:
            A.append([AT.index('square'), rr[1], c[:-2]])

for a in A: a[2] = warp_flat(a[2])
T = warp_flat(T)
Nt = warp_flat([v for p in d['N'] for v in p])
P = [[sidx(p[0]), p[1], *warp_pt(p[2][0], p[2][1])] for p in d['P']]

out = dict(H=dict(x0=X0, z0=Z0, dx=DX, nx=nx, nz=nz, base=round(base, 1), d=hb64), S=S, RT=RT, AT=AT,
           B=B, R=R, G=dict(n=NL, e=EDG), T=T, A=A, N=Nt, P=P, W=WARPS, RB=RBS, AW=d.get('AW', []))
s = json.dumps(out, separators=(',', ':'), ensure_ascii=False)
open('data/data.json', 'w').write(s)
print('size', len(s))
