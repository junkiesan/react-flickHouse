import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import App from '../components/App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without crashing", () => {
    render(<App />, container);
  expect(container.textContent).toBe("Welcome to the quizz !You'll be asked a series of \"Yes or No\" questions. Answer as many as you can in the allowed time ! Good luck !Start");
});

