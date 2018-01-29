import { connect } from 'react-redux';

import { startNewGame } from '../actions';

import { FloatingButton } from '../components/niceButton';


const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(startNewGame()),
});

export const NewGameButton = connect(
  null,
  mapDispatchToProps
)(FloatingButton);
