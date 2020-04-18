import React from "react";
import styled from "styled-components";
import Lobby from "../../shared/models/Lobby";
import Box from "../../../views/Box";
import { withRouter } from "react-router-dom";

const RuleList = styled.ol``;

const RuleContainer = ({ l, isShown }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  // TODO: adapt to server based rule class when implemented
  return isShown ? (
    <Box maxWidth="350px" title={"Rules"}>
      <RuleList>
        <React.Fragment>
          No identical clues are allowed (spelling mistakes count as identical)
        </React.Fragment>
        <React.Fragment>No variants from same word family</React.Fragment>
        <React.Fragment>No plural forms of other clues</React.Fragment>
        <React.Fragment>No gender variations of other clues</React.Fragment>
      </RuleList>
    </Box>
  ) : null;
};

export default withRouter(RuleContainer);
