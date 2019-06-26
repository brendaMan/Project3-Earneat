import React, { Component } from 'react';
import { Form, Segment, Container} from 'semantic-ui-react';


const genero = [
    { key: 'h', text: 'Hombre', value: 'hombre' },
    { key: 'm', text: 'Mujer', value: 'mujer' },
    { key: 'o', text: 'Otro', value: 'otro' },
  ]
export default class AddUsuario extends Component {
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
                        placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>Apellido(s)</label>
                    <Form.Input 
                        placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <label>Genero</label>
                    <Form.Select 
                        placeholder='Gender'
                        options={genero} />
                </Form.Field>
                <Form.Field>
                    <label>Correo Electrónico</label>
                    <Form.Input 
                        placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label >Contraseña</label>
                    <Form.Input 
                        placeholder='Password' />
                </Form.Field>
                <Form.Checkbox 
                    label='Es Admimnistrador'/>
                <Container textAlign="center">
                <Form.Button
                    inverted 
                    type="submit"
                    onClick={() => console.log('Creacion de usuario')}>
                        Crear usuario
                </Form.Button>
                </Container>
            </Form>
            </Segment>
        )
    }
}
