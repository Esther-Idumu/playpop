// Frogger (original game logic, wrapped in a function that builds into the stage)
function frogger(S){
  const lg=[1,2,3,4,5,1,2,3,4],rg=[5,1,2,3,4,5,1,2,3],cr=[1,2,3,1,2,3,1,2,3];
  const layout=Array(81).fill('');
  layout[4]='ending-block';
  lg.forEach((n,i)=>layout[18+i]='log-left l'+n);
  rg.forEach((n,i)=>layout[27+i]='log-right l'+n);
  cr.forEach((n,i)=>{layout[45+i]='car-left c'+n;layout[54+i]='car-right c'+n});
  layout[76]='starting-block frog';
  S.innerHTML=`<div class="bar"><span class="pill">Seconds left: <b id="time-left">20</b></span><span class="pill">Result: <b id="result"></b></span></div><div style="text-align:center;margin-bottom:12px"><button class="btn" id="start-pause-button">Start / Pause</button></div><div class="grid g-frog">${layout.map(c=>`<div class="${c}"></div>`).join('')}</div>`;
  const timeLeftDisplay=$('#time-left'),resultDisplay=$('#result'),startPauseButton=$('#start-pause-button');
  const squares=S.querySelectorAll('.grid div');
  const logsLeft=S.querySelectorAll('.log-left'),logsRight=S.querySelectorAll('.log-right');
  const carsLeft=S.querySelectorAll('.car-left'),carsRight=S.querySelectorAll('.car-right');
  let currentIndex=76;const width=9;let timerId,outcomeTimerId,currentTime=20;
  function moveFrog(e){
    squares[currentIndex].classList.remove('frog');
    switch(e.key){
      case 'ArrowLeft':if(currentIndex%width!==0)currentIndex-=1;break;
      case 'ArrowRight':if(currentIndex%width<width-1)currentIndex+=1;break;
      case 'ArrowUp':if(currentIndex-width>=0)currentIndex-=width;break;
      case 'ArrowDown':if(currentIndex+width<width*width)currentIndex+=width;break;
    }
    squares[currentIndex].classList.add('frog');
  }
  /* cycles l1..l5 or c1..c3 by one step: +1 for "left" movers, -1 for "right" movers */
  const shift=(el,p,n,d)=>{for(let k=1;k<=n;k++){if(el.classList.contains(p+k)){el.classList.remove(p+k);el.classList.add(p+(((k-1+d+n)%n)+1));break}}};
  function autoMoveElements(){
    currentTime--;timeLeftDisplay.textContent=currentTime;
    logsLeft.forEach(l=>shift(l,'l',5,1));logsRight.forEach(l=>shift(l,'l',5,-1));
    carsLeft.forEach(c=>shift(c,'c',3,1));carsRight.forEach(c=>shift(c,'c',3,-1));
  }
  function checkOutComes(){lose();win()}
  function lose(){
    if(squares[currentIndex].classList.contains('c1')||squares[currentIndex].classList.contains('l4')||squares[currentIndex].classList.contains('l5')||currentTime<=0){
      resultDisplay.textContent='You lose!';
      clearInterval(timerId);clearInterval(outcomeTimerId);
      squares[currentIndex].classList.remove('frog');
      document.removeEventListener('keyup',moveFrog);over('You lose! 🐸');
    }
  }
  function win(){
    if(squares[currentIndex].classList.contains('ending-block')){
      resultDisplay.textContent='You Win!';
      clearInterval(timerId);clearInterval(outcomeTimerId);
      document.removeEventListener('keyup',moveFrog);over('You Win! 🏆');
    }
  }
  on(startPauseButton,'click',()=>{
    if(timerId){
      clearInterval(timerId);clearInterval(outcomeTimerId);
      outcomeTimerId=null;timerId=null;
      document.removeEventListener('keyup',moveFrog);
    }else{
      timerId=iv(autoMoveElements,1000);outcomeTimerId=iv(checkOutComes,50);
      on(document,'keyup',moveFrog);
    }
  });
}

