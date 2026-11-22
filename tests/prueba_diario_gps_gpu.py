async def run(pg):
    result = await pg.evaluate("""() => {
      const d=__dbg, M=d.MISSIONS;
      const p=d.PLAYER;
      if (p.car) d.exitCar();
      Object.assign(p,{x:-839,z:-41,y:d.heightAt(-839,-41)+.17,low:null,dead:false,interior:null});
      d.GAME.lock=()=>{};
      d.GAME.state='play';
      M.gang.formed=true;
      M.gang.obispoIntro=true;
      M._setIdx(1,'obispo');
      const row=(i)=>document.querySelector('.diaItem[data-k="obispo"][data-i="'+i+'"]');
      d.DIARIO.open();
      row(1).click();
      const available=!!document.getElementById('diaTrack') && !document.getElementById('diaReset');
      document.getElementById('diaTrack').click();
      const position=M.diaryDestination('obispo',1);
      const tracks=!!d.GPS.path && d.GPS.path.length>5 && d.gpsRouteColor()==='#b388ff' &&
        d.GPS.tgt[0]===position[0] && d.GPS.tgt[1]===position[1] && !d.DIARIO.open_;
      d.DIARIO.open();
      const reopened=document.getElementById('diaTrack')?.textContent==='DEJAR DE SEGUIR';
      document.getElementById('diaTrack').click();
      const cleared=!d.GPS.follow && !d.GPS.followPoint;
      row(0).click();
      const completed=!!document.getElementById('diaReset') && !document.getElementById('diaTrack') && !M.resetFrom('obispo',1);
      d.DIARIO.close();
      return {available,tracks,reopened,cleared,completed};
    }""")
    print(result)
    assert all(result.values()), result
    print('SEGUIMIENTO DEL DIARIO OK')
