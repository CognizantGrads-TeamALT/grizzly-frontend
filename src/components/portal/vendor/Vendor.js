import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import VendorSearchSort from "../common/VendorSearchSort";
import { getVendors, setVendorUpdated } from "../../../actions/vendorActions";
import VendorList from "./VendorList";
import isEmpty from "../../../validation/is-empty";
import ErrorComponent from "../../common/ErrorComponent";


class Vendor extends Component {
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

  componentDidUpdate() {
    if (this.props.vendor.updateOnce)
      this.props.setVendorUpdated();
  }

  shouldComponentUpdate() {
    if (this.props.vendor.updateOnce || this.props.vendor.loading)
      return true;

    return false;
  }

  loadMore() {
    if (this.props.vendor.hasMore) {
      this.props.getVendors(this.props.vendor.index);
    }
  }

  show() {
    const { vendors, loading } = this.props.vendor;
    const {errorMessage } = this.props.errors;
    if((isEmpty(vendors) && !loading && errorMessage !== "")){
      return(
        <tr>
          <td>
            <ErrorComponent errormsg={this.props.errors.errorMessage}/>
          </td>
        </tr>
      )
    }
    else if (loading) {
      return (
        <tr>
          <td>
            <Spinner size={'150px'}/>
          </td>
        </tr>
      );
    } else {
      if (isEmpty(vendors)) {
        return <p>No vendors found.</p>;
      }

      return vendors.map(vendor => (
        <VendorList key={vendor.vendorId} vendor={vendor} />
      ));
    }
  }

  render() {
    return (
      <div>
        <VendorSearchSort />
        <div ref="myscroll" style={{ height: '555px', overflowX: 'hidden', overflowY: 'auto' }}>
        <div className="overflow-normal-page">
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
            <tbody>{this.show()}</tbody>
          </table>
        </div>
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
  vendor: state.vendor,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getVendors, setVendorUpdated }
)(Vendor);
