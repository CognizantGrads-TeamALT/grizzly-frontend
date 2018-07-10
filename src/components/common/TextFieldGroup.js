import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  classes,
  clearButton
}) => {
  return (
    <div className="search-form-custom form-inline">
      <input
        type={type}
        className={classnames(`form-control left-rounded border-right-0 border d-inline z-index-500`, {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete="off"
      />
      {!isEmpty(clearButton) && (
        <span className="input-group-append-more">
          <button
            onClick={clearButton}
            className="btn btn-outline-success btn-sm right-rounded border-left-0 border"
            type="button"
          >
            <i className="fa fa-times-circle" />
          </button>
        </span>
      )}
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
