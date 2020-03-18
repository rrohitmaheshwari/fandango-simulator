import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavBar from "../../components/user/NavBar";
import CommonFooter from "../../components/user/CommonFooter";
import '../../helper/stylesheets/HomePage.css';

import image_Carousel1 from '../../helper/images/HomePage/Carousel1.jpg'
import image_Carousel2 from '../../helper/images/HomePage/Carousel2.jpg'
import image_Carousel3 from '../../helper/images/HomePage/Carousel3.jpg'
import image_Flickity1 from '../../helper/images/HomePage/Flickity1.jpg'
import image_Flickity2 from '../../helper/images/HomePage/Flickity2.png'
import image_Flickity3 from '../../helper/images/HomePage/Flickity3.png'
import image_HomeBanner from '../../helper/images/HomePage/HomeBanner.jpg'
import image_HomeCard1 from '../../helper/images/HomePage/HomeCard1.png'
import image_HomeCard2 from '../../helper/images/HomePage/HomeCard2.png'


import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Container, Row, Col
} from 'reactstrap';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';

import Flickity from 'react-flickity-component'
import {history} from "../../helper/others/history";


const items = [
    {
        src: image_Carousel1,
        altText: 'Slide 1',
        caption: 'Watch New Movies',


    },
    {
        src: image_Carousel2,
        altText: 'Slide 2',
        caption: 'Deadpool',

    },
    {
        src: image_Carousel3,
        altText: 'Slide 3',
        caption: 'I feel pretty, Super troopers 2',

    }
];

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            homeMovieTable: [],
        }


        this.state = {activeIndex: 0};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    componentWillMount() {
        //call api to fetch home movies

    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({activeIndex: newIndex});
    }


    render() {
        const {activeIndex} = this.state;
        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}

                >
                    <img src={item.src} alt={item.altText} className={'d-block w-100'} onClick={() => {
                        console.log("clicked on image");
                    }}/>
                    <CarouselCaption captionHeader={item.caption} captionText={""}/>
                </CarouselItem>
            );
        });

        const flickityOptions = {
            initialIndex: 0,
            autoPlay: true
        }




        return (


            <div className={'home_main_wrap'}>
                <NavBar/>

                <Container fluid={true} style={{padding: 0}}>
                    <Row noGutters={true} style={{margin: 25}}>
                        <Col sm="12" md={{size: 8, offset: 2}}>
                            <Flickity
                                className={'carousel'} // default ''
                                elementType={'div'} // default 'div'
                                options={flickityOptions} // takes flickity options {}
                                disableImagesLoaded={false} // default false
                                reloadOnUpdate // default false
                            >
                                <div className={'home_page_carousel-cell'} onClick={() => {
                                    history.push("/movie-detail?movie=5ae8d711b0a452957d901f9d");
                                }}>
                                    <img  src={image_Flickity1} alt={""}/>
                                    <p className={"HomeFlickityNameTag"}>Pain & Gain</p>
                                </div>
                                <div className={'home_page_carousel-cell'} onClick={() => {
                                    history.push("/movie-detail?movie=5ae8d711b0a452957d901f9e");
                                }}>
                                    <img src={image_Flickity2} alt={""}/>
                                    <p className={"HomeFlickityNameTag"}>Cab for Three</p>
                                </div>
                                <div className={'home_page_carousel-cell'} onClick={() => {
                                    history.push("/movie-detail?movie=5ae8d711b0a452957d901f9f");
                                }}>
                                    <img src={image_Flickity3} alt={""}/>
                                    <p className={"HomeFlickityNameTag"}>Pixies</p>
                                </div>

                            </Flickity>
                        </Col>
                    </Row>

                    <Row>
                        <Col>

                            <Carousel
                                activeIndex={activeIndex}
                                next={this.next}
                                previous={this.previous}

                            >
                                <CarouselIndicators items={items} activeIndex={activeIndex}
                                                    onClickHandler={this.goToIndex}/>
                                {slides}
                                <CarouselControl direction="prev" directionText="Previous"
                                                 onClickHandler={this.previous}/>
                                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next}/>
                            </Carousel>

                        </Col>
                    </Row>

                    <Row>
                        <Col>

                            <img src={image_HomeBanner} alt={"HomeBanner"} id={"HomeBanner"}/>

                        </Col>
                    </Row>

                    <Row style={{margin: 30}}>
                        <Col>

                            <Card>
                                <CardImg top width="100%"
                                         src={image_HomeCard1}
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle><em>WELCOME TO THE SUMMER OF MORE</em></CardTitle>

                                    <CardText>
                                        EARN 150 VIP+ POINTS FOR EVERY TICKET YOU BUY. 600 VIP+ Points unlocks a $6
                                        reward.</CardText>
                                </CardBody>
                            </Card>

                        </Col>
                        <Col>

                            <Card>
                                <iframe className="player"  width="100%" height="100%"
                                        src={"https://www.youtube.com/embed/20bpjtCbCz0"}
                                        frameBorder="0" title={"deadpool trailer"}
                                        allowFullScreen={true}
                                />
                                <CardBody>
                                    <CardTitle>'Deadpool 2' Gift With Purchase</CardTitle>

                                    <CardText>
                                        Receive a FREE* exclusive 'Deadpool 2' poster with ticket purchase (*shipping &
                                        handling not included). </CardText>
                                </CardBody>
                            </Card>

                        </Col>
                        <Col>

                            <Card>
                                <iframe className="player"  width="100%" height="100%"
                                        src={"https://www.youtube.com/embed/6ZfuNTqbHE8"}
                                        frameBorder="0"
                                        title={"Avengers trailer"}
                                        allowFullScreen={true}
                                />
                                <CardBody>
                                    <CardTitle>'Avengers: Infinity War' Gift With Purchase</CardTitle>

                                    <CardText>
                                        Choose 1 of 5 FREE* exclusive posters with ticket purchase (*shipping & handling
                                        not included).</CardText>
                                </CardBody>
                            </Card>

                        </Col>

                        <Col>

                            <Card>
                                <CardImg top width="100%"
                                         src={image_HomeCard2}
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>20% Off Your First Month</CardTitle>

                                    <CardText>
                                        Watch the newest movies not available on Netflix, Hulu or Amazon Prime
                                        subscriptions. New customers get 20% off for 1 month!</CardText>
                                </CardBody>
                            </Card>

                        </Col>


                    </Row>


                    <br/><br/>
                </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);