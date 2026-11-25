# v1.4.48: guarda la planta final de cada edificio del juego (BUILD, después de todos los recortes) en
# shots/plantas_finales.json, y la de los datos de partida (DATA.B tal como llega del mapa + Catastro añadido), para
# compararlas con el Catastro (tools/catastro_vs_juego.py)
import json
async def run(pg):
    r = await pg.evaluate("""() => { const D=__dbg; const r1=(v)=>Math.round(v*10)/10;
      return JSON.stringify({ juego: D.BUILD.map(b => b.pts.map(p => [r1(p[0]), r1(p[1])])),
        datos: D.DATA.B.map(b => (b[6]||[]).map(r1)) }); }""")
    open('shots/plantas_finales.json', 'w', encoding='utf-8').write(r)
    d = json.loads(r)
    print('PLANTAS', 'juego', len(d['juego']), 'datos', len(d['datos']))
