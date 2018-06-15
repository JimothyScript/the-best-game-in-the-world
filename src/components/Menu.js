import React from 'react';
import './Menu.css';

const Menu = ({menuHandler, turnNumber, start}) => {
  const buttonNames = ['start', 'pause', 'resume', 'reset'];

  // 'pause' and 'resume' will be gray initially
  if (start) {
  }

  return (
    <div className="menu-box">
      <h1>TURN {turnNumber}</h1>
      <div className="menu-btns">{
        buttonNames.map((btn, i) => {
          return <button
            key={i}
            className={btn}
            onClick={(e) => menuHandler(e)}>
            {btn.toUpperCase()}
          </button>
        })
      }</div>
    </div>
  );
}

export default Menu;
