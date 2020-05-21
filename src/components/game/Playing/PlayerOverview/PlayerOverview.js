import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import Box from "../../../../views/Box";
import PlayerInOverview from "../../../../views/PlayerInOverview";
import { Button } from "../../../../views/design/Button";
import DetectPlayerStatusChange from "./DetectPlayerStatusChange";
import GameInfo from "../../../../views/GameInfo";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2em;
`;
const ButtonSpacer = styled.div`
  width: 10em;
`;

const PlayerOverview = props => {
  const lobby = new Lobby(props.l); //transform input into Lobby Model
  const toggleShowRules = props.toggleShowRules;
  const toggleLeaveGame = props.toggleLeaveGame;
  const showHideRules = props.showHideRules ? "Hide Rules" : "Show Rules";
  const showStay = props.showStay ? "Stay" : "Leave";
  const colorStay = props.showStay ? "#44d63f" : "red";
  return (
    <Box maxWidth="350px" title={lobby.lobbyName}>
      <React.Fragment>
        <GameInfo lobby={lobby} />
        <DetectPlayerStatusChange lobby={lobby} />
        {lobby.players.map(player => {
          return (
            <PlayerInOverview player={player} lobby={lobby} key={player.id} />
          );
        })}
        <ButtonContainer>
          <Button
            colorDef={colorStay}
            width={"10em"}
            onClick={() => {
              toggleLeaveGame();
            }}
          >
            {showStay}
          </Button>
          <ButtonSpacer />
          <Button
            colorDef={"#3b85ff"}
            width={"12em"}
            onClick={() => {
              toggleShowRules();
            }}
          >
            {showHideRules}
          </Button>
        </ButtonContainer>
      </React.Fragment>
    </Box>
  );
};

export default withRouter(PlayerOverview);
