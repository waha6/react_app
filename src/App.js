//Assests
import image from './Assests/images/QuizBackground.png';
import QuizeData from './QuizeData';
//Component
import React, { Component } from 'react';
import swal from 'sweetalert';
import QuizList from './Component/QuizList';
import QuizeInfo from './Component/QuizeInfo';
import LogForm from './Component/LogForm';
import Header from './Component/Header';
import { Menu, Button, Image, Segment, Form } from 'semantic-ui-react';
//Css
import 'semantic-ui-css/semantic.min.css';
import './App.css';
//Main Component
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users:(localStorage['users'] && JSON.parse(localStorage['users']))||[],
      currentUser:localStorage['user']&&JSON.parse(localStorage['user']),
      pageInfo: sessionStorage['page'] || 'level1',
      level:sessionStorage['level'] ||-1,
      level2:sessionStorage['level2'] ||-1
    }
    if(localStorage['start']) {this.state.pageInfo='quizInfo';this.state.level=localStorage['level'];this.state.level2=localStorage['level2']}
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
      level:level,
      level2:level2
    })
  }
  render() {
    const {currentUser , pageInfo , level , level2 } = this.state;
    return (
      <div className="App">
        { currentUser && <Header hide={localStorage['start']?true:false} name={currentUser.uname.toUpperCase()} logout={this.logOut} setPage={this.setPage}/>}
        { !currentUser && <LogForm onClick={this.logIn}/> }
        { currentUser && <div>
          { pageInfo==='level1' && <QuizList setPage={this.setPage} />}
          { pageInfo==='level2' && <QuizList level={level} setPage={this.setPage} />}
          { pageInfo==='quizInfo' && <QuizeInfo show={localStorage['start']? false: true} no={Number(localStorage['no']||0)} time={localStorage['time']||null} level={level} level2={level2} setPage={this.setPage}/>}
          </div> }
          </div>
      )
  }
}
export default App;