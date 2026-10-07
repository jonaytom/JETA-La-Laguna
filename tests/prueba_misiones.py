# Prueba automática de las misiones de la historia (v0.56).
# Uso: cd tests && python run_test.py prueba_misiones.py [desde] [hasta]
#   (por defecto, todas las de «Atraco en la farmacia» en adelante)
# Un «piloto automático» juega cada misión con atajos: salta los diálogos, gana las peleas 2D (vida del rival a 0),
# acierta a los blancos de la pistola de bolas, daña los coches que huyen, se sube al vehículo que pide la misión y
# se teletransporta al objetivo. Comprueba que cada misión se puede terminar de principio a fin sin errores de JS.
import asyncio, json, sys

AUTO = r"""() => {
  const d = __dbg, M = d.MISSIONS, P = d.PLAYER, m = M.active; if (!m) return 'idle';
  const S = m.st || {}; const T = window.__TALK;
  if (T && T.cur) { T.cur.next(); return 'talk'; }
  if (d.DLG.open) { const b = document.getElementById('dlgopt0'); if (b) b.click(); return 'dlg'; }
  if (d.FIGHT2D.running) { const s = d.FIGHT2D._st(); if (s) { if (s.phase === 'ready') s.readyTap = true; if (s.phase === 'fight' && s.b && !s.b.ko) { s.b.hp = 0; s.b.ko = true; } } return 'fight'; }
  for (const t of d.WEAPON.targets) if (!t.hit && t.npc && !t.npc.down && d.WEAPON.onHit) { d.WEAPON.onHit(t); return 'shot'; }
  const put = (x, z) => { const c = P.car; if (c) { c.x = x; c.z = z; c.vx = c.vz = 0; c.fwdV = 0; c.speed = 0; } P.x = x; P.z = z; };
  const ride = (c) => { if (P.car === c) return false; P.x = c.x + 2.5; P.z = c.z; d.enterCar(c); return true; };
  const need = (S.truck && S.step === 1 && S.truck) || (S.van && S.van.keep && S.step === 4 && S.van) || null;
  if (need) { ride(need); return 'enter'; }
  if (S.car && S.car.mode === 'race' && S.car.driver === 'race') { const h = S.car.h; if (!P.car && S.mine) ride(S.mine); put(S.car.x - Math.sin(h) * 12, S.car.z - Math.cos(h) * 12); return 'follow'; }
  for (const c of [S.van]) if (c && c.mode === 'race' && c.driver === 'race' && c.health > 44) { c.health = 40; return 'damage'; }
  if (S.t2 && S.step === 6) { if (P.car) d.exitCar(); put(S.t2.x + 1, S.t2.z); return 'grab'; }
  if (/rally|guagua|Romero/i.test(m.title) && !P.car) { const c = new d.Car('sedan', 0xd03030, P.x + 3, P.z, 0); c.persist = true; ride(c); return 'car'; }
  if (S.bus && S.bus.mode === 'race') { const h = S.bus.h; put(S.bus.x - Math.sin(h) * 9, S.bus.z - Math.cos(h) * 9); return 'escort'; }
  if (/rally/i.test(m.title) && S.step === 2) return 'countdown';
  for (const n of [S.n]) if (n && !n.down && n.H.root.visible) { put(n.x + 1.2, n.z); return 'chase'; }
  const g = M.target(); if (g) { put(g[0], g[1]); return 'goto'; }
  return 'wait';
}"""
STATE = "JSON.stringify({m: __dbg.MISSIONS.active && __dbg.MISSIONS.active.title, obj: document.getElementById('objective').innerText.slice(0,90), money: __dbg.PLAYER.money, idx: __dbg.MISSIONS.getState().story})"

async def run(pg):
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("localStorage.removeItem('gtall_fights')")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    titles = json.loads(await pg.evaluate("JSON.stringify(__dbg.MISSIONS._story.map(m=>m.title))"))
    args = [a for a in sys.argv[2:]]
    a = int(args[0]) if args else next(i for i, t in enumerate(titles) if 'armacia' in t)
    b = int(args[1]) if len(args) > 1 else len(titles) - 1
    ok_all = True
    for i in range(a, b + 1):
        n0 = len(errs)
        await pg.evaluate("""(i)=>{const d=__dbg, M=d.MISSIONS; if (d.PLAYER.car) d.exitCar(); if (d.DLG.open) d.DLG.hide(); M._setIdx(i); const p=M._story[i].startPos(); d.PLAYER.x=p[0]; d.PLAYER.z=p[1]; d.PLAYER.health=100; d.GAME.tod=12; __step(10);}""", i)
        money0 = await pg.evaluate("__dbg.PLAYER.money")
        log, res, last = [], 'TIEMPO', ''
        for it in range(700):
            act = await pg.evaluate(AUTO)
            if act != last: log.append(act); last = act
            if act in ('fight', 'countdown', 'dlg'): await asyncio.sleep(0.4)
            else: await pg.evaluate("__step(15, 1/30)")
            stt = json.loads(await pg.evaluate(STATE))
            if not stt['m'] and act == 'idle' and it > 2:
                res = 'PASA' if stt['idx'] > i else 'FALLA'
                break
        stt = json.loads(await pg.evaluate(STATE))
        toast = await pg.evaluate("((document.getElementById('toast')||{}).innerText||'') + ' | ' + ((document.getElementById('big')||{}).innerText||'')")
        ok = res == 'PASA' and len(errs) == n0; ok_all = ok_all and ok
        print(f"[{i}] {titles[i]}: {res} · dinero +{stt['money'] - money0} · pasos {'>'.join(log)[:200]}")
        if res != 'PASA': print('     objetivo:', stt['obj'], '·', toast[:160])
        for e in errs[n0:]: print('     ERROR JS:', e[:300])
        if stt['m']:  # left running: abort it so the next one starts clean
            await pg.evaluate("__dbg.MISSIONS.fail('prueba', true)"); await pg.evaluate("__step(40)")
            await asyncio.sleep(0.5)
            for _ in range(10): await pg.evaluate("(()=>{const T=window.__TALK; if(T&&T.cur) T.cur.next(); __step(10);})()")
    print('MISIONES', 'OK' if ok_all else 'FALLA')
