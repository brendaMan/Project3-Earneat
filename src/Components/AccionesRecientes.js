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
                    <Icon 
                      circular
                      name='star outline'
                      inverted color="teal"
                    />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                      <Feed.User>{voto.de_nombre}</Feed.User> le ha regalado {voto.puntos} puntos a <Feed.User>{voto.a_nombre}</Feed.User>... <Icon name='quote left'/>{voto.descripcion}<Icon name='quote right'/> 
                      <Feed.Date>{moment(voto.fecha).add(2, 'h').fromNow()}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                      <Icon 
                        name='star'
                      />
                      {voto.puntos} puntos
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
                :
// Noticia de Premios Canjeados 
                <Feed.Event>
                <Feed.Label>
                    <Icon 
                      name='gift'
                      color= 'teal'
                      circular
                    />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>{voto.de_nombre}</Feed.User> ha canjeado {voto.puntos} puntos por lo que ahora tiene... <Feed.User>{voto.descripcion}</Feed.User>
                      <Feed.Date>{moment(voto.fecha).add(2, 'h').fromNow()}</Feed.Date>
                  </Feed.Summary>
                  <Feed.Meta>
                    <Icon 
                      name='tags' 
                      // inverted color='red'
                    />
                    {voto.puntos} puntos
                  </Feed.Meta>
                </Feed.Content>
                </Feed.Event>
              )}
              
            </Feed>
          </Segment>
        )
    }
}
