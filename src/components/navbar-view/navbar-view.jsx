import React from 'react'

import { Navbar, Nav, Container ,Button} from 'react-bootstrap';


export function NavbarView ({user}){
  
    const onLoggedOut = () => {
      localStorage.clear();
      window.open("/", "_self");
    };

    const isAuth = () => {
        if (typeof window == "undefined"){
          return false;
        }
        if (localStorage.getItem("token")) {
          return localStorage.getItem("token");
        } else {
          return false;
        }
      };
    
      

return (

<Navbar bg="light" expand="lg">
  <Container className="navbar-menu">
    <Navbar.Brand href="/">myFlix</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto ">
       {isAuth() && (<Nav.Link id="Account" href={`/users/${user}`}>My Account</Nav.Link>)}
       {isAuth() && (<Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>)}

        {!isAuth() && (<Nav.Link href="/">Log in</Nav.Link>)}
        {!isAuth() && (<Nav.Link href="/register">Sign up</Nav.Link>)}
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

        );
      }
       