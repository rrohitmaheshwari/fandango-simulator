import React, {Component} from    'react'                                             ;
import {connect} from             'react-redux'                                       ;
import NavBar from "../user/NavBar"                      ;
import CommonFooter from "../user/CommonFooter"                ;
import                            'react-accessible-accordion/dist/fancy-example.css' ;
import '../../helper/stylesheets/ManageBookings.css'       ;
import {Container, Row, Col} from 'reactstrap'                                        ;
import Alert from                 'react-s-alert'                                     ;
import {RESTService} from         "../../api/index"                                   ;
import moment from                'moment'                                            ;
import DatePicker from            'react-datepicker'                                 ;
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {hallAdminActions} from "../../action/halladmin/halladmin.action";
import {adminActions} from "../../action/admin/admin.action";
import AdminNavBar from "./AdminNavBar";

class HallAdminRevenue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieRevenue_table: [],
            moviehallRevenue_table: [],
            movie_table_currentPageNumber: 1,
            moviehall_table_currentPageNumber: 1,
            itemsPerPage: 3,
            storedPropsToStore:false,
        }
    }

    componentWillMount() {
        
        // //call api to fetch booking details
        // RESTService.fetchBookings()
        // .then( response => {
        //     console.log("###response",response);
        //
        //     this.setState({
        //         movieRevenue_table : response.data,
        //         this.props.movieRevenues : response.data
        //     })
        // })
        // .catch(() => {
        //     // logout logic
        // });

        this.props.fetchRevenue();
    }


    handleInputChange_booking(e) {
        e.preventDefault();

        this.setState({

            movie_table_currentPageNumber: 1,
            moviehall_table_currentPageNumber: 1,
        });

        let temp_array = [];

        let j = 0;
        for (let i = 0; i < this.props.movieRevenues.length; i++) {
            if (this.props.movieRevenues[i].movie.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                temp_array[j] = this.props.movieRevenues[i]
                j++;
            }
        }

        let temp_array1 = [];

        j = 0;
        for (let i = 0; i < this.props.moviehallRevenues.length; i++) {
            if (this.props.moviehallRevenues[i].moviehall.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                temp_array1[j] = this.props.moviehallRevenues[i]
                j++;
            }
        }

        this.setState({movieRevenue_table: temp_array,moviehallRevenue_table: temp_array1});
    }

    componentDidUpdate() {


        if(this.state.storedPropsToStore===false && (Object.keys(this.props.movieRevenues).length>0 ||  Object.keys(this.props.moviehallRevenues).length>0 )){
            this.setState({
                movieRevenue_table:this.props.movieRevenues,
                moviehallRevenue_table:this.props.moviehallRevenues,
                storedPropsToStore:true});

        }

    }

    handleChangePage_booking_table = (number) => {
        this.setState({
            movie_table_currentPageNumber: Number(number)
        });
    };

    handleChangePage_moviehall_table = (number) => {
        this.setState({
            moviehall_table_currentPageNumber: Number(number)
        });
    };


    render() {

        let movieRevenue_table;
        const booking_table_pageNumbers = [];

        if (this.state.movieRevenue_table && (this.state.movieRevenue_table.length > 0)) {

            const {movie_table_currentPageNumber, itemsPerPage} = this.state;
            const indexOfLastItem = movie_table_currentPageNumber * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            movieRevenue_table = this.state.movieRevenue_table.slice(indexOfFirstItem, indexOfLastItem);

            for (let i = 1; i <= Math.ceil(this.state.movieRevenue_table.length / itemsPerPage); i++) {
                booking_table_pageNumbers.push(i);
            }
        }

        const renderPageNumbers_booking_table = booking_table_pageNumbers.map(number => {
            return (

                <PaginationItem className={(this.state.movie_table_currentPageNumber === number) ? 'active' : ''}>
                    <PaginationLink onClick={() => this.handleChangePage_booking_table(number)}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            );
        });

        let moviehallRevenue_table;
        const moviehall_table_pageNumbers = [];

        if (this.state.moviehallRevenue_table && (this.state.moviehallRevenue_table.length > 0)) {

            const {moviehall_table_currentPageNumber, itemsPerPage} = this.state;
            const indexOfLastItem = moviehall_table_currentPageNumber * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            moviehallRevenue_table = this.state.moviehallRevenue_table.slice(indexOfFirstItem, indexOfLastItem);

            for (let i = 1; i <= Math.ceil(this.state.moviehallRevenue_table.length / itemsPerPage); i++) {
                moviehall_table_pageNumbers.push(i);
            }
        }

        const renderPageNumbers_moviehall_table = moviehall_table_pageNumbers.map(number => {
            return (

                <PaginationItem className={(this.state.moviehall_table_currentPageNumber === number) ? 'active' : ''}>
                    <PaginationLink onClick={() => this.handleChangePage_moviehall_table(number)}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            );
        });

        return (
            <div className={'mangebooking_main_wrap'}>
                <AdminNavBar/>
                <Container>
                    <br/>
                    <Row>

                        <Col  className={"Search pr-0"} sm={{ size: '4'}}>
                            {/* <input
                                placeholder="Search by email"
                                ref={input => this.search = input}
                                className={'form-control w-75 MovieSearch_searchbar'}
                                onChange={this.handleInputChange_booking.bind(this)}
                                id={'Search'}
                            /> */}

                        </Col>

                        <Col  className={"Search pr-0"} sm={{ size: '3', offset: 9 }}>
                            <input
                                placeholder="Search"
                                ref={input => this.search = input}
                                className={'form-control w-75 MovieSearch_searchbar'}
                                onChange={this.handleInputChange_booking.bind(this)}
                                id={'Search'}
                            />
                        </Col>
                    </Row>
                </Container>

                <Container >
                    <Row className={"Booking_Table_Header"}>
                        <Col xs="6">
                            Movie
                        </Col>
                        <Col xs="3">
                            Total Amount($)
                        </Col>
                        <Col xs="3">
                            Total Tickets
                        </Col>


                    </Row>
                    {movieRevenue_table&&
                    movieRevenue_table.map((data) =>

                        <Row className={"Booking_Table"} key={data.billing_id}>

                            <Col xs="6">
                                {data.movie.title}
                            </Col>
                            <Col xs="3">
                                {Number(Math.round(data.revenue+'e2')+'e-2')}
                            </Col>
                            <Col  xs="3">
                                {data.tickets}
                            </Col>

                        </Row>
                    )
                    }
                    {
                      (this.state.movieRevenue_table.length === 0) &&
                        <Row className={"Booking_Table"} style={{lineHeight: 2}}>
                            <Col>
                                No Transaction found!
                            </Col>

                        </Row>
                    }
                </Container>

                {movieRevenue_table &&
                <Container >
                    <Row>
                        <Pagination>

                            <PaginationItem
                                className={(this.state.movie_table_currentPageNumber === 1) ? 'disabled' : ''}>
                                <PaginationLink previous
                                                onClick={() => this.handleChangePage_booking_table((this.state.movie_table_currentPageNumber - 1))}/>
                            </PaginationItem>


                            {renderPageNumbers_booking_table}

                            <PaginationItem
                                className={((Math.ceil(this.state.movieRevenue_table.length / this.state.itemsPerPage) === this.state.movie_table_currentPageNumber)) ? 'disabled' : ''}>
                                <PaginationLink next
                                                onClick={() => this.handleChangePage_booking_table(this.state.movie_table_currentPageNumber + 1)}/>
                            </PaginationItem>

                        </Pagination>
                    </Row>

                </Container>
                }

                {/*moviehall table*/}
                <Container >
                    <Row className={"Booking_Table_Header"}>
                        <Col xs="6">
                            Movie Hall
                        </Col>
                        <Col xs="3">
                            Total Amount($)
                        </Col>
                        <Col xs="3">
                            Total Tickets
                        </Col>


                    </Row>
                    {moviehallRevenue_table&&
                    moviehallRevenue_table.map((data) =>

                        <Row className={"Booking_Table"} key={data.billing_id}>

                            <Col xs="6">
                                {data.moviehall.name}
                            </Col>
                            <Col xs="3">
                                {Number(Math.round(data.revenue+'e2')+'e-2')}
                            </Col>
                            <Col  xs="3">
                                {data.tickets}
                            </Col>

                        </Row>
                    )
                    }
                    {
                        (this.state.moviehallRevenue_table.length === 0) &&
                        <Row className={"Booking_Table"} style={{lineHeight: 2}}>
                            <Col>
                                No revenue found!
                            </Col>

                        </Row>
                    }
                </Container>

                {moviehallRevenue_table &&
                <Container >
                    <Row>
                        <Pagination>

                            <PaginationItem
                                className={(this.state.moviehall_table_currentPageNumber === 1) ? 'disabled' : ''}>
                                <PaginationLink previous
                                                onClick={() => this.handleChangePage_moviehall_table((this.state.moviehall_table_currentPageNumber - 1))}/>
                            </PaginationItem>


                            {renderPageNumbers_moviehall_table}

                            <PaginationItem
                                className={((Math.ceil(this.state.moviehallRevenue_table.length / this.state.itemsPerPage) === this.state.moviehall_table_currentPageNumber)) ? 'disabled' : ''}>
                                <PaginationLink next
                                                onClick={() => this.handleChangePage_moviehall_table(this.state.moviehall_table_currentPageNumber + 1)}/>
                            </PaginationItem>

                        </Pagination>
                    </Row>

                </Container>
                }


<div className="webkit-fill-available"></div>
                <CommonFooter/>


                <Modal isOpen={this.state.openDeleteModal} toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>
                       Cancel Booking
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete your Booking ID - {this.state.booking_id}?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleCancel}>Yes</Button>{' '}
                        <Button color="secondary" onClick={this.handleCancelModalClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {

    const {user} = state;
    const {movieRevenues} = state.admin;
    const {moviehallRevenues} = state.admin;
    const {loadingRevenue} = state.admin;
    return {
        user,
        movieRevenues,
        moviehallRevenues,
        loadingRevenue,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRevenue : ()=>dispatch(adminActions.getRevenue()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HallAdminRevenue);