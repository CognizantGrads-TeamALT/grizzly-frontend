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
//import ErrorComponent from "../../common/ErrorComponent"
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
    if (
      this.props.product.updateOnce ||
      this.props.product.loading ||
      this.props.errors.errorMessage !== ''
    )
      return true;

    return false;
  }

  loadMore() {
    if (this.props.product.hasMore) {
      this.props.getProducts(this.props.product.index);
      if (!isEmpty(this.props.errors.errorMessage)) {
        toast.info(this.props.errors.errorMessage);
      }
    } else {
      toast.info('All products loaded.');
    }
  }

  show() {
    const {
      products,
      product_vendor,
      product_category,
      loadingVendors,
      loadingCategories,
      loading
    } = this.props.product;
    if (!loadingVendors && !loadingCategories) {
      if (this.props.user.role === 'admin') {
        if (isEmpty(products)) {
          return <p>No products found.</p>;
        }
        return products.map((prod, index) => (
          <ProductList
            key={prod.productId}
            product_category={product_category}
            product_vendor={product_vendor}
            prod={prod}
            index={index}
            role={this.props.user.role}
            errors={this.props.errors}
          />
        ));
      } else if (this.props.user.role === 'vendor') {
        if (isEmpty(products)) {
          return <p>No products found.</p>;
        } else {
          return products
            .filter(prod => prod.vendorId === this.props.user.user.userId)
            .map((prod, index) => (
              <ProductList
                key={prod.productId}
                product_category={product_category}
                product_vendor={product_vendor}
                prod={prod}
                index={index}
                role={this.props.user.role}
              />
            ));
        }
      }
    } else {
      if (loading) {
        return (
          <tr>
            <td>
              <Spinner />
            </td>
          </tr>
        );
      } else if (
        isEmpty(products) &&
        !isEmpty(this.props.errors.errorMessage)
      ) {
        toast.info(this.props.errors.errorMessage);
      }
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
  product: PropTypes.object.isRequired,
  filterProductsByCategory: PropTypes.func.isRequired
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
