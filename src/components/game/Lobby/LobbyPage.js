import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar";
import OnlineUsers from "../Dashboard/OnlineUsers";
import { BaseContainer } from "../../../helpers/layout";
import LobbyContainer from "./LobbyContainer";
import { Button } from "../Playing/PlayingStyle";

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

  previewPlaying() {
    // todo: delete when lobby view is able to start game on its own
    this.props.history.push(
      "/game/lobby/" + this.props.match.params.id + "/game"
    );
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
        {
          // todo: delete when lobby view is able to start game on its own
        }
        <Container>
          <Button
            onClick={() => {
              this.previewPlaying();
            }}
          >
            Preview the game
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(LobbyPage);
