import React, { Component } from 'react';
import { Row, Col, Nav, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Profile from '../profile/Profile';
import ProductDescription from './ProductDescription';
import ProductTitle from './ProductTitle';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import { getProductWithImgs } from '../../../actions/productsActions';
class DetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
    this.props.getProductWithImgs(this.props.match.params.productId);
  }

  show() {
    const { single, loading } = this.props.product;
    if (isEmpty(single) || loading) {
      return <Spinner />;
    } else {
      const vendor = this.props.product.product_vendor.filter(
        item => item.vendorId === single[0].vendorId
      )[0];
      return (
        <div className="row mt-4 parent-min-half-high">
          <div className="col-5">
            <ProductTitle single={single[0]} vendor={vendor} />
          </div>
          <div className="col-7 parent-min-half-high">
            <ProductDescription single={single[0]} vendor={vendor} />
          </div>
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

DetailedProduct.propTypes = {
  getProductWithImgs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductWithImgs }
)(DetailedProduct);
