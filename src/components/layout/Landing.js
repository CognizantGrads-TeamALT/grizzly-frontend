import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import "../../App.css";

class Landing extends Component {
  render() {
    return (
      <div>
        <header>
          <h3>Welcome to Grizzly</h3>
        </header>
        <Loading />
        <Link
          className="btn btn-outline-success my-2 my-sm-0 mr-sm-2"
          to="/adminportal"
        >
          Admin Portal Demo
        </Link>
        <Link
          className="btn btn-outline-success my-2 my-sm-0"
          to="/vendorportal"
        >
          Vendor Portal Demo
        </Link>
      </div>
    );
  }
}

export default connect(null)(Landing);
