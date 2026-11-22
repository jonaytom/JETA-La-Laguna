async def run(pg):
    report = await pg.evaluate('''() => {
      const d = __dbg;
      const ids = ['troceen','jtm3','cartabon','teypan','piki','yaiza','helado','carlota','newton3','hubli','fierilla','gomera'];
      return ids.map(id => {
        const m = d.VMODELS[id];
        const near = d.modelGeometry(m), far = d.modelGeometry(d.VMODELS[m.lod]);
        const contacto = o => Math.min(...Array.from(o.geo.attributes.position.array).filter((_,i) => i%3 === 1))+o.y;
        const wheels = [near,far].map(g => g.wheels.map(contacto));
        const car = new d.Car(null,0x1484c5,0,0,0,m);
        try {
          const roof = id !== 'troceen' || (() => {
            const {position,color} = near.rest.attributes;
            for (let i=0;i<position.count;i++)
              if (position.getY(i) > m.H*.90 && Math.max(color.getX(i),color.getY(i),color.getZ(i)) < .03) return true;
            return false;
          })();
          const rimColors = near.wheels.every(w => {
            const colors = w.geo.attributes.color.array;
            return new Set(colors).size >= 4;
          });
          const sized = id !== 'troceen' || Math.abs(near.wheels[0].y / m.H - .34/1.607) < .0015;
          return {id,wheels, roof, rimColors, sized, paint:!!near.paint && !!far.paint,
                  head:!!near.rest?.attributes.lampMask, tail:!!near.tail, mesh:car.wheels.length === 4};
        } finally { car.remove(); }
      });
    }''')
    failures = [q for q in report if not (q['roof'] and q['paint'] and q['head'] and q['tail']
                    and q['mesh'] and q['rimColors'] and q['sized']
                    and all(len(lod) == 4 and max(abs(z) for z in lod) < .023 for lod in q['wheels']))]
    print('Modelos revisados cargados:', len(report))
    print('Fallos:', failures)
    print('PRUEBA MODELOS 1.4.38', 'OK' if len(report) == 12 and not failures else 'FALLA')
