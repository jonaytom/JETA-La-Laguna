async def run(pg):
    result = await pg.evaluate(r'''() => {
      const d = __dbg, G = d.GRAPH, out = {};
      const distance = (route) => {
        let n = 0;
        for (let k = 2; k < route.length; k += 2) n += Math.hypot(route[k] - route[k-2], route[k+1] - route[k-1]);
        return n;
      };
      window.__manual = true;
      d.GAME.state = 'play';
      document.getElementById('menu').style.display = 'none';
      const drive = (e, at) => G.sample(e.i, 1, e.len * at, 0, {});
      const scenarios = [];
      for (const e of G.edges.filter(e => !e.fast && e.len > 90 && e.len < 310)) {
        const a = drive(e,.41), b = drive(e,.62);
        if (G.nearestEdge(a.x,a.z)?.e !== e.i || G.nearestEdge(b.x,b.z)?.e !== e.i) continue;
        const route = G.routeFrom(a.x,a.z,Math.atan2(-a.dx,-a.dz),b.x,b.z);
        scenarios.push(!!route && distance(route) < e.len * .22 + .5);
        if (scenarios.length === 12) break;
      }
      out.gpsSameStreet = scenarios.length === 12 && scenarios.every(Boolean);
      let checked = false;
      for (const e of G.edges.filter(e => e.fast && e.oneway && e.len > 90)) {
        const a = drive(e,.42), b = drive(e,.35);
        if (G.nearestEdge(a.x,a.z)?.e !== e.i || G.nearestEdge(b.x,b.z)?.e !== e.i) continue;
        const route = G.routeFrom(a.x,a.z,Math.atan2(-a.dx,-a.dz),b.x,b.z);
        checked = !route || distance(route) > e.len * .15;
        break;
      }
      out.gpsOneWay = checked;
      const town = d.AYTO.front;
      const plan = d.farmEscapePlan({x:-927,z:-305.5,h:1});
      const fromTown = (p) => Math.hypot(p.at(-2) - town[0], p.at(-1) - town[1]);
      out.farm = plan && { drive: Math.round(plan.P.tot), carDistance: Math.round(fromTown(plan.P.pts)),
        footDistance: Math.round(fromTown(plan.walk)), walk: Math.round(distance(plan.walk)) };
      if (plan) {
        const samples = [];
        const p = plan.P.pts;
        for (let k = p.length - 10; k < p.length - 2; k += 2) {
          const ax=p[k], az=p[k+1], bx=p[k+2], bz=p[k+3];
          for (let i=0; i<10; i++) samples.push([ax+(bx-ax)*i/10,az+(bz-az)*i/10]);
        }
        out.lotParkedOnRoute = samples.filter(([x,z]) => d.PARKED.slots.some(s=>Math.hypot(x-s.x,z-s.z)<1.45)).length;
      }
      const colorSample = () => {
        let civil = 0, white = 0;
        const shades = new Set();
        for (let i = 0; i < 4000; i++) {
          const m = d.trafficModel('primary');
          if (d.isLivery(m)) continue;
          const tone = d.pickColor(m);
          shades.add(tone);
          civil++;
          white += tone === 0xf2f2f2;
        }
        return {shades:shades.size,white:white/civil};
      };
      out.moving = colorSample();
      const slots = d.PARKED.slots;
      out.parked = {models:new Set(slots.map(s=>s.type)).size, shades:new Set(slots.map(s=>s.color)).size,
        white:slots.filter(s=>s.color===0xf2f2f2).length/slots.length};
      // v1.4.42: in the shared load the player may be anywhere: back to the centre and let the traffic come out
      if (d.PLAYER.car) d.exitCar(); d.PLAYER.x = 0; d.PLAYER.z = 0; __step(240);
      const live = d.CARS.filter(c=>c.mode==='traffic' && c.model && !d.isLivery(c.model));
      out.liveTraffic = {cars:live.length, shades:new Set(live.map(c=>c.paint.color.getHex())).size,
        white:live.filter(c=>c.paint.color.getHex()===0xf2f2f2).length};
      const model = d.VMODELS.clever;
      const c = new d.Car(null,0x16a08d,d.PLAYER.x+4,d.PLAYER.z,0,model);
      d.enterCar(c);
      const far = d.modelGeometry(d.VMODELS[model.lod]);
      out.clever = c.wheels.length === 4 && c.paint.color.getHex()===0x16a08d && !!far.paint && !!far.tail &&
        document.getElementById('veh').textContent==='Clever OneTwo';
      d.exitCar();
      c.remove();
      d.giveWeapon(6,false);
      const w=d.WEAPON;
      const wanted=d.WANTED.level;
      Object.defineProperty(document,'pointerLockElement',{configurable:true,get:()=>document.body});
      const click = (type,button) => document.dispatchEvent(new MouseEvent(type,{button,bubbles:true}));
      click('mousedown',0);
      __step(1);
      const safe=w.ammo===6 && d.WANTED.level===wanted;
      w.training=true;
      click('mousedown',2);
      click('mousedown',0);
      __step(1);
      const aimed=w.ammo===5;
      click('mouseup',2);
      click('mousedown',0);
      __step(1);
      out.aim = safe && aimed && w.ammo===5;
      delete document.pointerLockElement;
      w.has=w.out=w.aiming=w.touchAim=w.want=false;
      const A=d.ARCADE;
      const press=(v)=>{A._press(v,true); A._step(1); A._press(v,false); A._step(1);};
      out.arcades={};
      for(const id of ['naves','bencomo','guanche']) {
        const key='prueba1427_'+id;
        A.open({id,key,where:'PRUEBA',price:0});
        A._step(30);press('vS');
        const game=A._game(), state=A._st();
        game.score=93217;game.over=true;
        A._step(1);
        const first=state.mode==='name';
        press('vU');press('vS');press('vS');press('vS');
        const saved=(window.GANG?.arcade||window.__ARC?.arcade)?.scores[key]?.filter(r=>r[0]==='BAA'&&r[1]===93217).length;
        const after=state.mode==='cont' && state.contT>9;
        press('vS');
        const restart=state.mode==='play'&&game.score===0;
        game.over=true;
        A._step(1);
        out.arcades[id]=first&&saved===1&&after&&restart&&state.mode==='cont';
        A.close();
        if (window.GANG?.arcade) delete window.GANG.arcade.scores[key];
      }
      return out;
    }''')
    mobile = await pg.context.browser.new_context(has_touch=True, is_mobile=True, viewport={'width': 740, 'height': 360})
    try:
        await mobile.add_init_script('window.__JETA_TEST = true')
        touch_page = await mobile.new_page()
        await touch_page.goto(pg.url)
        await touch_page.wait_for_function('window.__GAME_READY', timeout=90000)
        result['touchAim'] = await touch_page.evaluate('''() => {
            const d=__dbg, w=d.WEAPON;
            window.__manual=true;
            d.GAME.state='play';
            document.getElementById('menu').style.display='none';
            d.giveWeapon(6, true);
            const tap = id => {
              const button = document.getElementById(id);
              button.dispatchEvent(new PointerEvent('pointerdown',{pointerId:1,pointerType:'touch',bubbles:true}));
            };
            tap('tbD'); __step(1);
            const safe=w.ammo===6;
            tap('tbA'); tap('tbD'); __step(1);
            return document.body.classList.contains('touchmode') && safe && w.ammo===5;
        }''')
    finally:
        await mobile.close()
    print(result)
    scenario = result['farm']
    ok = (
        result['gpsSameStreet'] and result['gpsOneWay'] and scenario and scenario['carDistance'] < 190
        and scenario['footDistance'] < 160 and scenario['walk'] > 50 and scenario['drive'] < 1900
        and result['moving']['shades'] == 21 and result['moving']['white'] < .075
        and result['parked']['shades'] == 21 and result['parked']['white'] < .075
        and result['liveTraffic']['cars'] > 6 and result['liveTraffic']['shades'] > 4
        and result['lotParkedOnRoute'] == 0 and result['clever'] and result['aim'] and result['touchAim']
        and all(result['arcades'].values())
    )
    print('PRUEBA 1427', 'OK' if ok else 'FALLA')
