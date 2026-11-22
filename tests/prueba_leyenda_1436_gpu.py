from pathlib import Path

async def run(pg):
    original_viewport = pg.viewport_size
    await pg.set_viewport_size({"width": 1280, "height": 720})
    try:
        result = await pg.evaluate("""() => {
          document.getElementById('menu').style.display = 'none';
          const d = __dbg;
          const saved = d.MISSIONS.getState();
          const has = name => [...document.querySelectorAll('.map-key-item')].some(el => el.textContent.trim() === name);
          const open = () => { if (!d.BIGMAP.open) d.BIGMAP.toggle(); };
          const close = () => { if (d.BIGMAP.open) d.BIGMAP.toggle(); };
          try {
            d.MISSIONS.setState({...saved, story:0, side:0, sideOpen:false,
                                gang:{...saved.gang, jugueterias:false}});
            open();
            const toy = [...document.querySelectorAll('.map-key-item')].find(el => el.textContent.trim() === 'Juguetería');
            const categories = ['Tú','Destino GPS','Ruta GPS','Ruta de misión','Objetivo activo',
              'Trazado de misión','Controles de misión','Fugitivo','Policía','Maleante','Comida','Entrada',
              'Casa de El Blanco · Bencomo','Bar con GUFO','Inmobiliaria Pisos Chachi','Tu vivienda'];
            const legend = document.getElementById('bmLegend');
            const result = {
              startsOpen: legend.open,
              toyBeforeUnlock: !!toy && !d.AGUA.isOpen(),
              correctIcon: toy?.querySelector('img')?.src === window.__mapIconURL('toy'),
              categories: categories.every(has),
              history: has('Historia'),
              routeColors: [...document.querySelectorAll('[data-shape="line"]')].map(el => el.style.getPropertyValue('--key-color')).join() === '#e040fb,#f5b72e'
            };
            close();
            d.MISSIONS.setState({...saved, story:2, side:0, sideOpen:true,
                                gang:{...saved.gang, jugueterias:true}});
            open();
            result.toyAfterUnlock = has('Juguetería') && d.AGUA.isOpen() && d.AGUA.shops.length > 0;
            result.sideMission = has('El Canarión');
            return result;
          } finally {
            close();
            d.MISSIONS.setState(saved);
          }
        }""")
        assert all(result.values()), result
        await pg.evaluate("__dbg.BIGMAP.toggle()")
        await pg.screenshot(path=str(Path("shots") / "leyenda1436_pc.jpg"), type="jpeg", quality=90)
        await pg.evaluate("document.body.classList.add('touchmode'); document.body.classList.remove('gamepad'); __dbg.BIGMAP.toggle()")
        await pg.set_viewport_size({"width": 740, "height": 360})
        await pg.evaluate("__dbg.BIGMAP.toggle()")
        assert await pg.evaluate("__dbg.BIGMAP.open && !document.getElementById('bmLegend').open"), "El mapa móvil debe abrir con la leyenda plegada"
        assert await pg.locator("#bmTouchHelp").is_visible(), "La ayuda táctil debe estar visible"
        await pg.wait_for_function("!document.pointerLockElement", timeout=3000)
        await pg.locator("#bmLegendToggle").dispatch_event("pointerdown")
        await pg.wait_for_function("document.getElementById('bmLegend').open", timeout=3000)
        assert await pg.evaluate("document.getElementById('bmLegend').open"), "El rótulo Leyenda debe desplegar el panel"
        assert await pg.locator("#bmLeg").is_visible(), "La leyenda desplegada debe estar visible"
        await pg.screenshot(path=str(Path("shots") / "leyenda1436_movil.jpg"), type="jpeg", quality=90)
        result["touch"] = await pg.evaluate("""() => {
          const body = document.getElementById('bmLeg').getBoundingClientRect();
          const panel = document.getElementById('bmhelp').getBoundingClientRect();
          const close = document.getElementById('bmClose').getBoundingClientRect();
          return panel.bottom < innerHeight && panel.right < close.left && body.height <= innerHeight * .43;
        }""")
        assert result["touch"], result
        print(result)
        print("LEYENDA MAPA OK")
    except Exception as issue:
        print("FALLA", repr(issue))
    finally:
        await pg.evaluate("""() => {
          if (__dbg.BIGMAP.open) __dbg.BIGMAP.toggle();
          document.body.classList.remove('touchmode');
        }""")
        await pg.set_viewport_size(original_viewport)
