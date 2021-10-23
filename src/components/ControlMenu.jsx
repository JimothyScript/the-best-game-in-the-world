import React from 'react';
import './ControlMenu.css';

export default function ControlMenu ({ handleClick, turnCount, start, pause, cellCount }) {
  const CONTROL_OPTIONS = [
    'randomize',
    'start',
    'pause',
    'resume',
    'reset',
    'compare',
  ];

  // NOTE: 'pause' and 'resume' will be locked initially
  if (start) {
    if (cellCount <= 0) {
      CONTROL_OPTIONS[1] = 'start lock';
    }

    CONTROL_OPTIONS[2] = 'pause lock';
    CONTROL_OPTIONS[3] = 'resume lock';
    CONTROL_OPTIONS[5] = 'compare lock';
  } else {
    CONTROL_OPTIONS[1] = 'start lock';
    CONTROL_OPTIONS[0] = 'randomize lock';

    if (pause) {
      CONTROL_OPTIONS[3] = 'resume lock';
      CONTROL_OPTIONS[5] = 'compare lock';
    } else {
      CONTROL_OPTIONS[2] = 'pause lock';
      CONTROL_OPTIONS[3] = 'resume';
      CONTROL_OPTIONS[5] = 'compare';
    }
  }

  return (
    <div className="controlmenu">
      <h1>
        TURN {turnCount}
      </h1>
      <div className="controlmenu__buttonwrap">
        { CONTROL_OPTIONS.map((option, i) => {
            return (
              <button
                className={option}
                key={i}
                onClick={(e) => handleClick(e)}>
                {option.split(' ')[0].toUpperCase()}
              </button>
            );
          })
        }
      </div>
    </div>
  );
}
