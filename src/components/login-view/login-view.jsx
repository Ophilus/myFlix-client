import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, Row, Navbar, Nav, Container } from 'react-bootstrap';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
      <div>
      <Navbar expand="lg" bg="#808080" className="mainNavbar">
        <Container>
        <Navbar.Brand href="/">My Flix</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#register">Sign up</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
        <Card className="py-4 shadow"> 
         <Row className="justify-content-md-center">
            
        
        <Form >
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter a username" required />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter a password" required />
      </Form.Group>
      
      <Button className="m-3" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      
    </Form>
    </Row>
    </Card>
    </div>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };