import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductSearchSort from '../common/ProductSearchSort';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import InventoryList from './InventoryList';
import { toast } from 'react-toastify';
import {
  setProductUpdated,
  getVendorInventory
} from '../../../actions/productsActions';
import isEmpty from '../../../validation/is-empty';

class Inventory extends Component {
  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener('scroll', e => {
      e.preventDefault();
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
          this.refs.myscroll.scrollHeight &&
        !this.props.product.loading
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
    if (this.props.product.vendorHasMore) {
      this.props.getVendorInventory(
        this.props.product.vendorIndex,
        this.props.user.user.vendorId
      );
    }
  }

  show() {
    const { vendorInventory, loading } = this.props.product;
    if (!isEmpty(vendorInventory) && !loading) {
      return vendorInventory.map(prod => (
        <InventoryList key={prod.productId} product={prod} />
      ));
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
        isEmpty(vendorInventory) &&
        this.props.errors.errorMessage === 'No inventory was found.'
      ) {
        toast.info(
          'No products were found. Select Add Product to add one now!'
        );
      }
    }
  }

  render() {
    return (
      <div>
        <div className="m-3 col">
          <ProductSearchSort />
        </div>
        <div ref="myscroll" style={{ height: '500px', overflow: 'auto' }}>
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Product List</th>
                <th scope="col">In Stock</th>
                <th scope="col">Req.</th>
                <th scope="col">Buffer</th>
                <th scope="col">Price</th>
                <th scope="col">Pending</th>
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

Inventory.propTypes = {
  getVendorInventory: PropTypes.func.isRequired,
  setProductUpdated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  errors: state.errors,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getVendorInventory, setProductUpdated }
)(Inventory);
