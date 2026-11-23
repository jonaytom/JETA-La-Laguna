# v1.4.47: cuántos tejados a cuatro aguas caben (ok), van más bajos o se hacen planos porque no caben (hipInnerOk,
# 04_world.js), y qué edificios quita el recorte de glorietas (rbClip, 04b_recorte.js)
async def run(pg):
    print('TEJADOS', await pg.evaluate("() => JSON.stringify(window.__hip)"))
    print('GLORIETAS', await pg.evaluate("() => JSON.stringify((__dbg.RCLIP || window.RCLIP || {goneList: []}).goneList.filter((g) => g[3] === 'glorieta'))"))
