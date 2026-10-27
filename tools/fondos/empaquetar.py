# v0.99: packs the drawn backgrounds (tools/fondos/dibujo.py → fondos.pkl) for the games: src/09jw_fondos_data.js with
# FONDOS_DATA = { zone: { g, extras, layers: [{ src, speed, tile, sky, drift }] } }. g = the row of the drawing where the
# game's floor starts (the drawing is placed so that row meets the top of the floor strip).
# Use: python3 tools/fondos/empaquetar.py <fondos.pkl> src/09jw_fondos_data.js
import sys, pickle, io, base64, json
D = pickle.load(open(sys.argv[1], 'rb'))
G = {'taoro': 96, 'anaga': 90, 'barranco': 92, 'gigantes': 93, 'malpais': 90, 'canadas': 100, 'echeyde': 94, 'anaza': 86}
out = {}
for k, v in D.items():
    L = []
    for l in v['layers']:
        b = io.BytesIO(); l['img'].save(b, 'PNG', optimize=True)
        e = {'src': 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode(), 'speed': l.get('speed', 0)}
        if l.get('sky'): e['sky'] = 1
        if l.get('tile'): e['tile'] = 1
        if l.get('drift'): e['drift'] = l['drift']
        L.append(e)
    out[k] = {'g': G[k], 'extras': v['extras'], 'layers': L}
js = ('// ============ FONDOS_DATA (v0.99): the backgrounds of Guanche Guarriors and Bencomo, drawn from Jonay\'s photos of each\n'
      '// place (tools/fondos/dibujo.py, packed by tools/fondos/empaquetar.py; do not edit by hand)\n'
      'const FONDOS_DATA = ' + json.dumps(out, separators=(',', ':')).replace('/', '\\/') + ';\n')   # (every «/» as «\/», the same in a JS string: no «//» for tools/comentarios_que_comen.py)
open(sys.argv[2], 'w').write(js); print(len(js) // 1024, 'KB')
