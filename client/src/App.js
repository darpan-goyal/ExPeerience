import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./routes/routes.js";
import "./App.css";

function App(props) {
  const _authenticated = () => window.localStorage.getItem("authenticated") || false;
  const _userID = () => window.localStorage.getItem("userID") || null;

  const [isAuthenticated, userHasAuthenticated] = useState(_authenticated);
  const [userID, setUserID] = useState(_userID);

  useEffect(() => {
    if (isAuthenticated) {
      window.localStorage.setItem("authenticated", isAuthenticated);
      window.localStorage.setItem("userID", userID);
    }
  });

  function handleLogout() {
    setUserID(null);
    userHasAuthenticated(false);
    window.localStorage.clear();
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
          <Nav pullLeft>
            <LinkContainer to="/browse">
              <NavItem>Browse</NavItem>
            </LinkContainer>
          </Nav>
          {isAuthenticated
            ? <>
                <Nav pullRight>
                  <LinkContainer to="/projects">
                    <NavItem>Projects</NavItem>
                  </LinkContainer>
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