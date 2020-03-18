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
import {history} from "../../helper/others/history";
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import {
    Container, Row, Col
} from 'reactstrap';

class MyProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname       : "",
            lastname        : "" ,
            phone           : ""    ,
            address1        : ""  ,
            address2        : ""                       ,
            city            : ""     ,
            state           : ""    ,
            zip             : ""      ,
            cardnumber      : ""                       ,
            cardmonth       : ""                       ,
            cardyear        : ""                       ,
            cardzip         : ""                       ,
            profileImg      : ""                       ,
            openImageModal  : false                    ,
            openDeleteModal : false                    ,
            isUploaded      : false                    ,
            previewImage    : []                       ,
            initalUpdate    : false
        }
    }

    componentWillMount() {
        const { user } = this.props;

        if(!this.state.initalUpdate && user && Object.keys(user).length > 0) {
            console.log("##componentWillMount called::inside", user);
            this.setState({
                firstname       : this.props.user.firstname,
                lastname        : this.props.user.lastname ,
                phone           : this.props.user.phone    ,
                address1        : this.props.user.address  ,
                address2        : ""                       ,
                city            : this.props.user.city     ,
                state           : this.props.user.state    ,
                zip             : this.props.user.zip      ,
                initalUpdate    : true
            });
        }
    }

    componentDidUpdate() {

        console.log("##componentDidUpdate called");
        const { user } = this.props;

        if(!this.state.initalUpdate && user && Object.keys(user).length > 0) {
            console.log("##componentDidUpdate called::inside", user);
            this.setState({
                firstname       : this.props.user.firstname,
                lastname        : this.props.user.lastname ,
                phone           : this.props.user.phone    ,
                address1        : this.props.user.address  ,
                address2        : ""                       ,
                city            : this.props.user.city     ,
                state           : this.props.user.state    ,
                zip             : this.props.user.zip      ,
                initalUpdate    : true
            });
        }
    }

    isValidUSZip = (sZip) => {
        return /^\d{5}(-\d{4})?$/.test(sZip);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    onOpenImageModal = () => {
        this.setState({ openImageModal: true });
    };
    
    toggleImageModal = () => {
        this.setState({ 
            openImageModal: !this.state.openImageModal, 
            previewImage: [],
            isUploaded : false
        });
        
    };

    onDrop = (acceptedFiles, rejectedFiles) => {

        var projectFiles = this.state.previewImage;
        projectFiles.splice(0,1);
        projectFiles.push(acceptedFiles);
        this.setState({
            previewImage: projectFiles,
            isUploaded : true
        });
    };    

    handleChangeImg = (event) => {

        event.preventDefault();

        let profile = new FormData();
        profile.append( 'file', this.state.previewImage[0][0]);
        RESTService.saveProfileImage( profile )
        .then(() => {
            this.setState({
                profileImg : this.state.previewImage[0][0]
            });
            this.toggleImageModal();
        });
        // const { user } = this.props;
    };

    toggleDeleteModal = () => {
        this.setState({ 
            openDeleteModal: !this.state.openDeleteModal
        });
        
    };

    handleDelete = (event) => {
        //@TODO Request for Account deletion
        event.preventDefault();

        RESTService.deleteUser( )
        .then( response => {

            this.toggleDeleteModal();
            // logout logic
            history.push('/signin');  //login page after session expire
        })
        .catch(() => {
            // logout logic
        });
    }

    showSuccessAlert = (message) => {

        Alert.success( message, {
            position: 'top-right',
            effect: 'slide',
            timeout: 5000
        });
    }    

    showErrorAlert = (message) => {

        Alert.error( message, {
            position: 'top-right',
            effect: 'slide',
            timeout: 5000
        });
    }

    saveBasicInfo = (event) => {

        event.preventDefault();
        let user = {
            "firstname" : this.state.firstname,
            "lastname"  : this.state.lastname ,
            "phone"     : this.state.phone
        }

        RESTService.saveBasicInfo( user )
        .then( response => {

            this.showSuccessAlert(response.data.message);
        })
        .catch(() => {
            // logout logic
        });
    }
    
    saveAddress = (event) => {

        event.preventDefault();

        if(this.isValidUSZip(this.state.zip)) {
            
            // valid zip
            let user = {
                "address" : this.state.address1 + ', ' + this.state.address2,
                "city"    : this.state.city ,
                "state"   : this.state.state,
                "zip"     : this.state.zip
            }
    
            RESTService.saveAddressInfo( user )
            .then( response => {
                this.showSuccessAlert(response.data.message);
            })
            .catch(() => {
                // logout logic
            });
        } else {

            this.showErrorAlert('Invalid Zip code. Please enter a valid Zip!');
        }
    }    
    
    saveCardInfo = (event) => {

        event.preventDefault();

        if(!this.isValidUSZip(this.state.cardzip)) {
            
                        this.showErrorAlert('Invalid Billing Zip code. Please enter a valid Billing Zip!');

        }

        else if(isNaN(parseInt(this.state.cardnumber)) || ((parseInt(this.state.cardnumber).toString().length < 16))) {

                        this.showErrorAlert('InvalidCardNumber ');

        }

        else {
            let user = {
                "cardnumber" : this.state.cardnumber,
                "cardmonth"  : this.state.cardmonth  ,
                "cardyear"   : this.state.cardyear   ,
                "cardzip"    : this.state.cardzip
            }

            RESTService.saveCardInfo( user )
                .then( response => {

                    this.showSuccessAlert(response.data.message);
                })
                .catch(() => {
                    // logout logic
                });

        }
    }

    render() {
        
        const { user } = this.props;
        const { profileImg } = this.state;

        return (
            <div className={'myprofile_main_wrap'}>
                <NavBar/>
                <Container className="webkit-fill-available">
                    { this.state.initalUpdate &&
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
                                            <form onSubmit={ this.saveBasicInfo }>
                                                <Row className="mt-2">
                                                    <Col >
                                                        <input className="form-control w-100" type="text"
                                                        placeholder="First Name" required={true}
                                                        name="firstname"
                                                        value={this.state.firstname}
                                                        onChange={this.handleChange}
                                                        />
                                                    </Col>
                                                    <Col >
                                                        <input className="form-control w-100" type="text"
                                                        placeholder="Last Name" required={true}
                                                        name="lastname"
                                                        value={this.state.lastname}
                                                        onChange={this.handleChange}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-4">
                                                    <Col sm="6">
                                                        <input className="form-control w-100" type="text"
                                                            placeholder="Phone" required={true}
                                                            name="phone"
                                                            value={this.state.phone}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Col>
                                                    <Col sm="6" className="text-right">
                                                        <button className="btn btn-primary myprofile_save_button" type="submit"
                                                                >
                                                            Save
                                                        </button>
                                                    </Col>                                                
                                                </Row>
                                            </form>
                                        </AccordionItemBody>
                                    </AccordionItem>

                                    <AccordionItem className="myprofile_accordion_title mt-4">
                                        <AccordionItemTitle className="accordion__title myprofile_accordion_title">
                                            <h2 className = "u-position-relative myprofile_heading-style-1">
                                                Change Address
                                                <div className = "accordion__arrow"/>
                                            </h2>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <form onSubmit={ this.saveAddress }>
                                                    <Row className="mt-2">
                                                        <Col >
                                                            <input className="form-control w-100" type="text"
                                                            placeholder="Address 1" required={true}
                                                            name="address1"
                                                            value={this.state.address1}
                                                            onChange={this.handleChange}
                                                            />
                                                        </Col>
                                                        <Col >
                                                            <input className="form-control w-100" type="text"
                                                            placeholder="Address 2"
                                                            name="address2"
                                                            
                                                            onChange={this.handleChange}
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row className="mt-4">
                                                        <Col sm="3">
                                                            <input className="form-control w-100" type="text"
                                                            placeholder="City" required={true}
                                                            name="city"
                                                            value={this.state.city}
                                                            onChange={this.handleChange}                                                        
                                                            />
                                                        </Col>
                                                        <Col sm="3">
                                                            <select className="form-control" name="state" onChange={this.handleChange} value={this.state.state}>
                                                                <option value="AK">Alaska</option>
                                                                <option value="AL">Alabama</option>
                                                                <option value="AR">Arkansas</option>
                                                                <option value="AZ">Arizona</option>
                                                                <option value="CA">California</option>
                                                                <option value="CO">Colorado</option>
                                                                <option value="CT">Connecticut</option>
                                                                <option value="DC">District of Columbia</option>
                                                                <option value="DE">Delaware</option>
                                                                <option value="FL">Florida</option>
                                                                <option value="GA">Georgia</option>
                                                                <option value="HI">Hawaii</option>
                                                                <option value="IA">Iowa</option>
                                                                <option value="ID">Idaho</option>
                                                                <option value="IL">Illinois</option>
                                                                <option value="IN">Indiana</option>
                                                                <option value="KS">Kansas</option>
                                                                <option value="KY">Kentucky</option>
                                                                <option value="LA">Louisiana</option>
                                                                <option value="MA">Massachusetts</option>
                                                                <option value="MD">Maryland</option>
                                                                <option value="ME">Maine</option>
                                                                <option value="MI">Michigan</option>
                                                                <option value="MN">Minnesota</option>
                                                                <option value="MO">Missouri</option>
                                                                <option value="MS">Mississippi</option>
                                                                <option value="MT">Montana</option>
                                                                <option value="NC">North Carolina</option>
                                                                <option value="ND">North Dakota</option>
                                                                <option value="NE">Nebraska</option>
                                                                <option value="NH">New Hampshire</option>
                                                                <option value="NJ">New Jersey</option>
                                                                <option value="NM">New Mexico</option>
                                                                <option value="NV">Nevada</option>
                                                                <option value="NY">New York</option>
                                                                <option value="OH">Ohio</option>
                                                                <option value="OK">Oklahoma</option>
                                                                <option value="OR">Oregon</option>
                                                                <option value="PA">Pennsylvania</option>
                                                                <option value="PR">Puerto Rico</option>
                                                                <option value="RI">Rhode Island</option>
                                                                <option value="SC">South Carolina</option>
                                                                <option value="SD">South Dakota</option>
                                                                <option value="TN">Tennessee</option>
                                                                <option value="TX">Texas</option>
                                                                <option value="UT">Utah</option>
                                                                <option value="VA">Virginia</option>
                                                                <option value="VT">Vermont</option>
                                                                <option value="WA">Washington</option>
                                                                <option value="WI">Wisconsin</option>
                                                                <option value="WV">West Virginia</option>
                                                                <option value="WY">Wyoming</option>
                                                            </select>                                                        
                                                        </Col>
                                                        <Col sm="3">
                                                            <input className="form-control w-100" type="text"
                                                            placeholder="Zip" required={true}
                                                            name="zip"
                                                            value={this.state.zip}
                                                            onChange={this.handleChange}                                                        
                                                            />
                                                        </Col>
                                                        <Col sm="3" className="text-right">
                                                            <button className="btn btn-primary myprofile_save_button" type="submit"
                                                                >
                                                                Save
                                                            </button>
                                                        </Col>
                                                    </Row>
                                            </form>
                                        </AccordionItemBody>
                                    </AccordionItem>

                                    <AccordionItem className="myprofile_accordion_title mt-4 mb-4" >
                                        <AccordionItemTitle className="accordion__title myprofile_accordion_title">
                                            <h2 className = "u-position-relative myprofile_heading-style-1">
                                                Payment Method
                                                <div className = "accordion__arrow"/>
                                            </h2>
                                            <div className="myprofile_sub-head">Save a credit or debit card to your account. We can make checkout even faster for you</div>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <form onSubmit={ this.saveCardInfo }>
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
                                                                name="cardnumber"
                                                                onChange={this.handleChange}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mt-4">
                                                    <Col sm="3">
                                                        <select name="cardmonth" id="ExpirationMonth" className="form-control mr-1" 
                                                                required={true}
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
                                                                onChange={this.handleChange} >
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
                                                                name="cardzip"
                                                                onChange={this.handleChange} />
                                                    </Col>
                                                    <Col sm="7" className="text-right">
                                                        <button className="btn btn-primary myprofile_save_button" type="submit"
                                                            >
                                                            Save
                                                        </button>
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
                                                    <img className="avatar-image" alt="Profile" src={profileImg ? URL.createObjectURL(profileImg) : `/ProfileImages/${user.email}.jpg`} onError = {(e) => {e.target.src = staticImg}}/>
                                                    <a className="picture-upload-trigger" onClick={ this.toggleImageModal }>
                                                        <span className="picture-upload-trigger-inner fa fa-camera">
                                                            <span className="picture-upload-trigger-text">Edit profile picture</span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="ml-1 mt-4">
                                    <Button color="primary" onClick={this.toggleDeleteModal} className="btn btn-primary w-75 btn-lg">
                                        <span className="Button-icon fa fa-trash mr-2"/>
                                        Delete Account
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    }
                    <br/><br/>
                </Container>
                <CommonFooter/>
                <Modal isOpen={this.state.openImageModal} toggle={this.toggleImageModal}>
                        <ModalHeader toggle={this.toggleImageModal}>Upload image</ModalHeader>
                        <ModalBody>
                            <Dropzone
                                    className = "file-upload-area"
                                    onDrop    = { (files) => this.onDrop(files) }
                                >
                                    <div className="drop-area">
                                        {
                                            !this.state.isUploaded &&
                                            <span >Drag your files here or click in this area.</span>
                                        }
                                        {
                                            this.state.isUploaded &&
                                            this.state.previewImage.map((data, index) =>
                                                <img key={index} className="avatar-image" id='img-upload' alt="Upload" src={URL.createObjectURL(data[0])}/>
                                            )
                                        }
                                    </div>
                                </Dropzone>                            
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleChangeImg}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggleImageModal}>Cancel</Button>
                        </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.openDeleteModal} toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>
                        <h4>Confirm Fandango account deletion</h4>
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete your account?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleDelete}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>                
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);