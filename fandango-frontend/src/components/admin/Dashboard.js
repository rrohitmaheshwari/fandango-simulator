import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../helper/stylesheets/Dashboard.css';
import ReactHighcharts from 'react-highcharts';
import {Polar, Line} from 'react-chartjs-2';

import {
    Container, Row, Col
} from 'reactstrap';
import {RESTService} from "../../api";
import Alert from "react-s-alert";
import AdminNavBar from "./AdminNavBar";


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            top_ten_movie_by_revenue: [],
            citywise_revenue: [],
            top_ten_hall_by_tickets: [],
            clicks_per_page: [],
            movies_clicks: [],
            less_seen_Area: [],
            reviews_on_movies: [],
            trace_user:[],
            email:"",
        }


    }

    componentWillMount() {


        RESTService.top_ten_movies()
            .then(
                res => {
                    this.setState({top_ten_movie_by_revenue: res.data});


                },
                error => {
                    console.log("error");
                    console.log(error);
                }
            );


        RESTService.top_ten_city()
            .then(
                res => {
                    this.setState({citywise_revenue: res.data});


                },
                error => {
                    console.log("error");
                    console.log(error);
                }
            );


        RESTService.top_ten_hall()
            .then(
                res => {
                    this.setState({top_ten_hall_by_tickets: res.data});


                },
                error => {
                    console.log("error");
                    console.log(error);
                }
            );

        RESTService.top_ten_pages()
            .then(
                res => {
                    this.setState({clicks_per_page: res.data});


                },
                error => {
                    console.log("error");
                    console.log(error);
                }
            );



        RESTService.movies_clicks()
            .then(
                res => {
                    this.setState({movies_clicks: res.data});


                },
                error => {
                    console.log("error");
                    console.log(error);
                }
            );



        // this.setState({
        //     movies_clicks: [
        //         {name: 'Black Panther', y: 100},
        //         {name: 'Deadpool', y: 190},
        //         {name: 'Avengers', y: 110},
        //         {name: 'Shape of Water', y: 130},
        //         {name: 'Rampage', y: 160},
        //         {name: 'John Wick', y: 278},
        //         {name: 'Thor Ragnarok', y: 316},
        //         {name: 'Justice League', y: 347},
        //         {name: 'Hulk', y: 237},
        //         {name: 'Hangover', y: 327},
        //     ]
        // });


        RESTService.less_seen_Area()
            .then(
                res => {
                    this.setState({less_seen_Area: res.data});


                },
                error => {
                    console.log("error");
                    console.log(error);
                }
            );

        // this.setState({
        //     less_seen_Area: [
        //         {name: 'Home Page', y: 100},
        //         {name: 'Movie Search', y: 190},
        //         {name: 'Movie Detailed Page', y: 110},
        //         {name: 'Payment', y: 130},
        //         {name: 'User Profile', y: 160},
        //     ]
        // });



        RESTService.reviews_on_movies()
            .then(
                res => {
                    this.setState({reviews_on_movies: res.data});


                },
                error => {
                    console.log("error");
                    console.log(error);
                }
            );
        //
        // this.setState({
        //     reviews_on_movies: [
        //         {name: 'Black Panther', y: 5},
        //         {name: 'Deadpool', y: 4},
        //         {name: 'Avengers', y: 3.2},
        //         {name: 'Shape of Water', y: 3.3},
        //         {name: 'Rampage', y: 3.4},
        //         {name: 'John Wick', y: 4},
        //         {name: 'Thor Ragnarok', y: 2.5},
        //         {name: 'Justice League', y: 2},
        //         {name: 'Hulk', y: 4.7},
        //         {name: 'Hangover', y: 3.7},
        //     ]
        // });


        //
        // RESTService.trace_user()
        //     .then(
        //         res => {
        //             this.setState({trace_user: res.data});
        //
        //
        //         },
        //         error => {
        //             console.log("error");
        //             console.log(error);
        //         }
        //     );

    }



    fetchtrace = (event) => {

        event.preventDefault();


        RESTService.trace_user(document.getElementById("email").value)
            .then(
                res => {
                    this.setState({trace_user: res.data});


                },
                error => {
                    console.log("error");
                    console.log(error);
                }
            );
    }

    render() {

        const top_ten_movie_by_revenue = {

            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Top 10 movies and its revenue/year'
            },
            tooltip: {
                pointFormat: ' <b>{point.percentage:.1f} %</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y:.1f}$',

                    }
                }
            },
            series: [{
                name: 'top_ten_movie_by_revenue',
                colorByPoint: true,
                data: this.state.top_ten_movie_by_revenue
            }],
            credits: {
                enabled: false
            },

        };


        const top_ten_citywise_revenue = {

            chart: {
                type: 'bar'
            },
            title: {
                text: 'Top ten citywise Revenue/Year'
            },
            xAxis: {
                categories: this.state.citywise_revenue[0]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Revenue'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: '2016',
                data: this.state.citywise_revenue[1]
            }, {
                name: '2017',
                data: this.state.citywise_revenue[2]
            }, {
                name: '2018',
                data: this.state.citywise_revenue[3]
            }],
            credits: {
                enabled: false
            },

        };

        let top_ten_hall_by_tickets_name = [];
        let top_ten_hall_by_tickets_tickets = [];
        let top_ten_hall_by_tickets_revenue = [];


        this.state.top_ten_hall_by_tickets.map((data) => {
            top_ten_hall_by_tickets_name.push(data.name);
            top_ten_hall_by_tickets_tickets.push(data.ticket_count);
            top_ten_hall_by_tickets_revenue.push(data.revenue);


        });

        const top_ten_hall_by_revenue = {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Top ten Hall by Tickets sold'
            },

            xAxis: [{
                categories: top_ten_hall_by_tickets_name,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}$',
                    style: {}
                },
                title: {
                    text: 'Revenue',
                    style: {}
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Ticket Count',
                    style: {}
                },
                labels: {
                    format: '{value}',
                    style: {}
                }

            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 55,
                floating: true,
                backgroundColor: '#FFFFFF'
            },
            series: [{
                name: 'Ticket Count',
                type: 'column',
                yAxis: 1,
                data: top_ten_hall_by_tickets_tickets,
                tooltip: {}

            }, {
                name: 'Ticket Revenue',
                type: 'spline',
                data: top_ten_hall_by_tickets_revenue,
                tooltip: {
                    valueSuffix: '$'
                }
            }],
            credits: {
                enabled: false
            },

        };


        const clicks_per_page = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Clicks per pages',

            },
            xAxis: {
                title: {
                    text: 'Pages'
                },
                visible: false,
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> ({point.y})',
                        colorByPoint: true,
                    },
                }
            },

            legend: {
                enabled: true,
            },
            series: [{
                name: 'clicks_per_page',
                data: this.state.clicks_per_page
            }],
            credits: {
                enabled: false
            },
        }


        const movies_clicks = {

            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Top movies as per clicks'
            },
            tooltip: {
                pointFormat: ' <b>{point.percentage:.1f} %</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y} Clicks',

                    }
                }
            },
            series: [{
                name: 'top_movies_clicks',
                data: this.state.movies_clicks
            }],
            credits: {
                enabled: false
            },

        };

        let less_seen_Area_name = [];
        let less_seen_Area_value = [];


        this.state.less_seen_Area.map((data) => {
            less_seen_Area_name.push(data.name);
            less_seen_Area_value.push(data.y);


        });

        const data_less_seen = {
            datasets: [{
                data: less_seen_Area_value,
                backgroundColor: [
                    '#FF6384',
                    '#4BC0C0',
                    '#FFCE56',
                    '#E7E9ED',
                    '#36A2EB'
                ],
                label: 'less_seen_Area_name' // for legend
            }],
            labels: less_seen_Area_name
        };


        let reviews_on_movies_name = [];
        let reviews_on_movies_value = [];


        this.state.reviews_on_movies.map((data) => {
            reviews_on_movies_name.push(data.name);
            reviews_on_movies_value.push(data.y);


        });

        const reviews_on_movies = {
            labels: reviews_on_movies_name,
            datasets: [
                {
                    label: 'Reviews on Movies',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: reviews_on_movies_value
                }
            ]
        };



        const trace_user = {
            title: {
                text: 'Trace user'
            },


            yAxis: {
                title: {
                    text: 'Pages'
                },
                categories: this.state.trace_user[0],   //set

            },

            xAxis: {
                title: {
                    text: 'Time Stamp'
                },
                categories: this.state.trace_user[2],          //time
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },


            series: [{
                name: 'Page Ref',
                data: this.state.trace_user[1],        //data,

            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500,
                        maxIndex: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }, credits: {
                enabled: false
            },

        };
        return (


            <div className={''}>
                <AdminNavBar/>

                <Container fluid={true} style={{padding: 0}}>


                    <Row noGutters={true} style={{margin: 25, background: "#f1f1f1"}}>
                        <Col>

                            <ReactHighcharts config={top_ten_movie_by_revenue} ref="chart"/>
                        </Col>
                        <Col>

                            <ReactHighcharts config={top_ten_citywise_revenue} ref="chart"/>
                        </Col>


                    </Row>

                    <Row noGutters={true} style={{margin: 25, background: "#f1f1f1"}}>
                        <Col>

                            <ReactHighcharts config={top_ten_hall_by_revenue} ref="chart"/>
                        </Col>
                        <Col>

                            <ReactHighcharts config={clicks_per_page} ref="chart"/>
                        </Col>


                    </Row>

                    <Row noGutters={true} style={{margin: 25, background: "#f1f1f1"}}>
                        <Col>

                            <ReactHighcharts config={movies_clicks} ref="chart"/>
                        </Col>
                        <Col style={{background: '#ffffff'}} className={"text-center"}>

                            Area which is less seen.
                            <Polar data={data_less_seen}/>
                        </Col>

                    </Row>


                    <Row noGutters={true} style={{margin: 25, background: "#ffffff"}}>
                        <Col xs="6" sm={{offset:3}} style={{background: '#ffffff'}}>

                            Graph for reviews on Movies (Data from database)
                            <Line data={reviews_on_movies}/>
                        </Col>


                    </Row>

                    <Row>

                        <Col xs="4" sm={{offset:4}}  style={{background: '#ffffff'}}>

                            <form onSubmit={ this.fetchtrace}>
                                Tracing user diagram
                                <input className="form-control w-100 mt-3" type="text"
                                    placeholder="First Name" required={true}
                                    id="email"

                                    />
                                <button className="btn btn-primary myprofile_save_button mt-3" type="submit" >
                                    Fetch
                                </button>

                            </form>

                        </Col>
                    </Row>

                    <Row noGutters={true} style={{margin: 25, background: "#f1f1f1"}}>

                        {(this.state.trace_user.length!==0) &&
                            <Col style={{background: '#ffffff'}}>
                                
                            <ReactHighcharts config={trace_user} ref="chart"/>
                        </Col>
                        }

                    </Row>

                </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);