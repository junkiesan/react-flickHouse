import React, { Component } from 'react';

class GameOver extends Component {
  render() {
    return (
      <div>
        <h1>Game over!</h1>
        {/* get score from Quizz parent component */}
        <p>Your score is { this.props.score } 👏</p>
        {/* get resetGame function from Quizz parent component */}
        <button className="game_over__btn" onClick={this.props.resetGame}>Retry</button>
      </div>
    );
  }
}
export default GameOver;