import React from 'react';
import './Menu.css';

const Menu = ({handleClick, turnNumber, start, pause, compare}) => {
  const options = ['randomize', 'start', 'pause', 'resume', 'reset', 'compare lock'];

  // 'pause' and 'resume' will be locked initially
  if (start) {
    options[2] = 'pause lock';
    options[3] = 'resume lock';
  } else {
    options[1] = 'start lock';
    options[0] = 'randomize lock';
    if (pause) {
      options[3] = 'resume lock';
    } else {
      options[2] = 'pause lock';
      options[3] = 'resume';
      options[5] = 'compare';
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
