import React, { Component } from "react";
import photoID from "../../img/photoID.png";
class Profile extends Component {
  render() {
    return (
      <div className="profile-sidebar">
        <div className="profile-userpic">
          <img src={photoID} className="img-responsive" alt="" />
        </div>

        <div className="profile-usertitle">
          <div className="profile-usertitle-name">Helen Cho</div>
        </div>

        <div className="profile-userbuttons">
          <button type="button" className="btn btn-outline-info btn-sm">
            View
          </button>
          <button type="button" className="btn btn-outline-info btn-sm">
            Update
          </button>
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
    );
  }
}

export default Profile;
