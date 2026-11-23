"""v1.4.47: suavidad de las sombras (sun.shadow.radius, el PCF de three.js r186+): arriba radio 1 (el de antes), abajo el
radio que se pase (por defecto 2,5), en la misma carga y con la misma semilla. Mismas vistas que foto_sombras.py.
Uso: python tests/herramientas/foto_sombras_radio.py [radio]  (después de python build.py).
Fotos: tests/shots/sombra_<vista>_radio.jpg"""
import asyncio, functools, http.server, sys, threading
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tests'))
from herramientas import foto_sombras as FS

R = float(sys.argv[1]) if len(sys.argv) > 1 else 2.5
FS.ANTES = "(() => { __dbg.sun.shadow.radius = 1; })()"
FS.AHORA = "(() => { __dbg.sun.shadow.radius = %s; })()" % R

if __name__ == '__main__':
    h = functools.partial(FS.Quiet, directory=str(ROOT / 'dist' / 'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), h) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            asyncio.run(FS.main(srv.server_port, '', '_radio'))
        finally:
            srv.shutdown()
