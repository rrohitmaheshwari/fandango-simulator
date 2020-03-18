import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import      NavBar              from "../../components/user/NavBar";
import   queryString            from "query-string";
import  { RESTService }         from "../../api";
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';
import    MovieSubNavBar        from "../movie/MovieSubNavBar";
import      moment              from "moment/moment";
import    momentRandom          from "moment-random";
import      DatePicker          from 'react-datepicker';
import  StarRatingComponent     from 'react-star-rating-component';
import      checkoutLoading     from '../../helper/images/temp-movie-details/checkout.gif';
import   { history }            from '../../helper/others/history';
import { withRouter }           from "react-router-dom";
import '../../helper/stylesheets/movie-times.css';
import 'react-datepicker/dist/react-datepicker.css';
import {userConstants} from "../../helper/constants";

class MovieTimesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReviewed      : false,
            halls           : [],
            newHalls        : [],
            isHallsFetched  : false,
            movie           : {},
            showDate        : moment(),
            isCalendarOpen  : false,
            isLoading       : false,
            randomDate      : '',
            priceFilter     : 0,
        }
    }

    componentWillMount(){
        // const user  = this.props.userDetails.user;
        let parsed  = queryString.parse(this.props.location.search);
        let movie_id   = parsed.movie;

        RESTService.fetchHallsByMovieDetails({ movie_id : movie_id })
            .then((response) => {
                console.log("Halls By movie id: ", response.data);
                this.setState({
                    halls: response.data,
                    newHalls: response.data,
                    isHallsFetch: true
                });
            });

        RESTService.fetchMovieDetails({ movie_id : movie_id })
            .then((response) => {
                console.log("Movie details: ", response.data);
                let end = moment();
                let start = moment().add(-30, 'days');
                let randomDate = momentRandom(end, start).format('MMMM D YYYY'); //April 13, 2018
                this.setState({
                    movie: response.data,
                    randomDate: randomDate
                });
            });
    }

    selectShowDate = showDate => this.setState({ showDate });

    handleCheckout (hall, showTime, e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        });


        let checkout = {
            hall     : hall,
            movie    : this.state.movie,
            showDate : this.state.showDate,
            showTime : showTime,
            randomDate: this.state.randomDate
        };

        const {dispatch} = this.props;
        dispatch({ type: "USER_MOVIE_CHECKOUT_SUCCESS" , checkout });

        setTimeout(() => {
            this.setState({
                isLoading: false
            });
            history.push("/movie-checkout");
        }, 1500);

    };

    toggleCalendarDisplay =  (e) => {
        e && e.preventDefault();
        this.setState({isCalendarOpen: !this.state.isCalendarOpen})
    };

    filterByPrice = (event) => {

        event.preventDefault();
        let filter = event.target.value;
        console.log("-----. ", filter);
        this.setState({
           priceFilter:  event.target.value
        });

        let tempHalls = [];

        switch (filter) {
            case "FOUR":
                this.state.halls.map((data) => {
                    if(data.ticketPrice < 4) {
                        tempHalls.push(data);
                    }
                });
                break;
            case "SIX":
                this.state.halls.map((data) => {
                    if(data.ticketPrice >= 4 && data.ticketPrice < 6) {
                        tempHalls.push(data);
                    }
                });
                break;
            case "EIGHT":
                this.state.halls.map((data) => {
                    if(data.ticketPrice >= 6 && data.ticketPrice < 8) {
                        tempHalls.push(data);
                    }
                });
                break;
            case "TEN":
                this.state.halls.map((data) => {
                    if(data.ticketPrice >= 8 && data.ticketPrice < 10) {
                        tempHalls.push(data);
                    }
                });
                break;
            case "ABOVE":
                this.state.halls.map((data) => {
                    if(data.ticketPrice >= 10) {
                        tempHalls.push(data);
                    }
                });
                break;
            default:
                tempHalls = this.state.halls;
                break;
        }

        this.setState({
            newHalls: tempHalls
        });
    };

    render() {

        const { movie, showDate, isCalendarOpen, isLoading, randomDate, newHalls } = this.state;


        let avgRating = 0;
        if(movie.reviews) {
            let totalRating = 0;
            let reviewsSize = movie.reviews.length;
            for(let i = 0; i < reviewsSize; i++) {
                totalRating += movie.reviews[i].rating;
            }
            avgRating = totalRating/ reviewsSize;
        }

        let currentTime = moment();

        let isToday = false;
        if(showDate.format('MMMM D YYYY')===(moment().format('MMMM D YYYY'))) {
            isToday = true;
        }



        return (
            <div className = "movie_overview_wrap" style={{height: "100vh"}}>
                <NavBar/>
                <section className = "movie_overview_section movie_times_section">

                    {
                        isLoading &&
                        <div>
                            <h2 style={{marginLeft: "45%", marginTop: "15%"}}>
                                Please wait...
                            </h2>
                            <img style={{marginLeft: "45%"}} src= { checkoutLoading } alt="Please wait..."/>
                        </div>
                    }

                    {
                        !isLoading &&
                    <Container fluid = { true } className="pl-0 pr-0">
                        <MovieSubNavBar movieName={movie.title} movieId={ movie._id } show={ false }/>

                        <Row className="pb-5 mt-5">
                            <Col md={{ size: 3, offset: 1 }} className="p-0">
                                <section>
                                    <Row className="mr-0 ml-0 movie_video_section">
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

                                {
                                    newHalls.length > 0 &&
                                    <section>
                                        <span className="movie-times-select-show-date" >Select Show Date</span>
                                        <button
                                            className = "btn-date-times"
                                            onClick   = { this.toggleCalendarDisplay }>
                                            { showDate.format("MMMM D YYYY") }
                                        </button>
                                        {
                                            isCalendarOpen && (
                                                <DatePicker
                                                    selected = { showDate }
                                                    onChange = { this.selectShowDate }
                                                    onClickOutside = { this.toggleCalendarDisplay }
                                                    withPortal
                                                    minDate =  { moment() }
                                                    inline />
                                            )
                                        }
                                        <span className="movie-times-select-show-date" >Price Filter</span>
                                        <select className="btn-date-times" value={this.state.priceFilter}
                                                onChange={this.filterByPrice}>
                                            <option value="ALL">All</option>
                                            <option value="FOUR">less than $4</option>
                                            <option value="SIX">$4 to $6</option>
                                            <option value="EIGHT">$6 to $8</option>
                                            <option value="TEN">$8 to $10</option>
                                            <option value="ABOVE">Above $10</option>
                                        </select>
                                    </section>
                                }
                                {
                                    newHalls.length === 0 &&
                                        <section>
                                            <span className="movie-times-select-show-date" >Price Filter</span>
                                            <select className="btn-date-times" value={this.state.priceFilter}
                                                    onChange={this.filterByPrice}>
                                                <option value="ALL">All</option>
                                                <option value="FOUR">less than $4</option>
                                                <option value="SIX">$4 to $6</option>
                                                <option value="EIGHT">$6 to $8</option>
                                                <option value="TEN">$8 to $10</option>
                                                <option value="ABOVE">Above $10</option>
                                            </select>
                                        </section>
                                }
                            </Col>
                            <Col md="6" className="d-block w-100 p-0 ml-4">
                                <section className="movie-times-theatres">

                                    {
                                        newHalls.length > 0 &&
                                        newHalls.map((data, index) =>
                                        <div className="movie-times-box" key={index}>
                                            <div className="movie-times-box-header">
                                                <div className="movie-times-box-header-headline">
                                                    <h3 className="movie-times-headline">{ data.name }</h3>
                                                </div>
                                                <div className="movie-times-address">
                                                    { data.address }
                                                </div>
                                                <div className="movie-times-links">
                                                    <a className="movie-times-link-info"
                                                       href={`https://maps.google.com/?q=+${data.address}`}
                                                       target="_blank">MAPS</a>
                                                </div>
                                            </div>

                                            <ul className="movie-times-box-showtimes">
                                                <li className="movie-times-showtimes">
                                                    <h3 className="movie-times-showtimes-header">
                                                        <i className="fa fa-ticket mr-2" aria-hidden="true"/>
                                                        Select a movie time to buy Standard Showtimes
                                                    </h3>
                                                    <br/>
                                                    <h3 className="movie-times-showtimes-screennumber">
                                                        Screen Number: { data.screenNumber }
                                                    </h3>
                                                    <br/>
                                                    <h3 className="movie-times-showtimes-screennumber">
                                                        Ticket Price: ${ data.ticketPrice }
                                                    </h3>
                                                    <ul className="movie-times-showtimes-amenity">
                                                        <li className="movie-times-showtimes-amenity-item">Accessibility devices available</li>
                                                        <li className="movie-times-showtimes-amenity-item">Reserved seating</li>
                                                    </ul>
                                                    <ol className="movie-times-showtimes-btn">

                                                        {
                                                            data.showTimings.length > 0 &&
                                                            data.showTimings.map((time, index) =>
                                                                    <li className="movie-times-showtimes-btn-item" key={ index }>
                                                                        {
                                                                            !isToday &&
                                                                            <a className="movie-showtimes-btn" onClick={ this.handleCheckout.bind(this, data, time) }> { time }</a>
                                                                        }
                                                                        {
                                                                            isToday &&
                                                                            ((currentTime.format("HH"))>(time.split(':')[0])) &&
                                                                            <a className="movie-showtimes-btn-disabled"> { time }</a>
                                                                        }
                                                                        {
                                                                            isToday &&
                                                                            ((currentTime.format("HH"))<(time.split(':')[0])) &&
                                                                            <a className="movie-showtimes-btn" onClick={ this.handleCheckout.bind(this, data, time) }> { time }</a>
                                                                        }
                                                                    </li>
                                                            )
                                                        }
                                                        {
                                                            data.showTimings.length === 0 &&
                                                                <li className="movie-times-showtimes-btn-item">
                                                                    Show timings not available
                                                                </li>
                                                        }
                                                    </ol>
                                                </li>
                                            </ul>
                                        </div>
                                        )
                                    }

                                    {
                                        newHalls.length === 0 &&
                                        <div className="movie-times-box">
                                            <div className="movie-times-box-header">
                                                <div className="movie-times-box-header-headline">
                                                    <h3 className="movie-times-headline">Movie not available in any theatres</h3>
                                                </div>
                                            </div>
                                        </div>
                                    }


                                </section>
                            </Col>
                        </Row>
                    </Container>
                    }
                </section>

            </div>
        );
    }

}

export default withRouter(connect()(MovieTimesPage));