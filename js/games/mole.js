// Whac-a-mole (original game logic, wrapped in a function that builds into the stage)
function mole(S){
  S.innerHTML=`<div class="bar"><span class="pill">Score <b id="score">0</b></span><span class="pill">Time <b id="time-left">60</b></span></div><div class="g-mole">${[1,2,3,4,5,6,7,8,9].map(n=>`<div class="square"></div>`).join('')}</div>`;
  const squares=S.querySelectorAll('.square'),timeLeft=$('#time-left'),score=$('#score');
  let result=0,hitPosition,currentTime=60,timerId=null;
  function randomSquare(){
    squares.forEach(square=>square.classList.remove('mole'));
    let r=squares[Math.floor(Math.random()*9)];
    r.classList.add('mole');
    hitPosition=r.id;
  }
  squares.forEach(square=>on(square,'mousedown',()=>{
    if(square.id==hitPosition){result++;score.textContent=result;hitPosition=null}
  }));
  timerId=iv(randomSquare,500);
  const countDownTimerId=iv(()=>{
    currentTime--;timeLeft.textContent=currentTime;
    if(currentTime==0){clearInterval(countDownTimerId);clearInterval(timerId);over('GAME OVER! Your final score is '+result)}
  },1000);
}

