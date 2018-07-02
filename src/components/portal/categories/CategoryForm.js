import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addCategory, editCategory, WaitForError } from "../../../actions/categoryActions";
import isEmpty from "../../../validation/is-empty";
import validator from "validator";
import _ from "lodash";
//import { runInThisContext } from "vm";
import ErrorComponent from "../../common/ErrorComponent";

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: this.props.category.name,
      description: this.props.category.description,
      errors: [],
      shouldToggle: false
    };
    this.onToggle = this.onToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateCategory=this.validateCategory.bind(this);
  }

  onToggle() {
    this.setState({
      modal: !this.state.modal,
      errors: [],
      shouldToggle: false,
      showDBErrors: false
    });
  }

  componentDidUpdate(){
    //closes module if close has been triggered with no errors
    if(!this.props.errors.waitForError && this.state.shouldCancel){
      this.onToggle();
      this.props.WaitForError();
     }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let validationErrors = [];
    //first if, checks if the category exists, if so, edits the category
    if (!isEmpty(this.props.category.categoryId)) {
      const newInfo = {
        categoryId: this.props.category.categoryId,
        name: this.state.name,
        description: this.state.description,
        enabled: this.props.category.enabled
      };

      validationErrors = this.validateCategory(newInfo);
      //if no errors were found, edit cat
      if(validationErrors.length === 0) {
        this.props.editCategory(newInfo);
      }
    // else to the frist if, category does not exist, therefor, create new category.
    } else {
      const newCat = {
        name: this.state.name,
        description: this.state.description
      };

      validationErrors = this.validateCategory(newCat);
      
      if(validationErrors.length === 0) {
        this.props.addCategory(newCat);
      }
    }

    if (validationErrors.length === 0) {
      this.setState({
        shouldToggle: true,
        showDBErrors: true
      });
      
    }
  }

  /**
   * Validates fields of a newly created category (where appropriate)
   * @param cat, object representing a Category to be sent to back-end
   * @returns array of validation issues (empty if no issues)
   */
  validateCategory(cat) {
    let errors = [];

    // empty field validation
    if (validator.isEmpty(this.state.name) || 
        validator.isEmpty(this.state.description)) {
      _([{key: "name", value: this.state.name},
          {key: "description", value: this.state.description}]).forEach(function(field) {
        if (validator.isEmpty(field.value)) {
          errors.push({
            msg: "Invalid " + field.key + ". " + field.key + " cannot be empty.",
            debug: "Invalid " + field.key + ": " + field.value
          });
        }
      })
    }
    //saves validation errors to global state
    this.setState({errors: errors})
    return errors;
  }

  showError(){
    //shows validation errors
    if(this.state.errors.length !== 0){
      return <ErrorComponent errormsg={this.state.errors[0].msg}/>
    }
    //shows DB errors post submit
    else if(this.state.showDBErrors && this.props.errors.errorMessage !== ''){
      return(<ErrorComponent errormsg={this.props.errors.errorMessage}/>)
    }
  } 

  render() {
    return (
      <div className="form-group mb-0">
        <input
          type="button"
          value={this.props.buttonLabel}
          className={this.props.buttonClass}
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
                className="btn more-rounded plain-b btn-sm mr-sm-2 d-inline"
                onClick={this.onSubmit}
              >
                Submit
              </Button>

              <Button
                className="btn more-rounded orange-b btn-sm mr-sm-2 d-inline"
                onClick={this.onToggle}
              >
                Cancel
              </Button>
              {this.showError()}
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

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addCategory, editCategory, WaitForError })(
  withRouter(CategoryForm)
);
