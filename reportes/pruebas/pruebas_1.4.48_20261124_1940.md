# Pruebas 1.4.48 — 2026-11-24 19:40 — 3/3 OK

Listas: mandan2. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 345 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_calles_mandan.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_quitados.py` | **OK** | 0 s |
| 3 | `herramientas/foto_calles_mandan.py hueco` | **OK** | 319 s |

## Detalle

### 1. herramientas/sonda_calles_mandan.py — OK

```
TOTAL {"invasiones": 75, "sinRecortar": 0, "quitados": 1, "estrechadas": 1183, "rendijas": 1130, "arrugas": 3992}
MEDIANERAS {"walls":9438,"buildings":4023}
CALLES MANDAN {"recortados":676,"adelantados":2211,"sin_cambiar":4,"ejemplos":[[348,2088,2711,345],[2231,3152,1144,326],[-3538,-191,89,31],[-203,784,5817,738]]}
ENDEREZADOS 3449 · SOPORTALES {"D":5.6,"edges":12}
ZONA Afueras                            {"invasiones": 20, "estrechadas": 294, "rendijas": 193, "arrugas": 1016}
ZONA San Miguel de Chimisay             {"quitados": 1, "estrechadas": 59, "rendijas": 372, "arrugas": 110}
ZONA Casco Histórico                    {"invasiones": 4, "estrechadas": 50, "rendijas": 166, "arrugas": 142}
ZONA El Pilar                           {"invasiones": 1, "estrechadas": 55, "rendijas": 4, "arrugas": 234}
ZONA El Coromoto                        {"invasiones": 9, "estrechadas": 60, "rendijas": 86, "arrugas": 123}
ZONA Bocatuerta                         {"invasiones": 3, "estrechadas": 76, "rendijas": 10, "arrugas": 184}
ZONA San Benito                         {"invasiones": 2, "estrechadas": 32, "rendijas": 123, "arrugas": 110}
ZONA San Honorato                       {"invasiones": 5, "estrechadas": 19, "rendijas": 18, "arrugas": 185}
ZONA Cercado Mesa                       {"invasiones": 2, "estrechadas": 26, "rendijas": 3, "arrugas": 189}
ZONA Las Chumberas                      {"estrechadas": 31, "rendijas": 7, "arrugas": 152}
ZONA Los Majuelos                       {"estrechadas": 50, "rendijas": 19, "arrugas": 94}
ZONA La Hornera                         {"estrechadas": 20, "rendijas": 1, "arrugas": 139}
ZONA Finca España                       {"invasiones": 3, "estrechadas": 42, "rendijas": 25, "arrugas": 88}
ZONA Barrio Nuevo de Ofra               {"estrechadas": 18, "rendijas": 3, "arrugas": 134}
ZONA San Roque                          {"estrechadas": 16, "rendijas": 6, "arrugas": 131}
ZONA Las Torres                         {"invasiones": 6, "estrechadas": 43, "rendijas": 15, "arrugas": 84}
ZONA Obispado                           {"estrechadas": 28, "rendijas": 15, "arrugas": 103}
ZONA La Verdellada                      {"invasiones": 3, "estrechadas": 32, "rendijas": 2, "arrugas": 105}
ZONA Guajara                            {"invasiones": 1, "estrechadas": 27, "rendijas": 8, "arrugas": 98}
ZONA San Bartolomé de Geneto            {"invasiones": 12, "estrechadas": 27, "rendijas": 5, "arrugas": 83}
ZONA Gracia                             {"invasiones": 1, "estrechadas": 25, "rendijas": 3, "arrugas": 83}
ZONA Barrio Nuevo                       {"estrechadas": 26, "rendijas": 5, "arrugas": 80}
ZONA Las Gavias                         {"invasiones": 2, "estrechadas": 31, "rendijas": 10, "arrugas": 60}
ZONA MacKay                             {"estrechadas": 24, "rendijas": 3, "arrugas": 76}
ZONA Las Mantecas                       {"invasiones": 1, "estrechadas": 31, "rendijas": 3, "arrugas": 62}
ZONA La Manzanilla                      {"estrechadas": 22, "rendijas": 11, "arrugas": 43}
ZONA Villa Hilaria                      {"estrechadas": 13, "rendijas": 6, "arrugas": 53}
ZONA La Higuerita                       {"estrechadas": 6, "rendijas": 8, "arrugas": 31}
SONDA CALLES MANDAN OK
```

### 2. herramientas/sonda_quitados.py — OK

```
QUITADOS 6 {'recorte': 6}
GRANDES (>50 m²) 1 [[1601, 3473, 69, 'recorte']]
```

### 3. herramientas/foto_calles_mandan.py hueco — OK

```
FOTO CALLES MANDAN OK hueco 12
```

Fotos/archivos nuevos en `tests/shots/`: mandan_barcelona_arriba_hueco.jpg, mandan_barcelona_hueco.jpg, mandan_bencomo_arriba_hueco.jpg, mandan_bencomo_hueco.jpg, mandan_beneharo_arriba_hueco.jpg, mandan_beneharo_hueco.jpg, mandan_rendija_casco2_hueco.jpg, mandan_rendija_casco_arriba_hueco.jpg, mandan_rendija_casco_hueco.jpg, mandan_trinidad_arriba_hueco.jpg, mandan_trinidad_hueco.jpg, mandan_trinidad_soportales_hueco.jpg, sonda_calles_mandan.json, sonda_calles_mandan.txt
