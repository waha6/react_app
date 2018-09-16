//Assests
import image from './Assests/images/QuizBackground.png';
import QuizeData from './QuizeData';
//Component
import React, { Component } from 'react';
<<<<<<< HEAD
import swal from 'sweetalert';
import QuizList from './Component/QuizList';
import QuizeInfo from './Component/QuizeInfo';
import LogForm from './Component/LogForm';
import Header from './Component/Header';
import { Menu, Button, Image, Segment, Form } from 'semantic-ui-react';
//Css
import 'semantic-ui-css/semantic.min.css';
=======
import logo from './logo.svg';
>>>>>>> e9053cb6d5208ea649cf8b71888b1471061171fd
import './App.css';
//Main Component
class App extends Component {
<<<<<<< HEAD
  constructor(props){
    super(props);
    // let u = localStorage['users'] && JSON.parse(localStorage['users']);
    // u=u || [];
    this.state = {
      users:(localStorage['users'] && JSON.parse(localStorage['users']))||[],
      currentUser:localStorage['user']&&JSON.parse(localStorage['user']),
      pageInfo: sessionStorage['page']|| localStorage['user']?'level1':'',
      level:sessionStorage['level'] ||-1,
      level2:sessionStorage['level2'] ||-1
    }
  }
  logOut=()=>{
    this.setState({
      currentUser:null
    })
    localStorage.removeItem('user');
  }
  logIn=(e,type)=>{
    const { uname , upass } = document.querySelector('#login');
    const u =this.state.users;
    const t = uname.value;
    const p = upass.value;
    if(!type){
    for( let i in u){
      if(u[i].uname === t && u[i].upass === p){
        localStorage['user']=JSON.stringify(u[i])
        this.setPage('level1');
        return this.setState({currentUser:u[i]});
      }
    }
    } else {
      if(t===''||p==='')
      return swal('Invalid Login', "Please enter correct username and password.", "error");
      else{
        let j = {uname:t,upass:p};
        let uu = localStorage['users'] && JSON.parse(localStorage['users']);
        if(!(uu &&uu.push(j) )) uu=[j];
        localStorage['users'] = JSON.stringify(uu);
        uu.concat(this.state.users);
        this.setPage('level1');
        localStorage['user'] = JSON.stringify(j);
        return this.setState({currentUser:j,users:uu});
      }
    }
    return swal('Invalid Login', "Please enter correct username and password.", "error");
  }
  setPage=(pg,level=-1,level2=-1)=>{
    sessionStorage['page']=pg;
    sessionStorage['level']=level;
    sessionStorage['level2']=level2;
    this.setState({
      pageInfo:pg,
      level:level
    })
  }
  render() {
    const {currentUser , pageInfo , level , level2 } = this.state;
    return (
      <div className="App">
        { currentUser && <Header name={currentUser.uname.toUpperCase()} logout={this.logOut} setPage={this.setPage}/>}
        { !currentUser && <LogForm onClick={this.logIn}/> }
        { currentUser && <div>
          { pageInfo==='level1' && <QuizList setPage={this.setPage} />}
          { pageInfo==='level2' && <QuizList level={level} setPage={this.setPage} />}
          { pageInfo==='quizInfo' && <QuizeInfo show={true} no={0} quizes={QuizeData[level].quizes[level2]}/>}
          </div> }
=======
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
>>>>>>> e9053cb6d5208ea649cf8b71888b1471061171fd
        </div>
    );
  }
}
<<<<<<< HEAD

=======
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
>>>>>>> e9053cb6d5208ea649cf8b71888b1471061171fd
export default App;