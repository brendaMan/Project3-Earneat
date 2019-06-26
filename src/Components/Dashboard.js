import React, { Component } from 'react'
import TopNavBar from './TopNavBar';
import Puntos from './Puntos';
import Premios from './Premios';
import MiArea from './MiArea';
import MiTarjeta from './MiTarjeta';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Icon} from 'semantic-ui-react';
import SplitPane from "react-split-pane";

const styles = {
  // background: "#000",
  // width: "2px",
  cursor: "col-resize",
  margin: "5px",
  height: "100%"
}; 

export default class App extends Component {

  render() {
    return (
        <div>
        <TopNavBar/>
        <Router>
        <SplitPane
          split="vertical"
          minSize={140}
          defaultSize={160}
          resizerStyle={styles}>
          <ul id="mainMenu">
            <MiTarjeta/>
            <li>
              <Icon name='exchange' />
              <Link to="/">Puntos</Link></li>
            <li>
              <Icon name='trophy' />
              <Link to="/premios">Premios</Link></li>
            <li>
              <Icon name='id badge outline' />
              <Link to="/mi-area">Mi Area</Link></li>
          </ul>
          <div>
            <Route exact path="/" component={Puntos} />
            <Route path="/premios" component={Premios} />
            <Route path="/mi-area" component={MiArea} />
          </div>
        </SplitPane>
        </Router>
        </div>
        )
  }
}

