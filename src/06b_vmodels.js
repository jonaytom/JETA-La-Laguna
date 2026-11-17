// ============ parque móvil canario (v1.1.6, Jonay: «que se alejen más» de las marcas reales; Pijó se queda): modelos parodia basados en los más vendidos en Canarias (2010-2025) ============
// Base 3D: Kenney Car Kit (CC0, www.kenney.nl), reescalado a las medidas reales de cada modelo y recoloreado.
// [id, nombre parodia, categoría, base Kenney, física, largo, ancho, alto, peso de aparición]
const VMODELS_RAW = `
# utilitarios / urbanos
# v1.4.3: modelos propios hechos en Blender (Jonay: «iremos sustituyendo poco a poco a los actuales con los nuestros»); el Troceen C33 sustituye al Limonero Ce-Tres
troceen|Troceen C33|Crossover|c33|suv|4.015|1.755|1.567|10
troceenL|Troceen C33|Crossover|c33-lejos|suv|4.015|1.755|1.567|0
# v1.4.4: seis más (Jonay, 11-nov: «ve eliminando un modelo de los actuales por cada modelo añadido»); cada uno sale tanto como el que sustituye
troceenC44|Troceen C44|Crossover coupé|c44|suv|4.355|1.8|1.52|4
troceenC44L|Troceen C44|Crossover coupé|c44-lejos|suv|4.355|1.8|1.52|0
carlota|Totuya Carlota|Compacto|carlota|sedan|4.379|1.79|1.435|8
carlotaL|Totuya Carlota|Compacto|carlota-lejos|sedan|4.379|1.79|1.435|0
yaiza|Totuya Yaiza Cross|Crossover|yaizacross|suv|4.18|1.765|1.595|7
yaizaL|Totuya Yaiza Cross|Crossover|yaizacross-lejos|suv|4.18|1.765|1.595|0
trex|Guanchazen T-Rex|Crossover|trex|suv|4.108|1.79|1.584|5
trexL|Guanchazen T-Rex|Crossover|trex-lejos|suv|4.108|1.79|1.584|0
di55|Guanchazen D.I 55|SUV coupé eléctrico|di55|suv|4.599|1.852|1.615|3
di55L|Guanchazen D.I 55|SUV coupé eléctrico|di55-lejos|suv|4.599|1.852|1.615|0
jtm3|JTM Capítulo 3|Berlina|cap3|sedan|4.824|1.83|1.508|4
jtm3L|JTM Capítulo 3|Berlina|cap3-lejos|sedan|4.824|1.83|1.508|0
reniego|Yoos Reniego|Todoterreno|reniego|suv|4.236|1.805|1.684|4
reniegoL|Yoos Reniego|Todoterreno|reniego-lejos|suv|4.236|1.805|1.684|0
cartabon|Yoos Cartabon|SUV|cartabon|suv|4.394|1.819|1.629|4
cartabonL|Yoos Cartabon|SUV|cartabon-lejos|suv|4.394|1.819|1.629|0
# v1.4.5: tres más (Antonias Tipo E sustituye al Guagüen Golfo; LTG Scupe al Butaca Atajo; Fierilla 440 al Quillo Exceso, y sale poco)
tipoe|Antonias Tipo E|Berlina|tipoe|sedan|4.935|1.852|1.46|4
tipoeL|Antonias Tipo E|Berlina|tipoe-lejos|sedan|4.935|1.852|1.46|0
ltg|Antonias LTG Scupe|SUV coupé|scupe|suv|4.961|2.01|1.73|2.5
ltgL|Antonias LTG Scupe|SUV coupé|scupe-lejos|suv|4.961|2.01|1.73|0
fierilla|Fierilla 440|Superdeportivo|fierilla|sport|4.704|1.973|1.186|2
fierillaL|Fierilla 440|Superdeportivo|fierilla-lejos|sport|4.704|1.973|1.186|0
piki|Piki Crocante|Urbano|crocante|compact|3.595|1.595|1.485|7
pikiL|Piki Crocante|Urbano|crocante-lejos|compact|3.595|1.595|1.485|0
oalgo|Totuya O Algo|Crossover urbano|oalgo|compact|3.7|1.74|1.51|5
oalgoL|Totuya O Algo|Crossover urbano|oalgo-lejos|compact|3.7|1.74|1.51|0
gomera|Seta Gomera|Utilitario|gomera|compact|4.059|1.78|1.444|10
gomeraL|Seta Gomera|Utilitario|gomera-lejos|compact|4.059|1.78|1.444|0
teypan|Pancho Teypan|Berlina eléctrica|teypan|sedan|4.963|1.966|1.395|2
teypanL|Pancho Teypan|Berlina eléctrica|teypan-lejos|sedan|4.963|1.966|1.395|0
chayan|Pancho Chayan|SUV|chayan|suv|4.931|1.983|1.676|2.5
chayanL|Pancho Chayan|SUV|chayan-lejos|suv|4.931|1.983|1.676|0
olecorsa|Ole Corsario|Utilitario|corsario|compact|4.06|1.765|1.433|8
olecorsaL|Ole Corsario|Utilitario|corsario-lejos|compact|4.06|1.765|1.433|0
mocco|Ole Mocco|Crossover|mocco|suv|4.151|1.791|1.534|4
moccoL|Ole Mocco|Crossover|mocco-lejos|suv|4.151|1.791|1.534|0
tyaiza|Totuya Yaiza|Utilitario|yaiza|compact|3.94|1.745|1.5|11
tyaizaL|Totuya Yaiza|Utilitario|yaiza-lejos|compact|3.94|1.745|1.5|0
helado|Guanchazen Helado|Utilitario|helado|compact|4.053|1.751|1.448|9
heladoL|Guanchazen Helado|Utilitario|helado-lejos|compact|4.053|1.751|1.448|0
dsendero|Damian Sendero|Utilitario|sendero|compact|4.057|1.733|1.523|9
dsenderoL|Damian Sendero|Utilitario|sendero-lejos|compact|4.057|1.733|1.523|0
beluga|Troceen Beluga|Monovolumen|beluga|van|4.38|1.81|1.801|4
belugaL|Troceen Beluga|Monovolumen|beluga-lejos|van|4.38|1.81|1.801|0
vivita|Antonias Vivita|Furgoneta|vivita|van|5.14|1.928|1.89|3
vivitaL|Antonias Vivita|Furgoneta|vivita-lejos|van|5.14|1.928|1.89|0
newton3|Newton Style 3|Berlina eléctrica|style3|sedan|4.694|1.849|1.443|4
newton3L|Newton Style 3|Berlina eléctrica|style3-lejos|sedan|4.694|1.849|1.443|0
# v1.4.13: Raul Cactus (modelo de Fable) sustituye al Guagüen Te-Roque y sale igual que él
cactus|Raul Cactus|Crossover|raul-cactus|suv|4.249|1.9|1.603|4
cactusL|Raul Cactus|Crossover|raul-cactus-lejos|suv|4.249|1.9|1.603|0
# v1.4.14 (Jonay, 16-nov: «debemos ir quitando los de kenney»): 13 coches propios más; cada uno sustituye a uno de Kenney y sale igual que él
clip|Raul Clip|Utilitario|clip|compact|4.05|1.798|1.44|9
clipL|Raul Clip|Utilitario|clip-lejos|compact|4.05|1.798|1.44|0
nano|Niza Nano|Utilitario|nano|compact|3.78|1.665|1.515|5
nanoL|Niza Nano|Utilitario|nano-lejos|compact|3.78|1.665|1.515|0
pimbo|Raul Pimbo|Urbano|pimbo|compact|3.789|1.72|1.491|5
pimboL|Raul Pimbo|Urbano|pimbo-lejos|compact|3.789|1.72|1.491|0
torson|Junway Torson|SUV|torson|suv|4.5|1.865|1.65|6
torsonL|Junway Torson|SUV|torson-lejos|suv|4.5|1.865|1.65|0
queguay|Niza Queguay|Crossover|queguay|suv|4.425|1.835|1.625|7
queguayL|Niza Queguay|Crossover|queguay-lejos|suv|4.425|1.835|1.625|0
mphs|MP HS|SUV|mphs|suv|4.323|1.809|1.6|4
mphsL|MP HS|SUV|mphs-lejos|suv|4.323|1.809|1.6|0
vengator|Yoos Vengator|Crossover|vengator|suv|4.084|1.776|1.536|4
vengatorL|Yoos Vengator|Crossover|vengator-lejos|suv|4.084|1.776|1.536|0
ficus|Farm Ficus|Compacto|ficus|sedan|4.337|1.84|1.497|5
ficusL|Farm Ficus|Compacto|ficus-lejos|sedan|4.337|1.84|1.497|0
mepierdo|Raul Mepierdo|Compacto|mepierdo|sedan|4.209|1.777|1.5|5
mepierdoL|Raul Mepierdo|Compacto|mepierdo-lejos|sedan|4.209|1.777|1.5|0
padelgti|Guanchazen Padel GTI|Compacto deportivo|padelgti|sedan|4.213|1.786|1.469|4
padelgtiL|Guanchazen Padel GTI|Compacto deportivo|padelgti-lejos|sedan|4.213|1.786|1.469|0
pantera|Seta Pantera|Familiar|pantera|sedan|4.549|1.816|1.459|4
panteraL|Seta Pantera|Familiar|pantera-lejos|sedan|4.549|1.816|1.459|0
hubli|Martini Hubli|Berlina|hubli|sedan|4.971|1.945|1.461|2
hubliL|Martini Hubli|Berlina|hubli-lejos|sedan|4.971|1.945|1.461|0
reventon|Linguini Reventon|Superdeportivo|reventon|sport|4.78|2.03|1.136|2
reventonL|Linguini Reventon|Superdeportivo|reventon-lejos|sport|4.78|2.03|1.136|0
# v1.4.16 (Jonay, 17-nov: «incorpora los 5 nuevos vehículos sustituyendo de kenney viejotes»): cada uno sale igual que el de Kenney al que sustituye; el Seta 128 no tiene uno parecido (ya no quedan turismos de Kenney): poco, como el Reventon
koala|Raul Koala|Monovolumen|koala|van|4.486|1.919|1.838|5
koalaL|Raul Koala|Monovolumen|koala-lejos|van|4.486|1.919|1.838|0
compi|Piyo Compi|Monovolumen|compi|van|4.38|1.81|1.803|4
compiL|Piyo Compi|Monovolumen|compi-lejos|van|4.38|1.81|1.803|0
cassi|Guanchazen Cassi|Monovolumen|cassi|van|4.408|1.793|1.822|4
cassiL|Guanchazen Cassi|Monovolumen|cassi-lejos|van|4.408|1.793|1.822|0
traficc|Farm Traficc|Furgoneta|traficc|van|5.05|2.032|1.958|4
traficcL|Farm Traficc|Furgoneta|traficc-lejos|van|5.05|2.032|1.958|0
seta128|Seta 128|Urbano clásico|seta128|compact|3.595|1.527|1.37|2
seta128L|Seta 128|Urbano clásico|seta128-lejos|compact|3.595|1.527|1.37|0
# v1.4.19 (Jonay, 17-nov): Fita Triplon, Totuya Hilos y Niza Navarra en lugar de los de Kenney (mismo peso); la policía (3 modelos: Seta Pantera, Niza Queguay y Ole Corsario) y la ambulancia (Farm Traficc), propios: no se tiñen, traen sus vinilos
triplon|Fita Triplon|Furgoneta|triplon|van|4.756|1.832|1.845|3
triplonL|Fita Triplon|Furgoneta|triplon-lejos|van|4.756|1.832|1.845|0
hilos|Totuya Hilos|Pick-up|hilos|suv|5.33|1.855|1.815|5
hilosL|Totuya Hilos|Pick-up|hilos-lejos|suv|5.33|1.855|1.815|0
navarra|Niza Navarra|Pick-up|navarra|suv|5.33|1.85|1.805|3
navarraL|Niza Navarra|Pick-up|navarra-lejos|suv|5.33|1.85|1.805|0
# v1.4.20 (Jonay, 17-nov: «ya hay todos los coches listos para quitar lo viejo»): camiones, furgones, grúa, bomberos y los 3 taxis propios; fuera todos los de Kenney salvo el camión de la basura (no hay modelo propio todavía) y el tractor (no se usa)
daily|Ivizco Nightly|Camión|nightly|truck|5.6|2.052|2.75|3
dailyL|Ivizco Nightly|Camión|nightly-lejos|truck|5.6|2.052|2.75|0
daily2|Ivizco Evening|Furgón|evening|truck|5.67|2.052|2.68|3
daily2L|Ivizco Evening|Furgón|evening-lejos|truck|5.67|2.052|2.68|0
canter|Michu Singer|Camión|singer|truck|5.57|1.995|2.13|3
canterL|Michu Singer|Camión|singer-lejos|truck|5.57|1.995|2.13|0
sprinter|Antonias Runner|Furgón|runner|truck|5.932|2.02|2.62|3
sprinterL|Antonias Runner|Furgón|runner-lejos|truck|5.932|2.02|2.62|0
grua|Niza Cabestrante|Grúa|grua|truck|6.3|1.95|2.3|2
gruaL|Niza Cabestrante|Grúa|grua-lejos|truck|6.3|1.95|2.3|0
bomberos|Escania Manguera|Bomberos|bombero|truck|7.57|2.5|3.2|1.2
bomberosL|Escania Manguera|Bomberos|bombero-lejos|truck|7.57|2.5|3.2|0
taxi|Taxi Lagunero|Taxi|taxitipoe|taxi|4.935|1.852|1.46|1
taxiL|Taxi Lagunero|Taxi|taxitipoe-lejos|taxi|4.935|1.852|1.46|0
taxi2|Taxi Lagunero|Taxi|taxicap3|taxi|4.824|1.83|1.508|1
taxi2L|Taxi Lagunero|Taxi|taxicap3-lejos|taxi|4.824|1.83|1.508|0
taxi3|Taxi Lagunero|Taxi|taxicarlota|taxi|4.379|1.79|1.435|1
taxi3L|Taxi Lagunero|Taxi|taxicarlota-lejos|taxi|4.379|1.79|1.435|0
policiaL|Policía Local|Patrulla|polpantera-lejos|police|4.549|1.816|1.459|0
policia2|Policía Local|Patrulla|polqueguay|police|4.425|1.835|1.625|0
policia2L|Policía Local|Patrulla|polqueguay-lejos|police|4.425|1.835|1.625|0
policia3|Policía Local|Patrulla|polcorsario|police|4.06|1.765|1.433|0
policia3L|Policía Local|Patrulla|polcorsario-lejos|police|4.06|1.765|1.433|0
ambulanciaL|Ambulancia|Emergencias|ambtraficc-lejos|truck|5.05|2.032|1.958|0
# compactos / berlinas
# crossovers / SUV
# todoterrenos
# furgonetas
# pick-ups
# camiones
basura|Recogida Municipal|Camión de basura|garbage-truck|truck|7.5|2.5|3.2|2
ambulancia|Ambulancia|Emergencias|ambtraficc|truck|5.05|2.032|1.958|1.5
# servicio público y especiales (no salen en el sorteo general)
policia|Policía Local|Patrulla|polpantera|police|4.549|1.816|1.459|0
guancheGT|JTM H4|Deportivo|h4|sport|4.783|1.852|1.442|2
guancheGTL|JTM H4|Deportivo|h4-lejos|sport|4.783|1.852|1.442|0
# motos y ciclomotores (Canarias: el scooter manda)
pcx|Olita PeCeEquis 125|Scooter|scooter|moto|1.93|0.74|1.1|8
forza|Olita Forzuda 125|Maxiscooter|maxi|moto|2.14|0.76|1.35|4
nmax|Llamarada EneMax|Scooter|scooter|moto|1.94|0.74|1.12|4
symphony|Sinsín Sinfonía|Scooter|scooter|moto|1.88|0.68|1.1|3
agility|Quinqué Agilidad 50|Ciclomotor|scooter|moto|1.8|0.68|1.08|3
vespa|Avispa Primavera|Scooter|vespa|moto|1.85|0.7|1.12|2
xadv|Olita Equis-ADV|Maxiscooter|maxi|moto|2.2|0.84|1.4|2
z900|Cachimba Zeta 900|Naked|naked|moto|2.07|0.83|1.08|2
mt07|Llamarada EmeTe-Siete|Naked|naked|moto|2.08|0.78|1.1|2
`
  .trim()
  .split('\n')
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => l.split('|').map((v, k) => (k >= 5 ? +v : v))); // (v1.1.7: one line per model, «id|name|category|Kenney base|physics|length|width|height|weight»; # = a heading)
const VMODELS = {};
// v1.2.7 (Jonay: «reducimos el tamaño de los coches por ahora un 5 %… en todas sus dimensiones»): every vehicle is drawn
// and driven 5 % smaller in length, width and height (the table keeps the real sizes)
const CAR_SCALE = 0.95;
VMODELS_RAW.forEach(
  ([id, name, cat, base, phys, L, W, H, w]) =>
    (VMODELS[id] = { id, name, cat, base, phys, L: +(L * CAR_SCALE).toFixed(3), W: +(W * CAR_SCALE).toFixed(3), H: +(H * CAR_SCALE).toFixed(3), w })
);
// v1.4.3: our own models (Blender, assets/modelos/): the light version for far parked cars, and where the tail lights go
// v1.4.3/v1.4.4: our own models (Blender): the light version for far parked cars, and where the tail lights are
// (half width, height, already at the game's 0.95 scale)
// v1.4.19: the bases of our own models: their paint is exactly the «Pintura» colour (not every similar blue: the police
// vinyls and lights are blue too)
const OWN_BASES = new Set();
for (const [id, x, y] of [
  ['troceen', 0.62, 1.04],
  ['troceenC44', 0.74, 0.98],
  ['carlota', 0.74, 0.86],
  ['yaiza', 0.73, 1.02],
  ['trex', 0.74, 0.98],
  ['di55', 0.77, 1.01],
  ['jtm3', 0.76, 0.99],
  ['guancheGT', 0.77, 0.91],
  ['reniego', 0.75, 0.94],
  ['cartabon', 0.65, 1.07],
  ['tipoe', 0.77, 0.9],
  ['ltg', 0.83, 1.11],
  ['fierilla', 0.7, 0.82],
  ['piki', 0.66, 0.95],
  ['oalgo', 0.72, 0.68],
  ['gomera', 0.74, 0.78],
  ['teypan', 0.68, 0.87],
  ['chayan', 0.82, 1.08],
  ['olecorsa', 0.73, 0.75],
  ['mocco', 0.74, 0.95],
  ['tyaiza', 0.66, 0.91],
  ['helado', 0.72, 0.9],
  ['dsendero', 0.75, 0.77],
  ['beluga', 0.75, 0.96],
  ['vivita', 0.93, 1.05],
  ['newton3', 0.68, 0.92],
  ['cactus', 0.76, 1.04],
  ['clip', 0.63, 0.94],
  ['nano', 0.66, 0.88],
  ['pimbo', 0.71, 0.94],
  ['torson', 0.77, 1.05],
  ['queguay', 0.65, 1.07],
  ['mphs', 0.7, 1.0],
  ['vengator', 0.73, 0.95],
  ['ficus', 0.67, 0.99],
  ['mepierdo', 0.73, 0.91],
  ['padelgti', 0.61, 0.89],
  ['pantera', 0.6, 0.91],
  ['hubli', 0.71, 0.93],
  ['reventon', 0.65, 0.74],
  ['koala', 0.88, 1.02],
  ['compi', 0.84, 0.93],
  ['cassi', 0.8, 0.9],
  ['traficc', 0.94, 0.9],
  ['seta128', 0.62, 0.68],
  ['triplon', 0.84, 1.09],
  ['hilos', 0.86, 0.97],
  ['navarra', 0.81, 0.97],
  ['policia', 0.73, 0.92],
  ['policia2', 0.75, 1.07],
  ['policia3', 0.73, 0.75],
  ['ambulancia', 0.95, 0.9],
  ['daily', 0.88, 0.75],
  ['daily2', 0.97, 1.15],
  ['canter', 0.89, 0.71],
  ['sprinter', 0.94, 1.25],
  ['grua', 0.98, 1.04],
  ['bomberos', 1.15, 0.79],
  ['taxi', 0.77, 0.9],
  ['taxi2', 0.76, 0.97],
  ['taxi3', 0.75, 0.87]
]) {
  VMODELS[id].lod = id + 'L';
  VMODELS[id].tail = VMODELS[id + 'L'].tail = [x * CAR_SCALE, y * CAR_SCALE];
  OWN_BASES.add(VMODELS[id].base);
  OWN_BASES.add(VMODELS[id + 'L'].base);
}
// v1.4.19: the police and the ambulance keep their own colours and vinyls (white body, never the random paint)
// v1.4.20: also the taxis (white), the fire engine (red) and the tow truck (yellow)
const LIVERY = { bomberos: 0xb3141c, grua: 0xf2b21a };
const isLivery = (m) => !!m && /^(taxi\d*|policia\d*|ambulancia|bomberos|grua)$/.test(m.id) && !!m.lod;
const liveryColor = (m) => LIVERY[m.id] || 0xf6f6f4;
// v1.4.20: the ids of the old Kenney models still answer (saved games, story cars: s2Car('clio'), 'transit', 'vito'…), with
// the own model closest to them; not enumerable, so they never count twice when picking at random
for (const [a, b] of Object.entries({
  'polo': 'helado',
  'ibiza': 'gomera',
  'yaris': 'tyaiza',
  'picanto': 'piki',
  'rio': 'clip',
  'i20': 'clip',
  'i10': 'pimbo',
  'sandero': 'dsendero',
  'clio': 'clip',
  'p208': 'clip',
  'corsa': 'olecorsa',
  'c3': 'troceen',
  'f500': 'seta128',
  'leon': 'pantera',
  'corolla': 'carlota',
  'golf': 'padelgti',
  'troc': 'trex',
  'tcross': 'trex',
  'tiguan': 'torson',
  'tucson': 'torson',
  'kona': 'torson',
  'sportage': 'torson',
  'stonic': 'vengator',
  'xceed': 'vengator',
  'arona': 'trex',
  'ateca': 'cartabon',
  'chr': 'yaiza',
  'yariscross': 'yaiza',
  'qashqai': 'queguay',
  'juke': 'queguay',
  'captur': 'cactus',
  'p2008': 'mocco',
  'zs': 'mphs',
  'duster': 'reniego',
  'landcruiser': 'hilos',
  'jimny': 'reniego',
  'kangoo': 'koala',
  'berlingo': 'beluga',
  'partner': 'compi',
  'caddy': 'cassi',
  'doblo': 'triplon',
  'transit': 'traficc',
  'vito': 'vivita',
  'hilux': 'hilos',
  'navara': 'navarra',
  'tractor': 'hilos'
}))
  if (!VMODELS[a] && VMODELS[b]) Object.defineProperty(VMODELS, a, { value: VMODELS[b], enumerable: false });
const VTYPES2 = {
  truck: { name: 'Camión', L: 6.5, W: 2.1, H: 2.8, maxV: 30, acc: 5, grip: 6, mass: 3, prof: 'van' },
  moto: { name: 'Moto', L: 2.0, W: 0.8, H: 1.1, maxV: 36, acc: 12, grip: 9, mass: 0.5, prof: 'sedan' }
};
Object.assign(VTYPES, VTYPES2);
for (const k in VTYPES) {
  const T = VTYPES[k];
  T.L = +(T.L * CAR_SCALE).toFixed(3);
  T.W = +(T.W * CAR_SCALE).toFixed(3);
  T.H = +(T.H * CAR_SCALE).toFixed(3);
}
// popular colours in Canarias: white and greys dominate (rent-a-car fleets too)
const CARCOL_W = [
  [0xf2f2f2, 30],
  [0x9aa0a6, 13],
  [0x5b6770, 10],
  [0x1b1b1b, 10],
  [0xc9ccd0, 8],
  [0x1f4e8c, 6],
  [0xb3261e, 6],
  [0x2a6f97, 3],
  [0x7a1f2b, 3],
  [0xd8c7a3, 3],
  [0x2d5a3d, 2],
  [0xc97b2a, 2],
  [0x6e8fb3, 2],
  [0xe8dcc0, 2]
];
function pickW(list) {
  let t = 0;
  for (const e of list) t += e[1];
  let r = Math.random() * t;
  for (const e of list) {
    r -= e[1];
    if (r <= 0) return e[0];
  }
  return list[0][0];
}
const pickColor = () => pickW(CARCOL_W);
function pickModel(filter) {
  const L = Object.values(VMODELS).filter((m) => m.w > 0 && (!filter || filter(m)));
  return pickW(L.map((m) => [m, m.w]));
}
// which physics type a legacy type string maps to when picking a model
function modelForType(type) {
  if (type === 'taxi') return pickModel((m) => m.phys === 'taxi') || VMODELS.taxi; // v1.4.20: 3 taxis
  if (type === 'police') return pick([VMODELS.policia, VMODELS.policia2, VMODELS.policia3].filter(Boolean)) || VMODELS.policia; // v1.4.19: 3 models
  if (type === 'sport') return VMODELS.guancheGT;
  if (type === 'bus') return null;
  if (type === 'moto') return pickModel((m) => m.phys === 'moto');
  if (type === 'truck') return pickModel((m) => m.phys === 'truck' && m.id !== 'bomberos' && m.id !== 'ambulancia');
  return pickModel((m) => m.phys === type);
}
function trafficModel(edgeType) {
  const r = Math.random();
  if (r < 0.15) return pickModel((m) => m.phys === 'moto');
  if (r < 0.2) return pickModel((m) => m.phys === 'taxi') || VMODELS.taxi;
  // v1.4.20 (Jonay: «que se pueda ver relativamente fácil todos los modelos»): more lorries and vans on the main roads (7 %, before 3.5 %)
  if (r < 0.27 && ['primary', 'secondary', 'tertiary', 'trunk', 'motorway', 'motorway_link'].includes(edgeType))
    return pickModel((m) => m.phys === 'truck');
  return pickModel((m) => m.phys !== 'moto' && m.phys !== 'truck' && m.phys !== 'taxi');
}

// Raw DEFLATE decoder (RFC 1951), synchronous and small; used to unpack the car models (v1.4.9)
function inflateRaw(src, outLen) {
  const out = new Uint8Array(outLen);
  let op = 0,
    bp = 0,
    bb = 0,
    bc = 0;
  const bits = (n) => {
    while (bc < n) {
      bb |= src[bp++] << bc;
      bc += 8;
    }
    const v = bb & ((1 << n) - 1);
    bb >>>= n;
    bc -= n;
    return v;
  };
  const build = (lens, n) => {
    const cnt = new Uint16Array(16),
      offs = new Uint16Array(16),
      sym = new Uint16Array(n);
    for (let i = 0; i < n; i++) cnt[lens[i]]++;
    cnt[0] = 0;
    for (let i = 1; i < 16; i++) offs[i] = offs[i - 1] + cnt[i - 1];
    for (let i = 0; i < n; i++) if (lens[i]) sym[offs[lens[i]]++] = i;
    return { cnt, sym };
  };
  const decode = (t) => {
    let code = 0,
      first = 0,
      index = 0;
    for (let len = 1; len < 16; len++) {
      code |= bits(1);
      const c = t.cnt[len];
      if (code - c < first) return t.sym[index + (code - first)];
      index += c;
      first += c;
      first <<= 1;
      code <<= 1;
    }
    throw new Error('inflate: bad code');
  };
  const LB = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
  const LE = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
  const DB = [
    1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577
  ];
  const DE = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
  let fl = null,
    fd = null;
  let last;
  do {
    last = bits(1);
    const type = bits(2);
    if (type === 0) {
      bb = 0;
      bc = 0;
      const len = src[bp] | (src[bp + 1] << 8);
      bp += 4;
      out.set(src.subarray(bp, bp + len), op);
      op += len;
      bp += len;
      continue;
    }
    let lt, dt;
    if (type === 1) {
      if (!fl) {
        const l = new Uint8Array(288);
        for (let i = 0; i < 144; i++) l[i] = 8;
        for (let i = 144; i < 256; i++) l[i] = 9;
        for (let i = 256; i < 280; i++) l[i] = 7;
        for (let i = 280; i < 288; i++) l[i] = 8;
        fl = build(l, 288);
        fd = build(new Uint8Array(30).fill(5), 30);
      }
      lt = fl;
      dt = fd;
    } else {
      const hl = bits(5) + 257,
        hd = bits(5) + 1,
        hc = bits(4) + 4;
      const ord = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      const cl = new Uint8Array(19);
      for (let i = 0; i < hc; i++) cl[ord[i]] = bits(3);
      const ct = build(cl, 19);
      const L = new Uint8Array(hl + hd);
      for (let i = 0; i < hl + hd; ) {
        const s = decode(ct);
        if (s < 16) L[i++] = s;
        else if (s === 16) {
          const p = L[i - 1];
          for (let r = bits(2) + 3; r--; ) L[i++] = p;
        } else if (s === 17) i += bits(3) + 3;
        else i += bits(7) + 11;
      }
      lt = build(L.subarray(0, hl), hl);
      dt = build(L.subarray(hl), hd);
    }
    for (;;) {
      const s = decode(lt);
      if (s < 256) out[op++] = s;
      else if (s === 256) break;
      else {
        const k = s - 257,
          len = LB[k] + bits(LE[k]);
        const dsym = decode(dt),
          dist = DB[dsym] + bits(DE[dsym]);
        for (let i = 0; i < len; i++, op++) out[op] = out[op - dist];
      }
    }
  } while (!last);
  return out;
}

// ---------- Kenney geometry decoding (positions ×2000 int16, normals int8, colours RGB565)
const KGEO = (() => {
  const d = DATA.KV;
  if (!d) return null;
  const b64 = (s) => {
    const bin = atob(s);
    const u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u.buffer;
  };
  const out = {};
  for (const name in d) {
    const M0 = d[name];
    // v1.4.9: the models come DEFLATE-compressed in one block per model (tools/comprimir_coches.py)
    if (M0.z) {
      const raw = inflateRaw(new Uint8Array(b64(M0.z)), M0.zl);
      let o = 0;
      const take = (n) => raw.slice(o, (o += n)).buffer;
      const parts = M0.parts.map((p) => {
        const P = new Int16Array(take(p.np)),
          N = new Int8Array(take(p.nn)),
          C = new Uint16Array(take(p.nc)),
          I = new Uint16Array(take(p.ni));
        return { name: p.name, t: p.t, P, N, C, I };
      });
      out[name] = { bb: M0.bb, rank: M0.rank, parts };
      continue;
    }
    const parts = M0.parts.map((p) => {
      const P = new Int16Array(b64(p.p)),
        N = new Int8Array(b64(p.n)),
        C = new Uint16Array(b64(p.c)),
        I = new Uint16Array(b64(p.i));
      return { name: p.name, t: p.t, P, N, C, I };
    });
    out[name] = { bb: M0.bb, rank: M0.rank, parts };
  }
  return out;
})();
const rgb565 = (k) => [((k >> 11) & 31) / 31, ((k >> 5) & 63) / 63, (k & 31) / 31];
const lum = (c) => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11;
function hsv(c) {
  const mx = Math.max(...c),
    mn = Math.min(...c),
    d = mx - mn;
  let h = 0;
  if (d > 1e-4) {
    if (mx === c[0]) h = ((c[1] - c[2]) / d) % 6;
    else if (mx === c[1]) h = (c[2] - c[0]) / d + 2;
    else h = (c[0] - c[1]) / d + 4;
  }
  return [h * 60, mx ? d / mx : 0, mx];
}
// per base: decide the paint family (main saturated colour)
const PAINTREF = {};
function paintRef(base) {
  if (PAINTREF[base] !== undefined) return PAINTREF[base];
  const K = KGEO[base];
  let ref = null;
  if (base === 'police')
    ref = { grey: true, l: [0.35, 0.62] }; // dark-grey panels -> white
  else if (base === 'tractor' || base === 'delivery-flat' || base === 'ambulance' || base === 'firetruck' || base === 'garbage-truck') ref = null;
  else
    for (const [k] of K.rank) {
      const c = rgb565(k),
        h = hsv(c);
      if (h[1] > 0.35 && h[2] > 0.3) {
        ref = { h: h[0], l: lum(c), k, own: OWN_BASES.has(base) };
        break;
      }
    }
  return (PAINTREF[base] = ref);
}
const toLin = (c) => c.map((v) => Math.pow(v, 2.2));
function classify(base, k) {
  const [cls, c] = classify0(base, k);
  return [cls, cls === 'paint' ? c.map((v) => Math.min(1.6, Math.pow(v, 2.2))) : toLin(c)];
}
function classify0(base, k) {
  const c = rgb565(k),
    h = hsv(c),
    ref = base === 'wheel' ? null : paintRef(base);
  // glass: light, cool, low saturation (Kenney windows are pale blue)
  if ((c[2] > 0.9 && c[1] > 0.85 && c[0] > 0.75 && c[0] < 0.88) || (lum(c) > 0.78 && c[2] - c[0] > 0.035 && h[1] < 0.16)) return ['glass', c];
  if (ref && ref.own) {
    if (k === ref.k) return ['paint', [lum(c) / ref.l, lum(c) / ref.l, lum(c) / ref.l]];
  } else if (ref && !ref.grey && h[1] > 0.25 && Math.min(Math.abs(h[0] - ref.h), 360 - Math.abs(h[0] - ref.h)) < 22)
    return ['paint', [lum(c) / ref.l, lum(c) / ref.l, lum(c) / ref.l]];
  if (ref && ref.grey && h[1] < 0.22 && lum(c) > ref.l[0] && lum(c) < ref.l[1]) return ['paint', [lum(c) / 0.45, lum(c) / 0.45, lum(c) / 0.45]];
  // de-cartoon the purple-ish greys and keep the rest
  if (h[1] < 0.3) {
    const g = lum(c) * (lum(c) < 0.5 ? 0.78 : 1);
    return ['rest', [g, g, g * 1.02]];
  }
  return ['rest', c];
}
// geometry for a model: { paint, glass, rest, wheel: {geo, x, y, z, front, left}[] , dims }
// ---- pieces shared by every vehicle (audit P0.a): built once, never disposed (userData.shared). Car.remove() only
// frees what is the car's own (paint material and any unshared geometry) when the car does not go back to the pool.
const SHARED_GEO = new Map();
function shGeo(key, make) {
  let g = SHARED_GEO.get(key);
  if (!g) {
    g = make();
    g.userData.shared = true;
    SHARED_GEO.set(key, g);
  }
  return g;
}
const shBox = (w, h, d) => shGeo('box' + w + ',' + h + ',' + d, () => new THREE.BoxGeometry(w, h, d));
const SH_MAT = new Map();
function shMat(key, make) {
  let m = SH_MAT.get(key);
  if (!m) {
    m = make();
    m.userData.shared = true;
    SH_MAT.set(key, m);
  }
  return m;
}
// lettering / signs: one canvas texture per text, the meshes share geometry and material
const SH_TXT = new Map();
function sharedText(txt, w, h, bg, fg, font) {
  const k = [txt, w, h, bg, fg, font].join('|');
  let t = SH_TXT.get(k);
  if (!t) {
    t = textPlane(txt, w, h, bg, fg, font);
    t.geometry.userData.shared = true;
    t.material.userData.shared = true;
    SH_TXT.set(k, t);
  }
  return t.clone();
}
const VGEO = {};
function modelGeometry(model) {
  if (VGEO[model.id]) return VGEO[model.id];
  const K = KGEO[model.base];
  const bb = K.bb;
  const kW = bb[1][0] - bb[0][0],
    kH = bb[1][1] - bb[0][1],
    kL = bb[1][2] - bb[0][2];
  const sx = model.W / kW,
    sy = model.H / kH,
    sz = model.L / kL;
  const zc = (bb[1][2] + bb[0][2]) / 2;
  const groups = { paint: [], glass: [], rest: [], tail: [], beacon: [] };
  const wheels = [];
  modelGeometryPart1(sy, sx, K, wheels, zc, sz, model, groups);
  const mk = (arr) => {
    if (!arr.length) return null;
    const pos = new Float32Array(arr.length * 3),
      nor = new Float32Array(arr.length * 3),
      col = new Float32Array(arr.length * 3);
    arr.forEach((v, i) => {
      pos.set([v[0], v[1], v[2]], i * 3);
      const l = Math.hypot(v[3], v[4], v[5]) || 1;
      nor.set([v[3] / l, v[4] / l, v[5] / l], i * 3);
      col.set(v[6], i * 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  };
  // rear face / roof heights for lights and roof props
  let zmin = 1e9,
    ymax = 0;
  for (const grp of Object.values(groups))
    for (const v of grp) {
      zmin = Math.min(zmin, v[2]);
      ymax = Math.max(ymax, v[1]);
    }
  // tail lights: only the red faces at the rear (a red reflector or detail elsewhere stays in 'rest')
  if (groups.tail.length) {
    const keep = [];
    for (let i = 0; i + 2 < groups.tail.length; i += 3) {
      const t = groups.tail.slice(i, i + 3);
      (Math.min(t[0][2], t[1][2], t[2][2]) < zmin + 0.45 ? keep : groups.rest).push(...t);
    }
    groups.tail = keep;
  }
  // the roof lights, left and right (they flash in turn)
  const bl = [],
    br = [];
  for (let i = 0; i + 2 < groups.beacon.length; i += 3) {
    const t = groups.beacon.slice(i, i + 3);
    (t[0][0] + t[1][0] + t[2][0] < 0 ? bl : br).push(...t);
  }
  const out = {
    paint: mk(groups.paint),
    glass: mk(groups.glass),
    rest: mk(groups.rest),
    tail: mk(groups.tail),
    beaconL: mk(bl),
    beaconR: mk(br),
    wheels,
    zmin,
    ymax
  };
  for (const g of [out.paint, out.glass, out.rest, out.tail, out.beaconL, out.beaconR, ...wheels.map((w) => w.geo)]) if (g) g.userData.shared = true;
  return (VGEO[model.id] = out);
}
/** (v1.1.7, code quality) part of modelGeometry: one geometry per wheel, centred on its own node (rotation axis = x) */
function modelGeometryPart1(sy, sx, K, wheels, zc, sz, model, groups) {
  const wheelScale = Math.min(1.25, Math.max(0.9, sy * 0.92)),
    wheelX = sx * 0.72;
  for (const p of K.parts) {
    const isWheel = p.name.startsWith('wheel');
    if (isWheel) {
      if (p.name === 'wheel-back') continue; // spare wheel on the boxy SUV is kept on the body below
      // one geometry per wheel, centred on its own node (rotation axis = x)
      const n = p.P.length / 3;
      const pos = new Float32Array(n * 3),
        nor = new Float32Array(n * 3),
        col = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        pos[i * 3] = (p.P[i * 3] / 2000) * wheelX;
        pos[i * 3 + 1] = (p.P[i * 3 + 1] / 2000) * wheelScale;
        pos[i * 3 + 2] = (p.P[i * 3 + 2] / 2000) * wheelScale;
        nor[i * 3] = p.N[i * 3] / 127;
        nor[i * 3 + 1] = p.N[i * 3 + 1] / 127;
        nor[i * 3 + 2] = p.N[i * 3 + 2] / 127;
        const cc = classify('wheel', p.C[i])[1];
        col.set(cc, i * 3);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      g.setIndex(new THREE.BufferAttribute(new Uint16Array(p.I), 1));
      wheels.push({ geo: g, x: p.t[0] * sx, y: p.t[1] * wheelScale, z: (p.t[2] - zc) * sz, front: p.t[2] > zc ? 1 : 0, left: p.t[0] > 0 });
      continue;
    }
    // body parts: split triangles by material group, bake transform + scale
    const n = p.P.length / 3;
    const hasTailRed = model.tail && p.C.includes(47234);
    const cls = new Array(n);
    const cols = new Array(n);
    for (let i = 0; i < n; i++) {
      const [k, c] = classify(model.base, p.C[i]);
      cls[i] = k;
      cols[i] = c;
      // v1.4.16 (Jonay, 16-nov: «¿no es posible iluminar esos pilotos traseros sin añadir el rectángulo?»): our own models
      // (the ones with 'tail') bring their tail lights in saturated red: those faces go to their own group (kept at the rear
      // below), which lights up when braking instead of the two boxes Kenney's cars get
      if (model.tail && k === 'rest') {
        // v1.4.19: the tail-light red of our models is exactly 47234 (an ambulance's red vinyl is not a light)
        const hv = hsv(rgb565(p.C[i]));
        if (p.C[i] === 47234 || (!hasTailRed && (hv[0] < 16 || hv[0] > 344) && hv[1] > 0.55 && hv[2] > 0.22)) cls[i] = 'tail';
        // v1.4.19: the police / ambulance roof lights (exactly 543, bright blue): they flash with the siren
        else if (p.C[i] === 543 && /^(policia|ambulancia|bomberos)/.test(model.id)) cls[i] = 'beacon';
      }
    }
    for (let t = 0; t < p.I.length; t += 3) {
      const a = p.I[t];
      const grp = groups[cls[a]];
      for (let j = 0; j < 3; j++) {
        const v = p.I[t + j];
        grp.push([
          (p.P[v * 3] / 2000 + p.t[0]) * sx,
          (p.P[v * 3 + 1] / 2000 + p.t[1]) * sy,
          (p.P[v * 3 + 2] / 2000 + p.t[2] - zc) * sz,
          p.N[v * 3] / 127 / sx,
          p.N[v * 3 + 1] / 127 / sy,
          p.N[v * 3 + 2] / 127 / sz,
          cols[v]
        ]);
      }
    }
  }
}
const restMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.15 });
const kGlassMat = new THREE.MeshStandardMaterial({ color: 0x1e2830, roughness: 0.12, metalness: 0.35 });
const wheelMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, metalness: 0.1 });
function makeKenneyMesh(model, color) {
  const G = modelGeometry(model);
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);
  if (isLivery(model)) color = liveryColor(model);
  const paint = new THREE.MeshStandardMaterial({ vertexColors: true, color, roughness: 0.3, metalness: 0.5 });
  const { wheels, hl, tl, W, L, halfW } = makeKenneyMeshPart1(G, body, paint, model, g);
  makeKenneyMeshPart2(model, G, halfW, W, body, tl);
  let { bar } = makeKenneyMeshPart3(model, G, body, L, halfW);
  makeKenneyMeshPart4(model, G, body, L, halfW, W);
  body.traverse((m) => {
    if (m.isMesh) {
      m.castShadow = true;
      m.receiveShadow = false;
    }
  });
  return { g, body, wheels, hl, tl, bar, paint };
}
/** (v1.1.7, code quality) part of makeKenneyMesh: company / service lettering on the box sides */
function makeKenneyMeshPart4(model, G, body, L, halfW, W) {
  if (model.id === 'taxi' && !model.lod) {
    {
      const y = model.H * 0.48;
      for (const side of [-1, 1]) {
        const gg = shGeo('taxiStripe:' + model.id + ':' + side, () => {
          const pos = [],
            idx = [];
          for (let i = 0; i <= 14; i++) {
            const z = -L * 0.35 + (L * 0.7 * i) / 14;
            const hw = halfW(y, z, 0.12, 0.2) + 0.012;
            pos.push(side * hw, y - 0.035, z, side * hw, y + 0.035, z);
            if (i) {
              const a = (i - 1) * 2;
              idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
            }
          }
          const q = new THREE.BufferGeometry();
          q.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          q.setIndex(idx);
          q.computeVertexNormals();
          return q;
        });
        body.add(
          new THREE.Mesh(
            gg,
            shMat('taxiStripe', () => new THREE.MeshStandardMaterial({ color: 0x1a8a3a, roughness: 0.4, side: THREE.DoubleSide }))
          )
        );
      }
    }
    const lamp = new THREE.Mesh(
      shBox(0.16, 0.09, 0.1),
      shMat('taxiLamp', () => new THREE.MeshStandardMaterial({ color: 0x1fd15a, emissive: 0x1fd15a, emissiveIntensity: 1.2 }))
    );
    lamp.position.set(-0.35, G.ymax + 0.02, 0.6);
    body.add(lamp);
  }
  // v1.4.20: the own tow truck brings its lettering; the open-bodied Michu Singer has no box sides to letter
  if (model.id === 'basura' || model.id === 'daily' || model.id === 'daily2' || model.id === 'sprinter') {
    // company / service lettering on the box sides
    const txt =
      model.id === 'basura'
        ? 'AYTO. LA LAGUNA'
        : model.id === 'grua'
          ? 'GRÚAS ANDE PEPE'
          : pick(['PAPAS EL MAGO', 'GOFIO LA MOLINETA', 'TRANSPORTES CHACHO', 'REFRESCOS CLIPPER-ITO', 'MUEBLES EL CAMBULLÓN']);
    for (const side of [-1, 1]) {
      const t = sharedText(txt, Math.min(3.2, L * 0.5), 0.36, 'rgba(0,0,0,0)', '#1d2a33', 'bold 30px Arial');
      t.position.set(side * (W / 2 + 0.02), model.H * 0.62, -L * 0.12);
      t.rotation.y = (side * Math.PI) / 2;
      body.add(t);
    }
  }
}
/** (v1.1.7, code quality) part of makeKenneyMesh: livery stripes as ribbons that follow the side of the body */
function makeKenneyMeshPart3(model, G, body, L, halfW) {
  let bar = null;
  if (G.beaconL || G.beaconR) {
    // v1.4.19: our own police cars and ambulance bring their vinyls and roof lights: their lights flash, nothing is added
    bar = new THREE.Group();
    const L0 = G.beaconL || G.beaconR,
      R0 = G.beaconR || G.beaconL;
    bar.add(new THREE.Mesh(L0, policeBlue), new THREE.Mesh(R0, policeRed));
    body.add(bar);
  } else if (/^policia/.test(model.id)) {
    // livery stripes as ribbons that follow the side of the body
    const ribbon = (y0, y1, mat) => {
      const zs = [];
      for (let z = -L * 0.39; z <= L * 0.39 + 1e-3; z += (L * 0.78) / 16) zs.push(z);
      for (const side of [-1, 1]) {
        const gg = shGeo('stripe:' + model.id + ':' + y0.toFixed(3) + ':' + side, () => {
          const pos = [],
            idx = [];
          zs.forEach((z, i) => {
            const hw = halfW((y0 + y1) / 2, z, 0.14, (L * 0.78) / 32 + 0.05) + 0.012;
            pos.push(side * hw, y0, z, side * hw, y1, z);
            if (i) {
              const a = (i - 1) * 2;
              idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
            }
          });
          const q = new THREE.BufferGeometry();
          q.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          q.setIndex(idx);
          q.computeVertexNormals();
          return q;
        });
        const m = new THREE.Mesh(gg, mat);
        body.add(m);
      }
    };
    const sy = model.H * 0.45;
    ribbon(
      sy - 0.08,
      sy + 0.08,
      shMat('polBlueStripe', () => new THREE.MeshStandardMaterial({ color: 0x1c3fa8, roughness: 0.4, side: THREE.DoubleSide }))
    );
    ribbon(
      sy + 0.09,
      sy + 0.14,
      shMat('polYellowStripe', () => new THREE.MeshStandardMaterial({ color: 0xf2c200, roughness: 0.4, side: THREE.DoubleSide }))
    );
    bar = new THREE.Group();
    const b1 = new THREE.Mesh(shBox(0.45, 0.12, 0.25), policeBlue);
    b1.position.x = -0.28;
    const b2 = new THREE.Mesh(shBox(0.45, 0.12, 0.25), policeRed);
    b2.position.x = 0.28;
    bar.add(b1, b2);
    bar.position.set(0, G.ymax + 0.06, -0.1);
    body.add(bar);
    for (const side of [-1, 1]) {
      const t = sharedText('POLICÍA LOCAL', 1.8, 0.28, 'rgba(0,0,0,0)', '#1c3fa8', 'bold 34px Arial');
      t.position.set(side * (halfW(model.H * 0.6, -0.2, 0.1, 0.9) + 0.02), model.H * 0.6, -0.2);
      t.rotation.y = (side * Math.PI) / 2;
      body.add(t);
    }
  }
  return { bar };
}
/** (v1.1.7, code quality) part of makeKenneyMesh: rear: the lights go on the rear face, at the upper part of it, near its outer edge */
function makeKenneyMeshPart2(model, G, halfW, W, body, tl) {
  // rear: the lights go on the rear face, at the upper part of it, near its outer edge
  let ry0 = 1e9,
    ry1 = -1e9;
  {
    const P = G.probe;
    for (let i = 0; i < P.length; i += 3)
      if (P[i + 2] < G.zmin + 0.12) {
        ry0 = Math.min(ry0, P[i + 1]);
        ry1 = Math.max(ry1, P[i + 1]);
      }
  }
  const tly = ry1 > ry0 ? Math.min(ry0 + (ry1 - ry0) * 0.72, ry1 - 0.08) : Math.min(1.05, model.H * 0.55);
  let rz = G.zmin;
  {
    const P = G.probe;
    let zz = 1e9;
    for (let i = 0; i < P.length; i += 3) if (Math.abs(P[i + 1] - tly) < 0.06) zz = Math.min(zz, P[i + 2]);
    if (zz < 1e8) rz = zz;
  }
  const rhw = halfW(tly, rz, 0.08, 0.12) || W / 2;
  if (G.tail) {
    // v1.4.16: our own models light up their own tail lights (no boxes on top)
    const t = new THREE.Mesh(G.tail, tailMat);
    body.add(t);
    tl.push(t);
  } else
    for (const x of [-1, 1]) {
      const t = new THREE.Mesh(shBox(0.26, 0.1, 0.04), tailMat);
      t.position.set(x * Math.max(0.2, rhw - 0.2), tly, rz + 0.012);
      if (model.tail) {
        // v1.4.3: our own models say where their tail lights are (the brake light goes on top of them)
        const ty = model.tail[1];
        let tz = G.zmin;
        for (let i = 0; i < G.probe.length; i += 3)
          if (Math.abs(G.probe[i + 1] - ty) < 0.04 && Math.abs(Math.abs(G.probe[i]) - model.tail[0]) < 0.1)
            tz = Math.min(tz === G.zmin ? 1e9 : tz, G.probe[i + 2]);
        t.position.set(x * model.tail[0], ty, tz - 0.008);
      }
      body.add(t);
      tl.push(t);
    }
  if (PLATES.length < 10) {
    const pl = textPlane(
      Math.floor(1000 + Math.random() * 8999) + ' ' + pick(['KHT', 'LBC', 'MFZ', 'JRW', 'GPD', 'NCX']),
      0.52,
      0.12,
      '#f4f4f4',
      '#111',
      'bold 40px Arial'
    );
    pl.geometry.userData.shared = true;
    pl.material.userData.shared = true;
    PLATES.push(pl);
  }
  const plate = pick(PLATES).clone();
  const ply = Math.min(0.7, model.H * 0.36);
  let pz = G.zmin;
  {
    const P = G.probe;
    let zz = 1e9;
    for (let i = 0; i < P.length; i += 3) if (Math.abs(P[i + 1] - ply) < 0.08 && Math.abs(P[i]) < 0.4) zz = Math.min(zz, P[i + 2]);
    if (zz < 1e8) pz = zz;
  }
  plate.position.set(0, ply, pz - 0.012);
  plate.rotation.y = Math.PI;
  body.add(plate);
}
/** (v1.1.7, code quality) part of makeKenneyMesh: lights (brake lights must light up), plate */
function makeKenneyMeshPart1(G, body, paint, model, g) {
  if (G.paint) body.add(new THREE.Mesh(G.paint, paint));
  if (G.glass) body.add(new THREE.Mesh(G.glass, kGlassMat));
  if (G.rest) body.add(new THREE.Mesh(G.rest, restMat));
  const wheels = [];
  for (const w of G.wheels) {
    const piv = new THREE.Group();
    piv.position.set(w.x, w.y, w.z);
    g.add(piv);
    const m = new THREE.Mesh(w.geo, wheelMat);
    m.castShadow = true;
    piv.add(m);
    wheels.push({ piv, w: m, front: w.front });
  }
  // lights (brake lights must light up), plate
  const hl = [],
    tl = [];
  const W = model.W,
    L = model.L;
  // body shape probes (so lights, stripes and lettering sit ON the bodywork instead of floating)
  if (!G.probe) {
    const P = [];
    for (const gg of [G.paint, G.rest])
      if (gg) {
        const a = gg.attributes.position.array;
        for (let i = 0; i < a.length; i += 3) P.push(a[i], a[i + 1], a[i + 2]);
      }
    G.probe = new Float32Array(P);
  }
  G.hwc = G.hwc || new Map();
  const halfW = (y, z, dy = 0.12, dz = 0.3) => {
    const key = y.toFixed(3) + z.toFixed(3) + dy + dz;
    if (G.hwc.has(key)) return G.hwc.get(key);
    const P = G.probe;
    let m = 0;
    for (let i = 0; i < P.length; i += 3) if (Math.abs(P[i + 1] - y) < dy && Math.abs(P[i + 2] - z) < dz) m = Math.max(m, Math.abs(P[i]));
    G.hwc.set(key, m);
    return m;
  };
  return { wheels, hl, tl, W, L, halfW };
}

// ---------- motos y scooters (modelados a mano)
const motoMats = { dark: M(0x1b1d20, 0.6, 0.3), chrome: M(0xc8ccd0, 0.25, 0.9), seat: M(0x151515, 0.85), tire: tireMat, light: headMat };
function makeMotoMesh(model, color) {
  const g = new THREE.Group();
  const { body, paint, L, kind, wr, wheels } = makeMotoMeshPart1(g, color, model);
  const { box, pod, fz, rz } = makeMotoMeshPart2(L, wr, body);
  if (kind === 'naked') {
    pod(0.34, 0.26, 0.5, paint, 0, 0.92, 0.15, -0.12); // tank
    box(0.28, 0.3, 0.46, motoMats.dark, 0, 0.56, 0.08); // engine
    box(0.3, 0.12, 0.3, motoMats.chrome, 0, 0.42, 0.12); // crankcase
    pod(0.24, 0.08, 0.5, motoMats.seat, 0, 0.88, -0.36, 0.08); // seat
    pod(0.16, 0.1, 0.42, paint, 0, 0.93, -0.72, 0.3); // tail
    box(0.05, 0.05, 0.75, motoMats.dark, 0.1, 0.4, -0.42, 0.18);
    box(0.05, 0.05, 0.75, motoMats.dark, -0.1, 0.4, -0.42, 0.18); // swingarm
    pod(0.09, 0.09, 0.45, motoMats.chrome, 0.16, 0.36, -0.2, -0.1); // exhaust
    box(0.04, 0.72, 0.04, motoMats.chrome, 0.09, 0.64, fz - 0.06, 0.4);
    box(0.04, 0.72, 0.04, motoMats.chrome, -0.09, 0.64, fz - 0.06, 0.4); // fork
    box(0.72, 0.035, 0.035, motoMats.dark, 0, 1.03, fz - 0.3); // handlebar
    pod(0.2, 0.16, 0.14, motoMats.light, 0, 0.93, fz - 0.12); // headlight
    pod(0.18, 0.05, 0.4, paint, 0, wr + 0.06, fz, 0); // front mudguard
  } else {
    const vespa = kind === 'vespa',
      maxi = kind === 'maxi';
    const h0 = vespa ? 0.33 : 0.38;
    pod(0.34, 0.36, L * 0.5, paint, 0, h0 + 0.22, -L * 0.14, 0.05); // rear cowl over the engine
    box(0.28, 0.05, L * 0.34, motoMats.dark, 0, h0 - 0.04, L * 0.08); // floorboard
    pod(0.3, 0.1, 0.62, motoMats.seat, 0, h0 + 0.43, -L * 0.13, 0.04); // seat
    pod(0.34, maxi ? 0.62 : 0.52, 0.18, paint, 0, h0 + 0.3, fz - 0.3, -0.18); // leg shield
    pod(0.2, 0.12, 0.42, paint, 0, wr + 0.08, fz - 0.02, 0); // front mudguard
    if (maxi) {
      box(0.4, 0.34, 0.03, kGlassMat, 0, h0 + 0.88, fz - 0.43, -0.55);
      pod(0.38, 0.24, 0.5, paint, 0, h0 + 0.6, fz - 0.2, -0.25);
    }
    box(0.6, 0.035, 0.035, motoMats.dark, 0, h0 + 0.68, fz - 0.4); // handlebar
    pod(0.16, 0.1, 0.08, motoMats.light, 0, h0 + 0.62, fz - 0.33); // headlight on the bar
    box(0.045, 0.5, 0.045, motoMats.chrome, 0, h0 + 0.12, fz - 0.06, 0.35); // fork
    if (vespa) {
      pod(0.46, 0.3, 0.46, paint, 0, h0 + 0.16, -L * 0.26);
    }
    box(0.24, 0.04, 0.26, motoMats.dark, 0, h0 + 0.5, rz + 0.06); // rack
  }
  const tl = [];
  const t = new THREE.Mesh(shBox(0.16, 0.06, 0.04), tailMat);
  t.position.set(0, kind === 'naked' ? 0.85 : 0.82, -L / 2 + 0.03);
  body.add(t);
  tl.push(t);
  body.traverse((m) => {
    if (m.isMesh) m.castShadow = true;
  });
  return { g, body, wheels, hl: [], tl, bar: null, paint, moto: true };
}
/** (v1.1.7, code quality) part of makeMotoMesh: rounded volume: capsule stretched along z */
function makeMotoMeshPart2(L, wr, body) {
  const box = (w, h, d, mat, x, y, z, rx = 0) => {
    const m = new THREE.Mesh(shBox(w, h, d), mat);
    m.position.set(x, y, z);
    m.rotation.x = rx;
    body.add(m);
    return m;
  };
  // rounded volume: capsule stretched along z
  const pod = (w, h, d, mat, x, y, z, rx = 0) => {
    const m = new THREE.Mesh(
      shGeo('capsule', () => new THREE.CapsuleGeometry(0.5, 1, 4, 10)),
      mat
    );
    m.rotation.x = Math.PI / 2 + rx;
    m.scale.set(w, d / 2, h);
    m.position.set(x, y, z);
    body.add(m);
    return m;
  };
  const fz = L / 2 - wr - 0.05,
    rz = -L / 2 + wr + 0.08;
  return { box, pod, fz, rz };
}
/** (v1.1.7, code quality) part of makeMotoMesh */
function makeMotoMeshPart1(g, color, model) {
  const body = new THREE.Group();
  g.add(body);
  const paint = new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.5 });
  const L = model.L,
    kind = model.base;
  const wr = kind === 'naked' ? 0.31 : kind === 'maxi' ? 0.27 : kind === 'vespa' ? 0.2 : 0.24;
  const wheels = [];
  for (const [z, front] of [
    [L / 2 - wr - 0.05, 1],
    [-L / 2 + wr + 0.08, 0]
  ]) {
    const piv = new THREE.Group();
    piv.position.set(0, wr, z);
    g.add(piv);
    const tg = shGeo('motoTyre' + wr, () => {
      const q = new THREE.TorusGeometry(wr - 0.045, 0.05, 8, 18);
      q.rotateY(Math.PI / 2);
      return q;
    });
    const w = new THREE.Mesh(tg, tireMat);
    const hub = new THREE.Mesh(
      shGeo('motoHub' + wr, () => new THREE.CylinderGeometry(wr * 0.6, wr * 0.6, 0.06, 12)),
      motoMats.chrome
    );
    hub.rotation.z = Math.PI / 2;
    w.add(hub);
    w.castShadow = true;
    piv.add(w);
    wheels.push({ piv, w, front });
  }
  return { body, paint, L, kind, wr, wheels };
}
// rider for motos (AI) or the player sitting on it
function seatHuman(H, model) {
  if (H.skinned) {
    H.pose = 'ride';
    H.moto = model.base;
    H.root.position.set(0, (model.base === 'naked' ? 0.92 : 0.86) - 0.62, model.base === 'naked' ? 0.12 : -0.08);
    H.root.rotation.set(0, 0, 0);
    return;
  }
  const seatY = model.base === 'naked' ? 0.92 : 0.9;
  H.legL.p.rotation.x = H.legR.p.rotation.x = -1.35;
  H.legL.j.rotation.x = H.legR.j.rotation.x = 1.25;
  H.legL.p.rotation.z = 0.12;
  H.legR.p.rotation.z = -0.12;
  H.armL.p.rotation.x = H.armR.p.rotation.x = -1.05;
  H.torso.rotation.x = model.base === 'naked' ? 0.35 : 0.08;
  H.body.rotation.x = 0;
  H.body.position.y = 0;
  H.root.position.set(0, seatY - 0.95 * H.body.scale.y, model.base === 'naked' ? -0.28 : -0.3);
  H.root.rotation.set(0, 0, 0);
  H.pose = 'ride';
}
function unseatHuman(H) {
  if (H.skinned) {
    H.pose = 'walk';
    H.moto = null;
    return;
  }
  H.legL.p.rotation.z = 0;
  H.legR.p.rotation.z = 0;
  H.torso.rotation.x = 0;
  H.pose = 'walk';
}
