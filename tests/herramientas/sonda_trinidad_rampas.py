# v1.4.48: las rampas de los parkings de la Trinidad (TRI.rampA / rampB) y los parkings construidos (PARKINGS)
async def run(pg):
    print('RAMPAS', await pg.evaluate("() => { const T=__dbg.TRI||{}; return JSON.stringify({ ok:T.ok, fail:T.fail, rampA: !!T.rampA, rampB: !!T.rampB, pz: !!T.pz, A: T.A && Math.round(T.A.len), B: T.B && Math.round(T.B.len), anchoA: T.A && T.A.w, anchoB: T.B && T.B.w }); }"))
