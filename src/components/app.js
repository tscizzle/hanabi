import React, { Component } from 'react';

import { ActiveBoard, NewGameButton } from '../containers/containers';


class App extends Component {
  render() {
    return (
      <div className="app">
        <ActiveBoard />
        <NewGameButton>
          New Game
        </NewGameButton>
      </div>
    );
  }
}


export default App;
