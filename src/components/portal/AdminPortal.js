import React, { Component } from "react";
import { connect } from "react-redux";
// import Loading from "../common/Loading";
// import Vendor from "./vendor/Vendor";
// import Products from "./products/Products";
// import Categories from "./categories/Categories";
import Profile from "./profile/Profile";
import AdminTab from "./AdminTab";
class AdminPortal extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3 m-auto">
          <Profile />
        </div>
        <div className="col-md-9">
          <AdminTab />
        </div>
      </div>
    );
  }
}

export default connect(null)(AdminPortal);
