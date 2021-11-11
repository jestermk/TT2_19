import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useNavigate();
  const location = useLocation()
  const logout = () => {
    history("/");
    setUser(null);
    localStorage.clear();
  };
  useEffect(() => {
    //const token = user?.token;

    //if (token) {
    //  const decodedToken = decode(token);

    //  if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    //}

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Example</Nav.Link>
          </Nav>
          {user && <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>}
          
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
