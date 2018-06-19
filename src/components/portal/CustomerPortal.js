import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductGridList from './common/ProductGridList';
import PropTypes from 'prop-types';
import { getProducts, setProductUpdated } from '../../actions/productsActions';
import ProductCarousel from './common/ProductCarousel';
import isEmpty from '../../validation/is-empty';
import Spinner from "../common/Spinner";

class CustomerPortal extends Component {
  constructor(props) {
    super(props);
    this.props.getProducts();
  }

  componentDidUpdate() {
    if (this.props.product.updateOnce) this.props.setProductUpdated();
  }

  shouldComponentUpdate() {
    if (this.props.product.updateOnce || this.props.product.loading)
      return true;

    return false;
  }

  render() {
    const {
      products,
      loading
    } = this.props.product;
    if (
      !isEmpty(products) &&
      !loading
    ) {
      return (
        <div className="col-md-12">
          <ProductCarousel />
          <ProductGridList />
        </div>
      );
    } else {
      return (
        <tr>
          <td>
          <Spinner size={'150px'}/>
          </td>
        </tr>
      );
    }
  }
}

CustomerPortal.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts, setProductUpdated }
)(CustomerPortal);
