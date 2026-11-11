# Troceen C33 en el juego (v1.4.3): cuántos aparcados hay, fotos de uno aparcado de cerca y de lejos (versión ligera más
# allá de ~90 m), y de cuatro coches nuevos (colores) puestos junto a él. Fotos en shots/troceen_<n>.jpg.
# Uso: herramientas/foto_troceen.py
import base64, json
async def snap(pg, name):
    open('shots/troceen_%s.jpg' % name, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, S=d.PARKED.slots.filter(s=>s.type==='troceen'), all=d.PARKED.slots.length;
      const ch=d.PARKED.chunks.filter(c=>c.lo).length; const s=S[Math.floor(S.length/3)]||null;
      return {n:S.length, all, chunks:ch, s: s && {x:s.x, z:s.z, h:s.h}}; })())"""))
    print('aparcados Troceen', r['n'], 'de', r['all'], '· grupos con versión lejana', r['chunks'])
    s = r['s']
    if not s:
        print('FOTO TROCEEN: no hay ninguno aparcado'); return
    # close and far views of the parked one
    for name, dist, hgt, side in (('aparcado_cerca', 6.5, 2.2, 1), ('aparcado_detras', 6.5, 2.0, -1), ('aparcado_lejos', 120, 14, 1)):
        await pg.evaluate("""([x,z,h,dist,hgt,side])=>{ const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(2);
          const fx=Math.sin(h), fz=Math.cos(h), rx=Math.cos(h), rz=-Math.sin(h); d.PLAYER.x=x+rx*30; d.PLAYER.z=z+rz*30; __step(1);
          const cx=x+(fx*side*0.75+rx*0.65)*dist, cz=z+(fz*side*0.75+rz*0.65)*dist, y=d.heightAt(x,z);
          d.camera.position.set(cx, y+hgt, cz); d.camera.lookAt(x, y+0.8, z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true);
          for (const c of d.PARKED.chunks) if (c.lo) c.mesh.geometry = Math.hypot(c.x-cx, c.z-cz)-(c.r||0) > 90 ? c.lo : c.hi; }""",
          [s['x'], s['z'], s['h'], dist, hgt, side])
        lod = await pg.evaluate("""(()=>{ const c=__dbg.PARKED.chunks.find(c=>c.lo && Math.hypot(c.x-__dbg.camera.position.x,c.z-__dbg.camera.position.z)<500); return c ? (c.mesh.geometry===c.lo?'lejana':'completa') : '-'; })()""")
        await snap(pg, name); print('foto', name, 'versión', lod)
    # four new cars in colours, in a row on the road next to it
    info = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, s=%s; const cols=[0x1f4e8c,0xf2f2f2,0xb3261e,0x1b1b1b];
      const fx=Math.sin(s.h), fz=Math.cos(s.h), rx=Math.cos(s.h), rz=-Math.sin(s.h); const out=[];
      cols.forEach((c,i)=>{ const x=s.x+fx*(6+i*5)+rx*2.4, z=s.z+fz*(6+i*5)+rz*2.4; const car=new d.Car(null, c, x, z, s.h, d.VMODELS.troceen); car.mode='parked'; out.push([x,z]); });
      let tri=0; const c=d.CARS[d.CARS.length-1]; c.mesh.traverse(m=>{ if(m.isMesh){ const g=m.geometry; tri+=(g.index?g.index.count:g.attributes.position.count)/3; } });
      return {out, tri: Math.round(tri)}; })())""" % json.dumps(s)))
    print('coche nuevo: triángulos', info['tri'])
    x0, z0 = info['out'][0]; x3, z3 = info['out'][3]
    await pg.evaluate("""([x0,z0,x3,z3,h])=>{ const d=__dbg; __step(2); const mx=(x0+x3)/2, mz=(z0+z3)/2, rx=Math.cos(h), rz=-Math.sin(h), fx=Math.sin(h), fz=Math.cos(h);
      const cx=mx+rx*11+fx*9, cz=mz+rz*11+fz*9, y=d.heightAt(mx,mz); d.camera.position.set(cx, y+4.5, cz); d.camera.lookAt(mx, y+0.7, mz); d.camera.updateMatrixWorld(); }""",
      [x0, z0, x3, z3, s['h']])
    await snap(pg, 'colores')
    print('FOTO TROCEEN OK')
