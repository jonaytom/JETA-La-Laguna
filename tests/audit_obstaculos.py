import asyncio, json
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    r = json.loads(await pg.evaluate("JSON.stringify(__dbg.auditObstacles())")); print('obstacles', len(r))
    from collections import Counter
    print(Counter((c['to'],c['tr']) for c in r).most_common(20))
    barriers = await pg.evaluate('__dbg.auditRoadBarriers()')
    print('barreras en calzada', len(barriers), Counter(o['type'] for o in barriers))
    with open('shots/audit_barreras.json', 'w', encoding='utf8') as f:
        json.dump(barriers, f, ensure_ascii=False, indent=2)
    with open('shots/audit_obstaculos.json', 'w', encoding='utf8') as f:
        json.dump(r, f, ensure_ascii=False, indent=2)
