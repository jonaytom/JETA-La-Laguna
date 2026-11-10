# Árboles del juego hechos en Blender (v1.3.0): se ejecuta dentro de Blender (MCP o Texto > Ejecutar).
# Crea la colección JETA_Arboles con tronco y copa de cada tipo, con colores por vértice; exportar_arboles.py los pasa a data/arboles.json.
import bpy, bmesh, math, random
from mathutils import Vector, noise

COLN = 'JETA_Arboles'
col = bpy.data.collections.get(COLN) or bpy.data.collections.new(COLN)
if col.name not in [c.name for c in bpy.context.scene.collection.children]:
    bpy.context.scene.collection.children.link(col)
for o in list(col.objects):
    bpy.data.objects.remove(o, do_unlink=True)


def finish(name, bm, loc, colfn, smooth=False):
    bmesh.ops.triangulate(bm, faces=bm.faces[:])
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = smooth
    o = bpy.data.objects.new(name, me)
    col.objects.link(o)
    o.location = loc
    ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for poly in me.polygons:
        for li in poly.loop_indices:
            v = me.vertices[me.loops[li].vertex_index].co
            r, g, b = colfn(v, poly.center, poly.normal)
            ca.data[li].color = (min(1, r), min(1, g), min(1, b), 1)
    return o


def frame(t):
    a = Vector((0, 0, 1)) if abs(t.z) < 0.95 else Vector((1, 0, 0))
    u = t.cross(a).normalized()
    w = t.cross(u).normalized()
    return u, w


def tube(bm, path, radii, sides, jit=0.0, cap=True):
    rings = []
    for i, p in enumerate(path):
        t = (path[min(i + 1, len(path) - 1)] - path[max(i - 1, 0)]).normalized()
        u, w = frame(t)
        ring = []
        for k in range(sides):
            ang = 2 * math.pi * k / sides
            r = radii[i] * (1 + jit * (random.random() - 0.5))
            ring.append(bm.verts.new(p + (u * math.cos(ang) + w * math.sin(ang)) * r))
        rings.append(ring)
    for i in range(len(rings) - 1):
        a, b = rings[i], rings[i + 1]
        for k in range(sides):
            bm.faces.new((a[k], a[(k + 1) % sides], b[(k + 1) % sides], b[k]))
    if cap:
        bm.faces.new(rings[-1])
    return rings


def blob(bm, c, r, sx=1, sy=1, sz=1, sub=1, amp=0.25, seed=0):
    m = bmesh.ops.create_icosphere(bm, subdivisions=sub, radius=r)
    for v in m['verts']:
        n = v.co.normalized()
        d = 1 + amp * noise.noise(n * 2.3 + Vector((seed * 3.1, seed * 1.7, seed * 0.9)))
        v.co = Vector((n.x * r * d * sx, n.y * r * d * sy, n.z * r * d * sz)) + c
    return m['verts']


def bark(v, c, n):
    k = 0.85 + 0.15 * noise.noise(v * 3.0)
    return (0.42 * k, 0.33 * k, 0.26 * k)


# ---------------- 1. LAUREL DE INDIAS (big dense dark crown, short thick trunk, a few visible limbs)
random.seed(1)
bm = bmesh.new()
tube(bm, [Vector((0, 0, 0)), Vector((0, 0, 1.4)), Vector((0.1, 0, 2.6))], [0.55, 0.45, 0.4], 9, 0.08, cap=False)
for ang, ln in [(0.3, 2.6), (2.4, 2.4), (4.3, 2.8)]:
    d = Vector((math.cos(ang), math.sin(ang), 0))
    p0 = Vector((0.1, 0, 2.4))
    tube(bm, [p0, p0 + d * ln * 0.45 + Vector((0, 0, 1.1)), p0 + d * ln + Vector((0, 0, 1.9))], [0.32, 0.22, 0.12], 6)
finish('laurel_trunk', bm, (0, 0, 0), bark, smooth=True)
bm = bmesh.new()
random.seed(2)
spots = [(0, 0, 5.6, 3.3, 1.25, 1.25, 0.8)]
for i in range(6):
    a = i / 6 * 6.28 + random.random() * 0.4
    rr = random.uniform(2.2, 3.4)
    spots.append((math.cos(a) * rr, math.sin(a) * rr, random.uniform(4.0, 5.8), random.uniform(1.6, 2.3), 1.1, 1.1, 0.75))
for i, (x, y, z, r, sx, sy, sz) in enumerate(spots):
    blob(bm, Vector((x, y, z)), r, sx, sy, sz, sub=2, amp=0.3, seed=i)


def leafcol(base, under=0.62, var=0.12):
    def f(v, c, n):
        k = 1.0 - var + var * 2 * (0.5 + 0.5 * noise.noise(c * 0.9))
        sh = under + (1 - under) * max(0.0, min(1.0, 0.5 + 0.5 * n.z))
        return (base[0] * k * sh, base[1] * k * sh, base[2] * k * sh)
    return f


finish('laurel_crown', bm, (0, 0, 0), leafcol((0.20, 0.36, 0.15)))
bm = bmesh.new()
blob(bm, Vector((0, 0, 5.1)), 4.1, 1.3, 1.25, 0.8, sub=0, amp=0.1, seed=7)
finish('laurel_lo', bm, (0, 0, 0), leafcol((0.20, 0.36, 0.15)))

# ---------------- 2. PALMERA CANARIA (straight thick trunk with leaf scars, big round crown of fronds, dates)
random.seed(3)
bm = bmesh.new()
H = 9.0
path = [Vector((0, 0, z)) for z in [0, 0.4] + [0.4 + i * (H - 0.4) / 14 for i in range(1, 15)]]
radii = [0.75, 0.62] + [0.56 + (0.05 if i % 2 else -0.02) for i in range(1, 15)]
tube(bm, path, radii, 10, 0.04)
# the "pineapple" collar of old frond bases under the crown
tube(bm, [Vector((0, 0, H - 0.2)), Vector((0, 0, H + 0.5)), Vector((0, 0, H + 0.9))], [0.66, 0.82, 0.4], 10)


def palmbark(v, c, n):
    ring = 0.82 + 0.18 * (1 if int(v.z * 3.2) % 2 else 0)
    if v.z > H - 0.3:
        return (0.48, 0.38, 0.22)
    return (0.48 * ring, 0.40 * ring, 0.30 * ring)


finish('palm_trunk', bm, (0, 0, 0), palmbark, smooth=True)
bm = bmesh.new()
N = 34
for i in range(N):
    az = i * 2.39996  # golden angle
    tier = i / N
    elev = 1.15 - tier * 1.55  # up-pointing first, drooping last
    L = random.uniform(4.6, 5.6)
    seg = 5
    d0 = Vector((math.cos(az) * math.cos(elev), math.sin(az) * math.cos(elev), math.sin(elev)))
    side = Vector((-math.sin(az), math.cos(az), 0))
    pts = []
    p = Vector((0, 0, H + 0.6))
    for s in range(seg + 1):
        t = s / seg
        pts.append(p.copy())
        d = (d0 + Vector((0, 0, -1.6 * t * t))).normalized()
        p = p + d * (L / seg)
    rows = []
    for s, q in enumerate(pts):
        t = s / seg
        wdt = 0.75 * math.sin(math.pi * min(1, t * 1.15 + 0.05)) + 0.05
        fold = Vector((0, 0, -0.18 * wdt))  # V-shaped frond
        rows.append((bm.verts.new(q + side * wdt + fold), bm.verts.new(q), bm.verts.new(q - side * wdt + fold)))
    for s in range(seg):
        a, b = rows[s], rows[s + 1]
        bm.faces.new((a[0], a[1], b[1], b[0]))
        bm.faces.new((a[1], a[2], b[2], b[1]))
# dates (orange clusters)
for k in range(5):
    az = k * 1.3
    blob(bm, Vector((math.cos(az) * 0.7, math.sin(az) * 0.7, H + 0.1)), 0.35, 1, 1, 1.4, sub=0, amp=0.15, seed=40 + k)


def palmcol(v, c, n):
    if c.z < H + 0.4 and abs(c.x) < 1.3 and abs(c.y) < 1.3:
        return (0.85, 0.5, 0.12)
    k = 0.85 + 0.15 * noise.noise(c * 0.7)
    tip = max(0.0, min(1.0, (Vector((c.x, c.y, 0)).length - 2.5) / 3))
    return ((0.33 + 0.15 * tip) * k, (0.48 + 0.05 * tip) * k, 0.18 * k)


finish('palm_crown', bm, (0, 0, 0), palmcol)
# far crown: 9 flat fronds of 2 pieces
bm = bmesh.new()
for i in range(9):
    az = i * 2.39996
    elev = 0.9 - i / 9 * 1.3
    d0 = Vector((math.cos(az) * math.cos(elev), math.sin(az) * math.cos(elev), math.sin(elev)))
    side = Vector((-math.sin(az), math.cos(az), 0)) * 0.9
    p0 = Vector((0, 0, H + 0.6))
    p1 = p0 + d0 * 2.6
    p2 = p1 + (d0 + Vector((0, 0, -1.2))).normalized() * 2.4
    a0, a1, a2 = bm.verts.new(p0), bm.verts.new(p1 + side), bm.verts.new(p1 - side)
    t = bm.verts.new(p2)
    bm.faces.new((a0, a1, a2))
    bm.faces.new((a1, t, a2))
finish('palm_lo', bm, (0, 0, 0), lambda v, c, n: (0.36, 0.49, 0.19))

# ---------------- 3. DRAGO (thick trunk splitting into stout arms, spiky rosettes at the tips)
# ---------------- 3. DRAGO (Jonay's photos: thick grey fibrous trunk swollen at the foot; smooth grey limbs that fork
# in twos again and again, curving up and out like a candelabra; at every tip a round burst of long blue-green sword
# leaves, the lower ones yellow and hanging. Small: a couple of forks; big: many, the rosettes making an umbrella)
def make_drago(name, H, R, arms, levels, ln0, rr, nleaf, seed, spread=(0.45, 0.7), up=0.25, rf=0.62, out0=0.85):
    random.seed(seed)
    bm = bmesh.new()
    zs = [0, 0.35, 0.9, H * 0.55, H]
    tube(bm, [Vector((0, 0, z)) for z in zs], [R * 1.45, R * 1.15, R * 1.0, R * 0.92, R * 0.95], 10, 0.12, cap=False)
    tips = []

    def limb(p0, d, ln, r, lv):
        mid = p0 + d * ln * 0.5 + Vector((0, 0, ln * 0.12))
        p1 = p0 + d * ln + Vector((0, 0, ln * 0.2))
        tube(bm, [p0, mid, p1], [r, r * 0.9, r * 0.8], 6 if lv > 2 else 5 if lv > 0 else 4, cap=lv == 0)
        d1 = (p1 - mid).normalized()
        if lv == 0:
            tips.append((p1, d1))
            return
        side = d1.cross(Vector((0, 0, 1)))
        if side.length < 1e-3:
            side = Vector((1, 0, 0))
        side.normalize()
        rot = random.uniform(-0.6, 0.6)
        side = side * math.cos(rot) + d1.cross(side) * math.sin(rot)
        for sg in (1, -1):
            nd = (d1 + side * sg * random.uniform(*spread) + Vector((0, 0, up))).normalized()
            limb(p1, nd, ln * random.uniform(0.72, 0.86), r * 0.74, lv - 1)

    for k in range(arms):
        a = k / arms * 6.28 + random.uniform(-0.25, 0.25)
        d = Vector((math.cos(a) * out0, math.sin(a) * out0, 0.55)).normalized()
        limb(Vector((0, 0, H - 0.2)), d, ln0 * random.uniform(0.9, 1.1), R * rf, levels)
    finish(name + '_trunk', bm, (0, 0, 0), lambda v, c, n: (0.50 * (0.9 + 0.1 * noise.noise(v * 2)), 0.49 * (0.9 + 0.1 * noise.noise(v * 2)), 0.45), smooth=True)
    bm = bmesh.new()
    for p, d in tips:
        c = p + Vector((0, 0, rr * 0.15))
        for k in range(nleaf):
            # directions spread over the sphere, fewer straight down
            z = 1 - 2 * (k + 0.5) / nleaf
            z = z * 0.85 + 0.1
            ang = k * 2.39996 + random.random() * 0.3
            rxy = math.sqrt(max(0.0, 1 - z * z))
            dv = Vector((math.cos(ang) * rxy, math.sin(ang) * rxy, z))
            L = rr * random.uniform(0.8, 1.15)
            tip = c + dv * L + Vector((0, 0, -0.35 * L * max(0.0, -z)))  # the low ones hang
            s = dv.cross(Vector((0, 0, 1)))
            if s.length < 1e-3:
                s = Vector((1, 0, 0))
            s = s.normalized() * 0.1 * rr
            bm.faces.new((bm.verts.new(c - s), bm.verts.new(c + s), bm.verts.new(tip)))

    def dcol(v, cc, n):
        low = cc.z - 0  # world-independent: use the leaf direction via the normal's tilt
        dry = max(0.0, min(1.0, -n.z * 1.5))
        k = 0.85 + 0.15 * noise.noise(cc * 1.7)
        g = (0.27 * k, 0.52 * k, 0.36 * k)
        y = (0.55, 0.48, 0.18)
        return tuple(g[i] * (1 - dry) + y[i] * dry for i in range(3))

    finish(name + '_crown', bm, (0, 0, 0), dcol)
    # far crown: one flattened dome over the rosettes
    xs = [p.x for p, d in tips]; ys = [p.y for p, d in tips]; zs2 = [p.z for p, d in tips]
    cx = sum(xs) / len(xs); cy = sum(ys) / len(ys); cz = sum(zs2) / len(zs2)
    rad = max(math.hypot(p.x - cx, p.y - cy) for p, d in tips) + rr * 0.8
    bm = bmesh.new()
    blob(bm, Vector((cx, cy, cz + rr * 0.2)), rad, 1, 1, max(0.35, (rr * 1.2) / rad), sub=1, amp=0.12, seed=seed)
    finish(name + '_lo', bm, (0, 0, 0), lambda v, c, n: (0.27, 0.5, 0.35))


make_drago('drago', 2.4, 0.4, 3, 1, 1.4, 1.7, 44, 5, rf=0.7)  # small: one fork per arm (6 big rosettes)
make_drago('dragom', 3.2, 0.62, 4, 2, 1.7, 1.5, 36, 6, spread=(0.55, 0.85), up=0.2, rf=0.72)  # medium: 16 rosettes
make_drago('dragol', 3.6, 1.1, 7, 3, 2.1, 1.45, 26, 8, spread=(0.7, 1.05), up=0.08, rf=0.66, out0=1.6)  # big umbrella: 48

random.seed(7)
bm = bmesh.new()
tube(bm, [Vector((0, 0, 0)), Vector((0.05, 0, 1.6)), Vector((0, 0.05, 3.0))], [0.2, 0.17, 0.12], 7, cap=False)
for ang in (0.5, 2.6, 4.6):
    d = Vector((math.cos(ang), math.sin(ang), 0))
    p0 = Vector((0, 0.05, 2.6))
    tube(bm, [p0, p0 + d * 0.9 + Vector((0, 0, 0.9))], [0.1, 0.05], 5)
finish('gen_trunk', bm, (0, 0, 0), bark, smooth=True)
bm = bmesh.new()
blob(bm, Vector((0, 0, 4.2)), 1.9, 1, 1, 1.05, sub=2, amp=0.3, seed=11)
for i in range(4):
    a = i * 1.57 + 0.4
    blob(bm, Vector((math.cos(a) * 1.3, math.sin(a) * 1.3, 3.7 + random.random() * 0.8)), 1.3, 1, 1, 0.95, sub=2, amp=0.3, seed=12 + i)
finish('gen_crown', bm, (0, 0, 0), leafcol((0.33, 0.50, 0.21), under=0.68))
bm = bmesh.new()
blob(bm, Vector((0, 0, 4.1)), 2.5, 1, 1, 1.0, sub=0, amp=0.1, seed=19)
finish('gen_lo', bm, (0, 0, 0), leafcol((0.33, 0.50, 0.21), under=0.68))

# lay them out in a row for looking (x offsets), each type's parts at the same spot
OFF = {'laurel': 0, 'palm': 14, 'pine': 28, 'drago': 42, 'dragom': 56, 'dragol': 74, 'gen': 96}
for o in col.objects:
    k = o.name.split('_')[0]
    o.location = (OFF.get(k, 70), -20, 0)
for o in col.objects:
    print(o.name, len(o.data.polygons))

mat = bpy.data.materials['JETA_vcol']
for o in col.objects:
    o.data.materials.clear(); o.data.materials.append(mat)
print([(o.name, len(o.data.polygons)) for o in col.objects])
