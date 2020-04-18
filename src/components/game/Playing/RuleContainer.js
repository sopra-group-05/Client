import React from "react";
import styled from "styled-components";
import Lobby from "../../shared/models/Lobby";
import Box from "../../../views/Box";
import { withRouter } from "react-router-dom";

const RuleList = styled.ol`
  list-style: none;
  padding: 0;
`;

const RuleContainer = ({ l, isShown }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  // TODO: adapt to server based rule class when implemented
  const rules = [
    "No identical clues are allowed (spelling mistakes count as identical)",
    "No variants from same word family",
    "No plural forms of other clues",
    "No gender variations of other clues"
  ];
  return isShown ? (
    <Box maxWidth="350px" title={"Rules"}>
      <RuleList>
        {rules.map(rule => {
          return <p>{rule}</p>;
        })}
      </RuleList>
    </Box>
  ) : null;
};

export default withRouter(RuleContainer);
