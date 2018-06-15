import React from 'react';
import './Board.css';

const Board = ({grid}) => {
  return (
    <div className="board-box">
      {
        grid.map((row, i) => {
          return <div key={i} className="cell-row">
            {
              row.map((column, j) => {
                return <div key={j} className="cell-column">
                  {column && <img className="netscape-navigator" src="images/netscape.ico" alt="netscape navigator logo"/>}
                </div>
              })
            }
          </div>
        })
      }
    </div>
  );
};

export default Board;
