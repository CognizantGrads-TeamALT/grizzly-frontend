import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import isEmpty from "../../../validation/is-empty";
import PropTypes from "prop-types";
import CategorySearchSort from "../common/CategorySearchSort";
import { getCategories } from "../../../actions/categoryActions";
import CategoriesList from "./CategoriesList";

class Categories extends Component {
  show() {
    const { categories, loading } = this.props.category;
    if (isEmpty(categories) || loading) {
      return (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    } else {
      return categories.map(category => (
        <CategoriesList key={category.categoryId} category={category} />
      ));
    }
  }

  render() {
    return (
      <div>
        <CategorySearchSort />
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
    );
  }
}

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Categories);
