import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import Categories from "./categories/Categories";
import {
  getCategories,
  clearCurrentCategories
} from "../../actions/categoryActions";
import Vendor from "./vendor/Vendor";
import { getVendors, clearCurrentVendors } from "../../actions/vendorActions";
import Products from "./products/Products";
import {
  getProducts,
  clearCurrentProducts
} from "../../actions/productsActions";
import Inventory from "./inventory/Inventory";
class AdminTab extends Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.state = {
      activeTab: ""
    };
  }

  componentWillMount() {
    //this.clear();

    this.props.getProducts();
    this.props.getVendors();
    this.props.getCategories();

    this.setState({ activeTab: "1" });
  }

  // in case its needed.
  clear() {
    this.props.clearCurrentCategories();
    this.props.clearCurrentVendors();
    this.props.clearCurrentProducts();

    this.props.getProducts();
    this.props.getVendors();
    this.props.getCategories();
  }

  onToggle(tab) {
    //this.clear();
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {

    return (
      <Row>
        <Col>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames(
                    "nav-link btn-outline-success my-2 my-sm-0",
                    {
                      active: this.state.activeTab === "1"
                    }
                  )}
                  onClick={() => {
                    this.onToggle("1");
                  }}
                >
                  PRODUCTS
                </NavLink>
              </NavItem>
{this.props.userType === 'admin' ? (<NavItem>
                <NavLink
                  className={classnames(
                    "nav-link btn-outline-success my-2 my-sm-0",
                    {
                      active: this.state.activeTab === "2"
                    }
                  )}
                  onClick={() => {
                    this.onToggle("2");
                  }}
                >
                  VENDORS
                </NavLink>
              </NavItem>) : (
            <span />
          )}
             {this.props.userType === 'admin' ? ( <NavItem>
                <NavLink
                  className={classnames(
                    "nav-link btn-outline-success my-2 my-sm-0",
                    {
                      active: this.state.activeTab === "3"
                    }
                  )}
                  onClick={() => {
                    this.onToggle("3");
                  }}
                >
                  CATEGORIES
                </NavLink>
              </NavItem>) : (
            <span />
          )}
          {this.props.userType === 'vendor' ? (              <NavItem>
                <NavLink
                  className={classnames(
                    "nav-link btn-outline-success my-2 my-sm-0",
                    {
                      active: this.state.activeTab === "2"
                    }
                  )}
                  onClick={() => {
                    this.onToggle("2");
                  }}
                >
                  INVENTORY
                </NavLink>
              </NavItem>) : (
            <span />
          )}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <Products />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <Vendor />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <Categories />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                    <Inventory />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
    );
  }
}

AdminTab.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  clearCurrentProducts: PropTypes.func.isRequired,
  clearCurrentVendors: PropTypes.func.isRequired,
  clearCurrentCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userType: state.user.userType
});

export default connect(
  mapStateToProps,
  {
    getCategories,
    clearCurrentCategories,
    getVendors,
    clearCurrentVendors,
    getProducts,
    clearCurrentProducts
  }
)(AdminTab);
