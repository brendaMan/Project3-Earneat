import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Container, Header, Icon, Image } from 'semantic-ui-react';
import Logo from './ApeteatLogo.svg'

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    onLogin = () => {
        fetch('api/login', {
            method: 'POST',
            data: this.state
        })
        .then (this.onLoginSuccess)
        .catch (this.onLoginError)
    }

    onLoginSuccess = () => {
        console.log('onLoginSuccess')
    }

    onLoginError = () => {
        console.log('onLoginError')
    }

    validateForm() {
        return this.state.email.lenght > 0 && this.state.password.lenght > 0
    }


    render() {
        return (
            <div className='signInDiv'>
                <Container textAlign='center'>
                    <h1>EarnEat by</h1>
                    <Image 
                        src={Logo} 
                        alt='apeteat logo' 
                        size='tiny' 
                        centered/>
                </Container> 
            <Container className='signInContainer'>
                <Header textAlign='center'>
                    <Icon name='users' size='massive'></Icon>
                </Header>
            <Form size='large' fluid>
                <Form.Field required>
                    <Input icon='mail' iconPosition='left' type='email' placeholder='Correo Electrónico' />
                </Form.Field>
                <Form.Field required>
                    <Input icon='lock' iconPosition='left' type='password' placeholder='Contraseña' />
                </Form.Field>
                <Form.Field className='checkbox'>
                    <Checkbox label='Recuérdame'/> 
                    <a href='#'>¿Olvidaste tu contraseña?</a>
                </Form.Field>
                <Container textAlign='center'>
                    <Button color='teal' circular='true' onClick={this.onLogin} type='submit'>Sign In</Button>
                </Container>
            </Form>
            </Container>
            
            </div>
            
        )
    }
}
