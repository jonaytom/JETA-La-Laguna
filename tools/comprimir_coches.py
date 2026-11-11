# Comprime los modelos de coche de data/kenney_cars.json (v1.4.9): por modelo, todos los datos binarios de sus
# piezas (posiciones, normales, colores, índices) van juntos en un DEFLATE en base64 ('z'); cada pieza guarda cuántos
# bytes son suyos (np, nn, nc, ni) y 'zl' el total. El juego lo abre con inflateRaw() en src/06b_vmodels.js.
# Los modelos ya comprimidos se dejan como están. Uso: python tools/comprimir_coches.py [ruta]
import base64, json, sys, zlib
def comprimir(m):
    if 'z' in m: return m
    blob = bytearray(); parts = []
    for p in m['parts']:
        q = {k: v for k, v in p.items() if k not in 'pnci'}
        for f in 'pnci':
            b = base64.b64decode(p[f]); q['n' + f] = len(b); blob += b
        parts.append(q)
    c = zlib.compressobj(9, zlib.DEFLATED, -15)
    z = c.compress(bytes(blob)) + c.flush()
    out = {k: v for k, v in m.items() if k != 'parts'}
    out.update(parts=parts, zl=len(blob), z=base64.b64encode(z).decode())
    return out
if __name__ == '__main__':
    ruta = sys.argv[1] if len(sys.argv) > 1 else 'data/kenney_cars.json'
    D = json.load(open(ruta, encoding='utf-8'))
    antes = len(json.dumps(D))
    D['m'] = {k: comprimir(v) for k, v in D['m'].items()}
    json.dump(D, open(ruta, 'w', encoding='utf-8'), separators=(',', ':'))
    print('coches comprimidos: %.2f MB -> %.2f MB' % (antes / 1e6, len(json.dumps(D, separators=(',', ':'))) / 1e6))
