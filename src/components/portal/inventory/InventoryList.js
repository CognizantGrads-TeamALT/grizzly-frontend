import React, { Component } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import { editProductInventory } from '../../../actions/productsActions';
import validator from 'validator';
import isEmpty from '../../../validation/is-empty';

class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.product.productId,
      editing: false,
      name: this.props.product.name,
      stock: this.props.product.stock + '',
      req: this.props.product.req + '',
      buffer: this.props.product.buffer + '',
      price: this.props.product.price + '',
      pending: this.props.product.pending + '',
      rating: this.props.product.rating,
      togglestate: false,
      changed: false,
      oldvals: {},
      bgcol: this.props.product.req > 0 ? 'bg-lightGrey' : ''
    };

    this.shouldCancel = true;
    this.onEditClick = this.onEditClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onEditClick = e => {
    if (this.state.editing && this.state.changed) {
      this.shouldCancel = false;
      //edit the product with values
      const upProd = {
        productId: this.state.productId,
        name: this.state.name,
        stock: this.state.stock,
        req: this.state.req,
        buffer: this.state.buffer,
        pending: this.state.pending,
        price: this.state.price,
        rating: this.state.rating
      };

      if (this.validateInventory(upProd))
        this.props.editProductInventory(upProd);
      else {
        console.log(
          'Invalid name. name field cannot be empty.' +
            ' Invalid name: ' +
            this.state.name
        );
        this.shouldCancel = true;
        this.onCancel();
      }
      var req =
        parseInt(this.state.buffer, 10) - parseInt(this.state.stock, 10);
      this.setState({ req: req < 0 ? 0 : req });
    } else {
      this.setState({
        oldvals: {
          productId: this.state.productId,
          name: this.state.name,
          stock: this.state.stock,
          req: this.state.req,
          buffer: this.state.buffer,
          pending: this.state.pending,
          price: this.state.price,
          rating: this.state.rating
        }
      });
    }

    this.setState({ editing: !this.state.editing, changed: false });
    this.setState({ togglestate: !this.state.togglestate });
  };

  validateInventory(inv) {
    var valid = true;

    if (isEmpty(inv.name)) valid = false;
    return valid;
  }

  //TODO seperate onchange events for strings and ints, check and ensure ints are not less than 0
  onChangeName(e) {
    this.setState({
      [e.target.name]: [e.target.value] + '',
      changed: true
    });
  }

  onCancel(e) {
    if (this.shouldCancel) {
      this.setState({
        productId: this.state.oldvals.productId,
        name: this.state.oldvals.name,
        stock: this.state.oldvals.stock,
        req: this.state.oldvals.req,
        buffer: this.state.oldvals.buffer,
        pending: this.state.oldvals.pending,
        price: this.state.oldvals.price,
        rating: this.state.oldvals.rating,
        editing: false
      });
    } else {
      this.shouldCancel = true;
    }
  }

  onChange(e) {
    if (!validator.isInt(e.target.value)) e.target.value = 0;
    this.setState({
      [e.target.name]: [e.target.value] + '',
      changed: true
    });

    if (e.target.name === 'stock') {
      var req = this.state.buffer - e.target.value;
      this.setState({
        req: req < 0 ? 0 : req,
        bgcol: req > 0 ? 'bg-lightGrey' : ''
      });
    } else if (e.target.name === 'buffer') {
      var req2 = e.target.value - this.state.stock;
      this.setState({
        req: req2 < 0 ? 0 : req2,
        bgcol: req2 > 0 ? 'bg-lightGrey' : ''
      });
    }
  }

  onChangePrice(e) {
    if (!validator.isFloat(e.target.value)) e.target.value = 0;

    this.setState({
      [e.target.name]: [e.target.value] + '',
      changed: true
    });
  }

  render() {
    const { product } = this.props;
    if(!this.state.editing) {
      return (
        <tr>
          <th scope="row">{this.state.productId}</th>
          <td>{this.state.name}</td>
          <td className={this.state.bgcol}>{this.state.stock}</td>
          <td className={this.state.bgcol}>{this.state.req}</td>
          <td>{this.state.buffer}</td>
          <td>${this.state.price}</td>
          <td>{this.state.pending}</td>
          <td>
            <StarRatings
              rating={this.state.rating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
            />
          </td>
          <td>
            <ConfirmModal
              buttonLabel={this.state.editing ? 'Done' : 'Edit'}
              title="Edit Product"
              confirmText={'Edit ' + product.name}
              buttonClass="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
              onSubmit={this.onEditClick}
              shouldPopup={this.state.editing}
              onCancel={this.onCancel}
            />
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <th scope="row">{this.state.productId}</th>
          <td>
            <TextFieldGroup
              placeholder={this.props.placeholder}
              name="name"
              value={this.state.name}
              autocomplete="off"
              onChange={this.onChangeName}
            />
          </td>
          <td>
            <TextFieldGroup
              placeholder={this.props.placeholder}
              name="stock"
              value={this.state.stock}
              autocomplete="off"
              type="number"
              onChange={this.onChange}
              classes="w-25"
            />
          </td>
          <td>{this.state.req}</td>
          <td>
            <TextFieldGroup
              placeholder={this.props.placeholder}
              name="buffer"
              value={this.state.buffer}
              autocomplete="off"
              type="number"
              onChange={this.onChange}
              classes="w-25"
            />
          </td>
          <td>${this.state.price}</td>
          <td>
            <TextFieldGroup
              placeholder={this.props.placeholder}
              name="pending"
              value={this.state.pending}
              autocomplete="off"
              type="number"
              onChange={this.onChange}
              classes="w-25"
            />
          </td>
          <td>
            <StarRatings
              rating={this.state.rating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="1px"
            />
          </td>
          <td>
            <ConfirmModal
              buttonLabel={this.state.editing ? 'Done' : 'Edit'}
              title="Edit Product"
              confirmText={'Edit ' + product.name}
              buttonClass="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
              onSubmit={this.onEditClick}
              shouldPopup={this.state.editing}
              onCancel={this.onCancel}
            />
          </td>
        </tr>
      );
    }
  }
}

InventoryList.propTypes = {
  editProductInventory: PropTypes.func.isRequired
};

export default connect(
  null,
  { editProductInventory }
)(InventoryList);
