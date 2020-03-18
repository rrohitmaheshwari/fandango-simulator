import React, { Component } from 'react';
import { connect }          from 'react-redux';
import '../../helper/stylesheets/account.css';

class AccountPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user : {
                email           : "",
                firstName       : "",
                lastName        : "",
                phone           : "",
                address         : "",
                city            : "",
                state           : "",
                zip             : "",
                cardNumber      : "",
                cardMonth       : "",
                cardYear        : "",
                cardZip         : "",
                profileImage    : "",
                openImageModal  : false,
                isUploaded      : false,
                previewImage    : [],
            }
        }
    }

    componentWillMount(){
        // const user  = this.props.userDetails.user;
        // this.props.fetchUser(user.email);
    }

    render() {

        // const user  = this.props.userDetails.user;

        return (
            <div className = "account_main_wrap">
                <div className = "account_main">
                    Account Page
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {

    const { user } = state;
    return {
        user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // fetchUser : (email) => dispatch(userDispatch.fetchUser(email))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);