# Comprobación de mapa: edificios que invaden la calzada de calles para coches.
# Se ejecuta dentro del juego ya cargado (usa los datos procesados: BUILD, DATA.R, ROADY, COL), así que mide lo que
# de verdad se dibuja y choca, no el OpenStreetMap en bruto.
#
# Para cada calle de coches (tipos 0..12: motorway … service, sin puentes ni túneles) se recorre el eje cada 2 m y se
# mide la distancia a la planta de cada edificio cercano. Si es menor que la mitad del ancho de la calzada, el
# edificio la invade: invasión = semiancho − distancia (si el eje cae dentro del edificio, la calzada queda cortada).
# Solo cuenta a partir de 1 m de invasión. Se descartan los casos a otra altura (calle elevada o hundida respecto al edificio) y se confirma con la rejilla de
# colisiones (COL) si de verdad hay un muro que pare el coche: con muro = «choque» (crítica si corta el eje, alta
# ≥1,5 m, media 1–1,5 m); sin muro = «visual» (el coche atraviesa el edificio: feo, pero no choca).
MAPA_JS = r"""(()=>{
 const D=__dbg, B=D.BUILD, R=D.DATA.R, RT=D.DATA.RT, S=D.DATA.S, COL=D.COL, ROADY=D.ROADY||[], H=D.heightAt;
 const PRINC=new Set(['motorway','motorway_link','trunk','primary','primary_link','secondary','secondary_link','tertiary','tertiary_link']);
 // rejilla de edificios por caja envolvente
 const CS=32, G=new Map(); const bb=[];
 B.forEach((b,i)=>{ let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9; for(const p of b.pts){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);z0=Math.min(z0,p[1]);z1=Math.max(z1,p[1]);} bb[i]=[x0,x1,z0,z1];
   for(let a=Math.floor(x0/CS);a<=Math.floor(x1/CS);a++) for(let c=Math.floor(z0/CS);c<=Math.floor(z1/CS);c++){ const k=a*100000+c; let l=G.get(k); if(!l) G.set(k,l=[]); l.push(i);} });
 const inside=(x,z,P)=>{ let o=false; for(let i=0,j=P.length-1;i<P.length;j=i++){ const a=P[i],b=P[j]; if(((a[1]>z)!==(b[1]>z)) && x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0]) o=!o; } return o; };
 const CP=[0,0]; const dist=(x,z,P)=>{ let d=1e9; for(let i=0,j=P.length-1;i<P.length;j=i++){ const a=P[j],b=P[i]; const ex=b[0]-a[0], ez=b[1]-a[1]; const L=ex*ex+ez*ez||1; let t=((x-a[0])*ex+(z-a[1])*ez)/L; t=t<0?0:t>1?1:t; const px=a[0]+ex*t, pz=a[1]+ez*t, dx=px-x, dz=pz-z, dd=Math.sqrt(dx*dx+dz*dz); if(dd<d){ d=dd; CP[0]=px; CP[1]=pz; } } return inside(x,z,P)?-d:d; };
 const hits=new Map();
 for(let ri=0; ri<R.length; ri++){ const rd=R[ri]; if(rd[0]>12 || (rd[3]&6)) continue; const hw=(rd[2]||6)/2, c=rd[4]; let s=0;
   const yf=ROADY[ri];
   for(let i=0;i<c.length-2;i+=2){ const x1=c[i],z1=c[i+1],x2=c[i+2],z2=c[i+3]; const L=Math.hypot(x2-x1,z2-z1); const n=Math.max(1,Math.ceil(L/2));
     for(let k=0;k<=n;k++){ const t=k/n, x=x1+(x2-x1)*t, z=z1+(z2-z1)*t, ss=s+L*t; const l=G.get(Math.floor(x/CS)*100000+Math.floor(z/CS)); if(!l) continue;
       for(const bi of l){ const q=bb[bi]; if(x<q[0]-hw||x>q[1]+hw||z<q[2]-hw||z>q[3]+hw) continue; const b=B[bi]; const d=dist(x,z,b.pts); const inv=hw-d; if(inv<1.0) continue; const cpx=CP[0], cpz=CP[1];
         let y=null; try{ y=yf?yf(ss,x,z):H(x,z);}catch(e){ y=H(x,z); }
         if(y!=null && (y>b.top-0.5 || y<b.bmax-4)) continue; // la calle pasa por encima o por debajo del edificio
         const key=ri+'|'+bi; const h=hits.get(key);
         if(!h) hits.set(key,{ri,bi,inv,x,z,y,d,cpx,cpz,n:1}); else { h.n++; if(inv>h.inv){ Object.assign(h,{inv,x,z,y,d,cpx,cpz}); } } } }
     s+=L; } }
 const out=[];
 for(const h of hits.values()){ const rd=R[h.ri], b=B[h.bi], hw=(rd[2]||6)/2, tipo=RT[rd[0]];
   // ¿hay muro de verdad? coche (radio 1 m) pegado al lado del carril que da al edificio, a la altura de la calle
   let bloquea=null; try{ COL.qy=(h.y||0)+0.6; let px=h.x, pz=h.z;
     if(h.d>0.05){ const ux=(h.cpx-h.x)/h.d, uz=(h.cpz-h.z)/h.d, t=Math.max(0,Math.min(h.d,hw)-0.95); px=h.x+ux*t; pz=h.z+uz*t; }
     bloquea=COL.nearSeg(px,pz,1.0); }catch(e){}
   const corta=h.inv>=hw; const tipoProb=bloquea?'choque':'visual';
   const sev=!bloquea?'visual':corta?'crítica':h.inv>=1.5?'alta':'media';
   out.push({sev, problema:tipoProb, corta, x:Math.round(h.x), z:Math.round(h.z), invasion_m:+h.inv.toFixed(2), tramo_m:h.n*2, calle:rd[1]>=0?S[rd[1]]:'(sin nombre)', tipo, principal:PRINC.has(tipo),
     ancho_m:rd[2], edificio:b.name||('edificio #'+h.bi), bloquea, clave:Math.round(h.x/5)+'|'+Math.round(h.z/5)+'|'+(rd[1]>=0?S[rd[1]]:tipo)}); }
 const ord={'crítica':0,'alta':1,'media':2,'visual':3}; out.sort((a,b)=>ord[a.sev]-ord[b.sev] || (b.principal-a.principal) || b.invasion_m-a.invasion_m);
 const cnt=(f)=>out.filter(f).length;
 return { choques:cnt(o=>o.problema==='choque'), criticas:cnt(o=>o.sev==='crítica'), altas:cnt(o=>o.sev==='alta'), medias:cnt(o=>o.sev==='media'),
          choques_en_principales:cnt(o=>o.problema==='choque'&&o.principal), visuales:cnt(o=>o.problema==='visual'), lista:out };
})()"""

# Captura cenital de un punto con un poste rojo encima (se quita y se libera después).
CAPTURA_JS = r"""((x,z)=>{ const d=__dbg, T=d.THREE, c=d.camera; const y=d.heightAt(x,z);
 const m=new T.Mesh(new T.CylinderGeometry(0.6,0.6,14,8), new T.MeshBasicMaterial({color:0xff2020})); m.position.set(x,y+7,z); d.scene.add(m);
 c.position.set(x+18,y+42,z+18); c.lookAt(x,y,z); c.updateMatrixWorld(); const url=window.__snap();
 d.scene.remove(m); m.geometry.dispose(); m.material.dispose(); return url; })"""
