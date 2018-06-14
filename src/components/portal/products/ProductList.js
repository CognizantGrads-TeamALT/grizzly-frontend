import React, { Component } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  toggleBlockProduct,
  deleteProduct
} from '../../../actions/productsActions';
import isEmpty from '../../../validation/is-empty';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId : this.props.location
  }
    this.onBlockClick = this.onBlockClick.bind(this);
  }

  onDeleteClick(id) {
    this.props.deleteProduct(id);
  }

  onBlockClick() {
    const { product } = this.props;
    product.enabled = !product.enabled;
    this.props.toggleBlockProduct(product);
  }

  showCatName(product) {
    const { product_category } = this.props;
    if (!isEmpty(product) && !isEmpty(product_category)) {
      const catName =
        product.categoryId === 0
          ? product.categoryId
          : product_category.filter(
              item => item.categoryId === product.categoryId
            )[0].name;
      return catName;
    }
  }

  showVendorName(product) {
    const { product_vendor } = this.props;
    if (!isEmpty(product) && !isEmpty(product_vendor)) {
      const vendName =
        product.vendorId === 0
          ? product.vendorId
          : product_vendor.filter(item => item.vendorId === product.vendorId)[0]
              .name;
      return vendName;
    }
  }

  render() {
    const { product } = this.props;

    return (
      <tr>
        <th scope="row">{product.productId}</th>
        <td>{product.name}</td>
        <td>{this.showVendorName(product)}</td>
        <td>{this.showCatName(product)}</td>
        <td>{product.rating}</td>
        <td>
          <Link
            to={`/detailedproduct/${product.productId}`}
            className="btn btn-outline-info btn-sm my-2 my-sm-0 mr-sm-2"
          >
            View
          </Link>
          <ConfirmModal
            buttonLabel={product.enabled ? 'Block' : 'Unblock'}
            title="Block Product"
            confirmText={
              (product.enabled ? 'Block' : 'Unblock') + ' ' + product.name
            }
            buttonClass="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
            onSubmit={this.onBlockClick}
          />
          <ConfirmModal
            buttonLabel="Delete"
            title="Delete Product"
            confirmText={'Delete ' + product.name}
            buttonClass="btn btn-outline-danger btn-sm my-2 my-sm-0 mr-sm-2"
            onSubmit={this.onDeleteClick.bind(this, product.productId)}
          />
        </td>
      </tr>
    );
  }
}

ProductList.propTypes = {
  toggleBlockProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { toggleBlockProduct, deleteProduct }
)(ProductList);
