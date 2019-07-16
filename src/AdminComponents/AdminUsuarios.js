import React, { Component } from 'react';
import AddUsuarioForm from './AddUsuarioForm';
import { Container, Header, Segment, Feed, Icon, Divider, Button} from "semantic-ui-react";


export default class AdminUsuarios extends Component {
    constructor (props){
        super(props);
        this.state={
            usuarios: []
        }
        this.loadUsuarios()
    }

    loadUsuarios = () => {
        fetch('/api/usuarios')
        .then (res => res.json())
        .then (data => this.setState({usuarios:data}))
    }

    onDeleteUsuario = (id) => {
        console.log('id front', id)
        fetch(`/api/usuarios/${id}`, {
            method: 'DELETE'
        })
        .then (res => res.json()) 
        .then (data => this.loadUsuarios())
    }

    render() {
        return (
            <Container fluid={true} className='containerAll'>  
                <Header as='h2' block inverted>
                    Administrar Usuarios
                </Header> 
            <Segment raised >
                <Feed>
                    <Header textAlign='center' as='h3'>
                        Listado de Usuarios
                    </Header>
                <Divider/>
                    {this.state.usuarios.map(usuario => 
                    <Feed.Event>
                        <Feed.Label>
                            <Icon name='user' size='massive' />
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>
                                {usuario.nombre} es usuario de EarnEat y {usuario.email} es el correo electrónico que utiliza en esta plataforma. 
                                <Button 
                                    floated='right'
                                    animated
                                    circular
                                    onClick={()=> this.onDeleteUsuario(usuario.id)}
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
                    <AddUsuarioForm onAddUsuario={this.loadUsuarios}/>
                </Segment>
            </Container>
        )
    }
}
