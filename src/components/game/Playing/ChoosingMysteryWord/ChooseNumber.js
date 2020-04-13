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

const ChooseNumber = ({ l }) => {
  const numberAlert = num => alert("You would've chosen number " + num);
  const lobby = new Lobby(l); //transform input into Lobby Model
  const countDownOver = () =>
    alert("Countdown would be over now! Would go to next screen now.");
  return (
    <PlayingWrapper>
      <PlayingTitle>You're the active Player!</PlayingTitle>
      <PlayingDescription>
        You'll try to guess the mystery word. You have one guess.
      </PlayingDescription>
      <PlayingDescription>
        To start, click on a number one to five to select the mystery word.
      </PlayingDescription>
      <PlayingDescription>
        Your teammates will then try no come up with hints.
      </PlayingDescription>
      <Numbers>
        <BigNumber number={1} handleClick={numberAlert} />
        <BigNumber number={2} handleClick={numberAlert} />
        <BigNumber number={3} handleClick={numberAlert} />
        <BigNumber number={4} handleClick={numberAlert} />
        <BigNumber number={5} handleClick={numberAlert} />
      </Numbers>
      <Countdown functionWhenDone={countDownOver} time={10} />
    </PlayingWrapper>
  );
};

export default withRouter(ChooseNumber);
