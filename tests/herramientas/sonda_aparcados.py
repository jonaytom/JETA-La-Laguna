# v1.4.44 (Jonay, 23-nov: «¿y por qué hay coches aparcados que no funcionan?»): prueba cientos de coches aparcados como lo
# haría el jugador: se pone a 1,5 m del costado (lado del conductor), mira si el juego se lo ofrece (el más cercano para
# entrar), se sube y acelera 2 s. Apunta los que fallan, con su modelo, sitio y por qué.
import json
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(2);})()")
    r = json.loads(await pg.evaluate("""() => { const d=__dbg, P=d.PLAYER, S=d.PARKED.slots, out={total:S.length, probados:0, fallos:[], porModelo:{}};
      const step=Math.max(1, Math.floor(S.length/400));
      for (let k=0; k<S.length; k+=step) { const s=S[k]; if (!s.alive) continue; out.probados++;
        if (P.car) { const c=P.car; d.exitCar(); c.remove(); }
        const side = [Math.cos(s.h), -Math.sin(s.h)]; // the car's left side
        const px = s.x + side[0]*1.5, pz = s.z + side[1]*1.5;
        Object.assign(P, {x:px, z:pz, y:(s.floor ?? d.heightAt(px,pz))+0.17, dead:false, interior:null, low:s.floor!==undefined?{}:null});
        const near = d.parkedNear(P.x, P.z, 4.5, P.y);
        const fail = (why) => { out.fallos.push([s.type, Math.round(s.x), Math.round(s.z), why]); out.porModelo[s.type]=(out.porModelo[s.type]||0)+1; };
        if (!near.includes(s)) { fail('no se ofrece (altura ' + (P.y - s.y).toFixed(2) + ')'); continue; }
        let car; try { d.enterCar(s); car = P.car; } catch(e) { fail('error al subir: ' + e.message); continue; }
        if (!car) { fail('no se sube'); continue; }
        const x0=car.x, z0=car.z;
        for (let i=0;i<60;i++) { car.ctl={thr:1,brk:0,steer:0,hb:0}; __step(1,1/30,['KeyW']); }
        const moved=Math.hypot(car.x-x0, car.z-z0);
        if (moved < 2) fail('no se mueve (' + moved.toFixed(2) + ' m)');
        d.exitCar(); car.remove();
      }
      out.fallos = out.fallos.slice(0, 60); return JSON.stringify(out); }"""))
    print('aparcados', r['total'], '· probados', r['probados'], '· fallan', sum(r['porModelo'].values()))
    print('por modelo:', json.dumps(r['porModelo'], ensure_ascii=False))
    for f in r['fallos']:
        print('  ', f)
    print('SONDA APARCADOS OK')
