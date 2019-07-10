import React, { Component } from 'react';
import AddPremio from './AddPremio';
import { Container, Header, Segment, Feed, Icon } from "semantic-ui-react";


export default class AdminUsuarios extends Component {
    render() {
        return (
                <Container fluid={true}>  
                <Header as='h2' id='headerContainer' block>
                  Administrar Premios
                </Header> 
                <Segment raised >
                <Feed>
                    <Feed.Event>
                        <Feed.Label>
                            <Icon name='gift' size='massive' />
                        </Feed.Label>
                        <Feed.Content>
                            Nombre premios y descripcion 
                            <Feed.Meta>
                                <Icon name='trash' />
                                ¿Eliminar premio?
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
                </Segment>
                <Segment raised >
                    <AddPremio/>
                </Segment>
                </Container>
        )
    }
}
