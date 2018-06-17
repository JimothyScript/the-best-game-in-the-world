import React from 'react';
import './Menu.css';

const Menu = ({handleClick, turnNumber, start, pause, compare}) => {
  const options = ['start', 'pause', 'resume', 'reset', 'compare lock'];

  // 'pause' and 'resume' will be locked initially
  if (start) {
    options[1] = 'pause lock';
    options[2] = 'resume lock';
  } else {
    options[0] = 'start lock';
    if (pause) {
      options[2] = 'resume lock';
    } else {
      options[1] = 'pause lock';
      options[2] = 'resume';
      options[4] = 'compare';
    }
  }

  return (
    <div className="menu-box">
      <h1>TURN {turnNumber}</h1>
      <div className="menu-btns">{
        options.map((item, i) => {
          return <button
            key={i}
            className={item}
            onClick={(e) => handleClick(e)}>
            {item.split(' ')[0].toUpperCase()}
          </button>
        })
      }</div>
    </div>
  );
}

export default Menu;
