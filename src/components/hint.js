import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaTint } from 'react-icons/lib/fa';


const Hint = ({ className, onClick, children }) => {
  const hintClasses = classNames('hint', {
    [className]: Boolean(className),
  });
  return (
    <div className="hint-container">
      <div
        className={hintClasses}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
};

Hint.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};


export const UsedHint = () => (
  <Hint className="used-hint"></Hint>
);


export const RemainingHint = ({ giveHintFunc }) => (
  <Hint
    className="remaining-hint"
    onClick={giveHintFunc}
  >
    <FaTint />
  </Hint>
);
