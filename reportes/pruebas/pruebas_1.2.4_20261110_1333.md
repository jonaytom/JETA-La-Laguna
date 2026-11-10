# Pruebas 1.2.4 — 2026-11-10 13:33 — 1/1 OK

Listas: maleante. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 44 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_maleante_gpu.py` | **OK** | 23 s |

## Detalle

### 1. herramientas/sonda_maleante_gpu.py — OK

```
MALEANTE {"nombre": "calentar", "mediana_ms": 19, "peor_ms": 269.6, "peor_fotograma": 0, "llamada_ms": 0, "programas_nuevos": 5, "geometrias_nuevas": 217, "texturas_nuevas": 35, "primeros": [269.6, 21.4, 21.6, 19.6, 20.3, 19.7], "desglose": null}
MALEANTE {"nombre": "base", "mediana_ms": 18.7, "peor_ms": 21.2, "peor_fotograma": 18, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 1, "primeros": [19.8, 18.1, 19.3, 18.6, 18.6, 18.8], "desglose": null}
MALEANTE {"nombre": "aparece", "mediana_ms": 18.9, "peor_ms": 20.3, "peor_fotograma": 29, "llamada_ms": 1.2, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 0, "primeros": [19, 18.9, 19.4, 18.6, 19, 18.5], "desglose": null}
MALEANTE {"nombre": "pelea 2D (con el maleante)", "mediana_ms": 18.3, "peor_ms": 20.8, "peor_fotograma": 6, "llamada_ms": 487.5, "programas_nuevos": 0, "geometrias_nuevas": 493, "texturas_nuevas": 75, "primeros": [17.2, 15.6, 17.7, 18.4, 18.7, 18.8], "desglose": {"render": 55.9, "nRender": 4, "getImg": 417.6, "putImg": 0.1, "draw": 0.5, "lienzos": 4, "geometrias_en_la_llamada": 493}}
MALEANTE {"nombre": "huye", "mediana_ms": 19.8, "peor_ms": 21.9, "peor_fotograma": 0, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 0, "primeros": [21.9, 20.4, 21.3, 20.1, 19.8, 20.6], "desglose": null}
MALEANTE {"nombre": "se escapa", "mediana_ms": 19.2, "peor_ms": 22.4, "peor_fotograma": 0, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 1, "primeros": [22.4, 18.6, 18, 17.9, 18.5, 18.4], "desglose": null}
MALEANTE {"nombre": "otra pelea 2D", "mediana_ms": 17.8, "peor_ms": 18.9, "peor_fotograma": 20, "llamada_ms": 138.2, "programas_nuevos": 0, "geometrias_nuevas": 58, "texturas_nuevas": 2, "primeros": [17.6, 16.9, 17.4, 17.8, 17.5, 17.7], "desglose": {"render": 38, "nRender": 4, "getImg": 84.2, "putImg": 0.7, "draw": 0.6, "lienzos": 36, "geometrias_en_la_llamada": 56}}
SONDA MALEANTE OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_maleante.txt
