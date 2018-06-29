import React from 'react';

const Cell = ({row, r, populateCell, onDragDrop}) => {
  function onDragEnterOver(e){
    e.preventDefault();
  }
  return (
    row.map((column, j) => {
      return <div
        key={j}
        className="cell-column"
        data-row={r}
        data-cell={j}
        onClick={(e) => populateCell(e)}
        onDragOver={(e) => onDragEnterOver(e)}
        onDrop={(e) => onDragDrop(e, 'complete')}>
        {column && <img className="netscape-navigator" src="images/netscape.ico" data-row={r} data-cell={j} alt="netscape navigator logo"/>}
      </div>
    })
  );
}

export default Cell;
