async def check(pg):
    result = await pg.evaluate("""() => {
      const d = __dbg, g = d.GAME;
      window.__manual = true;
      document.getElementById('menu').style.display = 'none';
      g.state = 'play';
      const pad = {index: 0, connected: true, mapping: 'standard', axes: [0,0,0,0],
                   buttons: Array.from({length: 17}, () => ({pressed:false,value:0}))};
      const old = Object.getOwnPropertyDescriptor(navigator, 'getGamepads');
      Object.defineProperty(navigator,'getGamepads',{configurable:true,value:()=>[pad]});
      function press(i, value = 1) { pad.buttons[i] = {pressed: value >= .5, value}; }
      function pulse(i, step = () => __step(1)) { press(i); step(); press(i,0); step(); }
      const checks = {};
      try {
        const p = d.PLAYER;
        while (d.MUSIC.station.name !== 'Gofio FM 90.1') d.MUSIC.next();
        d.giveWeapon(6);
        d.WEAPON.cd = 0;
        pulse(7);
        checks.requiresAim = d.WEAPON.ammo === 6;
        press(6); __step(1);
        checks.aims = d.WEAPON.aiming;
        pulse(7);
        checks.fires = d.WEAPON.ammo === 5;
        press(6,0); __step(1);
        checks.releasesAim = !d.WEAPON.aiming;

        const c = new d.Car('compact', 0x50874d, p.x+2, p.z, 0);
        d.enterCar(c); __step(2);
        checks.noWeaponWhileDriving = document.getElementById('weap').style.display === 'none';
        press(7,.7); press(6,.4); press(0); pad.axes[0] = .75; __step(1);
        checks.drives = c.ctl.thr === .7 && c.ctl.brk === .4 && c.ctl.steer === -.75 && c.ctl.hb === 1;
        press(7,0); press(6,0); press(0,0); pad.axes[0] = 0; __step(1);
        const audio = () => document.getElementById('radioAudio')?.src;
        const song = audio();
        pulse(15);
        checks.trackNext = !!song && !!audio() && audio() !== song;
        pulse(14);
        checks.trackPrevious = audio() === song;
        pulse(5);
        checks.station = d.MUSIC.station.name === 'Radio Aguere 96.6';
        pulse(3);
        checks.exitCar = !d.PLAYER.car;
        checks.weaponHudRestored = document.getElementById('weap').style.display === 'block';
        c.remove();

        pulse(8);
        checks.map = d.BIGMAP.open;
        const scale = d.BIGMAP.zoom;
        press(7); __step(2); press(7,0);
        checks.mapZoom = d.BIGMAP.zoom > scale;
        pulse(0);
        checks.waypoint = document.getElementById('bmCoords').textContent.includes('Destino');
        pulse(1);
        checks.closeMap = !d.BIGMAP.open;

        pulse(9);
        checks.pauses = g.state === 'pause';
        pulse(13);
        checks.selectsMenu = !!document.activeElement.closest('#pause');
        pulse(9);
        checks.resumes = g.state === 'play';
        pulse(12);
        checks.diary = d.DIARIO.open_;
        pulse(1);
        checks.closesDiary = !d.DIARIO.open_;

        const miniStep = () => d.updateMiniGamepad();
        for (const [key, sport] of [['basket', d.BASKET2D], ['football',d.FUTBOL2D]]) {
          sport.start({onDone:()=>{}});
          miniStep();
          const start = sport._st().phase;
          press(0); miniStep(); sport._step(4); press(0,0); miniStep();
          checks[key+'Starts'] = sport._st().phase !== start;
          pulse(9,miniStep);
          checks[key+'Pauses'] = sport._pz().on;
          pulse(9,miniStep);
          checks[key+'Resumes'] = !sport._pz().on;
          sport._abort();
          miniStep();
        }
        for (const id of ['naves','bencomo','guanche']) {
          d.ARCADE.open({id,key:'controls_'+id,where:'PRUEBA',price:0});
          miniStep();
          checks[id+'Label'] = d.miniKeyLabel('f_punch') === 'A' && d.miniKeyLabel('b_pass') === 'X';
          pulse(9,miniStep);
          checks[id+'Pauses'] = d.ARCADE._pz().on;
          pulse(9,miniStep);
          pulse(3,miniStep);
          checks[id+'Exits'] = g.state === 'play';
          if (g.state === 'arcade') d.ARCADE.close();
          miniStep();
        }
        return checks;
      } finally {
        if (old) Object.defineProperty(navigator,'getGamepads',old);
        else delete navigator.getGamepads;
        while (d.MUSIC.station.name !== 'Gofio FM 90.1') d.MUSIC.next();
        __step(2);
      }
    }""")
    print("Xbox", result)
    assert all(result.values()), [name for name,ok in result.items() if not ok]

    context = await pg.context.browser.new_context(has_touch=True, is_mobile=True, viewport={"width": 740, "height": 360})
    mobile = await context.new_page()
    try:
        await mobile.add_init_script("window.__JETA_TEST = true;")
        await mobile.goto("http://localhost:8765/test.html?q=movil")
        await mobile.wait_for_function("window.__GAME_READY", timeout=95000)
        await mobile.evaluate("""() => {
          const d = __dbg;
          window.__manual = true;
          d.GAME.state = 'play';
          document.getElementById('menu').style.display = 'none';
        }""")
        await mobile.locator("#tbUse").wait_for(state="visible")
        await mobile.evaluate("__dbg.giveWeapon(6)")
        await mobile.locator("#tbD").wait_for(state="visible")
        await mobile.locator("#tbDi").dispatch_event("pointerdown")
        assert await mobile.evaluate("__dbg.DIARIO.open_")
        await mobile.evaluate("__dbg.DIARIO.close(); __dbg.CONTROLS.open()")
        assert "USAR" in await mobile.locator("#ctlBody").inner_text()
        await mobile.locator("#ctlClose").click()
        await mobile.evaluate("""() => {
          const d = __dbg, p = d.PLAYER;
          d.enterCar(new d.Car('compact',0x557744,p.x+2,p.z,0));
          __step(2);
        }""")
        await mobile.locator("#radioPrevTrack").wait_for(state="visible")
        await mobile.locator("#tbD").wait_for(state="hidden")
        await mobile.locator("#tbUse").wait_for(state="hidden")
        assert not await mobile.locator("#weap").is_visible()
        await mobile.evaluate("__dbg.exitCar(); __step(2)")
        assert await mobile.locator("#weap").is_visible()
        await mobile.evaluate("""() => {
          __dbg.ARCADE.open({id:'naves',key:'controls_touch',where:'PRUEBA',price:0});
        }""")
        await mobile.locator("#mpExit").wait_for(state="visible")
        await mobile.locator("#mpExit").dispatch_event("pointerdown")
        assert await mobile.evaluate("__dbg.GAME.state === 'play'")
    finally:
        await context.close()
    print("CONTROLES XBOX Y MÓVIL OK")



async def run(pg):
    try:
        await check(pg)
    except Exception as issue:
        print("FALLA", repr(issue))
