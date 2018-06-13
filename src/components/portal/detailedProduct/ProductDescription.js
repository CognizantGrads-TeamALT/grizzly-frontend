import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditableLabel from "react-inline-editing";
import Button from "react-ions/lib/components/Button";
import InlineEdit from "react-ions/lib/components/InlineEdit";
import isEmpty from "../../../validation/is-empty";
import unavailable from "../../../img/unavailable.png";
import ImageUploader from "../products/ImageUploader";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.single[0],
      isEditing: false,
      isEditingPrice: false,
      isEditingDesc: false,
      desc: "",
      price: ""
    };
    this.handleCallbackDesc = this.handleCallbackDesc.bind(this);
    this.buttonCallbackDesc = this.buttonCallbackDesc.bind(this);
    this.handleCallbackPrice = this.handleCallbackPrice.bind(this);
    this.buttonCallbackPrice = this.buttonCallbackPrice.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /*  state = {
        isEditing: false,
        //value: 'this.state.price'
      } */

  handleCallbackDesc = event => {
    this.setState({
      isEditingDesc: false,
      [event.target.name]: event.target.value
    });
  };

  buttonCallbackDesc = event => {
    this.setState({ isEditingDesc: true, isEditingPrice: false, isEditing: false });
  };

  handleCallback = event => {
    this.setState({ isEditing: false, value: event.target.value })
    console.log("IN handle callback");
  }

  buttonCallback = () => {
    this.setState({ isEditing: true, isEditingDesc: false, isEditingPrice:false})
  }

  handleCallbackPrice = event => {
    this.setState({
      isEditingPrice: !this.state.isEditingPrice,
      [event.target.name]: event.target.value
    });
  };

  buttonCallbackPrice = event => {
    this.setState({ isEditingPrice: true, isEditing: false, isEditingDesc: false });
  };
  onClick = event => {
    console.log("isEditingPrice" + this.state.isEditingPrice);
    console.log("isEditingDesc" + this.state.isEditing);
    console.log(this.props);
    console.log(this.state);
  };

  showImg() {
    const product = this.props.single[0];
    if (isEmpty(product.imageDTO)) {
      return (
        <img src={unavailable} className="img-responsive" alt="Unavailable" />
      );
    } else {
      return (
        <img
          src={product.imageDTO[0].base64Image}
          className="img-responsive"
          alt={product.name}
        />
      );
    }
  }

  render() {
    return (
      <div className="row mt-4 parent-min-half-high">
        <div className="col-6">
          <div className="container parent-high">
            <div className="row align-items-start">
              <div className="col pl-0">
                <div className="productTitle d-inline">
                  <InlineEdit
                    className="d-inline"
                    name="test"
                    value={this.state.product.name}
                    isEditing={this.state.isEditing}
                    changeCallback={this.handleCallback}
                  />
                  <p className="d-inline dscrptnSize-9">
                    {" "}
                    by {this.state.product.vendor}
                  </p>
                  <Button
                    className="d-inline btn far fa-edit d-inline"
                    onClick={this.buttonCallback}
                  />
                </div>
                <div className="productRating d-inline">
                  <i className="d-inline fas fa-star fa-xs mr-1" />
                  <p className="d-inline dscrptnSize-8">4.7</p>
                </div>
              </div>
            </div>
            <div className="row align-items-end mt-3 parent-high">
              <ImageUploader />
            </div>
          </div>
        </div>

  

        <div className="col-6">
          <div className="container surround-parent parent-high">
            <div className="row align-items-start">
              <div className="col">
                <div className="mb-3 mt-5">
                  Product Description
                  <Button
                    className="d-inline btn far fa-edit d-inline"
                    onClick={this.buttonCallbackDesc}
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-start parent-min-high">
              <div className="col-8">
                <div className="dscrptnSize-7">
                  {/*}  <p>{this.state.desc}</p> */}
                  <InlineEdit
                    text={this.state.product.desc}
                    className="d-inline"
                    value={this.state.product.desc}
                    isEditing={this.state.isEditingDesc}
                    changeCallback={this.handleCallbackDesc}
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-end">
              <div className="col d-inline">
                {/*} <p className="mb-0 bottom-zero bottom-heavy d-inline">${this.state.price}</p>*/}
                <InlineEdit
                  className="d-inline"
                  name="price"
                  text={this.state.product.price}
                  placeholder={"" + this.state.product.price}
                  isEditing={this.state.isEditingPrice}
                  changeCallback={this.handleCallbackPrice}
                />
                <Button
                  className="d-inline btn far fa-edit d-inline"
                  onClick={this.buttonCallbackPrice}
                />
              </div>
              <div className="col">
                <div className="col surround-parent parent-wide">
                  <div className="row surround-parent parent-wide">
                    <div className="col align-self-end surround-parent parent-wide">
                      <button
                        onClick={this.onClick}
                        className="btn btn-rounded"
                      >
                        test button
                      </button>
                      <Link
                        className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                        to="/adminportal"
                        // Please change when you do Edit Product
                      >
                        Finish
                      </Link>
                      <Link
                        className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"
                        to="/adminportal"
                      >
                        Cancel
                      </Link>
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

export default ProductDescription;
