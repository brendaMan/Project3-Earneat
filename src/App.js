import React, { Component } from 'react'
import SignIn from './SignIn';
import SideBar from './Components/SideBar';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <SignIn/> */}
        <SideBar/> 
      </div>
    )
  }
}

