import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import "./registration-view.scss";
import { Form, Button, Card, Row, Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validate = () => {
    let isReq = true;
    const regEx = /^[0-9a-zA-Z]+$/;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    } else if (!username.match(regEx)) {
      setUsernameErr('Username contains non alphanumeric characters - not allowed');
    } else {
      setUsernameErr('Ok');
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    } else {
      setPasswordErr('Ok');
    }
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email is not suitable. I do not see "@"');
      isReq = false;
    } else {
      setEmailErr('Ok');
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onLoggedIn(username);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://movieapi-1823.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
    }
  };

  return (
    <Card className="py-4 shadow">
      <Row className="justify-content-md-center">


        <Form >

          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter a username" />
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter a password" />
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter an email" />
            {emailErr && <p>{emailErr}</p>}
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date of birth:</Form.Label>
            <Form.Control type="date" onChange={e => setBirthday(e.target.value)} placeholder="Enter your date of birth" />
          </Form.Group>
          <Button className="m-3" variant="primary" type="submit" onClick={handleRegister}>
            Submit
          </Button>
        </Form>
      </Row>
    </Card>

  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Email: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Date: PropTypes.string.isRequired
  })
};