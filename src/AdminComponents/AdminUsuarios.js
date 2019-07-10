import React, { Component } from 'react';
import AddUsuario from './AddUsuario';
import { Container, Header, Segment, Feed, Icon, Divider} from "semantic-ui-react";


export default class AdminUsuarios extends Component {
    constructor (props){
        super(props);
        this.state={
            usuarios: []
        }
        this.loadUsuarios()
    }

    loadUsuarios = () => {
        fetch('/api/users')
        .then (res => res.json())
        .then (data => this.setState({usuarios:data}))
    }
    render() {
        return (
                <Container fluid={true}>  
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
                            {usuario.name} es usuario(a) de EarnEat y {usuario.email} es el correo electrónico que utiliza en esta plataforma. 
                            <Feed.Meta>
                                <Icon name='trash' />
                                ¿Eliminar usuario?
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>)}
                </Feed>
                </Segment>
                <Segment raised >
                    <AddUsuario onAddUsuario={this.loadUsuarios}/>
                </Segment>
                </Container>
        )
    }
}
