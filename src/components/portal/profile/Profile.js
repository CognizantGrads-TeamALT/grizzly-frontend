import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import photoID from '../../../img/photoID.png';
import isEmpty from '../../../validation/is-empty';
import Spinner from '../../common/Spinner';
import { getUsers } from '../../../actions/userActions';

class Profile extends Component {
  constructor(props) {
    super(props);
    if (!isEmpty(this.props.userType) && !isEmpty(this.props.userId)) {
      this.props.getUsers(this.props.userType, this.props.userId);
    }
  }

  show() {
    const { loading } = this.props;
    const { user } = this.props.user;

    if (isEmpty(user) || loading) {
      return (<Spinner size={'150px'}/>);
    } else {
      return user[0];
    }
  }

  render() {
    return (
      <div className="text-center profile-sidebar surround-parent w-100 h-100">
        <div className="profile-header">
          <div className="profile-header-text">
            Profile
            <button
              type="button"
              className="btn btn-link hover-def-plain-b profile-header-button"
            >
              Edit
            </button>
          </div>
        </div>
        <div className="smaller-profile-box">
          <div className="profile-userpic">
            <img src={photoID} className="img-responsive" alt="" />
          </div>

          <div className="profile-usertitle">
            <div className="profile-usertitle-name" />
          </div>
          <div className="profile-usermenu">
            <div className="profile-usertitle-title fnt-weight-500">
              {this.show().name}
            </div>
            <div className="fnt-weight-400">Contact Number</div>
            <div className="profile-usertitle-info fnt-weight-300">
              {this.show().contact_num}
            </div>
            <div className="fnt-weight-400">Email</div>
            <div className="profile-usertitle-info fnt-weight-300">
              {this.show().email}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Profile);
