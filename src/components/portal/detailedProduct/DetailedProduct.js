import React, { Component } from 'react';
import { Row, Col, Nav, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Profile from '../profile/Profile';
import ProductDescription from './ProductDescription';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import {
  getProductWithImgs,
  getVendorBatch
} from '../../../actions/productsActions';

class DetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
    this.props.getProductWithImgs(this.props.match.params.productId);
  }

  show() {
    const { single, loading, product_vendor } = this.props.product;
    if (isEmpty(single) || isEmpty(product_vendor) || loading) {
      return <Spinner />;
    } else {
      const vendor = this.props.product.product_vendor.filter(
        item => item.vendorId === single[0].vendorId
      )[0];
      return (
        <div>
          <ProductDescription
            single={single[0]}
            history={this.props.history}
            vendor={vendor}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-2">
          <Profile />
        </div>
        <div className="col-10">
          <Row>
            <Col>
              <Nav tabs>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      'nav-link btn-outline-success my-2 my-sm-0',
                      {
                        active: this.state.activeTab === 0
                      }
                    )}
                  >
                    PRODUCTS
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      'nav-link btn-outline-success my-2 my-sm-0'
                    )}
                  >
                    VENDORS
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      'nav-link btn-outline-success my-2 my-sm-0'
                    )}
                  >
                    CATEGORIES
                  </Link>
                </NavItem>
              </Nav>
            </Col>
          </Row>
          {this.show()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductWithImgs, getVendorBatch }
)(DetailedProduct);
