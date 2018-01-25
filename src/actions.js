/*
Action Types
*/

export const NEW_GAME = 'NEW_GAME';
export const GIVE_HINT = 'GIVE_HINT';
export const PLAY_CARD = 'PLAY_CARD';
export const DISCARD_CARD = 'DISCARD_CARD';


/*
Action Creators
*/

export const startNewGame = () => ({
  type: NEW_GAME,
});

export const giveHint = ({ forPlayerId, color, number, turnId }) => ({
  type: GIVE_HINT,
  forPlayerId,
  color,
  number,
  turnId,
});

export const playCard = ({ playerId, cardId, turnId }) => ({
  type: PLAY_CARD,
  playerId,
  cardId,
  turnId,
});

export const discardCard = ({ playerId, cardId, turnId }) => ({
  type: DISCARD_CARD,
  playerId,
  cardId,
  turnId,
});
