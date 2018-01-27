import { combineReducers } from 'redux'
import _ from 'lodash';

import {
  ENTER_TABLE,
  NEW_GAME,
  GIVE_HINT,
  PLAY_CARD,
  DISCARD_CARD,
} from './actions';
import {
  generateCards,
  HAND_SIZES,
  generatePlayers,
  getValidPlays,
} from './hanabi';


const gameInitial = () => {
  const COLORS = [ 'yellow', 'blue', 'red', 'green', 'white' ];
  const NUM_PLAYERS = 3;
  const MAX_HINTS = 8;
  const { cardsById, cardOrder } = generateCards({ colors: COLORS });
  const topCardIdx = HAND_SIZES[NUM_PLAYERS] * NUM_PLAYERS;
  const { playersById, playerOrder } = generatePlayers({
    numPlayers: NUM_PLAYERS,
    cardOrder,
  });
  return {
    colors: COLORS,
    cardsById,
    cardOrder,
    topCardIdx,
    playersById,
    playerOrder,
    maxHints: MAX_HINTS,
    hintsRemaining: MAX_HINTS,
    playedCardIds: [],
    failedCardIds: [],
    discardedCardIds: [],
    turnsById: {},
    turnOrder: [],
  };
};


const game = (state = gameInitial(), action) => {
  switch (action.type) {
    case NEW_GAME: {
      return gameInitial();
    }
    case GIVE_HINT: {
      const { hintsRemaining, turnsById, turnOrder } = state;
      const { forPlayerId, color, number, turnId } = action;
      const newTurn = {
        id: turnId,
        type: 'hint',
        payload: {
          forPlayerId,
          color,
          number,
        },
      };
      return {
        ...state,
        hintsRemaining: _.max([hintsRemaining - 1, 0]),
        turnsById: { ...turnsById, [turnId]: newTurn },
        turnOrder: [ ...turnOrder, turnId ],
      };
    }
    case PLAY_CARD: {
      const {
        colors,
        cardsById,
        cardOrder,
        topCardIdx,
        playersById,
        playedCardIds,
        turnsById,
        turnOrder,
      } = state;
      const { playerId, cardId, turnId } = action;
      const drawnCardId = cardOrder[topCardIdx];
      const player = playersById[playerId];
      const { handCardIds } = player;
      const newHandCardIds = [
        drawnCardId,
        ..._.without(handCardIds, cardId),
      ];
      const newPlayer = {
        ...player,
        handCardIds: newHandCardIds,
      };
      const validPlays = getValidPlays({
        cardsById,
        playedCardIds,
        colors,
      });
      const updateField = _.includes(validPlays, cardId)
        ? 'playedCardIds'
        : 'failedCardIds';
      const newTurn = {
        id: turnId,
        type: 'play',
        payload: {
          playerId,
          cardId,
        },
      };
      return {
        ...state,
        topCardIdx: topCardIdx + 1,
        playersById: { ...playersById, [playerId]: newPlayer },
        [updateField]: [ ...state[updateField], cardId ],
        turnsById: { ...turnsById, [turnId]: newTurn },
        turnOrder: [ ...turnOrder, turnId ],
      };
    }
    case DISCARD_CARD: {
      const {
        cardOrder,
        topCardIdx,
        playersById,
        maxHints,
        hintsRemaining,
        discardedCardIds,
        turnsById,
        turnOrder,
      } = state;
      const { playerId, cardId, turnId } = action;
      const drawnCardId = cardOrder[topCardIdx];
      const player = playersById[playerId];
      const { handCardIds } = player;
      const newHandCardIds = [
        drawnCardId,
        ..._.without(handCardIds, cardId),
      ];
      const newPlayer = {
        ...player,
        handCardIds: newHandCardIds,
      };
      const newTurn = {
        id: turnId,
        type: 'discard',
        payload: {
          playerId,
          cardId,
        },
      };
      return {
        ...state,
        topCardIdx: topCardIdx + 1,
        playersById: { ...playersById, [playerId]: newPlayer },
        hintsRemaining: _.min([hintsRemaining + 1, maxHints]),
        discardedCardIds: [ ...discardedCardIds, cardId ],
        turnsById: { ...turnsById, [turnId]: newTurn },
        turnOrder: [ ...turnOrder, turnId ],
      };
    }
    default: {
      return state;
    }
  }
};


const pageInitial = () => ({
  inGame: false,
});

const page = (state = pageInitial(), action) => {
  switch (action.type) {
    case ENTER_TABLE: {
      return {
        ...state,
        inGame: true,
      };
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  game,
  page,
});
