import React, {Component} from 'react';
import {connect} from 'react-redux';

import {history} from "../../helper/others/history";
import image_Logo from '../../helper/images/FandangLogoFull.svg'
import {userActions} from "../../action/user/user.action";

class HallNavBar extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);


    }

    componentWillMount() {
        //  console.log("componentWillMount NavBar");
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout();
    };

    render() {

        return (

            <div className={'home_main_wrap'}>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" onClick={() => {
                        history.push("/halladmin");
                    }}> <img className="navbar-logo"
                             src={image_Logo} alt={"logo"}/>
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">


                            <li className="nav-item">
                                <a className="nav-link" onClick={() => {
                                    history.push("/halladmin");
                                }}>
                                    Home
                                </a>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link" onClick={() => {
                                    history.push("/ManageBookings");
                                }}>
                                    Bookings
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" onClick={() => {
                                    history.push("/halladmin/revenue");
                                }}>
                                    Revenue
                                </a>
                            </li>

                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {/*<li className="nav-item">*/}
                                {/*<a className="nav-link" onClick={() => { history.push("/MyProfile"); }}>*/}
                                    {/*<i className="fa fa-address-book mr-1"/>*/}
                                    {/*My Profile*/}
                                {/*</a>*/}
                            {/*</li>*/}
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleLogout}><i className="fa fa-hotel mr-1"/>Logout</a>
                            </li>

                        </ul>

                    </div>
                </nav>

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
        logout: () => dispatch(userActions.logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HallNavBar);