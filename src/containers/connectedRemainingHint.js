import { connect } from 'react-redux';
import randomId from 'random-id';

import { giveHint } from '../actions';

import { RemainingHint } from '../components/hint';


const mapStateToProps = state => {
  const { playing } = state;
  const { hintForPlayerId, hintTopic, hintColor, hintNumber } = playing;
  return {
    hintForPlayerId,
    hintTopic,
    hintColor,
    hintNumber,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    hintForPlayerId: forPlayerId,
    hintTopic: topic,
    hintColor: color,
    hintNumber: number,
  } = stateProps;
  const { dispatch } = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    giveHintFunc: () => {
      const filter = topic === 'color' ? { color } : { number };
      const turnId = randomId();
      return dispatch(giveHint({ forPlayerId, filter, turnId }));
    },
  };
};

export const ConnectedRemainingHint = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(RemainingHint);
