import React from "react";
import styled from "styled-components";
import Lobby from "../../shared/models/Lobby";
import Box from "../../../views/Box";
import { withRouter } from "react-router-dom";
import { Button } from "../../../views/design/Button";

const RuleList = styled.ol`
  list-style: decimal;
  padding-left: 2em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;
  width: 70%;
  margin-top: 5em;
`;

const RuleContainer = ({ l, isShown, showRules }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model

  // TODO: adapt to server based rule class when implemented
  const rules = [
    "No identical clues are allowed (spelling mistakes count as identical)",
    "No variants from same word family",
    "No plural forms of other clues",
    "No gender variations of other clues"
  ];
  return isShown ? (
    <Box maxWidth="350px" title={"Quick Rules"}>
      <RuleList>
        {rules.map(rule => {
          return <li>{rule}</li>;
        })}
      </RuleList>
      <ButtonContainer>
        <Button
          marginbottom="15px"
          colorDef={"#3b85ff"}
          onClick={() => {
            showRules();
          }}
        >
          Rules
        </Button>
      </ButtonContainer>
    </Box>
  ) : null;
};

export default withRouter(RuleContainer);
