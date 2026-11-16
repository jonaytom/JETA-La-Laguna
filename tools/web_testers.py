# v1.4.13 (Jonay, 16-nov: «harás la versión de Cloudflare para yo subirla, así es más fácil para mis testers»):
# copies dist/web (made by build.py) to E:\Claude\GTA La Laguna\Cloudflare\ (always the latest: drag that folder, or the
# zip, to «Create deployment» in Cloudflare Pages) and zips it as «JETA La Laguna web v<versión>.zip», index.html at the
# root. Checks Cloudflare Pages' limit: 25 MiB per file.
import os, sys, shutil, zipfile
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JUEGO = os.path.dirname(ROOT)
src = os.path.join(ROOT, 'dist', 'web')
if not os.path.isfile(os.path.join(src, 'index.html')): print('no existe', src, '(haz «build» antes)'); sys.exit(1)
ver = open(os.path.join(ROOT, 'VERSION')).read().strip()
grandes = []; total = 0; n = 0
for base, _, fs in os.walk(src):
    for f in fs:
        s = os.path.getsize(os.path.join(base, f)); total += s; n += 1
        if s > 25 * 1048576: grandes.append('%s (%.1f MB)' % (os.path.relpath(os.path.join(base, f), src), s / 1048576))
if grandes: print('Cloudflare no admite archivos de más de 25 MiB:', ', '.join(grandes)); sys.exit(1)
dst = os.path.join(JUEGO, 'Cloudflare')
shutil.rmtree(dst, ignore_errors=True); shutil.copytree(src, dst)
z = os.path.join(JUEGO, 'JETA La Laguna web v' + ver + '.zip')
with zipfile.ZipFile(z, 'w', zipfile.ZIP_DEFLATED) as zf:
    for base, _, fs in os.walk(src):
        for f in fs: p = os.path.join(base, f); zf.write(p, os.path.relpath(p, src))
print('versión web %s: %d archivos, %.1f MB' % (ver, n, total / 1048576))
print('carpeta para subir:', dst)
print('zip:', z, '(%.1f MB)' % (os.path.getsize(z) / 1048576))
