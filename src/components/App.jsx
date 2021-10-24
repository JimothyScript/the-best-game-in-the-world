import React, { Component } from 'react';

import Board from './Board/Board';
import ControlMenu from './ControlMenu';
import Footer from './Footer';
import TemplateMenu from './TemplateMenu';

import templates from '../helpers/templates';
import { brain } from '../helpers/utils';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // FIXME: grid should clear at some point?
    this.state = {
      grid: [this.initializeGame({rowLen: 50, colLen: 50}, false)],
      turnCount: 0,
      start: true,
      pause: false,
      compare: false,
      cells: false,
      cellCount: 0,
      dragItem: null,
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
          if (random && (populate === 1 && maxRandomNum > 0)) {
            // console.log('cells populated'); // Uncomment to quickly check
            cellArr.push(populate);
            maxRandomNum--;
          } else {
            cellArr.push(0);
          }
      }

      initialGrid.push(cellArr);
    }

    return initialGrid;
  }

  generateTemplate(e, gridRow, gridCell) {
    const { grid, start, cellCount, dragItem } = this.state;
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

    if (attr) {
      arr = templates[attr];
    } else {
      arr = [[0]];
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
      populateGrid[row][col] = 0;
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
          turnCount: 0,
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
          cellArr.push(brain(row, col, this.state.grid.at(-1)));
        }

        newGrid.push(cellArr); // push evaluated cells to newGrid
      }

      this.setState({
        grid: [...this.state.grid, newGrid],
        turnCount: this.state.turnCount + 1
      });

    }, this.turnSpeed);
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
    const { grid, turnCount, start, pause, compare, cellCount } = this.state;
    const currentGrid = grid.length - 1;
    // Selects previous grid if compare is true:
    const num = compare ? turnCount - 1 : turnCount;
    const latestTurn = compare ? currentGrid - 1 : currentGrid;

    return (
      <div className="App">
        <TemplateMenu
          generateTemplate={(e) => this.generateTemplate(e)}
          onDragStart={(e) => this.onDragStart(e)} />

        {/* TODO: fix Footer */}
        <Board
          grid={grid[latestTurn]}
          populateCell={(row, col) => this.populateCell(row, col)}
          onDragDrop={(e) => this.onDragDrop(e)}>
          <Footer />
        </Board>

        <ControlMenu
          handleClick={(e) => this.handleClick(e)}
          turnCount={num}
          start={start}
          pause={pause}
          cellCount={cellCount} />
      </div>
    );
  }
}

export default App;
