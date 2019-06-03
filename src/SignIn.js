import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Container, Header, Icon } from 'semantic-ui-react';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.lenght > 0 && this.state.password.lenght > 0
    }


    render() {
        return (
            <div>
                {/* <Header>
                    EarnEat by <img src
                </Header> */}
            <Container className='signInContainer'>
                <Header textAlign='center'>
                    <Icon name='user' size='massive'></Icon>
                </Header>
            <Form>
                <Form.Field required>
                    <Input icon='mail' iconPosition='left' type='email' placeholder='Correo Electrónico' />
                </Form.Field>
                <Form.Field required>
                    <Input icon='lock' iconPosition='left' type='password' placeholder='Contraseña' />
                </Form.Field>
                <Form.Field>
                    <Checkbox floated='left' label='Recuérdame'/> 
                </Form.Field>
                    <Button className='signInButton' type='submit'>Sign In</Button>
            </Form>
            </Container>
            </div>
        )
    }
}
