import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../../actions/userActions';
import isEmpty from '../../../validation/is-empty';

class UserProfile extends Component {
  showProfile() {
    if (!isEmpty(this.props.user.user)) {
      return(
        <div className="col-6 text-left">
          <div className="fnt-weight-500">Contact Number</div>
          <div className="profile-usertitle-info fnt-weight-300">
            {this.props.user.user.contact_num}
          </div>
          <div className="fnt-weight-500">Email</div>
          <div className="profile-usertitle-info fnt-weight-300">
            {this.props.user.googleProfile.email}
          </div>
          <div className="fnt-weight-500">Address</div>
          <div className="profile-usertitle-info wrap-long-name fnt-weight-300">
            {this.props.user.user.address}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="m-3 text-left col">
        <div className="m-2 row">
          <div className="col-2">
            <img
              src={this.props.user.googleProfile.picture}
              className="main-profile-img"
              alt="Profile"
            />
          </div>
          <div className="col-4 text-left">
            <div className="mb-2 row fnt-weight-600 wrap-long-name title-size-1-5em">
              {this.props.user.googleProfile.name}
            </div>
            <div className="mb-2 row">
              <button
                className="btn btn-sm hover-w-b"
                onClick={() => {
                  this.props.onShowProfileForm();
                }}
              >
                <i className="fas fa-user-circle text-info mr-1" />Edit Profile
              </button>
            </div>
          </div>
          {this.showProfile()}
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
