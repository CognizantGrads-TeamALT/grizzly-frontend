import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ErrorComponent extends Component {


    render(){
        return (
            <tr className="align-left">
                {console.log(this.props)}
                <td className="text-danger">{this.props.errors.errorMessage}</td>
            </tr>
        )

    }
    
}

const mapStateToProps = state => ({
    errors: state.errors
  });

export default connect(
    mapStateToProps,
    {}
  )(withRouter(ErrorComponent));
