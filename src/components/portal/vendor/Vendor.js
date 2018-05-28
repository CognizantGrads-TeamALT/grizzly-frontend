import React, { Component } from "react";
import { connect } from "react-redux";
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
    console.log(vendors);
    if (vendors === null || loading) {
      // vendorItem = <Spinner />;
    } else {
      if (vendors.length > 0) {
        vendorItem = vendors.map(vendor => (
          <VendorList key={vendor.id} vendor={vendor} />
        ));
      } else {
        // vendorItem = <p>No vendors found.</p>;
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
