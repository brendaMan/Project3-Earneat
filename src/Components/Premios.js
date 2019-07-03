import React, { Component, Fragment } from 'react';
import { Header, Container, Button, Card, Divider, Image} from 'semantic-ui-react';



export default class Premios extends Component {
  constructor(props){
    super(props)
    this.state = {
      premios : []
    };

    fetch('/api/premios')
    .then (r => r.json())
    .then ( data => this.setState({premios : data}));

    fetch ('/api/votos')
    .then (r => r.json())
    .then (data => this.setState({votos : data}))
  }

  render() {
    const premios = this.state.premios;
        return (
          <div>
<Container fluid>
            <Header as='h2' block>
                  Premios
            </Header>
          </Container>
           <Card.Group>
           <Card>
            <Image  src = {premios.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{premios.header}</Card.Header>
              <Card.Meta>
                <span className='date'>Primer premio</span>
              </Card.Meta>
              <Card.puntos>{premios.puntos} Puntos</Card.puntos>
              <Card.Description>{premios.description}</Card.Description>
            </Card.Content>
          
            <Card.Content extra>
              <div>
                  <Button color='grey' align = 'left'>Más Información</Button>
                  <Button color='teal' align ='right'>Me lo quedo</Button>
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Image  src = {premios.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{premios.header}</Card.Header>
              <Card.Meta>
                <span className='date'>Primer premio</span>
              </Card.Meta>
              <Card.puntos>{premios.puntos} Puntos</Card.puntos>
              <Card.Description>
                {premios.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div>
                  <Button color='grey' align = 'left'>Más Información</Button>
                  <Button color='teal' align ='right'>Me lo quedo</Button>
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Image  src = {premios.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{premios.header}</Card.Header>
              <Card.Meta>
                <span className='date'>Primer premio</span>
              </Card.Meta>
              <Card.puntos>{premios.puntos}</Card.puntos>
              <Card.Description>
                {premios.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div>
                  <Button color='grey' align = 'left' onClick>Más Información</Button>
                  <Button color='teal' align ='right'>Me lo quedo</Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
          </div>
          

        )
  }
}
