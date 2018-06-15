import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminTab from './AdminTab';
import Profile from './profile/Profile';
class VendorPortal extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <Profile userType="vendor" userId="1" />
        </div>
        {/* <div className="col-md-10">
          <AdminTab />
        </div> */}
      </div>
    );
  }
}

export default connect(null)(VendorPortal);
