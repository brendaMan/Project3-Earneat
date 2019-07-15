import React, { Component } from 'react';
import { Form, Segment, Container} from 'semantic-ui-react';


export default class AddUsuarioForm extends Component {
    constructor(props){
        super(props);
        this.state={
            nombre: "",
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
                if (res.status === 200) 
                    this.setState({message: `Se a creado una cuenta de usuario para ${this.state.nombre}.`});
                else this.onErrorAddingUser();
        })
        .catch ((err) => {
            console.log("ERROR: ", err)
            this.onErrorAddingUser()
        })
    }
    
   

    onErrorAddingUser = () => {
        this.setState({
            message: 'Hay un error por lo que no se ha podido crear este nuevo usuario.'
        })
    }
    
    render() {
        return (
            <Segment 
                className="adminForms"
                inverted 
                tertiary>
            <Form inverted>
                <Form.Field>
                    <label>Nombre</label>
                    <Form.Input 
                        value= {this.state.nombre}
                        onChange= {e => this.setState({nombre:e.target.value})}
                        placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>Apellido(s)</label>
                    <Form.Input 
                        placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <label>Correo Electrónico</label>
                    <Form.Input 
                        value= {this.state.email}
                        onChange= {e => this.setState({email:e.target.value})}
                        placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label >Contraseña</label>
                    <Form.Input 
                        value= {this.state.password}
                        onChange= {e => this.setState({password:e.target.value})}
                        placeholder='Password' />
                </Form.Field>
                <Form.Checkbox toggle
                    value= {this.state.admin}
                    onChange= {e => this.setState({admin: (this.state.admin === 0 ? 1 : 0)})}
                    label='¿Es administrador?'/>
                <Container textAlign="center">
                <Form.Button
                    inverted 
                    type="submit"
                    onClick={this.onCrearUsuario}>
                    Crear usuario
                </Form.Button>
                {this.state.message}
                </Container>
            </Form>
            </Segment>
        )
    }
}
