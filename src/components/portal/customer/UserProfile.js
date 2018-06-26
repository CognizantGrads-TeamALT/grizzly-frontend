import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import photoID from '../../../img/photoID.png';
import isEmpty from '../../../validation/is-empty';
import Spinner from '../../common/Spinner';
import { getUsers } from '../../../actions/userActions';

class UserProfile extends Component {
// constructor(props) {
//     super(props);
// }

render() {
    return (
    <div className="m-3 text-left col">
        <div className="m-2 row">
            <img src={this.props.user.googleProfile.picture} className="main-profile-img"/>
        </div>
        <div className="m-2 row fnt-weight-600 title-size-1-5em">
            {this.props.user.googleProfile.given_name} {this.props.user.googleProfile.family_name}
        </div>
        <div className="m-2 row fnt-weight-400 title-size-1em">
            {this.props.user.googleProfile.email}
        </div>
    </div>
    );
    }
}

UserProfile.propTypes = {
getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
user: state.user
});

export default connect(
mapStateToProps,
{ getUsers }
)(UserProfile);
