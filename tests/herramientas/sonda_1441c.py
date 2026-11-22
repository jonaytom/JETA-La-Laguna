# v1.4.41: huellas de los edificios del lado norte de la Calle Tacoronte junto al campo y el trazado de la calle.
import json
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(2);})()")
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, out = {};
      out.tac = []; d.DATA.R.forEach((R2, ri) => { if (/Tacoronte/.test(d.STR[R2[1]] || '')) out.tac.push({ ri, w: R2[2], c: R2[4].map((v) => Math.round(v * 10) / 10) }); });
      out.b = []; d.DATA.B.forEach((b, i) => { const c = b[6]; if (!c || c.length < 6) return; let x = 0, z = 0; for (let k = 0; k < c.length; k += 2) { x += c[k]; z += c[k + 1]; } x /= c.length / 2; z /= c.length / 2;
        if (x > 1880 && x < 2070 && z > 1215 && z < 1290) out.b.push({ i, h: b[0] / 10, style: b[1], lv: b[2], cx: Math.round(x), cz: Math.round(z), pts: c.map((v) => Math.round(v * 10) / 10) }); });
      out.H = d.heightAt(1985, 1262);
      return JSON.stringify(out); }"""))
    open('shots/sonda_1441c.json', 'w').write(json.dumps(r))
    print(json.dumps(r['tac']))
    for b in r['b']: print(b)
    print('SONDA 1441c OK')
