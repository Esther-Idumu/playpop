// Breakout (original game logic, wrapped in a function that builds into the stage)
function breakout(S){
  S.innerHTML=`<div class="bar"><span class="pill" id="score">0</span></div><div class="grid g-brk"></div>`;
  const grid=$('.grid'),scoreDisplay=$('#score');
  const blockWidth=100,blockHeight=20,boardWidth=560,boardHeight=300,ballDiameter=20;
  let xDirection=-2,yDirection=2;
  const userStart=[230,10];let currentPosition=userStart;
  const ballStart=[270,40];let ballCurrentPosition=ballStart;
  let timerId,score=0;
  class Block{
    constructor(xAxis,yAxis){
      this.bottomLeft=[xAxis,yAxis];this.bottomRight=[xAxis+blockWidth,yAxis];
      this.topLeft=[xAxis,yAxis+blockHeight];this.topRight=[xAxis+blockWidth,yAxis+blockHeight];
    }
  }
  const blocks=[];
  [270,240,210].forEach(y=>[10,120,230,340,450].forEach(x=>blocks.push(new Block(x,y))));
  const rowColor={270:'#ff6b6b',240:'#ffd23f',210:'#63e8b6'};
  function addBlocks(){
    for(let i=0;i<blocks.length;i++){
      const block=document.createElement('div');
      block.classList.add('block');
      block.style.left=blocks[i].bottomLeft[0]+'px';
      block.style.bottom=blocks[i].bottomLeft[1]+'px';
      block.style.background=rowColor[blocks[i].bottomLeft[1]];
      grid.appendChild(block);
    }
  }
  addBlocks();
  const user=document.createElement('div');user.classList.add('user');grid.appendChild(user);drawUser();
  const ball=document.createElement('div');ball.classList.add('ball');drawBall();grid.appendChild(ball);
  function moveUser(e){
    switch(e.key){
      case 'ArrowLeft':if(currentPosition[0]>0){currentPosition[0]-=10;drawUser()}break;
      case 'ArrowRight':if(currentPosition[0]<(boardWidth-blockWidth)){currentPosition[0]+=10;drawUser()}break;
    }
  }
  on(document,'keydown',moveUser);
  function drawUser(){user.style.left=currentPosition[0]+'px';user.style.bottom=currentPosition[1]+'px'}
  function drawBall(){ball.style.left=ballCurrentPosition[0]+'px';ball.style.bottom=ballCurrentPosition[1]+'px'}
  function moveBall(){
    ballCurrentPosition[0]+=xDirection;ballCurrentPosition[1]+=yDirection;
    drawBall();checkForCollisions();
  }
  timerId=iv(moveBall,20);
  function checkForCollisions(){
    for(let i=0;i<blocks.length;i++){
      if((ballCurrentPosition[0]>blocks[i].bottomLeft[0]&&ballCurrentPosition[0]<blocks[i].bottomRight[0])&&
         ((ballCurrentPosition[1]+ballDiameter)>blocks[i].bottomLeft[1]&&ballCurrentPosition[1]<blocks[i].topLeft[1])){
        const allBlocks=Array.from(grid.querySelectorAll('.block'));
        allBlocks[i].classList.remove('block');
        allBlocks[i].style.display='none';
        blocks.splice(i,1);
        changeDirection();
        score++;scoreDisplay.innerHTML=score;
        if(blocks.length==0){
          scoreDisplay.innerHTML='You Win!';clearInterval(timerId);
          document.removeEventListener('keydown',moveUser);over('You Win! 🏆');
        }
      }
    }
    if(ballCurrentPosition[0]>=(boardWidth-ballDiameter)||ballCurrentPosition[1]>=(boardHeight-ballDiameter)||ballCurrentPosition[0]<=0){changeDirection()}
    if((ballCurrentPosition[0]>currentPosition[0]&&ballCurrentPosition[0]<currentPosition[0]+blockWidth)&&
       (ballCurrentPosition[1]>currentPosition[1]&&ballCurrentPosition[1]<currentPosition[1]+blockHeight)){changeDirection()}
    if(ballCurrentPosition[1]<=0){
      clearInterval(timerId);scoreDisplay.innerHTML='You Lose!';
      document.removeEventListener('keydown',moveUser);over('You Lose! Score: '+score);
    }
  }
  function changeDirection(){
    if(xDirection===2&&yDirection===2){yDirection=-2;return}
    if(xDirection==2&&yDirection===-2){xDirection=-2;return}
    if(xDirection==-2&&yDirection===-2){yDirection=2;return}
    if(xDirection==-2&&yDirection===2){xDirection=2;return}
  }
}

