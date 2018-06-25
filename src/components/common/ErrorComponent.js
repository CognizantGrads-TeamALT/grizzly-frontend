import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CategoryForm extends Component {


    Render(){
        return (
            <div className="align-left">
                <p>{this.props.error.errorData.message}</p>
            </div>
        )

    }
    
    
}
export default connect(
    null,
    {  }
  )(withRouter(CategoryForm));
