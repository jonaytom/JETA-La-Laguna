# Bordes del mundo: el aviso aparece a menos de 50 m y, al seguir, el jugador (a pie y en coche) vuelve 100 m dentro,
# sobre una calle y fuera de edificios. También comprueba que las zonas quitadas no tienen edificios.
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(3);})()")
    for (x,z,ang,car) in [(-1850,-300,-1.57,False),(500,3950,0,False),(1500,700,2.6,False),(-300,1600,3.14,True),(2350,1500,1.57,True)]:
        r = await pg.evaluate(f"""(()=>{{const d=__dbg,P=d.PLAYER; if({str(car).lower()}){{ const c=d.CARS.find(c=>c.type!=='bus'&&c.type!=='moto'); if(!P.car) d.enterCar(c); P.car.x={x}; P.car.z={z}; P.car.h={ang}; }} else {{ if(P.car) d.GAME.exitCar&&d.GAME.exitCar(); P.x={x}; P.z={z}; P.h={ang}; }}
          const d0=d.worldEdgeDist({x},{z}); for(let i=0;i<4;i++) __step(1,1/30); const toast=document.getElementById('toast').textContent; const X=P.car?P.car.x:P.x, Z=P.car?P.car.z:P.z;
          const rd=d.ROADSEG.nearest(X,Z); return JSON.stringify({{inicio:[{x},{z}], borde0:+d0.toFixed(1), ahora:[Math.round(X),Math.round(Z)], borde:+d.worldEdgeDist(X,Z).toFixed(0), calle:rd&&+rd.d.toFixed(1), coche:!!P.car, aviso:toast}}); }})()""")
        print(r)
    print(await pg.evaluate("JSON.stringify({edificios_en_zonas_quitadas: __dbg.BUILD.filter(b=>!__dbg.inPlayArea(b.cx,b.cz,-6)).length})"))
