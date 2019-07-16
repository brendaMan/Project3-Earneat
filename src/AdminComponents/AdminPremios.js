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

    onDeletePremio = (id) => {
        console.log('id utilizado en el delete premio:', id)
        fetch(`/api/premios/${id}`, {
            method: 'DELETE'
        })
        .then (res => res.json()) 
        .then (data => this.loadPremios())
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
                                    <span className='listadoPremio1'>{premio.nombre} tiene un coste de {premio.puntos} puntos. </span>
                                    <br/>
                                    <span className='listadoPremio2'>Detalles adicionales: {premio.descripcion}</span>
                                    <Button floated='right' animated circular inverted color='black'
                                        onClick={()=> this.onDeletePremio(premio.id)}
                                    >
                                        <Button.Content hidden>Delete</Button.Content>
                                        <Button.Content visible>
                                            <Icon name='trash' inverted color='black'/>
                                        </Button.Content>
                                    </Button>
                                </Feed.Summary>
                            </Feed.Content>
                    </Feed.Event>)}
                </Feed>
                </Segment>
                <Segment raised >
                    <AddPremioForm onAddPremio={this.loadPremios}/>
                </Segment>
            </Container>
        )
    }
}
