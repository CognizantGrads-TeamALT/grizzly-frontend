import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductSearchSort from '../common/ProductSearchSort';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../common/Spinner';
import InventoryList from './InventoryList';
import {
  getProducts,
  setProductUpdated,
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
    if (this.props.product.updateOnce)
      this.props.setProductUpdated();
  }

  shouldComponentUpdate() {
    if (this.props.product.updateOnce || this.props.product.loading)
      return true;

    return false;
  }

  loadMore() {
    if (this.props.product.hasMore) {
      this.props.getProducts(this.props.product.index);
    }
  }

  show() {
    const {
      products,
      loading
    } = this.props.product;
    if (
      !isEmpty(products) &&
      !loading
    ) {
      return products.map(prod => (
        <InventoryList
          key={prod.productId}
          product={prod}
        />
      ));
    } else {
      return (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    }
  }

  render() {
    return (
      <div>
        <ProductSearchSort />
        <div ref="myscroll" style={{ height: '500px', overflow: 'auto' }}>
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Product List</th>
                <th scope="col">In Stock</th>
                <th scope="col">Req.</th>
                <th scope="col">Buffer</th>
                <th scope="col">price</th>
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
  getProducts: PropTypes.func.isRequired,
  setProductUpdated: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts, setProductUpdated }
)(Inventory);
