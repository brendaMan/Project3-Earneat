import React, { Component } from 'react';
import UsuarioForm from './UsuarioForm';
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
        console.log('id utilizado en el delete usuario:', id)
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
{/* Usuario Form */}
                <Segment raised >
                    <UsuarioForm onLoadUsuario={this.loadUsuarios}/>
                </Segment> 
{/* Listado Usuarios */}
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
                                {usuario.nombre} {usuario.apillido} es usuario de EarnEat. El correo electrónico que utiliza en esta plataforma es {usuario.email}. 
                                <Button floated='right' animated circular inverted color='black'
                                    onClick={()=> this.onDeleteUsuario(usuario.id)}
                                >
                                    <Button.Content hidden>Delete</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='trash' inverted color='black' />
                                    </Button.Content>
                                </Button>
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>)}
                </Feed>
                </Segment>
            </Container>
        )
    }
}
