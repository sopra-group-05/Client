import React from "react";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";
import styled from "styled-components";
import Countdown from "../../../../views/Countdown";

const WaitingForGuess = ({ nextState }) => {
  return (
    <PlayingWrapper headerText="Waiting for Guess!">
      <PlayingTitle>Waiting..</PlayingTitle>
      <PlayingDescription>
        Text Text show all the clues etc..
      </PlayingDescription>
    </PlayingWrapper>
  );
};

export default withRouter(WaitingForGuess);
