import React,{Component} from 'react';
import '../../helper/stylesheets/SignInPage.css'
import banner from '../../helper/images/SignInPage/vip_banner.png'
import {connect} from 'react-redux';
import {userActions} from '../../action/user/user.action';
import {alertActions} from "../../action/alert/alert.action";
import {history} from "../../helper/others/history";

class SignInPage extends Component{

    constructor(){
        super();
        this.state={
            username:"",
            password:"",
            submitted:false
        };
        this.handleChange =this.handleChange.bind(this);
        this.handleUserLogin =this.handleUserLogin.bind(this);
        this.errorAlert = this.errorAlert.bind(this);

    }

    handleUserLogin(e){
        e.preventDefault();
        console.log("Handle login submit");
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
            dispatch(alertActions.clear());
        }
        else{
            dispatch(alertActions.error({message:"Cannot have empty fields"}))
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
            <div className="container-fluid signin-background">
                <div className="row">
                    <div className="col-md-4 offset-md-2 signin-card">
                        <form>
                            <div className="form-group signin-perkcard">
                                Level up your movie life with Fandango VIP:
                            </div>
                            <div className="form-group signin-perks">
                                NEW! EARN POINTS, GET MOVIES
                            </div>
                            <div className="form-group signin-perks">
                                INSIDER PERKS
                            </div>
                            <div className="form-group signin-perks">
                                PARTNER REWARDS
                            </div>
                            <div className="form-group signin-perks">
                                REFUNDS & EXCHANGES
                            </div>
                            <div>
                                <img src={banner}/>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4 signin-card-perk">
                        <form onSubmit={this.handleUserLogin}>
                            <div className="form-group">
                                <div className="signin-fandango">FANDANDO
                                    <span className="signin-vip">VIP</span>
                                </div>
                            </div>
                            {this.errorAlert()}
                            <div className="form-group">
                                <label htmlFor="inputEmail" className="signin-label">Email Address</label>
                                <input type="text" className="form-control" id="username"  value={this.state.username} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputPassword" className="signin-label">Password</label>
                                <input type="password" className="form-control" id="password"  value={this.state.password} onChange={this.handleChange}/>
                            </div>

                            <button type="submit" className="btn btn-block btn-primary">SIGN IN</button>
                            <button onClick={() => {history.push("/signup");}} className="btn btn-block btn-secondary">SIGN UP</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {loggingIn} = state.authentication;
    const {alert}=state;
    return {
        loggingIn,alert
    };
}

export default connect(mapStateToProps)(SignInPage);