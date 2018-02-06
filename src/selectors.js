import _ from 'lodash';


export const getCurrentPlayerId = state => {
  const { game } = state;
  const { playerOrder, turnOrder } = game;
  const currentPlayerIdx = turnOrder.length % playerOrder.length;
  const currentPlayerId = playerOrder[currentPlayerIdx];
  return currentPlayerId;
};


export const getPlayers = state => {
  const { game } = state;
  const { cardsById, playersById, playerOrder } = game;
  const players = _.map(playerOrder, playerId => {
    const player = playersById[playerId];
    const handCards = _.map(player.handCardIds, cardId => cardsById[cardId]);
    return {
      ...player,
      handCards,
    };
  });
  return players;
};
