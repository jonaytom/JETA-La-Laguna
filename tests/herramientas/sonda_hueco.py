# Por qué falta ciudad en un sitio (v1.0.2; Jonay: «aquí falta ciudad, es una calle estrecha, no hay ese espacio»).
# Uso: herramientas/sonda_hueco.py x y [radio] → lista las plantas de edificio del mapa (DATA.B) a menos de «radio» m,
# cuáles se pintan (BUILD), cuáles quitó el recorte (RCLIP.goneList) y las calles y plazas que pasan por ahí, con foto
# desde arriba (shots/hueco.jpg).
import base64, json, sys
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); R = float(sys.argv[4]) if len(sys.argv) > 4 else 60
    r = json.loads(await pg.evaluate("""([x,z,R])=>JSON.stringify((()=>{ const d=__dbg, out={ planta:[], pintados:[], quitados:[], calles:[], areas:[] };
      const cen=(c)=>{ let a=0,b=0,n=c.length/2; for(let i=0;i<c.length;i+=2){a+=c[i];b+=c[i+1];} return [a/n,b/n]; };
      d.DATA.B.forEach((b,i)=>{ const c=b[6]; if(!c||!c.length){ return; } const [cx,cz]=cen(c); if (Math.hypot(cx-x,cz-z)<R) out.planta.push([i, Math.round(cx), Math.round(cz), b[1], c.length/2]); });
      d.DATA.B.forEach((b,i)=>{ if (b[6] && b[6].length===0) out.planta.push([i,'vaciada (b[6]=[])']); });
      for (const b of d.BUILD) if (Math.hypot(b.cx-x,b.cz-z)<R) out.pintados.push([Math.round(b.cx),Math.round(b.cz),b.name||'',Math.round(b.H||0)]);
      if (d.RCLIP) for (const g of d.RCLIP.goneList) if (Math.hypot(g[0]-x,g[1]-z)<R) out.quitados.push(g);
      d.DATA.R.forEach((rd,ri)=>{ const c=rd[4]; for(let i=0;i<c.length;i+=2) if (Math.hypot(c[i]-x,c[i+1]-z)<R) { out.calles.push([ri, rd[1]>=0?d.DATA.S[rd[1]]:'', d.DATA.RT[rd[0]], rd[2]]); break; } });
      d.DATA.A.forEach((a,ai)=>{ const c=a[2]; if (!c) return; const [cx,cz]=cen(c); if (Math.hypot(cx-x,cz-z)<R*1.5) out.areas.push([ai, d.DATA.AT[a[0]], a[1]>=0&&d.DATA.S?d.DATA.S[a[1]]:'', Math.round(cx), Math.round(cz)]); });
      out.vaciadas = out.planta.filter(p=>p[1]==='vaciada (b[6]=[])').length; out.planta = out.planta.filter(p=>p[1]!=='vaciada (b[6]=[])');
      return out; })())""", [x, z, R]))
    for k, v in r.items(): print(k, v if not isinstance(v, list) else (len(v), v[:40]))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    await pg.evaluate("([x,z])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x+5,y+70,z+5); d.camera.lookAt(x,y,z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z])
    open('shots/hueco.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('SONDA HUECO OK')
