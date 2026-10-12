# Canchas (v0.66): entradas de todas las canchas (públicas: se entra andando; de colegio o encerradas: puerta en la
# calle con E), el Colegio Máyex, el Pabellón Juan Ríos Tejera, el Torneo Lagunero (5 partidos) y fotos de las entradas.
import asyncio, os, json
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    info = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg; const C=d.COURTS; const bad=C.filter(c=>d.inAnyBuilding(c.x,c.z));
      return { total: C.length, puertas: C.filter(c=>c.gate==='door').length, publicas: C.filter(c=>c.gate==='court').length, enEdificio: bad.map(c=>[c.id,c.label,Math.round(c.x),Math.round(c.z)]),
        mayex: (C.find(c=>c.id==='mayex')||null) && (({x,z,label,street})=>({x:Math.round(x),z:Math.round(z),label,street}))(C.find(c=>c.id==='mayex')),
        rios: (C.find(c=>c.id==='riostejera')||null) && (({x,z,street})=>({x:Math.round(x),z:Math.round(z),street}))(C.find(c=>c.id==='riostejera')),
        lista: C.slice(0, 60).map(c=>[c.id, c.gate, c.label, c.level, Math.round(c.x), Math.round(c.z)]) }; })())"""))
    for k in ('total', 'puertas', 'publicas', 'enEdificio', 'mayex', 'rios'): print(k, info[k])
    for c in info['lista']: print('  ', c)
    tor = json.loads(await pg.evaluate("JSON.stringify(__dbg.MISSIONS.diary().find(t=>t.key==='torneo').list.map(m=>m.title))")); print('torneo', tor)
    ok = info['mayex'] and info['rios'] and not info['enEdificio'] and len(tor) == 5
    # photos of the two special entrances, standing a few metres away looking at them
    for cid, name in (('mayex', 'entrada_mayex'), ('riostejera', 'entrada_rios_tejera')):
        r = await pg.evaluate(f"(()=>{{ const d=__dbg, c=d.COURTS.find(q=>q.id==='{cid}'); if (!c) return null; const P=d.PLAYER; P.x=c.x; P.z=c.z; __step(30); const g=d.courtGateNear(); return g && g.id; }})()")
        print(cid, 'puerta detectada:', r); ok = ok and r == cid; await snap(pg, name)
    print('errores JS', errs[:3]); print('CANCHAS', 'OK' if ok and not errs else 'FALLA')
