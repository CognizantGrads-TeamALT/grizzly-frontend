import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import CategorySearchSort from "../common/CategorySearchSort";
import {
  getCategories,
  setCategoryUpdated
} from "../../../actions/categoryActions";
import CategoriesList from "./CategoriesList";
import isEmpty from "../../../validation/is-empty";
import ErrorComponent from "../../common/ErrorComponent";

class Categories extends Component {
  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener("scroll", e => {
      e.preventDefault();
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
        this.refs.myscroll.scrollHeight &&
        !this.props.category.loading
      ) {
        this.loadMore();
      }
    });
  }

  componentDidUpdate() {
    if (this.props.category.updateOnce)
      this.props.setCategoryUpdated();
  }

  shouldComponentUpdate() {
    if (this.props.category.updateOnce || this.props.category.loading)
      return true;

    return false;
  }

  loadMore() {
    if (this.props.category.hasMore) {
      this.props.getCategories(this.props.category.index);
    }
  }

  show() {
    const { categories, loading } = this.props.category;
    const { errorMessage } = this.props.errors;
    //show errors if finsihed loading, no cats were found and an error message exists
    if ((isEmpty(categories) && !loading && errorMessage !== "")) {
      return (
        <tr>
          <td>
            <ErrorComponent errormsg={this.props.errors.errorMessage} />
          </td>
        </tr>
      )
    }
    else if (loading) {
      return (
        <tr>
          <td>
            <Spinner size={'150px'} />
          </td>
        </tr>
      );
    } else {
      if (isEmpty(categories)) {
        return <tr>
          <td>
            <p>No categories found.</p>
          </td>
        </tr>;
      }

      return categories.map(category => (
        <CategoriesList key={category.categoryId} category={category} />
      ));
    }
  }

  render() {
    return (
      <div>
        <CategorySearchSort />
        <div ref="myscroll" style={{ height: '555px', overflowX: 'hidden', overflowY: 'auto' }}>
          <div className="overflow-normal-page">
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">Category Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Products</th>
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

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  setCategoryUpdated: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCategories, setCategoryUpdated }
)(Categories);
