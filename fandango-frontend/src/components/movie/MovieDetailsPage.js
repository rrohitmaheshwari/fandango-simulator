import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { Container, Row, Col }  from 'reactstrap';
import      NavBar              from "../../components/user/NavBar";
import    MovieSubNavBar        from "../movie/MovieSubNavBar";
import      Flickity            from 'react-flickity-component';
import      rampage             from "../../helper/images/temp-movie-details/Rampage.jpg";
import    queryString           from 'query-string';
import      moment              from 'moment';
import    momentRandom          from 'moment-random';
import { RESTService }          from "../../api";
import StarRatingComponent      from 'react-star-rating-component';
import      Alert               from 'react-s-alert';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
}                               from 'reactstrap';
import '../../helper/stylesheets/movie-detail.css';
import {withRouter} from "react-router-dom";



class MovieDetailsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReviewed      : false,
            openReviewModal : false,
            reviewedRating  : 0,
            reviewedTitle   : '',
            reviewedComment : '',
            movie           : {},
            isFetched       : false
        }
    }

    componentWillMount(){
        // const user  = this.props.userDetails.user;
        let parsed  = queryString.parse(this.props.location.search);
        let movie_id   = parsed.movie;

        RESTService.fetchMovieDetails({ movie_id : movie_id })
            .then((response) => {
                console.log("Movie: ", response.data);
                this.setState({
                    movie: response.data,
                    isReviewed: response.data.reviews.length > 0,
                    isFetched : true
                });
            });
    }

    toggleReviewModal = () => {
        this.setState({
            openReviewModal: !this.state.openReviewModal
        });

    };

    saveReview = (event) => {

        event.preventDefault();

        const user = this.props;

        const movieReview = {
            movie_id: this.state.movie._id,
            email   : this.props.user.email,
            name    : this.props.user.firstname + " " + this.props.user.lastname,
            rating  : this.state.reviewedRating,
            title   : this.refs.writeTitle.value,
            comment : this.refs.writeComment.value
        };

        RESTService.saveReview(movieReview)
            .then((response) => {
                console.log(response.data);
                let movie_id = this.state.movie._id;
                Alert.success( "Review posted successfully", {
                    position: 'top-right',
                    effect: 'slide',
                    timeout: 2000,
                    onClose: function () {
                        window.location.reload();
                    }
                });
            })
            .catch((error) => {
                Alert.error( "Review update failed! Please try again later.", {
                    position: 'top-right',
                    effect: 'slide',
                    timeout: 5000
                });
             });

        this.toggleReviewModal();
    };

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ reviewedRating : nextValue });
    };

    render() {

        const flickityOptions = {
            initialIndex: 0,
            autoPlay: true
        };

        const { movie, isFetched, isReviewed, openReviewModal } = this.state;

        let avgRating = 0;
        if(movie.reviews) {
            let totalRating = 0;
            let reviewsSize = movie.reviews.length;
            for(let i = 0; i < reviewsSize; i++) {
                totalRating += movie.reviews[i].rating;
            }
            avgRating = totalRating/ reviewsSize;
        }

        let randomDate = '';
        if(isFetched) {
            let end = moment();
            let start = moment().add(-30, 'days');
            randomDate = momentRandom(end, start).format('MMMM D YYYY'); //April 13, 2018
        }

        //movie-detail?movie=OBJECT_ID
        return (
            <div className = "movie_overview_wrap">
                <NavBar/>
                <section className = "movie_overview_section movie_video_section">
                    <Container fluid = { true }>
                        <MovieSubNavBar movieName={movie.title} movieId={ movie._id } show={ true }/>
                        <Row className="pb-5">
                            <Col md={{ size: 3, offset: 1 }} className="p-0">
                                <section>
                                    <Row className="mr-0 ml-0">
                                        <Col md="6" className="movie_left_image_container pl-0 pr-0">
                                            <img className="movie_left_image" src={ movie.image }></img>
                                        </Col>
                                        <Col md="6">
                                            <ul className="movie_left_detail">
                                                <li className="mt-2">Released</li>
                                                <li className="mt-2 movie_left_date">{ randomDate }</li>
                                                <li className="mt-2">
                                                    { movie.ratingType },&nbsp;
                                                    { movie.duration }  mins
                                                </li>
                                                <li className="mt-2">{ movie.genre }</li>
                                                <li className="mt-2">
                                                    <StarRatingComponent
                                                        name="movie_overview_rate"
                                                        renderStarIcon={() => <i className="fa fa-star" aria-hidden="true"></i> }
                                                        starColor="#ffb400"
                                                        emptyStarColor="#000000"
                                                        starCount={5}
                                                        value={ avgRating }
                                                    />
                                                </li>
                                                <li className="mt-2">
                                                    { movie.reviews && movie.reviews.length } Fan Ratings
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </section>

                            </Col>
                            <Col md="6" className="d-block w-100 p-0">
                                <iframe className="movie_media_player" width="100%" height="100%" allowFullScreen={true}
                                        src={ movie.trailerLink } frameBorder="0"  />
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section id="CastCrew" className = "movie_overview_section">
                    <Container fluid = { true }>
                        <Row>
                            <Col md={{ size: 10, offset: 1 }} >
                                <h3 className="movie_cast">Cast + Crew</h3>
                                <Flickity
                                    className="movie_cast_carousel" // default ''
                                    elementType={'div'} // default 'div'
                                    options={flickityOptions} // takes flickity options {}
                                    disableImagesLoaded={false} // default false
                                    reloadOnUpdate // default false
                                >
                                    {
                                        isFetched &&
                                        movie.characters.split(",").map((data, index) =>
                                            <div className="movie_cast_flick_cell" key={index}>
                                                <p className="movie_cast_flick_cell_text">{ data }</p>
                                            </div>
                                        )
                                    }
                                </Flickity>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section id="Reviews" className = "movie_overview_section">
                    <Container fluid = { true }>
                        <Row>
                            <Col md={{ size: 10, offset: 1 }} >
                                <div className="movie-reviews-header">
                                    <h3 className="movie_cast">Fan Reviews</h3>
                                </div>
                                <div className="movie-reviews-content">
                                    <div className="movie-reviews-content-top"></div>
                                    <div>
                                        <ul className="movie-reviews-content-list">

                                            {
                                                !isReviewed &&
                                                <li>
                                                    <div className="movie-reviews-content-no-comment">
                                                        No reviews for this movie yet!
                                                    </div>
                                                </li>
                                            }

                                            {
                                                isReviewed &&
                                                movie.reviews.map((data, index) =>
                                                    <li className="movie-reviews-content-cell" key={index}>
                                                        <Row>
                                                            <StarRatingComponent
                                                                name = {index+""}
                                                                editing={false}
                                                                renderStarIcon={() => <i className="fa fa-star fa-2x" aria-hidden="true"/> }
                                                                starColor="#F05825"
                                                                emptyStarColor="#000000"
                                                                starCount={5}
                                                                value={data.rating}
                                                            />
                                                        </Row>
                                                        <Row>
                                                            <div className="movie-review-headline">
                                                                {data.title}
                                                            </div>
                                                        </Row>
                                                        <Row>
                                                            <div className="movie-review-username">
                                                                By {data.name}
                                                            </div>
                                                        </Row>
                                                        <Row>
                                                            <div className="movie-review-comment">
                                                                {data.comment}
                                                            </div>
                                                        </Row>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <div className="movie-reviews-content-bottom"></div>
                                </div>
                                <a className="movie-reviews-footer" onClick={ this.toggleReviewModal }>
                                    Tell us what you think
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <Modal isOpen={ openReviewModal } toggle={ this.toggleReviewModal }>
                    <div className="modal-content review-size">
                        <ModalHeader toggle={ this.toggleReviewModal }>
                            Reviews + Ratings
                        </ModalHeader>

                        <ModalBody>

                            <section className="movie-write-review">
                                <Row>
                                    <h2 className="movie-write-review-rating">
                                        Please rate this movie from 1-5 stars
                                    </h2>
                                    <StarRatingComponent
                                        name="movie_write_rate"
                                        renderStarIcon={() => <i className="fa fa-star" aria-hidden="true"></i> }
                                        starColor="#ffb400"
                                        emptyStarColor="#000000"
                                        starCount={5}
                                        onStarClick={ this.onStarClick }
                                    />
                                </Row>
                                <hr className="movie-write-breakline"></hr>
                                <Row>
                                    <h2 className="movie-write-review-rating">
                                        Write Review
                                    </h2>
                                </Row>

                                <Row>
                                    <section className="movie-write-group w-100">
                                        <label className="movie-write-group-label" htmlFor="titleBox">Title:</label>
                                        <input className="form-control w-100 movie-write-title-input"
                                               type="text"
                                               id="titleBox" ref="writeTitle"
                                        />
                                    </section>
                                </Row>

                                <Row>
                                    <section className="movie-write-group w-100">
                                        <label className="movie-write-group-label" htmlFor="commentBox">Body:</label>
                                        <textarea className="form-control w-100 movie-write-comment"
                                                  name="skillsText"
                                                  rows={3} cols={200}
                                                  id="commentBox" ref="writeComment"
                                        >
                                    </textarea>
                                    </section>
                                </Row>

                            </section>

                        </ModalBody>

                        <ModalFooter>
                            <a className="movie-review-cancel" onClick={ this.toggleReviewModal }>Cancel</a>
                            <Button className="movie-review-save" onClick={ this.saveReview }>Save Review</Button>{' '}
                        </ModalFooter>
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {

    const { user } = state.authentication;
    return {
        user
    };
}

export default withRouter(connect(mapStateToProps, null)(MovieDetailsPage));