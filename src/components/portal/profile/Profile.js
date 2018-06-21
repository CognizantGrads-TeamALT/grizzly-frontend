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
      <div className="text-left profile-blue-color ml-3">
          <div className="profile-usermenu white-text mt-4">
            <div className="profile-header">
                <div className="profile-usertitle-title d-inline fnt-weight-500">
                  {this.show().name}
                </div>
                <button
                  type="button"
                  className="btn btn-link d-inline p-1 my-auto profile-blue-color profile-small-link float-right"
                >
                  Edit
                </button>
            </div>
            <div className="profile-userpic p-4">
            <img src={photoID} className="img-responsive" alt="" />
          </div>
            <div className="profile-small-subtitle mt-2">
              {this.props.userType}
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
