import base64
from pathlib import Path


async def run(pg):
    result = await pg.evaluate("""() => {
      const d = __dbg;
      const x = -1338, z = -720;
      const highColor = [66, 102, 48].map(c => (c / 255) ** 2.2);
      const barkColor = [107, 83, 64].map(c => (c / 255) ** 2.2);
      function hasColor(geo, expected) {
        const color = geo?.getAttribute('color');
        return color && color.count === geo.getAttribute('position').count &&
          color.array.every((v, i) => Math.abs(v - expected[i % 3]) < 1e-6);
      }
      const localPines = d.TREES.filter(t => t[2] === 2 && Math.hypot(t[0] - x, t[1] - z) < 150);
      const near = localPines.sort((a,b) => Math.hypot(a[0] - x, a[1] - z) - Math.hypot(b[0] - x, b[1] - z))[0];
      if (!near) throw Error('No se encontró ningún pino en Camino Tornero');
      const [tx, tz] = near;
      const {renderer, scene, camera, THREE, LOD} = d;
      const matrix = new THREE.Matrix4();
      const local = LOD.items.filter(({m}) => {
        if (!m.isInstancedMesh) return false;
        for (let i = 0; i < m.count; i++) {
          m.getMatrixAt(i, matrix);
          if (Math.hypot(matrix.elements[12] - tx, matrix.elements[14] - tz) < 0.02) return true;
        }
        return false;
      });
      const crown = local.find(it => hasColor(it.hi, highColor) && hasColor(it.lo, highColor));
      const trunk = local.find(it => hasColor(it.hi, barkColor));
      if (!crown || !trunk) throw Error('La copa o la corteza del pino conservan un color incorrecto');

      window.__manual = true;
      d.GAME.state = 'play';
      d.GAME.tod = 11;
      d.PLAYER.x = x; d.PLAYER.z = z;
      __step(4);
      const [sky, skyCamera] = window.__bg;
      const size = renderer.getSize(new THREE.Vector2());
      const h = d.heightAt(x, z);
      const target = new THREE.Vector3(tx, d.heightAt(tx, tz) + 4, tz);
      const direction = new THREE.Vector3(x - tx, 0, z - tz).normalize();
      camera.position.copy(target).addScaledVector(direction, Math.max(20, Math.hypot(x - tx, z - tz)));
      camera.position.y = h + 3;
      camera.lookAt(target);
      camera.updateMatrixWorld(true);
      skyCamera.position.copy(camera.position);
      skyCamera.quaternion.copy(camera.quaternion);
      skyCamera.updateMatrixWorld(true);
      d.updateCityLOD(true);
      if (crown.m.geometry !== crown.hi) throw Error('No se dibuja la copa cercana');
      renderer.setSize(1280, 720, false);
      renderer.clear(); renderer.render(sky, skyCamera); renderer.clearDepth(); renderer.render(scene, camera);
      window.__pineShot = renderer.domElement.toDataURL('image/jpeg', .9);
      renderer.setSize(size.x, size.y, false);
      return {pines: localPines.length, closest: [tx,tz], crownVertices: crown.hi.getAttribute('position').count,
              farVertices: crown.lo.getAttribute('position').count, trunkVertices: trunk.hi.getAttribute('position').count};
    }""")
    photo = await pg.evaluate("window.__pineShot")
    (Path("shots") / "camino_tornero_pinos_1430.jpg").write_bytes(base64.b64decode(photo.split(",")[1]))
    print(result)
    print("PINOS CAMINO TORNERO OK")
