import React, { Component } from 'react';
import 'regenerator-runtime/runtime';

class Quizz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      index: Math.floor(Math.random() * Math.floor(20)),
      movies: [],
      actors: [],
      answer: null
    }
    this.apiKey = process.env.REACT_APP_TMDB_API,
    // this.apiKey = 'cc9affe1944340df2004885c27eab5e9',
    this.actorUrl = 'https://api.themoviedb.org/3/person/popular?api_key='
    this.movieUrl = 'https://api.themoviedb.org/3/movie/'
  }

  // fetch api
  // get random actor
  componentDidMount() {
    fetch(`${this.actorUrl}${this.apiKey}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        // get array of actors
        actors: data.results,
        // flat every famous movies from popular actors
        movies: data.results.map(result => result.known_for).flat(),
        isLoaded: true
      });
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
    )
  }

  // compare answer
  checkAnswer = async (movieId, actorId) => {
    await fetch(`${this.movieUrl}${movieId}/credits?api_key=${this.apiKey}`)
    .then(response => response.json())
    .then((data) => {
      if (data.cast.some(credit => credit.id === actorId)) {
        this.setState({ answer: true});
        console.log("RIGHT ANSWER");
      } else {
        this.setState({ answer: false});
        console.log("FALSE ANSWER");
      }
    })
  }
  
  handleAnswer = (boolean, movieId, actorId) => {
    this.setState({
      answer: boolean
    });
    this.checkAnswer(movieId, actorId);
  }
  // for each good answer add 10points
  // handle next question
  // after 5 questions stop game
  // if 60seconds passed stop game
  // display score and highscore
  

  render() {
    
    const { actors, movies, index} = this.state;
  
          let question;
          let actorImage;
          let movieImage;
          let greenButton;
          let redButton;
          if (this.state.isLoaded) {
            question = <h2>Did {actors[index]['name']} played in { movies[index]['title'] } ?</h2>
            actorImage = <img src={`https://image.tmdb.org/t/p/w200` + actors[index]['profile_path']} alt={actors[index]['name']}/>
            movieImage = <img src={`https://image.tmdb.org/t/p/w200` + movies[index]['poster_path']} alt={movies[index]['title']}/>
            greenButton = <img src="assets/img/green_thumb.svg" onClick={this.handleAnswer(true, actors[index]['id'], movies[index]['id'])} alt="green thumb yes"/>
            redButton = <img src="assets/img/red_thumb.svg" onClick={this.handleAnswer(false, actors[index]['id'], movies[index]['id'])} alt="red thumb no"/>
          }
          return(
            <div>
        { question }
        { actorImage }
        { movieImage }
        { greenButton }
        { redButton }
      </div>
    );
  }
}

export default Quizz;