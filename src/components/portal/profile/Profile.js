import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import photoID from "../../../img/photoID.png";
import { getUsers } from "../../../actions/userActions";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  getUserDetails(id) {
    this.props.getUserDetails();
  }
  render() {
    const { userDetails } = this.props;
    return (
      <div className="text-center profile-sidebar">
        <div className="profile-header">
          <div className="profile-header-text">Profile
             <button type="button" className="btn btn-link hover-def-plain-b profile-header-button">
              Edit
            </button>
            {this.props}
          </div>
         
        </div>
        <div className="smaller-profile-box">
          <div className="profile-userpic">
            <img src={photoID} className="img-responsive" alt="" />
          </div>

          <div className="profile-usertitle">
            <div className="profile-usertitle-name">{this.props.getUserDetails()}</div>
          </div>
          <div className="profile-usermenu">
            <div className="profile-usertitle-name">ID</div>
            <div className="profile-usertitle-job">GRZLY17234</div>
            <div className="profile-usertitle-name">Designation</div>
            <div className="profile-usertitle-job">Sr. Admin</div>
            <div className="profile-usertitle-name">Office</div>
            <div className="profile-usertitle-job">NYC, NY, USA</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getUsers: PropTypes.func.isRequired
};


export default connect(null)(Profile);
