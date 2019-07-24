import React, { Component } from 'react';
import { Button, Card, Container, Divider, Form, Grid, Header, Image, Segment} from 'semantic-ui-react';

export default class MiArea extends Component {
    constructor(props){
        super(props);
        this.state = {
            done: false,
            visible: false,
            user: props.user,
            premios_canjeados: [],
            hash: " ",
            password: "",
            new_password: "",
            old_password: "",
        }
        this.handleClick = this.handleClick.bind(this)


        fetch(`/api/usuarios/${this.props.user.id}/premios_canjeados`)
        .then(res=> res.json())
        .then(premios_canjeados=> this.setState({premios_canjeados: premios_canjeados}))
    }
    
    handleNewPassword = (event) => {
        this.setState({new_password: event.target.value})
    }
    handleOldPassword = (event) => {
        this.setState({old_password: event.target.value})
    }
    handleClick = (evento) => {
        const data = new FormData(evento.target)
        console.log(data)
        this.setState({done: !this.state.done})
        console.log("user",this.state.user)
        const nuevo_hash= {
            id: this.state.user.id, 
            hash: this.state.user.hash,
            new_password: this.state.new_password,
            old_password: this.state.old_password
        }
        console.log("nuevo_hash", nuevo_hash)
        fetch('/api/usuarios/'+this.state.user.id, {
            method: 'PATCH',
            body: JSON.stringify(nuevo_hash),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({message: 'Contraseña cambiada.', visible: true})
                }
                else this.setState({message: 'La contraseña no coincide', visible: true})
            })
            .catch (err => {
                this.setState({message: 'Lo siento tu cambio no ha sido aceptado. Verifica que has puesto la contraseña correcta. Si el problema persiste, contacta a algún administrador.', visible: true})
            })
    }


    render() {
        const premios_canjeados = this.state.premios_canjeados;
    return (
        <Container className='containerAll' fluid={true} >
            <Header as='h2' id='headerContainer' block inverted color="teal">
                Mi Área Personal
            </Header> 
{/* Form de cambios al perfil */}
            <Segment raised>
                <Header as='h3' color="teal">
                    Cambios de perfil
                </Header>
            <Divider/>
                <Segment>
                    { this.state.done 
                    ? 
                    <p>{this.state.message}</p>
                    :
                    <Form unstackable onSubmit={this.handleClick}>
                        <Form.Group widths={2}>
                            <Form.Input id="old_password" name='old_password' label='Vieja contraseña' placeholder='Old password' onChange={this.handleOldPassword}/>
                            <Form.Input id="new_password" name="new_password" label='Nueva contraseña' placeholder='New password' onChange={this.handleNewPassword}/>
                        </Form.Group>
                        <Grid>
                            <Grid.Column textAlign="center">
                                <Button >
                                    Aceptar
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>}
                </Segment>
            </Segment>
{/* Numero de premios canjeados */}
            <Segment raised>
                <Header as='h3' color="teal">
                    Tienes {premios_canjeados.length} premios canjeados
                </Header>
            <Divider/>
                <Card.Group centered >
                    {premios_canjeados.map (premio_canjeado => 
                    <Card>
                        <Image src= {premio_canjeado.imagen}/>
                        <Card.Content>
                            <Card.Header textAlign="center">{premio_canjeado.nombre_premio}</Card.Header>
                            <Card.Meta />
                            <Card.Description textAlign="center">
                                {premio_canjeado.descripcion}
                            </Card.Description>
                        </Card.Content>
                    </Card>)}
                </Card.Group>
            </Segment> 
        </Container>
            )
        }
    }
