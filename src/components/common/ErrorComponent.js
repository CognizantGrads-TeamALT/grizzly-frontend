import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ErrorComponent extends Component {


    render(){
        return (
            <div className="align-left">
                <p className="text-danger">{this.props.errormsg}</p>
            </div>
        )

    }
    
}


export default connect(
null,
    {}
  )(withRouter(ErrorComponent));
