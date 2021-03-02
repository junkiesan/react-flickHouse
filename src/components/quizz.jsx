import React, { Component } from 'react';
console.log(process.env.REACT_APP_TMDB_API);
class Quizz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      actors: []
    }
    this.apiKey = process.env.REACT_APP_TMDB_API,
    // this.apiKey = 'cc9affe1944340df2004885c27eab5e9',
    this.actorUrl = 'https://api.themoviedb.org/3/person/popular?api_key='
    this.movieUrl = 'https://api.themoviedb.org/3/movie/popular?api_key='
  }

  // fetch api
  // fetchTheMovieDatabase() {
  //   fetch(`${this.actorUrl}${this.apiKey}`)
  //   .then(response => response.json())
  //   .then(data =>{
  //     console.log(data.results);
  //   })
  // }
  // get random actor
  // get random movie
  // ask question
  // compare answer
  // for each good answer add 10points
  // handle next question
  // after 5 questions stop game
  // if 60seconds passed stop game
  // display score and highscore

  // componentDidMount() {
  //   // fetch(`${this.actorUrl}${this.apiKey}`)
  //   fetch(`${this.actorUrl}cc9affe1944340df2004885c27eab5e9`)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           items: result.items
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }
  render() {
    const fetchActors = (actors) => {
      fetch(`${this.actorUrl}${this.apiKey}`)
      .then(response => response.json())
      .then(data =>{
        console.log(data.results);
        // console.log(data.results.name);
      })
    }
    const actors = [];
    fetchActors(actors);
    console.log(actors);

    return(
      <div>

      </div>
    );
  }
}

export default Quizz;