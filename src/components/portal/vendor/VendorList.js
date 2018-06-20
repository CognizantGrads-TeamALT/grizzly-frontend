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
        <div className="row">
            <div className="col pl-2 pr-0">
              <button
                className="btn more-rounded blue-b btn-sm mr-sm-2 d-inline"
                type="button"
              >
                View
              </button>
            </div>
            <div className="col p-0">
              <ConfirmModal
                  buttonLabel={vendor.enabled ? "Block" : "Unblock"}
                  title="Block Vendor"
                  confirmText={(vendor.enabled ? "Block" : "Unblock") + " " + vendor.name}
                  buttonClass="btn more-rounded orange-b btn-sm mr-sm-2 d-inline"
                  onSubmit={this.onBlockClick}
                />
            </div>
            <div className="col p-0">
              <ConfirmModal
                  buttonLabel="Delete"
                  title="Delete Vendor"
                  confirmText={"Delete " + vendor.name}
                  buttonClass="btn more-rounded red-b btn-sm mr-sm-2 d-inline"
                  onSubmit={this.onDeleteClick.bind(this, vendor.vendorId)}
                />
            </div>
          </div>
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