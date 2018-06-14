import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import EditableLabel from "react-inline-editing";
import Button from "react-ions/lib/components/Button";
import InlineEdit from "react-ions/lib/components/InlineEdit";
import isEmpty from "../../../validation/is-empty";
import unavailable from "../../../img/unavailable.png";
import ImageUploader from "../products/ImageUploader";
import { withRouter } from 'react-router-dom';
import {editProduct} from "../../../actions/productsActions";
import { connect } from 'react-redux';

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isEditingPrice: false,
      isEditingDesc: false,
      name: this.props.single.name,
      desc: this.props.single.desc,
      price: this.props.single.price,
      
      
    };
    
    this.pictures = [];
    this.handleCallbackDesc = this.handleCallbackDesc.bind(this);
    this.buttonCallbackDesc = this.buttonCallbackDesc.bind(this);
    this.handleCallbackPrice = this.handleCallbackPrice.bind(this);
    this.buttonCallbackPrice = this.buttonCallbackPrice.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
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
    this.setState({ isEditing: false,
        [event.target.name]: event.target.value });
  }

  buttonCallback = () => {
    this.setState({ isEditing: true, isEditingDesc: false, isEditingPrice:false})
  }

  handleCallbackPrice = event => {
    if(parseInt(event.target.value) == NaN){
        event.target.value = this.state.product.price;
        /* this.setState({
            isEditingPrice: !this.state.isEditingPrice
          }); */
    }
    else{
    this.setState({
      isEditingPrice: !this.state.isEditingPrice,
      [event.target.name]: event.target.value
    });
    }
  };

  buttonCallbackPrice = event => {
    this.setState({ isEditingPrice: true, isEditing: false, isEditingDesc: false });
  };
  onClick = event => {
    console.log(this.props.product);
    console.log("");
    console.log(this.props);
    console.log(this.props.single);
    //console.log(this.state);
  };

  showImg() {
    const product = this.props.single;
    if (isEmpty(product.imageDTO)) {
      return (
        <img src={unavailable} className="img-responsive" alt="Unavailable" />
      );
    } else {
      return (
        <img
          src={product.imageDTO.base64Image}
          className="img-responsive"
          alt={product.name}
        />
      );
    }
  }
  onSubmit(e) {
    console.log("in submit");
    var changed = false;
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
        productId: this.props.single.productId,
        categoryId: this.props.single.categoryId,
        name: this.state.name,
        desc: this.state.desc,
        price: this.state.price,
        rating: this.props.single.rating,
        enabled: this.props.single.enabled,
        vendorId: this.props.single.vendorId,
        imageDTO: this.props.single.imageData
      };
    if (this.state.name!= "" ){
        newProd.name=this.state.name;
        changed = true;
    }
    if ( this.state.desc!= "" ){
        newProd.desc = this.state.desc;
        changed = true;
    }
    if( this.state.price != "" ) {
      newProd.price = parseInt(this.state.price);
      changed = true;
    }
    console.log(newProd);
    if(changed){
        this.props.editProduct(newProd);
        //console.log("Change called");
    }
  }

  onCancel = event =>
  {
    
      this.props.history.push('/adminportal');
  }

  render() {
      console.log(this.props.single.name);
      console.log(this.state.name);
    return (
      <div className="row mt-4 parent-min-half-high">
        <div className="col-6">
          <div className="container parent-high">
            <div className="row align-items-start">
              <div className="col pl-0">
                <div className="productTitle d-inline">
                  <InlineEdit
                    className="d-inline"
                    name="name"
                    value={this.state.name}
                    isEditing={this.state.isEditing}
                    changeCallback={this.handleCallback}
                  />
                  <p className="d-inline dscrptnSize-9">
                    
                    by {this.props.vendor.name}
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
                {/*} <p className="mb-0 bottom-zero bottom-heavy d-inline">${this.state.price}</p>*/}
                <InlineEdit
                  className="d-inline"
                  name="price"
                  placeholder={"" + this.state.price}
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
                      {/*testing*/}
                      <button
                        onClick={this.onClick}
                        className="btn btn-rounded"
                      >
                        test button
                      </button>
                      <Button
                        className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
                        onClick={this.onSubmit} >                    
                      
                        Finish
                      </Button>
                      <Button
                        className="btn more-rounded hover-w-b btn-sm mx-auto surround-parent parent-wide mt-2"
                        onClick={this.onCancel}>
                      
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
    { editProduct }
  )(ProductDescription);
