import React from 'react';
import PropTypes from 'prop-types';

import { ConnectedBoard } from '../containers/connectedBoard';
import { EnterTableButton } from '../containers/enterTableButton';


export const Page = ({ inGame }) => (
  inGame
    ? <ConnectedBoard />
    : <EnterTableButton>Enter Table</EnterTableButton>
);

Page.propTypes = {
  inGame: PropTypes.bool.isRequired,
};
