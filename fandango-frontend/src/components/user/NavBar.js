import React, {Component} from 'react';
import {connect} from 'react-redux';

import {history} from "../../helper/others/history";
import image_Logo from '../../helper/images/FandangLogoFull.svg'
import {userActions} from "../../action/user/user.action";

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {searchValue: ''};
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);


    }

    componentWillMount() {
        //  console.log("componentWillMount NavBar");
    }

    handleSearchChange(event) {
        this.setState({searchValue: event.target.value});
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        if (this.state.searchValue.trim() !== "") {
            history.push("/movies?search=" + this.state.searchValue);
            this.setState({searchValue: ""});
        }
        else {
            alert('No Searching Parameters');
            //or do nothing
        }

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
                        history.push("/home");
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
                            <li>
                                <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSearchSubmit}>
                                    <input className="form-control mr-sm-2" type="search"
                                           placeholder="Enter Movie or Theater" aria-label="Search"
                                           value={this.state.searchValue} onChange={this.handleSearchChange}
                                           required={true}/>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit"
                                            id={"Navbar_go"}>GO
                                    </button>
                                </form>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" onClick={() => {
                                    history.push("/home");
                                }}>
                                    Home
                                </a>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link" onClick={() => { history.push("/ManageBookings"); }}>
                                    Manage Transaction
                                </a>
                            </li>

                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => { history.push("/MyProfile"); }}>
                                    <i className="fa fa-address-book mr-1"/>
                                    My Profile
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick = { this.handleLogout }><i className="fa fa-hotel mr-1"/>Logout</a>
                            </li>

                        </ul>

                    </div>
                </nav>

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
        logout: () => dispatch(userActions.logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);