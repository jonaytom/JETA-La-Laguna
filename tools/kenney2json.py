import json, struct, base64, sys, numpy as np
from PIL import Image
D = '/home/claude/game/assets/kenney/Models/GLB format/'
pal_img = np.array(Image.open(D + 'Textures/colormap.png').convert('RGB'))
H, W, _ = pal_img.shape
NAMES = ['sedan','hatchback-sports','sedan-sports','suv','suv-luxury','van','taxi','police','truck','truck-flat','delivery','delivery-flat','garbage-truck','ambulance','firetruck','tractor']
palette = []; pidx = {}
def col(u, v):
    x = min(W - 1, int((u % 1) * W)); y = min(H - 1, int((v % 1) * H))
    r, g, b = (int(t) for t in pal_img[y, x])
    return ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3)
def load(name):
    b = open(D + name + '.glb', 'rb').read()
    jl = struct.unpack_from('<I', b, 12)[0]; J = json.loads(b[20:20 + jl]); bl = struct.unpack_from('<I', b, 20 + jl)[0]; bin_ = b[28 + jl: 28 + jl + bl]
    def acc(i):
        a = J['accessors'][i]; bv = J['bufferViews'][a['bufferView']]; n = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}[a['type']]
        dt = {5126: np.float32, 5123: np.uint16, 5125: np.uint32, 5121: np.uint8}[a['componentType']]; o = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
        return np.frombuffer(bin_, dtype=dt, count=a['count'] * n, offset=o).reshape(a['count'], n) if n > 1 else np.frombuffer(bin_, dtype=dt, count=a['count'], offset=o)
    parts = []
    for nd in J['nodes']:
        if 'mesh' not in nd: continue
        P = []; N = []; C = []; I = []; base = 0
        for p in J['meshes'][nd['mesh']]['primitives']:
            pos = acc(p['attributes']['POSITION']); nor = acc(p['attributes']['NORMAL']); uv = acc(p['attributes']['TEXCOORD_0']); idx = acc(p['indices'])
            P.append(pos); N.append(nor); C += [col(u, v) for u, v in uv]; I.append(idx.astype(np.int64) + base); base += len(pos)
        P = np.concatenate(P); N = np.concatenate(N); I = np.concatenate(I)
        t = nd.get('translation', [0, 0, 0]); assert 'rotation' not in nd or True
        parts.append({'name': nd['name'], 't': [round(v, 4) for v in t], 'r': nd.get('rotation'), 'P': P, 'N': N, 'C': np.array(C, np.uint16), 'I': I})
    return parts
out = {}
for nm in NAMES:
    parts = load(nm)
    # bbox in model space (with node translation)
    allp = np.concatenate([p['P'] + np.array(p['t']) for p in parts])
    mn, mx = allp.min(0), allp.max(0)
    body = [p for p in parts if not p['name'].startswith('wheel')]
    # paint colour = most area-weighted saturated colour of the body
    area = {}
    for p in body:
        tri = p['I'].reshape(-1, 3); a = np.linalg.norm(np.cross(p['P'][tri[:, 1]] - p['P'][tri[:, 0]], p['P'][tri[:, 2]] - p['P'][tri[:, 0]]), axis=1) / 2
        for k, ar in zip(p['C'][tri[:, 0]], a): area[int(k)] = area.get(int(k), 0) + ar
    rank = sorted(area.items(), key=lambda kv: -kv[1])
    enc = []
    for p in parts:
        enc.append({'name': p['name'], 't': p['t'], 'r': p['r'], 'nv': len(p['P']),
                    'p': base64.b64encode(np.round(p['P'] * 2000).astype(np.int16).tobytes()).decode(),
                    'n': base64.b64encode(np.round(p['N'] * 127).astype(np.int8).tobytes()).decode(),
                    'c': base64.b64encode(p['C'].tobytes()).decode(),
                    'i': base64.b64encode(p['I'].astype(np.uint16).tobytes()).decode()})
    out[nm] = {'bb': [[round(float(v), 3) for v in mn], [round(float(v), 3) for v in mx]], 'rank': [[k, round(float(v), 3)] for k, v in rank[:6]], 'parts': enc}
    dec=lambda k: ((k>>11)<<3, ((k>>5)&63)<<2, (k&31)<<3)
    print(nm, 'bb', out[nm]['bb'], 'rank', [(dec(k), round(float(v), 2)) for k, v in rank[:4]], [p['name'] for p in parts])
json.dump({'pal': palette, 'm': out}, open('/home/claude/game/kenney_cars.json', 'w'), separators=(',', ':'))
import os; print('size', os.path.getsize('/home/claude/game/kenney_cars.json'))
