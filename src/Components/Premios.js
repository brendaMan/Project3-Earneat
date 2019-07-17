import React, { Component } from 'react';
import { Header, Container, Button, Card, Modal, Icon, Image, Segment, Divider} from 'semantic-ui-react';
import imagen_premio from './imagenes/imagen_premio.png';



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
    console.log("El premio es: ",premio)
    const info_premio = {usuario_id: this.state.user.id, premio_id: premio.id}
    // Aqui pongo la informacion que necesita el back en el body.
    fetch('/api/usuarios/' + this.state.user.id + '/premios', {
    method: 'POST',
    body: JSON.stringify(info_premio),
    headers: {'Content-Type': 'application/json'}
   })
      .then(res => {
         if (res.status === 200) {
           console.log('saldo', this.state.saldo)
           console.log('valor del premio', premio.puntos)
           this.setState({message : `¡ Felicidades ${this.state.user.nombre} !  Puedes ver tu premio en tu área personal.`, visible: true})
           this.props.loadSaldo();
          }
         else if (res.status === 500) this.setState({message: 'Ha habido un problema canjeando tu premio', visible: true})
         else this.setState({message: 'Lo siento, pero tu premio no se ha canjeado. Verifica que tengas saldo suficiente en tu cuenta. Si el problema persiste, contacta a algun administrador.', visible: true})
       })
      .catch (err => {
        console.log("Esta entrando en el catch porque: ",err)
        this.setState({message: 'Lo siento, pero tu premio no se ha completado. Verifica que tengas saldo suficiente en tu cuenta. Si el problema persiste, contacta a algun administrador.', visible: true})
      })
       }  
       onClose = () => this.setState({ visible: false })

  
  render() {
      const premios = this.state.premios;
      const user = this.state.user;
    return(
      <Container className='containerAll' fluid={true} >
        <Header as='h2' id='headerContainer' block inverted color="teal">
          Premios
        </Header>
{/* Header con el saldo de puntos que tienes para comprar.  */}
        <Segment raised>
          <Header as='h3' block textAlign='center' color='teal'>
             ¡ Enhorabuena {user.nombre}, tienes acumulados {this.props.saldo} puntos !
          </Header>
        <Divider/>
{/* Tarjetas con la informacion de cada premio. */}
        <Card.Group centered >
         {premios.map (premio => 
          <Card>
            <Image
              size='tiny'
              src = {imagen_premio}
              wrapped ui={false} 
            />
            <Card.Content>
              <Card.Header className='premio-header' textAlign= 'center' >{premio.nombre}</Card.Header>
               <Card.Meta className='date' textAlign= 'center'>
                  <span>{premio.puntos} Puntos </span>
                </Card.Meta>
                <Card.Description  className= 'descripcion'  textAlign='center'>{premio.descripcion}</Card.Description>
               </Card.Content>
               
               <Card.Content extra textAlign='center'>
                  <Button color='teal' onClick={() => this.onCanjear(premio)} >
                     Me lo quedo
                  </Button>
{/* Mensaje */}
                  <Modal 
                    centered={false} size='mini'
                    open={this.state.visible}
                    close={this.onClose}
                  >
                    <Modal.Content>
                      <p>{this.state.message}</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color='green' onClick={this.onClose} inverted>
                        <Icon name='checkmark' /> OK
                      </Button>
                    </Modal.Actions>
                  </Modal>
              </Card.Content>
             </Card>)  }
            </Card.Group>
         </Segment>
        </Container>
          );
       };
             
    }

