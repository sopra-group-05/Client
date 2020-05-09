import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import RankingBox from "../../../views/RankingBox";
import { Button } from "../Playing/PlayingStyle";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { BaseContainer } from "../../../helpers/layout";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
`;

const Container = styled(BaseContainer)`
  padding-left: 3rem;
  color: black;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
`;

const RankingContainer = props => {
  return (
    <React.Fragment>
      <Sidebar disabled={false} />
      <Container>
        <RankingBox />
        <ButtonContainer>
          <Button
            onClick={() => {
              props.history.goBack();
            }}
          >
            Back
          </Button>
        </ButtonContainer>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(RankingContainer);
