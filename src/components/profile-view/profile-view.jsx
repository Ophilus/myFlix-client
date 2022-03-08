import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Button, Card, Row, Col, Form} from 'react-bootstrap';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import { useEffect, useState } from 'react';



export class ProfileView extends React.Component{
  constructor() {
    super();
    this.state = {
      Username: '',
      Password: '',
      Email: '',
      Birthday: '',
      favoriteMoviesId: []
    }
  }
  
componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getData(accessToken);
}

  getData(token) {
    const username = localStorage.getItem("user");
    axios.get(`https://movieapi-1823.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday.split('T')[0],
                    favoriteMoviesId: response.data.FavoriteMovies,
                });

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  editData = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
        .put(`https://movieapi-1823.herokuapp.com/users/${username}`,
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
            });

            localStorage.setItem('user', this.state.Username);
            alert("Data updated");
            window.open('/users/:username', '_self');
        })
        .catch(function (error) {
            console.log(error);
        });
};

removeFavorite = (e, _id) => {
  e.preventDefault();
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  axios
      .delete(
          `https://movieapi-1823.herokuapp.com/users/${username}/movies/${_id}`,
          {
              headers: { Authorization: `Bearer ${token}` },
          }
      )
      .then((response) => {
          console.log(response);
          alert("Movie removed");
          this.componentDidMount();
      })
      .catch(function (error) {
          console.log(error);
      });
};

deleteUser(e) {
  e.preventDefault();
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  axios
      .delete(`https://movieapi-1823.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
          console.log(response);
          alert("Profile deleted");
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.open('/', '_self');
      })
      .catch(function (error) {
          console.log(error);
      });
}
setUsername(value) {
  this.setState({
      Username: value,
  });
}

setPassword(value) {
  this.setState({
      Password: value,
  });
}

setEmail(value) {
  this.setState({
      Email: value,
  });
}

render(){
  const { movies, onBackClick} = this.props;
  const {favoriteMoviesId, Password, Username, Email, Birthday } = this.state;
  console.log(favoriteMoviesId)
    return (
      <Container className="profile-view" align="center">
      <Card className="shadow">
        <Row className="justify-content-md-center">
          <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={Username} email={Email} birthday={Birthday}/> 
            </Card.Body> 
          </Card>
          
          </Col>
          <Col xs={12} sm={6}>
          <Card>
            <Card.Body>
            <Form className="profile-form" >
           <h2>Want to change some info?</h2>
           <Form.Group>
           <Form.Label>Username:</Form.Label>
           <Form.Control 
            type="text" 
            name="Username"
            placeholder="New Username"
            onChange={(e) => this.setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group>
            <Form.Label>Password:</Form.Label>
           <Form.Control 
            type="text" 
            name="Password"
            placeholder="New Password"
            onChange={(e) => this.setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group >
            <Form.Label>Email:</Form.Label>
           <Form.Control 
            type="text" 
            name="Email"
            placeholder="Enter Email"
            onChange={(e) => this.setEmail(e.target.value)}/>
            </Form.Group>
            <Button className="mt-3" variant='outline-primary' type='submit' onClick={this.editData}>Update</Button>
            <Button className="mt-3 ml-3" variant='outline-danger' onClick={this.deleteUser}>Delete User</Button>
        </Form>
            </Card.Body> 
          </Card>
          
          </Col>
        </Row>
       
        <FavoriteMovies movies={movies} favoriteMoviesId={favoriteMoviesId} removeFavorite={this.removeFavorite}/>
    </Card>
    
            </Container>
    );
  }
}