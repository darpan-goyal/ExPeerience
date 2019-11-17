import React, { useState } from "react";
import axios from 'axios';
import { Button, ControlLabel, FormGroup, FormControl, HelpBlock, PageHeader } from "react-bootstrap";
import "../styles/login.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [notAuthorized, setNotAuthorized] = useState(false);

  function validateForm() {
    return (
      username.length > 0 && 
      password.length > 0 &&
      username.length <= 50 &&
      password.length <= 50
    );
  }

  function validate(field, max) {
    if (field.length > max) return "error";
    return null;
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
      .catch(() => {
        setUsername("");
        setPassword("");
        setNotAuthorized(true);
      });
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <PageHeader>Login</PageHeader>
        <FormGroup bsSize="large" validationState={validate(username, 50)}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup bsSize="large" validationState={validate(password, 50)}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button block bsSize="large" bsStyle="primary" disabled={!validateForm()} type="submit">
          Login
        </Button>
        {
          notAuthorized &&
          <HelpBlock className="help-block-credentials">
            Invalid credentials.
          </HelpBlock>
        }
      </form>
    </div>
  );
}