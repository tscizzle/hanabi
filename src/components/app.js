import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FaFire } from 'react-icons/lib/fa';


const fakePlayers = [
  {
    id: 0,
    position: 0,
    cards: [
      { id: 0, color: 'red', number: 1 },
      { id: 1, color: 'green', number: 5 },
      { id: 2, color: 'red', number: 3 },
      { id: 3, color: 'yellow', number: 1 },
      { id: 4, color: 'blue', number: 2 },
    ],
  },
  {
    id: 1,
    position: 1,
    cards: [
      { id: 5, color: 'white', number: 1 },
      { id: 6, color: 'yellow', number: 2 },
      { id: 7, color: 'blue', number: 2 },
      { id: 8, color: 'red', number: 4 },
      { id: 9, color: 'yellow', number: 5 },
    ],
  },
  {
    id: 2,
    position: 2,
    cards: [
      { id: 10, color: 'blue', number: 2 },
      { id: 11, color: 'green', number: 4 },
      { id: 12, color: 'yellow', number: 1 },
      { id: 13, color: 'blue', number: 2 },
      { id: 14, color: 'white', number: 3 },
    ],
  },
  {
    id: 3,
    position: 3,
    cards: [
      { id: 15, color: 'white', number: 5 },
      { id: 16, color: 'yellow', number: 1 },
      { id: 17, color: 'blue', number: 3 },
      { id: 18, color: 'blue', number: 3 },
      { id: 19, color: 'red', number: 4 },
    ],
  },
];


class App extends Component {
  render() {
    return (
      <div className="app">
        <Board players={fakePlayers} />
      </div>
    );
  }
}


export default App;


const Board = ({ players }) => {
  const numPlayers = players.length;
  const playerStylesMap = {
    2: [{ top: '200px', left: '100px' }, { top: '200px', right: '100px' }],
    3: [{ top: '100px', left: '100px' }, { top: '100px', right: '100px' }, { left: '0', right: '0', margin: '0 auto' }],
    4: [{ top: '100px', left: '100px' }, { top: '100px', right: '100px' }, { right: '100px', bottom: '100px' }, { bottom: '100px', left: '100px' }],
  };
  const playerStyles = playerStylesMap[numPlayers];
  const playersDisplay = _.map(players, ({ id, position, cards }) => (
    <Hand
      cards={cards}
      style={playerStyles[position]}
      key={id}
    />
  ));
  return (
    <div className="board">
      {playersDisplay}
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


const Hand = ({ cards, style }) => {
  const SPREAD_FACTOR = 100;
  const HORIZONTAL_SPREAD = 20;
  const ROTATION_PER_CARD = 10;
  const numCards = cards.length;
  const totalRotation = (numCards - 1) * ROTATION_PER_CARD;
  const startingRotation = -(totalRotation / 2);
  const cardsDisplay = _.map(cards, ({ id, color, number }, idx) => {
    const shiftDown = `translateY(${SPREAD_FACTOR}px)`;
    const horizontalSpread = `translateX(${idx * HORIZONTAL_SPREAD}px)`;
    const rotation = `rotate(${startingRotation + (idx * ROTATION_PER_CARD)}deg)`;
    const spreadUp = `translateY(${-SPREAD_FACTOR}px)`;
    const transformation = `${shiftDown} ${horizontalSpread} ${rotation} ${spreadUp}`;
    return (
      <Card
        color={color}
        number={number}
        style={{ position: 'absolute', transform: transformation }}
        key={id}
      />
    );
  });
  return (
    <div className="hand" style={style}>
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
  style: PropTypes.object,
};


const Card = ({ color, number, style }) => (
  <div className="card" style={{ ...style, color }}>
    <div className="upper-card-number">
      {number}
    </div>
    <div className="lower-card-number">
      {number}
    </div>
    <FaFire className="card-icon" />
  </div>
);

Card.propTypes = {
  color: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  style: PropTypes.object,
};
