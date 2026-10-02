import json, math, base64, hashlib
import numpy as np
from scipy.interpolate import RectBivariateSpline

d = json.load(open('data/laguna_osm2.json'))
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
X0, X1, Z0, Z1 = -2600, 2800, -1800, 4400
nx = int((X1 - X0) / DX) + 1
nz = int((Z1 - Z0) / DX) + 1
xs = X0 + np.arange(nx) * DX
zs = Z0 + np.arange(nz) * DX
H = spl(np.clip(zs, gz.min(), gz.max()), np.clip(xs, gx.min(), gx.max())) - base  # [nz, nx]
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
           B=B, R=R, G=dict(n=NL, e=EDG), T=T, A=A, N=Nt, P=P, W=WARPS, RB=RBS)
s = json.dumps(out, separators=(',', ':'), ensure_ascii=False)
open('data/data.json', 'w').write(s)
print('size', len(s))
