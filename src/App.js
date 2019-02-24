import React, { Component } from 'react';
import Weather from './components/Weather';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="text-center">Weather Forecast</h1>
        <Weather />
      </div>
    );
  }
}

export default App;
