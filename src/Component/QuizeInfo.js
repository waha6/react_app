import QuizeData from '../QuizeData';
import { Menu, Button, Image, Segment, Form, Grid, Divider, Radio } from 'semantic-ui-react';
import React, { Component } from 'react';
class QuizeInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            show: props.show,
            no: props.no,
            time: props.time,
            x:null,
            result: localStorage['result'] && JSON.parse(localStorage['result'])
        }
        const {level,level2}= props;
        if(!this.state.show) this.startTimer(0, QuizeData[level].quizes[level2].times)
    }
    show=id=>this.setState({show: true , no: id});
    handleChange = (e, { value }) => this.setState({ value })
    startTimer = (m=1,n=0)=>{
        if(!m) m=n; else this.setState({time:m});
        let j = (n-(this.state.time||0))*60*1000;
        let countDownDate = new Date()-j;
        let x = setInterval(()=> {
            let distance = m-(new Date().getTime()- countDownDate)/(60*1000);
            this.setState({time:distance,clear:()=>clearInterval(x)})
            localStorage['time']=distance;
            if (distance < 0) {
                clearInterval(x);
                this.setState({time:0,clear:()=>clearInterval(x)})
            }}, 1000);
    }
    render(){
        console.log(this.state,this.props);
        const { show , no , time , result } = this.state;
        const {level,level2,setPage}= this.props;
        const { cname , questions, description, times , correct } = QuizeData[level].quizes[level2]
        return <div>
        {show && <div><h2>Course Name : {cname}</h2><br/>
        <h3>No of Questions : {questions.length}</h3>
        <h4>{description}</h4>
        {result&&result[level+'#'+level2]?<h3>Percentage: {result[level+'#'+level2]} %</h3>:<Button color='teal' onClick={
            ()=>{
                 this.setState({show:false});
                 this.startTimer(times);
                 localStorage['start']=false;
                 localStorage['no']=0;
                 localStorage['time']=times;
                 localStorage['level']=level;
                 localStorage['level2']=level2;
                 localStorage['score']=0;
                 setPage('quizInfo',level,level2)
                 }}>Start</Button>}
        </div>}
        {!show && <div style={{textAlign:'left'}}>
        <Form onSubmit={(e)=>{
            if(e.target.answer.value==questions[no].correct)
                localStorage['score']=+localStorage['score']+1;
            if((questions.length-1)!=no)
                {this.setState({no:no+1,value:''});
                localStorage['no']=no+1;}
                else {
                    const { users , user , level , level2 , score } = localStorage
                    let result = localStorage['result']&& JSON.parse(localStorage['result']);
                    localStorage.clear();
                    let per =(score/questions.length)*100;
                    result=JSON.stringify((result && (result[level+'#'+level2]=per) && result)||{ [level+'#'+level2]:per})
                    localStorage['user']=user;
                    localStorage['users']=users;
                    localStorage['result']=result;
                    this.state.clear();
                    setPage('quizInfo',level,level2);
                    this.setState({time:0,show:true,no:-1,result:JSON.parse(result)})
                }
        }}>
            <h4>Minutes : {Math.floor(time)+'m '+Math.round((time-Math.floor(time))*60)+'s'}</h4>
            <h2>Qno.{no+1} {questions[no].question}</h2>
            {questions[no].answers.map((q,i)=><Form.Field>
          <Radio
            label={q}
            name='answer'
            value={i}
            checked={this.state.value === i}
            onChange={this.handleChange}
            />
        </Form.Field>)}
        <Button type='submit'>{(questions.length-1)==no?'Submit':'Next'}</Button>
            </Form></div>
        }
        </div>
    }
}
export default QuizeInfo;