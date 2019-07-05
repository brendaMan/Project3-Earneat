import React, { Component } from 'react';
import AddUsuario from './AddUsuario';
import { Container, Header, Segment, Feed, Icon } from "semantic-ui-react";


export default class AdminUsuarios extends Component {
    render() {
        return (
                <Container fluid={true}>  
                <Header as='h2' id='headerContainer' block>
                  Administrar Usuarios
                </Header> 
                <Segment raised >
                <Feed>
                    <Feed.Event>
                        <Feed.Label>
                            <Icon name='user' size='massive' />
                        </Feed.Label>
                        <Feed.Content>
                            Nombre Apellido 
                            <Feed.Meta>
                                <Icon name='trash' />
                                ¿Eliminar usuario?
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
                </Segment>
                <Segment raised >
                    <AddUsuario/>
                </Segment>
                </Container>
        )
    }
}
