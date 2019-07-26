import React, { Component } from 'react';
import { Header, Container, Button, Card, Modal, Icon, Image, Segment, Divider} from 'semantic-ui-react';

export default class Premios extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: props.user,
      saldo: "",
      visible: false,
      premios : [],
    }
    
    fetch('/api/premios')
    .then (r => r.json())
    .then ( data => this.setState({premios : data}));
  }
   
  onCanjear = (premio) => {
    const info_premio = {usuario_id: this.state.user.id, premio_id: premio.id}
    
    fetch('/api/usuarios/' + this.state.user.id + '/premios', {
    method: 'POST',
    body: JSON.stringify(info_premio),
    headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({message : `¡ Felicidades ${this.state.user.nombre} !  Puedes ver tu premio en tu área personal.`, visible: true})
        } else {
          this.setState({message: 'Lo siento, pero tu premio no se ha canjeado. Verifica que tengas saldo suficiente en tu cuenta. Si el problema persiste, contacta a algun administrador.', visible: true})
        }
      }) 
      .catch (err => {
        this.setState({message: 'Lo siento, pero tu premio no se ha completado. Verifica que tengas saldo suficiente en tu cuenta. Si el problema persiste, contacta a algun administrador.', visible: true})
      })
    }
      
  onClose = () => {
    this.setState({ visible: false }) 
    this.props.loadSaldo();
  }

  render() {
      const premios = this.state.premios.filter(premio => premio.activo === 1);
      const user = this.state.user;
    return(
      <Container className='containerAll' fluid={true} >
        <Header as='h2' id='headerContainer' block inverted color="teal">
          Premios
        </Header>
      <Segment raised>
{/* Header con el saldo de puntos que tiene el usuario para canjear premios. */}
        <Header as='h3' textAlign='center' color='teal'>
          ¡ Enhorabuena {user.nombre}, tienes acumulados {this.props.saldo} puntos !
        </Header>
        <Divider/>
{/* Tarjetas con la informacion de cada premio. */}
        <Card.Group centered>
        {premios.map (premio => 
          <Card>
            <Image src = {premio.imagen} />
            <Card.Content>
              <Card.Header className='premio-header' textAlign= 'center' >
                {premio.nombre}
              </Card.Header>
              <Card.Meta className='date' textAlign= 'center'>
                <span>{premio.puntos} Puntos </span>
              </Card.Meta>
              <Card.Description className= 'descripcion' textAlign='center'>
                {premio.descripcion}
              </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='center'>
              <Button inverted color='teal' circular={true} onClick={() => this.onCanjear(premio)} >
                 Me lo quedo
              </Button>
            </Card.Content>
{/* Mensaje */}
            <Modal className='modal' centered={false} size='mini' open={this.state.visible} close={this.onClose}>
              <Modal.Content>
                <p>{this.state.message}</p>
              </Modal.Content>
              <Modal.Actions>
                <Button color='green' onClick={this.onClose} inverted>
                  <Icon name='checkmark' /> OK
                </Button>
              </Modal.Actions>
            </Modal>
          </Card>)}
        </Card.Group>
      </Segment>
      </Container>
          );
       };
             
    }

