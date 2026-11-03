# Qué librerías de Python hay en el PC (v1.1.0): para saber si una herramienta puede correr aquí o necesita la nube.
import importlib, sys
async def run(pg):
    print('python', sys.version.split()[0], sys.executable)
    for m in ('PIL', 'numpy', 'scipy'):
        try: mod = importlib.import_module(m); print(m, getattr(mod, '__version__', 'ok'))
        except Exception as e: print(m, 'NO', e)
    print('HAY LIBS OK')
