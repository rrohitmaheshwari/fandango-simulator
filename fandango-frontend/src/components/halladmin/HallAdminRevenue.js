import React, {Component} from    'react'                                             ;
import {connect} from             'react-redux'                                       ;
import NavBar from                "../../components/user/NavBar"                      ;
import CommonFooter from          "../../components/user/CommonFooter"                ;
import                            'react-accessible-accordion/dist/fancy-example.css' ;
import                            '../../helper/stylesheets/ManageBookings.css'       ;
import {Container, Row, Col} from 'reactstrap'                                        ;
import Alert from                 'react-s-alert'                                     ;
import {RESTService} from         "../../api/index"                                   ;
import moment from                'moment'                                            ;
import DatePicker from            'react-datepicker'                                 ;
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {hallAdminActions} from "../../action/halladmin/halladmin.action";
import HallNavBar from "./HallNavBar";

class HallAdminRevenue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            revenue_table: [],
            booking_table_currentPageNumber: 1,
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
        //         revenue_table : response.data,
        //         this.props.revenues : response.data
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

            booking_table_currentPageNumber: 1,
        });

        let temp_array = [];

        let j = 0;
        for (let i = 0; i < this.props.revenues.length; i++) {
            if (this.props.revenues[i].movie.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                temp_array[j] = this.props.revenues[i]
                j++;
            }
        }
        this.setState({revenue_table: temp_array});
    }

    componentDidUpdate() {


        if(this.state.storedPropsToStore===false && Object.keys(this.props.revenues).length>0 ){
            this.setState({
                revenue_table:this.props.revenues,
                storedPropsToStore:true});

        }

    }

    handleChangePage_booking_table = (number) => {
        this.setState({
            booking_table_currentPageNumber: Number(number)
        });
    };

    onDateChange = date => {
        this.setState({ searchDate : date })
    }

    render() {

        let revenue_table;
        const booking_table_pageNumbers = [];

        if (this.state.revenue_table && (this.state.revenue_table.length > 0)) {

            const {booking_table_currentPageNumber, itemsPerPage} = this.state;
            const indexOfLastItem = booking_table_currentPageNumber * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            revenue_table = this.state.revenue_table.slice(indexOfFirstItem, indexOfLastItem);

            for (let i = 1; i <= Math.ceil(this.state.revenue_table.length / itemsPerPage); i++) {
                booking_table_pageNumbers.push(i);
            }
        }

        const renderPageNumbers_booking_table = booking_table_pageNumbers.map(number => {
            return (

                <PaginationItem className={(this.state.booking_table_currentPageNumber === number) ? 'active' : ''}>
                    <PaginationLink onClick={() => this.handleChangePage_booking_table(number)}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            );
        });

        return (
            <div className={''}>
                <HallNavBar/>

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
                                placeholder="Search by Title"
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
                    {revenue_table&&
                    revenue_table.map((data) =>

                        <Row className={"Booking_Table"} key={data.billing_id}>

                            <Col xs="6">
                                {data.movie.title}
                            </Col>
                            <Col xs="3">
                                {data.revenue}
                            </Col>
                            <Col  xs="3">
                                {data.tickets}
                            </Col>

                        </Row>
                    )
                    }
                    {
                      (this.state.revenue_table.length === 0) &&
                        <Row className={"Booking_Table"} style={{lineHeight: 2}}>
                            <Col>
                                No Transaction found!
                            </Col>

                        </Row>
                    }
                </Container>

                {revenue_table &&
                <Container >
                    <Row>
                        <Pagination>

                            <PaginationItem
                                className={(this.state.booking_table_currentPageNumber === 1) ? 'disabled' : ''}>
                                <PaginationLink previous
                                                onClick={() => this.handleChangePage_booking_table((this.state.booking_table_currentPageNumber - 1))}/>
                            </PaginationItem>


                            {renderPageNumbers_booking_table}

                            <PaginationItem
                                className={((Math.ceil(this.state.revenue_table.length / this.state.itemsPerPage) === this.state.booking_table_currentPageNumber)) ? 'disabled' : ''}>
                                <PaginationLink next
                                                onClick={() => this.handleChangePage_booking_table(this.state.booking_table_currentPageNumber + 1)}/>
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
    const {revenues} = state.hallAdmin;
    const {loadingRevenue} = state.hallAdmin;
    return {
        user,
        revenues,
        loadingRevenue,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRevenue : ()=>dispatch(hallAdminActions.getRevenue()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HallAdminRevenue);