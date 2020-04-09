import React from "react";
import { withRouter } from "react-router-dom";
import WritingAClue from "./WritingAClue";
import WaitingForClues from "./WaitingForClues";

const WritingClues = ({ lobby, isGuesser }) => {
  if (isGuesser) {
    return <WaitingForClues />;
  } else {
    return <WritingAClue l={lobby} />;
  }
};

export default withRouter(WritingClues);
