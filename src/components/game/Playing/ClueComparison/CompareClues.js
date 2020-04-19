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
import MysteryCard from "../ChoosingMysteryWord/MysteryCard";

const CompareClues = ({ l, nextState }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  return (
    <PlayingWrapper headerText="Choose clues to remove! ">
      <PlayingTitle>Teammate</PlayingTitle>
      <PlayingDescription>
        You are not the active player.
        <PlayingDescription>
          You will choose which clues to remove from the following list!
        </PlayingDescription>
      </PlayingDescription>
      <MysteryCard lobbyId={lobby.id} />
      <Countdown time={30} functionWhenDone={nextState} />
    </PlayingWrapper>
  );
};

export default withRouter(CompareClues);
