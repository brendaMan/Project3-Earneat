import React, { Component } from 'react';
import UsuarioForm from './UsuarioForm';
import { Container, Header, Segment, Feed, Icon, Divider, Button, Checkbox, Popup} from "semantic-ui-react";


export default class AdminUsuarios extends Component {
    constructor (props){
        super(props);
        this.state={
            usuarios: [],
            usuarioAEditar: {},
        }
        this.loadUsuarios()
        this.onEditar()
    }

    loadUsuarios = () => {
        fetch('/api/usuarios')
        .then (res => res.json())
        .then (data => this.setState({ usuarios:data, usuarioAEditar: {} }) )
    }

    onEditar = (usuario) => {
        this.setState({ usuarioAEditar: usuario })
    }

    onDesactivarUsuario = (usuario) => {
        fetch(`/api/usuario/${usuario.id}`, {
           method: 'PATCH',
           body: JSON.stringify({ activo: usuario.activo ? 0 : 1 }),
           headers: {'Content-Type':'application/json'}
        })
        .then (res => res.json())
        .then (data => this.loadUsuarios())
    }

    // onDeleteUsuario = (id) => {
    //     fetch(`/api/usuarios/${id}`, {
    //         method: 'DELETE'
    //     })
    //     .then (res => res.json()) 
    //     .then (data => this.loadUsuarios())
    // }

    render() {
        const usuarios= this.state.usuarios.filter(u => u.activo === 1)
        const usuarios_inactivos= this.state.usuarios.filter(u => u.activo === 0)
        return (
            <Container fluid={true} className='containerAll'>  
                <Header as='h2' block inverted>
                    Administrar Usuarios
                </Header>
{/* --------------------------------- Formulario Usuarios -------------------------------------- */}
                <Segment raised >
                    <UsuarioForm onLoadUsuario={this.loadUsuarios}/>
                </Segment> 
{/* --------------- Listado de usuarios donde se pueden activar/desactivar y editar ------------- */}
            <Segment raised >
                <Feed>
                    <Header textAlign='center' as='h3'>
                        Listado de Usuarios
                    </Header>
                <Divider/>
{/* ------------------------------------- Usuarios Activos ------------------------------------- */}
                    {usuarios.map(usuario => 
                    <Feed.Event>
                        <Feed.Label>
{/* Botton editar usuario */}
                            <Button animated circular inverted color='blue'
                                onClick={ () => this.onEditar(usuario) } >
                                <Button.Content hidden>Editar</Button.Content>
                                <Button.Content visible><Icon name='user' color='black'/></Button.Content>
                            </Button>
                        </Feed.Label>
{/* Info usuario */}
                        <Feed.Content>
                            <Feed.Summary className='spaceBetween'>
                            <span className='listadoPremio1'>{usuario.nombre} {usuario.apellido} es usuario de EarnEat. El correo electrónico que utiliza en esta plataforma es: {usuario.email}.</span> 
{/* Toggle Activo/noActivo */}
                                <Popup 
                                    trigger={<Checkbox toggle
                                                color='grey'
                                                value= {usuario.activo}
                                                checked={usuario.activo}
                                                onChange= {() => this.onDesactivarUsuario(usuario)}
                                            />}
                                    content='"Toggle" a la derecha para desactivar usuario y a la izquierda para activarlo nuevamente. Toma unos 3 segundos en ejecutarse la acción.'
                                    basic inverted
                                />
{/* Button para borrar usuarios */}
                                {/* <Button floated='right' animated circular inverted color='black'
                                    onClick={()=> this.onDeleteUsuario(usuario.id)}
                                >
                                    <Button.Content hidden>Delete</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='trash' inverted color='black' />
                                    </Button.Content>
                                </Button> */}
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>)}
{/* ------------------------------------ Usuarios Inactivos ------------------------------------ */}
                    {usuarios_inactivos.map(usuario => 
                    <Feed.Event>
                        <Feed.Label>
{/* Botton editar usuario */}
                            <Button animated circular inverted color='grey'
                                onClick={ () => this.onEditar(usuario) } >
                                <Button.Content hidden>Editar</Button.Content>
                                <Button.Content visible><Icon name='user' color='black'/></Button.Content>
                            </Button>
                        </Feed.Label>
{/* Info usuario */}
                        <Feed.Content>
                            <Feed.Summary className='spaceBetween'>
                            <span className='listadoPremio1Inactivo'>{usuario.nombre} {usuario.apellido} es usuario de EarnEat. El correo electrónico que utiliza en esta plataforma es: {usuario.email}.</span> 
{/* Toggle Activo/noActivo */}
                                <Popup 
                                    trigger={<Checkbox toggle
                                                color='grey'
                                                value= {usuario.activo}
                                                checked={usuario.activo}
                                                onChange= {() => this.onDesactivarUsuario(usuario)}
                                            />}
                                    content='"Toggle" a la derecha para desactivar usuario y a la izquierda para activarlo nuevamente. Toma unos 3 segundos en ejecutarse la acción.'
                                    basic inverted
                                />
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>)}
                </Feed>
                </Segment>
            </Container>
        )
    }
}
