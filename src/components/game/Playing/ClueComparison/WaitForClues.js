import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";
import Countdown from "../../../../views/Countdown";

const WaitForClues = ({ l, nextState }) => {
  const numberAlert = num => alert("You would've chosen number " + num);
  const lobby = new Lobby(l); //transform input into Lobby Model
  return (
    <PlayingWrapper headerText={"Waiting for Clues!"}>
      <PlayingTitle>Guesser</PlayingTitle>
      <PlayingDescription>
        Wait for your teammates to eliminate invalid clues!
      </PlayingDescription>
      <Countdown functionWhenDone={nextState} time={30} />
    </PlayingWrapper>
  );
};

export default withRouter(WaitForClues);
