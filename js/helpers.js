// Shared helpers used by every game.
// on() / iv() / to() register listeners and timers so stop() can clean them up
// when the player leaves or restarts a game. Always use them inside a game.
const stage=document.getElementById('stage'),$=s=>stage.querySelector(s);
let L=[],T=[],cur=0;
const on=(t,e,f)=>{t.addEventListener(e,f);L.push([t,e,f])};
const iv=(f,ms)=>{const i=setInterval(f,ms);T.push(i);return i};
const to=(f,ms)=>{const i=setTimeout(f,ms);T.push(i);return i};
function stop(){L.forEach(([t,e,f])=>t.removeEventListener(e,f));T.forEach(i=>{clearInterval(i);clearTimeout(i)});L=[];T=[]}
const over=t=>stage.insertAdjacentHTML('beforeend',`<div class="over"><div>${t}</div><button class="btn" onclick="openGame(cur)">Play again</button></div>`);

