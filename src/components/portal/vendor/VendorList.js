import React, { Component } from "react";
import ConfirmModal from "../common/ConfirmModal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleBlockVendor, deleteVendor } from "../../../actions/vendorActions";

class VendorList extends Component {
  constructor(props) {
    super(props);
    this.onBlockClick = this.onBlockClick.bind(this);
  }

  onDeleteClick(id) {
    this.props.deleteVendor(id);
  }

  onBlockClick() {
    const { vendor } = this.props;
    const updatedVendor = {
      vendorId: vendor.vendorId,
      enabled: !vendor.enabled
    };
    this.props.toggleBlockVendor(updatedVendor);
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
          <ConfirmModal
              buttonLabel={vendor.enabled ? "Block" : "Unblock"}
              title="Block Vendor"
              confirmText={(vendor.enabled ? "Block" : "Unblock") + " " + vendor.name}
              buttonClass="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
              onSubmit={this.onBlockClick}
            />
          <ConfirmModal
              buttonLabel="Delete"
              title="Delete Vendor"
              confirmText={"Delete " + vendor.name}
              buttonClass="btn btn-outline-danger btn-sm my-2 my-sm-0 mr-sm-2"
              onSubmit={this.onDeleteClick.bind(this, vendor.vendorId)}
            />
        </td>
      </tr>
    );
  }
}

VendorList.propTypes = {
  toggleBlockVendor: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired
};

export default connect(
  null,
  { toggleBlockVendor, deleteVendor }
)(VendorList);