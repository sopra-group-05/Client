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

const WritingAClue = ({ nextState }) => {
  return (
    <PlayingWrapper headerText="Waiting for Clues!">
      <PlayingTitle>Guesser</PlayingTitle>
      <PlayingDescription>
        Other Players are writing down clues and disabling invalid ones...
      </PlayingDescription>
      <Countdown functionWhenDone={nextState} time={30} />
    </PlayingWrapper>
  );
};

export default withRouter(WritingAClue);
