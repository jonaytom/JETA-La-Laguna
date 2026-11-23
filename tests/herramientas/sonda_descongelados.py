# v1.4.47: qué son las piezas que el vigilante descongela (prueba_congelados.py): las que están cerca de X 143, Y 5 y de
# X -188, Y 20, con su nombre, padre, geometría y material, para marcarlas con userData.noMerge donde se crean
import json
async def run(pg):
    r = json.loads(await pg.evaluate("""() => { const d=__dbg, out=[], v=new d.THREE.Vector3();
      const pts=[[143,5],[-188,20]];
      d.scene.traverse(o => { if (o===d.scene) return; o.getWorldPosition(v);
        for (const [x,z] of pts) if (Math.hypot(v.x-x, v.z-z) < 3) {
          const chain=[]; let p=o.parent; while(p && p!==d.scene && chain.length<5){ chain.push((p.type)+(p.name?':'+p.name:'')+(Object.keys(p.userData).length?JSON.stringify(Object.keys(p.userData)):'')); p=p.parent; }
          out.push({ at:[x,z], type:o.type, name:o.name, geo:o.geometry&&o.geometry.type, params:o.geometry&&o.geometry.parameters, mat:o.material&&(o.material.name||o.material.type), col:o.material&&o.material.color&&o.material.color.getHexString(), ud:Object.keys(o.userData), y:+v.y.toFixed(2), kids:o.children.length, chain, frozen: !o.matrixAutoUpdate }); } });
      return JSON.stringify(out.slice(0,40)); }"""))
    for x in r: print('PIEZA', x)
    print('SONDA DESCONGELADOS OK', len(r))
