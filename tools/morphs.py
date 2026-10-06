# Body shape morphs for the Quaternius "Superhero" bodies (our own versions of the other body types).
# Adds to data/chars.json, per body (m/f), relative vertex offsets for the 'body' part:
#   normal  - less muscle: flatter pecs, thinner arms/thighs, softer stomach
#   fat     - belly, love handles, back, bum, thicker arms/thighs/neck, double chin
#   teen    - slimmer everywhere (height/head size come from bone scales at runtime)
#   old     - soft belly, sagging chest, flatter bum
# The game mixes them per person (morphTargetInfluences), same skeleton and animations.
# Offsets stored as int8 / 800 (1.25 mm steps, max ±0.16 m). Run after tools/chars2json.py:  python tools/morphs.py
import json, base64, os
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(ROOT, 'data', 'chars.json')
d = json.load(open(PATH, encoding='utf-8'))
names = [s['n'] for s in d['skel']]
b = lambda s: base64.b64decode(s)
g = lambda u: np.exp(-0.5 * u * u)


def region(ji, jw, bones):
    ids = [names.index(n) for n in bones]
    m = np.isin(ji, ids)
    return (jw * m).sum(1) / 255.0


for key in ('m', 'f'):
    B = d['bodies'][key]; part = next(p for p in B['parts'] if p['k'] == 'body')
    P = np.frombuffer(b(part['p']), np.int16).reshape(-1, 3).astype(np.float32) / 4000
    N = np.frombuffer(b(part['n']), np.int8).reshape(-1, 3).astype(np.float32) / 127
    N /= np.maximum(1e-6, np.linalg.norm(N, axis=1, keepdims=True))
    ji = np.frombuffer(b(part['ji']), np.uint8).reshape(-1, 4); jw = np.frombuffer(b(part['jw']), np.uint8).reshape(-1, 4).astype(np.float32)
    fem = key == 'f'; k = 0.978 if fem else 1.0  # landmark heights scale with the body
    x, y, z = P[:, 0], P[:, 1], P[:, 2]; nx, ny, nz = N[:, 0], N[:, 1], N[:, 2]
    front, back, side = np.clip(nz, 0, 1), np.clip(-nz, 0, 1), np.abs(nx)
    W = lambda *bs: region(ji, jw, bs)
    torsoL = W('pelvis', 'spine_01', 'spine_02'); chest = W('spine_03'); clav = W('clavicle_l', 'clavicle_r')
    uarm = W('upperarm_l', 'upperarm_r'); larm = W('lowerarm_l', 'lowerarm_r'); thigh = W('thigh_l', 'thigh_r'); calf = W('calf_l', 'calf_r')
    neck = W('neck_01'); head = W('Head')
    navel, waist, chestY, hip, chin = 1.05 * k, 1.08 * k, (1.30 if fem else 1.34) * k, 0.93 * k, 1.585 * k
    M = {}
    # ---- fat
    t = (0.024 * (torsoL + chest)
         + 0.12 * g((y - navel) / 0.17) * front ** 1.2 * torsoL
         + 0.05 * g((y - waist) / 0.12) * side * torsoL
         + 0.025 * g((y - 1.12 * k) / 0.2) * back * (torsoL + chest)
         + 0.035 * g((y - hip) / 0.1) * back * torsoL
         + 0.03 * g((y - chestY) / 0.08) * front * chest
         + 0.02 * uarm + 0.011 * larm + 0.03 * thigh * g((y - 0.78 * k) / 0.22) + 0.012 * calf
         + 0.022 * neck + 0.018 * head * (y < chin + 0.03) * front)
    D = N * t[:, None]; D[:, 1] -= 0.03 * g((y - navel) / 0.15) * front * torsoL  # belly sags a little
    M['fat'] = D
    # ---- normal (less fit)
    t = (-0.013 * uarm - 0.008 * larm - 0.014 * chest * g((y - chestY) / 0.1) * front - 0.012 * clav * (y > 1.38 * k)
         - 0.011 * thigh - 0.006 * calf + 0.018 * g((y - navel) / 0.15) * front * torsoL - 0.006 * side * chest)
    M['normal'] = N * (1.6 * t)[:, None]
    # ---- teen (slimmer)
    t = -0.009 * (uarm + larm + thigh + calf) - 0.008 * (torsoL + chest) * (side + 0.3) - 0.01 * chest * front * g((y - chestY) / 0.1)
    M['teen'] = N * (1.5 * t)[:, None]
    # ---- old
    t = 0.05 * g((y - navel) / 0.15) * front * torsoL + 0.012 * torsoL - 0.012 * back * g((y - hip) / 0.1) * torsoL - 0.008 * (uarm + thigh)
    D = N * t[:, None]; D[:, 1] -= 0.03 * g((y - chestY) / 0.07) * front * chest; D[:, 2] -= 0.008 * g((y - chestY) / 0.07) * front * chest
    M['old'] = D
    B['morph'] = {n: base64.b64encode(np.clip(np.round(v * 800), -127, 127).astype(np.int8).tobytes()).decode() for n, v in M.items()}
    print(key, {n: round(float(np.abs(v).max()), 3) for n, v in M.items()})

open(PATH, 'w', encoding='utf-8').write(json.dumps(d, separators=(',', ':')))
print('morphs written', os.path.getsize(PATH))
