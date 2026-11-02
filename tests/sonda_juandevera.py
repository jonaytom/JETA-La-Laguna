# v0.99.6: sonda del obstáculo nuevo de la auditoría en la Calle Juan de Vera (X -149 Z -235, «árbol, farola o poste» en
# el eje): círculos de choque y objetos (también instanciados) a menos de 3 m, y los NPC cercanos.
import json
async def run(pg):
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, X=-149, Z=-235, out={ circs: [], objs: [], npc: [] };
        const c=d.COL.circs; for (let i=0;i<c.length;i+=3) if (Math.hypot(c[i]-X, c[i+1]-Z) < 3) out.circs.push([i/3, +c[i].toFixed(2), +c[i+1].toFixed(2), c[i+2]]);
        let m=null, v=null; d.scene.traverse((o)=>{ if (!m && o.matrix) { m=new o.matrix.constructor(); v=new o.position.constructor(); } });
        d.scene.traverse((o)=>{ if (o.isInstancedMesh) { for (let k=0;k<o.count;k++){ o.getMatrixAt(k,m); v.setFromMatrixPosition(m); if (Math.hypot(v.x-X, v.z-Z) < 3) out.objs.push(['inst', o.name||'', o.geometry && o.geometry.type, k, +v.x.toFixed(1), +v.y.toFixed(1), +v.z.toFixed(1), o.material && o.material.color && o.material.color.getHexString()]); } }
          else if (o.isMesh && !o.name.startsWith('chunk')) { o.getWorldPosition(v); if (Math.hypot(v.x-X, v.z-Z) < 3) out.objs.push(['mesh', o.name||'', o.geometry && o.geometry.type, +v.x.toFixed(1), +v.y.toFixed(1), +v.z.toFixed(1), o.material && o.material.color && o.material.color.getHexString()]); } });
        if (typeof NPC !== 'undefined') for (const k in NPC) { const n=NPC[k]; if (n && typeof n.x==='number' && Math.hypot(n.x-X, n.z-Z) < 6) out.npc.push([k, +n.x.toFixed(1), +n.z.toFixed(1)]); }
        return out; })())"""))
    print('círculos', r['circs']); print('objetos', r['objs'][:30]); print('npc', r['npc'])
    print('SONDA JUAN DE VERA OK')
