# v1.4.19 (Jonay, 17-nov): la policía (3 modelos propios) y la ambulancia propia no se tiñen (chapa blanca, sus vinilos
# intactos) y sus luces del techo son las del modelo (se encienden con la sirena); un coche propio normal sí se tiñe;
# los pick-ups y la Fita Triplon sustituyen a los viejos (v1.4.42: sus ids viejos siguen respondiendo, pero no cuentan al elegir coche).
import json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, out = {};
      for (const id of ['policia', 'policia2', 'policia3', 'ambulancia', 'clip', 'hilos']) {
        const c = new d.Car(null, 0xff2200, 0, 0, 0, d.VMODELS[id]);
        out[id] = { paint: c.paint ? c.paint.color.getHex() : null, bar: c.bar ? c.bar.children.map((m) => m.geometry.attributes.position.count) : null,
          tl: c.tl.length };
        c.siren = true; c.update && 0; c.remove(); }
      const w = (id) => d.VMODELS[id] ? d.VMODELS[id].w : null;
      out.pesos = { hilos: w('hilos'), navarra: w('navarra'), triplon: w('triplon') };
      out.viejosEnLista = ['hilux', 'navara', 'doblo'].filter((id) => Object.keys(d.VMODELS).includes(id));
      const seen = new Set(); for (let i = 0; i < 40; i++) { const c = new d.Car('police', 0xf5f7fa, 0, 0, 0); seen.add(c.model && c.model.id); c.remove(); }
      out.patrullas = [...seen];
      return JSON.stringify(out); }"""))
    print(r)
    ok = True
    for k in ('policia', 'policia2', 'policia3', 'ambulancia'):
        v = r[k]; good = v['paint'] in (0xf6f6f4, None) and v['bar'] and len(v['bar']) == 2 and min(v['bar']) > 0
        print(k, 'OK' if good else 'FALLA'); ok = ok and good
    good = r['clip']['paint'] == 0xff2200 and r['hilos']['paint'] == 0xff2200 and not r['clip']['bar']
    print('COCHES_NORMALES_SE_TINEN', 'OK' if good else 'FALLA'); ok = ok and good
    p = r['pesos']; good = r['viejosEnLista'] == [] and p['hilos'] > 0 and p['navarra'] > 0 and p['triplon'] > 0
    print('VIEJOS_SUSTITUIDOS', 'OK' if good else 'FALLA'); ok = ok and good
    good = len(set(r['patrullas']) & {'policia', 'policia2', 'policia3'}) >= 2
    print('VARIAS_PATRULLAS', 'OK' if good else 'FALLA'); ok = ok and good
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 1419', 'OK' if ok else 'FALLA')
