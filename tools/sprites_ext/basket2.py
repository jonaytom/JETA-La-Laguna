# Proposal (Jonay, 27-oct): basketball players with the pack's Basketball_Shirt.png (a tank top already: «a ver qué tal
# las asillas»), in several team colours, with the shorts of before (waist to above the knee) and no briefs showing.
import sys
G = sys.argv[1]; src = open(G + '/basket.py').read()
exec(src.split("for name, skin, hair, ramp in players:")[0])
BS = L(CP + 'Male Clothing/Basketball_Shirt.png')
# (Jonay: «la camisa tiene un píxel desplazado en la caída»): the pack's jersey is 1 px off its body on that frame
for (r_, c_), (dx_, dy_) in {(4, 1): (1, 0)}.items():
    fr_ = BS.crop((c_*80, r_*64, c_*80+80, r_*64+64)); BS.paste(Image.new('RGBA', (80, 64)), (c_*80, r_*64)); BS.alpha_composite(fr_, (c_*80+dx_, r_*64+dy_))
T = {   # team: ramp (outline, dark → light)
 'rojo':     [(19,19,28),(110,16,20),(170,30,34),(220,60,60),(250,120,110)],
 'azul':     [(19,19,28),(20,40,110),(30,70,170),(70,120,220),(140,180,250)],
 'verde':    [(19,19,28),(16,70,34),(28,120,52),(60,170,80),(130,220,130)],
 'amarillo': [(19,19,28),(150,110,10),(210,160,20),(240,206,50),(255,240,140)],
 'negro':    [(19,19,28),(30,30,36),(50,50,58),(76,76,88),(120,120,134)],
 'blanco':   [(19,19,28),(150,150,160),(196,196,206),(228,228,236),(250,250,255)],
 'morado':   [(19,19,28),(60,20,90),(100,40,140),(150,80,190),(200,150,230)],
 'naranja':  [(19,19,28),(140,50,10),(200,90,20),(240,140,50),(255,200,120)]}
SKINS = ['Male Skin3', 'Male Skin1', 'Male Skin5', 'Male Skin2', 'Male Skin3', 'Male Skin1', 'Male Skin5', 'Male Skin2']
HAIRS = [10, 8, 6, 14, 12, 18, 20, 16]
def shirt(ramp):   # the shirt's four tones (a white jersey) to the team's: the main white to the third tone, the folds darker
    m = {(229,218,209): ramp[3], (191,176,168): ramp[2], (163,137,130): ramp[1], (97,75,68): tuple(int(v * 0.7) for v in ramp[1])}
    out = BS.copy(); px = out.load()
    for y in range(out.height):
        for x in range(out.width):
            q = px[x, y]
            if q[3] and q[:3] in m: px[x, y] = m[q[:3]] + (q[3],)
    return out
for i, (team, ramp) in enumerate(T.items()):
    sk = L(CP + 'Character skin colors/%s.png' % SKINS[i])
    im = compose([no_briefs(sk, ramp), shorts(PA, ramp), shirt(ramp), SHOES, H(HAIRS[i])])
    im.save(G + '/out2/bk_' + team + '.png')
print('ok', list(T))
