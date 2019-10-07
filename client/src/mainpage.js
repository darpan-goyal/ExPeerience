import React from 'react';
import ExampleComponent from "react-rounded-image";
import Collapsible from 'react-collapsible';
import profilepic from './prof.png';
import './style.css';


function mainpage() {

  const firstName = "Firstname";
  const lastName = "Lastname";
  const university = "my university";

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div class="sidenav">
        <br></br>
        <a href="www.google.com">Search</a>
        <a href="www.google.com">My Messages</a>
        <a href="/profilepg">My Profile</a>
        <a href="www.google.com">Logout</a>
        
      </div>
    </div>
  );
}

export default mainpage;