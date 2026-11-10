# Tirón con los maleantes (v1.2.4; Jonay, 3-nov: «cuando huía un maleante, el juego se quedó congelado un momento»).
# Uso: herramientas/sonda_maleante.py   → shots/sonda_maleante.txt
# Mide, fotograma a fotograma (lógica + pintado, esperando a la GPU), lo que cuesta cada momento del maleante: sin nada,
# al aparecer, al huir (corre lejos del jugador), al irse del mapa (se escapa y sale otro peatón) y al empezar la pelea
# 2D con él. De cada fase da la mediana, el peor fotograma y si se han creado sombreadores nuevos (programas de la GPU).
import json

FASE = """async ([nombre, n, prep]) => { const d = __dbg, R = d.renderer, gl = R.getContext();
  const M = d.MALEANTES, st = M._st;
  const prog0 = (R.info.programs || []).length, geo0 = R.info.memory.geometries, tex0 = R.info.memory.textures;
  let extra = 0;
  if (prep === 'spawn') { window.GANG.sastronTut = true; window.GANG.maleIntro = true; st.cur = null; st.t = 0;
    const a = performance.now(); const ok = M._spawn(); extra = performance.now() - a; if (!ok) return { nombre, error: 'no hay peatón para hacerlo maleante' }; }
  if (prep === 'huir') { const c = st.cur; if (!c) return { nombre, error: 'sin maleante' }; c.flee = 30; c.fleeFrom = [d.PLAYER.x, d.PLAYER.z]; }
  if (prep === 'irse') { const c = st.cur; if (!c) return { nombre, error: 'sin maleante' }; c.gone = true; }
  if (prep === 'pelea') { const p = d.PEDS.find((q) => q.H && !q.down); if (!p) return { nombre, error: 'sin peatón' };
    p.maleante = { lv: 1, name: 'PRUEBA', t: 240 };
    const a = performance.now(); try { startStreetFight(p); } catch (e) { return { nombre, error: String(e) }; } extra = performance.now() - a; }
  const t = [];
  for (let i = 0; i < n; i++) { const a = performance.now(); __step(1, 1 / 30); R.render(d.scene, d.camera); gl.finish(); t.push(performance.now() - a); }
  const s = t.slice().sort((a, b) => a - b);
  let peor = 0; for (let i = 1; i < t.length; i++) if (t[i] > t[peor]) peor = i;
  if (prep === 'pelea') { try { d.MINI && d.MINI.hide && 0; if (window.FIGHT2D && FIGHT2D._abort) FIGHT2D._abort(); } catch (e) {} }
  return { nombre, mediana_ms: +s[s.length >> 1].toFixed(2), peor_ms: +t[peor].toFixed(2), peor_fotograma: peor,
    llamada_ms: +extra.toFixed(2), programas_nuevos: (R.info.programs || []).length - prog0,
    geometrias_nuevas: R.info.memory.geometries - geo0, texturas_nuevas: R.info.memory.textures - tex0,
    primeros: t.slice(0, 6).map((v) => +v.toFixed(1)) }; }"""

async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; const P=__dbg.PLAYER; P.x=-60; P.z=-230; __step(60);})()")
    out = []
    for nombre, n, prep in [('base', 60, ''), ('aparece', 60, 'spawn'), ('huye', 120, 'huir'), ('se escapa', 60, 'irse'), ('pelea 2D', 30, 'pelea')]:
        r = await pg.evaluate(FASE, [nombre, n, prep])
        out.append(r)
        print('MALEANTE', json.dumps(r, ensure_ascii=False))
    with open('shots/sonda_maleante.txt', 'w', encoding='utf-8') as f:
        for r in out:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')
    print('SONDA MALEANTE OK')
