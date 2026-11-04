# ¿Qué código dibuja esto? (v1.1.8; para los «marcos grises flotando» del Adelantado y el casco, y cualquier pieza rara).
# Uso: herramientas/sonda_origen.py x y [radio] [altura_min]   (en una lista suya: run_varios.py carga el juego con
# window.__ORIGEN, y cada pieza recuerda las funciones que la añadieron a la escena).
# Lista, agrupadas por función, color y tipo de geometría, las piezas juntadas cuya caja cae a menos de «radio» m (12) y
# empieza a más de «altura_min» m (4) sobre el suelo; y lo mismo de las mallas sueltas. Escribe shots/origen_<x>_<y>.txt.
import json, sys
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3])
    R = float(sys.argv[4]) if len(sys.argv) > 4 else 12
    up = float(sys.argv[5]) if len(sys.argv) > 5 else 4
    r = json.loads(await pg.evaluate("""([x,z,R,up])=>JSON.stringify((()=>{ const d=__dbg, L=window.__ORIGEN_OUT||[], out={ juntadas: {}, sueltas: {}, total: L.length, activo: !!window.__ORIGEN };
      const near=(c)=>{ const cx=Math.max(c[0], Math.min(x, c[3])), cz=Math.max(c[2], Math.min(z, c[5])); return Math.hypot(cx-x, cz-z) < R; };
      const add=(T, k, c)=>{ const e=T[k]||(T[k]={ n: 0, ej: [] }); e.n++; if (e.ej.length<4) e.ej.push(c); };
      for (const p of L) { if (!near(p.c)) continue; const cx=(p.c[0]+p.c[3])/2, cz=(p.c[2]+p.c[5])/2, g=d.heightAt(cx,cz); if (p.c[1] < g+up) continue;
        add(out.juntadas, [p.who||'(sin origen)', p.col, p.geo, p.name].join(' | '), [Math.round(cx), Math.round(cz), Math.round((p.c[1]-g)*10)/10, Math.round((p.c[4]-g)*10)/10, Math.round((p.c[3]-p.c[0])*10)/10, Math.round((p.c[5]-p.c[2])*10)/10]); }
      const b=new d.THREE.Box3(); d.scene.traverse((o)=>{ if (!o.isMesh || !o.visible || o.isInstancedMesh) return; b.setFromObject(o); if (b.isEmpty()) return;
        const c=[b.min.x,b.min.y,b.min.z,b.max.x,b.max.y,b.max.z]; if (!near(c)) return; if (c[3]-c[0]>60 || c[5]-c[2]>60) return;
        const cx=(c[0]+c[3])/2, cz=(c[2]+c[5])/2, g=d.heightAt(cx,cz); if (c[1] < g+up) return;
        let p=o, who=''; while (p && !who) { who=p.__origen||''; p=p.parent; }
        add(out.sueltas, [who||'(sin origen)', o.material&&o.material.color?o.material.color.getHexString():'', o.geometry.type, o.name||''].join(' | '), [Math.round(cx), Math.round(cz), Math.round((c[1]-g)*10)/10, Math.round((c[4]-g)*10)/10]); });
      return out; })())""", [x, z, R, up]))
    # v1.1.8: the fused city (one mesh per chunk and material, made by the builders with acc(x, z, kind)): the triangles near
    # the spot that are above «up» m and outside every building footprint, by material kind (MAT key)
    f = json.loads(await pg.evaluate("""([x,z,R,up])=>JSON.stringify((()=>{ const d=__dbg, M=d.MATS, key=new Map(); for (const k in M) key.set(M[k], k); const out={};
      d.scene.traverse((o)=>{ if (!o.isMesh || o.isInstancedMesh) return; const g=o.geometry, pa=g && g.attributes.position; if (!pa || !pa.array || !pa.array.length) return;
        const k=key.get(o.material) || ('?' + (o.material && o.material.color ? o.material.color.getHexString() : '')); o.updateMatrixWorld(); const e=o.matrixWorld.elements, I=g.index ? g.index.array : null, nt=I ? I.length/3 : pa.count/3;
        const P=(i)=>{ const a=pa.array, j=i*3; const X=a[j], Y=a[j+1], Z=a[j+2]; return [e[0]*X+e[4]*Y+e[8]*Z+e[12], e[1]*X+e[5]*Y+e[9]*Z+e[13], e[2]*X+e[6]*Y+e[10]*Z+e[14]]; };
        for (let t=0; t<nt; t++) { const A=P(I?I[t*3]:t*3), B=P(I?I[t*3+1]:t*3+1), C=P(I?I[t*3+2]:t*3+2); const cx=(A[0]+B[0]+C[0])/3, cy=(A[1]+B[1]+C[1])/3, cz=(A[2]+B[2]+C[2])/3;
          if (Math.hypot(cx-x, cz-z) > R) continue; const gy=d.heightAt(cx,cz); if (cy < gy+up) continue; if (d.inAnyBuilding(cx, cz)) continue;
          const r=out[k]||(out[k]={ n: 0, x0: 1e9, x1: -1e9, z0: 1e9, z1: -1e9, y0: 1e9, y1: -1e9, ej: [] }); r.n++; r.x0=Math.min(r.x0,cx); r.x1=Math.max(r.x1,cx); r.z0=Math.min(r.z0,cz); r.z1=Math.max(r.z1,cz); r.y0=Math.min(r.y0,cy-gy); r.y1=Math.max(r.y1,cy-gy); if (r.ej.length<6 && t%7===0) r.ej.push([Math.round(cx),Math.round(cz),Math.round((cy-gy)*10)/10]); } });
      const B=[]; d.DATA.B.forEach((b,i)=>{ const c=b[6]; if (!c || !c.length) return; let a=0,bb=0; for (let j=0;j<c.length;j+=2){a+=c[j];bb+=c[j+1];} a/=c.length/2; bb/=c.length/2; if (Math.hypot(a-x,bb-z) < R*2) B.push([i, Math.round(a), Math.round(bb), b[0], b[1], b[2], b[3], b[4], b[5]]); });
      return { fusion: out, edificios: B.slice(0, 30), guardadas: !!(d.LOD && true) }; })())""", [x, z, R, up]))
    lines = [f'origen en X {x:g}, Y {z:g} (radio {R:g} m, desde {up:g} m sobre el suelo); registradas {r["total"]}, activo {r["activo"]}']
    for t in ('juntadas', 'sueltas'):
        lines.append(f'== {t} (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])')
        for k, e in sorted(r[t].items(), key=lambda kv: -kv[1]['n'])[:40]: lines.append(f'  {e["n"]:4d}  {k}   {e["ej"]}')
    lines.append('== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)')
    for k, e in sorted(f['fusion'].items(), key=lambda kv: -kv[1]['n'])[:30]:
        lines.append(f"  {e['n']:5d}  {k}  X {e['x0']:.0f}..{e['x1']:.0f}  Y {e['z0']:.0f}..{e['z1']:.0f}  alt {e['y0']:.1f}..{e['y1']:.1f}   {e['ej']}")
    lines.append('== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)')
    for b in f['edificios']: lines.append('  ' + json.dumps(b, ensure_ascii=False))
    txt = '\n'.join(lines); print(txt)
    open('shots/origen_%d_%d.txt' % (x, z), 'w', encoding='utf-8').write(txt)
    print('SONDA ORIGEN', 'OK' if r['activo'] else 'SIN __ORIGEN (va en una lista suya)')
