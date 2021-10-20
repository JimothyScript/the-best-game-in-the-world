import React, { Component } from 'react';

import Board from './Board/Board';
import Menu from './Menu/Menu';
import Templates from './Templates/Templates';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // FIXME: grid should clear at some point?
    this.state = {
      grid: [this.initializeGame({rowLen: 50, colLen: 50}, false)],
      turnNumber: 0,
      start: true,
      pause: false,
      compare: false,
      cells: false,
      cellCount: 0,
      dragItem: null
    }

    this.size = { rowLen: 50, colLen: 50 }
    this.turnSpeed = 80
    // TODO: migrate to external file
    this.replicator = [[null,null,1,1,1],[null,1,null,null,1],[1,null,null,null,1],[1,null,null,1,null],[1,1,1,null,null]];
    this.spaceship = [[null,1,1,1,1],[1,null,null,null,1],[null,null,null,null,1],[1,null,null,1,null]];
    this.glider = [[null,null,1],[1,null,1],[null,1,1]];
    this.oscillator = [[1],[1],[1]];
    this.beacon = [[null,null,1,1],[null,null,1,1],[1,1,null,null],[1,1,null,null]];
    this.exploder = [[null,1,null],[1,1,1],[1,null,1],[null,1,null]];
    this.combo = [[null,1,1,1,1],[1,null,null,null,1],[null,1,null,null,1],[1,1,null,1,null],[null,1,null,null,null]];
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
          if (random && (populate === 1 && maxRandomNum > 0)) {
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
  generateTemplate(e, gridRow, gridCell) {
    const { grid, start, cellCount, dragItem } = this.state
    if (!start) return;
    const templateGrid = grid[0];
    let count = cellCount;
    let attr, row, cell, arr;

    if (!e) {
      row = parseInt(gridRow, 10);
      cell = parseInt(gridCell, 10);
      attr = dragItem;
    } else {
      attr = e.target.getAttribute('alt');
    }

    // Should probably move this out somewhere else...
    switch(attr) {
      case 'Replicator':
        arr = this.replicator;
        break;
      case 'Spaceship':
        arr = this.spaceship;
        break;
      case 'Glider':
        arr = this.glider;
        break;
      case 'Oscillator':
        arr = this.oscillator;
        break;
      case 'Beacon':
        arr = this.beacon;
        break;
      case 'Exploder':
        arr = this.exploder;
        break;
      case 'Combo':
        arr = this.combo;
        break;
      default:
        arr = [[null]];
        break;
    }

    // row and cell adjuster for "edge" cases:
    if (!e) {
      if ((row + arr.length) > (templateGrid.length - 1)) {
        row -= (row + arr.length) - (templateGrid.length);
      }
      if ((cell + arr[0].length) > (templateGrid.length - 1)) {
        cell -= (cell + arr[0].length) - (templateGrid.length);
      }
    } else {
      row = Math.floor((Math.random() * 100) % 45);
      cell = Math.floor((Math.random() * 100) % 45);
    }

    for (let i = 0; i < arr.length; i++) {
      let startCell = cell;
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j]) {
          templateGrid[row][startCell] = 1;
          count++;
        }
        startCell++;
      }
      row++;
    }

    this.setState({
      grid: [templateGrid],
      cellCount: count
    });
  }
  populateCell(e) {
    const { grid, start, cellCount } = this.state;
    if (!start) return;

    const row = e.target.getAttribute('data-row');
    const col = e.target.getAttribute('data-cell');
    const populateGrid = grid[0];
    let cellNum = cellCount;
    // console.log(row, col); // Uncomment to see selected row and col

    if (!populateGrid[row][col]) {
      populateGrid[row][col] = 1;
      cellNum++;
    } else {
      populateGrid[row][col] = null;
      cellNum--;
    }

    this.setState({
      grid: [populateGrid],
      cells: true,
      cellCount: cellNum
    });
  }
  handleClick(e) {
    const { start, pause, compare, cellCount } = this.state;
    const buttonClicked = e.target.innerText;

    switch(buttonClicked) {
      case 'RANDOMIZE':
        if (!start) return;
        const randomGrid = this.initializeGame(this.size, true);
        // console.log('*RANDOM*');

        this.setState({
          grid: [randomGrid],
          cells: true,
          cellCount: 625
        });

        break;
      case 'START':
        if (cellCount <= 0) return;
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

        // Will call on gameLoop with current state after toggling pause
        this.gameLoop();

        this.setState({
          pause: !pause,
          compare: false
        });

        break;
      case 'RESET':
        if (cellCount <= 0) return;
        if (!start) clearInterval(this.intervalLoop);
        const newGrid = this.initializeGame(this.size, false);
        // console.log('*RESET*');

        this.setState({
          grid: [newGrid],
          turnNumber: 0,
          start: true,
          pause: false,
          compare: false,
          cells: false,
          cellCount: 0
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
  brain(row, col, arr) {
    let grid;

    if (arr === undefined) {
      grid = this.state.grid[this.state.grid.length - 1];
    } else {
      grid = arr;
    }

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
  onDragStart(e) {
    const dragItem = e.target.getAttribute('alt');
    this.setState({ dragItem });
  }
  onDragDrop(e) {
    e.preventDefault(); // Needed in FireFox
    const row = e.target.getAttribute('data-row');
    const cell = e.target.getAttribute('data-cell');
    // console.log(row, cell);
    this.generateTemplate(null, row, cell);
  }
  render() {
    const { grid, turnNumber, start, pause, compare, cellCount } = this.state;
    const currentGrid = grid.length - 1;
    // Selects previous grid if compare is true:
    const num = compare ? turnNumber - 1 : turnNumber;
    const latestTurn = compare ? currentGrid - 1 : currentGrid;

    return (
      <div className="App">
        <div className="template-container">
          <Templates
            generateTemplate={(e) => this.generateTemplate(e)}
            onDragStart={(e) => this.onDragStart(e)} />
        </div>
        <div className="board-container">
          <Board
            grid={grid[latestTurn]}
            populateCell={(row, col) => this.populateCell(row, col)}
            onDragDrop={(e) => this.onDragDrop(e)} />
          <footer>
            <span>
              <a href="https://github.com/JamesScript7/the-best-game-in-the-world" target="_blank" rel="noopener noreferrer">
                Link to GitHub!
              </a>
            </span>
            <small>&copy;2018 James Kim</small>
          </footer>
        </div>
        <div className="menu-container">
          <Menu
            handleClick={(e) => this.handleClick(e)}
            turnNumber={num}
            start={start}
            pause={pause}
            compare={compare}
            cellCount={cellCount} />
        </div>
      </div>
    );
  }
}

export default App;
