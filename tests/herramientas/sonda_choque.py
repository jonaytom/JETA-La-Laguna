# Choques invisibles (v1.1.4; Jonay, 3-nov, X −193, Y 337: «a pie me choco con algo que no se ve junto a las vías del
# tranvía»). Uso: herramientas/sonda_choque.py x y [radio]. Lista los segmentos y círculos de choque (COL) a menos de
# «radio» m, con su altura, y prueba a andar en 16 direcciones desde el punto: dónde frena y contra qué.
import json, sys
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); R = float(sys.argv[4]) if len(sys.argv) > 4 else 4
    r = json.loads(await pg.evaluate("""([x,z,R])=>JSON.stringify((()=>{ const d=__dbg, C=d.COL, out={segs:[],circs:[],andar:[]}, g=d.heightAt(x,z);
      for (const id of C.segsNear(x,z,R)) { const o=id*4, a=[C.segs[o],C.segs[o+1]], b=[C.segs[o+2],C.segs[o+3]]; const dx=b[0]-a[0], dz=b[1]-a[1], L2=dx*dx+dz*dz||1; const t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/L2)); const dd=Math.hypot(x-a[0]-dx*t, z-a[1]-dz*t); if (dd>R) continue;
        out.segs.push({id, de:a.map(v=>+v.toFixed(2)), a:b.map(v=>+v.toFixed(2)), largo:+Math.sqrt(L2).toFixed(2), dist:+dd.toFixed(2), y:[+C.segY[id*2].toFixed(1), +C.segY[id*2+1].toFixed(1)], suelo:+g.toFixed(1)}); }
      for (let id=0; id<C.circs.length/3; id++){ const cx=C.circs[id*3], cz=C.circs[id*3+1], cr=C.circs[id*3+2]; const dd=Math.hypot(cx-x,cz-z)-cr; if (dd>R) continue; out.circs.push({id, x:+cx.toFixed(2), z:+cz.toFixed(2), r:+cr.toFixed(2), dist:+dd.toFixed(2), y:[+C.circY[id*2].toFixed(1), +C.circY[id*2+1].toFixed(1)]}); }
      C.qy = g + 0.17 + 0.4; // like the player on foot (08_player.js)
      for (let k=0;k<16;k++){ const a=k/16*Math.PI*2, ux=Math.sin(a), uz=Math.cos(a); let px=x, pz=z, stop=null;
        for (let s=0;s<R*1.2;s+=0.1){ const nx=px+ux*0.1, nz=pz+uz*0.1; const q=C.resolve(nx,nz,0.35); if (q.hit && Math.hypot(q.x-nx,q.z-nz)>0.05){ stop=[+nx.toFixed(2),+nz.toFixed(2)]; break; } px=nx; pz=nz; }
        if (stop) out.andar.push({rumbo:Math.round(a*180/Math.PI), frena:stop}); }
      C.qy = null; return out; })())""", [x, z, R]))
    print('segmentos de choque:', len(r['segs']))
    for s in r['segs']: print('  ', s)
    print('círculos de choque:', len(r['circs']))
    for c in r['circs']: print('  ', c)
    print('andando desde el punto, frena en:', r['andar'])
    print('SONDA CHOQUE OK')
