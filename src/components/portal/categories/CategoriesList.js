import React, { Component } from "react";
import CategoryForm from "../categories/CategoryForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import { deleteCategory } from "../../../actions/categoryActions";

class CategoriesList extends Component {
  onDeleteClick(id) {
    this.props.deleteCategory(id);
  }
  render() {
    const { category } = this.props;
    if (category !== null && category !== undefined) {
      return (
        <tr>
          <th scope="row">{category.name}</th>
          <td>{category.description}</td>
          <td>{category.productCount}</td>
          <td>
            <CategoryForm
              category={category}
              buttonLabel="Edit"
              title="Edit Category"
              actionLabel="Edit"
            />
            <button
              className="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
              type="button"
            >
              Block
            </button>
            <button
              onClick={this.onDeleteClick.bind(this, category.categoryId)}
              className="btn btn-outline-danger btn-sm my-2 my-sm-0 mr-sm-2"
              type="button"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      );
    }
  }
}
CategoriesList.propTypes = {
  deleteCategory: PropTypes.func.isRequired
};

export default connect(null, { deleteCategory })(CategoriesList);
