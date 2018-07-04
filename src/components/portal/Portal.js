import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Profile from './profile/Profile';
import Tabs from './Tabs';
import { clearCurrentUser } from '../../actions/userActions';
// import isEmpty from '../../validation/is-empty';

class Portal extends Component {
  // constructor(props) {
  //   super(props);
  //   //Temp. Need to fix when impl auth
  //   // this.props.clearCurrentUser();
  // }

  // componentDidMount() {
  //   this.hideAdminVendorPortal();
  // }

  // hideAdminVendorPortal() {
  //   var showAdminVendorPortal = document.getElementsByClassName(
  //     'row d-absolute position-fixed w-100 toggle-portal-appearance'
  //   );
  //   var showCustomerPortal = document.getElementsByClassName(
  //     'overflow-normal-page p-5 customer-portal-toggle'
  //   );
  //   var i;
  //   if (this.props.user.role === 'customer') {
  //     for (i = 0; i < showAdminVendorPortal.length; i++) {
  //       showAdminVendorPortal[i].style.display = 'none';
  //     }
  //   } else if (!isEmpty(this.props.user.role)) {
  //     if (
  //       this.props.user.role === 'admin' ||
  //       this.props.user.role === 'vendor'
  //     ) {
  //       for (i = 0; i < showCustomerPortal.length; i++) {
  //         showCustomerPortal[i].style.display = 'none';
  //       }
  //     } else {
  //     }
  //   }
  // }

  render() {
    return (
      <div className="griz-portal ">
        <div className="row d-absolute position-fixed w-100 toggle-portal-appearance">
          {/* {this.props.user.role === 'admin' ||
            (this.props.user.role === 'vendor' && ( */}
          <div className="col-2 position-static griz-dark-blue-bg h-95 p-3">
            <Profile />
          </div>
          {/* ))} */}
          {/* {(this.props.role === 'admin' || this.props.role === 'vendor') && ( */}
          <div className="col-10 position-inherit overflow-normal-page pl-0 pr-0 h-100 w-100">
            <Tabs />
          </div>
          {/* )} */}
        </div>
        {/* {this.props.user.role === 'customer' && (
          <div className="overflow-normal-page p-5 customer-portal-toggle">
            <CustomerPortal />
          </div>
        )} */}
      </div>
    );
  }
}

Portal.propTypes = {
  clearCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { clearCurrentUser }
)(Portal);
