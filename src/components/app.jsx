import React, { Component } from 'react';
import Welcome from './welcome';
import Quizz from './quizz';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeComponentDisplayed: true,
      startButton: true,
      launchQuizz: false
    };
  }
  
  startQuizz = () => {
    console.log('Hello');
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
      startButton = <button className="welcome__btn" onClick={this.startQuizz}>Start</button>
    }

    let quizz;
    if (this.state.launchQuizz) {
      quizz = <Quizz />
    }
    
    return(
      <div>
        <div className="welcome">
          { welcome }
          { startButton }
          { quizz }
        </div>
      </div>
    )
  }
}

export default App;