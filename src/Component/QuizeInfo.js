// new Date(d-30*60*1000)
import { Menu, Button, Image, Segment, Form, Grid, Divider, Radio } from 'semantic-ui-react';
import React, { Component } from 'react';
class QuizeInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            show: props.show  || true,
            no:props.no,
            time:0
        }
    }
    show=id=>this.setState({show: true , no: id});
    handleChange = (e, { value }) => this.setState({ value })
    startTimer = (m=1)=>{
        let countDownDate = new Date(new Date()-m*60*1000);
        let x = setInterval(()=> {
            let now = new Date().getTime();
            let distance = (countDownDate - now)/(60*1000);
            this.setState({
                time:distance
            })
            if (distance < 0) {
                clearInterval(x);
                this.setState({
                    time:0
                })
            }
        }, 1000);
    }
    render(){
        const { show , no , time} = this.state
        const { cname , questions, description, times , correct } = this.props.quizes
        return <div>
        {show && <div><h2>Course Name : {cname}</h2><br/>
        <h3>No of Questions : {questions.length}</h3>
        <h4>{description}</h4>
        <Button color='teal' onClick={()=>{ this.setState({show:false});this.startTimer(times)}}>Start</Button>
        </div>}
        {!show && <div style={{textAlign:'left'}}><Form onSubmit={(e)=>{
            console.log(e.target.answer.value);
            this.setState({no:no+1})
        }}>
            <h4>minutes:{time}</h4>
            <h2>Qno.{no} {questions[no].question}</h2>
            {questions[no].answers.map((q,i)=><Form.Field>
          <Radio
            label={q}
            name='answer'
            value={q}
            checked={this.state.value === q}
            onChange={this.handleChange}
            />
        </Form.Field>)}
        <Button type='submit'>Next</Button>
            </Form></div>
        }
        </div>
    }
}
export default QuizeInfo;