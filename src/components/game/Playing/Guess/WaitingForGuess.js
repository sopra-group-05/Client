import React from "react";
import { withRouter } from "react-router-dom";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";

const WaitingForGuess = () => {
  return (
    <PlayingWrapper headerText="Waiting for Guess!">
      <PlayingTitle>Waiting..</PlayingTitle>
      <PlayingDescription>
        Waiting for the active players's guess..
      </PlayingDescription>
    </PlayingWrapper>
  );
};

export default withRouter(WaitingForGuess);
