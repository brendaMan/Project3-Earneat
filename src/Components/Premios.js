import React, { Component } from 'react';
import { Header, Container, Button, Card, Image} from 'semantic-ui-react';



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
              <Header as='h2' block>
                  Premios {premios.length}
              </Header>
               </Container>
            
            <Container fluid>
            {premios.map(premio =>
              <Card>
              <Image  src = {premio.image} wrapped ui={false} />
               <Card.Content>
                <Card.Header>{premio.header}</Card.Header>
                <Card.Meta>
                      <span className='date'>Primer premio</span>
                      <span className= 'puntos'>{premio.puntos} Puntos </span>
                 </Card.Meta>
                <Card.Description>{premio.description}</Card.Description>
             </Card.Content>
            <Card.Content extra>
              <div>
                  <Button color='grey' align = 'left'>Más Información</Button>
                  <Button color='teal' align ='right'>Me lo quedo</Button>
              </div>
            </Card.Content>
            </Card>)}
            </Container>
            
            
          
        </div>
          )
        }
   }
