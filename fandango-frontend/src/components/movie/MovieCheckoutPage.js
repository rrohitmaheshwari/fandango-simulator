import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { Container, Row, Col }  from 'reactstrap';
import '../../helper/stylesheets/movie-checkout.css';
import      Alert               from 'react-s-alert';
import   { history }            from '../../helper/others/history';
import  { RESTService }         from "../../api";
import      NavBar              from "../../components/user/NavBar";

class MovieCheckoutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketsBooked   : 0,
            ticketsAvailable: 0,
            ticketsPrice    : 0,
            totalTickets    : 0,
            userTicketsQty  : 1,
            userTicketCost  : 0,
            userTicketTax   : 0,
            tax_percent     : 9.55,
            showTime        : '',
            showDate        : '',
            movie           : {},
            hall            : {},
            randomDate      : '',
            isPayment       : false,
            cardnumber      : "",
            cardmonth       : "",
            cardyear        : "",
            cardzip         : "",
            isConfirmed     : false
        };
        this.handleTickets =this.handleTickets.bind(this);
        this.handleConfirmSeats =this.handleConfirmSeats.bind(this);
    }

    componentWillMount() {

        const checkout = this.props.checkout;

        if (this.props.checkout.movie ) {

            let checkoutDetails = {
                movie_id: checkout.movie._id,
                hall_id: checkout.hall._id,
                screenNumber: checkout.hall.screenNumber,
                showDate: checkout.showDate.format("YYYY-MM-DD"),
                showTime: checkout.showTime
            };

            console.log(checkoutDetails);

            RESTService.fetchCheckoutDetails(checkoutDetails)
                .then((response) => {
                    this.setState({
                        ticketsBooked: response.data.ticketsBooked,
                        totalTickets: checkout.hall.totalSeats,
                        ticketsAvailable: (checkout.hall.totalSeats - response.data.ticketsBooked),
                        ticketsPrice: checkout.hall.ticketPrice,
                        userTicketCost: (checkout.hall.ticketPrice + this.calculateTax(checkout.hall.ticketPrice)),
                        showTime: checkout.showTime,
                        showDate: checkout.showDate,
                        movie: checkout.movie,
                        hall: checkout.hall,
                        randomDate: checkout.randomDate
                    });

                    if((checkout.hall.totalSeats - response.data.ticketsBooked) <=0) {
                        Alert.error("No tickets available for this movie!", {
                            position: 'top',
                            effect: 'slide',
                            timeout: 5000,
                            onClose: () => {
                               history.push("/home");
                            }
                        });
                    }
                })
        } else {
            history.push("/home");
        }
    }

    handleConfirmSeats(e){
        e.preventDefault();
        console.log("this. ", this.state.isPayment);
        if(this.state.userTicketsQty <= 0) {
            Alert.error("Please enter atleast 1 ticket!", {
                position: 'top',
                effect: 'slide',
                timeout: 2000,
                onClose: () => {
                    this.setState({
                        isPayment: false
                    });
                }
            });
        } else if(this.state.userTicketsQty > this.state.ticketsAvailable) {
            Alert.error("Tickets limit exceeded!", {
                position: 'top',
                effect: 'slide',
                timeout: 2000,
                onClose: () => {
                    this.setState({
                        isPayment: false
                    });
                }
            });
        }
        else {
            this.setState({isPayment: !this.state.isPayment});
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleTickets(e){

        e.preventDefault();

        let userRequiredTkts = e.target.value;

        this.setState({
            userTicketsQty  : userRequiredTkts
        });

        if(userRequiredTkts > this.state.ticketsAvailable) {
            Alert.error( "Required tickets exceed limit", {
                position: 'top',
                effect: 'slide',
                timeout: 2000,
            });
        } else {
            let ticketCost = userRequiredTkts * this.state.ticketsPrice;
            let totalTax = this.calculateTax(ticketCost);
            let totalCost = ticketCost + totalTax;
            console.log("----> ", totalCost);
            this.setState({
                userTicketCost: totalCost
            });
        }

    };

    calculateTax = (amount) => {
        // Total tax
        // Tax percent - 10%
        let tax_percent = this.state.tax_percent;
        const tax_val = (amount * (tax_percent/100));
        let tax = Number(Math.round(tax_val+'e2')+'e-2');
        this.setState({
            userTicketTax: tax
        });
        return Number(Math.round(tax_val+'e2')+'e-2');
    };

    isValidUSZip = (sZip) => {
        return /^\d{5}(-\d{4})?$/.test(sZip);
    };

    bookMovie = (event) => {
        event.preventDefault();
        console.log("here");

        console.log("Card Zip: ", this.refs.cardzip.value);
        console.log("Card Number: ", this.refs.cardnumber.value);

        if(isNaN(parseInt(this.refs.cardnumber.value)) || ((parseInt(this.refs.cardnumber.value).toString().length < 16))) {
            Alert.error("Please enter valid Card Number! (16 Digits)", {
                position: 'top',
                effect: 'slide',
                timeout: 2000
            });
        } else if(!(this.isValidUSZip(this.refs.cardzip.value))) {
            Alert.error("Please enter valid Card Zip!", {
                position: 'top',
                effect: 'slide',
                timeout: 2000
            });
        } else {
            const { userTicketTax, userTicketCost, userTicketsQty, movie, showTime, showDate, hall } = this.state;
            if (userTicketsQty > 0) {

                let bookMovieInfo = {
                    movie_id: movie._id,
                    hall_id: hall._id,
                    city: hall.city,
                    show_time: showTime,
                    show_date: showDate.format("YYYY-MM-DD"),
                    quantity: userTicketsQty,
                    amount: userTicketCost,
                    tax: userTicketTax,
                    screenNumber: hall.screenNumber,
                    totalSeats: hall.totalSeats
                };

                console.log("book: ", bookMovieInfo);

                RESTService.bookMovie(bookMovieInfo)
                    .then((response) => {
                        Alert.success(response.data.message, {
                            position: 'top',
                            effect: 'slide',
                            timeout: 2000,
                            onClose: () => {
                                this.setState({
                                    isConfirmed: true
                                });
                            }
                        });
                    })
                    .catch((error) => {
                        Alert.error("Checkout failed. Try again later!", {
                            position: 'top',
                            effect: 'slide',
                            timeout: 2000,
                            onClose: () => {
                                history.push("/home");
                            }
                        });
                    });
            } else {
                console.log("Invalid ticket selection");
                history.push("/home");
            }
        }
    };


    render() {

        const user = this.props.user;
        console.log("============= ", user);

        const { tax_percent, userTicketTax, ticketsAvailable, ticketsPrice, userTicketsQty, userTicketCost, showTime, showDate, isPayment, isConfirmed, movie, hall, randomDate } = this.state;

        return(
            <div className="movie_checkout_wrap">
                <NavBar/>
                <Container fluid={true}>
                    <Row className="movie-checkout-content">
                        <section>
                            <h3 className="movie_checkout">Checkout</h3>
                        </section>
                    </Row>

                    <Row className="movie-checkout-content">

                        <Col md={{ size: 6, offset: 1 }} >
                            <section className="movie-checkout-info">

                                {
                                    !isPayment && !isConfirmed &&
                                    <section>
                                        <h2 className="movie-checkout-info-header">How many tickets?</h2>
                                        <span>
                                        <div className="movie-checkout-info-tickets-available">
                                            Tickets available for the movie <em>{ticketsAvailable}</em> for showtime <em>{showTime}</em>
                                        </div>
                                        <table className="movie-checkout-info-book-tickets">
                                            <tbody>
                                                <tr>
                                                    <th className="movie-checkout-type">
                                                       General
                                                    </th>
                                                    <td className="movie-checkout-text movie-checkout-quantity mr-1">
                                                        <input type="text" className="form-control" id="entertickets"
                                                               value={userTicketsQty} onChange={this.handleTickets}/>
                                                    </td>
                                                    <td className="movie-checkout-text movie-checkout-char">
                                                        x
                                                    </td>
                                                    <td className="movie-checkout-text movie-checkout-price">
                                                        $ {ticketsPrice}
                                                    </td>
                                                    <td className="movie-checkout-text movie-checkout-char">
                                                        =
                                                    </td>
                                                    <td className="movie-checkout-text movie-checkout-total">
                                                        $ {userTicketCost}
                                                    </td>
                                                    <td className="movie-checkout-text">
                                                       <a className="movie-confirm-seats"
                                                          onClick={this.handleConfirmSeats}>Confirm Seats</a>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </span>
                                    </section>
                                }

                                {
                                    isPayment && !isConfirmed &&
                                    <section>

                                        <form onSubmit={ this.bookMovie }>
                                            <Row className="mt-2">
                                                <Col className="credit-card-logos">
                                                    <span className="visa"></span>
                                                    <span className="amex"></span>
                                                    <span className="mastercard"></span>
                                                    <span className="discover"></span>
                                                </Col>
                                            </Row>

                                            <Row className="mt-4">
                                                <Col sm="8">
                                                    <input className="form-control" type="text"
                                                           placeholder="Card Number" required={true} maxLength="19"
                                                           name="cardnumber" ref="cardnumber"
                                                    defaultValue={user.cardnumber}/>
                                                </Col>
                                            </Row>

                                            <Row className="mt-4">
                                                <Col sm="3">
                                                    <select name="cardmonth" id="ExpirationMonth" className="form-control mr-1"
                                                            required={true}
                                                            defaultValue={ user.cardmonth }
                                                            onChange={this.handleChange} >
                                                        <option value="">Month</option>
                                                        <option value="1">January</option>
                                                        <option value="2">February</option>
                                                        <option value="3">March</option>
                                                        <option value="4">April</option>
                                                        <option value="5">May</option>
                                                        <option value="6">June</option>
                                                        <option value="7">July</option>
                                                        <option value="8">August</option>
                                                        <option value="9">September</option>
                                                        <option value="10">October</option>
                                                        <option value="11">November</option>
                                                        <option value="12">December</option>
                                                    </select>
                                                </Col>
                                                <Col sm="3">
                                                    <select name="cardyear" id="ExpirationYear" className="form-control"
                                                            onChange={this.handleChange}
                                                    defaultValue={user.cardyear}>
                                                        <option value="">Year</option>
                                                        <option value="2018">2018</option>
                                                        <option value="2019">2019</option>
                                                        <option value="2020">2020</option>
                                                        <option value="2021">2021</option>
                                                        <option value="2022">2022</option>
                                                        <option value="2023">2023</option>
                                                        <option value="2024">2024</option>
                                                        <option value="2025">2025</option>
                                                        <option value="2026">2026</option>
                                                        <option value="2027">2027</option>
                                                        <option value="2028">2028</option>
                                                    </select>
                                                </Col>
                                            </Row>

                                            <Row className="mt-4">
                                                <Col sm="5">
                                                    <input className="form-control" type="text"
                                                           placeholder="Billing Zip Code" maxLength="10"
                                                           name="cardzip" ref="cardzip"  />
                                                </Col>
                                                <Col sm="7" className="text-right">
                                                    <button className="btn btn-secondary myprofile_save_button mr-3"  onClick={ this.handleConfirmSeats }
                                                    >
                                                        Change Seats
                                                    </button>
                                                    <button className="btn btn-primary myprofile_save_button"
                                                    >
                                                        Book Movie
                                                    </button>
                                                </Col>
                                            </Row>
                                        </form>

                                    </section>
                                }

                                {
                                    isConfirmed &&
                                        <section>
                                            <ul className="movie-times-box-showtimes">
                                                <li className="movie-times-showtimes">
                                                    <h3 className="movie-times-showtimes-header">
                                                        <i className="fa fa-ticket mr-2" aria-hidden="true"/>
                                                        Congratulations! You have successfully booked { movie.title }
                                                    </h3>
                                                    <br/>
                                                    <h3 className="movie-booking-confirmation">
                                                        Booking Information:
                                                        <br/>
                                                        Theatre Address: &nbsp;&nbsp;{ hall.address }, { hall.city }, Contact: { hall.phone }
                                                        <br/>
                                                        Show Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ showDate.format("MMMM D YYYY") }
                                                        <br/>
                                                        Show Timing: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ showTime }
                                                        <br/>
                                                        Screen Number: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ hall.screenNumber }
                                                        <br/>
                                                        Tax (<em>{ tax_percent }%</em>): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ { userTicketTax }
                                                        <br/>
                                                        <br/>
                                                        Total Cost: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ userTicketCost }
                                                        <br/>
                                                    </h3>
                                                    <button className="btn btn-secondary myprofile_save_button mr-3"  onClick={ (event) => { event.preventDefault(); history.push("/home");} } >
                                                        More Movies
                                                    </button>
                                                </li>
                                            </ul>
                                        </section>

                                }
                            </section>
                        </Col>

                        <Col md={{ size: 3}}>
                            <section className="movie-checkout-info-side">

                                <section className="movie-checkout-info-side-content">
                                    <Row className="mr-0 ml-0">
                                        <Col md="6" className="movie_left_image_container pl-0 pr-0">
                                            <img className="movie_left_image" src={ movie.image }/>
                                        </Col>
                                        <Col md="6">
                                            <ul className="movie_left_detail">
                                                <li className="mt-2 movie-rightside-info">Released</li>
                                                <li className="mt-2 movie_left_date movie-rightside-info">{ randomDate }</li>
                                                <li className="mt-2 movie-rightside-info">
                                                    { movie.ratingType },&nbsp;
                                                    { movie.duration }  mins
                                                </li>
                                                <li className="mt-2 movie-rightside-info">{ movie.genre }</li>
                                                <li className="mt-2 movie-rightside-info">
                                                    { movie.reviews && movie.reviews.length } Fan Ratings
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </section>
                            </section>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }

}

function mapStateToProps(state) {

    const { checkout, user } = state.authentication;
    return {
        checkout,
        user
    };
}

export default connect(mapStateToProps, null)(MovieCheckoutPage);