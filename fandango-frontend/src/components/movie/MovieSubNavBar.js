import React, {Component}       from 'react';
import { Row, Col }             from 'reactstrap';
import      * as Scroll         from 'react-scroll';
import      { Link }            from 'react-scroll';
import  { history }               from '../../helper/others/history.js';
import '../../helper/stylesheets/movie-detail-navbar.css';

class MovieSubNavBar extends Component {

    goToMovie = () => {
        let movie_id = this.props.movieId;
        //movie-detail?movie=OBJECT_ID
        let movieDetailPage = "/movie-detail?movie=";
        history.push(movieDetailPage + movie_id);
    };

    goToTimes = () => {
        let movie_id = this.props.movieId;
        //movie-times?movie=OBJECT_ID
        let movieTimesPage = "/movie-times?movie=";
        history.push(movieTimesPage + movie_id);
    };

    render() {
        let Link = Scroll.Link;
        return (

            <section className="movie_navbar">
                <Row>
                    <Col md="1" className="p-0"></Col>
                    <Col md="11" className="p-0">
                        <h1 className="movie_navbar_title">
                            { this.props.movieName }
                        </h1>
                        <ul className="movie_navbar_link-list">
                            {/*href="/movie_id/movie-times"*/}
                            <li className="movie_navbar_link-item">
                                <a className="movie_navbar_link-item_info" onClick={this.goToMovie}>
                                    Overview
                                </a>
                            </li>
                            <li className="movie_navbar_link-item">
                                <a className="movie_navbar_link-item_info" onClick={this.goToTimes}>
                                    Movie Times + Tickets
                                </a>
                            </li>
                            {
                                this.props.show &&
                                <li className="movie_navbar_link-item movie_navbar_link-item_info">
                                    <Link activeClass="active" to="CastCrew" spy={true} smooth={true} offset={0} duration={500}>
                                        Cast+Crew
                                    </Link>
                                </li>
                            }
                            {
                                this.props.show &&
                                <li className="movie_navbar_link-item movie_navbar_link-item_info" >
                                    <Link activeClass="active" to="Reviews" spy={true} smooth={true} offset={50} duration={500}>
                                        Reviews
                                    </Link>
                                </li>
                            }
                        </ul>
                    </Col>
                </Row>
            </section>

        );
    }
}


export default MovieSubNavBar;