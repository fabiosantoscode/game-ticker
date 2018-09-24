# game-ticker
Implements a game loop where you can register update and render functions, to be supplied with time delatas and other information.

## const end = require('game-ticker')({ update: () => {...}, render: () => {...}, updatesPerSecond, maxFPS})
Starts the game ticker. Returns a function to end it.

Takes the following options:

 - `update`: The function to call every (1000 / updatesPerSecond) milliseconds
 - `render`: The function to call after requestAnimationFrame
 - `updatesPerSecond`: The number of desired updates per second
 - `maxFPS`: The maximum allowed FPS

Example:

```javascript
const gameTicker = require('game-ticker')

const end = gameTicker({
    update(timeInfo, dt) {
        // do stuff with dt
    },
    render(timeInfo, intoNextUpdate) {
        // do stuff with current state and intoNextUpdate for interpolation
    },
    updatesPerSecond: 12,
    maxFPS: 30
})
```
