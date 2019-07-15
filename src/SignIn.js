import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Container, Header, Icon, Image } from 'semantic-ui-react';
import Logo from './ApeteatLogo.svg'

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "mari@hotmail.com",
            password: "123456",
            message: ""
        };
    }

    onLogin = () => {
        fetch('api/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {'Content-Type':'application/json' }
        })
        .then (r => {
            if (r.status === 200) r.json().then(this.props.onLoginSuccess);
            else this.onLoginError();
        })
        .catch (this.onLoginError)
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
{/* Container con el logo y el nombre de la aplicacion */}
                <Container textAlign='center'>
                    <h1>EarnEat by</h1>
                    <Image 
                        src={Logo} alt='apeteat logo' size='tiny' centered/>
                </Container> 
{/* Container con el Sign In Form */}
            <Container className='signInContainer'>
                <Header textAlign='center'>
                    <Icon name='users' size='massive'></Icon>
                </Header>
            <Form size='large' fluid="fluid">
{/* input EMAIL */}
                <Form.Field required>
                    <Input 
                        value={this.state.email} 
                        onChange={e => this.setState({email:e.target.value})} 
                        icon='mail' iconPosition='left' type='email' placeholder='Correo Electrónico' 
                    />
                </Form.Field>
{/* input PASSWORD */}
                <Form.Field required>
                    <Input 
                        value={this.state.password} 
                        onChange={e => this.setState({password:e.target.value})} 
                        icon='lock' iconPosition='left' type='password' placeholder='Contraseña' 
                    />
                </Form.Field>
{/* CHECKBOX y RECUERDAME */}
                <Form.Field className='checkbox'>
                    <Checkbox label='Recuérdame'/> 
                    <a href='#'>¿Olvidaste tu contraseña?</a>
                </Form.Field>
{/* BOTON de Sign In */}
                <Container textAlign='center'>
                    <Button 
                        onClick={this.onLogin}
                        color='teal' 
                        circular={true} 
                        type='submit'
                        > Sign In 
                    </Button>
                    <p style={{ color: 'red', textAlign: 'center'}}>{this.state.message}</p>
                </Container>
            </Form>
            </Container>
            </div>
        )
    }
}
