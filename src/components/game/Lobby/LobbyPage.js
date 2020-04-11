import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar";
import OnlineUsers from "../Dashboard/OnlineUsers";
import { BaseContainer } from "../../../helpers/layout";
import LobbyContainer from "./LobbyContainer";

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  > div {
    margin: 1rem;
  }
`;

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
`;

class LobbyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Container>
          <BoxContainer>
            <LobbyContainer />
            <OnlineUsers />
          </BoxContainer>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(LobbyPage);
