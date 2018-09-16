import React, { Component } from 'react';
import { Menu, Button, Segment, Form, Grid} from 'semantic-ui-react';
import QuizeData from '../QuizeData';

class QuizList extends Component{
    constructor(props){
      super(props);
      this.state={
        quizes:QuizeData,
        search:''
      }
      this.show=this.show.bind(this)
    }
    show=id=>this.setState({show: true , no: id})
    render(){
      const { quizes } = this.state;
      const { level , setPage } = this.props;
      return <div className='QList'>
      <Menu attached='top'>
      <Menu.Menu position='right'>
          <div className='ui transparent icon input'>
            <Form.Input className='prompt' icon='search' type='text' placeholder='Search.....' onChange={(e)=>this.setState({search:e.target.value})}/>
        </div>
      </Menu.Menu>
      </Menu>
      <Segment attached='bottom'>
        <Grid padded>
          {((level!== undefined && quizes[level].quizes)||quizes)
          .map((q,id)=>{q.id = id;console.log(q);return q})
          .filter(q=> q.cname.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1)
          .map(q=>
          <Grid.Row key={q.cname+" "+q.id}>
            <Grid.Column>
            <Button fluid color='teal' onClick={()=>(level!== undefined)?setPage('quizInfo',level,q.id):setPage('level2',q.id)}>{q.cname.toUpperCase()}</Button>
            </Grid.Column>
          </Grid.Row>)}
         </Grid>
        {/* {show &&<Quizes show={true} quizes={quizes} no={no} click={this.show}/>} */}
        </Segment>
      </div>
    }
  }
  export default QuizList;