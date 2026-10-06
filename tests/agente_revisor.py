"""AGENTE REVISOR DE JUGABILIDAD — recorre el mapa como lo haría un probador y genera un informe de bugs.

Qué revisa:
  1. CONDUCCIÓN: un coche recorre cada vía de las categorías de riesgo (enlaces de autopista, puentes, túneles,
     pasos inferiores, rampas elevadas) y todas las vías de las zonas cambiadas. Anota: coche atascado (y contra qué),
     se sale de la calzada, vuela (> 1 m sobre la calzada), se hunde (> 0,5 m bajo ella), techo de túnel que roza
     el coche, saltos bruscos de altura.
  2. A PIE: el personaje anda por aceras y caminos de las zonas cambiadas: se hunde en el suelo, se queda atascado o
     flota.
  3. SUPERFICIES: rayos desde el cielo a lo largo de cada calzada: otra textura por encima del asfalto (acera, suelo,
     plaza…), objetos flotando sobre la calzada (andenes, losas, muros) o calzada por debajo del terreno.

Cada ejecución (una por versión) hace tres pasadas:
  A. ZONAS NUEVAS: todas las vías de tests/zonas_revision.json (lo que ha cambiado en esta versión).
  B. RIESGO: todas las vías de riesgo del mapa (enlaces de autopista, puentes, túneles, pasos inferiores, rampas).
  C. ROTACIÓN: un lote de las vías normales que hace más tiempo que no se revisan (reportes/cobertura.json), para que
     en pocas versiones se recorra el mapa entero sin dejar de ver lo antiguo.
Compara con el informe anterior: avisos NUEVOS, que SIGUEN y ARREGLADOS.
Uso:
  python tests/agente_revisor.py                    # A + B + C (lote de 250 vías)
  python tests/agente_revisor.py --lote 600         # lote de rotación más grande
  python tests/agente_revisor.py --solo-zonas       # solo A (rápido, mientras se trabaja)
  python tests/agente_revisor.py --todo             # el mapa entero de una vez (lento)
Salida (se va escribiendo mientras recorre): reportes/revision_v<versión>_<fecha>.md (+ .json, _registro.txt en vivo
        y capturas en reportes/img/); reportes/ULTIMO.md es siempre el último informe.
"""
import asyncio, json, os, sys, time, subprocess, datetime, base64, io
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REP = os.path.join(ROOT, 'reportes'); IMG = os.path.join(REP, 'img'); os.makedirs(IMG, exist_ok=True)
ALL = '--todo' in sys.argv
LOTE = int(sys.argv[sys.argv.index('--lote') + 1]) if '--lote' in sys.argv else 250
SOLO_Z = '--solo-zonas' in sys.argv
COB = os.path.join(REP, 'cobertura.json')
VIAS = [int(v) for v in sys.argv[sys.argv.index('--vias') + 1].split(',')] if '--vias' in sys.argv else None  # re-check only these roads
PRUEBAS = sys.argv[sys.argv.index('--pruebas') + 1].split(',') if '--pruebas' in sys.argv else ['surf', 'drive', 'walk']
VER = open(os.path.join(ROOT, 'VERSION')).read().strip()
ZONES = json.load(open(os.path.join(ROOT, 'tests', 'zonas_revision.json'), encoding='utf-8'))

SETUP = r"""
(()=>{ const d=__dbg, T=d.THREE; window.__manual=true; document.getElementById('menu').style.display='none'; d.GAME.state='play'; d.GAME.tod=12; __step(3);
  const ROADMATS=new Set(['asphalt','asphaltLines','paving','disc','discPave','tram','footway','dirt']);
  const matName=(m)=>{ if(!m) return null; for(const k in d.MATS) if(d.MATS[k]===m) return k; if(m.map) for(const k in d.MATS) if(d.MATS[k]&&d.MATS[k].map===m.map) return k; return m.name||null; };
  const objName=(o,m)=>{ const ch=[]; for(let p=o;p&&p.type!=='Scene';p=p.parent) if(p.name) ch.push(p.name); return (ch[0]||'objeto')+(m&&m.color?' #'+m.color.getHexString():''); };
  /* Índice propio de triángulos por casillas de 8 m (en vez de Raycaster sobre 15 M de triángulos): se construye por
     baldosas de 128 m la primera vez que se consulta y se vacía cuando hay demasiadas. */
  const TS=128, CS=8, tiles=new Map(); const skip=new Set();
  d.scene.traverse(o=>{ if(o.isSkinnedMesh||o.isSprite||o.isPoints||o.isLine) skip.add(o); });
  for (const c of d.CARS||[]) if (c.mesh) c.mesh.traverse(o=>skip.add(o));
  const meshes=[]; d.scene.traverse(o=>{ if(!o.isMesh||skip.has(o)||!o.visible) return; const m=Array.isArray(o.material)?o.material[0]:o.material; if(!m||m.transparent||m.side===T.BackSide||m.depthWrite===false) return;
    let vis=true; for(let p=o.parent;p;p=p.parent) if(p.visible===false) vis=false; if(!vis) return;
    o.updateWorldMatrix(true,false); const b=new T.Box3().setFromObject(o); if(!isFinite(b.min.x)||b.max.x-b.min.x>20000) return; meshes.push({o,b}); });
  const v=[new T.Vector3(),new T.Vector3(),new T.Vector3()], M=new T.Matrix4();
  function buildTile(tx,tz){ const x0=tx*TS,z0=tz*TS,x1=x0+TS,z1=z0+TS, N=TS/CS, cells=Array.from({length:N*N},()=>[]);
    for (const {o,b} of meshes){ if(b.max.x<x0||b.min.x>x1||b.max.z<z0||b.min.z>z1) continue; const g=o.geometry, P=g.attributes.position, I=g.index; const nt=(I?I.count:P.count)/3; const nm=matName(Array.isArray(o.material)?o.material[0]:o.material);
      const inst=o.isInstancedMesh?o.count:1; const ib=o.isInstancedMesh&&g.boundingSphere?g.boundingSphere:null;
      for (let k=0;k<inst;k++){ M.copy(o.matrixWorld); if(o.isInstancedMesh){ const mi=new T.Matrix4(); o.getMatrixAt(k,mi); M.multiply(mi); if(ib){ const c=ib.center.clone().applyMatrix4(M); const r=ib.radius*4; if(c.x+r<x0||c.x-r>x1||c.z+r<z0||c.z-r>z1) continue; } }
        for (let t=0;t<nt;t++){ for(let j=0;j<3;j++){ const ix=I?I.getX(t*3+j):t*3+j; v[j].fromBufferAttribute(P,ix).applyMatrix4(M); }
          const mnx=Math.min(v[0].x,v[1].x,v[2].x), mxx=Math.max(v[0].x,v[1].x,v[2].x), mnz=Math.min(v[0].z,v[1].z,v[2].z), mxz=Math.max(v[0].z,v[1].z,v[2].z);
          if (mxx<x0||mnx>x1||mxz<z0||mnz>z1) continue;
          const tri=[v[0].x,v[0].y,v[0].z,v[1].x,v[1].y,v[1].z,v[2].x,v[2].y,v[2].z,nm,o];
          for (let cx=Math.max(0,Math.floor((mnx-x0)/CS)); cx<=Math.min(N-1,Math.floor((mxx-x0)/CS)); cx++) for (let cz=Math.max(0,Math.floor((mnz-z0)/CS)); cz<=Math.min(N-1,Math.floor((mxz-z0)/CS)); cz++) cells[cz*N+cx].push(tri); } } }
    return cells; }
  function column(x,z){ const tx=Math.floor(x/TS), tz=Math.floor(z/TS), key=tx+','+tz; let cells=tiles.get(key); if(!cells){ if(tiles.size>40) tiles.clear(); cells=buildTile(tx,tz); tiles.set(key,cells); }
    const N=TS/CS, list=cells[Math.floor((z-tz*TS)/CS)*N+Math.floor((x-tx*TS)/CS)]||[]; const hits=[];
    for (const q of list){ const ax=q[0],ay=q[1],az=q[2],bx=q[3],by=q[4],bz=q[5],cx=q[6],cy=q[7],cz=q[8]; const den=(bz-cz)*(ax-cx)+(cx-bx)*(az-cz); if(Math.abs(den)<1e-9) continue;
      const l1=((bz-cz)*(x-cx)+(cx-bx)*(z-cz))/den, l2=((cz-az)*(x-cx)+(ax-cx)*(z-cz))/den, l3=1-l1-l2; if(l1<-1e-6||l2<-1e-6||l3<-1e-6) continue;
      const ux=bx-ax,uy=by-ay,uz=bz-az,wx=cx-ax,wy=cy-ay,wz=cz-az; const nx=uy*wz-uz*wy, ny=uz*wx-ux*wz, nz=ux*wy-uy*wx; const nl=Math.hypot(nx,ny,nz)||1;
      hits.push({y:l1*ay+l2*by+l3*cy, ny:Math.abs(ny)/nl, mat:q[9], obj:q[10]}); }
    hits.sort((a,b)=>b.y-a.y); return hits; }
  const inPoly=(x,z,P)=>{ let c=false; for(let i=0,j=P.length-1;i<P.length;j=i++){ const a=P[i],b=P[j]; if(((a[1]>z)!==(b[1]>z)) && x<(b[0]-a[0])*(z-a[1])/((b[1]-a[1])||1e-9)+a[0]) c=!c; } return c; };
  const bldAt=(x,z)=>{ for(const b of d.BUILD||[]){ if(!b.pts||Math.abs(b.cx-x)>80||Math.abs(b.cz-z)>80) continue; if(inPoly(x,z,b.pts)) return b; } return null; };
  window.__REV = { bldAt, matName, objName, ROADMATS, column, nMeshes:meshes.length };
  return 'ok '+meshes.length; })()
"""

SELECT = r"""
(args)=>{ const d=__dbg, R=d.DATA.R; const Z=args.zones; const inZ=(x,z)=>Z.some(q=>x>=q.x0&&x<=q.x1&&z>=q.z0&&z<=q.z1);
  const RT=d.DATA.RT; const out=[];
  R.forEach((r,ri)=>{ const c=r[4]; if(c.length<4||!d.inPlayArea(c[0],c[1],0)) return; const t=RT[r[0]]||''; let hit=false; for(let i=0;i<c.length;i+=2) if(inZ(c[i],c[i+1])) { hit=true; break; }
    const risky = !!(/link/.test(t) || (r[3]&6) || d.DEP.has(ri) || d.RAISE.has(ri));
    out.push([ri, r[0]<=12?1:0, hit?1:0, risky?1:0]); });
  return JSON.stringify(out); }
"""

DRIVE = r"""
(ri)=>{ const d=__dbg, D=d.DATA, rd=D.R[ri]; const c=rd[4]; const pts=[]; for(let i=0;i<c.length;i+=2) pts.push([c[i],c[i+1]]);
  let L=0; for(let i=1;i<pts.length;i++) L+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]); if(L<20) return null;
  const P=d.PLAYER; P.x=pts[0][0]; P.z=pts[0][1]; __step(2);
  const h=Math.atan2(pts[1][0]-pts[0][0],pts[1][1]-pts[0][1]); const RY=d.ROADY[ri]||((s,x,z)=>d.heightAt(x,z));
  const car=new d.Car('compact',0xff2020,pts[0][0],pts[0][1],h); car.mode='physics'; car.driver='test'; car.y=RY(0,pts[0][0],pts[0][1])+0.3; car.sync(1/30); if(!d.CARS.includes(car)) d.CARS.push(car);
  const near=(x,z)=>{ let bs=0,bd=1e9,acc=0; for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i]; const dx=b[0]-a[0],dz=b[1]-a[1],L2=dx*dx+dz*dz||1; const t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/L2)); const dd=Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t); if(dd<bd){bd=dd;bs=acc+Math.sqrt(L2)*t;} acc+=Math.sqrt(L2);} return [bs,bd]; };
  let wp=1, stuck=0, t=0, issues=[], prevY=car.y; const name=rd[1]>=0?D.S[rd[1]]:'';
  const add=(kind,msg)=>{ if(!issues.some(q=>q.kind===kind)) issues.push({kind,msg,x:Math.round(car.x),z:Math.round(car.z),y:+car.y.toFixed(1),ri,name,type:D.RT[rd[0]]}); };
  const TL=Math.round(Math.max(30,L/7+15)); for (let k=0;k<30*TL;k++){ while(wp<pts.length-1 && Math.hypot(pts[wp][0]-car.x,pts[wp][1]-car.z)<8) wp++; const g=pts[wp]; let da=Math.atan2(g[0]-car.x,g[1]-car.z)-car.h; while(da>Math.PI)da-=2*Math.PI; while(da<-Math.PI)da+=2*Math.PI;
    car.ctl={thr: car.speed<12?0.8:0.15, brk:0, steer:Math.max(-1,Math.min(1,da*2)), hb:0}; for(let q=0;q<3;q++) car.physics(1/90); car.sync(1/30); t+=1/30; /* solo la física de este coche: rápido y sin tráfico que lo moleste */
    const [s,off]=near(car.x,car.z); const ry=RY(s,car.x,car.z); const dy=car.y-ry;
    if (off>rd[2]/2+3) add('fuera','El coche se sale de la calzada ('+off.toFixed(1)+' m del eje)');
    if (dy>1.0 && off<rd[2]/2) add('vuela','El coche va '+dy.toFixed(1)+' m por encima de la calzada');
    if (dy<-0.5 && off<rd[2]/2) add('hundido','El coche va '+(-dy).toFixed(1)+' m por debajo de la calzada');
    if (Math.abs(car.y-prevY)>1.2) add('salto','Salto brusco de altura ('+(car.y-prevY).toFixed(1)+' m en un fotograma)'); prevY=car.y;
    const lw=d.lowAt(car.x,car.z,car.y); if (lw && lw.ceil && (car.y-lw.y)+(car.T.H||1.5)>lw.ceil+0.05) add('techo','El techo del túnel/parking roza el coche');
    if (car.speed<1) stuck+=1/30; else stuck=0;
    if (stuck>3) { const ax=car.x+Math.sin(car.h)*3, az=car.z+Math.cos(car.h)*3; const B=window.__REV.bldAt(ax,az)||window.__REV.bldAt(pts[Math.min(wp,pts.length-1)][0],pts[Math.min(wp,pts.length-1)][1]); if (B) { add('edificio','Un edificio tapa la vía'+(B.name?' ('+B.name+')':'')+': la calle entra en él (dato de OSM o edificio mal puesto)'); break; } d.COL.qy=car.y; const r2=d.COL.resolve(ax,az,1.2); d.COL.qy=null; add('atasco','El coche se queda atascado'+(r2.hit?' contra un obstáculo/muro':'')); break; }
    if (Math.hypot(pts[pts.length-1][0]-car.x,pts[pts.length-1][1]-car.z)<6) break; }
  const left=Math.hypot(pts[pts.length-1][0]-car.x,pts[pts.length-1][1]-car.z); if (left>=6 && !issues.length) add('no_llega','No termina la vía en '+TL+' s ('+Math.round(left)+' m sin recorrer)');
  const i0=d.CARS.indexOf(car); if(i0>=0) d.CARS.splice(i0,1); d.scene.remove(car.mesh);
  if (issues.length) { const q=issues[0]; const fx=Math.sin(car.h),fz=Math.cos(car.h); d.camera.position.set(car.x-fx*10,car.y+4,car.z-fz*10); d.camera.lookAt(car.x,car.y+0.5,car.z); }
  return {issues, L:Math.round(L)}; }
"""

WALK = r"""
(ri)=>{ const d=__dbg, D=d.DATA, rd=D.R[ri]; const c=rd[4]; const pts=[]; for(let i=0;i<c.length;i+=2) pts.push([c[i],c[i+1]]); let L=0; for(let i=1;i<pts.length;i++) L+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]); if(L<10) return null;
  const P=d.PLAYER; if(P.car) return null; P.x=pts[0][0]; P.z=pts[0][1]; P.y=d.heightAt(P.x,P.z)+0.3; P.vy=0; P.low=null; __step(5,1/30); const T=d.THREE, rc=new T.Raycaster(); const issues=[]; const name=rd[1]>=0?D.S[rd[1]]:'';
  const add=(kind,msg)=>{ if(!issues.some(q=>q.kind===kind)) issues.push({kind,msg,x:Math.round(P.x),z:Math.round(P.z),y:+P.y.toFixed(1),ri,name,type:D.RT[rd[0]]}); };
  let wp=1, stuck=0, last=[P.x,P.z];
  for (let k=0;k<30*Math.max(25,L/3+10);k++){ while(wp<pts.length-1 && Math.hypot(pts[wp][0]-P.x,pts[wp][1]-P.z)<1.5) wp++; const g=pts[wp]; const h=Math.atan2(g[0]-P.x,g[1]-P.z); P.h=h; d.CAM.yaw=h; __step(1,1/30,['KeyW']);
    if (k%6===0 && P.onGround && !P.low && !P.onDeck) { const col=window.__REV.column(P.x,P.z).filter(h=>h.ny>0.6 && h.y<P.y+1.2); const top=col[0];
      if (top && top.y>P.y+0.25) add('hundido','El personaje se hunde '+(top.y-P.y).toFixed(2)+' m bajo la superficie visible ('+(top.mat||'suelo')+')'); }
    if (Math.hypot(P.x-last[0],P.z-last[1])<0.01) stuck++; else stuck=0; last=[P.x,P.z]; if (stuck>45) { const B=window.__REV.bldAt(P.x+Math.sin(P.h)*1.2,P.z+Math.cos(P.h)*1.2); add(B?'edificio':'atasco', B?'Un edificio tapa el camino'+(B.name?' ('+B.name+')':''):'El personaje se queda atascado andando por el camino'); break; }
    if (Math.hypot(pts[pts.length-1][0]-P.x,pts[pts.length-1][1]-P.z)<1.5) break; }
  if (issues.length) { d.camera.position.set(P.x-6,P.y+4,P.z-6); d.camera.lookAt(P.x,P.y+1,P.z); }
  return {issues}; }
"""

SURF = r"""
(ri)=>{ const d=__dbg, D=d.DATA, rd=D.R[ri]; const c=rd[4]; const T=d.THREE, rc=new T.Raycaster(); const issues=[]; const name=rd[1]>=0?D.S[rd[1]]:''; const RY=d.ROADY[ri]||((s,x,z)=>d.heightAt(x,z));
  const add=(kind,msg,x,z,y)=>{ if(issues.filter(q=>q.kind===kind).length<2 && !issues.some(q=>q.kind===kind&&Math.hypot(q.x-x,q.z-z)<30)) issues.push({kind,msg,x:Math.round(x),z:Math.round(z),y:+y.toFixed(1),ri,name,type:D.RT[rd[0]]}); };
  const lowRoad = d.DEP.has(ri) || (rd[3]&6);
  let s=0; for(let i=0;i+3<c.length;i+=2){ const x1=c[i],z1=c[i+1],x2=c[i+2],z2=c[i+3]; const L=Math.hypot(x2-x1,z2-z1); for(let u=2;u<L;u+=6){ const x=x1+(x2-x1)*u/L, z=z1+(z2-z1)*u/L; const ry=RY(s+u,x,z);
      /* reference = the asphalt actually drawn here (not the theoretical road height): anything flat above it overlaps */
      const col=window.__REV.column(x,z).filter(h=>h.ny>0.7 && h.y<ry+3.5 && h.y>ry-1.2); const R=window.__REV;
      const road=col.find(h=>R.ROADMATS.has(h.mat) && Math.abs(h.y-ry)<0.8);
      if (road && !lowRoad) for (const h of col) { const dy=h.y-road.y; if (dy<=0.05) break; if (h.obj===road.obj) continue;
        const m=Array.isArray(h.obj.material)?h.obj.material[0]:h.obj.material; const what=h.mat?'«'+h.mat+'»':R.objName(h.obj,m);
        if (dy<0.6) { if (R.ROADMATS.has(h.mat) && h.mat!=='footway') continue; add('textura',`Superficie ${what} ${dy.toFixed(2)} m por encima del asfalto`,x,z,road.y); break; }
        if (dy<3.2) { add('objeto',`Algo plano (${what}) flota ${dy.toFixed(1)} m sobre la calzada`,x,z,road.y); break; } }
      if (!lowRoad && ry < d.heightAt(x,z)-0.25) add('bajo_terreno','La calzada queda '+(d.heightAt(x,z)-ry).toFixed(2)+' m por debajo del terreno',x,z,ry); }
    s+=L; }
  if (issues.length) { const q=issues[0]; d.camera.position.set(q.x-9,q.y+7,q.z-9); d.camera.lookAt(q.x,q.y,q.z); }
  return {issues}; }
"""


async def snap_to(pg, path):
    d = await pg.evaluate("window.__snap()")
    try:
        from PIL import Image
        im = Image.open(io.BytesIO(base64.b64decode(d.split(',')[1]))).convert('RGB'); im.thumbnail((640, 360)); im.save(path, quality=68)
    except ImportError:
        open(path, 'wb').write(base64.b64decode(d.split(',')[1]))


def prune_images():
    """Keep only the captures used by the last full report (the folder goes to the repo)."""
    keep = set(); js = sorted(f for f in os.listdir(REP) if f.startswith('revision_v') and f.endswith('.json'))
    for f in js[-1:]:
        try: keep |= {q['img'][4:] for q in json.load(open(os.path.join(REP, f), encoding='utf-8'))['avisos'] if q.get('img')}
        except Exception: pass
    for f in os.listdir(IMG):
        if f not in keep: os.remove(os.path.join(IMG, f))


NAMES = {'atasco': 'Atascos', 'fuera': 'Se sale de la calzada', 'vuela': 'Vuela sobre la calzada', 'hundido': 'Se hunde', 'techo': 'Roza el techo', 'salto': 'Saltos de altura', 'no_llega': 'No termina el recorrido',
         'textura': 'Texturas cruzadas (suelo sobre la carretera)', 'objeto': 'Objetos flotando sobre la calzada', 'bajo_terreno': 'Calzada bajo el terreno', 'edificio': 'Edificios sobre la vía', 'error': 'Errores de la prueba', 'error_js': 'Errores de JavaScript'}
FECHA = datetime.datetime.now().strftime('%Y-%m-%d_%H%M')
BASE = os.path.join(REP, f'revision_v{VER}_{FECHA}') if '--vias' not in sys.argv and '--pruebas' not in sys.argv else os.path.join(REP, 'tmp', f'recheck_{FECHA}')
os.makedirs(os.path.dirname(BASE), exist_ok=True)
LOG = BASE + '_registro.txt'


def log(line):
    """Registro en vivo: cada hallazgo se escribe al momento (se puede abrir mientras el agente sigue)."""
    print(line, flush=True)
    with open(LOG, 'a', encoding='utf-8') as f: f.write(line + '\n')


def prev_report():
    """El informe .json más reciente de una versión anterior (para comparar)."""
    js = sorted(f for f in os.listdir(REP) if f.startswith('revision_v') and f.endswith('.json') and not f.startswith(f'revision_v{VER}_'))
    for f in reversed(js):
        try:
            d = json.load(open(os.path.join(REP, f), encoding='utf-8'))
            if d.get('estado') == 'terminado': return f, d
        except Exception: pass
    return None, None


def key(q): return f"{q['kind']}#{q.get('ri')}"


def write_report(issues, plan, checked, t0, estado, prev=None):
    """Se reescribe tras cada tanda de vías: el informe está siempre al día aunque el agente no haya terminado."""
    pf, pd = prev or (None, None)
    old = {key(q): q for q in (pd or {}).get('avisos', [])}
    for q in issues: q['estado'] = ('sigue' if key(q) in old else 'nuevo') if pd else 'nuevo'
    now = {key(q) for q in issues}
    fixed = [q for k, q in old.items() if k not in now and q.get('ri') in checked.get(q.get('prueba_k', ''), set())] if pd else []
    json.dump({'version': VER, 'fecha': FECHA, 'estado': estado, 'zonas': ZONES, 'plan': {k: len(v) for k, v in plan.items()},
               'avisos': issues, 'arreglados': fixed, 'comparado_con': pf}, open(BASE + '.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    nN = sum(q['estado'] == 'nuevo' for q in issues)
    L = [f'# Revisión de jugabilidad — v{VER} ({FECHA.replace("_", " ")})', '',
         f'Agente revisor automático. Estado: **{estado}**. Tiempo: {round(time.time() - t0)} s.', '',
         f'- Zonas nuevas de esta versión: {", ".join(z["nombre"] for z in ZONES)}.',
         f'- Plan: ' + ', '.join(f'{k} {len(v)}' for k, v in plan.items()) + '.',
         f'- Comparado con: {pf or "— (primer informe)"}.', '',
         f'**{len(issues)} avisos: {nN} nuevos, {len(issues) - nN} siguen; {len(fixed)} arreglados desde el informe anterior.**', '']
    if fixed:
        L += ['## Arreglados', '', '| X | Z | Vía | Tipo |', '|---|---|---|---|']
        L += [f"| {q.get('x')} | {q.get('z')} | {q.get('name') or q.get('type', '')} (#{q.get('ri')}) | {NAMES.get(q['kind'], q['kind'])} |" for q in fixed[:60]]
        L.append('')
    by = {}
    for q in issues: by.setdefault(q['kind'], []).append(q)
    for k, lst in sorted(by.items(), key=lambda kv: -len(kv[1])):
        lst.sort(key=lambda q: (q['estado'] != 'nuevo', q.get('pasada', '')))
        L.append(f'## {NAMES.get(k, k)} ({len(lst)})'); L.append('')
        L.append('| | X | Z | Vía | Pasada | Prueba | Detalle | Captura |'); L.append('|---|---|---|---|---|---|---|---|')
        for q in lst[:80]:
            L.append(f"| {'🆕' if q['estado'] == 'nuevo' else '↻'} | {q.get('x', '')} | {q.get('z', '')} | {q.get('name') or q.get('type', '')} (#{q.get('ri', '')}) | {q.get('pasada', '')} | {q.get('prueba', '')} | {q['msg']} | {('![](' + q['img'] + ')') if q.get('img') else ''} |")
        L.append('')
    txt = '\n'.join(L)
    open(BASE + '.md', 'w', encoding='utf-8').write(txt)
    if '/tmp/' not in BASE.replace(os.sep, '/'): open(os.path.join(REP, 'ULTIMO.md'), 'w', encoding='utf-8').write(txt)


def make_plan(roads):
    """A zonas nuevas + B riesgo + C rotación (las vías normales que hace más que no se revisan)."""
    cob = json.load(open(COB, encoding='utf-8')) if os.path.exists(COB) else {}
    plan = {'surf': [], 'walk': [], 'drive': []}; tag = {}
    if VIAS is not None:
        for ri, car, hit, risky in roads:
            if ri in VIAS:
                for k in (('surf', 'drive') if car else ('walk',)): plan[k].append(ri); tag[(k, ri)] = 'recomprobación'
        return plan, tag, cob
    def put(k, ri, why):
        if (k, ri) not in tag: plan[k].append(ri); tag[(k, ri)] = why
    for ri, car, hit, risky in roads:
        if hit or ALL:
            for k in (('surf', 'drive') if car else ('walk',)): put(k, ri, 'zona nueva' if hit else 'mapa entero')
    if not SOLO_Z:
        for ri, car, hit, risky in roads:
            if car and risky: put('drive', ri, 'riesgo'); put('surf', ri, 'riesgo')
        for k, want in (('drive', LOTE), ('surf', LOTE), ('walk', LOTE // 3)):
            pool = [ri for ri, car, hit, risky in roads if (car if k != 'walk' else not car) and (k, ri) not in tag]
            pool.sort(key=lambda ri: cob.get(f'{k}:{ri}', ''))  # nunca revisadas primero, luego las más antiguas
            for ri in pool[:want]: put(k, ri, 'rotación')
    return plan, tag, cob


async def main():
    srv = subprocess.Popen([sys.executable, '-m', 'http.server', '8766'], cwd=os.path.join(ROOT, 'dist'), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    t0 = time.time(); issues = []; plan = {}; checked = {}; prev = prev_report(); cob = {}
    log(f'== Agente revisor v{VER} — {FECHA} — zonas nuevas: {", ".join(z["nombre"] for z in ZONES)}')
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch(args=['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
            pg = await b.new_page(viewport={'width': 960, 'height': 540})
            errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            async def load():
                await pg.goto('http://localhost:8766/test.html?q=baja'); await pg.wait_for_function('window.__GAME_READY', timeout=240000)
                await pg.evaluate(SETUP)
            await load()
            roads = json.loads(await pg.evaluate(SELECT, {'zones': ZONES}))
            plan, tag, cob = make_plan(roads)
            log('plan: ' + ', '.join(f'{k} {len(v)} ({sum(tag[(k, r)] == "zona nueva" for r in v)} zona nueva, {sum(tag[(k, r)] == "riesgo" for r in v)} riesgo, {sum(tag[(k, r)] == "rotación" for r in v)} rotación)' for k, v in plan.items()))
            n = 0
            for kind, js in [(k, j) for k, j in (('surf', SURF), ('drive', DRIVE), ('walk', WALK)) if k in PRUEBAS]:
                prueba = {'surf': 'superficies', 'walk': 'a pie', 'drive': 'en coche'}[kind]; lst = plan[kind]; checked[kind] = set()
                log(f'-- {prueba}: {len(lst)} vías')
                for j, ri in enumerate(lst):
                    if j and j % 50 == 0: log(f'   … {prueba} {j}/{len(lst)} ({round(time.time() - t0)} s)')
                    try: r = await asyncio.wait_for(pg.evaluate(js, ri), 90)
                    except asyncio.TimeoutError:
                        q = {'kind': 'error', 'msg': 'La prueba de esta vía no termina (más de 90 s): se recarga el juego', 'ri': ri, 'x': 0, 'z': 0, 'prueba': prueba, 'prueba_k': kind, 'pasada': tag[(kind, ri)]}; issues.append(q); log(f'[{prueba}] ERROR vía #{ri}: {q["msg"]}')
                        try: await pg.close()
                        except Exception: pass
                        pg = await b.new_page(viewport={'width': 960, 'height': 540}); pg.on('pageerror', lambda e: errs.append(str(e))); await load(); continue
                    except Exception as e:
                        q = {'kind': 'error', 'msg': str(e)[:200], 'ri': ri, 'x': 0, 'z': 0, 'prueba': prueba, 'prueba_k': kind, 'pasada': tag[(kind, ri)]}; issues.append(q); log(f'[{prueba}] ERROR vía #{ri}: {q["msg"]}'); continue
                    checked[kind].add(ri); cob[f'{kind}:{ri}'] = FECHA
                    if r and r['issues']:
                        for q in r['issues']:
                            q['prueba'] = prueba; q['prueba_k'] = kind; q['pasada'] = tag[(kind, ri)]
                            if n < 400:
                                n += 1; fn = f'v{VER}_{FECHA}_{n:03d}.jpg'; await snap_to(pg, os.path.join(IMG, fn)); q['img'] = 'img/' + fn
                            issues.append(q)
                            log(f'[{prueba} · {q["pasada"]}] {NAMES.get(q["kind"], q["kind"])} en X {q["x"]} Z {q["z"]} — {q.get("name") or q.get("type", "")} (#{ri}): {q["msg"]}')
                        await pg.evaluate("__dbg.GAME.state='play'")
                    if (j + 1) % 25 == 0:
                        write_report(issues, plan, checked, t0, f'en curso ({prueba} {j + 1}/{len(lst)})', prev)
                        if VIAS is None: json.dump(cob, open(COB, "w", encoding="utf-8"))
                write_report(issues, plan, checked, t0, f'en curso ({prueba} terminado)', prev)
                log(f'-- {prueba} hecho: {len(issues)} avisos acumulados, {round(time.time() - t0)} s')
            for e in errs[:20]:
                issues.append({'kind': 'error_js', 'msg': e[:300], 'x': 0, 'z': 0, 'prueba': 'carga'}); log('[js] ' + e[:300])
            await b.close()
    finally:
        srv.terminate()
        if VIAS is None: json.dump(cob, open(COB, 'w', encoding='utf-8'))
        tot = {k: sum(1 for c in cob if c.startswith(k + ':')) for k in ('surf', 'drive', 'walk')}
        log(f'cobertura acumulada del mapa (vías revisadas alguna vez): {tot}')
        write_report(issues, plan, checked, t0, 'terminado', prev)
    if VIAS is None and '--pruebas' not in sys.argv: prune_images()
    log(f'== INFORME {BASE}.md — {len(issues)} avisos')


asyncio.run(main())
