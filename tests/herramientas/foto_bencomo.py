# Fotos de Bencomo antes y después de un cambio de dibujo (v1.1.3; Jonay: «muestra cómo queda Bencomo antes de aplicar lo
# del picado y el golpe más largo»): el picado (la vara hacia abajo) y el golpe, con window.__BEN_NEW = false (como estaba)
# y true (lo nuevo), recortadas y ampliadas ×3 en una sola hoja: shots/bencomo_antes_despues.png
import base64, io, json
from PIL import Image
async def snap(pg):
    d = await pg.evaluate("document.getElementById('arcade').toDataURL('image/png')")
    return Image.open(io.BytesIO(base64.b64decode(d.split(',')[1]))).convert('RGB')
async def run(pg):
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2); for (const k of Object.keys(__dbg.SPRX_DATA)) __dbg.SPRX.ready(k); })()"); await pg.wait_for_timeout(600)
    await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'bencomo', key: 'foto_ben', where: 'PRUEBA', price: 0 }); const A=__dbg.ARCADE; A._step(30); A._st().t=0.5; A._press('vS', true); A._step(1); A._press('vS', false); A._step(30); const gm=A._game(); gm._load(0); A._step(30); })()")
    shots = []
    for nv in (False, True):
        # the pogo: in the air with ↓ held; the hit: on the ground, A pressed, 3 frames later
        await pg.evaluate("(nv)=>{ window.__BEN_NEW = nv; const A=__dbg.ARCADE, gm=A._game(), p=gm._p; p.vault=0; p.pole=null; p.atk=0; p.inv=0; p.hurtT=0; p.face=1; p.flying=false; p.y-=40; p.vy=60; p.onG=false; A._press('vD', true); A._step(2); A._render(); }", nv)
        a = await snap(pg)
        pa = json.loads(await pg.evaluate("(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; A._press('vD', false); return JSON.stringify({pogo:p.pogo}); })()"))
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; A._step(90); p.atkCD=0; A._press('vS', true); A._step(1); A._press('vS', false); A._step(2); A._render(); })()")
        b = await snap(pg)
        pb = json.loads(await pg.evaluate("(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; return JSON.stringify({atk:p.atk}); })()"))
        print('nuevo' if nv else 'antes', pa, pb)
        shots.append((a, b))
    out = []
    for a, b in shots:
        W, H = a.size
        def around(im):  # the player is drawn in the left third of the screen: crop a box round him and blow it up
            box = (int(W * 0.18), int(H * 0.48), int(W * 0.42), int(H * 0.82)); c = im.crop(box); return c.resize((c.width * 3, c.height * 3), Image.NEAREST)
        out.append([around(a), around(b)])
    cw, ch = out[0][0].size; sheet = Image.new('RGB', (cw * 2 + 30, ch * 2 + 30), (20, 20, 20))
    for r, (pa_, pb_) in enumerate(out): sheet.paste(pa_, (10, 10 + r * (ch + 10))); sheet.paste(pb_, (20 + cw, 10 + r * (ch + 10)))
    sheet.save('shots/bencomo_antes_despues.png'); print('fila 1 = antes, fila 2 = después; columna 1 picado, columna 2 golpe', sheet.size)
    await pg.evaluate("(()=>{ window.__BEN_NEW = undefined; try { __dbg.ARCADE.close(); } catch(e){} })()")
    print('FOTO BENCOMO OK')
