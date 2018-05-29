import React, { Component } from "react";
class VendorList extends Component {
  render() {
    const { vendor } = this.props;
    return (
      <tr>
        <th scope="row">{vendor.vendorId}</th>
        <td>{vendor.name}</td>
        <td>{vendor.website}</td>
        <td>{vendor.contactNum}</td>
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

export default VendorList;
