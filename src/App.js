import React, { Component } from 'react'
import SignIn from './SignIn';
import SideBar from './Components/SideBar';
import TopNavBar from './Components/TopNavBar';
import Puntos from './Components/Puntos';
import Premios from './Components/Premios';
import MiArea from './Components/MiArea';
import MiTarjeta from './Components/MiTarjeta';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { Sidebar, Container} from 'semantic-ui-react';
import SplitPane from "react-split-pane";

const styles = {
  background: "#000",
  width: "2px",
  cursor: "col-resize",
  margin: "0 5px",
  height: "100%"
}; 

export default class App extends Component {

  render() {
    return (
        <div>
        {/* <SignIn/> */}
        <TopNavBar/>
        <Router>
    <SplitPane
      split="vertical"
      minSize={140}
      defaultSize={160}
      resizerStyle={styles}
    >
      <menu>
        <MiTarjeta/>
        <div>
          <Link to="/">Puntos</Link>
        </div>
        <div>
          <Link to="/premios">Premios</Link>
        </div>
        <div>
          <Link to="/mi-area">Mi Area Personal</Link>
        </div>
      </menu>
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

