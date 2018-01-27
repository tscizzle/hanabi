import { connect } from 'react-redux';

import { enterTable } from '../actions';

import { FloatingButton } from '../components/buttons';


const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(enterTable()),
});

export const EnterTableButton = connect(
  null,
  mapDispatchToProps
)(FloatingButton);
