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
  }
  componentDidMount() {
    const { user } = this.props.user;
    if (!isEmpty(user)) {
      if (!isEmpty(user.contact_num)) {
        this.setState({ contact_num: user.contact_num });
      }
      if (!isEmpty(user.address)) {
        this.setState({ address: user.address });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props.user;
    if (!isEmpty(user.address)) {
      if (isEmpty(this.state.address)) {
        this.setState({ address: user.address });
      }
    }
    if (!isEmpty(user.contact_num)) {
      if (isEmpty(this.state.contact_num)) {
        this.setState({ contact_num: user.contact_num });
      }
    }
  }

  handleInputChange(e, validationFunction) {
    this.setState({ search: e.target.value, address: e.target.value });
    validationFunction(e.target.value);
  }

  handleSelectSuggest(suggest) {
    this.setState({ search: '', address: suggest.formatted_address });
  }

  onChange(e, validationFunction) {
    this.setState({ [e.target.name]: e.target.value });
    validationFunction(e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();

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
    this.props.onCancel();
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
                <TextFieldGroup
                  placeholder={this.props.user.googleProfile.name}
                  name="name"
                  disabled="true"
                  onChange={this.onChange}
                  value={this.props.user.googleProfile.name}
                />
                <TextFieldGroup
                  placeholder="* Contact Number"
                  name="contact_num"
                  value={
                    String(contact_num) === 'NaN' ? '' : String(contact_num)
                  }
                  onChange={event => this.onChange(event, this.validateNumber)}
                  error={errors.contact_num}
                />
                <TextFieldGroup
                  placeholder={this.props.user.googleProfile.email}
                  name="email"
                  disabled="true"
                  onChange={this.onChange}
                  value={this.props.user.googleProfile.email}
                />
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
                {/* {!this.state.isValid && (
                  <div className="alert alert-warning">
                    {'Please check your input.'}
                  </div>
                )} */}
                <div className="row ml-0 mr-0">
                  <div className="col pl-0 text-left">
                    <button className="btn btn-light" onClick={this.onToggle}>
                      Cancel
                    </button>
                  </div>
                  <div className="col pr-0 text-right">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-outline-success"
                    />
                  </div>
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
    if (validator.isEmpty(input)) {
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
  createOrUpdateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { createOrUpdateProfile }
)(withRouter(ProfileForm));
