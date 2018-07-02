import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import ProductList from './ProductList';
import {
  getProducts,
  setProductUpdated,
  filterProductsByCategory
} from '../../../actions/productsActions';
import isEmpty from '../../../validation/is-empty';
import { toast } from 'react-toastify';

class Products extends Component {
  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener('scroll', e => {
      e.preventDefault();
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
          this.refs.myscroll.scrollHeight &&
        !this.props.product.loadingVendors &&
        !this.props.product.loadingCategories
      ) {
        this.loadMore();
      }
    });
  }

  componentDidUpdate() {
    if (this.props.product.updateOnce) this.props.setProductUpdated();
  }

  shouldComponentUpdate() {
    if (this.props.product.updateOnce || this.props.product.loading)
      return true;

    return false;
  }

  loadMore() {
    if (this.props.product.hasMore) {
      this.props.getProducts(this.props.product.index);
      if (!isEmpty(this.props.errors)) {
        toast.info(this.props.errors.message);
      }
    }
  }

  show() {
    const {
      products,
      product_vendor,
      product_category,
      loadingVendors,
      loadingCategories
    } = this.props.product;
    if (!loadingVendors && !loadingCategories) {
      if (this.props.user.userType === 'admin') {
        if (isEmpty(products)) {
          return <p>No products found.</p>;
        }
        return products.map(prod => (
          <ProductList
            key={prod.productId}
            product_category={product_category}
            product_vendor={product_vendor}
            product={prod}
            userType={this.props.user.userType}
          />
        ));
      } else if (this.props.user.userType === 'vendor') {
        if (isEmpty(products)) {
          return <p>No products found.</p>;
        }
        return products
          .filter(
            prod =>
              prod.vendorId === parseInt(this.props.user.user[0].userId, 10)
          )
          .map(prod => (
            <ProductList
              key={prod.productId}
              product_category={product_category}
              product_vendor={product_vendor}
              product={prod}
              userType={this.props.user.userType}
            />
          ));
      }
    } else {
      return (
        <tr>
          <td>
            <Spinner size={'150px'} />
          </td>
        </tr>
      );
    }
  }

  render() {
    return (
      <div
        ref="myscroll"
        style={{ height: '555px', overflowX: 'hidden', overflowY: 'auto' }}
      >
        <div className="overflow-normal-page">
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Products Name</th>
                <th scope="col">Vendor</th>
                <th scope="col">Category</th>
                <th scope="col">Rating</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{this.show()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  setProductUpdated: PropTypes.func.isRequired,
  filterProductsByCategory: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProducts, setProductUpdated, filterProductsByCategory }
)(Products);
