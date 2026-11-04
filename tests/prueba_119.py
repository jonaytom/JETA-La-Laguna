# v1.1.9: «Calles, túneles y puentes». 1) la TF-5 en trinchera bajo la Rotonda Sempiterno y el puente de Cam. San
# Lázaro, y junto a la salida del aeropuerto (X −3292, Y −161), con los puentes a nivel del suelo; 2) la rampa del HUC no
# está hundida donde la cruza la calle de servicio; 3) soportales en la acera de los impares de la Av. de La Trinidad;
# 4) ninguna calle repetida (dos copias de la misma vía, una encima de otra).
import json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    r = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, R=d.DATA.R;
      // the drivable surface of the roads near a point: [type, flags, road height − ground]
      const at = (x, z, rad) => { const out=[]; R.forEach((rd,ri)=>{ if (rd[0]>12) return; const c=rd[4]; let s=0;
        for (let i=0;i+3<c.length;i+=2) { const L=Math.hypot(c[i+2]-c[i],c[i+3]-c[i+1]); const dx=c[i+2]-c[i], dz=c[i+3]-c[i+1], L2=L*L||1;
          const t=Math.max(0,Math.min(1,((x-c[i])*dx+(z-c[i+1])*dz)/L2)), px=c[i]+dx*t, pz=c[i+1]+dz*t;
          if (Math.hypot(px-x,pz-z)<rad) { let y=null; try { y=d.ROADY[ri](s+L*t,px,pz); } catch(e) {} if (y!=null) out.push([d.DATA.RT[rd[0]], rd[3], Math.round((y-d.heightAt(px,pz))*100)/100]); break; }
          s+=L; } }); return out; };
      return JSON.stringify({ tf5: { mw: d.TF5T.mw.length, links: d.TF5T.links.length }, sanLazaro: at(-1815,-212,9), salidaAerop: at(-3292,-190,6), sempiterno: at(-2270,-228,9), huc: at(2210,3313,3), arcos: d.TRI_ARC.edges, err: d.TF5T.err || null,
        mwInfo: d.TF5T.mw.map(ri=>{ const c=R[ri][4]; const L=c.length; return [ri, d.DEP.has(ri), Math.round(c[0]), Math.round(c[1]), Math.round(c[L-2]), Math.round(c[L-1]), d.RAISE.has(ri)]; }),
        cerca: (()=>{ const o=[]; R.forEach((rd,ri)=>{ if (rd[0]!==0) return; const c=rd[4]; for (let i=0;i<c.length;i+=2) if (Math.hypot(c[i]+1815,c[i+1]+212)<120) { o.push([ri, rd[3], d.DEP.has(ri), d.TF5T.mw.includes(ri), d.RAISE.has(ri), c.length/2]); break; } }); return o; })() }); })()"""))
    print('alturas', json.dumps(r, ensure_ascii=False))
    mw = lambda L: [h for (t, f, h) in L if t == 'motorway']
    br = lambda L: [h for (t, f, h) in L if f & 2]
    ok1 = r['tf5']['mw'] >= 4 and r['tf5']['links'] >= 2 and min(mw(r['sanLazaro']) or [0]) < -5 and min(mw(r['sempiterno']) or [0]) < -5
    ok1 = ok1 and max(br(r['sanLazaro']) or [9]) < 1.2 and max(br(r['salidaAerop']) or [9]) < 1.2 and min(mw(r['salidaAerop']) or [0]) < -4.5
    print('TRINCHERA_TF5', 'OK' if ok1 else 'FALLA')
    ok2 = all(h > -0.35 for (t, f, h) in r['huc'])
    print('RAMPA_HUC', 'OK' if ok2 else 'FALLA')
    ok3 = r['arcos'] >= 10
    print('SOPORTALES', 'OK' if ok3 else 'FALLA')
    print('errores', errs[:3])
    ok = ok1 and ok2 and ok3 and not errs
    print('PRUEBA 119', 'OK' if ok else 'FALLA')
