# Huella de los dibujos de píxel (v1.1.7, al juntar el código repetido de 09eb_pixbasket y 09ma_pixguanche en
# 09e_pixkit): dibuja los mismos sprites de baloncesto (todas las poses de la pelea, varias pintas) y de Guanche Guarriors
# (todos los personajes, varias poses) y guarda una huella (hash de los píxeles) de cada uno.
# Uso: herramientas/huella_sprites.py base      → guarda shots/huella_sprites_base.json (con el código de antes)
#      herramientas/huella_sprites.py comparar  → compara con la base y dice cuántos sprites salen distintos
import json, os, sys
JS = """(()=>{ const d=__dbg, out={};
  const hash=(c)=>{ const g=c.getContext('2d'), px=g.getImageData(0,0,c.width,c.height).data; let h=2166136261>>>0; for(let i=0;i<px.length;i++){ h^=px[i]; h=Math.imul(h,16777619)>>>0; } return c.width+'x'+c.height+':'+h.toString(16); };
  const looks=[{}, {skin:'#8a5a38', hair:'#1e1610'}, {skin:'#f0c8a0', hair:'#c9902e', beard:true}];
  const P=d.FIGHT2D && d.FIGHT2D.POSES; if (P && d.PIXBASKET) { let n=0; for (const k in P) { looks.forEach((lk,i)=>{ const s=d.PIXBASKET.sprite(lk, P[k], String(7+i)); out['bk:'+k+':'+i]=hash(s.c); n++; }); } }
  const PO={ idle:{h:[0,-13],n:[1,-23],hd:[1.5,-26.5],kf:[2,-7],ff:[3,0],kb:[-1,-7],fb:[-3,0],ef:[4,-18],hf:[6,-15],eb:[-2,-18],hb:[-1,-14],wa:-1.1},
    walk:{h:[0,-13.5],n:[1.5,-23.5],hd:[2,-27],kf:[3.5,-7],ff:[6,0],kb:[-2,-6.5],fb:[-5,0],ef:[3,-18],hf:[5,-14],eb:[-2.5,-18],hb:[-4,-15],wa:-0.9},
    lying:{h:[0,-3],n:[10,-3],hd:[13,-3.5],kf:[-6,-2],ff:[-12,0],kb:[-6,-1],fb:[-12,-1],ef:[6,-1],hf:[9,0],eb:[5,-5],hb:[8,-6],wa:0} };
  if (d.PIXGUAN) for (const id in d.PIXGUAN.WHO) for (const k in PO) { const s=d.PIXGUAN.sprite(id, PO[k]); if (s) out['gu:'+id+':'+k]=hash(s.c); }
  return JSON.stringify(out); })()"""
async def run(pg):
    mode = sys.argv[2] if len(sys.argv) > 2 else 'comparar'
    h = json.loads(await pg.evaluate(JS))
    print('sprites dibujados:', len(h), '(baloncesto', sum(1 for k in h if k.startswith('bk')), '· guanche', sum(1 for k in h if k.startswith('gu')), ')')
    base = 'shots/huella_sprites_base.json'
    if mode == 'base':
        json.dump(h, open(base, 'w'), indent=0); print('base guardada en', base)
    else:
        b = json.load(open(base))
        dif = [k for k in b if h.get(k) != b[k]]
        print('distintos de la base:', len(dif), dif[:20]); print('faltan:', [k for k in b if k not in h][:10])
        if dif: raise SystemExit('HUELLA SPRITES: CAMBIAN %d' % len(dif))
    print('HUELLA SPRITES OK')
