import React, { Component } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/is-empty';
import TextFieldGroup from '../../common/TextFieldGroup';


class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId : this.props.product.productId,
      editing: false,
      name: this.props.product.name,
      stock: this.props.product.stock + "",
      req:this.props.product.req + "",
    buffer:this.props.product.buffer + "",
    price:	this.props.product.price + "",
    pending:this.props.product.pending+ '',
    rating:this.props.product.rating + "",
    togglestate: false
  }
    this.onEditClick = this.onEditClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onEditClick = (e) => {
      if(this.state.editing){
          //edit the product with values
          const upProd = {
            productId:this.state.productId,
            name:this.state.name,
            stock:this.state.stock,
            req:this.state.req,
            buffer:this.state.buffer,
            price:this.state.price,
            pending:this.state.pending,
            rating:this.state.rating
          };
          console.log(upProd);

      }
    this.setState({editing: !this.state.editing});
    this.setState({togglestate: !this.state.togglestate});

  }

  onChange(e){
      this.setState({[e.target.name]: [e.target.value]+ ""});
  }
  
  render() {
    const { product } = this.props;
    if(!this.state.editing){
    return (
      <tr>
        <th scope="row">{this.state.productId}</th>
        <td>{this.state.name}</td>
        <td>{this.state.stock}</td>
        <td>{this.state.req}</td>
        <td>{this.state.buffer}</td>
        <td>{this.state.price}</td>
        <td>{this.state.pending}</td>
        <td>{this.state.rating}</td>
        <td>
          <ConfirmModal
            buttonLabel={this.state.editing ? 'Done' : 'Edit'}
            title="Edit Product"
            confirmText={
              ('Edit ' + product.name )
            }
            buttonClass="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
            onSubmit={this.onEditClick}
            shouldPopup={this.state.editing}
            onCancel={this.onCancel}
          />
        </td>
      </tr>
    );
}
    else{
        console.log(this.state.editing + " in editing");
        return(<tr>
            <th scope="row">{this.state.productId}</th>
            <td><TextFieldGroup
            placeholder={this.props.placeholder}
            name="name"
            value={this.state.name}
            autocomplete="off"
            onChange={this.onChange}
            /></td>
            <td><TextFieldGroup
            placeholder={this.props.placeholder}
            name="stock"
            value={this.state.stock}
            autocomplete="off"
            type="number"
            onChange={this.onChange}
            /></td>
            <td><TextFieldGroup
            placeholder={this.props.placeholder}
            name="req"
            value={this.state.req}
            autocomplete="off"
            type="number"
            onChange={this.onChange}
            /></td>
            <td><TextFieldGroup
            placeholder={this.props.placeholder}
            name="buffer"
            value={this.state.buffer}
            autocomplete="off"
            type="number"
            onChange={this.onChange}
            /></td>
            <td><TextFieldGroup
            placeholder={this.props.placeholder}
            name="price"
            value={this.state.price}
            autocomplete="off"
            type="number"
            onChange={this.onChange}
            /></td>
            <td><TextFieldGroup
            placeholder={this.props.placeholder}
            name="pending"
            value={this.state.pending}
            autocomplete="off"
            type="number"
            onChange={this.onChange}
            /></td>
            <td>{this.state.rating}</td>
            <td>
              <ConfirmModal
                buttonLabel={this.state.editing ? 'Done' : 'Edit'}
                title="Edit Product"
                confirmText={
                  ('Edit ' + product.name )
                }
                buttonClass="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
                onSubmit={this.onEditClick}
                shouldPopup={this.state.editing}
                onCancel={this.onCancel}
              />
            </td>
          </tr>);
    }
  }

}

InventoryList.propTypes = {
};

export default connect(
  null,
  { }
)(InventoryList);
