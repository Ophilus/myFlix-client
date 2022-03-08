import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col} from 'react-bootstrap';


export class GenreView extends React.Component {
  

  render() {
    const {movies, genre, onBackClick } = this.props;

    return (
      <Card className="shadow"> 
        <Row>
                <Col>
    <Card.Body>
      <Card.Title>{genre.Name}</Card.Title>
      <Card.Text className="font-weight-bold">Description: </Card.Text>
      <Card.Text>{genre.Description}</Card.Text>
      <Row>
                    {movies.map(movie => (
                      <Col md={4}>
                        <Card className="card-content" key={movie._id} >
                            <Card.Img
                                className="fav-poster"
                                variant="top"
                                src={`../${movie.ImagePath}`} />
                            <Card.Body style={{ backgroundColor: "white" }}>
                                <Card.Title className="movie_title">
                                    {movie.Title}
                                </Card.Title>
                            </Card.Body>
                          </Card>
                        </Col>
                    ))}
                </Row>
      <Button onClick={() => { onBackClick(null); }}>Back</Button>
      <Col md={8}>
  </Col>
    </Card.Body>
    
    </Col>
          </Row>
    </Card>
    );
  }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired
  };