# Qué calzadas hay en un sitio y a qué altura (v1.1.4; Jonay, 3-nov: «se siguen metiendo carreteras unas debajo de
# otras, no son un continuo», «otra superposición fatal de calles», «en muchos puentes se ven como grietas en las uniones
# y pierden las marcas viales»). Uso: herramientas/sonda_calzadas.py x y [radio]
# Lista las vías del mapa a menos de «radio» m (índice, nombre, tipo, ancho, si es puente/elevada/hundida, altura de su
# calzada en el punto más cercano) y los pares que se pisan (calzadas solapadas a menos de 1,2 m de altura), y saca tres
# fotos: desde arriba y dos a pie de calle (shots/calzadas_<x>_<y>_*.jpg).
import base64, json, sys
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); R = float(sys.argv[4]) if len(sys.argv) > 4 else 40
    r = json.loads(await pg.evaluate("""([x,z,R])=>JSON.stringify((()=>{ const d=__dbg, out={vias:[], pisan:[]}; const near=[];
      d.DATA.R.forEach((rd,ri)=>{ const c=rd[4]; let best=null;
        for (let i=0;i+3<c.length;i+=2){ const ax=c[i],az=c[i+1],bx=c[i+2],bz=c[i+3],dx=bx-ax,dz=bz-az,L2=dx*dx+dz*dz||1; const t=Math.max(0,Math.min(1,((x-ax)*dx+(z-az)*dz)/L2)); const px=ax+dx*t,pz=az+dz*t, dd=Math.hypot(px-x,pz-z); if(!best||dd<best.d) best={d:dd,px,pz,i,t}; }
        if (!best || best.d>R) return; let s=0; for(let k=0;k<best.i;k+=2) s+=Math.hypot(c[k+2]-c[k],c[k+3]-c[k+1]); s+=best.t*Math.hypot(c[best.i+2]-c[best.i],c[best.i+3]-c[best.i+1]);
        const y = d.ROADY[ri] ? d.ROADY[ri](s,best.px,best.pz) : null; const fl=[(rd[3]&2)?'puente':'', d.RAISE.has(ri)?'elevada':'', d.DEP.has(ri)?'hundida':'', (rd[3]&4)?'tunel':''].filter(Boolean).join(',');
        near.push(ri); out.vias.push([ri, rd[1]>=0?d.DATA.S[rd[1]]:'', d.DATA.RT[rd[0]], rd[2], fl, Math.round(best.d), Math.round(best.px), Math.round(best.pz), y==null?null:+y.toFixed(2), +d.heightAt(best.px,best.pz).toFixed(2), c.length/2]); });
      // pairs whose carriageways overlap at the same level: sample each nearby road every 2 m
      for (const ri of near) { const rd=d.DATA.R[ri]; if (rd[0]>12) continue; const c=rd[4]; let s=0; const hit={};
        for (let i=0;i+3<c.length;i+=2){ const L=Math.hypot(c[i+2]-c[i],c[i+3]-c[i+1]), n=Math.max(1,Math.ceil(L/2));
          for (let k=0;k<n;k++){ const t=k/n, px=c[i]+(c[i+2]-c[i])*t, pz=c[i+1]+(c[i+3]-c[i+1])*t; if (Math.hypot(px-x,pz-z)>R){ continue; }
            const y1 = d.ROADY[ri] ? d.ROADY[ri](s+L*t,px,pz) : d.heightAt(px,pz);
            const rn=d.ROADSEG.nearest(px,pz,(r)=>r!==rd && r[0]<=12); if (!rn) continue; const r2=d.DATA.R[rn.ri]; if (rn.d > r2[2]/2 + rd[2]/2 - 0.5) continue;
            let s2=0; const c2=r2[4]; for(let q=0;q<rn.i;q+=2) s2+=Math.hypot(c2[q+2]-c2[q],c2[q+3]-c2[q+1]); s2+=rn.t*Math.hypot(rn.dx,rn.dz);
            const y2 = d.ROADY[rn.ri] ? d.ROADY[rn.ri](s2,rn.x,rn.z) : d.heightAt(rn.x,rn.z);
            const key=rn.ri; const dy=Math.abs(y1-y2); if (!hit[key]) hit[key]={n:0, dyMax:0, dyMin:99, en:[Math.round(px),Math.round(pz)]}; hit[key].n++; hit[key].dyMax=Math.max(hit[key].dyMax,dy); hit[key].dyMin=Math.min(hit[key].dyMin,dy); }
          s+=L; }
        for (const k in hit) if (+k>ri || !near.includes(+k)) out.pisan.push([ri, +k, hit[k].n*2+' m', 'dif. altura '+hit[k].dyMin.toFixed(2)+'..'+hit[k].dyMax.toFixed(2), hit[k].en]); }
      return out; })())""", [x, z, R]))
    print('vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):')
    for v in r['vias']: print('  ', v)
    print('calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):')
    for p in r['pisan']: print('  ', p)
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    views = [('arriba', 6, 55, 6), ('calle0', 22, 5, 8), ('calle1', -8, 5, -22)]
    for name, ox, oy, oz in views:
        await pg.evaluate("([x,z,ox,oy,oz])=>{const d=__dbg; d.PLAYER.x=x+ox; d.PLAYER.z=z+oz; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x+ox, d.heightAt(x+ox,z+oz)+oy, z+oz); d.camera.lookAt(x,y+1,z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z, ox, oy, oz])
        open('shots/calzadas_%d_%d_%s.jpg' % (x, z, name), 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('SONDA CALZADAS OK')
