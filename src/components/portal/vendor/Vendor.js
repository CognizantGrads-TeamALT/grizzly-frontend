import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import VendorSearchSort from "../common/VendorSearchSort";
import { getVendors, setVendorUpdated } from "../../../actions/vendorActions";
import VendorList from "./VendorList";
import isEmpty from "../../../validation/is-empty";
class Vendor extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
  }

  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener("scroll", e => {
      e.preventDefault();
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
          this.refs.myscroll.scrollHeight &&
        !this.props.vendor.loading
      ) {
        this.loadMore();
      }
    });
  }

  shouldComponentUpdate() {
    if (this.props.vendor.updateOnce) {
      this.props.setVendorUpdated();
      return true;
    }

    return this.props.vendor.loading || false;
  }

  loadMore() {
    if (this.props.vendor.hasMore) {
      this.index += 1;
      this.props.getVendors(this.index);
    } else {
      this.index = 0;
    }
  }

  show() {
    const { vendors, loading } = this.props.vendor;
    if (isEmpty(vendors) || loading) {
      return (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    } else {
      return vendors.map(vendor => (
        <VendorList key={vendor.vendorId} vendor={vendor} />
      ));
    }
  }

  render() {
    return (
      <div>
        <VendorSearchSort />
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
        </table>
        <div ref="myscroll" style={{ height: "500px", overflow: "auto" }}>
          <table className="table table-sm table-hover">
            <tbody>{this.show()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

Vendor.propTypes = {
  getVendors: PropTypes.func.isRequired,
  setVendorUpdated: PropTypes.func.isRequired,
  vendor: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vendor: state.vendor
});

export default connect(
  mapStateToProps,
  { getVendors, setVendorUpdated }
)(Vendor);
