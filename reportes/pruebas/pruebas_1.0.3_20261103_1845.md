# Pruebas 1.0.3 — 2026-11-03 18:45 — 1/1 OK

Listas: catastro. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 67 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/comparar_catastro.py` | **OK** | 44 s |

## Detalle

### 1. herramientas/comparar_catastro.py — OK

```
comparado en 39 s
# Huecos del mapa comparados con el Catastro
Edificios del Catastro en la zona del mapa (≥ 25 m²): 17966 · enteros en el juego: 10599 · **con al menos 30 m² sin edificio en el juego: 7367** (1310623 m² de planta sin cubrir) · de los que faltan, con más del 30 % sobre una calzada del juego: 218 (calle ensanchada o mal trazada ahí).
Muros y vallas del OSM (`data/barreras.json`): wall 1278 (66.5 km), fence 209 (27.6 km), retaining_wall 39 (1.8 km), guard_rail 1 (0.1 km), hedge 2 (0.0 km), handrail 1 (0.0 km)
## Sitios que dijo Jonay
- Callejón Montaraz (X -896, Y -348): faltan 4 edificios, 193 m², sobre calzada 3; muros o vallas del OSM a menos de 60 m: 0
- Callejón Montaraz (2) (X -923, Y -322): faltan 1 edificios, 81 m², sobre calzada 0; muros o vallas del OSM a menos de 60 m: 0
- Junto al Teatro Leal (X -301, Y -262): faltan 0 edificios, 0 m², sobre calzada 0; muros o vallas del OSM a menos de 60 m: 1
- Patio Av. Trinidad (X -191, Y 366): faltan 12 edificios, 2663 m², sobre calzada 0; muros o vallas del OSM a menos de 60 m: 0
en total 44 s
SONDA CATASTRO OK
```
