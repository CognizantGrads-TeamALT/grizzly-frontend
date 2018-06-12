import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditableLabel from 'react-inline-editing';
import Button from 'react-ions/lib/components/Button';
import InlineEdit from 'react-ions/lib/components/InlineEdit';

class ProductDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: this.props.productDetails.desc,
            price: this.props.productDetails.price,
            isEditing: false,
            isEditingPrice: false
        }
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
    
      handleCallbackDesc = (event) => {
        this.setState({ isEditing: false, [event.target.name]: event.target.value })
      }
    
      buttonCallbackDesc = (event) => {
        this.setState({ isEditing: true, isEditingPrice:false })
      }

      handleCallbackPrice = (event) => {
        this.setState({ isEditingPrice: !this.state.isEditingPrice, [event.target.name]: event.target.value })
      }
    
      buttonCallbackPrice = (event) => {
        this.setState({ isEditingPrice: true, isEditing:false })
      }
      onClick =(event)=>
    {
        console.log("isEditingPrice" + this.state.isEditingPrice);
        console.log("isEditingDesc" + this.state.isEditing);
        console.log(this.props);
        console.log(this.state);
    }

    render() {
        return (
            <div className="container surround-parent parent-high">
                <div className="row align-items-start">
                    <div className="col">
                        <div className="mb-3 mt-5">
                            Product Description 
                            <Button className="d-inline btn far fa-edit d-inline" 
                            onClick={this.buttonCallbackDesc}
                             />
                        </div>
                    </div>
                </div>
                <div className="row align-items-start parent-min-high">
                    <div className="col-8">
                        <div className="dscrptnSize-7">
                          {/*}  <p>{this.state.desc}</p> */}
                          <InlineEdit text={this.state.desc} className="d-inline"
                            value={this.state.desc} 
                            isEditing={this.state.isEditing} 
                            changeCallback={this.handleCallbackDesc} />
                            
                          
                        </div>
                    </div>
                    
                </div>
                <div className="row align-items-end">
                    <div className="col d-inline">  
                       {/*} <p className="mb-0 bottom-zero bottom-heavy d-inline">${this.state.price}</p>*/} 
                       <InlineEdit className="d-inline" name={this.state.price} 
                       text={this.state.price} 
                       placeholder={this.state.price}
                       isEditing={this.state.isEditingPrice} 
                       changeCallback={this.handleCallbackPrice} 
                       
                       />
                       <Button className="d-inline btn far fa-edit d-inline" 
                            onClick={this.buttonCallbackPrice} ></Button>
                       
                    </div> 
                    <div className="col">  
                        
                    </div> 
                    <div className="col surround-parent parent-wide">  
                        <div className="row surround-parent parent-wide">
                            <div className="col align-self-end surround-parent parent-wide">
                            <button onClick={this.onClick} className="btn btn-rounded">test button</button>
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
  
        );
    }
}

export default ProductDescription;