# v0.99.6 (Jonay: «perfectas así, aplícalo todo a escala del juego» / «los jugadores deberían ser de distintos
# aspectos»): the new basketball animations in the game (tiro, robo, rebote, tapón, the four combo dunks with the hands
# on the rim, the rim tilting and the net swinging) and players that look different. Photos of each, frozen.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True; fotos = []
    try:
        await pg.evaluate("""() => { const L = (s, sh, h, hs) => ({ skin: s, shirt: sh, pants: 0x222244, hair: h, hairStyle: hs });
          __dbg.BASKET2D.start({ team: [{ name: 'EL CHOPA', look: L(0xd9a47c, 0x2e6b3a, 0x1a1410, 'Hair_SimpleParted') }, { name: 'COCO', look: L(0x8d5a3b, 0xc0282c, 0x2a1a10, 'Hair_Long') }, { name: 'EL BLANCO', look: L(0xf1c9a5, 0x2a5ac8, 0xd8b56a, 'Hair_SimpleParted') }],
            rival: [{ name: 'EL MÁS ALTO', look: L(0xc68a5e, 0xe0b020, 0x6b3e1e, 'Hair_Long') }, { name: 'EL PIBE', look: L(0xe0ac86, 0x7a2a9a, 0x1a1410, 'Hair_Buzzed') }, { name: 'RIVAL 3', look: L(0x8d5a3b, 0x1a1a1a, 0x1a1410, 'Hair_SimpleParted') }], time: 30, lv: 0.5, auto: true, onEnd: () => {} }); }""")
        await pg.wait_for_timeout(800); await pg.evaluate("__dbg.BASKET2D._step(60*4)"); await pg.wait_for_timeout(400)
        # each scene: [what, setup of the players] (frozen: drawn without stepping)
        scenes = [('mate_360', "p.combo='m360'; p.act='dunk'; p.air=true; p.y=1.6; p.vy=-0.5; p.cT=0.5"), ('mate_360_aro', "p.combo='m360'; p.act='dunk'; p.air=true; p.y=1.6; p.vy=-0.5; p.cT=0.9"),
                  ('molino', "p.combo='molino'; p.act='dunk'; p.air=true; p.y=1.4; p.vy=0.5; p.cT=0.45"), ('espaldas_aro', "p.combo='espaldas'; p.act='dunk'; p.air=true; p.y=1.6; p.cT=0.92"),
                  ('piernas', "p.combo='piernas'; p.act='dunk'; p.air=true; p.y=1.2; p.vy=1; p.cT=0.4"), ('tiro', "p.act='shoot'; p.air=true; p.shootHold=true; p.y=1.0; p.vy=0.5"),
                  ('robo', "p.stealT=st.time0-0.15; p.air=false; p.y=0"), ('rebote_tapon', "p.air=true; p.y=1.3; p.vy=0; p.act=''; p.combo=null")]
        for name, setup in scenes:
            r = json.loads(await pg.evaluate("""(setup) => { const B = __dbg.BASKET2D, st = B._st(), b = st.ball; const p = st.p[0];
                for (const q of st.p) { if (q !== p) { q.air = true; q.y = 1.2; q.vy = 0.2; q.act = ''; q.combo = null; } }
                b.holder = p; b.mode = 'held'; (new Function('p', 'st', setup))(p, st); st.drawn = 0; B._draw();
                const strip = __dbg.BKSHEET.anim(p.look, p.seed);
                return JSON.stringify({ drawn: st.drawn || 0, strip: strip.width, hang: !!st.hang, foto: document.getElementById('basket2d').toDataURL('image/jpeg', 0.85) }); }""", setup))
            d = r.pop('foto'); os.makedirs('shots', exist_ok=True); open('shots/v0996_bk_%s.jpg' % name, 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v0996_bk_' + name, r); fotos.append(r)
        seeds = json.loads(await pg.evaluate("JSON.stringify(__dbg.BASKET2D._st().p.map(p => [p.name, p.seed, p.size]))")); print('jugadores (semilla, tamaño)', seeds)
        ok = all(f['drawn'] >= 6 and f['strip'] == 80 * 92 for f in fotos) and any(f['hang'] for f in fotos) and len(set(s[1] % 6 for s in seeds)) >= 3
        print('ANIMACIONES NUEVAS Y ASPECTOS DISTINTOS', 'OK' if ok else 'FALLA')
    finally:
        await pg.evaluate("(()=>{ try { __dbg.BASKET2D._abort(); } catch (e) {} __dbg.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 0996B', 'OK' if ok else 'FALLA')
