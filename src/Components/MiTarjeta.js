import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';


export default class MiTarjeta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user.id,
            nombre: '',
            puntos: ''
        }
    }

    render() {
        return ( 
            <Card raised fluid>
                {/* {user.admin ?  */}
                <Image src='https://i.postimg.cc/gjxthq3T/key-1013662-960-720.jpg' wrapped ui={false} />
                {/* :
                <Image src='https://i.postimg.cc/s2ntZ2t1/user-1633249-1280.png' wrapped ui={false} /> */}
                {/* } */}
                <Card.Content>
                <Card.Header>Mari</Card.Header>
                <Card.Meta>Web Developer</Card.Meta>
                </Card.Content>
                <Card.Content extra>Mis Puntos <span className="saldo">{this.props.saldo}</span></Card.Content>
                <Card.Content extra>A Regalar: {this.props.a_regalar} </Card.Content>
            </Card>    
        )
    }
}
