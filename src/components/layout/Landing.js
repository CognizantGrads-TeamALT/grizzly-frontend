import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';
import '../../App.css';
import { withRouter } from 'react-router-dom';

class Landing extends Component {
  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      this.props.history.push(`/${this.props.user.userType}`);
    }
  }

  render() {
    return (
      <div className="landingpage">
        <header>
          <h3>Welcome to Grizzly</h3>
        </header>
        <Loading />
        <Link className="btn btn-outline-success mr-sm-2" to={`/${'admin'}`}>
          Admin Portal Demo
        </Link>
        <Link className="btn btn-outline-success mr-sm-2" to={`/${'vendor'}`}>
          Vendor Portal Demo
        </Link>
        <Link className="btn btn-outline-success" to="/customer">
          Customer Portal Demo
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withRouter(Landing));
