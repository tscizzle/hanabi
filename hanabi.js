const randomId = require('random-id');
const _ = require('lodash');


const REPEATS_PER_CARD = {
  1: 3,
  2: 2,
  3: 2,
  4: 2,
  5: 1,
};

const generateCards = ({ colors }) => {
  const cardsById = {};
  let cardOrder = [];
  _.each(colors, color => {
    _.each(_.range(1, 6), number => {
      const repeats = REPEATS_PER_CARD[number];
      _.times(repeats, () => {
        const id = randomId();
        const card = {
          id,
          color,
          number,
        };
        cardsById[id] = card;
        cardOrder.push(id);
      });
    });
  });
  cardOrder = _.shuffle(cardOrder);
  return {
    cardsById,
    cardOrder,
  };
};

const HAND_SIZES = {
  2: 5,
  3: 5,
  4: 4,
};

const generatePlayers = ({ numPlayers, cardOrder }) => {
  const handSize = HAND_SIZES[numPlayers];
  const playersById = {};
  const playerOrder = [];
  _.times(numPlayers, position => {
    const id = randomId();
    const handCardIds = cardOrder.slice(
      position * handSize,
      (position + 1) * handSize
    );
    const player = {
      id,
      position,
      handCardIds,
    };
    playersById[id] = player;
    playerOrder.push(id);
  });
  return {
    playersById,
    playerOrder,
  };
};

const getHintMatches = function({
  forPlayerId,
  color,
  number,
  cardsById,
  playersById,
}) {
  /* Must specify exactly one of `color` or `number` */
  const player = playersById[forPlayerId];
  const { handCardIds } = player;
  const handCards = _.map(handCardIds, cardId => cardsById[cardId]);
  const filter = !_.isUndefined(color) ? { color } : { number };
  const matchingCards = _.filter(handCards, filter);
  const matchingCardIds = _.map(matchingCards, 'id');
  return {
    color,
    number,
    matchingCardIds,
  };
};

const getValidPlays = function({ cardsById, playedCardIds, colors }) {
  const playedCards = _.map(playedCardIds, cardId => cardsById[cardId]);
  const cards = _.values(cardsById);
  const validPlays = [];
  _.each(colors, color => {
    const numbersPlayed = _.map(_.filter(playedCards, { color }), 'number');
    const lastNumberPlayed = _.max(numbersPlayed) || 0;
    const number = lastNumberPlayed + 1;
    if (number <= 5) {
      validPlays.push(..._.map(_.filter(cards, { color, number }), 'id'));
    }
  });
  return validPlays;
};


/*
EXPORT
*/

module.exports = {
  REPEATS_PER_CARD,
  generateCards,
  HAND_SIZES,
  generatePlayers,
  getHintMatches,
  getValidPlays,
};
