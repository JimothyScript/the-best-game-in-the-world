import React from 'react';

const Cell = ({row}) => {
  return (
    row.map((column, j) => {
      return <div key={j} className="cell-column">
        {column && <img className="netscape-navigator" src="images/netscape.ico" alt="netscape navigator logo"/>}
      </div>
    })
  );
}

export default Cell;
