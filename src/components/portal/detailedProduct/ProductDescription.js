import React, { Component } from 'react';
import Button from 'react-ions/lib/components/Button';
import InlineEdit from 'react-ions/lib/components/InlineEdit';
import StarRatings from 'react-star-ratings';
import isEmpty from '../../../validation/is-empty';
import {
  editProduct,
  reloadProducts,
  WaitForError,
  getProduct
} from '../../../actions/productsActions';
import { Vendor_Update_TypeAhead } from '../../../actions/vendorActions';
import { connect } from 'react-redux';
import ImageUploader from '../products/ImageUploader';
import ErrorComponent from '../../common/ErrorComponent';
import validator from 'validator';
import ProductCarousel from '../common/ProductCarousel';
import { PRODUCT_IMAGE } from "../../../actions/microservices";
import VendorTypeAhead from "../vendor/VendorTypeAhead";
import {toast} from "react-toastify";
import CategoryTypeAhead from "../categories/CategoryTypeAhead";
import {Update_TypeAhead} from "../../../actions/categoryActions";
//Icons for accept change to category/vendor don't work without it
import 'font-awesome/css/font-awesome.min.css';

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isEditingPrice: false,
      isEditingDesc: false,
      isEditingImg: false,
      name: this.props.product.single.name,
      desc: this.props.product.single.desc,
      price: this.props.product.single.price,
      changed: false,
      shouldCancel: false,
      showDBError: false,
      editVendor: false,
      editedVendor: false,
      editCat: false,
      editedCat: false,
      vendorName: !isEmpty(this.props.vendor) ? this.props.vendor.name : '0',
      categoryName: !isEmpty(this.props.category)
        ? this.props.category.name
        : '0'
    };
    //populateNames();
    this.pictures = [];
    this.files = [];
    this.handleCallbackDesc = this.handleCallbackDesc.bind(this);
    this.buttonCallbackDesc = this.buttonCallbackDesc.bind(this);
    this.handleCallbackPrice = this.handleCallbackPrice.bind(this);
    this.buttonCallbackPrice = this.buttonCallbackPrice.bind(this);
    this.buttonCallbackImg = this.buttonCallbackImg.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.showVendor = this.showVendor.bind(this);
    this.resetImgEditor = this.resetImgEditor.bind(this);
  }

  // Fixes no-op error.
  componentWillUnmount() {
    this.props.product.single = null;
  }

  resetImgEditor() {
    this.setState({ changed: false, isEditingImg: true });
  }

  onDrop(pictureDataURLs, pictureFiles) {
    this.pictures = pictureDataURLs;
    this.files = pictureFiles;
  }

  handleCallbackDesc = event => {
    this.setState({
      isEditingDesc: false,
      [event.target.name]: event.target.value,
      changed: true
    });
  };

  buttonCallbackDesc = event => {
    this.setState({
      isEditingDesc: true,
      isEditingPrice: false,
      isEditing: false,
      isEditingImg: false
    });
  };

  buttonCallbackImg() {
    this.setState({
      isEditingDesc: false,
      isEditingPrice: false,
      isEditing: false,
      isEditingImg: true
    });
  }

  handleCallbackImg = event => {
    this.setState({
      isEditingImg: false,
      [event.target.name]: event.target.value,
      changed: true
    });
  };

  handleCallback = event => {
    this.setState({
      isEditing: false,
      [event.target.name]: event.target.value,
      changed: true
    });
  };

  buttonCallback = () => {
    this.setState({
      isEditing: true,
      isEditingDesc: false,
      isEditingPrice: false,
      isEditingImg: false
    });
  };

  buttonCallBackVendor = () => {
    this.setState({
      editVendor: !this.state.editVendor,
      isEditing: false,
      isEditingDesc: false,
      isEditingPrice: false,
      isEditingImg: false
    });
  };

  buttonCallBackCat = () => {
    this.setState({
      editCat: !this.state.editCat,
      isEditing: false,
      isEditingDesc: false,
      isEditingPrice: false,
      isEditingImg: false
    });
  };

  buttonCallBackSaveCat = () => {
    if (this.props.categoryProp.valid_cat) {
      this.setState({
        editedCat: true,
        categoryName: this.props.categoryProp.cur_name,
        editCat: false,
        editVendor: false,
        isEditing: false,
        isEditingDesc: false,
        isEditingPrice: false,
        isEditingImg: false,
        changed: true
      });
    } else {
      this.setState({
        editCat: false,
        isEditing: false,
        isEditingDesc: false,
        isEditingPrice: false,
        isEditingImg: false
      });
      toast.warn(
        'category not valid, please choose one from the list. reverting vendor'
      );
    }
  };

  buttonCallBackCancelCat = () => {
    this.setState({
      editCat: false,
      isEditing: false,
      isEditingDesc: false,
      isEditingPrice: false,
      isEditingImg: false
    });
  }

  buttonCallBackCancelVendor = () => {
    this.setState({
      editVendor: false,
      isEditing: false,
      isEditingDesc: false,
      isEditingPrice: false,
      isEditingImg: false
    });
  }

  buttonCallBackSaveVendor = () => {
    if (this.props.vendorProp.valid_vendor) {
      this.setState({
        editedVendor: true,
        vendorName: this.props.vendorProp.cur_name,
        editVendor: false,
        isEditing: false,
        isEditingDesc: false,
        isEditingPrice: false,
        isEditingImg: false,
        changed: true
      });
    } else {
      this.setState({
        editVendor: false,
        isEditing: false,
        isEditingDesc: false,
        isEditingPrice: false,
        isEditingImg: false
      });
      toast.warn(
        'vendor not valid, please choose one from the list. reverting vendor'
      );
    }
  };

  handleCallbackPrice = event => {
    //DO NOT DELETE THE COMMENT BELOW
    // eslint-disable-next-line
    this.setState({
      isEditingPrice: !this.state.isEditingPrice,
      [event.target.name]: event.target.value,
      changed: true
    });
  };

  buttonCallbackPrice = event => {
    this.setState({
      isEditingPrice: true,
      isEditing: false,
      isEditingDesc: false,
      isEditingImg: false
    });
  };

  showImgEditor() {
    // if we haven't edited the images, just use the product's originals
    let imageData;
    let imageNames;
    if (isEmpty(this.files)) {
      const product = this.props.product.single;
      if (!isEmpty(product.imageDTO)) {
        imageData = product.imageDTO.map(img => {
          return PRODUCT_IMAGE + img.imgName;
        });
        imageNames = product.imageDTO.map(img => {
          return { name: img.imgName };
        });
      }
    } else {
      imageData = this.pictures;
      imageNames = this.files.map(img => {
        return { name: img.name };
      });
    }

    return (
      <ImageUploader
        withIcon={true}
        withPreview={true}
        buttonText="Upload new image"
        onChange={this.onDrop}
        imgExtension={['.jpg', '.jpeg', '.png']}
        maxFileSize={262144}
        startingImages={imageData}
        startingFiles={imageNames}
        disabled={this.state.changed}
        resetCallback={this.resetImgEditor}
      />
    );
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.validateProduct()) {
      let imageData = [];
      let i;
      // if we haven't edited any images
      if (isEmpty(this.files)) {
        imageData = this.props.product.single.imageDTO;
      } else {
        // we have edited images
        for (i = 0; i < this.files.length; i++) {
          let img = {
            imgName: this.files[i].name,
            base64Image: this.pictures[i].split(',')[1]
          };
          imageData.push(img);
        }
      }

      var newProd = {
        productId: this.props.product.single.productId,
        categoryId: this.props.product.single.categoryId,
        name: this.state.name,
        desc: this.state.desc,
        price: this.state.price,
        rating: this.props.product.single.rating,
        enabled: this.props.product.single.enabled,
        vendorId: this.props.product.single.vendorId,
        imageDTO: imageData
      };

      if (this.state.editedVendor) {
        newProd.vendorId = this.props.vendorProp.cur_id;
      }
      if (this.state.editedCat) {
        newProd.categoryId = this.props.categoryProp.cur_id;
      }
      if (this.state.changed) {
        this.props.editProduct(newProd);
        this.setState({
          shouldCancel: true,
          showDBError: true
        });
      }
    }
  }

  validateProduct() {
    var error;
    var valid = true;
    if (this.state.name.length > 70) {
      valid = false;
      error = { errmsg: 'product name cannot be longer than 70 characters' };
    } else if (validator.isEmpty(this.state.name)) {
      error = { errmsg: 'name field cannot be empty' };
      valid = false;
    } else if (validator.isEmpty(this.state.desc)) {
      error = { errmsg: 'description cannot be empty' };
      valid = false;
    }
    //Parse float beahaves wierd, 123av-4 would return 123, hence the second check
    else if (
      isNaN(parseFloat(this.state.price)) ||
      parseFloat(this.state.price) + '' !== this.state.price + ''
    ) {
      valid = false;
      error = { errmsg: 'price must be numeric' };
    }
    this.setState({ error: error });
    return valid;
  }

  showErrors() {
    //shows an error if a DB action has been sent
    if (!isEmpty(this.state.error))
      return <ErrorComponent errormsg={this.state.error.errmsg} />;
    if (this.state.showDBError) {
      return <ErrorComponent errormsg={this.props.errors.errorMessage} />;
    }
  }

  componentDidUpdate() {
    if (!this.props.errors.waitForError && this.state.shouldCancel) {
      this.props.reloadProducts();
      this.onCancel();
    }
  }

  onCancel() {
    this.setState({
      shouldCancel: false,
      showDBError: false,
      changed: false
    });
    this.props.WaitForError();
    this.props.history.goBack();
  }

  showVendor(vendor) {
    if (this.state.editVendor) {
      //editing value, return vendor typeahead and finish button
      return (
        <div className="d-inline">
          <p className="d-inline dscrptnSize-9">' by '</p>
          <Button
            className="d-inline btn fa fa-check d-inline"
            onClick={this.buttonCallBackSaveVendor}
          />
          <Button
            className="d-inline btn fa fa-times d-inline"
            onClick={this.buttonCallBackCancelVendor}
          />
          <VendorTypeAhead
            placeholder="Vendor"
            isExact="false"
            onClickHandler={this.props.Vendor_Update_TypeAhead}
          />
        </div>
      );
    } else {
      //not editing, show vendor or statement to show there is no vendor, plus edit button.
      var returnVal;
      if (isEmpty(vendor)) {
        returnVal = (
          <p className="d-inline dscrptnSize-9" key="1">
            ' by No Vendor Found'
          </p>
        );
      } else {
        returnVal = (
          <p className="d-inline dscrptnSize-9" key="1">
            {' by ' + vendor}
          </p>
        );
      }
      return [
        returnVal,
        this.props.user.role === 'admin' && (
          <Button
            className="d-inline btn far fa-edit d-inline"
            onClick={this.buttonCallBackVendor}
            key="2"
          />
        )
      ];
    }
  }

  

  showCat(category) {
    if (this.state.editCat) {
      //editing value, return vendor typeahead and finish button
      return (
        <div className="d-inline">
                    <Button
            className="d-inline btn fa fa-check d-inline"
            onClick={this.buttonCallBackSaveCat}
          />
          <Button
            className="d-inline btn fa fa-times d-inline"
            onClick={this.buttonCallBackCancelCat}
          />
          <CategoryTypeAhead
            placeholder="Category"
            onClickHandler={this.props.Update_TypeAhead}
          />
        </div>
      );
    } else {
      //not editing, show vendor or statement to show there is no vendor, plus edit button.
      var returnVal;
      if (isEmpty(category)) {
        returnVal = (
          <p className="d-inline mb-0 mt-2" key="1">
            No category Found
          </p>
        );
      } else {
        returnVal = (
          <p className="d-inline mb-0 mt-2" key="1">
            {category}
          </p>
        );
      }
      return [
        returnVal,
        this.props.user.role === 'admin' && (
          <Button
            className="d-inline btn far fa-edit d-inline"
            onClick={this.buttonCallBackCat}
            key="2"
          />
        )
      ];
    }
  }

  render() {
    return (
      <div className="row mt-4 parent-min-half-high">
        <div className="col-6">
          <div className="container">
            <div className="row align-items-start">
              <div className="col pl-0">
                <div className="productTitle d-inline d-inner-inline">
                  {/* if statement for admin */}
                  {this.props.user.role === 'admin' ? (
                    <InlineEdit
                      className="d-inline"
                      name="name"
                      value={this.state.name}
                      isEditing={this.state.isEditing}
                      changeCallback={this.handleCallback}
                    />
                  ) : (
                    <span>{this.state.name}</span>
                  )}
                  {this.props.user.role === 'admin' && (
                    <Button
                      className="d-inline btn far fa-edit d-inline"
                      onClick={this.buttonCallback}
                    />
                  )}
                  {this.showVendor(this.state.vendorName)}
                </div>
                <div className="productRating ">
                  <StarRatings
                    rating={this.props.product.single.rating}
                    starRatedColor="#f0ca4d"
                    numberOfStars={5}
                    name="rating"
                    starDimension="15px"
                    starSpacing="1px"
                  />
                </div>
              </div>
            </div>
            {!this.state.isEditingImg && !this.state.changed ? (
              <ProductCarousel prod={this.props.product.single} />
            ) : (
              this.showImgEditor()
            )}
            {this.props.user.role === 'admin' &&
              !this.state.isEditingImg && !this.state.changed && (
                <Button
                  className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                  onClick={this.buttonCallbackImg}
                >
                  Add or remove images
                </Button>
              )}
            {this.props.user.role === 'admin' &&
              (this.state.isEditingImg || this.state.changed) && (
                <Button
                  disabled={this.state.changed}
                  className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                  onClick={this.handleCallbackImg}
                >
                  {!this.state.changed ? 'Save changes' : 'Saved changes'}
                </Button>
              )}
          </div>
        </div>

        <div className="col-6">
          <div className="container surround-parent parent-high">
            <div className="row align-items-start align-center">
              <div className="col">{this.showCat(this.state.categoryName)}</div>
            </div>
            <div className="row align-items-start">
              <div className="col">
                Product Description
                {this.props.user.role === 'admin' && (
                  <Button
                    className="d-inline btn far fa-edit d-inline"
                    onClick={this.buttonCallbackDesc}
                  />
                )}
              </div>
            </div>
            <div className="row align-items-start parent-min-high">
              <div className="col-8">
                <div className="dscrptnSize-7">
                  {this.props.user.role === 'admin' ? (
                    <InlineEdit
                      name="desc"
                      className="d-inline"
                      value={this.state.desc}
                      isEditing={this.state.isEditingDesc}
                      changeCallback={this.handleCallbackDesc}
                    />
                  ) : (
                    <span>{this.state.desc}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row align-items-end">
              <div className="col d-inline">
                <div className="d-inline d-inner-inline">
                  {this.props.user.role === 'admin' ? (
                    <InlineEdit
                      className="d-inline ml-0 mr-0"
                      name="price"
                      placeholder={'' + this.state.price}
                      isEditing={this.state.isEditingPrice}
                      changeCallback={this.handleCallbackPrice}
                    />
                  ) : (
                    <span>${'' + this.state.price}</span>
                  )}
                  {this.props.user.role === 'admin' ? (
                    <Button
                      className="d-inline btn far fa-edit d-inline"
                      onClick={this.buttonCallbackPrice}
                    />
                  ) : (
                    <span className=" vendor-Price-Offer"> 15% off </span>
                  )}
                  {/* if statement to display Edit offers button in vendor only */}
                  {this.props.user.role === 'vendor' && (
                    <button
                      className="btn-sm more-rounded btn-light m-0"
                      disabled
                    >
                      Edit Offers
                    </button>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="col surround-parent parent-wide">
                  <div className="row surround-parent parent-wide">
                    <div className="col align-self-end surround-parent parent-wide">
                      {this.props.user.role === 'admin' && (
                        <Button
                          className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                          onClick={this.onSubmit}
                          disabled={!this.state.changed}
                        >
                          Finish
                        </Button>
                      )}
                      {this.props.user.role === 'admin' ? (
                        <Button
                          className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"
                          onClick={this.onCancel}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"
                          onClick={this.onCancel}
                        >
                          Done
                        </Button>
                      )}
                    </div>
                    {this.showErrors()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user,
  product: state.product,
  vendorProp: state.vendor,
  categoryProp: state.category
});

export default connect(
  mapStateToProps,
  {
    editProduct,
    reloadProducts,
    WaitForError,
    getProduct,
    Vendor_Update_TypeAhead,
    Update_TypeAhead
  }
)(ProductDescription);
