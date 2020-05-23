import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../../helpers/layout";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Button } from "../Playing/PlayingStyle";
import RankingBox from "../../../views/RankingBox";
import Lobby from "../../shared/models/Lobby";
import CancelGame from "../Playing/CancelGame/CancelGame";
import EndRound from "../Playing/EndRound/EndRound";

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
      error: null,
      gameCancelled: false
    };
    this.getLobby = this.getLobby.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.goBackToDashboard = this.goBackToDashboard.bind(this);
    this.goToGameIfRestarted = this.goToGameIfRestarted.bind(this);
  }

  async getLobby() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies/" + this.props.match.params.id);

      this.intervalID = setTimeout(this.getLobby, 1000);

      // Get the returned lobby and update the state.
      this.setState({ lobby: response.data, error: null });
      this.goToGameIfRestarted(response.data);
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
      clearTimeout(this.intervalID);
      if (
        error &&
        error.response &&
        error.response.status &&
        error.response.status == 404
      ) {
        this.setState({ gameCancelled: true });
      }
    }
  }

  goToGameIfRestarted(lobby) {
    lobby = new Lobby(lobby);
    // find your own Player
    let player = lobby.players.find(
      player => player.id == localStorage.getItem("userId")
    );
    let list = ["END_OF_TURN", "READY", "PLAYER_LEFT", "JOINED", "FINISHED"];
    if (player && !list.includes(player.status)) {
      this.props.history.push("/game/lobby/" + lobby.id + "/game");
    }
  }

  goBackToDashboard() {
    this.props.history.push("/game/dashboard");
  }

  componentDidMount() {
    this.getLobby();
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    clearTimeout(this.intervalID);
  }

  async restartGame() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put(
        "/lobbies/" + this.state.lobby.id + "/restart"
      );
      // redirect to game
      this.props.history.push("/game/lobby/" + this.state.lobby.id + "/game");
      clearTimeout(this.intervalID);
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
    return (
      <React.Fragment>
        <Sidebar disabled={true} />
        <Container>
          {this.state.lobby && !this.state.gameCancelled && (
            <React.Fragment>
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
            </React.Fragment>
          )}
          {this.state.gameCancelled && (
            <CancelGame goBackToDashboard={this.goBackToDashboard} />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(EndOfGameContainer);
