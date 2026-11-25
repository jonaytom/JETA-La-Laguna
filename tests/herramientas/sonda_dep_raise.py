# v1.4.49: las calles hundidas o elevadas (DEP: trincheras, pasos inferiores; RAISE: terraplenes) que buildRoadsPart1 deja
# con su ancho de antes (wMax): nombre, largo, ancho de norma (wMin) y el de ahora. Uso: herramientas/sonda_dep_raise.py
import json
async def run(pg):
    r = await pg.evaluate("""() => { const D=__dbg, out=[]; const L=(c)=>{ let s=0; for(let i=0;i+3<c.length;i+=2) s+=Math.hypot(c[i+2]-c[i],c[i+3]-c[i+1]); return s; };
      for (const [k, M] of [['DEP', D.DEP], ['RAISE', D.RAISE]]) for (const ri of M.keys()) { const r=D.DATA.R[ri]; if (!r) continue;
        out.push({k, ri, tipo:r[0], nombre: r[1]>=0 ? D.DATA.S[r[1]] : '', largo: Math.round(L(r[4])), ancho:r[2], wMin:r.wMin, wMax:r.wMax, flags:r[3], desde:[Math.round(r[4][0]),Math.round(r[4][1])]}); }
      return JSON.stringify(out.sort((a,b)=>b.largo-a.largo)); }""")
    L = json.loads(r)
    print('TOTAL', len(L), 'ensanchadas', sum(1 for q in L if q.get('wMin') and q['ancho'] > q['wMin'] + 0.2), 'm ensanchados', sum(q['largo'] for q in L if q.get('wMin') and q['ancho'] > q['wMin'] + 0.2))
    for q in L[:40]: print('DR', q)
