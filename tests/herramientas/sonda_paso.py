# Sonda de paso (v0.76): ¿dónde hay algo invisible que no deja andar? Pone al personaje en cada punto (en la calle o
# en el suelo de un parking), le hace andar 1,2 s en 8 direcciones y dice cuánto avanza y QUÉ paso de la colisión del
# jugador lo frenó (col = COL de la superficie, cars, deck, low+trench = bajo tierra / trinchera, clamp = ancho del
# camino subterráneo), con el camino bajo tierra (lowAt) que le tocó. Prueba de paso: los salones de todos los
# parkings (CARPARKS: 6 franjas a lo ancho) y los puntos de las capturas de Jonay.
# Uso: cd tests && python run_test.py herramientas/sonda_paso.py
import json
PUNTOS = [[129, -622, 0, 'rampa Cristo arriba (C. de las Peras)'], [133, -618, 0, 'rampa Cristo arriba 2'], [125, -626, 0, 'rampa Cristo arriba 3'],
          [205, -577, 1, 'Cristo carril (captura)'], [170, -591, 1, 'Cristo pie escalera (captura)']]
JS = """([x,z,abajo,yy])=>{ const d=__dbg, P=d.PLAYER; const out=[];
  const put=()=>{ P.x=x; P.z=z; P.vy=0; P.speed=0; if (abajo) { const g=d.heightAt(x,z); const lw=d.lowAt(x,z, yy!==null ? yy : g-5); if (!lw) return null; P.y=lw.y; P.low=lw; return lw; } P.low=null; P.y=d.heightAt(x,z)+0.17; return true; };
  const l0=put(); if (!l0) return {err:'sin suelo bajo tierra aquí'};
  for (let k=0;k<8;k++){ const a=k*Math.PI/4; put(); d.CAM.yaw=a; window.__PDBG=[1]; d.KEYS.add('KeyW'); let stop=null, last=null; for (let i=0;i<36;i++){ const px=P.x, pz=P.z; logicStep(); const mv=Math.hypot(P.x-px,P.z-pz); if (mv<0.02 && i>4 && !stop) { stop={i, at:[+P.x.toFixed(1),+P.z.toFixed(1)], pasos:(window.__PDBG||[]).map(q=>q[0]+':'+q[1].toFixed(2)+','+q[2].toFixed(2)).join(' '), low: P.low ? {y:+P.low.y.toFixed(2), hw:+P.low.hw.toFixed(2), d:+P.low.d.toFixed(2)} : null}; } } d.KEYS.delete('KeyW'); window.__PDBG=null;
    const dist=Math.hypot(P.x-x,P.z-z); out.push({dir:k*45, avanza:+dist.toFixed(1), para:stop}); }
  put(); return {low: abajo && l0.y!==undefined ? {y:+l0.y.toFixed(2), hw:l0.hw} : null, dirs:out}; }"""
async def run(pg):
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2); window.logicStep=()=>__step(1, 1/30);})()")
    halls = json.loads(await pg.evaluate("JSON.stringify((__dbg.CARPARKS||[]).map(c=>({name:c.name, yF:c.yF, pts:[-12.5,-9.5,-7.25,-3,3,7.25,9.5,12.5].map(v=>c.F.W((c.uc||0)+c.L*0.15, v))})))"))
    pts = [p + [None] for p in PUNTOS]
    for h in halls:
        for i, q in enumerate(h['pts']): pts.append([q[0], q[1], 1, h['name'] + ' v=' + str([-12.5, -9.5, -7.25, -3, 3, 7.25, 9.5, 12.5][i]), h['yF'] + 0.12])
    malos = 0
    for x, z, ab, nombre, yy in pts:
        r = json.loads(await pg.evaluate("(a)=>JSON.stringify((" + JS + ")(a))", [x, z, ab, yy]))
        if r.get('err'): print(f'{nombre} ({x:.0f}, {z:.0f}):', r['err']); continue
        cortos = [q for q in r['dirs'] if q['avanza'] < 3.0]
        malos += len(cortos)
        print(f"{nombre} ({x:.1f}, {z:.1f}) bajo tierra={r['low']}: avanza " + ' '.join(f"{q['dir']}°={q['avanza']}" for q in r['dirs']))
        for q in cortos: print('    FRENA', q['dir'], '°:', q['para'])
    print('direcciones frenadas', malos)
    # v0.76: La Trinidad para el parking largo: el eje de la avenida cada 20 m (altura del suelo, ancho entre fachadas),
    # Pedro Zerolo, el tranvía (a cuántos metros y a qué hondura) y las salas actuales
    t = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, T=d.TRI; if(!T||!T.ok) return null; const out={lenA:Math.round(T.A.len), lenB:Math.round(T.B.len), wA:T.A.w, wB:T.B.w, pz: T.pz ? [Math.round(T.pz.a.s), Math.round(T.pz.b.s)] : null, eje:[]};
      const tram=d.DATA.T; const cum=[0]; for (let i=2;i<tram.length;i+=2) cum.push(cum[cum.length-1]+Math.hypot(tram[i]-tram[i-2],tram[i+1]-tram[i-1]));
      for (let s=0; s<=T.A.len; s+=20){ const m=T.mid(s); let td=1e9, ts=0; for (let i=0;i+3<tram.length;i+=2){ const ax=tram[i],az=tram[i+1],dx=tram[i+2]-ax,dz=tram[i+3]-az,L2=dx*dx+dz*dz||1; const k=Math.max(0,Math.min(1,((m.x-ax)*dx+(m.z-az)*dz)/L2)); const dd=Math.hypot(m.x-ax-dx*k,m.z-az-dz*k); if(dd<td){td=dd; ts=cum[i/2]+k*Math.sqrt(L2);} }
        const b=T.B.proj(m.x,m.z); out.eje.push([s, Math.round(m.x), Math.round(m.z), +d.heightAt(m.x,m.z).toFixed(1), +(2*b.d).toFixed(1), Math.round(td), Math.round(ts), +d.tramDepth(ts).toFixed(1)]); }
      out.salas=(d.CARPARKS||[]).map(c=>[c.name, Math.round(c.x), Math.round(c.z), c.L, +c.yF.toFixed(1)]); out.tcuts=d.TCUTS.length; return out; })())"""))
    if t:
        print('trinidad', {k: v for k, v in t.items() if k != 'eje'})
        print('  s, x, z, suelo, ancho A-B, tranvía a m, s tranvía, hondura tranvía')
        for e in t['eje']: print('  ', e)
    print('SONDA PASO OK')
