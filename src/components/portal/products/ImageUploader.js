import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import UploadIcon from '../../../img/UploadIcon.svg';
import md5 from 'js-md5';
import Button from 'react-ions/lib/components/Button';

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: this.props.startingImages,
      files: this.props.startingFiles,
      notAcceptedFileType: [],
      notAcceptedFileSize: []
    };
    this.startingImages = this.props.startingImages;
    this.startingFiles = this.props.startingFiles;
    this.inputElement = '';
    this.onDropFile = this.onDropFile.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
    this.restoreStarting = this.restoreStarting.bind(this);

    this.resetCallback = this.props.resetCallback;
  }

  // Restore the "starting files"
  restoreStarting() {
    this.setState({ pictures: this.startingImages, files: this.startingFiles });
    this.resetCallback();
  }

  /*
   Load image at the beginning if defaultImage prop exists
   */
  componentWillReceiveProps() {
    if (this.props.defaultImage) {
      this.setState({ pictures: [this.props.defaultImage] });
    }
  }

  /*
	 On button click, trigger input file to open
	 */
  triggerFileUpload() {
    this.inputElement.click();
  }

  /*
	 Handle file validation
	 */
  onDropFile(e) {
    const files = e.target.files;
    const _this = this;

    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let f = files[i];
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        const newArray = _this.state.notAcceptedFileType.slice();
        newArray.push(f.name);
        _this.setState({ notAcceptedFileType: newArray });
        continue;
      }
      // Check for file size
      if (f.size > this.props.maxFileSize) {
        const newArray = _this.state.notAcceptedFileSize.slice();
        newArray.push(f.name);
        _this.setState({ notAcceptedFileSize: newArray });
        continue;
      }

      const reader = new FileReader();
      // Read the image via FileReader API and save image result in state.
      reader.onload = (function() {
        return function(e) {
          // Add the file name to the data URL
          let dataURL = e.target.result;

          // DUPLICATE VERIFICATIONS

          // Our regex to strip the beginning section of the data.
          // We need this. A person may change .png to .jpg and get away with it otherwise.
          let stripPattern = /data:.*;base64,/;

          // Calculate the MD5 hash of the file being rendered.
          let MD5Hash = md5(dataURL.replace(stripPattern, ''));

          // Loop through existing images and compare MD5.
          for (let i = 0; i < _this.props.startingImages.length; i++) {
            let data = _this.props.startingImages[i].replace(stripPattern, '');

            if (MD5Hash === md5(data)) {
              return;
            }
          }

          // Loop through files being uploaded and compare MD5.
          for (let i = 0; i < _this.state.pictures.length; i++) {
            let data = _this.state.pictures[i].replace(stripPattern, '');

            if (MD5Hash === md5(data)) {
              return;
            }
          }

          if (_this.props.singleImage === true) {
            _this.setState({ pictures: [dataURL], files: [f] }, () => {
              _this.props.onChange(_this.state.files, _this.state.pictures);
            });
          } else if (_this.state.pictures.indexOf(dataURL) === -1) {
            const newArray = _this.state.pictures.slice();
            newArray.push(dataURL);

            const newFiles = _this.state.files.slice();
            newFiles.push(f);

            _this.setState({ pictures: newArray, files: newFiles }, () => {
              _this.props.onChange(_this.state.pictures, _this.state.files);
            });
          }
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }

  /*
   Render the upload icon
   */
  renderIcon() {
    if (this.props.withIcon && !this.props.disabled) {
      return <img src={UploadIcon} className="uploadIcon" alt="Upload Icon" />;
    }
  }

  /*
	 Render label
	 */
  renderLabel() {
    if (this.props.withLabel && !this.props.disabled) {
      return (
        <p className={this.props.labelClass} style={this.props.labelStyles}>
          {this.props.label}
        </p>
      );
    } else {
      return (
        <div>
          <p className={this.props.labelClass} style={this.props.labelStyles}>
            Your changes have been saved. You must click the Finish button to finalise.
          </p>
          <Button
            onClick={this.restoreStarting}
            className="btn more-rounded hover-t-b btn-sm mx-auto surround-parent parent-wide mt-2"
          >
            Reset changes
          </Button>
        </div>
      );
    }
  }

  /*
	 Check file extension (onDropFile)
	 */
  hasExtension(fileName) {
    const pattern =
      '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  /*
	 Remove the image from state
	 */
  removeImage(picture) {
    const removeIndex = this.state.pictures.findIndex(e => e === picture);
    const filteredPictures = this.state.pictures.filter(
      (e, index) => index !== removeIndex
    );
    const filteredFiles = this.state.files.filter(
      (e, index) => index !== removeIndex
    );

    this.setState({ pictures: filteredPictures, files: filteredFiles }, () => {
      this.props.onChange(this.state.pictures, this.state.files);
    });
  }

  /*
	 Check if any errors && render
	 */
  renderErrors() {
    let notAccepted = '';
    if (this.state.notAcceptedFileType.length > 0) {
      notAccepted = this.state.notAcceptedFileType.map((error, index) => {
        return (
          <div
            className={'errorMessage ' + this.props.errorClass}
            key={index}
            style={this.props.errorStyle}
          >
            * {error} {this.props.fileTypeError}
          </div>
        );
      });
    }
    if (this.state.notAcceptedFileSize.length > 0) {
      notAccepted = this.state.notAcceptedFileSize.map((error, index) => {
        return (
          <div
            className={'errorMessage ' + this.props.errorClass}
            key={index}
            style={this.props.errorStyle}
          >
            * {error} {this.props.fileSizeError}
          </div>
        );
      });
    }
    return notAccepted;
  }

  /*
	 Render preview images
	 */
  renderPreview() {
    return (
      <div className="uploadPicturesWrapper">
        <FlipMove
          enterAnimation="fade"
          leaveAnimation="fade"
          className="flipMove"
        >
          {this.renderPreviewPictures()}
        </FlipMove>
      </div>
    );
  }

  renderPreviewPictures() {
    return this.state.pictures.map((picture, index) => {
      return (
        <div key={index} className="uploadPictureContainer">
          {!this.props.disabled && (
            <div
              className="deleteImage"
              onClick={() => this.removeImage(picture)}
            >
              X
            </div>
          )}
          <img src={picture} className="uploadPicture" alt="preview" />
        </div>
      );
    });
  }

  render() {
    return (
      <div
        className={'fileUploader parent-high' + this.props.className}
        style={this.props.style}
      >
        <div className="fileContainer parent-high">
          {this.renderIcon()}
          {this.renderLabel()}
          <div className="errorsContainer">{this.renderErrors()}</div>
          {!this.props.disabled && (
            <div>
              <button
                type={this.props.buttonType}
                className={'chooseFileButton ' + this.props.buttonClassName}
                style={this.props.buttonStyles}
                onClick={this.triggerFileUpload}
              >
                {this.props.buttonText}
              </button>
              <input
                type="file"
                ref={input => (this.inputElement = input)}
                name={this.props.name}
                multiple={!this.props.singleImage}
                onChange={this.onDropFile}
                accept={this.props.accept}
              />
            </div>
          )}
          {this.props.withPreview ? this.renderPreview() : null}
        </div>
      </div>
    );
  }
}

ImageUploader.defaultProps = {
  className: '',
  buttonClassName: '',
  buttonStyles: {},
  withPreview: false,
  accept: 'image/*',
  name: '',
  withIcon: true,
  buttonText: 'Choose images',
  buttonType: 'button',
  withLabel: true,
  label: 'Max file size: 250k, accepted: jpg|jpeg|gif|png',
  labelStyles: {},
  labelClass: '',
  imgExtension: ['.jpg', '.jpeg', '.png'],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not a supported file extension',
  errorClass: '',
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: () => {},
  defaultImage: '',
  startingImages: [],
  startingFiles: []
};

ImageUploader.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  buttonClassName: PropTypes.string,
  buttonStyles: PropTypes.object,
  buttonType: PropTypes.string,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  buttonText: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  imgExtension: PropTypes.array,
  maxFileSize: PropTypes.number,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  singleImage: PropTypes.bool,
  defaultImage: PropTypes.string,
  startingImages: PropTypes.array,
  startingFiles: PropTypes.array
};

export default ImageUploader;
