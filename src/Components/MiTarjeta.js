import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default class MiTarjeta extends Component {
    render() {
        return ( 
            <Card raised fluid>
                <Image src='https://i.postimg.cc/QtXQ5c08/Hi.png' wrapped ui={false} />
                <Card.Content>
                <Card.Header>Mari</Card.Header>
                <Card.Meta>Web Developer</Card.Meta>
                </Card.Content>
                <Card.Content extra>Puntos Adquiridos</Card.Content>
            </Card>    
        )
    }
}
