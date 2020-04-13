import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import Box from "../../../../views/Box";

const PlayerOverview = ({ l }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  // todo: implement PlayerOverview.
  return (
    <Box maxWidth="350px" title={lobby.lobbyName}>
      {JSON.stringify(lobby, null, 2)}
    </Box>
  );
};

export default withRouter(PlayerOverview);
