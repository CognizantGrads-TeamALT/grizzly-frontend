import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import classnames from 'classnames';
import OrderHistory from './OrderHistory';
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Col
  } from 'reactstrap';

class UserSettings extends Component {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        }
        console.log(
        'ef'
        )
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }


  render() {
    return (
        <div className="row m-5 pt-5 griz-portal-parent">
            <Col sm="3">
                <Nav vertical tabs className="row profile-nav nav-tabs">
                    <NavItem className="tabs-a-underline rounded">
                        <NavLink
                        className={classnames(
                            'nav-link profile-nav',
                            { active: this.state.activeTab === '1' }
                        )}
                        onClick={() => { this.toggle('1'); }}
                        >
                        Profile
                        </NavLink>
                    </NavItem>
                    <NavItem className="tabs-a-underline">
                        <NavLink
                        className={classnames(
                            'nav-link profile-nav',
                            { active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                        >
                        Cart
                        </NavLink>
                    </NavItem>
                    <NavItem className="tabs-a-underline">
                        <NavLink
                        className={classnames(
                            'nav-link profile-nav',
                            { active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                        >
                        Order History
                        </NavLink>
                    </NavItem>
                    <NavItem className="tabs-a-underline">
                        <NavLink
                        className={classnames(
                            'nav-link profile-nav',
                            { active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggle('4'); }}
                        >
                        Settings
                        </NavLink>
                    </NavItem>
                </Nav>
            </Col>
            <Col sm="9">
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <UserProfile /> 
                    </TabPane>
                    <TabPane tabId="2">
                    </TabPane>
                    <TabPane tabId="3">
                        <OrderHistory />  
                    </TabPane>
                    <TabPane tabId="4">
                    </TabPane>
                </TabContent>
            </Col>
      </div>
    );
  }
}

export default connect(null)(UserSettings); 