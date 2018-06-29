import React from 'react';
import './Menu.css';

const Menu = ({handleClick, generateTemplate, onDragStart, turnNumber, start, pause, compare, cellCount}) => {
  const options = ['randomize', 'start', 'pause', 'resume', 'reset', 'compare'];
  const examples = ['Replicator', 'Spaceship', 'Glider'];

  // 'pause' and 'resume' will be locked initially
  if (start) {
    if (cellCount <= 0) {
      options[1] = 'start lock';
    }
    options[2] = 'pause lock';
    options[3] = 'resume lock';
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
      <h2>Templates</h2>
      <div className="tips">{
        examples.map((el, i) => {
          return(
            <div key={i} onClick={(e) => generateTemplate(e)}>
              <p>{el}</p>
              <img
                draggable
                onDragStart={(e) => onDragStart(e)}
                src={`images/rules/${el.toLowerCase()}.png`}
                alt={el}/>
            </div>
          )
        })
      }</div>
    </div>
  );
}

export default Menu;
