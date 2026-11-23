import asyncio


async def run(pg):
    before = await pg.evaluate('''() => {
      const d=__dbg, m=d.MISSIONS, p=d.PLAYER, n=d.NPC;
      const point = n => [n.x,n.z];
      const trinidad = point(n.canarion);
      const dist = (a,b) => Math.hypot(a[0]-b[0],a[1]-b[1]);
      const home = point(n.sastron);
      const steps = [n.blanco,n.boca,n.coco,n.sastron].map(o=>Math.round(dist(point(o),trinidad)));
      const cafe = d.INTERIORS.find(i=>i.id==='cafe');
      p.money=300;
      // v1.4.42: in the shared load an earlier test may have raced the Canarión's car: back to where it is parked
      const cc=n.canarionCar; if (cc && n.canarion.parkAt) { cc.x=n.canarion.parkAt[0]; cc.z=n.canarion.parkAt[1]; cc.h=n.canarion.parkHeading; cc.vx=cc.vz=cc.fwdV=0; cc.mode='physics'; cc.driver=null; cc.mission=false; }
      const initial=m.getState();
      m.setState({...initial,story:2,side:0,sideOpen:true});
      const side=m.beaconPos('side');
      if (!side) return {steps, triggered:false};
      p.x=side[0]; p.z=side[1];
      __step(8);
      const race=m.kit.data;
      if (m.active?.title!=='Carrera con el Canarión') return {steps,triggered:false};
      const start = race.start, end=race.cps.at(-1);
      const parked = n.canarionCar;
      const parkedEdge = d.GRAPH.nearestEdge(parked.x, parked.z, 20);
      const startEdge = d.GRAPH.nearestEdge(...start, 20);
      const dx = race.pts[2]-start[0], dz = race.pts[3]-start[1], length = Math.hypot(dx, dz);
      const dot = heading => (Math.sin(heading)*dx + Math.cos(heading)*dz)/length;
      const legalGrid = startEdge.e === parkedEdge.e && d.GRAPH.edges[startEdge.e].oneway &&
        startEdge.s > parkedEdge.s + 7 && dx*startEdge.dx + dz*startEdge.dz > 0 && dot(parked.h) > .95;
      const result={ steps, triggered:true, start:Math.round(dist(start,trinidad)), finish:Math.round(dist(end,home)),
        length:Math.round(race.cum.at(-1)), checkpoints:race.cps.length,
        sign:Math.round(dist(m.startsMap().story[3].s,home)), cafe:Math.round(dist(point(n.coco),[cafe.door.x,cafe.door.z])) };
      result.legalGrid = legalGrid;
      result.grid = { same: startEdge.e === parkedEdge.e, oneway: !!d.GRAPH.edges[startEdge.e].oneway, ahead: Math.round(startEdge.s - parkedEdge.s), fwd: dx*startEdge.dx + dz*startEdge.dz > 0, dot: Math.round(dot(parked.h)*100)/100, se: startEdge.e, pe: parkedEdge.e };
      const own = new d.Car('compact',0x167a79,start[0]-3,start[1]-2,Math.atan2(dx,dz)+Math.PI);
      d.enterCar(own);
      const skip = () => { if (window.__TALK?.cur) window.__TALK.cur.next(); };
      for(let i=0;i<8;i++) skip();
      for(let i=0;i<4;i++) {
        own.x=p.x=start[0]; own.z=p.z=start[1];
        own.speed=own.fwdV=own.vx=own.vz=0;
        __step(2);
      }
      result.bothFaceRace = dot(own.h) > .95 && !!race.rival && dot(race.rival.h) > .95;
      return result;
    }''')
    await asyncio.sleep(3.25)
    after = await pg.evaluate('''() => {
      const d=__dbg, m=d.MISSIONS, p=d.PLAYER;
      if (!p.car || !m.active) return {reward:0};
      const car=p.car;
      const total=m.kit.data.cps.length;
      for(let i=0;i<total && m.active;i++) {
        const q=m.kit.data.goal;
        car.x=p.x=q[0]; car.z=p.z=q[1];car.speed=car.fwdV=car.vx=car.vz=0;
        __step(1);
      }
      const result={reward:p.money-300,side:m.getState().side};
      d.exitCar();car.remove();
      for(let i=0;i<6;i++) if(window.__TALK?.cur) window.__TALK.cur.next();
      if(m.active)m.fail('prueba',true);
      return result;
    }''')
    print(before, after)
    steps = before['steps']
    ok = (
        before['triggered'] and before['legalGrid'] and before['bothFaceRace'] and all(a > b for a, b in zip(steps, steps[1:]))
        and before['start'] < 90 and before['finish'] < 96 and before['sign'] < 40 and before['cafe'] < 40
        and 750 < before['length'] < 1600 and before['checkpoints'] >= 3
        and after['reward'] == 2500 and after['side'] == 1
    )
    print('PRÓLOGO Y CARRERA', 'OK' if ok else 'FALLA')
