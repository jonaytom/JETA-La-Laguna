# Jugador de cerca: de pie, apuntando con puños y apuntando con la pistola (para ver accesorios mal colocados).
# Uso: cd tests && python run_test.py herramientas/foto_jugador.py
import base64
async def snap(pg, name):
    open('shots/' + name + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
async def run(pg):
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    # small accessories: where they end up relative to the body
    probe = """JSON.stringify((()=>{const r=[]; const v=__dbg.playerHuman.root.position.clone(); __dbg.playerHuman.root.updateMatrixWorld(true);
      __dbg.playerHuman.root.traverse(m=>{ if(!m.isMesh||m.isSkinnedMesh||!m.visible) return; m.getWorldPosition(v); const g=m.geometry; g.computeBoundingSphere();
        if(g.boundingSphere.radius<0.06) r.push([g.type, +(v.x-__dbg.PLAYER.x).toFixed(2), +(v.y-__dbg.playerHuman.root.position.y).toFixed(2), +(v.z-__dbg.PLAYER.z).toFixed(2), m.parent&&m.parent.name]); }); return r; })())"""
    print('de pie', await pg.evaluate(probe)); await snap(pg, 'jugador_pie')
    await pg.evaluate("(()=>{__dbg.WEAPON.aiming=true; for(let i=0;i<20;i++){__dbg.WEAPON.aiming=true; __step(1);} })()")
    print('puños apuntando', await pg.evaluate(probe)); await snap(pg, 'jugador_punos')
    await pg.evaluate("(()=>{__dbg.giveWeapon(6,false); for(let i=0;i<20;i++){__dbg.WEAPON.aiming=true; __step(1);} })()")
    print('pistola apuntando', await pg.evaluate(probe)); await snap(pg, 'jugador_pistola')
