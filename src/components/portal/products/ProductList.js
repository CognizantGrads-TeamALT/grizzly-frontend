import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  toggleBlockProduct,
  deleteProduct
} from "../../../actions/productsActions";
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
    const updatedProd = {
      productId: product.productId,
      name: product.name,
      vendorId: product.vendorId,
      categoryId: product.categoryId,
      desc: product.desc,
      price: product.price,
      enabled: !product.enabled
    };
    this.props.toggleBlockProduct(updatedProd);
  }

  render() {
    const { product } = this.props;

    return (
      <tr>
        <th scope="row" className="fnt-weight-400">{product.name}</th>
        <td>{product.vendorId}</td>
        <td>{product.categoryId}</td>
        <td>{product.price}</td>
        <td>
            <Link to={`/detailedproduct/${product.productId}`}
                className="btn btn-outline-info btn-sm my-2 my-sm-0 mr-sm-2">
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
