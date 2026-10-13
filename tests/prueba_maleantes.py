# Maleantes en busca y captura (v0.70): sin saber pelear no salen; sabiendo pelear sale uno marcado en el minimapa,
# la pelea 2D contra él es más difícil que contra la gente normal (IA, golpe, aguante) y al ganarle cobras la recompensa
# sin delito. Uso: cd tests && python run_test.py prueba_maleantes.py
import json, asyncio
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __dbg.GAME.tod=12; __step(3);})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, M=d.MALEANTES, out={};
      window.GANG.sastronTut=false; M._st.t=0; __step(30, 1/30); out.sin_saber=!!M._st.cur;
      window.GANG.sastronTut=true; for (let i=0;i<40 && !M._st.cur;i++){ M._st.t=0; __step(10, 1/30); }
      const p=M._st.cur; out.sale=!!p; if(!p) return out;
      out.maleante={...p.maleante, d:Math.round(Math.hypot(p.x-d.PLAYER.x,p.z-d.PLAYER.z))};
      out.en_minimapa=d.MISSIONS.blips().some(b=>b[2]==='#c6ff00');
      d.PLAYER.x=p.x+1; d.PLAYER.z=p.z; const w0=d.WANTED.level, m0=d.PLAYER.money;
      out.pelea=d.startStreetFight(p); const st=d.FIGHT2D._st(); out.rival=st?{name:st.b.name, lv:st.b.ai.lv, deal:st.b.deal, recv:st.b.recv}:null;
      d.FIGHT2D._abort(); M.result(p, true); out.cobra=d.PLAYER.money-m0; out.delito=d.WANTED.level>w0; out.queda=!!M._st.cur;
      return out; })())"""))
    for k, v in r.items(): print(k, v)
    ok = not r['sin_saber'] and r['sale'] and r.get('en_minimapa') and r.get('pelea') and r.get('rival') and r['rival']['lv'] > 0.6 and r['cobra'] >= 150 and not r['delito'] and not r['queda']
    print('errores JS', errs[:3])
    print('MALEANTES', 'OK' if ok and not errs else 'FALLA')
