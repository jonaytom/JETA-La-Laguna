# Pasos sincronizados: compara cuándo suena cada paso con el momento en que el tobillo toca el suelo.
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    await pg.evaluate("__dbg.AUDIO ? __dbg.AUDIO.init() : 0")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; window.__dbg.GAME.state='play'; __step(5); const P=__dbg.PLAYER; P.x=-560; P.z=-300; __dbg.CARS.length=0; __step(5);})()")
    for name, keys in [('trote', "['KeyW']"), ('sprint', "['KeyW','ShiftLeft']"), ('andar', "['KeyW','KeyC']")]:
        r = await pg.evaluate("""(()=>{const d=__dbg, H=d.playerHuman, P=d.PLAYER; window.__STEPLOG=[]; const rows=[]; P.down=0; P.health=100; P.x=-560; P.z=-300; d.CARS.length=0; __step(30,1/60); const v=new d.THREE.Vector3(), rv=new d.THREE.Vector3();
          const bl=H.skeleton.bones.find(b=>b.name==='foot_l'), br=H.skeleton.bones.find(b=>b.name==='foot_r');
          for(let i=0;i<300;i++){ const n=__STEPLOG.length; __step(1,1/60,%s); H.root.updateMatrixWorld(true); rv.setFromMatrixPosition(H.root.matrixWorld);
            bl.getWorldPosition(v); const hl=v.y-rv.y; br.getWorldPosition(v); const hr=v.y-rv.y; rows.push([i, +hl.toFixed(3), +hr.toFixed(3), __STEPLOG.length>n ? __STEPLOG[__STEPLOG.length-1][1] : 0, +P.speed.toFixed(2), H.cur]); }
          return rows; })()""" % keys)
        rows = r[40:]
        steps = [x for x in rows if x[3]]
        # contact = local minimum of each ankle
        errs = []
        for s in steps:
            col = 1 if s[3] == -1 else 2
            i = rows.index(s)
            # primer fotograma en que el tobillo queda a menos de 2 cm de su mínimo local (el pie ya está plantado)
            lo = min(rows[j][col] for j in range(max(0, i-20), min(len(rows), i+20)))
            best = next(j for j in range(max(0, i-20), min(len(rows), i+20)) if rows[j][col] < lo + 0.02)
            errs.append((rows[best][0] - s[0]) / 60 * 1000)
        dur = (rows[-1][0] - rows[0][0]) / 60
        print(name, 'clip', rows[-1][5], 'vel', rows[-1][4], 'pasos', len(steps), 'en', round(dur, 2), 's ->', round(len(steps)/dur, 2), 'pasos/s',
              'lados', [s[3] for s in steps], 'intervalos (ms)', [round((b[0]-a[0])/60*1000) for a, b in zip(steps, steps[1:])], 'desfase hasta el apoyo (ms)', [round(e) for e in errs])
    await pg.wait_for_timeout(1500)
    print('muestras listas:', await pg.evaluate("__dbg.STEPS.ready"))
    for sf in ['hard','stone','tile','soft','metal']:
        await pg.evaluate("__dbg.STEPS.play('%s','walk')" % sf)
    await pg.evaluate("__dbg.STEPS.setSpace('tunnel'); __dbg.STEPS.play('hard','run'); __dbg.STEPS.setSpace('')")
    print('reproducción sin errores')
