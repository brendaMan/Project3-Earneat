import React, { Component } from 'react';
import { Header, Container, Button, Card, Image, Segment,} from 'semantic-ui-react';

import imagen_premio from './imagenes/imagen_premio.png';


export default class Premios extends Component {
  constructor(props){
    super(props);
    this.state = {
      premios : [],
      votos : []
    };

    fetch('/api/premios')
    .then (r => r.json())
    .then ( data => this.setState({premios : data}))
  

    fetch ('/api/votos')
    .then (r => r.json())
    .then (data => this.setState({votos : data}))
  }

  render() {
    const premios = this.state.premios;
    const votos = this.state.votos;
    return(
        <div>
          <Container fluid>
               <Segment>
                 <Header as='h2' block>
                    Premios {premios.length}
                 </Header>
              </Segment>
          
            
          <Segment>
            <Card.Group widths={2}>
             {premios.map(premio =>
              <Card>
                <Image  
                  src = {imagen_premio}
                  wrapped 
                  ui={false} 
                 />
               <Card.Content>
                 <Card.Header className='premio-header' textAlign= 'center' >{premio.nombre}</Card.Header>
                 <Card.Meta className='date' textAlign= 'center'>
                      <span >Primer premio</span>
                      <span>{premio.punto} Puntos </span>
                  </Card.Meta>
                <Card.Description  className= 'descripcion'  textAlign='center'>{premio.descripcion}</Card.Description>
               </Card.Content>
               
               <Card.Content extra>
                  <Button color='teal' >
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

