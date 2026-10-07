# 7. Pruebas y auditorías

Las pruebas abren el juego en un **Chromium sin ventana** (Playwright, WebGL por SwiftShader) y lo controlan
desde Python a través de `window.__dbg`, `window.__step` y `window.__snap`.

## Preparación

```bash
pip install playwright
python -m playwright install chromium
python build.py
cd dist && python -m http.server 8765      # en otra terminal, desde la raíz del repo
```

## Ejecutar

Desde la raíz del repositorio:

```bash
python tests/run_test.py tests/audit_cruces.py           # calidad «baja», 640×360
python tests/run_test_alta.py tests/prueba_pelea_especiales.py   # calidad «alta»
python tests/run_test_audit.py tests/audit_obstaculos.py  # arranca con window.__AUDIT = true
```

`run_test*.py` abre `http://localhost:8765/test.html`, espera a `window.__GAME_READY`, ejecuta la función
`run(pg)` del script de prueba y muestra los últimos mensajes de consola. `tests/_helpers.py` aporta `snap()`
(guarda capturas en `shots/`) y `st()` (estado resumido).

## Agente revisor de jugabilidad (cada versión)

`python tests/agente_revisor.py` recorre el mapa como un probador y escribe un informe de bugs en `reportes/`.
Abre el juego con `?revisor=1`: solo así se conservan en memoria las posiciones de los triángulos de la ciudad, que el
agente lee (en el juego normal se liberan al subirlas a la tarjeta gráfica: ~250 MB menos, auditoría P1.7).
Se ejecuta **después de cada versión** (rutina de `CLAUDE.md`). Hace tres pasadas:

1. **Zonas nuevas**: todas las vías dentro de los rectángulos de `tests/zonas_revision.json`, que se actualiza en
   cada versión con lo que ha cambiado (`{"nombre","x0","x1","z0","z1"}`).
2. **Riesgo**: todas las vías de riesgo del mapa en todas las versiones: enlaces de autopista, puentes, túneles,
   pasos inferiores y rampas elevadas.
3. **Rotación**: un lote (250 por defecto, `--lote N`) de vías normales, las que hace más que no se revisan según
   `reportes/cobertura.json`. En pocas versiones se recorre el mapa entero sin dejar de ver lo antiguo.

Comprobaciones:
- **Superficies** (cada 6 m de calzada, con un índice propio de triángulos en casillas de 8 m, mucho más rápido que
  el Raycaster): textura de acera/suelo por encima del asfalto (texturas cruzadas), algo plano flotando sobre la
  calzada (losa, andén, tablero) o calzada por debajo del terreno.
- **En coche**: un coche sigue la vía con solo su física (sin tráfico): se sale, vuela, se hunde, salto brusco de
  altura, roza el techo de un túnel, se atasca (y si es contra un muro) o no termina la vía.
- **A pie**: el personaje anda por aceras y caminos: se hunde bajo la superficie visible o se atasca.

Salida, escrita **mientras recorre**: `reportes/revision_v<versión>_<fecha>.md` (+ `.json`), el registro en vivo
`_registro.txt`, capturas en `reportes/img/` y `reportes/ULTIMO.md` (copia del último). Cada aviso lleva X/Z, vía,
pasada y captura, y se compara con el informe anterior: 🆕 nuevo, ↻ sigue, y la lista de **arreglados**.
Opciones: `--solo-zonas` (rápido, solo la pasada 1) y `--todo` (todo el mapa de una vez). Una pasada normal tarda
unos 30 min.

## Pruebas incluidas

| Script | Qué comprueba |
|---|---|
| `audit_cruces.py` | `auditCrossings()`: vías que se cruzan **sin enlace** a menos de 4,4 m de altura (2,7 m si la de abajo es peatonal). Debe dar 0. Guarda `/tmp/audit.json`. |
| `audit_obstaculos.py` | `auditObstacles()` (requiere `run_test_audit.py`): muros, barandillas, losas o bocas de túnel dentro de la calzada de otra vía a altura de conducción. |
| `prueba_conduccion_tuneles_puentes.py` | Un coche automático recorre los ~111 túneles, pasos inferiores y puentes; informa de los que no llegan al final (con captura `shots/df_<vía>.jpg`). Algunos fallos son tráfico que se cruza. |
| `prueba_pelea_especiales.py` | Empieza una pelea, pulsa Espacio (cartel de controles) y comprueba las cuatro técnicas especiales. |
| `prueba_misiones.py [desde] [hasta]` | Piloto automático que juega las misiones de la historia (salta diálogos, gana las peleas, acierta los blancos, se sube al vehículo pedido) y comprueba que todas se terminan sin errores. |
| `prueba_hospital.py` | Muere junto a cada centro de salud / urgencias y comprueba que reapareces allí. |
| `prueba_persecuciones.py [índices]` | En cada persecución: el perseguido aparece cerca y a la vista, no da saltos y se aleja (a pie y en coche). |
| `prueba_misiones_guardado.py` | Guardar a mitad de misión y cargar, «¿Reintentar?» tras fallar y partidas antiguas con la historia ya terminada. |
| `herramientas/` | Scripts de fotos y sondas reutilizables (ver `tests/herramientas/LEEME.md`): se guardan para no rehacerlos. |
| `prueba_bloqueo.py` | Mantener atrás bloquea los golpes del rival. |
| `prueba_guardar_cargar.py` | Guarda una partida con progreso, la estropea y la carga desde la ventana de partidas. |
| `prueba_muerte_coche.py` | Morir en un coche tras un choque y volver a jugar en ≤ 4 s. |
| `prueba_pasos.py` | Andar, trotar y esprintar: cuenta los pasos, comprueba que alternan pie izquierdo/derecho y mide el desfase entre el sonido y el apoyo del tobillo (objetivo: ±40 ms). |
| `prueba_peralte.py` | Coloca un coche en los puntos de calle con más pendiente lateral y comprueba que las 4 ruedas quedan a la misma altura sobre el suelo. |
| `prueba_coche_y_boca.py` | 0–100 km/h y punta de un coche, sitio del círculo de Boca Papa y texto de coordenadas del minimapa. |
| `prueba_bordes.py` | Aviso y vuelta desde los bordes y las zonas quitadas (a pie y en coche). |
| `prueba_ambiente.py` | Inicia el audio y deja sonar el ambiente con cambio de hora (campanas) sin errores. |
| `prueba_pelea_atras.py` | Atrás sin ataque = retrocede; con ataque = se cubre. |
| `audit_hundimiento.py` | Puntos de túnel/trinchera bajo el suelo sin hueco (debe dar 0). |
| `prueba_parking_cristo.py` | Sube andando por las dos escaleras del parking del Cristo y baja en coche por las rampas midiendo el hueco con el techo. |
| `prueba_aeropuerto.py` | El aeropuerto se construye y hay ruta en coche desde el inicio hasta la terminal. |
| `agente_revisor.py` | Agente revisor (ver arriba): informe de bugs de las zonas nuevas, vías de riesgo y rotación. |
| `prueba_panel_controles.py` | Fases `ready` → `intro` → `fight` de las primeras peleas. |

## Cómo escribir una prueba

```python
import asyncio, os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(3);})()")
    print(await pg.evaluate("JSON.stringify({x: __dbg.PLAYER.x, money: __dbg.PLAYER.money})"))
    await snap(pg, 'mi_captura')     # shots/mi_captura.jpg
```

- `window.__manual = true` detiene el bucle automático y la simulación avanza solo con `__step(n, dt, teclas)`.
- Para fotos: poner `__dbg.GAME.state = 'x'` (estado desconocido = no se mueve la cámara), colocar
  `__dbg.camera` y llamar a `snap()`. Las capturas de pantalla de Playwright (`pg.screenshot`) suelen agotar el
  tiempo con el juego en marcha; usar `snap()`.

## Comprobación de sintaxis rápida

`build.py` no valida el JavaScript. Para encontrar errores sin abrir el navegador:

```bash
python -c "import re;s=open('dist/test.html',encoding='utf-8').read();open('chk.mjs','w').write(re.findall(r'<script type=\"module\">(.*?)</script>',s,re.S)[-1])"
node --check chk.mjs
```
