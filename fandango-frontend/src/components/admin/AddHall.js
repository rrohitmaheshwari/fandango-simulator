import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../helper/stylesheets/AddMovie.css';

import {
    Container, Row, Col
} from 'reactstrap';
import {adminActions} from "../../action/admin/admin.action";
import AdminNavBar from "./AdminNavBar";


class AddHall extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.errorAlert=this.errorAlert.bind(this);

        this.state={
            ownerEmail:'',
            ownerPassword:'',
            name:'',
            address:'',
            phone:'',
            city:'',
            state:'AK',
            zip:'',
            image:'',
        }


    }

    componentWillMount() {

    }

    errorAlert(){
        const {alert} = this.props;
        if(alert && alert.message){
            return(
                <aside className={`alert ${alert.type}`}>{alert.message}</aside>
            )
        }
    }


    handleInputChange(e){
        e.preventDefault();
        if(e.target.id==="image") {
            this.setState({[e.target.id]: e.target.files[0]});
            console.log(e.target.files[0]);
            // console.log(e.target.files[0].name);
        }
        else
            this.setState({[e.target.id]:e.target.value});

        // this.setState({[e.target.id]:e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const {ownerEmail,ownerPassword,name,address,city,state,zip,phone,image} = this.state;

        let formData = new FormData();
        formData.append('ownerEmail', ownerEmail);
        formData.append('ownerPassword', ownerPassword ?ownerPassword:"");
        formData.append('name', name?name:"");
        formData.append('address', address?address:"");
        formData.append('city', city?city:"");
        formData.append('state', state?state:"AK");
        formData.append('zip', zip?zip:"");
        formData.append('phone', phone?phone:"");
        formData.append('image', image)

        this.props.addHall(formData);
        console.log(formData);
    }


    render() {

        const {ownerEmail,ownerPassword,name,address,city,state,zip,phone,image} = this.state;


        return (


            <div className={''}>
                <AdminNavBar/>
                <Container fluid={true} style={{padding: 0}}>
                    <center><h3>Add Hall</h3></center>

                    <Row noGutters={true} style={{margin: 25}}>

                        <Col sm="12" md={{size: 6, offset: 3}}>
                            <form onSubmit={this.handleSubmit}>
                                {this.errorAlert()}

                                <div className="form-group">
                                    <label htmlFor="ownerEmail">Owner Email Address</label>
                                    <input type="email" className="form-control" id="ownerEmail" value={ownerEmail} onChange={this.handleInputChange} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ownerPassword">Password</label>
                                    <input type="password" className="form-control" id={"ownerPassword"}  value={ownerPassword} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Hall Name</label>
                                    <input type="text" className="form-control" id={"name"} value={name} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="image">Hall Image</label>
                                    <input type="file" className="form-control" id={"image"} onChange={this.handleInputChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id={"address"} value={address} onChange={this.handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" className="form-control" id={"phone"} value={phone} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" id={"city"} value={city} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="zip">Zip Code</label>
                                    <input type="text" className="form-control" id={"zip"} value={zip} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <select className="form-control" id="state" value={state} onChange={this.handleInputChange}>
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
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" >Add Hall</button>
                            </form>
                        </Col>
                    </Row>

                </Container>
            </div>

        );
    }
}



function mapStateToProps(state) {

    const {alert} = state;
    return {
        alert
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addHall : (hall) => dispatch(adminActions.addHall(hall))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHall);