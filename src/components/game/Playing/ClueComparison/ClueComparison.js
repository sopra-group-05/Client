import React from "react";
import { withRouter } from "react-router-dom";
import WaitForClues from "./WaitForClues";
import CompareClues from "./CompareClues";

const ClueComparison = ({ lobby, isGuesser, nextState }) => {
  if (isGuesser) {
    return <WaitForClues l={lobby} nextState={nextState} />;
  } else {
    return <CompareClues l={lobby} nextState={nextState} />;
  }
};

export default withRouter(ClueComparison);
