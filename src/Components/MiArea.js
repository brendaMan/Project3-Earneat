import React, { Component } from 'react';
import { Button, Card, Container, Divider, Form, Grid, Header, Image, Segment} from 'semantic-ui-react';

export default class MiArea extends Component {

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
                                    <Card.Header textAlign="center">Viaje a tenerife</Card.Header>
                                        <Card.Meta />
                                            <Card.Description textAlign="center">
                                                190000 puntos
                                            </Card.Description>
                                </Card.Content>
                                    <Divider />
                                <Container textAlign='center'>
                                        <Button color="gray" >OK</Button>
                                </Container>
                            </Card>
                        </Segment>

                        <Segment>
                            <Header as="h3" floated="left">
                                Cambios de perfil
                            </Header>
                                <Divider clearing />
                            <Segment>
                                <Form unstackable>
                                   
                                    <Form.Group widths={2}>
                                        <Form.Input label='Vieja contraseña' placeholder='Old password' />
                                        <Form.Input label='Nueva contraseña' placeholder='New password' />
                                        <Form.Input label='Repetir contraseña' placeholder='Confirm Password' />
                                    </Form.Group>
                                    
                                        <Grid>
                                            <Grid.Column textAlign="center">
                                                <Button>Aceptar</Button>
                                            </Grid.Column>
                                        </Grid>
                                </Form>
                            </Segment>
                        </Segment> 
                    </Segment>
                </div>
                );
                
                
            </Container>
        )
    }
}
