import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from 'react-bootstrap';

import axios from 'axios';

import { Link } from "react-router-dom";




export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      favoriteMoviesId: []
    }
  }

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.getData(token);
    //console.log(this.props.movie._id)
    console.log(this.state)

    // if(this.props.movie._id)
  }


  getData(token) {
    const username = localStorage.getItem("user");
    axios.get(`https://movieapi-1823.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          favoriteMoviesId: response.data.FavoriteMovies,
        });
        if (this.state.favoriteMoviesId.indexOf(this.props.movie._id) != -1) {
          document.getElementById('favoriteBtn').innerHTML = "Remove from favorite";
        } else {
          document.getElementById('favoriteBtn').innerHTML = "Add to favorite";
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  addFavorite = (e, _id) => {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem("token");
    if (e.target.innerHTML == "Remove from favorite") {
      axios.delete(
        `https://movieapi-1823.herokuapp.com/users/${username}/movies/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          console.log(response);
          alert("Movie removed");
          e.target.innerHTML = "Add to favorite"
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (e.target.innerHTML == "Add to favorite") {
      axios.post(
        `https://movieapi-1823.herokuapp.com/users/${username}/movies/${_id}`,
        {
          favoriteMoviesId: _id
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          console.log(response);
          console.log(e.target.innerHTML);
          alert("Movie Added");
          e.target.innerHTML = "Remove from favorite"
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  };


  render() {
    const { movie, onBackClick } = this.props;
    console.log(movie.ImagePath);
    return (
      <Card className="shadow">
        <Row>
          <Col>
            <Card.Img variant="top" src={`${movie.ImagePath}`} alt="movieItem" />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Card.Text>Director: <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link></Card.Text>
              <Card.Text>Genre: <Link to={`/genre/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link></Card.Text>
              <Button onClick={() => { onBackClick(null); }}>Back</Button>
              <Button id="favoriteBtn" className="ml-2" variant="danger" value={movie._id} onClick={(e) => this.addFavorite(e, movie._id)}>Add to favorite</Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};