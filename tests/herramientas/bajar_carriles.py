# Lanza tools/carriles.py en el PC (v1.1.1): carriles y aparcamiento de cada calle según el OSM → data/carriles.json, y
# cuántas calles los traen. No usa el juego. Lista scripts/pruebas/carriles.txt
import os, runpy
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
async def run(pg):
    runpy.run_path(os.path.join(ROOT, 'tools', 'carriles.py'), run_name='__main__')
    print('BAJAR CARRILES OK')
