import React from "react";
import styled from "styled-components";
import Lobby from "../../shared/models/Lobby";
import Box from "../../../views/Box";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";
import PlayerInLobby from "../../../views/PlayerInLobby";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";


const Players = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: null,
      creator: null,
      error: null
    };
    this.getLobby = this.getLobby.bind(this);
  }

  async getLobby() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request

      const response = await api.get("/lobbies/" + this.props.match.params.id);
      const l = new Lobby(response.data);

      // make API call every 1s to get Updated Lobby.
      if (this.state.lobby === null && response.data) {
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobby, 1000);
      }

      // Get the returned lobby and update the state.
      this.setState({ lobby: l, creator: l.creator, error: null });
      console.log(this.state.lobby);
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
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

  render() {
    return <Box title={"this.state.lobby.lobbyName"}>
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
            {this.state.lobby.players.map(player => {
              if (player!==this.state.creator)
              return (
                <PlayerContainer key={player.playerId}>
                  <PlayerInLobby player={player} isCreator={this.creator === localStorage.getItem("userId")}/>
                </PlayerContainer>
              );
              else return null;
            })}
          </Players>
        </div>
      )}
    </Box>;
  }
}
export default withRouter(LobbyContainer);