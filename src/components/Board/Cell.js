import React from 'react';

const Cell = ({row, r, populateCell}) => {
  return (
    row.map((column, j) => {
      return <div key={j} className="cell-column" data-row={r} data-cell={j} onClick={(e) => populateCell(e)}>
        {column && <img className="netscape-navigator" src="images/netscape.ico" alt="netscape navigator logo"/>}
      </div>
    })
  );
}

export default Cell;
