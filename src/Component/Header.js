//Assests
import logo from '../logo.svg';
import { Menu, Button, Image, Divider} from 'semantic-ui-react';
import React from 'react';

function Header(props){
    return <Menu inverted borderless size='massive' attached='top'>
    <Menu.Item><Image src={logo} size='mini'/></Menu.Item>
    <Menu.Item name='QUIZA'/>
    <Menu.Menu position='right'>
      <Menu.Item
        name={props.name}
      />
    </Menu.Menu>
    {/* <Menu.Item position='right'>
    </Menu.Item> */}
    <Menu.Item position='right'>
    <Button
        color='teal'
        content='Home'
        onClick={()=>props.setPage('level1')}
      />
      <pre> </pre>
      <Button
        color='teal'
        content='LogOut'
        onClick={props.logout}
      />
    </Menu.Item>
    </Menu>
  }
  export default Header;