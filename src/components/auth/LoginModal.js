import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { loginUser, logoutUser } from '../../actions/userActions';
import { GoogleLogin } from 'react-google-login';
import isEmpty from '../../validation/is-empty';
import { toast } from 'react-toastify';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: '',
      password: ''
    };

    this.onToggle = this.onToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  onToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    // Do stuff here

    this.onToggle();
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

  login(response) {
    if (isEmpty(response.error) && !isEmpty(response.tokenId)) {
      this.props.loginUser(response);
      if (!isEmpty(this.props.user) && !this.props.user.loading) {
        if (this.props.user.isAuthenticated) {
          this.props.history.push(`/${this.props.user.role}`);
          toast.success('Hello ' + response.profileObj.givenName + '!');
        }
      }
    }
  }

  logout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div className="form-group mr-2 my-auto">
        <input
          type="button"
          value="Login"
          className="btn more-rounded parent-wide min-navbar-button-width hover-w-b btn-sm my-2 my-sm-0"
          onClick={this.onToggle}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.onToggle}>Login</ModalHeader>
          <ModalBody>
            <GoogleLogin
              clientId="296954481305-plmc2jf1o7j7t0aignvp73arbk2mt3pq.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.login}
              onFailure={this.login}
              className="btn more-rounded parent-wide min-navbar-button-width hover-w-b btn-sm my-2 my-sm-0"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="outline-secondary" onClick={this.onToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { loginUser, logoutUser }
)(withRouter(LoginModal));
