import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addVendor } from "../../../actions/vendorActions";

class VendorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      vendorname: "",
      website: "",
      contactNumber: ""
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

    const newVendor = {
      vendorname: this.state.vendorname,
      website: this.state.website,
      contactNumber: this.state.contactNumber
    };

    this.props.addVendor(newVendor);
    this.setState({
      vendorname: "",
      website: "",
      contactNumber: ""
    });
    this.onToggle();
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
                  <text>Vendor Name</text>
                </div>
                <div className="col-md">
                  <TextFieldGroup
                    placeholder="Vendor Name"
                    name="vendorname"
                    type="vendorname"
                    value={this.state.vendorname}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm text-right flex-grow-04">
                  <text>Vendor Website</text>
                </div>
                <div className="col-md">
                  <TextAreaFieldGroup
                    placeholder="Vendor Website"
                    name="website"
                    type="website"
                    value={this.state.website}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm text-right flex-grow-04">
                  <text>Vendor Contact Number</text>
                </div>
                <div className="col-md">
                  <TextAreaFieldGroup
                    placeholder="Vendor Contact Number"
                    name="contactNumber"
                    type="contactNumber"
                    value={this.state.contactNumber}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <div>
              <Button
                className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-3"
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

VendorForm.propTypes = {
  vendor: PropTypes.object.isRequired,
  addVendor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vendor: state.vendor
});

export default connect(mapStateToProps, { addVendor })(withRouter(VendorForm));
