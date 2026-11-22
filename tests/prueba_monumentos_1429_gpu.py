import base64
from pathlib import Path


async def run(pg):
    result = await pg.evaluate("""() => {
      const d = __dbg, {THREE, LOD, renderer: r, scene, camera} = d;
      const gl = r.getContext(), [sky, skyCamera] = window.__bg;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const sun = scene.children.find(o => o.isDirectionalLight && o.castShadow);
      const report = {gpu: ext && gl.getParameter(ext.UNMASKED_RENDERER_WEBGL), shadow: sun?.shadow.mapSize.x,
                      batches: LOD.landmarks.length, pieces: 0, groups: {}, views: []};
      const tri = g => (g.index?.count ?? g.attributes.position.count) / 3;
      for (const {parent, pieces, mesh} of LOD.landmarks) {
        if (mesh.parent !== parent || mesh.geometry && tri(mesh.geometry) !== pieces.reduce((sum, o) => sum + tri(o.geometry), 0))
          throw Error('Triángulos o jerarquía distintos');
        if (pieces.some(o => o.material !== mesh.material || o.castShadow !== mesh.castShadow || o.receiveShadow !== mesh.receiveShadow || o.renderOrder !== mesh.renderOrder))
          throw Error('Material, orden de dibujo o sombras distintos');
        report.pieces += pieces.length;
        let root = parent;
        while (!root.userData.batchLandmark) root = root.parent;
        const group = report.groups[root.name] ??= {pieces: 0, batches: 0};
        group.pieces += pieces.length;
        group.batches++;
      }
      const setBatching = enabled => {
        for (const {parent, pieces, mesh} of LOD.landmarks) {
          if (enabled) { parent.remove(...pieces); parent.add(mesh); }
          else { parent.remove(mesh); parent.add(...pieces); }
        }
      };
      const previousSize = r.getSize(new THREE.Vector2()), previousRatio = r.getPixelRatio();
      r.setPixelRatio(1);
      r.setSize(1920, 1080, false);
      const canvas = document.createElement('canvas');
      canvas.width = 1920; canvas.height = 1080;
      const ctx = canvas.getContext('2d', {willReadFrequently: true});
      const paint = () => {
        r.clear(); r.render(sky, skyCamera); r.clearDepth(); r.render(scene, camera); gl.finish();
      };
      const shots = window.__landmarkShots = {};
      const targets = [
        ['concepcion', 'La Concepción'], ['estadio', 'Estadio Francisco Peraza'],
        ['aeropuerto', 'aeropuerto'], ['inicio', 'inicio'],
      ];
      try {
        window.__manual = true;
        d.GAME.state = 'play';
        d.GAME.tod = 12;
        document.getElementById('menu').style.display = 'none';
        for (const [label, rootName] of targets) {
          const batches = LOD.landmarks.filter(({mesh}) => {
            for (let o = mesh.parent; o; o = o.parent) if (o.name === rootName) return true;
            return false;
          });
          if (!batches.length) continue;
          const focus = batches.reduce((a,b) => a.pieces.length > b.pieces.length ? a : b).mesh;
          focus.updateWorldMatrix(true, false);
          const {center, radius} = focus.geometry.boundingSphere;
          const target = center.clone().applyMatrix4(focus.matrixWorld);
          const distance = Math.min(65, Math.max(13, radius * 2.7));
          d.PLAYER.x = target.x + distance; d.PLAYER.z = target.z + distance;
          __step(4);
          camera.position.set(d.PLAYER.x, Math.max(d.heightAt(d.PLAYER.x, d.PLAYER.z) + 4, target.y + distance * 0.36), d.PLAYER.z);
          camera.lookAt(target);
          camera.updateMatrixWorld(true);
          skyCamera.position.copy(camera.position);
          skyCamera.quaternion.copy(camera.quaternion);
          skyCamera.updateMatrixWorld(true);
          d.updateCityLOD(true);
          r.info.autoReset = false;
          const runs = [];
          let before;
          let diff;
          for (const [i, enabled] of [false, true, true, false].entries()) {
            setBatching(enabled);
            const times = [];
            let calls = 0, tris = 0;
            for (let n = 0; n < 18; n++) {
              r.info.reset();
              const start = performance.now();
              paint();
              if (n >= 6) {
                times.push(performance.now() - start);
                calls += r.info.render.calls;
                tris += r.info.render.triangles;
              }
            }
            times.sort((a,b) => a-b);
            runs.push({ms: times[6], calls: calls / times.length, tris: tris / times.length});
            if (i < 2) {
              ctx.drawImage(r.domElement, 0, 0);
              const pixels = ctx.getImageData(0,0,canvas.width,canvas.height).data;
              if (i === 0) before = pixels;
              else {
                let changed = 0, sum = 0;
                for (let p = 0; p < pixels.length; p += 4) {
                  const delta = Math.max(Math.abs(pixels[p]-before[p]), Math.abs(pixels[p+1]-before[p+1]), Math.abs(pixels[p+2]-before[p+2]));
                  changed += delta > 12;
                  sum += delta;
                }
                diff = {changed: changed / (canvas.width * canvas.height), mean: sum / (canvas.width * canvas.height)};
              }
              shots[label + (enabled ? '_agrupado' : '_anterior')] = canvas.toDataURL('image/jpeg', .9);
            }
          }
          report.views.push({label, runs, diff});
          setBatching(true);
        }
      } finally {
        setBatching(true);
        r.info.autoReset = true;
        r.setPixelRatio(previousRatio);
        r.setSize(previousSize.x, previousSize.y, false);
      }
      return report;
    }""")
    for name, image in (await pg.evaluate("window.__landmarkShots")).items():
        (Path("shots") / f"monumentos1429_{name}.jpg").write_bytes(base64.b64decode(image.split(",")[1]))
    print(result)
    saved = sum((v['runs'][0]['calls'] + v['runs'][3]['calls'] - v['runs'][1]['calls'] - v['runs'][2]['calls']) / 2
                for v in result['views'])
    passed = (result['shadow'] and result['batches'] > 0 and len(result['views']) >= 2 and saved > 0 and
              all(v['diff']['changed'] < .01 for v in result['views']))
    print('MONUMENTOS', 'OK' if passed else 'FALLA')
