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

  componentDidMount() {
    this.hideAdminVendorPortal();

  }

  hideAdminVendorPortal() {
    var showAdminVendorPortal = document.getElementsByClassName('row d-absolute position-fixed w-100 toggle-portal-appearance');
    var i;
    if (this.props.match.params.portal === 'customer'){
      for (i = 0; i < showAdminVendorPortal.length; i++) {
        showAdminVendorPortal[i].style.display = 'none';
      }
    }
  }


  render() {
    return (
      <div className="griz-portal overflow-hidden">
        <div className="row d-absolute position-fixed w-100 toggle-portal-appearance">
          <div className="col-2 griz-dark-blue-bg p-3">
            {this.props.match.params.portal === 'admin' && (
              <Profile userType="admin" userId="2" />
            )}
            {this.props.match.params.portal === 'vendor' && (
              <Profile userType="vendor" userId="1" />
            )}
          </div>
          <div className="col-10 pl-0 pr-0 h-100 w-100">
            {(this.props.userType === 'admin' ||
              this.props.userType === 'vendor') && <Tabs />}
          </div>
        </div>
        <div className="overflow-auto bg-white">
          {this.props.match.params.portal === 'customer' && <CustomerPortal />}
        </div>
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
