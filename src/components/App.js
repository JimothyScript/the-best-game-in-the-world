import React, { Component } from 'react';
// Will import 2 components: Menu and Board
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialArray: this.initializeGame()
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
    // Won't allow more than 25% to be populated
    let maxRandomNum = (rowLength * cellLength) / 4;
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
  render() {
    console.log(this.state.initialArray);
    return (
      <div className="App">
        <button onClick={() => this.initializeGame()}>Click</button>
      </div>
    );
  }
}

export default App;
