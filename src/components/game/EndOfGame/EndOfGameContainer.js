import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../../helpers/layout";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Button } from "../Playing/PlayingStyle";
import RankingBox from "../../../views/RankingBox";
import Lobby from "../../shared/models/Lobby";

const Container = styled(BaseContainer)`
  padding-left: 3rem;
  color: black;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
`;

const ButtonSpacer = styled.div`
  width: 10em;
`;

class EndOfGameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: null,
      error: null
    };
    this.getLobby = this.getLobby.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  async getLobby() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies/" + this.props.match.params.id);

      if (this.state.lobby === null && response.data) {
        // make API call every 1s to get Updated lobbies List.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobby, 1000);
      }

      // Get the returned lobby and update the state.
      this.setState({ lobby: response.data, error: null });
      console.log(response);
    } catch (error) {
      this.setState({
        error:
          error && error.response
            ? error.response.data
            : error && error.message
            ? error.message
            : "Unknown error"
      });
      console.log(
        `Something went wrong while fetching the lobby: \n${handleError(error)}`
      );
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.getLobby();
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    clearInterval(this.interval);
  }

  async restartGame() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put(
        "/lobbies/" + this.state.lobby.id + "/start"
      );
      // TODO: add redirect + clear interval??
    } catch (error) {
      this.setState({
        error:
          error && error.response
            ? error.response.data
            : error && error.message
            ? error.message
            : "Unknown error"
      });
      console.log(
        `Something went wrong while restarting the game: \n${handleError(
          error
        )}`
      );
    }
  }

  render() {
    const lobby = new Lobby(this.state.lobby);
    console.log(lobby);
    return (
      this.state.lobby && (
        <React.Fragment>
          <Sidebar disabled={false} />
          <Container>
            <RankingBox lobby={lobby} />
            <ButtonContainer>
              <Button
                onClick={() => {
                  this.props.history.push("/game/lobby/" + lobby.id);
                }}
              >
                Back to Overview
              </Button>
              <ButtonSpacer />
              {lobby.creator.id == localStorage.getItem("userId") && (
                <Button
                  onClick={() => this.restartGame()}
                  background={"#44d63f"}
                >
                  Restart Game
                </Button>
              )}
            </ButtonContainer>
          </Container>
        </React.Fragment>
      )
    );
  }
}

export default withRouter(EndOfGameContainer);
