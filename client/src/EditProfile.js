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
          
          <button> Change Picture </button>
          <br/><br/>
          <input placeholder = {firstName} type="text"/>
          <br/><br/>
          <input placeholder = {lastName} type="text"/>
          <br/><br/>
          <input placeholder = {university} type="text"/>
          <br/><br/>
          <input placeholder = "bio" type="text"/>
          <br/><br/>

          <select >
            <option>Java</option>
            <option>Python</option>
            <option>Java</option>
            <option>Python</option>
            <option>Java</option>
            <option>Python</option>
            <option>Java</option>
            <option>Python</option>
          </select>
          <button> Add to tags </button>

          <br/>
          <select >
            <option>choice1</option>
            <option>choice2</option>
            <option>choice3</option>
           
          </select>
          <button> Remove from tags </button>


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
          <button> Upload New Resume </button>
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
