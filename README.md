# The Best Game in the World

At each turn of the game:

* Any populated cell with fewer than two neighbors becomes empty.
* Any populated cell with two or three neighbors stays populated.
* Any populated cell with more than three neighbors becomes empty.
* Any empty cell with exactly three or six neighbors becomes populated.

To start The Best Game in the World:

```
npm i
npm start
```

Then click START in the menu bar to initiate the game!

Notes

Button behavior:
Once START button is clicked it will remain locked until the RESET button is clicked. The PAUSE and RESUME button are locked initially but when the START button is clicked, you are able to toggle between PAUSE and RESUME. The RESET button can be clicked to stop and restore the initial game state at any point of the game.
