import React, { Component } from "react";
import { onToggle } from "../AdminTab";
class ProductList extends Component {
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
                        // onClick={this.onClick.onToggle("null")}
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
                        // onClick={this.onDeleteClick.bind(this, product.productId)}
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

export default ProductList;
