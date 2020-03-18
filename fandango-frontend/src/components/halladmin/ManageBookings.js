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
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import HallNavBar from "./HallNavBar";
import AdminNavBar from "../admin/AdminNavBar";

class ManageBookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openDeleteModal: false,
            booking_table: [],
            booking_table_master: [],
            booking_id:"",
            booking_table_currentPageNumber: 1,
            itemsPerPage: 5,
            searchDate: "Search By Date",
            isCalendarOpen: false,
            searchMonth: ""
        }
    }

    componentWillMount() {
        
        //call api to fetch booking details
        RESTService.fetchBookings()
        .then( response => {
            console.log("###response",response);
            
            this.setState({
                booking_table : response.data,
                booking_table_master : response.data
            })
        })
        .catch(() => {
            // logout logic
        });
    }

    handleDeleteModal(data,event) {
        console.log(data);

        this.setState({
            booking_id:data,
            openDeleteModal: true
        });
    };

    handleCancelModalClose =()=> {

        this.setState({
            openDeleteModal: false
        });
    };

    handleCancel = (event) => {
        //@TODO Request for Account deletion
        //Delete booking is this.state.booking_id
        this.setState({
            openDeleteModal: false,
            booking_table_currentPageNumber: 1,
        });
        document.getElementById('Search').value = "";

        let billingInfo = { "billing_id" : this.state.booking_id };

        RESTService.cancelBookings( billingInfo )
        .then( response => {
            console.log("###response",response);

            Alert.success(response.data.message, {
                position: 'top-right',
                effect: 'slide',
                timeout: 3000
            });            

            let temp_array = [];

            let j = 0;
            for (let i = 0; i < this.state.booking_table_master.length; i++) {
                temp_array[j] = this.state.booking_table_master[i]
                if (this.state.booking_table_master[i].billing_id === this.state.booking_id) {
                    temp_array[j].status="CANCELED";
                }
                j++;
            }
            this.setState({
                booking_table: temp_array,
                booking_table_master: temp_array
            });
        })
        .catch(() => {
            // logout logic
        });
    }

    handleInputChange_booking(e) {
        e.preventDefault();

        let temp_array = [];

        let j = 0;
        for (let i = 0; i < this.state.booking_table_master.length; i++) {
            if (this.state.booking_table_master[i].email.toLowerCase().includes(e.target.value.toLowerCase())) {
                temp_array[j] = this.state.booking_table_master[i]
                j++;
            }
        }
        this.setState({
            booking_table: temp_array,
            booking_table_currentPageNumber: 1,
            searchMonth: "",
            searchDate : "Search By Date",
        });
    }

    handleChangePage_booking_table = (number) => {
        this.setState({
            booking_table_currentPageNumber: Number(number)
        });
    };

    handleChange = (event) => {
        // this.setState({});

        let temp_array = [];

        let j = 0;
        for (let i = 0; i < this.state.booking_table_master.length; i++) {
            // console.log("first", moment(this.state.booking_table_master[i].show_date).format("MM-DD-YYYY"));
            console.log("second:", event.target.value);
            console.log("compare:", moment(this.state.booking_table_master[i].show_date).format("MM") === event.target.value);
            if (moment(this.state.booking_table_master[i].show_date).format("MM") === event.target.value) {
                temp_array[j] = this.state.booking_table_master[i]
                j++;
            }
        }

        document.getElementById('Search').value = "";
        this.setState({
            booking_table: temp_array,
            booking_table_currentPageNumber: 1,
            searchDate : "Search By Date",
            isCalendarOpen : false,
            [event.target.name]: event.target.value
        });         
    }

    onDateChange = date => {
        document.getElementById('Search').value = "";

        let temp_array = [];

        let j = 0;
        for (let i = 0; i < this.state.booking_table_master.length; i++) {
            console.log("first", moment(this.state.booking_table_master[i].show_date).format("MM-DD-YYYY"));
            console.log("second:", moment(date).format("MM-DD-YYYY"));
            console.log("compare:", moment(this.state.booking_table_master[i].show_date).format("MM-DD-YYYY") === moment(date).format("MM-DD-YYYY"));
            if (moment(this.state.booking_table_master[i].show_date).format("MM-DD-YYYY") === moment(date).format("MM-DD-YYYY")) {
                temp_array[j] = this.state.booking_table_master[i]
                j++;
            }
        }
        this.setState({
            booking_table: temp_array,
            booking_table_currentPageNumber: 1,
            searchDate : date,
            isCalendarOpen : false,
            searchMonth: ""
        });        
    }

    toggleCalendarDisplay = (e) => {
        e && e.preventDefault();
        this.setState({isCalendarOpen: !this.state.isCalendarOpen})
    };

    render() {

        let booking_table;
        const booking_table_pageNumbers = [];

        if (this.state.booking_table && (this.state.booking_table.length > 0)) {

            const {booking_table_currentPageNumber, itemsPerPage} = this.state;
            const indexOfLastItem = booking_table_currentPageNumber * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            booking_table = this.state.booking_table.slice(indexOfFirstItem, indexOfLastItem);

            for (let i = 1; i <= Math.ceil(this.state.booking_table.length / itemsPerPage); i++) {
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
            <div className={'mangebooking_main_wrap'}>

                {this.props.user && this.props.user.type==='NORMAL' && <NavBar/> }
                {this.props.user && this.props.user.type==='HALL_OWNER' && <HallNavBar/> }
                {this.props.user && this.props.user.type==='ADMIN' && <AdminNavBar/> }


                <Container>
                    <br/>
                    <Row>
                        <Col  className={"Search pr-0 pl-0"} sm="4">
                            <button
                                className = "form-control w-50 h-100 manageBookings-btn-date-times mt-0 pt-0"
                                onClick   = { this.toggleCalendarDisplay }>
                                { this.state.searchDate ==="Search By Date" ? this.state.searchDate :  this.state.searchDate.format("MMMM D YYYY") }
                            </button>
                            {
                                this.state.isCalendarOpen && (
                                    <DatePicker
                                        selected = { this.state.searchDat }
                                        onChange={this.onDateChange}
                                        onClickOutside = { this.toggleCalendarDisplay }
                                        withPortal
                                        inline />
                                )
                            }
                        </Col>

                        <Col sm="4">
                            <select name="searchMonth" id="ExpirationMonth" className="form-control mr-1 w-75" onChange={this.handleChange} value={this.state.searchMonth}>
                                <option value="">Search By Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select> 
                        </Col>                        

                        <Col  className={"Search pr-0"} sm="4">
                            <input
                                placeholder="Search by email"
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
                        <Col xs="1">
                            Screen
                        </Col>
                        <Col xs="2">
                            User Email
                        </Col>
                        <Col xs="2">
                            Movie
                        </Col>
                        <Col xs="2">
                            Show Date/Time
                        </Col>
                        <Col xs="1">
                            Quantity
                        </Col>
                        <Col xs="1">
                            Amount
                        </Col>
                        <Col xs="1">
                            Tax
                        </Col>
                        <Col xs="1">
                            Status
                        </Col>
                        <Col xs="1">
                            {}
                        </Col>

                    </Row>
                    {booking_table&&
                    booking_table.map((data) =>

                        <Row className={"Booking_Table"} key={data.billing_id}>

                            <Col xs="1">
                                {data.screen_number}
                            </Col>

                            <Col xs="2">
                                {data.email}
                            </Col>
                            <Col xs="2">
                                {data.movie.title}
                            </Col>
                            <Col xs="2">
                                {moment(data.show_date).format("MM-DD-YYYY")}{' '}{data.show_time}
                            </Col>
                            <Col  xs="1">
                                {data.quantity}
                            </Col>
                            <Col xs="1">
                                {data.amount}
                            </Col>
                            <Col xs="1">
                                {data.tax}
                            </Col>
                            <Col xs="1" style={ (data.status==="BOOKED")?{color:'#008000'}:{color:'#8B0000'} }>
                                {data.status}
                            </Col>
                            <Col xs="1">
                                { console.log(moment(data.show_date).add(moment.duration(data.show_time)).isAfter(moment()))}
                                { moment(data.show_date).add(moment.duration(data.show_time)).isAfter(moment()) && (data.status==="BOOKED") &&
                                    <Button color="primary" size="sm"
                                            onClick={this.handleDeleteModal.bind(this, data.billing_id)}> <span
                                        className="Button-icon fa fa-trash mr-2"/>
                                        Cancel</Button>
                                }
                            </Col>
                        </Row>
                    )
                    }
                    {
                      (this.state.booking_table.length === 0) &&
                        <Row className={"Booking_Table"} style={{lineHeight: 2}}>
                            <Col>
                                No Transaction found!
                            </Col>

                        </Row>
                    }
                </Container>

                {booking_table &&
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
                                className={((Math.ceil(this.state.booking_table.length / this.state.itemsPerPage) === this.state.booking_table_currentPageNumber)) ? 'disabled' : ''}>
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

    const {user} = state.authentication;
    return {
        user
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookings);