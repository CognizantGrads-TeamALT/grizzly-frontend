import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import grizzlyimg from "../../img/grizzly.png";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      password2: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/portal");
  //   }
  // }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <img
                src={grizzlyimg}
                alt="Grizzly"
                style={{ width: "300px", margin: "auto", display: "block" }}
              />
              <p className="lead text-center">Create your Grizzly account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  className="btn btn-outline-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(SignUp));
