import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { FaFire } from 'react-icons/lib/fa';

import { UsedHint } from './hint';
import { ConnectedHintInputs } from '../containers/connectedHintInputs';
import { ConnectedCard } from '../containers/connectedCard';
import { ConnectedRemainingHint } from '../containers/connectedRemainingHint';
import { NewGameButton } from '../containers/newGameButton';


export const Board = ({
  currentPlayerId,
  players,
  deckCards,
  maxHints,
  hintsRemaining,
  playedCards,
  hintForPlayerId,
  setHintForPlayerId,
}) => {
  const playersDisplay = _.map(players, ({ id: playerId, handCards }) => {
    const isCurrentPlayer = playerId === currentPlayerId;
    const playerClasses = classNames('player', {
      'current-player': isCurrentPlayer,
    });
    const playerStyle = playerId === hintForPlayerId ? { backgroundColor: 'red' } : {};
    const onClickPlayer = () => {
      if (!isCurrentPlayer) {
        return setHintForPlayerId(playerId);
      }
    };
    return (
      <div
        className={playerClasses}
        style={playerStyle}
        onClick={onClickPlayer}
        key={playerId}
      >
        <Hand
          playerId={playerId}
          cards={handCards}
          faceDown={isCurrentPlayer}
        />
      </div>
    );
  });
  return (
    <div className="board">
      <div className="players">
        {playersDisplay}
      </div>
      <div className="tabletop">
        <Deck cards={deckCards} />
        <Hints
          maxHints={maxHints}
          hintsRemaining={hintsRemaining}
        />
        <ConnectedHintInputs />
        <Stacks cards={playedCards} />
      </div>
      <NewGameButton>New Game</NewGameButton>
    </div>
  );
};

Board.propTypes = {
  currentPlayerId: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    handCards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  deckCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
  maxHints: PropTypes.number.isRequired,
  hintsRemaining: PropTypes.number.isRequired,
  playedCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
  hintForPlayerId: PropTypes.string,
  setHintForPlayerId: PropTypes.func.isRequired,
};


const Hand = ({ playerId, cards, faceDown }) => {
  const CARD_WIDTH = 90;
  const CARD_HEIGHT = CARD_WIDTH * (8 / 5);
  const SPREAD_FACTOR = 140;
  const ROTATION_PER_CARD = 10;
  const numCards = cards.length;
  const totalRotation = (numCards - 1) * ROTATION_PER_CARD;
  const startingRotation = -(totalRotation / 2);
  const cardsDisplay = _.map(cards, ({ id: cardId, color, number }, idx) => {
    const shiftToOrigin = `translateX(${-(idx * CARD_WIDTH)}px)`;
    const shiftDown = `translateY(${SPREAD_FACTOR}px)`;
    const rotation = `rotate(${startingRotation + (idx * ROTATION_PER_CARD)}deg)`;
    const spreadUp = `translateY(${-SPREAD_FACTOR}px)`;
    const transformation = `${shiftToOrigin} ${shiftDown} ${rotation} ${spreadUp}`;
    const cardStyle = { height: CARD_HEIGHT, width: CARD_WIDTH, transform: transformation };
    const cardComponent = faceDown ? FaceDownCard : FaceUpCard;
    return createElement(cardComponent, {
      cardId,
      color,
      number,
      inHandOfPlayerId: playerId,
      style: cardStyle,
      key: cardId,
    });
  });
  return (
    <div className="hand">
      {cardsDisplay}
    </div>
  );
};

Hand.propTypes = {
  playerId: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  })).isRequired,
  faceDown: PropTypes.bool,
};


const FaceUpCard = ({ cardId, color, number, inHandOfPlayerId, style }) => (
  <ConnectedCard
    cardId={cardId}
    inHandOfPlayerId={inHandOfPlayerId}
    style={style}
  >
    <div className="card-front" style={{ color }}>
      <div className="upper-card-number"> {number} </div>
      <div className="lower-card-number"> {number} </div>
      <FaFire />
    </div>
  </ConnectedCard>
);

FaceUpCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  inHandOfPlayerId: PropTypes.string,
  style: PropTypes.object,
};


const FaceDownCard = ({ cardId, inHandOfPlayerId, style }) => (
  <ConnectedCard
    cardId={cardId}
    inHandOfPlayerId={inHandOfPlayerId}
    style={style}
  >
    <div className="card-back">
      <FaFire className="card-back-icon" />
    </div>
  </ConnectedCard>
);

FaceDownCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  inHandOfPlayerId: PropTypes.string,
  style: PropTypes.object,
};


const Deck = ({ cards }) => {
  const CARD_WIDTH = 90;
  const CARD_HEIGHT = CARD_WIDTH * (8 / 5);
  const cardsDisplay = _.map(cards, ({ id: cardId, color, number }, idx) => {
    const shiftToOrigin = `translateX(${-(idx * CARD_WIDTH)}px)`;
    const shiftRight = `translateX(${idx * 3}px)`;
    const transformation = `${shiftToOrigin} ${shiftRight}`;
    const cardStyle = { height: CARD_HEIGHT, width: CARD_WIDTH, transform: transformation };
    return (
      <FaceDownCard
        cardId={cardId}
        color={color}
        number={number}
        style={cardStyle}
        key={cardId}
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
  const hintsDisplay = _.times(maxHints, idx =>
    idx >= hintsUsed
      ? <ConnectedRemainingHint key={idx} />
      : <UsedHint key={idx} />
  );
  return (
    <div className="hints">
      {hintsDisplay}
    </div>
  );
};

Hints.propTypes = {
  maxHints: PropTypes.number.isRequired,
  hintsRemaining: PropTypes.number.isRequired,
};


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
  const stacksDisplay = _.map(cardStacks, (cards, color) => (
    <Stack
      cards={cards}
      key={color}
    />
  ));
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
  const cardsDisplay = _.map(cards, ({ id: cardId, color, number }, idx) => {
    const CARD_WIDTH = 90;
    const CARD_HEIGHT = CARD_WIDTH * (8 / 5);
    const shiftUp = `translateY(calc(-${CARD_HEIGHT}px + 1em))`;
    const transformation = `${shiftUp}`;
    const cardStyle = { marginTop: `calc(-${CARD_HEIGHT}px + ${idx}em)` };
    return (
      <FaceUpCard
        cardId={cardId}
        color={color}
        number={number}
        style={cardStyle}
        key={cardId}
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
