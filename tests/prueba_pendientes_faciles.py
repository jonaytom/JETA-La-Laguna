# Pendientes fáciles (v0.70): marcas viales que ya no se cruzan en cruces, incorporaciones y glorietas; aviones del
# aeropuerto fuera de las vías de servicio; Telepisa (Trinidad) como bloque de viviendas con la tienda abajo; los 3
# edificios en calzada de la auditoría 0.69 recortados. Fotos de un cruce con incorporación, de Telepisa y de la Plaza
# de San Cristóbal.
import os, json, base64
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
async def foto(pg, name, x, z, lx, lz, h=1.7):
    await pg.evaluate("([x,z,lx,lz,h])=>{const d=__dbg; d.PLAYER.x=x+0.01; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx,d.heightAt(lx,lz)+(h>3?0:1.2),lz);}", [x, z, lx, lz, h])
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', name)
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, R=d.DATA.R, out={};
      // lane lines: metres of lined road drawn plain because they lie inside another road
      let lin=0, plain=0, roads=0; R.forEach((rd,ri)=>{ if (!(rd[0]<=8 && rd[2]>=7) || (rd[3]&6)) return; roads++; for (const [a,b,ln] of d.lineRuns(ri, rd[4])) { if (ln) lin+=b-a; else plain+=b-a; } });
      out.lineas={vias:roads, con_lineas:Math.round(lin), lisas:Math.round(plain), pct_lisas:+(100*plain/Math.max(1,lin+plain)).toFixed(1)};
      // planes: none of their three collision circles on a carriageway
      const onRoad=(x,z,m)=>{ const q=d.ROADSEG.nearest(x,z,(r)=>r[0]<=12&&!(r[3]&2)); return q && q.d < R[q.ri][2]/2+m; };
      out.aviones=d.AIRPORT.planes.length; out.aviones_en_via=d.AIRPORT.planes.filter(p=>[-8,0,8].some(k=>onRoad(p.position.x+Math.sin(p.rotation.y)*k, p.position.z+Math.cos(p.rotation.y)*k, 1.6))).map(p=>[Math.round(p.position.x),Math.round(p.position.z)]);
      // Telepisa: not a big store; its sign is on a facade
      out.telepisa_gran_tienda=d.BIGSTORES.some(s=>/Telepisa/.test(s.parody));
      const sh=d.DATA.SH.find(s=>/Telepisa/.test(s[3])); out.telepisa=sh?[sh[0],sh[1]]:null;
      if (sh) { const b=d.BUILD.filter(b=>b.pts && Math.hypot(b.cx-sh[0],b.cz-sh[1])<40).sort((a,c)=>Math.hypot(a.cx-sh[0],a.cz-sh[1])-Math.hypot(c.cx-sh[0],c.cz-sh[1]))[0]; out.telepisa_edificio=b?{alto:+(b.top-b.bmax).toFixed(1), cx:Math.round(b.cx), cz:Math.round(b.cz)}:null; }
      // the three buildings of the 0.69 audit
      const segs=[]; R.forEach(rd=>{ if(rd[0]>12||(rd[3]&6)) return; const c=rd[4]; for(let i=0;i+3<c.length;i+=2) segs.push([c[i],c[i+1],c[i+2],c[i+3],rd[2]]); });
      const inv=(x,z)=>{ let w=0; for(const s of segs){ if (Math.abs(s[0]-x)>80||Math.abs(s[1]-z)>80) continue; const dx=s[2]-s[0],dz=s[3]-s[1],L2=dx*dx+dz*dz||1; const t=Math.max(0,Math.min(1,((x-s[0])*dx+(z-s[1])*dz)/L2)); w=Math.max(w, s[4]/2-Math.hypot(x-s[0]-dx*t,z-s[1]-dz*t)); } return w; };
      out.edificios=[[73,234],[-909,-408],[1692,4082]].map(([X,Z])=>{ let worst=0; for (const b of d.BUILD) { if (!b.pts||Math.hypot(b.cx-X,b.cz-Z)>90) continue; const P=b.pts; for(let i=0;i<P.length;i++){ const p=P[i],q=P[(i+1)%P.length]; for(const t of [0,0.25,0.5,0.75]){ const x=p[0]+(q[0]-p[0])*t, z=p[1]+(q[1]-p[1])*t; if (Math.hypot(x-X,z-Z)<12) worst=Math.max(worst, inv(x,z)); } } } return [X,Z,+worst.toFixed(2)]; });
      out.recortados=d.RCLIP ? d.RCLIP.cut : null; return out; })())"""))
    for k, v in r.items(): print(k, v)
    ok = r['lineas']['pct_lisas'] < 25 and not r['aviones_en_via'] and not r['telepisa_gran_tienda'] and all(e[2] < 1 for e in r['edificios'])
    if r.get('telepisa_edificio'): ok = ok and r['telepisa_edificio']['alto'] > 8
    await foto(pg, 'faciles_cruce_brasil', -330, 700, -301, 723, 30)
    await foto(pg, 'faciles_rotonda_alto', -380, 650, -347, 745, 45)
    if r.get('telepisa'): t = r['telepisa']; await foto(pg, 'faciles_telepisa', t[0] - 20, t[1] + 14, t[0], t[1], 2)
    await foto(pg, 'faciles_plaza_sancristobal', 90, 260, 73, 234, 14)
    await foto(pg, 'faciles_aviones', -3260, 160, -3300, 99, 30)
    print('errores JS', errs[:3])
    print('FACILES', 'OK' if ok and not errs else 'FALLA')
