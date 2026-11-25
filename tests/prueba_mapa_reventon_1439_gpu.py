async def run(pg):
    result = await pg.evaluate("""() => {
      const d = __dbg, out = {};
      out.barrierScan = d.auditRoadBarriers().length === 0;
      const platforms = d.TRAM_PLATFORMS;
      const padre = platforms.filter(p => /Padre Anchieta/i.test(p.name));
      out.platforms = padre.length === 2 && platforms.length >= 8 && platforms.every(p => {
        const clearance = p.edges.every(([x,y,z]) =>
          y - d.heightAt(x,z) >= 0.03 && y - d.heightAt(x,z) < 0.33 && !d.roadAtBarrier(x,z,y-1,y+0.4,0));
        return clearance && Math.abs(p.edges[0][1] - d.heightAt(p.edges[0][0],p.edges[0][2]) - .035) < .001;
      });
      const grid = d.scene.getObjectByName('cebreado_pedro_zerolo');
      const pos = grid?.geometry.attributes.position;
      out.tramPaint = !!pos?.array && pos.count > 40 &&
        Array.from({length:pos.count}, (_,i) => pos.getY(i)-d.heightAt(pos.getX(i),pos.getZ(i))).every(h => h > .22 && h < .26);
      out.parkedTracks = d.PARKED.slots.every(s => !d.parkedOverTracks(s));
      const bins = [];
      d.scene.traverse(o => { if (o.name === 'contenedor_teobaldo_power') bins.push(o); });
      out.bins = bins.length === 3; // (v1.4.48: with 1 m pavements they may stand in the parking strip of the carriageway)
      const formerObstacles = [[-2161.3,-263.7],[-2027.1,-263.45],[-1970.25,-266.45],
                               [-839.25,-39.55],[-708.75,288.8],[-703.1,281.7],
                               [691.6,1328.7],[695,1321.1],[699.9,1323.6]];
      out.clearedRoad = formerObstacles.map(([x,z]) => !d.COL.nearSeg(x,z,0.28));
      out.sanAntonioPaint = d.MEDIANS.some(m => m[0] === 0 && Math.hypot(m[1] + 839,m[2] + 41) < 25);
      out.shedRemoved = !d.BUILD.some(o => Math.hypot(o.cx + 890.86, o.cz - 142.78) < 2);
      out.zone = [d.pedestrianDrivingZone(150,0,d.heightAt(150,0)),
                  !d.pedestrianDrivingZone(-839,-41,d.heightAt(-839,-41)),
                  !d.pedestrianDrivingZone(-706,295,d.heightAt(-706,295))];
      const garage = d.PARKED.slots.filter(s => s.floor !== undefined && s.alive);
      const sets = new Set(garage.map(s => s.type));
      out.garage = garage.length > 15 && sets.size > 6 && garage.every(s => (s.inst || s.bm) && d.VMODELS[s.type]?.lod)  /* v1.4.48: batched since 1.4.44 */;
      const slot = garage.find(s => d.lowAt(s.x,s.z,s.y)?.cap);
      out.floor = !!slot && d.parkedNear(slot.x,slot.z,1,slot.y).includes(slot) &&
        !d.parkedNear(slot.x,slot.z,1,d.heightAt(slot.x,slot.z)).includes(slot);
      const player = d.PLAYER;
      if (slot) {
        Object.assign(player,{x:slot.x,y:slot.y,z:slot.z,low:d.lowAt(slot.x,slot.z,slot.y)});
        const nearest = d.nearestEnterable();
        d.enterCar(slot);
        const car = player.car;
        __step(10);
        out.drivable = nearest === slot && !slot.alive && car.model.id === slot.type &&
          car.wheels.length === 4 && !!car.low && Math.abs(car.y - slot.y) < 0.55;
        d.exitCar();
        car.remove();
      } else out.drivable = false;
      const cam = d.camera.position.clone();
      const chunk = d.PARKED.batch ? null : d.PARKED.chunks.find(c => c.mid && c.hi && c.lo); // (v1.4.48: batched since 1.4.44: its own LOD, parkedBatchLOD)
      if (chunk) {
        const cut = 3 * 100;
        const wheel = g => g.attributes.position.array.slice(-cut);
        d.camera.position.set(chunk.x + chunk.r + 70, cam.y, chunk.z);
        d.updateParkedLOD();
        out.rimLod = chunk.mesh.geometry === chunk.mid &&
          wheel(chunk.mid).every((v, i) => v === wheel(chunk.hi)[i]) &&
          chunk.mid.attributes.position.count < chunk.hi.attributes.position.count;
        d.camera.position.copy(cam);
        d.updateParkedLOD();
      } else out.rimLod = !!d.PARKED.batch;
      const m = d.VMODELS.reventon;
      const near = d.modelGeometry(m), far = d.modelGeometry(d.VMODELS[m.lod]);
      const contact = w => Math.min(...w.geo.attributes.position.array.filter((_,i) => i % 3 === 1)) + w.y;
      out.reventon = [near,far].every(g => g.paint && g.tail && g.wheels.length===4 && g.wheels.every(w=>Math.abs(contact(w))<0.025)) &&
        !!near.rest.attributes.lampMask;
      const car = new d.Car(null,0xc1391d,-839,-41,0,m);
      try {
        const off = car.tl[0].material;
        car.fwdV=10;
        car.ctl.brk=1;
        car.sync(1/30);
        const on = car.tl[0].material;
        out.brakes = on.emissive.equals(off.emissive) && on.color.equals(off.color) &&
          on.emissiveIntensity > off.emissiveIntensity && on.emissive.r > on.emissive.g * 8;
      } finally { car.remove(); }
      const motorway = d.ROADSEG.nearest(-706,295,d.pedestrianFastRoad);
      out.pedsMotorway = d.pedLeg(motorway.x-6,motorway.z,motorway.x+6,motorway.z) === -1;
      return out;
    }""")
    print(result)
    passed = all(all(v) if isinstance(v,list) else v for v in result.values())
    print('PRUEBA MAPA Y REVENTON 1.4.39', 'OK' if passed else 'FALLA')
    assert passed, result
