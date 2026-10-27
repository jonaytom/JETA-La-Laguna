# Proposal (Jonay, 27-oct: «el bikini no existía en esa época»): La Mirladora without the bikini top: the skin's bra
# turned into skin (no inner edge) with a nipple on each breast; the bottom stays as the leather loincloth + skirt.
import sys
G = sys.argv[1]; src = open(G + '/build2.py').read()
pre = src.split("save('mirla2'")[0].replace("base = with_kicks(", "base_orig = (")   # everything up to La Mirladora (helpers, pad, pole…)
sys.argv = [sys.argv[0], G]; exec(pre)
UWC = [(148,175,192),(105,133,160),(74,96,130),(41,55,87)]
SKIN = {(148,175,192): (175,106,73), (105,133,160): (154,92,73), (74,96,130): (135,85,72), (41,55,87): (135,85,72)}   # no inner edge
NIP = (226, 132, 136)   # pink (v0.97, Jonay)
def topless(sk, fw=112, fh=80):
    """per frame: the underwear pixels split in two blocks by the biggest empty gap in height: the upper one (the bra)
    becomes skin, with a nipple at the middle of each cup; the lower one (the briefs) is left for recol_uw"""
    out = sk.copy(); px = out.load()
    for r in range(out.height // fh):
        for c in range(out.width // fw):
            pts = [(x, y) for y in range(r*fh, r*fh+fh) for x in range(c*fw, c*fw+fw) if px[x, y][3] and px[x, y][:3] in SKIN]
            if not pts: continue
            ys = sorted({y for _, y in pts}); gaps = [(ys[i+1] - ys[i], i) for i in range(len(ys) - 1)]
            if not gaps or max(gaps)[0] < 2: continue
            cut = ys[max(gaps)[1]]
            bra = [(x, y) for (x, y) in pts if y <= cut]
            for (x, y) in bra: px[x, y] = SKIN[px[x, y][:3]] + (255,)
            # the nipples (v0.97, Jonay: «más rosado y mejor situado»): one line under the top of the bra, in the middle of
            # each cup as it shows on that top line (the two blocks of the cups)
            top = min(y for _, y in bra); xs = sorted(x for (x, y) in bra if y == top)
            groups, cur = [], [xs[0]]
            for x in xs[1:]:
                if x - cur[-1] > 1: groups.append(cur); cur = [x]
                else: cur.append(x)
            groups.append(cur)
            for g in groups[:2]:
                nx = round((g[0] + g[-1]) / 2 + 0.01)
                if px[nx, top + 1][3] and px[nx, top + 1][:3] != (19, 19, 28): px[nx, top + 1] = NIP + (255,)
    return out
SKFn = topless(SKF)
HAIRL = [(19,19,28),(150,112,56),(204,166,92),(236,206,128),(250,230,166),(255,244,204)]   # blonder (v0.97, Jonay)
base = with_kicks(None, compose([recol_uw(SKFn, TAM), tint(pad(L('GandalfHardcore 43x Female Clothing/Short Skirt.png')), TAM), tint(pad(FHr(21)), HAIRL)]), stf, 112, 80, 16, 49)
save('mirla_nat', cast(orb_far(base, 'mirla', SKF, (120,230,255)), 'mirla', SKF, (120,230,255)), 112, 80)
print('ok')
