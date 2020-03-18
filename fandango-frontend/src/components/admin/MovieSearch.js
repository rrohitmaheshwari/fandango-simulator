import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../helper/stylesheets/AdminMovieSearch.css';
import NavBar from "../../components/user/NavBar";
import {Container, Row, Col, Button} from 'reactstrap';
import image_Flickity1 from '../../helper/images/HomePage/Flickity1.jpg'
import StarRatingComponent from 'react-star-rating-component';
import {adminActions} from "../../action/admin/admin.action";
import {history} from "../../helper/others/history";
import AdminNavBar from "./AdminNavBar";


class MovieSearch extends Component {

    constructor(props) {
        super(props);

        this.state={
            movies:[]
        }

    }

    componentWillMount() {

        this.props.fetchMovies()

    }

    handleInputChange_tablemovie(e) {
        e.preventDefault();
        console.log(e.target.value);

        var temp_array = [];

        let {movies} = this.props;

        var j = 0;
        for (var i = 0; i < movies.length; i++) {
            if (movies[i].title.toLowerCase().includes(e.target.value.toLowerCase())) {
                temp_array[j] = movies[i]
                j++;
            }
        }
        this.setState({movies: temp_array});
    }



    render() {
        //
        // if(!this.props.loadingMovies)
        //     this.setState({movies:this.props.movies})

        let {movies}=this.state;

        if(this.search && this.search.value==="")
            movies=this.props.movies;

            return (

            <div className={'admin_movie_main_wrap'}>
                <AdminNavBar/>


                <Container>
                    <Row><Col>
                    </Col></Row>
                    <br/>
                    <Row>
                        <Col xs="3">
                            <input
                                placeholder="Search by name"
                                ref={input => this.search = input}
                                className={'AdminMovieSearch_searchbar form-control'}
                                onChange={this.handleInputChange_tablemovie.bind(this)}
                                id={'Search'}
                            />
                        </Col>
                    </Row>
                </Container>

                <Container>


                    <Row className={"AdminMovieSearch_Table_Header"}>
                        <Col>
                            Movies({movies.length})
                        </Col>

                    </Row>

                    {movies &&
                    movies.map((data) =>

                        <Row className={"AdminMovieSearch_Table"} key={data._id}>
                            <Col xs="2">
                                <div><img className={"img-fluid"} src={data.image} alt={""}/></div>
                            </Col>
                            <Col xs="3">
                                <div>
                                    <p><b><span className={"AdminMovieSearch_table_Title"}>{data.title}</span></b></p>
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
                                <Button color="primary" className={"AdminMovieSearch_BuyTickets"} value={data._id}
                                        onClick={(event) => {
                                             history.push("/admin/edit_movie/"+data._id);
                                            console.log(event.currentTarget.value);
                                        }}
                                >Edit</Button>
                            </Col>
                        </Row>
                    )}
                    {
                        (movies.length === 0) &&
                        <Row className={"AdminMovieSearch_Table"}>
                            <Col>
                                No movies found!
                            </Col>

                        </Row>
                    }


                </Container>



            </div>

        );
    }

}



function mapStateToProps(state) {

    const {user} = state;
    const {movies}=state.admin;
    return {
        user,
        movies,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovies : () => dispatch(adminActions.getMovies())

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch);