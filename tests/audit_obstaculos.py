import asyncio, json
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    r = json.loads(await pg.evaluate("JSON.stringify(__dbg.auditObstacles())")); print('obstacles', len(r))
    from collections import Counter
    print(Counter((c['to'],c['tr']) for c in r).most_common(20))
    json.dump(r, open('/tmp/obst.json','w'))
