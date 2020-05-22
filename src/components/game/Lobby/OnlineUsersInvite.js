import React from "react";
import styled from "styled-components";
import { handleError, api } from "../../../helpers/api";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";
import PlayerInvite from "../../../views/PlayerInvite";
import Box from "../../../views/Box";
import User from "../../shared/models/User";
import Lobby from "../../shared/models/Lobby";

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class OnlineUsersInvite extends React.Component {
  intervalID;

  constructor(props) {
    super(props);
    this.state = {
      users: null,
      error: null,
      lobbyId: this.props.lobbyId,
      mounted: true,
      players: null
    };
    this.getUsersAndLobby = this.getUsersAndLobby.bind(this);
  }

  getUsersAndLobby = async () => {
    // get lobby
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request

      const response = await api.get("/lobbies/" + this.props.lobbyId);
      const l = new Lobby(response.data);

      // Get the returned lobby and update the state.
      this.setState({
        players: l.players,
        error: null
      });
      //console.log(l.players);
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
    }

    // get users
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/users");

      // call this function again in 1s
      if (this.state.mounted) {
        this.intervalID = setTimeout(this.getUsersAndLobby, 1000);
      } else {
        this.componentCleanup();
      }

      // only show Users that are online & not in lobby yet
      const players = this.state.players.map(player => {
        return player.id;
      });
      const filtered_users = response.data.filter(function(user) {
        user = new User(user);
        return user.status === "ONLINE" && !players.includes(user.id);
      });

      // Get the returned users and update the state.
      this.setState({ users: filtered_users, error: null });
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
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
      this.componentCleanup();
    }
  };

  componentDidMount() {
    this.getUsersAndLobby();
  }

  componentWillUnmount() {
    this.componentCleanup();
  }

  componentCleanup() {
    clearTimeout(this.intervalID);
    this.setState({ mounted: false });
  }

  render() {
    return (
      <Box title="Invite Player">
        <MessageHandler
          success={false}
          show={this.state.error}
          message={this.state.error}
        />
        {!this.state.users ? (
          !this.state.error && <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.length
                ? this.state.users.map(user => {
                    return (
                      <PlayerContainer key={user.id}>
                        <PlayerInvite
                          user={user}
                          lobbyId={this.state.lobbyId}
                        />
                      </PlayerContainer>
                    );
                  })
                : "There are no Players who can be invited"}
            </Users>
          </div>
        )}
      </Box>
    );
  }
}

export default OnlineUsersInvite;
