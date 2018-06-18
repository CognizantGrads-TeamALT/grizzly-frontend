import React, { Component } from 'react';
import Button from 'react-ions/lib/components/Button';
import InlineEdit from 'react-ions/lib/components/InlineEdit';
import isEmpty from '../../../validation/is-empty';
import unavailable from '../../../img/unavailable.png';
import { Carousel } from 'react-responsive-carousel';
import { editProduct, reloadProducts } from '../../../actions/productsActions';
import { connect } from 'react-redux';

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isEditingPrice: false,
      isEditingDesc: false,
      name: this.props.product.single.name,
      desc: this.props.product.single.desc,
      price: this.props.product.single.price,
      changed: false
    };

    this.pictures = [];
    this.handleCallbackDesc = this.handleCallbackDesc.bind(this);
    this.buttonCallbackDesc = this.buttonCallbackDesc.bind(this);
    this.handleCallbackPrice = this.handleCallbackPrice.bind(this);
    this.buttonCallbackPrice = this.buttonCallbackPrice.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
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
      isEditing: false
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
      isEditingPrice: false
    });
  };

  handleCallbackPrice = event => {
    //DO NOT DELETE THE COMMENT BELOW
    // eslint-disable-next-line
    // this is un-successful at reverting the state value for the inline-edit - dan
    let value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      this.setState({
        isEditingPrice: !this.state.isEditingPrice,
        [event.target.name]: value,
        changed: true
      });
    }
  };

  buttonCallbackPrice = event => {
    this.setState({
      isEditingPrice: true,
      isEditing: false,
      isEditingDesc: false
    });
  };

  // showCarousel() {
  //   const product = this.props.product.single;
  //   if (!isEmpty(product.images)) {
  //     return product.images.map((img, index) => (
  //         // key={index}: stops complaining about "UNIQUE KEYS" THANKS REACT.
  //         <img key={index} src={img.base64Image} className="img-responsive" alt="" />
  //     ));
  //   }
  // }

  showImg() {
    const product = this.props.product.single;
    if (isEmpty(product.images)) {
      return (
        <img src={unavailable} className="img-responsive" alt="Unavailable" />
      );
    } else {
      return product.images.map((img, index) => (
        // key={index}: stops complaining about "UNIQUE KEYS" THANKS REACT.
        <img
          key={index}
          src={img.base64Image}
          className="img-responsive"
          alt=""
        />
      ));
    }
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
    var newProd = {
      productId: this.props.product.single.productId,
      categoryId: this.props.product.single.categoryId,
      name: this.state.name,
      desc: this.state.desc,
      price: this.state.price,
      rating: this.props.product.single.rating,
      enabled: this.props.product.single.enabled,
      vendorId: this.props.product.single.vendorId,
      images: this.props.product.single.imageData
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
                  <InlineEdit
                    className="d-inline"
                    name="name"
                    value={this.state.name}
                    isEditing={this.state.isEditing}
                    changeCallback={this.handleCallback}
                  />
                  <p className="d-inline dscrptnSize-9">
                    {' by ' + this.props.vendor.name}
                  </p>
                  <Button
                    className="d-inline btn far fa-edit d-inline"
                    onClick={this.buttonCallback}
                  />
                </div>
                <div className="productRating ">
                  <i className="d-inline fas fa-star fa-xs mr-1" />
                  <p className="d-inline dscrptnSize-8">4.7</p>
                </div>
              </div>
            </div>
            <Carousel>{this.showImg()}</Carousel>
          </div>
        </div>

        <div className="col-6">
          <div className="container surround-parent parent-high">
            <div className="row align-items-start">
              <div className="col">
                Product Description
                <Button
                  className="d-inline btn far fa-edit d-inline"
                  onClick={this.buttonCallbackDesc}
                />
              </div>
            </div>
            <div className="row align-items-start parent-min-high">
              <div className="col-8">
                <div className="dscrptnSize-7">
                  <InlineEdit
                    name="desc"
                    className="d-inline"
                    value={this.state.desc}
                    isEditing={this.state.isEditingDesc}
                    changeCallback={this.handleCallbackDesc}
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-end">
              <div className="col d-inline">
                <div className="d-inline d-inner-inline">
                  <InlineEdit
                    className="d-inline ml-0 mr-0"
                    name="price"
                    placeholder={'' + this.state.price}
                    isEditing={this.state.isEditingPrice}
                    changeCallback={this.handleCallbackPrice}
                  />
                  <Button
                    className="d-inline btn far fa-edit d-inline"
                    onClick={this.buttonCallbackPrice}
                  />
                </div>
              </div>
              <div className="col">
                <div className="col surround-parent parent-wide">
                  <div className="row surround-parent parent-wide">
                    <div className="col align-self-end surround-parent parent-wide">
                      <Button
                        className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                        onClick={this.onSubmit}
                        disabled={!this.state.changed}
                      >
                        Finish
                      </Button>
                      <Button
                        className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"
                        onClick={this.onCancel}
                      >
                        Cancel
                      </Button>
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

export default connect(
  null,
  { editProduct, reloadProducts }
)(ProductDescription);
