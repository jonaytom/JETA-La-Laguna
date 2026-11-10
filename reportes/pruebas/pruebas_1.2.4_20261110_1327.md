# Pruebas 1.2.4 — 2026-11-10 13:27 — 1/1 OK

Listas: maleante. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 30 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_maleante_gpu.py` | **OK** | 9 s |

## Detalle

### 1. herramientas/sonda_maleante_gpu.py — OK

```
MALEANTE {"nombre": "calentar", "mediana_ms": 19.2, "peor_ms": 269.2, "peor_fotograma": 0, "llamada_ms": 0, "programas_nuevos": 5, "geometrias_nuevas": 199, "texturas_nuevas": 37, "primeros": [269.2, 21.1, 22, 19.5, 19.6, 19.6]}
MALEANTE {"nombre": "base", "mediana_ms": 19, "peor_ms": 22.1, "peor_fotograma": 32, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 1, "primeros": [20.2, 19.5, 19.5, 19.1, 20, 19.9]}
MALEANTE {"nombre": "aparece", "mediana_ms": 19.1, "peor_ms": 21.4, "peor_fotograma": 54, "llamada_ms": 0.2, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 0, "primeros": [20.3, 19.4, 19.9, 19, 19.6, 19.2]}
MALEANTE {"nombre": "huye", "mediana_ms": 19.1, "peor_ms": 22.9, "peor_fotograma": 32, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 0, "primeros": [21.1, 20.2, 20.6, 19.3, 19.9, 19.9]}
MALEANTE {"nombre": "se escapa", "mediana_ms": 19.2, "peor_ms": 23.8, "peor_fotograma": 0, "llamada_ms": 0, "programas_nuevos": 0, "geometrias_nuevas": 0, "texturas_nuevas": 2, "primeros": [23.8, 20.1, 20.7, 19.2, 19.2, 18.4]}
MALEANTE {"nombre": "pelea 2D", "mediana_ms": 18.1, "peor_ms": 19.2, "peor_fotograma": 17, "llamada_ms": 688.8, "programas_nuevos": 0, "geometrias_nuevas": 696, "texturas_nuevas": 91, "primeros": [18.7, 17.2, 16.5, 17, 17.7, 17.4]}
SONDA MALEANTE OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_maleante.txt
