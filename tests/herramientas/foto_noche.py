# Parpadeo de texturas: pone al jugador en x z a la hora h (por defecto las 5:00), deja la cámara quieta y compara
# fotogramas seguidos (porcentaje de píxeles que cambian sin que nada se mueva) + 2 fotos.
# Uso: cd tests && python run_test.py herramientas/foto_noche.py x z [hora]
import sys, base64, io
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); h = float(sys.argv[4]) if len(sys.argv) > 4 else 5
    await pg.evaluate("([x,z,h])=>{window.__manual=true; document.getElementById('menu').style.display='none'; const d=__dbg; d.GAME.state='play'; d.GAME.tod=h; d.PLAYER.x=x; d.PLAYER.z=z; __step(120);}", [x, z, h])
    shots = []
    for i in range(4):
        await pg.evaluate("__step(1)"); d = await pg.evaluate("window.__snap()"); shots.append(base64.b64decode(d.split(',')[1]))
    open('shots/noche_1.jpg', 'wb').write(shots[0]); open('shots/noche_2.jpg', 'wb').write(shots[1])
    try:
        from PIL import Image, ImageChops
        ims = [Image.open(io.BytesIO(b)).convert('L') for b in shots]
        for i in range(3):
            df = ImageChops.difference(ims[i], ims[i + 1]).point(lambda v: 255 if v > 24 else 0); n = sum(1 for v in df.getdata() if v)
            print(f'fotogramas {i}-{i+1}: {100 * n / (df.size[0] * df.size[1]):.2f} % de píxeles cambian')
    except ImportError:
        print('sin PIL: solo fotos')
