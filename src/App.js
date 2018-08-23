import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      check:false,
      text:"Hello World"
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>ASSIGNMENT # 2</h1>
        <h1>Task # 1</h1>
        <div className='post'>
         <h2>{this.state.text}</h2>
         <button onClick={()=>this.setState({
      check:!this.state.check,
      text:this.state.check?"Hello World":"Hello Pakistan"
    })}>Click me</button>
        </div>
        </div>
    );
  }
}
export default App;