# v1.4.51: cuántos recortes del terreno (TCUTS) y grupos se usan, frente al máximo (NCUT 1024, NGRP 256), y cuántos campos
# y canchas hay. Uso: herramientas/sonda_recortes.py
async def run(pg):
    print('RECORTES', await pg.evaluate("(()=>{ const D=__dbg; const T=D.TCUTS; const g=new Set(T.map(c=>c[5])); return JSON.stringify({recortes:T.length, grupos:g.size, campos: D.SPORTS ? D.SPORTS.pitches.length : null}); })()"))
