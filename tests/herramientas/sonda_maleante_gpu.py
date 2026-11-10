# Tirón con los maleantes (v1.2.4; Jonay, 3-nov: «cuando huía un maleante, el juego se quedó congelado un momento»).
# Uso: herramientas/sonda_maleante_gpu.py   → shots/sonda_maleante.txt (con «_gpu» en el nombre, run_varios.py abre el
# navegador con la tarjeta gráfica: sin ella, el pintado por software da fotogramas de segundos que no dicen nada)
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
  if (prep === 'pelea') { const p = (st.cur && !st.cur.gone && d.PEDS.includes(st.cur)) ? st.cur : d.PEDS.find((q) => q.H && !q.down); if (!p) return { nombre, error: 'sin peatón' };
    if (!p.maleante) p.maleante = { lv: 1, name: 'PRUEBA', t: 240 };
    // what the call spends its time on: 3D renders, 2D canvas work (read/write pixels, copies) and the rest (JS)
    const T = { render: 0, nRender: 0, getImg: 0, putImg: 0, draw: 0, lienzos: 0 };
    const wrap = (obj, k, key, cnt) => { const f = obj[k]; obj[k] = function (...a) { const t0 = performance.now(); try { return f.apply(this, a); } finally { T[key] += performance.now() - t0; if (cnt) T[cnt]++; } }; return () => { obj[k] = f; }; };
    const C2 = CanvasRenderingContext2D.prototype, undo = [wrap(R, 'render', 'render', 'nRender'), wrap(C2, 'getImageData', 'getImg'), wrap(C2, 'putImageData', 'putImg'), wrap(C2, 'drawImage', 'draw')];
    const ce = document.createElement; document.createElement = function (t, ...r) { if (String(t).toLowerCase() === 'canvas') T.lienzos++; return ce.call(document, t, ...r); };
    const g0 = R.info.memory.geometries;
    const a = performance.now(); try { d.startStreetFight(p); } catch (e) { return { nombre, error: String(e) }; } extra = performance.now() - a;
    undo.forEach((u) => u()); document.createElement = ce;
    for (const k in T) T[k] = +T[k].toFixed(1); T.geometrias_en_la_llamada = R.info.memory.geometries - g0; window.__peleaT = T; }
  const t = [];
  for (let i = 0; i < n; i++) { const a = performance.now(); __step(1, 1 / 30); R.render(d.scene, d.camera); gl.finish(); t.push(performance.now() - a); }
  const s = t.slice().sort((a, b) => a - b);
  let peor = 0; for (let i = 1; i < t.length; i++) if (t[i] > t[peor]) peor = i;
  if (prep === 'pelea') { try { d.MINI && d.MINI.hide && 0; if (d.FIGHT2D && d.FIGHT2D._abort) d.FIGHT2D._abort(); } catch (e) {} d.GAME.state = 'play'; document.body.classList.remove('fighting'); }
  return { nombre, mediana_ms: +s[s.length >> 1].toFixed(2), peor_ms: +t[peor].toFixed(2), peor_fotograma: peor,
    llamada_ms: +extra.toFixed(2), programas_nuevos: (R.info.programs || []).length - prog0,
    geometrias_nuevas: R.info.memory.geometries - geo0, texturas_nuevas: R.info.memory.textures - tex0,
    primeros: t.slice(0, 6).map((v) => +v.toFixed(1)), desglose: prep === 'pelea' ? window.__peleaT : undefined }; }"""

async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; const P=__dbg.PLAYER; P.x=-60; P.z=-230; __step(60);})()")
    out = []
    import asyncio
    await asyncio.sleep(10)  # v1.2.4: the game draws the player's fight figures in quiet moments after loading
    for nombre, n, prep in [('calentar', 90, ''), ('base', 60, ''), ('aparece', 60, 'spawn'), ('pelea 2D (con el maleante)', 30, 'pelea'),
                            ('huye', 120, 'huir'), ('se escapa', 60, 'irse'), ('otra pelea 2D', 30, 'pelea')]:
        if prep == 'pelea' and nombre.startswith('pelea'):
            await asyncio.sleep(4)  # his figures, drawn ahead in quiet moments since he appeared
        r = await pg.evaluate(FASE, [nombre, n, prep])
        out.append(r)
        print('MALEANTE', json.dumps(r, ensure_ascii=False))
    with open('shots/sonda_maleante.txt', 'w', encoding='utf-8') as f:
        for r in out:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')
    print('SONDA MALEANTE OK')
