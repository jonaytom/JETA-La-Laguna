# v1.4.21 (Jonay, 17-nov): camión de la basura y guagua propios: ya no queda ningún modelo de Kenney; la guagua en
# verde TITSA y la basura blanca (sin teñir); las guaguas del tráfico y de las misiones usan el modelo propio.
import json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, V = d.VMODELS, out = {};
      const b = new d.Car('bus', null, 0, 0, 0); out.bus = { id: b.model && b.model.id, type: b.type, paint: b.paint ? b.paint.color.getHex() : null, L: b.T.L }; b.remove();
      const g = new d.Car(null, 0xff2200, 0, 0, 0, V.basura); out.basura = g.paint ? g.paint.color.getHex() : null; g.remove();
      out.kenney = Object.values(V).filter((m) => m.phys !== 'moto' && !m.lod && !/L$/.test(m.id)).map((m) => m.id);
      return JSON.stringify(out); }"""))
    print(r)
    ok = True
    def chk(name, good):
        nonlocal ok; print(name, 'OK' if good else 'FALLA'); ok = ok and good
    chk('GUAGUA_PROPIA', r['bus']['id'] == 'guagua' and r['bus']['type'] == 'bus' and r['bus']['paint'] == 0x1f8a4c and r['bus']['L'] > 10)
    chk('BASURA_BLANCA', r['basura'] == 0xf6f6f4)
    chk('SIN_KENNEY', r['kenney'] == [])
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 1421', 'OK' if ok else 'FALLA')
