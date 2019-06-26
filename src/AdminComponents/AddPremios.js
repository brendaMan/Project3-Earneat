import React, { Component } from 'react';
import { Form, Segment, Container} from 'semantic-ui-react';

export default class AddPremios extends Component {
    render() {
        return (
            <Segment 
            className="adminForms"
            inverted 
            tertiary>
        <Form inverted>
            <Form.Field>
                <label>Premio</label>
                <Form.Input 
                    placeholder='Prize' />
            </Form.Field>
            <Form.Field>
                <label>Puntos</label>
                <Form.Input 
                    type="number"
                    placeholder='Points' />
            </Form.Field>
            <Form.Field>
                <label>URL de la Imagen</label>
                <Form.Input 
                    placeholder='Image URL' />
            </Form.Field>
            <Form.Field>
                <label>Detalles</label>
                <Form.TextArea 
                    placeholder='Details' />
            </Form.Field>
            <Container textAlign="center">
            <Form.Button
                inverted 
                type="submit"
                onClick={() => console.log('Creacion de nuevo premio')}>
                    Crear Premio
            </Form.Button>
            </Container>
        </Form>
        </Segment>
        )
    }
}
