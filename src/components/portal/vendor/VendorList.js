import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteVendor } from "../../../actions/vendorActions";
class VendorList extends Component {
  onDeleteClick(id) {
    this.props.deleteVendor(id);
  }
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
            onClick={this.onDeleteClick.bind(this, vendor.vendorId)}
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

VendorList.propTypes = {
  deleteVendor: PropTypes.func.isRequired
};

export default connect(null, { deleteVendor })(VendorList);
