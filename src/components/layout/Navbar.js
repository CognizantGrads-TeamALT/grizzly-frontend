import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import logo from '../../img/logo.png';
import { GoogleLogin } from 'react-google-login';
import { logoutUser, loginUser } from '../../actions/userActions';
import isEmpty from '../../validation/is-empty';
import { searchProducts, reloadProducts } from '../../actions/productsActions';
//import ShoppingCart from '../portal/customer/ShoppingCart';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.doRedirect = this.doRedirect.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (isEmpty(this.state.search)) {
      toast.info('Please check your input!');
    } else {
      const term = this.state.search;
      this.setState({ search: '' });
      this.props.searchProducts(term, '0');
    }
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
    toast.info('Bye!');
    if (this.props.history.location.pathname !== '/') {
      this.props.history.push('/');
      this.props.reloadProducts(); // NOTE: this causes a flicker on going to customer, then admin, then
    }
  }

  login(response) {
    if (isEmpty(response.error) && !isEmpty(response.tokenId)) {
      this.props.loginUser(response);
    }
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

  doRedirect() {
    this.props.history.push({
      pathname: '/settings',
      state: { tabId: 'ProfileForm' }
    });
  }

  toastId = null;

  notify = name => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.success('Hello ' + name + '!');
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.role !== this.props.user.role) {
      if (this.props.user.isAuthenticated) {
        if (
          !isEmpty(this.props.user.isRegistered) &&
          !this.props.user.isRegistered
        ) {
          toast.success(
            <span onClick={this.doRedirect}>
              Hello {this.props.user.googleProfile.given_name}! Click HERE to
              update your profile.
            </span>
          );
        } else {
          this.notify(this.props.user.googleProfile.given_name);
        }
      }
    } else if (
      !isEmpty(this.props.user.role) &&
      !isEmpty(this.props.user.isRegistered)
    ) {
      if (this.props.user.isAuthenticated) {
        if (this.props.user.role !== 'customer') {
          this.props.history.push(`/${this.props.user.role}`);
        }
      }
    }
  }

  showLinks() {
    if (!isEmpty(this.props.user.user) && this.props.user.role !== 'customer') {
      return (
        <ul className="navbar-nav pl-2">
          <li className="nav-item mr-1 my-auto">
            <i className="far fa-bell p-t-5 white" />
          </li>
          <li className="nav-item mr-1 my-auto">
            <span>{`Welcome, ${this.props.user.user.name} `}</span>
          </li>
          <li className="nav-item">{this.logOutBtn()}</li>
        </ul>
      );
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
          {this.showCartLink()}
          <li className="nav-item dropdown my-auto">
            <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={this.props.user.googleProfile.picture}
                className="nav-bar-profile-img"
                alt="google profile"
              />
            </a>
            <div className="dropdown-menu right-anchor">
              <Link
                className="dropdown-item"
                to={{
                  pathname: '/settings',
                  state: { tabId: '1' }
                }}
              >
                Profile
              </Link>
              <Link
                className="dropdown-item"
                to={{
                  pathname: '/settings',
                  state: { tabId: '2' }
                }}
              >
                Cart
              </Link>
              <Link
                className="dropdown-item"
                to={{
                  pathname: '/settings',
                  state: { tabId: '3' }
                }}
              >
                Order History
              </Link>
              <div className="dropdown-divider" />
              <a className="dropdown-item" onClick={this.onLogout}>
                Log out
              </a>
            </div>
          </li>
        </ul>
      );
    } else
      return (
        <ul className="navbar-nav pl-2">
          {this.showCartLink()}
          <li className="nav-item mr-1 my-auto">
            <GoogleLogin
              clientId="296954481305-plmc2jf1o7j7t0aignvp73arbk2mt3pq.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.login}
              onFailure={this.login}
              className="btn more-rounded parent-wide min-navbar-button-width hover-w-b btn-sm my-2 my-sm-0"
            />
          </li>
        </ul>
      );
  }
  showCartLink() {
    return (
      <li>
        <Link
          className="mr-2 mt-2 mb-0 more-rounded fas fa-shopping-cart"
          to="/shoppingcart"
        />
      </li>
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
  reloadProducts: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { searchProducts, reloadProducts, logoutUser, loginUser }
)(withRouter(Navbar));
