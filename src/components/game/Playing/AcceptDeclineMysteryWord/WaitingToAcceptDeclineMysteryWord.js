import React from "react";
import { withRouter } from "react-router-dom";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";

const WaitingToAcceptDeclineMysteryWord = () => {
  return (
    <PlayingWrapper headerText="Waiting for all players to accept the mystery word...">
      <PlayingTitle>Waiting..</PlayingTitle>
      <PlayingDescription>
        One of your teammates has not yet decided if he's going to accept the
        mystery word or not.
      </PlayingDescription>
    </PlayingWrapper>
  );
};

export default withRouter(WaitingToAcceptDeclineMysteryWord);
