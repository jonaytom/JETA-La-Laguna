# Quaternius Universal Base Characters + Universal Animation Library (CC0) -> compact JSON for JETA La Laguna
import json, struct, base64, io, os, numpy as np
from PIL import Image
BASE = '/home/claude/game/assets/ubc/Universal Base Characters[Standard]/'
BODY = BASE + 'Base Characters/Godot - UE/'
TEXD = BASE + 'Base Characters/Textures/'
HAIR = BASE + 'Hairstyles/Rigged to Head Bone/glTF (Godot -Unreal)/'
ANIM = '/home/claude/game/assets/ual/Universal Animation Library[Standard]/Unreal-Godot/UAL1_Standard.glb'
b64 = lambda a: base64.b64encode(np.ascontiguousarray(a).tobytes()).decode()
CT = {5126: np.float32, 5123: np.uint16, 5125: np.uint32, 5121: np.uint8, 5120: np.int8, 5122: np.int16}
NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}

def load_gltf(path):
    if path.endswith('.glb'):
        b = open(path, 'rb').read(); jl = struct.unpack_from('<I', b, 12)[0]; J = json.loads(b[20:20 + jl]); bl = struct.unpack_from('<I', b, 20 + jl)[0]; bins = [b[28 + jl:28 + jl + bl]]
    else:
        J = json.load(open(path)); d = os.path.dirname(path); bins = [open(os.path.join(d, bf['uri']), 'rb').read() for bf in J['buffers']]
    def acc(i):
        a = J['accessors'][i]; bv = J['bufferViews'][a['bufferView']]; n = NC[a['type']]; dt = CT[a['componentType']]
        o = bv.get('byteOffset', 0) + a.get('byteOffset', 0); stride = bv.get('byteStride'); isz = np.dtype(dt).itemsize * n
        raw = bins[bv.get('buffer', 0)]
        if stride and stride != isz:
            arr = np.array([np.frombuffer(raw, dtype=dt, count=n, offset=o + k * stride) for k in range(a['count'])])
        else:
            arr = np.frombuffer(raw, dtype=dt, count=a['count'] * n, offset=o).reshape(a['count'], n) if n > 1 else np.frombuffer(raw, dtype=dt, count=a['count'], offset=o)
        if a.get('normalized') and dt in (np.uint8, np.uint16): arr = arr.astype(np.float32) / np.iinfo(dt).max
        return arr
    return J, acc

# ---------- skeleton from the male body
J, acc = load_gltf(BODY + 'Superhero_Male_FullBody.gltf')
joints = J['skins'][0]['joints']; names = [J['nodes'][j]['name'] for j in joints]
parent = {}
for i, n in enumerate(J['nodes']):
    for c in n.get('children', []): parent[c] = i
skel = []
for j in joints:
    n = J['nodes'][j]; p = parent.get(j); pi = joints.index(p) if p in joints else -1
    skel.append({'n': n['name'], 'p': pi, 't': [round(v, 5) for v in n.get('translation', [0, 0, 0])], 'r': [round(v, 6) for v in n.get('rotation', [0, 0, 0, 1])]})
print('joints', len(names))
REGION = {}  # joint -> clothing region: 0 skin, 1 shirt, 2 forearm (sleeve), 3 pants, 4 calf (long trousers), 5 shoes
for nm in names:
    if nm.startswith(('spine', 'clavicle', 'upperarm')): REGION[nm] = 1
    elif nm.startswith('lowerarm'): REGION[nm] = 2
    elif nm.startswith(('pelvis', 'thigh')): REGION[nm] = 3
    elif nm.startswith('calf'): REGION[nm] = 4
    elif nm.startswith(('foot', 'ball')): REGION[nm] = 5
    else: REGION[nm] = 0

def body(path, tex_dark, tex_light):
    J, acc = load_gltf(path); jn = [J['nodes'][j]['name'] for j in J['skins'][0]['joints']]; remap = np.array([names.index(n) for n in jn], np.uint8)
    ibm = acc(J['skins'][0]['inverseBindMatrices']).reshape(-1, 16); ibm_named = np.zeros((len(names), 16), np.float32)
    for k, n in enumerate(jn): ibm_named[names.index(n)] = ibm[k]
    parts = []
    for mi, m in enumerate(J['meshes']):
        for p in m['primitives']:
            A = p['attributes']; P = acc(A['POSITION']).astype(np.float32); N = acc(A['NORMAL']); UV = acc(A['TEXCOORD_0']); JI = remap[acc(A['JOINTS_0']).astype(np.int64)]; W = acc(A['WEIGHTS_0']).astype(np.float32); I = acc(p['indices'])
            mat = J['materials'][p['material']]['name']; kind = 'eyes' if 'Eye' in mat else 'brows' if 'Hair' in mat else 'body'
            reg = np.zeros(len(P), np.uint8)
            if kind == 'body':
                dom = JI[np.arange(len(P)), np.argmax(W, axis=1)]
                reg = np.array([REGION[names[d]] for d in dom], np.uint8)
            Wq = np.round(W / np.maximum(W.sum(1, keepdims=True), 1e-6) * 255).astype(np.uint8)
            parts.append({'k': kind, 'nv': len(P), 'p': b64((P * 4000).round().astype(np.int16)), 'n': b64((N * 127).round().astype(np.int8)), 'uv': b64((np.clip(UV, 0, 1) * 65535).round().astype(np.uint16)),
                          'ji': b64(JI.astype(np.uint8)), 'jw': b64(Wq), 'rg': b64(reg), 'i': b64(I.astype(np.uint16))})
            print(os.path.basename(path), kind, len(P), len(I) // 3, 'regions', np.bincount(reg, minlength=6).tolist() if kind == 'body' else '')
    return {'ibm': b64(ibm_named.astype(np.float32)), 'parts': parts, 'tex': [tex_dark, tex_light]}

def jpeg(path, size, q=80):
    im = Image.open(path).convert('RGB').resize((size, size), Image.LANCZOS); bio = io.BytesIO(); im.save(bio, 'JPEG', quality=q, optimize=True); return base64.b64encode(bio.getvalue()).decode()
def pngA(path, size):
    im = Image.open(path).convert('RGBA').resize((size, size), Image.LANCZOS); bio = io.BytesIO(); im.save(bio, 'PNG', optimize=True); return base64.b64encode(bio.getvalue()).decode()

TEX = {'m0': jpeg(TEXD + 'T_Superhero_Male_Dark.png', 512), 'm1': jpeg(TEXD + 'T_Superhero_Male_Ligh.png', 512),
       'f0': jpeg(TEXD + 'T_Superhero_Female_Dark_BaseColor.png', 512), 'f1': jpeg(TEXD + 'T_Superhero_Female_Light_BaseColor.png', 512),
       'h1': pngA(TEXD + 'T_Hair_1_BaseColor.png', 256), 'h2': pngA(TEXD + 'T_Hair_2_BaseColor.png', 256), 'eye': jpeg(TEXD + 'T_Eye_Brown.png', 64), 'm0h': jpeg(TEXD + 'T_Superhero_Male_Dark.png', 1024, 82), 'm1h': jpeg(TEXD + 'T_Superhero_Male_Ligh.png', 1024, 82)}
BODIES = {'m': body(BODY + 'Superhero_Male_FullBody.gltf', 'm0', 'm1'), 'f': body(BODY + 'Superhero_Female_FullBody.gltf', 'f0', 'f1')}

# ---------- hairstyles: rigid, expressed in the Head bone's local space
ibmM = np.frombuffer(base64.b64decode(BODIES['m']['ibm']), np.float32).reshape(-1, 16)
HAIRS = {}
for f in sorted(os.listdir(HAIR)):
    if not f.endswith('.gltf'): continue
    J, acc = load_gltf(HAIR + f); jn = [J['nodes'][j]['name'] for j in J['skins'][0]['joints']]
    ibm = acc(J['skins'][0]['inverseBindMatrices']).reshape(-1, 4, 4)
    head = ibm[jn.index('Head')].T  # glTF matrices are column-major
    m = J['meshes'][0]['primitives'][0]; P = acc(m['attributes']['POSITION']).astype(np.float32); N = acc(m['attributes']['NORMAL']); UV = acc(m['attributes']['TEXCOORD_0']); I = acc(m['indices'])
    Ph = (np.c_[P, np.ones(len(P))] @ head.T)[:, :3]; Nh = N @ head[:3, :3].T
    img = J['images'][J['textures'][J['materials'][m['material']]['pbrMetallicRoughness']['baseColorTexture']['index']]['source']]['uri']
    HAIRS[f[:-5]] = {'nv': len(P), 'p': b64((Ph * 4000).round().astype(np.int16)), 'n': b64((Nh / np.linalg.norm(Nh, axis=1, keepdims=True) * 127).round().astype(np.int8)), 'uv': b64((np.clip(UV, 0, 1) * 65535).round().astype(np.uint16)), 'i': b64(I.astype(np.uint16)), 't': 'h2' if 'Hair_2' in img else 'h1'}
    print('hair', f, len(P), len(I) // 3, img)

# ---------- animations (body joints only, 15 fps)
J, acc = load_gltf(ANIM)
WANT = ['Idle_Loop', 'Walk_Loop', 'Jog_Fwd_Loop', 'Sprint_Loop', 'Punch_Jab', 'Punch_Cross', 'Hit_Chest', 'Hit_Head', 'Death01', 'Jump_Start', 'Jump_Loop', 'Jump_Land', 'Driving_Loop', 'Sitting_Idle_Loop', 'Idle_Talking_Loop', 'Dance_Loop', 'Walk_Formal_Loop', 'Crouch_Idle_Loop', 'Interact']
SKIP = ('index', 'middle', 'pinky', 'ring', 'thumb', 'ball_leaf')
FPS = 15; ANIMS = {}
for a in J['animations']:
    if a['name'] not in WANT: continue
    tracks = {}; dur = 0
    for ch in a['channels']:
        nm = J['nodes'][ch['target']['node']].get('name'); path = ch['target']['path']
        if nm not in names or nm.startswith(SKIP) or path == 'scale': continue
        if path == 'translation' and nm not in ('pelvis', 'root'): continue
        s = a['samplers'][ch['sampler']]; t = acc(s['input']).astype(np.float32); v = acc(s['output']).astype(np.float32); dur = max(dur, float(t[-1]))
        tracks[(nm, path)] = (t, v)
    nf = max(2, int(round(dur * FPS)) + 1); ts = np.linspace(0, dur, nf); out = {}
    for (nm, path), (t, v) in tracks.items():
        if path == 'rotation':
            # nlerp resample, keep hemisphere continuity
            res = np.zeros((nf, 4), np.float32)
            for k, tt in enumerate(ts):
                j = np.searchsorted(t, tt) if len(t) > 1 else 0; j = min(max(j, 1), len(t) - 1) if len(t) > 1 else 0
                if len(t) == 1: q = v[0]
                else:
                    t0, t1 = t[j - 1], t[j]; f = 0 if t1 == t0 else np.clip((tt - t0) / (t1 - t0), 0, 1); q0, q1 = v[j - 1], v[j]
                    if np.dot(q0, q1) < 0: q1 = -q1
                    q = q0 * (1 - f) + q1 * f; q /= np.linalg.norm(q)
                if k and np.dot(res[k - 1], q) < 0: q = -q
                res[k] = q
            if np.allclose(res, res[0], atol=2e-3): res = res[:1]
            out.setdefault(nm, {})['r'] = b64((res * 32767).round().astype(np.int16))
        else:
            res = np.stack([np.interp(ts, t, v[:, c]) for c in range(3)], 1)
            out.setdefault(nm, {})['t'] = b64((res * 4000).round().astype(np.int16))
    ANIMS[a['name']] = {'d': round(dur, 4), 'n': nf, 'tr': out}
    print('anim', a['name'], round(dur, 2), nf, len(out))
data = {'skel': skel, 'bodies': BODIES, 'hairs': HAIRS, 'tex': TEX, 'anims': ANIMS}
s = json.dumps(data, separators=(',', ':')); open('/home/claude/game/chars.json', 'w').write(s); print('size', len(s))
