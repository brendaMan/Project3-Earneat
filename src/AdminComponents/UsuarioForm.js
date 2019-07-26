import React, { Component } from 'react';
import { Form, Segment, Container, Header, Divider} from 'semantic-ui-react';


export default class UsuarioForm extends Component {
    constructor(props){
        super(props);
        this.state={
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            admin: 0,
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
                    this.setState({
                        nombre: "",
                        apellido: "",
                        email: "",
                        password: ""
                    });
                    this.props.onLoadUsuarios() 
                }   
                else this.onError();
        })
        .catch ((err) => {
            console.log("ERROR: ", err)
            this.onError()
        })
    }

    onError = () => {
        this.setState({
            message: 'Hay un error por lo que no se ha podido crear este nuevo usuario.'
        })
    }
    
    render() {
        return (
            <Segment className="adminForms" inverted tertiary>
                <Header as='h3' textAlign='center'>
                    Dar de Alta a Nuevos Usuarios
                </Header>
                <Divider/>
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
{/* Admin? */}
                <Form.Checkbox toggle
                    value= {this.state.admin}
                    onChange= {e => this.setState({admin: (this.state.admin === 0 ? 1 : 0)})}
                    label='¿Es administrador?'/>
                <Container textAlign="center">
{/* Button */}
                <Form.Button
                    inverted 
                    type="submit"
                    onClick={this.onCrearUsuario}
                >
                    Crear usuario
                </Form.Button>
                {this.state.message}
                </Container> 
            </Form>
            </Segment>
        )
    }
}
