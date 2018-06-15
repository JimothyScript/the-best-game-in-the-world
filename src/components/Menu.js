import React from 'react';
import './Menu.css';

const Menu = ({menuHandler, turn}) => {
  const buttonNames = ['start', 'pause', 'resume', 'reset'];

  return (
    <div className="menu-box">
      <h1>TURN {turn}</h1>
      <div className="menu-btns">{
        buttonNames.map((btn, i) => {
          return <button key={i} className={btn} onClick={(e) => menuHandler(e)}>{btn.toUpperCase()}</button>
        })
      }</div>
    </div>
  );
}

export default Menu;
