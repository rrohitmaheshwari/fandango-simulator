import React,{Component} from 'react';
import '../../helper/stylesheets/SignUpPage.css'
import banner from '../../helper/images/SignInPage/vip_banner.png'
import {history} from '../../helper/others/history';
import {connect} from 'react-redux';
import {userActions} from '../../action/user/user.action';
import {alertActions} from "../../action/alert/alert.action";

class SignUpPage extends Component{

    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            confirmpassword:""
        }
        this.handleChange =this.handleChange.bind(this);
        this.handleSignUpUser =this.handleSignUpUser.bind(this);
        this.errorAlert = this.errorAlert.bind(this);

    }

    handleSignUpUser(e){
        e.preventDefault();
        console.log(this.state);
        const {dispatch} = this.props;
        if ((this.state.password === this.state.confirmpassword)) {

            let user = {
                email:this.state.email,
                password:this.state.password,
            }
            dispatch(userActions.signup(user));       ///try w_ dispatch
        } else {
            dispatch(alertActions.error({message:"Password doesn't match!"}))
        }
    }

    handleChange(e){

        this.setState({[e.target.id]:e.target.value});
    }

    errorAlert(){
        const {alert} = this.props;
        if(alert && alert.message){
            return(
                <aside className={`alert ${alert.type}`}>{alert.message}</aside>
            )
        }
    }

    render(){
        return(
            <div className="container-fluid signup-background">
                <div className="row">
                    <div className="col-md-4 offset-md-2 signup-card">
                        <form>
                            <div className="form-group signup-perkcard">
                                Level up your movie life with Fandango VIP:
                            </div>
                            <div className="form-group signup-perks">
                                NEW! EARN POINTS, GET MOVIES
                            </div>
                            <div className="form-group signup-perks">
                                INSIDER PERKS
                            </div>
                            <div className="form-group signup-perks">
                                PARTNER REWARDS
                            </div>
                            <div className="form-group signup-perks">
                                REFUNDS & EXCHANGES
                            </div>
                            <div>
                                <img src={banner}/>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4 signup-card-perk">
                        <form onSubmit={this.handleSignUpUser}>
                            <div className="form-group">
                                <div className="signup-fandango">JOIN FANDANDO
                                    <span className="signup-vip">VIP</span>
                                </div>
                                <div className="signup-card-text">
                                    (And become eligible for VIP+ Points)
                                </div>
                            </div>
                            {/*<div className="form-group">*/}
                                {/*<label htmlFor="firstname" className="signup-label">First Name</label>*/}
                                {/*<input type="text" className="form-control" id="firstname"  value={this.state.firstname} onChange={this.handleChange}/>*/}
                            {/*</div>*/}

                            {/*<div className="form-group">*/}
                                {/*<label htmlFor="lastname" className="signup-label">Last Name</label>*/}
                                {/*<input type="text" className="form-control" id="lastname"  value={this.state.lastname} onChange={this.handleChange}/>*/}
                            {/*</div>*/}
                            {this.errorAlert()}
                            <div className="form-group">
                                <label htmlFor="email" className="signup-label">Email</label>
                                <input type="email" required={true} className="form-control" id="email"  value={this.state.email} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="signup-label">Password</label>
                                <input type="password" required={true} className="form-control" id="password"  value={this.state.password} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmpassword" className="signup-label">Confirm Password</label>
                                <input type="password" required={true} className="form-control" id="confirmpassword" value={this.state.confirmpassword} onChange={this.handleChange}/>
                            </div>

                            {/*<div className="form-group">*/}
                                {/*<label htmlFor="address" className="signup-label">Address</label>*/}
                                {/*<input type="text" className="form-control" id="address"  value={this.state.address} onChange={this.handleChange}/>*/}
                            {/*</div>*/}

                            {/*<div className="form-group">*/}
                                {/*<label htmlFor="city" className="signup-label">City</label>*/}
                                {/*<input type="text" className="form-control" id="city"  value={this.state.city} onChange={this.handleChange}/>*/}
                            {/*</div>*/}


                            {/*<div className="form-group">*/}
                                {/*<label htmlFor="state" className="signup-label">State</label>*/}
                                {/*<select className="form-control" id="state" >*/}
                                    {/*<option value="AK">Alaska</option>*/}
                                    {/*<option value="AL">Alabama</option>*/}
                                    {/*<option value="AR">Arkansas</option>*/}
                                    {/*<option value="AZ">Arizona</option>*/}
                                    {/*<option value="CA">California</option>*/}
                                    {/*<option value="CO">Colorado</option>*/}
                                    {/*<option value="CT">Connecticut</option>*/}
                                    {/*<option value="DC">District of Columbia</option>*/}
                                    {/*<option value="DE">Delaware</option>*/}
                                    {/*<option value="FL">Florida</option>*/}
                                    {/*<option value="GA">Georgia</option>*/}
                                    {/*<option value="HI">Hawaii</option>*/}
                                    {/*<option value="IA">Iowa</option>*/}
                                    {/*<option value="ID">Idaho</option>*/}
                                    {/*<option value="IL">Illinois</option>*/}
                                    {/*<option value="IN">Indiana</option>*/}
                                    {/*<option value="KS">Kansas</option>*/}
                                    {/*<option value="KY">Kentucky</option>*/}
                                    {/*<option value="LA">Louisiana</option>*/}
                                    {/*<option value="MA">Massachusetts</option>*/}
                                    {/*<option value="MD">Maryland</option>*/}
                                    {/*<option value="ME">Maine</option>*/}
                                    {/*<option value="MI">Michigan</option>*/}
                                    {/*<option value="MN">Minnesota</option>*/}
                                    {/*<option value="MO">Missouri</option>*/}
                                    {/*<option value="MS">Mississippi</option>*/}
                                    {/*<option value="MT">Montana</option>*/}
                                    {/*<option value="NC">North Carolina</option>*/}
                                    {/*<option value="ND">North Dakota</option>*/}
                                    {/*<option value="NE">Nebraska</option>*/}
                                    {/*<option value="NH">New Hampshire</option>*/}
                                    {/*<option value="NJ">New Jersey</option>*/}
                                    {/*<option value="NM">New Mexico</option>*/}
                                    {/*<option value="NV">Nevada</option>*/}
                                    {/*<option value="NY">New York</option>*/}
                                    {/*<option value="OH">Ohio</option>*/}
                                    {/*<option value="OK">Oklahoma</option>*/}
                                    {/*<option value="OR">Oregon</option>*/}
                                    {/*<option value="PA">Pennsylvania</option>*/}
                                    {/*<option value="PR">Puerto Rico</option>*/}
                                    {/*<option value="RI">Rhode Island</option>*/}
                                    {/*<option value="SC">South Carolina</option>*/}
                                    {/*<option value="SD">South Dakota</option>*/}
                                    {/*<option value="TN">Tennessee</option>*/}
                                    {/*<option value="TX">Texas</option>*/}
                                    {/*<option value="UT">Utah</option>*/}
                                    {/*<option value="VA">Virginia</option>*/}
                                    {/*<option value="VT">Vermont</option>*/}
                                    {/*<option value="WA">Washington</option>*/}
                                    {/*<option value="WI">Wisconsin</option>*/}
                                    {/*<option value="WV">West Virginia</option>*/}
                                    {/*<option value="WY">Wyoming</option>*/}

                                {/*</select>*/}
                            {/*</div>*/}

                            {/*<div className="form-group">*/}
                                {/*<label htmlFor="zip" className="signup-label">Zip</label>*/}
                                {/*<input type="text" className="form-control" id="zip"  value={this.state.zip} onChange={this.handleChange}/>*/}
                            {/*</div>*/}

                            {/*<div className="form-group">*/}
                                {/*<label htmlFor="phone" className="signup-label">Phone</label>*/}
                                {/*<input type="phone" className="form-control" id="phone"  value={this.state.phone} onChange={this.handleChange}/>*/}
                            {/*</div>*/}

                            <button type="submit" className="btn btn-block btn-primary">JOIN FOR FREE NOW</button>
                            <button onClick={() => {history.push("/signin");}} className="btn btn-block btn-secondary">SIGN IN</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {registering} = state.signup;
    const {alert}=state;
    return {
        registering,alert
    };
}

export default connect(mapStateToProps)(SignUpPage);