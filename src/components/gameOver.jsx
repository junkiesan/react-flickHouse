import React, { Component } from 'react';

class GameOver extends Component {
  render() {
    return (
      <div>
        <h1>Game over!</h1>
        <p>Your score is { this.props.score } 👏</p>
        <button className="game_over__btn" onClick={this.props.resetGame}>Reset</button>
      </div>
    );
  }
}
export default GameOver;