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
    const rowLength = 50;
    const cellLength = 50;
    const rowArr = [];

    // Lowest usually in the range of high 500 (23%) and
    // maxRandomNum won't allow more than 750 (30%) to be populated.
    let maxRandomNum = Math.floor((rowLength * cellLength) / 3.33);
    let populate;

    for (let row = 0; row < rowLength; row++) {
      const cellArr = [];
      for (let cell = 0; cell < cellLength; cell++) {
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
      rowArr.push(cellArr);
    }

    return rowArr;
  }
  menuHandler(e) {
    const buttonClicked = e.target.innerText;

    // Find out which button was clicked.
    switch(buttonClicked) {
      case 'START':
        // Will always start with the initial game state
        if (this.state.start) this.gameLoop(this.state.turnNumber);
        break;
      case 'PAUSE':
        // Pass only when RESUME was clicked
        if (this.state.start || !this.state.pause) return;
        console.log('*PAUSE*');
        // Will clearInterval and keep current state
        this.setState({
          pause: !this.state.pause
        });
        break;
      case 'RESUME':
        // Pass only when PAUSE was clicked
        if (this.state.start || this.state.pause) return;
        console.log('*RESUME*');
        // Will call on gameLoop with current state
        this.setState({
          pause: !this.state.pause
        });
        break;
      case 'RESET':
        const newGrid = this.initializeGame();
        // Needs to clearInterval of the gameLoop
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
  gameLoop(currentTurn) {
    const self = this;

    console.log('Game Start!', 'Current Turn is: ' + currentTurn);

    setInterval(function() {
      self.ruleSet('ok');
    }, 1000);

    this.setState({
      turnNumber: this.state.turnNumber + 1,
      start: !this.state.start,
      pause: !this.state.pause
    });

    // At the end of the loop:
    // 1. update this.state.grid with evaluated grid
    // 2. update this.state.turn by incremented value
    // 3. continue indefinitely until PAUSE, RESUME, or RESET intervenes
  }
  ruleSet(x) {
    console.log('running...', x);
  }
  render() {
    const latestTurn = this.state.grid.length - 1;

    return (
      <div className="App">
        <div className="menu-container">
          <Menu
            menuHandler={(e) => this.menuHandler(e)}
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
