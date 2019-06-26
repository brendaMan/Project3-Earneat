import React, { Component } from 'react';
import { Form, Segment, Container} from 'semantic-ui-react';

export default class RemovePremio extends Component {
    render() {
        return (
            <Segment 
            className="adminForms"
            inverted 
            tertiary>
            <Form inverted>
                <Form.Field>
                    <label>Premio</label>
                    <Form.TextArea 
                        placeholder='Prize' />
                </Form.Field>
                <Container textAlign="center">
                <Form.Button
                    inverted 
                    type="submit"
                    onClick={() => console.log('Remover premio')}>
                        Remover Premio
                </Form.Button>
                </Container>
            </Form>
            </Segment>
        )
    }
}
