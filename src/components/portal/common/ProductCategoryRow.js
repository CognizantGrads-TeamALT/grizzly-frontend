import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import { getProducts } from '../../../actions/productsActions';
import { getCategories } from '../../../actions/categoryActions';

class ProductCategoryRow extends Component {
  componentDidMount() {
    if (isEmpty(this.props.product.products)) {
      this.props.getProducts();
    }
    if (isEmpty(this.props.category.categories)) {
      this.props.getCategories();
    }
  }

  show() {
    const { categories, loading } = this.props.category;
    if (!isEmpty(categories) && !loading) {
      return categories
        .filter(cat => cat.enabled !== false)
        .map((cat, index) => (
          <div className="col displayAllCategories-buttons" key={index}>
            <Link
              to={`/category/${cat.name}/${cat.categoryId}`}
              className="btn more-rounded parent-wide hover-t-b btn-sm my-2 my-sm-0 mr-sm-2"
            >
              {cat.name}
            </Link>
          </div>
        ));
    }
  }

  displayAllCategories() {
    const { categories, loading } = this.props.category;
    if (!isEmpty(categories) && !loading) {
      return categories
        .filter(cat => cat.enabled !== false)
        .map((cat, index) => (
          <Link
            key={index}
            to={`/category/${cat.name}/${cat.categoryId}`}
            className="dropdown-item more-rounded"
          >
            {cat.name}
          </Link>
        ));
    }
  }

  render() {
    return (
      <div className="mb-4 mt-4 below-navbar">
        <div className="row mt-4">
          <div className="col">
            <div className="dropdown categoryDropDownMenu">
              {!isEmpty(this.props.category.categories) && (
                <button
                  className="btn dropdown-toggle more-rounded parent-wide hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                  id="categoryDropDownMenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Shop by Category
                </button>
              )}
              <div
                className="dropdown-menu categoryDropDown"
                aria-labelledby="categoryDropDownMenu"
              >
                {this.displayAllCategories()}
              </div>
            </div>
          </div>
          {this.show()}
        </div>
      </div>
    );
  }
}

ProductCategoryRow.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  category: state.category
});

export default connect(
  mapStateToProps,
  {
    getProducts,
    getCategories
  }
)(ProductCategoryRow);
