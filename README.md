# The Best Game in the World

_Skills: React_

At each turn of the game:

* Any populated cell with fewer than two neighbors becomes empty.
* Any populated cell with two or three neighbors stays populated.
* Any populated cell with more than three neighbors becomes empty.
* Any empty cell with exactly three or six neighbors becomes populated.

## To start **The Best Game in the World**:

```
npm i
npm start
```

Then click __START__ in the menu bar to initiate the game!

_Notes on button behavior:_

Once __START__ button is clicked it will remain locked until the
__RESET__ button is clicked. The __PAUSE__ and __RESUME__ button
are locked initially but when the __START__ button is clicked, you
are able to toggle between __PAUSE__ and __RESUME__. The __RESET__
button can be clicked at any point of the game to stop and restore the initial game state.
