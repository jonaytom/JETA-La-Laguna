import json
async def run(pg):
    r = await pg.evaluate("""() => { const d = __dbg, out = [];
      const S = d.SPORTS.pitches.filter((p) => p.len * p.wid >= 1700).slice(0, 4);
      for (const p of S) { const F = p.F, e = 2.4;
        const q = F.W(F.u0 + p.len * 0.25, F.v0 - e);
        const ids = [...d.COL.segsNear(q[0], q[1], 6)];
        const near = ids.slice(0, 6).map((id) => d.COL.segs.slice(id * 4, id * 4 + 4).map((v) => +v.toFixed(1)));
        out.push({ cx: p.cx.toFixed(0), cz: p.cz.toFixed(0), u: [F.u0, F.u1].map((v) => v.toFixed(1)), v: [F.v0, F.v1].map((v) => v.toFixed(1)), len: p.len.toFixed(1), wid: p.wid.toFixed(1), q: q.map((v) => +v.toFixed(1)), n: ids.length, near, hit: [0.4, 1, 3].map((r) => d.COL.nearSeg(q[0], q[1], r)), segsTotal: d.COL.segs.length / 4 });
      }
      return JSON.stringify(out); }""")
    for x in json.loads(r): print(x)
    print('PRUEBA DBG OK')
