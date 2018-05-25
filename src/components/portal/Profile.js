import React, { Component } from "react";
import photoID from "../../img/photoID.png";
class Profile extends Component {
  render() {
    return (
      <div class="profile-sidebar">
        <div class="profile-userpic">
          <img src={photoID} class="img-responsive" alt="" />
        </div>

        <div class="profile-usertitle">
          <div class="profile-usertitle-name">Helen Cho</div>
        </div>

        <div class="profile-userbuttons">
          <button type="button" class="btn btn-outline-info btn-sm">
            View
          </button>
          <button type="button" class="btn btn-outline-info btn-sm">
            Update
          </button>
        </div>

        <div class="profile-usermenu">
          <div class="profile-usertitle-name">ID</div>
          <div class="profile-usertitle-job">GRZLY17234</div>
          <div class="profile-usertitle-name">Designation</div>
          <div class="profile-usertitle-job">Sr. Admin</div>
          <div class="profile-usertitle-name">Office</div>
          <div class="profile-usertitle-job">NYC, NY, USA</div>
        </div>
      </div>
    );
  }
}

export default Profile;
