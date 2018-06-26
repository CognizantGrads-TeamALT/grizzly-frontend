import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../img/logo.png';
import LoginModal from '../auth/LoginModal';
import { logoutUser } from '../../actions/userActions';
import isEmpty from '../../validation/is-empty';
import { searchProducts } from '../../actions/productsActions';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const term = this.state.search;
    this.setState({ search: '' });
    this.props.searchProducts(term, '0');
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/customer');
  }

  logOutBtn() {
    return (
      <button
        className="btn more-rounded ml-2 hover-w-b btn-sm mr-sm-2 parent-wide min-navbar-button-width"
        type="button"
        onClick={this.onLogout}
      >
        Log out
      </button>
    );
  }

  showLinks() {
    if (!isEmpty(this.props.user.user)) {
      if (this.props.user.userType === 'admin') {
        return (
          <ul className="navbar-nav pl-2">
            <li className="nav-item mr-1 my-auto">
              <i className="far fa-bell p-t-5 white" />
            </li>
            <li className="nav-item mr-1 my-auto">
              <span>{`Welcome, Admin <${this.props.user.user[0].name}> `}</span>
            </li>

            <li className="nav-item">{this.logOutBtn()}</li>
          </ul>
        );
      }
      if (this.props.user.userType === 'vendor') {
        return (
          <ul className="navbar-nav pl-2">
            <li className="nav-item mr-1 my-auto">
              <i className="far fa-bell p-t-5 white" />
            </li>
            <li className="nav-item mr-1 my-auto">
              <span>{`Welcome, ${this.props.user.user[0].name} `}</span>
            </li>
            <li className="nav-item">{this.logOutBtn()}</li>
          </ul>
        );
      }
    } else if (!isEmpty(this.props.user.googleProfile)) {
      return (
        <ul className="navbar-nav pl-2">
          <li className="nav-item mr-1 my-auto">
            <i className="far fa-bell p-t-5 white" />
          </li>
          <li className="nav-item mr-1 my-auto">
            <span>{`Welcome, <${
              this.props.user.googleProfile.given_name
            }> `}</span>
          </li>
          <li className="nav-item dropdown my-auto">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            <img src={this.props.user.googleProfile.picture} className="nav-bar-profile-img"/>
            </a>
            <div className="dropdown-menu right-anchor">
              <a className="dropdown-item" href="/settings">Settings</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={this.onLogout}>Log out</a>
            </div>
          </li>
        </ul>
      );
    } else
      return (
        <ul className="navbar-nav pl-2">
          <li className="nav-item mr-1 my-auto">
            <LoginModal buttonLabel="Login" title="Login" actionLabel="Login" />
          </li>
          <li className="nav-item mr-1 my-auto">
            <Link
              className="btn more-rounded hover-w-b btn-sm mr-sm-2 parent-wide min-navbar-button-width"
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      );
  }

  render() {
    return (
      <nav className="navbar navbar-light navbar-expand-sm text-center nav-bar-bottom-border">
        <div className="ml-0 mr-0 container parent-wide">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="Grizzly"
              style={{ width: '200px', margin: 'auto', display: 'block' }}
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

          <div
            className="collapse navbar-collapse mx-auto align-center"
            id="mobile-nav"
          >
            <form onSubmit={this.onSubmit} className="form-inline">
              <div className="search-form-custom">
                <input
                  className="form-control left-rounded border-right-0 border col-8"
                  type="search"
                  name="search"
                  placeholder="Search"
                  value={this.state.search}
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
            <div className="ml-2 search-form-custom nav justify-content-end">
              {this.showLinks()}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  searchProducts: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { searchProducts, logoutUser }
)(withRouter(Navbar));
