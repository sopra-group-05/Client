import React from "react";
import styled from "styled-components";
import { handleError, api } from "../../../helpers/api";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";
import Box from "../../../views/Box";
import JoinLobby from "../../../views/JoinLobby";
import Lobby from "../../shared/models/Lobby";
import { withRouter } from "react-router-dom";
import Player from "../../../views/Player";

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;



class OpenLobbies extends React.Component {
  constructor() {
    super();
    this.state = {
      lobbies: null,
      error: null,
      shouldRedirectToLobby: true
    };
    this.getLobbies = this.getLobbies.bind(this);
  }

  async getLobbies() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies");

      if (this.state.lobbies === null && response.data) {
        // make API call every 1s to get Updated lobbies List.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobbies, 1000);
      }

      // redirect to lobby if user is in a lobby
      if (response.data && this.state.shouldRedirectToLobby) {
        console.log("inside");
        response.data.filter(lobby => {
          lobby = new Lobby(lobby);
          if (lobby.players.find(x => x.id == localStorage.getItem("userId"))) {
            this.props.history.push("/game/lobby/" + lobby.id);
          }
        });
        this.setState({ shouldRedirectToLobby: false });
      }

      const filtered_lobbies = response.data.filter(function(lobby) {
        lobby = new Lobby(lobby);
        return lobby.lobbyStatus === "WAITING";
      });

      // Get the returned lobbies and update the state.
      this.setState({ lobbies: filtered_lobbies, error: null });
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while fetching the lobbies: \n${handleError(
          error
        )}`
      );
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.getLobbies();
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    clearInterval(this.interval);
  }

  render() {
    return (
      <Box title="Open Lobbies">
        <MessageHandler
          success={false}
          show={this.state.error}
          message={this.state.error}
        />
        {!this.state.lobbies ? (
          !this.state.error && <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.lobbies.length
                ? this.state.lobbies.map(l => {
                    return (
                    <PlayerContainer>
                      <JoinLobby joinLobby={this.joinLobbyFunction} lobby={l} />
                    </PlayerContainer>
                    );
                  })
                : "There are no Lobbies for you to join"}
            </Users>
          </div>
        )}
      </Box>
    );
  }
}

export default withRouter(OpenLobbies);
