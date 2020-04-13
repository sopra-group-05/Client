import React from "react";
import { withRouter } from "react-router-dom";
import Countdown from "../../../../views/Countdown";
import { PlayingWrapper } from "../PlayingStyle";

const ClueComparison = ({ lobby, isGuesser, nextState }) => {
  if (isGuesser) {
    return (
      <PlayingWrapper>
        Component for the guesser waiting for the Clue Comparison
        <Countdown functionWhenDone={nextState} />
        {
          // todo move countdown etc. to specific component
        }
      </PlayingWrapper>
    );
  } else {
    return (
      <PlayingWrapper>
        Component for the players to compare the clues
        <Countdown functionWhenDone={nextState} />
        {
          // todo move countdown etc. to specific component
        }
      </PlayingWrapper>
    );
  }
};

export default withRouter(ClueComparison);
