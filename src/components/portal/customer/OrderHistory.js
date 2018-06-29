import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    getUserOrder
} from '../../../actions/userActions';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText
  } from 'reactstrap';
class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: 1,
            userId: 1
        }
        this.props.getUserOrder(this.state.userId, this.state.orderId);

    }

    componentWillMount() {
        console.log(this.props.orderDetails);
    }

    getOrderDetails() {

        if (!isEmpty(this.props.orders) || !this.props.loading) {
            console.log(this.state.orders)
            console.log(this.props.orderDetails)
            console.log('s')
          } else {
            return <Spinner size={'150px'} />;
          }
    }

    show() {
        return (
            <div className="mt-2 row">
                <div className="col-9 pl-0">
                    <Card>
                        <CardHeader className="fnt-weight-400 dscrptnSize-9 row m-0">
                            <div className="col text-left">
                                Purchased from vendorName on date
                            </div>
                            <div className="col text-right">
                                $AU productPrice
                            </div>
                        </CardHeader>
                        <div className="row m-3">
                            <div className="col-3 my-auto mx-auto">
                                showImage
                            </div>
                            <div className="col-9">
                                <CardBody>
                                <CardTitle>PHILLIPS TRIMMER</CardTitle>
                                <CardText>Leading Timmer in teh world.</CardText>
                                </CardBody>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-3 text-left">
                    <div className="mt-2 fnt-weight-500 title-size-1em">
                        In Transit
                    </div>
                    <div className="fnt-weight-400 dscrptnSize-9">
                        17/06/18
                    </div>
                    <div className="mt-2 fnt-weight-500 title-size-1em">
                        Delivering to
                    </div>
                    <div className="fnt-weight-400 dscrptnSize-9">
                        On shipDate
                    </div>
                    <button className="mt-3 btn orange-b surround-parent w-75 more-rounded">
                    Track Package
                    </button>
                </div>
            </div>
        );
    }

  render() {
    return (
        <div className="m-3 text-left col">
            <div className="m-2 row">
                <div className="mb-2 row fnt-weight-600 title-size-1-5em">
                    Order History
                </div>
            </div>            
            {this.show()}
            {this.getOrderDetails()}
        </div>
    );
  }
}

OrderHistory.propTypes = {
    getUserOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    orders: state.orders,
    orderDetails: state.orderDetails
});

export default connect(
mapStateToProps, {
    getUserOrder
}
)(OrderHistory);
