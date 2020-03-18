import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../helper/stylesheets/AdminHallSearch.css';
import {Container, Row, Col, Button} from 'reactstrap';
import {adminActions} from "../../action/admin/admin.action";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {alertActions} from "../../action/alert/alert.action";
import AdminNavBar from "./AdminNavBar";
import {withRouter} from "react-router-dom";
import {history} from "../../helper/others/history";
import {RESTService} from "../../api";





class UserEdit extends Component {

    constructor(props) {
        super(props);

        this.state={
            selectedUser:{

            },
            newUser:{

            },
            usedSelectedUserFromParams:false,
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.errorAlert=this.errorAlert.bind(this);

    }

    handleChange = (selectedUser) => {
        if(selectedUser==null){
            this.setState({selectedUser:{

                },
                newUser:{},
            });
        }
        else {
            let newUser={...selectedUser}
            newUser.password="";
            this.setState({selectedUser,newUser});
        }
        console.log("Selected");
        console.log(selectedUser);
    }


    componentWillMount() {

        this.props.fetchUsers();
        
    }

    componentDidUpdate() {


        const { selectedUser,usedSelectedUserFromParams } = this.state;
        const {users,loadingUsers}=this.props;
        const {params} = this.props.match;
        if(params.userId && params.userId!="" && !loadingUsers && usedSelectedUserFromParams===false && Object.keys(selectedUser).length===0){
            console.log("in")
            users.map((item)=>{
                if(item.user_id==params.userId){
                    let newUser={...item};
                    newUser.password="";
                    this.setState({usedSelectedUserFromParams:true,selectedUser:item,newUser});
                }
            })
        }

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
        const {newUser} = this.state;
        if(e.target.id==="image") {
            newUser[e.target.id]=e.target.files[0];
            console.log(e.target.files[0]);
        }
        else
            newUser[e.target.id]=e.target.value;

        this.setState({newUser});
    }


    handleSubmit(e){
        e.preventDefault();
        const {newUser}=this.state;
        // this.props.addHall(this.state);
        if(Object.keys(newUser).length===0){
            this.props.errorDisplay({message:"Please select a user first!"});
        }
        else{
            this.props.errorClear();
            const {email,password,firstname,lastname,address,city,state,zip,phone,image} = this.state.newUser;
            let formData = new FormData();
            formData.append('email', email);
            formData.append('password',password ?password:"");
            formData.append('firstname', firstname?firstname:"");
            formData.append('lastname', lastname?lastname:"");
            formData.append('address', address?address:"");
            formData.append('city', city?city:"");
            formData.append('state', state?state:"AK");
            formData.append('zip', zip?zip:"");
            formData.append('phone', phone?phone:"");
            // formData.append('image', image);

            this.props.editUser(formData,newUser.user_id);
            console.log('update clicked');
            console.log(newUser);
            // this.props.errorClear();

        }
        // console.log(this.state);
    }

    handleDelete = (event) => {
        //@TODO Request for Account deletion
        event.preventDefault();
        const { newUser } = this.state;
        if(Object.keys(newUser).length===0){
            this.props.errorDisplay({message:"Please select a user first!"});
        } else {
            const {selectedUser} = this.state;
            console.log("selectedUser ", selectedUser);
            RESTService.deleteAdminUser({email: selectedUser.email})
                .then(response => {
                    this.props.successDisplay({message: "User deleted successfully!"});
                })
                .catch(() => {
                    this.props.errorDisplay({message: "User delete failed!"});
                    // logout logic
                });
        }
    }

    render() {
        //
        // if(!this.props.loadingMovies)
        //     this.setState({movies:this.props.movies})

        const { selectedUser } = this.state;
        const { newUser } = this.state;
        const {users,loadingUsers}=this.props;
        const {email,password,firstname,lastname,address,city,state,zip,phone,image} = this.state.newUser;

        // console.log(ownerEmail)

        return (

            <div >
                <AdminNavBar/>

                <Container>

                    <br/>
                    <Row>
                        <Col md={{size: 3, offset: 3}}>
                            <Select
                                name="userSelect"
                                value={selectedUser}
                                onChange={this.handleChange}
                                options={users}
                                labelKey={'email'}
                                valueKey={'user_id'}
                                isLoading={loadingUsers}
                                matchPos={"start"}
                            />
                        </Col>
                    </Row>
                </Container>

                <Container>


                    <Row noGutters={true} style={{margin: 25}}>

                        <Col sm="12" md={{size: 8, offset: 2}}>
                            <form onSubmit={this.handleSubmit}>
                                <center><h3>Edit User</h3></center>

                                {this.errorAlert()}

                                <div className="form-group">
                                    <label htmlFor="ownerEmail">Email Address</label>
                                    <input type="email" className="form-control" id="email" value={email!=null ? email:""} onChange={this.handleInputChange}  disabled={true}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Password</label>
                                    <input type="password" className="form-control" id={"password"} value={password} onChange={this.handleInputChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" className="form-control" id={"firstname"} value={firstname!=null ? firstname:""} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" className="form-control" id={"lastname"} value={lastname!=null ? lastname:""} onChange={this.handleInputChange} required/>
                                </div>

                                {/*<div className="form-group">*/}
                                    {/*<label>Image</label>*/}

                                    {/*<img className="img-fluid  " src={image}/>*/}

                                    {/*<input type="file" className="form-control" id={"image"} onChange={this.handleInputChange}/>*/}

                                {/*</div>*/}

                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id={"address"} value={address!=null ? address:""} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" className="form-control" id={"phone"} value={phone!=null ? phone :""} onChange={this.handleInputChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" id={"city"} value={city!=null ? city:""} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="zip">Zip Code</label>
                                    <input type="text" className="form-control" id={"zip"} value={zip!=null ? zip :""} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <select className="form-control" id="state" value={state!=null || state!=='' ? state:"AK"} onChange={this.handleInputChange}>
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

                                <button type="submit" className="btn btn-primary btn-block" >Update User</button>
                                <button onClick={this.handleDelete} className="btn btn-danger btn-block" >Delete User</button>
                            </form>
                        </Col>
                    </Row>


                </Container>



            </div>

        );
    }


}



function mapStateToProps(state) {

    const {user} = state;
    const {alert} = state;
    const {users}=state.admin;
    const {loadingUsers}=state.admin;
    return {
        user,
        users,
        loadingUsers,
        alert,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers : () => dispatch(adminActions.getNormalUsers()),
        errorDisplay: (message)=>dispatch(alertActions.error(message)),
        successDisplay: (message)=>dispatch(alertActions.success(message)),
        errorClear: ()=>dispatch(alertActions.clear()),
        editUser: (user,id)=>dispatch(adminActions.editUser(user,id)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEdit));