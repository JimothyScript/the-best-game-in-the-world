import React, { Component } from 'react';
// Components
import Menu from './Menu';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [this.initializeGame()],
      turnNumber: 0,
      start: true,
      pause: false
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval); // Might not need this
  }
  generateNum() {
    return Math.ceil(Math.random() * 4);
  }
  initializeGame() {
    // Populate approximately 25%, which is around 625, out of 2,500 cells
    const rowLen = 50;
    const colLen = 50;
    const initialGrid = [];

    // Lowest usually in the range of high 500 (23%) and
    // maxRandomNum won't allow more than 750 (30%) to be populated.
    let maxRandomNum = Math.floor((rowLen * colLen) / 3.33);
    let populate;

    for (let row = 0; row < rowLen; row++) {
      const cellArr = [];
      for (let col = 0; col < colLen; col++) {
        populate = this.generateNum();
        if (populate === 1 && maxRandomNum > 0) {
          // console.log('populated'); // To see how many populated
          cellArr.push(populate);
          maxRandomNum--;
        } else {
          cellArr.push(null);
        }
      }
      initialGrid.push(cellArr);
    }

    return initialGrid;
  }
  handleClick(e) {
    const buttonClicked = e.target.innerText;

    switch(buttonClicked) {
      case 'START':
        if (this.state.start) {
          console.log('*START*'); // Runs once and remains locked until RESET is clicked

          this.gameLoop();

          this.setState({
            start: !this.state.start,
            pause: !this.state.pause
          });
        }

        break;
      case 'PAUSE':
        if (this.state.start || !this.state.pause) return;
        console.log('*PAUSE*'); // Pass only when RESUME was clicked

        clearInterval(this.interval); // Does nothing to current state except toggle pause

        this.setState({ pause: !this.state.pause });

        break;
      case 'RESUME':
        if (this.state.start || this.state.pause) return;
        console.log('*RESUME*'); // Pass only when PAUSE was clicked

        this.gameLoop();

        // Will call on gameLoop with current state after toggling pause
        this.setState({ pause: !this.state.pause });

        break;
      case 'RESET':
        const newGrid = this.initializeGame();
        if (!this.state.start) clearInterval(this.interval); // Only after START was clicked

        this.setState({
          grid: [newGrid],
          turnNumber: 0,
          start: true,
          pause: false
        });

        break;
      default:
        console.log('Something went wrong!');
    }
  }
  gameLoop() {
    // * Continue indefinitely until PAUSE(clearInterval), RESUME(gameLoop), or RESET(clearInterval/setState()) intervenes
    // * Update this.state.grid with evaluated grid => grid: [...this.state.grid, newGrid]
    // * Update this.state.turn by incremented value => turnNumber: this.state.turnNumber + 1

    this.interval = setInterval(() => {
      // KEEP AN EYE ON TURN NUMBER:
      console.log(`Current Turn is: ${this.state.turnNumber + 1}`);

      const rowLen = this.state.grid[0].length; // 50
      const colLen = this.state.grid[0][0].length; // 50
      const newGrid = []; // The new evaluated grid:

      for (let row = 0; row < rowLen; row++) {
        const cellArr = []; // filled with evaluated cells

        // this.state.grid[this.state.grid.length - 1][row].forEach((el, i) => {}); // Maybe this instead?
        for (let col = 0; col < colLen; col++) {
          const cell = this.state.grid[this.state.grid.length - 1][row][col];
          // Sends each cell into a function that checks neighbors:
          const result = this.brain(cell, row, col);
          cellArr.push(result);
        }
        newGrid.push(cellArr); // push evaluated cells to newGrid
      }

      console.log(newGrid);

      /* <--- if newGrid has been successfully created
      this.setState({
        grid: [...this.state.grid, newGrid],
        turnNumber: this.state.turnNumber + 1
      });
      //============================================*/

      /* <--- turnNumber INCREMENT TEST
      this.setState({
        turnNumber: this.state.turnNumber + 1
      });
      //===================================*/
    }, 2000);

  }
  brain(cell, row, col) {
    let neighborCount = 0;
    const arr = this.state.grid[this.state.grid.length - 1]

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (arr[row + i] && arr[col + j]) {
          if (i === 0 && j === 0) {
            // Rewrite logic to get rid of else statement
          } else {
            // console.log(`arr[${row + i}][${col + j}] = ${arr[row + i][col + j]}`);
            if (arr[row + i][col + j]) {
              neighborCount++;
            }
          }
        }
      }
    }

    if (cell) {
      // populated cell logic
      if (neighborCount < 2) {
        return null;
      } else if (neighborCount <= 3) {
        return 1;
      } else if (neighborCount > 3) {
        return null;
      }
    } else {
      // empty cell logic
      if (neighborCount !== 0 && neighborCount % 3 === 0) {
        return 1;
      } else {
        return null;
      }
    }
  }
  render() {
    const latestTurn = this.state.grid.length - 1;

    return (
      <div className="App">
        <div className="menu-container">
          <Menu
            handleClick={(e) => this.handleClick(e)}
            turnNumber={this.state.turnNumber}
            start={this.state.start}
            pause={this.state.pause} />
        </div>
        <div className="board-container">
          <Board grid={this.state.grid[latestTurn]} />
        </div>
      </div>
    );
  }
}

export default App;
