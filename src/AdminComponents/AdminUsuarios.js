import React, { Component } from 'react';
import UsuarioForm from './UsuarioForm';
import { Container, Header, Segment, Feed, Icon, Divider, Checkbox, Popup} from "semantic-ui-react";


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
        .then (data => this.setState({ usuarios:data }) )
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
                    <UsuarioForm onLoadUsuarios={this.loadUsuarios}/>
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
{/* Info usuario */}
                        <Feed.Label>
                            <Icon name='user' circular color='blue'/>
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>
                                <span className='listadoUsuario'>{usuario.nombre} {usuario.apellido}</span>
                            </Feed.Summary>
                            <Feed.Extra  className='spaceBetween'>
                                <span className='listadoUsuarioExtra'> Correo electrónico: {usuario.email}.</span> 
{/* Toggle Activo/noActivo */}
                                <Popup 
                                    trigger={<Checkbox toggle
                                                value= {usuario.activo}
                                                checked={usuario.activo}
                                                onChange= {() => this.onDesactivarUsuario(usuario)}
                                            />}
                                    content='"Toggle" a la izquierda para desactivar usuario.'
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
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>)}
{/* ------------------------------------ Usuarios Inactivos ------------------------------------ */}
                    {usuarios_inactivos.map(usuario => 
                    <Feed.Event>
{/* Info usuario */}
                        <Feed.Label>
                            <Icon name='user' circular color='grey'/>
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>
                                <span className='listadoUsuario Inactivo'>{usuario.nombre} {usuario.apellido}</span>
                            </Feed.Summary>
                            <Feed.Extra  className='spaceBetween'>
                                <span className='listadoUsuarioExtra Inactivo'> Correo electrónico: {usuario.email}.</span> 
{/* Toggle Activo/noActivo */}
                                <Popup 
                                    trigger={<Checkbox toggle
                                                value= {usuario.activo}
                                                checked={usuario.activo}
                                                onChange= {() => this.onDesactivarUsuario(usuario)}
                                            />}
                                    content='"Toggle" a la derecha para activar usuario nuevamente.'
                                    basic inverted
                                />
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>)}
                </Feed>
                </Segment>
            </Container>
        )
    }
}
