import React, { Component } from 'react';
import { Card, Image, Popup } from 'semantic-ui-react';


export default class MiTarjeta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            nombre: '',
            puntos: ''
        }
    }

    render() {
        const user= this.state.user
        return ( 
            <Card raised fluid>
                {user.admin ? 
                <Image src='https://i.postimg.cc/gjxthq3T/key-1013662-960-720.jpg' wrapped ui={false} />
                :
                <Image src='https://i.postimg.cc/N00HzMM6/networks-3017395-1280.jpg' wrapped ui={false} />
                }
                <Card.Content>
                    <Card.Header
                        textAlign='center'>
                        {user.nombre}
                    </Card.Header>
                    <Popup
                        trigger=
                            {<Card.Description> 
                                Saldo de mis Puntos: 
                                <span className="saldo">
                                {this.props.saldo}
                                </span>
                            </Card.Description>}
                        content='Estos son los puntos que tienes disponible para canjear premios. Los puntos acumulados no desaparecen al final del mes, solo al canjear se te quitaran puntos de esta area.'
                        style={{borderRadius: '2em',
                            padding: '1em',
                            margin: '3em'}}
                        position='right center'
                    />
                    <Popup
                        trigger=
                            {<Card.Description> 
                                Puntos para Regalar: 
                                <span className="saldo">
                                {this.props.a_regalar}
                                </span>
                            </Card.Description>}
                        content='Estos son los puntos que tienes disponible para regalar a tus compañeros. Al final del mes siempre es resetean para que puedas regalar mas puntos el mes que viene.'
                        style={{borderRadius: '2em',
                            padding: '1em',
                            margin: '3em'}}
                        position='right center'
                    />
                </Card.Content>
            </Card>    
        )
    }
}
