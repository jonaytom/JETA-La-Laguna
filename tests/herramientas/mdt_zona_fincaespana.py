# Relieve del MDT del IGN en la Av. de los Menceyes entre Finca España y Villa Hilaria (v1.3.4), calles incluidas (siguen al
# terreno); en la calzada central (que baja en trinchera) el cambio se toma de los lados. Suma sus celdas a
# data/terreno_mdt.json. Necesita numpy/scipy (se corre en la nube, tras mdt_zonas.py). Rutas: las de la sesión de la v1.3.4.
import numpy as np, json, base64
from scipy import ndimage as nd
z=np.load('mdt_ign_4m.npz'); M=z['H'].astype(float); X0m,Z0m=-4820,-1820
DATA=json.load(open('/home/claude/jeta-repo/data/data.json')); H=DATA['H']
nx,nz,gx0,gz0,dx,base=H['nx'],H['nz'],H['x0'],H['z0'],H['dx'],H['base']
a=np.frombuffer(base64.b64decode(H['d']),dtype=np.int16).astype(float).reshape(nz,nx); G=a/10+base
gxs=gx0+np.arange(nx)*dx; gzs=gz0+np.arange(nz)*dx; GX,GZ=np.meshgrid(gxs,gzs)
Mn=np.nan_to_num(M,nan=0); W=(~np.isnan(M)).astype(float)
Ms=nd.uniform_filter(Mn,4)/np.maximum(nd.uniform_filter(W,4),1e-6)
jj=((gxs-X0m)/4).round().astype(int); ii=((gzs-Z0m)/4).round().astype(int)
Mg=Ms[np.ix_(ii,jj)]
Dg=Mg-G
# central road (3993..3995) axis: cells within 14 m get the median of the 16-40 m ring (the MDT has the cutting in it)
R=DATA['R']; ax=[]
for ri in (3993,3994,3995): ax+=R[ri][4] if not ax else R[ri][4][2:]
P=np.array(ax).reshape(-1,2)
def dseg(X,Z):
    d=np.full(X.shape,1e9)
    for (x1,z1),(x2,z2) in zip(P[:-1],P[1:]):
        ex,ez=x2-x1,z2-z1; L2=ex*ex+ez*ez
        t=np.clip(((X-x1)*ex+(Z-z1)*ez)/L2,0,1); d=np.minimum(d,np.hypot(X-x1-ex*t,Z-z1-ez*t))
    return d
dc=dseg(GX,GZ)
ring=(dc>16)&(dc<40); fixed=Dg.copy()
idx=np.where(dc<=16)
for i,j in zip(*idx):
    sl=(slice(max(0,i-4),i+5),slice(max(0,j-4),j+5))
    v=Dg[sl][ring[sl]]
    if v.size: fixed[i,j]=np.median(v)
B=[1230,1745,1555,1895]
din=np.minimum.reduce([GX-B[0],B[1]-GX,GZ-B[2],B[3]-GZ])
w=np.clip((din+20)/60,0,1)   # full inside from 40 m in, fades to 0 at 20 m outside
dv=np.round(w*fixed*10).astype(int)
sel=np.where(np.abs(dv)>=3)
print('celdas',len(sel[0]),'rango',dv[sel].min()/10,dv[sel].max()/10, 'media',dv[sel].mean()/10)
T=json.load(open('/mnt/user-data/outputs/v133a/terreno_mdt.json'))
cur=dict(zip(T['i'],T['d']))
for i,j in zip(*sel):
    k=int(i*nx+j); cur[k]=cur.get(k,0)+int(dv[i,j])
ks=sorted(cur)
T2={'nota':T['nota']+'; v1.3.4: también la Av. de los Menceyes entre Finca España y Villa Hilaria (X 1230–1745, Y 1555–1895), calles incluidas, sin la trinchera de la calzada central','i':ks,'d':[cur[k] for k in ks]}
import os; os.makedirs('/mnt/user-data/outputs/v134a',exist_ok=True)
json.dump(T2,open('/mnt/user-data/outputs/v134a/terreno_mdt.json','w'),separators=(',',':'),ensure_ascii=False)
print(len(ks))
