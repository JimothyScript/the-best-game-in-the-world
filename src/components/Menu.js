import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
  render() {
    return (
      <div className="menu-box">
        <h1>TURN 0</h1>
        <div className="menu-btns">
          <button
            className="start"
            onClick={(e) => this.props.menuHandler(e)}>
            START
          </button>
          <button
            className="pause"
            onClick={(e) => this.props.menuHandler(e)}>
            PAUSE
          </button>
          <button
            className="resume"
            onClick={(e) => this.props.menuHandler(e)}>
            RESUME
          </button>
          <button
            className="reset"
            onClick={(e) => this.props.menuHandler(e)}>
            RESET
          </button>
        </div>
      </div>
    );
  }
}

export default Menu;
