# Hierba (v1.3.1): ¿está encendida, cuántas matas hay de cada clase y qué clase de suelo hay alrededor de un punto?
# Uso: herramientas/sonda_hierba.py x y   → imprime
import json, sys
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3])
    r = await pg.evaluate("""([x,z])=>{ try { const d=__dbg, H=d.HIERBA, updateHierba=d.updateHierba, hierbaClass=d.hierbaClass, hierbaCell=d.hierbaCell; d.camera.position.set(x, d.heightAt(x,z)+3, z); updateHierba(true);
      const cls=[0,0,0,0]; for(let i=-20;i<=20;i++) for(let j=-20;j<=20;j++) cls[hierbaClass(x+i*4,z+j*4)]++;
      let tot=[0,0,0,0]; if (H.raster) for (const v of H.raster.R) tot[v]++;
      return JSON.stringify({on:H.on, counts:H.meshes?H.meshes.map(m=>m.count):null, cls, total:tot, cell:hierbaCell(Math.floor(x/40),Math.floor(z/40)).length, arb: !!(d.DATA && d.DATA.ARB && d.DATA.ARB.hierba)}); } catch(e) { return 'ERROR '+e; } }""", [x, z])
    print('HIERBA', r)
