import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  render() {
    return (
      <div className="board-box">
        {
          this.props.grid.map((row, i) => {
            return <div key={i} className="cell-row">
              {
                row.map((column, j) => {
                  return <div key={j} className="cell-column">
                    {column ? <img className="netscape-navigator" src="images/netscape.ico" alt="netscape navigator logo"/> : column}
                  </div>
                })
              }
            </div>
          })
        }
      </div>
    );
  }
}

export default Board;
