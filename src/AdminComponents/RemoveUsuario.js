import React, { Component } from 'react';
import { Form, Segment, Container} from 'semantic-ui-react';

export default class RemoveUsuario extends Component {
    render() {
        return (
            <Segment 
            className="adminForms"
            inverted 
            tertiary>
            <Form inverted>
                <Form.Field>
                    <label>Correo Electrónico</label>
                    <Form.TextArea 
                        placeholder='Email' />
                </Form.Field>
                <Container textAlign="center">
                <Form.Button
                    inverted 
                    type="submit"
                    onClick={() => console.log('Remover premio')}>
                        Remover Usuario
                </Form.Button>
                </Container>
            </Form>
            </Segment>
        )
    }
}
