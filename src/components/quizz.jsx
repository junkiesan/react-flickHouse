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
      userAnswer: null,
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
  checkAnswer = async (actorId, movieId) => {
    await fetch(`${this.movieUrl}${movieId}/credits?api_key=${this.apiKey}`)
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(data.id);
      // console.log(data.cast);
      // console.log(data.cast[0]['id']);
      // console.log(actorId);
    
      if (data.cast.some(credit => credit.id === actorId)) {
        this.setState({ 
          answer: true,
          isLoaded: true
        });
      } else {
        this.setState({ 
          answer: false,
          isLoaded: true
        });
      }
    },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  
  handleAnswer = (boolean, actorId, movieId) => {
    this.setState({
      userAnswer: boolean
    });
    this.checkAnswer(actorId, movieId);
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
          let message;
          let test2;
          let test;
          
          
          if (this.state.isLoaded) {
              if (this.state.answer !== null && this.state.answer === this.state.userAnswer) {
                message = <p>good answer</p>
    
              
              }else if (this.state.userAnswer !== null && this.state.answer !== this.state.userAnswer){
                message = <p>bad answer</p>
    
              }
            question = <h2>Did {actors[index]['name']} play in { movies[index]['title'] } ?</h2>
            actorImage = <img src={`https://image.tmdb.org/t/p/w200` + actors[index]['profile_path']} alt={actors[index]['name']}/>
            movieImage = <img src={`https://image.tmdb.org/t/p/w200` + movies[index]['poster_path']} alt={movies[index]['title']}/>
            greenButton = <img src="assets/img/green_thumb.svg" onClick={()=>this.handleAnswer(true, actors[index]['id'], movies[index]['id'])} alt="green thumb yes"/>
            redButton = <img src="assets/img/red_thumb.svg" onClick={()=>this.handleAnswer(false, actors[index]['id'], movies[index]['id'])} alt="red thumb no"/>
            test = <p>{console.log(actors[index]['id'])}</p>
            test2 = <p>{console.log(movies[index]['id'])}</p>
          }
          return(
            <div className="quizz">
              { question }
              <div className="quizz__img">
                { actorImage }
                { movieImage }
              </div>
              <div className="quizz__btn">
                { greenButton }
                { redButton }
                { message }
                { test }
                { test2 }
              </div>
            </div>
    );
  }
}

export default Quizz;