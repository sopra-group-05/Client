import React from "react";
import { withRouter } from "react-router-dom";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";

const WaitForClues = () => {
  return (
    <PlayingWrapper headerText={"Waiting for Clues!"}>
      <PlayingTitle>Guesser</PlayingTitle>
      <PlayingDescription>
        Wait for your teammates to eliminate invalid clues!
      </PlayingDescription>
    </PlayingWrapper>
  );
};

export default withRouter(WaitForClues);
