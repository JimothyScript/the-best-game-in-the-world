# Conway's Game of Life

This simulation is a cellular automaton devised by John Conway in 1970. This particular variation is _HighLife_, where a dead cell comes to life if it is surrounded by 6 living cells. It's best known for the "replicator" pattern.

_Starting Pattern:_

![Starting pattern for replicator](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/replicator.png)

_Pattern evolution\*:_

![Replicator pattern](http://conwaylife.com/w/images/1/19/Replicator_animation.gif)

\*[Gif provided by the wiki page](http://conwaylife.com/w/index.php?title=Replicator)

__Skills:__ React.

[Link to the website!](https://netscape-evolve.surge.sh/)

_Create your own patterns:_

![Image of menu and board with hello world!](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/main-1.png)

_Create a randomized pattern that populates 23-27% of the board:_

![Image of menu and randomized board](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/main-2.png)

_Pause the simulation to view pattern and compare with previous turn:_

![Image of menu and board in paused state](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/main-3.png)

## Rules

At each turn of the game (examples shown with the __center cell__ in focus):

* __Any populated cell with fewer than two neighbors becomes empty.__

_Before:_
![Rule 1 before image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/1-before.png)
_After:_
![Rule 1 before image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/1-after.png)
* __Any populated cell with two or three neighbors stays populated.__

_Before:_
![Rule 2 before no change image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/2-nochange.png)
_After:_
![Rule 2 after no change image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/2-nochange.png)
* __Any populated cell with more than three neighbors becomes empty.__

_Before:_
![Rule 3 before image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/3-before.png)
_After:_
![Rule 3 after image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/3-after.png)
* __Any empty cell with exactly three or six neighbors becomes populated.__

_Before:_
![Rule 4 before image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/4-before.png)
_After:_
![Rule 4 before image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/4-after.png)

## To Start the Game:

```
npm i
npm start
```

### Notes on button behavior:

__RANDOMIZE__: Randomly populates the board according to the rule set.

__START__: Accessible when there's at least a single cell on the board or after __RANDOMIZE__ is clicked. This button will remain locked until the __RESET__ button is clicked.

__PAUSE__: Accessible when the game is running to freeze the simulation. You are able to toggle between __PAUSE__ and __RESUME__.

__RESUME__: Accessible after the game has been paused. Will continue the simulation from where the game left off.

__RESET__: Accessible after the simulation has started to clear the board of any populated cells.

__COMPARE__: Accessible only after the game has been paused and will display the previous turn in order to check the integrity of the rule set.

### Main Algorithm for the Game Rules:

[Repl.it link](https://repl.it/@jamesscript7/brainForGameLoop)
