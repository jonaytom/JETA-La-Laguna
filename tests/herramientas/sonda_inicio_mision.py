# v1.4.48: qué pasa al pedir una misión de la historia con _setIdx (la 076 y la de persecuciones veían arrancar
# «Vuelta al barrio»): misión activa y paso de la historia antes y después, y si inAnyBuilding (con rejilla desde la
# 1.4.48) coincide con recorrer todos los edificios.
# Uso: cd tests && python run_test.py herramientas/sonda_inicio_mision.py [título de la misión o su número]
import json, sys
async def run(pg):
    t = sys.argv[2] if len(sys.argv) > 2 else 'El rifle de agua'
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __step(2);})()")
    r = json.loads(await pg.evaluate("""(t)=>JSON.stringify((()=>{ const d=__dbg, M=d.MISSIONS; const out={dlg_al_cargar: !!d.DLG.open, antes: M.active && M.active.title, st0: M.getState().story};
      const i=/^[0-9]+$/.test(t) ? +t : M._story.findIndex(q=>q.title===t); out.i=i; if (M.active) M.fail('x', true); __step(5); out.tras_fallo=M.active && M.active.title; out.st1=M.getState().story;
      M._setIdx(i); out.st2=M.getState().story; const p=M._story[i].startPos(); out.inicio=p.map(Math.round); d.PLAYER.x=p[0]; d.PLAYER.z=p[1]; __step(20);
      out.despues=M.active && M.active.title; out.st3=M.getState().story;
      out.blips=M.blips().map(q=>[Math.round(q[0]),Math.round(q[1]),q[2]]); out.dlg=!!d.DLG.open; out.dlg_texto=((document.getElementById('dlg')||document.getElementById('dialog')||{}).innerText||'').slice(0,300); out.dlg0=[...document.querySelectorAll('[id^=dlg]')].map(e=>e.id+':'+(e.innerText||'').slice(0,120)); out.coche=!!d.PLAYER.car; out.estado=d.GAME.state;
      try { M.update(1/30); out.update='ok'; } catch(e) { out.update=String(e.stack||e).slice(0,600); } out.tras_update=M.active && M.active.title;
      return out; })())""", t))
    print('mision', r)
