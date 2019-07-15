import React, { Component } from 'react';
import { Header, Container, Button, Card, Image, Segment,} from 'semantic-ui-react';
import imagen_premio from './imagenes/imagen_premio.png';


export default class Premios extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: props.user,
      nombre: '',
      saldo: '',
      premios : [],
    }
  
    handleClick() {
      this.setState({done: !this.state.done})
  }


    fetch('/api/premios')
    .then (r => r.json())
    .then ( data => this.setState({premios : data}));
  }


  render() {
    const premios = this.state.premios;
    const user = this.state.user;
    

    return(
        <div>
          <Container fluid>
               <Segment>
                 <Header as='h2' block>
                 {premios.length}  PREMIOS
                 </Header>
              </Segment>
          
            
          <Segment>
            <Segment>
                 <Header as='h2' block textAlign='center'>
                   ¡ Enhorabuena {user.nombre}, tienes acumulados {this.props.saldo} puntos !
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
                      <span>{premio.puntos} Puntos </span>
                  </Card.Meta>
                <Card.Description  className= 'descripcion'  textAlign='center'>{premio.descripcion}</Card.Description>
               </Card.Content>
               
               <Card.Content extra textAlign='center'>
                  <Button color='teal' onClick={this.handleClick} >
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

