import React, { useState } from "react";
import axios from 'axios';
import { Button, ControlLabel, FormGroup, FormControl, PageHeader } from "react-bootstrap";
import "../styles/login.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return (
      username.length > 0 && 
      password.length > 0 &&
      username.length < 25 &&
      password.length < 25
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      username: username,
      password: password
    };

    axios.post('http://localhost:3000/user/authenticate', user)
      .then(res => {
        props.setUserID(res.data._id);
        props.userHasAuthenticated(true);
        props.history.push("/");
      })
      .catch((error) => {
        alert("Invalid credentials.");
      });
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <PageHeader>Login</PageHeader>
        <FormGroup bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button block bsSize="large" bsStyle="primary" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}