import React, { Component, Fragment } from 'react';
import { Header, Container, Button, Card, Divider, Image} from 'semantic-ui-react';


const premios = [
  {
    image: ' https://cdn.pixabay.com/photo/2015/05/06/13/41/beach-755269__480.jpg',
    header: 'VIAJE A CUBA',
    puntos: '3000',
    description: 'Relajate 5 días en Cuba y Varadero',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShhPSuyx79wsyB9pG1d7EGdgEeP3VBT9A8r3ihVe65lvfvEVdP',
    header: 'DÍA LIBRE',
    puntos: '1000',
    description: 'Disfruta de un día para ti',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDksVrxPSK9W3QwECdBHoVFGwUneRvpprLmGZRi8t44NzEsjTJZQ',
    header: 'TELETRABAJO',
    puntos : '500',
    description: 'Hoy trabajas en casa como te venga en gana',
  },
]

export default class Premios extends Component {
  render(){
    
        return (
          <Container fluid>
            <Header as='h2' block>
                  Premios
            </Header>
           <Card.Group>
           <Card>
            <Image  src = {premios.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{premios.header}</Card.Header>
              <Card.Meta>
                <span className='date'>Primer premio</span>
              </Card.Meta>
              <Card.puntos>{premios.puntos}</Card.puntos>
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
              <Card.puntos>{premios.puntos}</Card.puntos>
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
                  <Button color='grey' align = 'left'>Más Información</Button>
                  <Button color='teal' align ='right'>Me lo quedo</Button>
              </div>
            </Card.Content>
          </Card>
        </Container>

        )
    }
};
