# Pruebas 1.2.4 — 2026-11-10 13:31 — 1/1 OK

Listas: maleante. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 30 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_maleante_gpu.py` | **OK** | 9 s |

## Detalle

### 1. herramientas/sonda_maleante_gpu.py — OK

```
MALEANTE {"nombre": "calentar", "mediana_ms": 18.9, "peor_ms": 274.5, "peor_fotograma": 0, "llamada_ms": 0, "programas_nuevos": 5, "geometrias_nuevas": 230, "texturas_nuevas": 35, "primeros": [274.5, 19.8, 21.9, 19.8, 19.8, 18.8], "desglose": null}
MALEANTE {"nombre": "base", "mediana_ms": 18.6, "peor_ms": 21.5, "peor_fotograma": 17, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 1, "primeros": [19.8, 18.4, 19.8, 18.7, 19.4, 18.6], "desglose": null}
MALEANTE {"nombre": "aparece", "mediana_ms": 18.5, "peor_ms": 21.1, "peor_fotograma": 33, "llamada_ms": 0.3, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 0, "primeros": [19.8, 18.4, 19.3, 18.2, 19.7, 18.7], "desglose": null}
MALEANTE {"nombre": "huye", "mediana_ms": 18.3, "peor_ms": 23.5, "peor_fotograma": 0, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 1, "primeros": [23.5, 18.9, 19.3, 19.1, 18.9, 19.4], "desglose": null}
MALEANTE {"nombre": "se escapa", "mediana_ms": 18.3, "peor_ms": 23.5, "peor_fotograma": 34, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 1, "primeros": [22.4, 17.5, 18.7, 18.1, 18.4, 18.1], "desglose": null}
MALEANTE {"nombre": "pelea 2D", "mediana_ms": 15.9, "peor_ms": 16.9, "peor_fotograma": 0, "llamada_ms": 865.8, "programas_nuevos": 0, "geometrias_nuevas": 857, "texturas_nuevas": 130, "primeros": [16.9, 16.3, 16.8, 15.9, 15.8, 16], "desglose": {"render": 689, "nRender": 4, "getImg": 142.3, "putImg": 0.9, "draw": 0.7, "lienzos": 68, "geometrias_en_la_llamada": 857}}
MALEANTE {"nombre": "otra pelea 2D", "mediana_ms": 16.3, "peor_ms": 17.3, "peor_fotograma": 0, "llamada_ms": 57.9, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 0, "primeros": [17.3, 16.9, 16.8, 17, 16.8, 16.9], "desglose": {"render": 42.1, "nRender": 4, "getImg": 8.6, "putImg": 0.2, "draw": 0.6, "lienzos": 4, "geometrias_en_la_llamada": 0}}
SONDA MALEANTE OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_maleante.txt
