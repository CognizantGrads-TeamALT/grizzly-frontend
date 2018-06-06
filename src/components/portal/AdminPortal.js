import React, { Component } from "react";
import { connect } from "react-redux";
import Profile from "./profile/Profile";
import AdminTab from "./AdminTab";
class AdminPortal extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <Profile />
        </div>
        <div className="col-md-10">
          <AdminTab />
        </div>
      </div>
    );
  }
}

export default connect(null)(AdminPortal);
