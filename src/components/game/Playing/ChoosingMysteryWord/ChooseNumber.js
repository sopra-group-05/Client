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
import { api } from "../../../../helpers/api";

const Numbers = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ChooseNumber = ({ l, match }) => {
  const [submitted, setSubmitted] = React.useState(false);
  const numberAlert = async num => {
    if (!submitted) {
      try {
        num = num ? num : 1; // set default to one
        // make POST request to Server to choose Number
        api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
        await api.post("/lobbies/" + match.params.id + "/number", num);
        setSubmitted(true);
      } catch (error) {
        console.log(error);
        // todo proper error Handling
      }
    }
  };
  const lobby = new Lobby(l); //transform input into Lobby Model
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
      <Countdown functionWhenDone={numberAlert} time={30} />
    </PlayingWrapper>
  );
};

export default withRouter(ChooseNumber);
