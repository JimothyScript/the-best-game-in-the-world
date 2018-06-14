import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
  render() {
    return (
      <div>
        <h1>Menu</h1>
        <div>
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
