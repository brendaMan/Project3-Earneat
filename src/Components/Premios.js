import React, { Component } from 'react';
import { Header, Container, Button, Card, Modal, Icon, Image, Segment,} from 'semantic-ui-react';
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
    fetch('/api/premios/add', {
    method: 'POST',
    body: JSON.stringify(info_premio),
    headers: {'Content-Type': 'application/json'}
   })
      .then(res => {
         if (res.status === 200) {
           console.log(this.state.user)
           this.setState({message : `¡ Felicidades ${this.state.user.nombre} !  Puedes ver tu premio en tu área personal.`, visible: true})
          }
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
        <div>
          <Container fluid className ='containerAll'>
               <Segment>
                 <Header as='h2' block>
                 {/*premios.length*/}  PREMIOS
                 </Header>
              </Segment>
          
            
          <Segment>
            <Segment>
                 <Header as='h2' block textAlign='center'>
                   ¡ Enhorabuena {user.nombre}, tienes acumulados {this.props.saldo} puntos !
                 </Header>
            </Segment>
          
            <Card.Group centered >
             {premios.map (premio => 
               <Card>
                <Image 
                  className="ui medium image"
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
                   <Modal
                        size={"large"}
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
            
            
    </div>
          );
       };
             
    }

