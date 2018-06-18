import React, { Component } from 'react';
// Components
import Menu from './Menu/Menu';
import Board from './Board/Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [this.initializeGame()],
      turnNumber: 0,
      start: true,
      pause: false,
      compare: false
    }

    this.size = { rowLen: 50, colLen: 50 }
    this.turnSpeed = 80
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
    // maxRandomNum won't allow more than 677 (27%) to be populated.
    let maxRandomNum = Math.floor((rowLen * colLen) / 3.69);
    let populate;

    for (let row = 0; row < rowLen; row++) {
      const cellArr = [];
      for (let col = 0; col < colLen; col++) {
        populate = this.generateNum();
        if (populate === 1 && maxRandomNum > 0) {
          // console.log('cells populated'); // Uncomment to quickly check
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
        // Runs once and remains locked until RESET is clicked
        if (this.state.start) {
          this.gameLoop();

          this.setState({
            start: !this.state.start,
            pause: !this.state.pause
          });
        }

        break;
      case 'PAUSE':
        if (this.state.start || !this.state.pause) return;
        // console.log('*PAUSE*'); // Pass only when RESUME was clicked

        clearInterval(this.intervalLoop);
        // Does nothing to current state except toggle pause
        this.setState({ pause: !this.state.pause });

        break;
      case 'RESUME':
        if (this.state.start || this.state.pause) return;
        // console.log('*RESUME*'); // Pass only when PAUSE was clicked

        this.gameLoop();
        // Will call on gameLoop with current state after toggling pause
        this.setState({
          pause: !this.state.pause,
          compare: false
        });

        break;
      case 'RESET':
        if (!this.state.start) clearInterval(this.intervalLoop); // Only after START was clicked
        const newGrid = this.initializeGame();

        this.setState({
          grid: [newGrid],
          turnNumber: 0,
          start: true,
          pause: false,
          compare: false
        });

        break;
      case 'COMPARE':
        // Will toggle between previous and current grid state
        if (this.state.start || this.state.pause) return;
        // console.log('*COMPARE*'); // Only accessible when pause is clicked

        this.setState({ compare: !this.state.compare });

        break;
      default:
        console.log('Something went wrong!');
    }
  }
  gameLoop() {
    const { rowLen, colLen } = this.size;

    // * Continue indefinitely until PAUSE(clearInterval), RESUME(gameLoop), or RESET(clearInterval/setState()) intervenes
    this.intervalLoop = setInterval(() => {
      const newGrid = []; // The new evaluated grid

      // Maybe .forEach() instead?
      for (let row = 0; row < rowLen; row++) {
        const cellArr = [];

        for (let col = 0; col < colLen; col++) {
          // this.brain() checks neighbors and determines 1 or null
          cellArr.push(this.brain(row, col));
        }
        newGrid.push(cellArr); // push evaluated cells to newGrid
      }

      this.setState({
        grid: [...this.state.grid, newGrid],
        turnNumber: this.state.turnNumber + 1
      });

    }, this.turnSpeed);
  }
  brain(row, col) {
    const arr = this.state.grid[this.state.grid.length - 1];
    let neighborCount = 0;
    let currentCell;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (arr[row + i] && arr[col + j]) {
          if (row + i === row && col + j === col) {
            currentCell = arr[row + i][col + j];
          } else {
            // console.log(`arr[${row + i}][${col + j}] = ${arr[row + i][col + j]}`);
            if (arr[row + i][col + j]) neighborCount++;
          }
        }
      }
    }

    // if: Populated cell conditional is between 2 to 3 is true, everything else is null.
    // else: Empty cell evenly divisible by 3 is true, everything else is null.
    if (currentCell)
      return (neighborCount > 1 && neighborCount < 4) ? 1 : null;
    else
      return (neighborCount !== 0 && neighborCount % 3 === 0) ? 1 : null;
  }
  render() {
    const currentGrid = this.state.grid.length - 1;
    const turnNum = this.state.turnNumber;
    const compareBool = this.state.compare;
    // Selects previous grid if compare is true:
    const num = compareBool ? turnNum - 1 : turnNum;
    const latestTurn = compareBool ? currentGrid - 1 : currentGrid;

    return (
      <div className="App">
        <div className="menu-container">
          <Menu
            handleClick={(e) => this.handleClick(e)}
            turnNumber={num}
            start={this.state.start}
            pause={this.state.pause}
            compare={compareBool} />
        </div>
        <div className="board-container">
          <Board grid={this.state.grid[latestTurn]} />
        </div>
      </div>
    );
  }
}

export default App;
