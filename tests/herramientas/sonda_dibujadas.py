# Qué se pinta de verdad en un fotograma (v1.0.0): engancha onBeforeRender de todas las mallas, pinta un fotograma en
# varios sitios y agrupa las llamadas de dibujo por clase (trozos de ciudad, juntadas, instanciadas, aparcados, sueltas)
# y, las sueltas, por de dónde cuelgan, tipo de geometría, si son transparentes, si tienen huesos y a qué distancia.
# Separa la pasada de sombras de la normal. Uso: herramientas/sonda_dibujadas.py en una lista → shots/sonda_dibujadas.txt
import json
SITIOS = [[None, None, None, None, None, 'inicio'], [-60, -230, -10, -150, 1.7, 'casco a pie'], [-88, 22, -112, 95, 1.7, 'La Trinidad a pie'], [-1937, -232, -1800, -220, 4, 'autopista']]
LOG = []
def out(*a):
    t = ' '.join(str(x) for x in a); LOG.append(t); print(t)
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    for x, z, lx, lz, h, nm in SITIOS:
        if x is not None:
            await pg.evaluate("([x,z,lx,lz,h])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(4); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx,d.heightAt(lx,lz)+(h>3?0:1.2),lz); d.camera.updateMatrixWorld(); }", [x, z, lx, lz, h])
        r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, T=d.THREE, S=d.scene, R=d.renderer, cam=d.camera, last=d.LOD&&d.LOD.stats&&d.LOD.stats.ultimoId; if (d.updateCityLOD) d.updateCityLOD(true);
          const rec=[]; const P=T.Mesh.prototype, orig=P.onBeforeRender; const wrap=new Map();
          // patch every visible mesh's onBeforeRender (own functions included) to record it; the shadow pass has a camera of another kind
          S.traverse(o=>{ if(!o.isMesh) return; const f=o.onBeforeRender; wrap.set(o,f); o.onBeforeRender=function(r,sc,c,g,m,gr){ rec.push([o, c.isOrthographicCamera?1:0]); return f.call(this,r,sc,c,g,m,gr); }; });
          R.info.autoReset=false; R.info.reset(); R.render(S, cam); const calls=R.info.render.calls; R.info.autoReset=true;
          for (const [o,f] of wrap) o.onBeforeRender=f;
          const cls=(o)=>{ if(o.name.startsWith('chunk:')) return 'trozo de ciudad'; if(o.name==='fusion') return 'juntada'; if(o.name==='inst') return 'instanciada por celda'; if(o.name==='parked') return 'aparcados'; if(o.isInstancedMesh) return 'instanciada'; return null; };
          const g={}, v=new T.Vector3();
          for (const [o,sh] of rec) { let k=cls(o); if(!k){ let a=o, chain=[]; while(a&&a!==S){ if(a.name) chain.push(a.name); a=a.parent; } const mt=[].concat(o.material)[0];
              o.getWorldPosition(v); const dd=v.distanceTo(cam.position); k='suelta · '+(chain.slice(-1)[0]||'-')+' · '+o.geometry.type+(mt.transparent?' · transparente':'')+(o.isSkinnedMesh?' · huesos':'')+(last&&o.id>last?' · hecha después':'')+(dd>150?' · lejos':''); }
            const e=g[k]||(g[k]=[0,0]); e[sh]++; }
          return { calls, n:rec.length, g:Object.entries(g).sort((a,b)=>(b[1][0]+b[1][1])-(a[1][0]+a[1][1])).slice(0,40) }; })())"""))
        out(f"== {nm}: {r['calls']} llamadas ({r['n']} mallas pintadas)  [normal, sombras]")
        for k, (a, b) in r['g']: out(f'  {a:5d} {b:5d}  {k}')
    open('shots/sonda_dibujadas.txt', 'w', encoding='utf-8').write('\n'.join(LOG))
    print('SONDA DIBUJADAS OK')
