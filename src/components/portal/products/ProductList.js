import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  toggleBlockProduct,
  deleteProduct
} from "../../../actions/productsActions";
import isEmpty from "../../../validation/is-empty";

class ProductList extends Component {
  constructor(props) {
    super(props);
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
      // TODO : display Cat name and Vendor Name instead of Ids
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
      // TODO : display Cat name and Vendor Name instead of Ids
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
        <th scope="row" className="fnt-weight-400">
          {product.productId}
        </th>
        <td>{product.name}</td>
        <td>{this.showVendorName(product)}</td>
        <td>{this.showCatName(product)}</td>
        <td>{product.price}</td>
        <td>
          <Link
            to={`/detailedproduct/${product.productId}`}
            className="btn btn-outline-info btn-sm my-2 my-sm-0 mr-sm-2"
          >
            View
          </Link>
          <button
            onClick={this.onBlockClick}
            className="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
            type="button"
          >
            {product.enabled ? "Block" : "Unblock"}
          </button>
          <button
            onClick={this.onDeleteClick.bind(this, product.productId)}
            className="btn btn-outline-danger btn-sm my-2 my-sm-0 mr-sm-2"
            type="button"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

ProductList.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  toggleBlockProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { toggleBlockProduct, deleteProduct }
)(ProductList);
