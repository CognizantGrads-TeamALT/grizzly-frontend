import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import Categories from './categories/Categories';
import {
  getCategories,
  clearCurrentCategories
} from '../../actions/categoryActions';
import Vendor from './vendor/Vendor';
import { getVendors, clearCurrentVendors } from '../../actions/vendorActions';
import Products from './products/Products';
import {
  getProducts,
  clearCurrentProducts,
  getVendorInventory
} from '../../actions/productsActions';
import Inventory from './inventory/Inventory';
import ProductSearchSort from '../portal/common/ProductSearchSort';
import CategoryTypeAhead from '../portal/categories/CategoryTypeAhead';
import {
  setProductUpdated,
  filterProductsByCategory
} from '../../actions/productsActions';
import ProductForm from '../portal/products/ProductForm';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.onAddProductCancel = this.onAddProductCancel.bind(this);
    this.state = {
      activeTab: ''
    };
  }

  componentWillMount() {
    //this.clear();
    this.props.getProducts();
    this.props.getVendors();
    this.props.getCategories();
    this.props.getVendorInventory("0", "1");
    this.setState({ activeTab: '1' });
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
    if (this.state.activeTab === '1') {
      this.props.getProducts();
    } else if (this.state.activeTab === '2') {
      this.props.getVendors();
    } else if (this.state.activeTab === '3') {
      this.props.getCategories();
    } else if (this.state.activeTab === '4') {
      // Get Inventory
    }
  }

  onAddProduct() {
    this.setState({
      activeTab: 'addProduct'
    });
  }

  onAddProductCancel() {
    this.setState({
      activeTab: '1'
    });
  }

  render() {
    return (
      <Row>
        <Col>
          <div>
            <Nav tabs>
              <NavItem className="col pl-0 pr-0">
                <NavLink
                  className={classnames(
                    'nav-link btn-outline-success my-2 my-sm-0',
                    {
                      active: this.state.activeTab === '1'
                    }
                  )}
                  onClick={() => {
                    this.onToggle('1');
                  }}
                >
                  PRODUCTS
                </NavLink>
              </NavItem>
              {this.props.userType === 'admin' && (
                <NavItem className="col pl-0 pr-0">
                  <NavLink
                    className={classnames(
                      'nav-link btn-outline-success griz-t-color-hover my-2 my-sm-0',
                      {
                        active: this.state.activeTab === '2'
                      }
                    )}
                    onClick={() => {
                      this.onToggle('2');
                    }}
                  >
                    VENDORS
                  </NavLink>
                </NavItem>
              )}
              {this.props.userType === 'admin' && (
                <NavItem className="col pl-0 pr-0">
                  <NavLink
                    className={classnames(
                      'nav-link btn-outline-success griz-t-color-hover my-2 my-sm-0',
                      {
                        active: this.state.activeTab === '3'
                      }
                    )}
                    onClick={() => {
                      this.onToggle('3');
                    }}
                  >
                    CATEGORIES
                  </NavLink>
                </NavItem>
              )}
              {this.props.userType === 'vendor' && (
                <NavItem className="col pl-0 pr-0">
                  <NavLink
                    className={classnames(
                      'nav-link btn-outline-success griz-t-color-hover my-2 my-sm-0',
                      {
                        active: this.state.activeTab === '4'
                      }
                    )}
                    onClick={() => {
                      this.onToggle('4');
                    }}
                  >
                    INVENTORY
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <ProductSearchSort />
                    <CategoryTypeAhead
                      placeholder="Filter by category"
                      extraClassNames="btn-group mr-2"
                      onClickHandler={this.props.filterProductsByCategory}
                      pageIndex={this.props.product.index}
                    />
                    <button
                      className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
                      onClick={this.onAddProduct}
                      // to="/product/new"
                    >
                      Add Product
                    </button>
                    <Products />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12 pt-2">
                    <Vendor />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12 pt-2">
                    <Categories />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12 pt-2">
                    <Inventory />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="addProduct">
                <Row>
                  <Col sm="12 pt-2">
                    <ProductForm onCancel={this.onAddProductCancel} />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
            {/* {this.state.activeTab === 'addProduct' && <ProductForm />} */}
          </div>
        </Col>
      </Row>
    );
  }
}

Tabs.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getVendors: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  clearCurrentProducts: PropTypes.func.isRequired,
  clearCurrentVendors: PropTypes.func.isRequired,
  clearCurrentCategories: PropTypes.func.isRequired,

  setProductUpdated: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  getVendorInventory: PropTypes.func.isRequired,
  filterProductsByCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userType: state.user.userType,
  product: state.product,
});

export default connect(
  mapStateToProps,
  {
    getCategories,
    clearCurrentCategories,
    getVendors,
    clearCurrentVendors,
    getProducts,
    clearCurrentProducts,
    setProductUpdated,
    filterProductsByCategory,
    getVendorInventory
  }
)(Tabs);
