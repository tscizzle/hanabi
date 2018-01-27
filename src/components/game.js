import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { FaFire, FaTint } from 'react-icons/lib/fa';

import { NewGameButton } from '../containers/newGameButton';


export const Board = ({
  players,
  deckCards,
  maxHints,
  hintsRemaining,
  playedCards,
}) => {
  const playersDisplay = _.map(players, ({ id, handCards }) => (
    <div className="player" key={id}>
      <Hand cards={handCards} />
    </div>
  ));
  return (
    <div className="board">
      <div className="players">
        {playersDisplay}
      </div>
      <div className="tabletop">
        <Deck cards={deckCards} />
        <Hints maxHints={maxHints} hintsRemaining={hintsRemaining} />
        <Stacks cards={playedCards} />
      </div>
      <NewGameButton>New Game</NewGameButton>
    </div>
  );
};

Board.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    handCards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};


const Hand = ({ cards }) => {
  const CARD_WIDTH = 90;
  const CARD_HEIGHT = CARD_WIDTH * (8 / 5);
  const SPREAD_FACTOR = 140;
  const ROTATION_PER_CARD = 10;
  const numCards = cards.length;
  const totalRotation = (numCards - 1) * ROTATION_PER_CARD;
  const startingRotation = -(totalRotation / 2);
  const cardsDisplay = _.map(cards, ({ id, color, number }, idx) => {
    const shiftToOrigin = `translateX(${-(idx * CARD_WIDTH)}px)`;
    const shiftDown = `translateY(${SPREAD_FACTOR}px)`;
    const rotation = `rotate(${startingRotation + (idx * ROTATION_PER_CARD)}deg)`;
    const spreadUp = `translateY(${-SPREAD_FACTOR}px)`;
    const transformation = `${shiftToOrigin} ${shiftDown} ${rotation} ${spreadUp}`;
    const cardStyle = { height: CARD_HEIGHT, width: CARD_WIDTH, transform: transformation };
    return (
      <FaceUpCard
        color={color}
        number={number}
        style={cardStyle}
        key={id}
      />
    );
  });
  return (
    <div className="hand">
      {cardsDisplay}
    </div>
  );
};

Hand.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
};


const Card = ({ style, children }) => (
  <div className="card" style={style}>
    {children}
  </div>
);

Card.propTypes = {
  style: PropTypes.object,
};


const FaceUpCard = ({ color, number, style }) => (
  <Card style={style}>
    <div className="card-front" style={{ color }}>
      <div className="upper-card-number"> {number} </div>
      <div className="lower-card-number"> {number} </div>
      <FaFire />
    </div>
  </Card>
);

FaceUpCard.propTypes = {
  color: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  style: PropTypes.object,
};


const FaceDownCard = ({ color, number, style }) => (
  <Card style={style}>
    <div className="card-back">
      <FaFire className="card-back-icon" />
    </div>
  </Card>
);

FaceDownCard.propTypes = {
  color: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  style: PropTypes.object,
};


const Deck = ({ cards }) => {
  const CARD_WIDTH = 90;
  const CARD_HEIGHT = CARD_WIDTH * (8 / 5);
  const cardsDisplay = _.map(cards, ({ id, color, number }, idx) => {
    const shiftToOrigin = `translateX(${-(idx * CARD_WIDTH)}px)`;
    const shiftRight = `translateX(${idx * 3}px)`;
    const transformation = `${shiftToOrigin} ${shiftRight}`;
    const cardStyle = { height: CARD_HEIGHT, width: CARD_WIDTH, transform: transformation };
    return (
      <FaceDownCard
        color={color}
        number={number}
        style={cardStyle}
        key={id}
      />
    );
  });
  return (
    <div className="deck">
      {cardsDisplay}
    </div>
  );
};

Deck.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
};


const Hints = ({ maxHints, hintsRemaining }) => {
  const hintsUsed = maxHints - hintsRemaining;
  const hintsUsedDisplay = _.times(hintsUsed, idx => <UsedHint key={idx} />);
  const hintsRemainingDisplay = _.times(hintsRemaining, idx => <RemainingHint key={idx} />);
  return (
    <div className="hints">
      {hintsUsedDisplay}
      {hintsRemainingDisplay}
    </div>
  );
};

Hints.propTypes = {
  maxHints: PropTypes.number.isRequired,
  hintsRemaining: PropTypes.number.isRequired,
};


const Hint = ({ className, children }) => {
  const hintClasses = classNames('hint', {
    [className]: Boolean(className),
  });
  return (
    <div className="hint-container">
      <div className={hintClasses}>
        {children}
      </div>
    </div>
  );
};

Hint.propTypes = {
  className: PropTypes.string,
};


const UsedHint = () => (
  <Hint className="used-hint"></Hint>
);


const RemainingHint = () => (
  <Hint className="remaining-hint">
    <FaTint />
  </Hint>
);


const Stacks = ({ cards }) => {
  const cardStacks = {};
  _.each(cards, card => {
    const { color } = card;
    cardStacks[color] = cardStacks[color] || [];
    cardStacks[color].push(card);
  });
  _.each(_.keys(cardStacks), color => {
    cardStacks[color] = _.sortBy(cardStacks[color], 'number');
  });
  const stacksDisplay = _.map(cardStacks, cards => <Stack cards={cards} />);
  return (
    <div className="stacks">
      {stacksDisplay}
    </div>
  );
};

Stacks.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
};


const Stack = ({ cards }) => {
  const cardsDisplay = _.map(cards, ({ id, color, number }, idx) => {
    const cardStyle = { position: 'absolute', top: `${idx}em` };
    return (
      <FaceUpCard
        color={color}
        number={number}
        style={cardStyle}
        key={id}
      />
    );
  });
  return (
    <div className="stack">
      {cardsDisplay}
    </div>
  );
};

Stack.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
};
