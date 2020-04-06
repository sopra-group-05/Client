import React from "react";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import Box from "../../../../views/Box";
import {
  PlayingContent,
  PlayingDescription,
  PlayingTitle,
  Wrapper
} from "../PlayingStyle";
import MysteryCard from "./MysteryCard";

const WaitForNumber = ({ l }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  return (
    <Wrapper>
      <Box hideHeader={true}>
        <PlayingContent>
          <PlayingTitle>Teammate</PlayingTitle>
          <PlayingDescription>
            You will try to come up with a hint for the mystery word so that the
            active Player can guess it.
          </PlayingDescription>
          <MysteryCard lobbyId={lobby.id} />
        </PlayingContent>
      </Box>
    </Wrapper>
  );
};

export default withRouter(WaitForNumber);
