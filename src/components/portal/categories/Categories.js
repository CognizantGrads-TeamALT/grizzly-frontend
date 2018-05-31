import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import CategorySearchSort from "../common/CategorySearchSort";
import { getCategories } from "../../../actions/categoryActions";
import CategoriesList from "./CategoriesList";

class Category extends Component {
  // componentDidMount() {
  //   this.props.getCategories();
  // }

  render() {
    const { categories, loading } = this.props.category;
    let categoryItem;
    if (categories === null || loading) {
      categoryItem = (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    } else {
      if (categories.length > 0) {
        categoryItem = categories.map(category => (
          <CategoriesList key={category.categoryId} category={category} />
        ));
      } else {
        categoryItem = (
          <tr>
            <td>
              <Spinner />
            </td>
          </tr>
        );
      }
    }

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
          <tbody>{categoryItem}</tbody>
        </table>
      </div>
    );
  }
}

Category.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(Category);
