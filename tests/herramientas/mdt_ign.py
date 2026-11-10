# MDT del IGN para los barrancos (v1.3.2): baja el modelo digital del terreno de 5 m del Instituto Geográfico Nacional
# (servicio WCS INSPIRE de elevaciones; licencia CC BY 4.0: «© Instituto Geográfico Nacional») para la zona del juego.
# Uso (en una lista de pruebas; no necesita el juego, pero va por el mismo canal):
#   herramientas/mdt_ign.py capacidades      → qué capas y formatos ofrece el servicio (shots/mdt_capacidades.txt)
#   herramientas/mdt_ign.py describir <id>   → la capa: sistema de coordenadas y extensión (shots/mdt_<id>.txt)
#   herramientas/mdt_ign.py bajar            → la zona del juego en 3 × 3 trozos ASCII (data/mdt/mdt_<fila>_<col>.asc);
#                                              se juntan y comparan en la nube (el PC no tiene numpy)
import sys, re, os, json, base64, math, urllib.request
URL = 'https://servicios.idee.es/wcs-inspire/mdt'
LAT0, LON0 = 28.4875, -16.3150
KX = math.cos(math.radians(LAT0)) * 111320
KZ = 110574
X0, X1, Z0, Z1 = -4820, 3600, -1820, 4420  # the game's heightmap and a margin


def get(q, n=60_000_000):
    req = urllib.request.Request(URL + '?' + q, headers={'User-Agent': 'Mozilla/5.0 (JETA La Laguna)'})
    with urllib.request.urlopen(req, timeout=300) as r:
        return r.read(n)


def asc(txt):
    import numpy as np
    lines = txt.splitlines()
    hd = {}
    k = 0
    while k < len(lines) and re.match(r'^[A-Za-z_]+\s', lines[k]) and len(lines[k].split()) == 2:
        a, b = lines[k].split()
        hd[a.lower()] = float(b)
        k += 1
    vals = np.array(' '.join(lines[k:]).split(), dtype=float).reshape(int(hd['nrows']), int(hd['ncols']))
    nd = hd.get('nodata_value')
    if nd is not None:
        vals[vals == nd] = np.nan
    return hd, vals


def hillshade(H, dx):
    import numpy as np
    gy, gx = np.gradient(H, dx)
    sl = np.pi / 2 - np.arctan(np.hypot(gx, gy) * 1.5)
    asp = np.arctan2(-gx, gy)
    az, alt = np.radians(315), np.radians(45)
    v = np.sin(alt) * np.sin(sl) + np.cos(alt) * np.cos(sl) * np.cos(az - asp)
    return (np.clip(v, 0, 1) * 255).astype('uint8')


def png(path, A):
    try:
        from PIL import Image
        Image.fromarray(A).save(path)
    except Exception as e:  # without PIL: a PGM image
        h, w = A.shape
        open(path.replace('.png', '.pgm'), 'wb').write(b'P5 %d %d 255\n' % (w, h) + A.tobytes())


async def run(pg):
    modo = sys.argv[2] if len(sys.argv) > 2 else 'capacidades'
    if modo == 'capacidades':
        t = get('service=WCS&request=GetCapabilities&version=2.0.1').decode('utf-8', 'replace')
        ids = re.findall(r'<wcs:CoverageId>([^<]+)</wcs:CoverageId>', t)
        fm = re.findall(r'<wcs:formatSupported>([^<]+)</wcs:formatSupported>', t)
        out = 'capas: ' + ', '.join(ids) + '\nformatos: ' + ', '.join(fm) + '\n'
        print(out)
        open('shots/mdt_capacidades.txt', 'w', encoding='utf-8').write(out + '\n' + t[:20000])
    elif modo == 'describir':
        cid = sys.argv[3]
        t = get('service=WCS&request=DescribeCoverage&version=2.0.1&coverageId=' + cid).decode('utf-8', 'replace')
        print(t[:3000])
        open('shots/mdt_%s.txt' % cid, 'w', encoding='utf-8').write(t)
    elif modo == 'bajar':
        # (v1.3.2: the PC has no numpy: here only the download; the tiles are joined and compared in the cloud)
        la_s, la_n = LAT0 - Z1 / KZ, LAT0 - Z0 / KZ
        lo_w, lo_e = LON0 + X0 / KX, LON0 + X1 / KX
        root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        d = os.path.join(root, 'data', 'mdt')
        os.makedirs(d, exist_ok=True)
        N = 3
        for i in range(N):  # south → north
            a0 = la_s + (la_n - la_s) * i / N
            a1 = la_s + (la_n - la_s) * (i + 1) / N
            for j in range(N):
                b0 = lo_w + (lo_e - lo_w) * j / N
                b1 = lo_w + (lo_e - lo_w) * (j + 1) / N
                f = os.path.join(d, 'mdt_%d_%d.asc' % (i, j))
                if not os.path.exists(f):
                    q = ('service=WCS&request=GetCoverage&version=2.0.1&coverageId=Elevacion4258_5&format=application/asc'
                         '&subset=Lat(%.6f,%.6f)&subset=Long(%.6f,%.6f)' % (a0, a1, b0, b1))
                    t = get(q)
                    # (the answer is multipart: a header, the ASCII grid, and the closing «--wcs»)
                    k = t.lower().find(b'ncols')
                    if k < 0:
                        raise RuntimeError('respuesta rara %d %d %r' % (i, j, t[:400]))
                    t = t[k:]
                    e = t.find(b'\r\n--wcs')
                    if e > 0:
                        t = t[:e]
                    open(f, 'wb').write(t)
                head = open(f, encoding='ascii', errors='replace').read(400).splitlines()[:6]
                print('trozo', i, j, os.path.getsize(f), 'bytes', ' | '.join(head))
    print('MDT OK')
