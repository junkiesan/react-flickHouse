// import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
// import TestUtils from 'react-addons-test-utils';

import Quizz from '../components/quizz';


const setup = ( editing = false ) => {
  const props = {
    quizz: {
      answer: true,
      question: 'Did Robert Downet Jr play in Frozen?',
      score: 10
    },
  }
  const renderer = TestUtils.createRenderer()

  renderer.render(
    <Quizz {...props} />
  )

  let output = renderer.getRenderOutput()

  if (editing) {
    const label = output.props.children.props.children[1]
    label.props.onDoubleClick({})
    output = renderer.getRenderOutput()
  }

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

  it("renders a first question", () => {
    const { getByText } = render(<Quizz />, container);
    const question = getByText("Did");
    expect(question).toBeTruthy()
  });

  it("changes question after answer", () => {
    const { getByText } = render(<Quizz />, container);
    const question = getByText("Did");
    expect(question).toBeTruthy()
  });

  describe('score', () => {
    test('increase my score after a good answer', () => {
      const { score } = quizz({ score: 10 })
      quizz({ answer: true  })
      expect(score).toEqual(20)
    })
    
    test('let my score after a bad answer', () => {
      const { score } = quizz({ score: 10 })
      quizz({ answer: true  })
      expect(score).toEqual(10)
    })
  });