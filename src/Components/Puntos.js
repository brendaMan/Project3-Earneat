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
            if (res.status === 200 ) {
                this.setState({
                    message : `Tu regalo de ${this.state.puntos} puntos ha sido completado.`, 
                    puntos: "", 
                    razon: "", 
                    visible: true})
                this.loadFeed();
                this.props.loadSaldo();
            }
            else this.setState({message: 'Lo siento, pero tu regalo no se ha completado. Verifica que hayas completado el formulario. Si el problema persiste, contacta a algun administrador.', visible: true})
        })
        .catch (err => this.setState({message: 'Lo siento, pero tu regalo no se ha completado. Verifica que hayas completado el formulario. Si el problema persiste, contacta a algun administrador.', visible: true}))
    }  
    onClose = () => this.setState({ visible: false })
    
    render() {
        return (
            <Container className='containerAll' fluid={true} >
                <Header as='h2' id='headerContainer' block inverted color="teal">
                    Dashboard
                </Header> 
{/* Segment con el Form para regalar puntos */}
            <Segment raised>
                <Form fluid="fluid">
                    <Header as='h3' color="teal">
                        Regalar Puntos
                    </Header>
                <Divider/>
{/* Inputs para el Form */}
                        <Form.Group className='linea1Puntos' grouped as='h3'> 
                            De  <b>{this.props.a_regalar}</b>  puntos, quiero dar 
                            <Input className='inputPuntos' icon='star' iconPosition='left'
                                value={this.state.puntos} 
                                onChange={e => this.setState({puntos: e.target.value})}
                            /> 
                            puntos a  
                            <Select className='selectPuntos' 
                                options={this.state.usuarios} 
                                onChange={(e, data) => this.setState({a_usuario_id: data.value})}
                            />.
                        </Form.Group>
                        <Form.Group className='linea2Puntos' grouped inline
                            value={this.state.razon} 
                            onChange={e => this.setState({razon: e.target.value})}
                        >
                            <p className="lead emoji-picker-container">La razón... </p> 
                            <TextArea />
                        </Form.Group>
{/* Button para regalar puntos */}
                <Container textAlign='right'>
                    <Button inverted color='teal' 
                        circular={true} 
                        onClick={this.onRegalar}>
                        ¡REGALAR!
                    </Button>
                </Container>
                </Form>
            </Segment> 
{/* Nueva pantalla que muestra un mensaje al regalar puntos. */}
                    <Modal 
                        className='modal'
                        centered={false} size='mini'
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
{/* Componente del Newsfeed  */}
            <AccionesRecientes feed={this.state.feed} />
            </Container>
        )
    }
}

