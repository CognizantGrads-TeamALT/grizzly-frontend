import React, { Component } from "react";
import ImageUploader from "../products/ImageUploader";
import EditableLabel from 'react-inline-editing';
import InlineEdit from 'react-ions/lib/components/InlineEdit'
import Button from 'react-ions/lib/components/Button'
//import styles from './styles'


class ProductTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailedProductId: this.props.productId,
            name: this.props.productDetails.name,
            vendor: this.props.productDetails.vendorId,
           
            
        }
    }

    state = {
        isEditing: false,
        value:'{this.state.name}'
      }
    
      handleCallback = event => {
        this.setState({ isEditing: false, value: event.target.value })
        console.log("IN handle callback");
      }
    
      buttonCallback = () => {
        this.setState({ isEditing: true })
      }
    
    render() {
        return (
            <div className="container parent-high">
                <div className="row align-items-start">

                    <div className="col pl-0">
                        <div className="productTitle d-inline">
                           {/* <b className="d-inline">{this.state.name}</b><p className="d-inline dscrptnSize-9"> by {this.state.vendor}</p>
                            
                            <EditableLabel text={this.state.name}  className="d-inline" 
                                onFocus={this._handleFocus} 
                                onFocusOut={this._handleFocusOut}
                                onEditDone={this.saveTempName}>                                                       
                            </EditableLabel>
                            <button type="button" className="btn far fa-edit d-inline" 
                            onClick={this.handleClick}></button>*/}

                            <InlineEdit name='test' value={this.state.name} isEditing={this.state.isEditing} 
                            changeCallback={this.handleCallback} />
                            <Button className="d-inline btn far fa-edit d-inline" onClick={this.buttonCallback} ></Button>
                        </div>
                        <div className="productRating d-inline">
                            <i className="d-inline fas fa-star fa-xs mr-1"/><p className="d-inline dscrptnSize-8">4.7</p>
                        </div>
                    </div>


                </div>
                <div className="row align-items-end mt-3 parent-high">
                    <ImageUploader />
                </div>
            </div>
        );
    }
}

export default ProductTitle;