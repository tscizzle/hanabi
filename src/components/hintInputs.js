import React from 'react';
import PropTypes from 'prop-types';

import { NiceInput, NiceSelect } from './niceInput';


export const HintInputs = ({
  colors,
  hintTopic,
  hintColor,
  hintNumber,
  setHintTopicFunc,
  setHintColorFunc,
  setHintNumberFunc,
}) => {
  const hintColorInput = (
    <HintColorInput
      colors={colors}
      hintColor={hintColor}
      setHintColorFunc={setHintColorFunc}
    />
  );
  const hintNumberInput = (
    <HintNumberInput
      hintNumber={hintNumber}
      setHintNumberFunc={setHintNumberFunc}
    />
  );
  return (
    <div className="hint-inputs">
      <HintTopicInput
        hintTopic={hintTopic}
        setHintTopicFunc={setHintTopicFunc}
      />
      {hintTopic === 'color'
        ? hintColorInput
        : hintNumberInput
      }
    </div>
  );
};

HintInputs.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  hintTopic: PropTypes.oneOf(['color', 'number']).isRequired,
  hintColor: PropTypes.string.isRequired,
  hintNumber: PropTypes.number.isRequired,
  setHintTopicFunc: PropTypes.func.isRequired,
  setHintColorFunc: PropTypes.func.isRequired,
  setHintNumberFunc: PropTypes.func.isRequired,
};


const HintTopicInput = ({ hintTopic, setHintTopicFunc }) => {
  const options = ['color', 'number'];
  const onChange = event => {
    const topic = event.target.value;
    return setHintTopicFunc(topic);
  };
  return (
    <NiceSelect
      options={options}
      value={hintTopic}
      onChange={onChange}
    />
  );
};


const HintColorInput = ({ colors, hintColor, setHintColorFunc }) => {
  const onChange = event => {
    const color = event.target.value;
    return setHintColorFunc(color);
  };
  return (
    <NiceSelect
      options={colors}
      value={hintColor}
      onChange={onChange}
    />
  );
};


const HintNumberInput = ({ hintNumber, setHintNumberFunc }) => {
  const onChange = event => {
    const number = parseInt(event.target.value, 10);
    return setHintNumberFunc(number);
  };
  return (
    <NiceInput
      type="number"
      min={1}
      max={5}
      value={hintNumber}
      onChange={onChange}
    />
  );
};
