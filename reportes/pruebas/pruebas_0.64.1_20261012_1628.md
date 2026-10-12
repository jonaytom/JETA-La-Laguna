# Pruebas 0.64.1 — 2026-10-12 16:28 — 5/5 OK

En el PC de Jonay (`scripts/PRUEBAS.bat`), 661 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_panel_controles.py` | **OK** | 141 s |
| 2 | `prueba_pelea_especiales.py` | **OK** | 145 s |
| 3 | `prueba_pelea_atras.py` | **OK** | 137 s |
| 4 | `herramientas/sonda_guia.py 284 112` | **OK** | 117 s |
| 5 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 119 s |

## Detalle

### 1. prueba_panel_controles.py — OK

```
shot ms 44.80000000074506
{"frame":556,"calls":4491,"triangles":6547373,"points":0,"lines":1728} calls:4491
true
{"ph":"ready","b":"","pt":125}
{"ph":"intro","b":"FIGHT!","pt":104}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

Fotos/archivos nuevos en `tests/shots/`: fightgo.png, ready.png

### 2. prueba_pelea_especiales.py — OK

```
shot ms 2.699999999254942
{"frame":564,"calls":4572,"triangles":6572582,"points":0,"lines":1944} calls:4572
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":15.399999999999997,"gofio":true}
teide OK {"walk":30.399999999999995,"gofio":true,"teide":true}
gancho OK {"walk":30.399999999999995,"gofio":true,"teide":true,"combo":true,"gancho":true}
pastor OK {"walk":30.399999999999995,"gofio":true,"teide":true,"combo":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 3. prueba_pelea_atras.py — OK

```
shot ms 82.09999999776483
{"frame":560,"calls":4404,"triangles":6508968,"points":0,"lines":1512} calls:4404
{"sep":165,"fase":"fight"}
sin ataque, atrÃ¡s 1 s: se mueve 76.7 px
{"bloqueado":true,"vida":95}
snap pelea_tamano
```

Fotos/archivos nuevos en `tests/shots/`: pelea_tamano.jpg

### 4. herramientas/sonda_guia.py 284 112 — OK

```
shot ms 2.800000000745058
{"frame":560,"calls":4422,"triangles":6549757,"points":0,"lines":1944} calls:4422
{"found":true,"vis":true,"gy":-13.86,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":1}
```

Fotos/archivos nuevos en `tests/shots/`: pelea_tamano.jpg, sonda_guia.jpg

### 5. herramientas/sonda_guia.py 284 112 coche — OK

```
shot ms 1.8999999985098839
{"frame":562,"calls":4660,"triangles":6617308,"points":0,"lines":1728} calls:4660
{"found":true,"vis":false,"gy":-13.86,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":1}
```

Fotos/archivos nuevos en `tests/shots/`: sonda_guia.jpg
