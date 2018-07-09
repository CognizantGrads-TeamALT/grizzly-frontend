import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import classnames from 'classnames';
import OrderHistory from './OrderHistory';
import ProfileForm from './ProfileForm';
import { Nav, NavItem, NavLink, TabContent, TabPane, Col } from 'reactstrap';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: this.props.location.state.tabId,
      previousPath: this.props.location.state.previousPath
    };
    this.onProfileFormCancel = this.onProfileFormCancel.bind(this);
    this.onShowProfileForm = this.onShowProfileForm.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.state.tabId !== this.props.location.state.tabId) {
      this.setState({ activeTab: this.props.location.state.tabId });
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onProfileFormCancel() {
    this.setState({
      activeTab: '1'
    });
  }

  onShowProfileForm() {
    this.setState({
      activeTab: 'ProfileForm'
    });
  }

  render() {
    return (
      <div className="row m-5 pt-5 griz-portal-parent">
        <Col sm="3">
          <Nav vertical tabs className="row profile-nav nav-tabs">
            <NavItem className="tabs-a-underline rounded">
              <NavLink
                className={classnames('nav-link profile-nav', {
                  active: this.state.activeTab === '1'
                })}
                onClick={() => {
                  this.toggle('1');
                }}
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem className="tabs-a-underline">
              <NavLink
                className={classnames('nav-link profile-nav', {
                  active: this.state.activeTab === '2'
                })}
                onClick={() => {
                  this.toggle('2');
                }}
              >
                Order History
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col sm="9">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <UserProfile onShowProfileForm={this.onShowProfileForm} />
            </TabPane>
            <TabPane tabId="2">
              <OrderHistory />
            </TabPane>
            <TabPane tabId="ProfileForm">
              <ProfileForm
                onCancel={this.onProfileFormCancel}
                previousPath={this.state.previousPath}
              />
            </TabPane>
          </TabContent>
        </Col>
      </div>
    );
  }
}

export default connect(null)(UserSettings);
