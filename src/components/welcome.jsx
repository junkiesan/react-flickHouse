import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to the quizz !</h1>
        <p>You'll be asked 5 "Yes or No" questions.</p>
        <p>Answer as many as you can in the allowed time, you have 60 seconds !</p>
        <p>Good luck ! And beware of the clock, it's broken !</p>
      </div>
    );
  }
}
export default Welcome;