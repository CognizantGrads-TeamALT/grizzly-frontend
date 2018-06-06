import React, { Component } from "react";
import { connect } from "react-redux";
import VendorTab from "./VendorTab";
import Profile from "./profile/Profile";
class VendorPortal extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <Profile />
        </div>
        <div className="col-md-10">
          <VendorTab />
        </div>
      </div>
    );
  }
}

export default connect(null)(VendorPortal);
