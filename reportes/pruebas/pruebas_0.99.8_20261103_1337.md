# Pruebas 0.99.8 — 2026-11-03 13:37 — 3/3 OK

Listas: v1000i. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 85 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_dibujadas.py` | **OK** | 14 s |
| 2 | `herramientas/sonda_edificios_dudosos.py` | **OK** | 49 s |
| 3 | `prueba_recorte.py` | **OK** | 1 s |

## Detalle

### 1. herramientas/sonda_dibujadas.py — OK

```
     11     0  suelta · - · PlaneGeometry · lejos
     10     0  suelta · - · BufferGeometry · lejos
      7     0  suelta · - · BufferGeometry · hecha después · lejos
      7     0  suelta · - · PlaneGeometry · transparente
      6     0  suelta · - · ExtrudeGeometry
      5     0  suelta · casas · BufferGeometry
      4     0  suelta · - · PlaneGeometry
      4     0  suelta · aeropuerto · BufferGeometry
      2     0  suelta · root · BufferGeometry · hecha después
      1     0  suelta · - · ConeGeometry · lejos
      1     0  suelta · - · BoxGeometry
      1     0  suelta · - · PlaneGeometry · hecha después · lejos
      1     0  suelta · aeropuerto2 · BufferGeometry
      1     0  instanciada
      1     0  suelta · aeropuerto · PlaneGeometry · transparente · lejos
      1     0  suelta · aeropuerto2 · BufferGeometry · transparente
      1     0  suelta · - · BoxGeometry · transparente
      1     0  suelta · - · BufferGeometry · transparente
== autopista: 1175 llamadas (990 mallas pintadas)  [normal, sombras]
    143     0  suelta · - · BoxGeometry · lejos
    139     0  aparcados
    123     0  suelta · - · BufferGeometry · lejos
    110     0  suelta · - · PlaneGeometry · transparente · lejos
     93     0  trozo de ciudad
     48     0  instanciada por celda
     46     0  suelta · - · ExtrudeGeometry · lejos
     40     0  suelta · - · BoxGeometry · transparente · lejos
     36     0  suelta · - · BoxGeometry · hecha después · lejos
     33     0  suelta · - · CylinderGeometry · lejos
     27     0  suelta · - · PlaneGeometry · lejos
     17     0  suelta · obispado · PlaneGeometry · transparente · hecha después · lejos
     16     0  suelta · La Concepción · BufferGeometry · lejos
     15     0  suelta · - · SphereGeometry · lejos
     12     0  suelta · - · BufferGeometry · huesos · hecha después
     10     0  suelta · - · ConeGeometry · lejos
     10     0  suelta · inicio · BufferGeometry · lejos
      9     0  suelta · Estadio Francisco Peraza · BufferGeometry · lejos
      8     0  suelta · inicio · PlaneGeometry · lejos
      8     0  suelta · obispado · PlaneGeometry · hecha después · lejos
      7     0  suelta · - · CylinderGeometry · transparente · lejos
      4     0  suelta · aeropuerto · BufferGeometry · lejos
      3     0  juntada
      3     0  suelta · inicio · CylinderGeometry · lejos
      3     0  suelta · inicio · BoxGeometry · lejos
      3     0  suelta · Estadio Francisco Peraza · CylinderGeometry · lejos
      3     0  suelta · Pabellón Juan Ríos Tejera · BufferGeometry · lejos
      3     0  suelta · obispado · BufferGeometry · hecha después · lejos
      3     0  suelta · - · CircleGeometry · transparente · lejos
      3     0  suelta · inicio · PlaneGeometry · transparente · lejos
      2     0  instanciada
      2     0  suelta · Pabellón Juan Ríos Tejera · BoxGeometry · lejos
      1     0  suelta · - · CircleGeometry · lejos
      1     0  suelta · aeropuerto2 · BufferGeometry · lejos
      1     0  suelta · - · ShapeGeometry · lejos
      1     0  suelta · - · PlaneGeometry · hecha después · lejos
      1     0  suelta · aeropuerto2 · BufferGeometry · transparente · lejos
      1     0  suelta · - · RingGeometry · transparente · hecha después · lejos
      1     0  suelta · - · CylinderGeometry · transparente · hecha después · lejos
      1     0  suelta · - · BufferGeometry · transparente · lejos
SONDA DIBUJADAS OK
```

### 2. herramientas/sonda_edificios_dudosos.py — OK

```
  214. X -1121, Y -838 · 63 m² · la calle lo cruza y quedaría una tira · Camino la Cruz (residential, 6 m)
  215. X -1253, Y -318 · 63 m² · la calle lo cruza y quedaría una tira · Avenida Embajador Alberto de Armas (residential, 7.9 m)
  216. X 1440, Y 3643 · 63 m² · la calle lo cruza y quedaría una tira · Calle San Nicasio (residential, 7.9 m)
  217. X -332, Y 1038 · 62 m² · la calle lo cruza y quedaría una tira · Carretera de San Miguel de Geneto (secondary, 11.7 m)
  218. X 1405, Y 3842 · 62 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  219. X 1539, Y 3612 · 62 m² · la calle lo cruza y quedaría una tira · Calle San Nicasio (residential, 7.9 m)
  220. X 1578, Y 3726 · 62 m² · la calle lo cruza y quedaría una tira · Calle San Félix (residential, 8 m)
  221. X 11, Y -506 · 61 m² · la calle lo cruza y quedaría una tira · Callejón Mafasca (service, 5.2 m)
  222. X 74, Y -572 · 61 m² · la calle lo cruza y quedaría una tira · Calle Quintín Benito (residential, 7.2 m)
  223. X 1644, Y 4113 · 61 m² · la calle lo cruza y quedaría una tira · Calle Virgen de Los Dolores (residential, 7.9 m)
  224. X 1561, Y 3672 · 60 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  225. X 1655, Y 3598 · 59 m² · la calle lo cruza y quedaría una tira · Calle San Vicente (residential, 7.9 m)
  226. X -1239, Y -318 · 59 m² · la calle lo cruza y quedaría una tira · Avenida Embajador Alberto de Armas (residential, 7.9 m)
  227. X -664, Y -362 · 59 m² · la calle lo cruza y quedaría una tira · Calle de la Cordera (residential, 7.2 m)
  228. X 1394, Y 3855 · 59 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  229. X 1371, Y 3392 · 59 m² · la calle lo cruza y quedaría una tira · Avenida San Miguel de Chimisay (tertiary, 10.4 m)
  230. X 1549, Y 3602 · 58 m² · la calle lo cruza y quedaría una tira · Calle San Máximo (residential, 7.9 m)
  231. X -936, Y 1800 · 57 m² · la calle lo cruza y quedaría una tira · Camino San Francisco de Paula (secondary, 11.7 m)
  232. X 911, Y 583 · 57 m² · la calle lo cruza y quedaría una tira · Calle Miguel Hernández (residential, 7.9 m)
  233. X 34, Y -327 · 57 m² · la calle lo cruza y quedaría una tira · Calle Anchieta (residential, 7.2 m)
  234. X -4693, Y 0 · 57 m² · la calle lo cruza y quedaría una tira · Camino La Cañada (secondary, 11.7 m)
  235. X -1246, Y -404 · 57 m² · la calle lo cruza y quedaría una tira · Avenida Embajador Alberto de Armas (residential, 7.9 m)
  236. X -1085, Y -326 · 57 m² · la calle lo cruza y quedaría una tira · Avenida Lucas Vega (residential, 7.9 m)
  237. X 1520, Y 3722 · 57 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  238. X 1597, Y 3603 · 57 m² · la calle lo cruza y quedaría una tira · Calle San Sebastián (residential, 7.9 m)
  239. X -1277, Y -98 · 56 m² · la calle lo cruza y quedaría una tira · Calle Molinos de San Benito (residential, 8 m)
  240. X 813, Y 1901 · 56 m² · la calle lo cruza y quedaría una tira · (sin nombre) (residential, 7.9 m)
  241. X 921, Y 596 · 56 m² · la calle lo cruza y quedaría una tira · Calle Miguel Hernández (residential, 7.9 m)
  242. X 71, Y -556 · 56 m² · la calle lo cruza y quedaría una tira · Calle Leonardo Torriani (service, 5.2 m)
  243. X -1083, Y -927 · 56 m² · la calle lo cruza y quedaría una tira · Camino la Ermita (residential, 8 m)
  244. X 1486, Y 3750 · 56 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  245. X 909, Y 1652 · 55 m² · la calle lo cruza y quedaría una tira · Calle Osa Mayor (residential, 7.1 m)
  246. X 1264, Y 1378 · 55 m² · la calle lo cruza y quedaría una tira · Calle Córdoba (residential, 8 m)
  247. X -1119, Y 413 · 55 m² · la calle lo cruza y quedaría una tira · Camino el Vallado (residential, 7.9 m)
  248. X 1597, Y 3583 · 55 m² · la calle lo cruza y quedaría una tira · Calle San Sebastián (residential, 7.9 m)
  249. X 1897, Y 1232 · 54 m² · la calle lo cruza y quedaría una tira · Calle Fasnia (residential, 7.9 m)
  250. X -4700, Y 282 · 54 m² · la calle lo cruza y quedaría una tira · Pasaje Cabrera (residential, 8 m)
  251. X 2478, Y 2004 · 54 m² · la calle lo cruza y quedaría una tira · Carretera de Valle Tabares (secondary, 11.7 m)
  252. X 1412, Y 3848 · 54 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  253. X 1416, Y 3829 · 54 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  254. X 1424, Y 3835 · 54 m² · la calle lo cruza y quedaría una tira · Calle San Eugenio (residential, 7.9 m)
  255. X 418, Y 1039 · 52 m² · la calle lo cruza y quedaría una tira · Calle Aranjuez (residential, 7.9 m)
  256. X 2869, Y 2154 · 52 m² · la calle lo cruza y quedaría una tira · Avenida de los Menceyes (secondary, 11.7 m)
  257. X -1246, Y -304 · 52 m² · la calle lo cruza y quedaría una tira · Avenida Embajador Alberto de Armas (residential, 7.9 m)
  258. X -1097, Y -321 · 52 m² · la calle lo cruza y quedaría una tira · Avenida Lucas Vega (residential, 7.9 m)
  259. X 1468, Y 3783 · 52 m² · la calle lo cruza y quedaría una tira · Avenida San Miguel de Chimisay (tertiary, 10.4 m)
  260. X 1569, Y 3610 · 52 m² · la calle lo cruza y quedaría una tira · Calle San Eduardo (residential, 8 m)
  261. X 1556, Y 3772 · 52 m² · la calle lo cruza y quedaría una tira · Avenida Los Majuelos (tertiary, 10.4 m)
  262. X 1190, Y 1382 · 51 m² · la calle lo cruza y quedaría una tira · Calle Córdoba (residential, 8 m)
  263. X 2861, Y 2153 · 51 m² · la calle lo cruza y quedaría una tira · Calle Francisco Ramos (residential, 6.8 m)
  264. X -1242, Y -301 · 51 m² · la calle lo cruza y quedaría una tira · (sin nombre) (secondary, 11.7 m)
  265. X -1104, Y -316 · 51 m² · la calle lo cruza y quedaría una tira · Avenida Lucas Vega (residential, 7.9 m)
  266. X 1450, Y 3790 · 51 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  267. X 1448, Y 3685 · 51 m² · la calle lo cruza y quedaría una tira · Calle San Casiano (residential, 8 m)
  268. X 1466, Y 3714 · 51 m² · la calle lo cruza y quedaría una tira · Calle San Casiano (residential, 8 m)
  269. X 1617, Y 3557 · 51 m² · la calle lo cruza y quedaría una tira · Calle Santa Berta (residential, 7.9 m)
  270. X 2125, Y 1593 · 50 m² · la calle lo cruza y quedaría una tira · Calle Roque Agando (residential, 7 m)
  271. X 1441, Y 3801 · 50 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  272. X 1614, Y 3669 · 50 m² · la calle lo cruza y quedaría una tira · Calle San Sebastián (residential, 7.9 m)
SONDA EDIFICIOS DUDOSOS OK
```

### 3. prueba_recorte.py — OK

```
recortados 4447 de 6288 · siguen metidos ≥ 1 m: 40
   [-891, 143, 3.9, '']
   [1424, 3934, 3.3, '']
   [-4700, 91, 2.8, '']
   [-233, 768, 2.5, 'Intercambiador de La Laguna']
   [-3023, -50, 2.4, '']
   [-229, 1778, 2.3, '']
   [-880, 159, 2.2, '']
   [783, 3065, 2.1, '']
   [-1799, -757, 2, '']
   [-848, 72, 2, '']
   [2478, 2004, 2, '']
   [1696, 4075, 2, '']
   [541, 574, 1.9, '']
   [-843, 304, 1.9, '']
   [3344, 1960, 1.9, '']
   [-936, 1800, 1.8, '']
   [96, 197, 1.7, '']
   [-201, -703, 1.6, '']
   [-892, 1471, 1.6, '']
   [-963, 1808, 1.5, '']
   [-1698, 1220, 1.5, '']
   [859, 662, 1.5, '']
   [172, -767, 1.5, '']
   [-232, 33, 1.5, '']
   [-11, -253, 1.5, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

Fotos/archivos nuevos en `tests/shots/`: dudoso_01.jpg, dudoso_02.jpg, dudoso_03.jpg, dudoso_04.jpg, dudoso_05.jpg, dudoso_06.jpg, dudoso_07.jpg, dudoso_08.jpg, dudoso_09.jpg, dudoso_10.jpg, dudoso_11.jpg, dudoso_12.jpg, dudoso_13.jpg, dudoso_14.jpg, dudoso_15.jpg, dudoso_16.jpg, dudoso_17.jpg, dudoso_18.jpg, dudoso_19.jpg, dudoso_20.jpg, dudoso_21.jpg, dudoso_22.jpg, dudoso_23.jpg, dudoso_24.jpg, dudoso_25.jpg, dudoso_26.jpg, dudoso_27.jpg, dudoso_28.jpg, dudoso_29.jpg, dudoso_30.jpg, dudoso_31.jpg, dudoso_32.jpg, dudoso_33.jpg, dudoso_34.jpg, dudoso_35.jpg, dudoso_36.jpg, dudoso_37.jpg, dudoso_38.jpg, dudoso_39.jpg, dudoso_40.jpg, dudoso_41.jpg, dudoso_42.jpg, dudoso_43.jpg, dudoso_44.jpg, dudoso_45.jpg, dudoso_46.jpg, dudoso_47.jpg, dudoso_48.jpg, dudoso_49.jpg, dudoso_50.jpg, dudoso_51.jpg, dudoso_52.jpg, dudoso_53.jpg, dudoso_54.jpg, dudoso_55.jpg, dudoso_56.jpg, dudoso_57.jpg, dudoso_58.jpg, dudoso_59.jpg, dudoso_60.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_dibujadas.txt, sonda_edificios_dudosos.txt
