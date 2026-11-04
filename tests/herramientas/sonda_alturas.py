# Alturas de las calzadas que se pisan en un sitio (v1.1.9; ramal de subida de la Vía de Ronda en X 309, Y −40, y otros
# enlaces donde una calzada queda por debajo de la que se le junta). Uso: herramientas/sonda_alturas.py x y [radio]
# De cada vía de coches a menos de «radio» m: si es puente, si está elevada (RAISE, su tramo RAISE_SPAN), hundida (DEP) o
# a nivel (AT_GRADE), y su perfil cada 4 m dentro del radio: [s, x, y, altura de la calzada, terreno, lo que sube].
import json, sys
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); R = float(sys.argv[4]) if len(sys.argv) > 4 else 40
    r = json.loads(await pg.evaluate("""([x,z,R])=>JSON.stringify((()=>{ const d=__dbg, out=[];
      d.DATA.R.forEach((rd,ri)=>{ if (rd[0]>12) return; const c=rd[4]; let s=0, prof=[], near=false;
        for (let i=0;i+3<c.length;i+=2) { const L=Math.hypot(c[i+2]-c[i],c[i+3]-c[i+1]); for (let u=0;u<L;u+=4) { const px=c[i]+(c[i+2]-c[i])*u/(L||1), pz=c[i+1]+(c[i+3]-c[i+1])*u/(L||1);
          if (Math.hypot(px-x,pz-z)>R) continue; near=true; let y=null; try { y=d.ROADY[ri](s+u,px,pz); } catch(e) {}
          prof.push([Math.round(s+u), Math.round(px), Math.round(pz), y==null?null:Math.round(y*100)/100, Math.round(d.heightAt(px,pz)*100)/100, d.raiseOf? Math.round(d.raiseOf(ri,s+u)*100)/100 : null]); } s+=L; }
        if (!near) return;
        out.push({ ri, nombre: rd[1]>=0? d.STR[rd[1]] : '', tipo: rd[0], ancho: rd[2], flags: rd[3], raise: d.RAISE.has(ri), span: d.RAISE_SPAN && d.RAISE_SPAN.get(ri) || null, dep: d.DEP.has(ri), grade: d.AT_GRADE.has(ri), prof }); });
      return out; })())""", [x, z, R]))
    for v in r:
        print(json.dumps({k: v[k] for k in v if k != 'prof'}, ensure_ascii=False))
        for p in v['prof']: print('    ', p)
    print('SONDA ALTURAS OK')
