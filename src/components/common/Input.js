import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Input = ({ name, placeholder, value, error, type, onChange }) => {
  return (
    <div className="input-group input-group-sm">
      <input
        className={classnames("form-control", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
  
};

Input.defaultProps = {
  type: "text"
};

export default Input;
