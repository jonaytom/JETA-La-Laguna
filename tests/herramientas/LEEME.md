# Herramientas de prueba (se guardan aquí para no rehacerlas en cada versión)

Se lanzan con el arnés de `tests/run_test.py` (servidor en `localhost:8765` sirviendo `dist/test.html`):
`cd tests && python run_test.py herramientas/<script>.py [argumento]`. Las fotos van a `tests/shots/`.

| Script | Para qué |
|---|---|
| `foto_npc.py <nombre>` | Cara y cuerpo de un NPC de misión (`alcalde`, `blanco`, `boca`, `coco`, `sastron`, `canarion`). |
| `foto_mapa.py [x z]` | Mapa grande a varios zooms (rótulos, colores). |
| `foto_marca.py <índice>` | Juega una misión hasta la flecha roja de persecución y la fotografía. |
| `foto_farmacia.py` | Persecución de la farmacia: robo del coche negro junto al Corola y el mapa con la ruta. |
| `foto_hospital.py` | Tres vistas del HUC y la puerta de cada centro de salud. |
| `foto_ayuntamiento.py` | Tres vistas de la fachada del Ayuntamiento. |
| `foto_motos.py` | Motos con piloto (postura). |
| `foto_caras.py` | Caras de las tallas de cuerpo (morphs). |
| `foto_movil.py` | HUD en móvil apaisado (se lanza solo, sin `run_test.py`). |
| `foto_desde_arriba.py vistas.json` | Fotos desde arriba: `[[tx,tz,cx,cz,h],…]`. |
| `foto_puntos.py puntos.json` | Fotos a la altura de los ojos: `[[x,z,yaw,ri],…]`. |
| `sonda_alturas.py puntos.json` | Alturas de suelo y tableros: `[[x,z],…]`. |
| `conduce_calles.py calles.json` | Conduce por calles y traza la altura del coche. |

Pruebas completas (en `tests/`): `prueba_misiones.py [desde] [hasta]` juega solas las misiones de la historia;
`prueba_persecuciones.py` comprueba que los perseguidos se ven y no dan saltos; `prueba_misiones_guardado.py` guarda a mitad, reintenta tras fallar y carga partidas antiguas.
`tools/publicar_preparar.py VERSION archivos…` prepara la copia a `E:\` (sesión en la nube).
