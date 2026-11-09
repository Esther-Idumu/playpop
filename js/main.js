/* ---------- Arcade shell ---------- */
const GAMES=[
 {name:'Whac-a-Mole',emoji:'🐹',desc:'Whack the mole before time runs out.',color:'#ff6b6b',hint:'Click the mole as fast as you can',run:mole},
 {name:'Memory Flip',emoji:'🍔',desc:'Match all the food pairs.',color:'#66d0ff',hint:'Click two cards to flip them',run:memory},
 {name:'Breakout',emoji:'🧱',desc:'Smash every brick with the ball.',color:'#ffd23f',hint:'← → to move the paddle',keys:1,run:breakout},
 {name:'Space Invaders',emoji:'👾',desc:'Blast the aliens before they land.',color:'#b388ff',hint:'← → to move, ↑ to shoot',keys:1,run:invaders},
 {name:'Frogger',emoji:'🐸',desc:'Cross the road and the river in 20 seconds.',color:'#63e8b6',hint:'Press Start, then use the arrow keys',keys:1,run:frogger},
 {name:'Connect Four',emoji:'🔴',desc:'Two players. Four in a row wins.',color:'#ff9f5a',hint:'Click the spot just above a disc (or the bottom row)',run:connect4},
 {name:'Rock Paper Scissors',emoji:'✂️',desc:'Beat the computer in one throw.',color:'#ff7eb6',hint:'Pick your weapon',run:rps}
];
const hub=document.getElementById('hub'),game=document.getElementById('game'),pad=document.getElementById('pad');
document.getElementById('cards').innerHTML=GAMES.map((g,i)=>`<button class="card" style="--c:${g.color}" onclick="openGame(${i})"><div class="em">${g.emoji}</div><h3>${g.name}</h3><p>${g.desc}</p><span class="play">Play →</span></button>`).join('');
function openGame(i){
  stop();cur=i;const g=GAMES[i];
  hub.hidden=true;game.hidden=false;game.style.setProperty('--c',g.color);
  document.getElementById('gt').textContent=g.emoji+' '+g.name;
  document.getElementById('hint').textContent=g.hint;
  pad.classList.toggle('on',!!g.keys);
  stage.innerHTML='';stage.style.zoom=1;
  on(document,'keydown',e=>{if(e.key.startsWith('Arrow'))e.preventDefault()});
  g.run(stage);
  stage.style.zoom=Math.min(1,(innerWidth-56)/stage.scrollWidth);
  scrollTo(0,0);
}
document.getElementById('back').onclick=()=>{stop();game.hidden=true;hub.hidden=false};
document.getElementById('rs').onclick=()=>openGame(cur);
pad.onpointerdown=e=>{const k=e.target.dataset.k;if(k){e.preventDefault();['keydown','keyup'].forEach(t=>document.dispatchEvent(new KeyboardEvent(t,{key:k})))}};
