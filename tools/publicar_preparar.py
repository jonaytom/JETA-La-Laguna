# usage: stage.py VERSION file1 file2 ...  -> copies to outputs and prints commit JSON batches
import sys, os, shutil, json
ver=sys.argv[1]; files=sys.argv[2:]; R='/home/claude/jeta-repo'; O=f'/mnt/user-data/outputs/v{ver}'
shutil.rmtree(O, ignore_errors=True); os.makedirs(O+'/r')
shutil.copy(R+'/dist/JETA La Laguna.html', O+'/JETA La Laguna.html'); shutil.copy(R+'/dist/Documentacion tecnica.html', O+'/Documentación técnica.html')
open(O+'/PUBLICAR.txt','w').write(ver+'\n')
items=[{'stagedPath':O+'/JETA La Laguna.html','devicePath':'E:\\Claude\\GTA La Laguna\\JETA La Laguna.html'},{'stagedPath':O+'/Documentación técnica.html','devicePath':'E:\\Claude\\GTA La Laguna\\Documentación técnica.html'}]
for f in files:
    os.makedirs(os.path.dirname(O+'/r/'+f), exist_ok=True); shutil.copy(R+'/'+f, O+'/r/'+f)
    items.append({'stagedPath':O+'/r/'+f,'devicePath':'E:\\Claude\\GTA La Laguna\\repo\\'+f.replace('/','\\')})
print(json.dumps(items, ensure_ascii=False))
print(json.dumps([{'stagedPath':O+'/PUBLICAR.txt','devicePath':'E:\\Claude\\GTA La Laguna\\repo\\scripts\\PUBLICAR.txt'}]))
