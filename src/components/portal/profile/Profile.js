import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';
import Spinner from '../../common/Spinner';
// import { getUsers } from '../../../actions/userActions';

class Profile extends Component {
  // constructor(props) {
  //   super(props);
  //   if (!isEmpty(this.props.role) && !isEmpty(this.props.userId)) {
  //     this.props.getUsers(this.props.role, this.props.userId);
  //   }
  // }

  show() {
    const { user, googleProfile, loading } = this.props.user;
    if (isEmpty(user) || isEmpty(googleProfile) || loading) {
      return <Spinner size={'150px'} />;
    } else {
      return (
        <div className="profile-usermenu white-text mt-4">
          <div className="profile-header">
            <div className="profile-usertitle-title d-inline fnt-weight-500">
              {user.name}
            </div>
            <button
              type="button"
              disabled
              className="btn btn-link d-inline p-1 my-auto profile-blue-color profile-small-link float-right"
            >
              Edit
            </button>
          </div>
          <div className="profile-userpic p-4">
            <img
              src={googleProfile.picture}
              className="img-responsive"
              alt=""
            />
          </div>
          <div className="profile-small-subtitle mt-2">{user.jobPosition}</div>
          <div className="fnt-weight-400">Contact Number</div>
          <div className="profile-usertitle-info fnt-weight-300">
            {user.contact_num}
          </div>
          <div className="fnt-weight-400">Email</div>
          <div className="profile-usertitle-info fnt-weight-300">
            {user.email}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="text-left profile-blue-color ml-3">{this.show()}</div>
    );
  }
}

Profile.propTypes = {
  // getUsers: PropTypes.func.isRequired
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Profile);
