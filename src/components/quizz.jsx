import React, { Component } from 'react';
class Quizz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      index: Math.floor(Math.random() * Math.floor(20)),
      movies: [],
      actors: [],
    }
    this.apiKey = process.env.REACT_APP_TMDB_API,
    // this.apiKey = 'cc9affe1944340df2004885c27eab5e9',
    this.actorUrl = 'https://api.themoviedb.org/3/person/popular?api_key='
    this.movieUrl = 'https://api.themoviedb.org/3/movie/popular?api_key='
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
        // flat every movie from popular actors
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
  // for each good answer add 10points
  // handle next question
  // after 5 questions stop game
  // if 60seconds passed stop game
  // display score and highscore
  

  render() {
    
    const { actors, movies, index} = this.state;
    // const fetchActors = (actors) => {
      //   fetch(`${this.actorUrl}${this.apiKey}`)
      //   .then(response => response.json())
      //   .then(data =>{
        //     this.setState({ 
          //       isLoaded: true,
          //       actors: data.results
          //     })
          //     // console.log(data.results);
          //     // console.log(data.results.name);
          //   })
          // }
          // fetchActors(actors);
          // console.log(actors);
          
          let question;
          let test;
          let actorImage;
          let movieImage;
          if (this.state.isLoaded) {
            // ask question
            // question = <h2>Did {actors[index]['name']} played in Frozen ?</h2>
            question = <h2>Did {actors[index]['name']} played in { movies[index]['title'] } ?</h2>
            actorImage = <img src={`https://image.tmdb.org/t/p/w200` + actors[index]['profile_path']} alt={actors[index]['name']}/>
            movieImage = <img src={`https://image.tmdb.org/t/p/w200` + movies[index]['poster_path']} alt={movies[index]['title']}/>
            test = <h2>hello from { console.log(movies) }</h2>
          }
          // test2 = <p>{ console.log(actors) }</p>
          return(
            <div>
        { question }
        { test }
        { actorImage }
        { movieImage }
      </div>
    );
  }
}

export default Quizz;