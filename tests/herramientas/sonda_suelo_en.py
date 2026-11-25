# v1.4.50: qué suelo encuentra un coche en unos puntos a una altura: terreno, asfalto dibujado (carSurfAt), tablero
# (deckAt) y los tableros cercanos de campos y plazas (DECKS con pitch/plaza). Uso: herramientas/sonda_suelo_en.py x z y [x z y …]
import sys, json
async def run(pg):
    a = [float(v) for v in sys.argv[2:]]
    for i in range(0, len(a) - 2, 3):
        x, z, y = a[i], a[i + 1], a[i + 2]
        r = await pg.evaluate("""([x,z,y]) => { const D=__dbg; const near=D.DECKS ? D.DECKS.filter(d=>(d.pitch||d.plaza) && d.bb && x>d.bb[0] && x<d.bb[1] && z>d.bb[2] && z<d.bb[3]).map(d=>[d.pitch?'campo':'plaza', d.pts.map(p=>p.map(v=>Math.round(v))), d.w]) : 'sin DECKS';
          return JSON.stringify({terreno:+D.heightAt(x,z).toFixed(2), asfalto: D.carSurfAt ? D.carSurfAt(x,z) : 'n/a', tablero:+D.deckAt(x,z,y).toFixed(2), terrazas: (window.__terrazas||[]).filter(t=>Math.hypot(t[0]-x,t[1]-z)<120), cerca: near}); }""", [x, z, y])
        print('SUELO', [x, z, y], r)
