import React, { Component } from 'react';
import AddUsuario from './AddUsuario';
import RemoveUsiario from './RemoveUsuario';
import AddPremio from './AddPremio';
import RemovePremio from './RemovePremio';
import { Route, BrowserRouter as Router, Switch, NavLink } from 'react-router-dom';


export default class AdminDashboard extends Component {
    render() {
        return (
            <div>
                Admin Dashboard here
            </div>
            // <Router className= "browser">
            //   <div className="navBarAdmin">
            //      <NavLink exact to="/" className= "tabLike" activeClassName="selected"> Home </NavLink>
            //      <NavLink to="/user" className= "tabLike" activeClassName="selected"> </NavLink>
            //      <Switch>
            //        <Route exact path="/" component={Home} />
            //        <Route path="/user" component={} />
            //      </Switch>
            //    </div>
            //  </Router>
        );
    }
}