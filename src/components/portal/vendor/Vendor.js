import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import SearchSort from "../common/SearchSort";
import { getVendors } from "../../../actions/vendorActions";
import VendorList from "./VendorList";

class Vendor extends Component {
  componentDidMount() {
    this.props.getVendors();
  }

  render() {
    const { vendors, loading } = this.props.vendor;
    let vendorItem;
    if (vendors === null || loading) {
      vendorItem = (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    } else {
      if (vendors.length > 0) {
        vendorItem = vendors.map(vendor => (
          <VendorList key={vendor.vendorId} vendor={vendor} />
        ));
      } else {
        vendorItem = (
          <tr>
            <td>Not found</td>
          </tr>
        );
      }
    }

    return (
      <div>
        <SearchSort />
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Vendor Name</th>
              <th scope="col">Location</th>
              <th scope="col">Contact</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{vendorItem}</tbody>
        </table>
      </div>
    );
  }
}

Vendor.propTypes = {
  getVendors: PropTypes.func.isRequired,
  vendor: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vendor: state.vendor
});

export default connect(mapStateToProps, { getVendors })(Vendor);
