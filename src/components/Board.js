import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  render() {
    console.log(this.props.grid);
    return (
      <div className="board-box">
        <div className="cell-row">
          <div className="cell-column">1</div>
          <div className="cell-column">2</div>
          <div className="cell-column">3</div>
        </div>
        <div className="cell-row">
          <div className="cell-column">4</div>
          <div className="cell-column">5</div>
          <div className="cell-column">6</div>
        </div>
        <div className="cell-row">
          <div className="cell-column">7</div>
          <div className="cell-column">8</div>
          <div className="cell-column">9</div>
        </div>
      </div>
    );
  }
}

export default Board;
