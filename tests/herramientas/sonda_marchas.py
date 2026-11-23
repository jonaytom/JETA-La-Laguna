# v1.4.45: caja automática y motor por tipo (10e_motor.js): acelera desde parado un utilitario, un deportivo, una guagua y
# el eléctrico, y apunta cada medio segundo la velocidad, la marcha y las revoluciones (lo que se ve en el velocímetro).
import json
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(2);})()")
    out = json.loads(await pg.evaluate("""() => { const d=__dbg, P=d.PLAYER, res={};
      const pick = (f) => Object.values(d.VMODELS).find(f);
      const cars = { utilitario: pick(m=>m.phys==='compact' && m.w>0), deportivo: pick(m=>m.phys==='sport' && m.w>0), guagua: d.VMODELS.guagua || pick(m=>m.phys==='truck'), electrico: pick(m=>/newton/i.test(m.id+' '+m.name)) };
      for (const [k,M] of Object.entries(cars)) { if (!M) { res[k]='sin modelo'; continue; }
        if (P.car) { const c=P.car; d.exitCar(); c.remove(); }
        const x=1500, z=2900; Object.assign(P,{x,z,y:d.heightAt(x,z)+.17});
        const c=new d.Car(null,0x3366aa,x,z,0,M); d.enterCar(c); __step(5);
        const log=[]; for (let i=0;i<16;i++) { __step(15,1/30,['KeyW']); d.ENGINE.update(0.5, P.car, 0); const E=d.ENGINE.state; log.push([Math.round(Math.abs(P.car.fwdV)*3.6), E.label, Math.round(E.rpm)]); }
        res[k]={modelo:M.name, perfil:d.ENGINE.profileOf(P.car).kind, marchas:log}; }
      return JSON.stringify(res); }"""))
    for k, v in out.items():
        print(k, json.dumps(v, ensure_ascii=False))
    print('SONDA MARCHAS OK')
