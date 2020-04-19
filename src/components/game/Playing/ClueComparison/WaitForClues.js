import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import BigNumber from "./BigNumber";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";
import Countdown from "../../../../views/Countdown";

const Numbers = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const WaitForClues = ({ l, nextState }) => {
  const numberAlert = num => alert("You would've chosen number " + num);
  const lobby = new Lobby(l); //transform input into Lobby Model
  return (
    <PlayingWrapper>
      <PlayingTitle>You're the active Player!</PlayingTitle>
      <PlayingDescription>
        You'll try to guess the mystery word. You have one guess.
      </PlayingDescription>
      <PlayingDescription>
        Wait for your teammates to eliminate invalid clues!
      </PlayingDescription>
      <Numbers>
        <BigNumber number={1} handleClick={numberAlert} />
        <BigNumber number={2} handleClick={numberAlert} />
        <BigNumber number={3} handleClick={numberAlert} />
        <BigNumber number={4} handleClick={numberAlert} />
        <BigNumber number={5} handleClick={numberAlert} />
      </Numbers>
      <Countdown functionWhenDone={nextState} time={30} />
    </PlayingWrapper>
  );
};

export default withRouter(WaitForClues);
