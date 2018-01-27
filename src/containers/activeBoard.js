import { connect } from 'react-redux';
import _ from 'lodash';

import { Board } from '../components/game';


const mapStateToProps = state => {
  const { game } = state;
  const {
    cardsById,
    cardOrder,
    topCardIdx,
    playersById,
    playerOrder,
    maxHints,
    hintsRemaining,
    playedCardIds,
  } = game;
  const players = _.map(playerOrder, playerId => {
    const player = playersById[playerId];
    const handCards = _.map(player.handCardIds, cardId => cardsById[cardId]);
    return {
      ...player,
      handCards,
    };
  });
  const allCards = _.map(cardOrder, cardId => cardsById[cardId]);
  const deckCards = _.slice(allCards, topCardIdx);
  const playedCards = _.map(playedCardIds, cardId => cardsById[cardId]);
  return {
    players,
    deckCards,
    maxHints,
    hintsRemaining,
    playedCards,
  };
};

export const ActiveBoard = connect(
  mapStateToProps,
)(Board);
