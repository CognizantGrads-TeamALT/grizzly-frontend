import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../common/Loading";
import "../../App.css";

class Portal extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Welcome to Grizzly Portal</h1>
        </header>
        <p className="App-intro">
          <Loading />
        </p>
      </div>
    );
  }
}

export default connect(null)(Portal);
