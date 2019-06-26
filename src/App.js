import React, { Component } from 'react'
import SignIn from './SignIn';
import Loading from './Components/Loading';
import Dashboard from './Components/Dashboard';
import './App.css';


const styles = {
  // background: "#000",
  // width: "2px",
  cursor: "col-resize",
  margin: "5px",
  height: "100%"
}; 

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      user: undefined,
      signedIn: undefined,
    }
    fetch('/api/users/me')
      .then (r => r.json())
      .then (user => this.setState({ user, signedIn: true }))
      .catch (err => this.setState({ signedIn: false }))
  }

  render() {
    const signedIn = this.state.signedIn;
    return (
        <div>
        { signedIn === true ? <Dashboard /> : 
          signedIn === false ? <SignIn onLogin={this.onLogin}/> : 
                                <Loading /> }
        </div>
        )
  }
}

