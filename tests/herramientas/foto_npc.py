# Foto de cerca de un NPC de misión (cara y cuerpo). Uso: cd tests && python run_test.py herramientas/foto_npc.py alcalde
# Deja las fotos en tests/shots/npc_<nombre>_<n>.jpg
import base64, os, sys
async def run(pg):
    name = sys.argv[2] if len(sys.argv) > 2 else 'alcalde'
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=11; __step(2);})()")
    os.makedirs('shots', exist_ok=True)
    for i, (dist, h, look, fov) in enumerate([(1.1, 1.75, 1.72, 40), (3.2, 1.6, 1.1, 50)]):
        await pg.evaluate("""([n,dist,h,look,fov])=>{const d=__dbg, N=d.NPC[n]; d.PLAYER.x=N.x+6; d.PLAYER.z=N.z+6; __step(3); const r=N.H.root; const a=r.rotation.y; const y=r.position.y;
          d.camera.fov=fov; d.camera.updateProjectionMatrix(); d.camera.position.set(N.x+Math.sin(a)*dist, y+h, N.z+Math.cos(a)*dist); d.camera.lookAt(N.x, y+look, N.z);}""", [name, dist, h, look, fov])
        open(f'shots/npc_{name}_{i}.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('fotos en tests/shots/npc_%s_*.jpg' % name)
