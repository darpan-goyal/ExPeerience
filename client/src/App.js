import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./routes";
import "./App.css";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);

  function handleLogout() {
    setUserID(null);
    userHasAuthenticated(false);
    props.history.push("/");
  }
  
  return (
    <div className="App container">
      <Navbar inverse fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">ExPeerience</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        {isAuthenticated
          ? <>
              <Nav pullLeft>
                <LinkContainer to="/projects">
                  <NavItem>Projects</NavItem>
                </LinkContainer>
              </Nav>
              <Nav pullRight>
                <LinkContainer to="/messages">
                  <NavItem>Messages</NavItem>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <NavItem>Profile</NavItem>
                </LinkContainer>
                <NavItem onClick={handleLogout}>Logout</NavItem>
              </Nav>
            </>
          : <>
              <Nav pullRight>
                <LinkContainer to="/signup">
                  <NavItem>Sign Up</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </Nav>
            </>
        }
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated, userID, setUserID }} />
    </div>
  );
}

export default withRouter(App);