# Huella del mundo construido (v1.1.7, para partir funciones largas de 04_world.js sin cambiar nada): cuenta vértices
# por material de todo lo que hay en la escena, los choques (COL), los tableros, cortes y calles, y una suma de
# comprobación de los choques. Si al reordenar el código cambia algo de lo construido, la huella sale distinta.
# Uso: herramientas/huella_mundo.py base | comparar
import json, sys
JS = """(()=>{ const d=__dbg, out={}; let tot=0;
  d.scene.traverse((o)=>{ if (!o.isMesh || !o.geometry || !o.geometry.attributes.position) return; const m=Array.isArray(o.material)?o.material[0]:o.material; const k=(m&&(m.name||m.type))+(m&&m.map?':tex':''); const n=o.geometry.attributes.position.count*(o.isInstancedMesh?o.count:1); out['v:'+k]=(out['v:'+k]||0)+n; tot+=n; });
  out.vertices=tot; out.col_segs=d.COL.segs.length/4; out.col_circs=d.COL.circs.length/3;
  let cs=0; for (let i=0;i<d.COL.segs.length;i++) cs=(cs+Math.round(d.COL.segs[i]*100)*((i%7)+1))%1000000007; out.col_sum=cs;
  let cc=0; for (let i=0;i<d.COL.circs.length;i++) cc=(cc+Math.round(d.COL.circs[i]*100)*((i%5)+1))%1000000007; out.col_circ_sum=cc;
  out.decks=d.DECKS.length; out.tunnel_decks=d.TUNNEL_DECKS.length; out.tcuts=d.TCUTS.length; out.build=d.BUILD.length; out.dep=d.DEP.size; out.raise=d.RAISE.size; out.merged=d.MERGED?d.MERGED.size:0;
  return JSON.stringify(out); })()"""
async def run(pg):
    mode = sys.argv[2] if len(sys.argv) > 2 else 'comparar'
    h = json.loads(await pg.evaluate(JS))
    print('vértices', h['vertices'], '· choques', h['col_segs'], '+', h['col_circs'], '· tableros', h['decks'], '· edificios', h['build'])
    base = 'shots/huella_mundo_base.json'
    if mode == 'base':
        json.dump(h, open(base, 'w'), indent=0); print('base guardada en', base)
    else:
        b = json.load(open(base))
        dif = {k: (b.get(k), h.get(k)) for k in set(b) | set(h) if b.get(k) != h.get(k)}
        print('distinto de la base:', len(dif), dict(list(dif.items())[:25]))
        if dif: raise SystemExit('HUELLA MUNDO: CAMBIA %d' % len(dif))
    print('HUELLA MUNDO OK')
