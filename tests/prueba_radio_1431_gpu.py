async def check(pg):
    await pg.mouse.click(12, 100)
    tracks = {"gofio": set(), "aguere": set(), "mojo": set()}
    requested = set()
    pg.on("request", lambda request: requested.add(request.url) if "/radio/" in request.url else None)
    initial = await pg.evaluate("""() => {
      const d = __dbg, hud = document.getElementById('radioHud');
      document.getElementById('menu').style.display = 'none';
      const hiddenOnFoot = hud.hidden;
      const p = d.PLAYER;
      d.enterCar(new d.Car('compact', 0x553311, p.x + 2, p.z, 0));
      __step(3);
      return {hiddenOnFoot, inCar: !hud.hidden, station: document.getElementById('radioStation').textContent};
    }""")
    assert initial == {"hiddenOnFoot": True, "inCar": True, "station": "Gofio FM 90.1"}, initial

    async def check_station(station, count):
        order = []
        for index in range(count):
            try:
                await pg.wait_for_function("""() => {
                  const a = document.getElementById('radioAudio');
                  return a && !a.paused && a.currentTime > 0 && a.duration > 0;
                }""", timeout=8000)
            except Exception:
                print("Audio:", station, await pg.evaluate("""() => {
                  const a = document.getElementById('radioAudio');
                  return {title: document.getElementById('radioTrack').textContent,
                          url: a?.currentSrc, error: a?.error?.message,
                          active: navigator.userActivation.hasBeenActive};
                }"""), requested)
                raise
            result = await pg.evaluate("""() => ({
              title: document.getElementById('radioTrack').textContent,
              url: document.getElementById('radioAudio').currentSrc
            })""")
            assert result["title"] and f"/radio/{station}/" in result["url"], result
            tracks[station].add(result["url"])
            order.append(result["url"])
            if index < count - 1:
                await pg.evaluate("document.getElementById('radioAudio').dispatchEvent(new Event('ended'))")
        assert len(tracks[station]) == count, tracks
        return order

    gofio = await check_station("gofio", 7)
    assert requested == tracks["gofio"] and any(url.endswith("/empty-seat.mp3") for url in gofio)
    mouse = await pg.evaluate("""() => {
      const d = __dbg, canvas = d.renderer.domElement;
      const src = () => document.getElementById('radioAudio').src;
      const click = button => canvas.dispatchEvent(new MouseEvent('mousedown', {button, bubbles: true, cancelable: true}));
      const onEntry = src();
      const unlocked = click(0) && src() === onEntry;
      Object.defineProperty(document, 'pointerLockElement', {value: canvas, configurable: true});
      try {
        const leftConsumed = !click(0);
        const previous = src();
        const rightConsumed = !click(2);
        const next = src();
        d.CAM.dist = 5;
        window.dispatchEvent(new WheelEvent('wheel', {deltaY: 120}));
        __step(1);
        return {unlocked, leftConsumed, previous, rightConsumed, next, zoom: d.CAM.dist, afterWheel: src()};
      } finally {
        delete document.pointerLockElement;
      }
    }""")
    assert mouse == {"unlocked": True, "leftConsumed": True, "previous": gofio[-2],
                     "rightConsumed": True, "next": gofio[-1], "zoom": 5.5, "afterWheel": gofio[-1]}, mouse
    await pg.evaluate("document.getElementById('radioDisplay').style.maxWidth = '30px'")
    await pg.wait_for_function("document.getElementById('radioTrack').classList.contains('is-scrolling')", timeout=6000)
    await pg.locator("#radioNext").click(timeout=6000)
    await pg.wait_for_function("document.getElementById('radioStation').textContent === 'Radio Aguere 96.6'", timeout=6000)
    await check_station("aguere", 7)
    assert not any("/mojo/" in url for url in requested)
    await pg.evaluate("""() => {
      const slider = document.getElementById('mvol');
      slider.value = 0;
      slider.dispatchEvent(new Event('input'));
    }""")
    assert await pg.evaluate("document.getElementById('radioAudio').volume === 0")
    await pg.keyboard.down("q")
    await pg.evaluate("__step(2)")
    await pg.keyboard.up("q")
    await pg.wait_for_function("document.getElementById('radioStation').textContent === 'Mojo Picón 102.3'", timeout=6000)
    mojo = await check_station("mojo", 4)
    assert {url.rsplit("/", 1)[-1] for url in mojo} == {
        "brillo-puro.mp3", "luces-azules.mp3", "sin-piedad-en-el-radar.mp3", "llamada-a-deshora.mp3"
    }
    assert requested == set().union(*tracks.values())
    await pg.locator("#radioNext").click(timeout=6000)
    await pg.wait_for_function("document.getElementById('radioStation').textContent === 'Radio apagada'", timeout=6000)
    final = await pg.evaluate("""() => {
      const d = __dbg, hud = document.getElementById('radioHud');
      const track = document.getElementById('radioTrack');
      const emptyWhenOff = !track.textContent && !track.classList.contains('is-scrolling') && !document.getElementById('radioAudio');
      document.getElementById('radioDisplay').style.removeProperty('max-width');
      d.exitCar();
      __step(4);
      return {emptyWhenOff, hiddenAfterExit: hud.hidden};
    }""")
    print(initial, final, {name: len(urls) for name, urls in tracks.items()})
    assert all(final.values())
    print("RADIO HUD Y MP3 OK")



async def run(pg):
    try:
        await check(pg)
    except Exception as issue:
        print("FALLA", repr(issue))
