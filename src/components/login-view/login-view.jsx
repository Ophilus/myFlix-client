import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, Row, Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
  

    const validate = () => {
      let isReq = true;
      const regEx = /^[0-9a-zA-Z]+$/;
      if(!username){
       setUsernameErr('Username Required');
       isReq = false;
      }else if(username.length < 5){
       setUsernameErr('Username must be 5 characters long');
       isReq = false;
      }else if(!username.match(regEx)){
        setUsernameErr('Username contains non alphanumeric characters - not allowed');
      }else{
        setUsernameErr('Ok');
      }
      if(!password){
       setPasswordErr('Password Required');
       isReq = false;
      }else if(password.length < 6){
       setPasswordErr('Password must be 6 characters long');
       isReq = false;
      }else{
        setPasswordErr('Ok');
      }
  
      return isReq;
  }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
  if(isReq) {
        axios.post('https://movieapi-1823.herokuapp.com/login', {
          Username: username,
          Password: password
        })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
      }
      };

    return (
        <Card className="py-4 shadow"> 
         <Row className="justify-content-md-center">
            
        
        <Form >
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter a username" required />
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter a password" required />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      
      <Button className="m-3" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      
    </Form>
    </Row>
    </Card>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };