import React, { Component } from 'react'
import TopNavBar from './Components/TopNavBar';
import Puntos from './Components/Puntos';
import Premios from './Components/Premios';
import MiArea from './Components/MiArea';
import MiTarjeta from './Components/MiTarjeta';
import MenuWithRouter from "./MenuWithRouter";
import AdminUsuarios from "./AdminComponents/AdminUsuarios";
import AdminPremios from "./AdminComponents/AdminPremios";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Grid, Segment, Responsive, Container } from 'semantic-ui-react'; 

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state ={
      saldo: 0,
      a_regalar: 0,
      premio_canjeado: []
    }
    this.loadSaldo()
  }
  loadSaldo = () => {
    fetch(`/api/usuarios/${this.props.user.id}/puntos_saldo`)
      .then(res=> res.json())
      .then(data=> this.setState({saldo: data.puntos_saldo}))

    fetch(`/api/usuarios/${this.props.user.id}/puntos_dados`)
      .then(res=> res.json())
      .then(data=> this.setState({a_regalar: data.puntos_restantes}))

    //fetch(`/api/usuarios/${this.props.user.id}/premios_canjeados`)
    //.then(res=> res.json())
    //.then(data=> this.setState({premio_canjeado: data.premios_canjeados}))
  }
  render() {
    const user = this.props.user;
    const items = [
      ['Dashboard', "/"],
      ['Premios', "/premios"],
      ['Mi Area  Personal', "/mi-area"]
    ];
    if (user.admin) {
      items.push(['Administrar Usuarios', '/administrar-usuarios'], 
      ['Administrar Premios', '/administrar-premios'])
    }
    return ( 
      <div>
{/* Tablet and Computer */}
      <Responsive minWidth={768}>
      <TopNavBar/>
      <Router>
        <Grid stackable className="gridAll" divided='vertically'>
{/* Grid with SideBar  */}
          <Grid.Column className="sideBarGrid" 
            tablet={5} 
            computer={3}
            // largeScreen
            // widescreen
          >
          <Segment className='sideBar' inverted color='teal'>
            <MiTarjeta user={user} saldo={this.state.saldo} a_regalar={this.state.a_regalar}/>
            <MenuWithRouter
              onItemClick={item => this.onItemClick(item)}
              items={items}
              headerIcon={"compass outline"}
            />
          </Segment>
        </Grid.Column>
{/* Grid with Content Area */}
        <Grid.Column className="displayAreaGrid" 
          tablet={11} 
          computer={13}
        >
        { user.admin ? 
// Navegacion para administradores
            <Switch>
              <Route path="/" exact render={(p) => (<Puntos {...p} {...{ user: user, a_regalar:this.state.a_regalar, loadSaldo: this.loadSaldo}} />)} />
              <Route path="/premios" component= {(p) => (<Premios {...p} {...{ user: user, saldo : this.state.saldo, loadSaldo: this.loadSaldo }} />)} />
              <Route path="/mi-area" component={(p) => (<MiArea {...p} {...{ user: user, premio_canjeado : this.state.premio_canjeado}} />)} />
              <Route path="/administrar-usuarios" component={AdminUsuarios} />
              <Route path="/administrar-premios" component={AdminPremios} />
            </Switch>
                  :
// Navegacion para resto de usuarios
            <Switch>
              <Route path="/" exact render={(p) => (<Puntos {...p} {...{ user: user, a_regalar:this.state.a_regalar, loadSaldo: this.loadSaldo}} />)} />
              <Route path="/premios" component= {(p) => (<Premios {...p} {...{ user: user, saldo : this.state.saldo, loadSaldo: this.loadSaldo}} />)} />
              <Route path="/mi-area" component={(p) => (<MiArea {...p} {...{ user: user, premio_canjeado : this.state.premio_canjeado}} />)} />
            </Switch>
                  }
        </Grid.Column>
      </Grid>
      </Router> 
      </Responsive> 

{/* Mobile */}
<Responsive maxWidth={767}>
      <Router>
{/* Menu options  */}
            <MenuWithRouter
              onItemClick={item => this.onItemClick(item)}
              items={items}
              headerIcon={"compass outline"}
            />
{/* Content Area */}
          <Container className="displayAreaMobile">
        { user.admin ? 
// Navegacion para administradores
            <Switch>
              <Route path="/" exact render={(p) => (<Puntos {...p} {...{ user: user, a_regalar:this.state.a_regalar, loadSaldo: this.loadSaldo}} />)} />
              <Route path="/premios" component= {(p) => (<Premios {...p} {...{ user: user, saldo : this.state.saldo, loadSaldo: this.loadSaldo }} />)} />
              <Route path="/mi-area" component={(p) => (<MiArea {...p} {...{ user: user, premio_canjeado : this.state.premio_canjeado}} />)} />
              <Route path="/administrar-usuarios" component={AdminUsuarios} />
              <Route path="/administrar-premios" component={AdminPremios} />
            </Switch>
                  :
// Navegacion para resto de usuarios
            <Switch>
              <Route path="/" exact render={(p) => (<Puntos {...p} {...{ user: user, a_regalar:this.state.a_regalar, loadSaldo: this.loadSaldo}} />)} />
              <Route path="/premios" component= {(p) => (<Premios {...p} {...{ user: user, saldo : this.state.saldo, loadSaldo: this.loadSaldo}} />)} />
              <Route path="/mi-area" component={(p) => (<MiArea {...p} {...{ user: user, premio_canjeado : this.state.premio_canjeado}} />)} />
            </Switch>
                  }
          </Container>
      </Router> 
      </Responsive>
  </div>
  )}
}