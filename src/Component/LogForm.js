import React, { Component } from 'react';
import { Button, Icon, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import logo from '../logo.svg';

  class LogForm extends Component{
    constructor(props){
      super(props);
      this.state={
        log:true
      }
    }
    render(){
    const {onClick} = this.props;
    const { log } = this.state;
    return <div className="login-form">
    <style>{`body > div,body > div > div,body > div > div > div.login-form {height: 100%;}`}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={logo} />QUIZA {log&&'LOGIN'||'SIGNUP'}
          </Header>
          <Form size='large' id='login'>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name='uname' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='upass'
              />
              <Button animated onClick={(e)=>{onClick(e,!log)}} color="teal">
                <Button.Content visible>{log&&'LOGIN'||'SIGNUP'}</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button> 
            </Form>
            <Message>
              New to us? <Button color='teal' onClick={()=>this.setState({log:!log})}>{log&&'Sign Up'||'Login'}</Button>
            </Message>
        </Grid.Column>
      </Grid>
    </div>
}
}
export default LogForm;