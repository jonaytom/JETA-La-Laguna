#!/bin/bash
# Rutina de publicación en la sesión en la nube (ahorra cuota: un solo comando en vez de 15 pasos sueltos).
# Uso: bash tools/rutina_publicar.sh VERSION [archivos del repo cambiados…]
#   El auditor SOLO corre con AUDITAR=1 (desde v0.64 Jonay lo pide cuando quiere; por defecto: build y listas).
#   1) build  2) auditor (herramientas frescas ya copiadas en $AUD/herramientas, historial en $AUD/resultados)
#   3) espera al veredicto  4) prepara la copia a E:\ y a RevisordeCodigo y deja las dos listas JSON para
#      device_commit_files en $SCR/commit_<versión>.json (repo + auditoría) y $SCR/publicar_<versión>.json (PUBLICAR.txt, el último)
set -e
V=$1; shift; R=/home/claude/jeta-repo; AUD=${AUD:-/home/claude/audit059}; SCR=${SCR:-/tmp/claude-0/-home-claude/6dded4dc-bc95-5271-94f8-89be72912b12/scratchpad}
cd $R && python3 build.py | tail -1
if [ "$AUDITAR" != "1" ]; then
  cd $R && python3 tools/publicar_preparar.py $V "$@" > $SCR/c_$V.txt
  python3 - "$V" "$SCR" <<'P'
import json, sys
V, SCR = sys.argv[1:3]; L = open(f'{SCR}/c_{V}.txt').read().splitlines(); items = json.loads(L[0])
json.dump(items[:50], open(f'{SCR}/commit_{V}.json', 'w'), ensure_ascii=False); open(f'{SCR}/publicar_{V}.json', 'w').write(L[1])
print('sin auditor · archivos a copiar:', len(items))
P
  exit 0
fi
rm -rf /home/claude/jeta-copy && cp -r $R /home/claude/jeta-copy && rm -rf /home/claude/jeta-copy/tests/shots
cd $AUD/herramientas && (nohup python auditar.py --repo /home/claude/jeta-copy > run.log 2>&1 &)
for i in $(seq 1 60); do sleep 15; grep -q "Resultados en\|ERROR\|Traceback" run.log && break; done
D=$(ls -d $AUD/resultados/*_${V}_local | tail -1); echo "== $D"; sed -n '1,12p' $D/VEREDICTO.md
cd $R && python3 tools/publicar_preparar.py $V "$@" > $SCR/c_$V.txt
O=/mnt/user-data/outputs/audit_$V; rm -rf $O; mkdir -p $O; cp -r $D $O/; cp $AUD/resultados/historial.json $O/
python3 - "$V" "$SCR" "$O" "$(basename $D)" <<'P'
import json, os, sys
V, SCR, O, NAME = sys.argv[1:5]; L = open(f'{SCR}/c_{V}.txt').read().splitlines(); items = json.loads(L[0]); RD = 'C:\\Users\\Jonay\\RevisordeCodigo\\resultados\\'
items.append({'stagedPath': O + '/historial.json', 'devicePath': RD + 'historial.json'})
for root, _, fs in os.walk(os.path.join(O, NAME)):
    for f in fs: p = os.path.join(root, f); items.append({'stagedPath': p, 'devicePath': RD + os.path.relpath(p, O).replace('/', '\\')})
json.dump(items[:50], open(f'{SCR}/commit_{V}.json', 'w'), ensure_ascii=False); open(f'{SCR}/publicar_{V}.json', 'w').write(L[1])
print('archivos a copiar:', len(items), '(máx. 50 por llamada)' if len(items) > 50 else '')
P
