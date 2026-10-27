# v0.99.5 (Jonay): no parked car on the motorway, its slip roads, trunk/primary roads or the Vía de Ronda; the lined roads
# with their lane textures (several kinds made).
import asyncio, os, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, D=d.DATA, S=D.S; let bad=0;
        const big=(r)=> (r[0] <= 4 || S[r[1]] === 'Vía de Ronda de La Laguna') && !(r[3] & 6);
        for (const s of d.PARKED.slots) { const rd=d.ROADSEG.nearest(s.x, s.z, big); if (rd && rd.d < D.R[rd.ri][2]/2 + 0.3) bad++; }
        const kinds=[]; d.scene.traverse((o)=>{ if (o.name && o.name.startsWith('chunk:aL_')) kinds.push(o.name.slice(6)); });
        const edge = d.MEDIANS.filter((m)=>m[0]===4); return { bad, slots: d.PARKED.slots.length, kinds: [...new Set(kinds)], edge: edge.length, edgeM: Math.round(edge.reduce((a,m)=>a+m[5]*3,0)) }; })())"""))
    print('aparcados sobre carretera grande', r['bad'], 'de', r['slots']); print('texturas de carriles', r['kinds'])
    print('bionda en los bordes de autopista y enlaces', r['edge'], 'tramos,', r['edgeM'], 'm')
    ok = r['bad'] == 0 and len(r['kinds']) >= 4 and r['edge'] > 20
    print('SIN COCHES EN LA AUTOPISTA Y CARRILES', 'OK' if ok else 'FALLA')
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 0995', 'OK' if ok else 'FALLA')
