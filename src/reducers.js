import _ from 'lodash';

import { GIVE_HINT, PLAY_CARD, DISCARD_CARD } from './actions';
import {
  generateCards,
  HAND_SIZES,
  generatePlayers,
  getValidPlays,
} from './hanabi';


const COLORS = [ 'yellow', 'blue', 'red', 'green', 'white' ];
const NUM_PLAYERS = 4;
const MAX_HINTS = 8;


const initialState = () => {
  const { cardsById, cardOrder } = generateCards({ colors: COLORS });
  const topCardIdx = HAND_SIZES[NUM_PLAYERS] * NUM_PLAYERS;
  const { playersById, playerOrder } = generatePlayers({
    numPlayers: NUM_PLAYERS,
    cardOrder,
  });
  return {
    cardsById,
    cardOrder,
    topCardIdx,
    playersById,
    playerOrder,
    hintsLeft: MAX_HINTS,
    playedCardIds: [],
    failedCardIds: [],
    discardedCardIds: [],
    turnsById: {},
    turnOrder: [],
  };
};


const mainReducer = (state = initialState(), action) => {
  switch (action.type) {
    case GIVE_HINT: {
      const { hintsLeft, turnsById, turnOrder } = state;
      const { forPlayerId, color, number, turnId } = action;
      const newHintsLeft = _.max([hintsLeft - 1, 0]);
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
        hintsLeft: newHintsLeft,
        turnsById: { ...turnsById, [turnId]: newTurn },
        turnOrder: [ ...turnOrder, turnId ],
      };
    }
    case PLAY_CARD: {
      const {
        cardsById,
        cardOrder,
        topCardIdx,
        playersById,
        playedCardIds,
        failedCardIds,
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
        colors: COLORS,
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
        hintsLeft,
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
        hintsLeft: _.min([hintsLeft + 1, MAX_HINTS]),
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


export default mainReducer;
