/*
Action Types
*/

// page

export const ENTER_TABLE = 'ENTER_TABLE';

// game

export const NEW_GAME = 'NEW_GAME';

export const GIVE_HINT = 'GIVE_HINT';

export const PLAY_CARD = 'PLAY_CARD';

export const DISCARD_CARD = 'DISCARD_CARD';

// playing

export const SET_HINT_FOR_PLAYER_ID = 'SET_HINT_FOR_PLAYER_ID';

export const SET_HINT_TOPIC = 'SET_HINT_TOPIC';

export const SET_HINT_COLOR = 'SET_HINT_COLOR';

export const SET_HINT_NUMBER = 'SET_HINT_NUMBER';


/*
Action Creators
*/

// page

export const enterTable = () => ({
  type: ENTER_TABLE,
});

// game

export const startNewGame = () => ({
  type: NEW_GAME,
});

export const giveHint = ({ forPlayerId, filter, turnId }) => ({
  type: GIVE_HINT,
  forPlayerId,
  filter,
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

// playing

export const setHintForPlayerId = ({ forPlayerId }) => ({
  type: SET_HINT_FOR_PLAYER_ID,
  forPlayerId,
});

export const setHintTopic = ({ topic }) => ({
  type: SET_HINT_TOPIC,
  topic,
});

export const setHintColor = ({ color }) => ({
  type: SET_HINT_COLOR,
  color,
});

export const setHintNumber = ({ number }) => ({
  type: SET_HINT_NUMBER,
  number,
});
