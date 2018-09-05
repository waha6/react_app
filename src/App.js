import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      bulb:['onblub','offblub','brokeblub'],
      no:0
    }

  }
  changeBlub = ()=>{
    let {no} = this.state;
    no= no+1>2? 0 : no+1;
    this.setState({no});
  }
  render() {
    return (
     <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Blub blubs={this.state.bulb} no={this.state.no} click={this.changeBlub}/>
        </div>
    );
  }
}
class Blub extends Component {
  constructor(props){
    super(props);
    this.state = {
      src:['https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzAwMi83NTkvb3JpZ2luYWwvMDgxMjA5LWxpZ2h0LWJ1bGItMDIuanBn',
      'https://www.industrytap.com/wp-content/uploads/2016/02/incandescent-e1456179151174.jpg',
      'https://media.istockphoto.com/vectors/brokendown-light-bulb-vector-id164446736']
    }
  }
  render() {
    const {src} = this.state;
    const {no,blubs,click} = this.props;
    return (
      <div>
      <img src={src[no]} width="300px"/><br/>
      <button onClick={click}>{blubs[no+1>2?0:no+1]}</button>
      </div>
    );
  }
}
export default App;