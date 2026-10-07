# Persecuciones de las misiones (a pie y en coche): cuando aparece la flecha roja sobre el perseguido, comprueba que
# está a la vista (en la escena, visible, a menos de 60 m del jugador), que no da saltos (máx. paso por fotograma) y
# que se aleja de verdad. Uso: cd tests && python run_test.py prueba_persecuciones.py [índices separados por comas]
import asyncio, json, sys
AUTO = open('prueba_misiones.py').read().split('AUTO = r"""')[1].split('"""')[0]
SAMPLE = r"""() => { const d = __dbg, out = []; for (const k of d.S2.marks) { const o = k.o; out.push({ id: k.id, step: d.MISSIONS.active && d.MISSIONS.active.st && d.MISSIONS.active.st.step, car: !o.H, x: o.x, z: o.z, vis: o.H ? !!o.H.root.parent && o.H.root.visible : !!(o.mesh ? o.mesh.parent : true) }); } return JSON.stringify({ P: [d.PLAYER.x, d.PLAYER.z], m: out }); }"""
async def run(pg):
    titles = json.loads(await pg.evaluate("JSON.stringify(__dbg.MISSIONS._story.map(m=>m.title))"))
    idx = [int(a) for a in sys.argv[2].split(',')] if len(sys.argv) > 2 else [i for i, t in enumerate(titles) if t in ('Atraco en la farmacia', 'El carterista del Cristo', 'El rally de La Esperanza', 'Los bancos del Adelantado', 'Grafiteros en el tranvía', 'La guagua de la broma', 'Escolta a la guagua del Romero', 'Noche en el aeropuerto')]
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __dbg.GAME.tod=12; __step(2);})()")
    ok_all = True
    for i in idx:
        await pg.evaluate("(i)=>{const d=__dbg, M=d.MISSIONS; if (M.active) M.fail('x', true); if (d.PLAYER.car) d.exitCar(); __step(5); M._setIdx(i); const p=M._story[i].startPos(); d.PLAYER.x=p[0]; d.PLAYER.z=p[1]; __step(10);}", i)
        found = False
        for _ in range(600):
            if await pg.evaluate("__dbg.S2.marks.length"): found = True; break
            a = await pg.evaluate(AUTO)
            if a in ('fight', 'dlg', 'countdown'): await asyncio.sleep(0.4)
            else: await pg.evaluate("__step(4, 1/30)")
        if not found: print(f'[{i}] {titles[i]}: SIN FLECHA'); ok_all = False; continue
        prev = json.loads(await pg.evaluate(SAMPLE)); first = prev; jump = 0
        for _ in range(90):  # 3 s, the player stands still
            await pg.evaluate("__step(1, 1/30)"); cur = json.loads(await pg.evaluate(SAMPLE))
            pm = {q['id']: q for q in prev['m']}
            for b in cur['m']:
                a = pm.get(b['id'])
                if a: jump = max(jump, ((a['x'] - b['x']) ** 2 + (a['z'] - b['z']) ** 2) ** 0.5)
            prev = cur
        res = []
        lm = {q['id']: q for q in prev['m']}
        caught = json.loads(await pg.evaluate("JSON.stringify(__dbg.S2.chase.map(o=>!!o.down))"))
        if not first['m']: print(f'[{i}] {titles[i]}: la flecha desapareció enseguida'); ok_all = False; continue
        for a in first['m']:
            b = lm.get(a['id'], a)
            d0 = ((a['x'] - first['P'][0]) ** 2 + (a['z'] - first['P'][1]) ** 2) ** 0.5; moved = ((a['x'] - b['x']) ** 2 + (a['z'] - b['z']) ** 2) ** 0.5
            # (a game step can run the mission logic up to 3 times: 0.9 m on foot is still a normal step)
            far_ok = 'guagua de la broma' in titles[i]; wait_ok = 'Romero' in titles[i] or 'rally' in titles[i] or 'farmacia' in titles[i]  # waits for you / real-time countdown / gets into the car
            good = a['vis'] and (d0 < 60 or far_ok) and jump < (1.5 if a['car'] else 0.9) and (moved > 3 or wait_ok or a['id'] not in lm)  # gone = caught or got into the car
            ok_all = ok_all and good; res.append(f"{'coche' if a['car'] else 'a pie'}: a {d0:.0f} m, recorre {moved:.0f} m en 3 s, salto máx {jump:.2f} m {'OK' if good else 'MAL'}")
        print(f'[{i}] {titles[i]}: ' + ' | '.join(res))
    print('PERSECUCIONES', 'OK' if ok_all else 'FALLA')
