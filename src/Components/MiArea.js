import React, { Component } from 'react';
import { Button, Card, Container, Divider, Form, Grid, Header, Image, Segment} from 'semantic-ui-react';

export default class MiArea extends Component {
    constructor(props){
        super(props);
            this.state = {
                done: false,
                user: props.user,
                premio_canjeado: []
            }
            this.handleClick = this.handleClick.bind(this)
    };
        handleClick() {
            this.setState({done: !this.state.done})
        }

        render() {
                return (
                    <Container fluid>
                        <div>
                            <Segment>
                                    <Header as="h2" widths="equal">
                                        Área personal
                                    </Header>
                                <Segment>
                                    <Header as="h3" floated="left">
                                        Premios canjeados
                                    </Header>
                                        <Divider clearing />
                                    <Card>
                                        <Image
                                            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                                            wrapped
                                            ui={false}
                                        />
                                        <Card.Content>
                                            <Card.Header textAlign="center">{this.props.premio_canjeado.nombre_premio}</Card.Header>
                                                <Card.Meta />
                                                    <Card.Description textAlign="center">
                                                        190000 puntos
                                                    </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Segment>

                                <Segment>
                                    <Header as="h3" floated="left">
                                        Cambios de perfil
                                    </Header>
                                        <Divider clearing />
                                    <Segment>
                                    { this.state.done 
                                        ? 
                                        <p>Ya has cambiado tu contraseña!!</p>
                                            :
                                        <Form unstackable>
                                        
                                            <Form.Group widths={2}>
                                                <Form.Input label='Vieja contraseña' placeholder='Old password' />
                                                <Form.Input label='Nueva contraseña' placeholder='New password' />
                                                <Form.Input label='Repetir contraseña' placeholder='Confirm Password' />
                                            </Form.Group>
                                            
                                                <Grid>
                                                    <Grid.Column textAlign="center">
                                                        <Button onClick={this.handleClick} 
                                                                >Aceptar</Button>
                                                    </Grid.Column>
                                                </Grid>
                                        </Form>
                                    }
                                    </Segment>
                                </Segment> 
                            </Segment>
                        </div>
                        );
                        
                        
                    </Container>
                )
            }
        }
