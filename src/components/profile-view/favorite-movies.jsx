import React from "react";
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './profile-view.scss'

function FavoriteMovies({ movies, favoriteMoviesId, removeFavorite }) {
    return (
        <>
            <Row >
                <Col xs={12}>
                    <h4> Favorite Movies</h4>
                </Col>
            </Row>
            <Row className="ml-4">

                {favoriteMoviesId.length === 0 && (
                    <div className="text-center">No Favorite Movies</div>
                )}
                
                    {favoriteMoviesId.length > 0 &&
                        movies.map(({ ImagePath, Title, _id}) => {
                            if (
                                _id ===
                                favoriteMoviesId.find((fMovie) => fMovie === _id)
                            ) {
                                return (
                                    <Col xs={12} md={6} lg={5} key={_id} >
                                        <Card className="favorite-movie card-content" >
                                        <Link to={`/movies/${_id}`}>
                                            <Card.Img
                                                className="fav-poster"
                                                variant="top"
                                                src={`../${ImagePath}`}
                                            />
                                            <Card.Body style={{ backgroundColor: "white" }}>
                                                
                                                    <h4 className="movie_title">
                                                        {Title}
                                                    </h4>
                                                
                                                <Button size="sm" variant="danger" value={_id} onClick={(e) => removeFavorite(e, _id)}>Remove</Button>
                                            </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col>
                                );
                            }
                        })}
                


            </Row>
        </>
    )
}

export default FavoriteMovies