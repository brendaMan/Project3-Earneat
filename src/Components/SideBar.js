import React, { Component } from 'react';
import Puntos from './Puntos';
import Premios from './Premios';
import MiArea from './MiArea';
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom'
import { Menu, Container, Card, Image, Segment, Grid, Button} from 'semantic-ui-react';

export default class SideBar extends Component {
    render() {
        return (
            <Container>
                {/* top menu */}
                <Menu fluid horizontal attached='top'>
                    <Menu.Item header name='Earn Eat' widths={3}/>
                    <Menu.Item position='right'> 
                        <Button>Log Out</Button>
                    </Menu.Item>    
                </Menu>
                {/* top menu finished... next, grid for sidebar and page */}
            <Grid>
                <Grid.Column stretched width={5}>
                <Menu fluid vertical position='center'>
                <Menu.Item> 
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
                 <Menu.Item as={Link} to={route}>Puntos</Menu.Item>
                <Menu.Item as={Link} to={route}>Premios</Menu.Item> 
                <Menu.Item as={Link} to={route}>Mi Area</Menu.Item> 
                </BrowserRouter>
            </Menu>
            </Grid.Column>
            <Grid.Column stretched width={11}>
                <Segment>
                    <Switch>
                        <Route exact path="/" component={Puntos} />
                        <Route path="/premios" component={Premios} />
                        <Route path="/miarea" component={MiArea} />
                    </Switch> 
                </Segment>
                

            </Grid.Column>
            </Grid>
            </Container>
        )
    }
}
