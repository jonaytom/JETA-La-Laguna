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

## Pruebas incluidas

| Script | Qué comprueba |
|---|---|
| `audit_cruces.py` | `auditCrossings()`: vías que se cruzan **sin enlace** a menos de 4,4 m de altura (2,7 m si la de abajo es peatonal). Debe dar 0. Guarda `/tmp/audit.json`. |
| `audit_obstaculos.py` | `auditObstacles()` (requiere `run_test_audit.py`): muros, barandillas, losas o bocas de túnel dentro de la calzada de otra vía a altura de conducción. |
| `prueba_conduccion_tuneles_puentes.py` | Un coche automático recorre los ~111 túneles, pasos inferiores y puentes; informa de los que no llegan al final (con captura `shots/df_<vía>.jpg`). Algunos fallos son tráfico que se cruza. |
| `prueba_pelea_especiales.py` | Empieza una pelea, pulsa Espacio (cartel de controles) y comprueba las dos técnicas especiales. |
| `prueba_bloqueo.py` | Mantener atrás bloquea los golpes del rival. |
| `prueba_guardar_cargar.py` | Guarda una partida con progreso, la estropea y la carga desde la ventana de partidas. |
| `prueba_muerte_coche.py` | Morir en un coche tras un choque y volver a jugar en ≤ 4 s. |
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
