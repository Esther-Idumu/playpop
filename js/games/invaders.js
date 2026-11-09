// Space Invaders (original game logic, wrapped in a function that builds into the stage)
function invaders(S){
  S.innerHTML=`<div class="bar"><span class="pill results" id="res">0</span></div><div class="grid g-inv"></div>`;
  const grid=$('.grid'),resultDisplay=$('#res');
  let currentShooterIndex=202;
  const width=15,aliensRemoved=[];
  let invadersId,isGoingRight=true,direction=1,results=0;
  for(let i=0;i<width*width;i++){grid.appendChild(document.createElement('div'))}
  const squares=Array.from(grid.querySelectorAll('div'));
  const alienInvaders=[0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,35,36,37,38,39];
  function draw(){
    for(let i=0;i<alienInvaders.length;i++){
      if(!aliensRemoved.includes(i)){squares[alienInvaders[i]]?.classList.add('invader')}
    }
  }
  draw();
  squares[currentShooterIndex].classList.add('shooter');
  function remove(){for(let i=0;i<alienInvaders.length;i++){squares[alienInvaders[i]]?.classList.remove('invader')}}
  function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter');
    switch(e.key){
      case 'ArrowLeft':if(currentShooterIndex%width!==0)currentShooterIndex-=1;break;
      case 'ArrowRight':if(currentShooterIndex%width<width-1)currentShooterIndex+=1;break;
    }
    squares[currentShooterIndex].classList.add('shooter');
  }
  on(document,'keydown',moveShooter);
  function moveInvaders(){
    const leftEdge=alienInvaders[0]%width===0;
    const rightEdge=alienInvaders[alienInvaders.length-1]%width===width-1;
    remove();
    if(rightEdge&&isGoingRight){for(let i=0;i<alienInvaders.length;i++){alienInvaders[i]+=width+1;direction=-1;isGoingRight=false}}
    if(leftEdge&&!isGoingRight){for(let i=0;i<alienInvaders.length;i++){alienInvaders[i]+=width-1;direction=1;isGoingRight=true}}
    for(let i=0;i<alienInvaders.length;i++){alienInvaders[i]+=direction}
    draw();
    if(squares[currentShooterIndex].classList.contains('invader')){
      resultDisplay.innerHTML='GAME OVER';clearInterval(invadersId);over('GAME OVER 👾 Score: '+results);
    }
    if(aliensRemoved.length===alienInvaders.length){
      resultDisplay.innerHTML='YOU WIN';clearInterval(invadersId);over('YOU WIN! 🏆');
    }
  }
  invadersId=iv(moveInvaders,600);
  function shoot(e){
    let laserId,currentLaserIndex=currentShooterIndex;
    function moveLaser(){
      squares[currentLaserIndex].classList.remove('laser');
      currentLaserIndex-=width;
      if(currentLaserIndex<0){clearInterval(laserId);return}
      squares[currentLaserIndex].classList.add('laser');
      if(squares[currentLaserIndex].classList.contains('invader')){
        squares[currentLaserIndex].classList.remove('laser');
        squares[currentLaserIndex].classList.remove('invader');
        squares[currentLaserIndex].classList.add('boom');
        const hit=currentLaserIndex;
        to(()=>squares[hit].classList.remove('boom'),300);
        clearInterval(laserId);
        const alienRemoved=alienInvaders.indexOf(currentLaserIndex);
        aliensRemoved.push(alienRemoved);
        results++;resultDisplay.innerHTML=results;
      }
    }
    if(e.key==='ArrowUp'){laserId=iv(moveLaser,100)}
  }
  on(document,'keydown',shoot);
}

