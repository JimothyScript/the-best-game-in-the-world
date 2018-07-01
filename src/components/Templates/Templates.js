import React from 'react';
import './Templates.css';

const Templates = ({generateTemplate, onDragStart}) => {
  const examples = ['Replicator', 'Spaceship', 'Glider', 'Oscillator', 'Beacon', 'Exploder', 'Combo'];

  return (
    <div className="templates-box">
      <h2>Templates</h2>
      <p>Click to place randomly on the board or drag it! (grab it by the top left corner for best results)</p>
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
  )
}

export default Templates;
