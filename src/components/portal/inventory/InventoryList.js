import React, { Component } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/is-empty';


class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId : this.props.location,
      editing: true
  }
    this.onEditClick = this.onEditClick.bind(this);
  }

  onEditClick = (e) => {

  }


  render() {
    const { product } = this.props;

    return (
      <tr>
        <th scope="row">{product.productId}</th>
        <td>{product.name}</td>
        <td>{Math.floor((Math.random() * 100) + 1)}</td>
        <td>{Math.floor((Math.random() * 100) + 1)}</td>
        <td>{Math.floor((Math.random() * 100) + 1)}</td>
        <td>{Math.floor((Math.random() * 100) + 1)}</td>
        <td>{Math.floor((Math.random() * 100) + 1)}</td>
        <td>{Math.floor((Math.random() * 100) + 1)}</td>
        <td>
          <ConfirmModal
            buttonLabel={this.state.editing ? 'Done' : 'Edit'}
            title="Edit Product"
            popup={this.state.editing}
            confirmText={
              (product.enabled ? 'Block' : 'Unblock') + ' ' + product.name
            }
            buttonClass="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
            onSubmit={this.onEditClick}
          />
        </td>
      </tr>
    );
  }

}

InventoryList.propTypes = {
};

export default connect(
  null,
  { }
)(InventoryList);
