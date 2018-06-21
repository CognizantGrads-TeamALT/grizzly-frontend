import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addVendor } from "../../../actions/vendorActions";
import validator from 'validator';
import _ from 'lodash';

class VendorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      website: "",
      contactNum: "",
      email: "",
      bio: ""
    };

    this.onToggle = this.onToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateVendor = this.validateVendor.bind(this);
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

    const newVendor = {
      name: this.state.name,
      website: this.state.website,
      contactNum: this.state.contactNum,
      email: "",
      bio: ""
    };

    let validationErrors = this.validateVendor(newVendor);

    if (validationErrors.length > 0) {
      // TODO: show modal with error messages. For now just logging to console
      console.log("The vendor could not be created. Please amend the following issues:");
      _(validationErrors).forEach(function(error) {
        console.log(error.msg);
        console.log("DEBUG: " + error.debug);
      });
    } 
    // No validation errors found!
    else {
      this.props.addVendor(newVendor);
      this.setState({
        name: "",
        website: "",
        contactNum: "",
        email: "",
        bio: ""
      });
      this.onToggle();
    }
  }

  /**
   * Validates fields of a newly created vendor (where appropriate)
   * @param vendor, object representing a Vendor to be sent to back-end
   * @returns array of validation issues (empty if no issues)
   */
  validateVendor(vendor) {
    let errors = [];

    // empty field validation
    if (validator.isEmpty(this.state.name) || 
        validator.isEmpty(this.state.website) || 
        validator.isEmpty(this.state.contactNum)) {
      _([{key: "name", value: this.state.name},
          {key: "website", value: this.state.website},
          {key: "contact number", value: this.state.contactNum}]).forEach(function(field) {
        if (validator.isEmpty(field.value)) {
          errors.push({
            msg: "Invalid " + field.key + ". " + field.key + " cannot be empty.",
            debug: "Invalid " + field.key + ": " + field.value
          });
        }
      })
    }

    // website is a URL
    if (!validator.isURL(this.state.website)) {
      errors.push({
        msg: "Invalid website. Website must be a valid URL.",
        debug: "Invalid website: " + this.state.website
      });
    }

    return errors;
  }

  render() {
    return (
      <div className="form-group mb-0">
        <input
          type="button"
          value="Add Vendor"
          className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
          onClick={this.onToggle}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.onToggle}>Add Vendor</ModalHeader>
          <ModalBody>
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-sm text-right flex-grow-04">
                  <p>Vendor Name</p>
                </div>
                <div className="col-md">
                  <TextFieldGroup
                    placeholder="Vendor Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm text-right flex-grow-04">
                  <p>Vendor Website</p>
                </div>
                <div className="col-md">
                  <TextFieldGroup
                    placeholder="Vendor Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm text-right flex-grow-04">
                  <p>Contact Number</p>
                </div>
                <div className="col-md">
                  <TextAreaFieldGroup
                    placeholder="Contact Number"
                    name="contactNum"
                    value={this.state.contactNum}
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
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

VendorForm.propTypes = {
  vendor: PropTypes.object.isRequired,
  addVendor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vendor: state.vendor
});

export default connect(mapStateToProps, { addVendor })(withRouter(VendorForm));
