import React from "react";
import { withRouter } from "react-router-dom";
import Guessing from "./Guessing";
import WaitingForGuess from "./WaitingForGuess";

const Guess = ({ lobby, isGuesser, nextState }) => {
  if (isGuesser) {
    return <Guessing l={lobby} nextState={nextState} />;
  } else {
    return <WaitingForGuess l={lobby} nextState={nextState} />;
  }
};

export default withRouter(Guess);
