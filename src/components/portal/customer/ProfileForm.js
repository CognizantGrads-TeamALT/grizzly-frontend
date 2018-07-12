import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'validator';
import { toast } from 'react-toastify';
import { createOrUpdateProfile } from '../../../actions/userActions';
import isEmpty from '../../../validation/is-empty';
import GoogleMapLoader from 'react-google-maps-loader';
import GooglePlacesSuggest from 'react-google-places-suggest';
import TextFieldGroup from '../../common/TextFieldGroup';

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      contact_num: '',
      address: '',
      errors: {},
      isValid: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.handleSelectSuggest = this.handleSelectSuggest.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.addressSelected = false;
    this.hasLoadedAddress = false;
    this.hasLoadedNum = false;
  }
  componentDidMount() {
    const { user } = this.props.user;
    if (!isEmpty(user)) {
      if (!isEmpty(user.contact_num) && !this.hasLoadedNum) {
        this.setState({ contact_num: user.contact_num });
        this.hasLoadedNum = true;
      }
      if (!isEmpty(user.address) && !this.hasLoadedAddress) {
        this.setState({ address: user.address });
        this.hasLoadedAddress = true;
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props.user;
    if (isEmpty(user)) { return; }
    if (!isEmpty(user.address)) {
      if (isEmpty(this.state.address) && !this.hasLoadedAddress) {
        this.setState({ address: user.address });
        this.hasLoadedAddress = true;
      }
    }
    if (!isEmpty(user.contact_num)) {
      if (isEmpty(this.state.contact_num) && !this.hasLoadedNum) {
        this.setState({ contact_num: user.contact_num });
        this.hasLoadedNum = true;
      }
    }
  }

  handleInputChange(e, validationFunction) {
    this.addressSelected = false;
    this.setState({ search: e.target.value, address: e.target.value });
    //validationFunction(e.target.value);
  }

  handleSelectSuggest(suggest) {
    this.addressSelected = true;
    this.setState({ search: '', address: suggest.formatted_address });
  }

  onChange(e, validationFunction) {
    this.setState({ [e.target.name]: e.target.value });
    validationFunction(e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();

    this.validateAddress();
    if (this.validateForm()) {
      this.setState({ isValid: true });
      const profileData = {
        name: this.props.user.googleProfile.name,
        contact_num: parseInt(this.state.contact_num, 10),
        email: this.props.user.googleProfile.email,
        address: this.state.address
      };
      this.props.createOrUpdateProfile(profileData);
      toast.success('Profile updated!');
      if (this.props.previousPath === '/shoppingcart') {
        this.props.history.push('/shoppingcart');
      } else {
        this.props.onCancel();
      }
    } else {
      toast.info('Please check your input!');
      this.setState({ isValid: false });
    }
  }

  resetForm() {
    const { user } = this.props.user;
    let contact_num = '';
    let address = '';
    if (!isEmpty(user.contact_num)) {
      contact_num = user.contact_num;
    } else {
      contact_num = parseInt(this.state.contact_num, 10);
    }
    if (!isEmpty(user.address)) {
      address = user.address;
    } else {
      address = this.state.address;
    }
    this.setState({
      search: '',
      contact_num: contact_num,
      address: address,
      errors: {},
      isValid: true
    });
  }

  onToggle(e) {
    e.preventDefault();
    this.resetForm();
    if (this.props.previousPath === '/shoppingcart') {
      this.props.history.push('/shoppingcart');
    } else {
      this.props.onCancel();
    }
  }

  render() {
    const { search, contact_num, address, errors } = this.state;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h3 className="text-center">Edit Your Profile</h3>
              <p className="text-center">Keep your profile updated.</p>
              <small className="d-block pb-3 text-center">
                * = required fields
              </small>
              <form onSubmit={this.onSubmit}>
                <div className="row mx-auto w-100 mb-2">
                  <TextFieldGroup
                    placeholder={this.props.user.googleProfile.name}
                    name="name"
                    disabled="true"
                    onChange={this.onChange}
                    value={this.props.user.googleProfile.name}
                  />
                </div>
                <div className="row mx-auto w-100 mb-2">
                  <TextFieldGroup
                    placeholder="* Contact Number"
                    name="contact_num"
                    value={
                      String(contact_num) === 'NaN' ? '' : String(contact_num)
                    }
                    onChange={event => this.onChange(event, this.validateNumber)}
                    error={errors.contact_num}
                  />
                </div>
                <div className="row mx-auto w-100 mb-2">
                  <TextFieldGroup
                    placeholder={this.props.user.googleProfile.email}
                    name="email"
                    disabled="true"
                    onChange={this.onChange}
                    value={this.props.user.googleProfile.email}
                  />
                </div>
                <div className="row mx-auto w-100 mb-2 child-parent-wide-inner">
                  <GoogleMapLoader
                    params={{
                      key: 'AIzaSyC10O3F4Kop2zNPtt6v3BSZSYegdmZ_f0U',
                      libraries: 'places,geocode'
                    }}
                    render={googleMaps =>
                      googleMaps && (
                        <div>
                          <GooglePlacesSuggest
                            autocompletionRequest={{ input: search }}
                            googleMaps={googleMaps}
                            onSelectSuggest={this.handleSelectSuggest}
                          >
                            <TextFieldGroup
                              name="address"
                              value={address}
                              placeholder="* Address"
                              onChange={event =>
                                this.handleInputChange(
                                  event,
                                  this.validateAddress
                                )
                              }
                              error={errors.address}
                            />
                          </GooglePlacesSuggest>
                        </div>
                      )
                    }
                  />
                </div>
                <div className="row mx-auto w-100 mb-2 mt-5">
                    <input
                        type="submit"
                        value="Submit"
                        className="btn orange-b more-rounded hover-w-b w-100 btn-sm my-2 my-sm-0 mr-sm-2"
                      />
                </div>
                <div className="row mx-auto w-100 mb-2">
                    <button className="btn plain-b more-rounded hover-w-b w-100 btn-sm my-2 my-sm-0 mr-sm-2" onClick={this.onToggle}>
                      Cancel
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  validateNumber = numInput => {
    if (!validator.isLength(numInput, { min: 10, max: 16 })) {
      this.setState({
        errors: {
          contact_num: 'Phone number must be between 10 and 16 digits.'
        }
      });
    } else if (!validator.isMobilePhone(numInput, 'any')) {
      this.setState({
        errors: {
          ...this.state.errors,
          contact_num: 'Please enter a valid phone number.'
        }
      });
    } else {
      this.setState({
        errors: { ...this.state.errors, contact_num: '' }
      });
    }
  };

  validateAddress = input => {
    if (!this.addressSelected) {
      this.setState({
        errors: {
          ...this.state.errors,
          address: 'Please enter a valid address.'
        }
      });
    } else {
      this.setState({
        errors: { ...this.state.errors, address: '' }
      });
    }
  };

  validateForm() {
    if (isEmpty(this.state.errors)) {
      if (isEmpty(this.state.contact_num) || isEmpty(this.state.address)) {
        return false;
      } else return true;
    } else if (
      isEmpty(this.state.errors.contact_num) &&
      isEmpty(this.state.errors.contact_num)
    ) {
      if (!isEmpty(this.state.contact_num) && !isEmpty(this.state.address)) {
        return true;
      } else return false;
    } else if (
      !isEmpty(this.state.errors.contact_num) ||
      !isEmpty(this.state.errors.contact_num)
    ) {
      return false;
    }
  }
}

ProfileForm.propTypes = {
  createOrUpdateProfile: PropTypes.func.isRequired,

  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { createOrUpdateProfile }
)(withRouter(ProfileForm));
