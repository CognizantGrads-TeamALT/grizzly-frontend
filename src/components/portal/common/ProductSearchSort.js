import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  searchProducts,
  sortProductsByParam,
  sortProductsVendorByParam
} from '../../../actions/productsActions';
import { toast } from 'react-toastify';
import isEmpty from '../../../validation/is-empty';

class ProductSearchSort extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSortById = this.onSortById.bind(this);
    this.onSortByName = this.onSortByName.bind(this);
    this.onSortByRating = this.onSortByRating.bind(this);
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

  onSortById(e) {
    e.preventDefault();
    if (this.props.user.role === 'admin')
      this.props.sortProductsByParam('0', 'productId');
    else
      this.props.sortProductsVendorByParam(this.props.user.user.vendorId, '0', 'productId');
    this.setState({ search: '' });
  }

  onSortByName(e) {
    e.preventDefault();
    if (this.props.user.role === 'admin')
      this.props.sortProductsByParam('0', 'name');
    else
      this.props.sortProductsVendorByParam(this.props.user.user.vendorId, '0', 'name');
    this.setState({ search: '' });
  }

  onSortByRating(e) {
    e.preventDefault();
    if (this.props.user.role === 'admin')
      this.props.sortProductsByParam('0', 'rating');
    else
      this.props.sortProductsVendorByParam(this.props.user.user.vendorId, '0', 'rating');
    this.setState({ search: '' });
  }

  onSearch(e) {
    e.preventDefault();
    if (isEmpty(this.state.search)) {
      toast.info('Please check your input!');
    } else {
      this.props.searchProducts(this.state.search, '0');
      // This was commented out before, why is that?
      // update: Because we have a clear all filter button now.
      //this.setState({ search: '' });
    }
  }

  render() {
    return (
      <div className="btn-group aligned-left">
        <form onSubmit={this.onSearch} className="form-inline ml-0 mr-1">
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
          className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort By
        </button>
        <div className="dropdown-menu">
          <button
            className="dropdown-item"
            type="button"
            onClick={this.onSortById}
          >
            ID
          </button>
          <button
            className="dropdown-item"
            type="button"
            onClick={this.onSortByName}
          >
            Name
          </button>
          <button
            className="dropdown-item"
            type="button"
            onClick={this.onSortByRating}
          >
            Rating
          </button>
        </div>
      </div>
    );
  }
}

ProductSearchSort.propTypes = {
  searchProducts: PropTypes.func.isRequired,
  sortProductsByParam: PropTypes.func.isRequired,
  sortProductsVendorByParam: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

export default connect(
  mapStateToProps,
  { searchProducts, sortProductsByParam, sortProductsVendorByParam }
)(ProductSearchSort);
