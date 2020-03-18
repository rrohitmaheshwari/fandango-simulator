import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../helper/stylesheets/AdminHallSearch.css';
import NavBar from "../../components/user/NavBar";
import {Container, Row, Col, Button} from 'reactstrap';
import image_Flickity1 from '../../helper/images/HomePage/Flickity1.jpg'
import StarRatingComponent from 'react-star-rating-component';
import {adminActions} from "../../action/admin/admin.action";
import theater_Logo from '../../helper/images/Theater.png'
import {history} from "../../helper/others/history";
import AdminNavBar from "./AdminNavBar";





class MovieHallSearch extends Component {

    constructor(props) {
        super(props);

        this.state={
            movieHalls:[]
        }

    }

    componentWillMount() {

        this.props.fetchHalls();

    }

    handleInputChange_tablemovie(e) {
        e.preventDefault();
        console.log(e.target.value);

        var temp_array = [];

        let {movieHalls} = this.props;

        var j = 0;
        for (var i = 0; i < movieHalls.length; i++) {
            if (movieHalls[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
                temp_array[j] = movieHalls[i]
                j++;
            }
        }
        this.setState({movieHalls: temp_array});
    }



    render() {
        //
        // if(!this.props.loadingMovies)
        //     this.setState({movies:this.props.movies})

        let {movieHalls}=this.state;

        if(this.search && this.search.value==="")
            movieHalls=this.props.movieHalls;

            return (

            <div className={'admin_halls_main_wrap'}>
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


                    <Row className={"AdminTheaterSearch_Table_Header"}>
                        <Col>
                            Movie Halls({movieHalls.length})
                        </Col>

                    </Row>

                    {movieHalls &&
                    movieHalls.map((data) =>

                        <Row className={"AdminTheaterSearch_Table"} key={data._id}>
                            <Col xs="4">
                                <div><img className={"img-fluid AdminTheaterSearch_Table_image"} src={data.image} alt={""}/></div>
                            </Col>
                            <Col xs="3">
                                <div>
                                    <p><b><span className={"AdminTheaterSearch_table_Title"}>{data.name}</span></b></p>
                                    <p ><em><a href={`https://maps.google.com/?q=+${data.address}`} target="_blank">{data.address}</a></em></p>
                                    <p><em>{data.ownerEmail}</em></p>

                                </div>
                            </Col>
                            <Col xs="5">
                                <p> Screens: {data.screens && data.screens.length}</p>
                                <Button color="primary" className={"AdminTheaterSearch_BuyTickets"} value={data._id}
                                        onClick={(event) => {
                                              history.push("/admin/edit_moviehalls/"+data._id);
                                            console.log(event.currentTarget.value);
                                        }}
                                >Edit</Button>
                            </Col>
                        </Row>
                    )}
                    {
                        (movieHalls === 0) &&
                        <Row className={"AdminTheaterSearch_Table"}>
                            <Col>
                                No theater found!
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
    const {movieHalls}=state.admin;
    return {
        user,
        movieHalls,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchHalls : () => dispatch(adminActions.getMovieHalls())

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieHallSearch);