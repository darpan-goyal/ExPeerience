import React from 'react';
import ExampleComponent from "react-rounded-image";
import Collapsible from 'react-collapsible';
import profilepic from './prof.png';
import './style.css';
import Collapse from '@kunukn/react-collapse';
// or with require syntax


function App() {

  const firstName = "Firstname";
  const lastName = "Lastname";
  const university = "my university hello";
  const Collapse = require('@kunukn/react-collapse');
  

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div class="sidenav">
        <br></br>
        <a href="www.google.com">Search</a>
        <a href="www.google.com">My Messages</a>
        <a href="www.google.com">My Profile</a>
        <a href="www.google.com">Logout</a>
      </div>
        <div align = "center" width="80%">  
          <br></br>
          <ExampleComponent image = {profilepic}></ExampleComponent>
          <h1>
            {firstName} {lastName}
          </h1>
          <h2>
            {university}
          </h2>

          <h3> Bio will go here... blah blah blah blah blah</h3>
          <div align = "center" width = "100%">
            <ul class="tags" > {/* need to make this so it reads from a list basically*/}
              <div float = "left">
              <li><a class="tag">Java</a></li>
              <li><a class="tag">Python</a></li>
              <li><a class="tag">JavaScript</a></li>
              </div>
            </ul>
          </div>
          <Collapse collapseHeight="50px">
            <p>A long paragraph of text inside an article element</p>
          </Collapse>
        </div>
        <div class="sidenavright">
       <a href = "#"><h2> <span> ✏️</span>  Edit My Profile</h2></a>
       <a href = "#"><h2> <span>🔗</span> Share My Profile </h2></a>
      </div>
       
    
    </div>
  );
}

export default App;
