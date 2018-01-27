import { connect } from 'react-redux';

import { Page } from '../components/page';


const mapStateToProps = state => {
  const { page } = state;
  const { inGame } = page;
  return {
    inGame,
  };
};

export const ViewedPage = connect(
  mapStateToProps,
)(Page);
