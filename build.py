import json,re,glob,sys,os,shutil
ROOT=os.path.dirname(os.path.abspath(__file__)); os.chdir(ROOT)
tpl=open('template.html',encoding='utf-8').read()
js='\n'.join(open(f,encoding='utf-8').read() for f in sorted(glob.glob('src/*.js')))
D=json.load(open('data/data.json',encoding='utf-8'))
SH=[]
for line in open('data/shops.txt',encoding='utf-8'):
    line=line.strip()
    if not line: continue
    x,z,c,n=line.split('|',3); SH.append([int(x),int(z),c,n])
BRAND={'Alcampo':'Alcampito','IKEA':'Ikeña','Makro':'Micro Mayorista','Decathlon':'Decatlón Chacho','Lidl':'Lidlito','Carrefour':'Cruce Cuatro','MediaMarkt':'Medio Mercado','Primark':'Primarcas','Mercadona':'Merca Mona','HiperDino':'Híper Lagartón','SuperDino':'Súper Lagarto','ALDI':'Aldea','Aldi':'Aldea',"McDonald's":'McGofio','KFC':'Pollo Frito Kanario','Telepizza':'Telepisa','Burger King':'Burguer Mencey','BBVA':'Banco Bebeuvea','Caixabank':'Cajachacho','Banco Santander':'Banco Sancocho','Bankinter':'Bancointerminable','Cajamar':'Caja Mar de Nubes','Banco Sabadell':'Banco Sábado','Banca March':'Banca Marcha','Shell':'Concha Gasolinera','Disa':'Dice Gasolinera','BP':'BePe Gasolinera','Repsol':'Repesol','Tgas':'Tegases','Cepsa':'Cepsita','PCAN':'Pecán Gasolinera','Spar':'Espárrago Market','Covirán':'Covirao','Supercor':'Supercorre','Conforama':'Confortable Muebles','Kiabi':'Kiabichacho','Toys R Us':'Juguetes Somos','Leroy Merlin':'Rey Merlón','Starbucks':'Barraquito Stars','Vodafone':'Bocafón','Orange':'Naranjita Móvil','Mango':'Mango Bajito','Bershka':'Berza','Stradivarius':'Estradi Variado','Expert':'Experto en Cacharros','Granier':'Granjero Pan','ONCE':'DOCE Cupones','GAES':'Oye Tú Audífonos','Multiópticas':'Multigafas','Optica 2000':'Óptica 3000','Halcón Viajes':'Guirre Viajes','Folder':'Carpetón','IQOS':'Ikós','Kiwoko':'Kiwicoco','Worten':'Wortensia','Bricomart':'Bricomarte','Dia':'Noche Súper','Eroski':'Erosquito','Hiunday':'Coches Jiundái','Mitsubishi':'Coches Mitsubichi','Seat':'Coches Asiento','Chevrolet':'Coches Chevrolé','Mercedes-Benz':'Coches Mercedes del Barrio','Rover':'Coches Rove','Suzuki':'Motos Susuki'}
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
D['HUM']=json.load(open('data/chars.json',encoding='utf-8'))
import base64
D['PLASTER']=['data:image/jpeg;base64,'+base64.b64encode(open(f,'rb').read()).decode() for f in ['assets/textures/plaster_det.jpg','assets/textures/plaster_n1.jpg','assets/textures/plaster_n2.jpg']]
data=json.dumps(D,separators=(',',':'),ensure_ascii=False).replace('</','<\\/')
def make(three, artifact):
    s=tpl.replace('__DATA__',data).replace('__THREE__','<script type="importmap">{"imports":{"three":"%s"}}</script>'%three).replace('__GAME__',js)
    if artifact:
        s=s.replace('<!doctype html>\n','').replace('<html lang="es">\n','').replace('<head>\n','',1).replace('</head>\n<body>\n','').replace('</body>\n</html>\n','')
        s=s.replace('<meta charset="utf-8">\n','').replace('<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">\n','')
    return s
os.makedirs('dist',exist_ok=True); shutil.copy('data/three.module.min.js','dist/three.module.min.js'); open('dist/test.html','w',encoding='utf-8').write(make('./three.module.min.js',False))
open('dist/gta-la-laguna.html','w',encoding='utf-8').write(make('https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.min.js',True))
open('dist/JETA La Laguna.html','w',encoding='utf-8').write(make('https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.min.js',False))
print('ok', len(js))
