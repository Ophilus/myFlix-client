import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./registration-view.scss";
import { Form, Button, Card, Row, Navbar, Nav, Container } from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };

    return (
        <div>
      <Navbar expand="lg" bg="#808080" className="mainNavbar">
        <Container>
        <Navbar.Brand href="/">My Flix</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#login">Log in</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
        <Card className="py-4 shadow"> 
        <Row className="justify-content-md-center">
           
       
       <Form >
       <Form.Group controlId="formEmail">
       <Form.Label>Email:</Form.Label>
       <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter an email"/>
     </Form.Group>
     <Form.Group controlId="formUsername">
       <Form.Label>Username:</Form.Label>
       <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter a username" />
     </Form.Group>

     <Form.Group controlId="formPassword">
       <Form.Label>Password:</Form.Label>
       <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter a password" />
     </Form.Group>
     <Button className="m-3" variant="primary" type="submit" onClick={handleSubmit}>
       Submit
     </Button>
   </Form>
   </Row>
   </Card>
   </div>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
      Email: PropTypes.string.isRequired,
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired
    })
  };