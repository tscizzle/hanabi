import React, { Component } from 'react';
import PropTypes from 'prop-types';


class App extends Component {
  render() {
    return (
      <div class="app">
        <Card
          color="green"
          number={5}
        />
      </div>
    );
  }
}


export default App;


const Card = ({ color, number }) => (
  <div class="card">
    <div class="upper-card-number">
      {number}
    </div>
    <div class="lower-card-number">
      {number}
    </div>
  </div>
);

Card.propTypes = {
  color: PropTypes.string,
  number: PropTypes.number,
};


const Hand = () => {

}
