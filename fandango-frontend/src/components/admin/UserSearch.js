import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../helper/stylesheets/AdminUserSearch.css';
import {Container, Row, Col, Button} from 'reactstrap';
import image_Flickity1 from '../../helper/images/HomePage/Flickity1.jpg'
import StarRatingComponent from 'react-star-rating-component';
import {adminActions} from "../../action/admin/admin.action";
import {history} from "../../helper/others/history";
import AdminNavBar from "./AdminNavBar";
import {withRouter} from "react-router-dom";


class UserSearch extends Component {

    constructor(props) {
        super(props);

        this.state={
            users:[]
        }

    }

    componentWillMount() {

        this.props.fetchUsers()

    }

    handleInputChange_tablemovie(e) {
        e.preventDefault();
        console.log(e.target.value);

        var temp_array = [];

        let {users} = this.props;

        var j = 0;
        for (var i = 0; i < users.length; i++) {
            if ((users[i].firstname && users[i].firstname.toLowerCase().includes(e.target.value.toLowerCase())) || (users[i].email && users[i].email.toLowerCase().includes(e.target.value.toLowerCase()))) {
                temp_array[j] = users[i]
                j++;
            }
        }
        this.setState({users: temp_array});
    }



    render() {
        //
        // if(!this.props.loadingMovies)
        //     this.setState({movies:this.props.movies})

        let {users}=this.state;

        if(this.search && this.search.value==="")
            users=this.props.users;

            return (

            <div className={'admin_users_search_main_wrap'}>
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
                                className={'AdminUserSearch_searchbar form-control'}
                                onChange={this.handleInputChange_tablemovie.bind(this)}
                                id={'Search'}
                            />
                        </Col>
                    </Row>
                </Container>

                <Container>


                    <Row className={"Booking_Table_Header"}>
                        <Col md={2}>
                            Name
                        </Col>

                        <Col md={2}>
                            Email
                        </Col>

                        <Col md={2}>
                            Phone
                        </Col>

                        <Col md={2}>
                            Address
                        </Col>

                        <Col md={2}>
                            City
                        </Col>

                        <Col md={1}>
                            State
                        </Col>
                        <Col md={1}>

                        </Col>


                    </Row>

                    {users &&
                    users.map((data) =>

                        <Row className={"Booking_Table"} key={data.user_id}>
                            <Col md={2}>
                                {(data.firstname!=null ? data.firstname:"") + " "+(data.lastname!=null ? data.lastname:"")}
                            </Col>

                            <Col md={2}>
                                {data.email}
                            </Col>

                            <Col md={2}>
                                {data.phone && data.phone}
                            </Col>

                            <Col md={2}>
                                {data.address && data.address}
                            </Col>

                            <Col md={2}>
                                {data.city && data.city}
                            </Col>

                            <Col md={1}>
                                {data.state && data.state}
                            </Col>
                            <Col md={1}>
                                <button className={"btn btn-sm btn-primary"} value={data.user_id}
                                    onClick={(event) => {
                                    history.push("/admin/edit_user/"+data.user_id);
                                    console.log(event.currentTarget.value);
                                    }}><span className="Button-icon fa fa-edit mr-2"/>Edit</button>
                            </Col>

                            {/*<Col xs="2">*/}
                                {/*<div><img className={"AdminUserSearch_Table_image"} src={image_Flickity1} alt={""}/></div>*/}
                            {/*</Col>*/}
                            {/*<Col xs="3">*/}
                                {/*<div>*/}
                                    {/*<p><b><span className={"AdminUserSearch_table_Title"}>{data.title}</span></b></p>*/}
                                    {/*<p><em>{data.genre}</em></p>*/}
                                    {/*<p><em>{data.ratingType}</em></p>*/}
                                    {/*<p><StarRatingComponent*/}
                                        {/*name="rate1"*/}
                                        {/*starColor="#ffb400"*/}
                                        {/*emptyStarColor="#000000"*/}
                                        {/*starCount={5}*/}
                                        {/*value={data.rating}*/}
                                    {/*/></p>*/}


                                {/*</div>*/}
                            {/*</Col>*/}
                            {/*<Col xs="7">*/}
                                {/*<p> Cast + Crew: {data.characters}</p>*/}
                                {/*<p> Duration: {data.duration}</p>*/}
                                {/*<Button color="primary" className={"AdminUserSearch_BuyTickets"} value={data._id}*/}
                                        {/*onClick={(event) => {*/}
                                             {/*history.push("/admin/edit_movie/"+data._id);*/}
                                            {/*console.log(event.currentTarget.value);*/}
                                        {/*}}*/}
                                {/*>Edit</Button>*/}
                            {/*</Col>*/}
                        </Row>
                    )}
                    {
                        (users.length === 0) &&
                        <Row className={"AdminUserSearch_Table"}>
                            <Col>
                                No users found!
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
    const {users}=state.admin;
    return {
        user,
        users,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers : () => dispatch(adminActions.getNormalUsers())

    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserSearch));