import React, { Component } from "react";
import Button from "react-ions/lib/components/Button";
import InlineEdit from "react-ions/lib/components/InlineEdit";
import isEmpty from "../../../validation/is-empty";
import unavailable from "../../../img/unavailable.png";
import { Carousel } from "react-responsive-carousel";
import {
  editProduct,
  reloadProducts,
  getProducts,
  setProductUpdated
} from "../../../actions/productsActions";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
<<<<<<< HEAD
import ImageUploader from "../products/ImageUploader";
=======
import { clearCurrentUser } from '../../../actions/userActions';
>>>>>>> development

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

  onDrop(pictureFiles, pictureDataURLs) {
    this.pictures = pictureFiles;
    this.files = pictureDataURLs;
    // console.log(this.pictures);
    // console.log(this.files);
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

  buttonCallbackImg = event => {
    this.setState({
      isEditingDesc: false,
      isEditingPrice: false,
      isEditing: false,
      isEditingImg: true
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

  showCarousel() {
    // if we don't have any images yet, use the incoming product's
    let images;
    console.log(this.props.product.single.images);
    console.log(this.pictures);
    if (this.pictures.length === 0) {
      images = this.props.product.single.images;
    } else {
      // otherwise just use our local pictures in the redux format
      // (this means the images have been edited)
      images = this.pictures.map((pic, index) => {
        return {"imgName": pic.name,
                "base64Image": this.files[index]
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
    if (isEmpty(product.images)) {
      // If the product details literally has no images.
      if (isEmpty(product.imageDTO)) {
        return (
          <img src={unavailable} className="img-responsive" style={{ "width": "150px", "height": "150px" }} alt="Unavailable" />
        );
        // We have image but its loading, so wait.
      } else {
        return (<Spinner size={'150px'} />);
      }
      // Return the loaded images.
    } else {
      return <Carousel>{this.showCarousel()}</Carousel>;
    }
  }

  showImgEditor() {
    const product = this.props.product.single;
    const imageData = product.images.map((img) => {
      return img.base64Image;
    });
    const imageNames = product.images.map((img) => {
      return {"name": img.imgName};
    });
    return (<ImageUploader
              withIcon={true}
              withPreview={true}
              buttonText="Upload new image"
              onChange={this.onDrop}
              imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
              maxFileSize={262144}
              startingImages={imageData}
              startingFiles={imageNames}
            />);
  }

  onSubmit(e) {
    e.preventDefault();
    let imageData = [];
    let i;
    for (i = 0; i < this.pictures.length; i++) {
      let img = {
        imgName: this.pictures[i].name,
        base64Image: this.files[i].split(",")[1]
      };
      imageData.push(img);
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
      imageDTO: this.props.product.single.imageData
    };

    if (this.state.changed) {
      this.props.editProduct(newProd);
      this.props.reloadProducts();
      this.onCancel();
    }
  }

  onCancel = event => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="row mt-4 parent-min-half-high">
        <div className="col-6">
          <div className="container parent-high">
            <div className="row align-items-start">
              <div className="col pl-0">
                <div className="productTitle d-inline d-inner-inline">
                  {/* if statement for admin */}
                  {this.props.user.userType === 'admin' ? (<InlineEdit
                    className="d-inline"
                    name="name"
                    value={this.state.name}
                    isEditing={this.state.isEditing}
                    changeCallback={this.handleCallback}
                  />) : (<span>{this.state.name}</span>)}
                  <p className="d-inline dscrptnSize-9">
                    {" by " + this.props.vendor.name}
                  </p>

                  {this.props.user.userType === 'admin' && (<Button
                    className="d-inline btn far fa-edit d-inline"
                    onClick={this.buttonCallback}
                  />) }
                </div>
                <div className="productRating ">
                  <i className="d-inline fas fa-star fa-xs mr-1" />
                  <p className="d-inline dscrptnSize-8">4.7</p>
                </div>
              </div>
            </div>
            {!this.state.isEditingImg && this.showImg()}
            {this.state.isEditingImg && this.showImgEditor()}
            <Button
              className="d-inline btn far fa-edit d-inline"
              onClick={this.buttonCallbackImg}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="container surround-parent parent-high">
            <div className="row align-items-start">
              <div className="col">
                Product Description
                {this.props.user.userType === 'admin' && (<Button
                  className="d-inline btn far fa-edit d-inline"
                  onClick={this.buttonCallbackDesc}
                />) }
              </div>
            </div>
            <div className="row align-items-start parent-min-high">
              <div className="col-8">
                <div className="dscrptnSize-7">
                  {this.props.user.userType === 'admin' ? (<InlineEdit
                    name="desc"
                    className="d-inline"
                    value={this.state.desc}
                    isEditing={this.state.isEditingDesc}
                    changeCallback={this.handleCallbackDesc}
                  />) : (<span>{this.state.desc}</span>)}
                </div>
              </div>
            </div>
            <div className="row align-items-end">
              <div className="col d-inline">
                <div className="d-inline d-inner-inline">
                  {this.props.user.userType === 'admin' ? (<InlineEdit
                    className="d-inline ml-0 mr-0"
                    name="price"
                    placeholder={"" + this.state.price}
                    isEditing={this.state.isEditingPrice}
                    changeCallback={this.handleCallbackPrice}
                  />) : (<span>${"" + this.state.price}</span>)}
                  {this.props.user.userType === 'admin' ? (<Button
                    className="d-inline btn far fa-edit d-inline"
                    onClick={this.buttonCallbackPrice}
                  />) : (<span className=" vendor-Price-Offer"> 15% off </span>)}
                    {/* if statement to display Edit offers button in vendor only */}
                  {this.props.user.userType === 'vendor' &&
                    (<button className="btn-sm more-rounded btn-light m-0" disabled> Edit Offers</button>)
                    }
                </div>
              </div>
              <div className="col">
                <div className="col surround-parent parent-wide">
                  <div className="row surround-parent parent-wide">
                    <div className="col align-self-end surround-parent parent-wide">
                      {this.props.user.userType === 'admin'&& (<Button
                        className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                        onClick={this.onSubmit}
                        disabled={!this.state.changed}>
                        Finish
                      </Button>) }
                      {this.props.user.userType === 'admin' ? (<Button
                        className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"
                        onClick={this.onCancel}
                      >
                        Cancel
                      </Button>) : (<Button
                          className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"
                          onClick={this.onCancel}
                        >
                          Done
                      </Button>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { editProduct, reloadProducts }
)(ProductDescription);
