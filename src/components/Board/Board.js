import React from 'react';
// Components
import Cell from './Cell';
import './Board.css';

const Board = ({grid, populateCell, onDragDrop}) => {
  return (
    // FIXME: isn't this more of row column not cell?
    <div className="board-box">{
      grid.map((row, i) => {
        return <div key={i} className="cell-row">{
            <Cell row={row} r={i} populateCell={populateCell} onDragDrop={onDragDrop} />
        }</div>
      })
    }</div>
  );
};

export default Board;
