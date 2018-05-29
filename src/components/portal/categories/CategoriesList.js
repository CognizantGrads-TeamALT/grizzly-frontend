import React, { Component } from "react";

class CategoriesList extends Component {
  render() {
    const { category } = this.props;
    return (
      <tr>
        <th scope="row">{category.name}</th>
        <td>{category.description}</td>
        <td>{category.productCount}</td>
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

export default CategoriesList;
