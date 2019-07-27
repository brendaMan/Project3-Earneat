import React, { Component } from 'react';
import { Form, Segment, Container, Header, Divider} from 'semantic-ui-react';


export default class UsuarioForm extends Component {
    constructor(props){
        super(props);
        this.state={
            id: 0, 
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            admin: 0,
            activo: "",
            message: ""
        }
    }
    onCrearUsuario = () => {
        fetch ('/api/usuarios', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {'Content-Type':'application/json'}
        })
        .then (res =>{
                if (res.status === 200) {
                    this.onClear()
                    this.props.onLoadUsuarios() 
                }   
                else this.onError();
        })
        .catch ((err) => {
            console.log("ERROR: ", err)
            this.onError()
        })
    }

    onEditarUsuario = () => {
        fetch (`/api/usuarios/${this.state.id}`, {
            method: "PATCH",
            body: JSON.stringify(this.state),
            headers: {'Content-Type':'application/json'} 
        }) 
            .then (res => {
                if (res.status === 200) {
                    debugger
                    this.onClear();
                    this.props.onLoadUsuarios();
                }
                else this.onError();
        })
            .catch (() => {
                this.onError()
            })
    }

    // componentWillReceiveProps = (newProps) => {
    //     this.setState({
    //         id: newProps.usuario.id,
    //         nombre: newProps.usuario.nombre,
    //         apellido: newProps.usuario.apellido, 
    //         imagen: newProps.usuario.imagen,
    //         descripcion: newProps.usuario.descripcion,
    //         activo: newProps.usuasrio.activo
    //     })
    // }

    onError = () => {
        this.setState({
            message: 'Hay un error por lo que no se ha podido crear este nuevo usuario.'
        })
    }

    onClear = () => {
        this.setState({
            id: 0,
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            activo: ""
        });
    }
    
    render() {
        return (
            <Segment className="adminForms" inverted tertiary>
                {/* <Header as='h3' textAlign='center'>
                    Dar de Alta a Nuevos Usuarios
                </Header>
                <Divider/> */}
            <Form inverted>
                <Form.Field>
{/* Input Nombre */}
                    <label>Nombre</label>
                    <Form.Input 
                        value= {this.state.nombre}
                        onChange= {e => this.setState({nombre: e.target.value})}
                        placeholder='First Name' />
                </Form.Field>
{/* Input Apellido */}
                <Form.Field>
                    <label>Apellido(s)</label>
                    <Form.Input 
                        value= {this.state.apellido}
                        onChange= {e => this.setState({apellido: e.target.value})}
                        placeholder='Last Name' />
                </Form.Field>
{/* Input Email */}
                <Form.Field>
                    <label>Correo Electrónico</label>
                    <Form.Input 
                        value= {this.state.email}
                        onChange= {e => this.setState({email: e.target.value})}
                        placeholder='Email' />
                </Form.Field>
{/* Input Contraseña */}
                <Form.Field>
                    <label >Contraseña</label>
                    <Form.Input 
                        value= {this.state.password}
                        onChange= {e => this.setState({password: e.target.value})}
                        placeholder='Password' />
                </Form.Field>
{/* ¿Admin? */}
                <Form.Checkbox toggle
                    value= {this.state.admin}
                    onChange= {e => this.setState({admin: (this.state.admin === 0 ? 1 : 0)})}
                    label='¿Es administrador?'/>
{/* Buttons para crear o editar premios */}
                <Container textAlign="center">
                {this.state.id === 0 ? 
                    <Form.Button inverted circular type="submit" 
                        onClick={this.onCrearUsuario}
                        > Guardar </Form.Button>
                :
                <Form.Button inverted circular type="submit" 
                        onClick={this.onEditarUsuario}
                        > Guardar </Form.Button>
                }
                </Container>
                <h4 style={{ color: 'red', textAlign: 'center'}}>{this.state.message}</h4>
            </Form>
            </Segment>
        )
    }
}
