import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Container, Header, Icon, Image } from 'semantic-ui-react';
import Logo from './ApeteatLogo.svg'

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            message: ""
        };
    }

    onLogin = () => {
        fetch('api/login', {
            method: 'POST',
            body: JSON.stringify(this.state)
        })
        .then (r => {
            if (r.status === 200) this.onLoginSuccess();
            else this.onLoginError();
        })
        .catch (this.onLoginError)
    }

    onLoginSuccess = (r) => {
        console.log('onLoginSuccess');
        this.props.onLoginSuccess();
    }

    onLoginError = () => {
        console.log('onLoginError')
        this.setState({
            message: 'There is a problem logging in, please try again.'
        })
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
                        src={Logo} alt='apeteat logo' size='tiny' centered/>
                </Container> 
            <Container className='signInContainer'>
                <Header textAlign='center'>
                    <Icon name='users' size='massive'></Icon>
                </Header>
                <p style={{ color: 'red'}}>{this.state.message}</p>
            <Form size='large' fluid="fluid">
                <Form.Field required>
                    <Input 
                        value={this.state.email} 
                        onChange={e => this.setState({email:e.target.value})} 
                        icon='mail' iconPosition='left' type='email' placeholder='Correo Electrónico' />
                </Form.Field>
                <Form.Field required>
                    <Input 
                        value={this.state.password} 
                        onChange={e => this.setState({password:e.target.value})} 
                        icon='lock' iconPosition='left' type='password' placeholder='Contraseña' />
                </Form.Field>
                <Form.Field className='checkbox'>
                    <Checkbox label='Recuérdame'/> 
                    <a href='#'>¿Olvidaste tu contraseña?</a>
                </Form.Field>
                <Container textAlign='center'>
                    <Button 
                        onClick={this.onLogin}
                        color='teal' circular={true} type='submit'>Sign In
                    </Button>
                </Container>
            </Form>
            </Container>
            
            </div>
            
        )
    }
}
