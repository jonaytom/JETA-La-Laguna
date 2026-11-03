# Calles pintadas por encima de una rampa o una trinchera abierta (v1.0.8; Jonay: «la entrada al parking tiene una
# carretera encima; hay que revisar dónde se crucen carreteras a distinto nivel en todo el mapa, esto no puede pasar
# nunca»). Recorre los tramos abiertos (TCUTS con suelo) y busca las calles del mapa (DATA.R, sin contar la propia rampa)
# que pasan por encima a ras de suelo; desde la 1.0.8 esas calles no se pintan ahí (cutAware). Saca la lista y una foto de
# cada sitio desde arriba (shots/rampa_<n>.jpg; las 16 primeras).
# Uso: herramientas/sonda_rampas.py
import base64, json
async def run(pg):
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, out=[], seen=new Set();
      for (const c of d.TCUTS) { if (c[6]===undefined) continue; const dx=c[2]-c[0], dz=c[3]-c[1], L=Math.hypot(dx,dz)||1; const deep=Math.max(d.heightAt(c[0],c[1])-c[6], d.heightAt(c[2],c[3])-c[7]); if (deep<1.5) continue;
        d.DATA.R.forEach((rd,ri)=>{ if (rd[3] & 6) return; /* bridges and tunnels: the ramp's own way */ const p=rd[4]; for (let i=0;i+3<p.length;i+=2){ const ax=p[i],az=p[i+1],bx=p[i+2],bz=p[i+3];
          for (let k=0;k<=8;k++){ const x=ax+(bx-ax)*k/8, z=az+(bz-az)*k/8; const t=Math.max(0,Math.min(1,((x-c[0])*dx+(z-c[1])*dz)/(L*L))); const qx=c[0]+dx*t-x, qz=c[1]+dz*t-z; const q=Math.hypot(qx,qz);
            if (q<c[4]-0.5) { const fl=c[6]+(c[7]-c[6])*t, g=d.heightAt(x,z); if (g-fl>1.5) { const key=ri+':'+Math.round(x/10)+','+Math.round(z/10); if(!seen.has(key)){ seen.add(key); out.push({x:Math.round(x), y:Math.round(z), calle: rd[1]>=0?d.DATA.S[rd[1]]:'', tipo:d.DATA.RT[rd[0]], hondo:+(g-fl).toFixed(1)}); } } } } } }); }
      return out; })())"""))
    print('calles por encima de una rampa o trinchera abierta:', len(r))
    for i, e in enumerate(r[:60]): print(f"  {i}: X {e['x']}, Y {e['y']} · {e['calle'] or '(sin nombre)'} ({e['tipo']}) · rampa {e['hondo']} m más abajo")
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for i, e in enumerate(r[:16]):
        await pg.evaluate("([x,z])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x+14,y+22,z+14); d.camera.lookAt(x,y-2,z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [e['x'], e['y']])
        open('shots/rampa_%d.jpg' % i, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('SONDA RAMPAS OK')
