import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import grizzlyimg from '../../img/grizzly.png';
import { loginUser } from '../../actions/userActions';
import { GoogleLogin } from 'react-google-login';
import isEmpty from '../../validation/is-empty';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    // If already logged, redirect to portal
    if (!isEmpty(this.props.user)) {
      if (this.props.user.isAuthenticated) {
        this.props.history.push(`/${this.props.user.role}`);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // If already logged, redirect to portal
    if (nextProps.user.isAuthenticated) {
      this.props.history.push(`/${this.props.user.role}`);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  login(response) {
    if (isEmpty(response.error) && !isEmpty(response.tokenId)) {
      this.props.loginUser(response);
      // this.props.history.push(`/${this.props.user.role}`);
    }
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-4 m-auto">
              <img
                src={grizzlyimg}
                alt="Grizzly"
                style={{ width: '300px', margin: 'auto', display: 'block' }}
              />
              <p className="lead text-center">Sign in to your portal</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Username"
                  name="username"
                  type="username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  className="btn btn-outline-success btn-block mt-4"
                />
                <br />
                <GoogleLogin
                  clientId="296954481305-plmc2jf1o7j7t0aignvp73arbk2mt3pq.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={this.login}
                  onFailure={this.login}
                  className="btn more-rounded parent-wide min-navbar-button-width hover-w-b btn-sm my-2 my-sm-0"
                />
                <div
                  style={{ display: 'none' }}
                  align="middle"
                  data-cookiepolicy="single_host_origin"
                  data-onsuccess="onSignIn"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
