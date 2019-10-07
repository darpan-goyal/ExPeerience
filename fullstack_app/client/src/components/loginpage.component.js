import React, { Component } from 'react';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      showLogin: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.LoginForm = this.LoginForm.bind(this);
    this.RegisterForm = this.RegisterForm.bind(this);
    this.handleSwapPanel = this.handleSwapPanel.bind(this);
  }
  
  // Updates state when user inputs data to text boxes
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  // Handles login and registration submission
  handleSubmit(event) {
    if (this.state.showLogin) {
      console.log("username: " + this.state.username)
      console.log("password: " + this.state.password)
    }
    else {
      console.log("firstName: " + this.state.firstName)
      console.log("lastName: " + this.state.lastName)
      console.log("username: " + this.state.username)
      console.log("password: " + this.state.password)
    }
    // Zero out the state
    this.setState({ firstName: ""  });
    this.setState({ lastName: "" });
    this.setState({ username: "" });
    this.setState({ password: "" });
    event.preventDefault();
  }
  
  // Swaps between login and registration panel
  handleSwapPanel(event) {
    // Zero out the state
    this.setState({ firstName: ""  });
    this.setState({ lastName: "" });
    this.setState({ username: "" });
    this.setState({ password: "" });
    
    // Used in render() when deciding which panel to display
    this.setState({ showLogin: !this.state.showLogin });
    event.preventDefault();
  }
  
  // Login prompt
  LoginForm(props) {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
          />
        <label>Password:</label>
          <input
            type="text"
            name="password"
            onChange={this.handleChange}
          />
        <input type="submit" value="Login" />
      </form>
    );
  }
  
  // Registration prompt
  RegisterForm(props) {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
          />
        <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
          />
        <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
          />
        <label>Password:</label>
          <input
            type="text"
            name="password"
            onChange={this.handleChange}
          />
        <input type="submit" value="Register" />
      </form>
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSwapPanel}>Register/Login</button>
        {this.state.showLogin ? <this.LoginForm /> : <this.RegisterForm />}
      </div>
    );
  }
}
