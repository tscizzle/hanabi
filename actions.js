/*
 * Action Types
 */

const GIVE_HINT = 'GIVE_HINT';
const PLAY_CARD = 'PLAY_CARD';
const DISCARD_CARD = 'DISCARD_CARD';


/*
 * Action Creators
 */

const giveHint = ({ forPlayerId, color, number, turnId }) => ({
  type: GIVE_HINT,
  forPlayerId,
  color,
  number,
  turnId,
});

const playCard = ({ playerId, cardId, turnId }) => ({
  type: PLAY_CARD,
  playerId,
  cardId,
  turnId,
});

const discardCard = ({ playerId, cardId, turnId }) => ({
  type: DISCARD_CARD,
  playerId,
  cardId,
  turnId,
});


module.exports = {
  GIVE_HINT,
  PLAY_CARD,
  DISCARD_CARD,
  giveHint,
  playCard,
  discardCard,
};
