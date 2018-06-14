import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
  render() {
    return (
      <div className="menu-box">
        <h1>TURN 1</h1>
        <div className="menu-btns">
          <button>START</button>
          <button>PAUSE</button>
          <button>RESUME</button>
          <button>RESET</button>
        </div>
      </div>
    );
  }
}

export default Menu;
