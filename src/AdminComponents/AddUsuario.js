import React, { Component } from 'react';
import { Form, Segment, Container} from 'semantic-ui-react';


export default class AddUsuario extends Component {
    constructor(props){
        super(props);
        this.state={
            name: "",
            email: "",
            password: "",
            admin: 0,
            message: ""
        }
    }
    onCrearUsuario = () =>{
        fetch ('/api/users', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {'Content-Type':'application/json'}
        })
        .then (res => res.json())
        .then (res =>{
                if (res.status === 200) this.onAddingUser();
                else this.onErrorAddingUser();
        })
        .catch (() => this.onErrorAddingUser())
    }
    
    onAddingUser = () => {
        this.setState({
            message: 'Usuario creado.'
        })
    }

    onErrorAddingUser = () => {
        this.setState({
            message: 'Hay un error por lo que no se ha podido crear este usuario.'
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
                        value= {this.state.name}
                        onChange= {e => this.setState({name:e.target.value})}
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
                    onChange= {e => this.setState(this.state.admin=0?0:1)}
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
