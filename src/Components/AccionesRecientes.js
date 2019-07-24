import React, { Component } from 'react';
import { Feed, Icon, Header, Segment, Divider } from 'semantic-ui-react';
import moment from 'moment';


export default class AccionesRecientes extends Component {

    render() {
        return (
          <Segment raised>
            <Feed size='large' className="ui-segment">
              <Header 
                as='h3'
                color="teal">
              Acciones Recientes</Header>
              <Divider/>

              
              {this.props.feed.map(voto => 
// Noticias de Puntos Regalados
                voto.a_usuario_id ? 
              
                <Feed.Event>
                  <Feed.Label>
                    <Icon circular name='star outline' inverted color="teal"/>
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                      <span className='nombre'>{voto.de_nombre}</span> le ha regalado {voto.puntos} puntos a <span className='nombre'>{voto.a_nombre}</span>. La razón... <Icon name='quote left'/> {voto.descripcion} <Icon name='quote right'/> 
                    </Feed.Summary>
                    <Feed.Meta>
                      <Icon name='clock'/>
                      {moment(voto.fecha).add(2, 'h').fromNow()}
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
                :
// Noticia de Premios Canjeados 
                <Feed.Event>
                  <Feed.Label>
                      <Icon name='gift' color= 'teal' circular/>
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                      <span className='nombre'>{voto.de_nombre}</span> ha canjeado {voto.puntos} puntos por lo que ahora tiene... <Icon name='quote left' size='small'/> {voto.descripcion} <Icon name='quote right' size='small'/>
                    </Feed.Summary>
                    <Feed.Meta >
                      <Icon name='clock outline'/>
                      {moment(voto.fecha).add(2, 'h').fromNow()}
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>)}
            </Feed>
          </Segment>
        )
    }
}
