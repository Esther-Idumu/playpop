# Playpop. Mini Games Arcade

Plain HTML, CSS and JavaScript. No build step, no dependencies. Open `index.html` to play locally.

## Structure

```
playpop/
  index.html          page shell + script/style tags
  css/
    base.css          page, hub cards, panel, buttons, colours (CSS variables)
    games/*.css       styles for one game each
  js/
    images.js         image paths for the memory game
    helpers.js        on() / iv() / to() / stop() / over() shared helpers
    games/*.js        one file per game (original logic)
    main.js           GAMES list, hub cards, open/back/restart
  assets/images/      memory game cards + mole.jpg
```

## Change a game's card colour, emoji or text
Edit the `GAMES` array in `js/main.js`.

## Add a new game
1. Create `js/games/mygame.js` with `function mygame(S){ S.innerHTML = '...'; /* game code */ }`.
   Use `on(target,'event',fn)`, `iv(fn,ms)` and `to(fn,ms)` instead of addEventListener, setInterval and setTimeout so timers stop when the player leaves.
   Call `over('Game over text')` to show the Play again overlay.
2. Optionally add `css/games/mygame.css`.
3. Link both files in `index.html` (before `js/main.js`).
4. Add an entry to `GAMES` in `js/main.js`.

## Deploy
Upload the whole folder to any static host (Netlify drop, Vercel, GitHub Pages, Cloudflare Pages). The entry point is `index.html`.
