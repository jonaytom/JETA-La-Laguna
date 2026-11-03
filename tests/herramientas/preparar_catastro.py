# Lanza tools/catastro_add.py en el PC desde una lista de pruebas (v1.0.4): edificios del Catastro que faltan y muros y
# vallas del OSM → data/catastro_add.json y data/barreras_juego.json (los mete build.py en la compilación siguiente).
# Uso: lista scripts/pruebas/catastro_add.txt (no usa el juego).
import os, sys, runpy
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
async def run(pg):
    runpy.run_path(os.path.join(ROOT, 'tools', 'catastro_add.py'), run_name='__main__')
    print('PREPARAR CATASTRO OK')
