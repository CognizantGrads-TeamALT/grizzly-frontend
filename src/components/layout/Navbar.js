import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../img/logo.png";
import Input from "../common/Input";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="Grizzly"
              style={{ width: "200px", margin: "auto", display: "block" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <form onSubmit={this.onSubmit} className="form-inline mx-auto">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Input
                    type="search"
                    name="search"
                    placeholder="Search"
                    value={this.state.search}
                    onChange={this.onChange}
                  />
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-success btn-sm my-2 my-sm-0 ml-sm-1 mr-sm-1"
                    type="submit"
                  >
                    Search
                  </button>
                </li>
              </ul>
            </form>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  className="btn btn-outline-success-secondary btn-sm my-2 my-sm-0 mr-sm-2"
                  to="login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-outline-success-primary btn-sm my-2 my-sm-0"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(null)(Navbar);
