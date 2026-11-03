# Pruebas 1.0.3 — 2026-11-03 18:40 — 1/1 OK

Listas: catastro. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 67 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/comparar_catastro.py` | **OK** | 45 s |

## Detalle

### 1. herramientas/comparar_catastro.py — OK

```
comparado en 40 s
# Huecos del mapa comparados con el Catastro
Edificios del Catastro en la zona del mapa (≥ 25 m²): 17966 · ya en el juego: 12753 · **faltan: 5213** (1022680 m² de planta) · de los que faltan, con más del 30 % sobre una calzada del juego: 37 (calle ensanchada o mal trazada ahí).
Muros y vallas del OSM (`data/barreras.json`): wall 1278 (66.5 km), fence 209 (27.6 km), retaining_wall 39 (1.8 km), guard_rail 1 (0.1 km), hedge 2 (0.0 km), handrail 1 (0.0 km)
## Sitios que dijo Jonay
- Callejón Montaraz (X -896, Y -348): faltan 0 edificios, 0 m², sobre calzada 0; muros o vallas del OSM a menos de 60 m: 0
- Callejón Montaraz (2) (X -923, Y -322): faltan 0 edificios, 0 m², sobre calzada 0; muros o vallas del OSM a menos de 60 m: 0
- Junto al Teatro Leal (X -301, Y -262): faltan 0 edificios, 0 m², sobre calzada 0; muros o vallas del OSM a menos de 60 m: 1
- Patio Av. Trinidad (X -191, Y 366): faltan 11 edificios, 2656 m², sobre calzada 0; muros o vallas del OSM a menos de 60 m: 0
en total 45 s
SONDA CATASTRO OK
```
