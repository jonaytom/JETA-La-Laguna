async def run(pg):
    await pg.evaluate("""() => {
      document.getElementById('menu').style.display='none';
      window.__manual=true;
      __dbg.GAME.state='play';
    }""")
    ok=True
    initial=pg.viewport_size
    touch=await pg.evaluate("document.body.classList.contains('touchmode')")
    for width,height,mobile in [(1280,720,False),(740,360,True)]:
        await pg.set_viewport_size({'width':width,'height':height})
        await pg.evaluate("(m)=>document.body.classList.toggle('touchmode',m)",mobile)
        results=await pg.evaluate("""() => {
          const d=__dbg, p=d.PLAYER, el=id=>document.getElementById(id);
          const models={piki:'basic', vivita:'work', carlota:'street', cartabon:'trail', tipoe:'luxury', fierilla:'sport'};
          return Object.entries(models).map(([id, face])=>{
            const c=new d.Car(null,0x3060c0,p.x+2.5,p.z,0,d.VMODELS[id]);
            d.enterCar(c); __step(2);
            const dial=el('speed').getBoundingClientRect(), weapon=el('weap').getBoundingClientRect();
            const label=el('veh').getBoundingClientRect();
            const separate = r=>r.right<=weapon.left || r.left>=weapon.right || r.bottom<=weapon.top || r.top>=weapon.bottom;
            const result={id, ok:el('speed').dataset.face===face && dial.width>0 &&
              el('veh').textContent===c.T.name && label.bottom<=innerHeight && separate(dial) && separate(label)};
            d.exitCar(); c.remove();
            return result;
          });
        }""")
        print(width,height,mobile,results)
        ok=ok and all(result['ok'] for result in results)
    await pg.set_viewport_size(initial)
    await pg.evaluate("(m)=>document.body.classList.toggle('touchmode',m)",touch)
    await pg.evaluate("__dbg.exitCar(); __step(45)")
    hidden=await pg.locator('#speed').is_hidden()
    pause=await pg.evaluate("""() => {
      const a=__dbg.ARCADE;
      a.open({id:'naves',key:'prueba_1424',where:'PRUEBA',price:1});
      const test=window.__JETA_TEST;
      try {
        window.__JETA_TEST=false;
        document.dispatchEvent(new Event('pointerlockchange'));
        const started=!a._pz().on;
        window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyP'}));
        const paused=a._pz().on;
        window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyP'}));
        return started && paused && !a._pz().on;
      } finally {window.__JETA_TEST=test; a.close();}
    }""")
    print('PRUEBA 1424','OK' if ok and hidden and pause else 'FALLA')
