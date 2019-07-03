import React, { Component } from 'react';
import { Feed, Icon, Header, Segment, Divider } from 'semantic-ui-react';

export default class AccionesRecientes extends Component {
  constructor(props){
    super(props);
    this.state = {
      feed: []
    };

  fetch('/api/newsfeed')
    .then(r => r.json())
    .then(data => this.setState({feed: data}))
  }

    render() {
      
        return (
          <Segment raised>
            <Feed>
                 <Header as='h3'>Acciones Recientes</Header>
                 <Divider/>
              {this.state.feed.map(voto => 
                <Feed.Event>
                  <Feed.Label>
                    <Icon name='gift'/>
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                      <Feed.User>{voto.fromname}</Feed.User> le ha regalado 
                      puntos a <Feed.User>{voto.toname}</Feed.User>... <Icon name='quote left'/>{voto.reason}<Icon name='quote right'/> 
                      <Feed.Date>{voto.date}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                        <Icon name='certificate' />
                        {voto.points} puntos
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              )}
  </Feed>
  </Segment>
        )
    }
}