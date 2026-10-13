# Sonda de zonas de las misiones (v0.70, «misiones por zonas»): para cada misión de la historia (y la secundaria del
# Obispo) dice dónde se recoge (el que la da), por dónde pasa (cada objetivo/flecha que pone, jugándola sola como
# prueba_misiones) y a cuántos metros queda todo del inicio de la partida y de la misión anterior.
# Uso: cd tests && python run_test.py herramientas/sonda_zonas.py [desde] [hasta]
import asyncio, json, sys, os
AUTO = open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'prueba_misiones.py'), encoding='utf-8').read().split('AUTO = r"""')[1].split('"""')[0]
GOAL = "JSON.stringify((()=>{const d=__dbg, M=d.MISSIONS, g=M.kit.data.goal; return {g: g ? [Math.round(g[0]), Math.round(g[1])] : null, act: !!M.active, idx: M._story.indexOf(M.active)};})())"
async def run(pg):
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __dbg.GAME.tod=12; __step(2);})()")
    titles = json.loads(await pg.evaluate("JSON.stringify(__dbg.MISSIONS._story.map(m=>m.title))"))
    home = json.loads(await pg.evaluate("JSON.stringify((()=>{const b=__dbg.NPC.blanco; return b ? [Math.round(b.home[0]), Math.round(b.home[1])] : [Math.round(__dbg.PLAYER.x), Math.round(__dbg.PLAYER.z)];})())"))
    print('inicio (casa de El Blanco)', home)
    a = int(sys.argv[2]) if len(sys.argv) > 2 else 0; b = int(sys.argv[3]) if len(sys.argv) > 3 else len(titles) - 1
    dist = lambda p, q: round(((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2) ** 0.5)
    prev = home; filas = []
    for i in range(a, b + 1):
        sp = json.loads(await pg.evaluate("(i)=>{const d=__dbg, M=d.MISSIONS; if (M.active) M.fail('x', true); if (d.PLAYER.car) d.exitCar(); if (d.DLG.open) d.DLG.hide(); __step(5); M._setIdx(i); const p=M._story[i].startPos(); d.PLAYER.x=p[0]; d.PLAYER.z=p[1]; d.PLAYER.health=100; d.GAME.tod=12; __step(10); return JSON.stringify([Math.round(p[0]), Math.round(p[1])]);}", i))
        goals = []; started = False
        for it in range(500):
            act = await pg.evaluate(AUTO)
            if act in ('fight', 'countdown', 'dlg'): await asyncio.sleep(0.3)
            else: await pg.evaluate("__step(15, 1/30)")
            st = json.loads(await pg.evaluate(GOAL))
            if st['act']: started = True
            if st['g'] and (not goals or dist(goals[-1], st['g']) > 30): goals.append(st['g'])
            if started and not st['act']: break
        lejos = max([dist(sp, g) for g in goals] or [0])
        print(f"[{i}] {titles[i]}: se recoge en {sp} (a {dist(sp, home)} m del inicio, {dist(sp, prev)} m de la anterior) · objetivos {goals[:6]} · el más lejano a {lejos} m")
        filas.append({'i': i, 'titulo': titles[i], 'recoge': sp, 'del_inicio': dist(sp, home), 'de_la_anterior': dist(sp, prev), 'objetivos': goals, 'mas_lejano': lejos})
        prev = goals[-1] if goals else sp
    os.makedirs('shots', exist_ok=True); json.dump(filas, open('shots/sonda_zonas.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('ZONAS OK (datos en tests/shots/sonda_zonas.json)')
