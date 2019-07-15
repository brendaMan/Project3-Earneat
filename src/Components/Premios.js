import React, { Component } from 'react';
import { Header, Container, Button, Card, Image, Segment,} from 'semantic-ui-react';
import  {MiTarjeta} from './MiTarjeta';
import imagen_premio from './imagenes/imagen_premio.png';


export default class Premios extends Component {
  constructor(props){
    super(props)
    this.state = {
      nombre: '',
      saldo: '',
      premios : [],
    }
  
    fetch('/api/premios')
    .then (r => r.json())
    .then ( data => this.setState({premios : data}));
  }


  render() {
    const premios = this.state.premios;
    
    

    return(
        <div>
          <Container fluid>
               <Segment>
                 <Header as='h2' block>
                 {premios.length}  Premios 
                 </Header>
              </Segment>
          
            
          <Segment>
            <Segment>
                 <Header as='h2' block textAlign='center'>
                   ¡ Tienes acumulados {this.props.saldo} puntos !
                 </Header>
            </Segment>
          
            <Card.Group centered >
             {premios.map(premio =>
              <Card>
                <Image 
                  className="ui medium image"
                  src = {imagen_premio}
                 wrapped ui={false} 
                />
               <Card.Content>
                 <Card.Header className='premio-header' textAlign= 'center' >{premio.nombre}</Card.Header>
                 <Card.Meta className='date' textAlign= 'center'>
                      <span >Primer premio</span>
                      <span>{premio.puntos} Puntos </span>
                  </Card.Meta>
                <Card.Description  className= 'descripcion'  textAlign='center'>{premio.descripcion}</Card.Description>
               </Card.Content>
               
               <Card.Content extra textAlign='center'>
                  <Button color='teal'  >
                     Me lo quedo
                  </Button>
              </Card.Content>

            </Card>)}

            </Card.Group>

         </Segment>
     
        </Container>
            
            
    </div>
          );
       };
             
    }

