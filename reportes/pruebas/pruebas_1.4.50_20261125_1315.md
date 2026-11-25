# Pruebas 1.4.50 — 2026-11-25 13:15 — 3/3 OK

Listas: tmp_rev. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 274 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_carriles_en.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_autopista_puntos.py -1413 -77 -1199 -17 -24 1083 109 1266` | **OK** | 0 s |
| 3 | `herramientas/foto_camara.py campo_geneto,1940,1250,25,1990,1300 campo_208,180,1090,18,215,1120 contenedores,-760,-370,9,-770,-386 farola_puente,95,1250,10,109,1266 trinidad,-282,600,8,-282,640 menceyes,176,630,7,176,670 autopista,-1413,-100,8,-1413,-50` | **OK** | 245 s |

## Detalle

### 1. herramientas/sonda_carriles_en.py — OK

```
GEMELOS 275 CONTINUIDAD 13 GRAFO 1637
PUNTO [-282, 619] {"calles":[{"ri":369,"nombre":"Avenida de La Trinidad","tipo":5,"sentido1":true,"ancho":6,"aparc":[-1],"carriles":1,"gemela":true,"dist":2.6}],"trafico":"TypeError: Cannot create property 'park' on number '709'"}
PUNTO [-107, 78] {"calles":[{"ri":370,"nombre":"Avenida de La Trinidad","tipo":5,"sentido1":true,"ancho":6,"aparc":[],"carriles":2,"gemela":true,"dist":3}],"trafico":"TypeError: Cannot create property 'park' on number '711'"}
PUNTO [176, 655] {"calles":[{"ri":1397,"nombre":"Avenida Leonardo Torriani","tipo":5,"sentido1":true,"ancho":7,"aparc":[],"carriles":2,"gemela":true,"dist":1.8}],"trafico":"TypeError: Cannot create property 'park' on number '1966'"}
PUNTO [160, 588] {"calles":[{"ri":2497,"nombre":"Avenida Leonardo Torriani","tipo":5,"sentido1":true,"ancho":7,"aparc":[],"carriles":2,"gemela":true,"dist":0.6}],"trafico":"TypeError: Cannot create property 'park' on number '3036'"}
PUNTO [-731, -140] {"calles":[{"ri":2270,"nombre":"Calle San Antonio","tipo":10,"sentido1":true,"ancho":3.2,"aparc":[],"carriles":1,"gemela":false,"dist":1.5}],"trafico":"TypeError: Cannot create property 'park' on number '2669'"}
PUNTO [-782, -436] {"calles":[{"ri":482,"nombre":"Calle Teobaldo Power","tipo":10,"sentido1":true,"ancho":3.2,"aparc":[],"carriles":1,"gemela":false,"dist":1.7}],"trafico":"TypeError: Cannot create property 'park' on number '879'"}
PUNTO [-24, 1083] {"calles":[{"ri":1268,"nombre":"Autopista del Norte","tipo":0,"sentido1":true,"ancho":13.4,"aparc":[],"carriles":3,"gemela":false,"dist":2.7},{"ri":2412,"nombre":"Autopista del Norte","tipo":0,"sentido1":true,"ancho":13.4,"aparc":[],"carriles":3,"gemela":false,"dist":9.8}],"trafico":"TypeError: Cannot create property 'park' on number '1826'"}
```

### 2. herramientas/sonda_autopista_puntos.py -1413 -77 -1199 -17 -24 1083 109 1266 — OK

```
TERRENO_REBAJADO 340
PUNTO [-1413.0, -77.0] {"calles":[{"ri":2451,"n":"Autopista del Norte","t":0,"f":1,"w":13.4,"dep":true,"raise":false,"cls":"asphaltLines","carr":3,"d":4.8}],"med":2,"choques":[],"asfalto":17.39,"terreno":17.06,"corte":false}
PUNTO [-1199.0, -17.0] {"calles":[{"ri":2451,"n":"Autopista del Norte","t":0,"f":1,"w":13.4,"dep":true,"raise":false,"cls":"asphaltLines","carr":3,"d":1.7}],"med":2,"choques":[],"asfalto":18.3,"terreno":18.16,"corte":false}
PUNTO [-24.0, 1083.0] {"calles":[{"ri":1268,"n":"Autopista del Norte","t":0,"f":1,"w":13.4,"dep":true,"raise":false,"cls":"asphaltLines","carr":3,"d":2.7}],"med":3,"choques":[],"asfalto":-29.54,"terreno":-30.44,"corte":false}
PUNTO [109.0, 1266.0] {"calles":[{"ri":676,"n":"","t":5,"f":2,"w":11.7,"dep":false,"raise":true,"cls":"asphaltLines","carr":2,"d":0.8},{"ri":447,"n":"","t":5,"f":1,"w":8,"dep":false,"raise":false,"cls":"asphaltLines","carr":1,"d":1.6}],"med":4,"choques":[],"asfalto":-30.96,"terreno":-36.9,"corte":false}
```

### 3. herramientas/foto_camara.py campo_geneto,1940,1250,25,1990,1300 campo_208,180,1090,18,215,1120 contenedores,-760,-370,9,-770,-386 farola_puente,95,1250,10,109,1266 trinidad,-282,600,8,-282,640 menceyes,176,630,7,176,670 autopista,-1413,-100,8,-1413,-50 — OK

```
foto campo_geneto
foto campo_208
foto contenedores
foto farola_puente
foto trinidad
foto menceyes
foto autopista
```

Fotos/archivos nuevos en `tests/shots/`: cam_autopista.jpg, cam_campo_208.jpg, cam_campo_geneto.jpg, cam_contenedores.jpg, cam_farola_puente.jpg, cam_menceyes.jpg, cam_trinidad.jpg
