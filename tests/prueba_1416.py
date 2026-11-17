# v1.4.16 (Jonay, 16/17-nov): 1) El Blanco aparece donde se llega andando en línea recta desde la salida (antes podía
# quedar detrás de un muro); 2) misiones cerca: si la siguiente misión de una línea empieza a más de 1 km de donde acabó
# la anterior, su personaje queda contigo a ~400 m, en una acera a la que se llega andando (MISSIONS.meetCheck); 3) los
# coches propios encienden sus propios pilotos (G.tail), sin las cajas.
import json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    ok = True
    b = json.loads(await pg.evaluate("() => JSON.stringify(__dbg.MISSIONS.blancoCheck())"))
    print('blanco', b)
    okb = bool(b) and b['walk'] and b['ring']
    print('BLANCO_ACCESIBLE', 'OK' if okb else 'FALLA'); ok = ok and okb
    for e in ([-1600, -700], [700, 1300], [-2500, -300], [1200, -400]):
        r = json.loads(await pg.evaluate("(e) => JSON.stringify(__dbg.MISSIONS.meetCheck(e))", e))
        meets = [m for m in r if m['meet']]
        far = [m for m in r if not m['meet'] and not m['fixed'] and m['fromEnd'] is not None and m['fromEnd'] > 1000]
        bad = [m for m in meets if m['inside'] or m['road'] or (not m['walk'] and m['walkStart']) or m['fromEnd'] > 1000]
        print('fin', e, 'misiones', len(r), 'quedan contigo', len(meets), 'lejos sin quedar', [(m['line'], m['title'], m['fromEnd']) for m in far][:8])
        for m in bad[:6]: print('   MAL', m)
        if bad: ok = False
    t = json.loads(await pg.evaluate("""() => { const d = __dbg; const out = {};
      for (const id of ['troceen', 'clip', 'torson', 'beluga', 'reventon']) { const c = new d.Car(null, 0x3366cc, 0, 0, 0, d.VMODELS[id]);
        out[id] = c.tl.map((m) => m.geometry.attributes.position.count); c.remove(); } return JSON.stringify(out); }"""))
    print('pilotos', t)
    okt = all(len(v) == 1 and v[0] > 30 for v in t.values())
    print('PILOTOS_PROPIOS', 'OK' if okt else 'FALLA'); ok = ok and okt
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 1416', 'OK' if ok else 'FALLA')
