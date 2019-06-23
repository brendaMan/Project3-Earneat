import React, { Component } from 'react';
import Puntos from './Puntos';
import Premios from './Premios';
import MiArea from './MiArea';
import TopNavBar from './TopNavBar';
import MiTarjeta from './MiTarjeta';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom'
import { Menu, Container, Card, Image, Segment, Grid, Button, Sidebar, Header, Icon } from 'semantic-ui-react';

export default class SideBar extends Component {

    state = {
        animation: 'slideout',
        direction: 'left',
        dimmed: false,
        visible: true,
      } 


    render() {
        const { animation, dimmed, direction, visible } = this.state
        const vertical = direction === 'bottom' || direction === 'top'
        return (
            <div>
                {/* <Sidebar.Pushable 
                as={Segment}
                >
                <Sidebar as={Menu} animation={animation} direction={direction} icon='labeled' inverted vertical visible={visible} width='thin'>   
                <Menu.Item fluid vertical position='center'>
                <MiTarjeta/>
                </Menu.Item>
                
    <Menu.Item as={Link} to='/puntos'>
      <Icon name='exchange' />
      Puntos
    </Menu.Item>
    <Menu.Item as={Link} to='/premios'>
      <Icon name='trophy' />
      Premios
    </Menu.Item>
    <Menu.Item as={Link} to='/miarea'>
      <Icon name='id badge outline' />
      Mi Area 
    </Menu.Item>
    </Sidebar>
    </Sidebar.Pushable> */}
    {/* <Sidebar.Pusher>
        <Switch>
            <Route path="/puntos" component={Puntos} />
            <Route path="/premios" component={Premios} />
            <Route path="/miarea" component={MiArea} />
        </Switch> 
    </Sidebar.Pusher> */}
  



            <Sidebar.Pushable as={Menu}  inverted vertical width='thin' visible={visible}>
                <Menu.Item fluid vertical position='center'>
                    <Card raised fluid>
                        <Image src='https://i.postimg.cc/QtXQ5c08/Hi.png' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>Mari</Card.Header>
                        <Card.Meta>Web Developer</Card.Meta>
                        </Card.Content>
                        <Card.Content extra>Puntos Adquiridos</Card.Content>
                    </Card>
                </Menu.Item>
                <BrowserRouter>
                <Menu.Item as={Link} to={Puntos}>Puntos</Menu.Item>
                <Menu.Item as={Link} to={Premios}>Premios</Menu.Item> 
                <Menu.Item as={Link} to={MiArea}>Mi Area</Menu.Item> 
                
                    <Sidebar.Pusher>
                    <Switch>
                        <Route exact path="/" component={Puntos} />
                        <Route path="/premios" component={Premios} />
                        <Route path="/miarea" component={MiArea} />
                    </Switch>  
                    
                    </Sidebar.Pusher>
                    </BrowserRouter>
                    </Sidebar.Pushable>
                
                
                </div>
        )
    }
}
