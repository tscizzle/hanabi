import { connect } from 'react-redux';
import randomId from 'random-id';

import { playCard, discardCard, openPlayOrDiscard, closePlayOrDiscard } from '../actions';
import { getCurrentPlayerId } from '../selectors';

import { Card } from '../components/card';


const mapStateToProps = state => {
  const { playing } = state;
  const { playOrDiscardCardId } = playing;
  const currentPlayerId = getCurrentPlayerId(state);
  return {
    currentPlayerId,
    playOrDiscardCardId,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    currentPlayerId: playerId,
  } = stateProps;
  const { dispatch } = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    playCardFunc: cardId => {
      const turnId = randomId();
      return dispatch(playCard({ playerId, cardId, turnId }));
    },
    discardCardFunc: cardId => {
      const turnId = randomId();
      return dispatch(discardCard({ playerId, cardId, turnId }));
    },
    openPlayOrDiscardFunc: cardId => {
      return dispatch(openPlayOrDiscard({ cardId }));
    },
    closePlayOrDiscardFunc: () => {
      return dispatch(closePlayOrDiscard());
    },
  };
};

export const ConnectedCard = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Card);
