import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavBar from "../../components/user/NavBar";
import {Container, Row, Col, Button, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import '../../helper/stylesheets/MovieSearchPage.css';
import image_Flickity1 from '../../helper/images/HomePage/Flickity1.jpg'
import CommonFooter from "../../components/user/CommonFooter";
import StarRatingComponent from 'react-star-rating-component';
import {history} from "../../helper/others/history";
import theater_Logo from '../../helper/images/Theater.png'
import {alertActions} from "../../action/alert/alert.action";
import {RESTService} from "../../api";
import Alert from 'react-s-alert';
import {withRouter} from "react-router-dom";


const queryString = require('query-string');

class MovieSearchPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies_table: [],
            movie_hall_table: [],
            movies_table_master: [],
            movie_hall_table_master: [],
            ratingType: "All",
            movie_currentPageNumber: 1,
            movie_hall_currentPageNumber: 1,
            itemsPerPage: 3,

        }

    }

    componentWillMount() {
        //willmount will run first time so call API to fetch details
        console.log("componentWillMount");
        var parsed = queryString.parse(this.props.location.search);

        RESTService.searchMovieTitle(parsed.search)
            .then(
                res => {
                    this.setState({movies_table: res.data});
                    this.setState({movies_table_master: res.data});

                    if(res.data.length===0)
                    {
                        Alert.info('No matching Movies!', {
                            position: 'top-right',
                            effect: 'slide',
                            timeout: 3000,

                        });
                    }
                },
                error => {
                    console.log("error");
                    console.log(error);
                }
            );


        RESTService.searchHallTitle(parsed.search)
            .then(
                res => {
                    this.setState({movie_hall_table: res.data});
                    this.setState({movie_hall_table_master: res.data});

                    if(res.data.length===0)
                    {
                        Alert.info('No matching Halls!', {
                            position: 'top-right',
                            effect: 'slide',
                            timeout: 3000,
                        });
                    }

                },
                error => {
                    console.log("error");
                    console.log(error);

                }
            );
    }

    componentWillReceiveProps(nextProps) {
        //this will run every other time so call API to fetch details
        console.log("componentWillReceiveProps");
        var parsed = queryString.parse(nextProps.location.search);

        document.getElementById('Search').value = "";

        this.setState({ratingType: "All", movie_currentPageNumber: 1});

        RESTService.searchMovieTitle(parsed.search)
            .then(
                res => {
                    this.setState({movies_table: res.data});
                    this.setState({movies_table_master: res.data});

                    if(res.data.length===0)
                    {
                        Alert.info('No matching Movies!', {
                            position: 'top-right',
                            effect: 'slide',
                            timeout: 3000,
                        });
                    }

                },
                error => {
                    console.log("error");
                    console.log(error);

                }
            );

        RESTService.searchHallTitle(parsed.search)
            .then(
                res => {
                    this.setState({movie_hall_table: res.data});
                    this.setState({movie_hall_table_master: res.data});

                    if(res.data.length===0)
                    {
                        Alert.info('No matching Halls!', {
                            position: 'top-right',
                            effect: 'slide',
                            timeout: 3000,
                        });
                    }

                },
                error => {
                    console.log("error");
                    console.log(error);

                }
            );


    }

    handleChange_select_movie(event) {
        let temp_array = [], i, j;
        event.preventDefault();
        document.getElementById('Search').value = "";

        this.setState({ratingType: event.target.value, movie_currentPageNumber: 1});
        if (event.target.value === "All") {
            this.setState({movies_table: this.state.movies_table_master});
        }
        else if (event.target.value === "G") {
            temp_array = [];


            j = 0;
            for (i = 0; i < this.state.movies_table_master.length; i++) {
                if (this.state.movies_table_master[i].ratingType === "G") {
                    temp_array[j] = this.state.movies_table_master[i]
                    j++;
                }
            }
            this.setState({movies_table: temp_array});

        }
        else if (event.target.value === "PG") {
            temp_array = [];


            j = 0;
            for (i = 0; i < this.state.movies_table_master.length; i++) {
                if (this.state.movies_table_master[i].ratingType === "PG") {
                    temp_array[j] = this.state.movies_table_master[i]
                    j++;
                }
            }
            this.setState({movies_table: temp_array});

        }
        else if (event.target.value === "PG-13") {
            temp_array = [];


            j = 0;
            for (i = 0; i < this.state.movies_table_master.length; i++) {
                if (this.state.movies_table_master[i].ratingType === "PG-13") {
                    temp_array[j] = this.state.movies_table_master[i]
                    j++;
                }
            }
            this.setState({movies_table: temp_array});

        }
        else if (event.target.value === "R") {
            temp_array = [];


            j = 0;
            for (i = 0; i < this.state.movies_table_master.length; i++) {
                if (this.state.movies_table_master[i].ratingType === "R") {
                    temp_array[j] = this.state.movies_table_master[i]
                    j++;
                }
            }
            this.setState({movies_table: temp_array});

        }
        else if (event.target.value === "NC-17") {
            temp_array = [];


            j = 0;
            for (i = 0; i < this.state.movies_table_master.length; i++) {
                if (this.state.movies_table_master[i].ratingType === "NC-17") {
                    temp_array[j] = this.state.movies_table_master[i]
                    j++;
                }
            }
            this.setState({movies_table: temp_array});

        }

    }

    handleInputChange_tablemovie(e) {
        e.preventDefault();
        this.setState({
            ratingType: "All",
            movie_currentPageNumber: 1,
        });
        console.log(e.target.value);

        var temp_array = [];

        var j = 0;
        for (var i = 0; i < this.state.movies_table_master.length; i++) {
            if (this.state.movies_table_master[i].genre.toLowerCase().includes(e.target.value.toLowerCase())) {
                temp_array[j] = this.state.movies_table_master[i]
                j++;
            }
        }
        this.setState({movies_table: temp_array});
    }

    handleChangePage_movie = (number) => {
        this.setState({
            movie_currentPageNumber: Number(number)
        });
    };

    handleChangePage_movie_hall = (number) => {
        this.setState({
            movie_hall_currentPageNumber: Number(number)
        });
    };


    render() {

        let movie_table;
        const movie_pageNumbers = [];


        if (this.state.movies_table && (this.state.movies_table.length > 0)) {

            const {movie_currentPageNumber, itemsPerPage} = this.state;
            const indexOfLastItem = movie_currentPageNumber * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            movie_table = this.state.movies_table.slice(indexOfFirstItem, indexOfLastItem);


            for (let i = 1; i <= Math.ceil(this.state.movies_table.length / itemsPerPage); i++) {
                movie_pageNumbers.push(i);
            }
        }


        const renderPageNumbers_movie = movie_pageNumbers.map(number => {
            // return (
            //
            //     <PaginationItem className={(this.state.movie_currentPageNumber === number) ? 'active' : ''}>
            //         <PaginationLink onClick={() => this.handleChangePage_movie(number)}>
            //             {number}
            //         </PaginationLink>
            //     </PaginationItem>
            //
            //
            // );
        });
        let movie_hall_table;
        const movie_hall_pageNumbers = [];


        if (this.state.movie_hall_table && (this.state.movie_hall_table.length > 0)) {

            const {movie_hall_currentPageNumber, itemsPerPage} = this.state;
            let indexOfLastItem = movie_hall_currentPageNumber * itemsPerPage;
            let indexOfFirstItem = indexOfLastItem - itemsPerPage;
            movie_hall_table = this.state.movie_hall_table.slice(indexOfFirstItem, indexOfLastItem);


            for (let i = 1; i <= Math.ceil(this.state.movie_hall_table.length / itemsPerPage); i++) {
                movie_hall_pageNumbers.push(i);
            }
        }


        const renderPageNumbers_movie_hall = movie_hall_pageNumbers.map(number => {
            // return (
            //
            //     <PaginationItem className={(this.state.movie_hall_currentPageNumber === number) ? 'active' : ''}>
            //         <PaginationLink onClick={() => this.handleChangePage_movie_hall(number)}>
            //             {number}
            //         </PaginationLink>
            //     </PaginationItem>
            //
            //
            // );
        });


        return (
            <div>
                <div className="home_main_wrap webkit-fill-available">
                    <NavBar/>


                    <Container>
                        <Row><Col>
                        </Col></Row>
                        <br/>
                        <Row><Col xs="3" className={"pl-0"}>
                            <select className="custom-select w-50" value={this.state.ratingType}
                                    onChange={this.handleChange_select_movie.bind(this)}>
                                <option value="All">All</option>
                                <option value="G">G</option>
                                <option value="PG">PG</option>
                                <option value="PG-13">PG-13</option>
                                <option value="R">R</option>
                                <option value="NC-17">NC-17</option>
                            </select>

                        </Col>
                            <Col xs="6">

                            </Col>
                            <Col xs="3" className={"Search pr-0"}>
                                <input
                                    placeholder="Search by genre"
                                    ref={input => this.search = input}
                                    className={'form-control w-75 MovieSearch_searchbar'}
                                    onChange={this.handleInputChange_tablemovie.bind(this)}
                                    id={'Search'}
                                />
                            </Col>
                        </Row>
                    </Container>

                    <Container>


                        <Row className={"MovieSearch_Table_Header"}>
                            <Col>
                                Movies({this.state.movies_table.length})
                            </Col>

                        </Row>

                        {movie_table &&
                        movie_table.map((data) =>

                            <Row className={"MovieSearch_Table"} key={data._id}>
                                <Col xs="2">
                                    <div><img className={"MovieSearch_Table_image"} src={data.image}   onError={(e) => {e.target.src = "/images/default-movie.png"}}/>
                                    </div>
                                </Col>
                                <Col xs="3">
                                    <div>
                                        <a
                                                onClick={(event) => {
                                                    history.push("/movie-detail?movie="+data._id);

                                                }}
                                        ><p><b><span className={"MovieSearch_table_Title"}>{data.title}</span></b></p></a>

                                        <p><em>{data.genre}</em></p>
                                        <p><em>{data.ratingType}</em></p>
                                        <p><StarRatingComponent
                                            name="rate1"
                                            starColor="#ffb400"
                                            emptyStarColor="#000000"
                                            starCount={5}
                                            value={data.rating}
                                        /></p>


                                    </div>
                                </Col>
                                <Col xs="7">
                                    <p> Cast + Crew: {data.characters}</p>
                                    <p> Duration: {data.duration}</p>
                                    <Button color="primary" className={"MovieSearch_BuyTickets"} value={data._id}
                                            onClick={(event) => {
                                                  history.push("/movie-detail?movie="+event.currentTarget.value);

                                            }}
                                    >Buy Tickets</Button>
                                </Col>


                            </Row>
                        )
                        }
                        {
                            (this.state.movies_table.length === 0) &&
                            <Row className={"MovieSearch_Table"} style={{lineHeight: 2}}>
                                <Col>
                                    No movies found!
                                </Col>

                            </Row>
                        }


                    </Container>
                    {movie_table &&
                    <Container>
                        <Row style={{justifyContent:"center"}}>
                            <Pagination>

                                <PaginationItem
                                    className={(this.state.movie_currentPageNumber === 1) ? 'disabled' : ''}>
                                    <PaginationLink previous
                                                    onClick={() => this.handleChangePage_movie((this.state.movie_currentPageNumber - 1))}/>
                                </PaginationItem>


                                {renderPageNumbers_movie}

                                <PaginationItem

                                    className={((Math.ceil(this.state.movies_table.length / this.state.itemsPerPage) === this.state.movie_currentPageNumber)) ? 'disabled' : ''}>
                                    <PaginationLink next
                                                    onClick={() => this.handleChangePage_movie((this.state.movie_currentPageNumber + 1))}/>
                                </PaginationItem>

                            </Pagination>
                        </Row>

                    </Container>
                    }

                    <Container>

                        <Row className={"MovieSearch_Table_Header"}>
                            <Col>
                                Theater({this.state.movie_hall_table.length})
                            </Col>

                        </Row>

                        {movie_hall_table &&
                        movie_hall_table.map((data) =>

                            <Row className={"TheaterSearch_Table"} key={data._id}>
                                <Col xs="4">
                                    <div><img className={"TheaterSearch_Table_image"} src={data.image} onError={(e) => {e.target.src = "/images/default-hall.png"}}/>
                                    </div>
                                </Col>
                                <Col xs="3">
                                    <div>
                                        <p><b><span className={"MovieSearch_table_Title"}>{data.name}</span></b></p>
                                        <p><em><a href={`https://maps.google.com/?q=+${data.address}`}
                                                  target="_blank">{data.address}</a></em></p>
                                        <p><em>{data.phone}</em></p>

                                    </div>
                                </Col>
                                <Col xs="5">
                                    <p> Screens: {data.screenCount}</p>
                                </Col>
                            </Row>
                        )}


                        {
                            (this.state.movie_hall_table.length === 0) &&
                            <Row className={"TheaterSearch_Table"} style={{lineHeight: 2}}>
                                <Col>
                                    No theater found!
                                </Col>

                            </Row>
                        }


                    </Container>

                    {movie_hall_table &&
                    <Container>
                        <Row style={{justifyContent:"center"}}>
                            <Pagination>

                                <PaginationItem
                                    className={(this.state.movie_hall_currentPageNumber === 1) ? 'disabled' : ''}>
                                    <PaginationLink previous
                                                    onClick={() => this.handleChangePage_movie_hall((this.state.movie_hall_currentPageNumber - 1))}/>
                                </PaginationItem>


                                {renderPageNumbers_movie_hall}

                                <PaginationItem
                                    className={((Math.ceil(this.state.movie_hall_table.length / this.state.itemsPerPage) === this.state.movie_hall_currentPageNumber)) ? 'disabled' : ''}>
                                    <PaginationLink next
                                                    onClick={() => this.handleChangePage_movie_hall((this.state.movie_hall_currentPageNumber + 1))}/>
                                </PaginationItem>

                            </Pagination>
                        </Row>

                    </Container>
                    }
                </div>
                <CommonFooter/>
            </div>
        );
    }
}

function mapStateToProps(state) {

    const {user} = state;
    return {
        user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // fetchUser : (email) => dispatch(userDispatch.fetchUser(email))

    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieSearchPage));