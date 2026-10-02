import asyncio, json
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    r = await pg.evaluate("JSON.stringify(__dbg.auditCrossings())")
    r = json.loads(r); print('conflicts', len(r))
    from collections import Counter
    print(Counter((c['ta'],c['tb'],c['fa'],c['fb']) for c in r).most_common(30))
    json.dump(r, open('/tmp/audit.json','w'))
