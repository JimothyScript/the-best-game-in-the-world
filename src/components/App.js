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
  generateNum() {
    return Math.ceil(Math.random() * 4);
  }
  initializeGame() {
    // Basically the Game Initializer
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
          // To see how many populated:
          // console.log('populated');
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

    // Find out which button was clicked.
    switch(buttonClicked) {
      case 'START':
        // Will always start with the initial game state
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
        console.log('*PAUSE*'); // Pass only when RESUME was clicked

        // Basically a clearInterval, does nothing to current state except toggle pause
        this.setState({ pause: !this.state.pause });
        break;
      case 'RESUME':
        if (this.state.start || this.state.pause) return;
        console.log('*RESUME*'); // Pass only when PAUSE was clicked

        // Will call on gameLoop with current state after toggling pause
        this.setState({ pause: !this.state.pause });
        break;
      case 'RESET':
        const newGrid = this.initializeGame();
        // clearInterval of the gameLoop and set ALL state back to initial state
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
    // What this loop needs to achieve:
    // 1. update this.state.grid with evaluated grid => grid: [...this.state.grid, newGrid]
    // 2. update this.state.turn by incremented value => turnNumber: this.state.turnNumber + 1
    // 3. continue indefinitely until PAUSE(clearInterval), RESUME(gameLoop), or RESET(clearInterval/setState()) intervenes
    // 4. this loop will only change start and pause state once!
    console.log('Game Start!', 'Current Turn is: ' + this.state.turnNumber);

    const rowLen = this.state.grid[0].length; // 50
    const colLen = this.state.grid[0][0].length; // 50
    // const newGrid = []; // The new evaluated grid:

    for (let row = 0; row < rowLen; row++) {
      // const cellArr = []; // filled with evaluated cells
      for (let col = 0; col < colLen; col++) {
        // const cell = this.state.grid[currentTurn][row][col];
        // Sends each cell into a function that checks neighbors:
        // ruleSet(cell);
      }
      // newGrid.push(cellArr); // push evaluated cells to newGrid
    }

    // Once loop is done newGrid will be ready to be pushed to the grid state array

    /* <--- Comment out this line to activate setState();
    this.setState({
      grid: [...this.state.grid, newGrid],
      turnNumber: this.state.turnNumber + 1
    });
    //*/

    // const self = this;
    // setInterval(function() {
    //   self.ruleSet('ok');
    // }, 1000);

  }
  ruleSet(x) {
    console.log('Algorithm Running...', x);
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
