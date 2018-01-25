import React from 'react';
import classNames from 'classnames';


export const NiceButton = ({ children, ...otherProps }) => (
  <button
    className="nice-button"
    {...otherProps}
  >
    {children}
  </button>
);


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
