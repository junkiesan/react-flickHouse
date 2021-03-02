import React, { Component } from 'react';

class Quizz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      actors: []
    }
    this.apiKey = process.env.TMDB_KEY
  }

  // fetch api
  // get random actor
  // get random movie
  // ask question
  // compare answer
  // for each good answer add 10points
  // handle next question
  // after 5 questions stop game
  // if 60seconds passed stop game
  // display score and highscore
  render() {
    return(
      <div>

      </div>
    );
  }
}

export default Quizz;