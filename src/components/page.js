import React from 'react';
import PropTypes from 'prop-types';

import { ActiveBoard } from '../containers/activeBoard';
import { EnterTableButton } from '../containers/enterTableButton';


export const Page = ({ inGame }) => (
  inGame
    ? <ActiveBoard />
    : <EnterTableButton>Enter Table</EnterTableButton>
);

Page.propTypes = {
  inGame: PropTypes.bool.isRequired,
};
