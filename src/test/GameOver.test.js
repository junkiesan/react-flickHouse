import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import GameOver from '../components/gameOver';
import Quizz from '../components/quizz';


describe('countdown', () => {
  test('loose after 60seconds', () => {
    const { countdown } = gameOver({ time: 0 })
    gameOver({ resetButton: true  })
    expect(countdown).toEqual(0)
  })
  
  test('countdown launch itself after hitting retry', () => {

  })
});