import React, { Component } from 'react';
class Quizz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: [],
      actors: [],
      index: Math.floor(Math.random() * Math.floor(20))
    }
    this.apiKey = process.env.REACT_APP_TMDB_API,
    // this.apiKey = 'cc9affe1944340df2004885c27eab5e9',
    this.actorUrl = 'https://api.themoviedb.org/3/person/popular?api_key='
    this.movieUrl = 'https://api.themoviedb.org/3/movie/popular?api_key='
  }

  
  // get random movie
  // compare answer
  // for each good answer add 10points
  // handle next question
  // after 5 questions stop game
  // if 60seconds passed stop game
  // display score and highscore
  
  // fetch api
  // get random actor
  componentDidMount() {
    fetch(`${this.actorUrl}${this.apiKey}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        actors: data.results,
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
          if (this.state.isLoaded) {
            // ask question
            question = <h2>Did {actors[index]['name']} played in Frozen ?</h2>
          }
          // test2 = <p>{ console.log(actors) }</p>
          return(
            <div>
        { question }
      </div>
    );
  }
}

export default Quizz;