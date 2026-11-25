# v1.4.48: qué dicen auditRoadBarriers (barreras dentro de una calzada) y qué segmentos de choque hay cerca de los puntos
# que prueba_mapa_reventon_1439_gpu.py quiere despejados, y los contenedores de Teobaldo Power
import json
async def run(pg):
    r = await pg.evaluate("""() => { const d=__dbg; const a=d.auditRoadBarriers();
      const pts=[[691.6,1328.7],[695,1321.1],[699.9,1323.6]];
      const near=pts.map(([x,z])=>{ const s=d.COL.nearSeg(x,z,0.28); return [x,z, s ? JSON.stringify(s).slice(0,200) : null]; });
      const bins=[]; d.scene.traverse(o=>{ if(o.name==='contenedor_teobaldo_power') bins.push([+o.position.x.toFixed(1),+o.position.z.toFixed(1), !!d.roadAtBarrier(o.position.x,o.position.z,o.position.y-1.5,o.position.y+1,.65)]); });
      return JSON.stringify({ barreras: a.slice(0,10), n: a.length, cerca: near, contenedores: bins }); }""")
    print('BARRERAS', r)
