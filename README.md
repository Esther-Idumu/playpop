# PlayPop — Mini Games Arcade

PlayPop is a browser-based mini-games arcade built with HTML, CSS and vanilla JavaScript. It brings multiple interactive games together in a single application, allowing users to navigate between games, play, restart and explore different gameplay experiences.

The project focuses on modular JavaScript development, reusable utility functions, DOM manipulation and event-driven programming.

**Live Demo:** https://playpop-iota.vercel.app/

## How It Works

PlayPop uses a central game hub to manage access to individual games.

1. **Game selection:** Users browse the available games through a central interface.
2. **Game initialization:** Selecting a game loads its corresponding implementation into the application.
3. **Gameplay:** Each game manages its own state, user interactions and game logic.
4. **Game management:** Shared utilities handle event listeners, timers and game-over states.
5. **Navigation and restart:** Users can return to the game hub or restart the current game without reloading the entire application.

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 |
| Application logic | JavaScript (Vanilla JS) |
| Deployment | Vercel |

## Features

- **Central game hub:** A single interface for accessing multiple mini-games.
- **Modular game architecture:** Each game has its own JavaScript implementation.
- **Reusable utility functions:** Shared helpers for event listeners, intervals, timeouts and game-over handling.
- **Dynamic game rendering:** Game interfaces are rendered within a shared application container.
- **Game navigation:** Switch between individual games and the main hub.
- **Restart functionality:** Restart games using a shared game-over overlay.
- **Responsive interface:** A browser-based interface designed for interactive gameplay.

## Architecture

PlayPop uses a lightweight modular structure without a JavaScript framework or build system.

The central application logic manages game registration, navigation and lifecycle operations, while individual game files handle their own gameplay implementation.

### Shared Utilities

The application includes reusable helper functions:

| Function | Purpose |
|---|---|
| `on()` | Registers event listeners and tracks them for cleanup |
| `iv()` | Creates managed intervals |
| `to()` | Creates managed timeouts |
| `stop()` | Clears active timers and registered listeners |
| `over()` | Displays the game-over overlay |

These utilities help prevent event listeners and timers from remaining active after a player exits a game.

## Project Structure

```text
playpop/
│
├── index.html
│
├── assets/
│   └── images/
│       ├── memory game assets
│       └── mole.jpg
│
├── css/
│   ├── base.css
│   └── games/
│       └── individual game styles
│
└── js/
    ├── main.js
    ├── helpers.js
    ├── images.js
    │
    └── games/
        └── individual game implementations
```

### Key Files

- **main.js:** Maintains the game registry, generates game hub cards and handles game navigation, opening, returning and restarting.
- **helpers.js:** Contains reusable functions for event handling, timer management and game-over operations.
- **images.js:** Manages image paths used by the memory game.
- **games/:** Contains the independent JavaScript implementations for each game.
- **base.css:** Defines the main interface styling, layout, buttons and shared design variables.
- **css/games/:** Contains styles specific to individual games.

<<<<<<< HEAD

=======
## Adding a New Game

PlayPop is designed to make adding new games straightforward.

1. Create a new JavaScript file inside `js/games/`.
2. Implement the game logic using the shared application container.
3. Use the shared event and timer utilities to manage interactions and cleanup.
4. Optionally create a corresponding stylesheet inside `css/games/`.
5. Reference the JavaScript and CSS files in `index.html`.
6. Register the new game in the `GAMES` array inside `js/main.js`.

This structure allows new games to be added without modifying the core navigation logic.

## Running Locally

### Prerequisites

- A modern web browser.
- Git.

No package installation, external dependencies or build process is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/Esther-Idumu/playpop.git
   ```

2. Navigate into the project directory:

   ```bash
   cd playpop
   ```

3. Open `index.html` in your browser.

Alternatively, use a local development server to serve the project.

## Deployment

PlayPop is deployed on Vercel as a static web application.

**Live Demo:** https://playpop-iota.vercel.app/

The application can also be hosted on other static hosting platforms because it does not require a backend server or build process.

## What I Learned

Building PlayPop strengthened my understanding of JavaScript and event-driven programming.

Some of the key areas I explored include:

- Structuring JavaScript applications into independent modules.
- Managing application state and dynamic DOM updates.
- Building reusable functions to reduce code duplication.
- Managing event listeners and asynchronous timers.
- Designing application logic that supports easy extension and maintenance.

## Author

Built by Esther Idumu as a personal project to explore JavaScript application development, modular architecture and interactive browser experiences.
>>>>>>> 72847d4af667255320ba1b8f5320b157fa400f42
