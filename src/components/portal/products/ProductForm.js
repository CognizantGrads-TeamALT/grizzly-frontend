import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  addProduct,
  clearErrors,
  WaitForError
} from '../../../actions/productsActions';
import {
  searchCategories,
  Update_TypeAhead
} from '../../../actions/categoryActions';
import _ from 'lodash';
import CategoryTypeAhead from '../categories/CategoryTypeAhead';
import ImageUploader from './ImageUploader';
import validator from 'validator';
import VendorTypeAhead from '../vendor/VendorTypeAhead';
import { Vendor_Update_TypeAhead } from '../../../actions/vendorActions';
import ErrorComponent from '../../common/ErrorComponent';

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      category: '',
      name: '',
      desc: '',
      price: '',
      rating: 0,
      categoryList: [],
      cur_id: '',
      valid_cat: false,
      valid_vendor: false,
      display_error: false,
      intervalID: '',
      errors: [],
      shouldCancel: false,
      showDBErrors: false
    };
    this.pictures = [];
    this.files = [];
    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateProduct = this.validateProduct.bind(this);
  }

  onDrop(pictureDataURLs, pictureFiles) {
    this.pictures = pictureDataURLs;
    this.files = pictureFiles;
  }

  onToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidUpdate() {
    //if no errors have been thrown and cancel has been triggered, cancel.
    if (!this.props.errors.waitForError && this.state.shouldCancel) {
      this.cancel();
      this.props.WaitForError();
    }
  }

  cancel() {
    this.setState({
      errors: [],
      modal: false,
      category: '',
      name: '',
      desc: '',
      price: '',
      rating: 0,
      categoryList: [],
      cur_id: '',
      valid_cat: false,
      valid_vendor: false,
      shouldCancel: false,
      showDBErrors: false
    });
    this.props.onCancel();
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.clearErrors();
    let imageData = [];
    let i;
    for (i = 0; i < this.files.length; i++) {
      let img = {
        imgName: this.files[i].name,
        base64Image: this.pictures[i].split(',')[1]
      };
      imageData.push(img);
    }

    const newProd = {
      categoryId: this.props.category.cur_id,
      name: this.state.name,
      desc: this.state.desc,
      price: this.state.price,
      rating: this.state.rating,
      enabled: true,
      vendorId:
        this.props.user.role === 'admin'
          ? this.props.vendor.cur_id
          : this.props.user.user.userId,
      imageDTO: imageData
    };

    // Validate new product
    let validationErrors = this.validateProduct(newProd);
    if (validationErrors.length > 0) {
      //add any errors to the state
      this.setState({ errors: validationErrors });
    }
    // No validation errors found!
    else {
      this.props.addProduct(newProd);
      //add product, set should cancel to true, this will trigger the closure of the window If no error is thrown.
      this.setState({
        shouldCancel: true,
        showDBErrors: true
      });
    }
  }

  /**
   * Validates fields of a newly created product (where appropriate)
   * @param prod, object representing a Product to be sent to back-end
   * @returns array of validation issues (empty if no issues)
   */
  validateProduct(prod) {
    let errors = [];

    // category ID is populated from typeahead
    if (!this.props.category.valid_cat) {
      errors.push({
        msg:
          "Invalid category. Please select one from the category field's search results.",
        debug: 'Invalid catId: ' + this.props.category.cur_id
      });
    }

    // vendor ID is populated from typeahead
    if (!this.props.vendor.valid_vendor) {
      if (this.props.user.role === 'admin') {
        errors.push({
          msg:
            "Invalid vendor. Please select one from the vendor field's search results.",
          debug: 'Invalid vendorId: ' + this.props.vendor.cur_id
        });
      }
    }

    // empty field validation
    if (
      validator.isEmpty(this.state.name) ||
      validator.isEmpty(this.state.desc) ||
      validator.isEmpty(this.state.price)
    ) {
      _([
        { key: 'name', value: this.state.name },
        { key: 'description', value: this.state.desc },
        { key: 'price', value: this.state.price }
      ]).forEach(function(field) {
        if (validator.isEmpty(field.value)) {
          errors.push({
            msg:
              'Invalid ' + field.key + '. ' + field.key + ' cannot be empty.',
            debug: 'Invalid ' + field.key + ': ' + field.value
          });
        }
      });
    }

    // price is a number - there is also a validator for currency which we may want to use
    if (!validator.isFloat(this.state.price)) {
      errors.push({
        msg: 'Invalid price. Price must be a number.',
        debug: 'Invalid price: ' + this.state.price
      });
    }

    // image data is not empty
    if (this.files.length === 0) {
      errors.push({
        msg: 'Invalid images. At least one image must be uploaded.',
        debug: 'Invalid images: ' + this.files
      });
    }

    return errors;
  }

  showErrors() {
    if (this.state.errors.length !== 0) {
      return <ErrorComponent errormsg={this.state.errors[0].msg} />;
    }
  }

  onChange(e, persist) {
    this.setState({ [e.target.name]: e.target.value });
    if (persist) e.persist();
  }

  render() {
    //DO NOT DELETE THE COMMENT BELOW
    // eslint-disable-next-line
    const catSearch = _.debounce(e => {
      this.searchCat(e);
    }, 200);
    return (
      <div className="row">
        <div className="col-5">
          <ImageUploader
            withIcon={true}
            withPreview={true}
            buttonText="Choose images"
            onChange={this.onDrop}
            imgExtension={['.jpg', '.jpeg', '.png']}
            maxFileSize={262144}
          />
        </div>
        <div className="col-5">
          <form onSubmit={this.onSubmit}>
            <CategoryTypeAhead
              placeholder="Category"
              onClickHandler={this.props.Update_TypeAhead}
            />
            <TextFieldGroup
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            <TextFieldGroup
              placeholder="Description"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
            />
            <TextFieldGroup
              placeholder="Price"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
            />
            {this.props.user.role === 'admin' && (
              <VendorTypeAhead
                placeholder="Vendor"
                isExact="true"
                onClickHandler={this.props.Vendor_Update_TypeAhead}
              />
            )}
          </form>
        </div>
        <div className="col-2">
          <button
            className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
            onClick={this.onSubmit}
          >
            Add
          </button>
          <button
            className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
            onClick={() => this.cancel()}
          >
            Cancel
          </button>
          {this.showErrors()}
        </div>
      </div>
    );
  }
}

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  searchCategories: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  category: state.category,
  vendor: state.vendor,
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    addProduct,
    searchCategories,
    Update_TypeAhead,
    Vendor_Update_TypeAhead,
    clearErrors,
    WaitForError
  }
)(withRouter(ProductForm));
