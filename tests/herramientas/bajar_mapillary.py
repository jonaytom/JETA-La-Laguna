# Lanza tools/mapillary.py en el PC (v1.1.4): las señales de aparcamiento de Mapillary emparejadas con las calles del
# juego → data/mapillary_aparca.json, y cuántas hay. No usa el juego. Lista scripts/pruebas/mapillary.txt
import os, runpy
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
async def run(pg):
    try: runpy.run_path(os.path.join(ROOT, 'tools', 'mapillary.py'), run_name='__main__')
    except SystemExit as ex: print('PARADO:', ex); raise RuntimeError('mapillary: ' + str(ex))
    print('BAJAR MAPILLARY OK')
