import React, { Component } from "react";
import Button from "react-ions/lib/components/Button";
import InlineEdit from "react-ions/lib/components/InlineEdit";
import isEmpty from "../../../validation/is-empty";
import {
  editProduct,
  reloadProducts,
  WaitForError,
  getProduct
} from "../../../actions/productsActions";
import { connect } from "react-redux";
import ImageUploader from "../products/ImageUploader";
import ErrorComponent from "../../common/ErrorComponent";
import validator from 'validator';
import ProductCarousel from '../common/ProductCarousel';
import { PRODUCT_IMAGE } from "../../../actions/microservices";

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
      showDBError: false
    };

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
  }

  // Fixes no-op error.
  componentWillUnmount() {
    this.props.product.single = null;
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
      />
    );
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.validateProduct()){
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

      if (this.state.changed) {
        this.props.editProduct(newProd);
        this.setState({shouldCancel: true,
        showDBError: true})
      }
  }
  }

  validateProduct(){
    var error;
    var valid = true;
    if(this.state.name.length > 70){
        valid = false;
        error = {errmsg: "product name cannot be longer than 70 characters"};
      }
    else if(validator.isEmpty(this.state.name)){
      error = {errmsg: "name field cannot be empty"};
      valid = false;
    }
    else if(validator.isEmpty(this.state.desc)){
      error = {errmsg: "description cannot be empty"};
      valid=false;
    }
    else if(isNaN(parseFloat(this.state.price))){
      error = {errmsg: "price must be an number"};
      valid=false;
    }
    this.setState({error: error});
    return valid;
  }

  showErrors(){
    //shows an error if a DB action has been sent
    if(this.state.error !== undefined)
      return(<ErrorComponent errormsg={this.state.error.errmsg}/>);
    if(this.state.showDBError){
      return(<ErrorComponent errormsg={this.props.errors.errorMessage}/>)
    }
  }

  componentDidUpdate(){
    if(!this.props.errors.waitForError && this.state.shouldCancel){
      this.props.reloadProducts();
      this.onCancel();
    }
  }

  onCancel() {
    this.setState({shouldCancel: false,
      showDBError: false,
      changed: false});
    this.props.WaitForError();
    this.props.history.goBack();
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
                  {this.props.user.userType === 'admin' ? (
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
                  <p className="d-inline dscrptnSize-9">
                    {!isEmpty(this.props.vendor) &&
                      ' by ' + this.props.vendor.name}
                  </p>

                  {this.props.user.userType === 'admin' && (
                    <Button
                      className="d-inline btn far fa-edit d-inline"
                      onClick={this.buttonCallback}
                    />
                  )}
                </div>
                <div className="productRating ">
                  <i className="d-inline fas fa-star fa-xs mr-1" />
                  <p className="d-inline dscrptnSize-8">4.7</p>
                </div>
              </div>
            </div>
            {!this.state.isEditingImg ? <ProductCarousel prod={this.props.product.single} /> : this.showImgEditor()}
            {this.props.user.userType === 'admin' &&
              !this.state.isEditingImg && (
                <Button
                  className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                  onClick={this.buttonCallbackImg}
                >
                  Add or remove images
                </Button>
              )}
            {this.props.user.userType === 'admin' &&
              this.state.isEditingImg && (
                <Button
                  className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                  onClick={this.handleCallbackImg}
                >
                  Save changes
                </Button>
              )}
          </div>
        </div>

        <div className="col-6">
          <div className="container surround-parent parent-high">
            <div className="row align-items-start">
              <div className="col">
                Product Description
                {this.props.user.userType === 'admin' && (
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
                  {this.props.user.userType === 'admin' ? (
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
                  {this.props.user.userType === 'admin' ? (
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
                  {this.props.user.userType === 'admin' ? (
                    <Button
                      className="d-inline btn far fa-edit d-inline"
                      onClick={this.buttonCallbackPrice}
                    />
                  ) : (
                    <span className=" vendor-Price-Offer"> 15% off </span>
                  )}
                  {/* if statement to display Edit offers button in vendor only */}
                  {this.props.user.userType === 'vendor' && (
                    <button
                      className="btn-sm more-rounded btn-light m-0"
                      disabled
                    >
                      {' '}
                      Edit Offers
                    </button>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="col surround-parent parent-wide">
                  <div className="row surround-parent parent-wide">
                    <div className="col align-self-end surround-parent parent-wide">
                      {this.props.user.userType === 'admin' && (
                        <Button
                          className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                          onClick={this.onSubmit}
                          disabled={!this.state.changed}
                        >
                          Finish
                        </Button>
                      )}
                      {this.props.user.userType === 'admin' ? (
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
  product: state.product
});

export default connect(
  mapStateToProps,
  { editProduct, reloadProducts, WaitForError, getProduct }
)(ProductDescription);
