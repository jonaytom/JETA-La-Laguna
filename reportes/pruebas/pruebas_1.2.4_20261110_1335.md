# Pruebas 1.2.4 — 2026-11-10 13:35 — 1/1 OK

Listas: maleante. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 45 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_maleante_gpu.py` | **OK** | 23 s |

## Detalle

### 1. herramientas/sonda_maleante_gpu.py — OK

```
MALEANTE {"nombre": "calentar", "mediana_ms": 20.3, "peor_ms": 278.4, "peor_fotograma": 0, "llamada_ms": 0, "programas_nuevos": 5, "geometrias_nuevas": 217, "texturas_nuevas": 38, "primeros": [278.4, 21.1, 22.3, 20.4, 19.6, 19.8], "desglose": null}
MALEANTE {"nombre": "base", "mediana_ms": 20.2, "peor_ms": 21.7, "peor_fotograma": 50, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 0, "primeros": [21, 20.1, 21.3, 19.8, 20.5, 19.8], "desglose": null}
MALEANTE {"nombre": "aparece", "mediana_ms": 20.6, "peor_ms": 23, "peor_fotograma": 11, "llamada_ms": 0.2, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 0, "primeros": [22.4, 21.3, 20.3, 19.9, 20.5, 19.6], "desglose": null}
MALEANTE {"nombre": "pelea 2D (con el maleante)", "mediana_ms": 18.4, "peor_ms": 20.2, "peor_fotograma": 19, "llamada_ms": 55.5, "programas_nuevos": 0, "geometrias_nuevas": 1, "texturas_nuevas": 0, "primeros": [18.9, 17.5, 17.4, 17.6, 18.4, 18.1], "desglose": {"render": 36.2, "nRender": 4, "getImg": 3.5, "putImg": 0.2, "draw": 0.5, "lienzos": 4, "geometrias_en_la_llamada": 0}}
MALEANTE {"nombre": "huye", "mediana_ms": 20.4, "peor_ms": 24.1, "peor_fotograma": 57, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 12, "texturas_nuevas": 0, "primeros": [22, 20.7, 21.6, 20.9, 21.1, 21], "desglose": null}
MALEANTE {"nombre": "se escapa", "mediana_ms": 21.3, "peor_ms": 30.5, "peor_fotograma": 54, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 4, "texturas_nuevas": 2, "primeros": [20.9, 19.4, 20.3, 20.3, 21.1, 20.7], "desglose": null}
MALEANTE {"nombre": "otra pelea 2D", "mediana_ms": 18.7, "peor_ms": 19.5, "peor_fotograma": 16, "llamada_ms": 137.5, "programas_nuevos": 0, "geometrias_nuevas": 2, "texturas_nuevas": 0, "primeros": [18.4, 17.8, 17.7, 17.9, 18.2, 18.3], "desglose": {"render": 37.5, "nRender": 4, "getImg": 83.4, "putImg": 0.2, "draw": 0.5, "lienzos": 36, "geometrias_en_la_llamada": 2}}
SONDA MALEANTE OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_maleante.txt
