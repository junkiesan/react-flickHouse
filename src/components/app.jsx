import React, { Component } from 'react';
import Welcome from './welcome'
import Quizz from './quizz'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeComponentDisplayed: true,
      startButton: true,
      launchQuizz: false
    };
  }
  quizzStartHandler = () => {
    this.setState({
      welcomeComponentDisplayed: false,
      startButton: false,
      launchQuizz: true
    })
  }
  render() {


    let welcome;
    if (this.state.welcomeComponentDisplayed) {
      welcome = <Welcome />
    }
    let startButton;
    if (this.state.startButton) {
      startButton = <button className="welcome__btn" onClick={this.quizzStartHandler}>Start</button>
    }
    let test;
    if (this.state.launchQuizz) {
      test = <p>echo</p>
    }
    return(
      <div>
        <div className="welcome">
          { welcome }
          { startButton }
        </div>
        { test }
      </div>
    )
  }
}

export default App;