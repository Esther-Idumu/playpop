// Whac-a-mole (original game logic, wrapped in a function that builds into the stage)
function mole(S) {
  // ---------- Build the board ----------
  S.innerHTML = `
    <div class="bar">
      <span class="pill">Score <b id="score">0</b></span>
      <span class="pill">Time <b id="time-left">60</b></span>
    </div>
    <div class="g-mole">
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => `<div class="square"></div>`).join('')}
    </div>`;

  // ---------- State ----------
  const squares = S.querySelectorAll('.square');
  const timeLeft = $('#time-left');
  const score = $('#score');

  let result = 0;
  let hitPosition;      // the square currently holding the mole
  let currentTime = 60;
  let timerId = null;

  // ---------- Move the mole to a random square ----------
  function randomSquare() {
    squares.forEach(square => square.classList.remove('mole'));

    const randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');

    hitPosition = randomSquare;
  }

  // ---------- Score only when the mole's square is clicked ----------
  squares.forEach(square => {
    on(square, 'mousedown', () => {
      if (square === hitPosition) {
        result++;
        score.textContent = result;
        hitPosition = null;
      }
    });
  });

  // ---------- Timers ----------
  timerId = iv(randomSquare, 500);

  const countDownTimerId = iv(() => {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
      clearInterval(countDownTimerId);
      clearInterval(timerId);
      over('GAME OVER! Your final score is ' + result);
    }
  }, 1000);
}