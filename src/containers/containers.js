import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { startNewGame } from '../actions';

import { Board } from '../components/components';
import { FloatingButton } from '../components/buttons';


const mapStateToActiveBoardProps = state => {
  const { playersById, playerOrder, cardsById } = state;
  const players = _.map(playerOrder, playerId => {
    const player = playersById[playerId];
    const cards = _.map(player.handCardIds, cardId => cardsById[cardId]);
    return {
      ...player,
      cards,
    };
  });
  return {
    players,
  };
};

export const ActiveBoard = connect(
  mapStateToActiveBoardProps,
  null
)(Board);


const mapDispatchToNewGameButtonProps = dispatch => ({
  onClick: () => dispatch(startNewGame()),
});

export const NewGameButton = connect(
  null,
  mapDispatchToNewGameButtonProps
)(FloatingButton);
