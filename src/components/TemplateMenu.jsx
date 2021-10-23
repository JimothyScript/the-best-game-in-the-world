import React from 'react';
import './TemplateMenu.css';

const TEMPLATE_OPTIONS = [
  'Replicator',
  'Spaceship',
  'Glider',
  'Oscillator',
  'Beacon',
  'Exploder',
  'Combo',
];

export default function TemplateMenu ({ generateTemplate, onDragStart }) {
  return (
    <div className="templatesmenu">
      <h2>Template Menu</h2>
      <p>
        Click to place randomly on the board or drag it!
        (grab it by the top left corner for best results)
      </p>

      <div className="templatemenu__options">
        { TEMPLATE_OPTIONS.map((option, i) => {
            return (
              <div className="templatemenu__option" key={i} onClick={(e) => generateTemplate(e)}>
                <p className="templatemenu__title">{option}</p>
                <img
                  className="templatemenu__img"
                  draggable
                  onDragStart={(e) => onDragStart(e)}
                  src={`images/rules/${option.toLowerCase()}.png`}
                  alt={option.toLowerCase()}/>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}
