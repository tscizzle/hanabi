import React from 'react';
import PropTypes from 'prop-types';

import { NiceButton } from '../components/niceButton';


export const Card = ({
  cardId,
  inHandOfPlayerId,
  style,
  currentPlayerId,
  playOrDiscardCardId,
  playCardFunc,
  discardCardFunc,
  openPlayOrDiscardFunc,
  closePlayOrDiscardFunc,
  children,
}) => {
  const isCurrentPlayer = inHandOfPlayerId === currentPlayerId;
  const isPlayOrDiscardCard = cardId === playOrDiscardCardId;
  const onClick = () => {
    if (isCurrentPlayer) {
      if (!isPlayOrDiscardCard) {
        return openPlayOrDiscardFunc(cardId);
      } else {
        return openPlayOrDiscardFunc(null);
      }
    }
  };
  return (
    <div
      className="card"
      onClick={onClick}
      style={style}
    >
      {children}
      {isPlayOrDiscardCard &&
        <PlayOrDiscard
          cardId={cardId}
          playCardFunc={playCardFunc}
          discardCardFunc={discardCardFunc}
          closePlayOrDiscardFunc={closePlayOrDiscardFunc}
        />
      }
    </div>
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
  inHandOfPlayerId: PropTypes.string,
  style: PropTypes.object,
  currentPlayerId: PropTypes.string,
  playOrDiscardCardId: PropTypes.string,
  playCardFunc: PropTypes.func.isRequired,
  discardCardFunc: PropTypes.func.isRequired,
  openPlayOrDiscardFunc: PropTypes.func.isRequired,
  closePlayOrDiscardFunc: PropTypes.func.isRequired,
};


const PlayOrDiscard = ({ cardId, playCardFunc, discardCardFunc, closePlayOrDiscardFunc }) => (
  <div className="play-or-discard">
    <NiceButton onClick={() => playCardFunc(cardId)}>
      Play
    </NiceButton>
    <NiceButton onClick={() => discardCardFunc(cardId)}>
      Discard
    </NiceButton>
    <a onClick={closePlayOrDiscardFunc}>
      Close
    </a>
  </div>
);

PlayOrDiscard.propTypes = {
  playCardFunc: PropTypes.func.isRequired,
  discardCardFunc: PropTypes.func.isRequired,
  closePlayOrDiscardFunc: PropTypes.func.isRequired,
};
