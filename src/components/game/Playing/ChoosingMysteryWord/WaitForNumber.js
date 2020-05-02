import React from "react";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";
import MysteryCard from "./MysteryCard";

const WaitForNumber = ({ l }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  return (
    <PlayingWrapper headerText="Active Player is choosing a number!">
      <PlayingTitle>Teammate</PlayingTitle>
      <PlayingDescription>
        You are not the active player.
        <PlayingDescription>
          You will try to come up with a hint for the mystery word so that the
          active Player can guess it
        </PlayingDescription>
      </PlayingDescription>
      <MysteryCard lobbyLanguage={lobby.language} lobbyId={lobby.id} />
    </PlayingWrapper>
  );
};

export default withRouter(WaitForNumber);
