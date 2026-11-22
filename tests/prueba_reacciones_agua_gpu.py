async def run(pg):
    result = await pg.evaluate("""() => {
      const d=__dbg, originalRandom=Math.random, lines=new Set(), fleeLines=new Set();
      let flee=0, pursue=0;
      try {
        for (let i=0; i<20; i++) {
          const chase=i<10;
          let calls=0;
          Math.random=()=>calls++ ? ((i%10)+.3)/10 : chase ? .25 : .75;
          const p={down:0,wetT:0};
          d.AGUA._wetPed(p);
          if (p.flee===4 && !p.wetChase) flee++;
          if (p.wetChase===14 && !p.flee) pursue++;
          const text=document.getElementById('sub').innerText;
          (chase?lines:fleeLines).add(text);
          d.AGUA._wetPed(p);
          if (d.FIGHT2D.running) throw Error('A distant hit opened a fight');
        }
      } finally { Math.random=originalRandom; }
      const player=d.PLAYER;
      if (player.car) d.exitCar();
      Object.assign(player,{x:-839,z:-41,y:d.heightAt(-839,-41)+.17,low:null,down:0,dead:false,interior:null});
      d.GAME.state='play';
      __step(40,1/30);
      const p=d.PEDS.find(p=>p.H && !p.canarion && !p.down);
      let fight=false;
      if (p) {
        Object.assign(p,{x:player.x,z:player.z,wetChase:2});
        player.down=0;
        d.wetChasePed(p,1/30);
        fight=d.FIGHT2D.running;
        if (fight) d.FIGHT2D._abort();
      }
      return {flee,pursue,lines:lines.size,fleeLines:fleeLines.size,fight};
    }""")
    print(result)
    assert result['flee']==10 and result['pursue']==10 and result['lines']>=4 and result['fleeLines']>=4 and result['fight']
    print('REACCIONES AL AGUA OK')
