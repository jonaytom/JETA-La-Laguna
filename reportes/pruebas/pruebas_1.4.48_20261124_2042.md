# Pruebas 1.4.48 — 2026-11-24 20:42 — 3/3 OK

Listas: plantas. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 387 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_plantas_finales.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_calles_mandan.py` | **OK** | 1 s |
| 3 | `herramientas/foto_calles_mandan.py gruesos` | **OK** | 349 s |

## Detalle

### 1. herramientas/sonda_plantas_finales.py — OK

```
PLANTAS juego 18213 datos 18247
```

### 2. herramientas/sonda_calles_mandan.py — OK

```
TOTAL {"invasiones": 75, "sinRecortar": 0, "quitados": 1, "estrechadas": 1170, "rendijas": 6913, "arrugas": 3990}
MEDIANERAS {"walls":67570,"buildings":12636}
CALLES MANDAN {"recortados":1730,"adelantados":4569,"sin_cambiar":11,"ejemplos":[[348,2088,2711,345],[2231,3152,1144,326],[-3538,-191,89,31],[-203,784,5817,738],[-484,1797,37,12],[-516,1798,36,7],[2163,4002,710,125],[-3302,-311,2058,164],[962,1566,42,10],[962,1581,42,6],[2163,4002,710,125]]}
ENDEREZADOS 3449 · SOPORTALES {"D":5.6,"edges":25,"shallow":3}
ZONA Afueras                            {"invasiones": 20, "estrechadas": 294, "rendijas": 1079, "arrugas": 1014}
ZONA Obispado                           {"estrechadas": 27, "rendijas": 771, "arrugas": 103}
ZONA Finca España                       {"invasiones": 3, "estrechadas": 42, "rendijas": 711, "arrugas": 88}
ZONA San Miguel de Chimisay             {"quitados": 1, "estrechadas": 59, "rendijas": 589, "arrugas": 110}
ZONA Casco Histórico                    {"invasiones": 4, "estrechadas": 49, "rendijas": 545, "arrugas": 142}
ZONA Barrio Nuevo                       {"estrechadas": 22, "rendijas": 526, "arrugas": 80}
ZONA San Benito                         {"invasiones": 2, "estrechadas": 32, "rendijas": 473, "arrugas": 112}
ZONA Las Torres                         {"invasiones": 6, "estrechadas": 42, "rendijas": 383, "arrugas": 83}
ZONA El Coromoto                        {"invasiones": 9, "estrechadas": 60, "rendijas": 264, "arrugas": 123}
ZONA Bocatuerta                         {"invasiones": 3, "estrechadas": 76, "rendijas": 141, "arrugas": 185}
ZONA El Pilar                           {"invasiones": 1, "estrechadas": 55, "rendijas": 96, "arrugas": 233}
ZONA San Honorato                       {"invasiones": 5, "estrechadas": 19, "rendijas": 161, "arrugas": 185}
ZONA Gracia                             {"invasiones": 1, "estrechadas": 24, "rendijas": 219, "arrugas": 83}
ZONA Las Gavias                         {"invasiones": 2, "estrechadas": 30, "rendijas": 178, "arrugas": 60}
ZONA Cercado Mesa                       {"invasiones": 2, "estrechadas": 26, "rendijas": 44, "arrugas": 189}
ZONA La Verdellada                      {"invasiones": 3, "estrechadas": 32, "rendijas": 117, "arrugas": 105}
ZONA Las Chumberas                      {"estrechadas": 31, "rendijas": 47, "arrugas": 152}
ZONA San Roque                          {"estrechadas": 16, "rendijas": 70, "arrugas": 131}
ZONA Barrio Nuevo de Ofra               {"estrechadas": 17, "rendijas": 56, "arrugas": 134}
ZONA Los Majuelos                       {"estrechadas": 49, "rendijas": 58, "arrugas": 94}
ZONA La Hornera                         {"estrechadas": 19, "rendijas": 33, "arrugas": 138}
ZONA Villa Hilaria                      {"estrechadas": 13, "rendijas": 112, "arrugas": 53}
ZONA Las Mantecas                       {"invasiones": 1, "estrechadas": 30, "rendijas": 71, "arrugas": 62}
ZONA San Bartolomé de Geneto            {"invasiones": 12, "estrechadas": 27, "rendijas": 24, "arrugas": 83}
ZONA Guajara                            {"invasiones": 1, "estrechadas": 27, "rendijas": 17, "arrugas": 98}
ZONA MacKay                             {"estrechadas": 24, "rendijas": 29, "arrugas": 76}
ZONA La Higuerita                       {"estrechadas": 6, "rendijas": 71, "arrugas": 31}
ZONA La Manzanilla                      {"estrechadas": 22, "rendijas": 28, "arrugas": 43}
SONDA CALLES MANDAN OK
```

### 3. herramientas/foto_calles_mandan.py gruesos — OK

```
FOTO CALLES MANDAN OK gruesos 12
```

Fotos/archivos nuevos en `tests/shots/`: mandan_barcelona_arriba_gruesos.jpg, mandan_barcelona_gruesos.jpg, mandan_bencomo_arriba_gruesos.jpg, mandan_bencomo_gruesos.jpg, mandan_beneharo_arriba_gruesos.jpg, mandan_beneharo_gruesos.jpg, mandan_rendija_casco2_gruesos.jpg, mandan_rendija_casco_arriba_gruesos.jpg, mandan_rendija_casco_gruesos.jpg, mandan_trinidad_arriba_gruesos.jpg, mandan_trinidad_gruesos.jpg, mandan_trinidad_soportales_gruesos.jpg, plantas_finales.json, sonda_calles_mandan.json, sonda_calles_mandan.txt
