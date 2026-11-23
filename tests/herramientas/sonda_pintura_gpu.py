# v1.4.46: qué material de pintura lleva un coche propio recién creado (tipo, barniz, reflejo) y cuántas pinturas hay en CAR_PAINTS
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    r = await pg.evaluate("""()=>{ const d=__dbg; const P=d.PLAYER; const car=new d.Car(null,0xb3261e,P.x+6,P.z,0,d.VMODELS.carlota); __step(1);
      const mats=new Set(); car.mesh.traverse(o=>{ if(o.isMesh) mats.add(o.material); });
      return { paint: car.paint && [car.paint.type, car.paint.clearcoat, car.paint.roughness, car.paint.metalness, !!car.paint.envMap, car.paint.envMap && car.paint.envMap.uuid],
        enMalla: [...mats].map(m=>[m.type, m===car.paint, m.color && m.color.getHexString()]), env: d.scene.environment && d.scene.environment.uuid,
        CAR_PAINTS: typeof CAR_PAINTS!=='undefined' ? CAR_PAINTS.size : 'no global' }; }""")
    print('PINTURA', r)
