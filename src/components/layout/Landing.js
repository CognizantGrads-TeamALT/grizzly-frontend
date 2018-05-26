import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import "../../App.css";

class Landing extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Welcome to Grizzly</h1>
        </header>
        <div className="App-intro">
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
      </div>
    );
  }
}

export default connect(null)(Landing);
