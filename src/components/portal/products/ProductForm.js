import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import PropTypes from 'prop-types';
import Profile from '../profile/Profile';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Row, Col, Nav, NavItem } from 'reactstrap';
import { addProduct } from '../../../actions/productsActions';
import {
  searchCategories,
  Update_TypeAhead
} from '../../../actions/categoryActions';
import _ from 'lodash';
import CategoryTypeAhead from '../categories/CategoryTypeAhead';
import ImageUploader from './ImageUploader';
import validator from 'validator';

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
      valid_cat: false
    };
    this.pictures = [];
    this.files = [];
    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateProduct = this.validateProduct.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.pictures = pictureFiles;
    this.files = pictureDataURLs;
  }

  onToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  cancel() {
    this.props.history.push('/adminportal');
  }

  onSubmit(e) {
    e.preventDefault();
    let imageData = [];
    let i;
    for (i = 0; i < this.pictures.length; i++) {
      let img = {
        imgName: this.pictures[i].name,
        base64Image: this.files[i].split(',')[1]
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
      vendorId: 1,
      imageDTO: imageData
    };

    // Validate new product
    let validationErrors = this.validateProduct(newProd);
    if (validationErrors.length > 0) {
      // TODO: show modal with error messages. For now just logging to console
      console.log("The product could not be created. Please amend the following issues:");
      _(validationErrors).forEach(function(error) {
        console.log(error.msg);
        console.log("DEBUG: " + error.debug);
      });
    } 
    // No validation errors found!
    else {
      this.props.addProduct(newProd);
      this.setState({
        category: '',
        name: '',
        price: '',
        rating: 0,
        desc: ''
      });
      this.cancel();
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
        msg: "Invalid category. Please select one from the category field's search results.",
        debug: "Invalid catId: " + this.props.category.cur_id
      });
    }

    // empty field validation
    if (validator.isEmpty(this.state.name) || 
        validator.isEmpty(this.state.desc) || 
        validator.isEmpty(this.state.price)) {
      _([{key: "name", value: this.state.name},
          {key: "description", value: this.state.desc},
          {key: "price", value: this.state.price}]).forEach(function(field) {
        if (validator.isEmpty(field.value)) {
          errors.push({
            msg: "Invalid " + field.key + ". " + field.key + " cannot be empty.",
            debug: "Invalid " + field.key + ": " + field.value
          });
        }
      })
    }

    // price is a number - there is also a validator for currency which we may want to use
    if (!validator.isFloat(this.state.price)) {
      errors.push({
        msg: "Invalid price. Price must be a number.",
        debug: "Invalid price: " + this.state.price
      });
    }

    // image data is not empty
    if (this.pictures.length === 0) {
      errors.push({
        msg: "Invalid images. At least one image must be uploaded.",
        debug: "Invalid images: " + this.pictures
      });
    }

    return errors;
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
        <div className="col-3">
          <Profile />
        </div>
        <div className="col-9">
          <Row>
            <Col>
              <Nav tabs>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      'nav-link btn-outline-success my-2 my-sm-0',
                      {
                        active: this.state.activeTab === '1'
                      }
                    )}
                  >
                    PRODUCTS
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      'nav-link btn-outline-success my-2 my-sm-0'
                    )}
                  >
                    VENDORS
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      'nav-link btn-outline-success my-2 my-sm-0'
                    )}
                  >
                    CATEGORIES
                  </Link>
                </NavItem>
              </Nav>
            </Col>
          </Row>
          <div className="row-9">
            <div className="row">
              <div className="col-5">
                <ImageUploader
                  withIcon={true}
                  withPreview={true}
                  buttonText="Choose images"
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
                  maxFileSize={262144}
                />
              </div>
              <div className="col-5">
                <form>
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
                </form>
              </div>
              <div className="col-2">
                {' '}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  searchCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  category: state.category
});

export default connect(
  mapStateToProps,
  { addProduct, searchCategories, Update_TypeAhead }
)(withRouter(ProductForm));
