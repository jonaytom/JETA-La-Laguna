# Exporta los árboles de la colección JETA_Arboles (arboles_blender.py) y el pino de Quaternius (Poly Pizza, CC0) a
# data/arboles.json para el juego (v1.3.0). Se ejecuta dentro de Blender.
# Formato: { tipo: { trunk|crown|lo: { p: [x,y,z cm…], n: [nx,ny,nz ×100…], c: [r,g,b 0-255 lineal…] } } }, triángulos
# sueltos (sin índices), en coordenadas del juego (Y arriba): x = X de Blender, y = Z, z = −Y; el pie del tronco en 0.
import bpy, bmesh, json, math
from mathutils import Vector

OUT = r'E:\Claude\GTA La Laguna\repo\data\arboles.json'
col = bpy.data.collections['JETA_Arboles']


def mat_color(m):
    if m and m.use_nodes:
        for n in m.node_tree.nodes:
            if n.bl_idname == 'ShaderNodeBsdfPrincipled':
                c = n.inputs['Base Color'].default_value
                return (c[0], c[1], c[2])
    return (0.5, 0.5, 0.5)


def dump(obj, origin, flat, only_mat=None, ratio=None, colour=None):
    """obj's triangles (world space minus origin) → dict; only_mat: material index to keep; ratio: decimate."""
    dg = bpy.context.evaluated_depsgraph_get()
    bm = bmesh.new()
    bm.from_object(obj, dg)
    bm.transform(obj.matrix_world)
    if only_mat is not None:
        bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.material_index != only_mat], context='FACES')
    bmesh.ops.triangulate(bm, faces=bm.faces[:])
    me = bpy.data.meshes.new('_tmp')
    bm.to_mesh(me)
    bm.free()
    if ratio:
        o2 = bpy.data.objects.new('_tmp', me)
        bpy.context.scene.collection.objects.link(o2)
        mod = o2.modifiers.new('dec', 'DECIMATE')
        mod.ratio = ratio
        dg = bpy.context.evaluated_depsgraph_get()
        me2 = bpy.data.meshes.new_from_object(o2.evaluated_get(dg))
        bpy.data.objects.remove(o2)
        bpy.data.meshes.remove(me)
        me = me2
    me.calc_loop_triangles()
    ca = me.color_attributes.get('Col')

    def colour_of(li):
        if ca and colour is None:
            c = ca.data[li].color
            return (c[0], c[1], c[2])
        return colour

    def b(x):
        return max(0, min(255, round(x * 255)))

    P, N, C, I = [], [], [], []
    if flat:
        # flat crowns: loose triangles, no normals (the game shades them flat from the triangle itself)
        for t in me.loop_triangles:
            for k in range(3):
                v = me.vertices[t.vertices[k]].co - origin
                c = colour_of(t.loops[k])
                P += [round(v.x * 100), round(v.z * 100), round(-v.y * 100)]
                C += [b(c[0]), b(c[1]), b(c[2])]
    else:
        # smooth trunks: shared vertices with their normals, and the triangle indices
        vc = {}
        for t in me.loop_triangles:
            for k in range(3):
                vc.setdefault(t.vertices[k], t.loops[k])
        for vi, v0 in enumerate(me.vertices):
            v = v0.co - origin
            n = v0.normal
            c = colour_of(vc[vi]) if vi in vc else (0.5, 0.4, 0.3)
            P += [round(v.x * 100), round(v.z * 100), round(-v.y * 100)]
            N += [round(n.x * 100), round(n.z * 100), round(-n.y * 100)]
            C += [b(c[0]), b(c[1]), b(c[2])]
        for t in me.loop_triangles:
            I += [t.vertices[0], t.vertices[1], t.vertices[2]]
    bpy.data.meshes.remove(me)
    d = {'p': P, 'c': C, 'tris': (len(I) // 3) if I else len(P) // 9}
    if I:
        d['n'] = N
        d['i'] = I
    return d


out = {}
for key in ('laurel', 'palm', 'drago', 'dragom', 'dragol', 'gen'):
    t = bpy.data.objects[key + '_trunk']
    org = t.matrix_world.translation.copy()
    out[key] = {'trunk': dump(t, org, False), 'crown': dump(bpy.data.objects[key + '_crown'], org, True)}
    lo = bpy.data.objects.get(key + '_lo')
    if lo:
        out[key]['lo'] = dump(lo, org, True)

# canary pine: Quaternius «Pine» (poly.pizza/m/igSu0cPoBz, CC0): bark and needles apart, the needles thinned out
pine = bpy.data.objects['Pine_5']
mats = [s.material for s in pine.material_slots]
bi = next(i for i, m in enumerate(mats) if 'Bark' in m.name)
li = next(i for i, m in enumerate(mats) if 'Leaves' in m.name)
dg = bpy.context.evaluated_depsgraph_get()
ws = [pine.matrix_world @ v.co for v in pine.data.vertices]
org = Vector(((min(v.x for v in ws) + max(v.x for v in ws)) / 2, (min(v.y for v in ws) + max(v.y for v in ws)) / 2, min(v.z for v in ws)))
bc = mat_color(mats[bi])
lc = mat_color(mats[li])
out['pine'] = {
    'trunk': dump(pine, org, False, only_mat=bi, ratio=0.4, colour=(bc[0] * 0.9, bc[1] * 0.9, bc[2] * 0.9)),
    'crown': dump(pine, org, True, only_mat=li, ratio=0.45, colour=lc),
    'lo': dump(pine, org, True, only_mat=li, ratio=0.06, colour=lc),
}
# grass and scrub (hierba_blender.py)
if bpy.data.collections.get('JETA_Hierba'):
    out['hierba'] = {k: dump(bpy.data.objects[k], bpy.data.objects[k].matrix_world.translation.copy(), True) for k in ('hierba_verde', 'hierba_seca', 'matojo')}
out['_creditos'] = ['Pino: «Pine» de Quaternius, https://poly.pizza/m/igSu0cPoBz (CC0)', 'Laurel, palmera, dragos y árbol de calle: hechos en Blender para el juego (tools/blender/arboles_blender.py)']
json.dump(out, open(OUT, 'w', encoding='utf-8'), separators=(',', ':'))
print({k: {p: v[p]['tris'] for p in v} for k, v in out.items() if not k.startswith('_')})
import os
print('bytes', os.path.getsize(OUT))
