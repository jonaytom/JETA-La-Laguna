# Pruebas 1.4.51 — 2026-11-25 16:42 — 3/3 OK

Listas: tmp_r. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 364 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_campos.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_carriles_en.py 1563 1441 -24 1083 160 588 192 834 894 3043 -282 619` | **OK** | 0 s |
| 3 | `herramientas/foto_camara.py tacoronte,1985,1295,8,1990,1265 campo892,880,2480,10,900,2510 rot_finca,1563,1425,14,1563,1460 rot974,960,2470,16,974,2490 trinidad,-125,160,6,-110,175 concepcion,-391,-255,6,-391,-280 palmeras,1563,1400,8,1563,1440` | **OK** | 332 s |

## Detalle

### 1. herramientas/sonda_campos.py — OK

```
CAMPOS {"terrazas":112,"todas":112,"mayores":[[1969,1337,-158.7,16.8,9,180],[2350,1382,-217.2,13.6,8,161],[710,372,-48.2,12.3,5,116],[753,431,-51.2,12.2,9,165],[700,3685,-133.1,10.3,8,155],[488,477,-43.8,9.8,8,166],[1394,2801,-154.3,9.2,6,104],[907,623,-61.4,9.2,4,65]],"encogidos":20,"recortes":1014,"solares":1151,"carriles_heredados":91}
```

### 2. herramientas/sonda_carriles_en.py 1563 1441 -24 1083 160 588 192 834 894 3043 -282 619 — OK

```
GEMELOS 183 CONTINUIDAD 14 GRAFO 1723
PUNTO [1563.0, 1441.0] {"calles":[{"ri":3174,"nombre":"Avenida Las Palmeras","tipo":10,"sentido1":true,"ancho":3.2,"aparc":[],"carriles":1,"gemela":false,"dist":0.2},{"ri":3171,"nombre":"Rotonda","tipo":10,"sentido1":true,"ancho":6.4,"aparc":[1],"carriles":1,"gemela":false,"dist":4.3},{"ri":3255,"nombre":"Rotonda","tipo":10,"sentido1":true,"ancho":6.4,"aparc":[],"carriles":2,"gemela":true,"dist":5.4}],"trafico":"TypeError: Cannot create property 'park' on number '3381'"}
PUNTO [-24.0, 1083.0] {"calles":[{"ri":1265,"nombre":"Autopista del Norte","tipo":0,"sentido1":true,"ancho":13.4,"aparc":[],"carriles":3,"gemela":false,"dist":2.7},{"ri":2396,"nombre":"Autopista del Norte","tipo":0,"sentido1":true,"ancho":13.4,"aparc":[],"carriles":3,"gemela":false,"dist":9.8}],"trafico":"TypeError: Cannot create property 'park' on number '1826'"}
PUNTO [160.0, 588.0] {"calles":[{"ri":2481,"nombre":"Avenida Leonardo Torriani","tipo":5,"sentido1":true,"ancho":7,"aparc":[],"carriles":2,"gemela":true,"dist":0.6}],"trafico":"TypeError: Cannot create property 'park' on number '3036'"}
PUNTO [192.0, 834.0] {"calles":[{"ri":698,"nombre":"Avenida Lora Tamayo","tipo":5,"sentido1":true,"ancho":7,"aparc":[],"carriles":2,"gemela":false,"dist":0.6}],"trafico":"TypeError: Cannot create property 'park' on number '1223'"}
PUNTO [894.0, 3043.0] {"calles":[{"ri":1545,"nombre":"Autovía Interconexión Norte-Sur","tipo":0,"sentido1":true,"ancho":13.4,"aparc":[],"carriles":2,"gemela":false,"dist":3.4},{"ri":1716,"nombre":"Autovía Interconexión Norte-Sur","tipo":0,"sentido1":true,"ancho":13.4,"aparc":[],"carriles":2,"gemela":false,"dist":10}],"trafico":"TypeError: Cannot create property 'park' on number '2126'"}
PUNTO [-282.0, 619.0] {"calles":[{"ri":367,"nombre":"Avenida de La Trinidad","tipo":5,"sentido1":true,"ancho":6,"aparc":[],"carriles":2,"gemela":true,"dist":2.6}],"trafico":"TypeError: Cannot create property 'park' on number '709'"}
```

### 3. herramientas/foto_camara.py tacoronte,1985,1295,8,1990,1265 campo892,880,2480,10,900,2510 rot_finca,1563,1425,14,1563,1460 rot974,960,2470,16,974,2490 trinidad,-125,160,6,-110,175 concepcion,-391,-255,6,-391,-280 palmeras,1563,1400,8,1563,1440 — OK

```
foto tacoronte
foto campo892
foto rot_finca
foto rot974
foto trinidad
foto concepcion
foto palmeras
```

Fotos/archivos nuevos en `tests/shots/`: cam_campo892.jpg, cam_concepcion.jpg, cam_palmeras.jpg, cam_rot974.jpg, cam_rot_finca.jpg, cam_tacoronte.jpg, cam_trinidad.jpg
