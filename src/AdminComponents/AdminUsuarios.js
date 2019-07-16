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
        fetch(`/api/usuarios/${id}`, {
            method: 'DELETE'
            // headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify({data})
        })
        .then(res => {
            console.log('Deleted:', res.message)
            return res
          })
    }

    render() {
        return (
                <Container 
                    fluid={true}
                    className='containerAll' 
                >  
                <Header as='h2' id='headerContainer' block>
                  Administrar Usuarios
                </Header> 
                <Segment raised >
                <Feed>
                <Header as='h3'>Listado de Usuarios</Header>
                 <Divider/>
                    {this.state.usuarios.map(usuario => 
                    <Feed.Event>
                        <Feed.Label>
                            <Icon name='user' size='massive' />
                        </Feed.Label>
                        <Feed.Content>
                            {usuario.nombre} es usuario de EarnEat y {usuario.email} es el correo electrónico que utiliza en esta plataforma. 
                            <Feed.Meta>
                                <Button 
                                    animated
                                    circular
                                    basic color='teal'
                                    onClick={this.onDeleteUsuario}
                                >
                                    <Button.Content hidden>Delete</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='trash' />
                                    </Button.Content>
                                </Button>
                            </Feed.Meta>
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
