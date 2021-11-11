import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router";

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useNavigate();
  const logout = () => {
    history("/");
    setUser(null);
    localStorage.clear();
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Example</Nav.Link>
          </Nav>
          
          <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
