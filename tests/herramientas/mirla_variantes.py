# Lanza tools/sprites_ext/mirla_variantes.py en el PC (v1.1.0): hoja de variantes de La Mirladora (pezones, mejillas,
# pelo y faldas, en parada, salto y caída) → tests/shots/mirla_variantes.png. No usa el juego. Lista scripts/pruebas/mirla.txt
import os, sys, runpy
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
async def run(pg):
    G = os.path.join(ROOT, 'tools', 'sprites_ext'); old = sys.argv
    sys.argv = [os.path.join(G, 'mirla_variantes.py'), G]
    import traceback
    try: runpy.run_path(sys.argv[0], run_name='__main__')
    except Exception: print(traceback.format_exc()); raise
    finally: sys.argv = old
    print('MIRLA VARIANTES OK')
