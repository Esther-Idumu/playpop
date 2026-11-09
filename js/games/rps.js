// Rock Paper Scissors (original game logic, wrapped in a function that builds into the stage)
function rps(S){
  S.innerHTML=`<div class="rps"><h2>Computer Choice: <span id="computer-choice"></span></h2><h2>Your Choice: <span id="user-choice"></span></h2><h2>Result: <span id="result"></span></h2><div class="row"><button id="rock" style="background:#ff6b6b">✊ rock</button><button id="paper" style="background:#66d0ff">✋ paper</button><button id="scissors" style="background:#ffd23f">✌️ scissors</button></div></div>`;
  const computerChoiceDisplay=$('#computer-choice'),userChoiceDisplay=$('#user-choice'),resultDisplay=$('#result');
  const possibleChoices=S.querySelectorAll('button');
  let userChoice,computerChoice,result;
  possibleChoices.forEach(pc=>on(pc,'click',(e)=>{
    userChoice=e.currentTarget.id;userChoiceDisplay.innerHTML=userChoice;
    generateComputerChoice();getResult();
  }));
  function generateComputerChoice(){
    const randomNumber=Math.floor(Math.random()*3)+1;
    if(randomNumber===1)computerChoice='rock';
    if(randomNumber===2)computerChoice='paper';
    if(randomNumber===3)computerChoice='scissors';
    computerChoiceDisplay.innerHTML=computerChoice;
  }
  function getResult(){
    if(computerChoice===userChoice){result='its a draw!'}
    else if((computerChoice==="rock"&&userChoice==="scissors")||(computerChoice==="paper"&&userChoice==="rock")||(computerChoice==="scissors"&&userChoice==="paper")){result="You lose!"}
    else{result='you win!'}
    resultDisplay.innerHTML=result;
  }
}

