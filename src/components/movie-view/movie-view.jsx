import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col} from 'react-bootstrap';


export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
      }
    
      componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
      }
    
      componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
      }
    

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="shadow"> 
        <Row>
            <Col>
    <Card.Img variant="top" src={movie.ImagePath} />
    </Col>
    <Col>
    <Card.Body>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Text>{movie.Description}</Card.Text>
      <Button onClick={() => { onBackClick(null); }}>Back</Button>
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
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };