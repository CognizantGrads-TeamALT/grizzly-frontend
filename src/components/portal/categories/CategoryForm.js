import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addCategory, editCategory } from "../../../actions/categoryActions";
import isEmpty from "../../../validation/is-empty";

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: this.props.category.name,
      description: this.props.category.description
    };
    this.onToggle = this.onToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (!isEmpty(this.props.category.categoryId)) {
      const newInfo = {
        categoryId: this.props.category.categoryId,
        name: this.state.name,
        description: this.state.description,
        enabled: this.props.category.enabled
      };

      this.props.editCategory(newInfo);
    } else {
      const newCat = {
        name: this.state.name,
        description: this.state.description
      };

      this.props.addCategory(newCat);
    }
    this.setState({
      name: "",
      description: ""
    });
    this.onToggle();
  }

  render() {
    return (
      <div className="form-group mb-0">
        <input
          type="button"
          value={this.props.buttonLabel}
          className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
          onClick={this.onToggle}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.onToggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-sm text-right flex-grow-04">
                  <p>Category Name</p>
                </div>
                <div className="col-md">
                  <TextFieldGroup
                    placeholder="Category Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm text-right flex-grow-04">
                  <p>Category Description</p>
                </div>
                <div className="col-md">
                  <TextAreaFieldGroup
                    placeholder="Category Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <div>
              <Button
                className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
                onClick={this.onSubmit}
              >
                Submit
              </Button>

              <Button
                className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
                onClick={this.onToggle}
              >
                Cancel
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired
};

export default connect(null, { addCategory, editCategory })(
  withRouter(CategoryForm)
);
