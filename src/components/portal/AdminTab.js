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

class AdminTab extends Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.state = {
      activeTab: "1"
    };
    this.clear();
    this.props.getProducts("0");
  }

  clear() {
    this.props.clearCurrentCategories();
    this.props.clearCurrentVendors();
    this.props.clearCurrentProducts();
  }

  onToggle(tab) {
    this.clear();
    if (this.state.activeTab !== tab) {
      if (tab === "3") {
        this.props.getCategories("0");
      } else if (tab === "2") {
        this.props.getVendors("0");
      } else if (tab === "null") {
        
      } else {
        this.props.getProducts("0");
      }

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
                    "nav-link hover-w-b btn-outline-success my-2 my-sm-0",
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
              <NavItem>
                <NavLink
                  className={classnames(
                    "nav-link hover-w-b btn-outline-success my-2 my-sm-0",
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
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames(
                    "nav-link hover-w-b btn-outline-success my-2 my-sm-0",
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
              </NavItem>
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
              <TabPane tabId="null">
                <Row>
                  <Col sm="12">
                    
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

export default connect(null, {
  getCategories,
  clearCurrentCategories,
  getVendors,
  clearCurrentVendors,
  getProducts,
  clearCurrentProducts
})(AdminTab);
