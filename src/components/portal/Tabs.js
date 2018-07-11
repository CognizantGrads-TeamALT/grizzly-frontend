import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
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
  getProductsVendor,
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
    this.clear = this.clear.bind(this);
    this.onAddProductCancel = this.onAddProductCancel.bind(this);
    this.cleared = this.cleared.bind(this);
    this.state = {
      activeTab: '1'
    };

    this.loadingVendorInventory = false;
    this.loadingProducts = false;    
    this.shouldClear = false;
  }

  cleared() {
    this.shouldClear = false;
  }

  componentDidMount() {
    // gets called on fresh login. dont remove.
    if (this.props.user.role === 'vendor') {
      if (isEmpty(this.props.product.vendorInventory) && !this.loadingVendorInventory) {
        this.props.getVendorInventory('0', this.props.user.user.vendorId);
        this.loadingVendorInventory = true;

        this.props.getProductsVendor(this.props.user.user.vendorId, 0);
      }
    }

    //this.clear();
    if (isEmpty(this.props.product.products) &&
      !this.props.product.loadingCategories &&
      !this.props.product.loadingVendors &&
      !this.props.product.loading &&
      this.props.product.fresh &&
      !this.loadingProducts &&
      this.props.user.role !== 'vendor') {
        this.props.getProducts();
        this.loadingProducts = true;
    }

    if (isEmpty(this.props.vendor.vendors) &&
      !this.props.vendor.loading) {
        this.props.getVendors();
    }

    if (isEmpty(this.props.category.categories) &&
      !this.props.category.loading) {
        this.props.getCategories();
    }
  }

  componentDidUpdate() {
    // now it always checks for whether the user is a vendor or not
    if (this.props.user.role === 'vendor') {
      if (isEmpty(this.props.product.vendorInventory) && !this.loadingVendorInventory) {
        this.props.getVendorInventory('0', this.props.user.user.vendorId);
        this.loadingVendorInventory = true;

        this.props.getProductsVendor(this.props.user.user.vendorId, 0);
      }
    }

    //if (!isEmpty(PrevProps.product.products_filtered) &&
    //  isEmpty(this.props.product.products_filtered)) {
    //  this.props.clearCurrentProducts();
    //  this.props.getProducts();
    //}
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

      if (!isEmpty(this.props.product.products_filtered)) {
        this.clear();
      }
    }
    if (this.state.activeTab === '1' && this.props.product.fresh) {
      this.props.getProducts();
    } else if (this.state.activeTab === '2' && isEmpty(this.props.vendor.vendors)) {
      this.props.getVendors();
    } else if (this.state.activeTab === '3' && isEmpty(this.props.category.categories)) {
      this.props.getCategories();
    } else if (this.state.activeTab === '4' && isEmpty(this.props.product.vendorInventory)) {
      this.props.getVendorInventory('0', this.props.user.user.vendorId);
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

  clearAllFilters = (e) => {
    this.clear();
    this.shouldClear = true;
  }
  
  render() {
    return (
      <Row className="griz-portal ml-0 mr-0 w-100">
        <Col className="w-100 pl-0 pr-0">
          <div className="griz-portal navbar-inner-height parent-wide-inner">
            <Nav tabs>
              <NavItem className="nav-bar-singular-tab col pl-0 pr-0 tabs-a-underline">
                <NavLink
                  className={classnames('nav-link admn-vendor-portal my-auto', {
                    active: this.state.activeTab === '1'
                  })}
                  onClick={() => {
                    this.onToggle('1');
                  }}
                >
                  PRODUCTS
                </NavLink>
              </NavItem>
              {this.props.user.role === 'admin' && (
                <NavItem className="nav-bar-singular-tab col pl-0 pr-0">
                  <NavLink
                    className={classnames(
                      'nav-link admn-vendor-portal my-auto',
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
              {this.props.user.role === 'admin' && (
                <NavItem className="nav-bar-singular-tab col pl-0 pr-0">
                  <NavLink
                    className={classnames(
                      'nav-link admn-vendor-portal my-auto',
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
              {this.props.user.role === 'vendor' && (
                <NavItem className="nav-bar-singular-tab col pl-0 pr-0">
                  <NavLink
                    className={classnames(
                      'nav-link admn-vendor-portal my-auto',
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
            <TabContent
              activeTab={this.state.activeTab}
              className="parent-high-inner surround-parent"
            >
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div className="m-3 row">
                      <div className="col-4 text-left">
                        <ProductSearchSort shouldClear={this.shouldClear} cleared={this.cleared} />
                      </div>
                      <div className="col-3 text-center">
                        <CategoryTypeAhead
                          placeholder="Filter by category"
                          extraClassNames="btn-group"
                          onClickHandler={this.props.filterProductsByCategory}
                          pageIndex={this.props.product.index}
                          shouldClear={this.shouldClear}
                          cleared={this.cleared}
                        />
                      </div>
                      <div className="col-3 text-center">
                        <button
                          className="btn more-rounded hover-w-b btn-sm mx-auto w-75"
                          onClick={this.onAddProduct}
                        >
                          Add Product
                        </button>
                      </div>
                      <div className="col-2 text-right">
                          <div className="btn pl-0 my-auto d-inline z-index-600" 
                              onClick = {() => this.clearAllFilters()}>
                              Clear all filters
                            <i className="far fa-times-circle d-inline ml-2"></i>
                          </div>
                      </div>
                    </div>
                    <Products />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <Vendor clear={this.clear} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <Categories clear={this.clear} />
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
              <TabPane tabId="addProduct">
                <div className="12 pt-4 mt-4">
                  <ProductForm onCancel={this.onAddProductCancel} />
                </div>
              </TabPane>
            </TabContent>
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
  getProductsVendor: PropTypes.func.isRequired,
  clearCurrentProducts: PropTypes.func.isRequired,
  clearCurrentVendors: PropTypes.func.isRequired,
  clearCurrentCategories: PropTypes.func.isRequired,

  setProductUpdated: PropTypes.func.isRequired,
  getVendorInventory: PropTypes.func.isRequired,
  filterProductsByCategory: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired,
  vendor: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  product: state.product,
  vendor: state.vendor,
  category: state.category
});

export default connect(
  mapStateToProps,
  {
    getCategories,
    clearCurrentCategories,
    getVendors,
    clearCurrentVendors,
    getProducts,
    getProductsVendor,
    clearCurrentProducts,
    setProductUpdated,
    filterProductsByCategory,
    getVendorInventory
  }
)(Tabs);
