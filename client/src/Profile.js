import React from 'react';
import ExampleComponent from "react-rounded-image";
import profilepic from './prof.png';
import './style.css';
// or with require syntax


function Profile() {

  var firstName = "Firstname";
  var lastName = "Lastname";
  var university = "my university hello";
  
  
  /* for resume */
  var jobs = ["job1", "job2", "job3"];
  var desc = ["desc1", "desc2", "desc3"];



  var state = false;
  

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

          <Collapsible title="Resume">
          <div> 
            <p>{jobs[0]}</p>
            <p>{desc[0]}</p>
            <p>{jobs[1]}</p>
            <p>{desc[1]}</p>
            <p>{jobs[2]}</p>
            <p>{desc[2]}</p>
          
          </div>
        </Collapsible>

          
        </div>
        <div class="sidenavright">
       <a href = "#"><h2> <span> ✏️</span>  Edit My Profile</h2></a>
       <a href = "#"><h2> <span>🔗</span> Share My Profile </h2></a>
      </div>
       
    
    </div>
  );
}

export default Profile;

class Collapsible extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          open: false
      }
      this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e){
      this.setState({open: !this.state.open})
  }

  componentDidUpdate(){
      
  }

  render() {
    return (<div>
      <div onClick={(e)=>this.togglePanel(e)} className='header'>
          {this.props.title}</div>
      {this.state.open ? (
          <div className='content'>
              {this.props.children}
          </div>
          ) : null}
    </div>);
  }
}
