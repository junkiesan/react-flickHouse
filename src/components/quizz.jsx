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
  
  render() {
    return(
      <div>

      </div>
    );
  }
}

export default Quizz;