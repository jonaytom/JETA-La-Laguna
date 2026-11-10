# Zonas de barranco con el MDT del IGN (v1.3.3). Junta los trozos de data/mdt/ (mdt_ign.py bajar) en una rejilla de 4 m,
# la compara con el terreno del juego (data/data.json H, 16 m) y escribe data/terreno_mdt.json: celdas del mapa de alturas
# y su cambio en decímetros, solo donde la diferencia pasa de 6 m dentro de las regiones elegidas y sin tocar el suelo a
# menos de 20 m de calles, tranvía y edificios (fundido hasta 60 m). Necesita numpy, scipy y PIL: se corre en la nube
# (en el PC no hay numpy). Uso: python mdt_zonas.py <carpeta del repo>
import sys, os
ROOT = sys.argv[1] if len(sys.argv) > 1 else '.'
# --- 1. juntar el MDT (como en el análisis de la v1.3.2) ---
import numpy as np, json, base64, math, glob, re, sys
from PIL import Image
LAT0, LON0 = 28.4875, -16.3150
KX = math.cos(math.radians(LAT0)) * 111320; KZ = 110574
X0, X1, Z0, Z1 = -4820, 3600, -1820, 4420
src=os.path.join(ROOT,'data','mdt')+os.sep
DX=4.0
xs=np.arange(X0,X1+0.1,DX); zs=np.arange(Z0,Z1+0.1,DX)
out=np.full((len(zs),len(xs)),np.nan)
for f in sorted(glob.glob(src+'*.asc')):
    tok=open(f).read().split()
    hd={}; k=0
    while tok[k][0].isalpha(): hd[tok[k].lower()]=float(tok[k+1]); k+=2
    nr,nc=int(hd['nrows']),int(hd['ncols'])
    v=np.array(tok[k:k+nr*nc],dtype=float).reshape(nr,nc)
    nd=hd.get('nodata_value')
    if nd is not None: v[v==nd]=np.nan
    cs=hd['cellsize']; lon0=hd['xllcorner']; lat0=hd['yllcorner']
    lon=LON0+xs/KX; lat=LAT0-zs/KZ
    ci=np.floor((lon-lon0)/cs).astype(int); ri=nr-1-np.floor((lat-lat0)/cs).astype(int)
    okc=(ci>=0)&(ci<nc); okr=(ri>=0)&(ri<nr)
    sub=v[np.clip(ri,0,nr-1)][:,np.clip(ci,0,nc-1)]
    m=okr[:,None]&okc[None,:]&~np.isnan(sub)
    out[m]=sub[m]
    print(f.split('/')[-1], v.shape, np.nanmin(v), np.nanmax(v))
print('huecos', np.isnan(out).sum(), out.shape)
np.savez_compressed('mdt_ign_4m.npz',H=out.astype('float32'),x0=X0,z0=Z0,dx=DX)
D=json.load(open(''+os.path.join(ROOT,'data','data.json')+''))
HM=D['H']; g=np.frombuffer(base64.b64decode(HM['d']),dtype=np.int16).astype(float).reshape(HM['nz'],HM['nx'])/10+HM.get('base',0)
print('juego', g.shape, g.min(), g.max(), HM['x0'],HM['z0'])
# game grid resampled to 4 m (bilinear)
gx=(xs-HM['x0'])/HM['dx']; gz=(zs-HM['z0'])/HM['dx']
gx=np.clip(gx,0,HM['nx']-1.001); gz=np.clip(gz,0,HM['nz']-1.001)
i0=np.floor(gz).astype(int); j0=np.floor(gx).astype(int); fz=(gz-i0)[:,None]; fx=(gx-j0)[None,:]
G=(g[i0][:,j0]*(1-fz)*(1-fx)+g[i0+1][:,j0]*fz*(1-fx)+g[i0][:,j0+1]*(1-fz)*fx+g[i0+1][:,j0+1]*fz*fx)
def hs(H):
    gy,gx_=np.gradient(H,DX)
    sl=np.pi/2-np.arctan(np.hypot(gx_,gy)*1.5); asp=np.arctan2(-gx_,gy)
    az,alt=np.radians(315),np.radians(45)
    v=np.sin(alt)*np.sin(sl)+np.cos(alt)*np.cos(sl)*np.cos(az-asp)
    return (np.clip(v,0,1)*255).astype('uint8')
o2=np.nan_to_num(out,nan=np.nanmin(out))
np.save('G4.npy',G)
d=o2-G
print('dif MDT-juego: media %.1f, p5 %.1f p95 %.1f'%(np.mean(d),np.percentile(d,5),np.percentile(d,95)))
Image.fromarray(hs(o2)).save('mdt_ign.png'); Image.fromarray(hs(G)).save('mdt_juego.png')
# difference map
dn=np.clip((d+15)/30*255,0,255).astype('uint8')
Image.fromarray(np.stack([dn,np.full_like(dn,128),255-dn],-1)).save('mdt_dif.png')
# --- 2. las zonas y el cambio ---
import numpy as np, json, base64
from scipy import ndimage as nd
from PIL import Image, ImageDraw
z=np.load('mdt_ign_4m.npz'); M=z['H'].astype(float); X0m,Z0m=-4820,-1820
DATA=json.load(open(os.path.join(ROOT,'data','data.json'))); H=DATA['H']
nx,nz,gx0,gz0,dx,base=H['nx'],H['nz'],H['x0'],H['z0'],H['dx'],H['base']
a=np.frombuffer(base64.b64decode(H['d']),dtype=np.int16).astype(float).reshape(nz,nx)
G=a/10+base
gxs=gx0+np.arange(nx)*dx; gzs=gz0+np.arange(nz)*dx
# MDT smoothed to ~16 m and sampled at the game nodes
Mf=np.where(np.isnan(M),np.nan,M); Mn=np.nan_to_num(Mf,nan=0); W=(~np.isnan(Mf)).astype(float)
Ms=nd.uniform_filter(Mn,4)/np.maximum(nd.uniform_filter(W,4),1e-6)
jj=((gxs-X0m)/4).round().astype(int); ii=((gzs-Z0m)/4).round().astype(int)
ok=(jj>=0)&(jj<M.shape[1]); okz=(ii>=0)&(ii<M.shape[0])
Mg=np.full((nz,nx),np.nan)
Mg[np.ix_(okz,ok)]=Ms[np.ix_(ii[okz],jj[ok])]
Dg=np.where(np.isnan(Mg),0,Mg-G)
# zones: where the difference is big (|D|>6 m, smoothed), in the chosen regions
big=nd.uniform_filter((np.abs(Dg)>6).astype(float),3)>0.4
GX,GZ=np.meshgrid(gxs,gzs)
region=((GX>400)&(GZ<1500))|((GX>-3500)&(GX<-2800)&(GZ>-700)&(GZ<-150))|((GX>-4150)&(GX<-3800)&(GZ>1050)&(GZ<1400))
sel=big&region
sel=nd.binary_closing(sel,iterations=2)
# feather: distance (m) from outside the selection
dist_in=nd.distance_transform_edt(sel)*dx
wz=np.clip(dist_in/48,0,1)
# content: roads (<=13), tram, buildings -> keep their ground: weight 0 within 20 m, 1 beyond 60 m
img=Image.new('L',(nx*4,nz*4),0); dr=ImageDraw.Draw(img)
P=lambda x,zz:((x-gx0)/dx*4,(zz-gz0)/dx*4)
for r in DATA['R']:
    if r[0]>13: continue
    c=r[4]; dr.line([P(c[k],c[k+1]) for k in range(0,len(c),2)],fill=255,width=max(1,int((r[2]+4)/4)))
T=DATA.get('T') or []
if len(T)>3: dr.line([P(T[k],T[k+1]) for k in range(0,len(T),2)],fill=255,width=4)
for b in DATA['B']:
    c=b[6]
    if len(c)>=6: dr.polygon([P(c[k],c[k+1]) for k in range(0,len(c),2)],fill=255)
cont=np.array(img)>0
dc=nd.distance_transform_edt(~cont)*4  # metres at 4 m pixels
dc16=dc[::4,::4][:nz,:nx]
wc=np.clip((dc16-20)/40,0,1)
w=wz*wc
dv=np.round(w*Dg*10).astype(int)
dv=np.clip(dv,-1500,1500)
idx=np.where(np.abs(dv)>=5)
print('celdas', len(idx[0]), 'de', nx*nz, ' max', dv.min()/10, dv.max()/10)
flat=(idx[0]*nx+idx[1]).tolist()
out={'nota':'v1.3.3: barrancos y laderas del MDT de 5 m del IGN (CC BY 4.0, © Instituto Geográfico Nacional) en las zonas con más desnivel respecto al terreno del juego, sin tocar el suelo a menos de 20 m de calles, tranvía y edificios (fundido hasta 60 m)','i':flat,'d':dv[idx].tolist()}
json.dump(out,open(os.path.join(ROOT,'data','terreno_mdt.json'),'w'),separators=(',',':'),ensure_ascii=False)
np.save('w16.npy',w); np.save('dv16.npy',dv)
# preview: game hillshade before/after
def hs(Hh,d=16):
    gy,gx_=np.gradient(Hh,d); sl=np.pi/2-np.arctan(np.hypot(gx_,gy)*1.5); asp=np.arctan2(-gx_,gy)
    v=np.sin(np.radians(45))*np.sin(sl)+np.cos(np.radians(45))*np.cos(sl)*np.cos(np.radians(315)-asp)
    return (np.clip(v,0,1)*255).astype('uint8')
G2=G+dv/10
A=Image.fromarray(hs(G)); B=Image.fromarray(hs(G2))
c=(int((300-gx0)/dx),int((-1250-gz0)/dx),int((2700-gx0)/dx),int((1600-gz0)/dx))
A=A.crop(c).resize((600,712)); B=B.crop(c).resize((600,712))
im=Image.new('L',(1210,712),255); im.paste(A,(0,0)); im.paste(B,(610,0)); im.save('terreno_antes_despues.png')
print(len(json.dumps(out))/1e3,'KB')
