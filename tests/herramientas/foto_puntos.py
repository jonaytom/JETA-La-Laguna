# Fotos a la altura de los ojos en puntos; entrada JSON [[x,z,yaw,ri],...] como 2º argumento.
# Uso: cd tests && python run_test.py herramientas/foto_puntos.py [entrada.json]
import sys
import json, base64
S='shots/'; import os, sys; os.makedirs(S, exist_ok=True)
PTS=json.load(open(sys.argv[2] if len(sys.argv) > 2 else 'inpts.json'))  # [x,z,yaw,ri]
async def run(pg):
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=11; __step(2);})()")
    for i,(x,z,yaw,ri) in enumerate(PTS):
        await pg.evaluate("([x,z,yaw,ri])=>{const d=__dbg; const P=d.PLAYER; P.x=x; P.z=z; __step(3); const c=d.DATA.R[ri][4]; let s=0,bs=0,bd=1e9; for(let i=0;i+3<c.length;i+=2){const L=Math.hypot(c[i+2]-c[i],c[i+3]-c[i+1]); const t=Math.max(0,Math.min(1,((x-c[i])*(c[i+2]-c[i])+(z-c[i+1])*(c[i+3]-c[i+1]))/(L*L))); const dd=Math.hypot(x-c[i]-(c[i+2]-c[i])*t,z-c[i+1]-(c[i+3]-c[i+1])*t); if(dd<bd){bd=dd;bs=s+L*t;} s+=L;} const y=d.ROADY[ri](bs,x,z); d.camera.position.set(x-Math.sin(yaw)*14,y+7,z-Math.cos(yaw)*14); d.camera.lookAt(x,y+0.5,z);}", [x,z,yaw,ri])
        img = await pg.evaluate("window.__snap()")
        open(S+f'in_{i}.jpg','wb').write(base64.b64decode(img.split(',')[1]))
