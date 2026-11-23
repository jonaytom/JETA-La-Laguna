# v1.4.47 (Jonay, 23-nov: «el árbol de calle es el más feo, no sé de dónde salió ese modelo… haz el árbol ese más decente,
# desentona demasiado, igual que los setos, que son de color amarillo y otros colores, están muy simplones»): un árbol de
# calle nuevo (gen) y tres arbustos de jardinera (seto_boj, seto_bug, seto_flor), en la colección JETA_Arboles, con el
# mismo sistema que arboles_blender.py (colores por vértice, triángulos). Se ejecuta en Blender DESPUÉS de
# arboles_blender.py (usa sus funciones si están; si no, las define aquí). exportar_arboles.py los pasa a arboles.json.
import bpy, bmesh, math, random
from mathutils import Vector, noise

COLN = 'JETA_Arboles'
col = bpy.data.collections.get(COLN) or bpy.data.collections.new(COLN)
if col.name not in [c.name for c in bpy.context.scene.collection.children]:
    bpy.context.scene.collection.children.link(col)
for o in list(col.objects):
    if o.name.split('_')[0] in ('gen', 'seto'):
        bpy.data.objects.remove(o, do_unlink=True)


def finish(name, bm, colfn, smooth=False):
    bmesh.ops.triangulate(bm, faces=bm.faces[:])
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = smooth
    o = bpy.data.objects.new(name, me)
    col.objects.link(o)
    ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for poly in me.polygons:
        for li in poly.loop_indices:
            v = me.vertices[me.loops[li].vertex_index].co
            r, g, b = colfn(v, poly.center, poly.normal, poly.index)
            ca.data[li].color = (min(1, r), min(1, g), min(1, b), 1)
    mat = bpy.data.materials.get('JETA_vcol')
    if mat:
        me.materials.append(mat)
    return o


def frame(t):
    a = Vector((0, 0, 1)) if abs(t.z) < 0.95 else Vector((1, 0, 0))
    u = t.cross(a).normalized()
    return u, t.cross(u).normalized()


def tube(bm, path, radii, sides):
    rings = []
    for i, p in enumerate(path):
        t = (path[min(i + 1, len(path) - 1)] - path[max(i - 1, 0)]).normalized()
        u, w = frame(t)
        rings.append([bm.verts.new(p + (u * math.cos(2 * math.pi * k / sides) + w * math.sin(2 * math.pi * k / sides)) * radii[i]) for k in range(sides)])
    for i in range(len(rings) - 1):
        a, b = rings[i], rings[i + 1]
        for k in range(sides):
            bm.faces.new((a[k], a[(k + 1) % sides], b[(k + 1) % sides], b[k]))
    bm.faces.new(rings[-1])


def cluster(bm, c, r, sx=1.0, sy=1.0, sz=0.8, seed=0, sub=0):
    """a leaf cluster: a lumpy, slightly flattened low-poly ball (20 triangles with sub=0)"""
    m = bmesh.ops.create_icosphere(bm, subdivisions=sub, radius=r)
    rot = random.random() * 6.28
    for v in m['verts']:
        n = v.co.normalized()
        d = 1 + 0.35 * noise.noise(n * 2.1 + Vector((seed * 3.1, seed * 1.7, seed * 0.9)))
        x, y = n.x * math.cos(rot) - n.y * math.sin(rot), n.x * math.sin(rot) + n.y * math.cos(rot)
        v.co = Vector((x * r * d * sx, y * r * d * sy, n.z * r * d * sz)) + c
    return m['verts']


def bark(v, c, n, i):
    k = 0.82 + 0.18 * noise.noise(v * 2.7)
    return (0.40 * k, 0.32 * k, 0.25 * k)


# ---------------- ÁRBOL DE CALLE (gen): trunk opening into 4 limbs, each with a couple of twigs; a crown of ~40 small
# leaf clusters at the tips and filling a slightly flattened dome; leaf greens varied per cluster
random.seed(21)
bm = bmesh.new()
tube(bm, [Vector((0, 0, 0)), Vector((0.04, 0, 1.0)), Vector((0, 0.04, 1.9))], [0.27, 0.22, 0.18], 8)
tips = []
for k in range(4):
    a = k * math.pi / 2 + 0.3 + random.uniform(-0.25, 0.25)
    d = Vector((math.cos(a), math.sin(a), 0))
    p0 = Vector((0, 0.04, 1.8))
    p1 = p0 + d * 0.8 + Vector((0, 0, 0.9))
    p2 = p1 + d * 0.9 + Vector((0, 0, 0.7))
    tube(bm, [p0, p1, p2], [0.14, 0.09, 0.05], 6)
    tips.append(p2)
    for s in (-0.7, 0.7):  # twigs
        b = Vector((math.cos(a + s), math.sin(a + s), 0))
        q = p1 + b * 0.7 + Vector((0, 0, 0.6))
        tube(bm, [p1, q], [0.045, 0.025], 4)
        tips.append(q)
finish('gen_trunk', bm, bark, smooth=True)

GREENS = [(0.17, 0.32, 0.11), (0.21, 0.37, 0.13), (0.14, 0.27, 0.09), (0.25, 0.41, 0.15)]
bm = bmesh.new()
cols = []
centres = []
for t in tips:  # a big cluster at every branch tip
    centres.append((t + Vector((0, 0, 0.3)), random.uniform(0.95, 1.25)))  # a big mass at every branch tip
H, R = 3.7, 2.3  # the dome: centre height and radius
while len(centres) < 34:
    p = Vector((random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-0.45, 0.75)))
    if p.length > 1 or (p.length < 0.45 and random.random() < 0.7):  # gaps: fewer in the core
        continue
    # pulled towards the nearest tip: masses, not a uniform cloud
    q = Vector((p.x * R, p.y * R, H + p.z * 1.3))
    tip = min(tips, key=lambda t: (t - q).length)
    q = q.lerp(tip + Vector((0, 0, 0.4)), 0.35)
    centres.append((q, random.uniform(0.6, 0.9)))
for i, (c, r) in enumerate(centres):
    cluster(bm, c, r, seed=i)
finish('gen_crown', bm, lambda v, c, n, i: (lambda g, sh: (g[0] * sh, g[1] * sh, g[2] * sh))(
    GREENS[int(abs(noise.noise(c * 0.9)) * 97) % 4], (0.72 + 0.28 * max(0, n.z)) * (0.9 + 0.2 * noise.noise(c * 2.0))))
# far crown: one lumpy dome of 80 triangles
bm = bmesh.new()
cluster(bm, Vector((0, 0, H)), 2.6, 1, 1, 0.72, seed=99, sub=2)
finish('gen_lo', bm, lambda v, c, n, i: tuple(x * (0.75 + 0.25 * max(0, n.z)) for x in GREENS[1]))

# ---------------- ARBUSTOS DE JARDINERA (seto_*): ~0.9 m wide, standing on the planter (the game puts them at 0.6 m)


def shrub(name, n, R, Hc, flat, palette, flowers=None, nflow=0, seed=1, boxy=False):
    random.seed(seed)
    bm = bmesh.new()
    centres = []
    while len(centres) < n:
        p = Vector((random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(0, 1)))
        if (max(abs(p.x), abs(p.y)) if boxy else p.length) > 1:
            continue
        centres.append(Vector((p.x * R, p.y * R, 0.12 + p.z * Hc * flat)))
    for i, c in enumerate(centres):
        cluster(bm, c, random.uniform(0.18, 0.26), seed=seed * 10 + i, sz=0.85)
    nleaf = len(bm.faces)
    fl = []
    if flowers:
        for j in range(nflow):  # small flower clusters ON the outer leaves (not floating)
            c = max(random.sample(centres, 4), key=lambda q: Vector((q.x, q.y, (q.z - 0.3) * 0.8)).length)  # an outer cluster
            a = random.uniform(0, 6.28)
            dirn = (Vector((c.x, c.y, max(0.15, c.z - 0.3))).normalized() + Vector((math.cos(a), math.sin(a), 0.3)) * 0.5).normalized()
            fl.append(c + dirn * 0.16)
        for i, c in enumerate(fl):
            cluster(bm, c, random.uniform(0.06, 0.09), seed=seed * 100 + i, sz=0.9)

    def colfn(v, c, nrm, i):
        sh = 0.72 + 0.28 * max(0, nrm.z)
        if flowers and i >= nleaf:  # the flower clusters come after the leaves (icosphere faces are triangles already)
            return tuple(x * (0.85 + 0.15 * sh) for x in flowers)
        g = palette[int(abs(noise.noise(c * 3.0)) * 97) % len(palette)]
        return tuple(x * sh for x in g)

    return finish(name, bm, colfn)


shrub('seto_boj', 30, 0.45, 0.75, 1.0, [(0.13, 0.27, 0.09), (0.16, 0.31, 0.10), (0.11, 0.23, 0.08)], seed=3, boxy=True)
shrub('seto_bug', 26, 0.48, 0.85, 1.0, [(0.15, 0.30, 0.10), (0.19, 0.34, 0.12)], flowers=(0.78, 0.10, 0.42), nflow=55, seed=5)
shrub('seto_flor', 26, 0.46, 0.8, 1.0, [(0.16, 0.31, 0.10), (0.20, 0.36, 0.12)], flowers=(0.95, 0.75, 0.12), nflow=40, seed=8)

# lay them out in a row for looking
OFF = {'gen': 96, 'seto': 110}
xs = {'seto_boj': 0, 'seto_bug': 2.2, 'seto_flor': 4.4}
for o in col.objects:
    k = o.name.split('_')[0]
    if k == 'gen':
        o.location = (96, -20, 0)
    elif k == 'seto':
        o.location = (110 + xs.get(o.name, 0), -20, 0)
print([(o.name, len(o.data.polygons)) for o in col.objects if o.name.split('_')[0] in ('gen', 'seto')])
