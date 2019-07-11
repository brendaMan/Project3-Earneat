import React, { Component } from 'react';
import AccionesRecientes from './AccionesRecientes';
import { Header, Container, Divider, Form, Segment, TextArea, Input, Select} from 'semantic-ui-react';

export default class Puntos extends Component {
    constructor(props){
        super(props);
        this.state = {
            de_usuario_id: props.user.id,
            a_usuario_id: 0,
            puntos: "",
            razon: "",
            message:""
        };
    }
    onRegalar = () => {
            fetch('/api/votos', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            if (res.status === 200) this.setState({message : 'Voto completado'})
            else this.setState({message: 'There is a problem'})
        })
        .catch (err => this.setState({message: 'There is a problem'}))
    }   
    
    render() {
        return (
            <Container fluid={true}>  
                <Header as='h2' id='headerContainer' block>
                  Dashboard
                </Header> 
{/* Segment con el Form para regalar puntos */}
            <Segment raised >
                { (this.state.message) ? 
                    <p>{this.state.message}</p>
                    :
                    <Form fluid="fluid" widths='equal'>
                        <Header as='h3' >Regalar Puntos</Header>
                        <Divider/>
    {/* Inputs para el Form */}
                        <Form.Group inline>
                            De ###{} puntos, quiero dar 
                        <Input
                            value={this.state.puntos} 
                            onChange={e => this.setState({email:e.target.puntos})} /> 
                        puntos a <Select/>
                        </Form.Group>
                        <Form.Group 
                            value={this.state.razon} 
                            onChange={e => this.setState({email:e.target.razon})}>
                            por: <TextArea></TextArea>
                        </Form.Group>
    {/* Button para regalar puntos */}
                        <Form.Button 
                            align='center'
                            onClick={this.onRegalar}>
                            Regalar
                        </Form.Button>
    {/* Mensaje de Error */}
                        <p style={{ color: 'red'}}>{this.state.message}</p>
                    </Form>
                }
            </Segment> 
{/* Componente del Newsfeed  */}
            <AccionesRecientes/>
            </Container>
        )
    }
}

