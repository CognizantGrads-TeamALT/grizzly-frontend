import React, { Component } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  toggleBlockProduct,
  deleteProduct
} from '../../../actions/productsActions';
import isEmpty from '../../../validation/is-empty';
import ErrorComponent from '../../common/ErrorComponent';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.location,
      showError: false,
      listenForError: false,
      count: 0,
      testCount: 0,
    };
    this.onBlockClick = this.onBlockClick.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
    this.closeError=this.closeError.bind(this);
    this.waitForResponce=this.waitForResponce.bind(this);
  }

  closeError(){
    this.setState({showError:false});
  }

  onDeleteClick(id) {
    this.props.deleteProduct(id);
    this.setState({listenForError: true,})
  }

  onBlockClick() {
    const product = this.props.product.products[this.props.index];
    this.props.toggleBlockProduct(product.productId, !product.enabled);
    //sets it so that errors thrown will be shown, starts a listener to wait for a error.
    this.setState({listenForError: true,
      block: true,
      count: 0,
    intervalId: setInterval(this.waitForResponce, 100)
    });
  }

  onViewClick() {
    const product = this.props.product.products[this.props.index];
    this.props.history.push(`/detailedproduct/${product.productId}`);
  }

  waitForResponce = (product) => {
    //timed method, listens for error and displays if if there is one.
    if(this.props.errors.errorMessage !== "" && this.state.listenForError){
      this.setState({showError:true,
      listenForError: false})
      clearInterval(this.state.intervalId);
    }
    else if(this.state.count> 5){
      clearInterval(this.state.intervalId);
      this.setState({listenForError:false})}
      
    else this.setState({count: this.state.count+1})
  }

  showCatName(product) {
    const { product_category } = this.props;
    if (!isEmpty(product) && !isEmpty(product_category)) {
      const catName =
        product.categoryId === 0
          ? product.categoryId
          : product_category.filter(
              item => item.categoryId === product.categoryId
            )[0].name;
      return catName;
    }
  }

  showVendorName(product) {
    const { product_vendor } = this.props
    if (!isEmpty(product) && !isEmpty(product_vendor)) {
      const vendName =
        product.vendorId === 0
          ? product.vendorId
          : product_vendor.filter(item => item.vendorId === product.vendorId)[0]
              .name;
      return vendName;
    }
  }

  render() {
    //updated this to get the product from the global state instead of the parent
    const product = this.props.product.products[this.props.index];
    if (!isEmpty(product))
      return (
        <tr>
          <th scope="row">{product.productId}</th>
          <td>{product.name}</td>
          <td>{this.showVendorName(product)}</td>
          <td>{this.showCatName(product)}</td>
          <td>{product.rating}</td>
          <td>
            <div className="row">
              <div className="col p-0">
                <Button
                  onClick={this.onViewClick}
                  className="btn more-rounded blue-b btn-sm mr-sm-2 d-inline"
                >
                  View
                </Button>
              </div>
              {this.props.userType === 'admin' && (
                <div className="col p-0 collapsable-block-appearance">
                  <ConfirmModal
                    buttonLabel={product.enabled ? 'Block' : 'Unblock'}
                    title="Block Product"
                    confirmText={
                      (product.enabled ? 'Block' : 'Unblock') + ' ' + product.name
                    }
                    buttonClass="btn more-rounded orange-b btn-sm mr-sm-2 d-inline"
                    onSubmit={this.onBlockClick}
                  />
                </div>
              )}
              <div className="col p-0">
                <ConfirmModal
                  buttonLabel="Delete"
                  title="Delete Product"
                  confirmText={'Delete ' + product.name}
                  buttonClass="btn more-rounded red-b btn-sm mr-sm-2 d-inline"
                  onSubmit={this.onDeleteClick.bind(this, product.productId)}
                />
                <ErrorComponent 
                  errormsg={this.props.errors.errorMessage} 
                  popup={true} 
                  show={this.state.showError} 
                  closeError={this.closeError} />
              </div>
            </div>
          </td>
        </tr>
      );
  }
}

ProductList.propTypes = {
  toggleBlockProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,

  errors: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  product: state.product
});

export default connect(
  mapStateToProps,
  { toggleBlockProduct, deleteProduct }
)(withRouter(ProductList));
