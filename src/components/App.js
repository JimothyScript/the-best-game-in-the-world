import React, { Component } from 'react';
// Components
import Menu from './Menu/Menu';
import Board from './Board/Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [this.initializeGame({rowLen: 50, colLen: 50}, false)],
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
  initializeGame(size, random) {
    // Populate approximately 25%, which is around 625, out of 2,500 cells
    const { rowLen, colLen } = size;
    const initialGrid = [];

    // Lowest usually in the range of high 500 (23%) and
    // maxRandomNum won't allow more than 677 (27%) to be populated.
    let maxRandomNum = Math.floor((rowLen * colLen) / 3.69);
    let populate;

    for (let row = 0; row < rowLen; row++) {
      const cellArr = [];

      for (let col = 0; col < colLen; col++) {
          populate = this.generateNum();
          if (random && populate === 1 && maxRandomNum > 0) {
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
    const { start, pause, compare } = this.state;
    const buttonClicked = e.target.innerText;

    switch(buttonClicked) {
      case 'RANDOMIZE':
        console.log('random clicked!');
        const randomGrid = this.initializeGame(this.size, true);

        this.setState({
          grid: [randomGrid]
        });
        break;
      case 'START':
        // Runs once and remains locked until RESET is clicked
        if (start) {
          this.gameLoop();

          this.setState({
            start: !start,
            pause: !pause
          });
        }

        break;
      case 'PAUSE':
        if (start || !pause) return;
        // console.log('*PAUSE*'); // Pass only when RESUME was clicked

        clearInterval(this.intervalLoop);
        // Does nothing to current state except toggle pause
        this.setState({ pause: !pause });

        break;
      case 'RESUME':
        if (start || pause) return;
        // console.log('*RESUME*'); // Pass only when PAUSE was clicked

        this.gameLoop();
        // Will call on gameLoop with current state after toggling pause
        this.setState({
          pause: !pause,
          compare: false
        });

        break;
      case 'RESET':
        if (start) return;
        clearInterval(this.intervalLoop);
        const newGrid = this.initializeGame(this.size, false);

        console.log('*RESET*');

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
        if (start || pause) return;

        this.setState({ compare: !compare });

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
    const grid = this.state.grid[this.state.grid.length - 1];
    let neighborCount = 0;
    let currentCell;

    for (let i = -1; i < 2; i++) {

      for (let j = -1; j < 2; j++) {
        if (grid[row + i] && grid[col + j]) {
          if (row + i === row && col + j === col) {
            currentCell = grid[row + i][col + j];
          } else {
            // console.log(`grid[${row + i}][${col + j}] = ${grid[row + i][col + j]}`);
            if (grid[row + i][col + j]) neighborCount++;
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
    const { grid, turnNumber, start, pause, compare } = this.state;
    const currentGrid = grid.length - 1;
    // Selects previous grid if compare is true:
    const num = compare ? turnNumber - 1 : turnNumber;
    const latestTurn = compare ? currentGrid - 1 : currentGrid;

    return (
      <div className="App">
        <div className="menu-container">
          <Menu
            handleClick={(e) => this.handleClick(e)}
            turnNumber={num}
            start={start}
            pause={pause}
            compare={compare} />
        </div>
        <div className="board-container">
          <Board grid={grid[latestTurn]} />
        </div>
      </div>
    );
  }
}

export default App;
