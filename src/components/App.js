import React, { Component } from 'react';
// Will import 2 components: Menu and Board
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialArray: []
    }
  }
  generateNum() {
    return Math.round(Math.random() * 4);
  }
  componentDidMount() {
    // Basically the Game Initializer
    // Populate approximately 25%, which is around 625, out of 2,500 cells programmatically
    const rowArr = [];
    let cellArr = [];
    const rowLength = 50;
    const cellLength = 50;
    // Won't allow more than 25% to be populated
    let maxRandomNum = (rowLength * cellLength) / 4;

    for (let row = 0; row < rowLength; row++) {
      for (let cell = 0; cell < cellLength; cell++) {
        const populate = this.generateNum();
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

    console.log(rowArr);
  }
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
