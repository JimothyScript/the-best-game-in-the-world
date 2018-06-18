# The Best Game in the World

_Skills: React_

[Link to the website!](https://netscape-evolve.surge.sh/)

![Main image of menu and board](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/main.png)

## Rules

At each turn of the game (examples shown with the __center cell__ in focus):

* __Any populated cell with fewer than two neighbors becomes empty.__

_Before:_
![Rule 1 before image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/1-before.png)
_After:_
![Rule 1 before image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/1-after.png)
* __Any populated cell with two or three neighbors stays populated.__

_No Change:_
![Rule 2 no change image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/2-nochange.png)
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

## Then click START in the menu bar to watch the game evolve before your very eyes!

_Added Feature: COMPARE_

The __COMPARE__ button toggles between the previous and current grid state. This was
made to easily compare between the two states to see if the rules are kept and consistent
at any point of the game.

_Notes on button behavior:_

Once the __START__ button is clicked it will remain locked until the
__RESET__ button is clicked. Initially, the __PAUSE__, __RESUME__, and __COMPARE__ button
are locked but when the __START__ button is clicked, you
are able to toggle between __PAUSE__ and __RESUME__. The __COMPARE__ button is only accessible
when the game is paused. The __RESET__ button can be clicked at any point of the game to stop
and restore the initial game state.

_Main Algorithm for the Game Rules:_

[Repl.it link](https://repl.it/@jamesscript7/brainForGameLoop)
