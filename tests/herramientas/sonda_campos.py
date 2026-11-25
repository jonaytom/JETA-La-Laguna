# v1.4.51: los campos hundidos (window.__terrazas: x, z, suelo, desnivel, recortes, tramos de muro), los encogidos y cuántos
# recortes del terreno hay. Uso: herramientas/sonda_campos.py
import json
async def run(pg):
    r = await pg.evaluate("JSON.stringify({terrazas:(window.__terrazas||[]).filter(t=>t[3]>0.2).length, todas:(window.__terrazas||[]).length, mayores:(window.__terrazas||[]).sort((a,b)=>b[3]-a[3]).slice(0,8), encogidos: window.__camposEncogidos, recortes: __dbg.TCUTS.length, solares: window.__solares, carriles_heredados: window.__carrilesHeredados})")
    print('CAMPOS', r)
