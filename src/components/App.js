import React, { Component } from 'react';
// Components
import Menu from './Menu';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: this.initializeGame(),
      turnNumber: 0,
      start: true,
      pause: false
    }
  }
  generateNum() {
    return Math.round(Math.random() * 4);
  }
  initializeGame() {
    // Basically the Game Initializer
    // Populate approximately 25%, which is around 625, out of 2,500 cells programmatically
    const rowLength = 50;
    const cellLength = 50;
    const rowArr = [];
    let cellArr = [];

    // Usually in the range of high 500s and won't allow more than 750 (30%) to be populated.
    let maxRandomNum = Math.floor((rowLength * cellLength) / 3.33);
    let populate;

    for (let row = 0; row < rowLength; row++) {
      for (let cell = 0; cell < cellLength; cell++) {
        populate = this.generateNum();
        if (populate === 1 && maxRandomNum > 0) {
          cellArr.push(populate);
          maxRandomNum--;
        } else {
          cellArr.push(null);
        }
      }
      rowArr.push(cellArr);
      cellArr = [];
    }

    // this.setState({
    //   initialArray: [...this.state.initialArray, rowArr]
    // });
    return rowArr;
  }
  menuHandler(e) {
    const buttonClicked = e.target.innerText;

    // Find out which button was clicked.
    switch(buttonClicked) {
      case 'START':
        if (this.state.start) this.gameLoop(this.state.turnNumber);
        break;
      case 'PAUSE':
        console.log('PAUSE');
        break;
      case 'RESUME':
        console.log('RESUME');
        break;
      case 'RESET':
        const newGrid = this.initializeGame();

        this.setState({
          grid: newGrid,
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

    this.setState({
      start: !this.state.start,
      turnNumber: this.state.turnNumber + 1
    });
    // At the end of the loop:
    // 1. update this.state.grid with evaluated grid
    // 2. update this.state.turn by incremented value
    // 3. continue indefinitely until PAUSE, RESUME, or RESET intervenes
  }
  render() {
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
          <Board grid={this.state.grid} />
        </div>
      </div>
    );
  }
}

export default App;
