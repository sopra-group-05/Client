import React from "react";
import { withRouter } from "react-router-dom";
import WritingAClue from "./WritingAClue";
import WaitingForClues from "./WaitingForClues";

const WritingClues = ({ lobby, isGuesser, nextState }) => {
  if (isGuesser) {
    return <WaitingForClues nextState={nextState} />;
  } else {
    return <WritingAClue l={lobby} nextState={nextState} />;
  }
};

export default withRouter(WritingClues);
