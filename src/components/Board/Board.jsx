import React from 'react';

import Cell from './Cell';
import './Board.css';

const Board = ({ grid, populateCell, onDragDrop, children }) => {
  return (
    <div className="board-container">
      { grid.map((row, i) => {
        return <div key={i} className="cell-row">{
          <Cell row={row} r={i} populateCell={populateCell} onDragDrop={onDragDrop} />
        }</div>
      })}
      {children}
    </div>
  );
};

export default Board;
