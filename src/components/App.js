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
      turn: 0
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
    // Find out which button was clicked.
    const buttonClicked = e.target.className;
    switch(buttonClicked) {
      case 'start':
        console.log('Start');
        break;
      case 'pause':
        console.log('Pause');
        break;
      case 'resume':
        console.log('Resume');
        break;
      case 'reset':
        const newGrid = this.initializeGame();
        this.setState({
          grid: newGrid,
          turn: 0
        });
        break;
      default:
        console.log('Something went wrong!');
    }
  }
  render() {
    return (
      <div className="App">
        <div className="menu-container">
          <Menu
            menuHandler={(e) => this.menuHandler(e)}
            turn={this.state.turn}
          />
        </div>
        <div className="board-container">
          <Board grid={this.state.grid} />
        </div>
      </div>
    );
  }
}

export default App;
