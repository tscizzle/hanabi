import React from 'react';
import classNames from 'classnames';


export const NiceButton = ({ className, children, ...otherProps }) => {
  const buttonClasses = classNames('nice-button', {
    [className]: Boolean(className),
  });
  return (
    <a
      className={buttonClasses}
      {...otherProps}
    >
      {children}
    </a>
  );
};


export const FloatingButton = ({ className, ...otherProps }) => {
  const buttonClasses = classNames('floating-button', {
    [className]: Boolean(className),
  });
  return (
    <NiceButton
      className={buttonClasses}
      { ...otherProps }
    />
  );
};
