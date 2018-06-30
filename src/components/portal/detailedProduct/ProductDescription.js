import React, { Component } from "react";
import Button from "react-ions/lib/components/Button";
import InlineEdit from "react-ions/lib/components/InlineEdit";
import isEmpty from "../../../validation/is-empty";
import unavailable from "../../../img/unavailable.png";
import { Carousel } from "react-responsive-carousel";
import {
  editProduct,
  reloadProducts
} from "../../../actions/productsActions";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import ImageUploader from "../products/ImageUploader";

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
      changed: false
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
  };

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
    if (isNaN(parseInt(event.target.value, 10))) {
      event.target.value = this.state.price;
    } else {
      this.setState({
        isEditingPrice: !this.state.isEditingPrice,
        [event.target.name]: event.target.value,
        changed: true
      });
    }
  };

  buttonCallbackPrice = event => {
    this.setState({
      isEditingPrice: true,
      isEditing: false,
      isEditingDesc: false,
      isEditingImg: false
    });
  };

  showCarousel(product) {
    // if we don't have any images yet, use the incoming product's
    let images;
    if (isEmpty(this.files)) {
      images = this.props.product.images[product.productId]
    } else {
      // otherwise just use our local pictures in the redux format
      // (this means the images have been edited)
      images = this.files.map((pic, index) => {
        return {"imgName": pic.name,
                "base64Image": this.pictures[index]
        };
      });
    }
    
    if (!isEmpty(images)) {
      return images.map((img, index) => (
        // stops complaining about "UNIQUE KEYS" THANKS REACT.
        <img
          key={index}
          src={img.base64Image}
          className="img-responsive"
          alt=""
        />
      ));
    }
  }

  showImg() {
    const product = this.props.product.single;
    // If we don't have any images.
    if (isEmpty(this.props.product.images[product.productId])) {
      // If the product details literally has no images.
      if (isEmpty(product.imageDTO)) {
        return (
          <img
            src={unavailable}
            className="img-responsive"
            style={{ width: '150px', height: '150px' }}
            alt="Unavailable"
          />
        );
        // We have image but its loading, so wait.
      } else {
        return (
          <div className="text-center">
            <Spinner size={'150px'} />
          </div>
        );
      }
      // Return the loaded images.
    } else {
      return <Carousel>{this.showCarousel(product)}</Carousel>;
    }
  }

  showImgEditor() {
    // if we haven't edited the images, just use the product's originals
    let imageData;
    let imageNames;
    if (isEmpty(this.files)) {
      const product = this.props.product.single;
      if (!isEmpty(this.props.product.images[product.productId])) {
        imageData = this.props.product.images[product.productId].map((img) => {
          return img.base64Image;
        });
        imageNames = this.props.product.images[product.productId].map((img) => {
          return {"name": img.imgName};
        });
      }
    } else {
      imageData = this.pictures;
      imageNames = this.files.map((img) => {
        return {"name": img.name};
      });
    }
    
    return (<ImageUploader
              withIcon={true}
              withPreview={true}
              buttonText="Upload new image"
              onChange={this.onDrop}
              imgExtension={['.jpg', '.jpeg', '.png']}
              maxFileSize={262144}
              startingImages={imageData}
              startingFiles={imageNames}
            />);
  }

  onSubmit(e) {
    e.preventDefault();
    let imageData = [];
    let i;
    // if we haven't edited any images
    if (isEmpty(this.files)) {
      imageData = this.props.product.single.imageData;
    } else { // we have edited images
      for (i = 0; i < this.files.length; i++) {
        let img = {
          imgName: this.files[i].name,
          base64Image: this.pictures[i].split(",")[1]
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
      this.props.reloadProducts();
      this.onCancel();
    }
  }

  onCancel() {
    this.props.history.goBack();
  };

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
                    {' by ' + this.props.vendor.name}
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
            {!this.state.isEditingImg ? this.showImg() : this.showImgEditor()}
            {this.props.user.userType === 'admin' && !this.state.isEditingImg && (<Button
              className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
              onClick={this.buttonCallbackImg}>
              Add or remove images
            </Button>) }
            {this.props.user.userType === 'admin' && this.state.isEditingImg && (<Button
              className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
              onClick={this.handleCallbackImg}>
              Save changes
            </Button>) }
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
  user: state.user,
  product: state.product
});

export default connect(
  mapStateToProps,
  { editProduct, reloadProducts }
)(ProductDescription);
