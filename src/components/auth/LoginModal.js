import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: "",
      password: ""
    };

    this.onToggle = this.onToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  // componentDidMount() {
  // // If already logged, redirect to portal
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/portal");
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  // // If already logged, redirect to portal
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/portal");
  //   }
  // }

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
            <form onSubmit={this.onSubmit}>
              <input
                className="form-control"
                name="username"
                placeholder="Username"
                onChange={this.onChange}
              />
              <br />
              <input
                className="form-control"
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.onChange}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="outline-success" onClick={this.onSubmit}>
              Login
            </Button>
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
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withRouter(LoginModal));
