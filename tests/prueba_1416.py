# v1.4.16 (Jonay, 16/17-nov): 1) El Blanco aparece donde se llega andando en línea recta desde la salida (antes podía
# quedar detrás de un muro); 2) las misiones empiezan en su sitio y sus recorridos (persecuciones, carreras, huidas) van
# hacia donde empieza la siguiente de la misma línea (routeToward): acaban en ella si está al alcance, y si no, más cerca;
# 3) los coches propios encienden sus propios pilotos (G.tail), sin las cajas.
import json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    ok = True
    b = json.loads(await pg.evaluate("() => JSON.stringify(__dbg.MISSIONS.blancoCheck())"))
    print('blanco', b)
    okb = bool(b) and b['walk'] and b['ring']
    print('BLANCO_ACCESIBLE', 'OK' if okb else 'FALLA'); ok = ok and okb
    r = json.loads(await pg.evaluate("() => JSON.stringify(__dbg.MISSIONS.routeCheck())"))
    alcance = [x for x in r if x['D'] <= 1650]
    lejos = [x for x in r if x['D'] > 1650]
    bien = [x for x in alcance if x['end'] is not None and x['end'] < 150]
    acerca = [x for x in lejos if x['end'] is not None and x['end'] < x['D'] - 500]
    print('recorridos', len(r), '· al alcance', len(alcance), 'acaban en la siguiente', len(bien), '· lejos', len(lejos), 'acaban más cerca', len(acerca))
    for x in [x for x in alcance if x not in bien][:8]: print('   no llega', x)
    for x in [x for x in lejos if x not in acerca][:8]: print('   no se acerca', x)
    okr = len(r) > 20 and len(bien) >= 0.85 * len(alcance) and len(acerca) >= 0.85 * len(lejos)
    print('RECORRIDOS_HACIA_LA_SIGUIENTE', 'OK' if okr else 'FALLA'); ok = ok and okr
    t = json.loads(await pg.evaluate("""() => { const d = __dbg; const out = {};
      for (const id of ['troceen', 'clip', 'torson', 'beluga', 'reventon']) { const c = new d.Car(null, 0x3366cc, 0, 0, 0, d.VMODELS[id]);
        out[id] = c.tl.map((m) => m.geometry.attributes.position.count); c.remove(); } return JSON.stringify(out); }"""))
    print('pilotos', t)
    okt = all(len(v) == 1 and v[0] > 30 for v in t.values())
    print('PILOTOS_PROPIOS', 'OK' if okt else 'FALLA'); ok = ok and okt
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 1416', 'OK' if ok else 'FALLA')
