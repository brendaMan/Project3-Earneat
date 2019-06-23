import React, { Component } from 'react';
import AccionesRecientes from './AccionesRecientes'
import { Header, Container, Divider, Form } from 'semantic-ui-react';

export default class Puntos extends Component {
    render() {
        return (
            <Container fluid>
                <Header as='h2' className='headerContainer'  block>
                  Puntos
                </Header> 
                <Form fluid>
                    <Header as='h3' >Regalar Puntos</Header>
                    <Form.Group fluid>
                        <p>De </p>
                        <Form.Input></Form.Input>
                        <p>puntos, quiero dar </p>
                        <Form.Input></Form.Input>
                        <p>puntos a </p>
                        <Form.Select></Form.Select>
                    </Form.Group>
                </Form>
                <Divider/>
                <AccionesRecientes/>
            </Container>
        )
    }
}

