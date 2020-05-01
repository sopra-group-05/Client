import React from "react";
import styled from "styled-components";
import { handleError, api } from "../../../helpers/api";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";
import PlayerInvite from "../../../views/PlayerInvite";
import Box from "../../../views/Box";
import User from "../../shared/models/User";

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

class OnlineUsersInvite extends React.Component {
  intervalID;
  constructor() {
    super();
    this.state = {
      users: null,
      error: null,
      mounted: true
    };
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers = async () => {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/users");

      // call this function again in 1s
      if (this.state.mounted) {
        this.intervalID = setTimeout(this.getUsers, 1000);
      } else {
        this.componentCleanup();
      }

      // only show Users that are online
      const filtered_users = response.data.filter(function(user) {
        user = new User(user);
        return user.status === "ONLINE";
      });

      // Get the returned users and update the state.
      this.setState({ users: filtered_users, error: null });
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
      this.componentCleanup();
    }
  };

  componentDidMount() {
    this.getUsers();
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
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id}>
                    <PlayerInvite user={user} />
                  </PlayerContainer>
                );
              })}
            </Users>
          </div>
        )}
      </Box>
    );
  }
}

export default OnlineUsersInvite;
