import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import Box from "../../../../views/Box";
import PlayerInOverview from "../../../../views/PlayerInOverview";
import { BaseContainer } from "../../../../helpers/layout";
import { Button } from "../../../../views/design/Button";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
`;
const ButtonSpacer = styled.div`
  width: 10em;
`;

const PlayerOverview = props => {
  const lobby = new Lobby(props.l); //transform input into Lobby Model
  const toggleShowRules = props.toggleShowRules;
  // todo: implement PlayerOverview.
  return (
    <Box maxWidth="350px" title={lobby.lobbyName}>
      <React.Fragment>
        {lobby.players.map(player => {
          return <PlayerInOverview player={player} lobby={lobby} />;
        })}
        <ButtonContainer>
          <Button colorDef={"red"} width={"10em"} onClick={() => {}}>
            Leave
          </Button>
          <ButtonSpacer />
          <Button
            colorDef={"#3b85ff"}
            width={"12em"}
            onClick={() => {
              toggleShowRules();
            }}
          >
            Show Rules
          </Button>
        </ButtonContainer>
      </React.Fragment>
    </Box>
  );
};

export default withRouter(PlayerOverview);
