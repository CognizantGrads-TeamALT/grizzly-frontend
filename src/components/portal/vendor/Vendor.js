import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import PropTypes from 'prop-types';
import VendorSearchSort from '../common/VendorSearchSort';
import { getVendors, setVendorUpdated } from '../../../actions/vendorActions';
import VendorList from './VendorList';
import isEmpty from '../../../validation/is-empty';
import { toast } from 'react-toastify';

class Vendor extends Component {
  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener('scroll', e => {
      e.preventDefault();
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
          this.refs.myscroll.scrollHeight - 10 &&
        !this.props.vendor.loading
      ) {
        this.loadMore();
      }
    });
  }

  componentDidUpdate() {
    if (this.props.vendor.updateOnce) this.props.setVendorUpdated();
  }

  shouldComponentUpdate() {
    if (this.props.vendor.updateOnce || this.props.vendor.loading) return true;

    return false;
  }

  toastId = null;

  notify = msg => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.info(msg);
    }
  };

  loadMore() {
    if (this.props.vendor.hasMore) {
      this.notify('Loading more vendors...');
      this.props.getVendors(this.props.vendor.index);
      if (!isEmpty(this.props.errors.errorMessage))
        toast.info(this.props.errors.errorMessage);
    }
  }

  show() {
    const { vendors, loading } = this.props.vendor;
    // const {errorMessage } = this.props.errors;
    // show errros if loading is finished, nothing has loaded and an error message exists
    if (loading) {
      return (
        <tr>
          <td>
            <Spinner size={'150px'} />
          </td>
        </tr>
      );
    } else {
      if (isEmpty(vendors)) {
        return (
          <tr>
            <td>No vendors found.</td>
          </tr>
        );
      }

      return vendors.map(vendor => (
        <VendorList key={vendor.vendorId} vendor={vendor} />
      ));
    }
  }

  render() {
    return (
      <div>
        <VendorSearchSort clear={this.props.clear} />
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
          <tbody
            ref="myscroll"
            style={{ overflowX: 'hidden', overflowY: 'auto' }}
          >
            {this.show()}
          </tbody>
        </table>
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
