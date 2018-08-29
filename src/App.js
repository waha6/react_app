import React, { Component } from 'react';
import swal from 'sweetalert';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users:[{uname:'admin',upass:'admin'}],
      currentUser:null
    }
    this.logForm=this.logForm.bind(this)
    this.logOut=this.logOut.bind(this)
    this.login=this.login.bind(this)
  }
  logOut(){
    this.setState({
      currentUser:null
    })
  }
  logForm(){
    return <div className="form">
      <input type='text' id="uname" placeholder="username"/>
      <input type='password' id="upass" placeholder="password"/>
      < button onClick = {this.login} > login </button>
    </div>
  }
  login(){
    const uname=document.querySelector('#uname').value;
    const upass=document.querySelector('#upass').value;
    const u =this.state.users;
    for( let i in u){
    if(u[i].uname === uname && u[i].upass === upass) {return this.setState({currentUser:u[i]}); break;}else return swal('Invalid Login', "Please enter correct username and password.", "error");}
  }
  render() {
    const {currentUser} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {currentUser&&<h1>{currentUser.uname}</h1>}
          {currentUser&&<button className='Log button'onClick={this.logOut}>LogOut</button>}
        </header>
        {!currentUser&&this.logForm()}
        {currentUser&&<EmployeeList />}
        </div>
    );
  }
}
class EmployeeList extends Component{
  constructor(props){
    super(props);
    this.state={
      employees:[],
      search:'',
    update:null,
    show:false
    }
    this.show=this.show.bind(this)
  }
  show(emp,id){
    this.setState({show: true,update:id?{emp:emp,id:id}:null})
  }
  render(){
    const {update,show} = this.state;
    return <div className='EList'>
    {show&&<Addform p={this}/>}
    {!show&&<input type='text' style={{border:'1px solid darkgray',margin:'10px auto 20px',borderRadius:'20px',maxWidth:'400px'}} placeholder='Search.....' onChange={(e)=>this.setState({search:e.target.value})}/>}
    {!show&&this.state.employees.map((emp,id)=>{
      emp.id = id;
      return emp
    }
    ).filter(emp=> (emp.firstName+' '+emp.lastName).toLowerCase().indexOf(this.state.search.toLowerCase())!==-1).map(emp=><Employee e={emp} id={emp.firstName+'@'+emp.id} d={this}/>)}
    {!show&&<button className='Add button' onClick={this.show}>+</button>}
    </div>
  }
}
class Employee extends Component{
  render(){
    const s = this.props.e;
    return<div id={this.props.id} className='Employee'>
    <div className='fa'><h2>{s.firstName+" "+s.lastName}</h2>
    <h5>Salary : {s.salary}</h5></div>
    <div className='fa'><p>Email : {s.email}</p>
    <p>Date : {s.startDate.toDateString()}</p></div>
    <div className='fa'>
    <button onClick={()=>{let d =this.props.d;d.show(d.state.employees[this.props.id.split('@')[1]],this.props.id.split('@')[1])}}>Edit</button>
    <button onClick={()=>{let d =this.props.d;let employees = d.state.employees;employees.splice(this.props.id.split('@')[1],1);d.setState({employees})}}>Delete</button></div>
    </div>
  }
}
class Addform extends Component{
  constructor(props){
    super(props);
    this.add=this.add.bind(this)
    this.close=this.close.bind(this)
}
  add(e,u){
    let f = e.target
    if(f.fName.value==='' |
      f.lName.value==='' |
      f.salary.value=='' |
      f.email.value=='' |
      f.date.value=='') return swal('Invalid Add', "Please Must fill all fields", "error");
    let obj = {
      firstName: f.fName.value,
      lastName:f.lName.value,
      salary:f.salary.value,
      email:f.email.value,
      startDate:new Date(f.date.value)
    }
    let employees=this.props.p.state.employees
    if(!u){
    employees.push(obj);
    }
    else{
      employees[u.id]=obj
    }
    this.props.p.setState({employees});
    this.close()
  }
  close(){
    this.props.p.setState({show: false,update:null});
  }
  componentDidMount(){
    const {update} =this.props.p.state;
    if(update){
    let f=this.form;
    f.fName.value=update.emp.firstName;
    f.lName.value=update.emp.lastName;
    f.salary.value=update.emp.salary;
    f.email.value=update.emp.email;
    f.date.valueAsDate=update.emp.startDate
  }
  }
  render(){
    return <form className="form" ref={form=>{this.form = form}} onSubmit = {(e)=> {this.add(e,this.props.p.state.update);e.preventDefault()}}>
    <h2 style={{marginBottom:'20px'}}>Adding Form</h2>
    <div className='fa'>
    <label>FirstName</label>
    <input type='text' ref='myInput' name="fName" placeholder="First Name"/></div>
    <div className='fa'>
    <label>lastName</label>
    <input type='text' name="lName" placeholder="Last Name"/></div>
    <div className='fa'>
    <label>salary</label>
    <input type='number' name="salary" placeholder="Salary"/></div>
    <div className='fa'>
    <label>Email</label>
    <input type='email' name="email" placeholder="Email"/></div>
    <div className='fa'>
    <label>Date</label>
    <input type='date' name="date"/></div>
    <div className='fa'>
    <button type='submit'> Add </button>
    <button onClick={this.close}> Cancel </button>
    </div>
  </form>
  }
}
export default App;