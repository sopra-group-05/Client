import React from "react";
import styled from "styled-components";
import Lobby from "../../shared/models/Lobby";
import Box from "../../../views/Box";
import { withRouter } from "react-router-dom";
import { Button } from "../../../views/design/Button";

const LeaveMsg = styled.div` 
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 70%;
  margin-top: 1em;
`;

const LeaveContainer = ({ isShown, leave }) => {

  const leaveMessage =
    "Are you sure that you want to quit the game? " +
    "If you leave and there are less than three real players left," +
    " the lobby will automatically close."
  ;
  return isShown ? (
      <Box maxWidth="350px" title={"Really?"}>
        <Container>
          <LeaveMsg>
            {leaveMessage}
          </LeaveMsg>
          <ButtonContainer>
            <Button
                marginbottom="15px"
                colorDef={"red"}
                onClick={() => {
                  leave();
                }}
            >
              Leave
            </Button>
          </ButtonContainer>
        </Container>
      </Box>
  ) : null;
};

export default withRouter(LeaveContainer);
