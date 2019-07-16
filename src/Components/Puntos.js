import React, { Component } from 'react';
import AccionesRecientes from './AccionesRecientes';
import { Header, Container, Divider, Form, Segment, TextArea, Input, Modal, Icon, Button, Select} from 'semantic-ui-react';

export default class Puntos extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: props.user,
            de_usuario_id: props.user.id,
            a_usuario_id: 0,
            usuarios: [],
            puntos: "",
            razon: "",
            message:"", 
            feed: [], 
            visible: false
        };
        fetch('/api/dropdown/usuarios') 
        .then(res => res.json())
        .then(data => this.setState({usuarios : data.filter(u=> u.key !== props.user.id)}))
        this.loadFeed()
    }

    loadFeed = () => {
        fetch('/api/newsfeed')
        .then(r => r.json())
        .then(data => this.setState({feed: data}))
    }
    onRegalar = () => {
            fetch('/api/votos', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({message : `Tu regalo de ${this.state.puntos} puntos ha sido completado.`, visible: true})
                this.loadFeed();
            }
            else this.setState({message: 'Lo siento, pero tu regalo no se ha completado. Verifica que hayas completado el formulario. Si el problema persiste, contacta a algun administrador.', visible: true})
        })
        .catch (err => this.setState({message: 'Lo siento, pero tu regalo no se ha completado. Verifica que hayas completado el formulario. Si el problema persiste, contacta a algun administrador.', visible: true}))
    }  
    onClose = () => this.setState({ visible: false })
    
    render() {
        return (
            <Container  
                fluid={true}
                className='containerAll' 
            >
            <Header 
                as='h2'     
                id='headerContainer' 
                block
                inverted color="teal"
            >
                Dashboard
            </Header> 
{/* Segment con el Form para regalar puntos */}
            <Segment raised>
                    <Form 
                        fluid="fluid" 
                    >
                        <Header 
                            as='h3' 
                            color="teal">
                            Regalar Puntos
                        </Header>
                        <Divider/>
{/* Inputs para el Form */}
                        <Form.Group 
                            className='linea1Puntos'
                            grouped
                        >
                            De  <b>{this.props.a_regalar}</b>  puntos, quiero dar 
                            <Input
                                icon='star'
                                iconPosition='left'
                                className='inputPuntos'
                                value={this.state.puntos} 
                                onChange={e => this.setState({puntos: e.target.value})}
                            /> 
                            puntos a  
                            <Select
                                className='selectPuntos' 
                                options={this.state.usuarios} 
                                onChange={(e, data) => this.setState({a_usuario_id: data.value})}
                            />.
                        </Form.Group>
                        <Form.Group 
                            className='linea2Puntos'
                            grouped
                            value={this.state.razon} 
                            onChange={e => this.setState({razon: e.target.value})}
                        >
                            <p>¿Por qué? Pues te cuento que... </p>
                            <TextArea
                                placeholder="¿Cual es la razón por la que quieres dar puntos a tu compañer@?"
                            />
                        </Form.Group>
{/* Button para regalar puntos */}
                        <Container 
                            textAlign='right'
                        >
                            <Button 
                                onClick={this.onRegalar}>
                                Regalar
                            </Button>
                        </Container>
                        <Modal
                            centered={false}
                            size='mini'
                            open={this.state.visible}
                            close={this.onClose}
                        >
                            <Modal.Content>
                                <p>{this.state.message}</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' onClick={this.onClose} inverted>
                                    <Icon name='checkmark' /> Got it
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </Form>
            </Segment> 
{/* Componente del Newsfeed  */}
            <AccionesRecientes feed={this.state.feed} />
            </Container>
        )
    }
}

