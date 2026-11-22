import base64
from pathlib import Path


async def run(pg):
    try:
        result = await pg.evaluate("""() => {
          const d = __dbg, {renderer,THREE} = d;
          const g = d.GAME;
          document.getElementById('menu').style.display = 'none';
          g.state = 'play';
          const incoming = [];
          d.AUDIO.init();
          const playback = d.STEPS.play;
          try {
            d.STEPS.play = (surface,gait,volume) => incoming.push([surface,gait,volume]);
            d.AUDIO.footstep(false,false,'hard');
            d.AUDIO.footstep(true,false,'stone',1.2);
          } finally {
            d.STEPS.play = playback;
          }
          const candidates = Object.values(d.VMODELS).filter(m => m.tail && m.lod && m.phys !== 'moto');
          const missing = candidates.filter(m => !d.modelGeometry(m).rest?.attributes.lampMask).map(m => m.id);
          const geometry = d.modelGeometry(d.VMODELS.carlota).rest;
          const {position,lampMask} = geometry.attributes;
          const lampX = Array.from(lampMask.array, (lit,index) => lit ? position.getX(index) : null).filter(x => x !== null);
          const lensOnly = lampX.some(x => x < -.4) && lampX.some(x => x > .4) && lampX.every(x => Math.abs(x) > .4);
          const old = g.tod;
          const size = renderer.getSize(new THREE.Vector2());
          const car = new d.Car(null,0x805529,-167,254,0,d.VMODELS.carlota);
          const darkMat = car.lightBody?.material;
          if (!darkMat) throw Error('El Carlota no trae una máscara de faros');
          const level = () => {
            const shader = {uniforms:{},vertexShader:'',fragmentShader:''};
            car.lightBody.material.onBeforeCompile(shader);
            return shader.uniforms.carHeadlightLevel?.value;
          };
          const images = {};
          const preview = new THREE.Scene();
          preview.background = new THREE.Color(0x26374d);
          preview.add(new THREE.HemisphereLight(0xc0d8ff,0x34303b,1.35));
          const key = new THREE.DirectionalLight(0xe4edff,2);
          key.position.set(-3,5,4);
          preview.add(key);
          const previewCamera = new THREE.PerspectiveCamera(35,1100/620,.1,50);
          previewCamera.position.set(-2.8,1.65,6.3);
          previewCamera.lookAt(0,.7,.2);
          function capture(name) {
            const model = car.mesh.clone();
            model.position.set(0,0,0);
            model.rotation.set(0,0,0);
            model.visible = true;
            preview.add(model);
            renderer.setSize(1100,620,false);
            renderer.clear();
            renderer.render(preview,previewCamera);
            images[name] = renderer.domElement.toDataURL('image/jpeg',.9);
            preview.remove(model);
          }
          try {
            car.driver = 'ai';
            car.sync(.016);
            const custom = car.lightBody.material !== darkMat;
            g.tod = 12; __step(4); car.sync(.016);
            const noon = level();
            g.tod = 1; __step(4); car.sync(.016);
            const night = level();
            capture('encendidos');
            car.driver = null; car.sync(.016);
            capture('apagados');
            window.__lampSnapshots = images;
            return {incoming, modelCount:candidates.length, missing, custom, lensOnly,
                    noon, night, idle:car.lightBody.material === darkMat,
                    sameGeometry:car.lightBody.geometry === d.modelGeometry(d.VMODELS.carlota).rest};
          } finally {
            car.remove();
            renderer.setSize(size.x,size.y,false);
            g.tod = old;
            __step(3);
          }
        }""")
        assert result["incoming"] == [["hard","walk",0.5],["stone","run",0.6]], result
        assert result["modelCount"] >= 45 and not result["missing"], result
        assert result["custom"] and result["idle"] and result["sameGeometry"] and result["lensOnly"], result
        assert result["noon"] < .1 and result["night"] >= 3, result
        for label, data in (await pg.evaluate("window.__lampSnapshots")).items():
            (Path("shots") / f"faros1437_{label}.jpg").write_bytes(base64.b64decode(data.split(",")[1]))
        print(result)
        print("FAROS Y PASOS OK")
    except Exception as issue:
        print("FALLA", repr(issue))
