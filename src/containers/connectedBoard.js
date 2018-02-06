import { connect } from 'react-redux';
import _ from 'lodash';

import { setHintForPlayerId } from '../actions';
import { getCurrentPlayerId, getPlayers } from '../selectors';

import { Board } from '../components/game';


const mapStateToProps = state => {
  const { game, playing } = state;
  const {
    cardsById,
    cardOrder,
    topCardIdx,
    maxHints,
    hintsRemaining,
    playedCardIds,
  } = game;
  const { hintForPlayerId } = playing;
  const currentPlayerId = getCurrentPlayerId(state);
  const players = getPlayers(state);
  const allCards = _.map(cardOrder, cardId => cardsById[cardId]);
  const deckCards = _.slice(allCards, topCardIdx);
  const playedCards = _.map(playedCardIds, cardId => cardsById[cardId]);
  return {
    currentPlayerId,
    players,
    deckCards,
    maxHints,
    hintsRemaining,
    playedCards,
    hintForPlayerId,
  };
};

const mapDispatchToProps = dispatch => ({
  setHintForPlayerId: forPlayerId => dispatch(setHintForPlayerId({ forPlayerId })),
});

export const ConnectedBoard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
