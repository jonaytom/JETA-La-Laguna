# Qué son los grupos sin nombre que la sonda de sueltas cuenta como ~1.600 mallas (v1.0.0). Para cada hijo directo de la
# escena con mallas sueltas visibles dice de qué lista del juego es (gente, coches, NPC de misión, coches o gente en
# reserva, jugador…), cuántas mallas y llamadas tiene, dónde está y a qué distancia de la cámara.
# Uso: en una lista de scripts/pruebas/, la línea  herramientas/sonda_grupos.py   → shots/sonda_grupos.txt
import json, collections
LOG = []
def out(*a):
    t = ' '.join(str(x) for x in a); LOG.append(t); print(t)
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3); if (__dbg.updateCityLOD) __dbg.updateCityLOD(true);})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, S=d.scene, cam=d.camera.position; const tag=new Map();
      const mark=(o,k)=>{ if(o) tag.set(o,k); };
      for (const p of d.PEDS||[]) mark(p.H&&p.H.root,'gente');
      for (const c of d.CARS||[]) mark(c.mesh,'coche'+(c.cop?' policía':'')+(c.tram?' tranvía':''));
      try { for (const k in d.NPC) { const v=d.NPC[k]; if (v&&v.root) mark(v.root,'npc:'+k); else if (v&&v.H&&v.H.root) mark(v.H.root,'npc:'+k); } } catch(e){}
      try { mark(d.playerHuman&&d.playerHuman.root,'jugador'); } catch(e){}
      try { for (const h of (d.HPOOL&&d.HPOOL.free)||[]) mark(h.root,'reserva gente'); } catch(e){}
      try { for (const c of (d.CARPOOL&&d.CARPOOL.free)||[]) mark(c.mesh||c,'reserva coches'); } catch(e){}
      try { if (d.TRAM) for (const t of [].concat(d.TRAM.cars||d.TRAM.mesh||[])) mark(t.mesh||t,'tranvía'); } catch(e){}
      const visible=(o)=>{ let p=o; while(p){ if(!p.visible) return false; p=p.parent; } return true; };
      const rows=[];
      for (const o of S.children) { if (o.name && o.name!=='root') continue; let n=0, calls=0, tri=0, skin=0;
        o.traverse(m=>{ if(!m.isMesh||m.isInstancedMesh||!visible(m)) return; if(m.name.startsWith('chunk:')||m.name==='fusion'||m.name==='parked'||m.name==='inst') return; n++; calls+=[].concat(m.material).length; if(m.isSkinnedMesh) skin++; const G=m.geometry; tri+=Math.round((G.index?G.index.count:G.attributes.position.count)/3); });
        if (!n) continue; const p=new d.THREE.Vector3(); o.getWorldPosition(p);
        let k=tag.get(o); if(!k){ let q=o; while(q&&!k){ q=q.children&&q.children[0]; k=q&&tag.get(q); } }
        rows.push({k:k||('? '+o.type+(o.userData&&Object.keys(o.userData).length?' '+Object.keys(o.userData).slice(0,4).join(','):'')+' hijos '+o.children.length), n, calls, tri, skin, x:Math.round(p.x), z:Math.round(p.z), dist:Math.round(p.distanceTo(cam))}); }
      return rows; })())"""))
    agg = collections.defaultdict(lambda: [0, 0, 0, 0, 0])
    for e in r:
        k = e['k'].split(':')[0] if e['k'].startswith('npc:') else e['k']; a = agg[k]; a[0] += 1; a[1] += e['n']; a[2] += e['calls']; a[3] += e['tri']; a[4] += e['skin']
    out('== hijos de la escena con mallas sueltas visibles:', len(r))
    out('  grupos mallas llamadas      tri huesos  tipo')
    for k, a in sorted(agg.items(), key=lambda kv: -kv[1][2]): out(f'  {a[0]:6d} {a[1]:6d} {a[2]:8d} {a[3]:8d} {a[4]:6d}  {k}')
    out('== los 40 con más llamadas')
    for e in sorted(r, key=lambda e: -e['calls'])[:40]: out(f"  {e['calls']:5d} llamadas {e['n']:4d} mallas {e['tri']:7d} tri  X {e['x']}, Y {e['z']} a {e['dist']} m  {e['k']}")
    open('shots/sonda_grupos.txt', 'w', encoding='utf-8').write('\n'.join(LOG))
    print('SONDA GRUPOS OK')
