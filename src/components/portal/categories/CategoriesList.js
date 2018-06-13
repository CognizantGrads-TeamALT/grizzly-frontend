import React, { Component } from "react";
import CategoryForm from "../categories/CategoryForm";
import ConfirmModal from "../common/ConfirmModal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import { toggleBlockCategory, deleteCategory } from "../../../actions/categoryActions";

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.onBlockClick = this.onBlockClick.bind(this);
  }

  onDeleteClick(id) {
    this.props.deleteCategory(id);
  }

  onBlockClick() {
    const { category } = this.props;
    const updatedCategory = {
      categoryId: category.categoryId,
      enabled: !category.enabled
    };
    this.props.toggleBlockCategory(updatedCategory);
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
            <ConfirmModal
              buttonLabel={category.enabled ? "Block" : "Unblock"}
              title="Block Category"
              confirmText={(category.enabled ? "Block" : "Unblock") + " " + category.name}
              buttonClass="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
              onSubmit={this.onBlockClick}
            />
          <ConfirmModal
              buttonLabel="Delete"
              title="Delete Category"
              confirmText={"Delete " + category.name}
              buttonClass="btn btn-outline-danger btn-sm my-2 my-sm-0 mr-sm-2"
              onSubmit={this.onDeleteClick.bind(this, category.categoryId)}
            />
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
  toggleBlockCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

export default connect(
  null,
  { toggleBlockCategory, deleteCategory }
)(CategoriesList);