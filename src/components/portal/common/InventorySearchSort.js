import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchVendors } from '../../../actions/vendorActions';
import { toast } from 'react-toastify';
import isEmpty from '../../../validation/is-empty';
class InventorySearchSort extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      disabled: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidUpdate() {
    if (this.state.disabled) this.setState({ disabled: false });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onSearch(e) {
    e.preventDefault();

    if (isEmpty(this.state.search)) {
      toast.info('Please check your input!');
    } else {
      this.props.searchVendors(this.state.search);
      // This was commented out before, why is that?
      // update: Because we have a clear all filter button now.
      //this.setState({ search: '' });
    }
  }

  render() {
    return (
      <div className="mt-2 mb-3 ml-3 mr-3 w-100 row">
        <div className="col">
          <form className="btn-group form-inline ml-0 mr-1">
            <div className="search-form-custom">
              <input
                className="form-control left-rounded border-right-0 border"
                type="search"
                name="search"
                placeholder="Search"
                value={this.state.search}
                onChange={this.onChange}
                disabled={this.state.disabled ? true : false}
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
            className="btn-group btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort By
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item" type="button">
              ID
            </button>
            <button className="dropdown-item" type="button">
              Name
            </button>
            <button className="dropdown-item" type="button">
              Location
            </button>
          </div>
        </div>
        <div className="col" />
      </div>
    );
  }
}

InventorySearchSort.propTypes = {
  searchVendors: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { searchVendors }
)(InventorySearchSort);
