# v1.4.41: qué hay en X 1899, Y 3224 de la Autopista del Norte (el coche choca a 300 km/h contra algo que no se ve) y
# el lado norte de la Calle Tacoronte junto al campo (casa del n.º 67).
import json
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(2);})()")
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, out = {};
      const near = (X, Z, R) => { const ids = d.COL.segsNear(X, Z, R), o = [];
        for (const id of ids) { const s = d.COL.segs.slice(id * 4, id * 4 + 4); const ax = s[0], az = s[1], bx = s[2], bz = s[3];
          const L2 = (bx - ax) ** 2 + (bz - az) ** 2 || 1, t = Math.max(0, Math.min(1, ((X - ax) * (bx - ax) + (Z - az) * (bz - az)) / L2));
          const dd = Math.hypot(ax + (bx - ax) * t - X, az + (bz - az) * t - Z); if (dd < R) o.push({ id, s: s.map((v) => Math.round(v * 10) / 10), y: [d.COL.segY[id * 2], d.COL.segY[id * 2 + 1]].map((v) => Math.round(v * 10) / 10), kind: d.COL.segKind.get(id) || '', dd: Math.round(dd * 10) / 10 }); }
        const cs = []; for (let i = 0; i < d.COL.circs.length; i += 3) { const dd = Math.hypot(d.COL.circs[i] - X, d.COL.circs[i + 1] - Z); if (dd < R + d.COL.circs[i + 2]) cs.push({ c: [d.COL.circs[i], d.COL.circs[i + 1], d.COL.circs[i + 2]].map((v) => Math.round(v * 10) / 10), y: [d.COL.circY[i / 3 * 2], d.COL.circY[i / 3 * 2 + 1]].map((v) => Math.round(v * 10) / 10) }); }
        return { segs: o, circs: cs }; };
      out.p1 = { ...near(1899, 3225, 6), h: d.heightAt(1899, 3225), deck: d.deckAt ? d.deckAt(1899, 3225, d.heightAt(1899, 3225) + 3, true, 6) : null,
        low: d.lowAt ? !!d.lowAt(1899, 3225, d.heightAt(1899, 3225)) : null, trench: typeof d.trenchPush === 'function' ? d.trenchPush(1899, 3225, 1.2, d.heightAt(1899, 3225)) : 'n/a' };
      out.p2 = { ...near(1840, 3179, 5), h: d.heightAt(1840, 3179) };
      // terrain profile along the autopista there (a step in the ground?)
      out.prof = []; const h0 = 0.7423; for (let s = -12; s <= 12; s += 1) { const x = 1898 + Math.sin(h0) * s, z = 3226 + Math.cos(h0) * s; out.prof.push(Math.round(d.heightAt(x, z) * 100) / 100); }
      // Calle Tacoronte: pitches and buildings on its north side
      out.pitches = d.SPORTS.pitches.filter((p) => p.cx > 1600 && p.cx < 2100 && p.cz > 1250 && p.cz < 1450).map((p) => ({ cx: Math.round(p.cx), cz: Math.round(p.cz), len: Math.round(p.len), wid: Math.round(p.wid) }));
      out.blds = d.BUILD.filter((b) => b.cx > 1640 && b.cx < 2060 && b.cz > 1230 && b.cz < 1290).map((b) => ({ cx: Math.round(b.cx), cz: Math.round(b.cz), h: Math.round(b.h || b.H || 0), keys: Object.keys(b).slice(0, 12).join(',') }));
      out.hs = []; for (let x = 1650; x <= 2050; x += 25) out.hs.push([x, Math.round(d.heightAt(x, 1282) * 10) / 10]);
      return JSON.stringify(out); }"""))
    open('shots/sonda_1441b.json', 'w').write(json.dumps(r))
    for k in ('p1', 'p2', 'prof', 'pitches', 'hs'): print(k, json.dumps(r[k])[:1500])
    print('blds', len(r['blds'])); [print(b) for b in r['blds'][:40]]
    print('SONDA 1441b OK')
