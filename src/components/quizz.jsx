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
      answer: null,
      questions: 1,
      score: 0,
      // highscore: []
    };
    this.apiKey = process.env.REACT_APP_TMDB_API,
    // this.apiKey = 'cc9affe1944340df2004885c27eab5e9',
    this.actorUrl = 'https://api.themoviedb.org/3/person/popular?api_key=',
    this.movieUrl = 'https://api.themoviedb.org/3/movie/'
    }

  // fetch api
  // get popular actors and their movies
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

  // compare answer and give points if answer's right
  checkAnswer = async (actorId, movieId) => {
    const score = this.state.score;
    await fetch(`${this.movieUrl}${movieId}/credits?api_key=${this.apiKey}`)
    .then(response => response.json())
    .then((data) => {
      // console.log(data.cast[0]['id']);
      // console.log(actorId);
      // if the actor's id from question is found in the movies'credit json
      if (data.cast.find(credit => credit.id === actorId)) {
        this.setState({ 
          // actor'id is in movie's credit json
          answer: true,
          isLoaded: true
        });
        this.refreshQuestion();
      } else {
        this.setState({ 
          // actor'id is not in movie's credit json
          answer: false,
          isLoaded: true
        });
        this.refreshQuestion();
      }
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
      );
    if (this.state.answer === this.state.userAnswer){
      // for each good answer add 10points
      let incrementedScore = score + 10;
      this.setState({ score: incrementedScore })
      // let newScore = score;
      // console.log(newScore);
      // highscore.push(newScore);
      // highscore.sort();
      // highscore[0]
    };
  }
  
  // catch event on button which takes for arguments a boolean(user answer) the displayed actor's id and movie's id 
  handleAnswer = (boolean, actorId, movieId) => {
    this.setState({
      // define user answer from boolean (true or false)
      userAnswer: boolean
    });
    // send ids to checkAnswer
    this.checkAnswer(actorId, movieId);
  }

  // give a new index to refresh data
  // handle next question
  refreshQuestion = () => {
    const questions = this.state.questions;
    // const highscore = this.state.score;
    // after 5 questions stop game
    if (questions < 6) {
      let incrementedQuestion = questions + 1;
      this.setState({
        index: Math.floor(Math.random() * Math.floor(20)),
        questions: incrementedQuestion
      }) 
    }
  }

  // if 60seconds passed stop game
  // display highscore

  render() {
    
    const { actors, movies, index, questions, score, highscore} = this.state;
  
          let question;
          let actorImage;
          let movieImage;
          let greenButton;
          let redButton;
          let questionCount;          
          let scoreCount;
          let displayHighscore;       
          
          if (this.state.isLoaded) {

            // displayHighscore = <p>Highscore: { highscore }</p>
            scoreCount = <p>Score: {score}</p>
            // duration of quizz
            if (questions < 6) {

              questionCount = <p>{questions}/5</p>
              question = <h2>Did {actors[index]['name']} play in { movies[index]['title'] } ?</h2>
              actorImage = <img src={`https://image.tmdb.org/t/p/w200` + actors[index]['profile_path']} alt={actors[index]['name']}/>
              movieImage = <img src={`https://image.tmdb.org/t/p/w200` + movies[index]['poster_path']} alt={movies[index]['title']}/>
              greenButton = <img src="assets/img/green_thumb.svg" onClick={()=>this.handleAnswer(true, actors[index]['id'], movies[index]['id'])} alt="green thumb yes"/>
              redButton = <img src="assets/img/red_thumb.svg" onClick={()=>this.handleAnswer(false, actors[index]['id'], movies[index]['id'])} alt="red thumb no"/>
            }
          }
          return(
            <div className="quizz">
              <div className="quizz__count">
                { questionCount }
              </div>
              <div className="quizz__scores">
                { scoreCount }
                {/* { displayHighscore } */}
              </div>
              { question }
              <div className="quizz__img">
                  { actorImage }
                  { movieImage }
              </div>
              <div className="quizz__btn">
                { greenButton }
                { redButton }
              </div>
            </div>
    );
  }
}

export default Quizz;