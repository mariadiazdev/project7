import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context//AuthContext"; // Import our custom hook
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.svg";


function NavBar() {
  const { isLoggedIn, logout } = useAuth(); // Grab auth info from context

  const menuItems = {
    loggedIn: ["Home", "Post", "Logout", "Delete Account"],
    loggedOut: ["Login", "Sign Up"]
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <img
            alt="Groupomania Logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Groupomania
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {isLoggedIn
            ? menuItems.loggedIn.map((item, index) => {
                if (item === "Logout") {
                  return (
                    <Nav.Link key={index} as={Button} variant="link" onClick={logout}>
                      {item}
                    </Nav.Link>
                  );
                }
                return (
                  <Nav.Link key={index} as={Link} to={`/${item.toLowerCase().replace(" ", "")}`}>
                    {item}
                  </Nav.Link>
                );
              })
            : menuItems.loggedOut.map((item, index) => (
                <Nav.Link key={index} as={Link} to={`/${item.toLowerCase().replace(" ", "")}`}>
                  {item}
                </Nav.Link>
              ))}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;