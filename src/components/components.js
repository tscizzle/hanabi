import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FaFire } from 'react-icons/lib/fa';


export const Board = ({ players }) => {
  const playersDisplay = _.map(players, ({ id, position, cards }) => (
    <div className="player" key={id}>
      <Hand cards={cards} />
    </div>
  ));
  return (
    <div className="board">
      <div className="players">
        {playersDisplay}
      </div>
      <div className="tabletop">
        TABLETOP
      </div>
    </div>
  );
};

Board.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })).isRequired,
  })),
};


const Hand = ({ cards }) => {
  const SHIFT_PER_CARD = 70;
  const SPREAD_FACTOR = 120;
  const ROTATION_PER_CARD = 10;
  const numCards = cards.length;
  const totalRotation = (numCards - 1) * ROTATION_PER_CARD;
  const startingRotation = -(totalRotation / 2);
  const cardsDisplay = _.map(cards, ({ id, color, number }, idx) => {
    const shiftToOrigin = `translateX(${-(idx * SHIFT_PER_CARD)}px)`;
    const shiftDown = `translateY(${SPREAD_FACTOR}px)`;
    const rotation = `rotate(${startingRotation + (idx * ROTATION_PER_CARD)}deg)`;
    const spreadUp = `translateY(${-SPREAD_FACTOR}px)`;
    const transformation = `${shiftToOrigin} ${shiftDown} ${rotation} ${spreadUp}`;
    const cardStyle = { transform: transformation };
    return (
      <Card
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


const Card = ({ color, number, style }) => (
  <div className="card" style={{ ...style, color }}>
    <div className="upper-card-number">
      {number}
    </div>
    <div className="lower-card-number">
      {number}
    </div>
    <FaFire />
  </div>
);

Card.propTypes = {
  color: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  style: PropTypes.object,
};
