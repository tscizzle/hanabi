import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';


export const NiceInput = ({ className, ...otherProps }) => {
  const inputClasses = classNames('nice-input', {
    [className]: Boolean(className),
  });
  return (
    <input
      className={inputClasses}
      {...otherProps}
    />
  );
};


export const NiceSelect = ({ options, ...otherProps }) => {
  const optionsDisplay = _.map(options, option => {
    let label, value;
    if (_.isObject(option)) {
      label = option.label;
      value = option.value;
    } else {
      label = option;
      value = option;
    }
    return (
      <option
        value={value}
        key={value}
      >
        {label}
      </option>
    );
  });
  return (
    <select {...otherProps}>
      {optionsDisplay}
    </select>
  );
};
