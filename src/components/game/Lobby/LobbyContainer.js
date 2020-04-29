import React from "react";
import styled from "styled-components";
import Lobby from "../../shared/models/Lobby";
import Box from "../../../views/Box";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";
import PlayerInLobby from "../../../views/PlayerInLobby";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import { Button } from "../Playing/PlayingStyle";
import Countdown from "../../../views/Countdown";
import BotInLobby from "../../../views/BotInLobby";

const PlayerStatus = styled.div`
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: inline-flex;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const CheckBox = styled.div`
  height: 25px;
  width: 25px;
  background: #353a49;
  border-radius: 25%;
  display: block;
  margin-right: 0.75rem;
`;

const CheckboxTick = styled.div`
  visibility: ${props => (props.checked ? "visible" : "hidden")};
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 25%;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(45deg);
  :before {
    content: "";
    position: absolute;
    width: 5px;
    height: 12px;
    background-color: #3bff65;
    left: 12px;
    top: 6px;
  }
  :after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #3bff65;
    left: 8px;
    top: 13px;
  }
`;

const Players = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: null,
      nonCreators: null,
      playerStatus: false,
      lobbyReady: false,
      error: null
    };
    this.getLobby = this.getLobby.bind(this);
    this.getNonCreator = this.getNonCreator.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.startGame = this.startGame.bind(this);
    this.leaveLobby = this.leaveLobby.bind(this);
    //this.previewPlaying = this.previewPlaying.bind(this);
  }

  async getLobby() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request

      const response = await api.get("/lobbies/" + this.props.match.params.id);
      const l = new Lobby(response.data);

      if (l.lobbyStatus != "WAITING") {
        // automatically redirect to game when lobby status changes!
        this.redirectToGame(l.id);
      }
      if (this.state.lobby === null && response.data) {
        // make API call every 1s to get Updated Lobby.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobby, 1000);
      }

      // Get the returned lobby and update the state.
      this.setState({
        lobby: l,
        nonCreators: this.getNonCreator(l),
        lobbyReady: this.isLobbyReady(l),
        error: null
      });
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while fetching the lobby: \n${handleError(error)}`
      );
      clearInterval(this.interval);
      this.props.history.push("/game/");
    }
  }

  isLobbyReady(lobby) {
    // return true when lobby is ready e.g. all players have status ready and there are at least 4 players
    lobby = new Lobby(lobby);
    console.log(lobby);
    let allReady = true;
    lobby.players.forEach(player => {
      if (player.status != "READY") {
        allReady = false;
      }
    });
    return lobby.players.length >= 2 ? allReady : false;
  }

  redirectToGame(lobbyID) {
    this.props.history.push("/game/lobby/" + lobbyID + "/game");
  }

  async startGame() {
    console.log("Start Game");
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put(
        "/lobbies/" + this.state.lobby.id + "/start"
      );
      console.log(response);
    } catch (error) {
      this.setState({
        error: error ? error.message : "Unknown error"
      });
      console.log(
        `Something went wrong while starting the game: \n${handleError(error)}`
      );
    }
  }

  async leaveLobby() {
    try {
      // lets player leave via put request
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      // set appropriate URL
      const url_start = "lobbies/" + this.state.lobby.id;
      const playerId = localStorage.getItem("userId");
      const isCreator = this.state.lobby.creator.id == playerId;
      const url = isCreator ? url_start + "/terminate" : url_start + "/leave";
      const response = await api.put(url);
      console.log(response);
      this.props.history.push("/game");
    } catch (error) {
      this.setState({
        error: error ? error.message : "Unknown error"
      });
      console.log(
        `Something went wrong while leaving: \n${handleError(error)}`
      );
    }
  }

  /*  previewPlaying() {
    this.props.history.push("/game/lobby/" + this.state.lobby.id + "/game");
  }*/

  getNonCreator(l) {
    let nonCreators = Array.from(l.players);
    const creator = l.creator;
    const index = nonCreators.findIndex(player => player.id === creator.id);
    nonCreators.splice(index, 1);
    return nonCreators;
  }

  async toggleCheckbox() {
    const previousStatus = this.state.playerStatus;
    try {
      // set player status via put request
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put(
        "/lobbies/" + this.state.lobby.id + "/ready"
      );
      console.log(response);
      this.setState({ playerStatus: true });
      this.forceUpdate();
    } catch (error) {
      this.setState({
        error: error ? error.message : "Unknown error",
        playerStatus: previousStatus
      });
      console.log(
        `Something went wrong while setting player status: \n${handleError(
          error
        )}`
      );
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

  render() {
    if (!this.state.lobby) return null;
    return (
      <Box title={this.state.lobby.lobbyName}>
        <MessageHandler
          success={false}
          show={this.state.error}
          message={this.state.error}
        />
        {!this.state.lobby ? (
          !this.state.error && <Spinner />
        ) : (
          <div>
            <Players>
              <PlayerContainer key={this.state.lobby.creator.id}>
                <PlayerInLobby
                  player={this.state.lobby.creator}
                  lobby={this.state.lobby}
                />
              </PlayerContainer>
              {this.state.nonCreators.map(player => {
                return (
                  <PlayerContainer key={player.id}>
                    <PlayerInLobby player={player} lobby={this.state.lobby} />
                  </PlayerContainer>
                );
              })}
              {this.state.lobby.gameMode === "HUMANS" ? (
                ""
              ) : (
                <PlayerContainer key={99}>
                  <BotInLobby botName="Bot1" />
                </PlayerContainer>
              )}
            </Players>
            <PlayerStatus onClick={() => this.toggleCheckbox()}>
              <CheckBox>
                <CheckboxTick checked={this.state.playerStatus === true} />
              </CheckBox>
              Set ready
            </PlayerStatus>
            <ButtonGroup>
              <Button
                onClick={() => {
                  this.leaveLobby();
                }}
              >
                Leave Lobby
              </Button>
              <Button
                onClick={() => {
                  this.startGame();
                }}
                disabled={!this.state.lobbyReady}
                background={"#44d63f"}
              >
                Start game
              </Button>
            </ButtonGroup>
            {/*this.state.lobbyReady ? (
              <Countdown
                time={6}
                activeText={"Game starts in "}
                timeoutText={"Go!"}
                functionWhenDone={this.startGame}
              />
            ) : null*/}
          </div>
        )}
      </Box>
    );
  }
}
export default withRouter(LobbyContainer);
