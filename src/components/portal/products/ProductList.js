import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct } from "../../../actions/productsActions";
class ProductList extends Component {
    onDeleteClick(id) {
        this.props.deleteProduct(id);
    }

    render() {
        const { product } = this.props;

        return (
            <tr>
                <th scope="row">{product.productId}</th>
                <td>{product.name}</td>
                <td>{product.vendorId}</td>
                <td>{product.categoryId}</td>
                <td>{product.desc}</td>
                <td>{product.price}</td>
                <td>
                    <button
                        className="btn btn-outline-info btn-sm my-2 my-sm-0 mr-sm-2"
                        type="button"
                    >
                        View
                    </button>
                    <button
                        className="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
                        type="button"
                    >
                        Block
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
        )
    }
}

ProductList.propTypes = {
    deleteProduct: PropTypes.func.isRequired
  };
  
export default connect(null, { deleteProduct })(ProductList);
  