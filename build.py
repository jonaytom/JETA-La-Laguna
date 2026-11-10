import json,re,glob,sys,os,shutil
ROOT=os.path.dirname(os.path.abspath(__file__)); os.chdir(ROOT)
tpl=open('template.html',encoding='utf-8').read()
# v0.66: a «//» note that swallowed code behind it on the same line breaks the game silently: stop the build
sys.path.insert(0, os.path.join(ROOT, 'tools')); from comentarios_que_comen import revisar as _rev
_m = _rev()
if _m: print('FALLA EL BUILD: comentario «//» que se traga código (cámbialo por /* … */ o parte la línea):\n' + '\n'.join(_m)); sys.exit(1)
# v0.77 (auditoría P2.5): lint without Node — names used but declared nowhere, and top-level names declared twice
import io, contextlib; import lint_js as _lint
_buf = io.StringIO()
with contextlib.redirect_stdout(_buf): _lr = _lint.main()
_lt = _buf.getvalue(); print(_lt.splitlines()[0] if _lt else 'LINT: ?')
if _lr or not _lt.startswith('LINT: 0 nombres sin declarar'): print('FALLA EL BUILD por el lint (tools/lint_js.py):\n' + _lt); sys.exit(1)
js='\n'.join(open(f,encoding='utf-8').read() for f in sorted(glob.glob('src/*.js')))
D=json.load(open('data/data.json',encoding='utf-8'))
SH=[]
for line in open('data/shops.txt',encoding='utf-8'):
    line=line.strip()
    if not line: continue
    x,z,c,n=line.split('|',3); SH.append([int(x),int(z),c,n])
BRAND={'Alcampo':'Alcampito','IKEA':'Ikeña','Makro':'Micro Mayorista','Decathlon':'Decatlón Chacho','Lidl':'Lidlito','Carrefour':'Cruce Cuatro','MediaMarkt':'Medio Mercado','Primark':'Primarcas','Mercadona':'Merca Mona','HiperDino':'Híper Lagartón','SuperDino':'Súper Lagarto','ALDI':'Aldea','Aldi':'Aldea',"McDonald's":'McGofio','KFC':'Pollo Frito Kanario','Telepizza':'Telepisa','Burger King':'Burguer Mencey','BBVA':'Banco Bebeuvea','Caixabank':'Cajachacho','Banco Santander':'Banco Sancocho','Bankinter':'Bancointerminable','Cajamar':'Caja Mar de Nubes','Banco Sabadell':'Banco Sábado','Banca March':'Banca Marcha','Shell':'Concha Gasolinera','Disa':'Dice Gasolinera','BP':'BePe Gasolinera','Repsol':'Repesol','Tgas':'Tegases','Cepsa':'Cepsita','PCAN':'Pecán Gasolinera','Spar':'Espárrago Market','Covirán':'Covirao','Supercor':'Supercorre','Conforama':'Confortable Muebles','Kiabi':'Kiabichacho','Toys R Us':'Juguetes Somos','Leroy Merlin':'Rey Merlón','Starbucks':'Barraquito Stars','Vodafone':'Bocafón','Orange':'Naranjita Móvil','Mango':'Mango Bajito','Bershka':'Berza','Stradivarius':'Estradi Variado','Expert':'Experto en Cacharros','Granier':'Granjero Pan','ONCE':'DOCE Cupones','GAES':'Oye Tú Audífonos','Multiópticas':'Multigafas','Optica 2000':'Óptica 3000','Halcón Viajes':'Guirre Viajes','Folder':'Carpetón','IQOS':'Ikós','Kiwoko':'Kiwicoco','Worten':'Wortensia','Bricomart':'Bricomarte','Dia':'Noche Súper','Eroski':'Erosquito','Hiunday':'Coches Jandía','Mitsubishi':'Coches Mojo Bichi','Seat':'Coches Butaca','Chevrolet':'Coches Chivato','Mercedes-Benz':'Coches Mercadillo','Rover':'Coches Ruedo','Suzuki':'Motos Susurro'}
GEN={'S':['Súper Ande Chano','Súper El Tenderete','Autoservicio La Papa'],'R':['Casa Comidas El Mojo','Restaurante Papas Arrugadas','Tasca El Gofio','Guachinche Ande Juan'],'C':['Café El Barraquito','Cafetería La Guagua','Café Fuerte Calor','Café El Mago','Churrería El Tolete'],'B':['Bar El Tenderete','Bar Chacho','Bar La Parranda','Bar El Timple'],'F':['Bocatas El Tolete','Pizzería Mamma Mía','Kebab El Guanche'],'K':['Banco Gofio','Caja del Roque'],'P':['Farmacia'],'G':['Gasolinera Ande Pepe'],'H':['Pensión El Guanche','Hotel El Drago'],'V':['Moda Chacho','Boutique Tolete','Zapatería Cholas'],'O':['Óptica Veo Veo'],'L':['Librería El Magua'],'D':['Dulcería Truchas','Panadería El Millo'],'T':['Móviles Fuerte Cobertura','Informática El Cambullón'],'E':['Peluquería Muchacho','Barbería El Mago','Estética Mi Niña'],'J':['Joyería El Relumbrón'],'M':['Bazar Ande Pepe','Tienda El Cambullón','Todo a Un Duro','Ferretería El Tornillo Canario','Taller Mecánico Chacho']}
for line in open('data/shops_new.txt',encoding='utf-8'):
    line=line.strip()
    if not line: continue
    x,z,c,n=line.split('|',3); SH.append([int(x),int(z),c,n])
import math
def warp_pt(x, z):
    for cx, cz, Rr, Rn, K in D.get('W', []):
        dx, dz = x - cx, z - cz; d = math.hypot(dx, dz)
        if d >= Rr + K or d < 1e-6: continue
        nd = d * Rn / Rr if d <= Rr else Rn + (d - Rr) * (Rr + K - Rn) / K
        x, z = cx + dx / d * nd, cz + dz / d * nd
    return round(x), round(z)
for e in SH: e[0], e[1] = warp_pt(e[0], e[1])
seen=set(); SH2=[]
for e in SH:
    k=(round(e[0]/3),round(e[1]/3))
    if k in seen: continue
    seen.add(k); SH2.append(e)
D['SH']=SH2
D['BRAND']=BRAND
D['KV']=json.load(open('data/kenney_cars.json',encoding='utf-8'))['m']
# v1.0.4: buildings of the Catastro missing in the OSM, and the walls and fences of the OSM (tools/catastro_add.py)
D['CB']=json.load(open('data/catastro_add.json',encoding='utf-8')) if os.path.exists('data/catastro_add.json') else []
D['BW']=json.load(open('data/barreras_juego.json',encoding='utf-8')) if os.path.exists('data/barreras_juego.json') else []
# v1.1.1: lanes and parking lanes of each street from the OSM (tools/carriles.py): {index of DATA.R: [lanes, left, right]}
D['LN']=json.load(open('data/carriles.json',encoding='utf-8')) if os.path.exists('data/carriles.json') else {}
# v1.1.4: Mapillary's no-parking / no-stopping signs on each street (tools/mapillary.py): {index of DATA.R: [[x, z, side], ...]} (side 1 left, -1 right)
D['MP']={k:[[round(p[0],1),round(p[1],1),p[2]] for p in v.get('nop',[])] for k,v in (json.load(open('data/mapillary_aparca.json',encoding='utf-8')) if os.path.exists('data/mapillary_aparca.json') else {}).items() if v.get('nop')}
D['HUM']=json.load(open('data/chars.json',encoding='utf-8'))
# v1.3.0: the trees made in Blender (tools/blender/arboles_blender.py + exportar_arboles.py): trunk, crown and far crown per kind
D['ARB']=json.load(open('data/arboles.json',encoding='utf-8')) if os.path.exists('data/arboles.json') else None
# v1.3.3: barrancos and slopes from the IGN 5 m DEM where the game's 16 m relief was furthest off (data/terreno_mdt.json:
# cell indexes of the heightmap and the change in decimetres; made with tests/herramientas/mdt_zonas.py from data/mdt/)
if os.path.exists('data/terreno_mdt.json'):
    import base64 as _b64, array as _arr
    _T=json.load(open('data/terreno_mdt.json',encoding='utf-8'))
    _h=_arr.array('h'); _h.frombytes(_b64.b64decode(D['H']['d']))
    for _i,_d in zip(_T['i'],_T['d']): _h[_i]=max(-32768,min(32767,_h[_i]+_d))
    D['H']['d']=_b64.b64encode(_h.tobytes()).decode()
    print('terreno: MDT del IGN en', len(_T['i']), 'celdas')
import base64
D['PLASTER']=['data:image/jpeg;base64,'+base64.b64encode(open(f,'rb').read()).decode() for f in ['assets/textures/plaster_det.jpg','assets/textures/plaster_n1.jpg','assets/textures/plaster_n2.jpg']]
data=json.dumps(D,separators=(',',':'),ensure_ascii=False).replace('</','<\\/')
# fonts inside the HTML (audit P2.3: the game works offline) — latin subsets in data/fonts.json
FONTS=''
if os.path.exists('data/fonts.json'):
    FONTS='<style>'+''.join("@font-face{font-family:'%s';font-style:normal;font-weight:%s;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2');unicode-range:%s}"%(f['fam'],f['w'],f['b64'],f['ur']) for f in json.load(open('data/fonts.json')))+'</style>'
GF_RE=re.compile(r'<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="https://fonts.googleapis.com/css2[^>]*>\n')
def make(three, artifact):
    s=tpl.replace('__VERSION__',open('VERSION').read().strip())
    if FONTS: s=GF_RE.sub(lambda m: FONTS+'\n', s, count=1)
    s=s.replace('__DATA__',data).replace('__THREE__','<script type="importmap">{"imports":{"three":"%s"}}</script>'%three).replace('__GAME__',js)
    if artifact:
        s=s.replace('<!doctype html>\n','').replace('<html lang="es">\n','').replace('<head>\n','',1).replace('</head>\n<body>\n','').replace('</body>\n</html>\n','')
        s=s.replace('<meta charset="utf-8">\n','').replace('<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">\n','')
    return s
os.makedirs('dist',exist_ok=True); shutil.copy('data/three.module.min.js','dist/three.module.min.js'); open('dist/test.html','w',encoding='utf-8').write(make('./three.module.min.js',False))
open('dist/gta-la-laguna.html','w',encoding='utf-8').write(make('https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.min.js',True))
# the copy for the PC carries Three.js inside (data: URL in the import map) so it runs without internet
THREE_DATA='data:text/javascript;base64,'+base64.b64encode(open('data/three.module.min.js','rb').read()).decode()
open('dist/JETA La Laguna.html','w',encoding='utf-8').write(make(THREE_DATA,False))
# v1.0.1 (Jonay: «hagamos el juego en carpeta, con el index llamado desde un lanzador con el icono, a pantalla completa»):
# dist/juego/ = index.html + js/juego.js (with a source map: errors say src/<file>.js and its line) + datos/mapa.js +
# lib/three + lanzador/ (servidor PowerShell, acceso directo con icono). The worker's «zip_testers» zips it.
def make_folder():
    J = os.path.join('dist', 'JETA La Laguna'); G = os.path.join(J, 'juego')
    shutil.rmtree(J, ignore_errors=True)
    for d in ('js', 'datos', 'lib', 'lanzador'): os.makedirs(os.path.join(G, d))
    s = make('./lib/three.module.min.js', False)
    s = s.replace('<script id="mapdata" type="application/json">' + data + '</script>', '<script src="datos/mapa.js"></script>', 1)
    s = s.replace('<script type="module">\n' + js + '\n</script>', '<script type="module" src="js/juego.js"></script>', 1)
    assert 'datos/mapa.js' in s and 'js/juego.js' in s, 'make_folder: la plantilla ha cambiado'
    open(os.path.join(G, 'index.html'), 'w', encoding='utf-8').write(s)
    open(os.path.join(G, 'datos', 'mapa.js'), 'w', encoding='utf-8').write('window.__MAPDATA = ' + data + ';\n')
    # the game in one module (all src/ files share one scope), with a line-by-line source map back to src/
    files = sorted(glob.glob('src/*.js')); parts = []; maps = []; B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    def vlq(v):
        v = (-v << 1) | 1 if v < 0 else v << 1; o = ''
        while True:
            d = v & 31; v >>= 5
            if v: d |= 32
            o += B64[d]
            if not v: return o
    prev_src = 0; prev_line = 0
    for si, f in enumerate(files):
        txt = open(f, encoding='utf-8').read(); lines = txt.split('\n'); parts.append(txt)
        for li in range(len(lines)):
            maps.append('A' + vlq(si - prev_src) + vlq(li - prev_line) + 'A'); prev_src, prev_line = si, li
    out = '\n'.join(parts)
    smap = {'version': 3, 'file': 'juego.js', 'sources': ['../../../../' + f.replace(os.sep, '/') for f in files], 'names': [], 'mappings': ';'.join(maps)}
    open(os.path.join(G, 'js', 'juego.js'), 'w', encoding='utf-8').write(out + '\n//# sourceMappingURL=juego.js.map\n')
    open(os.path.join(G, 'js', 'juego.js.map'), 'w', encoding='utf-8').write(json.dumps(smap))
    shutil.copy('data/three.module.min.js', os.path.join(G, 'lib', 'three.module.min.js'))
    for f in ('servidor.ps1', 'lanzar.bat', 'acceso_directo.ps1'):
        t = open(os.path.join('lanzador', f), encoding='utf-8').read().replace('\r\n', '\n')
        enc = 'utf-8-sig' if f.endswith('.ps1') else 'cp1252'   # PowerShell 5 reads UTF-8 only with BOM; cmd, the ANSI page
        open(os.path.join(G, 'lanzador', f), 'w', encoding=enc, errors='replace', newline='\r\n').write(t)
    shutil.copy('assets/icono.ico', os.path.join(G, 'lanzador', 'icono.ico'))
    for f, enc in (('Jugar.bat', 'cp1252'), ('LEEME.txt', 'utf-8-sig')):
        t = open(os.path.join('lanzador', f), encoding='utf-8').read().replace('\r\n', '\n')
        open(os.path.join(J, f), 'w', encoding=enc, errors='replace', newline='\r\n').write(t.replace('__VERSION__', open('VERSION').read().strip()))
    return J
try: print('carpeta', make_folder())
except Exception as e: print('Aviso: no se pudo hacer la versión en carpeta:', e)
print('ok', len(js))
# documentación técnica en una sola página (dist/Documentacion tecnica.html)
try:
    import sys; sys.path.insert(0, 'tools'); import docs2html; docs2html.build()
except Exception as e:
    print('Aviso: no se pudo generar la documentación HTML:', e)
