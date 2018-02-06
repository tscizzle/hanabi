import { combineReducers } from 'redux'
import _ from 'lodash';

import {
  ENTER_TABLE,
  NEW_GAME,
  GIVE_HINT,
  PLAY_CARD,
  DISCARD_CARD,
  SET_HINT_FOR_PLAYER_ID,
  SET_HINT_TOPIC,
  SET_HINT_COLOR,
  SET_HINT_NUMBER,
  OPEN_PLAY_OR_DISCARD,
  CLOSE_PLAY_OR_DISCARD,
} from './actions';
import {
  generateCards,
  HAND_SIZES,
  generatePlayers,
  getValidPlays,
} from './hanabi';


const COLORS = [ 'yellow', 'blue', 'red', 'green', 'white' ];


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


const gameInitial = () => {
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
      const { forPlayerId, filter, turnId } = action;
      const newTurn = {
        id: turnId,
        type: 'hint',
        payload: {
          forPlayerId,
          filter,
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


const playingInitial = () => ({
  hintForPlayerId: null,
  hintTopic: 'number',
  hintColor: COLORS[0],
  hintNumber: 1,
  playOrDiscardCardId: null,
});

const playing = (state = playingInitial(), action) => {
  switch (action.type) {
    case SET_HINT_FOR_PLAYER_ID: {
      const { forPlayerId } = action;
      return {
        ...state,
        hintForPlayerId: forPlayerId,
      };
    }
    case SET_HINT_TOPIC: {
      const { topic } = action;
      return {
        ...state,
        hintTopic: topic,
      };
    }
    case SET_HINT_COLOR: {
      const { color } = action;
      return {
        ...state,
        hintColor: color,
      };
    }
    case SET_HINT_NUMBER: {
      const { number } = action;
      return {
        ...state,
        hintNumber: number,
      };
    }
    case OPEN_PLAY_OR_DISCARD: {
      const { cardId } = action;
      return {
        ...state,
        playOrDiscardCardId: cardId,
      };
    }
    case CLOSE_PLAY_OR_DISCARD: {
      return {
        ...state,
        playOrDiscardCardId: null,
      };
    }
    default: {
      return state;
    }
  }
};


const mainReducer = combineReducers({
  page,
  game,
  playing,
});

export default mainReducer;
