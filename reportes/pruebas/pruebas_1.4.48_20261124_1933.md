# Pruebas 1.4.48 — 2026-11-24 19:33 — 3/3 OK

Listas: mandan2. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 264 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_calles_mandan.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_quitados.py` | **OK** | 0 s |
| 3 | `herramientas/foto_calles_mandan.py norma` | **OK** | 238 s |

## Detalle

### 1. herramientas/sonda_calles_mandan.py — OK

```
TOTAL {"invasiones": 75, "sinRecortar": 0, "quitados": 2, "estrechadas": 547, "rendijas": 1232, "arrugas": 3977}
MEDIANERAS {"walls":9596,"buildings":4118}
CALLES MANDAN {"recortados":441,"adelantados":1863,"sin_cambiar":4,"ejemplos":[[2231,3152,1144,326],[131,-422,50,16],[-3538,-191,89,31],[-192,800,7138,738]]}
ENDEREZADOS 3449 · SOPORTALES {"D":5.6,"edges":12}
ZONA Afueras                            {"invasiones": 20, "estrechadas": 125, "rendijas": 194, "arrugas": 1018}
ZONA San Miguel de Chimisay             {"quitados": 2, "estrechadas": 11, "rendijas": 485, "arrugas": 107}
ZONA Casco Histórico                    {"invasiones": 4, "estrechadas": 23, "rendijas": 167, "arrugas": 143}
ZONA El Coromoto                        {"invasiones": 9, "estrechadas": 49, "rendijas": 86, "arrugas": 123}
ZONA San Benito                         {"invasiones": 2, "estrechadas": 31, "rendijas": 116, "arrugas": 111}
ZONA El Pilar                           {"invasiones": 1, "estrechadas": 18, "rendijas": 4, "arrugas": 232}
ZONA San Honorato                       {"invasiones": 5, "estrechadas": 27, "rendijas": 18, "arrugas": 182}
ZONA Cercado Mesa                       {"invasiones": 2, "estrechadas": 18, "rendijas": 3, "arrugas": 187}
ZONA Bocatuerta                         {"invasiones": 3, "estrechadas": 5, "rendijas": 11, "arrugas": 186}
ZONA Las Chumberas                      {"estrechadas": 1, "rendijas": 7, "arrugas": 150}
ZONA Obispado                           {"estrechadas": 38, "rendijas": 15, "arrugas": 102}
ZONA Barrio Nuevo de Ofra               {"estrechadas": 7, "rendijas": 3, "arrugas": 133}
ZONA La Hornera                         {"estrechadas": 3, "rendijas": 1, "arrugas": 139}
ZONA Finca España                       {"invasiones": 3, "estrechadas": 23, "rendijas": 25, "arrugas": 88}
ZONA San Roque                          {"estrechadas": 1, "rendijas": 6, "arrugas": 131}
ZONA San Bartolomé de Geneto            {"invasiones": 12, "estrechadas": 27, "rendijas": 6, "arrugas": 82}
ZONA Los Majuelos                       {"estrechadas": 17, "rendijas": 12, "arrugas": 89}
ZONA La Verdellada                      {"invasiones": 3, "estrechadas": 6, "rendijas": 2, "arrugas": 105}
ZONA Las Torres                         {"invasiones": 6, "estrechadas": 12, "rendijas": 15, "arrugas": 83}
ZONA Guajara                            {"invasiones": 1, "estrechadas": 9, "rendijas": 8, "arrugas": 98}
ZONA Gracia                             {"invasiones": 1, "estrechadas": 13, "rendijas": 3, "arrugas": 83}
ZONA Barrio Nuevo                       {"estrechadas": 8, "rendijas": 5, "arrugas": 80}
ZONA Las Mantecas                       {"invasiones": 1, "estrechadas": 15, "rendijas": 3, "arrugas": 64}
ZONA MacKay                             {"estrechadas": 6, "rendijas": 3, "arrugas": 74}
ZONA Las Gavias                         {"invasiones": 2, "estrechadas": 7, "rendijas": 10, "arrugas": 60}
ZONA La Manzanilla                      {"estrechadas": 22, "rendijas": 11, "arrugas": 43}
ZONA Villa Hilaria                      {"estrechadas": 13, "rendijas": 6, "arrugas": 53}
ZONA La Higuerita                       {"estrechadas": 12, "rendijas": 7, "arrugas": 31}
SONDA CALLES MANDAN OK
```

### 2. herramientas/sonda_quitados.py — OK

```
QUITADOS 7 {'recorte': 7}
GRANDES (>50 m²) 0 []
```

### 3. herramientas/foto_calles_mandan.py norma — OK

```
FOTO CALLES MANDAN OK norma 12
```

Fotos/archivos nuevos en `tests/shots/`: mandan_barcelona_arriba_norma.jpg, mandan_barcelona_norma.jpg, mandan_bencomo_arriba_norma.jpg, mandan_bencomo_norma.jpg, mandan_beneharo_arriba_norma.jpg, mandan_beneharo_norma.jpg, mandan_rendija_casco2_norma.jpg, mandan_rendija_casco_arriba_norma.jpg, mandan_rendija_casco_norma.jpg, mandan_trinidad_arriba_norma.jpg, mandan_trinidad_norma.jpg, mandan_trinidad_soportales_norma.jpg, sonda_calles_mandan.json, sonda_calles_mandan.txt
