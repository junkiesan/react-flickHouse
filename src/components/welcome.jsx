import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <h1>Welcome to the quizz !</h1>
        <p>You'll be asked a series of "Yes or No" questions. Answer as many as you can in the allowed time ! </p>
        <button className="welcome__btn">Start</button>
        <p>Good luck !</p>
      </div>
    )
  }
}
export default Welcome;