import { connect } from 'react-redux';

import { setHintTopic, setHintColor, setHintNumber } from '../actions';

import { HintInputs } from '../components/hintInputs';


const mapStateToProps = state => {
  const { game, playing } = state;
  const { colors } = game;
  const { hintTopic, hintColor, hintNumber } = playing;
  return {
    colors,
    hintTopic,
    hintColor,
    hintNumber,
  };
};


const mapDispatchToProps = dispatch => ({
  setHintTopicFunc: topic => dispatch(setHintTopic({ topic })),
  setHintColorFunc: color => dispatch(setHintColor({ color })),
  setHintNumberFunc: number => dispatch(setHintNumber({ number })),
});


export const ConnectedHintInputs = connect(
  mapStateToProps,
  mapDispatchToProps
)(HintInputs);
