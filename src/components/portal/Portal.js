import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Profile from './profile/Profile';
import Tabs from './Tabs';
import isEmpty from '../../validation/is-empty';

class Portal extends Component {
  constructor(props) {
    super(props);

    this.delayedRedirect = this.delayedRedirect.bind(this);
  }

  /**
   * I've added this delay because refreshing the page was redirecting 3 times
   * which caused methods to be called multiple times. Because the state doesn't
   * update quick enough, it was causing issues with indexing in the reducer.
   */
  delayedRedirect() {
    if (this.props.user.role === 'customer' || isEmpty(this.props.user.role)) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    setTimeout(this.delayedRedirect, 500);
  }

  render() {
    return (
      <div className="griz-portal">
        <div className="row d-absolute position-fixed w-100 toggle-portal-appearance">
          <div className="col-2 position-static griz-dark-blue-bg h-95 pt-3">
            <Profile />
          </div>
          <div className="col-10 position-inherit pl-0 pr-0 h-100 w-100 pt-3">
            <Tabs />
          </div>
        </div>
      </div>
    );
  }
}

Portal.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Portal);
