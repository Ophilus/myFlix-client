import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    if (movies.length === 0) return <div className="main-view"/>;

    

    


    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
         ))
        }
      </div>
    );
  }
}

export default MainView;