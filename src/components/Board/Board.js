import React from 'react';
// Components
import Cell from './Cell';
import './Board.css';

const Board = ({grid}) => {
  return (
    <div className="board-box">{
      grid.map((row, i) => {
        return <div key={i} className="cell-row">{
          <Cell row={row} />
        }</div>
      })
    }</div>
  );
};

export default Board;
