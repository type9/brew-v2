import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello, React! Rendered through Flask! Token = {window.token}</h1>
      </div>
    )
  }
}

export default App;
