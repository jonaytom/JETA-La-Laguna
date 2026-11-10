# Hierba y matojos del juego (v1.3.1), hechos en Blender: matas de hierba verde (parques y jardines), hierba seca
# (descampados) y un matojo bajo (descampados y laderas). Se ejecuta dentro de Blender; exportar_arboles.py los guarda.
import bpy, bmesh, math, random
from mathutils import Vector, noise

col = bpy.data.collections.get('JETA_Hierba') or bpy.data.collections.new('JETA_Hierba')
if col.name not in [c.name for c in bpy.context.scene.collection.children]:
    bpy.context.scene.collection.children.link(col)
for o in list(col.objects):
    bpy.data.objects.remove(o, do_unlink=True)


def finish(name, bm, colfn, x):
    bmesh.ops.triangulate(bm, faces=bm.faces[:])
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    col.objects.link(o)
    o.location = (x, -40, 0)
    ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for poly in me.polygons:
        for li in poly.loop_indices:
            v = me.vertices[me.loops[li].vertex_index].co
            r, g, b = colfn(v)
            ca.data[li].color = (min(1, r), min(1, g), min(1, b), 1)
    mat = bpy.data.materials.get('JETA_vcol')
    if mat:
        me.materials.append(mat)
    return o


def tuft(n, h0, h1, lean, wid, seed, spread=0.22):
    random.seed(seed)
    bm = bmesh.new()
    for k in range(n):
        a = k / n * 6.28 + random.uniform(-0.3, 0.3)
        r0 = random.uniform(0, spread)
        base = Vector((math.cos(a) * r0, math.sin(a) * r0, 0))
        h = random.uniform(h0, h1)
        d = Vector((math.cos(a) * lean * random.uniform(0.5, 1.2), math.sin(a) * lean * random.uniform(0.5, 1.2), 1)).normalized()
        side = Vector((-math.sin(a), math.cos(a), 0)) * wid
        mid = base + d * h * 0.55
        tip = base + d * h + Vector((math.cos(a), math.sin(a), 0)) * lean * h * 0.4
        v0, v1 = bm.verts.new(base - side), bm.verts.new(base + side)
        m0, m1 = bm.verts.new(mid - side * 0.6), bm.verts.new(mid + side * 0.6)
        t = bm.verts.new(tip)
        bm.faces.new((v0, v1, m1, m0))
        bm.faces.new((m0, m1, t))
    return bm


def grad(base, top, h):
    def f(v):
        t = max(0.0, min(1.0, v.z / h))
        k = 0.92 + 0.08 * noise.noise(v * 9)
        return tuple((base[i] * (1 - t) + top[i] * t) * k for i in range(3))
    return f


finish('hierba_verde', tuft(9, 0.35, 0.6, 0.35, 0.05, 1), grad((0.20, 0.33, 0.12), (0.45, 0.62, 0.25), 0.6), 0)
finish('hierba_seca', tuft(8, 0.3, 0.55, 0.45, 0.045, 2), grad((0.42, 0.40, 0.22), (0.78, 0.70, 0.42), 0.55), 2)
# low scrub: a few lumpy blobs (like a small tabaiba / matorral)
random.seed(3)
bm = bmesh.new()
for k in range(4):
    a = k * 1.7
    c = Vector((math.cos(a) * 0.3, math.sin(a) * 0.3, 0.25 + random.random() * 0.15))
    m = bmesh.ops.create_icosphere(bm, subdivisions=1, radius=0.38)
    for v in m['verts']:
        n = v.co.normalized()
        d = 1 + 0.3 * noise.noise(n * 2.7 + Vector((k, k * 2, 0)))
        v.co = Vector((n.x * 0.38 * d, n.y * 0.38 * d, n.z * 0.3 * d)) + c
finish('matojo', bm, grad((0.22, 0.28, 0.14), (0.42, 0.48, 0.22), 0.8), 4)
print([(o.name, len(o.data.polygons)) for o in col.objects])
