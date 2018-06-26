import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../../actions/userActions';

class UserProfile extends Component {
render() {
    return (
    <div className="m-3 text-left col">
        <div className="m-2 row">
            <div className="col-2">
                <img src={this.props.user.googleProfile.picture} className="main-profile-img" alt="Profile picture"/>
            </div>
            <div className="col-10 text-left">
                <div className="mb-2 row fnt-weight-600 title-size-1-5em">
                    {this.props.user.googleProfile.given_name} {this.props.user.googleProfile.family_name}
                </div>
                <div className="mb-2 row fnt-weight-400 title-size-1em">
                    {this.props.user.googleProfile.email}
                </div>
                <div className="mb-2 row">
                    <button type="button" className="pl-0 btn btn-link red-alert-minimal-button">Delete Account</button>
                </div>
            </div>
        </div>


    </div>
    );
}
}


const mapStateToProps = state => ({
user: state.user
});

export default connect(
mapStateToProps,
{ getUsers }
)(UserProfile);
