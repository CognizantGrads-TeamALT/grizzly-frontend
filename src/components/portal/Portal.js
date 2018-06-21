import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Profile from './profile/Profile';
import Tabs from './Tabs';
import CustomerPortal from '../portal/CustomerPortal';
import { clearCurrentUser } from '../../actions/userActions';

class Portal extends Component {
  constructor(props) {
    super(props);
    //Temp. Need to fix when impl auth
    this.props.clearCurrentUser();
  }

  render() {
    return (
      <div className="griz-portal row">
        <div className="col-2 griz-dark-blue-bg p-3">
          {this.props.match.params.portal === 'admin' && (
            <Profile userType="admin" userId="2" />
          )}
          {this.props.match.params.portal === 'vendor' && (
            <Profile userType="vendor" userId="1" />
          )}
        </div>
        <div className="col-10 pl-0">
          {(this.props.userType === 'admin' ||
            this.props.userType === 'vendor') && <Tabs />}
        </div>
        {this.props.match.params.portal === 'customer' && <CustomerPortal />}
      </div>
    );
  }
}

Portal.propTypes = {
  clearCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userType: state.user.userType
});

export default connect(
  mapStateToProps,
  { clearCurrentUser }
)(Portal);
