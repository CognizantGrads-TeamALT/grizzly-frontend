import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../img/logo.png';
import LoginModal from '../auth/LoginModal';
import { clearCurrentUser } from '../../actions/userActions';
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
    this.props.searchProducts(this.state.search, '0');
    this.setState({ search: '' });
  }

  onLogout(e) {
    e.preventDefault();
    this.props.clearCurrentUser();
    this.props.history.push('/');
  }

  logOutBtn() {
    return (
      <button
        className="btn more-rounded hover-w-b btn-sm mr-sm-2"
        type="button"
        onClick={this.onLogout}
      >
        LogOut
      </button>
    );
  }

  showLinks() {
    if (isEmpty(this.props.user.user)) {
      return (
        <ul className="navbar-nav pt-2">
          <li className="nav-item">
            <LoginModal buttonLabel="Login" title="Login" actionLabel="Login" />
          </li>
          <li className="nav-item">
            <Link
              className="btn more-rounded hover-w-b btn-sm mr-sm-2"
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      );
    }
    if (!isEmpty(this.props.user.user)) {
      if (this.props.user.userType === 'admin') {
        return (
          <ul className="navbar-nav pt-2">
            <li className="nav-item">
              <i className="far fa-bell p-t-5 white" />
            </li>
            <span>{`Welcome, Admin <${this.props.user.user[0].name}> `}</span>
            <li className="nav-item">{this.logOutBtn()}</li>
          </ul>
        );
      }
      if (this.props.user.userType === 'vendor') {
        return (
          <ul className="navbar-nav pt-2">
            <li className="nav-item">
              <i className="far fa-bell p-t-5 white" />
            </li>
            <span>{`Welcome, ${this.props.user.user[0].name} `}</span>
            <li className="nav-item">{this.logOutBtn()}</li>
          </ul>
        );
      }
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light navbar-expand-sm mb-4 text-center pt-0">
        <div className="container">
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
            <div className="navbar-buttons">{this.showLinks()}</div>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  searchProducts: PropTypes.func.isRequired,
  clearCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { searchProducts, clearCurrentUser }
)(withRouter(Navbar));
