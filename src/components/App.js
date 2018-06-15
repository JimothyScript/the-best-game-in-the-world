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
  handleClick(e) {
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
        // Basically a clearInterval, does nothing to current state except toggle pause
        this.setState({
          pause: !this.state.pause
        });
        break;
      case 'RESUME':
        // Pass only when PAUSE was clicked
        if (this.state.start || this.state.pause) return;
        console.log('*RESUME*');
        // Will call on gameLoop with current state after toggling pause
        this.setState({
          pause: !this.state.pause
        });
        break;
      case 'RESET':
        const newGrid = this.initializeGame();
        // clearInterval of the gameLoop and set all 4 states back to initial state
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
    console.log('Game Start!', 'Current Turn is: ' + currentTurn);
    // const self = this;
    // setInterval(function() {
    //   self.ruleSet('ok');
    // }, 1000);

    this.setState({
      turnNumber: this.state.turnNumber + 1,
      start: !this.state.start,
      pause: !this.state.pause
    });

    // What this loop needs to achieve:
    // 1. update this.state.grid with evaluated grid => grid: [...this.state.grid, newGrid]
    // 2. update this.state.turn by incremented value => turnNumber: this.state.turnNumber + 1
    // 3. continue indefinitely until PAUSE(clearInterval), RESUME(gameLoop), or RESET(clearInterval/setState()) intervenes
    // 4. this loop will only change start and pause state once!
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
