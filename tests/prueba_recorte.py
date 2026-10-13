# Edificios fuera de la calzada (v0.69, auditor: 515 edificios metidos en los carriles): cuántos se han recortado,
# cuántos siguen metiéndose ≥ 1 m en alguna calzada (lista de los peores) y fotos desde arriba de los sitios que daba
# el auditor (C. Barcelona, Av. de los Menceyes, C. Herradores, C. Nava y Grimón, Ctra. de Valle Tabares).
import os, json, base64
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
SITIOS = [[-15, 217, 'barcelona'], [298, 899, 'menceyes'], [-21, 57, 'herradores'], [186, -282, 'nava_grimon'], [2502, 1648, 'valle_tabares']]
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, R=d.DATA.R; const segs=[];
      R.forEach(r=>{ if (r[0]>12 || (r[3]&6)) return; const c=r[4]; for (let i=0;i+3<c.length;i+=2) segs.push([c[i],c[i+1],c[i+2],c[i+3],r[2]]); });
      const G=new Map(); segs.forEach((s,id)=>{ for (let a=Math.floor(Math.min(s[0],s[2])/40);a<=Math.floor(Math.max(s[0],s[2])/40);a++) for (let b=Math.floor(Math.min(s[1],s[3])/40);b<=Math.floor(Math.max(s[1],s[3])/40);b++){ const k=a*100003+b; if(!G.has(k)) G.set(k,[]); G.get(k).push(id);} });
      const inv=(P)=>{ let w=0; for (let i=0;i<P.length;i++){ const p=P[i], q=P[(i+1)%P.length]; for (const t of [0,0.5]) { const x=p[0]+(q[0]-p[0])*t, z=p[1]+(q[1]-p[1])*t; for (const id of (G.get(Math.floor(x/40)*100003+Math.floor(z/40))||[])) { const s=segs[id]; const dx=s[2]-s[0], dz=s[3]-s[1], L2=dx*dx+dz*dz||1; const u=Math.max(0,Math.min(1,((x-s[0])*dx+(z-s[1])*dz)/L2)); const dd=Math.hypot(x-s[0]-dx*u, z-s[1]-dz*u); w=Math.max(w, s[4]/2-dd); } } } return w; };
      const bad=[]; let n=0; for (const b of d.BUILD) { if (!b.pts || b.style===4) continue; n++; const w=inv(b.pts); if (w>=1) bad.push([Math.round(b.cx),Math.round(b.cz),+w.toFixed(1),b.name||'']); }
      bad.sort((a,b)=>b[2]-a[2]); return { recortados: d.RCLIP ? d.RCLIP.cut : null, edificios: n, invaden: bad.length, peores: bad.slice(0, 25) }; })())"""))
    print('recortados', r['recortados'], 'de', r['edificios'], '· siguen metidos ≥ 1 m:', r['invaden'])
    for b in r['peores']: print('  ', b)
    for x, z, n in SITIOS:
        await pg.evaluate("([x,z])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x+18,y+38,z+18); d.camera.lookAt(x,y,z);}", [x, z])
        open('shots/recorte_' + n + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto recorte_' + n)
    ok = (r['recortados'] or 0) > 500 and r['invaden'] < 450 and not errs
    print('errores JS', errs[:3]); print('RECORTE', 'OK' if ok else 'FALLA')
