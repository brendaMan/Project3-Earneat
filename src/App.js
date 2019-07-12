import React, { Component } from 'react'
import SignIn from './SignIn';
import Loading from './Components/Loading';
import Dashboard from './Dashboard';
import './App.css';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      user: undefined,
      signedIn: undefined,
    }
    fetch('/api/usuarios/yo')
      .then (r => r.json())
      .then (user => this.setState({ user, signedIn: true }))
      .catch (err => this.setState({ signedIn: false }))
  }

  onLoginSuccess = (user) => {
    console.log("App.onLoginSuccess()", user)
    this.setState({ signedIn: true, user: user })
  }

  render() {
    const { user, signedIn } = this.state;
    return (
        <div>
        { signedIn === true && user ? 
             <Dashboard user={user} />
            : 
            (signedIn === false ? 
              <SignIn onLoginSuccess={this.onLoginSuccess}/> : 
              // signedIn === undefined 
              <Loading />) }
        </div>
        )
  }
}

