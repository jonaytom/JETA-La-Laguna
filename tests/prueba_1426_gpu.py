import base64
from pathlib import Path


async def run(pg):
    result = await pg.evaluate("""() => {
      const d = __dbg;
      const model = d.VMODELS.mpyou;
      const car = new d.Car(null, 0xc94a18, d.PLAYER.x + 4, d.PLAYER.z, 0, model);
      const mesh = car.body.children.find(m => m.material === car.paint);
      const near = mesh?.geometry.attributes.position.count || 0;
      const slots = d.PARKED.slots;
      const counts = new Map();
      const colors = new Set();
      let white = 0;
      for (const slot of slots) {
        colors.add(slot.color);
        if (slot.color === 0xf2f2f2) white++;
        counts.set(slot.type, (counts.get(slot.type) ?? 0) + 1);
      }
      const parked = slots.find(s => s.type === 'mpyou' && s.inst && s.color === 0xc94a18)
        || slots.find(s => s.type === 'mpyou' && s.inst);
      const chunk = d.PARKED.chunks.find(c => c.mesh === parked?.inst);
      const sample = new d.THREE.Color();
      parked?.inst.getColorAt(parked.idx, sample);
      const profiles = {};
      for (const id of ['reventon', 'fierilla', 'guancheGT', 'seta128', 'daily', 'basura', 'agility']) {
        const other = new d.Car(null, null, car.x, car.z, 0, d.VMODELS[id]);
        profiles[id] = [Math.round(other.T.maxV * 3.6), other.T.acc];
        other.remove();
      }
      const service = new d.Car(null, 0xc94a18, car.x, car.z, 0, d.VMODELS.taxi);
      const livery = service.paint.color.getHex();
      service.remove();
      const oldPaint = car.paint;
      car.remove();
      const again = new d.Car(null, 0x1484c5, car.x, car.z, 0, model);
      const reused = again.paint === oldPaint && again.paint.color.getHex() === 0x1484c5;
      window.__manual = true;
      document.getElementById('menu').style.display = 'none';
      d.GAME.state = 'play';
      d.GAME.tod = 12;
      if (parked) {
        d.PLAYER.x = parked.x; d.PLAYER.z = parked.z;
        again.x = parked.x + Math.cos(parked.h) * 2.4;
        again.z = parked.z - Math.sin(parked.h) * 2.4;
        again.h = parked.h;
        __step(2);
        const y = d.heightAt(parked.x, parked.z);
        const cx = Math.cos(parked.h), sx = Math.sin(parked.h);
        d.camera.position.set(parked.x + cx * 5.7 + sx * 6, y + 3, parked.z - sx * 5.7 + cx * 6);
        d.camera.lookAt(parked.x + cx, y + .65, parked.z - sx);
        d.camera.updateMatrixWorld();
      }
      return {near, wheels:again.wheels.length, far:!!chunk?.lo?.attributes.aPaint.array.includes(1),
        parked:counts.get('mpyou'), total:slots.length, white:white / slots.length, colors:colors.size,
        represented: counts.size,
        paintedInstance: !!parked && sample.getHex() === parked.color,
        profiles, reused, livery};
    }""")
    print(result)
    shot = await pg.evaluate('window.__snap()')
    Path('shots/mpyou_en_juego.jpg').write_bytes(base64.b64decode(shot.split(',')[1]))
    profiles = result['profiles']
    ok = (
        result['near'] > 0 and result['wheels'] == 4 and result['far'] and result['parked'] > 0
        and .06 < result['white'] < .13 and result['colors'] >= 17 and result['paintedInstance']
        and result['represented'] >= 40 and result['reused'] and result['livery'] == 0xf6f6f4
        and profiles['reventon'][0] > profiles['fierilla'][0] > profiles['guancheGT'][0] > profiles['seta128'][0]
        and profiles['reventon'][1] > profiles['fierilla'][1] > profiles['guancheGT'][1] > profiles['seta128'][1]
        and profiles['seta128'][0] > profiles['daily'][0] > profiles['basura'][0] > profiles['agility'][0]
    )
    print('PRUEBA MP YOU', 'OK' if ok else 'FALLA')
