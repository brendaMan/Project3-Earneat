import React, { Component } from 'react';
import AddPremioForm from './AddPremioForm';
import { Container, Header, Segment, Feed, Icon, Divider } from "semantic-ui-react";


export default class AdminUsuarios extends Component {
    constructor (props){
        super(props);
        this.state={
            premios: []
        }
        this.loadPremios()
    }

    loadPremios = () => {
        fetch('/api/premios')
        .then (res => res.json())
        .then (data => this.setState({premios:data}))
    } 
    render() {
        return (
                <Container 
                    fluid={true}
                    className='containerAll' 
                >  
                <Header as='h2' id='headerContainer' block>
                  Administrar Premios
                </Header> 
                <Segment raised >
                <Feed>
                    <Header as='h3'>Listado de Premios</Header>
                    <Divider/>
                    {this.state.premios.map(premio => 
                        <Feed.Event>
                            <Feed.Label>
                                <Icon 
                                    color='teal'
                                    circular
                                    name='gift' 
                                    size='massive' 
                                />
                            </Feed.Label>
                            <Feed.Content>
                                {premio.nombre} cuesta {premio.puntos} puntos.
                                <br/>
                                Los detalles del premio son: {premio.descripcion}
                                <Feed.Meta>
                                    <Icon name='trash' />
                                    ¿Eliminar premio?
                                </Feed.Meta>
                            </Feed.Content>
                    </Feed.Event>)}
                </Feed>
                </Segment>
                <Segment raised >
                    <AddPremioForm/>
                </Segment>
                </Container>
        )
    }
}
