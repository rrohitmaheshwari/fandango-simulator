import React, {Component} from                                     'react'                                             ;
import {connect} from                                              'react-redux'                                       ;
import NavBar from                                                 "../../components/user/NavBar"                      ;
import CommonFooter from                                           "../../components/user/CommonFooter"                ;
import                                                             '../../helper/stylesheets/MyProfile.css'            ;
import                                                             'react-accessible-accordion/dist/fancy-example.css' ;
import staticImg from                                              '../../helper/images/profile-pic.jpg'               ;
import Dropzone from                                               'react-dropzone'                                    ;
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'                                        ;
import {RESTService} from                                          "../../api/index"                                   ;
import Alert from                                                  'react-s-alert'                                     ;
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import {
    Container, Row, Col
} from 'reactstrap';
import {withRouter} from "react-router-dom";

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname       : "",
            lastname        : "" ,
            profileImg      : "",
            isUploaded      : false,
        }
    }

    componentWillMount() {
        // console.log(this.props.match.params.email)
        RESTService.getOtherUserDetails( this.props.match.params.email )
            .then( response => {
                this.setState({
                    firstname:response.data.user.firstname,
                    lastname:response.data.user.lastname,
                    email:response.data.user.email,
                })
                console.log(response)
            })
            .catch(() => {
                // logout logic
            });
    }

    render() {
        
        const { user } = this.props;
        const { profileImg } = this.state;

        return (
            <div className={'myprofile_main_wrap'}>
                <NavBar/>

                <Container className="webkit-fill-available">
                    <Row className="mt-4">
                        <Col sm="8">
                            <Accordion accordion={false} className = "myprofile_border_none">
                                <AccordionItem className="myprofile_accordion_title" expanded={true}>
                                    <AccordionItemTitle className="accordion__title myprofile_accordion_title">
                                        <h2 className = "u-position-relative myprofile_heading-style-1 ">
                                            Basic Information
                                            <div className = "accordion__arrow"/>
                                        </h2>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
                                        <form>
                                            <Row className="mt-2">
                                                <Col >
                                                    <input disabled className="form-control w-100" type="text"
                                                    placeholder="First Name" required={true}
                                                    name="firstname"
                                                    value={this.state.firstname}
                                                    />
                                                </Col>
                                                <Col >
                                                    <input disabled className="form-control w-100" type="text"
                                                    placeholder="Last Name" required={true}
                                                    name="lastname"
                                                    value={this.state.lastname}
                                                    />
                                                </Col>
                                            </Row>
                                        </form>
                                    </AccordionItemBody>
                                </AccordionItem>
                            </Accordion>
                        </Col>
                        <Col sm="4">
                            <Row className="ml-1">
                                <div className="profile-avatar-image" >
                                    <div className="profile-avatar-image-uploader">
                                        <div className="profile-avatar-image-wrapper">
                                            <div className="profile-avatar-image-done">
                                                <img className="avatar-image" alt="Profile" src={profileImg ? URL.createObjectURL(profileImg) : `/ProfileImages/${this.state.email}.jpg`} onError = {(e) => {e.target.src = staticImg}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <CommonFooter/>
            </div>
        );
    }
}

function mapStateToProps(state) {

    const { user } = state.authentication;
    return {
        user
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));