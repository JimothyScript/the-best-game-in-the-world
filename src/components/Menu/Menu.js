import React from 'react';
import './Menu.css';

const Menu = ({handleClick, turnNumber, start, pause, compare, cellCount}) => {
  const options = ['randomize', 'start', 'pause', 'resume', 'reset', 'compare'];

  // 'pause' and 'resume' will be locked initially
  if (start) {
    if (cellCount <= 0) {
      options[1] = 'start lock';
    }
    options[2] = 'pause lock';
    options[3] = 'resume lock';
    options[4] = 'reset lock';
    options[5] = 'compare lock';
  } else {
    options[1] = 'start lock';
    options[0] = 'randomize lock';
    if (pause) {
      options[3] = 'resume lock';
      options[5] = 'compare lock';
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
      <div className="tips">
        <div>
          <p>Replicator</p>
          <img src="images/rules/replicator.png" alt="replicator"/>
        </div>
        <div>
          <p>Spaceship</p>
          <img src="images/rules/spaceship.png" alt="spaceship"/>
        </div>
        <div>
          <p>Glider</p>
          <img src="images/rules/glider.png" alt="glider"/>
        </div>
      </div>
    </div>
  );
}

export default Menu;
