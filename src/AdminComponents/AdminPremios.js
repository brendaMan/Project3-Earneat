import React, { Component } from 'react';
import AddPremioForm from './AddPremioForm';
import { Container, Header, Segment, Feed, Icon, Divider, Button } from "semantic-ui-react";


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
            <Container fluid={true} className='containerAll'>  
                <Header inverted as='h2' block>
                    Administrar Premios
                </Header> 
            <Segment raised >
                <Feed>
                    <Header as='h3' textAlign='center'>
                        Listado de Premios
                    </Header>
                <Divider/>
                    {this.state.premios.map(premio => 
                        <Feed.Event>
                            <Feed.Label>
                                <Icon circular name='gift' size='massive'/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary>
                                    {premio.nombre} cuesta {premio.puntos} puntos.
                                    <br/>
                                    Los detalles del premio son: {premio.descripcion}
                                    <Button 
                                        floated='right'
                                        animated
                                        circular
                                        // onClick={()=> this.onDeletePremio(premio.id)}
                                    >
                                        <Button.Content hidden>Delete</Button.Content>
                                        <Button.Content visible>
                                            <Icon name='trash' />
                                        </Button.Content>
                                    </Button>
                                </Feed.Summary>
                            </Feed.Content>
                    </Feed.Event>)}
                </Feed>
                </Segment>
                <Segment raised >
                    <AddPremioForm 
                    // onAddUsuario={this.loadUsuarios}
                    />
                </Segment>
            </Container>
        )
    }
}
