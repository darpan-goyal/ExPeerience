import React, { useState } from "react";
import axios from 'axios';
import { Button, ControlLabel, FormGroup, FormControl, HelpBlock, PageHeader } from "react-bootstrap";
import "../styles/signUp.css";

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameTaken, setUsernameTaken] = useState(false);

  function validateForm() {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      username.length > 0 &&
      password.length >= 8 &&
      firstName.length <= 50 &&
      lastName.length <= 50 &&
      username.length <= 50 &&
      password.length <= 50 &&
      password === confirmPassword
    );
  }

  function validate(field, min, max) {
    if (field.length > max) return "error";
    if (field.length >= min) return "success";
    return null;
  }

  function validatePassword() {
    const length = password.length;
    if (length > 0 && confirmPassword === password) 
      return "success";
    return null;
  }
  
  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
    }

    axios.post('http://localhost:3000/user/add', user)
      .then(res => {
        props.setUserID(res.data._id);
        props.userHasAuthenticated(true);
        props.history.push("/");
      })
      .catch(() => {
        setUsername("");
        setUsernameTaken(true);
      });
  }
  
  return (
    <div className="SignUp">
      <form onSubmit={handleSubmit}>
        <PageHeader>
          Sign Up
        </PageHeader>
        <FormGroup validationState={validate(firstName, 1, 50)}>
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <FormControl.Feedback />
          <HelpBlock>Between 1 and 50 characters</HelpBlock>
        </FormGroup>
        <FormGroup validationState={validate(lastName, 1, 50)}>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <FormControl.Feedback />
          <HelpBlock>Between 1 and 50 characters</HelpBlock>
        </FormGroup>
        <FormGroup validationState={validate(username, 1, 50)}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <FormControl.Feedback />
          <HelpBlock>Between 1 and 50 characters</HelpBlock>
        </FormGroup>
        <FormGroup validationState={validate(password, 8, 50)}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FormControl.Feedback />
          <HelpBlock>Between 8 and 50 characters</HelpBlock>
        </FormGroup>
        <FormGroup validationState={validatePassword()}>
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <FormControl.Feedback />
          <HelpBlock>Match the password above</HelpBlock>
        </FormGroup>
        <Button block bsSize="large" bsStyle="primary" disabled={!validateForm()} type="submit">
          Sign Up
        </Button>
        {
          usernameTaken &&
          <HelpBlock className="help-block-username">
            Username already exists.
          </HelpBlock>
        }
      </form>
    </div>
  );
}