import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar";
import OnlineUsersInvite from "./OnlineUsersInvite";
import { BaseContainer } from "../../../helpers/layout";
import LobbyContainer from "./LobbyContainer";

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  > div {
    margin: 3rem;
  }
`;

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
`;

class LobbyPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar disabled={true} />
        <Container>
          <BoxContainer>
            <LobbyContainer />
            <OnlineUsersInvite lobbyId={this.props.match.params.id} />
          </BoxContainer>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(LobbyPage);
