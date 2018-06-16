# The Best Game in the World

_Skills: React_

[Link to the website!](https://netscape-evolve.surge.sh/)

![Main image of menu and board](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/main.png)

## Rules

At each turn of the game (examples shown with the center cell in focus):

* Any populated cell with fewer than two neighbors becomes empty.

_Before:_
![Rule 1 before image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/1-before.png)
_After:_
![Rule 1 before image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/1-after.png)
* Any populated cell with two or three neighbors stays populated.

_No Change:_
![Rule 2 no change image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/2-nochange.png)
* Any populated cell with more than three neighbors becomes empty.

_Before:_
![Rule 3 before image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/3-before.png)
_After:_
![Rule 3 after image](https://raw.githubusercontent.com/JamesScript7/the-best-game-in-the-world/master/public/images/rules/3-after.png)
* Any empty cell with exactly three or six neighbors becomes populated.

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

_Notes on button behavior:_

Once the __START__ button is clicked it will remain locked until the
__RESET__ button is clicked. Initially, the __PAUSE__ and __RESUME__ button
are locked but when the __START__ button is clicked, you
are able to toggle between __PAUSE__ and __RESUME__. The __RESET__
button can be clicked at any point of the game to stop and restore the initial game state.

[Repl.it link for algorithm](https://repl.it/@jamesscript7/brainForGameLoop)
