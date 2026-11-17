# v1.4.20 (Jonay, 17-nov): fuera los de Kenney (salvo la basura); camiones, furgones, grúa, bomberos y 3 taxis propios;
# taxis/bomberos/grúa con su librea fija; los ids viejos siguen respondiendo; pesos para ver todos los modelos circulando.
import json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, V = d.VMODELS, out = { col: {} };
      for (const id of ['taxi', 'taxi2', 'taxi3', 'bomberos', 'grua', 'policia', 'daily', 'daily2', 'canter', 'sprinter', 'clip']) {
        const c = new d.Car(null, 0xff2200, 0, 0, 0, V[id]);
        out.col[id] = { paint: c.paint ? c.paint.color.getHex() : null, bar: c.bar ? c.bar.children.length : 0 }; c.remove(); }
      out.alias = ['clio', 'transit', 'vito', 'corolla', 'polo', 'hilux'].map((k) => V[k] ? V[k].id : null);
      out.kenney = Object.values(V).filter((m) => m.phys !== 'moto' && !m.lod && !/L$/.test(m.id)).map((m) => m.id);
      const tm = typeof trafficModel === 'function' ? trafficModel : d.trafficModel;
      if (tm) { const n = {}; for (let i = 0; i < 6000; i++) { const m = tm('primary'); if (m) n[m.id] = (n[m.id] || 0) + 1; }
        out.nunca = Object.values(V).filter((m) => m.w > 0 && !n[m.id]).map((m) => m.id); out.vistos = Object.keys(n).length; }
      const t = new Set(); for (let i = 0; i < 60; i++) { const c = new d.Car('taxi', 0xffffff, 0, 0, 0); t.add(c.model && c.model.id); c.remove(); }
      out.taxis = [...t];
      return JSON.stringify(out); }"""))
    print(r)
    ok = True
    def chk(name, good):
        nonlocal ok; print(name, 'OK' if good else 'FALLA'); ok = ok and good
    c = r['col']
    chk('TAXIS_BLANCOS', all(c[k]['paint'] == 0xf6f6f4 for k in ('taxi', 'taxi2', 'taxi3', 'policia')))
    chk('BOMBEROS_ROJO_Y_LUCES', c['bomberos']['paint'] == 0xb3141c and c['bomberos']['bar'] == 2)
    chk('GRUA_AMARILLA', c['grua']['paint'] == 0xf2b21a)
    chk('CAMIONES_SE_TINEN', all(c[k]['paint'] == 0xff2200 for k in ('daily', 'daily2', 'canter', 'sprinter', 'clip')))
    chk('IDS_VIEJOS', r['alias'] == ['clip', 'traficc', 'vivita', 'carlota', 'helado', 'hilos'])
    chk('SOLO_BASURA_DE_KENNEY', r['kenney'] == ['basura'])
    chk('VARIOS_TAXIS', len(set(r['taxis']) & {'taxi', 'taxi2', 'taxi3'}) >= 2)
    if 'nunca' in r: chk('TODOS_SE_VEN_CIRCULANDO', not r['nunca'])
    else: print('(trafficModel no accesible: no se comprueba que salgan todos)')
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 1420', 'OK' if ok else 'FALLA')
