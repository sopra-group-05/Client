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
import EndRoundContent from "./EndRoundContent";

const DeckOverview = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const DeckContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
`;

const DeckTitle = styled.div`
  display: flex;
  font-size: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const DeckCount = styled.span`
  font-size: 4rem;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10%;
  display: block;
  padding: 0rem 1.5rem;
  margin: 1rem;
  cursor: pointer;
  color: ${props => (props.color ? props.color : "yellow")};
`;
//TODO: Replace hard coded deck counts with real numbers
//TODO: Add button to start with next round

const EndRound = ({ lobby, isGuesser, nextState }) => {
  const l = new Lobby(lobby); //transform input into Lobby Model
  const player = l.players.find(x => x.role == "GUESSER");

  return (
    <PlayingWrapper>
      <PlayingTitle> Round is over </PlayingTitle>
      <EndRoundContent user={player.username} lobbyId={lobby.id} />
      <Countdown functionWhenDone={nextState} time={30} />
    </PlayingWrapper>
  );
};

export default withRouter(EndRound);
