import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import Box from "../../../../views/Box";
import BigNumber from "./BigNumber";
import {
  PlayingContent,
  PlayingDescription,
  PlayingTitle,
  Wrapper
} from "../PlayingStyle";

const Numbers = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ChooseNumber = ({ l }) => {
  const numberAlert = num => alert("You would've chosen number " + num);
  const lobby = new Lobby(l); //transform input into Lobby Model
  return (
    <Wrapper>
      <Box hideHeader={true}>
        <PlayingContent>
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
        </PlayingContent>
      </Box>
    </Wrapper>
  );
};

export default withRouter(ChooseNumber);
