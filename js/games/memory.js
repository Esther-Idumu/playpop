// Memory (original game logic, wrapped in a function that builds into the stage)
function memory(S){
  S.innerHTML=`<div class="bar"><span class="pill">Score <b id="result"></b></span></div><div id="grid"></div><div class="msg" id="msg"></div>`;
  const names=['fries','cheeseburger','hotdog','ice-cream','milkshake','pizza'];
  const cardArray=names.concat(names).map(n=>({name:n,img:IMG[n]}));
  cardArray.sort(()=>0.5-Math.random());
  const grid=$('#grid'),resultDisplay=$('#result'),msg=$('#msg');
  let cardsChosen=[],cardsChosenId=[],cardsWon=[];
  function createBoard(){
    for(let i=0;i<cardArray.length;i++){
      const card=document.createElement('img');
      card.setAttribute('src',IMG.blank);card.setAttribute('data-id',i);
      card.addEventListener('click',flipCard);grid.appendChild(card);
    }
  }
  function checkMatch(){
    const cards=grid.querySelectorAll('img');
    const optionOneId=cardsChosenId[0],optionTwoId=cardsChosenId[1];
    if(optionOneId==optionTwoId){
      cards[optionOneId].setAttribute('src',IMG.blank);cards[optionTwoId].setAttribute('src',IMG.blank);
      msg.textContent='You have clicked the same image!';
    }else if(cardsChosen[0]===cardsChosen[1]){
      msg.textContent='You found a match! 🎉';
      cards[optionOneId].setAttribute('src',IMG.white);cards[optionTwoId].setAttribute('src',IMG.white);
      cards[optionOneId].removeEventListener('click',flipCard);cards[optionTwoId].removeEventListener('click',flipCard);
      cardsWon.push(cardsChosen);
    }else{
      cards[optionOneId].setAttribute('src',IMG.blank);cards[optionTwoId].setAttribute('src',IMG.blank);
      msg.textContent='Sorry, try again!';
    }
    cardsChosen=[];cardsChosenId=[];
    resultDisplay.textContent=cardsWon.length;
    if(cardsWon.length===cardArray.length/2){msg.textContent='';over('Congratulations, you found them all! 🏆')}
  }
  function flipCard(){
    if(cardsChosen.length===2)return;
    let cardId=this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);cardsChosenId.push(cardId);
    this.setAttribute('src',cardArray[cardId].img);
    if(cardsChosen.length===2){to(checkMatch,500)}
  }
  resultDisplay.textContent=0;
  createBoard();
}

