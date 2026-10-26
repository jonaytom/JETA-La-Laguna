# v0.88: los futbolistas nuevos (el «F2» que eligió Jonay): el muñeco de siempre, desde arriba y del mismo tamaño, pero
# dibujado a la resolución real del partido (luz y sombra, contorno, medias, botas, número en la espalda, cara) y con la
# cabeza un poco más grande. 1) el partido arranca y se juega sin errores; 2) foto del campo con los jugadores.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        a = json.loads(await pg.evaluate("""(()=>{ const F=__dbg.FUTBOL2D; const L=(n,s,h)=>({ name: n, look: { skin: s, hair: h } });
          const ok=F.start({ team: [L('TÚ',0xc68a5e,0x2a1a10), L('COCO',0x7a4a2c,0x141010), L('EL BLANCO',0xefc8a2,0xc9902e), L('A',0xc68a5e,0x222222), L('B',0xa8714a,0x141010)],
            rival: [L('R1',0xc68a5e,0x222222), L('R2',0xefc8a2,0x6b3e1e), L('R3',0x8d5a3b,0x111111), L('R4',0xc68a5e,0x222222), L('R5',0xf1c9a5,0xd8b56a)],
            kit: { shirt: '#c8102e', shorts: '#1d2a6b', socks: '#1d2a6b', stripe: '#ffc400' }, rivalKit: { shirt: '#f2f2f2', shorts: '#1f5fbf', socks: '#f2f2f2' }, teamName: 'ESPAÑA', rivalName: 'RIVAL', time: 120, lv: 0.4, auto: true });
          for (let i=0;i<60*8;i++) F._step && F._step(1); const s=F._st(); return JSON.stringify({ ok, juega: F.running, n: s.p.length, marcador: s.score }); })()"""))
        print('partido', a)
        await pg.evaluate("__dbg.FUTBOL2D._draw()")
        d = await pg.evaluate("(()=>{ const c=document.getElementById('futbol2d'); return c ? c.toDataURL('image/png') : ''; })()")
        if d: os.makedirs('shots', exist_ok=True); open('shots/v088_futbol.png', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v088_futbol')
        ok1 = a['ok'] and a['juega'] and a['n'] == 10
        print('PARTIDO', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
    finally:
        await pg.evaluate("(()=>{ const d=__dbg; try { if (d.FUTBOL2D.running) d.FUTBOL2D._abort(); } catch (e) {} d.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 088', 'OK' if ok else 'FALLA')
