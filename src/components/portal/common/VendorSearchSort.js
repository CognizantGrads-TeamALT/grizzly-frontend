import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  searchVendors,
  sortVendorsByParam
} from '../../../actions/vendorActions';
import VendorForm from '../vendor/VendorForm';

class VendorSearchSort extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      disabled: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSortById = this.onSortById.bind(this);
    this.onSortByName = this.onSortByName.bind(this);
    this.onSortByWebsite = this.onSortByWebsite.bind(this);
  }

  componentDidUpdate() {
    if (this.state.disabled) this.setState({ disabled: false });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ disabled: true });
  }

  onSearch(e) {
    e.preventDefault();

    this.props.searchVendors(this.state.search);
    this.setState({ search: '' });
  }

  onSortById(e) {
    e.preventDefault();
    this.props.sortVendorsByParam('0', 'vendorId');
    this.setState({ search: '' });
  }

  onSortByName(e) {
    e.preventDefault();
    this.props.sortVendorsByParam('0', 'name');
    this.setState({ search: '' });
  }

  onSortByWebsite(e) {
    e.preventDefault();
    this.props.sortVendorsByParam('0', 'website');
    this.setState({ search: '' });
  }

  render() {
    return (
      <div className="btn-group aligned-left mt-2 mb-2">
        <form onSubmit={this.onSearch} className="form-inline ml-0 mr-1">
          <div className="search-form-custom">
            <input
              className="form-control left-rounded border-right-0 border"
              type="search"
              name="search"
              placeholder="Search"
              value={this.state.search}
              onChange={this.onChange}
              disabled={this.state.disabled ? 'disabled' : ''}
            />
            <span className="input-group-append-more">
              <button
                onClick={this.onSearch}
                className="btn btn-outline-success btn-sm right-rounded border-left-0 border"
                type="button"
              >
                <i className="fa fa-search" />
              </button>
            </span>
          </div>
        </form>
        <button
          type="button"
          className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort By
        </button>
        <div className="dropdown-menu">
          <button
            onClick={this.onSortById}
            className="dropdown-item"
            type="button"
          >
            ID
          </button>
          <button
            onClick={this.onSortByName}
            className="dropdown-item"
            type="button"
          >
            Name
          </button>
          <button
            onClick={this.onSortByWebsite}
            className="dropdown-item"
            type="button"
          >
            Website
          </button>
        </div>
        <VendorForm
          buttonLabel="addVendor"
          title="addVendor"
          actionLabel="addVendor"
        />
      </div>
    );
  }
}

VendorSearchSort.propTypes = {
  searchVendors: PropTypes.func.isRequired,
  sortVendorsByParam: PropTypes.func.isRequired,
  vendor: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vendor: state.vendor
});

export default connect(
  mapStateToProps,
  { searchVendors, sortVendorsByParam }
)(VendorSearchSort);
