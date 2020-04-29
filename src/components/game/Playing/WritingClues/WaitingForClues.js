import React from "react";
import { withRouter } from "react-router-dom";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";

const WritingAClue = () => {
  return (
    <PlayingWrapper headerText="Waiting for Clues!">
      <PlayingTitle>Guesser</PlayingTitle>
      <PlayingDescription>
        You will be able to guess the word as soon as the other Players have
        submitted their clues!
      </PlayingDescription>
    </PlayingWrapper>
  );
};

export default withRouter(WritingAClue);
