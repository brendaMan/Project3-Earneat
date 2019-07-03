import React, { Component } from 'react'
import TopNavBar from './TopNavBar';
import Puntos from './Puntos';
import Premios from './Premios';
import MiArea from './MiArea';
import MiTarjeta from './MiTarjeta';
import MenuWithRouter from "./MenuWithRouter";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Grid, Menu, Container } from 'semantic-ui-react'; 

export default class Dashboard extends Component {
  
  render() {
    return (
      
    <Router>
    <TopNavBar/>
    <Grid>
    <Grid.Column width={4}>
    <MiTarjeta/>
        
      <MenuWithRouter
        onItemClick={item => this.onItemClick(item)}
        items={[
          ['Dashboard', "/"],
          ['Premios', "/premios"],
          ['Mi Area  Personal', "/mi-area"]
        ]}
        headerIcon={"compass outline"}
      />
      </Grid.Column>
      <Grid.Column stretched width={12}>
      <Container>
        <Switch>
          <Route path="/" exact component={Puntos} />
          <Route path="/premios" component={Premios} />
          <Route path="/mi-area" component={MiArea} />
          {/* <Route component={MissingPage} /> */}
        </Switch>
      </Container>
      </Grid.Column>
      </Grid>
  </Router>

  )}
}