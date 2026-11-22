import base64
from pathlib import Path


async def run(pg):
    result = await pg.evaluate('''() => {
      const d=__dbg, camera=d.camera, scene=d.scene, r=d.renderer, lod=d.LOD;
      const fog=scene.fog, [sky, skyCamera]=window.__bg, gl=r.getContext();
      const previous={x:camera.position.x,y:camera.position.y,z:camera.position.z,q:camera.quaternion.clone(),fog:fog.far};
      const mainFar=1075, previousFar=1150;
      const detail=160+previousFar*.15;
      const positions=[[-88,22],[-340,819],[-60,-230],[-1500,1500],[106,32],[1000,1900]];
      const check = () => {
        let bad=0, trees=0;
        for(const it of lod.items){
          const dist=Math.hypot(it.x-camera.position.x,it.z-camera.position.z)-it.r;
          const visible=dist<(it.d?detail:fog.far+40);
          if(it.m.visible!==visible) bad++;
          if(visible&&it.lo&&it.m.geometry!==(dist>170?it.lo:it.hi)) trees++;
        }
        return [bad,trees];
      };
      const oldUpdate=(x,z)=>{
        for(const it of lod.items){
          const dist=Math.hypot(it.x-x,it.z-z)-it.r;
          it.m.visible=dist<(it.d?detail:fog.far+40);
          if(it.lo){const mesh=dist>170?it.lo:it.hi;if(it.m.geometry!==mesh)it.m.geometry=mesh;}
        }
      };
      window.__manual=true;
      d.GAME.state='play';
      d.GAME.tod=12;
      document.getElementById('menu').style.display='none';
      const out={initial:previous.fog,bgFog:sky.fog.far,items:lod.items.length,buckets:lod.buckets.size,equivalence:[],timing:{},views:[]};
      for(const far of [previousFar, mainFar, previousFar, mainFar]){
        fog.far=far;
        for(const [x,z] of positions){
          camera.position.x=x;camera.position.z=z;
          d.updateCityLOD();
          out.equivalence.push(check());
        }
      }
      const bench=(method)=>{
        d.updateCityLOD(true);
        const start=performance.now();
        for(let j=0;j<30;j++)for(const [x,z] of positions){
          camera.position.x=x;camera.position.z=z;
          if(method==='before')oldUpdate(x,z); else d.updateCityLOD();
        }
        return (performance.now()-start)/(30*positions.length);
      };
      out.timing.before=[bench('before')];
      out.timing.after=[bench('after'),bench('after')];
      out.timing.before.push(bench('before'));
      const size=r.getSize(new d.THREE.Vector2());
      r.setSize(1280,720,false);
      function paint(){r.clear();r.render(sky,skyCamera);r.clearDepth();r.render(scene,camera);gl.finish();}
      for(const [name,x,z,lx,lz,h] of [
        ['trinidad',-88,22,-112,95,8],['ronda',-340,819,-320,866,7],['mirador',-200,300,300,-600,110]
      ]){
        d.PLAYER.x=x;d.PLAYER.z=z;__step(5);
        camera.position.set(x,d.heightAt(x,z)+h,z);
        camera.lookAt(lx,d.heightAt(lx,lz)+2,lz);camera.updateMatrixWorld();
        skyCamera.position.copy(camera.position);skyCamera.quaternion.copy(camera.quaternion);skyCamera.updateMatrixWorld();
        const runs=[];
        for(const [index,far] of [previousFar,mainFar,mainFar,previousFar].entries()){
          fog.far=far;d.updateCityLOD(true);
          const times=[];
          r.info.autoReset=false;
          let calls=0;
          for(let i=0;i<22;i++){
            r.info.reset();const t=performance.now();paint();
            if(i>=6){times.push(performance.now()-t);calls+=r.info.render.calls;}
          }
          r.info.autoReset=true;
          times.sort((a,b)=>a-b);
          runs.push([times[8],calls/16]);
          if(index<2){
            window.__horizonShots??={};
            window.__horizonShots[name+(index?'_nuevo':'_anterior')]=r.domElement.toDataURL('image/jpeg',.88);
          }
        }
        out.views.push({name,runs});
      }
      fog.far=previous.fog;
      camera.position.set(previous.x,previous.y,previous.z);camera.quaternion.copy(previous.q);camera.updateMatrixWorld();
      r.setSize(size.x,size.y,false);d.updateCityLOD(true);
      return out;
    }''')
    images = await pg.evaluate('window.__horizonShots')
    for name, data in images.items():
        (Path('shots') / f'horizonte1428_{name}.jpg').write_bytes(base64.b64decode(data.split(',')[1]))
    print(result)
    saved_calls = sum((x['runs'][0][1]+x['runs'][3][1]-x['runs'][1][1]-x['runs'][2][1])/2 for x in result['views'])
    print('HORIZONTE', 'OK' if len(images) == 6 and saved_calls > 0 and result['initial'] == 1075
          and all(not any(pair) for pair in result['equivalence']) else 'FALLA')
