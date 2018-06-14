import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  searchProducts,
  sortProductsByParam
} from '../../../actions/productsActions';

class ProductSearchSort extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSortById = this.onSortById.bind(this);
    this.onSortByName = this.onSortByName.bind(this);
    this.onSortByRating = this.onSortByRating.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onSortById(e) {
    e.preventDefault();
    this.props.sortProductsByParam('0', 'productId');
  }

  onSortByName(e) {
    e.preventDefault();
    this.props.sortProductsByParam('0', 'name');
  }

  onSortByRating(e) {
    e.preventDefault();
    this.props.sortProductsByParam('0', 'rating');
  }

  onSearch(e) {
    e.preventDefault();

    this.props.searchProducts(this.state.search);
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
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { searchProducts, sortProductsByParam }
)(ProductSearchSort);
