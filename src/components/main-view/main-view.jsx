import React from 'react';
import axios from 'axios';
import { Col, Row, Navbar, Nav, Container } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import '../../img/forrestgump.jpg';
import '../../img/Inception.jpg';
import '../../img/Interstellar.jpg';
import '../../img/lockstockandtwosmokingbarrels.jpg';
import '../../img/lotrthefellowshipofthering.jpg';
import '../../img/lotrthereturnoftheking.jpg';
import '../../img/lotrthetwotowers.jpg';
import '../../img/silenceofthelambs.jpg';
import '../../img/thegreenmile.jpg';
import '../../img/theshawshankredemption.jpg';


export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount(){
    axios.get('https://movieapi-1823.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
        user
    });
}

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <div>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    </div>;
    if (movies.length === 0) return <div className="main-view"/>;

    

    


    return (
      <div>
      <Navbar expand="lg" bg="#808080" className="mainNavbar">
        <Container>
        <Navbar.Brand href="/">My Flix</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#update-profile">Update Profile</Nav.Link>
            <Nav.Link href="#logout">Logout</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
      <Row className="py-4 main-view justify-content-md-center">
    {selectedMovie
      ? (
        <Col md={8}>
          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
        </Col>
      )
      : movies.map(movie => (
        <Col md={3}>
          <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        </Col>
      ))
    }
  </Row>
  </div>
    );
  }
}

export default MainView;