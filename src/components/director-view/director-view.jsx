import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col} from 'react-bootstrap';


export class DirectorView extends React.Component {
    

  render() {
    const {movies, director, onBackClick } = this.props;

    return (
      <Card className="shadow"> 
        <Row>
                <Col>
    <Card.Body>
      <Card.Title>{director.Name}</Card.Title>
      <Card.Text className="font-weight-bold">Biography:</Card.Text>
      <Card.Text>{director.Bio}</Card.Text>
      <Card.Text className="font-weight-bold">Born in: </Card.Text>
      <Card.Text>{director.Birth}</Card.Text>
      <Row md={3} className="justify-content-md-center">
      
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
    </Card.Body>
    </Col>
          </Row>
    </Card>
    );
  }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }).isRequired
  };