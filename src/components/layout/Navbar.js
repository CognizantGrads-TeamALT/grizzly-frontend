import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../img/logo.png";
import LoginModal from "../auth/LoginModal";

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
    this.setState({ search: "" });
  }

  render() {
    return (
      <nav className="navbar navbar-light navbar-expand-sm mb-4 text-center">
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
            <form className="form-inline mx-auto col-8">
              <div className="search-form-custom row">
                <input
                  className="form-control left-rounded border-right-0 border col-6"
                  type="search"
                  placeholder="Search"
                  id="example-search-input"
                  defaultValue={this.state.search}
                  onChange={this.onChange}
                />
                <span className="input-group-append-more">
                  <button
                    onClick={this.onSubmit}
                    className="btn btn-outline-success right-rounded border-left-0 border"
                    type="button"
                  >
                    <i className="fa fa-search" />
                  </button>
                </span>
              </div>
            </form>

            <div className="navbar-buttons">
              <ul className="navbar-nav ml-auto col-2">
                <li className="nav-item">
                  <LoginModal
                    buttonLabel="Login"
                    title="Login"
                    actionLabel="Login"
                  />
                </li>
                <li className="nav-item">
                  <Link
                    className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(null)(Navbar);
