import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavbarView } from '../navbar-view/navbar-view';

import { ProfileView } from '../profile-view/profile-view';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  getMovies(token) {
    axios.get('https://movieapi-1823.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    let { movies } = this.props;
    const { user } = this.state;


    return (
      <Router>
        <NavbarView user={user} />
        <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return <MoviesList movies={movies}/>;
        }} />
        <Route path="/movies/:movieId" render={({ match, history }) => {
          if (!user) return <Redirect to="/" />
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route path="/genre/:name" render={({ match, history }) => {
          if (!user) return <Redirect to="/" />
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies.filter(movie => movie.Genre.Name === match.params.name)} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route path="/directors/:name" render={({ match, history }) => {
          if (!user) return <Redirect to="/" />
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies.filter(movie => movie.Director.Name === match.params.name)} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route path="/users/:username" render={({ match, history }) => {
         
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <ProfileView history={history} movies={movies} user={user === match.params.username} />
          </Col>
        }} />
        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <RegistrationView />;
        }} />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);;